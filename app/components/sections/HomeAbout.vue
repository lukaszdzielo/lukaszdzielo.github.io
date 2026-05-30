<script setup lang="ts">
defineProps<{
  cards?: string[];
}>();
</script>

<template>
  <section class="my-15 sm:my-20 md:my-40">
    <div
      class="container grid md:grid-cols-2 lg:grid-cols-[1fr_auto] gap-10 md:gap-10 lg:gap-15 xl:gap-20 2xl:gap-30"
    >
      <div class="flex flex-col gap-10">
        <div class="flex flex-col gap-5">
          <div
            class="flex items-center gap-2 font-medium after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full"
          >
            <span class="opacity-40">02</span>
            <span class="opacity-40">/</span>
            <span class="font-semibold uppercase">
              <slot name="eyebrow" mdc-unwrap="p" />
            </span>
          </div>
          <h2
            class="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-pretty"
          >
            <slot name="title" mdc-unwrap="p" />
          </h2>
          <p class="opacity-80">
            <slot name="description" mdc-unwrap="p" />
          </p>
        </div>

        <ul
          v-if="cards?.length"
          class="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5"
        >
          <li
            v-for="(card, i) in cards"
            :key="i"
            class="flex p-5 md:p-6 rounded-2xl bg-slate-200 dark:bg-slate-700 font-medium"
          >
            {{ card }}
          </li>
        </ul>
      </div>

      <div class="flex items-end justify-center md:justify-end">
        <slot name="image" />
      </div>
    </div>
  </section>
</template>
