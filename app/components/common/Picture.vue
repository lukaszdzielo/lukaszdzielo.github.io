<script setup lang="ts">
// Obrazki tylko w WebP (AVIF wyłączony 14.10 – archiwum decyzje/obrazki-avif-webp.md).
// legacy-format="webp" jest potrzebne – bez niego NuxtPicture dorabia zapasowe PNG/JPEG.
// NuxtPicture puts `class`/`style` on <picture>,
// so they are forwarded to the <img> instead and <picture> itself gets no box.
// `fetchpriority` też musi trafić na <img> (np. ilustracja w hero – największy element na ekranie).
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const splitAttrs = computed(() => {
    const { class: imgClass, style: imgStyle, fetchpriority, ...picture } = attrs;
    const img: Record<string, unknown> = {};
    if (imgClass) img.class = imgClass;
    if (imgStyle) img.style = imgStyle;
    if (fetchpriority) img.fetchpriority = fetchpriority;
    return { picture, img };
});
</script>

<template>
    <NuxtPicture v-bind="splitAttrs.picture" format="webp" legacy-format="webp" class="contents"
        :img-attrs="splitAttrs.img" />
</template>
