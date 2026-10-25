---
date: 2027-03-23
title: ':has() i closest() – jak dostać się do rodzica w CSS i w JavaScripcie'
description: Przez lata CSS nie umiał wybrać rodzica po tym, co ma w środku – dziś robi to :has(). W JavaScripcie najbliższego rodzica znajduje closest(). Kiedy wystarczy CSS, a kiedy zostaje skrypt – na przykładach z kart, formularzy i tego portfolio.
tags:
- css
- javascript
kind: post
art: /art/blog/has-i-closest.svg
ogImage: /og/blog/has-i-closest-pl.jpg
translationKey: has-i-closest
draft: false
---

Przez lata w CSS-ie można było wybierać elementy tylko w dół drzewa: rodzic wpływał na dzieci, ale nie odwrotnie. Żeby karta wyglądała inaczej, gdy coś ma w środku, trzeba było dodać jej klasę w JavaScripcie – na przykład szukając jej przez `closest()`. Dziś to samo często robi `:has()` w samym CSS-ie. Poniżej oba narzędzia: gdzie ich użyłem i kiedy które wybieram.

## `:has()` – rodzic wybrany po tym, co ma w środku

Użyłem `:has()` jeszcze przed Tailwindem i Vue, przy kartach: karta dostawała ramkę tylko wtedy, gdy w środku był element z określoną klasą. Sytuacja jest prawdziwa, ale kod poniżej to przykład – nazwy klas zmieniłem.

```css
.card {
  border: 1px solid transparent;
}

.card:has(.card__badge) {
  border-color: #2860ea;
}
```

`.card:has(.card__badge)` czytam tak: karta, która ma w środku `.card__badge`. Styl dostaje karta, a nie odznaka. Bez `:has()` karta potrzebowałaby dodatkowej klasy, np. `card--featured`, której trzeba pilnować w HTML-u albo w skrypcie.

`:has()` sprawdza wszystkich potomków. Gdy liczy się tylko bezpośrednie dziecko, wystarczy `>`: `.card:has(> .card__badge)`. MDN poleca taki zapis także dlatego, że przeglądarka ma wtedy mniej do sprawdzania.

## Nie tylko karta

Ta sama zasada przydaje się w kilku innych miejscach. Tu już przykłady, które warto znać, a nie kod z mojego projektu.

**Wybrana opcja.** Karta z przyciskiem opcji w środku dostaje ramkę, gdy opcja jest zaznaczona – bez JavaScriptu:

```css
.option:has(input:checked) {
  border-color: #2860ea;
  background: #eef3ff;
}
```

**Pole z błędem.** Etykieta i podpowiedź zmieniają kolor, gdy pole ma złą wartość. `:user-invalid` włącza się dopiero wtedy, gdy ktoś zmieni pole, więc formularz nie świeci na czerwono od wejścia na stronę:

```css
.field:has(input:user-invalid) label,
.field:has(input:user-invalid) .field__hint {
  color: #c10007;
}
```

**Blokada przewijania.** Gdy otwarte jest okno `<dialog>`, strona pod nim się nie przewija:

```css
html:has(dialog[open]) {
  overflow: hidden;
}
```

Ten zapis pokazałem też przy [galerii zrzutów na `<dialog>`](/pl/wpisy/2026/galeria-na-dialog). MDN radzi jednak nie zaczepiać `:has()` o `html`, `body` ani `*`, bo wtedy każda zmiana na stronie wymaga ponownego sprawdzenia selektora. Na małej stronie nie ma to znaczenia, ale w dużej aplikacji z częstymi zmianami w DOM-ie warto to zmierzyć.

## `closest()` – najbliższy rodzic w JavaScripcie

`closest()` szuka w górę drzewa: zaczyna od samego elementu, potem sprawdza rodzica, dziadka i tak dalej. Zwraca pierwszy element, który pasuje do selektora, albo `null`, gdy nic nie pasuje.

