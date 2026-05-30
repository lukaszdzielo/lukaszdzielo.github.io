<script setup>
import TheFooter from '~/components/layout/TheFooter.vue'
import TheHeader from '~/components/layout/TheHeader.vue';
</script>

<template>
  <!-- <TheHeader /> -->


  <main>
    <!-- <div class="container"> -->
    <NuxtPage />
    <!-- </div> -->
  </main>

  <CommonColorModeToggle class="fixed top-4 right-4 z-50" />

  <TheFooter />
</template>