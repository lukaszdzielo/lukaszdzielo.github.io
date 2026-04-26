<template>
    <section class="relative flex flex-col min-h-112.5">
        <div class="grow container flex flex-col mt-6">
            <div id="hero" class="grow grid md:grid-cols-9 gap-5 md:gap-10 size-full before:bg-slate-200">

                <div
                    class="flex items-center h-full pt-30 md:pt-21 text-center md:text-start md:order-2 md:col-span-5 px-5 md:ps-0 md:pe-10 lg:pe-15">
                    <slot />
                </div>

                <div class="flex items-end md:order-1 md:col-span-4 px-5 md:pt-10 md:ps-10 md:pe-0 lg:px-10">
                    <NuxtImg src="/digital-avatar.avif" sizes="160px md:400px"
                        class="w-full max-w-40 md:max-w-100 mx-auto" />
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
#hero {
    --r: 24px;
    --s: 36px;

    /* --x-left: 36px; */
    /* --y-left: 24px; */

    --x-right: 0;

    @media (min-width: theme('screens.md')) {
        /* --x-right: 200px; */
    }

    /* --y-right: 24px; */

    --_d: calc(var(--s) + var(--r));
    --_m: /calc(2*var(--r)) calc(2*var(--r)) radial-gradient(#000 70%, #0000 72%);

    position: relative;
    border-radius: var(--r);
    z-index: 0;

    --_g-left: conic-gradient(at var(--r) var(--r), #000 75%, #0000 0);
    mask: calc(var(--_d) + var(--x-left)) 0 var(--_m),
    0 calc(var(--_d) + var(--y-left)) var(--_m),
    radial-gradient(var(--s) at 0 0, #0000 99%, #000 calc(100% + 1px)) calc(var(--r) + var(--x-left)) calc(var(--r) + var(--y-left)),
    var(--_g-left) calc(var(--_d) + var(--x-left)) 0,
    var(--_g-left) 0 calc(var(--_d) + var(--y-left));
    mask-repeat: no-repeat;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;

        --_g-right: conic-gradient(at calc(100% - var(--r)) var(--r), #0000 25%, #000 0);
        mask:
            calc(100% - var(--_d) - var(--x-right)) 0 var(--_m),
            100% calc(var(--_d) + var(--y-right)) var(--_m),
            radial-gradient(var(--s) at 100% 0, #0000 99%, #000 calc(100% + 1px)) calc(-1*var(--r) - var(--x-right)) calc(var(--r) + var(--y-right)),
            var(--_g-right) calc(-1*var(--_d) - var(--x-right)) 0,
            var(--_g-right) 0 calc(var(--_d) + var(--y-right));
        mask-repeat: no-repeat;
    }
}
</style>