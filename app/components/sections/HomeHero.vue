<template>
    <section class="relative flex flex-col bg-slate-200 dark:bg-slate-700 pt-20">
        <div class="container grid lg:grid-cols-2 gap-10 lg:gap-15">
            <div class="flex items-center h-full lg:order-2 lg:col-span-1 text-center lg:text-start">
                <div class="flex flex-col gap-3 md:gap-4">
                    <div class="flex flex-col gap-1">
                        <span class="text-xl font-semibold opacity-80">
                            <slot name="eyebrow" mdc-unwrap="p" />
                        </span>
                        <h1 class="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-balance">
                            <slot name="title" mdc-unwrap="p" />
                        </h1>
                    </div>
                    <p class="opacity-80">
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
