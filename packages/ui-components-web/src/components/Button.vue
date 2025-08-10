<template>
  <button
    class="button"
    :class="buttonClasses"
    :disabled="state === 'disabled'"
    type="button"
    data-testid="button"
    @click="handleClick"
  >
    <span class="button__text">{{ displayText }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface ButtonProps {
  text?: string;
  smallText?: string;
  size?: "lg" | "md" | "rg" | "sm" | "xs";
  state?: "default" | "pressed" | "disabled";
  type?: "primary" | "secondary" | "tertiary";
}

const props = withDefaults(defineProps<ButtonProps>(), {
  text: '버튼명',
  smallText: '버튼',
  size: 'lg',
  state: 'default',
  type: 'primary'
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => [
  `button--${props.type}`,
  `button--${props.size}`,
  `button--${props.state}`,
]);

const displayText = computed(() => {
  return props.size === 'xs' || props.size === 'sm' ? props.smallText : props.text;
});

const handleClick = (event: MouseEvent) => {
  if (props.state !== 'disabled') {
    emit('click', event);
  }
};
</script>

<style scoped>
/* Design tokens from Figma */
.button {
  --color-text-primary-default: #ffffff;
  --color-bg-primary-default: #19973c;
  --color-text-primary-disabled: #929292;
  --color-bg-primary-disabled: #f0f0f0;
  --color-text-primary-pressed: #ffffff;
  --color-bg-primary-pressed: #0d5722;
  
  --color-text-secondary-default: #19973c;
  --color-bg-secondary-default: #ffffff;
  --color-border-secondary-default: #19973c;
  --color-text-secondary-disabled: #929292;
  --color-bg-secondary-disabled: #ffffff;
  --color-border-secondary-disabled: #e1e1e1;
  --color-text-secondary-pressed: #0d5722;
  --color-bg-secondary-pressed: #ddf2e4;
  --color-border-secondary-pressed: #0d5722;
  
  --color-text-tertiary-default: #121212;
  --color-bg-tertiary-default: #ffffff;
  --color-border-tertiary-default: #d3d3d3;
  --color-text-tertiary-disabled: #929292;
  --color-bg-tertiary-disabled: #ffffff;
  --color-border-tertiary-disabled: #e1e1e1;
  --color-text-tertiary-pressed: #121212;
  --color-bg-tertiary-pressed: #f6f6f6;
  --color-border-tertiary-pressed: #d3d3d3;
  
  --border-radius-8: 8px;
  --border-radius-10: 10px;
  --border-radius-12: 12px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.button:disabled {
  cursor: not-allowed;
}

.button:focus {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

/* Size variants */
.button--xs {
  padding: 5px 12px;
  border-radius: var(--border-radius-8);
}

.button--sm {
  padding: 7px 12px;
  border-radius: var(--border-radius-8);
}

.button--rg {
  padding: 9px 16px;
  border-radius: var(--border-radius-10);
}

.button--md {
  padding: 12px 16px;
  border-radius: var(--border-radius-10);
}

.button--lg {
  padding: 15px 16px;
  border-radius: var(--border-radius-12);
}

/* Type variants - Primary */
.button--primary {
  background-color: var(--color-bg-primary-default);
  border-color: var(--color-bg-primary-default);
}

.button--primary.button--disabled {
  background-color: var(--color-bg-primary-disabled);
  border-color: var(--color-bg-primary-disabled);
}

.button--primary.button--pressed {
  background-color: var(--color-bg-primary-pressed);
  border-color: var(--color-bg-primary-pressed);
}

.button--primary:hover:not(:disabled) {
  background-color: var(--color-bg-primary-pressed);
  border-color: var(--color-bg-primary-pressed);
}

.button--primary:active:not(:disabled) {
  background-color: var(--color-bg-primary-pressed);
  transform: translateY(1px);
}

/* Type variants - Secondary */
.button--secondary {
  background-color: var(--color-bg-secondary-default);
  border-color: var(--color-border-secondary-default);
}

.button--secondary.button--disabled {
  background-color: var(--color-bg-secondary-disabled);
  border-color: var(--color-border-secondary-disabled);
}

.button--secondary.button--pressed {
  background-color: var(--color-bg-secondary-pressed);
  border-color: var(--color-border-secondary-pressed);
}

.button--secondary:hover:not(:disabled) {
  background-color: #f0f9f3;
}

.button--secondary:active:not(:disabled) {
  background-color: var(--color-bg-secondary-pressed);
  border-color: var(--color-border-secondary-pressed);
  transform: translateY(1px);
}

/* Type variants - Tertiary */
.button--tertiary {
  background-color: var(--color-bg-tertiary-default);
  border-color: var(--color-border-tertiary-default);
}

.button--tertiary.button--disabled {
  background-color: var(--color-bg-tertiary-disabled);
  border-color: var(--color-border-tertiary-disabled);
}

.button--tertiary.button--pressed {
  background-color: var(--color-bg-tertiary-pressed);
  border-color: var(--color-border-tertiary-pressed);
}

.button--tertiary:hover:not(:disabled) {
  background-color: #f8f8f8;
}

.button--tertiary:active:not(:disabled) {
  background-color: var(--color-bg-tertiary-pressed);
  border-color: var(--color-border-tertiary-pressed);
  transform: translateY(1px);
}

/* Button text styles */
.button__text {
  font-weight: 500;
  text-align: center;
  letter-spacing: -0.02em;
  line-height: 1;
}

/* Text sizes */
.button--xs .button__text {
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.26px;
  font-weight: 400;
}

.button--sm .button__text {
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  font-weight: 500;
}

.button--rg .button__text {
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -0.3px;
  font-weight: 500;
}

.button--md .button__text {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
  font-weight: 500;
}

.button--lg .button__text {
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  font-weight: 500;
}

/* Text colors by type and state */
.button--primary .button__text {
  color: var(--color-text-primary-default);
}

.button--primary.button--disabled .button__text {
  color: var(--color-text-primary-disabled);
}

.button--primary.button--pressed .button__text {
  color: var(--color-text-primary-pressed);
}

.button--secondary .button__text {
  color: var(--color-text-secondary-default);
}

.button--secondary.button--disabled .button__text {
  color: var(--color-text-secondary-disabled);
}

.button--secondary.button--pressed .button__text {
  color: var(--color-text-secondary-pressed);
}

.button--tertiary .button__text {
  color: var(--color-text-tertiary-default);
}

.button--tertiary.button--disabled .button__text {
  color: var(--color-text-tertiary-disabled);
}

.button--tertiary.button--pressed .button__text {
  color: var(--color-text-tertiary-pressed);
}
</style>