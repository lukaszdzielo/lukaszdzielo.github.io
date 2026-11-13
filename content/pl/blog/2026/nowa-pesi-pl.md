---
date: 2026-11-24
title: 'Nowa pesi.pl – co naprawdę przyspieszyło stronę'
description: Razem z Claude Code przepisałem stronę firmy, w której pracuję, z Laravela na WordPressa. Wydajność w Lighthouse na telefonie wzrosła z 70–80 do 95–100. Najwięcej dało mniej JavaScriptu, a sprzątanie ikon nie dało nic.
tags:
- performance
- wordpress
- css
kind: case-study
art: /art/blog/nowa-pesi-pl.svg
ogImage: /og/blog/nowa-pesi-pl-pl.jpg
project: /projects/2026/pesi-pl
translationKey: nowa-pesi-pl
draft: false
---

[pesi.pl](https://pesi.pl) to strona Pesi – firmy, w której pracuję. Do niedawna działała na Laravelu i każdą zmianę, także każdy wpis na blogu, wklejał ktoś z frontu albo backendu, a nie marketing. Dlatego przepisałem ją na WordPressa. Teraz marketing sam publikuje wpisy, lepiej widzi, na czym się skupić, i łatwiej śledzi zmiany na stronie. Przy okazji strona mocno przyspieszyła. Poniżej opisuję, co dało najwięcej, a co nie dało nic.

![Pierwszy ekran pesi.pl na telefonie – po lewej stara wersja, po prawej nowa](/blog/2026/nowa-pesi-pl/strona-glowna-telefon.webp){width="1608" height="1340"}

## Co mi przeszkadzało na starej stronie

Na starej stronie widziałem kilka rzeczy, które chciałem poprawić: menu skakało przy ładowaniu, niektóre elementy wychodziły poza kontener, a na telefonie strona była bardzo długa.

Nie lubię stron, które ciągną się w nieskończoność – czy to artykuł, czy lista, którą przeglądam. Jeśli chcę zjechać do stopki, to dlaczego autor mi to utrudnia? W stopce jest kontakt. Jeśli nie mogę do niego dojechać, po prostu rezygnuję – a to oznacza straconego klienta.

Ile strony straciły na długości, widać na zrzutach całych stron z Lighthouse (telefon, 412 px szerokości, ekran ma 823 px wysokości):

| Strona | Przed | Po |
|---|---|---|
| Strona główna | 14 553 px (ok. 18 ekranów) | 10 058 px (ok. 12 ekranów) |
| O nas | 10 895 px | 8330 px |
| Referencje | 14 686 px | 8914 px |
| Strony internetowe | 12 566 px | 11 852 px |

## Jak pracowałem z Claude Code

Kod nowej wersji napisał Claude Code – sam w kodzie właściwie nic nie zmieniałem. Moja część wyglądała tak:

- **plan** – najtrudniejsze było przemyślenie całości tak, żeby nie powtórzyć błędów z wersji na Laravelu,
- **decyzje** – które gridy z wieloma elementami zamienić na telefonie i tablecie w karuzele, jak duży ma być każdy element, gdzie ma się znaleźć, jaki to ma być komponent i czy będziemy z niego korzystać w innych miejscach; do tego usunięcie nieużywanych ikon i mniej elementów na stronie głównej,
- **kontrola** – wyłapywałem wizualnie wszystko, co było niezgodne, i proponowałem zmiany w wyglądzie. Resztę zlecałem Claude Code.

Z Claude Code dbanie o sam wygląd strony było dużo łatwiejsze. Dużo czasu zajęło mi za to przeniesienie całego portfolio i wszystkich wpisów z bloga tak, żeby zachowały dotychczasowy wygląd. Udało się, a do tego osoba, która pisze artykuł, może teraz w nim zaznaczyć, kto jest autorem. To proste i intuicyjne, więc jestem zadowolony – i z siebie, i z Claude Code.

## Punkt wyjścia: ok. 2 MB JavaScriptu

Stara strona ładowała na telefonie ok. 2 MB JavaScriptu (tyle przesyłała sieć, po kompresji). Większość to nie był kod samej strony:

| Skrypt | Waga |
|---|---|
| reCAPTCHA – ładowana od razu po wejściu na stronę | 880 kB |
| narzędzia analityczne i marketingowe | 569 kB |
| odtwarzacz animacji Lottie z CDN | 379 kB |
| kod strony (Alpine.js, karuzele Splide i reszta) | 139 kB |
| jQuery | 89 kB |

Nowa wersja ładuje na telefonie 35–39 kB JavaScriptu. Nie ma w niej jQuery, Alpine.js ani biblioteki do karuzel – jest kilkanaście małych skryptów, a każdy ładuje się tylko tam, gdzie jest potrzebny.

## Ciężkie rzeczy dopiero wtedy, gdy są potrzebne

Nie wszystko da się usunąć: formularz potrzebuje reCAPTCHA, a strona główna ma kostki 3D. Da się jednak zmienić moment, w którym się ładują:

- **reCAPTCHA** ładuje się przy pierwszym kontakcie z formularzem, a nie przy wejściu na stronę.
- **Kostki 3D** to najpierw zwykłe zdjęcie – ono jest największym elementem pierwszego ekranu (LCP). Scena WebGL (113 kB po kompresji) ładuje się po wczytaniu strony, tylko na szerszych ekranach i nie wtedy, gdy ktoś ma włączone ograniczenie ruchu albo oszczędzanie danych.
- **Animacje w menu** (Lottie) ładują się dopiero po najechaniu na menu.
- **Film z YouTube** to najpierw sama miniatura – odtwarzacz ładuje się po kliknięciu.

Kostki zasługują na kilka zdań więcej. To trzy filary Pesi i pierwsza rzecz, którą widać po wejściu na stronę. Na starej stronie były statycznym obrazkiem – nic się nie ruszało. Chciałem je ożywić, ale bez spowalniania strony. Dziś da się to zrobić z Claude Code, tylko że łatwo nie było: obracanie kostek w Three.js, ustawienie ich tak, jak powinny stać, optymalizacja ładowania i poprawne wstawienie na stronę to 2–3 godziny rozmowy z AI – tylko o ten jeden element.

Zasada jest za każdym razem ta sama. Tak może wyglądać reCAPTCHA ładowana przy pierwszym kontakcie z formularzem (to uproszczony przykład, a nie kod ze strony):

```js
// skrypt reCAPTCHA dopiero przy pierwszym fokusie w formularzu
form.addEventListener('focusin', () => {
  const script = document.createElement('script')
  script.src = 'https://www.google.com/recaptcha/api.js?render=KLUCZ_STRONY'
  script.async = true
  document.head.append(script)
}, { once: true })
```

`focusin`, w odróżnieniu od `focus`, przechodzi w górę drzewa, więc jeden nasłuch na formularzu łapie fokus w każdym polu. `{ once: true }` usuwa nasłuch po pierwszym wywołaniu, więc skrypt doda się tylko raz.

Podobnie scena 3D – ładuje się tylko wtedy, gdy wszystkie warunki są spełnione:

```js
// 782 px – od tej szerokości kolumny bloków WordPressa stoją obok siebie
const wide = matchMedia('(min-width: 782px)').matches
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
const saveData = navigator.connection?.saveData === true

if (wide && !calm && !saveData) {
  addEventListener('load', () => import('./cubes.js'), { once: true })
}
```

`navigator.connection` działa tylko w przeglądarkach opartych na Chromium. W pozostałych `saveData` jest po prostu `false`.

Efekt widać w Total Blocking Time – to czas, w którym strona nie reaguje na dotyk i kliknięcia, bo przeglądarka wykonuje skrypty. Na wszystkich czterech mierzonych stronach spadł ze 108–178 ms do 0 ms.

## Karuzela zamiast długiej listy

Na telefonie i tablecie kilka gridów z wieloma elementami zamieniłem na karuzele. Takie, po których od razu widać, że coś wychodzi poza ekran i można to przesunąć palcem albo przewinąć. Strona robi się dzięki temu dużo krótsza, a do stopki z kontaktem jest bliżej.

Na starej stronie karuzele robił Splide uruchamiany przez Alpine.js. Teraz karuzela to styl bloku: zwykła grupa bloków w WordPressie dostaje klasę, a każdy element w środku jest slajdem. Slajdy układa się w edytorze jak każdą inną treść.

Przewijanie robi sama przeglądarka – wystarczą `overflow-x` i `scroll-snap`:

```css
.carousel {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}

.carousel > * {
  flex: 0 0 85%; /* kawałek następnego slajdu wystaje zza krawędzi */
  scroll-snap-align: start;
}
```

- `scroll-snap-type: x mandatory` – po puszczeniu palca przewijanie zawsze zatrzymuje się na początku slajdu,
- `overscroll-behavior-x: contain` – przewinięcie do końca karuzeli nie przewija dalej strony i nie uruchamia gestu „wstecz” w przeglądarce,
- `flex: 0 0 85%` – slajd nie zajmuje całej szerokości, więc widać, że obok jest następny.

`scroll-snap` działa dziś we wszystkich głównych przeglądarkach, więc każdy element przykleja się we właściwym miejscu. Ja ustalam tylko, jak duży ma być element, gdzie się znaleźć i jaki to komponent. Kodu jest przez to dużo mniej niż przy bibliotece.

Skrypt (3,5 kB, razem z CSS-em 2,6 kB po kompresji) dodaje tylko to, czego CSS nie umie: kropki, pętlę, automatyczne przewijanie i przeciąganie myszą. Na telefonie przewija się palcem, natywnie – żadna biblioteka nie przechwytuje gestów. Kilka rzędów, np. opinie na stronie głównej, przewija się w bok tylko na telefonie i nie ma żadnego skryptu – wystarcza sam CSS.

Przy dostępności ważne były cztery rzeczy:

- kropki to przyciski (`<button>`) z opisem „Pokaż slajd 2 z 5” i `aria-current` przy aktywnym,
- karuzela ma `role="region"` i `aria-roledescription`, a slajdy opis „slajd 1 z 5”,
- kopie slajdów potrzebne do pętli mają `aria-hidden="true"` i `tabindex="-1"`, więc nie trafia na nie ani czytnik ekranu, ani klawisz Tab,
- automatyczne przewijanie zatrzymuje się po najechaniu, przy fokusie, po dotknięciu i na nieaktywnej karcie, a przy ograniczeniu ruchu w systemie jest wyłączone.

W superauto.pl zaproponowałem kiedyś Swipera, bo jedna karuzela miała obsłużyć kilka miejsc i ładować zdjęcia z wyprzedzeniem – opisałem to we wpisie [Jedna karuzela zamiast trzech](/pl/wpisy/2026/jedna-karuzela-zamiast-trzech). Tu karuzele są prostsze, więc wystarczyła przeglądarka.

## Mniej CSS-a i mniej zapytań

- **CSS:** 14–16 kB na stronę zamiast 58–64 kB. W motywie blokowym WordPress ładuje style tylko tych bloków, które są na stronie, a własne arkusze motywu (karuzela, formularze, okno zgody) dochodzą tylko tam, gdzie są potrzebne.
- **Zapytania:** 33–69 zamiast 120–140.
- **Ikony** nie są osobnymi plikami – serwer wstawia użyte ikony SVG prosto do HTML-a.
- **Font** Inter jest na serwerze strony: 3 pliki WOFF2, a dwa najważniejsze mają `preload`.
- **Obrazki:** miniatury w AVIF i właściwe `sizes` przy kartach. Stara strona też miała już AVIF i WebP, więc tu różnica jest mała.
- **Drobiazg:** wyłączony skrypt emoji WordPressa.

## Co nie dało nic: sprzątanie ikon

Z biblioteki ikon motywu usunąłem 40 plików SVG. 9 nieużywanych ikon zastąpiły animacje, a 31 duplikatów zostało połączonych w 2 pliki. Motyw jest lżejszy o 262 kB, a stare nazwy ikon działają dalej dzięki aliasom, więc treść stron nie wymagała poprawek.

Na szybkość strony nie miało to żadnego wpływu – 0 kB różnicy. Serwer i tak wstawiał do HTML-a tylko użyte ikony, więc nieużywane pliki nigdy nie trafiały do przeglądarki. Zysk jest gdzie indziej: w edytorze jest mniej podobnych ikon do wyboru.

Podobnie jest z liczbą elementów na stronie (DOM). Na stronie głównej spadła z 1408 do 832 (−41%), a w Referencjach o 13%. O nas ma tyle samo elementów, a strona oferty „Strony internetowe” – o 18% więcej, bo ma więcej sekcji. Elementów ubyło tam, gdzie strona faktycznie stała się prostsza.

## Wyniki

Mediany z 3 przebiegów Lighthouse na telefonie (domyślne ustawienia – symulowany wolny internet i wolny procesor):

| Strona | Wydajność | LCP | TBT | Waga strony |
|---|---|---|---|---|
| Strona główna | 70 → 99 | 4,37 → 2,00 s | 178 → 0 ms | 2,6 MB → 362 kB |
| O nas | 80 → 95 | 3,89 → 2,89 s | 131 → 0 ms | 2,5 MB → 335 kB |
| Referencje | 74 → 100 | 4,36 → 1,10 s | 108 → 0 ms | 2,7 MB → 514 kB |
| Strony internetowe | 76 → 99 | 4,02 → 2,07 s | 173 → 0 ms | 2,5 MB → 279 kB |

Na komputerze (`--preset=desktop`) wydajność wzrosła z 96–98 do 100. Na wszystkich czterech stronach, na telefonie i na komputerze, dostępność wzrosła z 94–95 do 100, a dobre praktyki z 77 do 100. SEO było i jest na 100.

## Pomiary i czego nie da się porównać 1:1

- **Kto i czym:** pomiary też zrobił Claude Code – Lighthouse 13, po 3 przebiegi na każdą stronę, w tabeli mediana.
- **„Po”** to strona na produkcji.
- **„Przed”** to kopie starej strony z Internet Archive (Wayback Machine), bo starej wersji nie da się już uruchomić. Archiwum ma inny serwer, dokleja swoje skrypty (ok. 160 kB) i nie ma części obrazków. Dlatego czasy i oceny „przed” traktuję orientacyjnie. Wagi w tabeli są policzone bez skryptów archiwum – są pewniejsze niż czasy.
- **Analityka:** pomiary w tabelach są sprzed dodania analityki – stara strona ładowała ok. 570 kB narzędzi analitycznych i marketingowych. Bez nich stara strona i tak ładowała ok. 1,5 MB JavaScriptu – ok. 40 razy więcej niż nowa. Teraz na nowej stronie są już Google Tag Manager i Google Analytics. Sprawdziłem stronę główną jeszcze raz w Lighthouse w Chrome (tryb mobilny, okno incognito): z zaakceptowanymi zgodami wydajność to 99, bez zgód – 100. PageSpeed Insights w jednym pomiarze pokazał 88 – głównie przez skrypty Google Tag Managera.
- **Wysokość stron** pochodzi z pełnych zrzutów w raportach Lighthouse (telefon 412 × 823 px). Na kopiach z archiwum brakuje części obrazków, więc stare strony mogły być w rzeczywistości jeszcze dłuższe.
- **Lighthouse** symuluje wolny telefon, więc liczby różnią się od PageSpeed Insights i od danych z prawdziwych urządzeń.

## Czy było warto

Strona to bardzo długie godziny pracy, a nie 15 minut z AI i gotowe, jak często się słyszy. To był prawie cały miesiąc pracy po godzinach i dbania o każdy szczegół. Według mnie się opłaciło: strona jest szybka i dobrze wygląda.

## Co z tego zostało

- Najwięcej dało usunięcie JavaScriptu, którego strona nie potrzebuje przy wejściu: z ok. 2 MB do 35–39 kB, a Total Blocking Time spadł do 0 ms.
- Ciężkie rzeczy – reCAPTCHA, scenę 3D, odtwarzacz YouTube – ładuj dopiero wtedy, gdy są potrzebne.
- Długa strona na telefonie to dłuższa droga do kontaktu. Grid z wieloma elementami często lepiej zamienić w karuzelę, w której widać kawałek następnego slajdu.
- Prosta karuzela nie potrzebuje biblioteki: przewija przeglądarka (`scroll-snap`), a skrypt dodaje tylko kropki i automat.
- Sprzątanie plików w motywie nie przyspiesza strony, jeśli do przeglądarki i tak trafia tylko to, co użyte.
- Porównanie z kopią z archiwum traktuj orientacyjnie – wagi i liczba zapytań są pewniejsze niż czasy.
