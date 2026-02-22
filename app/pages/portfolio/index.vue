<script setup lang="ts">
const { data: projects } = await useAsyncData('portfolio-list', () => {
  return queryCollection('portfolio')
    .order('date', 'DESC')
    .all()
})
</script>

<template>
  <div class="grid grid-cols-2 gap-5 py-10">
    <div v-for="project in projects" :key="project.path" class="card">
      <img :src="project.image" alt="">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>

      <NuxtLink v-if="project.hasPage" :to="project.path" class="btn">
        Zobacz szczegóły
      </NuxtLink>
    </div>
  </div>
</template>