import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from "@tailwindcss/vite";
import githubLight from 'shiki/themes/github-light.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';

const SITE_NAME = 'Łukasz Dzieło'
const SITE_ROLE = 'Front-End Developer'
const SITE_TITLE = `${SITE_NAME} – ${SITE_ROLE}`
// Domyślne meta po angielsku – każda podstrona i tak ustawia własne (useSiteMeta) w swoim języku
const SITE_DESCRIPTION =
  'Front-End Developer. I build responsive interfaces in Vue 3 – reusable components, state and API integrations. I also build WordPress websites for businesses.'
const SITE_URL = 'https://lukaszdzielo.github.io/'
// domyślny obrazek podglądu – wersja angielska; podstrony ustawiają swój w useSiteMeta
const OG_IMAGE = `${SITE_URL}og/home-en.jpg`
const APPLE_TITLE = SITE_NAME

// Dzisiejsza data w Polsce ('2026-10-17') – wpis z datą z przyszłości czeka na publikację.
// GitHub Actions buduje stronę codziennie o 2:30 UTC, więc wpis pojawia się sam rano w dniu z pola `date`.
const TODAY = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Warsaw' }).format(new Date())
// Czy plik treści jest ukryty: `draft: true` albo (wpis) data publikacji jeszcze nie nadeszła
const isHidden = (yaml: string, kind: 'projects' | 'blog') => {
  if (/draft:\s*true/.test(yaml)) return true
  if (kind !== 'blog') return false
  const date = yaml.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})/m)?.[1]
  return !!date && date > TODAY
}

// Prerender every project page (/projects/<year>/<slug>) and the paginated post list
const getPrerenderRoutes = (): string[] => {
  const routes: string[] = [];

  const getProjectFiles = (dir: string): string[] => {
    let results: string[] = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getProjectFiles(filePath));
      } else if (file.endsWith('.md')) {
        results.push(filePath);
      }
    });
    return results;
  };

  // Treści po polsku i po angielsku: content/pl/… → /pl/…, content/en/… → /… (angielski domyślny, bez przedrostka)
  const files: string[] = [];
  const prefixes: Record<string, string> = {};
  for (const [lang, prefix] of [['en', ''], ['pl', '/pl']] as const) {
    const dir = path.resolve(process.cwd(), `content/${lang}/projects`);
    for (const f of getProjectFiles(dir)) { files.push(f); prefixes[f] = prefix; }
  }

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (match) {
        const yaml = match[1];
        const draft = isHidden(yaml, 'projects');

        if (!draft) {
          const lang = prefixes[file] === '/pl' ? 'pl' : 'en';
          const relative = path.relative(path.resolve(process.cwd(), `content/${lang}/projects`), file).split(path.sep).join('/');
          const routePath = prefixes[file] + '/projects/' + relative.replace(/\/index\.md$/, '').replace(/\.md$/, '');
          routes.push(routePath);
        }
      }
    } catch (e) {
      console.error(`Error reading ${file} for prerender count:`, e);
    }
  });

  // Lista wpisów: /blog i /blog/page/2… (13 wpisów na pierwszej stronie, potem po 12 – app/utils/blogPaging.ts)
  for (const [lang, prefix] of [['en', ''], ['pl', '/pl']] as const) {
    const publishedPosts = getProjectFiles(path.resolve(process.cwd(), `content/${lang}/blog`)).filter((file) => {
      const match = fs.readFileSync(file, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return !(match && isHidden(match[1], 'blog'));
    }).length;
    const blogPages = 1 + Math.ceil(Math.max(0, publishedPosts - 13) / 12);
    routes.push(`${prefix}/blog`);
    for (let page = 2; page <= blogPages; page++) routes.push(`${prefix}/blog/page/${page}`);
  }
  routes.push('/pl');

  return routes;
};

const prerenderRoutes = getPrerenderRoutes();

