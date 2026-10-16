---
date: 2026-10-16
title: 'AgrestApp headers: 36 px for a mouse, 44 px for a finger'
description: How I rewrote the AgrestApp website and panel headers in one day – one sliding menu, sizes that depend on how you use the page, and the header height in a CSS variable instead of numbers written in several files.
tags:
- tailwind
- vue
- accessibility
kind: case-study
project: /projects/2026/agrestapp
art: /art/blog/naglowki-agrestapp.svg
ogImage: /og/blog/naglowki-agrestapp-en.jpg
draft: false
---

AgrestApp has two headers: one on the company website and one in the panel after logging in. Both worked, but each was built in a different way, and the sizes came from random pixels. On 15 October I rewrote both. It took 8 commits and 40 changed files, and the old panel header (643 lines in one file) was replaced by three smaller components. The screenshots below are from a local version with made-up data.

## The menu on the company website

The old menu only worked on mouse hover. It had one group, "System Agrest", with submenus inside a submenu: Industries, Solutions and even Pricing. Widths and gaps were hard-coded (`w-[180px]`, `gap-[14px]`, `gap-[30px]`).

![The website menu bar – before the change on top, after at the bottom](/blog/2026/naglowki-agrestapp/site-header.webp){width="1400" height="184"}

The most important sections moved to the top level as separate groups, and Pricing became a normal link. The whole structure is in one list in `mainNav.js`. Both the desktop bar and the phone menu are built from it, so a new item doesn't need changes in two places.

![The open "System Agrest" group – before the change on top (a submenu inside a submenu), after at the bottom](/blog/2026/naglowki-agrestapp/site-dropdown.webp){width="1400" height="736"}

Instead of a separate list for each group, there is one panel. When you move between groups, it slides under the selected item and changes its width and height to fit the content. JavaScript calculates the position and size, and Tailwind only reads them from CSS variables:

```vue
<script setup>
// Panel position and size – calculated when a group opens
const panelBox = ref({ x: 0, width: 0, height: 0 })

const panelStyle = computed(() => ({
  '--panel-x': `${panelBox.value.x}px`,
  '--panel-w': `${panelBox.value.width}px`,
  '--panel-h': `${panelBox.value.height}px`,
}))
</script>

<template>
  <div
    :style="panelStyle"
    class="absolute translate-x-(--panel-x) w-(--panel-w) h-(--panel-h)
           transition-[translate,width,height] duration-200"
  >
    <!-- content of the active group -->
  </div>
</template>
```

The menu reacts to how you use it. A mouse opens a group on hover and closes it only 150 ms after leaving, so an imprecise movement doesn't close the panel. Touch toggles a group with a tap. The keyboard supports Enter, Esc and moving the focus out.

On the phone the groups are accordions, and the login buttons stay fixed at the bottom of the screen. Only the list scrolls.

![The phone menu – before the change on the left, after on the right](/blog/2026/naglowki-agrestapp/site-phone-menu.webp){width="796" height="844"}

## One size rule: mouse 36 px, touch 44 px

In the panel, the icon buttons had different sizes: 30, 36, 40, and the avatar 56 px. Now there is one rule. With a mouse the buttons are about 36 px, because the cursor is precise and a denser layout is comfortable. With touch they are 44 px, which is the minimum from WCAG 2.5.5.

I didn't use breakpoints for this, but the `pointer-coarse:` variant from Tailwind v4. So the size depends on the pointing device, not on the screen width. A tablet with a mouse gets 36 px, and a laptop with a touch screen gets 44 px.

```html
<!-- 18 px icon + padding: 36 px with a mouse, 44 px with touch -->
<button class="p-2 pointer-coarse:p-3 [&_svg]:size-4.5" aria-label="Notifications">
  <BellIcon />
</button>

<!-- menu item: height from padding, at least 44 px with touch -->
<a class="px-3 py-2 pointer-coarse:min-h-11">My company</a>
```

The same rule works in the account menu, in the website menu and in the search field (`h-9 pointer-coarse:h-11`). The menu button on the phone is always 44 × 44 px, so switching ☰ to × doesn't move the bar.

![The account menu – before the change on the left, after on the right](/blog/2026/naglowki-agrestapp/panel-account-menu.webp){width="1016" height="460"}

## The header height in one variable

A small change brought the most order. The sidebar and the sticky page bars in the panel sit under the header, so they need to know its height. Before, it was hard-coded: `top-[75px]`, and when an administrator was logged in as another company and the "Log in as" bar appeared above the header, `!top-[125px]`. The same condition was repeated in several files. One bar still hid 11 px under the header.

Now the "Log in as" bar is part of the header, and the header measures its own height and saves it in a CSS variable:

```vue
<script setup>
import { useElementSize } from '@vueuse/core'

const header = ref(null)
const { height } = useElementSize(header, undefined, { box: 'border-box' })

// Header height for the elements that sit under it
watch(height, (value) => {
  document.documentElement.style.setProperty('--header-height', `${value || 72}px`)
}, { immediate: true })
</script>
```

Every element under the header now has the same class, `top-(--header-height)`. It doesn't need to know if the "Log in as" bar is visible or how tall the header is on a given screen.

![The panel header – before the change on top (75 px), after at the bottom (72 px)](/blog/2026/naglowki-agrestapp/panel-header.webp){width="1440" height="122"}

![The panel on a phone with the sidebar open – before the change on the left, after on the right: only the logo mark and a close button](/blog/2026/naglowki-agrestapp/panel-phone.webp){width="796" height="560"}

## Scale values instead of pixels in brackets

Tailwind v4 accepts any multiple of 0.25rem, so most bracket values could become normal classes:

| Before | After |
|---|---|
| `h-[75px]` | `h-18` (72 px) |
| `w-[239px]` | `w-60` (240 px) |
| `py-[22px]` | `py-5.5` |
| `dark:bg-[#161e30]` | a colour from the project palette |

In the website bar one gap needed a fluid value. Between the logo, the menu and the buttons there is a `clamp()`, from 16 px at 1024 px width to 84 px at 1440 px. Thanks to this, the whole menu fits from 1024 px, without extra breakpoints.

## What I got from it

- One menu list for desktop and phone.
- One size rule (36 / 44 px) instead of several random ones.
- One variable with the header height instead of the numbers 75 and 125 in several files.
- A menu that works with a mouse, touch and the keyboard.

The website dropdown has the same spacing as the account menu in the panel. Both parts now look like one system, even though they are separate apps.
