---
date: '2024-01-28'
title: 'Pokedex'
description: Interaktywny Pokedex na ponad 1000 pokemonów w czystym JavaScript (OOP), oparty o PokéAPI – z przemyślaną kolejnością ładowania danych i lokalną bazą w przeglądarce.
image: /projects/2024/pokedex/thumbnail.webp
tags: [javascript, vanilla-js, oop, pokeapi]
featured: false
draft: false
links:
  live: https://lukaszdzielo.github.io/pokedex/
  github: https://github.com/lukaszdzielo/pokedex
stack: [JavaScript (ES6+), OOP, PokéAPI, LocalStorage, SCSS, bez frameworków]
facts:
  - value: '2024'
    text: rok realizacji
  - value: Solo
    text: projekt własny – od pomysłu po wdrożenie
  - value: '1000'
    suffix: '+'
    text: pokemonów z PokéAPI – kilkadziesiąt zapytań zamiast ponad 1000
  - value: Vanilla JS
    text: bez Vue, Reacta i innych frameworków – własne klasy w czystym JavaScript
cover:
  desktop: /projects/2024/pokedex/list.webp
  phone: /projects/2024/pokedex/phone.webp
  width: 1920
  height: 1105
  alt: Pokedex – lista pokemonów z paginacją
ogImage: /og/projects/pokedex-pl.jpg
gallery:
  - src: /projects/2024/pokedex/list.webp
    width: 1920
    height: 1105
    alt: Lista pokemonów z paginacją
    caption: Lista – ponad 1000 pokemonów, numer strony zapisany w adresie (?p=)
  - src: /projects/2024/pokedex/phone.webp
    device: phone
    alt: Pokedex na telefonie – karta pokemona
    caption: Telefon – karta pokemona otwarta nad listą w dwóch kolumnach
  - src: /projects/2024/pokedex/pokemon-card.webp
    width: 1920
    height: 1105
    alt: Okno szczegółów pokemona
    caption: Karta pokemona – nazwa, typy i generacja od razu z pamięci, statystyki dociągane z API
  - src: /projects/2024/pokedex/settings.webp
    width: 1920
    height: 1105
    alt: Ustawienia aplikacji
    caption: Ustawienia – motyw, import i eksport złapanych pokemonów, czyszczenie danych
---

Pokedex to mój pierwszy większy projekt w JavaScripcie. Pisałem go równolegle z kursem i chciałem zrobić coś trudniejszego niż kolejną listę zadań. Wyszła interaktywna encyklopedia ponad 1000 pokemonów – w czystym JavaScripcie (ES6+, wzorce OOP), bez frameworków, na publicznym PokéAPI. W trakcie co chwilę wpadałem na nowe pomysły – złapane pokemony, eksport między przeglądarkami, motywy – i nie zawsze kończyłem jeden, zanim zacząłem następny. Dlatego zrobiłem listę i zacząłem wdrażać zmiany etapami – każdy nowy pomysł trafiał na listę „do zrobienia”, zamiast odciągać mnie od tego, co akurat robiłem.

## Najważniejsze cechy

- Przemyślana kolejność ładowania danych z PokéAPI – równoległe zapytania przez `Promise.all`
- Lokalna baza w przeglądarce (`LocalStorage` + `SessionStorage`) – raz pobrane dane nie idą drugi raz do API
- Modułowa architektura klas (`DataManager`, `DataBuilder`, `StorageManager`, `PokemonDialog`) przygotowana pod migrację do Vue 3
- Responsywna, dwukierunkowo synchronizowana paginacja z odwzorowaniem stanu w URL
- Jasny i ciemny motyw (też automatyczny, według ustawień systemu)
- Złapane pokemony – zaznaczanie w karcie pokemona, import i eksport listy w ustawieniach
