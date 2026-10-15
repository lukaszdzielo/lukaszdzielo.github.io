---
date: 2026-03-02
title: One modal, a dozen copies
description: The same function for opening a dialog copied into a dozen views – how to move it into one composable and share it with tables through provide/inject.
tags:
- vue
- javascript
- composables
kind: post
art: /art/blog/jeden-modal.svg
ogImage: /og/blog/jeden-modal-en.jpg
draft: false
---

Some pieces of code don't look like a problem, because they're only three lines long. The problem starts when the same three lines are in a dozen files. I came across this in a project I worked on. The situation is real, but the code below is an example – I changed the names and data to a shop admin panel where clicking a product photo in any table opens a dialog with its details.

## What it looked like

There are many tables with products: orders, returns, stock, baskets, history. Every one of these views had the same code:

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

Nobody planned it. The first view got the dialog, the second one was "the same, just with a different table", so the code was copied and pasted. With every next view, copying was simply the fastest way.

## Why it gets in the way

The code itself is correct. The trouble starts with the first change:

- you want the dialog to load extra data or close after a page change – you edit a dozen files,
- one file always gets missed, and in one view the dialog works a bit differently than in the rest,
- in a code review you can't see if the copies are still the same or have already drifted apart.

## Step 1: a composable

First, we move the open and close logic into one place:

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

In the view, one line replaces the state and the function:

```js
const { selectedProduct, isOpen, open, close } = useProductModal()
```

That already helps – changing how the dialog behaves means changing one file. But every view still has `<ProductModal>` in its template and still passes `open` down to the table.

## Step 2: one dialog and provide/inject

If the dialog looks the same everywhere, there can be just one – in a parent component, for example the panel layout. The layout provides the open function, and the tables get it themselves:

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

The views don't need to know about the dialog anymore. The table only asks: "is there anyone above me who can open product details?". The second argument of `inject` (`null`) and `?.()` mean that the same table used outside the layout simply doesn't open the dialog, instead of throwing an error. Using a `Symbol` from one file as the key protects against a typo in the name, which with a plain string would silently fail.

## When copying is fine

Not every repeated piece has to go into a separate file right away. The well-known rule of three helps here: two copies are fine, but at the third one it's worth stopping to check if it's really the same code. Sometimes two pieces look the same but do different jobs and will drift apart soon anyway – then a shared function would only get in the way.

The simplest habit that helps the most: before you write a function, search for its name in the project. If you find it in three files, that's a sign a fourth copy isn't needed.
