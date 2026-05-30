<script setup lang="ts">
defineProps<{
  cards?: string[];
}>();
</script>

<template>
  <section class="my-15 sm:my-20 md:my-30">
    <div class="container flex flex-col gap-10 lg:gap-15">
      <div class="grid lg:grid-cols-2 gap-10 lg:gap-15">
        <div class="flex flex-col justify-center gap-5">
          <div
            class="flex items-center gap-2 font-medium after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full">
            <span class="opacity-40">02</span>
            <span class="opacity-40">/</span>
            <span class="font-semibold uppercase">
              <slot name="eyebrow" mdc-unwrap="p" />
            </span>
          </div>
          <h2 class="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-pretty">
            <slot name="title" mdc-unwrap="p" />
          </h2>
          <p class="opacity-80">
            <slot name="description" mdc-unwrap="p" />
          </p>
        </div>

        <div class="flex items-center justify-center lg:justify-end">
          <slot name="image" />
        </div>
      </div>

      <ul v-if="cards?.length" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <li v-for="(card, i) in cards" :key="i"
          class="flex py-3 px-4 rounded-xl bg-slate-200 dark:bg-white/5 font-medium">
          {{ card }}
        </li>
      </ul>
    </div>
  </section>
</template>
