---
date: 2027-01-26
title: 'A website on an ultrawide screen – why I always set a max width'
description: I work on an ultrawide monitor, and I see how sites without a max width stretch text and photos from edge to edge. What breaks and how to fix it with a few lines of CSS.
tags:
- css
- html
kind: post
art: /art/blog/strona-na-panoramicznym-ekranie.svg
ogImage: /og/blog/strona-na-panoramicznym-ekranie-en.jpg
translationKey: strona-na-panoramicznym-ekranie
draft: false
---

I work on a 3440 × 1440 px ultrawide monitor every day. Most websites look fine on it – as long as the content stops somewhere. It gets worse when text runs from the left edge to the right one and photos stretch together with the screen. Reading is simply uncomfortable for me then. It is easy to miss, because websites are often designed and tested only on 1440–1920 px screens. I built the examples below from scratch on a made-up pottery studio page, but these are the same mistakes I often see on the web.

## What it looks like at 3440 px

The same page without a max width, on a 3440 px wide screen – this is how I see it on my monitor:

![Page without a container at 3440 px – text from edge to edge, an enlarged banner and a big photo with text in the middle](/blog/2027/strona-na-panoramicznym-ekranie/without-container-3440.webp){width="1400" height="852"}

What doesn't work here:

- The intro paragraph is more than 3300 px wide. When you finish one line, it is hard to find the start of the next one.
- The banner has a fixed height of 420 px and the width of the whole screen. The file is 800 px wide, so the browser enlarges it more than four times – you can see the pixels right away.
- In the half-and-half section the photo scales with the column and ends up 1664 × 1248 px. The text next to it sits in the middle of the photo, with 553 px of empty space above and below.

![Close-up of the banner – the edge of the hill has visible steps from enlarged pixels](/blog/2027/strona-na-panoramicznym-ekranie/banner-zoom.webp){width="700" height="280"}

## A container: full-width background, but not full-width content

The most important change is a container with a max width. When I worked with Bootstrap, I used its `.container` class for this. In projects without Bootstrap I make my own `container` class or simply set `max-width`. Sections and their backgrounds can still go across the whole screen – only the content inside stops:

```css
.inner {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(16px, 9.24vw - 20px, 113px);
}
```

```html
<section class="section section--tinted">
  <div class="inner">…</div>
</section>
```

This portfolio works the same way: the background goes across the whole screen, and the content ends at 1440 px. The side margin grows smoothly – from 16 px on a phone to 113 px at 1440 px – thanks to one `clamp()`, without breakpoints in media queries.

## Line length

For long text a container is not enough – at 1440 px a paragraph across the whole container is still long. That's why text blocks get their own limit:

```css
.text {
  max-width: 65ch;
}
```

The `ch` unit is the width of the "0" character in the current font, so `65ch` is about 65 characters per line. In Tailwind the `max-w-prose` class does the same. Typographers usually recommend 45–75 characters as a comfortable line length.

I have to admit I haven't used `65ch` myself so far – I usually stopped at the container. In my posts the text column is simply 768 px wide, no matter how wide the screen is. A separate limit for paragraphs is something I want to use in my next projects.

## A photo with a fixed height

A banner with `height: 420px` and `object-fit: cover` looks good on a laptop, because the photo is only a little enlarged. On a wide screen the same photo has to fill more than 3000 px. Two things help:

- the banner stays in the container, so it is never wider than the container content (1214 px),
- the browser gets a bigger file to choose from – with `srcset` and `sizes`:

```html
<img
  class="banner"
  src="hills-1600.jpg"
  srcset="hills-800.jpg 800w, hills-1600.jpg 1600w, hills-2400.jpg 2400w"
  sizes="(min-width: 1440px) 1214px, 100vw"
  width="1600" height="900"
  alt="Hills at sunset">
```

At 1440 px the container has 1214 px of content, so on a 2× screen the browser will pick the 2400 px file. I wrote more about formats and `srcset` in the post about [AVIF, WebP and `<picture>`](/blog/2026/avif-webp-jpg-png-and-picture).

## A half-and-half section

A photo in half of the screen with `width: 100%` and `height: auto` grows together with the column – at 3440 px it is taller than the whole screen. The text next to it usually has `align-items: center`, so it lands in the middle of the photo, with huge gaps above and below. The fix is a few lines:

```css
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.split img {
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: 70vh;
  object-fit: cover;
}

.split .text {
  position: sticky;
  top: 32px;
}
```

- `align-items: start` – the text starts at the top, next to the top of the photo.
- `max-height: 70vh` – the photo is never taller than 70% of the browser window.
- `object-fit: cover` – instead of distorting the photo, the browser crops it. `object-position` sets which part stays visible.
- `position: sticky` – when the photo is taller than the text, the text stays in view while you scroll. It only works when no parent element has `overflow: hidden`.

The same page with a container, a line length limit and the fixed half-and-half section, again at 3440 px:

![Page with a container at 3440 px – content in the middle, text in a narrow column, a photo with a height limit and text at the top edge of the photo](/blog/2027/strona-na-panoramicznym-ekranie/with-container-3440.webp){width="1400" height="586"}

## How to check it without a wide monitor

- In the browser developer tools, turn on the responsive mode and set the width to 2560 or 3440 px – these are popular widths of ultrawide monitors.
- Or zoom out the page in the browser. At 50% a 1920 px wide screen behaves like a 3840 px wide one.

## What I took from it

- The background can go across the whole width, the content stays in a container with a max width.
- Text in a column of about 65 characters (`max-width: 65ch`).
- A photo shouldn't be shown wider than its file – a bigger file goes into `srcset`.
- In a half-and-half section: a height limit for the photo, text from the top and `position: sticky`.
- Before handing over a website, it is worth looking at it at 2560 and 3440 px.

The point is not to make a page look the same on a wide screen as on a laptop. It is enough that text and photos stop somewhere – the background can go further.
