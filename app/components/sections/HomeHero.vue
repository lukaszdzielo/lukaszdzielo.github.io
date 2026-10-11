<template>
    <section class="relative flex flex-col bg-slate-300 dark:bg-slate-800 pt-20 md:pt-30">
        <div class="container grid lg:grid-cols-2 gap-10 lg:gap-15">
            <div class="flex items-center h-full lg:order-2 lg:col-span-1 text-center lg:text-start">
                <div class="flex flex-col gap-3 md:gap-4">
                    <div class="flex flex-col gap-3 lg:gap-2">
                        <div
                            class="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-3 after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full">
                            <span class="text-xl font-semibold uppercase text-slate-500 dark:text-slate-400">
                                <slot name="eyebrow" mdc-unwrap="p" />
                            </span>
                        </div>
                        <h1 class="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-balance">
                            <slot name="title" mdc-unwrap="p" />
                        </h1>
                    </div>
                    <p class="text-slate-700 dark:text-slate-300">
                        <slot name="description" mdc-unwrap="p" />
                    </p>
                </div>
            </div>

            <div class="flex items-end justify-center lg:justify-start lg:order-1 lg:col-span-1">
                <slot name="image" />
            </div>
        </div>
    </section>
</template>
