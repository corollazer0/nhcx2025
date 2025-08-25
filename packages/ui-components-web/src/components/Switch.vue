<template>
  <button
    class="switch"
    :class="switchClasses"
    :disabled="disabled"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-label="ariaLabel"
    data-testid="switch"
    @click="handleToggle"
    @keydown.space.prevent="handleToggle"
    @keydown.enter.prevent="handleToggle"
  >
    <div class="switch__track">
      <div class="switch__thumb" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Size type definition
type SwitchSize = 'small' | 'medium' | 'large';

// Props interface
interface SwitchProps {
  // State control
  modelValue?: boolean;
  disabled?: boolean;
  
  // Size variant
  size?: SwitchSize;
  
  // Accessibility
  ariaLabel?: string;
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: 'medium',
  ariaLabel: '스위치',
});

// Event definitions
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'change': [value: boolean, event: MouseEvent | KeyboardEvent];
}>();

// Computed classes
const switchClasses = computed(() => [
  `switch--${props.size}`,
  {
    'switch--on': props.modelValue,
    'switch--off': !props.modelValue,
    'switch--disabled': props.disabled,
  }
]);

// Event handlers
const handleToggle = (event: MouseEvent | KeyboardEvent) => {
  if (props.disabled) return;
  
  const newValue = !props.modelValue;
  emit('update:modelValue', newValue);
  emit('change', newValue, event);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.switch {
  --color-bg-switch-on: #19973c;
  --color-bg-switch-off: #707070;
  --color-bg-switch-inner: #ffffff;
  --border-radius-circle: 999px;
  --transition-duration: 0.2s;
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);

  position: relative;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  padding: 0;
  transition: opacity var(--transition-duration) var(--transition-timing);
}

.switch:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.switch:focus {
  outline: 2px solid var(--color-bg-switch-on);
  outline-offset: 2px;
}

.switch__track {
  position: relative;
  background-color: var(--color-bg-switch-off);
  border-radius: var(--border-radius-circle);
  transition: background-color var(--transition-duration) var(--transition-timing);
}

.switch--on .switch__track {
  background-color: var(--color-bg-switch-on);
}

.switch__thumb {
  position: absolute;
  top: 2px;
  background-color: var(--color-bg-switch-inner);
  border-radius: var(--border-radius-circle);
  transition: transform var(--transition-duration) var(--transition-timing);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Size variants */
/* Small switch */
.switch--small .switch__track {
  width: 32px;
  height: 18px;
}

.switch--small .switch__thumb {
  width: 14px;
  height: 14px;
  left: 2px;
}

.switch--small.switch--on .switch__thumb {
  transform: translateX(14px);
}

/* Medium switch (default) */
.switch--medium .switch__track {
  width: 44px;
  height: 24px;
}

.switch--medium .switch__thumb {
  width: 20px;
  height: 20px;
  left: 2px;
}

.switch--medium.switch--on .switch__thumb {
  transform: translateX(20px);
}

/* Large switch */
.switch--large .switch__track {
  width: 56px;
  height: 32px;
}

.switch--large .switch__thumb {
  width: 28px;
  height: 28px;
  left: 2px;
}

.switch--large.switch--on .switch__thumb {
  transform: translateX(24px);
}

/* Hover effects */
.switch:hover:not(:disabled) .switch__thumb {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.switch--on:hover:not(:disabled) .switch__track {
  background-color: #147a30;
}

.switch--off:hover:not(:disabled) .switch__track {
  background-color: #5a5a5a;
}

/* Active state */
.switch:active:not(:disabled) .switch__thumb {
  transform: scale(0.95);
}

.switch--small:active:not(:disabled).switch--on .switch__thumb {
  transform: translateX(14px) scale(0.95);
}

.switch--medium:active:not(:disabled).switch--on .switch__thumb {
  transform: translateX(20px) scale(0.95);
}

.switch--large:active:not(:disabled).switch--on .switch__thumb {
  transform: translateX(24px) scale(0.95);
}

/* Disabled state */
.switch--disabled .switch__track {
  background-color: #e0e0e0 !important;
}

.switch--disabled .switch__thumb {
  background-color: #f5f5f5 !important;
  box-shadow: none !important;
}
</style>