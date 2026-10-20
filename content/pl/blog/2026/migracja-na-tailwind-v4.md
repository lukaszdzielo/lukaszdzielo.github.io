---
date: 2026-08-29
title: 'Tailwind v4 w dużym projekcie: 76 plików zamiast 339'
description: Jak przeniosłem AgrestApp z Tailwinda 3 na 4 bez przepisywania szablonów – stare wartości w @theme, trzy zmiany w klasach i porządek w warstwach CSS.
tags:
- tailwind
- css
kind: case-study
project: /projects/2026/agrestapp
art: /art/blog/migracja-na-tailwind-v4.svg
ogImage: /og/blog/migracja-na-tailwind-v4-pl.jpg
draft: false
---

AgrestApp był na Tailwindzie 3 i sporo elementów nie działało tak, jak powinno. W pewnym momencie dostałem audyt z ogromną listą zmian: ok. 250 przycisków do poprawy, tabele i wiele innych rzeczy. Na liście było m.in. to, że przyciski mają za mały tekst, a pola formularzy – 14 px, przez co iPhone przybliża stronę po kliknięciu w pole. Zaproponowałem, żeby na ekranach dotykowych powiększać te elementy wariantem `pointer-coarse:` – to nowość z Tailwinda v4. Uprzedziłem, że to potrwa: mogę poprawić wszystko „na oko” albo zmieniać i przy okazji porządkować serwis. Dostałem zgodę na nowszą wersję Tailwinda i na powolne porządki – np. zamianę 3–4 przycisków z osobnych komponentów na jeden.

26 sierpnia przeniosłem AgrestApp z Tailwinda 3.4.1 na 4.3.3. To duży projekt: konfiguracja w JavaScripcie ma ok. 200 kolorów i 11 breakpointów, a w szablonach jest ponad 1500 klas z wykrzyknikiem (`!bg-…`). Narzędzie do automatycznej migracji zaproponowało zmiany w 339 plikach i 1710 liniach. Weszło 76 plików, a większość zmienionych linii to dwa pliki lock.

## Zasada: nie przepisywać szablonów

Tailwind v4 zmienił kilka domyślnych wartości. Mogłem poprawić każdą klasę w szablonach albo przywrócić stare wartości w jednym miejscu. Wybrałem to drugie. Klasy w szablonach zostały takie, jak były, a różnice między wersjami opisałem w CSS:

```css
@import "tailwindcss";
/* v4 nadal czyta konfigurację JS – kolory i breakpointy bez zmian */
@config "../../tailwind.config.cjs";

/* v4 przeskalował te trzy wartości – przywracam te z v3 */
@theme {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --radius-sm: 0.125rem;
  --default-ring-width: 3px;
}

/* v4 zmienił domyślny kolor ramki na currentcolor */
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    border-color: var(--color-gray-200, currentcolor);
  }
}
```

Te trzy wartości to 296 klas w szablonach: `shadow-sm` (226), `rounded-sm` (52) i samo `ring` (18). Po zmianie wyglądają dokładnie jak w v3, a w szablonach nie zmieniłem w nich ani jednego znaku.

Dwie rzeczy w zależnościach wyszły dopiero przy porównaniu:

- **Plugin formularzy.** `@tailwindcss/forms` w wersji 0.5.11 obniża specyficzność swoich selektorów (`input:where([type='text'])` zamiast `[type='text']`). Po aktualizacji przesunęło to paddingi wszystkich pól. Przypiąłem wersję 0.5.7, która działa jak wcześniej.
- **Node 20.** Nowy silnik Tailwinda wymaga Node 20 lub nowszego, a na starszym instalacja kończy się błędem o binarce, nie o Tailwindzie. Dodałem `engines` w `package.json` i plik `.nvmrc`.

## Trzy zmiany, bez których v4 nie działa

Kilku rzeczy nie dało się przywrócić w CSS. Te musiałem zmienić w szablonach:

1. **Klasy `*-opacity-*`** (`bg-opacity-50`, `ring-opacity-5` itd.) w v4 nie istnieją i nic nie generują. Zamieniłem je na zapis z ukośnikiem – 49 miejsc w 36 plikach. Bez tego nakładki pod oknami modalnymi straciłyby przyciemnienie, a lista rozwijana dostałaby czarny pierścień zamiast prawie przezroczystego.

   ```html
   <!-- przed -->
   <div class="bg-black bg-opacity-50">
   <!-- po -->
   <div class="bg-black/50">
   ```

