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
note: 'Work in progress – the new version isn''t published yet. I compare it with the code I took over: the state from 14 Oct 2025, the last one before my changes.'
facts:
  - value: '65 → 35'
    text: page views – English copies replaced with one view for both languages
  - value: '23 → 0'
    text: hard-coded colours in templates – all of them now through tokens
  - value: '353 → 53'
    text: sizes hard-coded in pixels, e.g. text-[15px] – the rest in rem, so they grow with enlarged text
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
    label: Before · before I joined (Oct 2025)
    alt: The school website in October 2025 – the first screen
  after:
    src: /projects/2026/wankowicz/home-top.webp
    width: 1440
    height: 900
    label: After · new version
    alt: The new version of the school website – the first screen
  rows:
    - { label: Page view files, before: '65', after: '35' }
    - { label: View copies for the EN version, before: '31', after: '0' }
    - { label: Hard-coded colours, before: '23', after: '0' }
    - { label: 'Sizes hard-coded in px (e.g. text-[15px])', before: '353', after: '53' }
  note: 'Numbers from the Blade views. Before – the code from 14 Oct 2025, the last state before my changes; after – the new version on a separate branch. Screenshots from local versions; news in the old version comes from today''s database.'
ogImage: /og/projects/wankowicz-en.jpg
galleryLead: Screenshots from local versions – the new version and the code from October 2025. Click a screenshot to enlarge it.
gallery:
  - src: /projects/2026/wankowicz/content-page-full.webp
    full: true
    alt: The About us page
    caption: A content page – About us
  - src: /projects/2026/wankowicz/home-text-200-top.webp
    width: 1440
    height: 900
    alt: Text at 200% in the new version
    caption: New version – text at 200%, the heading and buttons grow with the content
  - src: /projects/2026/wankowicz/old-home-text-200-top.webp
    width: 1440
    height: 900
    alt: Text at 200% in the October 2025 version
    caption: October 2025 version – text at 200% for comparison
  - src: /projects/2026/wankowicz/recruitment-full.webp
    full: true
    alt: The admission form in the new version
    caption: Admission form, step 1 – new version
  - src: /projects/2026/wankowicz/old-recruitment-full.webp
    full: true
    alt: The admission form in the October 2025 version
    caption: Admission form – October 2025 version
  - src: /projects/2026/wankowicz/home-full.webp
    full: true
    alt: The home page of the new version
    caption: Home page – the whole page
  - src: /projects/2026/wankowicz/old-home-full.webp
    full: true
    alt: The home page in the October 2025 version
    caption: Home page – October 2025 version, the whole page
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

The website of the Melchior Wańkowicz High School has a Polish and an English version and an accessibility panel: bigger text, high contrast and more readable fonts. I've worked on this website in the Pesi team since October 2025, and since July 2026 I've been rewriting its front-end. I do the refactor on a separate branch, because the school keeps sending changes for the current version. The website had a lot to improve in how it looked and worked – it broke on wide screens, and many components could have been one. So that I don't get lost in the code, I rewrite it in stages, section by section. I started with a colour palette based on the logo, and I check WCAG in every section. In high-contrast mode the black background stays, as we agreed, but only links and buttons are yellow and the rest of the text is white – as accessibility guidelines recommend. I want the school to get a website I took care of as well as I can. The comparisons below show the code and design I took over – the state from 14 Oct 2025.

## What I'm changing

- **Accessibility according to WCAG 2.2** – the goal is level AAA, AA as the minimum: text scaling up to 200%, contrast, keyboard support, a visible focus and the size of clickable elements
- **One view per page** instead of separate copies for English – texts, addresses and contact details in language files
- **Colours through tokens** – no hard-coded colours, so the high contrast mode works on the whole website
- **Sizes in rem**, self-hosted fonts and one icon component
- **Tailwind CSS v4** with the config in CSS and a shared content width for Blade views and Vue components
