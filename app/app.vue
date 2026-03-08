<script setup>
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
</script>

<template>
  <!-- <TheHeader /> -->

  <main class="bg-slate-100  text-slate-700 ">
    <!-- <div class="container"> -->
    <NuxtPage />
    <!-- </div> -->
  </main>

  <TheFooter />
</template>