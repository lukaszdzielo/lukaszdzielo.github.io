---
date: 2026-10-16
title: 'Nagłówki AgrestApp: 36 px dla myszy, 44 px dla palca'
description: Jak w jeden dzień przepisałem nagłówek strony i panelu AgrestApp – jedno przesuwane menu, rozmiary zależne od sposobu obsługi i wysokość nagłówka w zmiennej CSS zamiast liczb wpisanych w kilku plikach.
tags:
- tailwind
- vue
- accessibility
kind: case-study
project: /projects/2026/agrestapp
art: /art/blog/naglowki-agrestapp.svg
ogImage: /og/blog/naglowki-agrestapp-pl.jpg
draft: false
---

AgrestApp ma dwa nagłówki: na stronie firmowej i w panelu po zalogowaniu. Oba działały, ale każdy był zbudowany inaczej, a rozmiary brały się z przypadkowych pikseli. 15 października przepisałem oba. Wyszło 8 commitów i 40 zmienionych plików, a stary nagłówek panelu (643 linie w jednym pliku) zastąpiły trzy mniejsze komponenty. Zrzuty poniżej są z lokalnej wersji na zmyślonych danych.

## Menu na stronie firmowej

Stare menu działało tylko po najechaniu myszą. Miało jedną grupę „System Agrest”, a w niej podmenu w podmenu: Branże, Rozwiązania, a nawet Cennik. Szerokości i odstępy były wpisane na sztywno (`w-[180px]`, `gap-[14px]`, `gap-[30px]`).

![Pasek menu strony – u góry przed zmianą, na dole po](/blog/2026/naglowki-agrestapp/site-header.webp){width="1400" height="184"}

Najważniejsze sekcje wyszły na wierzch jako osobne grupy, a Cennik stał się zwykłym linkiem. Cała struktura jest w jednej liście w `mainNav.js`. Z niej powstaje i pasek na komputerze, i menu na telefonie, więc nowa pozycja nie wymaga zmian w dwóch miejscach.

![Rozwinięta grupa „System Agrest” – u góry przed zmianą (podmenu w podmenu), na dole po](/blog/2026/naglowki-agrestapp/site-dropdown.webp){width="1400" height="736"}

Zamiast osobnej listy dla każdej grupy jest jeden panel. Przy przejściu między grupami przesuwa się pod wskazaną pozycję i dopasowuje szerokość i wysokość do treści. Pozycję i rozmiar liczy JavaScript, a Tailwind tylko je czyta ze zmiennych CSS:

```vue
<script setup>
// Pozycja i rozmiar panelu – liczone przy otwarciu grupy
const panelBox = ref({ x: 0, width: 0, height: 0 })

const panelStyle = computed(() => ({
  '--panel-x': `${panelBox.value.x}px`,
  '--panel-w': `${panelBox.value.width}px`,
  '--panel-h': `${panelBox.value.height}px`,
}))
</script>

<template>
  <div
    :style="panelStyle"
    class="absolute translate-x-(--panel-x) w-(--panel-w) h-(--panel-h)
           transition-[translate,width,height] duration-200"
  >
    <!-- treść aktywnej grupy -->
  </div>
</template>
```

Menu reaguje na sposób obsługi. Mysz otwiera grupę najechaniem, a zamyka ją dopiero 150 ms po zjechaniu, żeby niedokładny ruch nie zamykał panelu. Dotyk przełącza grupę tapnięciem. Klawiatura obsługuje Enter, Esc i wyjście fokusem.

Na telefonie grupy są akordeonami, a przyciski logowania stoją przyklejone na dole ekranu. Przewija się tylko lista.

![Menu na telefonie – po lewej przed zmianą, po prawej po](/blog/2026/naglowki-agrestapp/site-phone-menu.webp){width="796" height="844"}

## Jedna zasada rozmiaru: mysz 36 px, dotyk 44 px

W panelu przyciski-ikony miały różne rozmiary: 30, 36, 40, a awatar 56 px. Teraz jest jedna zasada. Przy myszy przyciski mają ok. 36 px, bo kursor jest precyzyjny i gęstszy układ jest wygodny. Przy dotyku mają 44 px, czyli minimum z WCAG 2.5.5.

