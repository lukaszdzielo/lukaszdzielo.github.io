import { cv } from './cv'

// Treści stopki. Dwa warianty: portfolio (domyślny) i strona dla firm.
// Linki do podstron, których jeszcze nie ma (np. strona dla firm), dopisz,
// gdy strona powstanie – inaczej `nuxt generate` zgłosi błąd 404 przy prerenderingu.
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
      link: { label: 'Pobierz CV', to: cv.href, external: true },
    },
  },
  business: {
    bio: 'Strony na WordPressie dla małych firm – projekt, wdrożenie i opieka po starcie.',
    columns: [
      {
        title: 'Oferta',
        links: [
          { label: 'Co dostajesz', to: '#offer' },
          { label: 'Realizacje', to: '#projects' },
          { label: 'Jak pracuję', to: '#process' },
          { label: 'Opieka', to: '#care' },
          { label: 'FAQ', to: '#faq' },
        ],
      },
      {
        title: 'Kontakt',
        links: [
          { label: 'Formularz zapytania', to: '#contact' },
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
