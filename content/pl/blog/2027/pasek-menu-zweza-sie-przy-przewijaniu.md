---
date: 2027-02-23
title: 'Pasek menu, który zwęża się przy przewijaniu – CSS zamiast nasłuchiwania scrolla'
description: Pasek na górze strony płynnie zmniejsza się i traci przezroczystość razem z przewijaniem. Doszedłem do tego w trzech krokach – klasa, JavaScript i w końcu sam CSS przez animation-timeline. JavaScript zostaje tylko jako zapas.
tags:
- css
- javascript
kind: post
art: /art/blog/pasek-menu-zweza-sie-przy-przewijaniu.svg
ogImage: /og/blog/pasek-menu-zweza-sie-przy-przewijaniu-pl.jpg
translationKey: pasek-menu-zweza-sie-przy-przewijaniu
draft: false
---

Przy przebudowie strony szkoły robiłem nowe menu. Na telefonie pasek był zgrabny, ale na komputerze miał 150 px wysokości i po przewinięciu strony wydawał się bardzo masywny. Chciałem, żeby zmniejszał się płynnie razem z przewijaniem. Doszedłem do tego w trzech krokach – od zwykłej klasy, przez JavaScript, do samego CSS-a. Przykłady poniżej to uproszczone demo na zmyślonej szkole – zasada jest ta sama co w projekcie.

![Pasek menu na górze strony i po przewinięciu o 400 px – logo i odstępy są mniejsze, a tło jest już całkiem białe](/blog/2027/pasek-menu-zweza-sie-przy-przewijaniu/header-top-vs-scrolled.webp){width="1400" height="556"}

## Pierwsze podejście: klasa po przewinięciu

Najprostsze rozwiązanie to klasa, którą skrypt dodaje po przewinięciu kawałka strony. Klasa zmniejsza paddingi, a `transition` animuje zmianę:

```js
window.addEventListener('scroll', () => {
  header.classList.toggle('is-small', window.scrollY > 100)
}, { passive: true })
```

```css
.header {
  padding-block: 2rem;
  transition: padding-block 0.3s;
}

.header.is-small {
  padding-block: 0.75rem;
}
```

Nie podobała mi się ta animacja. Gdy szybko wracało się na samą górę strony, pasek dopiero wtedy zaczynał rosnąć do pełnej wysokości, a w trakcie było widać to, co było za nim. Pasek ma dwa stany, a przewijanie jest płynne – i to widać.

## Jedna liczba od 0 do 1

Zamiast dwóch stanów chciałem, żeby pasek zmieniał się razem z przewijaniem. Cały mechanizm opiera się na jednej zmiennej: `--header-progress`. Na górze strony ma wartość 0, po przewinięciu o 400 px – 1. Z niej liczą się padding paska i krycie tła:

```css
:root {
  --header-logo: 3rem;
  --header-pad-max: 0.75rem;
  --header-pad-min: 0.75rem;
  --header-progress: 0;
  --header-pad: calc(var(--header-pad-max) - (var(--header-pad-max) - var(--header-pad-min)) * var(--header-progress));
  --header-h: calc(var(--header-logo) + 2 * var(--header-pad));
  --header-bg-alpha: calc(80% + 20% * var(--header-progress));
}

@media (width >= 64rem) {
  :root {
    --header-logo: 4.5rem;
    --header-pad-max: 2rem;
  }
}
```

Na dużym ekranie padding maleje z 32 px do 12 px, a tło przechodzi z 80% do pełnej bieli. Na telefonie oba paddingi są takie same, więc pasek się nie zmniejsza – zmienia się tylko tło.

Z tej samej zmiennej korzysta panel menu. Ma wysokość ekranu minus aktualna wysokość paska, więc zawsze mieści się w oknie:

```css
.nav__scroll {
  max-height: calc(100dvh - var(--header-h));
  overflow-y: auto;
}
```

## Drugie podejście: postęp liczony w JavaScripcie

Postęp od 0 do 1 liczy skrypt. Zwężanie zaczyna się po 100 px i trwa przez kolejne 300 px:

```js
let frame = null

const onScroll = () => {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = null
    const progress = Math.min(Math.max((window.scrollY - 100) / 300, 0), 1)
    document.documentElement.style.setProperty('--header-progress', progress.toFixed(3))
  })
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()
```

