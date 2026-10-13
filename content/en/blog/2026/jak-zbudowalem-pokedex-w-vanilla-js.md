---
date: '2026-06-01'
title: How I built a Pokedex in vanilla JS and why it taught me more than 10 tutorials
description: Can you build an advanced app for 1,000+ users without any frameworks? This is the story of my Pokedex in vanilla JavaScript. Real work with async code, cache and API optimization teaches you more than hundreds of theory tutorials.
tags: [javascript, vanilla-js, programowanie, frontend, api, performance]
project: /projects/2024/pokedex
draft: true
---

## Moving beyond UI work
When I started to learn JavaScript seriously, I was not a total beginner in web development. I could build advanced and good-looking views with Bootstrap, CSS, SCSS or Tailwind CSS. I already worked at a company as a UI Developer. But I wanted to go one step further. For that, I had to stop seeing JS as black magic. I had to start using it as a real programming language.

I was tired of the same exercises from online courses. Calculators and to-do lists are good for the first three days. But they don't give you one important thing: a goal and real passion. I wanted something ambitious, scalable and... my own. So I decided to build an interactive Pokedex with more than 1,000 creatures. No frameworks. Only me and vanilla JS.

---
### 📸 PHOTO PLACEHOLDER 1
* **What it should show:** A wide screenshot of the finished Pokedex app. The main list with working pagination and an open card of one Pokémon.
* **Goal:** Show that the final product looks professional and clean.
---

## Why a Pokedex? (And the "everything at once" trap)
I knew that Pokémon has a huge community, so I quickly found the public **PokéAPI**. It was a perfect choice. The data was ready, so I didn't have to build a database from zero. I could focus 100% on the business logic of the app.

I wanted to build everything at the same time: all generations, pagination, advanced filters, search and many personalization options. My head was full of chaos, and the code looked like a building site. Later I understood an important thing. To keep the project alive, I had to split it into small milestones that give you satisfaction.

## Async in practice: when course theory meets real code
In theory courses, `new Promise` was an abstract idea for me. I read about queuing operations, but I didn't fully understand it. The change came at work, when I started to analyze fetches in real code. Then I understood it. It was not a sudden revolution, more a slow, natural process. I saw how `async/await` makes async code natural and easy to read when you fetch data from an API. After that, I felt in control of what runs in the browser and when. In my main `Pokedex` class, the async `init()` method became like a conductor of the whole system. It manages URL loading, data initialization and view rendering, step by step.

## A different approach: how I saved the PokéAPI server
Most public tutorials use PokéAPI in a very simple way. They show only single requests (search by ID). They skip the real challenge: a smooth interface for a large number of objects.

I thought: "This will overload the browser, or the server will block me for too many requests." So I made a decision. I didn't want to bombard the API. Instead, I created my own small database in the browser storage.

On startup, my `DataManager` module checks the local storage. If the mapped number of species matches the API data, the app loads everything from `localStorage` right away. If not, the `DataBuilder` engine starts. I used `Promise.all()` inside `DataBuilder` to optimize the requests. The app doesn't fetch the data one by one. It sends requests in batches. Instead of more than 1,000 requests, my app needed only about 60–70. The app became almost 15 times faster.

## Work on UX: fast modals and smart pagination
The biggest lesson from vanilla JS was care for the small details of the interface (UX). When a user clicks a Pokémon card, they can't wait one second for the window. I used a hybrid strategy in the `PokemonDialog` class. When you open the popup, the app shows the basic data at once. It already has this data in local storage (name, type, generation and thumbnail). At the same time, the app sends a request for detailed battle stats to the API in the background. When the data comes back, the app puts it into the open window. It also saves it in `sessionStorage`, so the next click is instant.

Another problem was pagination that works well on mobile. A simple row of numbers `1, 2, 3...` on a phone screen is a nightmare. I built a two-way mechanism (`PaginationBuilder`). On a computer, the user clicks a normal list menu. On a smartphone, they use a native `<select>` element, which is easier. The two elements stay in sync. A click on a number updates the select. A change in the dropdown changes the active class in the list. `UrlManager` controls all of this. It keeps the page number in the browser address. It also removes any strange or unknown parameters (`?p=`) from the address bar.

## The hard part: hyphens in names and infinite loops
Work with a raw API quickly showed me the reality. For example, I found out that PokéAPI returns some names with hyphens. This made the interface look bad. So I wrote a rule with Regex: `/\-/.test(pokemon.name)`. When the app found a problem in the text, the name went into the `incorrectNames` array. Then the system sent exact async requests to fix it. It got the official, clean names from the English version of the database. I had a similar problem with generations written in Roman numerals. I wrote a special algorithm (`numRomanToArabic`) to change them to Arabic numerals.

I also made mistakes. I often wrote loops that froze my browser. But the hardest part was syncing data with the DOM. It was the "cherry on the cake" that kept falling off. `console.log` and `console.trace()` became my best friends. Today I know that I could save a lot of time with *breakpoints* in the debugger. But back then I couldn't use them well. To make my work easier, I coded a hidden developer mode (`devLimiter`). It cut the Pokémon list down to about a dozen test entries. This way I could debug the code safely, and the interface didn't freeze.

---
### 📸 PHOTO PLACEHOLDER 2
* **What it should show:** The *DevTools -> Application -> LocalStorage* tab with the saved, reduced data keys of the app, or the project file structure in VS Code.
---

## Looking back years later: what would I do differently?
I wrote the app fully in OOP, split into classes. Today, when I look at this code, I really think about it. Maybe I would rewrite some of these mechanisms as pure functions. But the chaos at the start taught me the most important lesson: **before you touch the keyboard, analyze the structure of the input data**.

Back then, there was no AI everywhere. You had to analyze bugs line by line. This lesson gave me good habits that I still have.

## Lessons for the future (what I learned back then):
1. **Theory needs practice right away:** I understood that courses make no sense if you only watch them. You need to rewrite and break the code yourself at the same time. My motivation and understanding grew the most when I used the knowledge from a video in my Pokedex right away.
2. **Good public data is half of the success:** I picked a project with a ready, stable API. I didn't need to design a backend, so I saved time. I could focus 100% on the front-end architecture, async operations and cache management.
3. **Bugs are the only real way to learn:** Infinite loops, memory leaks and a broken DOM state were not failures. In these moments I really made my brain understand how the JavaScript engine works inside.

**What's next?** My vanilla JS Pokedex still works well. My next step will be to rewrite it fully in Vue.js or React. It will be a great way to keep learning. I want to see how these tools automate the things that I had to build by hand here.
