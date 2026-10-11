---
date: '2024-01-28'
title: 'Pokedex'
description: Interaktywny Pokedex na ponad 1000 pokemonów w czystym JavaScript (OOP), oparty o PokéAPI — z warstwowym cache i redukcją zapytań HTTP o 93%.
# image: /projects/2024/pokedex/thumbnail.avif   # TODO: dodaj miniaturę do public/projects/2024/pokedex/
tags: [javascript, vanilla-js, oop, pokeapi]
featured: false
draft: false
# links:
#   github: https://github.com/...   # TODO: uzupełnij link do repo / demo
---

Interaktywna encyklopedia pokemonów obsługująca ponad 1000 stworzeń — napisana w czystym JavaScript (ES6+, wzorce OOP), bez frameworków, w oparciu o publiczne PokéAPI.

## Najważniejsze cechy

- Redukcja zapytań HTTP o ~93% dzięki `Promise.all` i warstwowemu cache (`LocalStorage` + `SessionStorage`)
- Modułowa architektura klas (`DataManager`, `DataBuilder`, `StorageManager`, `PokemonDialog`) przygotowana pod migrację do Vue 3
- Responsywna, dwukierunkowo synchronizowana paginacja z odwzorowaniem stanu w URL
- Obsługa motywu jasnego/ciemnego bez efektu FOUC
