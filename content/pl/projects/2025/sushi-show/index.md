---
date: 2025-04-09
title: Sushi Show
description: Strona wzór dla Marcina, sushi mastera – warsztaty i szkolenia na pierwszym planie, catering obok. Nuxt 4, Tailwind CSS i szybkie ładowanie.
image: /projects/2025/sushi-show/thumbnail.webp
tags:
- vue
- nuxt
- tailwind
featured: false
links:
  live: https://lukaszdzielo.github.io/marcin-podlinski/
stack:
- Nuxt 4
- Vue 3
- Tailwind CSS 4
- '@nuxt/image'
note: Strona wzór – kontakt i ceny są przykładowe; na razie nie jest widoczna w Google.
facts:
- value: '95'
  suffix: /100
  text: wydajność na telefonie w Lighthouse
- value: '100'
  suffix: /100
  text: dostępność w Lighthouse
- value: '274'
  suffix: ' kB'
  text: pobiera strona główna na telefonie
- value: 2,7
  suffix: ' s'
  text: LCP na telefonie
cover:
  desktop: /projects/2025/sushi-show/first-screen.webp
  phone: /projects/2025/sushi-show/phone.webp
  width: 1440
  height: 900
  alt: Sushi Show – pierwszy ekran strony
ogImage: /og/projects/sushi-show-pl.jpg
galleryLead: 'Zrzuty całej strony – kliknij zrzut, żeby go powiększyć. Pomiary: Lighthouse 12.8, strona zbudowana lokalnie, telefon – Moto G Power, wolne 4G.'
gallery:
- src: /projects/2025/sushi-show/page-desktop.webp
  full: true
  alt: Sushi Show – cała strona na komputerze
  caption: Cała strona na komputerze – od warsztatów i terminarza po catering i kontakt
- src: /projects/2025/sushi-show/page-phone.webp
  device: phone
  alt: Sushi Show – cała strona na telefonie
  caption: Ta sama strona na telefonie
---

Marcina poznałem w jednej z restauracji sushi. Podziwiałem, z jakim sercem przykłada się do swoich potraw, i powiedziałem mu kiedyś, że jeśli zechce się reklamować i rozwijać, chętnie pomogę. Tak powstał ten projekt – gotowa strona, którą Marcin może wykorzystać, kiedy zechce pokazać swoje warsztaty szerzej. Pierwszą wersję zrobiłem w Nuxt, kiedy uczyłem się Vue, więc to dla mnie projekt z sentymentem. Ostatnio go odświeżyłem i przyspieszyłem.

## Najważniejsze cechy

- Warsztaty i szkolenia na pierwszym planie – to na nich Marcinowi zależy najbardziej, catering jest obok
- Terminarz najbliższych warsztatów z arkusza Google – przeszłe terminy chowają się same, widać maks. 4 najbliższe
- Zdjęcia w AVIF z zapasowym WebP, w 2–3 szerokościach, generowane przy budowaniu strony
- Galeria zdjęć z warsztatów z powiększeniem na cały ekran
- Formularz kontaktowy przez Web3Forms – bez klucza otwiera program pocztowy z gotową wiadomością
- Wymiary zdjęć zapisane w kodzie (strona nie skacze przy ładowaniu) i kontrast przycisków zgodny z WCAG AA
