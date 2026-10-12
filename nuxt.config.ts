import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from "@tailwindcss/vite";

const SITE_NAME = 'Łukasz Dzieło'
const SITE_ROLE = 'Front-End Developer'
const SITE_TITLE = `${SITE_NAME} — ${SITE_ROLE}`
const SITE_DESCRIPTION =
  'Front-End Developer focused on Vue, responsive UI, reusable components, and maintainable interfaces across commercial and personal projects.'
const SITE_URL = 'https://lukaszdzielo.github.io/'
const OG_IMAGE = `${SITE_URL}og/og-cover.jpg`
const APPLE_TITLE = SITE_NAME

// Prerender every project page (/projects/<year>/<slug>) and the paginated post list
const getPrerenderRoutes = (): string[] => {
  const routes: string[] = [];
  const projectDir = path.resolve(process.cwd(), 'content/projects');

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

  const files = getProjectFiles(projectDir);

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (match) {
        const yaml = match[1];
        const draft = /draft:\s*true/.test(yaml);

        if (!draft) {
          const relative = path.relative(projectDir, file).split(path.sep).join('/');
          const routePath = '/projects/' + relative.replace(/\/index\.md$/, '').replace(/\.md$/, '');
          routes.push(routePath);
        }
      }
    } catch (e) {
      console.error(`Error reading ${file} for prerender count:`, e);
    }
  });

  // Lista wpisów: /blog i /blog/page/2… (13 wpisów na pierwszej stronie, potem po 12 – app/utils/blogPaging.ts)
  const publishedPosts = getProjectFiles(path.resolve(process.cwd(), 'content/blog')).filter((file) => {
    const match = fs.readFileSync(file, 'utf-8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    return !(match && /draft:\s*true/.test(match[1]));
  }).length;
  const blogPages = 1 + Math.ceil(Math.max(0, publishedPosts - 13) / 12);
  routes.push('/blog');
  for (let page = 2; page <= blogPages; page++) routes.push(`/blog/page/${page}`);

  return routes;
};

const prerenderRoutes = getPrerenderRoutes();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: SITE_TITLE,
      link: [
        { rel: 'canonical', href: SITE_URL },
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
        { name: 'theme-color', content: '#2b7fff' },
        { name: 'color-scheme', content: 'light dark' },

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: SITE_NAME },
        { property: 'og:title', content: SITE_TITLE },
        { property: 'og:description', content: SITE_DESCRIPTION },
        { property: 'og:url', content: SITE_URL },
        { property: 'og:image', content: OG_IMAGE },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: `Avatar of ${SITE_NAME} with the title "${SITE_ROLE}"` },
        { property: 'og:locale', content: 'en_US' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
        { name: 'twitter:image', content: OG_IMAGE },
        { name: 'twitter:image:alt', content: `Avatar of ${SITE_NAME} with the title "${SITE_ROLE}"` }
      ],
      script: [
        {
          innerHTML: `(()=>{try{const t=localStorage.getItem('theme');const d=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
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
    format: ['avif', 'webp'],
    // Not in the defaults; lets `sizes` use `xs:` for the mobile rule
    // (an unprefixed value would produce useless 1w/2w candidates).
    screens: { xs: 320 },
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
  hooks: {
    // @nuxt/image registers its source dir as a public asset dir, which would copy
    // every original into the build. Drop it for production builds - IPX still reads
    // the originals from disk while prerendering.
    'nitro:init'(nitro) {
      if (nitro.options.dev) return;
      const imagesDir = path.resolve(process.cwd(), 'app/assets/images');
      nitro.options.publicAssets = nitro.options.publicAssets.filter(
        (asset) => path.resolve(asset.dir) !== imagesDir
      );
    }
  },
  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/icon'],
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