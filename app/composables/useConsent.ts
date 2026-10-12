// Zgoda na statystyki (Google Analytics). Zapisana w localStorage, więc działa bez ciasteczek.
// null = jeszcze nie zdecydowano → pokazujemy baner. Zmiana w stopce: „Ustawienia cookies”.
import { ref } from 'vue'

export type Consent = 'granted' | 'denied' | null

const STORAGE_KEY = 'consent-analytics'

const consent = ref<Consent>(null)
const panelOpen = ref(false)
const loaded = ref(false) // decyzja odczytana z localStorage (dopiero w przeglądarce)

function init() {
  if (loaded.value || !import.meta.client) return
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    consent.value = stored === 'granted' || stored === 'denied' ? stored : null
  } catch {
    consent.value = null
  }
  loaded.value = true
}

export function useConsent() {
  init()

  const decide = (value: 'granted' | 'denied') => {
    consent.value = value
    panelOpen.value = false
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // tryb prywatny itp. – decyzja obowiązuje do zamknięcia karty
    }
  }

  const openSettings = () => (panelOpen.value = true)

  return { consent, panelOpen, loaded, decide, openSettings }
}