2. **`@reference` w blokach `<style>`.** W v4 każdy blok `<style>` w komponencie Vue kompiluje się osobno i nie zna kolorów ani klas projektu, więc `@apply` kończy się błędem. Dodałem jedną linię w 32 plikach:

   ```vue
   <style scoped>
   @reference "../../css/app.css";

   .badge {
     @apply rounded-sm bg-brand-1-100 px-2;
   }
   </style>
   ```

3. **`@apply … !important`.** v4 nie przyjmuje `!important` na końcu `@apply`. W jednym miejscu przeniosłem wykrzyknik na poszczególne klasy.

Za to prefiks `!` przed klasą działa w v4 bez zmian, więc ponad 1500 takich klas zostało nietkniętych.

## Najtrudniejsze: warstwy CSS

Najwięcej czasu zajęła kaskada. W v4 klasy Tailwinda są w warstwach (`@layer`), a CSS spoza warstwy wygrywa z nimi zawsze, niezależnie od specyficzności. W v3 tak nie było, więc reguły, które latami przegrywały, nagle zaczęły wygrywać:

- reguła `label { … }` z marginesem nadpisała klasę `mb-7.5` na etykiecie,
- `input { height: 36px }` rozciągnęła checkboxy i radio do 36 px.

Rozwiązaniem była własna warstwa na reguły elementów. Stoi między `base` a `components`, więc wygrywa z resetem i pluginem formularzy, ale przegrywa z klasami – tak jak w v3:

```css
/* kolejność warstw – musi być na samym początku arkusza */
@layer theme, base, app-base, components, utilities;

@layer app-base {
  label {
    margin-bottom: 0.375rem;
  }

  /* checkbox i radio mają swój rozmiar z pluginu formularzy */
  input:not([type="checkbox"], [type="radio"]) {
    height: 36px;
  }
}
```

Dwie kolejne różnice wyszły dopiero przy klikaniu:

- **Okna modalne chowały się pod własnym tłem.** W v3 klasa `transform` dodawała pustą transformację, która tworzyła nowy kontekst nakładania. W v4 ta klasa daje `transform: none`, gdy żadna transformacja nie jest ustawiona. Po animacji wejścia okno wpadało pod przyciemnienie, a kliknięcie w okno zamykało je. Dotyczyło to 33 plików. Wystarczyła jedna reguła: `.transform { transform: translate(0, 0); }`.
- **Gradient zniknął z pierwszego kafelka na pulpicie.** Własny plugin `bg-gradient-<kąt>` nie ustawiał zmiennej `--tw-gradient-position`, z której v4 składa gradient. Cała wartość była nieprawidłowa, więc kafelek został bez tła, z samym białym tekstem.

Poprawiłem też klasę `container`. v4 nie czyta już z konfiguracji JS wyśrodkowania i paddingu kontenera, więc dodałem je w CSS przez `@utility container`.

## Jak sprawdziłem, że nic się nie zmieniło

Przeglądanie stron nie wystarczy – łatwo przeoczyć margines na jednej podstronie. Zbudowałem więc CSS z gałęzi z v3 i z gałęzi z v4 i porównałem oba wyniki: 90 arkuszy wobec 90, klasa po klasie i wartość po wartości.

Wynik:

- żadna klasa użyta w szablonach nie zniknęła z wynikowego CSS,
- prawie wszystkie różnice to tylko inny zapis tej samej wartości,
- zostały dwie świadome różnice: domyślna paleta v4 jest w `oklch` zamiast `rgb`, a `container` ma dodatkowy próg szerokości z jednego z breakpointów.

Na koniec zostawiłem notatkę dla zespołu: po pobraniu zmian trzeba zrobić `npm ci`, bo bez nowych paczek serwer deweloperski nie wstanie.

## Co z tego zostało

- Migracja bez przepisywania szablonów – stare wartości w `@theme` i trzy zmiany, których v4 wymaga.
- Własna warstwa `app-base` na reguły elementów, żeby kaskada działała jak w v3.
- Porównanie wynikowego CSS zamiast przeglądania stron – daje pewność, że nic nie zniknęło.
- Projekt jest gotowy na `pointer-coarse:`, od którego wszystko się zaczęło – użyłem go m.in. w [nagłówkach AgrestApp](/pl/wpisy/2026/naglowki-agrestapp).
