import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
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