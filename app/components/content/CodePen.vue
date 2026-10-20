<script setup lang="ts">
// Demo z CodePena we wpisie. W treści wpisu:
//   ::code-pen{user="LukaszDev" slug="vExrgqy" url="https://codepen.io/editor/…" title="…"}
//   ::
// Okno CodePena (iframe) wczytuje się dopiero po kliknięciu „Uruchom demo” – wcześniej strona nie łączy się
// z codepen.io, więc nie trzeba go dopisywać do banera zgody (opis w polityce prywatności, sekcja o treściach z innych stron).
// Adres okna jak w kodzie embed z CodePena (pen w nowym edytorze: /editor/<user>/embed/<slug>).
const props = withDefaults(defineProps<{
  user: string
  slug: string
  url: string
  title?: string
  height?: number | string
  tabs?: string
}>(), { title: undefined, height: 640, tabs: 'html,result' })

const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const loaded = ref(false)

const src = computed(() => {
  const query = new URLSearchParams({
    'default-tab': props.tabs,
    height: String(props.height),
    'slug-hash': props.slug,
    user: props.user,
    version: '2',
  })
  return `https://codepen.io/editor/${props.user}/embed/${props.slug}?${query}`
})
</script>

<template>
  <figure class="not-prose my-8 sm:my-10">
    <iframe
      v-if="loaded"
      :src="src"
      :title="title || t('frame')"
      :height="height"
      loading="lazy"
      allowfullscreen
      class="block w-full rounded-2xl border border-slate-900/10 bg-white dark:border-white/10 dark:bg-brand-900"
    />
    <div v-else class="rounded-2xl border border-slate-900/10 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-7 dark:border-white/10 dark:bg-brand-900">
      <p class="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-brand-50">
        <Icon name="lucide:code-xml" class="size-5 shrink-0 text-primary-500 dark:text-primary-400" aria-hidden="true" />
        {{ title || t('frame') }}
      </p>
      <p class="mt-2 text-sm/relaxed text-pretty text-slate-600 dark:text-slate-400">
        {{ t('note') }}
        <NuxtLink :to="link('/polityka-prywatnosci')" class="text-primary-500 underline underline-offset-2 dark:text-primary-400">{{ t('privacy') }}</NuxtLink>.
      </p>
      <div class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          class="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:bg-primary-400 dark:text-brand-950 dark:hover:bg-primary-300"
          @click="loaded = true"
        >
          <Icon name="lucide:play" class="size-4" aria-hidden="true" />
          {{ t('run') }}
        </button>
        <a :href="url" target="_blank" rel="noopener" class="text-sm font-medium text-primary-500 underline-offset-4 hover:underline dark:text-primary-400">
          {{ t('open') }} ↗
        </a>
      </div>
    </div>
  </figure>
</template>

<i18n lang="json">
{
  "en": {
    "frame": "Demo on CodePen",
    "note": "The demo loads from codepen.io, but only after you click. CodePen may then store its own cookies in your browser – more in the",
    "privacy": "privacy policy",
    "run": "Run the demo",
    "open": "Open on CodePen"
  },
  "pl": {
    "frame": "Demo na CodePenie",
    "note": "Demo wczytuje się z codepen.io, ale dopiero po kliknięciu. Wtedy CodePen może zapisać w przeglądarce swoje pliki cookies – więcej w",
    "privacy": "polityce prywatności",
    "run": "Uruchom demo",
    "open": "Otwórz na CodePenie"
  }
}
</i18n>
