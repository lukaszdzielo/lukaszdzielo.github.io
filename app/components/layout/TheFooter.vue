<script setup>
import SocialLinks from '../common/SocialLinks.vue';
</script>

<template>
    <footer class="bg-slate-900 text-slate-500 ">
        <div class="container">
            <div class="grid gap-20 pt-20 pb-40 text-xs text-center">
                <SocialLinks />

                <div>
                    <p>Made with ❤️</p>
                    <p>© {{ new Date().getFullYear() }} Łukasz Dzieło</p>
                </div>
            </div>
        </div>
    </footer>
</template>