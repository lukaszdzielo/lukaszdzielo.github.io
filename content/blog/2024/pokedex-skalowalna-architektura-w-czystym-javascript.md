---
date: '2024-01-28'
title: 'Pokedex v0.2 — skalowalna architektura w czystym JavaScript'
description: Case study aplikacji Pokedex w czystym JS — redukcja zapytań HTTP o 93% dzięki Promise.all i warstwowemu cache (LocalStorage + SessionStorage), z architekturą OOP gotową pod migrację do Vue 3.
tags: [javascript, vanilla-js, oop, pokeapi, performance, case-study]
kind: case-study
project: /projects/2024/pokedex
draft: false
---

## 📌 Metryki projektu

- **Architektura:** Object-Oriented Programming (OOP) / modularny Vanilla JS (ES6+)
- **Źródło danych:** PokéAPI REST API v2
- **Główne wyzwanie:** Optymalizacja procesów asynchronicznych, eliminacja nadmiarowych zapytań sieciowych oraz synchronizacja wielokanałowego interfejsu użytkownika (UI).
- **Kluczowy sukces:** Redukcja zapytań HTTP o **93%** poprzez asynchroniczną agregację danych i warstwową implementację pamięci cache (`LocalStorage` + `SessionStorage`).

---

### 📊 Schemat przepływu danych w aplikacji

```text
[PokéAPI Endpoints]
        │
        ▼  (Promise.all — równoległy fetch)
[DataBuilder] ──(transformacja & spłaszczenie)──► [StorageManager] ──► (LocalStorage Cache)
        │                                                   │
        ▼                                                   ▼
[DataManager] ◄───────────(weryfikacja integralności stanu)─┘
        │
        ├─► [AppBuilder] ──► [CardBuilder / PaginationBuilder] ──► [DOM Render]
        │
        └─► [PokemonDialog] ──► (natychmiastowe podstawowe UI)
                    │
                    └─► (tło: SessionStorage / Network Details) ──► (wstrzyknięcie statystyk)
```

---

## 1. Wyzwanie techniczne

Głównym problemem publicznego PokéAPI jest rozproszenie danych relacyjnych. Aby zbudować kompletną listę obiektów zawierającą kluczowe cechy (nazwy angielskie, typy oraz przynależność do generacji), standardowe sekwencyjne podejście wywołałoby ponad 1000 indywidualnych żądań HTTP `fetch` per jednostka.

W środowisku Vanilla JS, bez wsparcia zewnętrznych bibliotek, krytycznym punktem stało się zaprojektowanie systemu zarządzania stanem, asynchronicznego cache'owania oraz niezależnej, dwukierunkowej synchronizacji widoków UI dla platform desktopowych i mobilnych.

## 2. Rozwiązanie architektoniczne (OOP Core)

Aplikacja została oparta o wzorzec modułowy, izolując odpowiedzialności do wysokopoziomowych klas połączonych wspólnym kontekstem instancji głównej (`this.app`):

- **`Pokedex` (Core Engine):** Główny inicjalizator systemu (`app.js`). Rejestruje konfigurację globalną, uruchamia tryb deweloperski i zarządza asynchronicznym cyklem życia aplikacji poprzez metodę `init()`.
- **`DataManager` (State Orchestrator):** Odpowiada za weryfikację spójności danych lokalnych przed odpytaniem sieci. Sprawdza, czy liczba obiektów zgadza się z parametrem `speciesNum`. Synchronizuje stan za pomocą modułu `CatchedManager`.
- **`DataBuilder` (Data Transformer):** Silnik odpowiedzialny wyłącznie za operacje I/O, parsowanie struktur JSON i mapowanie ID.
- **`PokemonDialog` (UI Component):** Zarządza warstwą prezentacji szczegółów. Dziedziczy po abstrakcji `DialogBuilder`, implementując wzorzec projektowy Cache-First.
- **`StorageManager` (Data Persistence Proxy):** Hermetyzuje dostęp do `localStorage` oraz `sessionStorage`, odpowiadając za automatyczną serializację i deserializację danych.

## 3. Strategie wydajnościowe i optymalizacja UI/UX

