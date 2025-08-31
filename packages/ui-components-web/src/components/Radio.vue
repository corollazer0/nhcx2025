<template>
  <div 
    class="radio-survey"
    :class="radioClasses"
    data-testid="radio-survey"
  >
    <div class="radio-survey__group" data-testid="radio-group">
      <button
        v-for="(option, index) in options"
        :key="option.value"
        type="button"
        class="radio-survey__option"
        :class="getOptionClasses(option.value)"
        :data-testid="`radio-option-${index}`"
        :aria-checked="modelValue === option.value"
        role="radio"
        :aria-describedby="hasMessage ? `${componentId}-message` : undefined"
        @click="handleOptionClick(option.value)"
        @keydown.space.prevent="handleOptionClick(option.value)"
        @keydown.enter.prevent="handleOptionClick(option.value)"
      >
        <span class="radio-survey__label">{{ option.label }}</span>
      </button>
    </div>

    <div 
      v-if="hasMessage"
      :id="`${componentId}-message`"
      class="radio-survey__message"
      data-testid="radio-message"
    >
      <div 
        v-if="showNotice"
        class="radio-survey__notice"
        :class="noticeClasses"
        data-testid="radio-notice"
      >
        {{ noticeText }}
      </div>
      <div 
        v-if="showText"
        class="radio-survey__text"
        data-testid="radio-text"
      >
        {{ messageText }}
        <button
          v-if="showTooltip"
          type="button"
          class="radio-survey__tooltip"
          :data-testid="`radio-tooltip`"
          @click="$emit('tooltip')"
          aria-label="도움말"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-6h2v6zm0-8h-2V7h2v4z" fill="#767676"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

export interface RadioOption {
  label: string
  value: string | number | boolean
}

interface RadioProps {
  modelValue?: string | number | boolean
  options?: RadioOption[]
  state?: 'default' | 'selected' | 'error'
  showMessage?: boolean
  showNotice?: boolean
  showText?: boolean
  showTooltip?: boolean
  noticeText?: string
  messageText?: string
  disabled?: boolean
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  options: () => [
    { label: '아니요', value: false },
    { label: '예', value: true }
  ],
  state: 'default',
  showMessage: false,
  showNotice: false,
  showText: false,
  showTooltip: false,
  noticeText: '정답 입니다.',
  messageText: '내용을 입력해 주세요.',
  disabled: false,
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
  tooltip: []
}>()

// Generate unique component ID for accessibility
const instance = getCurrentInstance()
const componentId = `radio-survey-${instance?.uid || Math.random().toString(36).substr(2, 9)}`

const radioClasses = computed(() => [
  `radio-survey--${props.state}`,
  `radio-survey--${props.size}`,
  {
    'radio-survey--disabled': props.disabled,
    'radio-survey--has-message': hasMessage.value
  }
])

const hasMessage = computed(() => props.showMessage && (props.showNotice || props.showText))

const noticeClasses = computed(() => [
  'radio-survey__notice',
  {
    'radio-survey__notice--success': props.state === 'selected',
    'radio-survey__notice--error': props.state === 'error'
  }
])

const getOptionClasses = (value: string | number | boolean) => [
  'radio-survey__option',
  {
    'radio-survey__option--selected': props.modelValue === value,
    'radio-survey__option--error': props.state === 'error',
    'radio-survey__option--success': props.state === 'selected' && props.modelValue === value,
    'radio-survey__option--disabled': props.disabled
  }
]

const handleOptionClick = (value: string | number | boolean) => {
  if (props.disabled) return
  
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.radio-survey {
  --color-text-default: #505050;
  --color-text-secondary: #767676;
  --color-text-success: #19973c;
  --color-text-error: #e24949;
  --color-bg-default: #ffffff;
  --color-border-default: #d3d3d3;
  --color-border-success: #19973c;
  --color-border-error: #e24949;
  --border-radius: 10px;
  --font-family: 'Pretendard', sans-serif;
  --font-size-body: 15px;
  --font-size-caption: 13px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --line-height-body: 24px;
  --line-height-caption: 20px;
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  width: 100%;
  max-width: 312px;
}

.radio-survey__group {
  display: flex;
  gap: var(--spacing-xs);
  width: 100%;
}

.radio-survey__option {
  flex: 1;
  background-color: var(--color-bg-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--border-radius);
  padding: 13px var(--spacing-md);
  font-family: var(--font-family);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
  letter-spacing: -0.3px;
  color: var(--color-text-default);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-survey__option:hover:not(.radio-survey__option--disabled) {
  border-color: var(--color-border-success);
}

.radio-survey__option:focus-visible {
  outline: 2px solid var(--color-border-success);
  outline-offset: 2px;
}

.radio-survey__option--selected {
  border-color: var(--color-border-success);
  font-weight: var(--font-weight-medium);
}

.radio-survey__option--error {
  border-color: var(--color-border-error);
}

.radio-survey__option--success {
  border-color: var(--color-border-success);
  font-weight: var(--font-weight-medium);
}

.radio-survey__option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.radio-survey__label {
  display: block;
  text-align: center;
  width: 100%;
}

.radio-survey__message {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  font-family: var(--font-family);
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-caption);
  letter-spacing: -0.26px;
}

.radio-survey__notice {
  color: var(--color-text-secondary);
}

.radio-survey__notice--success {
  color: var(--color-text-success);
}

.radio-survey__notice--error {
  color: var(--color-text-error);
}

.radio-survey__text {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: var(--color-text-secondary);
}

.radio-survey__tooltip {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.radio-survey__tooltip:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.radio-survey__tooltip:focus-visible {
  outline: 2px solid var(--color-border-success);
  outline-offset: 2px;
}

/* Size variants */
.radio-survey--sm .radio-survey__option {
  padding: 10px var(--spacing-sm);
  min-height: 44px;
  font-size: 14px;
}

.radio-survey--sm .radio-survey__message {
  font-size: 12px;
  line-height: 18px;
}

/* States */
.radio-survey--error .radio-survey__notice {
  color: var(--color-text-error);
}

.radio-survey--selected .radio-survey__notice {
  color: var(--color-text-success);
}

/* Responsive */
@media (max-width: 480px) {
  .radio-survey {
    max-width: 100%;
  }
  
  .radio-survey__option {
    font-size: 14px;
    padding: 12px;
  }
  
  .radio-survey__message {
    font-size: 12px;
  }
}

/* Accessibility improvements */
.radio-survey__option[aria-checked="true"]::before {
  content: '';
  position: absolute;
  left: -9999px;
}

@media (prefers-reduced-motion: reduce) {
  .radio-survey__option {
    transition: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .radio-survey__option {
    border-width: 2px;
  }
  
  .radio-survey__option--selected,
  .radio-survey__option--success {
    border-width: 3px;
  }
}
</style>