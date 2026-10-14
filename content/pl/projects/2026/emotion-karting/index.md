---
date: 2026-10-01
title: Emotion Karting
description: Projekt nowej strony toru kartingowego w Bytomiu – zrobiony z sympatii do toru, w wersji ciemnej i jasnej, ze sportowym pazurem.
image: /projects/2026/emotion-karting/page-dark.webp
tags:
- wordpress
featured: false
stack:
- WordPress
- Gutenberg
note: Na dziś projekt w HTML, CSS i JS – na WordPressie stanie, gdy tor zgodzi się na zmianę strony. Kod jest prywatny.
facts:
- value: '2'
  text: motywy – ciemny i jasny, jak w moim portfolio
- value: '4'
  text: widoki – strona główna, aktualności, wpis i wersja z animacjami
- value: '6'
  text: animacji, które bym zostawił – ślady opon, licznik statystyk, wjazd gokartów i inne
- value: '3'
  text: kroje pisma z serwera strony – Barlow, Barlow Condensed i JetBrains Mono, bez Google Fonts
cover:
  desktop: /projects/2026/emotion-karting/first-screen.webp
  width: 1440
  height: 900
  alt: Emotion Karting – pierwszy ekran nowej strony w wersji ciemnej
ogImage: /og/projects/emotion-karting-pl.jpg
compare:
  before:
    src: /projects/2026/emotion-karting/old-first-screen.webp
    width: 1440
    height: 900
    label: Przed · obecna strona
    alt: Obecna strona Emotion Karting – pierwszy ekran
  after:
    src: /projects/2026/emotion-karting/first-screen.webp
    width: 1440
    height: 900
    label: Po · mój projekt
    alt: Projekt nowej strony Emotion Karting – pierwszy ekran
  note: Po lewej zrzut obecnej strony z października 2026, po prawej mój projekt w wersji ciemnej.
galleryLead: Zrzuty z projektu – kliknij zrzut, żeby go powiększyć.
gallery:
- src: /projects/2026/emotion-karting/page-dark.webp
  full: true
  alt: Strona główna – wersja ciemna
  caption: Strona główna w wersji ciemnej – od hero ze zdjęciem toru do kontaktu
- src: /projects/2026/emotion-karting/page-light.webp
  full: true
  alt: Strona główna – wersja jasna
  caption: Ta sama strona w wersji jasnej
- src: /projects/2026/emotion-karting/news-dark.webp
  full: true
  alt: Aktualności
  caption: Aktualności – lista wpisów toru
- src: /projects/2026/emotion-karting/post-dark.webp
  full: true
  alt: Wpis
  caption: Pojedynczy wpis z aktualności
---

Lubię jeździć gokartami, a na torze Emotion Karting w Bytomiu byłem już wiele razy. Kiedy szukałem gokartów dla firmy, wszedłem na ich stronę i zobaczyłem, że część elementów się nie załadowała. Znam tam kilka osób, więc z czystej sympatii przygotowałem projekt nowej strony – na wypadek, gdyby chcieli się przenieść – i zaproponowałem optymalizację pod Google, taką jak przy ReblyX. Chciałem zachować sportowy pazur toru i wydaje mi się, że się udało.

## Najważniejsze cechy

- Sportowy charakter – mocna typografia, pomarańczowe akcenty i ślady opon w tle
- Dwa motywy – ciemny i jasny, jak w moim portfolio, żeby każdy mógł dopasować stronę do siebie
- Cennik, szkółka i aktualności – z osobnym widokiem listy wpisów i pojedynczego wpisu
- Wersja z animacjami: rysujące się ślady opon, licznik statystyk, wjazd gokartów i odsłanianie sekcji – tylko świateł startowych w hero bym nie zostawił
- Animacje wyłączają się, gdy ktoś ma w systemie włączone ograniczenie ruchu (prefers-reduced-motion)
- Czcionki dołączone lokalnie, bez Google Fonts
