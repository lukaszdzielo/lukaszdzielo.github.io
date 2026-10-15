---
date: 2026-10-01
title: M. Wańkowicz High School – new website version
description: 'Front-end refactor of a high school website: accessibility according to WCAG 2.2, one view for the Polish and English versions, colours through tokens for the high contrast mode. Work in progress.'
image: /projects/2026/wankowicz/thumbnail.webp
tags: [html]
featured: false
draft: false
agency: Pesi
stack: [Laravel Blade, Alpine.js, Vue 3, Tailwind CSS v4]
note: Work in progress – the new version isn't published yet. I do the refactor on a separate branch, in parallel with ongoing changes to the current website.
facts:
  - value: '73 → 35'
    text: page views – English copies replaced with one view for both languages
  - value: '85 → 0'
    text: hard-coded colours in templates – all of them now through tokens
  - value: '692 → 53'
    text: pixel sizes in classes – the rest in rem, so text scales with the settings
  - value: '88%'
    text: of the current front-end of the new version is my code
cover:
  desktop: /projects/2026/wankowicz/home-top.webp
  phone: /projects/2026/wankowicz/home-phone-top.webp
  width: 1440
  height: 900
  alt: The new version of the school website – the first screen
compare:
  before:
    src: /projects/2026/wankowicz/old-home-top.webp
    width: 1440
    height: 900
    label: Before · current version
    alt: The current school website – the first screen
  after:
    src: /projects/2026/wankowicz/home-top.webp
    width: 1440
    height: 900
    label: After · new version
    alt: The new version of the school website – the first screen
  rows:
    - { label: Page view files, before: '73', after: '35' }
    - { label: View copies for the EN version, before: '34', after: '0' }
    - { label: Hard-coded colours, before: '85', after: '0' }
    - { label: Pixel sizes in classes, before: '692', after: '53' }
  note: Numbers from the code of both versions (Blade views). The new version is on a separate branch; screenshots from the local version.
ogImage: /og/projects/wankowicz-en.jpg
galleryLead: Screenshots from the local version before publishing. Click a screenshot to enlarge it.
gallery:
  - src: /projects/2026/wankowicz/home-high-contrast-top.webp
    width: 1440
    height: 900
    alt: High contrast mode
    caption: High contrast mode – black background, white and yellow text, the background photo hidden
  - src: /projects/2026/wankowicz/home-en-top.webp
    width: 1440
    height: 900
    alt: The English home page
    caption: English version – the same view, texts from language files
  - src: /projects/2026/wankowicz/recruitment-full.webp
    full: true
    alt: The admission form in the new version
    caption: Admission form, step 1 – new version
  - src: /projects/2026/wankowicz/old-recruitment-full.webp
    full: true
    alt: The admission form in the current version
    caption: Admission form, step 1 – current version
  - src: /projects/2026/wankowicz/home-full.webp
    full: true
    alt: The home page of the new version
    caption: Home page – the whole page
  - src: /projects/2026/wankowicz/content-page-full.webp
    full: true
    alt: The About us page
    caption: A content page – About us
highlights:
  - title: One view for two languages
    text: The old website had a separate copy of the view for the English version. Now every page has one view, and the texts are in language files. A section can be hidden in only one language, and a missing translation shows the Polish text.
  - title: High contrast through tokens
    text: The high contrast mode swaps the colour variables. It only works if no colour is hard-coded – that's why all colours moved to brand tokens and the Tailwind scale.
  - title: Text and layout grow together
    text: The accessibility settings change the text size up to 200%. Sizes, spacing and the content width are in rem, so the whole layout grows with the text, and lines don't get too long.
  - title: Rules for the whole team
    text: I wrote the refactor conventions in one file in the repository – sizes, colours, translations, icons and a WCAG checklist for every new page.
---

The website of the Melchior Wańkowicz High School has a Polish and an English version and an accessibility panel: bigger text, high contrast and more readable fonts. I work on the current version in the Pesi team, and since July 2026 I've been preparing its new version. I do the refactor on a separate branch and compare the pages side by side, because the school keeps sending changes for the current version.

## What I'm changing

- **Accessibility according to WCAG 2.2** – the goal is level AAA, AA as the minimum: text scaling up to 200%, contrast, keyboard support, a visible focus and the size of clickable elements
- **One view per page** instead of separate copies for English – texts, addresses and contact details in language files
- **Colours through tokens** – no hard-coded colours, so the high contrast mode works on the whole website
- **Sizes in rem**, self-hosted fonts and one icon component
- **Tailwind CSS v4** with the config in CSS and a shared content width for Blade views and Vue components
