<script setup lang="ts">
// Logo "ŁD" rysowane jedną linią. Kolor bierze z `currentColor`,
// więc w jasnym i ciemnym motywie wystarczy zmienić kolor tekstu rodzica.
withDefaults(defineProps<{ strokeWidth?: number }>(), { strokeWidth: 12 })
</script>

<template>
  <svg viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <path
      d="M200,295v95h95a95,95,0,0,0,0-190H237.74v85.35l37.75-10.08v38.6L237.74,324v28.31h56.19a57.26,57.26,0,1,0,0-114.52H275.49"
      transform="translate(-195 -195)"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>
