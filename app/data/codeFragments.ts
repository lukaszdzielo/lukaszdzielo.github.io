// Kod w tle strony – prawdziwe fragmenty z tego repozytorium (Vue 3.5, Composition API).
// Każda sekcja pokazuje kawałek kodu, który ją buduje. Gdy zmienisz komponent, możesz podmienić fragment.
export const codeFragments = {
  // app/composables/useColorMode.ts – przełącznik motywu w menu
  hero: `export function useColorMode() {
  init()

  const set = (next: ColorMode) => {
    mode.value = next
    localStorage.setItem(STORAGE_KEY, next)
    apply()
  }`,

  // app/components/sections/HomePortfolio.vue
  projects: `const props = defineProps<{ projects?: Project[] }>()

const visible = computed(() =>
  (props.projects ?? [])
    .filter(p => !p.hidden)
    .sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? ''))),
)
const scroller = useTemplateRef<HTMLElement>('scroller')`,

  // app/components/sections/HomePortfolio.vue – szablon
  services: `<li
  v-for="(project, i) in visible"
  :key="project.title"
  v-reveal="(i % 3) * 80"
>
  <CommonProjectTile v-bind="project" />
</li>`,

  // app/plugins/reveal.ts – wjazd elementów przy przewijaniu
  stack: `export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el, binding) {
      if (el.getBoundingClientRect().top < window.innerHeight) return
      el.classList.add(...HIDDEN)`,

  // app/components/common/ScrollControls.vue – strzałki pod paskiem projektów
  about: `watch(
  () => props.target,
  (el, old) => {
    old?.removeEventListener('scroll', update)
    el?.addEventListener('scroll', update, { passive: true })
  },
  { immediate: true, flush: 'post' },
)`,

  // app/components/sections/HomePosts.vue
  posts: `const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .limit(6)
    .all(),
)`,

  // app/components/common/ContactForm.vue – wysyłka formularza do Web3Forms
  contact: `const res = await fetch(WEB3FORMS_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify(payload),
})
const data = await res.json().catch(() => ({}))`,
} as const

export type CodeFragment = keyof typeof codeFragments
