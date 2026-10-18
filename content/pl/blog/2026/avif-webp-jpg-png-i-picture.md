---
date: 2026-10-20
title: 'AVIF, WebP, JPG czy PNG? I kiedy warto użyć <picture>'
description: Poradnik z pomiarem – te same obrazki w czterech formatach i czterech szerokościach. Który format wybrać, po co mniejsze wersje i kiedy <picture> z kilkoma <source> ma sens, a kiedy tylko powiększa stronę.
tags:
- performance
- html
- images
kind: post
art: /art/blog/formaty-obrazkow.svg
ogImage: /og/blog/formaty-obrazkow-pl.jpg
draft: false
---

`<picture>` używam praktycznie wszędzie – w WordPressie i w Vue. Chodzi mi o jedno: żeby telefon, tablet i komputer pobierały obrazek w takim rozmiarze, jakiego naprawdę potrzebują. Coraz częściej wybieram AVIF – teraz także na tym portfolio, z WebP jako zapasem. Żeby nie pisać z pamięci, zmierzyłem to na dwóch obrazkach z mojego portfolio.

## Pomiar

Wziąłem dwa obrazki: ilustrację z mojego portretu (z przezroczystym tłem) i zrzut strony głównej portfolio (tekst, kolory, ostre krawędzie). Każdy zapisałem w czterech formatach i czterech szerokościach tym samym narzędziem, którego używa moja strona (sharp 0.34). Ustawienia: PNG bez strat, JPG w jakości 80, WebP w jakości 80, AVIF w jakości 50 – przy tych wartościach obrazki wyglądają podobnie.

**Portret (rozmiar pliku w KB)**

| Szerokość | PNG | JPG | WebP | AVIF |
|---|---|---|---|---|
| 400 px | 155 | 15,9 | 17,0 | 9,4 |
| 800 px | 519 | 45,5 | 45,0 | 20,5 |
| 1200 px | 994 | 82,3 | 79,1 | 32,0 |
| 1600 px | 1603 | 123,8 | 115,2 | 43,2 |

**Zrzut strony (rozmiar pliku w KB)**

| Szerokość | PNG | JPG | WebP | AVIF |
|---|---|---|---|---|
| 400 px | 63,4 | 9,1 | 7,5 | 5,0 |
| 800 px | 210,9 | 26,8 | 21,7 | 12,8 |
| 1200 px | 463,2 | 50,4 | 38,8 | 22,3 |
| 1600 px | 778,7 | 76,9 | 57,6 | 31,7 |

Co z tego wynika:

- **PNG** jest kilkanaście razy cięższy od pozostałych formatów. Ma sens tam, gdzie obrazek musi zostać bez strat – np. mała ikona albo zrzut do dokumentacji.
- **JPG i WebP** przy portrecie wychodzą prawie tak samo, a przy zrzucie z tekstem WebP jest o ok. 20–25% lżejszy. WebP ma też przezroczystość, której JPG nie ma – portret w JPG dostał białe tło.
- **AVIF** jest najlżejszy: od 1,7 do 2,7 raza mniejszy niż WebP. Ma też przezroczystość, a na zrzucie z tekstem litery w AVIF (jakość 50) są tak samo czytelne jak w WebP (jakość 80).

## Haczyk AVIF: czas kodowania

| Portret, 1600 px | PNG | JPG | WebP | AVIF |
|---|---|---|---|---|
| Czas zapisu | 247 ms | 267 ms | 360 ms | 5932 ms |

AVIF zapisuje się kilkanaście razy dłużej niż pozostałe formaty. Na mojej stronie wyszło to w praktyce. Przy budowaniu strony (`nuxt generate`) @nuxt/image tworzy wszystkie wersje obrazków – u mnie 876 plików w każdym formacie. Z AVIF i WebP trwało to ok. 12 minut, z samym WebP – ok. 1 minuty. Odwiedzający pobierał na pierwszym ekranie strony głównej 59 kB obrazków zamiast 120 kB, a czas wczytania największego elementu (LCP) na telefonie różnił się o ok. 0,2 s.

Najpierw wyłączyłem AVIF i zostałem przy samym WebP. Potem do niego wróciłem: nowe wpisy dodaję rzadziej, a strona buduje się w nocy, więc dłuższe budowanie mi nie przeszkadza.

Ze wsparciem w przeglądarkach nie ma już problemu: według caniuse.com (wrzesień 2026) WebP obsługuje ok. 97% użytkowników, a AVIF ok. 96%.

## Mniejsze wersje: srcset i sizes

Największa oszczędność nie bierze się z formatu, tylko z rozmiaru. Telefon nie potrzebuje obrazka o szerokości 1600 px. Portret w WebP przy 800 px ma 45 KB, a przy 1600 px – 115 KB. Dlatego każdy obrazek zapisuję w kilku szerokościach i daję przeglądarce wybór:

