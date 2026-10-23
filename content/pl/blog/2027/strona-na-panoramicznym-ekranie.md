---
date: 2027-01-26
title: 'Strona na panoramicznym ekranie – dlaczego zawsze ustawiam maksymalną szerokość'
description: Pracuję na panoramicznym monitorze i widzę, jak strony bez maksymalnej szerokości rozciągają tekst i zdjęcia od krawędzi do krawędzi. Co się wtedy psuje i jak to naprawić kilkoma linijkami CSS.
tags:
- css
- html
kind: post
art: /art/blog/strona-na-panoramicznym-ekranie.svg
ogImage: /og/blog/strona-na-panoramicznym-ekranie-pl.jpg
translationKey: strona-na-panoramicznym-ekranie
draft: false
---

Na co dzień pracuję na panoramicznym monitorze o rozdzielczości 3440 × 1440 px. Większość stron wygląda na nim dobrze – pod warunkiem, że treść gdzieś się zatrzymuje. Gorzej, gdy tekst jedzie od lewej do prawej krawędzi, a zdjęcia rozciągają się razem z ekranem. Wtedy czytanie jest dla mnie po prostu niewygodne. Łatwo to przeoczyć, bo strony często projektuje się i sprawdza tylko na ekranach 1440–1920 px. Przykłady poniżej zbudowałem od zera na zmyślonej stronie pracowni ceramiki, ale to te same błędy, które często widzę w sieci.

## Jak to wygląda przy 3440 px

Ta sama strona bez maksymalnej szerokości, na ekranie o szerokości 3440 px – czyli tak, jak widzę ją na swoim monitorze:

![Strona bez kontenera przy 3440 px – tekst od krawędzi do krawędzi, powiększony baner i duże zdjęcie z tekstem na środku](/blog/2027/strona-na-panoramicznym-ekranie/without-container-3440.webp){width="1400" height="852"}

Co tu nie działa:

- Akapit wstępu ma ponad 3300 px szerokości. Po skończeniu jednej linii trudno trafić wzrokiem na początek następnej.
- Baner ma stałą wysokość 420 px i szerokość całego ekranu. Plik ma 800 px szerokości, więc przeglądarka powiększa go ponad czterokrotnie – piksele widać od razu.
- W sekcji „pół na pół” zdjęcie skaluje się proporcjonalnie do kolumny i ma 1664 × 1248 px. Tekst obok stoi na środku zdjęcia, a nad nim i pod nim jest po 553 px pustego miejsca.

![Zbliżenie banera – brzeg wzgórza ma widoczne schodki z powiększonych pikseli](/blog/2027/strona-na-panoramicznym-ekranie/banner-zoom.webp){width="700" height="280"}

## Kontener: tło na całą szerokość, treść nie

Najważniejsza zmiana to kontener z maksymalną szerokością. Kiedy pracowałem z Bootstrapem, używałem do tego jego klasy `.container`. W projektach bez Bootstrapa robię własną klasę `container` albo po prostu ustawiam `max-width`. Sekcje i ich tła dalej mogą iść przez cały ekran – zatrzymuje się tylko treść w środku:

```css
.inner {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(16px, 9.24vw - 20px, 113px);
}
```

```html
<section class="section section--tinted">
  <div class="inner">…</div>
</section>
```

Tak działa też to portfolio: tło idzie przez cały ekran, a treść kończy się na 1440 px. Boczny margines rośnie płynnie – od 16 px na telefonie do 113 px przy 1440 px – dzięki jednemu `clamp()`, bez progów w media queries.

## Długość linii tekstu

Kontener to jeszcze za mało dla długiego tekstu – przy 1440 px akapit na całą szerokość kontenera nadal jest długi. Dlatego bloki tekstu dostają osobny limit:

```css
.text {
  max-width: 65ch;
}
```

Jednostka `ch` to szerokość znaku „0” w danym kroju, więc `65ch` to mniej więcej 65 znaków w linii. W Tailwindzie to samo daje klasa `max-w-prose`. Typografowie zwykle podają 45–75 znaków jako wygodną długość linii.

