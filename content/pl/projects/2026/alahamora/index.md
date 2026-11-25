---
date: 2026-11-24
title: Alahamora
description: Koncept strony magicznej kawiarni w Gliwicach i Katowicach – z wejściem w obraz, latarniami, które zapalają się przy przewijaniu, i rysunkami, które odsłania kursor-różdżka.
image: /projects/2026/alahamora/first-screen.webp
tags: [react, javascript]
featured: false
links:
  live: https://lukaszdzielo.github.io/alahamora/
  github: https://github.com/lukaszdzielo/alahamora
stack: [Next.js, React, CSS, View Transitions, SVG]
note: Koncept zrobiony z własnej inicjatywy – kawiarnia go nie zamawiała. Zdjęcia pochodzą z ich strony, a logo przerysowałem do wektora z ich pliku PNG. Rezerwacje i pozostałe podstrony czekają na decyzję lokalu.
facts:
  - value: '3'
    text: widoki – wybór lokalu, Gliwice i Katowice (do tego strona 404)
  - value: '99'
    text: wydajność w Lighthouse na telefonie (PageSpeed Insights)
  - value: '7'
    text: moich rysunków przerysowanych do SVG – od sowy po zamek w stopce
  - value: '2'
    text: klimaty – zieleń ze srebrem w Gliwicach, granat ze złotem w Katowicach
cover:
  desktop: /projects/2026/alahamora/first-screen.webp
  phone: /projects/2026/alahamora/phone-gliwice.webp
  width: 1440
  height: 900
  alt: Alahamora Gliwice – pierwszy ekran strony
ogImage: /og/projects/alahamora-pl.jpg
motion:
  - src: /video/projects/2026/alahamora/alahamora-wejscie.mp4
    poster: /video/projects/2026/alahamora/alahamora-wejscie-poster.webp
    title: Wejście w obraz
    text: Po kliknięciu rama przybliża się, a zdjęcie płynnie przechodzi w górę strony lokalu – bez mrugnięcia i przeskoku.
  - src: /video/projects/2026/alahamora/alahamora-latarnie.mp4
    poster: /video/projects/2026/alahamora/alahamora-latarnie-poster.webp
    title: Latarnie w Katowicach
    text: Przy przewijaniu świetlik leci do latarni przy kolejnej sekcji i ją zapala.
  - src: /video/projects/2026/alahamora/alahamora-revelio.mp4
    poster: /video/projects/2026/alahamora/alahamora-revelio-poster.webp
    title: Rysunki pod różdżką w Gliwicach
    text: Kapelusz i notatki widać dopiero w świetle różdżki. Na telefonie pojawiają się, gdy są blisko środka ekranu.
  - src: /video/projects/2026/alahamora/alahamora-proporce.mp4
    poster: /video/projects/2026/alahamora/alahamora-proporce-poster.webp
    title: Proporce z ofertą
    text: Po najechaniu proporzec kołysze się na drążku razem z frędzlem, a nad nim migoczą świece.
  - src: /video/projects/2026/alahamora/alahamora-galeria.mp4
    poster: /video/projects/2026/alahamora/alahamora-galeria-poster.webp
    title: Galeria w ramach
    text: Każde zdjęcie ma inną ramę, która kołysze się na gwoździu. Na niektórych zdjęciach migocze światło lamp.
  - src: /video/projects/2026/alahamora/alahamora-lustra.mp4
    poster: /video/projects/2026/alahamora/alahamora-lustra-poster.webp
    title: Lustra z karuzelą
    text: Zdjęcie w lustrze przesuwa się za kursorem, a strzałki przewijają karuzelę.
galleryLead: Zrzuty z działającego projektu – kliknij zrzut, żeby go powiększyć.
gallery:
  - src: /projects/2026/alahamora/page-gliwice.webp
    full: true
    alt: Alahamora Gliwice – cała strona
    caption: Gliwice – cała strona, od wejścia do stopki z zamkiem
  - src: /projects/2026/alahamora/page-gliwice-revealed.webp
    full: true
    alt: Alahamora Gliwice – cała strona z odsłoniętymi rysunkami
    caption: Gliwice z odsłoniętymi rysunkami – zwykle widać je tylko w świetle różdżki
  - src: /projects/2026/alahamora/page-katowice.webp
    full: true
    alt: Alahamora Katowice – cała strona
    caption: Katowice – cała strona w granacie i złocie
  - src: /projects/2026/alahamora/phone-katowice.webp
    device: phone
    alt: Alahamora Katowice na telefonie
    caption: Katowice na telefonie
  - src: /projects/2026/alahamora/choose-location.webp
    width: 1440
    height: 900
    alt: Ekran wyboru lokalu – dwie ramy z obrazami Gliwic i Katowic
    caption: Wybór lokalu – ceglana ściana i dwie ramy z obrazami
  - src: /projects/2026/alahamora/not-found.webp
    width: 1440
    height: 900
    alt: Strona 404 – Tej komnaty nie ma na mapie
    caption: Strona 404 – „Tej komnaty nie ma na mapie”
highlights:
  - title: Wejście w obraz bez przeskoku
    text: Rama na ekranie wyboru przybliża się tak, że na końcu zdjęcie leży piksel w piksel jak u góry strony lokalu. Dopiero wtedy podmieniam stronę przez View Transitions, więc nic nie mruga.
  - title: Rysunki, które odsłania światło
    text: Rysunki to maski CSS z plików SVG, a ich jasność zależy od odległości od kursora. Na ekranach dotykowych zamiast kursora liczy się odległość od środka ekranu i miejsce dotknięcia.
  - title: Lekkie zdjęcia i grafiki
    text: Skrypt przy budowaniu robi z każdego zdjęcia AVIF i WebP w kilku szerokościach. Rysunki przeszły przez SVGO, a te poza ekranem wczytują się dopiero przy przewijaniu.
  - title: Efekty tylko tam, gdzie mają sens
    text: Efekty po najechaniu działają tylko z myszą, więc na telefonie po stuknięciu nic nie zostaje podświetlone. Kursora-różdżki nie ma na ekranach dotykowych i przy ograniczeniu ruchu.
---

Alahamora to magiczna kawiarnia z dwoma lokalami – w Gliwicach i w Katowicach. Ten projekt zrobiłem z własnej inicjatywy: chciałem pokazać, jak mogłaby wyglądać ich strona, gdyby oddawała klimat lokalu – antyki, portrety w złotych ramach i odrobinę magii. Każde miasto ma własny charakter. Gliwice są zielono-srebrne i mają w tle ukryte rysunki, które odsłania kursor-różdżka. Katowice są granatowo-złote, z latarniami, które zapalają się przy przewijaniu.

Uczę się Reacta, więc stronę zbudowałem w Next.js – jako stronę statyczną na GitHub Pages.

## Najważniejsze cechy

- Ekran wyboru lokalu – po kliknięciu rama przybliża się i płynnie przechodzi w zdjęcie u góry strony lokalu
- Kursor-różdżka ze światłem i iskrami
- Moje rysunki – sowa, kapelusz, kociołek z chochlikami i księga ze skarpetą – ukryte w Gliwicach w pustych miejscach między sekcjami
- Mapa z OpenStreetMap w kolorach pergaminu, z lakową pieczęcią w miejscu lokalu – bez skryptów i ciasteczek Google
- Wersja na telefon od 320 px, z menu w osobnym panelu
