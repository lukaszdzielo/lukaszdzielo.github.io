<script setup>
const images = Array.from({ length: 10 }, (_, i) => `https://via.placeholder.com/160x90?text=Image+${i + 1}`);
const duplicatedImages = [...images, ...images];

// Definiujemy czysty CSS w stałej, by nie zaśmiecać template
const keyframes = `
  @keyframes scroll-l { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes scroll-r { from { transform: translateX(-50%); } to { transform: translateX(0); } }
`;


const limit = 20;

const { data: projects } = await useAsyncData('portfolio-list', () =>
    queryCollection('portfolio')
        .where('draft', '=', false)
        .where('highlight', '=', true)
        .order('date', 'DESC')
        .limit(limit)
        .all(),
);


const topCarousel = computed(() => {
    const items = projects.value?.slice(0, 10) ?? [];
    return [...items, ...items]; // Duplikujemy elementy, by stworzyć efekt nieskończonego przewijania
});
const bottomCarousel = computed(() => {
    const items = projects.value?.slice(10, 20) ?? [];
    return [...items, ...items]; // Duplikujemy elementy, by stworzyć efekt nieskończonego przewijania
});
</script>

<template>

    <component :is="'style'">{{ keyframes }}</component>

    <section class="py-4 bg-slate-400 overflow-hidden flex flex-col gap-2 md:gap-4 2xl:gap-6">

        <div class="flex w-max hover:[animation-play-state:paused] animate-[scroll-l_120s_linear_infinite]">
            <div v-for="el in topCarousel" :key="el.title" class="flex-none px-1 md:px-2 2xl:px-3">
                <img :src="el.image"
                    class="rounded-md bg-white w-40 md:w-60 lg:w-80 2xl:w-100 aspect-video object-cover object-top" />
            </div>
        </div>

        <div class="flex w-max hover:[animation-play-state:paused] animate-[scroll-r_120s_linear_infinite]">
            <div v-for="el in bottomCarousel" :key="el.title" class="flex-none px-1 md:px-2 2xl:px-3">
                <img :src="el.image"
                    class="rounded-md bg-white w-40 md:w-60 lg:w-80 2xl:w-100 aspect-video object-cover object-top" />
            </div>
        </div>

    </section>
</template>

<!-- <script setup>
import { ref, onMounted, computed } from 'vue';

const imageWidth = 160;
const imageGap = 24;
const minImages = 10;
const images = Array.from({ length: minImages }, (_, i) => `https://via.placeholder.com/160x90?text=Image+${i + 1}`);

const carouselRow = ref(null);
const visibleCount = ref(minImages);

onMounted(() => {
    if (carouselRow.value) {
        const rowWidth = carouselRow.value.offsetWidth;
        visibleCount.value = Math.ceil(rowWidth / (imageWidth + imageGap));
    }
});

const duplicatedImages = computed(() => {
    return [...images, ...images, ...images.slice(0, visibleCount.value)];
});

const animationDistance = computed(() => {
    return `${(imageWidth + imageGap) * images.length}px`;
});
</script>

<template>
    <section class="py-2 md:py-4 2xl:py-6 bg-slate-400 ">
        <div class=" flex flex-col items-center gap-2 md:gap-4 2xl:gap-6">
            <div class="carousel-row w-screen max-w-full overflow-hidden" ref="carouselRow">
                <div class="flex gap-2 md:gap-4 2xl:gap-6 w-max  animate-[scroll-right_var(--carousel-duration,60s)_infinite] ease-linear"
                    :style="{ '--scroll-distance': animationDistance }">
                    <div v-for="(img, idx) in duplicatedImages" :key="'right-' + idx"
                        class="flex-none rounded-md bg-white overflow-hidden">
                        <img :src="img" alt="Portfolio image"
                            class="w-40 md:w-60 lg:w-80 2xl:w-100 h-22.5 md:h-33.75 lg:h-45 2xl:h-57.25" />
                    </div>
                </div>
            </div>
            <div class="carousel-row w-screen max-w-full overflow-hidden">
                <div class="flex gap-2 md:gap-4 2xl:gap-6 w-max carousel-left animate-[scroll-left_var(--carousel-duration,60s)_infinite] ease-linear"
                    :style="{ '--scroll-distance': animationDistance }">
                    <div v-for="(img, idx) in duplicatedImages" :key="'left-' + idx"
                        class="flex-none rounded-md bg-white overflow-hidden">
                        <img :src="img" alt="Portfolio image"
                            class="w-40 md:w-60 lg:w-80 2xl:w-100 h-22.5 md:h-33.75 lg:h-45 2xl:h-57.25" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style>
@keyframes scroll-right {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(calc(-1 * var(--scroll-distance)));
    }
}

@keyframes scroll-left {
    0% {
        transform: translateX(calc(-1 * var(--scroll-distance)));
    }

    100% {
        transform: translateX(0);
    }
}
</style> -->