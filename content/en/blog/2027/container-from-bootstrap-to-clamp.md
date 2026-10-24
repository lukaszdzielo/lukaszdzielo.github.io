---
date: 2027-02-09
title: 'The container – from Bootstrap to clamp()'
description: First Bootstrap's .container, then my own container with max-width, and today one clamp(). How my way of setting the side margin changed and why I like a fluid margin the most.
tags:
- css
kind: post
art: /art/blog/kontener-od-bootstrapa-do-clamp.svg
ogImage: /og/blog/kontener-od-bootstrapa-do-clamp-en.jpg
translationKey: kontener-od-bootstrapa-do-clamp
draft: false
---

In the previous post I wrote [why I always set a max width](/blog/2027/website-on-an-ultrawide-screen). This time a short post about how I set it – and how this changed for me. A container does two things: it stops the content on a wide screen and keeps it away from the edges on a narrow one. The second part, the side margin, is the one that changed the most.

## Bootstrap: `.container`, `.row` and `.col`

When I worked with Bootstrap, the layout almost always started the same way:

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">…</div>
    <div class="col-md-6">…</div>
  </div>
</div>
```

The container set the width of the content, and `row` and `col` split it into columns. In Bootstrap 5 `.container` is 100% wide up to 576 px, and then it has fixed widths at breakpoints:

| Screen width | `.container` width |
|---|---|
| below 576 px | 100% |
| from 576 px | 540 px |
| from 768 px | 720 px |
| from 992 px | 960 px |
| from 1200 px | 1140 px |
| from 1400 px | 1320 px |

Between breakpoints the container doesn't change – only the empty space on the sides grows. At 767 px the text is about 126 px from the screen edge, and at 768 px only 36 px. On a phone there are 12 px left – the container's padding.

## My own container: `max-width` and 100% minus 32 px

In projects without Bootstrap I make my own `container` class or simply set `max-width`. The width is 100% minus 32 px, so on a phone there are 16 px on each side:

```css
.container {
  width: calc(100% - 32px);
  max-width: 1200px;
  margin-inline: auto;
}
```

Today you can write the same thing in one line with `min()` – the browser takes the smaller of the two values:

```css
.container {
  width: min(100% - 32px, 1200px);
  margin-inline: auto;
}
```

There are no jumps here. The margin is 16 px until the content reaches 1200 px, and then it grows. But on a tablet and a small laptop it is still 16 px – at 1024 px the text is as close to the edge as on a phone.

## Tailwind: `container` has breakpoints too

In Tailwind the `container` class works in a similar way to Bootstrap: it is 100% wide, and its `max-width` changes at breakpoints – 640, 768, 1024, 1280 and 1536 px. The difference is that it doesn't center itself and has no padding. You add them with classes (`container mx-auto px-4`) or, in v4, once in CSS:

```css
@utility container {
  margin-inline: auto;
  padding-inline: 1rem;
}
```

I added them this way when I [moved AgrestApp to Tailwind v4](/blog/2026/tailwind-v4-in-a-big-project). The jumps between breakpoints are the same as in Bootstrap, though.

## `clamp()`: a margin without breakpoints

Today I like `clamp()` the most. It takes three values – a minimum, a preferred value and a maximum – and makes sure the result stays in that range:

```css
.container {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(16px, 9.24vw - 20px, 113px);
}
```

The margin is 16 px up to a screen width of about 390 px, then it grows together with the screen and reaches 113 px at 1440 px. At that point the content is 1214 px wide – the same as in the design of this portfolio.

### Where `9.24vw - 20px` comes from

I calculate the middle value from two points: at what screen width the margin should have its minimum, and at what width its maximum. For me it is 390 px → 16 px and 1440 px → 113 px:

- slope: (113 − 16) / (1440 − 390) ≈ 0.0924, so `9.24vw`,
- offset: 16 − 0.0924 × 390 ≈ −20 px.

The result is `9.24vw - 20px`. Inside `clamp()` you don't need `calc()` – you can write the maths directly.

In this portfolio the value is in Tailwind's `@theme` as `--spacing-pad`, in rem. Thanks to that I get classes like `px-pad` or `-mx-pad`:

```css
@theme {
  --spacing-pad: clamp(1rem, 9.24vw - 1.25rem, 7.0625rem);
}
```

## Comparison

The chart shows the distance from the screen edge to the text for the three ways from this post – from a phone up to 1440 px:

![Chart of the distance from the screen edge to the text: Bootstrap .container jumps at every breakpoint, min() stays at 16 px up to 1232 px, and clamp() grows evenly from 16 to 113 px](/blog/2027/kontener-od-bootstrapa-do-clamp/side-gap-en.webp){width="1400" height="960"}

| Screen | Bootstrap | `min()` | `clamp()` |
|---|---|---|---|
| 390 px | 12 px | 16 px | 16 px |
| 767 px | 126 px | 16 px | 51 px |
| 768 px | 36 px | 16 px | 51 px |
| 1024 px | 44 px | 16 px | 75 px |
| 1280 px | 82 px | 40 px | 98 px |
| 1440 px | 72 px | 120 px | 113 px |

## What I took from it

- Bootstrap's `.container` and Tailwind's `container` change their width at breakpoints – between them only the empty space on the sides grows.
- `width: min(100% - 32px, 1200px)` – one line instead of `calc()` and `max-width`.
- `clamp()` gives a margin that grows smoothly, without media queries.
- I calculate the middle value from two points: the smallest screen with the minimum and the biggest one with the maximum.

Breakpoints still make sense for the layout – for example when two columns turn into one. For the margin alone, one line is enough for me.