Najczęściej przydaje się przy kliknięciach. `event.target` to element, który faktycznie kliknięto – przy przycisku z ikoną może to być `<svg>` albo `<path>`, a nie sam przycisk. `closest()` od razu daje przycisk:

```js
list.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]')
  if (!button) return

  remove(button.dataset.id)
})
```

Jeden nasłuch na całej liście obsługuje wszystkie przyciski – także te dodane później.

W tym portfolio tak działa przewijanie do sekcji. Kliknięcie w link do miejsca, w którym już jesteś, nie zmienia adresu, więc router nie przewija strony. Jeden nasłuch na całym dokumencie łapie takie kliknięcia, a `closest('a[href]')` znajduje link, nawet gdy kliknięto tekst albo ikonę w środku. Uproszczona wersja:

```js
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]')
  if (!link?.hash || link.hash !== location.hash) return

  // ten sam adres – router nic nie zrobi, więc przewijam sam
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
  document.querySelector(link.hash)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
})
```

## Klasa z JavaScriptu czy `:has()`?

W jednym z wcześniejszych projektów szukałem przez `closest()` najbliższego rodzica danego elementu – o ile dobrze pamiętam, żeby dodać mu klasę. Dziś myślę, że ten przykład dałoby się zrobić samym `:has()` w CSS-ie. Wszystko zależy od jednego pytania: czy stan, od którego zależy wygląd rodzica, widać w HTML-u?

```js
// klasa z JavaScriptu
checkbox.addEventListener('change', () => {
  checkbox.closest('.option').classList.toggle('is-selected', checkbox.checked)
})
```

```css
/* to samo w CSS – zaznaczenie widać w HTML-u (:checked) */
.option:has(input:checked) {
  border-color: #2860ea;
}
```

- **Tak** – zaznaczone pole (`:checked`), otwarte okno (`[open]`), rozwinięte menu (`[aria-expanded="true"]`), fokus w środku (`:focus-within`), dziecko z klasą. Wtedy wystarczy `:has()`: bez skryptu i bez pilnowania, czy klasa nadąża za stanem.
- **Nie** – stan jest tylko w JavaScripcie, np. odpowiedź z serwera. Wtedy zostaje klasa ze skryptu. W Vue to zwykle `:class` w szablonie, więc `closest()` przydaje się głównie w nasłuchach poza komponentami – jak to przewijanie w portfolio.

## Wsparcie i ograniczenia

- `:has()` działa w Chrome i Edge od wersji 105, w Safari od 15.4, a w Firefoksie od 121 – we wszystkich głównych przeglądarkach od grudnia 2023.
- `:user-invalid` działa w Chrome i Edge od wersji 119, w Safari od 16.5, a w Firefoksie od 88.
- `:has()` nie można zagnieździć w drugim `:has()` i nie można w nim użyć pseudoelementów, np. `::before`.
- Specyficzność `:has()` to specyficzność najbardziej szczegółowego selektora w nawiasie – tak jak przy `:is()` i `:not()`.
- Przeglądarka, która nie zna `:has()`, pomija całą regułę. Gdy potrzebny jest zapas, pomaga `@supports selector(:has(a))`.
- `closest()` działa we wszystkich przeglądarkach od lat. Trzeba tylko pamiętać, że sprawdza też sam element, od którego zaczyna.

## Co z tego zostało

- `:has()` wybiera rodzica po tym, co ma w środku – kartę, opcję, pole formularza.
- `>` w `:has()` zawęża sprawdzanie do bezpośrednich dzieci.
- `html:has()` i `body:has()` są wygodne, ale w dużej aplikacji warto je zmierzyć.
- `closest()` znajduje najbliższy pasujący element w górę drzewa – razem z jednym nasłuchem obsługuje całą listę.
- Gdy stan widać w HTML-u, wystarczy `:has()`. Gdy jest tylko w JavaScripcie, zostaje klasa ze skryptu.
