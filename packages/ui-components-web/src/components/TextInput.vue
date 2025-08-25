<template>
  <div class="text-input" :class="`text-input--${state}`" data-testid="text-input">
    <label v-if="label" class="text-input__label" :for="inputId">
      {{ label }}
    </label>
    
    <div class="text-input__container" :class="`text-input__container--${state}`">
      <textarea 
        v-if="type === 'textarea'"
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        :rows="rows"
        class="text-input__textarea"
        :class="textareaClasses"
        data-testid="text-input-textarea"
        @input="handleInput"
        @paste="handlePaste"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      
      <input 
        v-else
        :id="inputId"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        class="text-input__input"
        :class="inputClasses"
        data-testid="text-input-field"
        @input="handleInput"
        @paste="handlePaste"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      
      <button 
        v-if="clearable && modelValue && !disabled && !readonly"
        type="button"
        class="text-input__clear"
        data-testid="text-input-clear"
        @click="handleClear"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z"/>
        </svg>
      </button>
    </div>
    
    <div v-if="shouldShowFooter" class="text-input__footer">
      <span v-if="errorMessage" class="text-input__error" data-testid="text-input-error">
        {{ errorMessage }}
      </span>
      <span v-else-if="helperText" class="text-input__helper" data-testid="text-input-helper">
        {{ helperText }}
      </span>
      
      <span v-if="shouldShowCharCount" class="text-input__count" data-testid="text-input-count">
        {{ currentLength }} / {{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';

// Input types
type InputState = 'default' | 'focus' | 'error' | 'disabled';
type InputType = 'text' | 'password' | 'email' | 'number' | 'textarea';

// Props interface
interface TextInputProps {
  // v-model support
  modelValue?: string;
  
  // Basic properties
  type?: InputType;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  
  // State
  disabled?: boolean;
  readonly?: boolean;
  
  // Validation
  maxLength?: number;
  
  // Features
  clearable?: boolean;
  showCharCount?: boolean;
  
  // Textarea specific
  rows?: number;
  
  // ID for accessibility
  id?: string;
}

const props = withDefaults(defineProps<TextInputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearable: false,
  showCharCount: true,
  rows: 4,
  maxLength: 50,
});

// Event definitions
const emit = defineEmits<{
  'update:modelValue': [value: string];
  'focus': [event: FocusEvent];
  'blur': [event: FocusEvent];
  'input': [event: Event];
  'clear': [];
  'keydown': [event: KeyboardEvent];
}>();

// Internal state
const isFocused = ref(false);
const inputId = computed(() => props.id || `text-input-${Math.random().toString(36).substr(2, 9)}`);

// Computed properties
const state = computed<InputState>(() => {
  if (props.disabled) return 'disabled';
  if (props.errorMessage) return 'error';
  if (isFocused.value) return 'focus';
  return 'default';
});

const inputType = computed(() => {
  return props.type === 'textarea' ? 'text' : props.type;
});

const currentLength = computed(() => {
  return props.modelValue?.length || 0;
});

// Figma 디자인에 따라 showCharCount가 true면 항상 문자 수 표시
const shouldShowCharCount = computed(() => {
  return props.showCharCount;
});

const shouldShowFooter = computed(() => {
  return shouldShowCharCount.value || props.errorMessage || props.helperText;
});

const inputClasses = computed(() => [
  `text-input__input--${state.value}`,
  {
    'text-input__input--clearable': props.clearable && props.modelValue && !props.disabled && !props.readonly,
  }
]);

const textareaClasses = computed(() => [
  `text-input__textarea--${state.value}`,
  {
    'text-input__textarea--clearable': props.clearable && props.modelValue && !props.disabled && !props.readonly,
  }
]);

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  let value = target.value;
  
  // Apply maxLength for both input and textarea to ensure consistent behavior
  if (props.maxLength > 0 && value.length > props.maxLength) {
    value = value.slice(0, props.maxLength);
    target.value = value;
    // Force cursor position to end after truncation
    nextTick(() => {
      target.setSelectionRange(value.length, value.length);
    });
  }
  
  emit('update:modelValue', value);
  emit('input', event);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};

