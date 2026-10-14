// Wyróżnione projekty – kafelki w stylu posta z Instagrama na stronie głównej i na /projects.
// Kolejność nie ma znaczenia: kafelki układają się od najnowszego (`date`, RRRR-MM).
// `hidden: true` chowa projekt (dane zostają), `href` – strona na produkcji (nowa karta).
// Opis w dwóch językach; visibleFeaturedProjects(lang) zwraca już tekst w danym języku.
export type FeaturedProject = {
  title: string
  description: { en: string; pl: string }
  chips?: string[]
  url: string // tekst w pasku adresu okna przeglądarki na kafelku
  date?: string
  image?: string
  imageDark?: string
  mock?: string // makieta SVG z app/data/mockups.ts, gdy nie ma zrzutu
  to?: string
  href?: string
  hidden?: boolean
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'Emotion Karting',
    date: '2026-10',
    description: { en: 'Website for a karting track in Bytom – light and dark theme, price list and news.', pl: 'Strona toru kartingowego w Bytomiu – jasny i ciemny motyw, cennik i aktualności.' },
    chips: ['WordPress', 'Gutenberg'],
    url: 'emotion-karting',
    image: '/projects/2026/emotion-karting/featured.webp',
    imageDark: '/projects/2026/emotion-karting/featured-dark.webp',
  },
  {
    title: 'ReblyX',
    date: '2026-09',
    description: { en: 'Website for a steel processing center – design and build, content edited in Gutenberg.', pl: 'Strona centrum obróbki stali – projekt i wdrożenie, treści edytowane w Gutenbergu.' },
    chips: ['WordPress', 'Gutenberg'],
    url: 'reblyx.com',
    href: 'https://reblyx.com',
    image: '/projects/2026/reblyx/featured.webp',
  },
  {
    title: 'e-cargo',
    date: '2026-08',
    description: { en: 'Training platform for driver training centres – a large part of the front-end and components for the whole team.', pl: 'Platforma szkoleń dla ośrodków szkolenia kierowców – duża część front-endu i komponenty dla całego zespołu.' },
    chips: ['Vue 3', 'Inertia.js', 'Tailwind CSS'],
    url: 'e-cargo',
    image: '/projects/2026/e-cargo/featured.webp',
  },
  // Nie cały serwis – moja część w Arris Agency: karuzele na Swiperze
  {
    title: 'superauto.pl',
    date: '2025-03',
    description: { en: 'Not the whole site, just my part: Swiper carousels – including the car gallery – merged into one consistent component.', pl: 'Nie cały serwis, tylko moja część: karuzele na Swiperze – m.in. galeria auta – zebrane w jeden spójny komponent.' },
    chips: ['Swiper', 'JavaScript', 'Twig'],
    url: 'superauto.pl',
    image: '/projects/2025/superauto/featured.webp',
    hidden: true, // na głównej zastąpiony przez Sushi Show (13.10) – zostaje w archiwum projektów
  },
  {
    title: 'Pokedex',
    date: '2024-01',
    description: { en: 'Over 1,000 Pokémon in vanilla JS – loading order and a local database in the browser.', pl: 'Ponad 1000 pokemonów w czystym JS – kolejność ładowania i lokalna baza w przeglądarce.' },
    chips: ['JavaScript', 'OOP', 'PokéAPI'],
    url: 'pokedex',
    href: 'https://lukaszdzielo.github.io/pokedex/',
    image: '/projects/2024/pokedex/featured.webp',
  },
  {
    title: 'Coffee Recipes',
    date: '2024-01',
    description: { en: 'Coffee recipes – filtering by ingredients, app state and a local API.', pl: 'Przepisy na kawę – filtrowanie po składnikach, stan aplikacji i lokalne API.' },
    chips: ['Vue', 'CSS', 'API'],
    url: 'coffee-recipes',
    image: '/projects/2024/coffee-recipes/featured.webp',
  },
  // Strona sushi mastera (Marcin Podliński). Zrzut: nowy wygląd strony.
  {
    title: 'Sushi Show',
    date: '2025-04',
    description: { en: 'Website for a sushi chef – workshops for companies and groups, catering and a list of upcoming dates.', pl: 'Strona sushi mastera – warsztaty dla firm i grup, catering i terminarz najbliższych warsztatów.' },
    chips: ['Vue 3', 'Nuxt', 'Tailwind'],
    url: 'sushi-show',
    href: 'https://lukaszdzielo.github.io/marcin-podlinski/',
    image: '/projects/2025/sushi-show/featured.webp',
  },
]

// Widoczne projekty od najnowszego, z opisem w języku strony (lang: 'en' | 'pl')
export const visibleFeaturedProjects = (lang: 'en' | 'pl' = 'en') =>
  featuredProjects
    .filter(p => !p.hidden)
    .sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')))
    .map(p => ({ ...p, description: p.description[lang] }))
