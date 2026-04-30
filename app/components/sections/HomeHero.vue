<template>
    <section class="relative flex flex-col">
        <div class="grow container flex flex-col mt-6">
            <div
                class="relative grow grid md:grid-cols-2 lg:grid-cols-[auto_1fr] gap-5 md:gap-10 lg:gap-15 xl:gap-20 2xl:gap-30 size-full rounded-4xl before:absolute before:inset-bs-20 before:inset-be-0 before:inset-x-0 before:rounded-3xl before:bg-slate-200">
                <div
                    class="z-1 flex items-center h-full pt-20  md:order-2 md:col-span-1  md:ps-0 md:pe-10 lg:pe-15 xl:pe-20 2xl:pe-30">
                    <div class="pt-10 pb-5 md:py-5 lg:py-0 px-5  md:px-0 text-center md:text-start">
                        <slot name="content" />
                    </div>
                </div>

                <div class="z-1 flex items-end md:order-1 md:col-span-1 md:ps-10 lg:ps-12 xl:ps-20 2xl:ps-30">
                    <slot name="image" />
                </div>
            </div>
        </div>
    </section>
</template>