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
note: Koncept zrobiony z własnej inicjatywy – kawiarnia go nie zamawiała. Kod napisał Claude Code – ja zaprojektowałem całość, narysowałem rysunki, decydowałem o animacjach i sprawdzałem każdy widok. Zdjęcia pochodzą z ich strony, a logo przerysowałem do wektora z ich pliku PNG. Rezerwacje i pozostałe podstrony czekają na decyzję lokalu.
facts:
  - value: '10'
    text: dni od pierwszego szkicu do gotowego podglądu (16–25.11.2026)
  - value: '123'
    text: commity w repo – od ekranu wyboru po optymalizację zdjęć
  - value: '7'
    text: moich rysunków przerysowanych do SVG – od sowy po zamek w stopce
  - value: '92–99'
    text: wydajność w Lighthouse na telefonie, a dostępność, dobre praktyki i SEO – 100
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
  - src: /video/projects/2026/alahamora/alahamora-miasta.mp4
    poster: /video/projects/2026/alahamora/alahamora-miasta-poster.webp
    title: Dwie magie obok siebie
    text: Po lewej Katowice – świetlik zapala latarnię. Po prawej Gliwice – światło różdżki odsłania kapelusz.
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
  - src: /video/projects/2026/alahamora/alahamora-telefony.mp4
    poster: /video/projects/2026/alahamora/alahamora-telefony-poster.webp
    title: Na telefonie
    text: Bez kursora latarnie zapalają się przy przewijaniu, a rysunki jaśnieją, gdy dojeżdżają do środka ekranu.
galleryLead: Zrzuty z działającego projektu – kliknij zrzut, żeby go powiększyć.
gallery:
  - src: /projects/2026/alahamora/page-gliwice.webp
    full: true
    alt: Alahamora Gliwice – cała strona z odsłoniętymi rysunkami
    caption: Gliwice – cała strona z wszystkimi rysunkami naraz. Na stronie widać je w świetle różdżki
  - src: /projects/2026/alahamora/page-katowice.webp
    full: true
    alt: Alahamora Katowice – cała strona z zapalonymi latarniami
    caption: Katowice – cała strona z wszystkimi latarniami zapalonymi naraz. Na stronie świeci ta, do której doleciał świetlik
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

Alahamora to magiczna kawiarnia z dwoma lokalami – w Gliwicach i w Katowicach. Ten projekt zrobiłem z własnej inicjatywy: chciałem pokazać, jak mogłaby wyglądać ich strona, gdyby oddawała klimat lokalu – antyki, portrety w złotych ramach i odrobinę magii. Każde miasto ma własne kolory i własną magię.

Uczę się Reacta, więc stronę zbudowałem w Next.js – jako stronę statyczną na GitHub Pages. Kod napisał Claude Code, ale nie powstał od jednego polecenia. Najpierw przez tydzień projektowałem obie wersje: kolory miast, ekran wyboru, latarnie, moje rysunki i miejsca, w których je schowałem. Potem w kodzie było dużo zmian – przejście z ekranu wyboru do strony miasta przerabiałem pięć razy, a ślady czarodzieja w Gliwicach kilka razy dopasowywałem do kolejnych szerokości ekranu.

Wyniki w Lighthouse na telefonie: Katowice (Lighthouse w Chrome) – wydajność 92, a dostępność, dobre praktyki i SEO – 100. Gliwice (PageSpeed Insights) – wydajność 99.

## Katowice i Gliwice – dwie różne magie

- Katowice (granat i złoto): przy nagłówkach wiszą latarnie. Przy przewijaniu świetlik leci łukiem do kolejnej latarni i ją zapala – pomysł wziął się z wygaszacza, którym Dumbledore w „Harrym Potterze” gasił i zapalał latarnie.
- Gliwice (zieleń i srebro): w pustych miejscach przy sekcjach ukryłem moje rysunki – kapelusz, kociołek z chochlikami, sowę i księgę ze skarpetą. Widać je dopiero w świetle różdżki, jak po zaklęciu Revelio.
- Wspólne: ekran wyboru z wejściem w obraz, kursor-różdżka, galeria w ramach, proporce z ofertą i mapa z OpenStreetMap w kolorach pergaminu, z lakową pieczęcią – bez skryptów i ciasteczek Google.

## Komputer i telefon

- Na komputerze kursor to różdżka ze światłem i iskrami, a proporce, ramy i przyciski reagują na najechanie.
- Na telefonie nie ma kursora: rysunki w Gliwicach jaśnieją, gdy są blisko środka ekranu, i pod palcem, latarnie w Katowicach wiszą nad nagłówkami, a efekty po najechaniu są wyłączone.
- Przy ograniczeniu ruchu animacje się zatrzymują, a latarnie po prostu świecą.
- Strona działa od 320 px, z menu w osobnym panelu.
