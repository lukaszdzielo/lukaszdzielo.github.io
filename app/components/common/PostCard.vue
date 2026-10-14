<script setup lang="ts">
type Post = {
  path: string
  title: string
  description?: string
  date?: string
  tags?: string[]
  kind?: 'post' | 'case-study'
  image?: string
  art?: string
}

// featured – pierwszy wpis na stronie /blog: od lg okładka obok tekstu, większy tytuł
const props = defineProps<{ post: Post; featured?: boolean }>()

const { t, locale } = useI18n({ useScope: 'local' })
// Etykietę pokazujemy tylko przy case study – zwykły wpis to domyślny rodzaj, nie trzeba go nazywać
const kindLabel = computed(() => (props.post.kind === 'case-study' ? t('caseStudy') : ''))
const topic = computed(() => props.post.tags?.[0]?.replace(/-/g, ' '))
// Data w języku strony. timeZone UTC – „2026-03-05” to północ UTC, a w strefie USA byłby to jeszcze 4 marca
const date = computed(() =>
  props.post.date
    ? new Intl.DateTimeFormat(locale.value === 'pl' ? 'pl-PL' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(props.post.date))
    : '',
)
</script>

<template>
  <NuxtLink
    :to="post.path"
    class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10 dark:border-white/10 dark:bg-brand-900 dark:hover:shadow-black/40"
    :class="featured && 'lg:flex-row'"
  >
    <!-- Okładka w proporcji obrazka OG (1200 × 630) -->
    <div
      class="@container relative aspect-[1200/630] shrink-0 overflow-hidden bg-linear-[140deg] from-brand-900 to-brand-700 text-white"
      :class="featured && 'lg:w-3/5'"
    >
      <NuxtImg
        v-if="post.image"
        :src="post.image"
        :alt="''"
        :sizes="featured ? 'xs:100vw lg:60vw' : 'xs:100vw md:50vw lg:33vw'"
        loading="lazy"
        class="absolute inset-0 size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
      />
      <template v-else>
        <div
          class="pointer-events-none absolute -top-[30%] -right-[12%] aspect-square w-3/5 rounded-full bg-radial from-primary-400/45 to-transparent to-65% transition-transform duration-700 motion-safe:group-hover:scale-110"
          aria-hidden="true"
        />
        <!-- Rysunek wpisu (SVG z /public/art/blog) w prawym górnym rogu – ten sam co w banerze wpisu i obrazku OG -->
        <img
          v-if="post.art"
          :src="post.art"
          alt=""
          width="480"
          height="300"
          loading="lazy"
          class="absolute object-contain"
          :class="featured ? 'top-[10%] right-[8%] h-[62%] w-[70%]' : 'top-[5cqw] right-[5cqw] h-[48%] w-[40%]'"
        />
        <div class="absolute inset-0 flex flex-col justify-end gap-[2cqw] p-[6cqw]">
          <span class="text-[2.8cqw] tracking-widest text-[#a9c0ff] uppercase">
            {{ [kindLabel, topic].filter(Boolean).join(' · ') }}
          </span>
          <!-- W wyróżnionej karcie z rysunkiem tytuł jest obok okładki – na okładce go nie powtarzamy -->
          <span v-if="!(featured && post.art)" class="leading-tight font-semibold tracking-tight" :class="post.art ? 'max-w-[56%] text-[5.4cqw]' : 'max-w-[86%] text-[5.8cqw]'">{{ post.title }}</span>
        </div>
      </template>
    </div>

    <!-- Wyróżniony wpis: duży tytuł, opis i „Czytaj wpis” obok okładki -->
    <div v-if="featured" class="flex flex-1 flex-col justify-center gap-3 p-5 sm:p-8 lg:p-10">
      <p class="text-sm text-slate-600 dark:text-slate-400">
        <time v-if="date" :datetime="post.date">{{ date }}</time>
      </p>
      <h2 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-brand-50">{{ post.title }}</h2>
      <p v-if="post.description" class="text-base/relaxed text-slate-600 dark:text-slate-300">{{ post.description }}</p>
      <span class="mt-1 inline-flex items-center gap-2 font-medium text-primary-500 dark:text-primary-400">
        {{ t('read') }}
        <Icon name="lucide:arrow-right" class="transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </div>

    <div v-else class="flex flex-1 flex-col px-4.5 pt-4 pb-4.5">
      <p class="text-xs text-slate-600 dark:text-slate-400">
        <time v-if="date" :datetime="post.date">{{ date }}</time>
      </p>
      <p v-if="post.description" class="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
        {{ post.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<i18n lang="json">
{
  "en": { "caseStudy": "Case study", "read": "Read post" },
  "pl": { "caseStudy": "Case study", "read": "Czytaj wpis" }
}
</i18n>
