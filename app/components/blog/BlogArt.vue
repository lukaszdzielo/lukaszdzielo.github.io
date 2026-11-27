<script setup lang="ts">
// Rysunek w banerze wpisu wstawiony jako SVG prosto w HTML (a nie <img>), żeby jego linie mogły się narysować
// po wejściu na wpis. Plik czytany przy budowaniu strony – w HTML jest od razu, bez czekania na JavaScript.
// Gdyby pliku nie było, zostaje zwykły <img>.
const props = defineProps<{ src: string }>();

const files = import.meta.glob<string>('~~/public/art/blog/*.svg', { query: '?raw', import: 'default' });
const file = Object.keys(files).find((key) => key.endsWith(props.src));

const { data: svg } = await useAsyncData(`art-${props.src}`, async () => (file ? drawArt(await files[file]!()) : null));
</script>

<template>
    <div v-if="svg" v-html="svg" />
    <img v-else :src="src" alt="" width="480" height="300" />
</template>
