---
date: 2026-12-08
title: 'Email signatures for the whole company in the WordPress admin'
description: Together with Claude Code, I built a WordPress panel that keeps the whole company's email signatures in one place – each person copies theirs into Gmail with one button. The signature itself is a table with inline styles, because email apps would break anything else.
tags:
- wordpress
- html
- css
kind: case-study
art: /art/blog/stopki-mailowe-dla-calej-firmy.svg
ogImage: /og/blog/stopki-mailowe-dla-calej-firmy-en.jpg
project: /projects/2026/pesi-pl
translationKey: stopki-mailowe-dla-calej-firmy
draft: false
---

Email signatures at [Pesi](https://pesi.pl) used to travel by email: someone sent theirs, someone else copied it and changed it. In the end, nobody knew where the signatures were or how to change them. The idea was simple – the signatures should be in one place and easy for everyone to edit.

That's why the new company website, which I wrote about in [The new pesi.pl – what actually made it faster](/blog/2026/the-new-pesi-pl), got a signature generator in the WordPress admin. Claude Code wrote the code, just like for the rest of the site. A few people on the team have already switched to the new signatures.

The people in the screenshots are made up, and the photos are initials. I replaced the company's registration details in the signature with a short description.

![A finished email signature: a photo with initials, name, job title, phone, email, the company logo and social media icons](/blog/2026/stopki-mailowe-dla-calej-firmy/stopka-gotowa.webp){width="640" height="588"}

## What an employee and an admin can do

The generator is a separate page in the admin: **Narzędzia → Stopki mailowe** (Tools → Email signatures). It has two tabs: "Osoby" (People) and "Szablon i ikony" (Template and icons).

An employee, which means anyone who is logged in:

- sees a list of people with a preview of each signature,
- copies their signature with the "Kopiuj stopkę" (Copy signature) button and pastes it into Gmail (Settings → Signature),
- can also copy just the code with "Kopiuj HTML", for example for a different email app,
- can't change anything – the page says that changes are made by the admin.

An admin:

- manages the list of people – 7 fields: first name, last name, job title, email, phone, photo and old photo addresses (first and last name are required),
- picks a photo from the Media Library, and the panel saves a small, square JPG from it,
- manages the logo and icons (Facebook, LinkedIn, Instagram, TikTok, an image with the company slogan) and can add more,
- edits the signature template.

![The "People" tab in the panel: a list of people with their fields, photo picker and the address of the photo file](/blog/2026/stopki-mailowe-dla-calej-firmy/panel-osoby.webp){width="1280" height="870"}

The list of people doesn't depend on WordPress accounts – a person can have a signature without ever logging in to the admin. The server checks permissions too: someone without admin rights can't save changes, even if they get around the form. So an employee sees only the list, the preview and the copy buttons:

![The employee view without admin rights: the list of people, an open signature preview and the copy buttons](/blog/2026/stopki-mailowe-dla-calej-firmy/widok-pracownika.webp){width="1280" height="1060"}

## One template, many versions

All signatures come from one HTML template. People who aren't developers can change the template too, so the tags are in Polish: `{imie}` (first name), `{stanowisko}` (job title), `{telefon}` (phone)… A person has 8 of them, and the logo and every icon get their own tag, for example `{tiktok}`.

Not everyone has a work phone or a photo, so the template has conditional blocks. The part between `{jesli_telefon}` and `{/jesli_telefon}` ("if phone") shows up only when the field is filled in:

```html
{jesli_telefon}<p style="margin:8px 0 0">
  <a href="tel:{telefon_link}" style="color:#0b6bcb">{telefon}</a>
</p>{/jesli_telefon}
```

Next to the editor there's a live preview for a selected person. The "Przywróć domyślny" (Restore default) button goes back to the template saved in the theme files. So changing how the signatures look doesn't need a developer, and there's always something to go back to.

![The "Template and icons" tab: a code editor with the template and a live preview of the signature for a selected person](/blog/2026/stopki-mailowe-dla-calej-firmy/szablon-podglad.webp){width="1280" height="920"}

The replacing itself is simple. In JavaScript, it could look like this (a simplified example, not the code from the panel):

```js
const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`)