`requestAnimationFrame` sprawia, że wartość liczy się najwyżej raz na klatkę, a nie przy każdym zdarzeniu `scroll`. Pozycję odczytuję dopiero w środku klatki, więc ostatnia pozycja strony nie ginie.

Teraz pasek zmieniał się płynnie, razem ze stroną. Niby wszystko działało, ale wtedy przypomniałem sobie, że da się to zrobić w samym CSS-ie – lżej i z mniejszą ilością kodu.

## Trzecie podejście: przewijanie steruje animacją w CSS

Dziś przeglądarka może sama połączyć animację z przewijaniem strony. Wystarczy zwykła animacja `@keyframes` i `animation-timeline: scroll()` zamiast czasu:

```css
@property --header-progress {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

@keyframes header-shrink {
  from { --header-progress: 0; }
  to { --header-progress: 1; }
}

@supports (animation-timeline: scroll()) {
  :root {
    animation: header-shrink linear both;
    animation-timeline: scroll(root block);
    animation-range: 100px 400px;
  }
}
```

- `scroll(root block)` – postęp animacji to przewinięcie całej strony w pionie.
- `animation-range: 100px 400px` – animacja zaczyna się po 100 px i kończy po 400 px, tak jak w wersji z JavaScriptem.
- `@property` – zmienną trzeba zarejestrować jako liczbę. Bez tego przeglądarka nie wie, jak ją płynnie animować, i wartość skacze z 0 na 1.

Przy tej wersji usunąłem też `transition` z tła paska. Przejście opóźniało zmianę krycia względem przewijania, a teraz wartość zmienia się dokładnie razem ze stroną.

## JavaScript tylko jako zapas

Animacje sterowane przewijaniem działają w Chrome i Edge od wersji 115 i w Safari od wersji 26. Firefox włączył je domyślnie dopiero w wersji 159. Dla starszych przeglądarek zostawiłem skrypt z drugiego podejścia, ale uruchamia się tylko wtedy, gdy CSS sobie nie radzi:

```js
const cssDriven = CSS.supports('animation-timeline: scroll()')

const onScroll = () => {
  if (cssDriven || frame) return
  // dalej tak samo jak wyżej
}
```

Obie wersje ustawiają tę samą zmienną i ten sam zakres (100–400 px), więc reszta CSS-a nie musi wiedzieć, skąd przyszła wartość.

## `fixed` zamiast `sticky`

Na stronie głównej pasek od początku był `fixed`, bo miał być półprzezroczysty i nachodzić na duże zdjęcie na górze strony. Na podstronach stał nad treścią, więc był `sticky`.

Kiedy zacząłem zmniejszać padding, przy `fixed` wszystko było w porządku – zmiana nie wpływała na resztę strony. Przy `sticky` było inaczej: pasek zajmuje miejsce w układzie strony, więc każda zmiana jego wysokości przesuwa całą treść pod nim. Strona zaczęła się dziwnie zachowywać. W demo widać to w liczbach: po przewinięciu do 400 px przeglądarka cofa pozycję o ok. 19 px.

Uznałem, że bezpieczniej będzie przepisać pasek na `fixed` na wszystkich stronach, a pod nim zostawić pusty element o pełnej wysokości paska:

```css
.header {
  position: fixed;
  inset-inline: 0;
  top: 0;
}

.header-spacer {
  height: var(--header-h-max); /* logo + 2 × największy padding */
}
```

Pasek się zmniejsza, a treść pod nim stoi w miejscu.

## Co z tego zostało

- Klasa z `transition` daje dwa stany – przy szybkim przewijaniu widać, jak pasek goni stronę.
- Jedna zmienna od 0 do 1, a z niej padding, krycie tła i wysokość panelu menu.
- `animation-timeline: scroll()` z `animation-range` – przewijanie steruje animacją bez JavaScriptu.
- `@property` – bez rejestracji zmienna nie animuje się płynnie.
- JavaScript tylko jako zapas, gdy `CSS.supports()` zwraca `false`.
- Zwężający się pasek lepiej trzymać na `fixed` z odstępem o pełnej wysokości, żeby treść nie skakała.
