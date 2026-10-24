---
date: 2027-02-09
title: 'Kontener – od Bootstrapa do clamp()'
description: Najpierw .container z Bootstrapa, potem własny kontener z max-width, a dziś jeden clamp(). Jak zmieniał się mój sposób na boczny margines strony i dlaczego płynny margines podoba mi się najbardziej.
tags:
- css
kind: post
art: /art/blog/kontener-od-bootstrapa-do-clamp.svg
ogImage: /og/blog/kontener-od-bootstrapa-do-clamp-pl.jpg
translationKey: kontener-od-bootstrapa-do-clamp
draft: false
---

W poprzednim wpisie pisałem, [dlaczego zawsze ustawiam maksymalną szerokość](/pl/wpisy/2027/strona-na-panoramicznym-ekranie). Tym razem krótko o tym, jak ją ustawiam – i jak to się u mnie zmieniało. Kontener robi dwie rzeczy: zatrzymuje treść na szerokim ekranie i odsuwa ją od krawędzi na wąskim. Najbardziej zmieniła się u mnie ta druga część, czyli boczny margines.

## Bootstrap: `.container`, `.row` i `.col`

Kiedy pracowałem z Bootstrapem, układ prawie zawsze zaczynał się tak samo:

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">…</div>
    <div class="col-md-6">…</div>
  </div>
</div>
```

Szerokość treści ustawiał kontener, a `row` i `col` dzieliły ją na kolumny. W Bootstrapie 5 `.container` ma 100% szerokości do 576 px, a potem stałe szerokości na progach:

| Szerokość ekranu | Szerokość `.container` |
|---|---|
| poniżej 576 px | 100% |
| od 576 px | 540 px |
| od 768 px | 720 px |
| od 992 px | 960 px |
| od 1200 px | 1140 px |
| od 1400 px | 1320 px |

Między progami kontener stoi w miejscu, a rośnie tylko puste miejsce po bokach. Przy 767 px tekst jest ok. 126 px od krawędzi ekranu, a przy 768 px już tylko 36 px. Na telefonie zostaje 12 px – tyle, ile ma padding kontenera.

## Własny kontener: `max-width` i 100% minus 32 px

W projektach bez Bootstrapa robię własną klasę `container` albo po prostu ustawiam `max-width`. Szerokość to 100% minus 32 px, żeby na telefonie zostało po 16 px z każdej strony:

```css
.container {
  width: calc(100% - 32px);
  max-width: 1200px;
  margin-inline: auto;
}
```

Dziś to samo da się zapisać jedną linijką z `min()` – przeglądarka bierze mniejszą z dwóch wartości:

```css
.container {
  width: min(100% - 32px, 1200px);
  margin-inline: auto;
}
```

Tu nie ma skoków. Margines ma 16 px, dopóki treść nie dojdzie do 1200 px, a potem rośnie. Tyle że na tablecie i małym laptopie to nadal 16 px – przy 1024 px tekst stoi tak samo blisko krawędzi jak na telefonie.

## Tailwind: `container` też ma progi

W Tailwindzie klasa `container` działa podobnie jak w Bootstrapie: ma 100% szerokości, a `max-width` zmienia się na progach – 640, 768, 1024, 1280 i 1536 px. Różnica jest taka, że sama się nie centruje i nie ma paddingu. Dopisuje się je klasami (`container mx-auto px-4`) albo w v4 raz w CSS:

```css
@utility container {
  margin-inline: auto;
  padding-inline: 1rem;
}
```

Tak dodałem je przy [migracji AgrestApp na Tailwind v4](/pl/wpisy/2026/migracja-na-tailwind-v4). Skoki między progami zostają jednak takie same jak w Bootstrapie.

## `clamp()`: margines bez progów

Dziś najbardziej podoba mi się `clamp()`. Przyjmuje trzy wartości – minimum, wartość preferowaną i maksimum – i pilnuje, żeby wynik nie wyszedł poza zakres:

```css
.container {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(16px, 9.24vw - 20px, 113px);
}
```

Margines ma 16 px do ok. 390 px szerokości ekranu, potem rośnie razem z ekranem i przy 1440 px dochodzi do 113 px. Wtedy treść ma 1214 px – tyle, ile w projekcie tego portfolio.

### Skąd `9.24vw - 20px`

Środkową wartość liczę z dwóch punktów: przy jakiej szerokości ekranu margines ma mieć minimum, a przy jakiej maksimum. U mnie to 390 px → 16 px i 1440 px → 113 px:

- nachylenie: (113 − 16) / (1440 − 390) ≈ 0,0924, czyli `9.24vw`,
- przesunięcie: 16 − 0,0924 × 390 ≈ −20 px.

Wychodzi `9.24vw - 20px`. Wewnątrz `clamp()` nie trzeba pisać `calc()` – działania można wpisać od razu.

W tym portfolio ta wartość jest w `@theme` Tailwinda jako `--spacing-pad`, w remach. Dzięki temu mam z niej klasy `px-pad` czy `-mx-pad`:

```css
@theme {
  --spacing-pad: clamp(1rem, 9.24vw - 1.25rem, 7.0625rem);
}
```

## Porównanie

Na wykresie jest odległość tekstu od krawędzi ekranu dla trzech sposobów z tego wpisu – od telefonu do 1440 px:

![Wykres odstępu tekstu od krawędzi ekranu: Bootstrap .container skacze na każdym progu, min() ma 16 px aż do 1232 px, a clamp() rośnie równo od 16 do 113 px](/blog/2027/kontener-od-bootstrapa-do-clamp/side-gap-pl.webp){width="1400" height="960"}

| Ekran | Bootstrap | `min()` | `clamp()` |
|---|---|---|---|
| 390 px | 12 px | 16 px | 16 px |
| 767 px | 126 px | 16 px | 51 px |
| 768 px | 36 px | 16 px | 51 px |
| 1024 px | 44 px | 16 px | 75 px |
| 1280 px | 82 px | 40 px | 98 px |
| 1440 px | 72 px | 120 px | 113 px |

## Co z tego zostało

- Bootstrap `.container` i Tailwind `container` zmieniają szerokość na progach – między nimi rośnie tylko puste miejsce po bokach.
- `width: min(100% - 32px, 1200px)` – jedna linijka zamiast `calc()` i `max-width`.
- `clamp()` daje margines, który rośnie płynnie, bez media queries.
- Wartość środkową liczę z dwóch punktów: najmniejszy ekran z minimum i największy z maksimum.

Progi nadal mają sens w układzie – np. gdy dwie kolumny przechodzą w jedną. Do samego marginesu wystarcza mi jedna linijka.
