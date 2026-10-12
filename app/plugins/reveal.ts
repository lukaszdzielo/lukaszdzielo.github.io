// v-reveal – element płynnie wjeżdża, gdy pojawia się na ekranie.
// - nic nie robi przy `prefers-reduced-motion: reduce`,
// - elementów widocznych już przy wejściu na stronę nie chowa (brak mignięcia po SSR),
// - opóźnienie: v-reveal="120" (ms), przydatne przy kolumnach wjeżdżających po kolei.
// Element potrzebuje klas przejścia, np. `transition-[opacity,translate] duration-700 ease-out`.

const HIDDEN = ['opacity-0', 'translate-y-4']

type RevealEl = HTMLElement & { _revealObserver?: IntersectionObserver }

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<RevealEl, number | undefined>('reveal', {
    getSSRProps: () => ({}),

    mounted(el, binding) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (el.getBoundingClientRect().top < window.innerHeight) return

      el.classList.add(...HIDDEN)
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          el.classList.remove(...HIDDEN)
          observer.disconnect()
        },
        { rootMargin: '0px 0px -10% 0px' },
      )
      observer.observe(el)
      el._revealObserver = observer
    },

    unmounted(el) {
      el._revealObserver?.disconnect()
    },
  })
})
