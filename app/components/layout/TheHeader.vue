<script setup>
import navigation from '~/data/navigation'

</script>
<template>
    <header class="py-5">
        <div class="container">
            <ul class="flex justify-center gap-10">
                <li v-for="item in navigation" :key="item.name">
                    <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
                </li>
            </ul>
        </div>
    </header>
</template>