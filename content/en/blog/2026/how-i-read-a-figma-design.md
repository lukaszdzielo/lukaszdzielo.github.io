---
date: 2026-12-15
title: 'How I read a Figma design before I write the first line'
description: Where I start when I get a design in Figma, what I ask about right away, and how being a graphic designer before helps me.
tags:
- figma
- workflow
- design
kind: post
art: /art/blog/jak-czytam-projekt-z-figmy.svg
ogImage: /og/blog/jak-czytam-projekt-z-figmy-en.jpg
translationKey: jak-czytam-projekt-z-figmy
draft: false
---

Before I write the first line of code, I spend some time in the design itself. I also worked as a graphic designer before, so I look at a design from two sides: as a developer who likes repeated elements and clear rules, and as someone who used to prepare designs like this. Here's where I start and what I ask about.

## Assets first

At the start I check the assets. I want to know which fixed elements appear in the design: buttons, form fields, cards, icons, colours and fonts. They will become components and variables in the code. If I know about them from the start, I write them once, not again for every view.

## Then spacing and components

Next I look at the spacing and check whether the elements on the screens are really connected to the components from the assets. A button that looks the same as the one in the library can be a detached copy – with different spacing or a different colour. On the screen the difference is almost invisible, but in code it means a question: is this a mistake or a new variant?

## I ask right away

If something doesn't match, I prefer to check it right away – with my manager or with the designer. I ask how they see it and whether it should really look like this. A short question at the start costs less than rewriting a finished view.

## What most often needs clarifying

- **Different spacing** in similar places – for example 16 px on one card and 20 px on another.
- **Missing states** – there's no button on hover, no field with an error and no empty list.
- **No mobile version**, or only one screen instead of the whole view.
- **Content hidden in a scrolling element.** In Figma I can inspect almost everything I can see. But when an element has scrolling content, I still have to build the part that isn't visible. Then I ask the designer to copy all the scrolling content and lay it out next to it. If it's a component and I can open it – great, but that's not always the case.

## How being a graphic designer helps me

Because I'm a developer, I like repeated elements, a scheme prepared in advance and a list of rules to follow. Because I was a graphic designer, I can fill the gap when something needs to be agreed with the designer, or when there's no designer and I have to adjust something myself. Then I arrange the elements by instinct, so they work well together.

I also look at the design from the point of view of a client who has no contact with design. The idea is that a person on the page doesn't wander around with their eyes and click blindly, but knows right away how something will behave.

## What came out of it

- I start with the assets – they are the future components and variables in the code.
- I check whether the elements on the screens are connected to components, not detached copies.
- I clear up doubts right away, not after the view is written.
- I ask about states, the mobile version and content hidden in scrolling elements.
