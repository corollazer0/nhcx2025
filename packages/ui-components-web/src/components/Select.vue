<template>
  <div class="select" :class="selectClasses" data-testid="select" ref="selectRef">
    <label v-if="label" class="select__label" :for="inputId">
      {{ label }}
    </label>
    
    <div class="select__container" :class="containerClasses">
      <div
        class="select__trigger"
        :class="triggerClasses"
        data-testid="select-trigger"
        @click="handleTriggerClick"
        @keydown="handleKeydown"
        tabindex="0"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
        :aria-disabled="disabled"
        :aria-readonly="readonly"
      >
        <div class="select__value-container">
          <div class="select__value-wrapper">
            <div 
              v-if="(displayIcon || displayIconImage) && variant === 'with-icon'" 
              class="select__icon"
              :class="{ 'select__icon--image': displayIconImage }"
              :style="displayIconImage ? {} : { backgroundColor: displayIconColor }"
            >
              <img 
                v-if="displayIconImage" 
                :src="displayIconImage" 
                :alt="displayValue"
                class="select__icon-img"
              />
              <span v-else>{{ displayIconText }}</span>
            </div>
            <span class="select__value" :class="valueClasses">
              {{ displayValue }}
            </span>
          </div>
          <span 
            v-if="displayDescription && showDescription" 
            class="select__description" 
            :class="`select__description--${state}`"
          >
            {{ displayDescription }}
          </span>
        </div>
        
        <svg 
          class="select__arrow" 
          :class="arrowClasses"
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="currentColor"
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </div>
      
      <div
        v-if="isOpen && !disabled && !readonly"
        class="select__dropdown"
        data-testid="select-dropdown"
        role="listbox"
        :aria-labelledby="inputId"
      >
        <div
          v-for="option in options"
          :key="getOptionValue(option)"
          class="select__option"
          :class="getOptionClasses(option)"
          data-testid="select-option"
          role="option"
          :aria-selected="isOptionSelected(option)"
          @click="handleOptionClick(option, $event)"
          @mouseenter="setHoveredOption(option)"
          @mouseleave="clearHoveredOption"
        >
          <div class="select__option-content">
            <div class="select__option-wrapper">
              <div 
                v-if="(getOptionIcon(option) || getOptionIconImage(option)) && variant === 'with-icon'" 
                class="select__option-icon"
                :class="{ 'select__option-icon--image': getOptionIconImage(option) }"
                :style="getOptionIconImage(option) ? {} : { backgroundColor: getOptionIconColor(option) }"
              >
                <img 
                  v-if="getOptionIconImage(option)" 
                  :src="getOptionIconImage(option)" 
                  :alt="getOptionLabel(option)"
                  class="select__option-icon-img"
                />
                <span v-else>{{ getOptionIconText(option) }}</span>
              </div>
              <span class="select__option-label">{{ getOptionLabel(option) }}</span>
            </div>
            <span 
              v-if="getOptionDescription(option) && variant === 'with-description' && showDescription" 
              class="select__option-description"
            >
              {{ getOptionDescription(option) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="shouldShowFooter" class="select__footer">
      <span v-if="errorMessage" class="select__error" data-testid="select-error">
        {{ errorMessage }}
      </span>
      <span v-else-if="helperText" class="select__helper" data-testid="select-helper">
        {{ helperText }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch, onMounted, onUnmounted } from 'vue';

// Option type - can be string or object
type SelectOption = string | { 
  label: string; 
  value: string | number; 
  disabled?: boolean;
  description?: string; // 부가설명 텍스트
  icon?: string; // 텍스트 아이콘 (예: 'NH', 'KB')
  iconImage?: string; // 이미지 아이콘 URL
  iconColor?: string; // 아이콘 배경색 (텍스트 아이콘에만 적용)
};

// Select variants
type SelectVariant = 'default' | 'with-description' | 'with-icon';

// Select states
type SelectState = 'default' | 'focus' | 'error' | 'disabled' | 'readonly';

// Props interface
interface SelectProps {
  // v-model support
  modelValue?: string | number | null;
  
  // Basic properties
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  
  // Options
  options?: SelectOption[];
  
  // Variant
  variant?: SelectVariant;
  
  // Description control for with-description variant
  showDescription?: boolean;
  
  // Custom description text for with-description variant
  customDescription?: string;
  
  // State
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  
  // ID for accessibility
  id?: string;
}

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: '선택',
  variant: 'default',
  showDescription: true,
  disabled: false,
  readonly: false,
  error: false,
  options: () => [],
});

