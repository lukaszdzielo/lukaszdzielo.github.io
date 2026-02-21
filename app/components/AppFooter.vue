<template>
    <footer class="bg-slate-900 text-slate-500 ">
        <div class="container">
            <div class="grid gap-8 pt-20 pb-40 text-xs text-center">
                <div class="inline-flex mx-auto gap-4">
                    <div v-for="link in socialLinks" :key="link">{{ link.name }}</div>
                </div>

                <div>
                    <p>Made with ❤️</p>
                    <p>© {{ new Date().getFullYear() }} Łukasz Dzieło</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import socialLinks from '~/data/socialLinks'
</script>