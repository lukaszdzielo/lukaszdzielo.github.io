<script setup lang="ts">
// „W ruchu” na stronie projektu: krótkie pętle wideo bez dźwięku (animacje i efekty po najechaniu).
// preload="none" – do pokazania filmu pobiera się tylko plakat. Film rusza sam, gdy jest w większości widoczny,
// i zatrzymuje się po wyjściu z ekranu. Przy ograniczeniu ruchu (prefers-reduced-motion) nic nie rusza samo –
// film włącza się przyciskiem. Przycisk pauzy jest przy każdym filmie, bo pętla trwa dłużej niż 5 s (WCAG 2.2.2).
type Clip = { src: string; poster: string; title: string; text?: string }
const props = defineProps<{ items: Clip[] }>()
const { t } = useI18n({ useScope: 'local' })

const videos: HTMLVideoElement[] = []
const playing = ref<boolean[]>(props.items.map(() => false))
// filmy zatrzymane przyciskiem nie wracają same przy przewijaniu
const stoppedByUser = new Set<number>()
let observer: IntersectionObserver | undefined

function play(i: number) {
  // play() może zostać odrzucone (np. oszczędzanie baterii) – wtedy zostaje plakat i przycisk „Odtwórz”
  videos[i]?.play().catch(() => {})
}

function toggle(i: number) {
  if (playing.value[i]) {
    stoppedByUser.add(i)
    videos[i]?.pause()
  } else {
    stoppedByUser.delete(i)
    play(i)
  }
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const i = Number((entry.target as HTMLElement).dataset.index)
      if (!entry.isIntersecting) videos[i]?.pause()
      else if (!reduceMotion && !stoppedByUser.has(i)) play(i)
    }
  }, { threshold: 0.6 })
  videos.forEach(video => observer!.observe(video))
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <ul class="grid gap-6 sm:grid-cols-2">
    <li v-for="(clip, i) in items" :key="clip.src"
      class="overflow-hidden rounded-3xl border border-slate-900/10 bg-white shadow-sm dark:border-white/10 dark:bg-brand-900"
      :class="items.length % 2 === 1 && i === items.length - 1 && 'sm:col-span-2'">
      <figure>
        <div class="relative">
          <video
            :ref="(el) => { if (el) videos[i] = el as HTMLVideoElement }"
            :data-index="i" :src="clip.src" :poster="clip.poster" width="1280" height="720"
            muted loop playsinline preload="none" disablepictureinpicture
            class="block aspect-video w-full bg-brand-950 object-cover"
            @play="playing[i] = true" @pause="playing[i] = false" />
          <!-- Ikona zmienia się dopiero w przeglądarce, więc jako <svg> (mode="svg") – w trybie CSS
               jej styl trafiał na początek <head> i przebudowywał fonty (jak w formularzu kontaktowym) -->
          <button type="button"
            class="absolute right-3 bottom-3 grid size-10 place-items-center rounded-full bg-brand-950/70 text-white backdrop-blur-sm transition-colors hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            :aria-label="t(playing[i] ? 'pause' : 'play', { title: clip.title })" @click="toggle(i)">
            <Icon :name="playing[i] ? 'lucide:pause' : 'lucide:play'" mode="svg" class="size-4" aria-hidden="true" />
          </button>
        </div>
        <figcaption class="p-5 sm:p-6">
          <span class="block text-lg font-semibold tracking-tight text-slate-900 dark:text-brand-50">{{ clip.title }}</span>
          <span v-if="clip.text" class="mt-1.5 block text-base/relaxed text-slate-600 dark:text-slate-300">{{ clip.text }}</span>
        </figcaption>
      </figure>
    </li>
  </ul>
</template>

<i18n lang="json">
{
  "en": { "play": "Play video: {title}", "pause": "Pause video: {title}" },
  "pl": { "play": "Odtwórz film: {title}", "pause": "Zatrzymaj film: {title}" }
}
</i18n>
