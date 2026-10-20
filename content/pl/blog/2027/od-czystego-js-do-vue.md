---
date: 2027-01-12
title: 'Od czystego JavaScriptu do Vue – co zmieniło się w mojej pracy'
description: Pokedex w czystym JavaScripcie, superauto.pl na szablonach Twig, a od 2025 roku Vue 3 na co dzień. Co zmieniły komponenty i dlaczego praca stała się trochę łatwiejsza.
tags:
- vue
- javascript
kind: post
art: /art/blog/od-czystego-js-do-vue.svg
ogImage: /og/blog/od-czystego-js-do-vue-pl.jpg
translationKey: od-czystego-js-do-vue
draft: false
---

Pokedex napisałem w czystym JavaScripcie – z klasami, zapytaniami do API i własnym kodem, który buduje widok. W superauto.pl w Arris Agency pisałem JavaScript do szablonów Twig. Od października 2025 roku w Pesi pracuję na co dzień w Vue 3. Mogę więc porównać, jak pracuje się bez frameworka i z nim. Kod poniżej to uproszczone przykłady napisane do tego tekstu.

## Piszę raz, potem pętla

Największa zmiana to komponenty. Nie muszę powtarzać tego samego kodu w wielu miejscach – piszę element raz, a potem używam go w pętli. W czystym JavaScripcie listę kart buduję sam i sam pilnuję, żeby po każdej zmianie danych narysować ją od nowa:

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
  render() // po każdej zmianie trzeba pamiętać o render()
}
```

W Vue kartę opisuję raz jako komponent, a listę – jedną pętlą `v-for`:

```vue
<script setup>
import { ref } from 'vue'
import FavoriteCard from './FavoriteCard.vue'

const favorites = ref([])

function add(item) {
  favorites.value.push(item) // widok odświeży się sam
}
</script>

<template>
  <ul>
    <FavoriteCard v-for="item in favorites" :key="item.id" :item="item" />
  </ul>
</template>
```

## Dane, które same odświeżają widok

Drugą rzeczą jest to, że łatwiej łapię elementy, a dane aktualizują się tak, jak potrzebuję. Nie szukam elementów na stronie przez `querySelector` i nie przepisuję ich treści ręcznie. Zmieniam dane, a Vue zmienia widok. Mniej kodu oznacza też mniej miejsc, w których mogę zapomnieć o odświeżeniu.

## Mniej plików do przejrzenia

Komponenty zmieniają też to, jak wygląda cały projekt. Łatwiej przejrzeć 20 plików i mieć dobry obraz całości niż 60, w których ten sam kawałek kodu jest skopiowany i zmiana jednego elementu dotyka wszystkich. Gdy przycisk albo karta jest komponentem, poprawiam ją w jednym miejscu.

## A minusy?

Pojawiło się trochę nowych zachowań, których trzeba było się nauczyć. Poza tym nie widzę wielu minusów. Praca stała się po prostu odrobinę łatwiejsza.

## Co z tego zostało

- Komponent piszę raz i używam go w pętli, zamiast kopiować ten sam kod.
- Zmieniam dane, a widok odświeża się sam – bez ręcznego szukania elementów.
- Mniej plików to lepszy obraz całego projektu i zmiany w jednym miejscu.
- Nowych zachowań trzeba się nauczyć, ale praca jest łatwiejsza niż wcześniej.
