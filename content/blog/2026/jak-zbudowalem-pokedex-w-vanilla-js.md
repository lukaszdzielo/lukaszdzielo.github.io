---
date: '2026-06-01'
title: Jak zbudowałem Pokedex w czystym JS i dlaczego nauczyło mnie to więcej niż 10 tutoriali
description: Czy da się zbudować zaawansowaną aplikację dla 1000+ użytkowników bez użycia frameworków? Poznaj historię mojego Pokedexa w czystym JavaScript i zobacz, jak realna walka z asynchronicznością, pamięcią cache i optymalizacją API uczy więcej niż setki teoretycznych tutoriali.
tags: [javascript, vanilla-js, programowanie, frontend, api, performance]
project: /projects/2024/pokedex
draft: false
---

## Wyjście poza bezpieczną strefę UI
Kiedy zaczynałem intensywną naukę JavaScriptu, nie byłem totalnym żółtodziobem w świecie web developmentu. Potrafiłem sprawnie składać zaawansowane, estetyczne widoki, korzystając z Bootstrapa, CSS, SCSS czy Tailwind CSS. Pracowałem już w firmie jako UI Developer. Jednak jeśli chcę pójść krok dalej, muszę przestać traktować JS jak czarną magię, a zacząć używać go jako pełnoprawnego języka programowania.

Miałem dość oklepanych zadań z kursów online. Kalkulatory i listy TODO są świetne na pierwsze trzy dni, ale nie dają jednej kluczowej rzeczy: poczucia celu i autentycznej pasji. Szukałem czegoś ambitnego, skalowalnego i... własnego. Postanowiłem zbudować interaktywny Pokedex obsługujący ponad 1000 stworzeń. Bez gotowych frameworków. Sam na sam z vanilla JS.

---
### 📸 MIEJSCE NA ZDJĘCIE 1
* **Co ma przedstawiać:** Panoramiczny screenshot gotowej aplikacji Pokedex. Widok głównej listy z działającą paginacją oraz otwartą kartą jednego z Pokemonów.
* **Cel:** Pokazanie, że końcowy produkt wygląda profesjonalnie i estetycznie.
---

## Dlaczego akurat Pokedex? (I pułapka "wszystko naraz")
Wiedziałem, że Pokemony mają ogromną społeczność, więc szybko odnalazłem publiczne **PokéAPI**. To był strzał w dziesiątkę – dzięki gotowym danym nie musiałem tracić czasu na żmudne pisanie bazy od zera, tylko mogłem w 100% skupić się na logice biznesowej aplikacji.

Chciałem jednocześnie zaimplementować pobieranie wszystkich generacji, paginację, zaawansowane filtry, wyszukiwarkę i rozbudowane opcje personalizacji. Chaos w głowie, a kod stał się placem budowy. Dopiero po czasie zrozumiałem, że kluczem do przetrwania projektu jest podzielenie go na małe, dające satysfakcję kamienie milowe.

## Asynchroniczność w boju: Gdy teoria z kursu spotyka praktykę
Podczas kursów teoretycznych konstrukcja `new Promise` była dla mnie abstrakcją. Czytałem o kolejkowaniu operacji, ale nie czułem tego w 100%. Przełom nastąpił w pracy, gdy zacząłem analizować realnie działające fetche. Wtedy zrozumiałem – choć nie była to nagła rewolucja, a raczej organiczny proces. Kiedy zobaczyłem, jak `async/await` w naturalny, czytelny sposób pozwala zrozumieć asynchroniczność przy pobieraniu danych z API, poczułem kontrolę nad tym, co i kiedy wykonuje się w przeglądarce. W mojej głównej klasie `Pokedex` asynchroniczna metoda `init()` stała się kimś w rodzaju dyrygenta całego systemu, sterującym ładowaniem adresów URL, inicjalizacją danych i renderowaniem widoku krok po kroku.

## Architektura pod prąd: Jak oszczędziłem serwer PokéAPI
Większość publicznych tutoriali traktuje PokéAPI bardzo powierzchownie – skupiają się wyłącznie na obsłudze pojedynczych zapytań (wyszukiwanie po ID) i całkowicie omijają wyzwanie polegające na zbudowaniu płynnego interfejsu dla masowej liczby obiektów.

Pomyślałem: "Przecież to zaraz przeciąży przeglądarkę albo dostanę blokadę na serwerze za ciągłe zapytania". Podjąłem decyzję i zamiast bombardować API, postanowiłem stworzyć własną mini-bazę danych w pamięci przeglądarki.

Mój moduł `DataManager` przy starcie sprawdza stan pamięci lokalnej. Jeśli wykryje, że zmapowana liczba gatunków zgadza się z danymi z API, aplikacja momentalnie ładuje zasoby z `localStorage`. Jeśli nie – uruchamia się silnik `DataBuilder`. Dzięki wykorzystaniu `Promise.all()` wewnątrz `DataBuilder` zoptymalizowałem zapytania. Zamiast pobierać dane pojedynczo, aplikacja wysyła pakiety żądań grupowo. Zamiast ponad 1000 żądań, moja aplikacja potrzebowała ich zaledwie ok. 60–70. Prędkość działania wzrosła blisko 15-to krotnie.

