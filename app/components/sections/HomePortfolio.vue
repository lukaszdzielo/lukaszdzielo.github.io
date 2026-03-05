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

    <section class="py-20  overflow-hidden flex flex-col gap-2 md:gap-4 2xl:gap-6">
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