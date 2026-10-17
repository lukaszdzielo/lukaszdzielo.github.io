---
date: 2026-08-01
title: e-cargo
description: 'A training platform for driver training centres. I built a large part of the front-end: the schedule, the instructor panel, the course builder and UI components.'
image: /projects/2026/e-cargo/dashboard.webp
tags: [vue]
featured: false
agency: Pesi
stack: [Vue 3, Inertia, Tailwind CSS]
note: A company app (Pesi) with no public access – the data on the screenshots is made up.
facts:
  - value: '8'
    suffix: ' months'
    text: the main part of the project – from December 2025 to the release in July 2026
  - value: '32'
    text: UI components used by the whole team – fields, dialogs, tables, tooltips
  - value: '171'
    text: icons as Vue components – one set for the whole app
  - value: '4'
    text: user roles – admin, training centre, instructor and student – with my views in each panel
cover:
  desktop: /projects/2026/e-cargo/schedule.webp
  width: 1440
  height: 1042
  alt: e-cargo – class schedule with vehicles in columns
ogImage: /og/projects/e-cargo-en.jpg
galleryLead: Screenshots of the app with made-up data – click one to see it bigger.
gallery:
  - src: /projects/2026/e-cargo/schedule.webp
    width: 1440
    height: 1042
    alt: Class schedule
    caption: Schedule – one day with vehicles in columns, conflicts marked in red, a new booking by dragging on the timeline
  - src: /projects/2026/e-cargo/training-centre-dashboard.webp
    width: 1440
    height: 1042
    alt: Training centre dashboard
    caption: Training centre dashboard – quick actions, recently started courses, leave requests, vehicle insurance and unavailability
  - src: /projects/2026/e-cargo/instructor-availability.webp
    width: 1440
    height: 1042
    alt: Instructor availability
    caption: Instructor availability – fixed weekly hours, custom hours, leave and a monthly calendar
  - src: /projects/2026/e-cargo/test-editor.webp
    width: 1440
    height: 1042
    alt: Test editor
    caption: Test editor – questions with explanations, pass mark and random questions
  - src: /projects/2026/e-cargo/question-editor.webp
    width: 1440
    height: 1042
    alt: Question editor
    caption: Question editor – the question, answers, explanation and a linked slide with an audio recording
highlights:
  - title: My own date and time picker
    text: One field for a date, a date with time or only time – with day, month and year views, min/max limits and a short format like "10 Jun 2026". It replaced the standard date fields in more and more views.
  - title: Selecting on the timeline
    text: Shared logic for the centre schedule, the instructor schedule and the student profile – 15-minute steps, and on touch screens a 400 ms press and a move tolerance, so scrolling does not create a booking by accident.
  - title: A tooltip only for cut text
    text: When a name does not fit in a field and ends with "…", you see the full text on hover – and when it fits, there is no tooltip. It also works in select fields, where a simple width check does not work – I measure the text in a hidden element with the same font.
  - title: Pop-ups that stay on the screen
    text: Tooltips, menus and select lists choose the side they open on and keep a gap from the edge of the screen – also when you scroll the page.
---

e-cargo is a platform for professional driver training centres: online courses for students, a class schedule with instructors, vehicles and rooms, and documents. I worked on it in the Pesi team – the main part, up to the production release, took from December 2025 to July 2026. In Vue 3 and Inertia I built a large part of the views and the components used by the whole team. I'm most happy with the component library – I built it from scratch. I spent a bit more time designing each new element to predict what could stop working, and I convinced the designer to base the design on repeatable elements. It turned out to be a nice product 🙂

## Main features

- A component library for the whole team – form fields, my own date and time picker, dialogs, tables, tooltips and over 170 icons
- A class schedule for instructors, vehicles and rooms – booking by dragging on the timeline and conflict warnings
- An instructor panel – fixed and one-off availability, absences and bookings, also on the phone
- A course builder – the course structure as a tree, a library of ready modules and slides, language versions
- A course for students – slides with audio recordings, notes, tests with explanations and a module summary
- Dashboards for the training centre and the admin, and hiding personal data with one switch
