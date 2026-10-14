---
date: 2024-01-28
title: Coffee Recipes
description: Coffee recipes from several ebooks in one place – search by ingredients, a link with filters and two languages. Vue 3 and TypeScript.
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
  text: recipes from several ebooks in one place
- value: '33'
  text: ingredients to search – picked from a list, no typing
- value: '2'
  text: filter modes – all selected ingredients or at least one
- value: '2'
  text: languages – Polish and English, saved in the browser
cover:
  desktop: /projects/2024/coffee-recipes/recipe-list.webp
  width: 1920
  height: 1189
  alt: Coffee Recipes – recipe list filtered by an ingredient
ogImage: /og/projects/coffee-recipes-en.jpg
gallery:
- src: /projects/2024/coffee-recipes/recipe-list.webp
  width: 1920
  height: 1189
  alt: Recipe list
  caption: List – recipes with the selected ingredient on top, the rest below
- src: /projects/2024/coffee-recipes/recipe.webp
  width: 1920
  height: 1189
  alt: Recipe
  caption: A recipe in a dialog – ingredients and how to make it
---

After I bought a coffee machine, I got an ebook with recipes by email, a second one for signing up to the newsletter, and within a month I found 2–3 more. Instead of searching for a recipe in several PDF files, I made one place with the whole collection at hand – a page on GitHub Pages that I keep in my bookmarks. At the same time I was learning Vue 3 and practising TypeScript – without a "how to build a recipe app" tutorial.

## Main features

- Search by ingredients from a list – recipes with the selected ingredients on top, the rest below
- Two filter modes: a recipe with all selected ingredients or with at least one
- Filters saved in the page address – you can send a filtered list to someone
- A recipe in a dialog: photo, ingredients and how to make it
- Polish and English, light and dark theme and font size – saved in the browser
- Recipes, ingredients and translations in JSON files, published on GitHub Pages with GitHub Actions
