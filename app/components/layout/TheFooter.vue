<script setup>
import SocialLinks from "../common/SocialLinks.vue";
</script>

<template>
  <!-- <div class="bg-slate-900 pt-20 text-slate-300">
    <div
      class="container grid gap-10 pt-12 pb-14 px-12 inset-ring inset-ring-white/10 rounded-3xl bg-white/5 font-bold"
    >
      <div
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-pretty text-center"
      >
        Let's work <em class="text-blue-500">together</em>
      </div>
    </div>
  </div> -->
  <footer class="bg-slate-900">
    <div class="container grid gap-20 pt-20 pb-30 text-slate-600 text-xs text-center">
      <SocialLinks />

      <div>
        <p>Made with ❤️</p>
        <p>© {{ new Date().getFullYear() }} Łukasz Dzieło</p>
      </div>
    </div>
  </footer>
</template>
