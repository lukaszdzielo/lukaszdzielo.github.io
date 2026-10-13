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
#   github: https://github.com/...   # TODO: uzupełnij link do repo
---

An interactive Pokémon encyclopedia covering more than 1,000 creatures – written in vanilla JavaScript (ES6+, OOP patterns), with no frameworks, using the public PokéAPI.

## Key features

- A planned loading order for PokéAPI data – parallel requests with `Promise.all`
- A local database in the browser (`LocalStorage` + `SessionStorage`) – data is fetched from the API only once
- A modular class architecture (`DataManager`, `DataBuilder`, `StorageManager`, `PokemonDialog`) ready for a migration to Vue 3
- Responsive pagination synced in both directions, with its state reflected in the URL
- Light/dark theme support without FOUC
