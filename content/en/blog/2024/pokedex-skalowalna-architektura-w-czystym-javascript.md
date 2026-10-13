---
date: '2024-01-28'
title: 'Pokedex v0.2 – a scalable architecture in vanilla JavaScript'
description: A case study of my Pokedex app in vanilla JS. I cut HTTP requests by 93% with Promise.all and a layered cache (LocalStorage + SessionStorage). The OOP architecture is ready to move to Vue 3.
tags: [javascript, vanilla-js, oop, pokeapi, performance, case-study]
kind: case-study
project: /projects/2024/pokedex
draft: true
---

## 📌 Project metrics

- **Architecture:** Object-Oriented Programming (OOP) / modular Vanilla JS (ES6+)
- **Data source:** PokéAPI REST API v2
- **Main challenge:** Optimize async processes, remove extra network requests and keep a multi-channel user interface (UI) in sync.
- **Key result:** **93%** fewer HTTP requests. I got this with async data aggregation and a layered cache (`LocalStorage` + `SessionStorage`).

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

The public PokéAPI has one main problem: its relational data is spread across many places. I wanted a complete list of objects with the key attributes (English names, types and generation). With the standard sequential approach, this needs more than 1,000 separate HTTP `fetch` requests, one per entry.

I worked in Vanilla JS, with no external libraries. So the most important part was the design of three things: state management, async caching, and an independent, two-way sync of the UI views for desktop and mobile.

## 2. Architecture (OOP Core)

I built the app on the module pattern. I split the responsibilities into high-level classes. They all share the context of the main instance (`this.app`):

- **`Pokedex` (Core Engine):** The main initializer of the system (`app.js`). It registers the global config and starts the developer mode. It also manages the async lifecycle of the app with the `init()` method.
- **`DataManager` (State Orchestrator):** Checks if the local data is consistent before it sends requests to the network. It checks if the number of objects matches the `speciesNum` parameter. It syncs the state with the `CatchedManager` module.
- **`DataBuilder` (Data Transformer):** An engine that does only three things: I/O, parsing JSON structures and mapping IDs.
- **`PokemonDialog` (UI Component):** Manages the presentation layer for the details. It extends the `DialogBuilder` abstraction and uses the Cache-First design pattern.
- **`StorageManager` (Data Persistence Proxy):** Encapsulates access to `localStorage` and `sessionStorage`. It serializes and deserializes the data automatically.

## 3. Performance strategies and UI/UX optimization

### A. Hybrid modal rendering strategy (Cache-First UX)

I wanted to keep interface delays as short as possible (*Time to First Meaningful Paint*). So the `PokemonDialog` class uses async rendering with two data sources:

```javascript
async open(id) {
    super.open();
    this.removeContent();
    this.insertBasicInfo(id); // STEP 1: Render at once from the local O(1) cache

    // STEP 2: Get detailed stats (Session Cache vs Network)
    if (!this.app.dataManager.details[id]) {
        this.app.dataManager.details[id] = await this.getDetailsData(id);
    }
    this.app.storage.setSession(this.app.storage.names.details, this.app.dataManager.details);
    this.insertDetails(this.app.dataManager.details[id]); // Add the extra data
}
```

This way the user sees a result at once: a popup with the image, name and type. At the same time, the heavy stats data (base stats, weight, height) loads async in the background.

### B. Two-sided responsive pagination (UI State Sync)

The `PaginationBuilder` class creates and syncs two semantically different UI structures. The choice depends on the screen breakpoint: a declarative `<ul>` for desktop and a native `<select>` for mobile.

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

After every page change, the state of all related components updates automatically. The URL parameters update too.

### C. Batched requests (Parallel Fetching)

In the `DataBuilder` class, I used `Promise.all()` to block the thread less. The app fetches types and generations in parallel, in async batches:

```javascript
res.results.forEach(type => {
    const response = this.app.fetchAPI(type.url);
    responses.push(response);
});
const types = await Promise.all(responses);
```

This cut the first number of network requests from more than 1,000 to about 60–70. Now the app is ready to use much sooner.

## 4. Additional stability mechanisms

- **Routing and parameter sanitization (`UrlManager`):** The `removeUnknown()` method watches the `URLSearchParams` object. It removes unknown parameters that someone adds to the URL. This prevents state errors.
- **Theme management (`SchemeManager`):** Controls the interface theme. It reads the theme from `StorageManager` right when the DOM tree starts. This prevents FOUC (a flash of the light theme while the page loads).
- **Developer tools (`devLimiter`):** A built-in key filter is active during local development. It reduces the data set to a fixed test array. This saves the cache storage on the developer's machine.

## 5. Summary

The project showed that a plain object-oriented (OOP) approach works well for data state management. You don't need the extra weight of external libraries. I separated data fetching and transformation (`DataBuilder`) from view state management. This gave high performance (*O(1)* database reads). It also prepared the architecture for an easy migration to a reactive environment (for example Vue 3 with the Composition API).
