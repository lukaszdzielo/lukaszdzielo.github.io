<script setup lang="ts">
defineProps<{
    cards?: string[];
}>();
</script>

<template>
    <section class="my-15 sm:my-20 md:my-40 flex flex-col gap-10">

        <div class="container flex flex-col gap-5">
            <div
                class="flex items-center gap-2.5 font-medium after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full">
                <span class="opacity-40">02</span>
                <span class="opacity-40">/</span>
                <span class="font-semibold uppercase">
                    <slot name="eyebrow" mdc-unwrap="p" />
                </span>
            </div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-pretty">
                <slot name="title" mdc-unwrap="p" />
            </h2>
            <p class="opacity-80 max-w-3xl">
                <slot name="description" mdc-unwrap="p" />
            </p>
        </div>

        <div v-if="cards?.length" class="container">
            <ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <li v-for="(card, i) in cards" :key="i"
                    class="flex p-5 md:p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 font-medium">
                    {{ card }}
                </li>
            </ul>
        </div>
    </section>
</template>
