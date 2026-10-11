<script setup lang="ts">
// Serves AVIF with a WebP fallback. NuxtPicture puts `class`/`style` on <picture>,
// so they are forwarded to the <img> instead and <picture> itself gets no box.
defineOptions({ inheritAttrs: false });

const attrs = useAttrs();

const splitAttrs = computed(() => {
    const { class: imgClass, style: imgStyle, ...picture } = attrs;
    const img: Record<string, unknown> = {};
    if (imgClass) img.class = imgClass;
    if (imgStyle) img.style = imgStyle;
    return { picture, img };
});
</script>

<template>
    <NuxtPicture v-bind="splitAttrs.picture" format="avif,webp" legacy-format="webp" class="contents"
        :img-attrs="splitAttrs.img" />
</template>
