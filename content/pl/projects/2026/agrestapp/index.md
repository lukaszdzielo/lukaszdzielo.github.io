---
date: 2026-10-01
title: AgrestApp
description: 'System zakupów surowców dla piekarni, cukierni, lodziarni i gastronomii – w zespole Pesi robię front-end: komponenty UI, stronę firmową, analitykę i zarządzanie ofertą dostawcy.'
image: /projects/2026/agrestapp/thumbnail.webp
tags: [vue]
featured: false
draft: false
agency: Pesi
stack: [Vue 3, Inertia, Tailwind CSS v4]
note: Pracuję w zespole – opisuję tylko części, przy których front-end jest mój. Panel aplikacji nie jest publiczny.
links:
  live: https://agrestapp.pl
facts:
  - value: '12'
    suffix: ' mies.'
    text: w projekcie – od października 2025
  - value: '69'
    text: ikon jako komponenty Vue w nowym zestawie UI
  - value: '4'
    text: strony branżowe – piekarnie, cukiernie, lodziarnie i HoReCa – zbudowane z tych samych sekcji
  - value: '296'
    text: klas w szablonach bez zmian przy przejściu na Tailwind v4
cover:
  desktop: /projects/2026/agrestapp/home-top.webp
  phone: /projects/2026/agrestapp/home-phone-top.webp
  width: 1440
  height: 900
  alt: AgrestApp – pierwszy ekran strony głównej
galleryLead: Strona firmowa i panel aplikacji – analityka na zmyślonych danych. Kliknij zrzut, żeby go powiększyć.
gallery:
  - src: /projects/2026/agrestapp/analytics-top.webp
    width: 1440
    height: 900
    alt: Analityka w trybie porównania
    caption: Analityka – zakres dat z suwakiem i polami, porównanie dwóch okresów, oszczędności i wykres (zmyślone dane)
  - src: /projects/2026/agrestapp/home-full.webp
    full: true
    alt: Strona główna AgrestApp
    caption: Strona główna – od pierwszego ekranu do newslettera
  - src: /projects/2026/agrestapp/about-system-full.webp
    full: true
    alt: Strona „O systemie”
    caption: „O systemie” – sekcje z opisem modułów
  - src: /projects/2026/agrestapp/industry-ice-cream-full.webp
    full: true
    alt: Strona dla lodziarni
    caption: Strona branżowa dla lodziarni – zbudowana z tych samych sekcji co pozostałe
  - src: /projects/2026/agrestapp/industry-confectionery-full.webp
    full: true
    alt: Strona dla cukierni
    caption: Strona branżowa dla cukierni
ogImage: /og/projects/agrestapp-pl.jpg
highlights:
  - title: Nagłówek panelu bez liczb na sztywno
    text: 'Przebudowałem nagłówek panelu. Pasek „Zaloguj jako” jest teraz jego częścią, a nagłówek sam mierzy swoją wysokość i zapisuje ją w zmiennej CSS. Menu boczne i przyklejone paski stron korzystają z tej zmiennej zamiast liczb 75 i 125 px wpisanych w kilku plikach. Menu konta obsłużysz z klawiatury i zamkniesz klawiszem Esc.'
  - title: Zakres dat w trzech miejscach naraz
    text: W analityce suwak, pola dat i adres strony pokazują ten sam zakres. Zmiana w jednym miejscu od razu zmienia pozostałe, a dane odświeżają się dopiero chwilę po ostatniej zmianie. Kalendarz nie pozwala ustawić początku po końcu, a domyślny zakres zaczyna się w dniu rejestracji firmy.
  - title: Tabela cen jak arkusz
    text: W zarządzaniu ofertą dostawcy Enter i strzałki przenoszą do pola w następnym wierszu, a jego zawartość jest od razu zaznaczona do nadpisania. Shift z kliknięciem zaznacza cały zakres wierszy, jak w poczcie.
  - title: Cena indywidualna bez pomyłek
    text: Okno ceny indywidualnej pilnuje minimalnej ceny netto, nie przyjmuje zera ani pustej wartości i podpowiada wartość domyślną dla pojedynczej pozycji. Cena podświetla się na zielono, gdy jest niższa lub równa najniższej cenie.
  - title: Tailwind v4 bez przepisywania szablonów
    text: Zamiast zmieniać setki klas przywróciłem w konfiguracji trzy wartości z v3. Potem porównałem wynikowy CSS z poprzednią wersją, przejrzałem strony i poprawiłem regresje, których nie zgłosił build – m.in. okna, które po migracji chowały się pod własnym przyciemnieniem.
---

AgrestApp to system zakupów dla firm z branży spożywczej: zamówienia i przetargi na surowce, monitoring cen, oferty dostawców i analityka oszczędności. Pracuję przy nim w zespole Pesi od października 2025. Front-end w Vue 3 i Inertia tworzy kilka osób, dlatego poniżej opisuję tylko części, przy których front-end jest mój.

## Co zrobiłem

- **Nagłówek panelu** – nowy nagłówek z paskiem „Zaloguj jako”, menu konta i wspólnym komponentem rozwijanej listy
- **Zestaw komponentów UI** – przyciski, akordeon, podpowiedzi, pola liczbowe i 69 ikon jako komponenty Vue; przeniesienie przycisków aplikacji na jeden komponent i wspólny przełącznik motywu
- **Strona firmowa** – strona „O systemie”, zestaw sekcji, z których powstały strony dla piekarni, cukierni, lodziarni i HoReCa, kafelki cenowe i cennik z przełącznikiem płatności
- **Analityka** – główny wykres, wybór zakresu dat z trybem porównania, najlepsi dostawcy, podsumowanie oszczędności i rentowność produktów
- **Zarządzanie ofertą dostawcy** – rozbudowa istniejącego ekranu: okno ceny indywidualnej, dodawanie artykułów, praca z klawiatury i zaznaczanie zakresu
- **Sklep** (dziś zamknięty) – koszyk z minimum logistycznym każdego dostawcy, zakup bez konta, historia zamówień i reklamacje
- **Migracja na Tailwind CSS v4** całego projektu
