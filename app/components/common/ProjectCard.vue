<script setup lang="ts">
interface ProjectCardData {
    path: string;
    title?: string;
    date?: string;
    description?: string;
    image?: string;
}

withDefaults(defineProps<{
    project: ProjectCardData;
    // Whether the project has its own page (body content or linked articles).
    // Without it the card stays visible but doesn't link anywhere internal.
    hasPage?: boolean;
    titleTag?: 'h2' | 'h3';
}>(), {
    hasPage: false,
    titleTag: 'h2',
});
</script>

<template>
    <article class="flex h-full flex-col">
        <NuxtLink v-if="hasPage" :to="project.path" class="block group">
            <CommonPicture v-if="project.image" :src="project.image" :alt="project.title" sizes="320px md:400px lg:480px"
                loading="lazy"
                class="rounded-sm md:rounded-md lg:rounded-lg bg-white aspect-video object-cover object-top w-full transition-transform group-hover:scale-[1.02]" />
            <div v-else
                class="rounded-sm md:rounded-md lg:rounded-lg bg-slate-100 dark:bg-slate-600 aspect-video w-full flex items-center justify-center transition-transform group-hover:scale-[1.02]">
                <Icon name="lucide:image" class="text-3xl opacity-30" aria-hidden="true" />
            </div>
            <component :is="titleTag" class="mt-3 font-semibold group-hover:text-sky-500 transition-colors">
                {{ project.title }}
            </component>
        </NuxtLink>
        <div v-else>
            <CommonPicture v-if="project.image" :src="project.image" :alt="project.title" sizes="320px md:400px lg:480px"
                loading="lazy"
                class="rounded-sm md:rounded-md lg:rounded-lg bg-white aspect-video object-cover object-top w-full" />
            <div v-else
                class="rounded-sm md:rounded-md lg:rounded-lg bg-slate-100 dark:bg-slate-600 aspect-video w-full flex items-center justify-center">
                <Icon name="lucide:image" class="text-3xl opacity-30" aria-hidden="true" />
            </div>
            <component :is="titleTag" class="mt-3 font-semibold">
                {{ project.title }}
            </component>
        </div>

        <small v-if="project.date">{{ formatDate(project.date) }}</small>

        <p v-if="project.description" class="mt-2 text-sm text-pretty">{{ project.description }}</p>
    </article>
</template>