Przyznam, że `65ch` sam do tej pory nie używałem – zwykle kończyłem na kontenerze. W moich wpisach kolumna tekstu ma po prostu 768 px, niezależnie od szerokości ekranu. Osobny limit dla akapitów to rzecz, którą chcę stosować w kolejnych projektach.

## Zdjęcie o stałej wysokości

Baner z `height: 420px` i `object-fit: cover` wygląda dobrze na laptopie, bo zdjęcie jest powiększone tylko trochę. Na szerokim ekranie to samo zdjęcie musi wypełnić ponad 3000 px. Pomagają dwie rzeczy:

- baner zostaje w kontenerze, więc nigdy nie jest szerszy niż treść kontenera (1214 px),
- przeglądarka dostaje większy plik do wyboru – przez `srcset` i `sizes`:

```html
<img
  class="banner"
  src="hills-1600.jpg"
  srcset="hills-800.jpg 800w, hills-1600.jpg 1600w, hills-2400.jpg 2400w"
  sizes="(min-width: 1440px) 1214px, 100vw"
  width="1600" height="900"
  alt="Wzgórza o zachodzie słońca">
```

Przy 1440 px kontener ma 1214 px treści, więc na ekranie z gęstością 2× przeglądarka sięgnie po plik 2400 px. Więcej o formatach i `srcset` pisałem we wpisie o [AVIF, WebP i `<picture>`](/pl/wpisy/2026/avif-webp-jpg-png-i-picture).

## Sekcja pół na pół

Zdjęcie w połowie ekranu z `width: 100%` i `height: auto` rośnie razem z kolumną – przy 3440 px jest wyższe niż cały ekran. Tekst obok zwykle ma `align-items: center`, więc ląduje na środku zdjęcia, a nad nim i pod nim robią się ogromne przerwy. Poprawka to kilka linijek:

```css
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.split img {
  width: 100%;
  aspect-ratio: 4 / 3;
  max-height: 70vh;
  object-fit: cover;
}

.split .text {
  position: sticky;
  top: 32px;
}
```

- `align-items: start` – tekst zaczyna się na górze, obok początku zdjęcia.
- `max-height: 70vh` – zdjęcie nigdy nie jest wyższe niż 70% okna przeglądarki.
- `object-fit: cover` – zamiast zniekształcać zdjęcie, przeglądarka je przycina. To, która część zostaje, ustawia `object-position`.
- `position: sticky` – gdy zdjęcie jest wyższe od tekstu, tekst zostaje w polu widzenia podczas przewijania. Działa tylko wtedy, gdy żaden element nadrzędny nie ma `overflow: hidden`.

Ta sama strona z kontenerem, limitem długości linii i poprawioną sekcją pół na pół, znowu przy 3440 px:

![Strona z kontenerem przy 3440 px – treść na środku, tekst w wąskiej kolumnie, zdjęcie z limitem wysokości i tekst przy górnej krawędzi zdjęcia](/blog/2027/strona-na-panoramicznym-ekranie/with-container-3440.webp){width="1400" height="586"}

## Jak to sprawdzić bez szerokiego monitora

- W narzędziach programisty włącz tryb responsywny i wpisz szerokość 2560 albo 3440 px – to popularne szerokości monitorów panoramicznych.
- Albo pomniejsz stronę w przeglądarce. Przy 50% ekran o szerokości 1920 px zachowuje się jak ekran o szerokości 3840 px.

## Co z tego zostało

- Tło może iść na całą szerokość, treść – w kontenerze z maksymalną szerokością.
- Tekst w kolumnie do ok. 65 znaków (`max-width: 65ch`).
- Zdjęcie nie powinno być wyświetlane szerzej niż jego plik – większy plik dodaje się w `srcset`.
- W sekcji pół na pół: limit wysokości zdjęcia, tekst od góry i `position: sticky`.
- Przed oddaniem strony warto zajrzeć na nią przy 2560 i 3440 px.

Nie chodzi o to, żeby na szerokim ekranie strona wyglądała tak samo jak na laptopie. Wystarczy, że tekst i zdjęcia gdzieś się zatrzymają – tło może iść dalej.
