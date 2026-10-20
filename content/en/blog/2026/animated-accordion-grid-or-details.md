---
date: 2026-12-01
title: 'An animated accordion: grid or <details>?'
description: First I built an expandable element on <details>, then I had to rewrite it on grid, because it had no animation. Today <details> can animate – what to choose and why.
tags:
- css
- html
- javascript
kind: post
project: /projects/2025/superauto
art: /art/blog/akordeon-grid-czy-details.svg
ogImage: /og/blog/akordeon-grid-czy-details-en.jpg
translationKey: akordeon-grid-czy-details
draft: false
---

When I worked on superauto.pl at Arris Agency, I had to build an element that expands on click. I built it on `<details>` and `<summary>` – a ready, native HTML element that works without JavaScript. After it went live, I was told to change it, because `<details>` opens and closes without animation. I remembered a technique I had once seen: animating grid rows. The situation is real, but the code below is simplified examples written for this post, not the code from the site. In the example, a list of car equipment expands.

## Why height doesn't want to animate

The simplest idea is to animate `height` from `0` to `auto`. It doesn't work: for years browsers couldn't move smoothly to an `auto` value, so the element changed its height in one jump. That's why workarounds appeared – for example `max-height` with a big number, or measuring the height in JavaScript.

## An accordion on grid

Grid can animate rows. A `0fr` row has zero height, and a `1fr` row is as tall as the content needs. The transition between them has worked in all major browsers since late 2022.

```html
<div class="accordion">
  <button type="button" class="accordion__toggle" aria-expanded="false" aria-controls="equipment">
    Equipment
  </button>
  <div class="accordion__panel" id="equipment">
    <div class="accordion__inner">
      <p>Air conditioning, parking sensors, reversing camera…</p>
    </div>
  </div>
</div>
```

```css
.accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden; /* collapsed content doesn't take focus and isn't read by a screen reader */
  transition: grid-template-rows 0.3s, visibility 0.3s;
}

.accordion__toggle[aria-expanded="true"] + .accordion__panel {
  grid-template-rows: 1fr;
  visibility: visible;
}

/* without this, the content sticks out of the collapsed row */
.accordion__inner {
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .accordion__panel {
    transition: none;
  }
}
```

JavaScript only switches `aria-expanded`. This attribute tells a screen reader whether the element is expanded, and CSS uses it for the animation:

```js
document.querySelectorAll('.accordion__toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true'
    button.setAttribute('aria-expanded', String(!isOpen))
  })
})
```

This approach has one cost: what `<details>` gives you for free, you have to add yourself – the button, `aria-expanded`, `aria-controls` and hiding the collapsed content.

## Today: `<details>` with animation

Since September 2025 all major browsers support `::details-content`. It's a pseudo-element that points to the content of `<details>` – everything except `<summary>`. Together with `interpolate-size`, which lets you animate to `auto`, the accordion goes back to native HTML:

```html
<details>
  <summary>Equipment</summary>
  <p>Air conditioning, parking sensors, reversing camera…</p>
</details>
```

```css
:root {
  interpolate-size: allow-keywords;
}

details::details-content {
  block-size: 0;
  overflow-y: clip;
  transition: block-size 0.3s, content-visibility 0.3s allow-discrete;
}

details[open]::details-content {
  block-size: auto;
}
```

There's one "but": `interpolate-size` works only in Chrome and Edge for now. In Firefox and Safari the element opens without animation – but it opens and works normally. If several elements share the same `name` attribute, for example `<details name="offer">`, only one of them can be open. This has worked in all major browsers since September 2024.

## What to choose

| | Grid | `<details>` |
|---|---|---|
| Animation | everywhere | Chrome and Edge for now |
| JavaScript | needed | not needed |
| Accessibility | you add it | built in |
| Only one open | in JavaScript | `name` attribute |

Today I would start with `<details>` and treat the animation as a bonus that will come to more browsers. I would choose grid where the animation has to work everywhere right now.

I put both approaches – the default version and a variant where only one element can be open – in one view on CodePen. You can run them here:

::code-pen{user="LukaszDev" slug="vExrgqy" url="https://codepen.io/editor/LukaszDev/pen/01a15a92-8abc-7da6-9de0-30d95aa85954" title="Accordion – grid and details"}
::

## What came out of it

- `<details>` is a good start: it works without JavaScript and has built-in accessibility.
- Animating grid rows (`0fr` → `1fr`) is a proven way to expand to the natural height.
- In the grid version you have to hide the collapsed content from the keyboard and screen readers too.
- `::details-content` and `interpolate-size` mean you have to choose between native HTML and animation less and less often.
