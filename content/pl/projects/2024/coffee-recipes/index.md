---
date: 2024-01-28
title: Coffee Recipes
description: Przepisy na kawę z kilku ebooków w jednym miejscu – wyszukiwanie po składnikach, link z filtrami i dwa języki. Vue 3 i TypeScript.
image: /projects/2024/coffee-recipes/thumbnail.webp
tags:
- vue
featured: false
links:
  live: https://lukaszdzielo.github.io/coffee-recipes/
  github: https://github.com/lukaszdzielo/coffee-recipes
stack:
- Vue 3
- TypeScript
- Vite
- CSS
facts:
- value: '22'
  text: przepisy z kilku ebooków w jednym miejscu
- value: '33'
  text: składniki do wyszukiwania – z listy, bez wpisywania
- value: '2'
  text: tryby filtra – wszystkie wybrane składniki albo co najmniej jeden
- value: '2'
  text: języki – polski i angielski, zapamiętane w przeglądarce
cover:
  desktop: /projects/2024/coffee-recipes/recipe-list.webp
  width: 1920
  height: 1189
  alt: Coffee Recipes – lista przepisów przefiltrowana po składniku
ogImage: /og/projects/coffee-recipes-pl.jpg
gallery:
- src: /projects/2024/coffee-recipes/recipe-list.webp
  width: 1920
  height: 1189
  alt: Lista przepisów
  caption: Lista – przepisy z wybranym składnikiem na górze, pozostałe niżej
- src: /projects/2024/coffee-recipes/recipe.webp
  width: 1920
  height: 1189
  alt: Przepis
  caption: Przepis w oknie – składniki i sposób przygotowania
---

Po zakupie ekspresu do kawy dostałem mailem ebook z przepisami, drugi był za zapis do newslettera, a w ciągu miesiąca znalazłem jeszcze 2–3 kolejne. Zamiast szukać przepisu w kilku plikach PDF, zrobiłem jedno miejsce z całym zbiorem pod ręką – stronę na GitHub Pages, którą mam w zakładkach. Przy okazji uczyłem się Vue 3 i ćwiczyłem TypeScript – bez tutoriala w stylu „jak zrobić aplikację z przepisami”.

## Najważniejsze cechy

- Wyszukiwanie po składnikach z listy – przepisy z wybranymi składnikami na górze, pozostałe niżej
- Dwa tryby filtra: przepis ze wszystkimi wybranymi składnikami albo z co najmniej jednym
- Filtry zapisane w adresie strony – przefiltrowaną listę można komuś wysłać
- Przepis w oknie: zdjęcie, składniki i sposób przygotowania
- Polski i angielski, jasny i ciemny motyw oraz rozmiar czcionki – zapamiętane w przeglądarce
- Przepisy, składniki i tłumaczenia w plikach JSON, publikacja na GitHub Pages przez GitHub Actions
