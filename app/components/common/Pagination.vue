<script setup lang="ts">
const router = useRouter();

const props = defineProps<{
    currentPage: number;
    totalPages: number;
}>();
</script>

<template>
    <nav v-if="totalPages > 1" class="flex items-center justify-center gap-4 " aria-label="Pagination">
        <button @click="router.push({ query: { page: currentPage - 1 } })" :disabled="currentPage === 1"
            aria-label="Previous page"
            class="p-2 rounded-md bg-slate-100 dark:bg-slate-100/10 enabled:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-current rotate-180"
                aria-hidden="true">
                <path
                    d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11-11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
            </svg>
        </button>
        <span class="py-2">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="router.push({ query: { page: currentPage + 1 } })" :disabled="currentPage === totalPages"
            aria-label="Next page"
            class="p-2 rounded-md bg-slate-100 dark:bg-slate-100/10 enabled:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="size-6 fill-current"
                aria-hidden="true">
                <path
                    d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11-11-28 11t-28-11q-11-11-11-28t11-28l156-156Z" />
            </svg>
        </button>
    </nav>
</template>