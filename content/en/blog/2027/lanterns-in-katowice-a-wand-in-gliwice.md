---
date: 2027-01-05
title: 'Lanterns in Katowice, a wand in Gliwice – two kinds of magic for one café'
description: Two places of the same café got different animations on the website. In Katowice, a firefly lights the lanterns as you scroll, and in Gliwice, you see the drawings only in the light of a wand cursor. I show how it works on a computer and on a phone.
tags:
- javascript
- css
- react
kind: case-study
art: /art/blog/latarnie-w-katowicach-rozdzka-w-gliwicach.svg
ogImage: /og/blog/latarnie-w-katowicach-rozdzka-w-gliwicach-en.jpg
project: /projects/2026/alahamora
translationKey: latarnie-w-katowicach-rozdzka-w-gliwicach
draft: false
---

Alahamora is a magic café with two places – in Katowice and in Gliwice. On my own initiative, I made a concept of their website. Each city has its own colours on it: Katowice is navy and gold, and Gliwice is green and silver. I wanted them to have different magic too. In Katowice, lanterns light up as you scroll. The idea came from the Deluminator, which Dumbledore used in “Harry Potter” to put out and light the street lamps. In Gliwice, my drawings are hidden in the background, and you see them only in the light of a wand – like after the Revelio spell.

::video-loop{src="/video/projects/2026/alahamora/alahamora-miasta.mp4" poster="/video/projects/2026/alahamora/alahamora-miasta-poster.webp" title="Katowice and Gliwice side by side" text="On the left, a firefly lights the lantern by the heading. On the right, the light of the wand reveals a hat above the heading."}
::

## Katowice: lanterns and a firefly

Lanterns hang on chains by the section headings – some on long chains, some on shorter ones. Only one is lit at a time: the last one that has crossed a line at 82% of the screen height, so it is about 18% into the screen. When the active lantern changes, the previous one goes out, and a firefly flies in an arc to the new one and lights it. The flight takes about 2 seconds, no matter how fast someone scrolls, so the firefly always flies at the same calm pace.

A simplified example (written from scratch, not the project's code) – which lantern is active and how the firefly flies:

```js
const LINE = 0.82

function activeLamp(lamps) {
  let active = null
  for (const lamp of lamps) {
    if (lamp.getBoundingClientRect().top < window.innerHeight * LINE) active = lamp
  }
  return active
}

function fly(orb, from, to, onEnd, duration = 2000) {
  const ease = t => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)
  const start = performance.now()
  requestAnimationFrame(function step(now) {
    const t = Math.min(1, (now - start) / duration)
    const k = ease(t)
    const x = from.x + (to.x - from.x) * k
    const y = from.y + (to.y - from.y) * k + Math.sin(Math.PI * k) * 80 // arc downwards
    orb.style.translate = `${x}px ${y}px`
    t < 1 ? requestAnimationFrame(step) : onEnd()
  })
}
```

## Gliwice: drawings in the light of the wand

On a computer, the cursor is a wand with light and sparks. My drawings – a hat, a cauldron with imps, an owl, a book with a sock, an envelope with a seal and a castle in the footer – are hidden in empty spaces by the sections. Outside the light, they are only 5% visible, and under the tip of the wand – 70%.

Each drawing has two masks on two elements. The inner element is a coloured shape cut out by the drawing from an SVG file. The outer one has a mask with a radial gradient, and I move its centre to where the cursor is. Each mask is on a separate element, so they work independently: one cuts out the shape, the other one the light.

```css
.drawing {
  background: currentColor; /* the drawing takes the city's accent colour */
  mask: var(--src) center / contain no-repeat;
}

.reveal {
  mask-image: radial-gradient(circle 290px at var(--x, -9999px) var(--y, -9999px),
    rgb(0 0 0 / .7), rgb(0 0 0 / .05) 78%);
}
```

JavaScript sets the position of the light: when the cursor moves, at most once per frame (`requestAnimationFrame`) and only for drawings close to the screen – an `IntersectionObserver` with a 300 px margin checks that.

```js
let x = -9999, y = -9999, frame = 0

function update() {
  frame = 0
  for (const el of nearScreen) {
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${x - r.left}px`)
    el.style.setProperty('--y', `${y - r.top}px`)
  }
}

addEventListener('pointermove', (e) => {
  x = e.clientX
  y = e.clientY
  frame ||= requestAnimationFrame(update)
}, { passive: true })
```

## Computer and phone

There is no cursor on a phone, so some effects work differently.

| | Computer | Phone |
|---|---|---|
| Wand | a cursor with light and sparks | none |
| Drawings in Gliwice | you see them in the light of the wand | they get brighter near the middle of the screen and under your finger |
| Lanterns in Katowice | next to the headings | above the headings |
| Hover effects | banners and frames swing, buttons shine | off – nothing stays highlighted after a tap |

::video-loop{src="/video/projects/2026/alahamora/alahamora-telefony.mp4" poster="/video/projects/2026/alahamora/alahamora-telefony-poster.webp" title="The same website on a phone" text="Katowice – the lanterns light up as you scroll. Gliwice – the hat and the cauldron get brighter as they reach the middle of the screen."}
::

When someone has reduced motion turned on in their system, the animations stop. There is no wand and no firefly flight, and the lanterns simply shine.

## Doesn't it slow the website down?

Drawings off screen load only when you scroll to them, and I calculate the light only for the ones close to the screen. On a phone, the Gliwice page gets 99 for performance in PageSpeed Insights, and the Katowice page gets 92 in Lighthouse in Chrome, with 100 for accessibility, best practices and SEO.

It took 10 days from the first sketch to the finished preview (16–25 November 2026). First, I spent a week designing the colours of both cities, the lanterns and the drawings. Then Claude Code wrote the code in Next.js, and I decided on every animation and checked every view – the repository has 123 commits, and I reworked the step from the first screen into a city page five times. The preview runs at [lukaszdzielo.github.io/alahamora](https://lukaszdzielo.github.io/alahamora/), and the screenshots and the other animations are on the [project page](/projects/2026/alahamora).
