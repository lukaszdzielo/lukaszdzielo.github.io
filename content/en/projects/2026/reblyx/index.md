---
date: 2026-09-01
title: ReblyX
description: Website for a steel processing center – design and build, with content edited in Gutenberg.
image: /projects/2026/reblyx/thumbnail.webp
tags: [wordpress]
featured: false
links:
  live: https://reblyx.com
stack: [WordPress, Gutenberg, AVIF, no jQuery]
facts:
  - value: '100'
    suffix: /100
    text: mobile performance in Lighthouse – it was 72
  - value: '100'
    suffix: /100
    text: accessibility – it was 62
  - value: '274'
    suffix: ' kB'
    text: for the home page – it was 1.1 MB, about 4× less
  - value: '1.6'
    suffix: ' s'
    text: mobile LCP – it was 5.0 s
cover:
  desktop: /projects/2026/reblyx/first-screen.webp
  alt: ReblyX – the first screen of the new website
ogImage: /og/projects/reblyx-en.jpg
compare:
  before:
    src: /projects/2026/reblyx/old-first-screen.webp
    label: Before · Divi
    alt: The old ReblyX website on Divi – first screen
  after:
    src: /projects/2026/reblyx/first-screen.webp
    label: After · Gutenberg
    alt: The new ReblyX website on Gutenberg – first screen
  rows:
    - { label: Performance – mobile, before: '72', after: '100' }
    - { label: Performance – desktop, before: '96', after: '100' }
    - { label: Accessibility, before: '62', after: '100' }
    - { label: SEO, before: '92', after: '100' }
    - { label: LCP – mobile, before: '5.0 s', after: '1.6 s' }
    - { label: Layout shift (CLS), before: '0.152', after: '0' }
    - { label: Data downloaded, before: '1.1 MB', after: '274 kB' }
  note: Lighthouse 13, home page. Mobile – Moto G Power, slow 4G. The old version was measured locally and the new one on the server, so the new one had harder conditions.
gallery:
  - src: /projects/2026/reblyx/page-desktop.webp
    full: true
    alt: The new ReblyX website – the whole home page
    caption: New version (Gutenberg) – from the first screen to the quote form
  - src: /projects/2026/reblyx/old-page-desktop.webp
    full: true
    alt: The old ReblyX website – the whole home page
    caption: Old version (Divi) – services and a contact form
---

ReblyX is a steel processing center – 3D design, laser cutting, bending, welding, galvanizing and powder coating. The old website was built with Divi: a list of services and a form. I designed and built a new one with Gutenberg blocks, so the client can change the content in the editor himself.

## What changed

- Gutenberg blocks instead of Divi, and no jQuery
- Images in AVIF format, in a few sizes – a phone doesn't download images made for a big screen
- Fonts served from the website's own server instead of Google Fonts
- New sections: six processes, four reasons, six steps from a request to a finished part, tips before ordering and a quote form
- A page description for Google, labels for form fields, better contrast and zoom on phones – accessibility and SEO are both 100 in Lighthouse
- A quote form protected by reCAPTCHA
