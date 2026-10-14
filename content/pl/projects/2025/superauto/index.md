---
date: 2025-03-01
title: superauto.pl
description: 'Moja część serwisu – trzy różne karuzele zastąpione jednym komponentem na Swiperze: galeria auta, podgląd na cały ekran i karuzele ofert.'
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
note: Projekt w Arris Agency – pokazuję tylko swoją część serwisu.
facts:
- value: '1'
  text: komponent karuzeli zamiast trzech różnych – jeden wzorzec dla całego serwisu
- value: '4'
  text: rozszerzenia wzorca – galeria z miniaturami, podgląd na cały ekran, pojazdy i małe oferty
- value: '2'
  text: kroki ładowania zdjęcia – najpierw rozmyty podgląd, potem pełna jakość
- value: Swiper
  text: biblioteka, którą zaproponowałem – zdjęcia ładowane z wyprzedzeniem i prosta edycja
cover:
  desktop: /projects/2025/superauto/car-page.webp
  width: 1920
  height: 1080
  alt: superauto.pl – strona auta z galerią i miniaturami
ogImage: /og/projects/superauto-pl.jpg
galleryLead: Zrzuty z serwisu – kliknij zrzut, żeby go powiększyć.
gallery:
- src: /projects/2025/superauto/car-page.webp
  width: 1920
  height: 1080
  alt: Strona auta z galerią
  caption: Strona auta – galeria z miniaturami, strzałki i licznik zdjęć
- src: /projects/2025/superauto/gallery-fullscreen.webp
  width: 1920
  height: 1080
  alt: Galeria na cały ekran
  caption: Podgląd na cały ekran – ten sam wzorzec karuzeli, miniatury pod zdjęciem
- src: /projects/2025/superauto/offer-carousels.webp
  width: 1920
  height: 1080
  alt: Karuzele ofert
  caption: Karuzele ofert – wersje modelu i „Inni też oglądali”, każda karta ma własną małą galerię
---

superauto.pl to serwis z ofertami samochodów, także w leasingu. W Arris Agency wprowadziłem w nim sporo zmian, a największą zleconą przebudową było zastąpienie kilku różnych karuzel jedną. Zaproponowałem Swipera – ładuje zdjęcia z wyprzedzeniem i łatwo go edytować – i zbudowałem jeden większy komponent, który zastąpił trzy różne karuzele.

## Co się zmieniło

- Jeden wzorzec karuzeli zamiast trzech różnych – łatwiejszy w utrzymaniu i edycji
- Galeria auta z miniaturami jako rozszerzenie wzorca
- Podgląd zdjęć na cały ekran (lightbox) – ta sama karuzela, większe zdjęcia
- Karuzele kafelków z pojazdami i małych ofert – nowe oferty po pobraniu danych doładowują się płynniej
- Zdjęcia ładują się w dwóch krokach: najpierw rozmyty podgląd niskiej jakości w tle, po chwili pełna wersja
- Kafelki z wideo, które przenoszą do sekcji oferty z tym nagraniem
