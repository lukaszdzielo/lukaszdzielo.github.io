<script setup lang="ts">
// Kontakt nad stopką. Wariant „business” (strona dla firm): inny nagłówek, zamiast profili –
// informacja o czasie odpowiedzi, a w formularzu tematy dla firm.
import { businessContact } from '~/data/business'
import { contactSocials } from '~/data/contact'

const props = withDefaults(defineProps<{ variant?: 'portfolio' | 'business' }>(), { variant: 'portfolio' })
const business = computed(() => props.variant === 'business')
</script>

<template>
  <section id="contact" class="relative isolate pt-22 pb-18 md:pt-28 md:pb-22.5 lg:pt-37.5 lg:pb-27.5">
    <CommonCodeBackdrop name="contact" class="top-6" />
    <div class="container">
      <div
        v-reveal
        class="relative grid gap-10 overflow-hidden rounded-3xl bg-brand-900 p-5 text-white sm:p-8 transition-[opacity,translate] duration-700 ease-out md:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-16 dark:bg-slate-100 dark:text-brand-950"
      >
        <!-- Poświata w rogu karty -->
        <div
          class="pointer-events-none absolute -top-2/5 -right-1/10 aspect-square w-[55%] rounded-full bg-radial from-primary-400/40 to-transparent to-65% dark:from-primary-500/18"
          aria-hidden="true"
        />

        <div class="relative">
          <h2 class="text-3xl font-medium tracking-tight lg:text-5xl">
            {{ business ? businessContact.title : 'Masz projekt do zrobienia?' }}
          </h2>
          <p class="mt-3.5 max-w-115 text-base/relaxed opacity-75">
            {{ business ? businessContact.lead : 'Albo szukasz kogoś do zespołu? Napisz kilka zdań – odpowiem w ciągu 72 godzin.' }}
          </p>
          <p v-if="business" class="mt-8 inline-flex items-center gap-2.5 text-sm">
            <span class="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {{ businessContact.response }}
          </p>
          <ul v-else class="mt-8 flex flex-wrap gap-2.5">
            <li v-for="social in contactSocials" :key="social.href">
              <a
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex h-11 items-center rounded-full bg-white/10 px-4 text-sm transition-colors hover:bg-primary-500 hover:text-white dark:bg-brand-950/8 dark:hover:bg-primary-500"
              >
                {{ social.label }}
              </a>
            </li>
          </ul>
        </div>

        <CommonContactForm
          v-if="business"
          class="relative"
          :topics="businessContact.topics"
          topic-label="Czego potrzebujesz?"
          message-label="Kilka słów o projekcie"
          :message-placeholder="businessContact.placeholder"
          source="Strony dla firm"
        />
        <CommonContactForm v-else class="relative" />
      </div>
    </div>
  </section>
</template>
