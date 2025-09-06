<template>
  <div 
    class="checkbox"
    :class="checkboxClasses"
    data-testid="checkbox"
    @click="handleClick"
  >
    <div 
      class="checkbox__box"
      :class="boxClasses"
      role="checkbox"
      :aria-checked="isChecked"
      :aria-disabled="isDisabled"
      tabindex="0"
      @keydown="handleKeydown"
    >
      <div v-if="showCheckIcon" class="checkbox__check">
        <svg
          width="9"
          height="7"
          viewBox="0 0 9 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 3.5L3.5 6L8 1.5"
            :stroke="checkIconColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div v-if="showText" class="checkbox__text">
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface CheckboxProps {
  text?: string;
  showText?: boolean;
  size?: "sm" | "xs";
  state?: "default" | "selected" | "disabled" | "select-disabled";
  modelValue?: boolean;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  text: '체크',
  showText: true,
  size: 'sm',
  state: 'default',
  modelValue: false
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  change: [event: Event, value: boolean];
  click: [event: MouseEvent];
}>();

const checkboxClasses = computed(() => [
  `checkbox--${props.size}`,
  `checkbox--${props.state}`,
]);

const boxClasses = computed(() => [
  `checkbox__box--${props.size}`,
  `checkbox__box--${props.state}`,
]);

const isChecked = computed(() => {
  return props.state === 'selected' || props.state === 'select-disabled';
});

const isDisabled = computed(() => {
  return props.state === 'disabled' || props.state === 'select-disabled';
});

const showCheckIcon = computed(() => {
  return props.state === 'selected' || props.state === 'select-disabled';
});

const checkIconColor = computed(() => {
  if (props.state === 'select-disabled') {
    return '#ffffff';
  }
  if (props.state === 'selected') {
    return '#ffffff';
  }
  return '#707070';
});

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) {
    return;
  }

  const newValue = !isChecked.value;
  emit('update:modelValue', newValue);
  emit('change', event, newValue);
  emit('click', event);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.code === 'Space' || event.code === 'Enter') {
    event.preventDefault();
    handleClick(event as unknown as MouseEvent);
  }
};
</script>

<style scoped>
/* Design tokens from Figma */
.checkbox {
  --color-text-default: #121212;
  --color-text-disabled: #929292;
  --color-border-default: #707070;
  --color-border-disabled: #e1e1e1;
  --color-bg-selected: #19973c;
  --color-bg-disabled: #f6f6f6;
  --color-bg-select-disabled: #b3b3b3;
  --font-family-pretendard: 'Pretendard', sans-serif;
  --border-radius-8: 8px;

  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  width: fit-content;
}

.checkbox--disabled,
.checkbox--select-disabled {
  cursor: not-allowed;
}

.checkbox:focus-within {
  outline: 2px solid #121212;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Checkbox box styles */
.checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-8);
  border: 1px solid transparent;
  box-sizing: border-box;
  flex-shrink: 0;
  transition: all 0.2s ease;
  position: relative;
}

.checkbox__box:focus {
  outline: none;
}

/* Size variants */
.checkbox__box--sm {
  width: 24px;
  height: 24px;
}

.checkbox__box--xs {
  width: 24px;
  height: 24px;
  border-radius: 0;
  border: none;
  background: transparent;
}

/* State variants for sm size */
.checkbox__box--sm.checkbox__box--default {
  background-color: transparent;
  border-color: var(--color-border-default);
}

.checkbox__box--sm.checkbox__box--selected {
  background-color: var(--color-bg-selected);
  border-color: var(--color-bg-selected);
}

.checkbox__box--sm.checkbox__box--disabled {
  background-color: var(--color-bg-disabled);
  border-color: var(--color-border-disabled);
}

.checkbox__box--sm.checkbox__box--select-disabled {
  background-color: var(--color-bg-select-disabled);
  border-color: var(--color-bg-select-disabled);
}

/* State variants for xs size */
.checkbox__box--xs.checkbox__box--default,
.checkbox__box--xs.checkbox__box--selected,
.checkbox__box--xs.checkbox__box--disabled,
.checkbox__box--xs.checkbox__box--select-disabled {
  background: transparent;
  border: none;
}

/* Check icon styles */
.checkbox__check {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

/* Text styles */
.checkbox__text {
  display: flex;
  align-items: center;
  padding: 1px 0;
  font-family: var(--font-family-pretendard);
  line-height: 0;
  white-space: nowrap;
}

.checkbox--sm .checkbox__text span {
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.3px;
  color: var(--color-text-default);
}

.checkbox--xs .checkbox__text span {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-default);
}

.checkbox--disabled .checkbox__text span,
.checkbox--select-disabled .checkbox__text span {
  color: var(--color-text-disabled);
}

/* Hover effects */
.checkbox:not(.checkbox--disabled):not(.checkbox--select-disabled):hover .checkbox__box--sm.checkbox__box--default {
  background-color: #f8f8f8;
  border-color: #19973c;
}

.checkbox:not(.checkbox--disabled):not(.checkbox--select-disabled):hover .checkbox__box--sm.checkbox__box--selected {
  background-color: #0d5722;
}

/* Active effects */
.checkbox:not(.checkbox--disabled):not(.checkbox--select-disabled):active .checkbox__box {
  transform: scale(0.95);
}
</style>