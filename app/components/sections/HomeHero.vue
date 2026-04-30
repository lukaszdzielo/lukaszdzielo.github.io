<template>
    <section class="relative flex flex-col min-h-112.5">
        <div class="grow container flex flex-col mt-6">
            <div
                class="relative grow grid md:grid-cols-9 gap-5 md:gap-10 size-full rounded-4xl  before:absolute before:inset-bs-20 before:inset-be-0 before:inset-x-0 before:rounded-3xl before:bg-slate-200">

                <div
                    class="z-1 flex items-center h-full pt-30 md:pt-20  md:order-2 md:col-span-5 px-5 md:ps-0 md:pe-10 lg:pe-15">
                    <slot />
                </div>

                <div class="z-1 flex items-end md:order-1 md:col-span-4  md:ps-10 md:pe-0 ">
                    <NuxtImg src="/digital-avatar.avif" sizes="160px md:400px"
                        class="w-full max-w-50 md:max-w-100 mx-auto" />
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped></style>