Nie użyłem do tego breakpointów, tylko wariantu `pointer-coarse:` z Tailwinda v4. Rozmiar zależy więc od urządzenia wskazującego, a nie od szerokości ekranu. Tablet z myszą dostaje 36 px, a laptop z ekranem dotykowym 44 px.

```html
<!-- ikona 18 px + padding: 36 px przy myszy, 44 px przy dotyku -->
<button class="p-2 pointer-coarse:p-3 [&_svg]:size-4.5" aria-label="Powiadomienia">
  <BellIcon />
</button>

<!-- pozycja menu: wysokość z paddingu, przy dotyku co najmniej 44 px -->
<a class="px-3 py-2 pointer-coarse:min-h-11">Moja firma</a>
```

Ta sama zasada działa w menu konta, w menu strony i w polu wyszukiwania (`h-9 pointer-coarse:h-11`). Przycisk menu na telefonie ma stałe 44 × 44 px, więc zamiana ☰ na × nie przesuwa paska.

![Menu konta – po lewej przed zmianą, po prawej po](/blog/2026/naglowki-agrestapp/panel-account-menu.webp){width="1016" height="460"}

## Wysokość nagłówka w jednej zmiennej

Najwięcej porządku dała mała zmiana. Boczne menu i przyklejone paski stron w panelu leżą pod nagłówkiem, więc muszą znać jego wysokość. Wcześniej była wpisana na sztywno: `top-[75px]`, a gdy administrator był zalogowany jako inna firma i nad nagłówkiem pojawiał się pasek „Zaloguj jako” – `!top-[125px]`. Ten sam warunek powtarzał się w kilku plikach. Jeden pasek i tak chował się 11 px pod nagłówkiem.

Teraz pasek „Zaloguj jako” jest częścią nagłówka, a nagłówek sam mierzy swoją wysokość i zapisuje ją w zmiennej CSS:

```vue
<script setup>
import { useElementSize } from '@vueuse/core'

const header = ref(null)
const { height } = useElementSize(header, undefined, { box: 'border-box' })

// Wysokość nagłówka dla elementów, które leżą pod nim
watch(height, (value) => {
  document.documentElement.style.setProperty('--header-height', `${value || 72}px`)
}, { immediate: true })
</script>
```

Każdy element pod nagłówkiem ma teraz tę samą klasę `top-(--header-height)`. Nie musi wiedzieć, czy pasek „Zaloguj jako” jest widoczny, ani ile nagłówek ma wysokości na danym ekranie.

![Nagłówek panelu – u góry przed zmianą (75 px), na dole po (72 px)](/blog/2026/naglowki-agrestapp/panel-header.webp){width="1440" height="122"}

![Panel na telefonie z otwartym menu bocznym – po lewej przed zmianą, po prawej po: sam znak logo i przycisk zamykania](/blog/2026/naglowki-agrestapp/panel-phone.webp){width="796" height="560"}

## Wartości ze skali zamiast pikseli w nawiasach

Tailwind v4 przyjmuje każdą wielokrotność 0.25rem, więc większość wartości w nawiasach dało się zamienić na zwykłe klasy:

| Przed | Po |
|---|---|
| `h-[75px]` | `h-18` (72 px) |
| `w-[239px]` | `w-60` (240 px) |
| `py-[22px]` | `py-5.5` |
| `dark:bg-[#161e30]` | kolor z palety projektu |

W pasku strony jeden odstęp wymagał płynnej wartości. Między logo, menu i przyciskami jest `clamp()`, od 16 px przy szerokości 1024 px do 84 px przy 1440 px. Dzięki temu całe menu mieści się już od 1024 px, bez dodatkowych breakpointów.

## Co z tego zostało

- Jedna lista menu dla komputera i telefonu.
- Jedna zasada rozmiaru (36 / 44 px) zamiast kilku przypadkowych.
- Jedna zmienna z wysokością nagłówka zamiast liczb 75 i 125 w kilku plikach.
- Menu, które działa myszą, dotykiem i klawiaturą.

Rozwijane menu na stronie ma te same odstępy co menu konta w panelu. Obie części wyglądają teraz jak jeden system, choć są osobnymi aplikacjami.
