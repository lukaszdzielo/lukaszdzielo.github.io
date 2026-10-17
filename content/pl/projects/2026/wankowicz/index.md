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
note: 'Projekt w toku – nowa wersja nie jest jeszcze opublikowana. Porównuję ją z kodem, który zastałem: stan z 14.10.2025, ostatni przed moimi zmianami.'
facts:
  - value: '65 → 35'
    text: widoków stron – angielskie kopie zastąpione jednym widokiem na oba języki
  - value: '23 → 0'
    text: kolorów wpisanych na sztywno w szablonach – wszystkie przez tokeny
  - value: '353 → 53'
    text: rozmiarów wpisanych w pikselach, np. text-[15px] – reszta w rem, więc rośnie razem z powiększonym tekstem
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
    label: Przed · zanim dołączyłem (paź 2025)
    alt: Strona liceum w październiku 2025 – pierwszy ekran
  after:
    src: /projects/2026/wankowicz/home-top.webp
    width: 1440
    height: 900
    label: Po · nowa wersja
    alt: Nowa wersja strony liceum – pierwszy ekran
  rows:
    - { label: Pliki widoków stron, before: '65', after: '35' }
    - { label: Kopie widoków dla wersji EN, before: '31', after: '0' }
    - { label: Kolory wpisane na sztywno, before: '23', after: '0' }
    - { label: 'Rozmiary wpisane w px (np. text-[15px])', before: '353', after: '53' }
  note: 'Liczby z widoków Blade. Przed – kod z 14.10.2025, ostatni stan przed moimi zmianami; po – nowa wersja na osobnej gałęzi. Zrzuty z wersji lokalnych, aktualności w starej wersji pochodzą z dzisiejszej bazy.'
ogImage: /og/projects/wankowicz-pl.jpg
galleryLead: Zrzuty z wersji lokalnych – nowa wersja i kod z października 2025. Kliknij zrzut, żeby go powiększyć.
gallery:
  - src: /projects/2026/wankowicz/content-page-full.webp
    full: true
    alt: Podstrona O nas
    caption: Podstrona z treścią – O nas
  - src: /projects/2026/wankowicz/home-text-200-top.webp
    width: 1440
    height: 900
    alt: Tekst powiększony do 200% w nowej wersji
    caption: Nowa wersja – tekst 200%, nagłówek i przyciski rosną razem z treścią
  - src: /projects/2026/wankowicz/old-home-text-200-top.webp
    width: 1440
    height: 900
    alt: Tekst powiększony do 200% w wersji z października 2025
    caption: Wersja z października 2025 – tekst 200% dla porównania
  - src: /projects/2026/wankowicz/recruitment-full.webp
    full: true
    alt: Formularz rekrutacyjny w nowej wersji
    caption: Formularz rekrutacyjny, krok 1 – nowa wersja
  - src: /projects/2026/wankowicz/old-recruitment-full.webp
    full: true
    alt: Formularz rekrutacyjny w wersji z października 2025
    caption: Formularz rekrutacyjny – wersja z października 2025
  - src: /projects/2026/wankowicz/home-full.webp
    full: true
    alt: Strona główna nowej wersji
    caption: Strona główna – cała
  - src: /projects/2026/wankowicz/old-home-full.webp
    full: true
    alt: Strona główna w wersji z października 2025
    caption: Strona główna – wersja z października 2025, cała
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

Strona liceum im. Melchiora Wańkowicza ma wersję polską i angielską oraz panel z ustawieniami dostępności: większy tekst, wysoki kontrast i czytelniejsze fonty. Przy tej stronie pracuję w zespole Pesi od października 2025, a od lipca 2026 piszę jej front-end od nowa. Refaktor robię na osobnej gałęzi, bo szkoła cały czas dosyła zmiany do obecnej wersji. Strona miała sporo do poprawy w wyglądzie i działaniu – na szerokich ekranach się rozjeżdżała, a wiele komponentów mogło być jednym. Żeby nie zakopać się w kodzie, przepisuję ją etapami, sekcja po sekcji. Zacząłem od palety kolorów opartej na logo, a przy każdej sekcji sprawdzam WCAG. W trybie wysokiego kontrastu zostaje czarne tło, bo tak ustaliliśmy, ale na żółto są tylko linki i przyciski, a reszta tekstu jest biała – tak, jak zalecają wytyczne dostępności. Chcę, żeby szkoła dostała stronę, o którą zadbałem najlepiej, jak potrafię. Porównania poniżej pokazują kod i wygląd, które zastałem – stan z 14.10.2025.

## Co zmieniam

- **Dostępność według WCAG 2.2** – cel to poziom AAA, minimum AA: skalowanie tekstu do 200%, kontrast, obsługa z klawiatury, widoczny focus i rozmiar klikalnych elementów
- **Jeden widok na stronę** zamiast osobnych kopii dla języka angielskiego – teksty, adresy i dane kontaktowe w plikach językowych
- **Kolory przez tokeny** – zero kolorów wpisanych na sztywno, dzięki czemu tryb wysokiego kontrastu działa na całej stronie
- **Rozmiary w rem**, własne fonty bez zewnętrznych serwerów i jeden komponent ikon
- **Tailwind CSS v4** z konfiguracją w CSS i wspólna szerokość treści dla widoków Blade i komponentów Vue
