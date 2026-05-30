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

// Dynamic routes generator to automatically prerender all paginated pages
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
  let totalArchive = 0;
  let totalFeatured = 0;

  files.forEach((file) => {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (match) {
        const yaml = match[1];
        const draft = /draft:\s*true/.test(yaml);
        const featured = /featured:\s*true/.test(yaml);

        if (!draft) {
          totalArchive++;
          if (featured) {
            totalFeatured++;
          }
        }
      }
    } catch (e) {
      console.error(`Error reading ${file} for prerender count:`, e);
    }
  });

  const featuredLimit = 18;
  const archiveLimit = 24;

  const featuredPages = Math.max(1, Math.ceil(totalFeatured / featuredLimit));
  const archivePages = Math.max(1, Math.ceil(totalArchive / archiveLimit));

  // Prerender pages from page 2 onwards (page 1 is crawled naturally)
  for (let i = 2; i <= featuredPages; i++) {
    routes.push(`/projects/page/${i}`);
  }
  for (let i = 2; i <= archivePages; i++) {
    routes.push(`/projects/archive/page/${i}`);
  }

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
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-VGN46K0G19',
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VGN46K0G19');
          `,
        },
      ],
    },
  },
  image: {
    format: ['avif'],
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
    'pages:extend'(pages) {
      pages.push(
        {
          name: 'projects-page',
          path: '/projects/page/:page',
          file: '~/pages/projects/index.vue'
        },
        {
          name: 'projects-archive-page',
          path: '/projects/archive/page/:page',
          file: '~/pages/projects/archive.vue'
        }
      );
    }
  },
  modules: ['@nuxt/content', '@nuxt/image'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss() as any,
    ],
  },
})