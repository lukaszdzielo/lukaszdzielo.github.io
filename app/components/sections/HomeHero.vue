<script setup>
import SocialLinks from '../common/SocialLinks.vue';
</script>

<template>
    <section class="flex flex-col gap-20 py-20 text-center">
        <slot />
        <SocialLinks />
    </section>
</template>