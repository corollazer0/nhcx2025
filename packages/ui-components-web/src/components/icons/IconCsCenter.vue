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
      d="M17.6349 9.19995H19.0599C19.5903 9.19995 20.099 9.41066 20.4741 9.78574C20.8492 10.1608 21.0599 10.6695 21.0599 11.2V12.821C21.0599 13.0836 21.0082 13.3437 20.9076 13.5863C20.8071 13.829 20.6598 14.0494 20.4741 14.2352C20.2884 14.4209 20.0679 14.5682 19.8253 14.6687C19.5826 14.7692 19.3225 14.821 19.0599 14.821H17.6349V9.19995Z" 
      :stroke="strokeColor" 
      stroke-width="1.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    <path 
      d="M17.6309 10.585V9.16699C17.6309 7.67241 17.0373 6.23906 15.9805 5.18213C14.9238 4.1252 13.4905 3.53127 11.9959 3.53101C10.5013 3.53127 9.06809 4.1252 8.01135 5.18213C6.95461 6.23906 6.36096 7.67241 6.36096 9.16699V10.585" 
      :stroke="strokeColor" 
      stroke-width="1.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    <path 
      d="M4.93994 9.19995H6.36494V14.821H4.93994C4.40951 14.821 3.9008 14.6102 3.52573 14.2352C3.15066 13.8601 2.93994 13.3514 2.93994 12.821V11.2C2.93994 10.6695 3.15066 10.1608 3.52573 9.78574C3.9008 9.41066 4.40951 9.19995 4.93994 9.19995Z" 
      :stroke="strokeColor" 
      stroke-width="1.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    <path 
      d="M17.6359 12.762V14.062C17.6359 15.7466 16.682 17.2421 15.2073 18.1819" 
      :stroke="strokeColor" 
      stroke-width="1.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
    />
    <path 
      d="M13.778 16.9961H9.90796C9.2176 16.9961 8.65796 17.5557 8.65796 18.2461V18.7431C8.65796 19.4334 9.2176 19.9931 9.90796 19.9931H13.778C14.4683 19.9931 15.028 19.4334 15.028 18.7431V18.2461C15.028 17.5557 14.4683 16.9961 13.778 16.9961Z" 
      :stroke="strokeColor" 
      stroke-width="1.5"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IconCsCenterProps {
  size?: string | number;
  color?: string;
  strokeColor?: string;
  ariaLabel?: string;
  class?: string;
}

const props = withDefaults(defineProps<IconCsCenterProps>(), {
  size: 24,
  color: 'currentColor',
  strokeColor: '#111111',
  ariaLabel: '고객센터',
  class: ''
});

const iconClass = computed(() => {
  return props.class || 'icon-cs-center';
});
</script>

<style scoped>
.icon-cs-center {
  display: inline-block;
  vertical-align: middle;
  transition: opacity 0.2s ease;
}

.icon-cs-center:hover {
  opacity: 0.7;
}
</style>