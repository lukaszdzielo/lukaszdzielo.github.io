---
date: '2024-01-28'
title: 'Pokedex'
description: An interactive Pokedex covering more than 1,000 Pokémon, written in vanilla JavaScript (OOP) on top of PokéAPI – with a planned data loading order and a local database in the browser.
image: /projects/2024/pokedex/thumbnail.webp
tags: [javascript, vanilla-js, oop, pokeapi]
featured: false
draft: false
links:
  live: https://lukaszdzielo.github.io/pokedex/
  github: https://github.com/lukaszdzielo/pokedex
stack: [JavaScript (ES6+), OOP, PokéAPI, LocalStorage, no frameworks]
facts:
  - value: '2024'
    text: year built
  - value: Solo
    text: a personal project – from the idea to the release
  - value: '1000'
    suffix: '+'
    text: Pokémon from PokéAPI, about 60–70 requests instead of more than 1,000
  - value: Vanilla JS
    text: no Vue, React or other frameworks – my own classes in plain JavaScript
cover:
  desktop: /projects/2024/pokedex/list.webp
  phone: /projects/2024/pokedex/phone.webp
  alt: Pokedex – the Pokémon list with pagination
ogImage: /og/projects/pokedex-en.jpg
gallery:
  - src: /projects/2024/pokedex/list.webp
    alt: The Pokémon list with pagination
    caption: The list – more than 1,000 Pokémon, with the page number saved in the URL (?p=)
  - src: /projects/2024/pokedex/phone.webp
    device: phone
    alt: Pokedex on a phone – a Pokémon card
    caption: Phone – a Pokémon card open over the two-column list
  - src: /projects/2024/pokedex/pokemon-card.webp
    alt: The Pokémon details window
    caption: Pokémon card – name, types and generation come straight from memory, stats are loaded from the API
  - src: /projects/2024/pokedex/settings.webp
    alt: App settings
    caption: Settings – theme, import and export of caught Pokémon, clearing the data
---

An interactive Pokémon encyclopedia covering more than 1,000 creatures – written in vanilla JavaScript (ES6+, OOP patterns), with no frameworks, using the public PokéAPI.

## Key features

- A planned loading order for PokéAPI data – parallel requests with `Promise.all`
- A local database in the browser (`LocalStorage` + `SessionStorage`) – data is fetched from the API only once
- A modular class architecture (`DataManager`, `DataBuilder`, `StorageManager`, `PokemonDialog`) ready for a migration to Vue 3
- Responsive pagination synced in both directions, with its state reflected in the URL
- Light and dark theme (also automatic, following the system setting)
