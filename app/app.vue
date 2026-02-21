<script setup>
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
</script>

<template>
  <TheHeader />

  <main>
    <div class="container">

      <NuxtRouteAnnouncer />
  <NuxtPage />
    </div>
  </main>

  <TheFooter />
</template>