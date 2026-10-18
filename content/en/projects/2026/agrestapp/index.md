---
date: 2026-10-01
title: AgrestApp
description: 'A purchasing system for bakeries, confectioneries, ice cream shops and HoReCa. In the Pesi team I work on the front-end: UI components, the company website, analytics and supplier offer management.'
image: /projects/2026/agrestapp/thumbnail.webp
tags: [vue]
featured: false
draft: false
agency: Pesi
stack: [Vue 3, Inertia, Tailwind CSS v4]
note: I work in a team – I only describe the parts where the front-end is mine. The app panel is not public.
links:
  live: https://agrestapp.pl
facts:
  - value: '12'
    suffix: ' mo.'
    text: in the project – since October 2025
  - value: '69'
    text: icons as Vue components in the new UI set
  - value: '4'
    text: industry pages – bakeries, confectioneries, ice cream shops and HoReCa – built from the same sections
  - value: '296'
    text: classes in templates left unchanged when moving to Tailwind v4
cover:
  desktop: /projects/2026/agrestapp/home-top.webp
  phone: /projects/2026/agrestapp/home-phone-top.webp
  width: 1440
  height: 900
  alt: AgrestApp – the first screen of the home page
galleryLead: The company website and the app panel – analytics with made-up data. Click a screenshot to enlarge it.
gallery:
  - src: /projects/2026/agrestapp/analytics-top.webp
    width: 1440
    height: 900
    alt: Analytics in compare mode
    caption: Analytics – a date range with a slider and fields, two periods compared, savings and a chart (made-up data)
  - src: /projects/2026/agrestapp/home-full.webp
    full: true
    alt: AgrestApp home page
    caption: Home page – from the first screen to the newsletter
  - src: /projects/2026/agrestapp/about-system-full.webp
    full: true
    alt: 'The "About the system" page'
    caption: '"About the system" – sections describing the modules'
  - src: /projects/2026/agrestapp/industry-ice-cream-full.webp
    full: true
    alt: The page for ice cream shops
    caption: The industry page for ice cream shops – built from the same sections as the others
  - src: /projects/2026/agrestapp/industry-confectionery-full.webp
    full: true
    alt: The page for confectioneries
    caption: The industry page for confectioneries
ogImage: /og/projects/agrestapp-en.jpg
highlights:
  - title: A panel header without hard-coded numbers
    text: 'I rebuilt the panel header. The "Log in as" bar is now part of it, and the header measures its own height and saves it in a CSS variable. The sidebar and the sticky page bars use this variable instead of 75 and 125 px written in several files. You can use the account menu with the keyboard and close it with Esc.'
  - title: One date range in three places
    text: In analytics, the slider, the date fields and the page address show the same range. A change in one place updates the others right away, and the data reloads only a moment after the last change. The calendar won't let you set the start after the end, and the default range starts on the day the company registered.
  - title: A price table like a spreadsheet
    text: In supplier offer management, Enter moves to the same field in the row below, and Shift + Enter to the row above. The field's value is already selected, ready to overwrite. In 9 lists in the panel, Shift-click selects a whole range of rows, like in an email inbox.
  - title: An individual price without mistakes
    text: The individual price dialog checks the minimum net price, doesn't accept zero or an empty value, and suggests a default value for a single item. The price turns green when it's lower than or equal to the lowest price.
  - title: Tailwind v4 without rewriting templates
    text: Instead of changing hundreds of classes, I brought back three v3 values in the config. Then I compared the output CSS with the previous version, went through the pages and fixed regressions the build didn't report – for example dialogs that hid under their own backdrop after the migration.
---

AgrestApp is a purchasing system for food businesses: orders and tenders for raw materials, price monitoring, supplier offers and savings analytics. I've been working on it in the Pesi team since October 2025. Several people build the front-end in Vue 3 and Inertia, so below I only describe the parts where the front-end is mine. What I like most is that I can write many things my own way. I change the app in small steps: a new table here, a new button there, a header somewhere else. Each new element replaces a few older versions, so over time the project has fewer and fewer unnecessary components.

## What I did

- **Panel header** – a new header with the "Log in as" bar, an account menu and a shared dropdown component
- **UI component set** – buttons, an accordion, tooltips, number fields and 69 icons as Vue components; moving the app's buttons to one component and a shared theme toggle
- **Company website** – the "About the system" page, a set of sections used to build the pages for bakeries, confectioneries, ice cream shops and HoReCa, price tiles and a pricing page with a payment toggle
- **Analytics** – the main chart, the date range picker with a compare mode, top suppliers, the savings summary and product profitability
- **Supplier offer management** – extending an existing screen: the individual price dialog, adding items and moving between fields with Enter
- **Range selection** – Shift-click in 9 lists in the panel (raw materials, products, prices, notifications and more)
- **Shop** (now closed) – a basket with each supplier's minimum order, buying without an account, order history and complaints
- **Migration to Tailwind CSS v4** for the whole project