function renderSignature(template, data) {
  // {jesli_field}…{/jesli_field} disappears when the field is empty
  const withBlocks = template.replace(
    /\{jesli_(\w+)\}([\s\S]*?)\{\/jesli_\1\}/g,
    (_, key, inner) => (data[key] ? inner : ''),
  )

  // {field} becomes the value
  const filled = withBlocks.replace(/\{(\w+)\}/g, (tag, key) =>
    key in data ? escapeHtml(data[key]) : tag,
  )

  // no whitespace between tags
  return filled.replace(/>\s+</g, '><')
}
```

First, the empty conditional blocks disappear. Then the tags become data (with special HTML characters turned into entities), and at the end the whitespace between tags is removed – Gmail turns it into empty space in the signature. The panel builds signatures in PHP, and the live preview works in JavaScript in the same way.

The same template gives different versions – for example without a phone or without a photo:

![Two versions of the same signature: a person without a phone and a person without a photo](/blog/2026/stopki-mailowe-dla-calej-firmy/warianty.webp){width="1304" height="576"}

## HTML for email: a table and inline styles

In email, modern CSS doesn't help much. Gmail removes `<style>` blocks from signatures, and Outlook on Windows doesn't handle flex and grid well. That's why:

- the whole signature is one table, 600 px wide, and every element has its styles in the `style` attribute,
- every image has `width` and `height` – without them, Outlook may show an image at its original size,
- the images are JPG and PNG. The website saves images as AVIF, but Outlook and some email apps can't show it, and Gmail blocks SVG. So for signature images, the panel turns off the AVIF conversion,
- the images are double resolution: a 160 px photo is shown at 80 px, 56 px icons at 28 px and a 211 px logo at 105 px. They're sharp on high-density screens and still light,
- the rounded corners of the photo come from CSS (`border-radius`), not from the file, so the JPG stays light. Outlook on Windows will show square corners – that's a trade-off I accepted.

One signature is about 4.2 KB of HTML and 8–10 KB of images.

![The signature in a mock-up of an email message, light theme](/blog/2026/stopki-mailowe-dla-calej-firmy/mail-jasny.webp){width="920" height="960"}

## One button – a clipboard with HTML

For an employee, one button matters the most. "Kopiuj stopkę" puts both the ready HTML and plain text on the clipboard at once. When you paste it into Gmail's settings, the signature keeps its formatting, and where HTML doesn't work, only the text is pasted. Copying like this could look as follows (a simplified example):

```js
// the signature goes to the clipboard as HTML and as plain text
async function copySignature(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const text = doc.body.textContent.trim()

  await navigator.clipboard.write([
    new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' }),
    }),
  ])
}
```

The signature preview in the panel is inside an `<iframe srcdoc>`, so the WordPress admin styles don't change how it looks.

![An open signature preview in the panel with the "Kopiuj stopkę" and "Kopiuj HTML" buttons](/blog/2026/stopki-mailowe-dla-calej-firmy/podglad-kopiuj.webp){width="1280" height="1250"}

## Images that don't break

All signature images are in one public folder on the website's server. The panel creates them from the Media Library: photos as JPG, the logo and icons as PNG.

A photo has a fixed file name made from the first and last name, for example `jan-kowalski.jpg`. When the admin replaces a photo, the new one also shows up in emails that were already sent – the email app loads it from the same address. The file name doesn't change when someone's name changes, so signatures that were already pasted keep working. When someone is removed from the list, their file stays on the server, and a new person with the same name gets a file ending in `-2`.

Old image addresses stay too. Emails sent before the new website point to the old paths, and the panel shows for each one whether the file is still on the server.

## Limitations

- The signature has a fixed width of 600 px. On a phone, the email app shrinks it, or you have to scroll it sideways.
- There's no separate version for dark mode. Gmail doesn't support `prefers-color-scheme` and removes `<style>`, so the icons sit on a white background – that way the black icons don't disappear on a dark background.
- Outlook on Windows doesn't round the corners of the photo.
- A signature in Gmail doesn't update by itself when a job title or phone number changes – you have to copy it and paste it again. Only the photo updates by itself, because the file has a fixed name.
- Gmail caches images, so a new image may reach the recipients with a delay.

The signatures work in Gmail in the browser – that's what the team uses. I haven't tested Outlook, Apple Mail or mobile apps yet.

![On the left, the signature in an email app's dark theme; on the right, on a phone – wider than the screen](/blog/2026/stopki-mailowe-dla-calej-firmy/mail-ciemny-i-telefon.webp){width="1334" height="1030"}

## A small CSS thing: `hidden` loses to `display`

While taking the screenshots, I found a small bug. A person without a photo had an empty, "broken" image in the panel instead of an empty space. The element had the `hidden` attribute, but the panel's styles gave it `display: block`.

The `hidden` attribute hides an element only thanks to the browser's own styles (`display: none`), and any rule from the page that sets `display` wins over them. One rule was enough:

```css
.preview {
  display: block;
}

/* without this rule, display: block wins over the hidden attribute */
.preview[hidden] {
  display: none;
}
```

## What I took from it

- The signatures are in one place, and an employee copies theirs with one button – nobody has to send them around by email anymore.
- A template with simple tags and a live preview lets you change the signatures' look without a developer.
- HTML for email means tables, styles in attributes and images with `width` and `height`.
- Use only JPG and PNG in emails, at double resolution.
- A fixed photo file name lets you replace a photo even in emails that were already sent.
- `ClipboardItem` with `text/html` and `text/plain` copies a formatted signature with one click.
- If you give an element `display`, add a rule for `[hidden]`.
