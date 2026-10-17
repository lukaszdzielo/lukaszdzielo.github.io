---
date: 2026-09-01
title: ReblyX
description: Strona centrum obróbki stali – projekt i wdrożenie, treści edytowane w Gutenbergu.
image: /projects/2026/reblyx/thumbnail.webp
tags: [wordpress]
featured: false
links:
  live: https://reblyx.com
stack: [WordPress, Gutenberg, AVIF, bez jQuery]
facts:
  - value: '100'
    suffix: /100
    text: wydajność na telefonie w Lighthouse – było 72
  - value: '100'
    suffix: /100
    text: dostępność – było 62
  - value: '274'
    suffix: ' kB'
    text: pobiera strona główna – było 1,1 MB, ok. 4× mniej
  - value: '1,6'
    suffix: ' s'
    text: LCP na telefonie – było 5,0 s
cover:
  desktop: /projects/2026/reblyx/first-screen.webp
  width: 1440
  height: 900
  alt: ReblyX – pierwszy ekran nowej strony
ogImage: /og/projects/reblyx-pl.jpg
compare:
  before:
    src: /projects/2026/reblyx/old-first-screen.webp
    width: 1440
    height: 900
    label: Przed · Divi
    alt: Stara strona ReblyX na Divi – pierwszy ekran
  after:
    src: /projects/2026/reblyx/first-screen.webp
    width: 1440
    height: 900
    label: Po · Gutenberg
    alt: Nowa strona ReblyX na Gutenbergu – pierwszy ekran
  rows:
    - { label: Wydajność – telefon, before: '72', after: '100' }
    - { label: Wydajność – komputer, before: '96', after: '100' }
    - { label: Dostępność, before: '62', after: '100' }
    - { label: SEO, before: '92', after: '100' }
    - { label: LCP – telefon, before: '5,0 s', after: '1,6 s' }
    - { label: Przesunięcia układu (CLS), before: '0,152', after: '0' }
    - { label: Pobrane dane, before: '1,1 MB', after: '274 kB' }
  note: Lighthouse 13, strona główna. Telefon – Moto G Power, wolne 4G. Stara wersja mierzona lokalnie, nowa na serwerze, czyli w trudniejszych warunkach.
gallery:
  - src: /projects/2026/reblyx/page-desktop.webp
    full: true
    alt: Nowa strona ReblyX – cała strona główna
    caption: Nowa wersja (Gutenberg) – od pierwszego ekranu do formularza zapytania
  - src: /projects/2026/reblyx/old-page-desktop.webp
    full: true
    alt: Stara strona ReblyX – cała strona główna
    caption: Stara wersja (Divi) – usługi i formularz
---

ReblyX to centrum obróbki stali – projektowanie 3D, cięcie laserowe, gięcie, spawanie, cynkowanie i lakierowanie proszkowe. Ten projekt dostałem z polecenia – lubię takie zlecenia, bo to znak, że poprzednia praca się sprawdziła. Stara strona ReblyX stała na Divi: lista usług i formularz. Zaprojektowałem i zbudowałem nową na blokach Gutenberga, żeby właściciel mógł sam zmieniać treści w edytorze, bez proszenia mnie o każdą poprawkę.

## Co się zmieniło

- Zamiast Divi – bloki Gutenberga i bez jQuery
- Zdjęcia w formacie AVIF, w kilku rozmiarach – telefon nie pobiera obrazków dla dużego ekranu
- Fonty z serwera strony zamiast Google Fonts
- Nowe sekcje: sześć procesów, cztery powody, sześć kroków od zapytania do gotowego elementu, wskazówki przed zamówieniem i formularz zapytania
- Opis strony dla Google, etykiety pól formularza, lepszy kontrast i powiększanie na telefonie – w Lighthouse dostępność i SEO po 100
- Formularz zapytania chroniony przez reCAPTCHA
