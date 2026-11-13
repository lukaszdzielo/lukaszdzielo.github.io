---
date: 2027-04-06
title: 'A website the marketing team runs on its own – inside the pesi.pl block theme'
description: On the new pesi.pl, editors build pages from ready-made blocks, create pop-up windows in the editor, and the cookie banner works with Google Consent Mode. I describe the custom blocks, icons, department colours, windows on <dialog> and a few small things that make the work easier.
tags:
- wordpress
- html
- css
kind: case-study
art: /art/blog/strona-ktora-marketing-prowadzi-sam.svg
ogImage: /og/blog/strona-ktora-marketing-prowadzi-sam-en.jpg
project: /projects/2026/pesi-pl
translationKey: strona-ktora-marketing-prowadzi-sam
draft: false
---

In my first post about the new [pesi.pl](https://pesi.pl), I wrote about [what actually made the site faster](/blog/2026/the-new-pesi-pl). This one is about the other half of the goal: on the old site, every change and every blog post was pasted in by someone from the front-end or back-end team, not by marketing. The new site was meant to change that – marketing publishes on its own and can follow changes on the site more easily.

The site is a custom WordPress **block theme** (Full Site Editing). Editors build content in the block editor from ready-made blocks and theme styles, without a page builder. The offer is 12 service pages in 3 departments: Development, Design and Marketing. Claude Code wrote the code, just like for the rest of the site.

![The first screen of the new pesi.pl: the slogan "Razem zmieniamy cyfrowy świat" and three colourful 3D cubes](/blog/2027/strona-ktora-marketing-prowadzi-sam/strona-glowna.webp){width="1440" height="900"}

## Custom blocks instead of a page builder

The theme has 10 custom blocks (in the editor they have Polish names): Icon, Logo, PESI dots, Features, Lottie animation, 3D cubes, Reviews, Projects, Team mosaic and Post authors box.

Reviews, projects and authors are separate content types in the admin. The blocks only display them – as a carousel or a grid, with a choice of specific items, categories and a limit. So a review is added once and shown on the home page, on the offer pages and wherever it's needed.

## Icons and department colours

The "Icon" block has a library of 1,520 Phosphor icons and PESI's own icon graphics. An icon takes its colour from the text colour, so it fits the place where it is without a separate setting. In SVG, `currentColor` is all it takes:

```html
<!-- the icon inherits the text colour from its parent -->
<p style="color: #7c3aed">
  <svg viewBox="0 0 256 256" width="32" height="32" aria-hidden="true">
    <circle cx="128" cy="128" r="96" fill="currentColor"/>
  </svg>
  UI/UX Design
</p>
```

The department pages also get their own accent colour: Design – purple, Marketing – yellow, Development – blue. This happens automatically – editors don't set anything by hand.

![Services on the home page in three departments: tiles with icons, and a dot in the department's colour next to its name](/blog/2027/strona-ktora-marketing-prowadzi-sam/uslugi-ikony.webp){width="1280" height="1350"}

In the menu, the icons are animated – the theme has 16 Lottie animations, and each one plays when the icon is visible.

![The open "Oferta" (Offer) menu: three departments with an animated icon next to each service](/blog/2027/strona-ktora-marketing-prowadzi-sam/menu-oferta.webp){width="1440" height="560"}

## Windows that editors build in the editor

A pop-up window (modal) is a normal group of blocks with the "Okno (modal)" (Window) style and an anchor, for example `#bezplatna-analiza`. On the page, the group turns into a `<dialog>`, and any link to that anchor opens it – in a button, in the menu or in the text. So editors build a window in the editor like any other content, without a developer.

![The "Bezpłatna analiza Twojej strony" (Free website analysis) window with a form, opened by a link to its anchor](/blog/2027/strona-ktora-marketing-prowadzi-sam/okno-z-bloku.webp){width="920" height="880"}

This example shows the idea (simplified, not the code from the theme):

```js
// a link to the window's anchor opens the <dialog> instead of scrolling
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]')
  const dialog = link && document.getElementById(link.hash.slice(1))

  if (dialog instanceof HTMLDialogElement) {
    event.preventDefault()
    dialog.showModal()
  }
})
```

One listener on the whole document catches clicks on all links, including the ones editors add later. I wrote about `closest()` in the post [`:has()` and `closest()`](/blog/2027/has-and-closest), and about `<dialog>` itself in the post about the [screenshot gallery in my portfolio](/blog/2026/screenshot-gallery-on-dialog). Images in closed windows load only when they're needed.

## Cookie consent: a custom banner and Google Consent Mode

The cookie banner is also a custom `<dialog>`, with three categories: necessary, analytics and marketing. By default, everything except the necessary ones is off, and until consent is given, Google Tag Manager works without cookies (Google Consent Mode v2). You can change your choice with a link in the footer, and when the consent version changes, the banner shows up for everyone again.

![The cookie banner on the first visit – on a computer and on a phone: "Akceptuję wszystkie" (Accept all), "Odrzucam" (Reject) and "Ustawienia" (Settings)](/blog/2027/strona-ktora-marketing-prowadzi-sam/baner-zgod.webp){width="1414" height="844"}

The default "denied" has to be set before Google Tag Manager loads. In short:

```js
// before GTM loads: everything except necessary cookies – denied
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
})

// after consent to analytics cookies
gtag('consent', 'update', { analytics_storage: 'granted' })
```

Two things from Google load only after a click:

- **Google Maps** on the contact page – after clicking "Pokaż mapę" (Show map), because without the click there are no Google cookies,
- **YouTube videos** – first a thumbnail, and the player only after a click.

## SEO and authors

- An SEO plugin handles titles, descriptions, Open Graph and the sitemap, and the theme adds the company's structured data (LocalBusiness with the address and opening hours).
- Authors have their own profiles, and below each post there's a box with the author.
- The public author of the posts is the company name, not account logins – bots guess logins from the author's name.
- Old addresses, including PDF files, redirect to the new ones (301), and each redirect has a usage counter.

## Small things that make a difference

- **A stable scrollbar.** When the menu or a window opens, the page doesn't move sideways, because the space for the scrollbar is always reserved:

  ```css
  html {
    scrollbar-gutter: stable;
  }
  ```

- **No comments.** Comments, pingbacks and trackbacks are turned off for good.
- **Accessibility.** Windows and the banner are native `<dialog>` elements with labels, focus is visible, and the menu works with a keyboard. On the measured pages, Lighthouse gives 100 for accessibility.

## What I took from it

- A block theme with custom blocks gives editors freedom without a page builder.
- Content that appears in many places (reviews, projects, authors) is better kept as separate content types, with a block that only displays it.
- `currentColor` in SVG icons saves you from setting a colour on every icon.
- A window built in the editor and opened with a link to its anchor is a simple way to get modals without a developer.
- The default "denied" consent has to be set before Google Tag Manager loads.
- `scrollbar-gutter: stable` is one line of CSS, and the page stops jumping when windows open.
