# lukaszdzielo.github.io

My portfolio and blog – front-end projects, case studies and posts about the code I write every day.

**Live:** https://lukaszdzielo.github.io (English) · https://lukaszdzielo.github.io/pl/ (Polish)

## Stack

- [Nuxt 4](https://nuxt.com) – a static site (`nuxt generate`), hosted on GitHub Pages
- [Nuxt Content 3](https://content.nuxt.com) – posts and projects written in Markdown
- [Tailwind CSS 4](https://tailwindcss.com)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org) – English under `/`, Polish under `/pl/`
- [@nuxt/image](https://image.nuxt.com) – every image in a few widths, in AVIF with a WebP fallback, generated at build time

## Run it locally

```bash
npm ci
npm run dev        # http://localhost:3000
npm run generate   # static build in .output/public
```

## A few decisions

- **Critical CSS** – after the build, [Beasties](https://github.com/danielroe/beasties) puts the CSS for the first screen into every HTML file, so the page paints without waiting for the stylesheet.
- **Scheduled posts** – a post with a future date stays hidden. GitHub Actions builds the site every night, so the post goes live on its date by itself.
- **Prices** – the business page shows prices from a small log in `app/data/pricing.ts`. During a sale it also shows the lowest price from the 30 days before the discount.
- **SEO** – JSON-LD (Person, BlogPosting, CreativeWork, Service, BreadcrumbList), `sitemap.xml` with `lastmod`, `hreflang` for both languages and `llms.txt`.
- **No flash of the wrong theme** – a tiny inline script sets light or dark mode before the first paint.
- **Analytics only after consent** – Google Analytics loads only when the visitor agrees.

## Content

The code is here so you can see how the site works. Texts, illustrations and screenshots are mine (or my clients') – please don't reuse them without asking.
