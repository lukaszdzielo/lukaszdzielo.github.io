<script setup lang="ts">
// Formularz kontaktowy wysyłany do Web3Forms. Bez captchy – przed spamem chronią:
// ukryte pole-pułapka (botcheck) i filtr antyspamowy Web3Forms (w panelu: Advanced Spam Filter).
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT, contactTopics } from '~/data/contact'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Topic = { value: string; label: string }

// Domyślnie formularz z portfolio; strona dla firm podaje własne tematy, etykiety i źródło w temacie maila.
// Bez podanych etykiet i tematów formularz bierze domyślne w aktualnym języku (blok <i18n> i contactTopics).
const props = withDefaults(
  defineProps<{
    topics?: readonly Topic[]
    topicLabel?: string
    messageLabel?: string
    messagePlaceholder?: string
    source?: string // trafia do tematu maila, np. „Portfolio” albo „Strony dla firm”
    defaultTopic?: string // temat wybrany na starcie (wartość z listy), np. „Strona dla firmy” na stronach projektów WordPress
  }>(),
  {
    source: 'Portfolio',
  },
)

const { t, locale } = useI18n({ useScope: 'local' })
const defaultTopics = useLocalized(contactTopics)
const topicList = computed<readonly Topic[]>(() => props.topics ?? defaultTopics.value)
// Temat na starcie: podany w defaultTopic, jeśli jest na liście – inaczej pierwszy z listy
const firstTopic = () =>
  topicList.value.find(topic => topic.value === props.defaultTopic)?.value ?? topicList.value[0]?.value ?? ''

const form = reactive({
  name: '',
  email: '',
  topic: firstTopic(),
  message: '',
  botcheck: false, // pole-pułapka na boty – człowiek go nie widzi
})
const status = ref<Status>('idle')
// Błąd: komunikat z Web3Forms (gdy jest) albo nasz – zapisany jako klucz, żeby zmieniał się z językiem strony
const serverError = ref('')
const errorKey = ref<'send' | 'offline'>('send')
const errorMessage = computed(() => serverError.value || t(`errors.${errorKey.value}`))
const formEl = ref<HTMLFormElement | null>(null)
const link = useLocalLink()
// W przerwie świątecznej komunikat po wysłaniu podaje dzień powrotu zamiast „72 godzin”
const holiday = useHolidayBreak()

// Po zmianie języka lista tematów może mieć inne wartości – wtedy wracamy do pierwszego tematu
watch(topicList, (list) => {
  if (!list.some(topic => topic.value === form.topic)) form.topic = firstTopic()
})