// llms.txt – krótki spis strony dla modeli językowych i wyszukiwarek AI (format llmstxt.org):
// kim jestem, projekty z własną podstroną i opublikowane wpisy – po angielsku i po polsku.
const buildLlmsTxt = (): string => {
  const base = SITE_URL.replace(/\/$/, '');
  const field = (yaml: string, key: string) => {
    const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^'(.*)'$/, '$1').replace(/''/g, "'").replace(/^"(.*)"$/, '$1') : '';
  };
  const walk = (dir: string): string[] => !fs.existsSync(dir) ? [] : fs.readdirSync(dir).flatMap((f) => {
    const full = path.join(dir, f);
    return fs.statSync(full).isDirectory() ? walk(full) : f.endsWith('.md') ? [full] : [];
  });
  const list = (lang: 'en' | 'pl', kind: 'projects' | 'blog') => {
    const dir = path.resolve(process.cwd(), `content/${lang}/${kind}`);
    return walk(dir).map((file) => {
      const raw = fs.readFileSync(file, 'utf-8').replace(/\r\n/g, '\n');
      const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      if (!m || isHidden(m[1], kind)) return null;
      // projekt trafia do spisu tylko z własną podstroną (treść pod frontmatterem)
      if (kind === 'projects' && !m[2].trim()) return null;
      const rel = path.relative(dir, file).split(path.sep).join('/').replace(/\/index\.md$/, '').replace(/\.md$/, '');
      const url = `${base}${lang === 'pl' ? '/pl' : ''}/${kind}/${rel}/`;
      return { date: field(m[1], 'date'), line: `- [${field(m[1], 'title')}](${url}): ${field(m[1], 'description')}` };
    }).filter((x): x is { date: string; line: string } => !!x).sort((a, b) => b.date.localeCompare(a.date)).map((x) => x.line);
  };
  const section = (title: string, lines: string[]) => lines.length ? `## ${title}\n\n${lines.join('\n')}\n` : '';
  return [
    `# ${SITE_TITLE}\n`,
    `> ${SITE_DESCRIPTION}\n`,
    `Portfolio and blog of Łukasz Dzieło, a front-end developer from Katowice, Poland (Vue 3, JavaScript, WordPress). English version at ${base}/, Polish version at ${base}/pl/.\n`,
    section('Pages', [
      `- [Home](${base}/): about me, featured projects, skills and contact`,
      `- [Projects](${base}/projects/): featured projects and the full archive since 2016`,
      `- [Websites for businesses](${base}/business-websites/): WordPress websites built with Gutenberg blocks, prices and process`,
      `- [Blog](${base}/blog/): posts and case studies`,
    ]),
    section('Projects', list('en', 'projects')),
    section('Blog posts', list('en', 'blog')),
    section('Projekty (PL)', list('pl', 'projects')),
    section('Wpisy (PL)', list('pl', 'blog')),
  ].filter(Boolean).join('\n');
};

// <lastmod> do sitemap.xml: dla wpisów i projektów data z frontmattera (updated, a bez niego date),
// klucz to adres strony z ukośnikiem na końcu. Pozostałe strony nie mają daty w treści – idą bez lastmod.
const getContentLastmod = (): Map<string, string> => {
  const dates = new Map<string, string>();
  const field = (yaml: string, key: string) => {
    const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^'(.*)'$/, '$1').replace(/^"(.*)"$/, '$1') : '';
  };
  const walk = (dir: string): string[] => !fs.existsSync(dir) ? [] : fs.readdirSync(dir).flatMap((f) => {
    const full = path.join(dir, f);
    return fs.statSync(full).isDirectory() ? walk(full) : f.endsWith('.md') ? [full] : [];
  });
  for (const [lang, prefix] of [['en', ''], ['pl', '/pl']] as const) {
    for (const kind of ['blog', 'projects'] as const) {
      const dir = path.resolve(process.cwd(), `content/${lang}/${kind}`);
      for (const file of walk(dir)) {
        const match = fs.readFileSync(file, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (!match) continue;
        const date = field(match[1], 'updated') || field(match[1], 'date');
        if (!date) continue;
        const rel = path.relative(dir, file).split(path.sep).join('/').replace(/\/index\.md$/, '').replace(/\.md$/, '');
        dates.set(`${prefix}/${kind}/${rel}/`, date);
      }
    }
  }
  return dates;
};

// Critical CSS (14.10): style potrzebne do pierwszego ekranu trafiają do <style> w HTML, a cały plik CSS
// ładuje się bez blokowania wyświetlenia (media="print" → "all" po wczytaniu). Na telefonie strona pokazuje się
// szybciej (Lighthouse: „Render-blocking requests”). Działa na gotowych plikach HTML po prerenderze.
async function inlineCriticalCss(publicDir: string, clientDir: string) {
  const { default: Beasties } = await import('beasties');
  const beasties = new Beasties({
    // pliki CSS z /_nuxt/ czytamy z wyniku budowania klienta – do public trafiają dopiero po prerenderze
    path: clientDir,
    publicPath: '/',
    preload: 'media',
    pruneSource: false,
    reduceInlineStyles: false,
    inlineFonts: false,
    // Ciemny motyw włącza skrypt w <head> (klasa .dark na <html>) – w HTML z buildu jej nie ma, więc reguły
    // ciemnego motywu zostawiamy zawsze, inaczej przy ciemnym motywie strona mignęłaby na jasno
    allowRules: [/\.dark/, /data-mode/],
    logLevel: 'warn',
  });
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) return e.name === '_ipx' || e.name === '_nuxt' ? [] : walk(p);
      return e.name.endsWith('.html') ? [p] : [];
    });
  for (const file of walk(publicDir)) {
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes('rel="stylesheet"')) continue;
    fs.writeFileSync(file, await beasties.process(html));
  }
}

