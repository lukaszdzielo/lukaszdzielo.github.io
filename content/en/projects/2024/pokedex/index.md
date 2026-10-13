---
date: '2024-01-28'
title: 'Pokedex'
description: An interactive Pokedex with more than 1,000 Pokémon. I wrote it in vanilla JavaScript (OOP) and it uses PokéAPI – with a planned data loading order and a local database in the browser.
image: /projects/2024/pokedex/thumbnail.webp
tags: [javascript, vanilla-js, oop, pokeapi]
featured: false
draft: false
links:
  live: https://lukaszdzielo.github.io/pokedex/
#   github: https://github.com/...   # TODO: uzupełnij link do repo
---

An interactive Pokémon encyclopedia with more than 1,000 creatures. I wrote it in vanilla JavaScript (ES6+, OOP patterns), with no frameworks. The data comes from the public PokéAPI.

## Key features

- A planned loading order for PokéAPI data – parallel requests with `Promise.all`
- A local database in the browser (`LocalStorage` + `SessionStorage`) – the app gets the data from the API only once
- A modular class architecture (`DataManager`, `DataBuilder`, `StorageManager`, `PokemonDialog`), ready to move to Vue 3
- Responsive pagination, synced in both directions, with its state saved in the URL
- Light/dark theme support without FOUC
