---
date: 2025-04-09
title: Sushi Show
description: A sample website for Marcin, a sushi chef – workshops and training first, catering next to them. Nuxt 4, Tailwind CSS and fast loading.
image: /projects/2025/sushi-show/thumbnail.webp
tags:
- vue
- nuxt
- tailwind
featured: false
links:
  live: https://lukaszdzielo.github.io/marcin-podlinski/
stack:
- Nuxt 4
- Vue 3
- Tailwind CSS 4
- '@nuxt/image'
note: A sample website – contact details and prices are examples; not visible in Google for now.
facts:
- value: '95'
  suffix: /100
  text: mobile performance in Lighthouse
- value: '100'
  suffix: /100
  text: accessibility in Lighthouse
- value: '274'
  suffix: ' kB'
  text: downloaded by the home page on mobile
- value: '2.7'
  suffix: ' s'
  text: LCP on mobile
cover:
  desktop: /projects/2025/sushi-show/first-screen.webp
  phone: /projects/2025/sushi-show/phone.webp
  width: 1440
  height: 900
  alt: Sushi Show – first screen of the website
ogImage: /og/projects/sushi-show-en.jpg
galleryLead: 'Full-page screenshots – click one to see it bigger. Measurements: Lighthouse 12.8, the site built locally, mobile – Moto G Power, slow 4G.'
gallery:
- src: /projects/2025/sushi-show/page-desktop.webp
  full: true
  alt: Sushi Show – the whole page on desktop
  caption: The whole page on desktop – from workshops and the schedule to catering and contact
- src: /projects/2025/sushi-show/page-phone.webp
  device: phone
  alt: Sushi Show – the whole page on mobile
  caption: The same page on mobile
---

I met Marcin in one of the sushi restaurants. I admired how much heart he puts into his food, and I once told him that if he ever wants to advertise and grow, I will gladly help. That is how this project started – a ready website Marcin can use when he wants to show his workshops to more people. I made the first version in Nuxt when I was learning Vue, so this project means a lot to me. Recently I refreshed it and made it faster.

## Main features

- Workshops and training first – that is what matters most to Marcin, catering is next to them
- A schedule of upcoming workshops from a Google Sheet – past dates hide themselves, you see up to 4 next ones
- Photos in AVIF with a WebP fallback, in 2–3 widths, generated when the site is built
- A gallery of workshop photos with a full-screen view
- A contact form via Web3Forms – without a key it opens an email app with a ready message
- Image sizes set in the code (the page does not jump while loading) and button contrast that meets WCAG AA
