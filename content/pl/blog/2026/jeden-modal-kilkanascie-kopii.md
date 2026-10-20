---
date: 2026-03-02
title: Jeden modal, kilkanaście kopii
description: Ta sama funkcja do otwierania okna skopiowana do kilkunastu widoków – jak zebrać ją w jeden composable i udostępnić tabelom przez provide/inject.
tags:
- vue
- javascript
- composables
kind: post
art: /art/blog/jeden-modal.svg
ogImage: /og/blog/jeden-modal-pl.jpg
translationKey: jeden-modal-kilkanascie-kopii
draft: false
---

Są fragmenty kodu, które nie wyglądają na problem, bo mają trzy linijki. Problem zaczyna się wtedy, gdy te same trzy linijki są w kilkunastu plikach. Trafiłem na taką sytuację w projekcie, przy którym pracowałem. Sytuacja jest prawdziwa, ale kod poniżej to przykład – nazwy i dane zmieniłem na panel sklepu, w którym kliknięcie w zdjęcie produktu w dowolnej tabeli otwiera okno z jego szczegółami.

## Jak to wyglądało

Tabel z produktami jest dużo: zamówienia, zwroty, magazyn, koszyki, historia. W każdym z tych widoków był ten sam kod:

```js
const state = reactive({
  showProductModal: false,
  selectedProduct: null,
})

const openProductModal = (product) => {
  state.selectedProduct = product
  state.showProductModal = true
}
```

```vue
<ProductModal
  :show="state.showProductModal"
  :product="state.selectedProduct"
  @close="state.showProductModal = false"
/>
```

Nikt tego nie zaplanował. Pierwszy widok dostał okno, drugi był „taki sam, tylko z inną tabelą”, więc kod przeszedł kopiuj–wklej. Przy kolejnych widokach kopiowanie było już po prostu najszybszą drogą.

## Dlaczego to przeszkadza

Sam kod jest poprawny. Kłopot pojawia się przy pierwszej zmianie:

- chcesz, żeby okno pobierało dodatkowe dane albo zamykało się po zmianie strony – zmieniasz kilkanaście plików,
- jeden plik zawsze się pominie i w jednym widoku okno działa trochę inaczej niż w reszcie,
- przy przeglądzie kodu nie widać, czy kopie są jeszcze takie same, czy już się rozjechały.

## Krok 1: composable

Najpierw logikę otwierania i zamykania zbieramy w jednym miejscu:

```js
// composables/useProductModal.js
import { ref } from 'vue'

export function useProductModal() {
  const selectedProduct = ref(null)
  const isOpen = ref(false)

  const open = (product) => {
    selectedProduct.value = product
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
  }

  return { selectedProduct, isOpen, open, close }
}
```

W widoku zostaje jedna linijka zamiast stanu i funkcji:

```js
const { selectedProduct, isOpen, open, close } = useProductModal()
```

To już pomaga – zmiana zachowania okna to zmiana w jednym pliku. Ale w każdym widoku dalej jest `<ProductModal>` w szablonie i przekazywanie funkcji `open` do tabeli.

## Krok 2: jedno okno i provide/inject

Skoro okno wygląda wszędzie tak samo, może być jedno – w komponencie nadrzędnym, np. w layoucie panelu. Layout udostępnia funkcję otwierania, a tabele same po nią sięgają:

```js
// composables/useProductModal.js
export const productModalKey = Symbol('productModal')
```

```vue
<!-- AdminLayout.vue -->
<script setup>
import { provide } from 'vue'
import { useProductModal, productModalKey } from '@/composables/useProductModal'

const { selectedProduct, isOpen, open, close } = useProductModal()
provide(productModalKey, open)
</script>

<template>
  <slot />
  <ProductModal :show="isOpen" :product="selectedProduct" @close="close" />
</template>
```

```vue
<!-- ProductsTable.vue -->
<script setup>
import { inject } from 'vue'
import { productModalKey } from '@/composables/useProductModal'

const openProductModal = inject(productModalKey, null)
</script>

<template>
  <img
    :src="product.image"
    :alt="product.name"
    :class="{ 'cursor-pointer': openProductModal }"
    @click="openProductModal?.(product)"
  />
</template>
```

Widoki nie muszą już wiedzieć o oknie. Tabela pyta tylko: „czy ktoś nade mną umie otworzyć szczegóły produktu?”. Drugi argument `inject` (`null`) i `?.()` sprawiają, że ta sama tabela użyta poza layoutem po prostu nie otwiera okna, zamiast rzucać błąd. Klucz jako `Symbol` z jednego pliku chroni przed literówką w nazwie, która przy zwykłym stringu cicho by nie zadziałała.

## Kiedy kopiowanie jest w porządku

Nie każde powtórzenie trzeba od razu wyciągać do osobnego pliku. Pomaga znana zasada trzech (*rule of three*): dwie kopie można zostawić, a przy trzeciej warto się zatrzymać i sprawdzić, czy to na pewno ten sam kod. Czasem dwa fragmenty wyglądają tak samo, ale służą czemuś innemu i za chwilę i tak się rozjadą – wtedy wspólna funkcja tylko by przeszkadzała.

Najprostszy nawyk, który pomaga najbardziej: zanim napiszesz funkcję, wyszukaj jej nazwę w projekcie. Jeśli znajdziesz ją w trzech plikach, to znak, że czwarta kopia nie jest potrzebna.
