<template>
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :class="iconClass"
    role="img"
    :aria-label="ariaLabel"
  >
    <path 
      d="M17 14.5L11.7507 9.5L6.5 14.5" 
      :stroke="strokeColor" 
      stroke-width="1.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IconArrowUpProps {
  size?: string | number;
  strokeColor?: string;
  ariaLabel?: string;
  class?: string;
}

const props = withDefaults(defineProps<IconArrowUpProps>(), {
  size: 24,
  strokeColor: '#111111',
  ariaLabel: '접기',
  class: ''
});

const iconClass = computed(() => {
  return props.class || 'icon-arrow-up';
});
</script>

<style scoped>
.icon-arrow-up {
  display: inline-block;
  vertical-align: middle;
  transition: opacity 0.2s ease;
}

.icon-arrow-up:hover {
  opacity: 0.7;
}
</style>