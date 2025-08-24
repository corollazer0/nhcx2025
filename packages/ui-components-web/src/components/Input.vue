<template>
  <div 
    class="input" 
    :class="inputClasses"
    data-testid="input"
  >
    <!-- Label -->
    <div 
      v-if="label"
      class="input__label"
      data-testid="input-label"
    >
      <div class="input__label-text">
        {{ labelText }}
      </div>
    </div>

    <!-- Input Container -->
    <div class="input__container">
      <div class="input__input-wrapper">
        <!-- Text Input Area -->
        <div class="input__text-container">
          <input
            ref="inputRef"
            v-model="inputValue"
            type="text"
            class="input__input"
            :placeholder="placeholderText"
            :disabled="state === 'disabled'"
            :readonly="state === 'readonly'"
            data-testid="input-input"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            @keydown.enter="handleEnter"
          />
          
          <!-- Cursor (only visible when focused and not readonly/disabled) -->
          <div 
            v-if="isFocused && !isReadonlyOrDisabled && inputValue"
            class="input__cursor"
          ></div>
        </div>

        <!-- Clear Button (focus state with text) -->
        <button
          v-if="inputValue && !isReadonlyOrDisabled"
          v-show="isFocused"
          type="button"
          class="input__clear-button"
          data-testid="input-clear"
          @click="clearInput"
          @mousedown.prevent
        >
          <div class="input__clear-icon"></div>
        </button>

        <!-- Success Icon -->
        <div
          v-if="state === 'success'"
          class="input__success-icon"
          data-testid="input-success-icon"
        >
          <div class="input__check-icon"></div>
        </div>
      </div>

      <!-- Border overlay -->
      <div 
        class="input__border" 
        aria-hidden="true"
      ></div>
    </div>

    <!-- Message -->
    <div
      v-if="message && messageText"
      class="input__message"
      :class="messageClasses"
      data-testid="input-message"
    >
      <div class="input__message-text">
        {{ messageText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';

interface InputProps {
  state?: 'inactive' | 'focus' | 'filled' | 'error' | 'success' | 'readonly' | 'disabled';
  labelText?: string;
  placeholderText?: string;
  messageText?: string;
  value?: string;
  label?: boolean;
  message?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  state: 'inactive',
  labelText: '레이블',
  placeholderText: '플레이스홀더 텍스트',
  messageText: '안내 문구 입력',
  value: '',
  label: true,
  message: true
});

const emit = defineEmits<{
  'update:value': [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  input: [event: Event, value: string];
  clear: [];
  enter: [event: KeyboardEvent, value: string];
}>();

const inputRef = ref<HTMLInputElement>();
const isFocused = ref(false);

const inputValue = computed({
  get: () => props.value,
  set: (value: string) => emit('update:value', value)
});

const isReadonlyOrDisabled = computed(() => 
  props.state === 'readonly' || props.state === 'disabled'
);

const inputClasses = computed(() => [
  `input--${props.state}`,
  {
    'input--focused': isFocused.value,
    'input--has-value': !!inputValue.value,
    'input--readonly': props.state === 'readonly',
    'input--disabled': props.state === 'disabled'
  }
]);

const messageClasses = computed(() => ({
  'input__message--error': props.state === 'error',
  'input__message--success': props.state === 'success',
  'input__message--default': !['error', 'success'].includes(props.state)
}));

const handleFocus = async (event: FocusEvent) => {
  if (isReadonlyOrDisabled.value) return;
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('input', event, target.value);
};

const handleEnter = (event: KeyboardEvent) => {
  emit('enter', event, inputValue.value);
};

const clearInput = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  inputValue.value = '';
  emit('clear');
  
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  clear: clearInput
});
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* Label */
.input__label {
  height: 22px;
  position: relative;
}

.input__label-text {
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: #505050;
}

/* Input Container */
.input__container {
  position: relative;
  height: 54px;
  border-radius: 12px;
}

.input__input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
  padding: 14px 16px 14px 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.input__text-container {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
  overflow: hidden;
  position: relative;
  gap: 8px;
}

.input__input {
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  color: #121212;
  background: transparent;
  border: none;
  outline: none;
  min-width: 0;
  text-overflow: ellipsis;
}

.input__input::placeholder {
  color: #929292;
  opacity: 1;
}

.input__input:disabled::placeholder {
  color: transparent;
}

/* Cursor */
.input__cursor {
  width: 1.5px;
  height: 16px;
  background-color: #006ffd;
  border-radius: 1px;
  flex-shrink: 0;
}

/* Clear Button */
.input__clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.input__clear-icon {
  width: 12px;
  height: 12px;
  background-color: #111111;
  mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6l12 12' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
  mask-size: contain;
}

/* Success Icon */
.input__success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.input__check-icon {
  width: 12px;
  height: 8px;
  background-color: #19973c;
  mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 6L9 17L4 12' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
  mask-size: contain;
}

/* Border */
.input__border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  pointer-events: none;
}

/* Message */
.input__message {
  display: flex;
  align-items: center;
  gap: 6px;
}

.input__message-text {
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: #767676;
}

/* State Variations */
.input--inactive .input__container {
  background-color: #ffffff;
}

.input--focus .input__border,
.input--focused .input__border {
  border-color: #19973c;
}

.input--focus .input__container,
.input--focused .input__container {
  background-color: #ffffff;
}

.input--filled .input__container {
  background-color: #ffffff;
}

.input--error .input__border {
  border-color: #e24949;
}

.input--error .input__container {
  background-color: #ffffff;
}

.input--error .input__message-text {
  color: #e24949;
}

.input--success .input__border {
  border-color: #19973c;
}

.input--success .input__container {
  background-color: #ffffff;
}

.input--success .input__message-text {
  color: #19973c;
}

.input--readonly .input__container,
.input--disabled .input__container {
  background-color: #f0f0f0;
}

.input--readonly .input__input,
.input--disabled .input__input {
  color: #121212;
}

.input--disabled .input__input {
  cursor: not-allowed;
}

/* Hover states (except readonly/disabled) */
.input:not(.input--readonly):not(.input--disabled) .input__clear-button:hover {
  background-color: rgba(255, 0, 0, 0.04);
  border-radius: 50%;
}

/* Focus states for accessibility */
.input__clear-button:focus-visible {
  outline: 2px solid #006ffd;
  outline-offset: 2px;
  border-radius: 50%;
}
</style>