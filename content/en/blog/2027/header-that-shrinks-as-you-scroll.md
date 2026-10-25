---
date: 2027-02-23
title: 'A header that shrinks as you scroll – CSS instead of a scroll listener'
description: The bar at the top of the page gets smaller and less see-through as you scroll. I got there in three steps – a class, JavaScript and finally CSS alone with animation-timeline. JavaScript stays only as a fallback.
tags:
- css
- javascript
kind: post
art: /art/blog/pasek-menu-zweza-sie-przy-przewijaniu.svg
ogImage: /og/blog/pasek-menu-zweza-sie-przy-przewijaniu-en.jpg
translationKey: pasek-menu-zweza-sie-przy-przewijaniu
draft: false
---

While rebuilding a school website, I made a new menu. On a phone the header looked fine, but on a computer it was 150 px tall, and after you scrolled down it felt really heavy. I wanted it to get smaller smoothly as you scroll. I got there in three steps – from a simple class, through JavaScript, to CSS alone. The examples below are a simplified demo on a made-up school – the idea is the same as in the project.

![The header at the top of the page and after scrolling 400 px – the logo and spacing are smaller, and the background is solid white](/blog/2027/pasek-menu-zweza-sie-przy-przewijaniu/header-top-vs-scrolled.webp){width="1400" height="556"}

## First try: a class after scrolling

The simplest solution is a class that a script adds after the page has scrolled a bit. The class makes the padding smaller, and `transition` animates the change:

```js
window.addEventListener('scroll', () => {
  header.classList.toggle('is-small', window.scrollY > 100)
}, { passive: true })
```

```css
.header {
  padding-block: 2rem;
  transition: padding-block 0.3s;
}

.header.is-small {
  padding-block: 0.75rem;
}
```

I didn't like this animation. When you scrolled back to the top quickly, the header only then started to grow to its full height, and during that time you could see what was behind it. The header has two states, but scrolling is smooth – and you can see that.

## One number from 0 to 1

Instead of two states, I wanted the header to change together with the scroll. The whole mechanism is based on one variable: `--header-progress`. At the top of the page it is 0, after scrolling 400 px it is 1. The header padding and the background opacity are calculated from it:

```css
:root {
  --header-logo: 3rem;
  --header-pad-max: 0.75rem;
  --header-pad-min: 0.75rem;
  --header-progress: 0;
  --header-pad: calc(var(--header-pad-max) - (var(--header-pad-max) - var(--header-pad-min)) * var(--header-progress));
  --header-h: calc(var(--header-logo) + 2 * var(--header-pad));
  --header-bg-alpha: calc(80% + 20% * var(--header-progress));
}

@media (width >= 64rem) {
  :root {
    --header-logo: 4.5rem;
    --header-pad-max: 2rem;
  }
}
```

On a big screen the padding goes down from 32 px to 12 px, and the background goes from 80% to solid white. On a phone both paddings are the same, so the header doesn't get smaller – only the background changes.

The menu panel uses the same variable. Its height is the screen minus the current header height, so it always fits in the window:

```css
.nav__scroll {
  max-height: calc(100dvh - var(--header-h));
  overflow-y: auto;
}
```

## Second try: progress calculated in JavaScript

A script calculates the progress from 0 to 1. The header starts to shrink after 100 px and it takes another 300 px:

```js
let frame = null

const onScroll = () => {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = null
    const progress = Math.min(Math.max((window.scrollY - 100) / 300, 0), 1)
    document.documentElement.style.setProperty('--header-progress', progress.toFixed(3))
  })
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()
```

`requestAnimationFrame` makes sure the value is calculated at most once per frame, not on every `scroll` event. I read the position only inside the frame, so the last position of the page is never lost.

Now the header changed smoothly, together with the page. Everything seemed to work, but then I remembered that CSS alone can do this – lighter and with less code.

## Third try: scrolling drives a CSS animation

Today the browser can connect an animation to scrolling on its own. You only need a normal `@keyframes` animation and `animation-timeline: scroll()` instead of time:

```css
@property --header-progress {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

@keyframes header-shrink {
  from { --header-progress: 0; }
  to { --header-progress: 1; }
}

@supports (animation-timeline: scroll()) {
  :root {
    animation: header-shrink linear both;
    animation-timeline: scroll(root block);
    animation-range: 100px 400px;
  }
}
```

- `scroll(root block)` – the progress of the animation is the vertical scroll of the whole page.
- `animation-range: 100px 400px` – the animation starts after 100 px and ends after 400 px, the same as in the JavaScript version.
- `@property` – the variable has to be registered as a number. Without it the browser doesn't know how to animate it smoothly, and the value jumps from 0 to 1.

In this version I also removed the `transition` from the header background. The transition made the opacity change later than the scroll, and now the value changes exactly together with the page.

## JavaScript only as a fallback

Scroll-driven animations work in Chrome and Edge from version 115 and in Safari from version 26. Firefox turned them on by default only in version 159. For older browsers I kept the script from the second try, but it runs only when CSS can't do the job:

```js
const cssDriven = CSS.supports('animation-timeline: scroll()')

const onScroll = () => {
  if (cssDriven || frame) return
  // the rest is the same as above
}
```

Both versions set the same variable with the same range (100–400 px), so the rest of the CSS doesn't need to know where the value comes from.

## `fixed` instead of `sticky`

On the home page the header was `fixed` from the start, because it was meant to be see-through and to cover the big photo at the top of the page. On other pages it stood above the content, so it was `sticky`.

When I started to make the padding smaller, `fixed` was fine – the change didn't affect the rest of the page. With `sticky` it was different: the header takes space in the page layout, so every change of its height moves all the content under it. The page started to behave strangely. In the demo you can see it in numbers: after scrolling to 400 px, the browser moves the position back by about 19 px.

I decided it would be safer to make the header `fixed` on all pages and leave an empty element with the full header height under it:

```css
.header {
  position: fixed;
  inset-inline: 0;
  top: 0;
}

.header-spacer {
  height: var(--header-h-max); /* logo + 2 × the biggest padding */
}
```

The header gets smaller, and the content under it stays in place.

## Demo

You can run the whole demo – the header, the menu panel and the fallback script – here. In the bottom left corner you can see what calculates the progress: CSS or the fallback script.

::code-pen{user="LukaszDev" slug="xbqJQZj" url="https://codepen.io/editor/LukaszDev/pen/01a172ac-a2f1-7273-98a7-c65a7c3297a5" title="A header that shrinks as you scroll"}
::

## What I took from it

- A class with `transition` gives two states – when you scroll fast, you can see the header chasing the page.
- One variable from 0 to 1, and from it the padding, the background opacity and the height of the menu panel.
- `animation-timeline: scroll()` with `animation-range` – scrolling drives the animation without JavaScript.
- `@property` – without registering, the variable doesn't animate smoothly.
- JavaScript only as a fallback, when `CSS.supports()` returns `false`.
- A shrinking header works better as `fixed` with a full-height space under it, so the content doesn't jump.