async function submit() {
  if (status.value === 'sending') return
  if (form.botcheck) return // bot wypełnił ukryte pole – po cichu nic nie wysyłamy

  status.value = 'sending'
  serverError.value = ''

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    // (EN) – wiadomość z angielskiej wersji strony, czyli odpisać po angielsku
    subject: `${props.source}${locale.value === 'en' ? ' (EN)' : ''}: ${form.topic} – ${form.name}`,
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
      Object.assign(form, { name: '', email: '', topic: firstTopic(), message: '' })
    } else {
      status.value = 'error'
      serverError.value = data.message || ''
      errorKey.value = 'send'
    }
  } catch {
    status.value = 'error'
    serverError.value = ''
    errorKey.value = 'offline'
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
          <Icon name="lucide:check" class="size-6" aria-hidden="true" />
        </span>
        <p class="text-2xl font-semibold tracking-tight">{{ t('success.title') }}</p>
        <p class="opacity-75">{{ holiday.active.value ? t('success.holidayLead', holiday.dates.value) : t('success.lead') }}</p>
        <button
          type="button"
          class="mt-2 cursor-pointer text-sm font-semibold text-primary-400 underline-offset-4 hover:underline dark:text-primary-500"
          @click="reset"
        >
          {{ t('success.again') }}
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
          {{ t('name') }}
          <input v-model.trim="form.name" :class="field" type="text" name="name" autocomplete="name" :placeholder="t('namePlaceholder')" required>
        </label>

        <label :class="label">
          {{ t('email') }}
          <input v-model.trim="form.email" :class="field" type="email" name="email" autocomplete="email" :placeholder="t('emailPlaceholder')" required>
        </label>

        <label :class="label" class="sm:col-span-2">
          {{ topicLabel ?? t('topic') }}
          <span class="relative">
            <!-- Natywny select: na telefonie otwiera systemowy wybór, działa z klawiaturą i czytnikami ekranu -->
            <select v-model="form.topic" :class="field" class="cursor-pointer appearance-none pr-11" name="topic">
              <option v-for="topic in topicList" :key="topic.value" :value="topic.value" class="bg-white text-slate-900">
                {{ topic.label }}
              </option>
            </select>
            <Icon
              name="lucide:chevron-down"
              class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 size-5 opacity-70"
              aria-hidden="true"
            />
          </span>
        </label>

        <label :class="label" class="sm:col-span-2">
          {{ messageLabel ?? t('message') }}
          <textarea
            v-model.trim="form.message"
            :class="field"
            class="h-28 resize-y py-3"
            name="message"
            :placeholder="messagePlaceholder ?? t('messagePlaceholder')"
            required
          />
        </label>

        <!-- Pułapka na boty (honeypot) -->
        <input v-model="form.botcheck" type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off">

        <div class="mt-1 flex flex-col-reverse gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-xs opacity-65" aria-live="polite">
            <span v-if="status === 'error'" class="font-semibold text-rose-300 opacity-100 dark:text-rose-600">{{ errorMessage }}</span>
            <!-- Informacja RODO: po co dane i gdzie szczegóły -->
            <i18n-t v-else keypath="privacy.text" tag="span">
              <template #link>
                <NuxtLink :to="link('/polityka-prywatnosci')" class="underline underline-offset-2 hover:opacity-100">{{ t('privacy.link') }}</NuxtLink>
              </template>
            </i18n-t>
          </p>

          <button
            type="submit"
            :disabled="status === 'sending'"
            class="group inline-flex h-14 cursor-pointer items-center justify-between gap-3 rounded-full bg-primary-500 pr-2 pl-6 font-medium text-white transition hover:bg-primary-600 focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 focus-visible:outline-none disabled:cursor-wait disabled:opacity-80 motion-safe:hover:-translate-y-0.5 dark:focus-visible:ring-offset-slate-100"
          >
            {{ status === 'sending' ? t('sending') : t('send') }}
            <span class="grid size-10 place-items-center rounded-full bg-white/20">
              <Icon
                v-if="status === 'sending'"
                name="lucide:loader-circle"
                class="size-5 motion-safe:animate-spin"
                aria-hidden="true"
              />
              <Icon
                v-else
                name="lucide:arrow-up-right"
                class="size-5 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </form>
    </Transition>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "name": "Name",
    "namePlaceholder": "Jane",
    "email": "Email",
    "emailPlaceholder": "jane{'@'}company.com",
    "topic": "Regarding",
    "message": "Message",
    "messagePlaceholder": "A few sentences about the project or the role…",
    "send": "Send",
    "sending": "Sending…",
    "privacy": {
      "text": "I'll use your name, email and message only to reply to you. Details in the {link}.",
      "link": "privacy policy"
    },
    "success": {
      "title": "Thanks, your message is on its way!",
      "lead": "I'll reply to the address you gave within 72 hours.",
      "holidayLead": "I'm on a holiday break from {from} to {to} – I'll reply to the address you gave after {back}.",
      "again": "Send another message"
    },
    "errors": {
      "send": "The message couldn't be sent.",
      "offline": "No connection. Please try again in a moment."
    }
  },
  "pl": {
    "name": "Imię",
    "namePlaceholder": "Jan",
    "email": "E-mail",
    "emailPlaceholder": "jan{'@'}firma.pl",
    "topic": "W sprawie",
    "message": "Wiadomość",
    "messagePlaceholder": "Kilka zdań o projekcie albo stanowisku…",
    "send": "Wyślij",
    "sending": "Wysyłam…",
    "privacy": {
      "text": "Imię, e-mail i treść wiadomości wykorzystam tylko po to, żeby odpowiedzieć. Szczegóły w {link}.",
      "link": "polityce prywatności"
    },
    "success": {
      "title": "Dzięki, wiadomość wysłana!",
      "lead": "Odpiszę na podany adres w ciągu 72 godzin.",
      "holidayLead": "Od {from} do {to} mam przerwę świąteczną – odpiszę na podany adres po {back}.",
      "again": "Napisz kolejną wiadomość"
    },
    "errors": {
      "send": "Nie udało się wysłać wiadomości.",
      "offline": "Brak połączenia. Spróbuj ponownie za chwilę."
    }
  }
}
</i18n>
