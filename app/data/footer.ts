// Treści stopki. Dwa warianty: portfolio (domyślny) i strona dla firm – każdy w dwóch językach ({ en, pl } + useLocalized()).
// Linki do podstron dopisuj dopiero, gdy strona istnieje – inaczej `nuxt generate` zgłosi błąd 404 przy prerenderingu.
// Linki wewnętrzne to adresy wersji polskiej bez /pl ('/#projects', '/strony-dla-firm#offer') –
// TheFooter przepuszcza je przez link() z useLocalLink, który zamienia je na adres w aktualnym języku.
// Kotwice (#about-me itd.) są po angielsku w obu wersjach.

export type FooterLink = { label: string; to: string; external?: boolean }
export type FooterColumn = { title: string; links: FooterLink[] }
export type FooterVariant = 'portfolio' | 'business'

import { PROFILES } from '~/data/site'

const LINKEDIN = PROFILES.linkedin
const GITHUB = PROFILES.github
const INSTAGRAM = PROFILES.instagram

type FooterContent = {
  bio: string
  columns: [FooterColumn, FooterColumn]
  status: { title: string; now: string; lines: string[]; link?: FooterLink }
}

export const footerContent: { en: Record<FooterVariant, FooterContent>; pl: Record<FooterVariant, FooterContent> } = {
  en: {
    portfolio: {
      bio: 'Front-end developer – I work with Vue 3 every day. I am learning React and moving toward full-stack.',
      columns: [
        {
          title: 'Site',
          links: [
            { label: 'Projects', to: '/#projects' },
            { label: 'About', to: '/#about-me' },
            { label: 'Posts', to: '/#posts' },
            { label: 'Contact', to: '/#contact' },
            { label: 'Business websites', to: '/strony-dla-firm' },
          ],
        },
        {
          title: 'Profiles',
          links: [
            { label: 'LinkedIn', to: LINKEDIN, external: true },
            { label: 'GitHub', to: GITHUB, external: true },
            { label: 'Instagram', to: INSTAGRAM, external: true },
          ],
        },
      ],
      status: {
        title: 'Now',
        now: 'Front-end in Vue 3, full-time',
        lines: ['Katowice, Poland · remote or hybrid', 'Polish · English B2'],
      },
    },
    business: {
      bio: 'WordPress websites for small businesses – design, build and support after launch.',
      columns: [
        {
          title: 'Offer',
          links: [
            { label: 'What you get', to: '/strony-dla-firm#offer' },
            { label: 'Work', to: '/strony-dla-firm#projects' },
            { label: 'How I work', to: '/strony-dla-firm#process' },
            { label: 'Care', to: '/strony-dla-firm#care' },
            { label: 'FAQ', to: '/strony-dla-firm#faq' },
          ],
        },
        {
          title: 'Contact',
          links: [
            { label: 'Contact form', to: '/strony-dla-firm#contact' },
            { label: 'LinkedIn', to: LINKEDIN, external: true },
          ],
        },
      ],
      status: {
        title: 'Good to know',
        now: 'I reply within 72 h',
        lines: ['Katowice, Poland · I work remotely', 'Payment through Useme or Freelancehunt'],
        link: { label: 'Developer portfolio', to: '/' },
      },
    },
  },
  pl: {
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
  },
}
