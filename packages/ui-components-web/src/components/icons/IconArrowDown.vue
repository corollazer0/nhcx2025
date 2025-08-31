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
      d="M6.5 9.5L11.7507 14.5L17 9.5" 
      :stroke="strokeColor" 
      stroke-width="1.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IconArrowDownProps {
  size?: string | number;
  strokeColor?: string;
  ariaLabel?: string;
  class?: string;
}

const props = withDefaults(defineProps<IconArrowDownProps>(), {
  size: 24,
  strokeColor: '#111111',
  ariaLabel: '펼치기',
  class: ''
});

const iconClass = computed(() => {
  return props.class || 'icon-arrow-down';
});
</script>

<style scoped>
.icon-arrow-down {
  display: inline-block;
  vertical-align: middle;
  transition: transform 0.3s ease;
}

.icon-arrow-down--rotated {
  transform: rotate(180deg);
}

.icon-arrow-down:hover {
  opacity: 0.7;
}
</style>