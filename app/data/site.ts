// Dane strony używane w meta tagach i danych strukturalnych (JSON-LD).
// Adres bez ukośnika na końcu – ścieżki dopisujemy z ukośnikiem, tak jak serwuje je GitHub Pages.
export const SITE_URL = 'https://lukaszdzielo.github.io'
export const SITE_NAME = 'Łukasz Dzieło'
export const PERSON_ID = `${SITE_URL}/#person`

export const PROFILES = {
  linkedin: 'https://www.linkedin.com/in/lukasz-dzielo-0428b4148/',
  github: 'https://github.com/lukaszdzielo',
  instagram: 'https://www.instagram.com/lukasz.dev',
}

// Pełny adres strony, z ukośnikiem na końcu (jak po przekierowaniu na GitHub Pages): /projects → /projects/
export const pageUrl = (path: string) => SITE_URL + (path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`)