const handlePaste = (event: ClipboardEvent) => {
  // Handle paste event to enforce maxLength
  if (props.maxLength > 0) {
    // Use setTimeout to get the value after paste
    setTimeout(() => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target.value.length > props.maxLength) {
        const truncatedValue = target.value.slice(0, props.maxLength);
        target.value = truncatedValue;
        emit('update:modelValue', truncatedValue);
      }
    }, 0);
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  // Prevent typing when maxLength is reached (except for special keys)
  if (props.maxLength > 0) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    const currentLength = target.value.length;
    const selectionStart = target.selectionStart || 0;
    const selectionEnd = target.selectionEnd || 0;
    const hasSelection = selectionStart !== selectionEnd;
    
    // Allow backspace, delete, arrow keys, home, end, etc.
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
      'Home', 'End', 'Tab', 'Enter', 'Escape', 'Meta', 'Control', 'Alt', 'Shift'
    ];
    
    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z, etc.
    if (event.ctrlKey || event.metaKey) {
      emit('keydown', event);
      return;
    }
    
    // If we're at max length and trying to type a regular character (not a special key)
    if (currentLength >= props.maxLength && !allowedKeys.includes(event.key) && !hasSelection) {
      event.preventDefault();
      return;
    }
  }
  
  emit('keydown', event);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.text-input {
  /* Figma design tokens */
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-text-font-4: #767676;
  --color-text-input-filled: #121212;
  --color-text-input-inactive: #929292;
  --color-text-error: #e24949;
  --color-text-point: #19973c;
  --color-bg-default: #ffffff;
  --color-border-input-default: #e1e1e1;
  --color-border-input-focus: #19973c;
  --color-border-input-error: #e24949;
  --color-icon-gray900: #111111;
  --border-radius-10: 10px;
  
  /* Typography tokens */
  --font-family: "Pretendard", sans-serif;
  --body2-medium-size: 15px;
  --body2-medium-weight: 500;
  --body2-medium-line-height: 24px;
  --body3-medium-size: 14px;
  --body3-medium-weight: 500;
  --body3-medium-line-height: 22px;
  --caption1-regular-size: 13px;
  --caption1-regular-weight: 400;
  --caption1-regular-line-height: 20px;
  
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.text-input__label {
  font-family: var(--font-family);
  font-size: var(--body3-medium-size);
  font-weight: var(--body3-medium-weight);
  line-height: var(--body3-medium-line-height);
  color: var(--color-text-font-1);
  margin: 0;
}

.text-input__container {
  position: relative;
  width: 100%;
}

.text-input__input,
.text-input__textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-border-input-default);
  border-radius: var(--border-radius-10);
  background-color: var(--color-bg-default);
  font-family: var(--font-family);
  font-size: var(--body2-medium-size);
  font-weight: var(--body2-medium-weight);
  line-height: var(--body2-medium-line-height);
  color: var(--color-text-input-filled);
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;
}

.text-input__input::placeholder,
.text-input__textarea::placeholder {
  color: var(--color-text-input-inactive);
  font-weight: 400;
}

/* Input states */
.text-input__input--focus,
.text-input__textarea--focus {
  border-color: var(--color-border-input-focus);
}

.text-input__input--error,
.text-input__textarea--error {
  border-color: var(--color-border-input-error);
}

.text-input__input--disabled,
.text-input__textarea--disabled {
  background-color: #f8f9fa;
  color: var(--color-text-input-inactive);
  cursor: not-allowed;
}

/* Clearable input adjustments */
.text-input__input--clearable,
.text-input__textarea--clearable {
  padding-right: 44px;
}

/* Clear button */
.text-input__clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--color-text-font-4);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.text-input__clear:hover {
  color: var(--color-text-font-3);
}

.text-input__clear:focus {
  outline: 2px solid var(--color-border-input-focus);
  outline-offset: 2px;
}

/* Textarea specific */
.text-input__textarea {
  resize: vertical;
  min-height: 96px;
}

/* Footer */
.text-input__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-top: 4px;
}

.text-input__error {
  font-family: var(--font-family);
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  color: var(--color-text-error);
  flex: 1;
}

.text-input__helper {
  font-family: var(--font-family);
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  color: var(--color-text-font-4);
  flex: 1;
}

.text-input__count {
  font-family: var(--font-family);
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  color: var(--color-text-font-4);
  flex-shrink: 0;
}

/* Container state classes */
.text-input--error .text-input__count {
  color: var(--color-text-error);
}

.text-input--focus .text-input__count {
  color: var(--color-text-point);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .text-input__input:focus,
  .text-input__textarea:focus {
    outline: 3px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .text-input__input,
  .text-input__textarea,
  .text-input__clear {
    transition: none;
  }
}
</style>