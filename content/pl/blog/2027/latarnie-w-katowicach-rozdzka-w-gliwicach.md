---
date: 2027-01-05
title: 'Latarnie w Katowicach, różdżka w Gliwicach – dwie magie jednej kawiarni'
description: Dwa lokale tej samej kawiarni dostały na stronie różne animacje. W Katowicach świetlik zapala latarnie przy przewijaniu, a w Gliwicach rysunki widać dopiero w świetle kursora-różdżki. Pokazuję, jak to działa na komputerze i na telefonie.
tags:
- javascript
- css
- react
kind: case-study
art: /art/blog/latarnie-w-katowicach-rozdzka-w-gliwicach.svg
ogImage: /og/blog/latarnie-w-katowicach-rozdzka-w-gliwicach-pl.jpg
project: /projects/2026/alahamora
translationKey: latarnie-w-katowicach-rozdzka-w-gliwicach
draft: false
---

Alahamora to magiczna kawiarnia z dwoma lokalami – w Katowicach i w Gliwicach. Przygotowałem z własnej inicjatywy koncept ich strony. Każde miasto ma na niej własne kolory: Katowice granat i złoto, a Gliwice zieleń i srebro. Chciałem, żeby różniły się też magią. W Katowicach przy przewijaniu zapalają się latarnie. Pomysł wziął się z wygaszacza, którym Dumbledore w „Harrym Potterze” gasił i zapalał latarnie. W Gliwicach w tle są ukryte moje rysunki, które widać dopiero w świetle różdżki, jak po zaklęciu Revelio.

::video-loop{src="/video/projects/2026/alahamora/alahamora-miasta.mp4" poster="/video/projects/2026/alahamora/alahamora-miasta-poster.webp" title="Katowice i Gliwice obok siebie" text="Po lewej świetlik zapala latarnię przy nagłówku, po prawej światło różdżki odsłania kapelusz nad nagłówkiem."}
::

## Katowice: latarnie i świetlik

Przy nagłówkach sekcji wiszą latarnie na łańcuchach – długich i krótszych. Zapalona jest zawsze tylko jedna: ostatnia, która przekroczyła linię na 82% wysokości ekranu, czyli weszła mniej więcej 18% w głąb ekranu. Kiedy zmienia się aktywna latarnia, poprzednia gaśnie, a świetlik leci łukiem do nowej i ją zapala. Lot trwa około 2 sekund niezależnie od tego, jak szybko ktoś przewija, więc świetlik zawsze leci tak samo spokojnie.

Uproszczony przykład (napisany od zera, nie kod projektu) – która latarnia jest aktywna i jak leci świetlik:

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
    const y = from.y + (to.y - from.y) * k + Math.sin(Math.PI * k) * 80 // łuk w dół
    orb.style.translate = `${x}px ${y}px`
    t < 1 ? requestAnimationFrame(step) : onEnd()
  })
}
```

## Gliwice: rysunki w świetle różdżki

Na komputerze kursor to różdżka ze światłem i iskrami. Moje rysunki – kapelusz, kociołek z chochlikami, sowa, księga ze skarpetą, koperta z pieczęcią i zamek w stopce – są ukryte w pustych miejscach przy sekcjach. Poza światłem widać je tylko w 5%, a pod czubkiem różdżki w 70%.

Każdy rysunek ma dwie maski na dwóch elementach. Wewnętrzny element to kolorowa plama przycięta do kształtu rysunku z pliku SVG. Zewnętrzny ma maskę z gradientem radialnym, którego środek ustawiam w miejscu kursora. Każda maska jest na osobnym elemencie, więc działają niezależnie: jedna wycina kształt, druga światło.

```css
.drawing {
  background: currentColor; /* kolor rysunku = kolor akcentu miasta */
  mask: var(--src) center / contain no-repeat;
}

.reveal {
  mask-image: radial-gradient(circle 290px at var(--x, -9999px) var(--y, -9999px),
    rgb(0 0 0 / .7), rgb(0 0 0 / .05) 78%);
}
```

Pozycję światła ustawia JavaScript: przy ruchu kursora, najwyżej raz na klatkę (`requestAnimationFrame`) i tylko dla rysunków blisko ekranu – sprawdza to `IntersectionObserver` z marginesem 300 px.

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

## Komputer i telefon

Na telefonie nie ma kursora, więc część efektów działa inaczej.

| | Komputer | Telefon |
|---|---|---|
| Różdżka | kursor ze światłem i iskrami | brak |
| Rysunki w Gliwicach | widać je w świetle różdżki | jaśnieją, gdy są blisko środka ekranu, i pod palcem |
| Latarnie w Katowicach | obok nagłówków | nad nagłówkami |
| Efekty po najechaniu | proporce i ramy kołyszą się, przyciski błyszczą | wyłączone – po stuknięciu nic nie zostaje podświetlone |

::video-loop{src="/video/projects/2026/alahamora/alahamora-telefony.mp4" poster="/video/projects/2026/alahamora/alahamora-telefony-poster.webp" title="Ta sama strona na telefonie" text="Katowice – latarnie zapalają się przy przewijaniu. Gliwice – kapelusz i kociołek jaśnieją, gdy dojeżdżają do środka ekranu."}
::

Kiedy ktoś ma w systemie włączone ograniczenie ruchu, animacje się wyłączają. Nie ma różdżki ani lotu świetlika, a latarnie po prostu świecą.

## Czy to nie spowalnia strony?

Rysunki poza ekranem wczytują się dopiero przy przewijaniu, a światło liczę tylko dla tych, które są blisko ekranu. Na telefonie strona Gliwic ma w PageSpeed Insights 99 punktów wydajności, a strona Katowic w Lighthouse w Chrome – 92, i po 100 za dostępność, dobre praktyki i SEO.

Od pierwszego szkicu do gotowego podglądu minęło 10 dni (16–25.11.2026). Najpierw przez tydzień projektowałem kolory obu miast, latarnie i rysunki. Potem kod w Next.js pisał Claude Code, a ja decydowałem o każdej animacji i sprawdzałem każdy widok – w repo jest 123 commity, a samo przejście z ekranu wyboru do strony miasta przerabiałem pięć razy. Podgląd działa na [lukaszdzielo.github.io/alahamora](https://lukaszdzielo.github.io/alahamora/), a zrzuty i pozostałe animacje są na [stronie projektu](/pl/projekty/2026/alahamora).
