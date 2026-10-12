// Google Analytics ładuje się dopiero po zgodzie (baner CommonCookieConsent).
// Po wycofaniu zgody wyłączamy pomiar i usuwamy ciasteczka _ga.
// Podstrony w aplikacji (bez przeładowania) GA4 liczy sam – „pomiar zaawansowany” śledzi zmiany adresu.
const GA_ID = 'G-VGN46K0G19'

type GtagWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Record<string, unknown>

export default defineNuxtPlugin(() => {
  const w = window as unknown as GtagWindow
  const { consent } = useConsent()
  let injected = false

  function enable() {
    w[`ga-disable-${GA_ID}`] = false
    if (injected) return
    injected = true
    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments)
    }
    w.gtag('js', new Date())
    w.gtag('config', GA_ID)
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.append(script)
  }

  function disable() {
    w[`ga-disable-${GA_ID}`] = true
    // Ciasteczka GA są zapisane na domenie strony (z kropką i bez) – usuwamy oba warianty
    const host = location.hostname
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.split('=')[0]?.trim()
      if (!name?.startsWith('_ga')) continue
      for (const domain of ['', `; domain=${host}`, `; domain=.${host}`]) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain}`
      }
    }
  }

  watch(consent, (value) => {
    if (value === 'granted') enable()
    else if (value === 'denied') disable()
  }, { immediate: true })
})
