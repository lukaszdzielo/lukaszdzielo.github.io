---
date: '2026-06-01'
title: How I built a Pokedex in vanilla JS and why it taught me more than 10 tutorials
description: Can you build an advanced app for 1,000+ users without any frameworks? Read the story of my Pokedex in vanilla JavaScript and see how a real fight with asynchronous code, caching and API optimization teaches you more than hundreds of theoretical tutorials.
tags: [javascript, vanilla-js, programowanie, frontend, api, performance]
project: /projects/2024/pokedex
draft: true
---

## Leaving the UI comfort zone
When I started learning JavaScript seriously, I wasn't a complete beginner in web development. I could put together advanced, good-looking views with Bootstrap, CSS, SCSS or Tailwind CSS. I was already working at a company as a UI Developer. But if I wanted to go a step further, I had to stop treating JS as black magic and start using it as a full programming language.

I was tired of the same old course exercises. Calculators and to-do lists are great for the first three days, but they don't give you one key thing: a sense of purpose and real passion. I was looking for something ambitious, scalable and... my own. I decided to build an interactive Pokedex covering more than 1,000 creatures. No ready-made frameworks. Just me and vanilla JS.

---
### 📸 PHOTO PLACEHOLDER 1
* **What it should show:** A wide screenshot of the finished Pokedex app. The main list view with working pagination and one Pokémon's card open.
* **Goal:** Show that the final product looks professional and polished.
---

## Why a Pokedex? (And the "everything at once" trap)
I knew Pokémon has a huge community, so I quickly found the public **PokéAPI**. It was the perfect choice – with the data already there, I didn't have to spend time building a database from scratch and could focus 100% on the app's business logic.

I wanted to implement fetching all generations, pagination, advanced filters, search and extensive personalization options, all at the same time. My head was a mess and the code turned into a construction site. Only later did I understand that the key to keeping the project alive was splitting it into small, rewarding milestones.

## Async in action: When course theory meets practice
In theoretical courses, `new Promise` was an abstraction to me. I read about queuing operations, but I didn't fully get it. The breakthrough came at work, when I started analyzing fetches running in real code. That's when it clicked – although it wasn't a sudden revolution, more of an organic process. When I saw how `async/await` lets you understand asynchronous code in a natural, readable way when fetching data from an API, I felt in control of what runs in the browser and when. In my main `Pokedex` class, the async `init()` method became a kind of conductor for the whole system, managing URL loading, data initialization and view rendering step by step.

## Going against the grain: How I spared the PokéAPI server
Most public tutorials treat PokéAPI very superficially – they focus only on single requests (search by ID) and skip the challenge of building a smooth interface for a large number of objects.

I thought: "This is going to overload the browser, or I'll get blocked on the server for constant requests." So I made a decision: instead of bombarding the API, I would create my own mini database in the browser's storage.

On startup, my `DataManager` module checks the state of local storage. If it detects that the mapped number of species matches the API data, the app loads everything from `localStorage` right away. If not, the `DataBuilder` engine starts. By using `Promise.all()` inside `DataBuilder`, I optimized the requests. Instead of fetching data one by one, the app sends requests in batches. Instead of more than 1,000 requests, my app needed only about 60–70. The app became almost 15 times faster.

## The fight for UX: Fast modals and smart pagination
The biggest lesson in vanilla JS turned out to be attention to interface details (UX). When a user clicks a Pokémon card, they can't wait a second for the window to load. I used a hybrid strategy in the `PokemonDialog` class. When you open the popup, the app instantly renders the basic data it already has in local storage (name, type, generation and thumbnail). At the same time, a request for detailed battle stats quietly goes to the API in the background. When the data arrives, it's injected straight into the already open window and saved in `sessionStorage`, so the next click gets an instant response.

Another puzzle was building pagination that works well on mobile. A plain row of numbers `1, 2, 3...` on a phone screen is a nightmare. I built a two-way mechanism (`PaginationBuilder`). On a computer, the user clicks a traditional list menu, and on a smartphone they use a convenient native `<select>` element. The two live in sync – clicking a number updates the select, and changing the option in the dropdown changes the active class in the list. `UrlManager` watches over all of it, making sure the page number is reflected in the browser address and automatically filtering out any suspicious or unknown parameters (`?p=`) from the address bar.

## The battlefield: Hyphens in names and infinite loops
Working with a raw API quickly brought me back down to earth. For example, I found out that PokéAPI returns some names with hyphens, which spoiled the look of the interface. So I wrote a Regex-based rule: `/\-/.test(pokemon.name)`. If the app detected anomalies in the text, the name went into the `incorrectNames` array, and the system made targeted asynchronous correction requests to get the official, clean names from the English-language version of the database. It was the same with generations written in Roman numerals, which I converted to Arabic numerals with a dedicated algorithm (`numRomanToArabic`).

There were stumbles too. I regularly wrote loops that could freeze my browser. The hardest part, though, was syncing data with the DOM – that was the "cherry on top" that kept falling off. `console.log` and `console.trace()` became my best friends. Today I know that if I had been able to use *breakpoints* in the debugger well back then, I would have saved a lot of time. To make life easier, I coded a hidden developer mode (`devLimiter`) that cut the Pokémon list down to a dozen or so selected test entries, so I could debug the code safely without freezing the interface.

---
### 📸 PHOTO PLACEHOLDER 2
* **What it should show:** The *DevTools -> Application -> LocalStorage* tab showing the app's saved, reduced data keys, or the project's file structure in VS Code.
---

## Looking back years later: What would I do differently?
I wrote the app fully object-oriented, split into classes. Today, looking at this code in hindsight, I seriously wonder whether I would rewrite some of these mechanisms as pure functions. But the chaos I had at the start taught me the most important thing: **before you touch the keyboard, analyze the structure of the input data**.

In a world without AI everywhere, where you had to analyze bugs line by line, this lesson built healthy habits that stuck with me.

## Takeaways for the future (What I learned back then):
1. **Theory needs immediate practice:** I realized that watching courses without rewriting and breaking code on my own terms at the same time makes no sense. My biggest jump in motivation and understanding came when I applied what I learned from a video right away to the logic of my Pokedex.
2. **Good public data is half the battle:** Picking a project with a ready, stable API saved me the time of designing a backend and let me focus 100% on the front-end architecture, async operations and cache management.
3. **Bugs are the only real learning simulator:** Infinite loops, memory leaks and a broken DOM state weren't failures – they were the only moments when I really forced my brain to understand how the JavaScript engine works under the hood.

**What's next?** My vanilla JS Pokedex is alive and well. The next step, and a great way to keep growing, will be rewriting it entirely in Vue.js or React – to see for myself how they automate what I had to build by hand here.
