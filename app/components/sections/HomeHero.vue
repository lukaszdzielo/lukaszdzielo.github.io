<template>
  <section class="relative flex flex-col">
    <div class="grow container flex flex-col md:mt-12">
      <div
        class="relative grow grid md:grid-cols-2 lg:grid-cols-[auto_1fr] gap-10 md:gap-10 lg:gap-15 xl:gap-20 2xl:gap-30 size-full">
        <div class="flex items-center h-full md:order-2 md:col-span-1">
          <div class="text-center md:text-start">
            <div class="flex flex-col gap-3 md:gap-4">
              <div class="flex flex-col gap-1">
                <span class="text-xl font-semibold opacity-80">
                  <slot name="eyebrow" mdc-unwrap="p" />
                </span>
                <h1 class="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-pretty">
                  <slot name="title" mdc-unwrap="p" />
                </h1>
              </div>
              <p class="opacity-80">
                <slot name="description" mdc-unwrap="p" />
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-end justify-center md:justify-start md:order-1 md:col-span-1">
          <slot name="image" />
        </div>
      </div>
    </div>
  </section>

  <div class="container flex justify-center mt-6">
    <CommonColorModeToggle />
  </div>
</template>
