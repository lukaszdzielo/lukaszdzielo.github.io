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
  projects: `// app/data/featuredProjects.ts
export const visibleFeaturedProjects = () =>
  featuredProjects
    .filter(p => !p.hidden)
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned)
      || String(b.date ?? '').localeCompare(String(a.date ?? '')))

const projects = visibleFeaturedProjects()
const scroller = useTemplateRef<HTMLElement>('scroller')`,

  // app/components/sections/HomePortfolio.vue – szablon
  services: `<li
  v-for="(project, i) in projects"
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

  // app/components/common/NotFound.vue – odmiana strony 404 zależnie od adresu
  notFound: `const variant = computed<Variant>(() => {
  if (props.variant) return props.variant
  if (currentPath.value.startsWith('/blog')) return 'post'
  if (currentPath.value.startsWith('/projects')) return 'project'
  return 'page'
})`,

  // Strona dla firm – kod WordPressa (bloki, theme.json), na którym budowane są strony klientów
  bizOffer: `add_action( 'init', function () {
    register_block_type( __DIR__ . '/build/blocks/hero' );
    register_block_type( __DIR__ . '/build/blocks/offer' );
} );`,
  bizWork: `{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": { "appearanceTools": true },
  "styles": { "color": { "background": "var(--wp--preset--color--base)" } }`,
  bizProcess: `{
  "apiVersion": 3,
  "name": "ld/offer",
  "title": "Oferta",
  "category": "theme",
  "editorScript": "file:./index.js"`,
  bizCare: `add_theme_support( 'editor-styles' );
add_editor_style( 'assets/css/editor.css' );
remove_theme_support( 'core-block-patterns' );`,
  bizFaq: `$query = new WP_Query( [
    'post_type'      => 'post',
    'posts_per_page' => 3,
] );`,
} as const

export type CodeFragment = keyof typeof codeFragments
