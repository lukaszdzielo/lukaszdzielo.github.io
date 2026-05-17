<script setup lang="ts">
const router = useRouter();

const props = defineProps<{
    currentPage: number;
    totalPages: number;
}>();

const page = computed({
    get: () => props.currentPage,
    set: (val: number) => { router.push({ query: { page: val } }); }
});

const hasMultiplePages = computed(() => props.totalPages > 1);
const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.totalPages);

const goBy = (delta: number) => page.value += delta;

const navButtonClass = 'p-2 rounded-md bg-slate-100 dark:bg-slate-100/10 enabled:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed';

const chevronPath = 'M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11-11-28 11t-28-11q-11-11-11-28t11-28l156-156Z';
</script>

<template>
    <nav v-if="hasMultiplePages" class="flex items-center justify-center gap-4" aria-label="Pagination">
        <button @click="goBy(-1)" :disabled="isFirstPage"
            aria-label="Previous page" :class="navButtonClass">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-current rotate-180"
                aria-hidden="true">
                <path :d="chevronPath" />
            </svg>
        </button>

        <select v-model="page" aria-label="Select page"
            class="lg:hidden py-2 px-3 rounded-md bg-slate-100 dark:bg-slate-100/10 cursor-pointer">
            <option v-for="n in totalPages" :key="n" :value="n">Page {{ n }}</option>
        </select>
        <span class="hidden lg:inline py-2">Page {{ currentPage }} of {{ totalPages }}</span>

        <button @click="goBy(1)" :disabled="isLastPage"
            aria-label="Next page" :class="navButtonClass">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-current"
                aria-hidden="true">
                <path :d="chevronPath" />
            </svg>
        </button>
    </nav>
</template>