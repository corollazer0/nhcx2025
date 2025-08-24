<template>
  <div class="search-interface" data-testid="search-interface">
    <!-- Title -->
    <div class="search-title">
      <h1 class="search-title-text">search</h1>
    </div>
    
    <!-- Component Container -->
    <div class="search-component">
      <div class="search-component__border" />
      
      <div class="search-content">
        <!-- Single Input Group -->
        <div class="input-group">
          <div class="input-label">
            <span class="input-label-text">{{ labelText }}</span>
          </div>
          <div :class="inputWrapperClasses">
            <input
              ref="searchInput"
              v-model="inputValue"
              type="text"
              class="search-input"
              :class="inputClasses"
              :placeholder="placeholder"
              data-testid="search-input"
              @input="handleInput"
              @focus="handleFocus"
              @blur="handleBlur"
            />
            <button 
              v-if="showClearButton && inputValue && (state === 'filled' || hasClearButton)"
              class="clear-button"
              type="button"
              aria-label="지우기"
              @click="handleClear"
            >
              <svg class="clear-icon" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="currentColor"/>
                <path d="M15 9L9 15M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button 
              class="search-button"
              type="button"
              aria-label="검색"
              @click="handleSearch"
            >
              <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div :class="helperClasses">
            <span class="input-helper-text">{{ helperText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// Input state types
type InputState = 'default' | 'filled' | 'focus' | 'error';

// Props interface
interface SearchInterfaceProps {
  // State control
  state?: InputState;
  
  // Input value
  value?: string;
  
  // Text content
  labelText?: string;
  placeholder?: string;
  helperText?: string;
  
  // Options
  showClearButton?: boolean;
  hasClearButton?: boolean; // Additional control for clear button display
}

const props = withDefaults(defineProps<SearchInterfaceProps>(), {
  // Default state
  state: 'default',
  
  // Default value
  value: '',
  
  // Default text content based on Figma
  labelText: '레이블',
  placeholder: '검색어 입력',
  helperText: '안내 문구 입력',
  
  // Options
  showClearButton: true,
  hasClearButton: false,
});

// Template ref
const searchInput = ref<HTMLInputElement>();

// Internal value management
const inputValue = ref(props.value);

// Watch for prop changes
watch(() => props.value, (newValue) => {
  inputValue.value = newValue;
});

// Computed classes based on state
const inputWrapperClasses = computed(() => [
  'input-wrapper',
  props.state
]);

const inputClasses = computed(() => [
  props.state
]);

const helperClasses = computed(() => [
  'input-helper',
  { error: props.state === 'error' }
]);

// Update helper text based on state
const helperText = computed(() => {
  if (props.state === 'error') {
    return '오류 메시지 출력';
  }
  return props.helperText;
});

// Event definitions
const emit = defineEmits<{
  'update:value': [value: string];
  input: [value: string, event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  search: [value: string];
  clear: [];
}>();

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  
  inputValue.value = value;
  emit('update:value', value);
  emit('input', value, event);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const handleSearch = () => {
  emit('search', inputValue.value);
};

const handleClear = () => {
  inputValue.value = '';
  emit('update:value', '');
  emit('clear');
  
  // Focus back to input after clearing
  if (searchInput.value) {
    searchInput.value.focus();
  }
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.search-interface {
  --color-text-font-3: #505050;
  --color-text-input-filled: #121212;
  --color-icon-gray900: #111111;
  --color-bg-default: #ffffff;
  --color-border-input-error: #e24949;
  --color-text-error: #e24949;
  --color-border-input-default: #e1e1e1;
  --color-text-font-4: #767676;
  --color-border-input-focus: #19973c;
  --color-text-input-inactive: #929292;
  --border-radius-12: 12px;
  --border-radius-40: 40px;
  --body-body3-medium-size: 14px;
  --body-body3-medium-weight: 500;
  --body-body3-medium-line-height: 22px;
  --heading-h4-medium-size: 18px;
  --heading-h4-medium-weight: 500;
  --heading-h4-medium-line-height: 26px;
  --body-caption-caption1-regular-size: 13px;
  --body-caption-caption1-regular-weight: 400;
  --body-caption-caption1-regular-line-height: 20px;

  box-sizing: border-box;
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
}

.search-title {
  width: 100%;
  flex-shrink: 0;
}

.search-title-text {
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 28px;
  line-height: 0;
  color: #333333;
  text-align: left;
  margin: 0;
}

.search-component {
  position: relative;
  width: 100%;
  height: 200px; /* Reduced height for single input */
  background-color: rgba(0, 132, 92, 0.01);
  border-radius: var(--border-radius-40);
  flex-shrink: 0;
}

.search-component__border {
  position: absolute;
  inset: 0;
  border: 1px dashed #00845c;
  border-radius: var(--border-radius-40);
  pointer-events: none;
}

.search-content {
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;
  justify-content: flex-start;
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
}

.input-label {
  width: 100%;
}

.input-label-text {
  font-family: "Pretendard", sans-serif;
  font-weight: var(--heading-h4-medium-weight);
  font-size: var(--heading-h4-medium-size);
  line-height: var(--heading-h4-medium-line-height);
  color: var(--color-text-input-filled);
}

.input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--color-bg-default);
  border: 1px solid var(--color-border-input-default);
  border-radius: var(--border-radius-12);
  padding: 12px 16px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input-wrapper.default {
  border-color: var(--color-border-input-default);
}

.input-wrapper.filled {
  border-color: var(--color-border-input-default);
}

.input-wrapper.focus {
  border-color: var(--color-border-input-focus);
  box-shadow: 0 0 0 3px rgba(25, 151, 60, 0.1);
}

.input-wrapper.error {
  border-color: var(--color-border-input-error);
  box-shadow: 0 0 0 3px rgba(226, 73, 73, 0.1);
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: "Pretendard", sans-serif;
  font-weight: var(--body-body3-medium-weight);
  font-size: var(--body-body3-medium-size);
  line-height: var(--body-body3-medium-line-height);
  color: var(--color-text-input-filled);
  padding: 0;
  margin: 0;
}

.search-input::placeholder {
  color: var(--color-text-input-inactive);
}

.search-input.default {
  color: var(--color-text-input-inactive);
}

.search-input.filled {
  color: var(--color-text-input-filled);
}

.search-input.focus {
  color: var(--color-text-input-filled);
}

.search-input.error {
  color: var(--color-text-input-filled);
}

.clear-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0 8px 0 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.clear-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.clear-button:focus {
  outline: 2px solid var(--color-border-input-focus);
  outline-offset: 2px;
}

.clear-icon {
  width: 100%;
  height: 100%;
  color: var(--color-text-font-4);
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.search-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.search-button:focus {
  outline: 2px solid var(--color-border-input-focus);
  outline-offset: 2px;
}

.search-icon {
  width: 100%;
  height: 100%;
  color: var(--color-icon-gray900);
}

.input-helper {
  width: 100%;
}

.input-helper-text {
  font-family: "Pretendard", sans-serif;
  font-weight: var(--body-caption-caption1-regular-weight);
  font-size: var(--body-caption-caption1-regular-size);
  line-height: var(--body-caption-caption1-regular-line-height);
  color: var(--color-text-font-4);
}

.input-helper.error .input-helper-text {
  color: var(--color-text-error);
}

/* Focus state styling when input is actually focused */
.search-input:focus {
  outline: none;
}

.search-input:focus + .search-button,
.input-wrapper.focus {
  border-color: var(--color-border-input-focus);
  box-shadow: 0 0 0 3px rgba(25, 151, 60, 0.1);
}
</style>