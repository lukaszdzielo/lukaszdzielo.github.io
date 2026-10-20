---
date: 2026-11-03
title: 'Jedna karuzela zamiast trzech'
description: Jak w superauto.pl zastąpiłem trzy karuzele z osobnym kodem jednym komponentem na Swiperze – i dlaczego karuzela szarpała przez rozmyte tło, a nie przez liczbę karuzel na stronie.
tags:
- javascript
- swiper
- css
kind: case-study
project: /projects/2025/superauto
art: /art/blog/jedna-karuzela-zamiast-trzech.svg
ogImage: /og/blog/jedna-karuzela-zamiast-trzech-pl.jpg
translationKey: jedna-karuzela-zamiast-trzech
draft: false
---

superauto.pl to serwis z ofertami samochodów – nowych, używanych, poleasingowych i ciężarowych. Pracowałem przy nim w Arris Agency, a największą zleconą przebudową, jaką tam zrobiłem, było zastąpienie trzech różnych karuzel jedną. Weszła na produkcję wiosną 2025 roku, etapami. Sytuacja jest prawdziwa, ale kod poniżej to uproszczone przykłady, a nie kod z serwisu.

## Trzy karuzele, trzy różne kody

Każda z trzech karuzel miała własny kod, napisany od zera pod jeden element strony. Zachowywały się podobnie, ale każda była ciężka i każdą trzeba było poprawiać osobno. Zaproponowałem Swipera: ładuje zdjęcia z wyprzedzeniem i łatwo go edytować.

Najtrudniejsze na początku było przemyślenie logiki. Jeden komponent miał obsłużyć cztery miejsca: galerię auta z miniaturami, podgląd zdjęć na cały ekran, karuzelę kafelków z pojazdami i karuzelę małych ofert. Zrobiłem jeden wzorzec, a różnice opisałem jako warianty ustawień:

```js
import Swiper from 'swiper'
import { Navigation, Thumbs } from 'swiper/modules'

// ustawienia wspólne dla każdej karuzeli w serwisie
const base = {
  modules: [Navigation, Thumbs],
  lazyPreloadPrevNext: 1, // zdjęcie obok pobiera się z wyprzedzeniem
}

// warianty różnią się tylko ustawieniami
const variants = {
  gallery: { slidesPerView: 1 },
  vehicles: {
    slidesPerView: 1.2,
    spaceBetween: 16,
    breakpoints: { 1024: { slidesPerView: 3 } },
  },
  offers: { slidesPerView: 1 },
}

export function createCarousel(el, extra = {}) {
  const variant = variants[el.dataset.carousel] ?? variants.gallery

  return new Swiper(el, {
    ...base,
    ...variant,
    navigation: {
      prevEl: el.querySelector('[data-prev]'),
      nextEl: el.querySelector('[data-next]'),
    },
    ...extra,
  })
}
```

Rozszerzenia to już tylko dodatkowe ustawienia. Galeria auta dostaje drugą, małą karuzelę z miniaturami, a podgląd na cały ekran to ta sama karuzela z większymi zdjęciami, otwarta na klikniętym zdjęciu:

```js
const thumbs = new Swiper(thumbsEl, {
  slidesPerView: 6,
  spaceBetween: 8,
  watchSlidesProgress: true,
})

createCarousel(galleryEl, { thumbs: { swiper: thumbs } })
createCarousel(fullscreenEl, { initialSlide: clickedIndex })
```

## Kilkanaście karuzel na jednej stronie

Na listach ofert każda karta ma własną małą galerię. Przy kilkunastu ofertach na stronie jest więc kilkanaście karuzel naraz. Na niektórych komputerach karuzela zaczęła szarpać i na początku wyglądało to tak, jakby karuzel było po prostu za dużo.

![Karuzele ofert w superauto.pl – każda karta ma własną małą galerię](/projects/2025/superauto/offer-carousels.webp){width="1920" height="1080"}

Okazało się, że liczba karuzel nie była problemem. Winne było tło. Zdjęcia ładują się w dwóch krokach: najpierw pod spodem pojawia się mały podgląd w słabej jakości z filtrem `blur`, a po chwili pełna wersja. Filtr `blur` jest dla przeglądarki kosztowny, a przy ruchu karuzeli słabsze komputery go nie wyrabiały.

Nie chciałem usuwać tego efektu. Pomogła reguła CSS, która przeniosła rozmyte tło na osobną warstwę obsługiwaną przez kartę graficzną. Wydaje mi się, że było to `transform: translateZ(0)`, ale dokładnie już nie pamiętam:

```css
/* rozmyty podgląd pod zdjęciem – czeka, aż wczyta się pełna wersja */
.offer-card__preview {
  filter: blur(12px);
  /* osobna warstwa: przy ruchu karuzeli rozmycie nie jest malowane od nowa */
  transform: translateZ(0);
}
```

## Zdjęcia generuje serwer

Wszystkie rozmiary zdjęć przygotowywał serwer, więc dopasowywałem się do tego, co dostawałem z backendu. Backend pilnował też, żeby liczba zdjęć nie przeciążyła serwera. Kiedy przyspieszaliśmy wersję na telefony i dodaliśmy mniejsze zdjęcia w `srcset`, miniatur nagle zrobiło się bardzo dużo. Generowanie nowych rozmiarów dla wszystkich zdjęć w każdej ofercie przeciążyło serwer i zapchało dysk, więc generowanie stanęło. Później trwało ponad godzinę.

```html
<img
  src="/foto/oferta-1234/1-800.jpg"
  srcset="/foto/oferta-1234/1-400.jpg 400w, /foto/oferta-1234/1-800.jpg 800w"
  sizes="(max-width: 640px) 100vw, 400px"
  loading="lazy"
  alt="Przykładowe auto z oferty"
>
```

Każdy rozmiar w `srcset` to osobny plik dla każdego zdjęcia w każdej ofercie. Przy serwisie z dużą liczbą ofert jeden dodatkowy rozmiar to bardzo dużo nowych plików naraz.

## Wdrożenie etapami

Nowa karuzela wchodziła na produkcję etapami. Nie miałem listy miejsc, w których karuzele się pojawiają, więc szukałem ich w kodzie. Każdy rodzaj ofert – auta nowe, używane, poleasingowe, ciężarowe – miał własne pliki szablonów, więc tę samą zmianę wprowadzałem w kilku miejscach. Moim zdaniem wystarczyłby jeden szablon, który pokazuje tylko sekcje pasujące do danej oferty. Dostosowałem się jednak do kodu, który już był, a pomysł z jednym szablonem zgłosiłem jako sugestię.

## Co z tego zostało

- Jeden komponent na Swiperze zamiast trzech karuzel z osobnym kodem – zmianę robi się w jednym miejscu.
- Szarpanie nie zawsze wynika z liczby elementów. Czasem winny jest jeden kosztowny efekt, jak `filter: blur()`.
- Każdy nowy rozmiar zdjęcia to dodatkowa praca dla serwera – warto ustalić rozmiary z backendem, zanim doda się `srcset`.
- Przed taką zmianą przydaje się lista miejsc, w których element występuje.
