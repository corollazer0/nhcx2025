<template>
  <div 
    class="tooltip"
    data-testid="tooltip"
  >
    <div class="tooltip__header">
      <h2 class="tooltip__title">{{ title }}</h2>
      <button 
        v-if="closable"
        type="button"
        class="tooltip__close"
        data-testid="tooltip-close"
        @click="handleClose"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <div v-if="subTitle" class="tooltip__subtitle" data-testid="tooltip-subtitle">
      {{ subTitleText }}
    </div>

    <div v-if="text" class="tooltip__text" data-testid="tooltip-text">
      {{ textContent }}
    </div>

    <div v-if="list && listItems && listItems.length > 0" class="tooltip__list" data-testid="tooltip-list">
      <div 
        v-for="(item, index) in listItems"
        :key="index"
        class="tooltip__list-item"
        data-testid="tooltip-list-item"
      >
        <div class="tooltip__bullet" />
        <p class="tooltip__list-text">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Tooltip list item type
interface TooltipListItem {
  text: string;
}

// Props interface
interface TooltipProps {
  // Content
  title?: string;
  
  // Optional sections
  subTitle?: boolean;
  subTitleText?: string;
  
  text?: boolean;
  textContent?: string;
  
  list?: boolean;
  listItems?: TooltipListItem[];
  
  // Functionality
  closable?: boolean;
}

const props = withDefaults(defineProps<TooltipProps>(), {
  title: '타이틀',
  subTitle: true,
  subTitleText: '서브 타이틀',
  text: true,
  textContent: '서브 텍스트를 내용을 입력해 주세요.',
  list: true,
  listItems: () => [
    { text: '내용을 입력해 주세요' },
    { text: '내용을 입력해 주세요' }
  ],
  closable: true,
});

// Event definitions
const emit = defineEmits<{
  'close': [];
}>();

// Event handlers
const handleClose = () => {
  emit('close');
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.tooltip {
  /* Figma design tokens */
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-icon-gray600: #707070;
  --color-icon-gray900: #111111;
  --color-bg-default: #ffffff;
  --color-border-line-3: #f0f0f0;
  --border-radius-16: 16px;
  
  /* Typography tokens from Figma */
  --font-family: "Pretendard", sans-serif;
  --heading-h5-semibold-size: 16px;
  --heading-h5-semibold-weight: 600;
  --heading-h5-semibold-line-height: 24px;
  --body3-medium-size: 14px;
  --body3-medium-weight: 500;
  --body3-medium-line-height: 22px;
  --body3-regular-size: 14px;
  --body3-regular-weight: 400;
  --body3-regular-line-height: 22px;
  
  /* Base styles */
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background-color: var(--color-bg-default);
  border: 1px solid var(--color-border-line-3);
  border-radius: var(--border-radius-16);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
  width: 312px;
  box-sizing: border-box;
}

.tooltip__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.tooltip__title {
  font-family: var(--font-family);
  font-size: var(--heading-h5-semibold-size);
  font-weight: var(--heading-h5-semibold-weight);
  line-height: var(--heading-h5-semibold-line-height);
  color: var(--color-text-font-1);
  margin: 0;
  flex: 1;
  letter-spacing: -0.32px;
}

.tooltip__close {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-icon-gray900);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.tooltip__close:hover {
  color: var(--color-text-font-3);
}

.tooltip__close:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

.tooltip__subtitle {
  font-family: var(--font-family);
  font-size: var(--body3-medium-size);
  font-weight: var(--body3-medium-weight);
  line-height: var(--body3-medium-line-height);
  color: var(--color-text-font-1);
  margin: 0;
  letter-spacing: -0.28px;
  width: 272px;
}

.tooltip__text {
  font-family: var(--font-family);
  font-size: var(--body3-regular-size);
  font-weight: var(--body3-regular-weight);
  line-height: var(--body3-regular-line-height);
  color: var(--color-text-font-3);
  margin: 0;
  letter-spacing: -0.28px;
  width: 272px;
}

.tooltip__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 272px;
}

.tooltip__list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 22px;
}

.tooltip__bullet {
  width: 4px;
  height: 4px;
  background-color: var(--color-icon-gray600);
  border-radius: 50%;
  flex-shrink: 0;
}

.tooltip__list-text {
  font-family: var(--font-family);
  font-size: var(--body3-regular-size);
  font-weight: var(--body3-regular-weight);
  line-height: var(--body3-regular-line-height);
  color: var(--color-text-font-3);
  margin: 0;
  letter-spacing: -0.28px;
  flex: 1;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .tooltip {
    border: 2px solid var(--color-text-font-1);
  }
  
  .tooltip__close:focus {
    outline: 3px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .tooltip__close {
    transition: none;
  }
}
</style>