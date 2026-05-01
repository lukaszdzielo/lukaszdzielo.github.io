import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Łukasz Dzieło — Front-End Developer',
      link: [
        { rel: 'canonical', href: 'https://lukaszdzielo.github.io/' },
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'Łukasz Dzieło' },
        { name: 'description', content: 'Front-End Developer focused on Vue, responsive UI, reusable components, and maintainable interfaces across commercial and personal projects.' },
        { name: 'author', content: 'Łukasz Dzieło' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#2b7fff' },
        { name: 'color-scheme', content: 'light dark' },

        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Łukasz Dzieło' },
        { property: 'og:title', content: 'Łukasz Dzieło — Front-End Developer' },
        { property: 'og:description', content: 'Front-End Developer focused on Vue, responsive UI, reusable components, and maintainable interfaces across commercial and personal projects.' },
        { property: 'og:url', content: 'https://lukaszdzielo.github.io/' },
        { property: 'og:image', content: 'https://lukaszdzielo.github.io/og-cover.jpg' },
        { property: 'og:image:alt', content: 'Homepage of Łukasz Dzieło, Front-End Developer' },
        { property: 'og:locale', content: 'en_US' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Łukasz Dzieło — Front-End Developer' },
        { name: 'twitter:description', content: 'Front-End Developer focused on Vue, responsive UI, reusable components, and maintainable interfaces across commercial and personal projects.' },
        { name: 'twitter:image', content: 'https://lukaszdzielo.github.io/og-cover.jpg' },
        { name: 'twitter:image:alt', content: 'Homepage of Łukasz Dzieło, Front-End Developer' },
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