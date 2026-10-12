// Wyróżnione projekty – kafelki w stylu posta z Instagrama na stronie głównej i na /projects.
// Kolejność nie ma znaczenia: kafelki układają się od najnowszego (`date`, RRRR-MM).
// `hidden: true` chowa projekt (dane zostają), `href` – strona na produkcji (nowa karta).
export type FeaturedProject = {
  title: string
  description: string
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
    description: 'Strona toru kartingowego w Bytomiu – jasny i ciemny motyw, cennik i aktualności.',
    chips: ['WordPress', 'Gutenberg'],
    url: 'emotion-karting',
    image: '/featured/emotion-karting.webp',
    imageDark: '/featured/emotion-karting-dark.webp',
  },
  {
    title: 'ReblyX',
    date: '2026-09',
    description: 'Strona centrum obróbki stali – projekt i wdrożenie, treści edytowane w Gutenbergu.',
    chips: ['WordPress', 'Gutenberg'],
    url: 'reblyx.com',
    href: 'https://reblyx.com',
    image: '/featured/reblyx.webp',
  },
  {
    title: 'e-cargo',
    date: '2026-08',
    description: 'Aplikacja webowa – większość front-endu i komponenty używane przez cały zespół.',
    chips: ['Vue 3', 'Inertia.js', 'PrimeVue'],
    url: 'e-cargo',
    image: '/featured/ecargo.webp',
  },
  // Nie cały serwis – moja część w Arris Agency: karuzele na Swiperze
  {
    title: 'superauto.pl',
    date: '2025-03',
    description: 'Nie cały serwis, tylko moja część: karuzele na Swiperze – m.in. galeria auta – zebrane w jeden spójny komponent.',
    chips: ['Swiper', 'JavaScript', 'Twig'],
    url: 'superauto.pl',
    image: '/featured/superauto.webp',
  },
  {
    title: 'Pokedex',
    date: '2024-01',
    description: 'Ponad 1000 pokemonów w czystym JS – kolejność ładowania i lokalna baza w przeglądarce.',
    chips: ['JavaScript', 'OOP', 'PokéAPI'],
    url: 'pokedex',
    href: 'https://lukaszdzielo.github.io/pokedex/',
    image: '/featured/pokedex.webp',
  },
  {
    title: 'Coffee Recipes',
    date: '2024-01',
    description: 'Przepisy na kawę – filtrowanie po składnikach, stan aplikacji i lokalne API.',
    chips: ['Vue', 'CSS', 'API'],
    url: 'coffee-recipes',
    image: '/featured/coffee-recipes.webp',
  },
  // Niedokończony – wróci po dokończeniu (usuń `hidden`)
  {
    title: 'Marcin Podlaski',
    description: 'Portfolio z galerią prac – mój pierwszy projekt w Nuxt.',
    chips: ['Vue 3', 'Nuxt', 'Tailwind'],
    url: 'marcin-podlaski',
    href: 'https://lukaszdzielo.github.io/marcin-podlinski/',
    mock: 'podlaski',
    hidden: true,
  },
]

// Widoczne projekty od najnowszego
export const visibleFeaturedProjects = () =>
  featuredProjects
    .filter(p => !p.hidden)
    .sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? '')))
