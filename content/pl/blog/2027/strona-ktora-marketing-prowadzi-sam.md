---
date: 2027-01-19
title: 'Strona, którą marketing prowadzi sam – co jest w motywie blokowym pesi.pl'
description: Na nowej pesi.pl redakcja układa strony z gotowych bloków, okna buduje w edytorze, a baner zgód działa z trybem zgód Google. Opisuję własne bloki, ikony, kolory działów, okna na <dialog> i kilka drobiazgów, które ułatwiają pracę.
tags:
- wordpress
- html
- css
kind: case-study
art: /art/blog/strona-ktora-marketing-prowadzi-sam.svg
ogImage: /og/blog/strona-ktora-marketing-prowadzi-sam-pl.jpg
project: /projects/2026/pesi-pl
translationKey: strona-ktora-marketing-prowadzi-sam
draft: false
---

W pierwszym wpisie o nowej [pesi.pl](https://pesi.pl) pisałem o tym, [co naprawdę przyspieszyło stronę](/pl/wpisy/2026/nowa-pesi-pl). Ten jest o drugiej połowie celu: na starej stronie każdą zmianę i każdy wpis wklejał ktoś z front-endu albo back-endu, a nie marketing. Nowa strona miała to zmienić – marketing publikuje sam i łatwiej śledzi zmiany na stronie.

Strona to własny **motyw blokowy** WordPressa (Full Site Editing). Redakcja układa treść w edytorze bloków z gotowych bloków i stylów motywu, bez kreatora stron (page buildera). Oferta to 12 podstron usług w 3 działach: Development, Design i Marketing. Kod, tak jak całej strony, napisał Claude Code.

![Pierwszy ekran nowej pesi.pl: hasło „Razem zmieniamy cyfrowy świat” i trzy kolorowe kostki 3D](/blog/2027/strona-ktora-marketing-prowadzi-sam/strona-glowna.webp){width="1440" height="900"}

## Własne bloki zamiast kreatora stron

Motyw ma 10 własnych bloków: Ikona, Logo, Kropki PESI, Udogodnienia, Animacja Lottie, Kostki 3D, Opinie, Realizacje, Mozaika zespołu i Ramka autorów wpisu.

Opinie, realizacje i autorzy to osobne typy treści w panelu. Bloki tylko je wyświetlają – jako karuzelę albo siatkę, z wyborem konkretnych pozycji, kategorii i limitu. Opinię dodaje się więc raz, a pokazuje na stronie głównej, w ofercie i gdzie tylko trzeba.

Tak wyglądają ustawienia bloku „Realizacje”: które realizacje pokazać (kolejność kart to kolejność zaznaczania), ile ich ma być i czy nad kartami mają być filtry rodzajów.

![Edytor bloków: zaznaczony blok „Realizacje” na stronie „UI/UX Design”, w panelu bocznym lista realizacji do zaznaczenia, liczba realizacji i filtry rodzajów; opinie klientów niżej są rozmyte](/blog/2027/strona-ktora-marketing-prowadzi-sam/edytor-realizacje.webp){width="1440" height="1540"}

## Ikony i kolor działu

Blok „Ikona” ma bibliotekę 1 520 ikon Phosphor i ikonografiki PESI. Ikona bierze kolor z koloru tekstu, więc pasuje do miejsca, w którym stoi, bez osobnego ustawienia. W SVG wystarczy do tego `currentColor`:

```html
<!-- ikona dziedziczy kolor tekstu z rodzica -->
<p style="color: #7c3aed">
  <svg viewBox="0 0 256 256" width="32" height="32" aria-hidden="true">
    <circle cx="128" cy="128" r="96" fill="currentColor"/>
  </svg>
  UI/UX Design
</p>
```

W edytorze ikonę wybiera się w panelu bocznym: biblioteka (ikonografiki PESI, Phosphor albo wszystkie), wyszukiwarka i siatka ikon do kliknięcia.

![Edytor bloków: zaznaczony blok „Ikona” w sekcji „Dlaczego warto?”, w panelu bocznym wybór biblioteki, wyszukiwarka i siatka ikon, niżej kolor akcentu](/blog/2027/strona-ktora-marketing-prowadzi-sam/edytor-ikona.webp){width="1440" height="1000"}

Podstrony działów dostają też własny akcent: Design – fioletowy, Marketing – żółty, Development – niebieski. Dzieje się to automatycznie, redakcja niczego nie ustawia ręcznie.

![Usługi na stronie głównej w trzech działach: kafelki z ikonami, przy nazwie działu kropka w jego kolorze](/blog/2027/strona-ktora-marketing-prowadzi-sam/uslugi-ikony.webp){width="1280" height="1350"}

W menu ikony są animowane – motyw ma 16 animacji Lottie, a każda odtwarza się wtedy, gdy ikona jest widoczna.

![Rozwinięte menu „Oferta”: trzy działy, przy każdej usłudze animowana ikona](/blog/2027/strona-ktora-marketing-prowadzi-sam/menu-oferta.webp){width="1440" height="560"}

## Okna, które redakcja buduje w edytorze

Okno (modal) to zwykła grupa bloków ze stylem „Okno (modal)” i kotwicą, np. `#bezplatna-analiza`. Na stronie taka grupa zamienia się w `<dialog>`, a otwiera ją każdy link do tej kotwicy – w przycisku, w menu albo w tekście. Redakcja buduje więc okno w edytorze jak każdą inną treść i nie potrzebuje do tego programisty.

![Edytor bloków: zaznaczona grupa „Okno – Bezpłatna analiza” ze stylem „Okno (modal)”, a w panelu bocznym w sekcji „Zaawansowane” kotwica HTML bezplatna-analiza](/blog/2027/strona-ktora-marketing-prowadzi-sam/edytor-okno-kotwica.webp){width="1440" height="1700"}

Na stronie wygląda to tak:

![Okno „Bezpłatna analiza Twojej strony” z formularzem, otwarte linkiem do kotwicy](/blog/2027/strona-ktora-marketing-prowadzi-sam/okno-z-bloku.webp){width="920" height="880"}

Zasadę pokazuje ten przykład (uproszczony, nie kod z motywu):

```js
// link do kotwicy okna otwiera <dialog> zamiast przewijać stronę
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]')
  const dialog = link && document.getElementById(link.hash.slice(1))

  if (dialog instanceof HTMLDialogElement) {
    event.preventDefault()
    dialog.showModal()
  }
})
```

Jeden nasłuchiwacz na całym dokumencie łapie kliknięcia we wszystkie linki, także te, które redakcja doda później. `closest()` szuka najbliższego elementu w górę drzewa, który pasuje do selektora – tu linku, nawet jeśli kliknięto ikonę w jego środku. O samym `<dialog>` pisałem przy [galerii zrzutów w moim portfolio](/pl/wpisy/2026/galeria-na-dialog). Obrazki w zamkniętych oknach ładują się dopiero wtedy, gdy są potrzebne.

## Zgody na cookies: własny baner i tryb zgód Google

Baner zgód to też własny `<dialog>`, z trzema kategoriami: niezbędne, analityczne i marketingowe. Domyślnie wszystko poza niezbędnymi jest wyłączone, a Google Tag Manager do czasu zgody działa w trybie bez ciasteczek (Google Consent Mode v2). Wybór można zmienić linkiem w stopce, a gdy zmieni się wersja zgody, baner pokazuje się wszystkim jeszcze raz.

![Baner zgód przy pierwszej wizycie – na komputerze i na telefonie: „Akceptuję wszystkie”, „Odrzucam” i „Ustawienia”](/blog/2027/strona-ktora-marketing-prowadzi-sam/baner-zgod.webp){width="1414" height="844"}

Domyślna odmowa musi być ustawiona, zanim załaduje się Google Tag Manager. W uproszczeniu:

```js
// przed wczytaniem GTM: wszystko poza niezbędnymi – odmowa
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
})

// po zgodzie na pliki cookies analityczne
gtag('consent', 'update', { analytics_storage: 'granted' })
```

Dwie rzeczy z Google ładują się dopiero po kliknięciu:

- **mapa Google** w kontakcie – po kliknięciu „Pokaż mapę”, bo bez kliknięcia nie ma ciasteczek Google,
- **filmy z YouTube** – najpierw miniatura, a odtwarzacz dopiero po kliknięciu.

## SEO i autorzy

- Tytuły, opisy, Open Graph i mapę strony obsługuje wtyczka SEO, a motyw dodaje dane strukturalne firmy (LocalBusiness z adresem i godzinami otwarcia).
- Autorzy mają osobne profile, a pod wpisem jest ramka z autorem tekstu.
- Publicznym autorem wpisów jest nazwa firmy, a nie loginy kont – boty zgadują loginy z nazwy autora.
- Stare adresy, także plików PDF, przekierowują na nowe (301), a każde przekierowanie ma licznik użyć.

## Drobiazgi, które robią różnicę

- **Stały pasek przewijania.** Gdy otwiera się menu albo okno, strona nie przesuwa się w bok, bo miejsce na pasek przewijania jest zarezerwowane zawsze:

  ```css
  html {
    scrollbar-gutter: stable;
  }
  ```

- **Bez komentarzy.** Komentarze, pingbacki i trackbacki są wyłączone na stałe.
- **Dostępność.** Okna i baner to natywne `<dialog>` z etykietami, fokus jest widoczny, a menu działa z klawiatury. Na badanych podstronach Lighthouse daje w dostępności 100.

## Co z tego zostało

- Motyw blokowy z własnymi blokami daje redakcji swobodę bez kreatora stron.
- Treści, które pojawiają się w wielu miejscach (opinie, realizacje, autorzy), lepiej trzymać jako osobne typy treści, a blokiem tylko je wyświetlać.
- `currentColor` w ikonach SVG oszczędza ustawiania koloru każdej ikonie.
- Okno zbudowane w edytorze i otwierane linkiem do kotwicy to prosty sposób na modale bez programisty.
- Domyślna odmowa zgód musi być ustawiona, zanim wczyta się Google Tag Manager.
- `scrollbar-gutter: stable` to jedna linijka CSS, a strona przestaje skakać przy otwieraniu okien.