```html
<img
  src="/img/portret-800.webp"
  srcset="/img/portret-400.webp 400w, /img/portret-800.webp 800w,
          /img/portret-1200.webp 1200w, /img/portret-1600.webp 1600w"
  sizes="(max-width: 640px) 100vw, 50vw"
  width="800" height="800" alt="Portret" loading="lazy">
```

- `srcset` to lista plików z ich szerokością.
- `sizes` mówi przeglądarce, jak szeroki będzie obrazek na stronie: na telefonie cała szerokość ekranu, wyżej połowa.
- Przeglądarka sama wybiera plik i bierze pod uwagę gęstość pikseli. Telefon z ekranem 400 px i gęstością 2× pobierze wersję 800 px, a nie 1600 px.

`sizes` musi pasować do prawdziwego rozmiaru obrazka. U siebie miałem portret w nagłówku strony z `sizes` liczonym od szerokości ekranu, a obrazek zależał od wysokości kadru. Po poprawce telefon pobiera plik 732 px zamiast 1076 px.

## `<picture>` i `<source>`: kiedy warto

`<picture>` przydaje się w dwóch sytuacjach.

**1. Kilka formatów – przeglądarka bierze pierwszy, który obsługuje:**

```html
<picture>
  <source
    type="image/avif"
    srcset="/img/portret-400.avif 400w, /img/portret-800.avif 800w"
    sizes="(max-width: 640px) 100vw, 50vw">
  <source
    type="image/webp"
    srcset="/img/portret-400.webp 400w, /img/portret-800.webp 800w"
    sizes="(max-width: 640px) 100vw, 50vw">
  <img
    src="/img/portret-800.jpg"
    srcset="/img/portret-400.jpg 400w, /img/portret-800.jpg 800w"
    sizes="(max-width: 640px) 100vw, 50vw"
    width="800" height="800" alt="Portret" loading="lazy">
</picture>
```

**2. Inny kadr na telefonie** – np. pionowe zdjęcie zamiast szerokiego:

```html
<picture>
  <source media="(max-width: 640px)" srcset="/img/hero-pion.webp">
  <img src="/img/hero-szeroki.webp" width="1600" height="700" alt="…">
</picture>
```

Ile to kosztuje? Zmierzyłem sam kod HTML dla czterech szerokości:

| | `<img srcset>` (1 format) | `<picture>` (AVIF + WebP + JPG) |
|---|---|---|
| HTML | 250 B | 652 B |
| HTML po kompresji (gzip) | 158 B | 232 B |

Po kompresji `<picture>` dodaje do strony ok. 75 bajtów na każdy obrazek. W zamian przeglądarka pobiera portret 800 px w AVIF (20,5 KB) zamiast w WebP (45 KB), czyli o ok. 24 KB mniej. Te 75 bajtów nie ma więc znaczenia. Prawdziwy koszt jest gdzie indziej: trzy razy więcej plików na serwerze (AVIF, WebP i JPG) i dłuższe budowanie.

**Kiedy `<picture>` nie ma sensu:**

- gdy używasz tylko jednego formatu – wystarczy `<img>` ze `srcset`, a `<picture>` z jednym `<source>` nic nie daje;
- przy ikonach i logo – lepszy jest SVG;
- gdy liczy się czas budowania, a AVIF trzeba wygenerować dla setek obrazków.

## Moja ściąga

| Co | Format |
|---|---|
| Zdjęcia, ilustracje, przezroczystość, zrzuty ekranu z tekstem | AVIF, a WebP jako zapas w `<picture>` |
| Zrzut co do piksela, z przezroczystością lub bez (np. do dokumentacji) | PNG albo WebP bez strat |
| Podgląd dla klienta w mailu | JPG – różnicy nie widać, a plik mieści się w mailu |
| Ikony i logo | SVG |
| Obrazek podglądu linku (OG) w social mediach | JPG |

AVIF jest więc u mnie domyślnym formatem. JPG zostawiam do dwóch rzeczy: podglądu linku, bo Facebook i LinkedIn nie zawsze pokazują AVIF, i podglądów, które wysyłam klientom mailem.

## Co z tego zostało

- Najwięcej daje dobry rozmiar (`srcset` i `sizes`), dopiero potem format.
- AVIF jest najlżejszy i nadaje się do wszystkiego – zdjęć, przezroczystości i zrzutów z tekstem. Zapisuje się jednak kilkanaście razy dłużej, więc przy wielu obrazkach widać to w czasie budowania.
- `<picture>` dokłada kilkadziesiąt bajtów HTML na obrazek, a oszczędza kilkadziesiąt kilobajtów. Warto, gdy masz więcej niż jeden format albo inny kadr na telefon.
