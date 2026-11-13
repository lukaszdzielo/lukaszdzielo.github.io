---
date: 2026-12-08
title: 'Stopki mailowe dla całej firmy w panelu WordPressa'
description: Razem z Claude Code zrobiłem w WordPressie panel, w którym stopki mailowe całej firmy są w jednym miejscu, a pracownik kopiuje swoją do Gmaila jednym przyciskiem. Sama stopka to tabela ze stylami inline – inaczej programy pocztowe by ją rozsypały.
tags:
- wordpress
- html
- css
kind: case-study
art: /art/blog/stopki-mailowe-dla-calej-firmy.svg
ogImage: /og/blog/stopki-mailowe-dla-calej-firmy-pl.jpg
project: /projects/2026/pesi-pl
translationKey: stopki-mailowe-dla-calej-firmy
draft: false
---

Wcześniej stopki mailowe krążyły w [Pesi](https://pesi.pl) mailem: ktoś przesyłał swoją, ktoś inny ją kopiował i przerabiał. W końcu nikt nie wiedział, gdzie są stopki ani jak je zmieniać. Pomysł był prosty – stopki mają być w jednym miejscu i mają być proste do edycji dla każdego.

Dlatego do nowej strony firmy, o której pisałem we wpisie [Nowa pesi.pl – co naprawdę przyspieszyło stronę](/pl/wpisy/2026/nowa-pesi-pl), doszedł generator stopek w panelu WordPressa. Kod, tak jak całej strony, napisał Claude Code. Kilka osób z zespołu już podmieniło swoje stopki.

Osoby na zrzutach są zmyślone, a zdjęcia to inicjały. Dane rejestrowe firmy w stopce zastąpiłem opisem.

![Gotowa stopka mailowa: zdjęcie z inicjałami, imię i nazwisko, stanowisko, telefon, e-mail, logo firmy i ikony mediów społecznościowych](/blog/2026/stopki-mailowe-dla-calej-firmy/stopka-gotowa.webp){width="640" height="588"}

## Co robi pracownik, a co administrator

Generator to osobna strona w panelu: **Narzędzia → Stopki mailowe**. Ma dwie zakładki: „Osoby” oraz „Szablon i ikony”.

Pracownik, czyli każdy zalogowany:

- widzi listę osób z podglądem gotowej stopki,
- kopiuje swoją stopkę przyciskiem „Kopiuj stopkę” i wkleja ją w Gmailu (Ustawienia → Podpis),
- może też skopiować sam kod przyciskiem „Kopiuj HTML”, np. do innego programu pocztowego,
- niczego nie zmienia – na stronie jest informacja, że zmiany wprowadza administrator.

Administrator:

- prowadzi listę osób – 7 pól: imię, nazwisko, stanowisko, e-mail, telefon, zdjęcie i stare adresy zdjęć (imię i nazwisko są wymagane),
- wybiera zdjęcie z Biblioteki mediów, a panel sam zapisuje z niego mały, kwadratowy JPG,
- zarządza logo i ikonami (Facebook, LinkedIn, Instagram, TikTok, obrazek z hasłem firmy) i może dodawać kolejne,
- edytuje szablon stopki.

![Zakładka „Osoby” w panelu: lista osób z polami, wybór zdjęcia i adres pliku ze zdjęciem](/blog/2026/stopki-mailowe-dla-calej-firmy/panel-osoby.webp){width="1280" height="870"}

Lista osób nie zależy od kont w WordPressie – stopkę może mieć ktoś, kto w ogóle nie loguje się do panelu. Uprawnienia sprawdza też serwer: osoba bez uprawnień administratora nie zapisze zmian, nawet jeśli obejdzie formularz. Pracownik widzi więc tylko listę, podgląd i przyciski do kopiowania:

![Widok pracownika bez uprawnień administratora: lista osób, rozwinięty podgląd stopki i przyciski do kopiowania](/blog/2026/stopki-mailowe-dla-calej-firmy/widok-pracownika.webp){width="1280" height="1060"}

## Jeden szablon, wiele wariantów

Wszystkie stopki powstają z jednego szablonu HTML. Szablon mogą zmieniać też osoby nietechniczne, dlatego znaczniki są po polsku: `{imie}`, `{stanowisko}`, `{telefon}`… Osoba ma ich 8, a logo i każda ikona dostają własny znacznik, np. `{tiktok}`.

Nie każdy ma telefon służbowy albo zdjęcie, więc szablon ma bloki warunkowe. Fragment między `{jesli_telefon}` a `{/jesli_telefon}` pojawia się tylko wtedy, gdy pole jest wypełnione:

```html
{jesli_telefon}<p style="margin:8px 0 0">
  <a href="tel:{telefon_link}" style="color:#0b6bcb">{telefon}</a>
</p>{/jesli_telefon}
```

Obok edytora jest podgląd na żywo dla wybranej osoby. Przycisk „Przywróć domyślny” wraca do szablonu zapisanego w plikach motywu. Zmiana wyglądu stopki nie wymaga więc programisty, a zawsze jest do czego wrócić.

![Zakładka „Szablon i ikony”: edytor kodu szablonu i podgląd stopki na żywo dla wybranej osoby](/blog/2026/stopki-mailowe-dla-calej-firmy/szablon-podglad.webp){width="1280" height="920"}

Zasada zamiany jest prosta. W JavaScripcie mogłaby wyglądać tak (to uproszczony przykład, nie kod z panelu):

```js
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

function renderSignature(template, data) {
  // {jesli_pole}…{/jesli_pole} znika, gdy pole jest puste
  const withBlocks = template.replace(
    /\{jesli_(\w+)\}([\s\S]*?)\{\/jesli_\1\}/g,
    (_, key, inner) => (data[key] ? inner : ''),
  )

  // {pole} zamienia się na wartość
  const filled = withBlocks.replace(/\{(\w+)\}/g, (tag, key) =>
    key in data ? escapeHtml(data[key]) : tag,
  )

  // bez odstępów między znacznikami
  return filled.replace(/>\s+</g, '><')
}
```

Najpierw znikają puste bloki warunkowe, potem znaczniki zamieniają się na dane (ze znakami specjalnymi HTML zamienionymi na encje), a na końcu znikają odstępy między znacznikami. Gmail zamienia je na puste miejsca w stopce. Panel składa stopki w PHP, a podgląd na żywo działa w JavaScripcie według tej samej zasady.

Ten sam szablon daje różne warianty – na przykład bez telefonu albo bez zdjęcia:

![Dwa warianty tej samej stopki: osoba bez telefonu i osoba bez zdjęcia](/blog/2026/stopki-mailowe-dla-calej-firmy/warianty.webp){width="1304" height="576"}

## HTML do poczty: tabela i style inline

W poczcie nowoczesny CSS na niewiele się przydaje. Gmail usuwa z podpisu bloki `<style>`, a Outlook na Windowsie słabo radzi sobie z flexem i gridem. Dlatego:

- cała stopka to jedna tabela o szerokości 600 px, a każdy element ma style w atrybucie `style`,
- każdy obrazek ma `width` i `height` – bez nich Outlook potrafi pokazać obrazek w oryginalnym rozmiarze,
- obrazki są w JPG i PNG. Strona zapisuje obrazki jako AVIF, ale Outlook i część aplikacji pocztowych go nie wyświetlają, a SVG blokuje Gmail. Przy obrazkach do stopek panel wyłącza więc zamianę na AVIF,
- obrazki mają podwójną rozdzielczość: zdjęcie 160 px wyświetla się w 80 px, ikony 56 px w 28 px, a logo 211 px w 105 px. Na ekranach o dużej gęstości pikseli są ostre, a ważą niewiele,
- zaokrąglone rogi zdjęcia daje CSS (`border-radius`), a nie sam plik, więc JPG zostaje lekki. Outlook na Windowsie pokaże ostre rogi – to świadomy kompromis.

Jedna stopka to ok. 4,2 KB HTML-a i 8–10 KB obrazków.

![Stopka w makiecie wiadomości e-mail w jasnym motywie](/blog/2026/stopki-mailowe-dla-calej-firmy/mail-jasny.webp){width="920" height="960"}

## „Kopiuj stopkę” – schowek z HTML-em

Najważniejszy dla pracownika jest jeden przycisk. „Kopiuj stopkę” zapisuje do schowka naraz gotowy HTML i zwykły tekst. Po wklejeniu w ustawieniach Gmaila stopka zachowuje formatowanie, a tam, gdzie HTML nie zadziała, wkleja się sam tekst. Tak może wyglądać takie kopiowanie (uproszczony przykład):

```js
// stopka trafia do schowka jako HTML i jako zwykły tekst
async function copySignature(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const text = doc.body.textContent.trim()

  await navigator.clipboard.write([
    new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' }),
    }),
  ])
}
```

Podgląd stopki w panelu jest w `<iframe srcdoc>`, więc style panelu WordPressa nie zmieniają jej wyglądu.

![Rozwinięty podgląd stopki w panelu z przyciskami „Kopiuj stopkę” i „Kopiuj HTML”](/blog/2026/stopki-mailowe-dla-calej-firmy/podglad-kopiuj.webp){width="1280" height="1250"}

## Obrazki, które się nie psują

Wszystkie obrazki stopek są w jednym publicznym folderze na serwerze strony. Panel generuje je z Biblioteki mediów: zdjęcia jako JPG, a logo i ikony jako PNG.

Zdjęcie ma stałą nazwę pliku z imienia i nazwiska, np. `jan-kowalski.jpg`. Gdy administrator podmieni zdjęcie, nowe pojawi się także w mailach, które już wysłano – program pocztowy pobiera je z tego samego adresu. Nazwa pliku nie zmienia się po zmianie imienia, więc wklejone stopki dalej działają. Gdy ktoś zniknie z listy, jego plik zostaje na serwerze, a nowa osoba o tym samym imieniu i nazwisku dostanie plik z końcówką `-2`.

Stare adresy obrazków też zostają. Maile wysłane przed nową stroną odwołują się do starych ścieżek, a panel pokazuje przy każdej, czy plik nadal jest na serwerze.

## Ograniczenia

- Stopka ma stałą szerokość 600 px. Na telefonie program pocztowy ją pomniejsza albo trzeba ją przewinąć w bok.
- Nie ma osobnej wersji dla trybu ciemnego. Gmail nie obsługuje `prefers-color-scheme` i usuwa `<style>`, więc ikony stoją na białym tle – dzięki temu czarne ikony nie znikają na ciemnym tle.
- Outlook na Windowsie nie zaokrągla rogów zdjęcia.
- Stopka w Gmailu nie aktualizuje się sama, gdy zmieni się stanowisko albo telefon – trzeba ją skopiować i wkleić jeszcze raz. Samo zdjęcie aktualizuje się samo, bo plik ma stałą nazwę.
- Gmail trzyma obrazki w pamięci podręcznej, więc nowy obrazek może pojawić się u odbiorców z opóźnieniem.

Stopki działają w Gmailu w przeglądarce – z niego korzysta zespół. Outlooka, Apple Mail i aplikacji na telefon jeszcze nie sprawdzałem.

![Po lewej stopka w ciemnym motywie programu pocztowego, po prawej na telefonie – szersza niż ekran](/blog/2026/stopki-mailowe-dla-calej-firmy/mail-ciemny-i-telefon.webp){width="1334" height="1030"}

## Drobiazg z CSS: `hidden` przegrywa z `display`

Przy robieniu zrzutów wyszedł mały błąd. Osoba bez zdjęcia miała w panelu pusty, „zepsuty” obrazek zamiast pustego pola. Element miał atrybut `hidden`, ale styl panelu ustawiał mu `display: block`.

Atrybut `hidden` ukrywa element tylko dzięki stylom przeglądarki (`display: none`), a każda reguła ze strony, która ustawia `display`, wygrywa z nimi. Wystarczyła jedna reguła:

```css
.preview {
  display: block;
}

/* bez tej reguły display: block wygrywa z atrybutem hidden */
.preview[hidden] {
  display: none;
}
```

## Co z tego zostało

- Stopki są w jednym miejscu, a pracownik kopiuje swoją jednym przyciskiem – nie trzeba już przesyłać ich sobie mailem.
- Szablon z prostymi znacznikami i podglądem na żywo pozwala zmienić wygląd stopek bez programisty.
- HTML do poczty to tabele, style w atrybutach i obrazki z `width` i `height`.
- Do maili tylko JPG i PNG, w podwójnej rozdzielczości.
- Stała nazwa pliku zdjęcia pozwala podmienić zdjęcie także w wysłanych mailach.
- `ClipboardItem` z `text/html` i `text/plain` kopiuje sformatowaną stopkę jednym kliknięciem.
- Jeśli nadajesz elementowi `display`, dopisz regułę dla `[hidden]`.
