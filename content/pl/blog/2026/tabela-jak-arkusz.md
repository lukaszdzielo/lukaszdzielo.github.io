---
date: 2026-03-14
title: 'Tabela jak arkusz: Shift + klik i Enter'
description: Dwa skróty znane z arkusza kalkulacyjnego w panelu AgrestApp – zaznaczanie zakresu wierszy przez Shift + klik i Enter, który przenosi do tego samego pola w wierszu niżej.
tags:
- vue
- javascript
kind: case-study
project: /projects/2026/agrestapp
art: /art/blog/tabela-jak-arkusz.svg
ogImage: /og/blog/tabela-jak-arkusz-pl.jpg
draft: false
---

W panelu AgrestApp jest dużo długich list: surowce, produkty, opakowania, ceny, powiadomienia. Przy takich listach najwięcej czasu zabiera klikanie wiersz po wierszu. Klient poprosił o dwa skróty, które każdy zna z arkusza kalkulacyjnego albo z poczty: Shift + klik zaznacza zakres wierszy, a Enter przenosi do tego samego pola w wierszu niżej. Chodziło o to, żeby zaznaczyć kilka pozycji i edytować je naraz, a nie produkt po produkcie, i żeby ceny aktualizować w jednej tabeli, jak w Excelu. Zrzuty poniżej są z lokalnej wersji na zmyślonych danych. Kod we wpisie to uproszczone przykłady napisane do tego tekstu, a nie kod z AgrestApp.

## Shift + klik: zaznaczanie zakresu

Działa tak jak w poczcie: klikasz checkbox w jednym wierszu, a potem z wciśniętym Shiftem w innym. Zaznaczają się oba wiersze i wszystko pomiędzy. Jeśli drugie kliknięcie odznacza wiersz, odznacza się cały zakres. W panelu działa to w 9 listach.

Musiałem się podpiąć pod istniejący kod, a każda tabela była zrobiona trochę inaczej. Dlatego przycisk akcji masowej nie przyjmuje tylko tablicy z `id` zaznaczonych wierszy – zależnie od miejsca przekazuję mu albo `id`, albo cały obiekt i dopiero potem przygotowuję dane do wysłania.

![Po lewej po pierwszym kliknięciu – zaznaczony 1 wiersz, po prawej po Shift + klik w 8. wierszu – zaznaczonych 7](/blog/2026/tabela-jak-arkusz/shift-klik.webp){width="840" height="836"}

Najprostsza wersja ma trzy pułapki:

1. **Numer wiersza zamiast klucza.** Łatwo zapamiętać numer ostatnio klikniętego wiersza. Działa to, dopóki nikt nie posortuje listy, nie zmieni filtra ani nie doładuje kolejnych wierszy. Wtedy numer 3 to już inny wiersz i zaznacza się nie ten zakres. Bezpieczniej zapamiętać `id` wiersza, a jego pozycję szukać dopiero przy kliknięciu.
2. **Kolejność z danych zamiast z ekranu.** Po sortowaniu i filtrze kolejność na ekranie jest inna niż w danych z serwera. Zakres musi się zgadzać z tym, co widzi użytkownik.
3. **Zaznaczony tekst.** Shift + klik w przeglądarce zaznacza też tekst między kliknięciami. Można to zablokować tylko przy wciśniętym Shifcie – wtedy zwykłe zaznaczanie tekstu w tabeli dalej działa.

Uproszczona wersja jako composable, bez tych pułapek:

```js
import { ref, toValue } from 'vue'

export function useRangeSelection(rows, key = 'id') {
  const selected = ref(new Set())
  // klucz ostatnio klikniętego wiersza – nie jego numer
  const anchor = ref(null)

  function toggle(row, event) {
    const id = row[key]
    const select = !selected.value.has(id)
    const list = toValue(rows) // wiersze w kolejności, którą widać na ekranie
    const from = list.findIndex((r) => r[key] === anchor.value)
    const to = list.findIndex((r) => r[key] === id)

    const ids = event?.shiftKey && from !== -1
      ? list.slice(Math.min(from, to), Math.max(from, to) + 1).map((r) => r[key])
      : [id]

    const next = new Set(selected.value)
    for (const rowId of ids) {
      if (select) next.add(rowId)
      else next.delete(rowId)
    }
    selected.value = next
    anchor.value = id
  }

  return { selected, toggle }
}
```

```vue
<input
  type="checkbox"
  :checked="selected.has(row.id)"
  @mousedown="$event.shiftKey && $event.preventDefault()"
  @click="toggle(row, $event)"
>
```

`Set` sprawdza, czy wiersz jest zaznaczony, bez przeszukiwania całej tablicy. Przy każdej zmianie tworzę nowy `Set`, żeby Vue na pewno zauważył zmianę.

## Enter: pole w wierszu niżej

W „Zarządzaniu ofertą” dostawca ustawia ceny wszystkich swoich artykułów: cenę bazową netto, domyślny narzut i swoją cenę netto. Dostawcy co jakiś czas aktualizują ceny i chcieli to robić w jednej tabeli, jak w Excelu. Teraz Enter przenosi do tego samego pola w wierszu niżej, a Shift + Enter – w wierszu wyżej. Zawartość nowego pola jest od razu zaznaczona, więc nową cenę można po prostu wpisać. Tak samo działa okno ceny indywidualnej.

![U góry po Enterze: kursor w tym samym polu wiersz niżej, a cena jest od razu zaznaczona. Na dole po Shift + Enter: kursor wraca wiersz wyżej](/blog/2026/tabela-jak-arkusz/enter.webp){width="1168" height="836"}

W przykładzie każde pole dostaje numer wiersza i nazwę kolumny w atrybutach `data-*`. Po Enterze funkcja szuka pola z tą samą kolumną i sąsiednim numerem:

```vue
<script setup>
function moveOnEnter(event, row) {
  // Enter w formularzu normalnie go wysyła – tu ma tylko przenieść kursor
  event.preventDefault()

  const column = event.currentTarget.dataset.column
  const next = row + (event.shiftKey ? -1 : 1)
  const input = document.querySelector(
    `[data-row="${next}"][data-column="${column}"] input`,
  )

  input?.focus()
  input?.select()
}
</script>

<template>
  <div
    v-for="(item, index) in items"
    :key="item.id"
    :data-row="index"
    data-column="price"
    @keydown.enter="moveOnEnter($event, index)"
  >
    <input v-model="item.price" inputmode="decimal">
  </div>
</template>
```

Dzięki nazwie kolumny w atrybucie jedna funkcja wystarczy dla każdej kolumny, a także dla tabeli i okna ceny indywidualnej. Na ostatnim wierszu Enter nic nie robi – pole niżej nie istnieje, więc kursor zostaje na miejscu.

## Co z tego zostało

- Shift + klik w 9 listach panelu.
- Enter i Shift + Enter w tabeli cen i w oknie ceny indywidualnej – nową cenę wpisuje się bez sięgania po mysz.
- Obie rzeczy to mało kodu, a oszczędzają najwięcej klikania tam, gdzie użytkownik przechodzi przez całą listę.
- Przy zaznaczaniu zakresu zapamiętuj klucz wiersza, a nie jego numer – wtedy sortowanie i filtry nie psują zakresu.