### A. Strategia hybrydowa renderowania modala (Cache-First UX)

W celu zminimalizowania opóźnień interfejsu (*Time to First Meaningful Paint*), klasa `PokemonDialog` wykorzystuje technikę renderowania asynchronicznego opartego na dwóch źródłach danych:

```javascript
async open(id) {
    super.open();
    this.removeContent();
    this.insertBasicInfo(id); // KROK 1: Natychmiastowe renderowanie z lokalnego Cache O(1)

    // KROK 2: Pobranie szczegółowych statystyk (Session Cache vs Network)
    if (!this.app.dataManager.details[id]) {
        this.app.dataManager.details[id] = await this.getDetailsData(id);
    }
    this.app.storage.setSession(this.app.storage.names.details, this.app.dataManager.details);
    this.insertDetails(this.app.dataManager.details[id]); // Wstrzyknięcie danych rozszerzonych
}
```

Dzięki temu użytkownik otrzymuje natychmiastową informację zwrotną (popup z grafiką, nazwą i typem), podczas gdy ciężkie dane statystyczne (statystyki bazowe, waga, wzrost) doczytywane są asynchronicznie w tle.

### B. Dwuaspektowa paginacja responsywna (UI State Sync)

Klasa `PaginationBuilder` generuje i synchronizuje semantycznie odmienne struktury interfejsu użytkownika w zależności od punktu przerwania ekranu (deklaratywne `<ul>` dla desktopów oraz natywne `<select>` pod mobile):

```javascript
changeActiveLists(li) {
    this.paginations.forEach(pagination => {
        if (pagination.querySelector('ul') === li?.closest('ul')) {
            pagination.querySelector('.active').classList.remove('active');
            li.classList.add('active');
            return;
        };
        pagination.querySelector('.active').classList.remove('active');
        pagination.querySelector(`[data-page="${this.app.appBuilder.currentPage}"]`).classList.add('active');
    });
}
```

Każda zmiana strony wywołuje automatyczne wyrównanie stanów we wszystkich powiązanych komponentach oraz modyfikację parametrów adresu URL.

### C. Masowe potokowanie zapytań (Parallel Fetching)

W obrębie klasy `DataBuilder` zredukowano zjawisko blokowania wątku dzięki wykorzystaniu `Promise.all()`. Pobieranie typów oraz generacji przebiega równolegle w asynchronicznych pakietach:

```javascript
res.results.forEach(type => {
    const response = this.app.fetchAPI(type.url);
    responses.push(response);
});
const types = await Promise.all(responses);
```

Pozwoliło to ograniczyć początkową liczbę żądań sieciowych z ponad 1000 do około 60–70, optymalizując czas gotowości aplikacji do pracy.

## 4. Dodatkowe mechanizmy stabilności systemu

- **Routing i sanityzacja parametrów (`UrlManager`):** Metoda `removeUnknown()` aktywnie monitoruje obiekt `URLSearchParams` i usuwa nieudokumentowane parametry doklejone do paska adresu URL, chroniąc przed błędami stanów.
- **Zarządzanie motywem (`SchemeManager`):** Kontroluje motyw interfejsu, odpytując `StorageManager` bezpośrednio przy inicjalizacji drzewa DOM, co zapobiega powstawaniu efektu FOUC (błysku jasnego motywu podczas ładowania).
- **Narzędzia deweloperskie (`devLimiter`):** Wbudowany mechanizm filtrowania kluczy redukuje przetwarzany zbiór danych do sztywnej tablicy testowej podczas pracy na środowisku lokalnym, oszczędzając zasoby pamięci podręcznej dewelopera.

## 5. Podsumowanie

Projekt udowodnił skuteczność stosowania czystego podejścia obiektowego (OOP) do zarządzania stanem danych bez narzutu bibliotek zewnętrznych. Separacja logiki pobierania i transformacji danych (`DataBuilder`) od zarządzania stanem widoków pozwoliła na uzyskanie wysokiej wydajności (złożoność odczytu bazy *O(1)*) oraz przygotowała architekturę pod bezproblemową migrację do środowiska reaktywnego (np. Vue 3 z Composition API).
