import tailwindcss from "@tailwindcss/vite";

const SITE_NAME = 'Łukasz Dzieło'
const SITE_ROLE = 'Front-End Developer'
const SITE_TITLE = `${SITE_NAME} — ${SITE_ROLE}`
const SITE_DESCRIPTION =
  'Front-End Developer focused on Vue, responsive UI, reusable components, and maintainable interfaces across commercial and personal projects.'
const SITE_URL = 'https://lukaszdzielo.github.io/'
const OG_IMAGE = `${SITE_URL}/og/og-cover.jpg`
const APPLE_TITLE = SITE_NAME

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
        { property: 'og:image:alt', content: `Homepage of ${SITE_NAME}, ${SITE_ROLE}` },
        { property: 'og:locale', content: 'en_US' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: SITE_TITLE },
        { name: 'twitter:description', content: SITE_DESCRIPTION },
        { name: 'twitter:image', content: OG_IMAGE },
        { name: 'twitter:image:alt', content: `Homepage of ${SITE_NAME}, ${SITE_ROLE}` }
      ],
      script: [
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