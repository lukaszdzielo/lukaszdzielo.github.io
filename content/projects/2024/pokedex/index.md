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
#   github: https://github.com/...   # TODO: uzupełnij link do repo
---

Interaktywna encyklopedia pokemonów obsługująca ponad 1000 stworzeń – napisana w czystym JavaScript (ES6+, wzorce OOP), bez frameworków, w oparciu o publiczne PokéAPI.

## Najważniejsze cechy

- Przemyślana kolejność ładowania danych z PokéAPI – równoległe zapytania przez `Promise.all`
- Lokalna baza w przeglądarce (`LocalStorage` + `SessionStorage`) – raz pobrane dane nie idą drugi raz do API
- Modułowa architektura klas (`DataManager`, `DataBuilder`, `StorageManager`, `PokemonDialog`) przygotowana pod migrację do Vue 3
- Responsywna, dwukierunkowo synchronizowana paginacja z odwzorowaniem stanu w URL
- Obsługa motywu jasnego/ciemnego bez efektu FOUC
