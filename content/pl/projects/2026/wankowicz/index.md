---
date: 2026-10-01
title: Liceum im. M. Wańkowicza – nowa wersja strony
description: 'Refaktor front-endu strony liceum: dostępność według WCAG 2.2, jeden widok na wersję polską i angielską, kolory przez tokeny pod tryb wysokiego kontrastu. Projekt w toku.'
image: /projects/2026/wankowicz/thumbnail.webp
tags: [html]
featured: false
draft: false
agency: Pesi
stack: [Laravel Blade, Alpine.js, Vue 3, Tailwind CSS v4]
note: Projekt w toku – nowa wersja nie jest jeszcze opublikowana. Refaktor robię na osobnej gałęzi, równolegle z bieżącymi zmianami na obecnej stronie.
facts:
  - value: '73 → 35'
    text: widoków stron – angielskie kopie zastąpione jednym widokiem na oba języki
  - value: '85 → 0'
    text: kolorów wpisanych na sztywno w szablonach – wszystkie przez tokeny
  - value: '692 → 53'
    text: rozmiarów w pikselach w klasach – reszta w rem, żeby tekst skalował się razem z ustawieniami
  - value: '88%'
    text: obecnego front-endu nowej wersji to mój kod
cover:
  desktop: /projects/2026/wankowicz/home-top.webp
  phone: /projects/2026/wankowicz/home-phone-top.webp
  width: 1440
  height: 900
  alt: Nowa wersja strony liceum – pierwszy ekran
compare:
  before:
    src: /projects/2026/wankowicz/old-home-top.webp
    width: 1440
    height: 900
    label: Przed · obecna wersja
    alt: Obecna strona liceum – pierwszy ekran
  after:
    src: /projects/2026/wankowicz/home-top.webp
    width: 1440
    height: 900
    label: Po · nowa wersja
    alt: Nowa wersja strony liceum – pierwszy ekran
  rows:
    - { label: Pliki widoków stron, before: '73', after: '35' }
    - { label: Kopie widoków dla wersji EN, before: '34', after: '0' }
    - { label: Kolory wpisane na sztywno, before: '85', after: '0' }
    - { label: Rozmiary w pikselach w klasach, before: '692', after: '53' }
  note: Liczby z kodu obu wersji (widoki Blade). Nowa wersja na osobnej gałęzi, zrzuty z wersji lokalnej.
ogImage: /og/projects/wankowicz-pl.jpg
galleryLead: Zrzuty z wersji lokalnej przed publikacją. Kliknij zrzut, żeby go powiększyć.
gallery:
  - src: /projects/2026/wankowicz/home-high-contrast-top.webp
    width: 1440
    height: 900
    alt: Tryb wysokiego kontrastu
    caption: Tryb wysokiego kontrastu – czarne tło, białe i żółte teksty, zdjęcie w tle ukryte
  - src: /projects/2026/wankowicz/home-en-top.webp
    width: 1440
    height: 900
    alt: Angielska wersja strony głównej
    caption: Wersja angielska – ten sam widok, teksty z plików językowych
  - src: /projects/2026/wankowicz/recruitment-full.webp
    full: true
    alt: Formularz rekrutacyjny w nowej wersji
    caption: Formularz rekrutacyjny, krok 1 – nowa wersja
  - src: /projects/2026/wankowicz/old-recruitment-full.webp
    full: true
    alt: Formularz rekrutacyjny w obecnej wersji
    caption: Formularz rekrutacyjny, krok 1 – obecna wersja
  - src: /projects/2026/wankowicz/home-full.webp
    full: true
    alt: Strona główna nowej wersji
    caption: Strona główna – cała
  - src: /projects/2026/wankowicz/content-page-full.webp
    full: true
    alt: Podstrona O nas
    caption: Podstrona z treścią – O nas
highlights:
  - title: Jeden widok na dwa języki
    text: Stara strona miała osobną kopię widoku dla wersji angielskiej. Teraz każda strona ma jeden widok, a teksty są w plikach językowych. Sekcję można ukryć tylko w jednym języku, a brakujące tłumaczenie pokazuje tekst polski.
  - title: Wysoki kontrast przez tokeny
    text: Tryb wysokiego kontrastu podmienia zmienne kolorów. Działa tylko wtedy, gdy żaden kolor nie jest wpisany na sztywno – dlatego wszystkie kolory przeszły na tokeny marki i skalę Tailwinda.
  - title: Tekst rośnie razem z układem
    text: Ustawienia dostępności zmieniają rozmiar tekstu do 200%. Rozmiary, odstępy i szerokość treści są w rem, więc cały układ rośnie razem z tekstem, a linia nie robi się za długa.
  - title: Zasady dla całego zespołu
    text: Konwencje refaktoru spisałem w jednym pliku w repozytorium – rozmiary, kolory, tłumaczenia, ikony i lista kontrolna WCAG dla każdej nowej strony.
---

Strona liceum im. Melchiora Wańkowicza ma wersję polską i angielską oraz panel z ustawieniami dostępności: większy tekst, wysoki kontrast i czytelniejsze fonty. Przy obecnej wersji pracuję w zespole Pesi, a od lipca 2026 przygotowuję jej nową wersję. Refaktor robię na osobnej gałęzi, a strony porównuję obok siebie, bo szkoła cały czas dosyła zmiany do obecnej wersji.

## Co zmieniam

- **Dostępność według WCAG 2.2** – cel to poziom AAA, minimum AA: skalowanie tekstu do 200%, kontrast, obsługa z klawiatury, widoczny focus i rozmiar klikalnych elementów
- **Jeden widok na stronę** zamiast osobnych kopii dla języka angielskiego – teksty, adresy i dane kontaktowe w plikach językowych
- **Kolory przez tokeny** – zero kolorów wpisanych na sztywno, dzięki czemu tryb wysokiego kontrastu działa na całej stronie
- **Rozmiary w rem**, własne fonty bez zewnętrznych serwerów i jeden komponent ikon
- **Tailwind CSS v4** z konfiguracją w CSS i wspólna szerokość treści dla widoków Blade i komponentów Vue
