<script setup>
import socialLinks from '~/data/socialLinks'

</script>
<template>
    <ul class="inline-flex justify-center flex-wrap gap-5">
        <li v-for="link in socialLinks" :key="link">{{ link.name }}</li>
    </ul>
</template>