// Przewijanie przy zmianie adresu.
// – Wejście z linku z #sekcja (z innej strony, z zewnątrz) i odświeżenie: od razu w sekcji, bez animacji.
// – Kliknięcie kotwicy na tej samej stronie: płynnie (chyba że w systemie włączone „ogranicz ruch”).
// – Zmiana samego ?query (np. filtr w archiwum projektów): strona zostaje tam, gdzie jest.
// Na podstawie domyślnego router.options z Nuxt; `scroll-behavior: smooth` w CSS jest wyłączone,
// bo przewijało płynnie także przy wejściu na stronę.
import type { RouterConfig } from 'nuxt/schema'
import { START_LOCATION, type RouteLocationNormalized } from 'vue-router'

type Position = { left?: number; top?: number; el?: string; behavior?: ScrollBehavior }

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Odstęp pod przyklejonym menu: scroll-margin-top sekcji + scroll-padding-top na <html>
function marginTop(selector: string) {
  try {
    const el = document.querySelector(selector)
    if (el) {
      return (Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0)
        + (Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)
    }
  } catch {
    // niepoprawny selektor w adresie – przewijamy na górę
  }
  return 0
}

const samePath = (a: RouteLocationNormalized, b: RouteLocationNormalized) =>
  a.path.replace(/\/$/, '') === b.path.replace(/\/$/, '')

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Ta sama strona (ale nie pierwsze wejście – wtedy `from` to START_LOCATION)
    if (from !== START_LOCATION && samePath(to, from)) {
      if (to.hash && to.hash !== from.hash) {
        return { el: to.hash, top: marginTop(to.hash), behavior: reduceMotion() ? 'instant' : 'smooth' }
      }
      // Zdjęcie kotwicy (np. „Do góry” w stopce): płynnie na górę; przy „wstecz” – zapamiętane miejsce
      if (from.hash && !to.hash) return savedPosition ?? { left: 0, top: 0, behavior: reduceMotion() ? 'instant' : 'smooth' }
      return false
    }

    const position = (): Position => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash, top: marginTop(to.hash), behavior: 'instant' }
      return { left: 0, top: 0, behavior: 'instant' }
    }

    // Pierwsze wejście / odświeżenie – treść jest już w HTML (strona generowana statycznie).
    // Kotwicę bierzemy z paska adresu: przy wejściu na /projects/?tech=…#archive pierwsza trasa
    // bywa jeszcze bez # (Nuxt dopasowuje ukośnik na końcu), a przewinięcie na górę zgubiłoby sekcję.
    if (from === START_LOCATION) {
      const hash = to.hash || window.location.hash
      if (hash) return { el: hash, top: marginTop(hash), behavior: 'instant' }
      return savedPosition || false
    }

    // Inna strona – czekamy, aż się wyrenderuje
    const nuxtApp = useNuxtApp()
    const router = useRouter()
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:loading:end', () => {
        requestAnimationFrame(() => {
          resolve(router.currentRoute.value.fullPath === to.fullPath ? position() : false)
        })
      })
    })
  },
}