// Event definitions
const emit = defineEmits<{
  'update:modelValue': [value: string | number | null];
  'change': [value: string | number | null];
  'focus': [event: FocusEvent];
  'blur': [event: FocusEvent];
  'open': [];
  'close': [];
}>();

// Internal state
const isOpen = ref(false);
const isFocused = ref(false);
const hoveredOption = ref<SelectOption | null>(null);
const inputId = computed(() => props.id || `select-${Math.random().toString(36).substr(2, 9)}`);

// Computed properties
const state = computed<SelectState>(() => {
  if (props.disabled) return 'disabled';
  if (props.readonly) return 'readonly';
  if (props.errorMessage || props.error) return 'error';
  if (isFocused.value || isOpen.value) return 'focus';
  return 'default';
});

const selectClasses = computed(() => [
  `select--${state.value}`,
]);

const containerClasses = computed(() => [
  `select__container--${state.value}`,
]);

const triggerClasses = computed(() => [
  `select__trigger--${state.value}`,
  {
    'select__trigger--open': isOpen.value,
  }
]);

const valueClasses = computed(() => [
  `select__value--${state.value}`,
  {
    'select__value--placeholder': !props.modelValue,
  }
]);

const arrowClasses = computed(() => [
  `select__arrow--${state.value}`,
  {
    'select__arrow--open': isOpen.value,
  }
]);

const displayValue = computed(() => {
  if (!props.modelValue) return props.placeholder;
  
  const selectedOption = props.options.find(option => {
    return getOptionValue(option) === props.modelValue;
  });
  
  return selectedOption ? getOptionLabel(selectedOption) : props.placeholder;
});

const displayDescription = computed(() => {
  if (props.variant !== 'with-description') return undefined;
  
  // customDescription이 있으면 우선 사용
  if (props.customDescription) {
    return props.customDescription;
  }
  
  // modelValue가 없으면 undefined 반환
  if (!props.modelValue) return undefined;
  
  // 선택된 옵션의 description 사용
  const selectedOption = props.options.find(option => {
    return getOptionValue(option) === props.modelValue;
  });
  
  return selectedOption ? getOptionDescription(selectedOption) : undefined;
});

const shouldShowFooter = computed(() => {
  return props.errorMessage || props.helperText;
});

// Icon display computed properties for selected option
const displayIcon = computed(() => {
  if (props.variant !== 'with-icon' || !props.modelValue) return undefined;
  
  const selectedOption = props.options.find(option => {
    return getOptionValue(option) === props.modelValue;
  });
  
  return selectedOption ? getOptionIcon(selectedOption) : undefined;
});

const displayIconColor = computed(() => {
  if (props.variant !== 'with-icon' || !props.modelValue) return undefined;
  
  const selectedOption = props.options.find(option => {
    return getOptionValue(option) === props.modelValue;
  });
  
  return selectedOption ? getOptionIconColor(selectedOption) : '#007bff';
});

const displayIconText = computed(() => {
  if (props.variant !== 'with-icon' || !props.modelValue) return undefined;
  
  const selectedOption = props.options.find(option => {
    return getOptionValue(option) === props.modelValue;
  });
  
  return selectedOption ? getOptionIconText(selectedOption) : undefined;
});

const displayIconImage = computed(() => {
  if (props.variant !== 'with-icon' || !props.modelValue) return undefined;
  
  const selectedOption = props.options.find(option => {
    return getOptionValue(option) === props.modelValue;
  });
  
  return selectedOption ? getOptionIconImage(selectedOption) : undefined;
});

// Option helper functions
const getOptionValue = (option: SelectOption): string | number => {
  return typeof option === 'string' ? option : option.value;
};

const getOptionLabel = (option: SelectOption): string => {
  return typeof option === 'string' ? option : option.label;
};

const getOptionDescription = (option: SelectOption): string | undefined => {
  return typeof option === 'object' ? option.description : undefined;
};

const getOptionIcon = (option: SelectOption): string | undefined => {
  return typeof option === 'object' ? option.icon : undefined;
};

const getOptionIconColor = (option: SelectOption): string => {
  return typeof option === 'object' && option.iconColor ? option.iconColor : '#007bff';
};

const getOptionIconText = (option: SelectOption): string => {
  // 피그마에서 NH 같은 텍스트가 아이콘으로 표시되므로 icon 값을 텍스트로 사용
  return typeof option === 'object' && option.icon ? option.icon : '';
};

