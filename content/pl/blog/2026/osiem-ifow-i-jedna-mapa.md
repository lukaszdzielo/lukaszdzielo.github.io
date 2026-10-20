---
date: 2026-05-28
title: Osiem ifów i jedna mapa
description: Jak zamienić długą listę warunków „jeśli akcja to X, otwórz okno X” na prosty obiekt w Vue 3 – i kiedy lepiej zostać przy zwykłym if.
tags:
- vue
- javascript
- code-review
kind: post
art: /art/blog/osiem-ifow.svg
ogImage: /og/blog/osiem-ifow-pl.jpg
translationKey: osiem-ifow-i-jedna-mapa
draft: false
---

W code review trafiłem na funkcję, która obsługiwała menu akcji przy wierszu tabeli. Każda akcja otwierała swoje okno dialogowe, a funkcja miała osiem bloków `if` – jeden pod drugim, prawie identycznych. Kod działał, ale zaciekawiło mnie, czy da się go zapisać krócej. Sytuacja jest prawdziwa, ale kod poniżej to przykład – nazwy i dane zmieniłem na listę zamówień w panelu sklepu.

## Punkt wyjścia

Każde okno ma swoją zmienną. Gdy zmienna dostaje zamówienie, okno się otwiera:

```js
const refundTarget = ref(null)
const cancelTarget = ref(null)
const shipTarget = ref(null)
const addressTarget = ref(null)
// … i tak dalej, osiem zmiennych

function handleAction(action, close) {
  if (action.key === 'refund') {
    refundTarget.value = props.order
  }
  if (action.key === 'cancel') {
    cancelTarget.value = props.order
  }
  if (action.key === 'ship') {
    shipTarget.value = props.order
  }
  if (action.key === 'change_address') {
    addressTarget.value = props.order
  }
  // … jeszcze cztery takie bloki
  if (typeof close === 'function') close()
}
```

Wszystkie bloki robią to samo. Zmienia się tylko jedna rzecz: która zmienna dostaje zamówienie.

## Mapa zamiast warunków

Skoro różni je tylko nazwa akcji i zmienna, wystarczy zapisać to połączenie w obiekcie:

```js
const actionTargets = {
  refund: refundTarget,
  cancel: cancelTarget,
  ship: shipTarget,
  change_address: addressTarget,
  // …
}

function handleAction(action, close) {
  const target = actionTargets[action.key]
  if (target) target.value = props.order
  close?.()
}
```

Działa to dokładnie tak samo. W pierwszej wersji każdy `if` był sprawdzany osobno, ale klucze się nie powtarzają, więc i tak pasował najwyżej jeden. Nieznana akcja dalej niczego nie zmienia. `close?.()` wywoła funkcję tylko wtedy, gdy ją dostaniemy – tak jak `typeof close === 'function'`.

Największy zysk widać przy zmianach. Nowa akcja to jedna linijka w obiekcie, a nie kolejny skopiowany blok, w którym łatwo zostawić starą nazwę zmiennej.

## Krok dalej: jeden stan

Patrząc na ten kod dłużej, zauważyłem, że prawdziwy problem to nie same warunki, tylko osiem osobnych zmiennych. Teoretycznie kilka z nich może mieć wartość naraz, czyli kilka okien może być otwartych jednocześnie. A przecież w danej chwili otwarte jest jedno okno, dla jednego zamówienia.

Można to zapisać w jednej zmiennej:

```js
const activeAction = ref(null) // { key, order } albo null

function handleAction(action, close) {
  activeAction.value = { key: action.key, order: props.order }
  close?.()
}
```

```vue
<RefundDialog
  v-if="activeAction?.key === 'refund'"
  :order="activeAction.order"
  @close="activeAction = null"
/>
```

Teraz nie ma już czego mapować. Zamknięcie dowolnego okna to `activeAction = null`, a dwa okna naraz po prostu nie mogą się pojawić. To jednak większa zmiana, bo dotyka szablonu i wszystkich okien – w review zaproponowałem tylko mapę.

## Kiedy zostać przy if

Mapa nie jest odpowiedzią na każdy zestaw warunków. Nie przerabiałbym kodu, gdy:

- przypadki są dwa albo trzy – zwykły `if` czyta się wtedy szybciej niż obiekt i funkcja,
- każda gałąź robi coś innego (inne argumenty, zapytanie do API, inne okno) – wtedy `if` albo `switch` pokazuje to wprost,
- warunki nie są prostym porównaniem, np. zakresy liczb albo kilka pól naraz.

Mapa dobrze sprawdza się w jednym przypadku: gdy wiele gałęzi robi to samo, a różni je tylko to, *gdzie* albo *czego* używają.

## Jak to zaproponować

W komentarzu nie napisałem „przerób to”. Zapytałem, czy autor nie chciał tego zmapować, wkleiłem gotową wersję i zostawiłem wybór – mógł też zostać przy `if`/`else`. Kod był poprawny, więc to była sugestia, a nie błąd do naprawy. Gotowy kod w komentarzu oszczędza drugiej osobie czasu, a pytanie zamiast polecenia zostawia miejsce na powód, którego mogę nie znać.