## Walka o UX: Szybkie modale i sprytna paginacja
Największą szkołą czystego JS okazała się dbałość o detale interfejsu (UX). Gdy użytkownik klika w kartę Pokemona, nie może czekać sekundy na załadowanie okna. Zastosowałem strategię hybrydową w klasie `PokemonDialog`. Kiedy otwierasz popup, aplikacja natychmiast renderuje podstawowe dane, które ma już pod ręką w pamięci lokalnej (imię, typ, generację i miniaturkę). W tym samym czasie w tle dyskretnie leci zapytanie o szczegółowe statystyki bojowe z API. Gdy dane spłyną, są wstrzykiwane wprost do otwartego już okna i zapisywane w `sessionStorage`, aby przy kolejnym kliknięciu reakcja była natychmiastowa.

Kolejną zagwozdką było stworzenie paginacji przyjaznej dla urządzeń mobilnych. Zwykły rządek cyferek `1, 2, 3...` na ekranie telefonu to koszmar. Stworzyłem mechanizm dwukierunkowy (`PaginationBuilder`). Na komputerze użytkownik klika w tradycyjne menu listowe, a na smartfonie operuje na wygodnym elemencie natywnym `<select>`. Oba te elementy żyją w symbiozie – kliknięcie cyfry aktualizuje pozycję selecta, a zmiana opcji w rozwijanym menu zmienia aktywną klasę na liście. Nad wszystkim czuwa `UrlManager`, który dba o to, by numer strony był odzwierciedlony w adresie przeglądarki, automatycznie odfiltrowując z paska adresu wszelkie podejrzane lub nieznane parametry (`?p=`).

## Pole bitwy: Myślniki w nazwach i nieskończone pętle
Praca z surowym API szybko sprowadziła mnie na ziemię. Odkryłem na przykład, że PokéAPI zwraca niektóre nazwy z myślnikami, co psuło estetykę interfejsu. Napisałem więc regułę opartą o Regex: `/\-/.test(pokemon.name)`. Jeśli aplikacja wykryła anomalie w strukturze tekstu, trafiała ona do tablicy `incorrectNames`, a system wykonywał precyzyjne asynchroniczne zapytania korygujące, wyciągając oficjalne, czyste nazwy z angielskiej wersji językowej bazy. Podobnie rzecz miała się z generacjami zapisanymi liczbami rzymskimi, które konwertowałem dedykowanym algorytmem na system arabski (`numRomanToArabic`).

Zdarzyły się też potknięcia. Regularnie pisałem pętle, które potrafiły zawiesić moją przeglądarkę. Najtrudniejsza okazała się jednak synchronizacja danych z DOM – to była ta "wisienka na torcie", która ciągle z niego spadała. Moim najlepszym przyjacielem stały się metody `console.log` oraz `console.trace()`. Dziś wiem, że gdybym wtedy umiał sprawnie korzystać z *breakpoints* w debuggerze, oszczędziłbym mnóstwo czasu. Aby ułatwić sobie życie, zakodowałem ukryty tryb deweloperski (`devLimiter`), który ucinał listę pokemonów do kilkunastu wybranych egzemplarzy testowych, pozwalając mi bezpiecznie debugować kod bez zamrażania interfejsu.

---
### 📸 MIEJSCE NA ZDJĘCIE 2
* **Co ma przedstawiać:** Widok z zakładki *DevTools -> Application -> LocalStorage*, prezentujący zapisane, zredukowane klucze danych aplikacji, lub struktura plików projektu w VS Code.
---

## Retrospekcja po latach: Co zrobiłbym inaczej?
Aplikację napisałem w pełni obiektowo, dzieląc ją na klasy. Dzisiaj, patrząc na ten kod z perspektywy czasu, mocno zastanawiam się, czy nie przepisałbym części z tych mechanizmów na czyste funkcje. Chaos, który towarzyszył mi na początku, nauczył mnie jednak najważniejszego: **zanim dotkniesz klawiatury, przeanalizuj strukturę danych wejściowych**.

W świecie bez wszechobecnego AI, gdzie błędy trzeba było analizować linijka po linijce, ta lekcja wyryła mi w pamięci zdrowe nawyki.

## Wnioski na przyszłość (Czego się wtedy nauczyłem):
1. **Teoria potrzebuje natychmiastowego gruntu:** Zrozumiałem, że oglądanie kursów bez równoległego przepisywania i psucia kodu na własnych warunkach nie ma sensu. Największy skok motywacji i zrozumienia miałem wtedy, gdy wiedzę z wideo od razu adaptowałem do logiki mojego Pokedexu.
2. **Dobre publiczne dane to połowa sukcesu:** Wybór projektu z gotowym, stabilnym API pozwolił mi zaoszczędzić czas na projektowaniu backendu i pozwolił w 100% skupić się na architekturze frontendu, operacjach asynchronicznych i zarządzaniu pamięcią cache.
3. **Błędy to jedyny realny symulator nauki:** Nieskończone pętle, wycieki pamięci czy rozjechany stan DOM to nie były porażki – to były jedyne momenty, w których realnie zmuszałem mózg do zrozumienia, jak pod spodem działa silnik JavaScriptu.

**Co dalej?** Mój Pokedex w vanilla JS żyje i ma się dobrze. Kolejnym krokiem i doskonałą formą dalszego rozwoju będzie dla mnie przepisanie go w całości na Vue.js lub React – po to, by świadomie zobaczyć, jak one automatyzują to, co tutaj musiałem stworzyć ręcznie.