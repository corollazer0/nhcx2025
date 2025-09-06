<template>
  <div
    class="chip"
    :class="chipClasses"
    data-testid="chip"
    @click="handleClick"
  >
    <span class="chip__text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ChipProps {
  text?: string;
  state?: "default" | "active";
}

const props = withDefaults(defineProps<ChipProps>(), {
  text: '메뉴',
  state: 'default'
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const chipClasses = computed(() => [
  `chip--${props.state}`,
]);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style scoped>
/* Design tokens from Figma */
.chip {
  --color-bg-default: #ffffff;
  --color-text-default: #121212;
  --color-border-default: #d3d3d3;
  --color-bg-active: #111111;
  --color-text-active: #ffffff;
  --border-radius-circle: 999px;
  --font-family-pretendard: 'Pretendard', sans-serif;
  
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 12px;
  border-radius: var(--border-radius-circle);
  border: 1px solid transparent;
  cursor: pointer;
  font-family: var(--font-family-pretendard);
  box-sizing: border-box;
  position: relative;
  transition: all 0.2s ease;
  width: fit-content;
}

.chip:focus {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

/* State variants */
.chip--default {
  background-color: var(--color-bg-default);
  border-color: var(--color-border-default);
}

.chip--default:hover {
  background-color: #f8f8f8;
}

.chip--active {
  background-color: var(--color-bg-active);
  border-color: var(--color-bg-active);
}

.chip--active:hover {
  background-color: #333333;
}

/* Text styles */
.chip__text {
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.26px;
  text-align: center;
  white-space: nowrap;
  min-width: 28px;
}

.chip--default .chip__text {
  color: var(--color-text-default);
  font-weight: 400;
}

.chip--active .chip__text {
  color: var(--color-text-active);
  font-weight: 500;
}
</style>