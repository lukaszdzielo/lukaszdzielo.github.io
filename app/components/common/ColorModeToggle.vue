<script setup lang="ts">
const { mode, cycle } = useColorMode();

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const display = computed(() => (mounted.value ? mode.value : "auto"));

const labels = {
  auto: "Motyw: automatyczny (systemowy) – kliknij, aby włączyć jasny",
  light: "Motyw: jasny – kliknij, aby włączyć ciemny",
  dark: "Motyw: ciemny – kliknij, aby włączyć automatyczny",
} as const;
</script>

<template>
  <button
    type="button"
    :aria-label="labels[display]"
    :title="labels[display]"
    class="inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-slate-900/16 text-slate-900 transition-colors hover:bg-white dark:border-white/20 dark:text-white dark:hover:bg-brand-900"
    @click="cycle"
  >
    <svg
      v-if="display === 'auto'"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>

    <svg
      v-else-if="display === 'light'"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  </button>
</template>
