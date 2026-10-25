---
date: 2027-03-09
title: 'aria-label and friends – when ARIA helps and when it gets in the way'
description: It is easy to add ARIA attributes "just in case", but used the wrong way they do more harm than no ARIA at all. Eight attributes I use in this portfolio – on real examples from the site.
tags:
- html
- accessibility
kind: post
art: /art/blog/aria-label-i-spolka.svg
ogImage: /og/blog/aria-label-i-spolka-en.jpg
translationKey: aria-label-i-spolka
draft: false
---

ARIA attributes tell a screen reader what you can't see in the HTML itself: the name of a button with only an icon, whether a menu is open, or which link leads to the current page. It is easy to add them "just in case", but used the wrong way they do more harm than no ARIA at all. Below are the attributes I use in this portfolio – each one with an example from the site.

## Plain HTML first

W3C starts its rules of using ARIA with this one: if a normal HTML element already has the meaning and behaviour you need, use it instead of adding ARIA.

```html
<!-- not like this -->
<div role="button" tabindex="0" onclick="open()">Menu</div>

<!-- like this -->
<button type="button">Menu</button>
```

`<button>` handles Enter and Space on its own, gets keyboard focus, and the screen reader announces it as a button. A `<div>` with `role="button"` only pretends to be a button – you have to add the rest in JavaScript. For the same reason I built my screenshot gallery on [the `<dialog>` element](/blog/2026/screenshot-gallery-on-dialog), not on my own modal.

## `aria-label` – a name for a button with only an icon

Under every post there are share links with only icons. Without a name, the screen reader would only say "link":

```html
<a href="https://www.linkedin.com/sharing/share-offsite/?url=…" aria-label="Share on LinkedIn">
  <svg aria-hidden="true">…</svg>
</a>
```

When a button has visible text, `aria-label` replaces it. Then you have to make sure the name contains what you can see – this is what WCAG 2.5.3 "Label in Name" says. The language switch in the header shows only "PL", and its name is "PL – wersja polska":

```html
<a href="/pl/wpisy/…" lang="pl" hreflang="pl" aria-label="PL – wersja polska">PL</a>
```

Someone who controls the page with their voice will say "click PL" – and it will work, because the name starts with the visible text. WCAG lists this as a good practice: the visible text at the start of the name.

## `aria-hidden` – an icon next to text

The "Copy link" button has an icon and text. The icon adds nothing, so I hide it from the screen reader:

```html
<button type="button">
  <svg aria-hidden="true">…</svg>
  Copy link
</button>
```

One rule: never put `aria-hidden="true"` on an element you can click or reach with the keyboard. The focus then lands on something the screen reader "can't see".

## `aria-expanded` and `aria-controls` – the menu on a phone

The menu button says whether the menu is open and which menu it opens:

```html
<button
  type="button"
  :aria-expanded="open"
  aria-controls="mobile-menu"
  :aria-label="open ? 'Close menu' : 'Open menu'"
  @click="open = !open"
>…</button>

<nav id="mobile-menu">…</nav>
```

`aria-expanded` has to change every time the menu opens and closes – otherwise the screen reader says something different from what you see on the screen. On top of that, two more things that are not ARIA, but without them the menu is hard to use with a keyboard:

- Esc closes the menu and moves the focus back to the button,
- the rest of the page gets the `inert` attribute, so Tab doesn't escape under the open menu.

## `aria-pressed` – buttons you turn on and off

In the project archive the filters work like switches. `aria-pressed` says which one is on, and the group has its own name:

```html
<div role="group" aria-label="Project type">
  <button type="button" :aria-pressed="kind === 'all'">All</button>
  <button type="button" :aria-pressed="kind === 'wordpress'">WordPress</button>
</div>
```

In Vue 3 the value `false` gives `aria-pressed="false"` in the HTML – and that's correct, because the screen reader then announces the button as "not pressed".

## `aria-current` – where am I

In the pagination, the link to the current page has `aria-current="page"`. The other links don't have this attribute at all:

```html
<a href="/blog/page/2" :aria-current="item === page ? 'page' : undefined">2</a>
```

Here `undefined` matters: in Vue 3 `null` and `undefined` remove the attribute, while `false` would leave `aria-current="false"`. In a group there should be only one element with `aria-current`.

## `aria-live` – a message you can't see

After you click "Copy link", the button text changes to "Link copied", but the screen reader doesn't announce changes in the content on its own. That's what an `aria-live` region is for:

```html
<p class="sr-only" aria-live="polite">{{ copied ? 'Link copied' : '' }}</p>
```

The region is on the page from the start and it is empty at first – only its content changes. An element added to the page together with the message may be read wrongly or not at all. `polite` waits until the screen reader finishes talking. The "3 / 12" counter in the screenshot gallery and the error message in the contact form work the same way. After the form is sent, it disappears, so there I move the focus to the thank-you heading – the screen reader reads it right away, and the keyboard focus doesn't fall back to the top of the page.

## `aria-labelledby` – a name that is already on the page

The banner that asks about statistics has a heading. Instead of repeating it in `aria-label`, I point to it by its `id`:

```html
<section aria-labelledby="consent-title">
  <h2 id="consent-title">Visitor statistics</h2>
  …
</section>
```

When I change the heading text, the name of the section changes with it.

## What I took from it

- Plain HTML first – `<button>`, `<a>`, `<nav>`, `<dialog>` – and ARIA only when HTML isn't enough.
- `aria-label` for elements without visible text; when the text is visible, the name has to contain it, best at the start.
- `aria-hidden` for icons next to text, never on an element that gets focus.
- `aria-expanded`, `aria-pressed` and `aria-current` change together with the state on the screen.
- An `aria-live` region is on the page from the start, only its content changes.
