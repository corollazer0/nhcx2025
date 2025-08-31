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
      d="M12 16L7 11H10V3H14V11H17L12 16Z" 
      :fill="fillColor"
    />
    <path 
      d="M5 20V18H19V20H5Z" 
      :fill="fillColor"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IconDownloadProps {
  size?: string | number;
  fillColor?: string;
  ariaLabel?: string;
  class?: string;
}

const props = withDefaults(defineProps<IconDownloadProps>(), {
  size: 24,
  fillColor: '#707070',
  ariaLabel: '다운로드',
  class: ''
});

const iconClass = computed(() => {
  return props.class || 'icon-download';
});
</script>

<style scoped>
.icon-download {
  display: inline-block;
  vertical-align: middle;
  transition: opacity 0.2s ease;
  cursor: pointer;
}

.icon-download:hover {
  opacity: 0.7;
}
</style>