<template>
  <div 
    class="terms"
    :class="termsClasses"
    data-testid="terms"
  >
    <!-- Terms content container -->
    <div class="terms__content">
      <!-- Checkbox and title section -->
      <div class="terms__header" @click="handleHeaderClick">
        <div class="terms__check-section">
          <!-- Checkbox -->
          <div 
            class="terms__checkbox"
            :class="checkboxClasses"
            data-testid="terms-checkbox"
            role="checkbox"
            :aria-checked="checked"
            :aria-disabled="disabled"
            tabindex="0"
            @click.stop="handleCheckboxClick"
            @keydown.space.prevent="handleCheckboxClick"
            @keydown.enter.prevent="handleCheckboxClick"
          >
            <div 
              v-show="checked"
              class="terms__check-icon"
              data-testid="terms-check-icon"
            >
              <!-- Check SVG icon -->
              <svg 
                width="9" 
                height="7" 
                viewBox="0 0 9 7" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M1 3.5L3.5 6L8 1.5" 
                  stroke="currentColor" 
                  stroke-width="1.2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          
          <!-- Title text -->
          <div 
            class="terms__title"
            data-testid="terms-title"
          >
            {{ title }}
          </div>
        </div>
        
        <!-- Arrow button -->
        <button
          v-if="showArrow"
          class="terms__arrow-btn"
          :class="arrowClasses"
          data-testid="terms-arrow"
          :aria-expanded="state === 'open'"
          :aria-label="state === 'open' ? '약관 접기' : '약관 펼치기'"
          @click.stop="handleArrowClick"
        >
          <svg 
            width="5" 
            height="10.5" 
            viewBox="0 0 5 10.5" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M0.75 1.5L4.25 5.25L0.75 9" 
              stroke="currentColor" 
              stroke-width="1.2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      
      <!-- Divider line when expanded -->
      <div 
        v-if="state === 'open'"
        class="terms__divider"
        data-testid="terms-divider"
      ></div>
      
      <!-- Terms list when expanded -->
      <div 
        v-if="state === 'open' && items.length > 0"
        class="terms__list"
        data-testid="terms-list"
      >
        <div 
          v-for="(item, index) in items"
          :key="index"
          class="terms__list-item"
          data-testid="terms-list-item"
        >
          <div class="terms__item-check-section">
            <!-- Small checkbox for list items -->
            <div 
              class="terms__item-checkbox"
              :class="{ 'terms__item-checkbox--checked': item.checked }"
              data-testid="terms-item-checkbox"
              role="checkbox"
              :aria-checked="item.checked"
              :aria-disabled="item.disabled"
              tabindex="0"
              @click="handleItemCheckClick(index)"
              @keydown.space.prevent="handleItemCheckClick(index)"
              @keydown.enter.prevent="handleItemCheckClick(index)"
            >
              <div 
                v-show="item.checked"
                class="terms__item-check-icon"
                data-testid="terms-item-check-icon"
              >
                <!-- Small check SVG icon -->
                <svg 
                  width="9" 
                  height="7" 
                  viewBox="0 0 9 7" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M1 3.5L3.5 6L8 1.5" 
                    stroke="currentColor" 
                    stroke-width="1.2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            
            <!-- Item text -->
            <div 
              class="terms__item-text"
              data-testid="terms-item-text"
            >
              {{ item.text }}
            </div>
          </div>
          
          <!-- Optional arrow for individual items -->
          <button
            v-if="item.showArrow"
            class="terms__item-arrow-btn"
            data-testid="terms-item-arrow"
            :aria-label="`${item.text} 약관 보기`"
            @click="handleItemArrowClick(index)"
          >
            <svg 
              width="4" 
              height="8" 
              viewBox="0 0 4 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M0.5 1L3 4L0.5 7" 
                stroke="currentColor" 
                stroke-width="1" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface TermsItem {
  text: string;
  checked?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
}

interface TermsProps {
  title?: string;
  state?: 'open' | 'close';
  checked?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  items?: TermsItem[];
}

const props = withDefaults(defineProps<TermsProps>(), {
  title: '[필수] 전체 동의',
  state: 'close',
  checked: false,
  disabled: false,
  showArrow: true,
  items: () => []
});

const emit = defineEmits<{
  'update:checked': [checked: boolean];
  'update:state': [state: 'open' | 'close'];
  'item-check': [index: number, checked: boolean];
  'item-arrow-click': [index: number];
  'arrow-click': [];
  'header-click': [];
}>();

// Computed classes
const termsClasses = computed(() => [
  `terms--${props.state}`,
  {
    'terms--disabled': props.disabled
  }
]);

const checkboxClasses = computed(() => [
  'terms__checkbox--sm',
  'terms__checkbox--default',
  {
    'terms__checkbox--checked': props.checked,
    'terms__checkbox--disabled': props.disabled
  }
]);

