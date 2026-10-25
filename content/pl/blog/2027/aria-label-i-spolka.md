---
date: 2027-03-09
title: 'aria-label i spółka – kiedy ARIA pomaga, a kiedy przeszkadza'
description: Atrybuty ARIA łatwo dokleić „na wszelki wypadek”, a źle użyte przeszkadzają bardziej, niż gdyby ich nie było. Osiem atrybutów, których używam w tym portfolio – na prawdziwych przykładach ze strony.
tags:
- html
- accessibility
kind: post
art: /art/blog/aria-label-i-spolka.svg
ogImage: /og/blog/aria-label-i-spolka-pl.jpg
translationKey: aria-label-i-spolka
draft: false
---

Atrybuty ARIA mówią czytnikowi ekranu to, czego nie widać w samym HTML-u: jak nazywa się przycisk z samą ikoną, czy menu jest otwarte albo który link prowadzi do bieżącej strony. Łatwo je dokleić „na wszelki wypadek”, a źle użyte przeszkadzają bardziej, niż gdyby ich nie było. Poniżej atrybuty, których używam w tym portfolio – każdy na przykładzie ze strony.

## Najpierw zwykły HTML

W3C zaczyna swoje zasady używania ARIA od jednej: jeśli zwykły element HTML ma już znaczenie i zachowanie, którego potrzebujesz, użyj go zamiast dodawać ARIA.

```html
<!-- tak nie -->
<div role="button" tabindex="0" onclick="open()">Menu</div>

<!-- tak -->
<button type="button">Menu</button>
```

`<button>` sam obsługuje Enter i spację, dostaje fokus z klawiatury i czytnik ogłasza go jako przycisk. `<div>` z `role="button"` tylko udaje przycisk – resztę trzeba dopisać w JavaScripcie. Z tego samego powodu galerię zrzutów zrobiłem na [elemencie `<dialog>`](/pl/wpisy/2026/galeria-na-dialog), a nie na własnym modalu.

## `aria-label` – nazwa dla przycisku z samą ikoną

Pod każdym wpisem są linki do udostępniania z samymi ikonami. Bez nazwy czytnik przeczytałby tylko „link”:

```html
<a href="https://www.linkedin.com/sharing/share-offsite/?url=…" aria-label="Udostępnij na LinkedIn">
  <svg aria-hidden="true">…</svg>
</a>
```

Gdy przycisk ma widoczny tekst, `aria-label` go zastępuje. Wtedy trzeba pilnować, żeby nazwa zawierała to, co widać – tak mówi kryterium WCAG 2.5.3 „Etykieta w nazwie”. Przełącznik języka w nagłówku pokazuje tylko „EN”, a jego nazwa to „EN – English version”:

```html
<a href="/blog/…" lang="en" hreflang="en" aria-label="EN – English version">EN</a>
```

Ktoś, kto steruje stroną głosem, powie „kliknij EN” – i to zadziała, bo nazwa zaczyna się od widocznego tekstu. WCAG podaje to jako dobrą praktykę: widoczny tekst na początku nazwy.

## `aria-hidden` – ikona obok tekstu

Przycisk „Kopiuj link” ma ikonę i tekst. Ikona niczego nie dodaje, więc chowam ją przed czytnikiem:

```html
<button type="button">
  <svg aria-hidden="true">…</svg>
  Kopiuj link
</button>
```

Jedna zasada: `aria-hidden="true"` nigdy na elemencie, który da się kliknąć albo zaznaczyć klawiaturą. Fokus trafia wtedy na coś, czego czytnik „nie widzi”.

## `aria-expanded` i `aria-controls` – menu na telefonie

Przycisk menu mówi, czy menu jest otwarte i które menu otwiera:

```html
<button
  type="button"
  :aria-expanded="open"
  aria-controls="mobile-menu"
  :aria-label="open ? 'Zamknij menu' : 'Otwórz menu'"
  @click="open = !open"
>…</button>

<nav id="mobile-menu">…</nav>
```

`aria-expanded` trzeba zmieniać przy każdym otwarciu i zamknięciu – inaczej czytnik mówi co innego, niż widać na ekranie. Do tego jeszcze dwie rzeczy, które nie są ARIA, ale bez nich menu jest niewygodne z klawiatury:

- Esc zamyka menu i wraca fokusem na przycisk,
- reszta strony dostaje atrybut `inert`, więc Tab nie ucieka pod otwarte menu.

## `aria-pressed` – przyciski, które się włącza i wyłącza

W archiwum projektów filtry działają jak przełączniki. `aria-pressed` mówi, który jest włączony, a grupa ma własną nazwę:

```html
<div role="group" aria-label="Rodzaj projektu">
  <button type="button" :aria-pressed="kind === 'all'">Wszystkie</button>
  <button type="button" :aria-pressed="kind === 'wordpress'">WordPress</button>
</div>
```

W Vue 3 wartość `false` daje w HTML-u `aria-pressed="false"` – i tak ma być, bo czytnik ogłasza wtedy przycisk jako „niewciśnięty”.

## `aria-current` – gdzie jestem

W paginacji link do bieżącej strony ma `aria-current="page"`. Pozostałe linki nie mają tego atrybutu wcale:

```html
<a href="/pl/wpisy/strona/2" :aria-current="item === page ? 'page' : undefined">2</a>
```

Tu z kolei `undefined` jest ważne: w Vue 3 `null` i `undefined` usuwają atrybut, a `false` zostawiłby `aria-current="false"`. W grupie powinien być tylko jeden element z `aria-current`.

## `aria-live` – komunikat, którego nie widać

Po kliknięciu „Kopiuj link” tekst przycisku zmienia się na „Skopiowano link”, ale czytnik nie ogłasza sam z siebie zmian w treści. Do tego służy region `aria-live`:

```html
<p class="sr-only" aria-live="polite">{{ copied ? 'Skopiowano link' : '' }}</p>
```

Region jest na stronie od początku i na starcie jest pusty – zmienia się tylko jego treść. Element dodany do strony razem z komunikatem może zostać przeczytany źle albo wcale. `polite` czeka, aż czytnik skończy mówić. Tak samo działa licznik „3 / 12” w galerii zrzutów i komunikat o błędzie w formularzu kontaktowym. Po udanym wysłaniu formularz znika, więc tam przenoszę fokus na nagłówek podziękowania – czytnik od razu go przeczyta, a fokus z klawiatury nie spada na początek strony.

## `aria-labelledby` – nazwa, która już jest na stronie

Baner zgody na statystyki ma nagłówek. Zamiast powtarzać go w `aria-label`, wskazuję go po `id`:

```html
<section aria-labelledby="consent-title">
  <h2 id="consent-title">Statystyki odwiedzin</h2>
  …
</section>
```

Gdy zmienię tekst nagłówka, nazwa sekcji zmieni się razem z nim.

## Co z tego zostało

- Najpierw zwykły HTML – `<button>`, `<a>`, `<nav>`, `<dialog>` – ARIA dopiero wtedy, gdy HTML nie wystarcza.
- `aria-label` dla elementów bez widocznego tekstu; gdy tekst jest widoczny, nazwa musi go zawierać, najlepiej na początku.
- `aria-hidden` dla ikon obok tekstu, nigdy na elemencie, który dostaje fokus.
- `aria-expanded`, `aria-pressed` i `aria-current` zmieniają się razem ze stanem na ekranie.
- Region `aria-live` jest na stronie od początku, zmienia się tylko jego treść.
