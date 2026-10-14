<script setup lang="ts">
// Adres w każdym języku (link() z useLocalLink zamienia '/polityka-prywatnosci' na właściwy)
definePageMeta({ i18n: { paths: { en: '/privacy-policy', pl: '/polityka-prywatnosci' } } })

// Polityka prywatności – prosta, bez prawniczego żargonu. Przy zmianie usług (formularz, statystyki,
// hosting) zaktualizuj odpowiednią sekcję w obu językach (blok <i18n> na dole) i datę UPDATED.
const UPDATED = '2026-10-13'
const { t, locale } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const { consent, openSettings } = useConsent()
// Data w języku strony; timeZone UTC – żeby w strefie USA nie wyszedł dzień wcześniej
const updatedLabel = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'pl' ? 'pl-PL' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(UPDATED)),
)

useSiteMeta({
  title: t('meta.title'),
  description: t('meta.description'),
})

// Punkty listy „Formularz kontaktowy” i „Twoje prawa” – teksty w bloku <i18n>
const formItems = ['what', 'why', 'basis', 'who', 'howLong'] as const
const rights = ['access', 'correct', 'restrict', 'portability', 'withdraw', 'complaint'] as const

const h2 = 'mt-12 text-2xl font-medium tracking-tight text-slate-900 dark:text-brand-50'
const p = 'mt-4 text-base/relaxed text-slate-600 dark:text-slate-300'
const list = 'mt-4 space-y-2 pl-5 text-base/relaxed text-slate-600 marker:text-primary-500 list-disc dark:text-slate-300 dark:marker:text-primary-400'
const bold = 'font-medium text-slate-900 dark:text-brand-50'
const code = 'rounded bg-white px-1.5 py-0.5 text-sm dark:bg-brand-900'
</script>