const getOptionIconImage = (option: SelectOption): string | undefined => {
  return typeof option === 'object' ? option.iconImage : undefined;
};

const isOptionDisabled = (option: SelectOption): boolean => {
  return typeof option === 'object' && option.disabled === true;
};

const isOptionSelected = (option: SelectOption): boolean => {
  return getOptionValue(option) === props.modelValue;
};

const setHoveredOption = (option: SelectOption) => {
  if (!isOptionDisabled(option)) {
    hoveredOption.value = option;
  }
};

const clearHoveredOption = () => {
  hoveredOption.value = null;
};

const getOptionClasses = (option: SelectOption) => [
  'select__option',
  {
    'select__option--selected': isOptionSelected(option),
    'select__option--disabled': isOptionDisabled(option),
    'select__option--hovered': hoveredOption.value === option,
  }
];

// Event handlers
const handleTriggerClick = () => {
  if (props.disabled || props.readonly) return;
  
  if (isOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

const handleOptionClick = (option: SelectOption, event?: Event) => {
  if (isOptionDisabled(option)) return;
  
  // 이벤트 전파 중단
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const value = getOptionValue(option);
  console.log('Select: Option clicked, emitting value:', value);
  emit('update:modelValue', value);
  emit('change', value);
  closeDropdown();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) return;
  
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (isOpen.value) {
        if (hoveredOption.value) {
          handleOptionClick(hoveredOption.value, event);
        }
      } else {
        openDropdown();
      }
      break;
      
    case 'Escape':
      event.preventDefault();
      closeDropdown();
      break;
      
    case 'ArrowDown':
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
      } else {
        navigateOptions('down');
      }
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      if (!isOpen.value) {
        openDropdown();
      } else {
        navigateOptions('up');
      }
      break;
  }
};

const navigateOptions = (direction: 'up' | 'down') => {
  const enabledOptions = props.options.filter(option => !isOptionDisabled(option));
  if (enabledOptions.length === 0) return;
  
  const currentIndex = hoveredOption.value 
    ? enabledOptions.findIndex(option => option === hoveredOption.value)
    : -1;
  
  let nextIndex;
  if (direction === 'down') {
    nextIndex = currentIndex < enabledOptions.length - 1 ? currentIndex + 1 : 0;
  } else {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledOptions.length - 1;
  }
  
  hoveredOption.value = enabledOptions[nextIndex];
};

