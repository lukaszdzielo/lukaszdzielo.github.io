---
date: 2024-03-20
title: Pokedex – a few dozen requests instead of more than a thousand
description: How I built a Pokedex for more than 1,000 Pokémon in plain JavaScript – with a planned order of PokéAPI requests and a small database in the browser.
tags:
- javascript
- pokeapi
- projekt
kind: post
project: /projects/2024/pokedex
ogImage: /og/blog/pokedex-en.jpg
draft: false
---

Pokedex was my first bigger project in JavaScript. I wrote it while I was doing a course – no framework, just my own classes. I wanted to build something harder than another to-do list, and something I couldn't find ready-made.

I chose Pokémon for a simple reason: they have been around for years, so someone had surely built an API for them. I was right – PokéAPI was the first search result. Someone else keeps the data up to date, and I could focus on the code.

## The problem: the data is in many places

In PokéAPI every Pokémon has its own address with all its data. The easiest way is one request per Pokémon – that's what most tutorials do with the first generation. With more than 1,000 species, that means more than 1,000 requests every time someone opens the page. I was worried it would put too much load on the server and the page would load slowly.

So I turned it around. Instead of asking every Pokémon about its type, I ask every type about its Pokémon:

1. the species list – one request gives the numbers and names of all Pokémon,
2. types – each type returns the list of Pokémon that have it,
3. generations – each generation returns the list of its species.

The type and generation requests run in parallel with `Promise.all`. There are also separate requests for names with a hyphen – the API returns e.g. `mr-mime`, and I wanted "Mr. Mime" on the list. In total, it's a few dozen requests instead of more than a thousand.

## A small database in the browser

From these responses I build one object: Pokémon number → name, types and generation. The keys are one letter long (`n`, `t`, `g`), because everything goes to `localStorage`, where space is limited.

On the next visit, the page only asks the API how many species there are now. If the number matches the one in memory, the list loads from the browser – that's two requests instead of a few dozen. If new Pokémon appear in the API, the database rebuilds itself. That was my goal from the start: code that keeps working without me.

Height, weight and stats are loaded only when someone opens a Pokémon card. They go to `sessionStorage`, so opening the same card again doesn't send another request.

## The mistakes that taught me the most

At the beginning I got stuck in a loop that overloaded my computer more than once. Then came async code – I had to check where I was sending a request, what I got back and whether I needed that data at all. The hardest part was keeping it in sync with the DOM: the data is ready but the view isn't, or the other way round.

My main tools were `console.log` and `console.trace`. Today I would more often pause the code in the debugger at the point where something happens – I didn't do that back then, and it would probably have saved me a lot of time.

## What I would do differently today

- Start with small steps. At first I wanted to add everything at once – I learned to work step by step only after some time.
- First look at how the API returns data and what I really need, and only then write code.
- Maybe build the look first and the features later – I changed the design many times along the way.
- Not everything has to be a class. Today I would write some parts as plain functions.

The project doesn't look big, but it was an important step for me. One day I want to rewrite it in Vue – same topic, new lesson. For now, [Pokedex is live here](https://lukaszdzielo.github.io/pokedex/).
