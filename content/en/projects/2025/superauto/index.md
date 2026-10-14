---
date: 2025-03-01
title: superauto.pl
description: 'My part of the site – three different carousels replaced with one Swiper component: the car gallery, a full-screen view and offer carousels.'
image: /projects/2025/superauto/thumbnail.webp
tags:
- javascript
- swiper
- twig
featured: false
agency: Arris Agency
stack:
- JavaScript
- Swiper
- Twig
note: A project at Arris Agency – I only show my part of the site.
facts:
- value: '1'
  text: carousel component instead of three different ones – one pattern for the whole site
- value: '4'
  text: extensions of the pattern – gallery with thumbnails, full-screen view, vehicles and small offers
- value: '2'
  text: steps of loading a photo – first a blurred preview, then full quality
- value: Swiper
  text: the library I suggested – images loaded in advance and easy editing
cover:
  desktop: /projects/2025/superauto/car-page.webp
  width: 1920
  height: 1080
  alt: superauto.pl – car page with a gallery and thumbnails
ogImage: /og/projects/superauto-en.jpg
galleryLead: Screenshots of the site – click one to see it bigger.
gallery:
- src: /projects/2025/superauto/car-page.webp
  width: 1920
  height: 1080
  alt: Car page with a gallery
  caption: Car page – gallery with thumbnails, arrows and a photo counter
- src: /projects/2025/superauto/gallery-fullscreen.webp
  width: 1920
  height: 1080
  alt: Full-screen gallery
  caption: Full-screen view – the same carousel pattern, thumbnails under the photo
- src: /projects/2025/superauto/offer-carousels.webp
  width: 1920
  height: 1080
  alt: Offer carousels
  caption: Offer carousels – model versions and "Others also viewed", each card has its own small gallery
---

superauto.pl is a site with car offers, also for leasing. At Arris Agency I made many changes there, and the biggest ordered rebuild was replacing several different carousels with one. I suggested Swiper – it loads images in advance and is easy to edit – and I built one bigger component that replaced three different carousels.

## What changed

- One carousel pattern instead of three different ones – easier to maintain and edit
- The car gallery with thumbnails as an extension of the pattern
- A full-screen photo view (lightbox) – the same carousel, bigger photos
- Carousels for vehicle cards and small offers – new offers load more smoothly after fetching data
- Photos load in two steps: first a blurred low-quality preview in the background, then the full version
- Video tiles that take you to the section of the offer with that video
