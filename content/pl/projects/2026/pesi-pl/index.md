---
date: 2026-11-10
title: pesi.pl – nowa wersja strony
description: 'Strona firmy, w której pracuję: z Laravela na WordPressa z edytorem bloków, żeby marketing sam publikował wpisy. Lżejsza, krótsza na telefonie i z animowanymi kostkami 3D.'
image: /projects/2026/pesi-pl/thumbnail.webp
tags: [wordpress]
featured: false
draft: false
agency: Pesi
links:
  live: https://pesi.pl
stack: [WordPress, motyw blokowy, PHP, Three.js, CSS scroll-snap, bez jQuery]
note: 'Kod napisał Claude Code – ja planowałem całość, decydowałem o układzie i komponentach i sprawdzałem każdy widok. Wyniki „przed” zmierzone na kopii starej strony z archiwum internetowego.'
facts:
  - value: '70 → 99'
    text: wydajność strony głównej w Lighthouse na telefonie
  - value: '2 MB → 37 kB'
    text: JavaScriptu na stronie głównej na telefonie
  - value: '18 → 12'
    text: ekranów telefonu do przewinięcia na stronie głównej
  - value: '100'
    text: dostępność, dobre praktyki i SEO w Lighthouse na wszystkich mierzonych stronach
cover:
  desktop: /projects/2026/pesi-pl/home-top.webp
  phone: /projects/2026/pesi-pl/home-phone-top.webp
  width: 1440
  height: 900
  alt: Nowa strona pesi.pl – pierwszy ekran
compare:
  before:
    src: /projects/2026/pesi-pl/old-home-top.webp
    width: 1440
    height: 900
    label: Przed · strona na Laravelu
    alt: Stara strona pesi.pl – pierwszy ekran
  after:
    src: /projects/2026/pesi-pl/home-top.webp
    width: 1440
    height: 900
    label: Po · strona na WordPressie
    alt: Nowa strona pesi.pl – pierwszy ekran
  rows:
    - { label: Wydajność w Lighthouse, before: '70', after: '99' }
    - { label: JavaScript, before: '2055 kB', after: '37 kB' }
    - { label: CSS, before: '58 kB', after: '16 kB' }
    - { label: Waga strony, before: '2,6 MB', after: '362 kB' }
    - { label: Zapytania, before: '131', after: '47' }
    - { label: Total Blocking Time, before: '178 ms', after: '0 ms' }
    - { label: Wysokość strony (px), before: '14 553', after: '10 058' }
  note: 'Strona główna na telefonie, mediany z 3 przebiegów Lighthouse. Przed – kopia starej strony z Internet Archive (17.07.2026), wagi bez skryptów archiwum, czasy i oceny orientacyjne. Nowa strona nie ma jeszcze narzędzi analitycznych – stara ładowała ich ok. 570 kB.'
ogImage: /og/projects/pesi-pl-pl.jpg
highlights:
  - title: Marketing publikuje sam
    text: Wcześniej każdą zmianę i każdy wpis wklejał ktoś z frontu albo backendu. Teraz wpisy powstają w edytorze bloków, a w artykule można zaznaczyć, kto jest autorem.
  - title: Karuzele zamiast długich list
    text: Gridy z wieloma elementami są na telefonie i tablecie karuzelami na CSS scroll-snap. Widać kawałek następnego slajdu, a strona jest krótsza – do stopki z kontaktem jest bliżej.
  - title: Kostki 3D, które nie spowalniają
    text: Najpierw wczytuje się zwykłe zdjęcie, a scena Three.js dopiero po załadowaniu strony – tylko na szerszych ekranach i bez ograniczenia ruchu.
  - title: Skrypty dopiero wtedy, gdy są potrzebne
    text: reCAPTCHA wczytuje się przy pierwszym kontakcie z formularzem, odtwarzacz YouTube po kliknięciu miniatury, a animacje w menu po najechaniu.
---

pesi.pl to strona firmy, w której pracuję. Stara wersja działała na Laravelu i każdą zmianę – także każdy wpis na blogu – wklejał programista, a nie marketing. Przepisałem ją na WordPressa z motywem blokowym, żeby marketing mógł sam publikować i łatwiej śledzić zmiany na stronie. Kod napisał Claude Code. Ja przemyślałem całość tak, żeby nie powtórzyć błędów z wersji na Laravelu, decydowałem o układzie i komponentach i sprawdzałem każdy widok. Przeniosłem też realizacje i wszystkie wpisy z bloga tak, żeby zachowały dotychczasowy wygląd.

Najbardziej zależało mi na tym, żeby strona była lekka i nie ciągnęła się w nieskończoność na telefonie – w stopce jest kontakt, więc droga do niej powinna być krótka.
