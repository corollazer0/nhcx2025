<template>
  <div :class="controlsClasses" data-testid="controls">
      <!-- Left/Minus Button -->
      <button
        :class="leftButtonClasses"
        :disabled="isLeftDisabled"
        type="button"
        :aria-label="leftButtonLabel"
        @click="handleLeftClick"
      >
        <div class="controls__icon">
          <svg viewBox="0 0 24 24" fill="none" class="controls__svg">
            <path :d="leftIconPath" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
      
      <!-- Center Content -->
      <div v-if="!isNavigationVariant" class="controls__input">
        <p class="controls__value">{{ displayValue }}</p>
      </div>
      
      <!-- Right/Plus Button -->
      <button
        :class="rightButtonClasses"
        :disabled="isRightDisabled"
        type="button"
        :aria-label="rightButtonLabel"
        @click="handleRightClick"
      >
        <div class="controls__icon">
          <svg viewBox="0 0 24 24" fill="none" class="controls__svg">
            <path :d="rightIconPath" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';


// Variant types
type ControlsVariant = 'stepper' | 'navigation';

// Props interface based on Figma properties
interface ControlsProps {
  // Variant control
  variant?: ControlsVariant;
  
  // Current value (only for stepper variant)
  value?: number;
  
  // Constraints (only for stepper variant)
  min?: number;
  max?: number;
  step?: number;
  
  // State
  disabled?: boolean;
  
  // Navigation specific props
  currentIndex?: number;
  totalItems?: number;
}

const props = withDefaults(defineProps<ControlsProps>(), {
  variant: 'stepper',
  value: 0,
  min: -Infinity,
  max: Infinity,
  step: 1,
  disabled: false,
  currentIndex: 0,
  totalItems: 1,
});

// Internal value management
const internalValue = ref(props.value);
const internalIndex = ref(props.currentIndex);

// Watch for prop changes
watch(() => props.value, (newValue) => {
  internalValue.value = newValue;
});

watch(() => props.currentIndex, (newIndex) => {
  internalIndex.value = newIndex;
});

// Event definitions
const emit = defineEmits<{
  // Stepper events
  'update:value': [value: number];
  change: [value: number];
  increment: [value: number];
  decrement: [value: number];
  
  // Navigation events
  'update:currentIndex': [index: number];
  previous: [index: number];
  next: [index: number];
  navigate: [index: number];
}>();

// Computed values
const isNavigationVariant = computed(() => props.variant === 'navigation');

const controlsClasses = computed(() => [
  'controls',
  `controls--${props.variant}`
]);

const displayValue = computed(() => {
  return internalValue.value.toString();
});

// Left button logic
const isLeftDisabled = computed(() => {
  if (props.disabled) return true;
  
  if (isNavigationVariant.value) {
    return internalIndex.value <= 0;
  } else {
    return internalValue.value <= props.min;
  }
});

const leftButtonLabel = computed(() => {
  return isNavigationVariant.value ? '이전' : '값 감소';
});

const leftIconPath = computed(() => {
  return isNavigationVariant.value 
    ? 'M15 18l-6-6 6-6'  // Left chevron
    : 'M6 12h12';         // Minus line
});

const leftButtonClasses = computed(() => [
  'controls__button',
  'controls__button--left',
  {
    'controls__button--disabled': isLeftDisabled.value
  }
]);

// Right button logic
const isRightDisabled = computed(() => {
  if (props.disabled) return true;
  
  if (isNavigationVariant.value) {
    return internalIndex.value >= props.totalItems - 1;
  } else {
    return internalValue.value >= props.max;
  }
});

const rightButtonLabel = computed(() => {
  return isNavigationVariant.value ? '다음' : '값 증가';
});

const rightIconPath = computed(() => {
  return isNavigationVariant.value 
    ? 'M9 18l6-6-6-6' // Right chevron
    : 'M12 5v14M5 12h14'; // Plus icon
});

const rightButtonClasses = computed(() => [
  'controls__button',
  'controls__button--right',
  {
    'controls__button--disabled': isRightDisabled.value
  }
]);

