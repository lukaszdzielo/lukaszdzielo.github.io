import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Łukasz Dzieło — Vue Front-End Developer Portfolio',
      link: [
        { rel: 'canonical', href: 'https://lukaszdzielo.github.io/' },
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-title', content: 'lukasz.dev' },
        { name: 'description', content: 'Front-End Developer focused on Vue, responsive UI, reusable components, and maintainable interfaces across commercial and personal projects.' },
        { name: 'author', content: 'Łukasz Dzieło' },
        { name: 'robots', content: 'index, follow' }
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