---
date: 2026-11-24
title: 'The new pesi.pl – what actually made it faster'
description: Together with Claude Code, I rewrote the website of the company I work for, moving it from Laravel to WordPress. Its Lighthouse performance score on mobile went from 70–80 to 95–100. Less JavaScript helped the most – cleaning up icons didn't help at all.
tags:
- performance
- wordpress
- css
kind: case-study
art: /art/blog/nowa-pesi-pl.svg
ogImage: /og/blog/nowa-pesi-pl-en.jpg
project: /projects/2026/pesi-pl
translationKey: nowa-pesi-pl
draft: false
---

[pesi.pl](https://pesi.pl) is the website of Pesi – the company I work for. Until recently it ran on Laravel, and every change, including every blog post, was pasted in by someone from the front-end or back-end team, not by marketing. That's why I rewrote it in WordPress. Now marketing publishes posts on their own, sees more clearly what to focus on and can follow changes on the site more easily. Along the way the site became much faster. Below I describe what helped the most and what didn't help at all.

![The first screen of pesi.pl on a phone – the old version on the left, the new one on the right](/blog/2026/nowa-pesi-pl/strona-glowna-telefon.webp){width="1608" height="1340"}

## What bothered me on the old site

On the old site I saw a few things I wanted to fix: the menu jumped while the page was loading, some elements went outside the container, and on a phone the page was very long.

I don't like pages that go on forever – whether it's an article or a list I'm browsing. If I want to scroll down to the footer, why does the author make it hard? The footer has the contact details. If I can't get there, I just give up – and that means a lost client.

You can see how much shorter the pages are in the full-page screenshots from Lighthouse (phone, 412 px wide, the screen is 823 px tall):

| Page | Before | After |
|---|---|---|
| Home | 14,553 px (about 18 screens) | 10,058 px (about 12 screens) |
| About us | 10,895 px | 8,330 px |
| References | 14,686 px | 8,914 px |
| Websites | 12,566 px | 11,852 px |

## How I worked with Claude Code

Claude Code wrote the code of the new version – I didn't really change anything in the code myself. My part looked like this:

- **the plan** – the hardest part was thinking the whole thing through so that I wouldn't repeat the mistakes from the Laravel version,
- **the decisions** – which grids with many elements should become carousels on phones and tablets, how big each element should be, where it should go, what kind of component it is and whether we'll use it in other places; plus removing unused icons and having fewer elements on the home page,
- **the checks** – I spotted everything that didn't match visually and suggested changes to the look. Everything else I handed over to Claude Code.

With Claude Code, taking care of the look of the site was much easier. What took a lot of time was moving the whole portfolio and all the blog posts so that they kept their previous look. It worked, and now the person who writes an article can also mark who the author is. It's simple and intuitive, so I'm happy – both with myself and with Claude Code.

## The starting point: about 2 MB of JavaScript

On a phone, the old site loaded about 2 MB of JavaScript (sent over the network, after compression). Most of it wasn't the site's own code:

| Script | Size |
|---|---|
| reCAPTCHA – loaded right after opening the page | 880 kB |
| analytics and marketing tools | 569 kB |
| the Lottie animation player from a CDN | 379 kB |
| the site's code (Alpine.js, Splide carousels and the rest) | 139 kB |
| jQuery | 89 kB |

On a phone, the new version loads 35–39 kB of JavaScript. There's no jQuery, no Alpine.js and no carousel library – just a dozen small scripts, and each one loads only where it's needed.

## Heavy things only when they're needed

You can't remove everything: the form needs reCAPTCHA, and the home page has 3D cubes. But you can change the moment when they load:

- **reCAPTCHA** loads the first time someone uses the form, not when they open the page.
- **The 3D cubes** are a normal image at first – it's the largest element on the first screen (LCP). The WebGL scene (113 kB after compression) loads after the page has loaded, only on wider screens, and not when someone has reduced motion or data saving turned on.
- **The menu animations** (Lottie) load only when you hover over the menu.
- **A YouTube video** is just a thumbnail at first – the player loads after a click.

The cubes deserve a few more sentences. They are Pesi's three pillars and the first thing you see when you open the site. On the old site they were a static image – nothing moved. I wanted to bring them to life without slowing the site down. Today you can do that with Claude Code, but it wasn't easy: rotating the cubes in Three.js, setting them up the way they should stand, optimising the loading and placing them correctly on the page took 2–3 hours of talking to AI – just about this one element.

The idea is the same every time. This is how reCAPTCHA can load the first time someone uses the form (it's a simplified example, not the code from the site):

```js
// the reCAPTCHA script only on the first focus in the form
form.addEventListener('focusin', () => {
  const script = document.createElement('script')
  script.src = 'https://www.google.com/recaptcha/api.js?render=SITE_KEY'
  script.async = true
  document.head.append(script)
}, { once: true })
```

Unlike `focus`, `focusin` bubbles up the tree, so one listener on the form catches focus in every field. `{ once: true }` removes the listener after the first call, so the script is added only once.

The 3D scene works in a similar way – it loads only when all the conditions are met:

```js
// 782 px – from this width WordPress block columns sit side by side
const wide = matchMedia('(min-width: 782px)').matches
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
const saveData = navigator.connection?.saveData === true

if (wide && !calm && !saveData) {
  addEventListener('load', () => import('./cubes.js'), { once: true })
}
```

`navigator.connection` works only in Chromium-based browsers. In the others, `saveData` is simply `false`.

You can see the effect in Total Blocking Time – the time when the page doesn't react to taps and clicks because the browser is running scripts. On all four measured pages it went down from 108–178 ms to 0 ms.

## A carousel instead of a long list

On phones and tablets I turned a few grids with many elements into carousels. The kind where you can see right away that something goes past the edge of the screen and you can swipe or scroll it. Thanks to that, the page gets much shorter and the footer with the contact details is closer.

On the old site, the carousels were made with Splide, started by Alpine.js. Now a carousel is a block style: a normal group of blocks in WordPress gets a class, and every element inside it is a slide. You arrange the slides in the editor like any other content.

The browser does the scrolling itself – `overflow-x` and `scroll-snap` are enough:

```css
.carousel {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}

.carousel > * {
  flex: 0 0 85%; /* a part of the next slide shows at the edge */
  scroll-snap-align: start;
}
```

- `scroll-snap-type: x mandatory` – when you lift your finger, scrolling always stops at the start of a slide,
- `overscroll-behavior-x: contain` – scrolling to the end of the carousel doesn't scroll the page further and doesn't start the browser's "back" gesture,
- `flex: 0 0 85%` – a slide doesn't take the full width, so you can see there's another one next to it.

`scroll-snap` works in all major browsers today, so every element snaps into the right place. I only decide how big an element should be, where it goes and what kind of component it is. That's why there's much less code than with a library.

The script (3.5 kB, 2.6 kB together with the CSS after compression) only adds what CSS can't do: dots, a loop, autoplay and dragging with a mouse. On a phone you scroll with your finger, natively – no library catches your gestures. A few rows, for example the reviews on the home page, scroll sideways only on a phone and have no script at all – CSS alone is enough.

For accessibility, four things were important:

- the dots are buttons (`<button>`) with a label like "Show slide 2 of 5" and `aria-current` on the active one,
- the carousel has `role="region"` and `aria-roledescription`, and the slides have a label like "slide 1 of 5",
- the slide copies needed for the loop have `aria-hidden="true"` and `tabindex="-1"`, so neither a screen reader nor the Tab key gets to them,
- autoplay stops on hover, on focus, after a tap and in an inactive tab, and it's turned off when reduced motion is on in the system.

On superauto.pl I once suggested Swiper, because one carousel had to work in several places and load images in advance – I described it in the post [One carousel instead of three](/blog/2026/one-carousel-instead-of-three). Here the carousels are simpler, so the browser was enough.

## Less CSS and fewer requests

- **CSS:** 14–16 kB per page instead of 58–64 kB. In a block theme, WordPress loads styles only for the blocks that are on the page, and the theme's own stylesheets (carousel, forms, consent window) are added only where they're needed.
- **Requests:** 33–69 instead of 120–140.
- **Icons** aren't separate files – the server puts the used SVG icons straight into the HTML.
- **The font** Inter is on the site's own server: 3 WOFF2 files, and the two most important ones have `preload`.
- **Images:** thumbnails in AVIF and correct `sizes` on cards. The old site already had AVIF and WebP, so the difference here is small.
- **A small thing:** the WordPress emoji script is turned off.

## What didn't help at all: cleaning up icons

I removed 40 SVG files from the theme's icon library. 9 unused icons were replaced by animations, and 31 duplicates were merged into 2 files. The theme is 262 kB lighter, and the old icon names still work thanks to aliases, so the page content didn't need any fixes.

But it had no effect on the speed of the site – 0 kB of difference. The server only ever put the used icons into the HTML, so the unused files never reached the browser. The gain is somewhere else: there are fewer similar icons to choose from in the editor.

It's similar with the number of elements on the page (DOM). On the home page it went down from 1408 to 832 (−41%), and on the References page by 13%. About us has the same number of elements, and the "Websites" offer page has 18% more, because it has more sections. There are fewer elements where the page really became simpler.

## Results

Medians from 3 Lighthouse runs on mobile (default settings – a simulated slow network and a slow processor):

| Page | Performance | LCP | TBT | Page size |
|---|---|---|---|---|
| Home | 70 → 99 | 4.37 → 2.00 s | 178 → 0 ms | 2.6 MB → 362 kB |
| About us | 80 → 95 | 3.89 → 2.89 s | 131 → 0 ms | 2.5 MB → 335 kB |
| References | 74 → 100 | 4.36 → 1.10 s | 108 → 0 ms | 2.7 MB → 514 kB |
| Websites | 76 → 99 | 4.02 → 2.07 s | 173 → 0 ms | 2.5 MB → 279 kB |

On desktop (`--preset=desktop`), performance went up from 96–98 to 100. On all four pages, on mobile and on desktop, accessibility went up from 94–95 to 100 and best practices from 77 to 100. SEO was and still is at 100.

## The measurements and what you can't compare 1:1

- **Who and how:** Claude Code did the measurements too – Lighthouse 13, 3 runs per page, the table shows the median.
- **"After"** is the site in production.
- **"Before"** is copies of the old site from the Internet Archive (Wayback Machine), because the old version can't be run anymore. The archive has a different server, adds its own scripts (about 160 kB) and is missing some images. That's why I treat the "before" times and scores as approximate. The sizes in the table don't include the archive's scripts – they're more reliable than the times.
- **Analytics:** the new site doesn't have analytics and marketing tools yet, and the old one loaded about 570 kB of them. Without them, the old site still loaded about 1.5 MB of JavaScript – about 40 times more than the new one. When analytics comes back, I'll measure the site again.
- **Page heights** come from the full-page screenshots in the Lighthouse reports (phone, 412 × 823 px). The archived copies are missing some images, so the old pages may have been even longer in reality.
- **Lighthouse** simulates a slow phone, so the numbers are different from PageSpeed Insights and from data from real devices.

## Was it worth it

A website takes very long hours of work – not 15 minutes with AI and done, as you often hear. It was almost a whole month of work after hours, taking care of every detail. In my opinion it paid off: the site is fast and looks good.

## What I took from it

- Removing JavaScript that the page doesn't need on load helped the most: from about 2 MB to 35–39 kB, and Total Blocking Time went down to 0 ms.
- Load heavy things – reCAPTCHA, a 3D scene, the YouTube player – only when they're needed.
- A long page on a phone means a longer way to the contact details. A grid with many elements often works better as a carousel where you can see part of the next slide.
- A simple carousel doesn't need a library: the browser scrolls (`scroll-snap`), and the script only adds dots and autoplay.
- Cleaning up files in the theme doesn't make the site faster if only the used ones reach the browser anyway.
- Treat a comparison with an archived copy as approximate – sizes and the number of requests are more reliable than times.
