---
date: 2027-01-12
title: 'From plain JavaScript to Vue – what changed in my work'
description: Pokedex in plain JavaScript, superauto.pl on Twig templates, and Vue 3 every day since 2025. What components changed and why my work became a bit easier.
tags:
- vue
- javascript
kind: post
art: /art/blog/od-czystego-js-do-vue.svg
ogImage: /og/blog/od-czystego-js-do-vue-en.jpg
translationKey: od-czystego-js-do-vue
draft: false
---

I wrote Pokedex in plain JavaScript – with classes, API requests and my own code that builds the view. On superauto.pl at Arris Agency I wrote JavaScript for Twig templates. Since October 2025 I've worked in Vue 3 every day at Pesi. So I can compare working without a framework and with one. The code below is simplified examples written for this post.

## I write it once, then loop

The biggest change is components. I don't have to repeat the same code in many places – I write an element once and then use it in a loop. In plain JavaScript I build a list of cards myself, and I have to make sure it's drawn again after every data change:

```js
const list = document.querySelector('#favorites')
const favorites = []

function render() {
  list.innerHTML = ''
  favorites.forEach((item) => {
    const card = document.createElement('li')
    card.className = 'card'
    card.textContent = item.name
    list.append(card)
  })
}

function add(item) {
  favorites.push(item)
  render() // after every change you have to remember render()
}
```

In Vue I describe the card once as a component, and the list with one `v-for` loop:

```vue
<script setup>
import { ref } from 'vue'
import FavoriteCard from './FavoriteCard.vue'

const favorites = ref([])

function add(item) {
  favorites.value.push(item) // the view updates by itself
}
</script>

<template>
  <ul>
    <FavoriteCard v-for="item in favorites" :key="item.id" :item="item" />
  </ul>
</template>
```

## Data that updates the view by itself

The second thing is that it's easier to get hold of elements, and the data updates the way I need. I don't look for elements on the page with `querySelector`, and I don't rewrite their content by hand. I change the data, and Vue changes the view. Less code also means fewer places where I can forget to update something.

## Fewer files to look through

Components also change how the whole project looks. It's easier to look through 20 files and have a good picture of the whole thing than through 60, where the same piece of code is copied and a change to one element touches all of them. When a button or a card is a component, I fix it in one place.

## What about the downsides?

Some new behaviour appeared that I had to learn. Apart from that, I don't see many downsides. My work simply became a little easier.

## What came out of it

- I write a component once and use it in a loop, instead of copying the same code.
- I change the data, and the view updates by itself – without looking for elements by hand.
- Fewer files mean a better picture of the whole project and changes in one place.
- There are new things to learn, but the work is easier than before.
