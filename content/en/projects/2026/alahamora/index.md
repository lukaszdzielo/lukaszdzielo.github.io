---
date: 2026-11-24
title: Alahamora
description: A concept website for a magic café in Gliwice and Katowice – you step into a painting, lanterns light up as you scroll, and a wand cursor reveals hidden drawings.
image: /projects/2026/alahamora/first-screen.webp
tags: [react, javascript]
featured: false
links:
  live: https://lukaszdzielo.github.io/alahamora/
  github: https://github.com/lukaszdzielo/alahamora
stack: [Next.js, React, CSS, View Transitions, SVG]
note: A concept I made on my own initiative – the café did not order it. The photos come from their website, and I redrew the logo as a vector from their PNG file. Booking and the other subpages wait for the café's decision.
facts:
  - value: '10'
    text: days from the first sketch to the finished preview (16–25 Nov 2026)
  - value: '123'
    text: commits in the repository – from the first screen to image optimisation
  - value: '7'
    text: of my drawings redrawn as SVG – from an owl to the castle in the footer
  - value: '99'
    text: performance in Lighthouse on a phone (PageSpeed Insights)
cover:
  desktop: /projects/2026/alahamora/first-screen.webp
  phone: /projects/2026/alahamora/phone-gliwice.webp
  width: 1440
  height: 900
  alt: Alahamora Gliwice – the first screen of the website
ogImage: /og/projects/alahamora-en.jpg
motion:
  - src: /video/projects/2026/alahamora/alahamora-wejscie.mp4
    poster: /video/projects/2026/alahamora/alahamora-wejscie-poster.webp
    title: Stepping into the painting
    text: After a click, the frame zooms in and the photo turns smoothly into the top of the café's page – no blink, no jump.
  - src: /video/projects/2026/alahamora/alahamora-miasta.mp4
    poster: /video/projects/2026/alahamora/alahamora-miasta-poster.webp
    title: Two kinds of magic side by side
    text: On the left, Katowice – a firefly lights a lantern. On the right, Gliwice – the light of the wand reveals a hat.
  - src: /video/projects/2026/alahamora/alahamora-latarnie.mp4
    poster: /video/projects/2026/alahamora/alahamora-latarnie-poster.webp
    title: Lanterns in Katowice
    text: As you scroll, a firefly flies to the lantern by the next section and lights it.
  - src: /video/projects/2026/alahamora/alahamora-revelio.mp4
    poster: /video/projects/2026/alahamora/alahamora-revelio-poster.webp
    title: Drawings under the wand in Gliwice
    text: You see the hat and the notes only in the light of the wand. On a phone, they appear when they are close to the middle of the screen.
  - src: /video/projects/2026/alahamora/alahamora-proporce.mp4
    poster: /video/projects/2026/alahamora/alahamora-proporce-poster.webp
    title: Banners with the offer
    text: On hover, a banner swings on its rod together with its tassel, and candles flicker above it.
  - src: /video/projects/2026/alahamora/alahamora-galeria.mp4
    poster: /video/projects/2026/alahamora/alahamora-galeria-poster.webp
    title: A gallery in frames
    text: Every photo has a different frame that swings on its nail. In some photos, the lamp light flickers.
  - src: /video/projects/2026/alahamora/alahamora-lustra.mp4
    poster: /video/projects/2026/alahamora/alahamora-lustra-poster.webp
    title: Mirrors in a carousel
    text: The photo in a mirror follows the cursor, and the arrows scroll the carousel.
  - src: /video/projects/2026/alahamora/alahamora-telefony.mp4
    poster: /video/projects/2026/alahamora/alahamora-telefony-poster.webp
    title: On a phone
    text: Without a cursor, the lanterns light up as you scroll, and the drawings get brighter as they reach the middle of the screen.
galleryLead: Screenshots of the live project – click one to see it bigger.
gallery:
  - src: /projects/2026/alahamora/page-gliwice.webp
    full: true
    alt: Alahamora Gliwice – the whole page
    caption: Gliwice – the whole page, from the entrance to the footer with the castle
  - src: /projects/2026/alahamora/page-gliwice-revealed.webp
    full: true
    alt: Alahamora Gliwice – the whole page with the drawings revealed
    caption: Gliwice with the drawings revealed – usually you see them only in the light of the wand
  - src: /projects/2026/alahamora/page-katowice.webp
    full: true
    alt: Alahamora Katowice – the whole page
    caption: Katowice – the whole page in navy and gold
  - src: /projects/2026/alahamora/phone-katowice.webp
    device: phone
    alt: Alahamora Katowice on a phone
    caption: Katowice on a phone
  - src: /projects/2026/alahamora/choose-location.webp
    width: 1440
    height: 900
    alt: Choosing a café – two frames with paintings of Gliwice and Katowice
    caption: Choosing a café – a brick wall and two framed paintings
  - src: /projects/2026/alahamora/not-found.webp
    width: 1440
    height: 900
    alt: 404 page – This chamber is not on the map
    caption: The 404 page (in Polish) – “This chamber is not on the map”
highlights:
  - title: Into the painting without a jump
    text: The frame on the first screen zooms in until the photo sits pixel for pixel where it is at the top of the café's page. Only then does View Transitions swap the page, so nothing blinks.
  - title: Drawings revealed by light
    text: The drawings are CSS masks made from SVG files, and their brightness depends on the distance from the cursor. On touch screens, the distance from the middle of the screen and the touch point count instead.
  - title: Light photos and graphics
    text: At build time, a script makes AVIF and WebP files in a few widths from every photo. The drawings went through SVGO, and the ones off screen load only when you scroll to them.
  - title: Effects only where they make sense
    text: Hover effects work only with a mouse, so nothing stays highlighted after a tap on a phone. There is no wand cursor on touch screens or with reduced motion.
---

Alahamora is a magic café with two places – in Gliwice and in Katowice. I made this project on my own initiative: I wanted to show what their website could look like if it had the mood of the café – antiques, portraits in golden frames and a bit of magic. Each city has its own colours and its own magic.

I am learning React, so I built the website in Next.js – as a static site on GitHub Pages.

## Katowice and Gliwice – two kinds of magic

- Katowice (navy and gold): lanterns hang by the headings. As you scroll, a firefly flies in an arc to the next lantern and lights it – the idea came from the Deluminator, which Dumbledore used in “Harry Potter” to put out and light the street lamps.
- Gliwice (green and silver): I hid my drawings in empty spaces by the sections – a hat, a cauldron with imps, an owl and a book with a sock. You see them only in the light of the wand, like after the Revelio spell.
- Shared: a first screen where you step into a painting, a wand cursor, a gallery in frames, banners with the offer and a map from OpenStreetMap in parchment colours, with a wax seal – no Google scripts or cookies.

## Computer and phone

- On a computer, the cursor is a wand with light and sparks, and the banners, frames and buttons react on hover.
- On a phone, there is no cursor: the drawings in Gliwice get brighter near the middle of the screen and under your finger, the lanterns in Katowice hang above the headings, and hover effects are off.
- With reduced motion, the animations stop and the lanterns simply shine.
- The website works from 320 px, with the menu in a separate panel.
