<script setup lang="ts">
// import Pagination from '@/components/common/Pagination.vue';

// const route = useRoute();
// const router = useRouter();
// const limit = 12;

// const { data: total } = await useAsyncData('portfolio-count', () =>
//   queryCollection('portfolio').where('draft', '=', false).count()
// );

// const totalPages = computed(() => Math.ceil((total.value ?? 0) / limit));

// const currentPage = computed(() => {
//   const page = parseInt(route.query.page as string);
//   if (isNaN(page) || page < 1) return 1;
//   return Math.min(page, totalPages.value);
// });

// watch(() => route.query.page, () => {
//   const raw = parseInt(route.query.page as string);
//   if (isNaN(raw) || raw < 1 || raw > totalPages.value) {
//     router.replace({ query: { page: currentPage.value } });
//   }
// }, { immediate: true });

// const { data: projects } = await useAsyncData('portfolio-list', () =>
//   queryCollection('portfolio')
//     .where('draft', '=', false)
//     .order('date', 'DESC')
//     .limit(limit)
//     .skip((currentPage.value - 1) * limit)
//     .all(),
//   { watch: [currentPage] }
// );

// const hasContent = (project: any) => project?.body?.value?.length > 0;
</script>

<template>
  <!-- <section class="flex flex-col gap-10 py-10">

    <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <li v-for="project in projects" :key="project.path" class="border p-5">
        <img :src="project.image" :alt="project.title" />
        <small> {{ project.date }}</small>
        <h2>{{ project.title }}</h2>

        <NuxtLink v-if="hasContent(project)" :to="project.path" class="text-lime-500">
          View Case Study
        </NuxtLink>

      </li>
    </ul>

    <Pagination :current-page="currentPage" :total-pages="totalPages" />

  </section> -->
</template>