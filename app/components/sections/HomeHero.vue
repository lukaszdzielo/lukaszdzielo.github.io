<script setup lang="ts">
// Hero: „Front-end developer.” po lewej, ilustracja po prawej (na tablecie i telefonie nad tekstem).
// Za portretem jasna poświata (.hero-glow w main.css), w tle fragment kodu (CommonCodeBackdrop).
defineProps<{
  title?: string
  titleAccent?: string
  stack?: string[]
}>()
</script>

<template>
  <header id="top" class="relative isolate">
    <!-- Poświata zaczyna się pod przyklejonym menu (h. 73 px) i sięga w głąb strony, jak w projekcie -->
    <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-375" aria-hidden="true" />
    <CommonCodeBackdrop name="hero" class="top-5 max-lg:hidden" />

    <div class="container grid items-center lg:min-h-189 lg:grid-cols-2 lg:gap-8 lg:pt-2.5 lg:pb-5">
      <div class="max-w-160 pt-6 lg:-translate-y-3.5 lg:pt-0">
        <h1 class="text-4xl leading-none font-semibold tracking-tighter text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
          <!-- Każda linia wjeżdża od dołu (wyłączone przy „ogranicz ruch”) -->
          <span class="-mb-[0.1em] block overflow-hidden pb-[0.14em]">
            <span class="block motion-safe:animate-rise">{{ title }}</span>
          </span>
          <span class="-mb-[0.1em] block overflow-hidden pb-[0.14em]">
            <span class="block text-primary-500 motion-safe:animate-rise motion-safe:[animation-delay:80ms] dark:text-primary-400">{{ titleAccent }}</span>
          </span>
        </h1>

        <p class="mt-5.5 max-w-112.5 text-base/relaxed text-slate-600 dark:text-slate-300">
          <slot name="description" mdc-unwrap="p" />
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            class="group inline-flex h-14 items-center gap-3 rounded-full bg-brand-900 pr-2 pl-6 font-medium text-white transition-transform duration-300 motion-safe:hover:-translate-y-0.5 dark:bg-slate-100 dark:text-brand-950"
          >
            Zobacz projekty
            <span class="grid size-10 place-items-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950">
              <Icon name="lucide:arrow-down" class="transition-transform motion-safe:group-hover:translate-y-0.5" aria-hidden="true" />
            </span>
          </a>
        </div>

        <ul v-if="stack?.length" class="mt-7 flex flex-wrap gap-2">
          <li
            v-for="item in stack"
            :key="item"
            class="rounded-full border border-slate-900/10 bg-white px-2.75 py-1.5 text-xs text-slate-600 dark:border-white/10 dark:bg-brand-900 dark:text-slate-300"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Ilustracja: na desktopie przy prawej krawędzi, niżej nad tekstem i na środku.
           Kwadratowy portret.avif przycięty (object-cover) do wąskiego kadru postaci.
           Od lg wysokość jest ograniczona szerokością kolumny (160.6cqw = szerokość ÷ proporcja 820/1317),
           więc na węższych ekranach postać się zmniejsza zamiast wchodzić na tekst.
           Bez drop-shadow – cień wpadał w przezroczystą szczelinę między ręką a tułowiem. -->
      <div class="@container relative order-first h-99 sm:h-140 lg:order-none lg:h-189">
        <div
          class="absolute bottom-0 left-1/2 aspect-[820/1317] h-full -translate-x-1/2 lg:h-[min(100%,160.6cqw)] lg:right-0 lg:left-auto lg:translate-x-0 [&_img]:size-full [&_img]:object-cover [&_img]:mask-[linear-gradient(to_bottom,#000_72%,transparent_99%)]"
        >
          <slot name="image" />
        </div>
      </div>
    </div>
  </header>
</template>