const arrowClasses = computed(() => [
  {
    'terms__arrow-btn--rotated': props.state === 'open'
  }
]);

// Event handlers
const handleCheckboxClick = () => {
  if (!props.disabled) {
    emit('update:checked', !props.checked);
  }
};

const handleArrowClick = () => {
  const newState = props.state === 'open' ? 'close' : 'open';
  emit('update:state', newState);
  emit('arrow-click');
};

const handleHeaderClick = () => {
  emit('header-click');
};

const handleItemCheckClick = (index: number) => {
  const item = props.items[index];
  if (!item.disabled) {
    emit('item-check', index, !item.checked);
  }
};

const handleItemArrowClick = (index: number) => {
  emit('item-arrow-click', index);
};
</script>

<style scoped>
/* Design tokens from Figma */
.terms {
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-bg-default: #ffffff;
  --color-border-line-2: #e1e1e1;
  --color-border-checkbox-basic-default: #707070;
  --color-icon-gray600: #707070;
  --border-radius-12: 12px;
  --font-pretendard: 'Pretendard', sans-serif;
  
  background-color: var(--color-bg-default);
  border: 1px solid var(--color-border-line-2);
  border-radius: var(--border-radius-12);
  box-sizing: border-box;
  width: 100%;
  font-family: var(--font-pretendard);
}

.terms__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Header section */
.terms__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.terms__check-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

/* Checkbox styles */
.terms__checkbox {
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-border-checkbox-basic-default);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  padding: 4px;
  box-sizing: border-box;
}

.terms__checkbox:hover:not(.terms__checkbox--disabled) {
  border-color: var(--color-text-font-1);
}

.terms__checkbox:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

.terms__checkbox--checked {
  border-color: var(--color-border-checkbox-basic-default);
  background-color: transparent;
}

.terms__checkbox--disabled {
  border-color: #e1e1e1;
  cursor: not-allowed;
  opacity: 0.5;
}

.terms__check-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-border-checkbox-basic-default);
}

/* Title styles */
.terms__title {
  color: var(--color-text-font-1);
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.32px;
  flex: 1;
  min-width: 0;
}

/* Arrow button styles */
.terms__arrow-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-icon-gray600);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.terms__arrow-btn:hover {
  color: var(--color-text-font-1);
}

.terms__arrow-btn:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
  border-radius: 4px;
}

.terms__arrow-btn--rotated {
  transform: rotate(90deg);
}

/* Divider styles */
.terms__divider {
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
  border: none;
  margin: 0;
}

/* Terms list styles */
.terms__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 272px; /* Fixed width from Figma */
}

.terms__list-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.terms__item-check-section {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

/* Small checkbox styles for list items */
.terms__item-checkbox {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  position: relative;
}

.terms__item-checkbox:hover {
  opacity: 0.8;
}

.terms__item-checkbox:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
  border-radius: 4px;
}

.terms__item-check-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-border-checkbox-basic-default);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Item text styles */
.terms__item-text {
  color: var(--color-text-font-3);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.28px;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
}

/* Item arrow button styles */
.terms__item-arrow-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-icon-gray600);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.terms__item-arrow-btn:hover {
  color: var(--color-text-font-1);
}

.terms__item-arrow-btn:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
  border-radius: 4px;
}

/* State modifiers */
.terms--close .terms__list {
  display: none;
}

.terms--close .terms__divider {
  display: none;
}

.terms--disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Accessibility improvements */
.terms__checkbox[aria-disabled="true"],
.terms__item-checkbox[aria-disabled="true"] {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Focus management */
.terms__checkbox:focus-visible,
.terms__item-checkbox:focus-visible,
.terms__arrow-btn:focus-visible,
.terms__item-arrow-btn:focus-visible {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .terms__content {
    padding: 16px;
    gap: 16px;
  }
  
  .terms__list {
    width: 100%;
    gap: 10px;
  }
  
  .terms__title {
    font-size: 15px;
    line-height: 22px;
  }
  
  .terms__item-text {
    font-size: 13px;
    line-height: 20px;
  }
}

/* Animation for smooth expansion/collapse */
.terms__list {
  overflow: hidden;
  transition: all 0.3s ease;
}

.terms--open .terms__arrow-btn {
  transition: transform 0.3s ease;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .terms__checkbox {
    border-width: 2px;
  }
  
  .terms__item-checkbox {
    border: 1px solid currentColor;
    border-radius: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .terms__checkbox,
  .terms__arrow-btn,
  .terms__item-checkbox,
  .terms__item-arrow-btn,
  .terms__list {
    transition: none;
  }
  
  .terms__arrow-btn--rotated {
    transition: none;
  }
}
</style>