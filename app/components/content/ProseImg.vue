<script setup lang="ts">
// Markdown images: local files go through IPX (AVIF + WebP fallback),
// remote URLs are rendered as-is since IPX doesn't process them.
const props = defineProps<{
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
}>();

const isLocal = computed(() => !!props.src?.startsWith('/') && !props.src.startsWith('//'));
</script>

<template>
    <CommonPicture v-if="isLocal" :src="src" :alt="alt" :width="width" :height="height" loading="lazy" />
    <img v-else :src="src" :alt="alt" :width="width" :height="height" loading="lazy">
</template>
