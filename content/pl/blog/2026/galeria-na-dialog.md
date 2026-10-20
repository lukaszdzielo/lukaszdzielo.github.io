---
date: 2026-11-17
title: 'Galeria zrzutów na <dialog> zamiast własnego modala'
description: Jak zbudowałem podgląd zrzutów na cały ekran na natywnym elemencie <dialog> – co przeglądarka robi sama, a co musiałem dopisać.
tags:
- html
- vue
- accessibility
kind: post
art: /art/blog/galeria-na-dialog.svg
ogImage: /og/blog/galeria-na-dialog-pl.jpg
translationKey: galeria-na-dialog
draft: false
---

Na stronach projektów w tym portfolio jest galeria zrzutów. Kliknięcie w zrzut otwiera podgląd na cały ekran, ze strzałkami i licznikiem. Wcześniej takie okna zawsze pisałem sam: popupy, modale, przyciemnione tło i kod, który pilnuje klawisza Esc. Tym razem chciałem sprawdzić natywny element `<dialog>`. Ważna była dla mnie też semantyka – okno z treścią powinno być oknem także dla przeglądarki i czytnika ekranu, a nie zwykłym `<div>`.

## Co przeglądarka robi sama

`<dialog>` działa we wszystkich głównych przeglądarkach od marca 2022 roku. Gdy otworzysz go metodą `showModal()`, przeglądarka sama:

- pokazuje okno nad całą stroną (w osobnej warstwie, bez walki o `z-index`),
- blokuje resztę strony – nie da się kliknąć ani przejść tabulatorem do elementów pod spodem,
- zamyka okno klawiszem Esc,
- dodaje tło `::backdrop`, które domyślnie przyciemnia stronę.

To wszystko, co wcześniej pisałem sam w każdym projekcie. Uproszczony szkielet wygląda tak:

```html
<button type="button" id="open">Powiększ zrzut</button>

<dialog id="preview" aria-label="Podgląd zrzutu">
  <button type="button" id="close">Zamknij</button>
  <img src="zrzut.webp" alt="Strona główna projektu">
</dialog>

<script>
  const preview = document.getElementById('preview')
  document.getElementById('open').addEventListener('click', () => preview.showModal())
  document.getElementById('close').addEventListener('click', () => preview.close())
</script>
```

## Co musiałem dopisać

W Vue galeria jest jednym komponentem. Dialog ma `ref`, a funkcje otwierają go i zamykają. Kod poniżej to uproszczona wersja tego komponentu. Kilka rzeczy przeglądarka zostawia jednak programiście.

**Przewijanie strony pod spodem.** Otwarty dialog nie blokuje przewijania strony, więc przy otwartym podglądzie kółko myszy przesuwało stronę w tle. Dopisałem blokadę przewijania na czas otwarcia. To samo da się zrobić w samym CSS: `html:has(dialog[open]) { overflow: hidden; }`.

**Kliknięcie w tło.** Esc zamyka okno, ale kliknięcie obok zdjęcia – już nie. W Vue wystarczył modyfikator `.self`: zamykam okno tylko wtedy, gdy kliknięto sam dialog, a nie zdjęcie albo przycisk w środku.

**Powrót fokusu.** Po zamknięciu fokus ma wrócić na zrzut, który otworzył podgląd. Wtedy osoba, która używa klawiatury, jest dalej w tym samym miejscu strony. Zamknięcie przyciskiem, klawiszem Esc i kliknięciem w tło wywołuje to samo zdarzenie `close`, więc sprzątam w jednym miejscu:

```js
const dialog = ref(null)
const opener = ref(null)

function open(event) {
  opener.value = event.currentTarget
  dialog.value.showModal()
  document.documentElement.style.overflow = 'hidden'
}

// przycisk, Esc i kliknięcie w tło – zawsze to samo zdarzenie close
function onClose() {
  document.documentElement.style.overflow = ''
  opener.value?.focus()
}
```

```html
<dialog ref="dialog" aria-label="Podgląd zrzutu" @close="onClose" @click.self="dialog.close()">
  …
</dialog>
```

**Strzałki.** Klawisze ← i → obsługuję sam, przez zdarzenie `keydown` na dialogu. Licznik „2 / 5” ma `aria-live="polite"`, więc czytnik ekranu odczytuje go po zmianie zdjęcia.

## Tło, którego tu nie widać

`::backdrop` podobał mi się najbardziej, bo przyciemnia stronę bez dodatkowego elementu. W tej galerii podgląd zajmuje jednak cały ekran i ma własne, ciemne tło, więc `::backdrop` ustawiłem jako przezroczysty. W mniejszym oknie, na przykład z formularzem, wystarczy jedna reguła:

```css
dialog::backdrop {
  background: rgb(0 0 0 / 0.6);
}
```

## Co z tego zostało

- Natywny `<dialog>` daje za darmo warstwę nad stroną, blokadę reszty strony, Esc i tło – to, co wcześniej pisałem sam.
- Przewijanie strony pod spodem, kliknięcie w tło i powrót fokusu trzeba dopisać.
- Zdarzenie `close` to jedno miejsce na sprzątanie, niezależnie od tego, jak okno zostało zamknięte.
- Kod podglądu jest krótszy niż w moich dawnych modalach, a semantyka zgadza się od początku.
