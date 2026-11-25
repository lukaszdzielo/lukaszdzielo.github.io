<script setup lang="ts">
// Pętla wideo bez dźwięku we wpisie – ten sam blok co „W ruchu” na stronach projektów (ProjectsMotion):
// rusza po pokazaniu, ma przycisk pauzy, przy ograniczeniu ruchu stoi. W treści wpisu:
//   ::video-loop{src="/video/…mp4" poster="/video/…webp" title="…" text="…"}
//   ::
defineProps<{ src: string; poster: string; title: string; text?: string }>()
</script>

<template>
  <ProjectsMotion :items="[{ src, poster, title, text }]" class="not-prose my-8" />
</template>
