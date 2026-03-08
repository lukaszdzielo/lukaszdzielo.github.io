<script setup>

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
    return [...items, ...items];
});

const bottomCarousel = computed(() => {
    const items = projects.value?.slice(10, 20) ?? [];
    return [...items, ...items];
});
</script>

<template>

    <section class="my-20 overflow-hidden flex flex-col gap-10">

        <div class="container flex flex-col gap-5">

            <div
                class="flex items-center gap-2.5 after:content-[''] after:block after:w-12 after:h-0.75 after:bg-blue-500 after:rounded-full ">
                <span class="opacity-40">01</span>
                <span class="opacity-40">/</span>
                <span class="font-medium uppercase">Projects</span>
            </div>

            <h2 class=" text-[clamp(1.5rem,3.5vw,3rem)]/[1.2] font-extrabold text-pretty">
                Discover my <em class="text-blue-500 ">selected</em> works
            </h2>

        </div>

        <div class="flex flex-col gap-2  md:gap-4 2xl:gap-6">
            <div class="flex w-max hover:[animation-play-state:paused] animate-[scroll-l_100s_linear_infinite]">
                <div v-for="el in topCarousel" :key="el.title" class="flex-none px-1 md:px-2 2xl:px-3">
                    <img :src="el.image"
                        class="rounded-md md:rounded-xl lg:rounded-2xl bg-white w-[clamp(160px,26vw,400px)] aspect-video object-cover object-top" />
                </div>
            </div>

            <div class="flex w-max hover:[animation-play-state:paused] animate-[scroll-r_100s_linear_infinite]">
                <div v-for="el in bottomCarousel" :key="el.title" class="flex-none px-1 md:px-2 2xl:px-3">
                    <img :src="el.image"
                        class="rounded-md md:rounded-xl lg:rounded-2xl bg-white w-[clamp(160px,26vw,400px)] aspect-video object-cover object-top" />
                </div>
            </div>
        </div>
    </section>
</template>

<style>
@keyframes scroll-l {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-50%);
    }
}

@keyframes scroll-r {
    from {
        transform: translateX(-50%);
    }

    to {
        transform: translateX(0);
    }
}
</style>