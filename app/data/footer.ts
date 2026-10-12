// Treści stopki. Dwa warianty: portfolio (domyślny) i strona dla firm.
// Linki do podstron dopisuj dopiero, gdy strona istnieje – inaczej `nuxt generate` zgłosi błąd 404 przy prerenderingu.
// Kotwice (#about-me itd.) są po angielsku. Po dodaniu wersji językowych (@nuxtjs/i18n)
// mogą przyjść z tłumaczeń, np. #o-mnie w polskiej i #about-me w angielskiej.

export type FooterLink = { label: string; to: string; external?: boolean }
export type FooterColumn = { title: string; links: FooterLink[] }
export type FooterVariant = 'portfolio' | 'business'

const LINKEDIN = 'https://www.linkedin.com/in/lukasz-dzielo-0428b4148/'
const GITHUB = 'https://github.com/lukaszdzielo'
const INSTAGRAM = 'https://www.instagram.com/lukasz.dev'

type FooterContent = {
  bio: string
  columns: [FooterColumn, FooterColumn]
  status: { title: string; now: string; lines: string[]; link?: FooterLink }
}

export const footerContent: Record<FooterVariant, FooterContent> = {
  portfolio: {
    bio: 'Front-end developer – Vue 3 na co dzień. Uczę się Reacta i idę w stronę fullstacka.',
    columns: [
      {
        title: 'Strona',
        links: [
          { label: 'Projekty', to: '/#projects' },
          { label: 'O mnie', to: '/#about-me' },
          { label: 'Wpisy', to: '/#posts' },
          { label: 'Kontakt', to: '/#contact' },
          { label: 'Strony dla firm', to: '/strony-dla-firm' },
        ],
      },
      {
        title: 'Profile',
        links: [
          { label: 'LinkedIn', to: LINKEDIN, external: true },
          { label: 'GitHub', to: GITHUB, external: true },
          { label: 'Instagram', to: INSTAGRAM, external: true },
        ],
      },
    ],
    status: {
      title: 'Teraz',
      now: 'Front-end w Vue 3, etat',
      lines: ['Katowice · zdalnie lub hybrydowo', 'Polski · angielski B2'],
    },
  },
  business: {
    bio: 'Strony na WordPressie dla małych firm – projekt, wdrożenie i opieka po starcie.',
    columns: [
      {
        title: 'Oferta',
        links: [
          { label: 'Co dostajesz', to: '/strony-dla-firm#offer' },
          { label: 'Realizacje', to: '/strony-dla-firm#projects' },
          { label: 'Jak pracuję', to: '/strony-dla-firm#process' },
          { label: 'Opieka', to: '/strony-dla-firm#care' },
          { label: 'FAQ', to: '/strony-dla-firm#faq' },
        ],
      },
      {
        title: 'Kontakt',
        links: [
          { label: 'Formularz zapytania', to: '/strony-dla-firm#contact' },
          { label: 'LinkedIn', to: LINKEDIN, external: true },
        ],
      },
    ],
    status: {
      title: 'Dobrze wiedzieć',
      now: 'Odpowiadam w ciągu 72 h',
      lines: ['Katowice · pracuję zdalnie', 'Rozliczenie: Useme lub Freelancehunt'],
      link: { label: 'Portfolio programisty', to: '/' },
    },
  },
}
