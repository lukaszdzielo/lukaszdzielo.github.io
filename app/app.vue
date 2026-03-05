<script setup>
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
</script>

<template>
  <!-- <TheHeader /> -->

  <main class="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
    <!-- <div class="container"> -->
    <NuxtPage />
    <!-- </div> -->
  </main>

  <TheFooter />
</template>