// Pierwsza wizyta z przeglądarką po polsku (pierwszy język na liście) → ta sama strona w wersji /pl.
// Nie przekierowuje, gdy jest ciasteczko `lang` (wybór z przełącznika języka) ani na stronach /pl.
// Adresy podstron z inną nazwą w każdym języku – mapa niżej (jak definePageMeta w pages/).
const LANG_REDIRECT = `(()=>{try{var p=location.pathname;if(/(^|;\\s*)lang=/.test(document.cookie)||p==='/pl'||p.indexOf('/pl/')===0)return;var l=((navigator.languages&&navigator.languages[0])||navigator.language||'').toLowerCase();if(l.indexOf('pl')!==0)return;var m={'/business-websites':'/strony-dla-firm','/privacy-policy':'/polityka-prywatnosci'};var k=p.replace(/\\/+$/,'');location.replace('/pl'+(m[k]||k)+'/'+location.search+location.hash)}catch(e){}})();`

// Motywy bloków kodu z kontrastem WCAG AA (min. 4,5:1). Nazwy motywów zostają te same, więc klasy i style się nie zmieniają.
// Jasny: pomarańczowy #e36209 na białym tle ma 3,5:1 → orange-700 (#ca3500, 5,2:1).
// Ciemny: komentarze #6a737d na tle slate-900 mają 3,7:1 → slate-400 (#90a1b9, 6,8:1).
const githubLightAA = JSON.parse(JSON.stringify(githubLight).replace(/#e36209/gi, '#ca3500'))
const githubDarkAA = JSON.parse(JSON.stringify(githubDark).replace(/#6a737d/gi, '#90a1b9'))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        highlight: { theme: { default: githubLightAA, dark: githubDarkAA } },
      },
    },
  },
  app: {
    head: {
      // lang i hreflang ustawia @nuxtjs/i18n (app.vue → useLocaleHead)
      title: SITE_TITLE,
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: APPLE_TITLE },
        { name: 'description', content: SITE_DESCRIPTION },
        { name: 'author', content: SITE_NAME },
        { name: 'robots', content: 'index, follow' },
        // kolor paska przeglądarki (telefony) – tło strony w jasnym i ciemnym trybie systemu
        { name: 'theme-color', content: '#edf0f6', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0a1227', media: '(prefers-color-scheme: dark)' },
        { name: 'color-scheme', content: 'light dark' },

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        { property: 'og:image', content: OG_IMAGE },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: `Avatar – ${SITE_NAME}, ${SITE_ROLE}` },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: OG_IMAGE },
        { name: 'twitter:image:alt', content: `Avatar – ${SITE_NAME}, ${SITE_ROLE}` }
      ],
      script: [
        { innerHTML: LANG_REDIRECT, tagPosition: 'head' },
        {
          // Przed pierwszym malowaniem: klasa .dark i data-mode (auto/light/dark) – ikona przełącznika motywu nie skacze
          innerHTML: `(()=>{const r=document.documentElement;try{const t=localStorage.getItem('theme');r.dataset.mode=t==='light'||t==='dark'?t:'auto';const d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)r.classList.add('dark');}catch(e){r.dataset.mode='auto'}})();`,
          tagPosition: 'head',
        },
        // Google Analytics ładuje się dopiero po zgodzie – app/plugins/analytics.client.ts
      ],
    },
  },
  image: {
    // Source images live outside /public so the originals are never deployed;
    // only the optimised variants generated into /_ipx end up in the build.
    dir: 'assets/images',
    // Tylko WebP (14.10): AVIF kodował się ok. 9 min przy każdym buildzie – pomiar w archiwum decyzje/obrazki-avif-webp.md
    format: ['webp'],
    // Not in the defaults; lets `sizes` use `xs:` for the mobile rule
    // (an unprefixed value would produce useless 1w/2w candidates).
    screens: { xs: 320 },
  },
  experimental: {
    // NuxtLink pobiera dane podstrony dopiero po najechaniu albo fokusie, a nie dla każdego linku widocznego na ekranie –
    // strona główna przy wczytaniu nie pobiera danych kilkunastu podstron
    defaults: {
      nuxtLink: { prefetchOn: { visibility: false, interaction: true } },
    },
  },
  sourcemap: {
    server: false,
    client: false,
  },
  nitro: {
    prerender: {
      routes: prerenderRoutes
    }
  },
  // Stare polskie adresy (sprzed wersji angielskiej) → polska wersja pod /pl/
  routeRules: {
    '/strony-dla-firm': { redirect: { to: '/pl/strony-dla-firm/', statusCode: 301 } },
    '/polityka-prywatnosci': { redirect: { to: '/pl/polityka-prywatnosci/', statusCode: 301 } },
  },
  hooks: {
    // Wpis z datą z przyszłości traktujemy jak szkic (draft) – nie ma go na liście, w sitemap ani pod adresem.
    // Dzień publikacji: patrz TODAY wyżej. W `npm run dev` wpis jest widoczny, żeby dało się go obejrzeć przed publikacją.
    'content:file:afterParse'(ctx) {
      if (process.env.NODE_ENV === 'development') return
      const content = ctx.content as { date?: string; draft?: boolean }
      if (ctx.collection.name.startsWith('blog') && content.date && String(content.date).slice(0, 10) > TODAY) {
        content.draft = true
      }
    },
    // @nuxt/image registers its source dir as a public asset dir, which would copy
    // every original into the build. Drop it for production builds - IPX still reads
    // the originals from disk while prerendering.
    'nitro:init'(nitro) {
      if (nitro.options.dev) return;
      const imagesDir = path.resolve(process.cwd(), 'app/assets/images');
      nitro.options.publicAssets = nitro.options.publicAssets.filter(
        (asset) => path.resolve(asset.dir) !== imagesDir
      );

      // sitemap.xml: wszystkie wygenerowane strony HTML poza noindex (projekty bez podstrony, 404)
      // i przekierowaniami. Adresy z ukośnikiem na końcu – tak jak serwuje je GitHub Pages.
      const sitemap = new Set<string>();
      nitro.hooks.hook('prerender:route', (route) => {
        if (route.error || !route.fileName?.endsWith('.html') || route.route.includes('?')) return;
        if (['/200.html', '/404.html'].includes(route.fileName)) return;
        const html = route.contents || '';
        if (/<meta[^>]+name="robots"[^>]+noindex/.test(html) || /http-equiv="refresh"/i.test(html)) return;
        sitemap.add(route.route === '/' ? '/' : `${route.route.replace(/\/+$/, '')}/`);
      });
      nitro.hooks.hook('prerender:done', async () => {
        const base = SITE_URL.replace(/\/$/, '');
        const lastmod = getContentLastmod();
        const urls = [...sitemap].sort().map((r) => {
          const mod = lastmod.get(r);
          return `  <url><loc>${base}${r}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ''}</url>`;
        }).join('\n');
        fs.writeFileSync(
          path.join(nitro.options.output.publicDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
        );
        fs.writeFileSync(path.join(nitro.options.output.publicDir, 'llms.txt'), buildLlmsTxt());
        await inlineCriticalCss(nitro.options.output.publicDir, path.join(nitro.options.buildDir, 'dist/client'));
      });
    }
  },
  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/icon', '@nuxtjs/i18n'],
  // Angielski domyślny pod /, polski pod /pl/. Przy pierwszej wizycie przeglądarka po polsku
  // przenosi na polską wersję; wybór z przełącznika zapisuje się w ciasteczku i ma pierwszeństwo.
  i18n: {
    baseUrl: SITE_URL.replace(/\/$/, ''),
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'pl', language: 'pl-PL', name: 'Polski' },
    ],
    // Polskie i angielskie adresy podstron ustawia definePageMeta({ i18n: { paths } })
    customRoutes: 'meta',
    // Wykrywanie języka robi skrypt w <head> (LANG_REDIRECT niżej) – przed wyświetleniem strony,
    // bez mignięcia wersji angielskiej i bez błędów hydracji na stronie statycznej.
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts', // i18n/i18n.config.ts
  },
  icon: {
    // Ikony użyte w kodzie trafiają do paczki – bez zapytań do api.iconify.design w przeglądarce.
    clientBundle: { scan: true },
  },
  runtimeConfig: {
    public: {
      // Disable the anchor <a> links that MDC wraps around headings (h2/h3/h4 by default)
      mdc: {
        headings: {
          anchorLinks: false,
        },
      },
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss() as any,
    ],
  },
})