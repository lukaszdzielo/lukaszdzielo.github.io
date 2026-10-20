---
date: 2026-12-01
title: 'Akordeon z animacją: grid czy <details>?'
description: Najpierw zrobiłem rozwijany element na <details>, potem musiałem przepisać go na grid, bo nie miał animacji. Dziś <details> potrafi się animować – co wybrać i dlaczego.
tags:
- css
- html
- javascript
kind: post
project: /projects/2025/superauto
art: /art/blog/akordeon-grid-czy-details.svg
ogImage: /og/blog/akordeon-grid-czy-details-pl.jpg
translationKey: akordeon-grid-czy-details
draft: false
---

Kiedy pracowałem przy superauto.pl w Arris Agency, dostałem do zrobienia element, który rozwija się po kliknięciu. Zrobiłem go na `<details>` i `<summary>` – to gotowy, natywny element HTML, który działa bez JavaScriptu. Po wdrożeniu dostałem informację, że trzeba to zmienić, bo `<details>` otwiera się i zamyka bez animacji. Przypomniałem sobie sposób, który kiedyś widziałem: animację wierszy gridu. Sytuacja jest prawdziwa, ale kod poniżej to uproszczone przykłady napisane do tego tekstu, a nie kod z serwisu. W przykładzie rozwija się lista wyposażenia auta.

## Dlaczego wysokość nie chce się animować

Najprostszy pomysł to animacja `height` od `0` do `auto`. Nie działa: przeglądarka przez lata nie umiała płynnie przejść do wartości `auto`, więc element zmieniał wysokość skokiem. Dlatego powstały obejścia – na przykład `max-height` z dużą liczbą albo mierzenie wysokości w JavaScripcie.

## Akordeon na gridzie

Grid potrafi animować wiersze. Wiersz `0fr` ma zerową wysokość, a `1fr` – tyle, ile potrzebuje treść. Przejście między nimi działa we wszystkich głównych przeglądarkach od końca 2022 roku.

```html
<div class="accordion">
  <button type="button" class="accordion__toggle" aria-expanded="false" aria-controls="equipment">
    Wyposażenie
  </button>
  <div class="accordion__panel" id="equipment">
    <div class="accordion__inner">
      <p>Klimatyzacja, czujniki parkowania, kamera cofania…</p>
    </div>
  </div>
</div>
```

```css
.accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden; /* zwinięta treść nie łapie fokusu i nie czyta jej czytnik ekranu */
  transition: grid-template-rows 0.3s, visibility 0.3s;
}

.accordion__toggle[aria-expanded="true"] + .accordion__panel {
  grid-template-rows: 1fr;
  visibility: visible;
}

/* bez tego treść wystaje poza zwinięty wiersz */
.accordion__inner {
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  .accordion__panel {
    transition: none;
  }
}
```

JavaScript tylko przełącza `aria-expanded`. Ten atrybut mówi czytnikowi ekranu, czy element jest rozwinięty, a CSS wykorzystuje go do animacji:

```js
document.querySelectorAll('.accordion__toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true'
    button.setAttribute('aria-expanded', String(!isOpen))
  })
})
```

Ten sposób ma jeden koszt: to, co `<details>` daje za darmo, trzeba dopisać samemu – przycisk, `aria-expanded`, `aria-controls` i ukrywanie zwiniętej treści.

## Dziś: `<details>` z animacją

Od września 2025 roku wszystkie główne przeglądarki obsługują `::details-content`. To pseudo-element, który wskazuje treść `<details>` – wszystko poza `<summary>`. Razem z `interpolate-size`, które pozwala animować do `auto`, akordeon wraca do natywnego HTML:

```html
<details>
  <summary>Wyposażenie</summary>
  <p>Klimatyzacja, czujniki parkowania, kamera cofania…</p>
</details>
```

```css
:root {
  interpolate-size: allow-keywords;
}

details::details-content {
  block-size: 0;
  overflow-y: clip;
  transition: block-size 0.3s, content-visibility 0.3s allow-discrete;
}

details[open]::details-content {
  block-size: auto;
}
```

Jest jedno „ale”: `interpolate-size` działa na razie tylko w Chrome i Edge. W Firefoxie i Safari element otworzy się bez animacji – ale otworzy się i będzie działał normalnie. Jeśli kilka elementów ma ten sam atrybut `name`, na przykład `<details name="oferta">`, otwarty może być tylko jeden z nich. Działa to we wszystkich głównych przeglądarkach od września 2024 roku.

## Co wybrać

| | Grid | `<details>` |
|---|---|---|
| Animacja | wszędzie | na razie Chrome i Edge |
| JavaScript | potrzebny | niepotrzebny |
| Dostępność | trzeba dopisać | wbudowana |
| Tylko jeden otwarty | w JavaScripcie | atrybut `name` |

Dziś zacząłbym od `<details>`, a animację traktował jako dodatek, który pojawi się w kolejnych przeglądarkach. Grid wybrałbym tam, gdzie animacja musi działać wszędzie już teraz.

Oba sposoby – wersję domyślną i wariant, w którym otwarty jest tylko jeden element – pokazałem w jednym widoku na CodePenie. Możesz je uruchomić tutaj:

::code-pen{user="LukaszDev" slug="vExrgqy" url="https://codepen.io/editor/LukaszDev/pen/01a15a92-8abc-7da6-9de0-30d95aa85954" title="Akordeon – grid i details"}
::

## Co z tego zostało

- `<details>` to dobry start: działa bez JavaScriptu i ma wbudowaną dostępność.
- Animacja wierszy gridu (`0fr` → `1fr`) to sprawdzony sposób na rozwijanie do naturalnej wysokości.
- W wersji na gridzie zwiniętą treść trzeba ukryć także przed klawiaturą i czytnikiem ekranu.
- `::details-content` i `interpolate-size` sprawiają, że coraz rzadziej trzeba wybierać między natywnym HTML a animacją.
