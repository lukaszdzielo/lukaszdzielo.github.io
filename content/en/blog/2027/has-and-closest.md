---
date: 2027-03-23
title: ':has() and closest() – reaching the parent in CSS and JavaScript'
description: For years CSS couldn't select a parent by what's inside it – today :has() does it. In JavaScript, closest() finds the nearest parent. When CSS is enough and when you still need a script – with examples from cards, forms and this portfolio.
tags:
- css
- javascript
kind: post
art: /art/blog/has-i-closest.svg
ogImage: /og/blog/has-i-closest-en.jpg
translationKey: has-i-closest
draft: false
---

For years CSS could only select elements down the tree: a parent changed its children, but not the other way round. If a card had to look different when it had something inside, you had to add a class to it in JavaScript – for example, by finding it with `closest()`. Today `:has()` often does the same in CSS alone. Below are both tools: where I used them and when I choose which one.

## `:has()` – a parent selected by what's inside it

I used `:has()` before I worked with Tailwind and Vue, on cards: a card got a border only when it had an element with a certain class inside. The situation is real, but the code below is an example – I changed the class names.

```css
.card {
  border: 1px solid transparent;
}

.card:has(.card__badge) {
  border-color: #2860ea;
}
```

I read `.card:has(.card__badge)` like this: a card that has `.card__badge` inside. The card gets the style, not the badge. Without `:has()` the card would need an extra class, for example `card--featured`, and you would have to keep it right in the HTML or in a script.

`:has()` checks all descendants. When only a direct child matters, add `>`: `.card:has(> .card__badge)`. MDN recommends this also because the browser has less to check.

## Not only cards

The same idea is useful in a few other places. These are examples worth knowing, not code from my project.

**A selected option.** A card with a radio button inside gets a border when the option is selected – no JavaScript:

```css
.option:has(input:checked) {
  border-color: #2860ea;
  background: #eef3ff;
}
```

**A field with an error.** The label and the hint change colour when the field has a wrong value. `:user-invalid` turns on only after someone changes the field, so the form isn't red as soon as you open the page:

```css
.field:has(input:user-invalid) label,
.field:has(input:user-invalid) .field__hint {
  color: #c10007;
}
```

**Stopping the page from scrolling.** When a `<dialog>` is open, the page behind it doesn't scroll:

```css
html:has(dialog[open]) {
  overflow: hidden;
}
```

I also showed this rule in [the screenshot gallery on `<dialog>`](/blog/2026/screenshot-gallery-on-dialog). But MDN advises against attaching `:has()` to `html`, `body` or `*`, because then every change on the page makes the browser check the selector again. On a small site it doesn't matter, but in a big app with many DOM changes it's worth measuring.

## `closest()` – the nearest parent in JavaScript

`closest()` searches up the tree: it starts with the element itself, then checks its parent, the parent's parent and so on. It returns the first element that matches the selector, or `null` when nothing matches.

It's most useful with clicks. `event.target` is the element that was actually clicked – with a button that has an icon, it can be the `<svg>` or `<path>`, not the button. `closest()` gives you the button right away:

```js
list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]')
  if (!button) return

  remove(button.dataset.id)
})
```

One listener on the whole list handles all the buttons – also the ones added later.

This is how scrolling to sections works in this portfolio. A click on a link to the place where you already are doesn't change the address, so the router doesn't scroll the page. One listener on the whole document catches these clicks, and `closest('a[href]')` finds the link even when you click the text or an icon inside it. A simplified version:

```js
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]')
  if (!link?.hash || link.hash !== location.hash) return

  // the same address – the router does nothing, so I scroll myself
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
  document.querySelector(link.hash)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
})
```

## A class from JavaScript or `:has()`?

In one of my earlier projects I used `closest()` to find the nearest parent of an element – if I remember correctly, to add a class to it. Today I think that example could be done with `:has()` in CSS alone. It all depends on one question: can you see the state that changes the parent's look in the HTML?

```js
// a class from JavaScript
checkbox.addEventListener('change', () => {
  checkbox.closest('.option').classList.toggle('is-selected', checkbox.checked)
})
```

```css
/* the same in CSS – the selection is visible in the HTML (:checked) */
.option:has(input:checked) {
  border-color: #2860ea;
}
```

- **Yes** – a checked input (`:checked`), an open dialog (`[open]`), an expanded menu (`[aria-expanded="true"]`), focus inside (`:focus-within`), a child with a class. Then `:has()` is enough: no script, and no need to check if the class keeps up with the state.
- **No** – the state exists only in JavaScript, for example a response from the server. Then the class stays in the script. In Vue it's usually `:class` in the template, so `closest()` is mostly useful in listeners outside components – like the scrolling in this portfolio.

## Support and limits

- `:has()` works in Chrome and Edge from version 105, in Safari from 15.4 and in Firefox from 121 – in all main browsers since December 2023.
- `:user-invalid` works in Chrome and Edge from version 119, in Safari from 16.5 and in Firefox from 88.
- You can't put `:has()` inside another `:has()`, and you can't use pseudo-elements like `::before` inside it.
- The specificity of `:has()` is the specificity of the most specific selector in the brackets – the same as with `:is()` and `:not()`.
- A browser that doesn't know `:has()` ignores the whole rule. When you need a fallback, use `@supports selector(:has(a))`.
- `closest()` has worked in all browsers for years. Just remember that it also checks the element it starts from.

## What I took from it

- `:has()` selects a parent by what's inside it – a card, an option, a form field.
- `>` inside `:has()` limits the check to direct children.
- `html:has()` and `body:has()` are handy, but in a big app it's worth measuring them.
- `closest()` finds the nearest matching element up the tree – together with one listener it handles the whole list.
- When the state is visible in the HTML, `:has()` is enough. When it exists only in JavaScript, the class stays in the script.
