---
date: '2024-01-28'
title: 'Pokedex v0.2 – a scalable architecture in vanilla JavaScript'
description: A case study of a Pokedex app in vanilla JS – 93% fewer HTTP requests thanks to Promise.all and a layered cache (LocalStorage + SessionStorage), with an OOP architecture ready for a migration to Vue 3.
tags: [javascript, vanilla-js, oop, pokeapi, performance, case-study]
kind: case-study
project: /projects/2024/pokedex
draft: true
---

## 📌 Project metrics

- **Architecture:** Object-Oriented Programming (OOP) / modular Vanilla JS (ES6+)
- **Data source:** PokéAPI REST API v2
- **Main challenge:** Optimizing asynchronous processes, eliminating redundant network requests and keeping a multi-channel user interface (UI) in sync.
- **Key result:** **93%** fewer HTTP requests through asynchronous data aggregation and a layered cache (`LocalStorage` + `SessionStorage`).

---

### 📊 Data flow in the app

```text
[PokéAPI Endpoints]
        │
        ▼  (Promise.all – parallel fetch)
[DataBuilder] ──(transform & flatten)───────────► [StorageManager] ──► (LocalStorage Cache)
        │                                                   │
        ▼                                                   ▼
[DataManager] ◄───────────(state integrity check)───────────┘
        │
        ├─► [AppBuilder] ──► [CardBuilder / PaginationBuilder] ──► [DOM Render]
        │
        └─► [PokemonDialog] ──► (instant basic UI)
                    │
                    └─► (background: SessionStorage / Network Details) ──► (inject stats)
```

---

## 1. The technical challenge

The main problem with the public PokéAPI is that its relational data is scattered. To build a complete list of objects with the key attributes (English names, types and generation), the standard sequential approach would trigger more than 1,000 individual HTTP `fetch` requests, one per entry.

In a Vanilla JS environment, with no external libraries, the critical part was designing the state management, the asynchronous caching and an independent, two-way sync of the UI views for desktop and mobile.

## 2. Architecture (OOP Core)

The app is built on the module pattern, with responsibilities split into high-level classes that share the context of the main instance (`this.app`):

- **`Pokedex` (Core Engine):** The main system initializer (`app.js`). It registers the global config, starts the developer mode and manages the app's asynchronous lifecycle through the `init()` method.
- **`DataManager` (State Orchestrator):** Checks that the local data is consistent before querying the network. It verifies that the number of objects matches the `speciesNum` parameter. It syncs state through the `CatchedManager` module.
- **`DataBuilder` (Data Transformer):** An engine responsible only for I/O, parsing JSON structures and mapping IDs.
- **`PokemonDialog` (UI Component):** Handles the presentation layer for the details. It extends the `DialogBuilder` abstraction and implements the Cache-First design pattern.
- **`StorageManager` (Data Persistence Proxy):** Encapsulates access to `localStorage` and `sessionStorage` and handles serializing and deserializing data automatically.

## 3. Performance strategies and UI/UX optimization

### A. Hybrid modal rendering strategy (Cache-First UX)

To minimize interface delays (*Time to First Meaningful Paint*), the `PokemonDialog` class uses asynchronous rendering based on two data sources:

```javascript
async open(id) {
    super.open();
    this.removeContent();
    this.insertBasicInfo(id); // STEP 1: Instant render from the local O(1) cache

    // STEP 2: Fetch detailed stats (Session Cache vs Network)
    if (!this.app.dataManager.details[id]) {
        this.app.dataManager.details[id] = await this.getDetailsData(id);
    }
    this.app.storage.setSession(this.app.storage.names.details, this.app.dataManager.details);
    this.insertDetails(this.app.dataManager.details[id]); // Inject the extended data
}
```

This way the user gets instant feedback (a popup with the image, name and type), while the heavy stats data (base stats, weight, height) loads asynchronously in the background.

### B. Two-sided responsive pagination (UI State Sync)

The `PaginationBuilder` class generates and syncs semantically different UI structures depending on the screen breakpoint (a declarative `<ul>` for desktop and a native `<select>` for mobile):

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

Every page change automatically aligns the state of all related components and updates the URL parameters.

### C. Batched requests (Parallel Fetching)

Inside the `DataBuilder` class, thread blocking was reduced by using `Promise.all()`. Types and generations are fetched in parallel, in asynchronous batches:

```javascript
res.results.forEach(type => {
    const response = this.app.fetchAPI(type.url);
    responses.push(response);
});
const types = await Promise.all(responses);
```

This cut the initial number of network requests from more than 1,000 to about 60–70, so the app is ready to use much sooner.

## 4. Additional stability mechanisms

- **Routing and parameter sanitization (`UrlManager`):** The `removeUnknown()` method watches the `URLSearchParams` object and removes undocumented parameters appended to the URL, which prevents state errors.
- **Theme management (`SchemeManager`):** Controls the interface theme by querying `StorageManager` right when the DOM tree is initialized, which prevents FOUC (a flash of the light theme while the page loads).
- **Developer tools (`devLimiter`):** A built-in key filter reduces the processed data set to a fixed test array during local development, which saves the developer's cache storage.

## 5. Summary

The project showed that a plain object-oriented (OOP) approach works for managing data state without the overhead of external libraries. Separating data fetching and transformation (`DataBuilder`) from view state management gave high performance (*O(1)* database reads) and prepared the architecture for a smooth migration to a reactive environment (e.g. Vue 3 with the Composition API).
