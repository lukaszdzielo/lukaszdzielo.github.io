<script setup lang="ts">
// Polityka prywatności – prosta, bez prawniczego żargonu. Przy zmianie usług (formularz, statystyki,
// hosting) zaktualizuj odpowiednią sekcję i datę UPDATED.
const UPDATED = '2026-10-12'
const { consent, openSettings } = useConsent()
const updatedLabel = new Intl.DateTimeFormat('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(UPDATED))

useSeoMeta({
  title: 'Polityka prywatności – Łukasz Dzieło',
  description: 'Jakie dane zbiera strona lukaszdzielo.github.io, po co i jakie masz prawa.',
})

const h2 = 'mt-12 text-2xl font-medium tracking-tight text-slate-900 dark:text-brand-50'
const p = 'mt-4 text-base/relaxed text-slate-600 dark:text-slate-300'
const list = 'mt-4 space-y-2 pl-5 text-base/relaxed text-slate-600 marker:text-primary-500 list-disc dark:text-slate-300 dark:marker:text-primary-400'
</script>

<template>
  <section class="relative isolate">
    <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-250" aria-hidden="true" />

    <div class="container pt-12 pb-22 sm:pt-16 md:pb-28">
      <div class="max-w-3xl">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          <NuxtLink to="/" class="text-primary-500 dark:text-primary-400">Strona główna</NuxtLink> / Polityka prywatności
        </p>
        <h1 class="mt-5 text-4xl leading-none font-semibold tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl dark:text-brand-50">
          Polityka prywatności
        </h1>
        <p :class="p">
          Ta strona to moje portfolio. Zbiera tylko tyle danych, ile potrzeba, żeby odpowiedzieć na wiadomość
          i – jeśli się zgodzisz – policzyć odwiedziny. Aktualizacja:
          <time :datetime="UPDATED">{{ updatedLabel }}</time>.
        </p>

        <h2 :class="h2">Kto odpowiada za dane</h2>
        <p :class="p">
          Administratorem danych jest Łukasz Dzieło, Katowice. W sprawach danych osobowych napisz do mnie przez
          <NuxtLink to="/#contact" class="text-primary-500 underline underline-offset-2 dark:text-primary-400">formularz kontaktowy</NuxtLink>.
        </p>

        <h2 :class="h2">Formularz kontaktowy</h2>
        <ul :class="list">
          <li><b class="font-medium text-slate-900 dark:text-brand-50">Jakie dane:</b> imię, adres e-mail, temat i treść wiadomości.</li>
          <li><b class="font-medium text-slate-900 dark:text-brand-50">Po co:</b> żeby odpowiedzieć na wiadomość i – jeśli o to pytasz – porozmawiać o współpracy.</li>
          <li>
            <b class="font-medium text-slate-900 dark:text-brand-50">Podstawa:</b> mój prawnie uzasadniony interes, czyli odpowiedź na Twoją wiadomość
            (art. 6 ust. 1 lit. f RODO), a przy rozmowie o zleceniu – działania przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).
          </li>
          <li>
            <b class="font-medium text-slate-900 dark:text-brand-50">Kto jeszcze je widzi:</b> Web3Forms – usługa, która przekazuje wiadomość z formularza
            na moją skrzynkę e-mail. Dane mogą być przetwarzane poza Europejskim Obszarem Gospodarczym.
          </li>
          <li><b class="font-medium text-slate-900 dark:text-brand-50">Jak długo:</b> tak długo, jak trwa nasza rozmowa; jeśli zaczniemy współpracę – tyle, ile wymagają przepisy.</li>
        </ul>
        <p :class="p">Podanie danych jest dobrowolne, ale bez adresu e-mail nie będę mógł odpisać.</p>

        <h2 :class="h2">Statystyki odwiedzin (Google Analytics)</h2>
        <p :class="p">
          Tylko jeśli się zgodzisz, strona wczytuje Google Analytics. Dzięki niemu widzę zbiorcze statystyki:
          ile osób odwiedza stronę, które podstrony czytają, z jakich urządzeń i z jakiego kraju przychodzą.
          Google zapisuje w przeglądarce pliki cookies <code class="rounded bg-white px-1.5 py-0.5 text-sm dark:bg-brand-900">_ga</code>.
          Dostawca: Google Ireland Limited; dane mogą trafić także do Google LLC w USA.
        </p>
        <p :class="p">
          Podstawą jest Twoja zgoda (art. 6 ust. 1 lit. a RODO). Możesz ją wycofać w każdej chwili – wtedy pomiar się wyłącza,
          a pliki cookies <code class="rounded bg-white px-1.5 py-0.5 text-sm dark:bg-brand-900">_ga</code> są usuwane.
        </p>
        <ClientOnly>
          <div class="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              class="inline-flex h-12 cursor-pointer items-center rounded-full border border-slate-900/16 px-5 font-medium text-slate-900 transition-colors hover:bg-white dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-900"
              @click="openSettings"
            >
              Zmień ustawienia statystyk
            </button>
            <span v-if="consent" class="text-sm text-slate-500 dark:text-slate-400">
              Teraz: {{ consent === 'granted' ? 'statystyki włączone' : 'statystyki wyłączone' }}
            </span>
          </div>
        </ClientOnly>

        <h2 :class="h2">Hosting</h2>
        <p :class="p">
          Strona działa na GitHub Pages (GitHub, Inc.). Jak każdy serwer, GitHub zapisuje techniczne dane o wizytach –
          m.in. adres IP i rodzaj przeglądarki – żeby strona działała i była bezpieczna. Nie mam do tych danych dostępu.
        </p>

        <h2 :class="h2">Pamięć przeglądarki</h2>
        <p :class="p">
          Strona zapamiętuje w Twojej przeglądarce (localStorage) dwie rzeczy: wybrany motyw – jasny lub ciemny – i decyzję
          w sprawie statystyk. Te informacje nigdzie nie są wysyłane; usuniesz je, czyszcząc dane strony w przeglądarce.
          Czcionki i ikony są na tym samym serwerze co strona – nie są pobierane od innych firm.
        </p>

        <h2 :class="h2">Twoje prawa</h2>
        <p :class="p">Masz prawo:</p>
        <ul :class="list">
          <li>dostać kopię swoich danych i dowiedzieć się, jak je wykorzystuję,</li>
          <li>poprawić dane albo poprosić o ich usunięcie,</li>
          <li>ograniczyć ich wykorzystanie lub się mu sprzeciwić,</li>
          <li>przenieść dane do kogoś innego,</li>
          <li>wycofać zgodę na statystyki – bez wpływu na to, co działo się przed wycofaniem,</li>
          <li>złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (uodo.gov.pl).</li>
        </ul>
        <p :class="p">Dane nie służą do podejmowania automatycznych decyzji ani do profilowania.</p>
      </div>
    </div>
  </section>
</template>
