<template>
  <section class="relative flex flex-col">
    <div class="grow container flex flex-col md:mt-12">
      <div
        class="relative grow grid md:grid-cols-2 lg:grid-cols-[auto_1fr] gap-5 md:gap-10 lg:gap-15 xl:gap-20 2xl:gap-30 size-full rounded-4xl before:absolute before:inset-bs-20 before:inset-be-0 before:inset-x-0 before:rounded-3xl before:bg-slate-200 dark:before:bg-slate-700"
      >
        <div
          class="z-1 flex items-center h-full pt-20 md:order-2 md:col-span-1 md:ps-0 md:pe-10 lg:pe-15 xl:pe-20 2xl:pe-30"
        >
          <div
            class="pt-10 pb-5 md:py-5 lg:py-0 px-5 md:px-0 text-center md:text-start"
          >
            <div class="flex flex-col gap-3 md:gap-4">
              <div class="flex flex-col gap-1">
                <span class="text-lg font-semibold opacity-80">
                  <slot name="eyebrow" mdc-unwrap="p" />
                </span>
                <h1
                  class="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-balance"
                >
                  <slot name="title" mdc-unwrap="p" />
                </h1>
              </div>
              <p class="opacity-80">
                <slot name="description" mdc-unwrap="p" />
              </p>
            </div>
          </div>
        </div>

        <div
          class="z-1 flex items-end md:order-1 md:col-span-1 md:ps-10 lg:ps-12 xl:ps-20 2xl:ps-30"
        >
          <slot name="image" />
        </div>
      </div>
    </div>
  </section>

  <div class="container flex justify-center mt-6">
    <CommonColorModeToggle />
  </div>
</template>