// Event handlers
const handleLeftClick = () => {
  if (isLeftDisabled.value) return;
  
  if (isNavigationVariant.value) {
    const newIndex = Math.max(0, internalIndex.value - 1);
    internalIndex.value = newIndex;
    emit('update:currentIndex', newIndex);
    emit('previous', newIndex);
    emit('navigate', newIndex);
  } else {
    const newValue = internalValue.value - props.step;
    internalValue.value = Math.max(newValue, props.min);
    emit('update:value', internalValue.value);
    emit('change', internalValue.value);
    emit('decrement', internalValue.value);
  }
};

const handleRightClick = () => {
  if (isRightDisabled.value) return;
  
  if (isNavigationVariant.value) {
    const newIndex = Math.min(props.totalItems - 1, internalIndex.value + 1);
    internalIndex.value = newIndex;
    emit('update:currentIndex', newIndex);
    emit('next', newIndex);
    emit('navigate', newIndex);
  } else {
    const newValue = internalValue.value + props.step;
    internalValue.value = Math.min(newValue, props.max);
    emit('update:value', internalValue.value);
    emit('change', internalValue.value);
    emit('increment', internalValue.value);
  }
};

// Backwards compatibility aliases
const increment = handleRightClick;
const decrement = handleLeftClick;
</script>

<style scoped>
/* Design tokens based on Figma variables */
.controls {
  --color-icon-gray600: #707070;
  --color-icon-gray900: #111111;
  --color-icon-gray400: #d3d3d3;
  --color-bg-disabled: #f0f0f0;
  --color-bg-default: #ffffff;
  --color-border-line-1: #d3d3d3;
  --color-text-font-1: #121212;
  --border-radius-8: 8px;
  --body-body1-regular-family: "Pretendard", sans-serif;
  --body-body1-regular-size: 16px;
  --body-body1-regular-weight: 400;
  --body-body1-regular-line-height: 24px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  height: 32px;
  box-sizing: border-box;
}

/* Stepper variant (default) */
.controls--stepper {
  gap: 0;
}

/* Navigation variant */
.controls--navigation {
  gap: 16px;
  justify-content: center;
}


.controls__button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  box-sizing: border-box;
  border: 1px solid var(--color-border-line-1);
  background-color: var(--color-bg-default);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-radius: var(--border-radius-8);
}

.controls__button:hover:not(:disabled) {
  border-color: var(--color-icon-gray900);
  background-color: #f8f8f8;
}

.controls__button:focus {
  outline: 2px solid #19973c;
  outline-offset: 2px;
}

.controls__button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Stepper variant button styling */
.controls--stepper .controls__button--left {
  border-radius: var(--border-radius-8) 0 0 var(--border-radius-8);
  background-color: var(--color-bg-disabled);
}

.controls--stepper .controls__button--right {
  border-radius: 0 var(--border-radius-8) var(--border-radius-8) 0;
  background-color: var(--color-bg-default);
}

/* Navigation variant button styling */
.controls--navigation .controls__button {
  border-radius: var(--border-radius-8);
  background-color: var(--color-bg-default);
}

.controls--navigation .controls__button:disabled {
  background-color: var(--color-bg-disabled);
}


.controls__button--disabled {
  background-color: var(--color-bg-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

.controls__icon {
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  overflow: hidden;
}

.controls__icon img {
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: contain;
}

.controls__svg {
  width: 100%;
  height: 100%;
  color: var(--color-icon-gray600);
}

/* Disabled state icon styling */
.controls__button:disabled .controls__svg {
  color: var(--color-icon-gray400);
}

.controls__input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 40px;
  padding: 0 4px;
  flex-shrink: 0;
  box-sizing: border-box;
  border-top: 1px solid var(--color-border-line-1);
  border-bottom: 1px solid var(--color-border-line-1);
  position: relative;
}

.controls__value {
  font-family: var(--body-body1-regular-family);
  font-style: normal;
  font-weight: var(--body-body1-regular-weight);
  font-size: var(--body-body1-regular-size);
  line-height: var(--body-body1-regular-line-height);
  text-align: center;
  letter-spacing: -0.32px;
  color: var(--color-text-font-1);
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

/* Active states */
.controls__button:active:not(:disabled) {
  transform: translateY(1px);
}

/* Responsive behavior */
@media (max-width: 768px) {
  .controls__button {
    width: 36px;
    height: 36px;
  }
  
  .controls__input {
    height: 36px;
    width: 44px;
  }
  
  .controls {
    height: 36px;
  }
  
  .controls--navigation {
    gap: 20px;
  }
}

</style>