const openDropdown = () => {
  if (props.disabled || props.readonly) return;
  
  isOpen.value = true;
  isFocused.value = true;
  emit('open');
  
  // Set initial hovered option to selected option or first enabled option
  const selectedOption = props.options.find(option => isOptionSelected(option));
  if (selectedOption && !isOptionDisabled(selectedOption)) {
    hoveredOption.value = selectedOption;
  } else {
    const firstEnabledOption = props.options.find(option => !isOptionDisabled(option));
    if (firstEnabledOption) {
      hoveredOption.value = firstEnabledOption;
    }
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  hoveredOption.value = null;
  emit('close');
  
  // Keep focus state briefly for styling
  nextTick(() => {
    setTimeout(() => {
      isFocused.value = false;
    }, 100);
  });
};

const handleFocus = (event: FocusEvent) => {
  if (!props.disabled && !props.readonly) {
    isFocused.value = true;
    emit('focus', event);
  }
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

// Click outside handler
const selectRef = ref<HTMLElement>();
const handleClickOutside = (event: Event) => {
  if (!isOpen.value) return;
  
  const target = event.target as HTMLElement;
  
  if (selectRef.value && !selectRef.value.contains(target)) {
    closeDropdown();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Watch for external changes
watch(() => props.modelValue, () => {
  if (isOpen.value) {
    closeDropdown();
  }
});
</script>

<style scoped>
/* Design tokens based on Figma variables */
.select {
  /* Figma design tokens */
  --color-text-font-3: #505050;
  --color-text-font-4: #767676;
  --color-icon-gray900: #111111;
  --color-bg-default: #ffffff;
  --color-bg-select-disabled: #f0f0f0;
  --color-bg-select-readonly: #f0f0f0;
  --color-border-select-default: #e1e1e1;
  --color-border-select-error: #e24949;
  --color-text-select-filled: #121212;
  --color-text-select-inactive: #929292;
  --color-text-select-disabled: #121212;
  --color-text-select-readonly: #121212;
  --color-text-error: #e24949;
  --border-radius-12: 12px;
  
  /* Typography tokens from Figma */
  --font-family: "Pretendard", sans-serif;
  --heading-h4-medium-size: 18px;
  --heading-h4-medium-weight: 500;
  --heading-h4-medium-line-height: 26px;
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
  position: relative;
}

.select__label {
  font-family: var(--font-family);
  font-size: var(--body3-medium-size);
  font-weight: var(--body3-medium-weight);
  line-height: var(--body3-medium-line-height);
  color: var(--color-text-font-3);
  margin: 0;
}

.select__container {
  position: relative;
  width: 100%;
}

.select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  padding: 12px 16px;
  border: 1px solid var(--color-border-select-default);
  border-radius: var(--border-radius-12);
  background-color: var(--color-bg-default);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;
}

/* 높이를 description이 있을 때 자동으로 조정 */
.select__trigger:has(.select__description) {
  min-height: 72px;
}

.select__trigger--focus {
  border-color: var(--color-text-font-3);
}

.select__trigger--error {
  border-color: var(--color-border-select-error);
}

.select__trigger--disabled {
  background-color: var(--color-bg-select-disabled);
  cursor: not-allowed;
  border-color: var(--color-border-select-default);
}

.select__trigger--readonly {
  background-color: var(--color-bg-select-readonly);
  cursor: default;
  border-color: var(--color-border-select-default);
}

.select__value-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
}

.select__value-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.select__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  overflow: hidden;
}

.select__icon--image {
  background-color: transparent;
}

.select__icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.select__value {
  font-family: var(--font-family);
  font-size: var(--heading-h4-medium-size);
  font-weight: var(--heading-h4-medium-weight);
  line-height: var(--heading-h4-medium-line-height);
  color: var(--color-text-select-filled);
  text-align: left;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select__description {
  font-family: var(--font-family);
  font-size: var(--body3-regular-size);
  font-weight: var(--body3-regular-weight);
  line-height: var(--body3-regular-line-height);
  color: var(--color-text-font-4);
  margin-top: 2px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.select__description--disabled {
  color: var(--color-text-font-4);
}

.select__description--readonly {
  color: var(--color-text-font-4);
}

.select__value--placeholder {
  color: var(--color-text-select-inactive);
}

.select__value--disabled {
  color: var(--color-text-select-disabled);
}

.select__value--readonly {
  color: var(--color-text-select-readonly);
}

.select__arrow {
  color: var(--color-icon-gray900);
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 8px;
}

.select__arrow--open {
  transform: rotate(180deg);
}

.select__arrow--disabled,
.select__arrow--readonly {
  color: var(--color-text-font-4);
}

.select__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--color-bg-default);
  border: 1px solid var(--color-border-select-default);
  border-radius: var(--border-radius-12);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.select__option {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.select__option-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.select__option-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.select__option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  font-family: var(--font-family);
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
  overflow: hidden;
}

.select__option-icon--image {
  background-color: transparent;
}

.select__option-icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.select__option-label {
  font-family: var(--font-family);
  font-size: var(--heading-h4-medium-size);
  font-weight: var(--heading-h4-medium-weight);
  line-height: var(--heading-h4-medium-line-height);
  color: var(--color-text-select-filled);
  width: 100%;
}

.select__option-description {
  font-family: var(--font-family);
  font-size: var(--body3-regular-size);
  font-weight: var(--body3-regular-weight);
  line-height: var(--body3-regular-line-height);
  color: var(--color-text-font-4);
  margin-top: 2px;
  width: 100%;
}

.select__option:hover,
.select__option--hovered {
  background-color: rgba(0, 132, 92, 0.05);
}

.select__option--selected {
  background-color: rgba(0, 132, 92, 0.1);
  color: var(--color-text-select-filled);
}

.select__option--disabled {
  color: var(--color-text-font-4);
  cursor: not-allowed;
  background-color: transparent;
}

.select__option--disabled:hover {
  background-color: transparent;
}

.select__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-top: 4px;
}

.select__error {
  font-family: var(--font-family);
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  color: var(--color-text-error);
  flex: 1;
}

.select__helper {
  font-family: var(--font-family);
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  color: var(--color-text-font-4);
  flex: 1;
}

/* Focus states for accessibility */
.select__trigger:focus-visible {
  outline: 2px solid var(--color-text-font-3);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .select__trigger {
    border-width: 2px;
  }
  
  .select__trigger:focus-visible {
    outline: 3px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .select__trigger,
  .select__arrow,
  .select__option {
    transition: none;
  }
}
</style>