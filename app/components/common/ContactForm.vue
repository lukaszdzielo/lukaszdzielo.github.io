<script setup lang="ts">
// Formularz kontaktowy wysyłany do Web3Forms. Bez captchy – przed spamem chronią:
// ukryte pole-pułapka (botcheck) i filtr antyspamowy Web3Forms (w panelu: Advanced Spam Filter).
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT, contactTopics } from '~/data/contact'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Topic = { value: string; label: string }

// Domyślnie formularz z portfolio; strona dla firm podaje własne tematy, etykiety i źródło w temacie maila
const props = withDefaults(
  defineProps<{
    topics?: readonly Topic[]
    topicLabel?: string
    messageLabel?: string
    messagePlaceholder?: string
    source?: string // trafia do tematu maila, np. „Portfolio” albo „Strony dla firm”
  }>(),
  {
    topics: () => contactTopics,
    topicLabel: 'W sprawie',
    messageLabel: 'Wiadomość',
    messagePlaceholder: 'Kilka zdań o projekcie albo stanowisku…',
    source: 'Portfolio',
  },
)

const form = reactive({
  name: '',
  email: '',
  topic: props.topics[0]?.value ?? '',
  message: '',
  botcheck: false, // pole-pułapka na boty – człowiek go nie widzi
})
const status = ref<Status>('idle')
const errorMessage = ref('')
const formEl = ref<HTMLFormElement | null>(null)

async function submit() {
  if (status.value === 'sending') return
  if (form.botcheck) return // bot wypełnił ukryte pole – po cichu nic nie wysyłamy

  status.value = 'sending'
  errorMessage.value = ''

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `${props.source}: ${form.topic} – ${form.name}`,
    from_name: `Formularz – ${props.source}`,
    name: form.name,
    email: form.email,
    topic: form.topic, // dodatkowe pole – Web3Forms dołącza do maila każde pole bez konfiguracji
    message: form.message,
    botcheck: form.botcheck,
  }

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({}))

    if (res.ok && data.success) {
      status.value = 'success'
      Object.assign(form, { name: '', email: '', topic: props.topics[0]?.value ?? '', message: '' })
    } else {
      status.value = 'error'
      errorMessage.value = data.message || 'Nie udało się wysłać wiadomości.'
    }
  } catch {
    status.value = 'error'
    errorMessage.value = 'Brak połączenia. Spróbuj ponownie za chwilę.'
  }
}

function reset() {
  status.value = 'idle'
  // Formularz pojawia się po animacji wyjścia panelu podziękowania (Transition mode="out-in")
  setTimeout(() => formEl.value?.querySelector('input')?.focus(), 260)
}

const label = 'flex flex-col gap-1.5 text-sm font-semibold'
const field =
  'h-12 w-full rounded-xl border border-white/15 bg-white/8 px-4 text-base font-normal text-current transition-colors placeholder:text-white/45 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40 dark:border-brand-950/15 dark:bg-brand-950/5 dark:placeholder:text-brand-950/40 dark:focus:border-primary-500 dark:focus:ring-primary-500/30'
</script>

<template>
  <div class="relative min-w-0">
    <Transition
      mode="out-in"
      enter-active-class="motion-safe:transition motion-safe:duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="motion-safe:transition motion-safe:duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <!-- Podziękowanie po wysłaniu -->
      <div
        v-if="status === 'success'"
        key="done"
        class="flex min-h-80 flex-col items-start justify-center gap-4"
        role="status"
      >
        <span class="grid size-12 place-items-center rounded-full bg-emerald-400/15 text-emerald-400 dark:text-emerald-600">
          <Icon name="lucide:check" class="text-2xl" aria-hidden="true" />
        </span>
        <p class="text-2xl font-semibold tracking-tight">Dzięki, wiadomość wysłana!</p>
        <p class="opacity-75">Odpiszę na podany adres w ciągu 72 godzin.</p>
        <button
          type="button"
          class="mt-2 cursor-pointer text-sm font-semibold text-primary-400 underline-offset-4 hover:underline dark:text-primary-500"
          @click="reset"
        >
          Napisz kolejną wiadomość
        </button>
      </div>

      <!-- Formularz -->
      <form
        v-else
        ref="formEl"
        key="form"
        class="grid gap-3 sm:grid-cols-2"
        @submit.prevent="submit"
      >
        <label :class="label">
          Imię
          <input v-model.trim="form.name" :class="field" type="text" name="name" autocomplete="name" placeholder="Jan" required>
        </label>

        <label :class="label">
          E-mail
          <input v-model.trim="form.email" :class="field" type="email" name="email" autocomplete="email" placeholder="jan@firma.pl" required>
        </label>

        <label :class="label" class="sm:col-span-2">
          {{ topicLabel }}
          <span class="relative">
            <!-- Natywny select: na telefonie otwiera systemowy wybór, działa z klawiaturą i czytnikami ekranu -->
            <select v-model="form.topic" :class="field" class="cursor-pointer appearance-none pr-11" name="topic">
              <option v-for="topic in topics" :key="topic.value" :value="topic.value" class="bg-white text-slate-900">
                {{ topic.label }}
              </option>
            </select>
            <Icon
              name="lucide:chevron-down"
              class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-lg opacity-70"
              aria-hidden="true"
            />
          </span>
        </label>

        <label :class="label" class="sm:col-span-2">
          {{ messageLabel }}
          <textarea
            v-model.trim="form.message"
            :class="field"
            class="h-28 resize-y py-3"
            name="message"
            :placeholder="messagePlaceholder"
            required
          />
        </label>

        <!-- Pułapka na boty (honeypot) -->
        <input v-model="form.botcheck" type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off">

        <div class="mt-1 flex flex-col-reverse gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs opacity-65" aria-live="polite">
            <span v-if="status === 'error'" class="font-semibold text-rose-300 opacity-100 dark:text-rose-600">{{ errorMessage }}</span>
            <!-- Informacja RODO: po co dane i gdzie szczegóły -->
            <template v-else>
              Imię, e-mail i treść wiadomości wykorzystam tylko po to, żeby odpowiedzieć.
              Szczegóły w <NuxtLink to="/polityka-prywatnosci" class="underline underline-offset-2 hover:opacity-100">polityce prywatności</NuxtLink>.
            </template>
          </p>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="group inline-flex h-14 cursor-pointer items-center justify-between gap-3 rounded-full bg-primary-500 pr-2 pl-6 font-medium text-white transition hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 focus-visible:outline-none disabled:cursor-wait disabled:opacity-80 motion-safe:hover:-translate-y-0.5 dark:focus-visible:ring-offset-slate-100"
          >
            {{ status === 'sending' ? 'Wysyłam…' : 'Wyślij' }}
            <span class="grid size-10 place-items-center rounded-full bg-white/20">
              <Icon
                v-if="status === 'sending'"
                name="lucide:loader-circle"
                class="text-lg motion-safe:animate-spin"
                aria-hidden="true"
              />
              <Icon
                v-else
                name="lucide:arrow-up-right"
                class="text-lg transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </form>
    </Transition>
  </div>
</template>
