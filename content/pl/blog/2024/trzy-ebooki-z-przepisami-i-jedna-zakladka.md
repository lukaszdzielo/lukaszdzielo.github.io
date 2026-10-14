---
date: 2024-02-12
title: Trzy ebooki z przepisami i jedna zakładka w przeglądarce
description: Jak kilka ebooków z przepisami na kawę zamieniłem w jedną stronę z wyszukiwaniem po składnikach – i czego nauczyłem się przy tym o Vue 3 i TypeScripcie.
tags:
- vue
- typescript
- projekt
kind: post
project: /projects/2024/coffee-recipes
ogImage: /og/blog/coffee-recipes-pl.jpg
draft: false
---

Kupiłem ekspres do kawy. Razem z nim przyszedł mail z ebookiem z przepisami, drugi ebook dostałem za zapis do newslettera, a w ciągu miesiąca znalazłem jeszcze dwa–trzy kolejne. Brzmi jak raj dla kawosza – dopóki nie chcesz po prostu zrobić czegoś z tym, co masz w lodówce ☕

Bo jak szukać przepisu z miodem, skoro każdy ebook to osobny PDF, a każdy PDF trzeba przewinąć od początku do końca? Po kilku takich wieczorach uznałem, że wolę mieć wszystko w jednym miejscu, pod jednym linkiem w zakładkach.

## Najpierw dane, potem wygląd

Zacząłem od przepisania przepisów do pliku JSON: nazwa, zdjęcie, składniki, sposób przygotowania i lista tagów – czyli składników, po których da się szukać. Dziś są tam 22 przepisy i 33 składniki. Tłumaczenia interfejsu też trafiły do osobnego pliku, więc strona działa po polsku i po angielsku.

Dopiero na tych danych zbudowałem widok w Vue 3 – listę kart, okno z przepisem i wyszukiwarkę. Przy okazji ćwiczyłem TypeScript i starałem się jak najrzadziej sięgać po `any`.

## Jedno pytanie, dwie odpowiedzi

Najciekawsze okazało się samo wyszukiwanie. Gdy wybierasz „miód” i „mleko”, możesz pytać o dwie różne rzeczy:

- pokaż przepisy, które mają **wszystkie** te składniki,
- pokaż przepisy, które mają **co najmniej jeden** z nich.

Dlatego filtr ma oba tryby, a przepisy pasujące do wyboru są na górze listy – reszta zostaje niżej, żeby nie zgubić niczego z oczu.

## Link, który można wysłać

Wybrane składniki zapisuję w adresie strony. Dzięki temu przefiltrowaną listę można zapisać w zakładkach albo wysłać komuś w wiadomości – i po otwarciu linku od razu widać te same przepisy.

## Co z tego zostało

Projekt robiłem bez tutoriala w stylu „jak zrobić aplikację z przepisami” i do dziś uważam, że to był dobrze spędzony czas. Najwięcej nauczyłem się nie z samego Vue, tylko z myślenia o danych: co jest przepisem, co składnikiem, a co tylko tekstem do pokazania.

A ekspres? Działa codziennie. Strona też – [zajrzyj do Coffee Recipes](https://lukaszdzielo.github.io/coffee-recipes/).
