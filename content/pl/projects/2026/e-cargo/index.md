---
date: 2026-08-01
title: e-cargo
description: 'Platforma szkoleń dla ośrodków szkolenia kierowców – zbudowałem dużą część front-endu: harmonogram, panel instruktora, kreator kursów i komponenty UI.'
image: /projects/2026/e-cargo/dashboard.webp
tags: [vue]
featured: false
agency: Pesi
stack: [Vue 3, Inertia, Tailwind CSS]
note: Aplikacja firmowa (Pesi) bez publicznego dostępu – na zrzutach zmyślone dane.
facts:
  - value: '8'
    suffix: ' mies.'
    text: główna część projektu – od grudnia 2025 do wydania w lipcu 2026
  - value: '32'
    text: komponenty UI, z których korzysta cały zespół – pola, okna, tabele, podpowiedzi
  - value: '171'
    text: ikon jako komponenty Vue – jeden zestaw w całej aplikacji
  - value: '4'
    text: role użytkowników – administrator, ośrodek, instruktor i kursant – w każdym panelu moje widoki
cover:
  desktop: /projects/2026/e-cargo/schedule.webp
  width: 1440
  height: 1042
  alt: e-cargo – harmonogram zajęć z pojazdami w kolumnach
ogImage: /og/projects/e-cargo-pl.jpg
galleryLead: Zrzuty z aplikacji ze zmyślonymi danymi – kliknij zrzut, żeby go powiększyć.
gallery:
  - src: /projects/2026/e-cargo/schedule.webp
    width: 1440
    height: 1042
    alt: Harmonogram zajęć
    caption: Harmonogram – dzień z pojazdami w kolumnach, kolizje oznaczone na czerwono, nowa rezerwacja przeciąganiem po osi czasu
  - src: /projects/2026/e-cargo/training-centre-dashboard.webp
    width: 1440
    height: 1042
    alt: Pulpit ośrodka
    caption: Pulpit ośrodka – szybkie akcje, ostatnio rozpoczęte szkolenia, urlopy, ubezpieczenia pojazdów i niedyspozycje
  - src: /projects/2026/e-cargo/instructor-availability.webp
    width: 1440
    height: 1042
    alt: Dostępność instruktora
    caption: Dostępność instruktora – stały grafik tygodnia, niestandardowe godziny, urlopy i kalendarz miesiąca
  - src: /projects/2026/e-cargo/test-editor.webp
    width: 1440
    height: 1042
    alt: Edytor testu
    caption: Edytor testu – pytania z wyjaśnieniami odpowiedzi, próg zdawalności i losowanie pytań
  - src: /projects/2026/e-cargo/question-editor.webp
    width: 1440
    height: 1042
    alt: Edycja pytania
    caption: Edycja pytania – treść, odpowiedzi, wyjaśnienie i przypisany slajd z nagraniem audio
highlights:
  - title: Własny wybór daty i godziny
    text: Jedno pole na datę, datę z godziną albo samą godzinę – z widokiem dni, miesięcy i lat, granicami min/max i formatem „10 cze 2026”. Zastąpiło zwykłe pola daty w kolejnych widokach.
  - title: Zaznaczanie na osi czasu
    text: Wspólna logika dla harmonogramu ośrodka, instruktora i profilu kursanta – krok 15 minut, a na dotyku przytrzymanie 400 ms i tolerancja ruchu, żeby przewijanie nie tworzyło przypadkiem rezerwacji.
  - title: Podpowiedź tylko przy uciętym tekście
    text: Gdy nazwa nie mieści się w polu i kończy wielokropkiem, po najechaniu widać pełną treść – a gdy się mieści, podpowiedzi nie ma. Działa też w polach wyboru (select), gdzie zwykłe porównanie szerokości zawodzi – tekst mierzę w ukrytym elemencie z tą samą czcionką.
  - title: Okienka, które nie wychodzą za ekran
    text: Podpowiedzi, menu i listy wyboru same wybierają stronę, po której się otworzą, i trzymają odstęp od krawędzi – także przy przewijaniu strony.
---

e-cargo to platforma dla ośrodków szkolenia kierowców zawodowych: kursy online dla kursantów, harmonogram zajęć z instruktorami, pojazdami i salami oraz dokumenty. Pracowałem nad nią w zespole Pesi – główna część, do wydania na produkcję, trwała od grudnia 2025 do lipca 2026. W Vue 3 i Inertia zbudowałem dużą część widoków i komponenty, z których korzysta cały zespół. Najbardziej jestem zadowolony z biblioteki komponentów – tworzyłem ją od zera. Każdy nowy element projektowałem trochę dłużej, żeby przewidzieć, co może przestać działać, i przekonałem grafika, żeby projekt opierał się na powtarzalnych elementach. Wyszedł z tego fajny produkt 🙂

## Najważniejsze cechy

- Biblioteka komponentów dla całego zespołu – pola formularzy, własny wybór daty i godziny, okna, tabele, podpowiedzi i ponad 170 ikon
- Harmonogram zajęć dla instruktorów, pojazdów i sal – rezerwacja przeciąganiem po osi czasu i ostrzeżenia o kolizjach
- Panel instruktora – dostępność stała i jednorazowa, nieobecności i rezerwacje, także na telefonie
- Kreator szkoleń – struktura kursu w drzewku, biblioteka gotowych modułów i slajdów, wersje językowe
- Kurs dla kursanta – slajdy z nagraniami audio, notatki, testy z wyjaśnieniami i podsumowanie modułu
- Pulpity ośrodka i administratora oraz ukrywanie danych osobowych jednym przełącznikiem
