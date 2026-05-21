import { ref } from 'vue'

export type ColorMode = 'auto' | 'light' | 'dark'

const STORAGE_KEY = 'theme'

const mode = ref<ColorMode>('auto')
let initialized = false

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolved() {
  return mode.value === 'dark' || (mode.value === 'auto' && systemPrefersDark())
}

function apply() {
  document.documentElement.classList.toggle('dark', resolved())
}

function init() {
  if (initialized || !import.meta.client) return
  initialized = true

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') mode.value = stored

  apply()

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (mode.value === 'auto') apply()
    })
}

export function useColorMode() {
  init()

  const set = (next: ColorMode) => {
    mode.value = next
    if (!import.meta.client) return
    if (next === 'auto') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, next)
    apply()
  }

  const cycle = () => {
    const next: ColorMode =
      mode.value === 'auto' ? 'light' : mode.value === 'light' ? 'dark' : 'auto'
    set(next)
  }

  return { mode, set, cycle }
}
