<script setup lang="ts">
// Dwa sposoby, w jakie mogę pomóc. Pierwsza karta (dla zespołów) jest wyróżniona ciemnym tłem.
// Link bez `to` wyświetla się jako nieaktywny (np. oferta dla firm, której strona jeszcze nie istnieje).
type Service = { audience: string; title: string; items: string[]; linkLabel: string; to?: string }

defineProps<{ services?: Service[] }>()

const { t } = useI18n({ useScope: 'local' })
// service.to w treści to adres wersji polskiej bez /pl – link() zamienia go na adres w bieżącym języku
const link = useLocalLink()
const anchor = useAnchor()
</script>

<template>
  <section :id="anchor('services')" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="services" class="top-6" />
    <div class="container">
      <CommonSectionHead :title="t('title')" :lead="t('lead')" />

      <div class="mt-7 grid gap-6 lg:mt-10 lg:grid-cols-2">
        <article
          v-for="(service, i) in services"
          :key="service.title"
          v-reveal="i * 80"
          class="flex flex-col gap-4.5 rounded-3xl border p-7 transition-[opacity,translate] duration-700 ease-out md:p-9"
          :class="
            i === 0
              ? 'border-transparent bg-brand-900 text-white dark:bg-slate-100 dark:text-brand-950'
              : 'border-slate-900/10 bg-white text-slate-900 shadow-sm dark:border-white/10 dark:bg-brand-900 dark:text-brand-50'
          "
        >
          <span
            class="self-start rounded-lg px-2.5 py-1.5 text-xs font-semibold"
            :class="
              i === 0
                ? 'bg-primary-400/18 text-primary-400 dark:bg-primary-500/12 dark:text-primary-600'
                : 'bg-primary-500/10 text-primary-500 dark:bg-primary-400/14 dark:text-primary-400'
            "
          >
            {{ service.audience }}
          </span>

          <h3 class="text-2xl font-medium tracking-tight">{{ service.title }}</h3>

          <ul class="flex flex-col gap-2.5 text-base">
            <li v-for="item in service.items" :key="item" class="flex gap-3 opacity-85">
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-primary-500 dark:bg-primary-400" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>

          <NuxtLink
            v-if="service.to"
            :to="link(service.to)"
            class="group mt-auto inline-flex items-center gap-2.5 self-start pt-1.5 font-medium"
          >
            {{ service.linkLabel }}
            <span class="grid size-8.5 place-items-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950">
              <Icon name="lucide:arrow-right" class="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </NuxtLink>
          <span
            v-else
            aria-disabled="true"
            :title="t('soon')"
            class="mt-auto inline-flex cursor-not-allowed items-center gap-2.5 self-start pt-1.5 font-medium opacity-45"
          >
            {{ service.linkLabel }}
            <span class="grid size-8.5 place-items-center rounded-full bg-slate-900/10 dark:bg-white/15">
              <Icon name="lucide:arrow-right" class="size-4" aria-hidden="true" />
            </span>
          </span>
        </article>
      </div>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Two ways I can help",
    "lead": "One person, two different needs. Pick the one that sounds like yours.",
    "soon": "Coming soon"
  },
  "pl": {
    "title": "Dwa sposoby, w jakie mogę pomóc",
    "lead": "Ta sama osoba, dwie różne potrzeby. Wybierz tę, która brzmi jak Twoja.",
    "soon": "Wkrótce"
  }
}
</i18n>