<template>
  <section class="relative isolate">
    <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-250" aria-hidden="true" />

    <div class="container pt-12 pb-22 sm:pt-16 md:pb-28">
      <div class="max-w-3xl">
        <p class="text-sm text-slate-600 dark:text-slate-400">
          <NuxtLink :to="link('/')" class="text-primary-500 dark:text-primary-400">{{ t('breadcrumb') }}</NuxtLink> / {{ t('title') }}
        </p>
        <h1 class="mt-5 text-4xl leading-none font-semibold tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl dark:text-brand-50">
          {{ t('title') }}
        </h1>
        <i18n-t keypath="intro" tag="p" :class="p">
          <template #date>
            <time :datetime="UPDATED">{{ updatedLabel }}</time>
          </template>
        </i18n-t>

        <h2 :class="h2">{{ t('controller.title') }}</h2>
        <i18n-t keypath="controller.text" tag="p" :class="p">
          <template #link>
            <NuxtLink :to="link('/#contact')" class="text-primary-500 underline underline-offset-2 dark:text-primary-400">{{ t('controller.link') }}</NuxtLink>
          </template>
        </i18n-t>

        <h2 :class="h2">{{ t('form.title') }}</h2>
        <ul :class="list">
          <li v-for="item in formItems" :key="item">
            <b :class="bold">{{ t(`form.${item}.label`) }}</b> {{ t(`form.${item}.text`) }}
          </li>
        </ul>
        <p :class="p">{{ t('form.voluntary') }}</p>

        <h2 :class="h2">{{ t('analytics.title') }}</h2>
        <i18n-t keypath="analytics.what" tag="p" :class="p">
          <template #cookie>
            <code :class="code">_ga</code>
          </template>
        </i18n-t>
        <i18n-t keypath="analytics.basis" tag="p" :class="p">
          <template #cookie>
            <code :class="code">_ga</code>
          </template>
        </i18n-t>
        <ClientOnly>
          <div class="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              class="inline-flex h-12 cursor-pointer items-center rounded-full border border-slate-900/16 px-5 font-medium text-slate-900 transition-colors hover:bg-white dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-900"
              @click="openSettings"
            >
              {{ t('analytics.settings') }}
            </button>
            <span v-if="consent" class="text-sm text-slate-600 dark:text-slate-400">
              {{ t('analytics.now', { state: consent === 'granted' ? t('analytics.on') : t('analytics.off') }) }}
            </span>
          </div>
        </ClientOnly>

        <h2 :class="h2">{{ t('hosting.title') }}</h2>
        <p :class="p">{{ t('hosting.text') }}</p>

        <h2 :class="h2">{{ t('storage.title') }}</h2>
        <p :class="p">{{ t('storage.text') }}</p>

        <h2 :class="h2">{{ t('rights.title') }}</h2>
        <p :class="p">{{ t('rights.intro') }}</p>
        <ul :class="list">
          <li v-for="item in rights" :key="item">{{ t(`rights.${item}`) }}</li>
        </ul>
        <p :class="p">{{ t('rights.noProfiling') }}</p>
      </div>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "meta": {
      "title": "Privacy policy – Łukasz Dzieło",
      "description": "What data lukaszdzielo.github.io collects, why, and what rights you have."
    },
    "breadcrumb": "Home",
    "title": "Privacy policy",
    "intro": "This site is my portfolio. It collects only as much data as it needs to reply to your message and – if you agree – to count visits. Last updated: {date}.",
    "controller": {
      "title": "Who is responsible for your data",
      "text": "The data controller is Łukasz Dzieło, Katowice, Poland. For anything about your personal data, write to me through the {link}.",
      "link": "contact form"
    },
    "form": {
      "title": "Contact form",
      "what": { "label": "What data:", "text": "your name, email address, topic and message." },
      "why": { "label": "Why:", "text": "to reply to your message and – if you ask about it – to talk about working together." },
      "basis": {
        "label": "Legal basis:",
        "text": "my legitimate interest, which is replying to your message (Art. 6(1)(f) GDPR), and, when we talk about a project, steps taken before entering into a contract (Art. 6(1)(b) GDPR)."
      },
      "who": {
        "label": "Who else sees it:",
        "text": "Web3Forms – a service that forwards the message from the form to my email inbox. Your data may be processed outside the European Economic Area."
      },
      "howLong": { "label": "How long:", "text": "for as long as our conversation lasts; if we start working together – as long as the law requires." },
      "voluntary": "Providing your data is voluntary, but without an email address I won't be able to reply."
    },
    "analytics": {
      "title": "Visitor statistics (Google Analytics)",
      "what": "The site loads Google Analytics only if you agree. It shows me aggregate statistics: how many people visit the site, which pages they read, what devices they use and which country they come from. Google stores {cookie} cookies in your browser. Provider: Google Ireland Limited; data may also be transferred to Google LLC in the USA.",
      "basis": "The legal basis is your consent (Art. 6(1)(a) GDPR). You can withdraw it at any time – measurement then stops and the {cookie} cookies are deleted.",
      "settings": "Change statistics settings",
      "now": "Now: {state}",
      "on": "statistics on",
      "off": "statistics off"
    },
    "hosting": {
      "title": "Hosting",
      "text": "The site runs on GitHub Pages (GitHub, Inc.). Like any server, GitHub records technical data about visits – including your IP address and browser type – to keep the site running and secure. I don't have access to this data."
    },
    "storage": {
      "title": "Browser storage",
      "text": "The site saves two things in your browser (localStorage): the theme you chose – light or dark – and your decision about statistics. It also keeps your language choice – English or Polish – in a small cookie called lang. This information isn't sent anywhere; you can delete it by clearing the site's data in your browser. Fonts and icons are hosted on the same server as the site – they aren't loaded from other companies."
    },
    "rights": {
      "title": "Your rights",
      "intro": "You have the right to:",
      "access": "get a copy of your data and find out how I use it,",
      "correct": "correct your data or ask me to delete it,",
      "restrict": "restrict how it's used or object to its use,",
      "portability": "transfer your data to someone else,",
      "withdraw": "withdraw your consent to statistics – without affecting anything that happened before you withdrew it,",
      "complaint": "lodge a complaint with the President of the Personal Data Protection Office in Poland (uodo.gov.pl).",
      "noProfiling": "Your data isn't used for automated decision-making or profiling."
    }
  },
  "pl": {
    "meta": {
      "title": "Polityka prywatności – Łukasz Dzieło",
      "description": "Jakie dane zbiera strona lukaszdzielo.github.io, po co i jakie masz prawa."
    },
    "breadcrumb": "Strona główna",
    "title": "Polityka prywatności",
    "intro": "Ta strona to moje portfolio. Zbiera tylko tyle danych, ile potrzeba, żeby odpowiedzieć na wiadomość i – jeśli się zgodzisz – policzyć odwiedziny. Aktualizacja: {date}.",
    "controller": {
      "title": "Kto odpowiada za dane",
      "text": "Administratorem danych jest Łukasz Dzieło, Katowice. W sprawach danych osobowych napisz do mnie przez {link}.",
      "link": "formularz kontaktowy"
    },
    "form": {
      "title": "Formularz kontaktowy",
      "what": { "label": "Jakie dane:", "text": "imię, adres e-mail, temat i treść wiadomości." },
      "why": { "label": "Po co:", "text": "żeby odpowiedzieć na wiadomość i – jeśli o to pytasz – porozmawiać o współpracy." },
      "basis": {
        "label": "Podstawa:",
        "text": "mój prawnie uzasadniony interes, czyli odpowiedź na Twoją wiadomość (art. 6 ust. 1 lit. f RODO), a przy rozmowie o zleceniu – działania przed zawarciem umowy (art. 6 ust. 1 lit. b RODO)."
      },
      "who": {
        "label": "Kto jeszcze je widzi:",
        "text": "Web3Forms – usługa, która przekazuje wiadomość z formularza na moją skrzynkę e-mail. Dane mogą być przetwarzane poza Europejskim Obszarem Gospodarczym."
      },
      "howLong": { "label": "Jak długo:", "text": "tak długo, jak trwa nasza rozmowa; jeśli zaczniemy współpracę – tyle, ile wymagają przepisy." },
      "voluntary": "Podanie danych jest dobrowolne, ale bez adresu e-mail nie będę mógł odpisać."
    },
    "analytics": {
      "title": "Statystyki odwiedzin (Google Analytics)",
      "what": "Tylko jeśli się zgodzisz, strona wczytuje Google Analytics. Dzięki niemu widzę zbiorcze statystyki: ile osób odwiedza stronę, które podstrony czytają, z jakich urządzeń i z jakiego kraju przychodzą. Google zapisuje w przeglądarce pliki cookies {cookie}. Dostawca: Google Ireland Limited; dane mogą trafić także do Google LLC w USA.",
      "basis": "Podstawą jest Twoja zgoda (art. 6 ust. 1 lit. a RODO). Możesz ją wycofać w każdej chwili – wtedy pomiar się wyłącza, a pliki cookies {cookie} są usuwane.",
      "settings": "Zmień ustawienia statystyk",
      "now": "Teraz: {state}",
      "on": "statystyki włączone",
      "off": "statystyki wyłączone"
    },
    "hosting": {
      "title": "Hosting",
      "text": "Strona działa na GitHub Pages (GitHub, Inc.). Jak każdy serwer, GitHub zapisuje techniczne dane o wizytach – m.in. adres IP i rodzaj przeglądarki – żeby strona działała i była bezpieczna. Nie mam do tych danych dostępu."
    },
    "storage": {
      "title": "Pamięć przeglądarki",
      "text": "Strona zapamiętuje w Twojej przeglądarce (localStorage) dwie rzeczy: wybrany motyw – jasny lub ciemny – i decyzję w sprawie statystyk. Wybrany język – polski lub angielski – zapisuje w małym pliku cookie o nazwie lang. Te informacje nigdzie nie są wysyłane; usuniesz je, czyszcząc dane strony w przeglądarce. Czcionki i ikony są na tym samym serwerze co strona – nie są pobierane od innych firm."
    },
    "rights": {
      "title": "Twoje prawa",
      "intro": "Masz prawo:",
      "access": "dostać kopię swoich danych i dowiedzieć się, jak je wykorzystuję,",
      "correct": "poprawić dane albo poprosić o ich usunięcie,",
      "restrict": "ograniczyć ich wykorzystanie lub się mu sprzeciwić,",
      "portability": "przenieść dane do kogoś innego,",
      "withdraw": "wycofać zgodę na statystyki – bez wpływu na to, co działo się przed wycofaniem,",
      "complaint": "złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl).",
      "noProfiling": "Dane nie służą do podejmowania automatycznych decyzji ani do profilowania."
    }
  }
}
</i18n>
