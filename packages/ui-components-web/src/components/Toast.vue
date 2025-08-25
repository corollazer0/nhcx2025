<template>
  <div 
    class="toast"
    :class="`toast--${variant}`" 
    data-testid="toast"
    role="alert"
    :aria-live="live"
    @click="handleClick"
  >
    <div class="toast__content" data-testid="toast-content">
      <p class="toast__text">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Toast variant types
type ToastVariant = 'basic' | 'success' | 'warning' | 'error';
type ToastLive = 'polite' | 'assertive' | 'off';

// Props interface
interface ToastProps {
  // Message content
  message?: string;
  
  // Visual variant
  variant?: ToastVariant;
  
  // Accessibility
  live?: ToastLive;
  
  // Visibility control
  visible?: boolean;
}

const props = withDefaults(defineProps<ToastProps>(), {
  message: '텍스트를 입력해 주세요.',
  variant: 'basic',
  live: 'polite',
  visible: true,
});

// Event definitions
const emit = defineEmits<{
  'close': [];
  'click': [event: MouseEvent];
}>();

// Event handlers
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.toast {
  /* Figma design tokens */
  --color-text-toast-default: #ffffff;
  --color-bg-toast-basic: #111111;
  --color-bg-toast-success: #19973c;
  --color-bg-toast-warning: #f59e0b;
  --color-bg-toast-error: #e24949;
  --border-radius-12: 12px;
  
  /* Typography tokens from Figma */
  --font-family: "Pretendard", sans-serif;
  --body3-regular-size: 14px;
  --body3-regular-weight: 400;
  --body3-regular-line-height: 22px;
  --body3-regular-letter-spacing: -0.28px;
  
  /* Base styles */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 13px 16px;
  border-radius: var(--border-radius-12);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  width: fit-content;
  max-width: 320px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* Variant styles */
.toast--basic {
  background-color: var(--color-bg-toast-basic);
}

.toast--success {
  background-color: var(--color-bg-toast-success);
}

.toast--warning {
  background-color: var(--color-bg-toast-warning);
}

.toast--error {
  background-color: var(--color-bg-toast-error);
}

.toast__content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.toast__text {
  font-family: var(--font-family);
  font-size: var(--body3-regular-size);
  font-weight: var(--body3-regular-weight);
  line-height: var(--body3-regular-line-height);
  letter-spacing: var(--body3-regular-letter-spacing);
  color: var(--color-text-toast-default);
  margin: 0;
  text-align: center;
  word-wrap: break-word;
  white-space: pre-wrap;
}

/* Hover states */
.toast:hover {
  transform: translateY(-1px);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
}

.toast:active {
  transform: translateY(0);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
}

/* Focus states for accessibility */
.toast:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Responsive behavior */
@media (max-width: 480px) {
  .toast {
    max-width: calc(100vw - 32px);
    margin: 0 16px;
  }
  
  .toast__text {
    font-size: 13px;
    line-height: 20px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .toast {
    border: 2px solid rgba(255, 255, 255, 0.8);
  }
  
  .toast:focus {
    outline: 3px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .toast {
    transition: none;
  }
  
  .toast:hover {
    transform: none;
  }
  
  .toast:active {
    transform: none;
  }
}

/* Animation classes for entrance/exit */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.toast-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>