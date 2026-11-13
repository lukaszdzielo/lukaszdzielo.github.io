---
date: 2026-11-10
title: pesi.pl – a new version of the website
description: 'The website of the company I work for: from Laravel to WordPress with the block editor, so that marketing can publish posts on their own. Lighter, shorter on a phone and with animated 3D cubes.'
image: /projects/2026/pesi-pl/thumbnail.webp
tags: [wordpress]
featured: false
draft: false
agency: Pesi
links:
  live: https://pesi.pl
stack: [WordPress, block theme, PHP, Three.js, CSS scroll-snap, no jQuery]
note: 'Claude Code wrote the code – I planned the whole thing, decided on the layout and components and checked every view. The "before" results were measured on a copy of the old site from the Internet Archive.'
facts:
  - value: '70 → 99'
    text: home page performance in Lighthouse on mobile
  - value: '2 MB → 37 kB'
    text: of JavaScript on the home page on mobile
  - value: '18 → 12'
    text: phone screens to scroll through on the home page
  - value: '100'
    text: accessibility, best practices and SEO in Lighthouse on all measured pages
cover:
  desktop: /projects/2026/pesi-pl/home-top.webp
  phone: /projects/2026/pesi-pl/home-phone-top.webp
  width: 1440
  height: 900
  alt: The new pesi.pl website – first screen
compare:
  before:
    src: /projects/2026/pesi-pl/old-home-top.webp
    width: 1440
    height: 900
    label: Before · the Laravel site
    alt: The old pesi.pl website – first screen
  after:
    src: /projects/2026/pesi-pl/home-top.webp
    width: 1440
    height: 900
    label: After · the WordPress site
    alt: The new pesi.pl website – first screen
  rows:
    - { label: Lighthouse performance, before: '70', after: '99' }
    - { label: JavaScript, before: '2,055 kB', after: '37 kB' }
    - { label: CSS, before: '58 kB', after: '16 kB' }
    - { label: Page size, before: '2.6 MB', after: '362 kB' }
    - { label: Requests, before: '131', after: '47' }
    - { label: Total Blocking Time, before: '178 ms', after: '0 ms' }
    - { label: Page height (px), before: '14,553', after: '10,058' }
  note: 'Home page on mobile, medians from 3 Lighthouse runs. Before – a copy of the old site from the Internet Archive (17 July 2026), sizes without the archive''s scripts, times and scores approximate. The new site doesn''t have analytics tools yet – the old one loaded about 570 kB of them.'
ogImage: /og/projects/pesi-pl-en.jpg
highlights:
  - title: Marketing publishes on their own
    text: Before, every change and every post was pasted in by someone from the front-end or back-end team. Now posts are made in the block editor, and an article can show who its author is.
  - title: Carousels instead of long lists
    text: On phones and tablets, grids with many elements are carousels built with CSS scroll-snap. You can see part of the next slide, and the page is shorter – the footer with the contact details is closer.
  - title: 3D cubes that don't slow the page down
    text: A normal image loads first, and the Three.js scene only after the page has loaded – only on wider screens and not when reduced motion is on.
  - title: Scripts only when they're needed
    text: reCAPTCHA loads the first time someone uses the form, the YouTube player after a click on the thumbnail, and the menu animations on hover.
---

pesi.pl is the website of the company I work for. The old version ran on Laravel, and every change – including every blog post – was pasted in by a developer, not by marketing. I rewrote it in WordPress with a block theme, so that marketing can publish on their own and follow changes on the site more easily. Claude Code wrote the code. I thought the whole thing through so that I wouldn't repeat the mistakes from the Laravel version, decided on the layout and components and checked every view. I also moved the case studies and all the blog posts so that they kept their previous look.

What mattered most to me was that the site is light and doesn't go on forever on a phone – the footer has the contact details, so the way there should be short.
