<template>
  <div 
    class="general-list"
    :class="generalListClasses"
    data-testid="general-list"
  >
    <!-- Header Section -->
    <div v-if="showHeader" class="general-list__header">
      <!-- Labels -->
      <div v-if="labels && labels.length > 0" class="general-list__labels">
        <div
          v-for="label in labels"
          :key="label.id"
          class="general-list__label"
          :class="`general-list__label--${label.variant}`"
        >
          {{ label.text }}
        </div>
      </div>

      <!-- Title Section -->
      <div v-if="title || subtitle || showCheckbox" class="general-list__title-section">
        <div class="general-list__title-content">
          <div v-if="title" class="general-list__title-wrapper">
            <h3 class="general-list__title">{{ title }}</h3>
            <button
              v-if="showTooltip"
              class="general-list__tooltip-button"
              type="button"
              @click="handleTooltipClick"
              aria-label="도움말"
            >
              <TooltipIcon />
            </button>
          </div>
          <div v-if="subtitle" class="general-list__subtitle">{{ subtitle }}</div>
        </div>
        <div v-if="showCheckbox" class="general-list__checkbox-wrapper">
          <Checkbox
            v-model="isChecked"
            :text="checkboxText"
            :showText="showCheckboxText"
            :size="checkboxSize"
            :state="computedCheckboxState"
            @change="handleCheckboxChange"
          />
        </div>
      </div>
    </div>

    <!-- Data List -->
    <div v-if="dataList && dataList.length > 0" class="general-list__data">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="general-list__data-item"
      >
        <div class="general-list__data-title">{{ item.title }}</div>
        <div 
          class="general-list__data-value"
          :class="{ 'general-list__data-value--negative': item.isNegative }"
        >
          {{ item.value }}
        </div>
      </div>
    </div>

    <!-- Button Section -->
    <div v-if="buttonText" class="general-list__button-section">
      <button
        class="general-list__button"
        :class="`general-list__button--${buttonVariant}`"
        type="button"
        :disabled="buttonDisabled"
        @click="handleButtonClick"
      >
        {{ buttonText }}
      </button>
    </div>

    <!-- Close Button -->
    <button
      v-if="showCloseButton"
      class="general-list__close-button"
      type="button"
      @click="handleCloseClick"
      aria-label="닫기"
    >
      <img 
        src="../assets/ico_cancel2_fill_24.svg" 
        alt="close"
        class="general-list__close-icon"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Checkbox from './Checkbox.vue';
import TooltipIcon from './TooltipIcon.vue';

interface Label {
  id: string;
  text: string;
  variant: 'navy' | 'orange' | 'gray';
}

interface DataItem {
  title: string;
  value: string;
  isNegative?: boolean;
}

interface GeneralListProps {
  // Header props
  showHeader?: boolean;
  labels?: Label[];
  title?: string;
  subtitle?: string;
  showTooltip?: boolean;
  showCheckbox?: boolean;
  modelValue?: boolean;
  
  // Checkbox props
  checkboxText?: string;
  showCheckboxText?: boolean;
  checkboxSize?: 'sm' | 'xs';
  checkboxState?: 'default' | 'selected' | 'disabled' | 'select-disabled';
  
  // Data props
  dataList?: DataItem[];
  
  // Button props
  buttonText?: string;
  buttonVariant?: 'primary' | 'secondary' | 'tertiary';
  buttonDisabled?: boolean;
  
  // Other props
  showCloseButton?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'compact';
}

const props = withDefaults(defineProps<GeneralListProps>(), {
  showHeader: true,
  labels: () => [],
  title: '',
  subtitle: '',
  showTooltip: false,
  showCheckbox: false,
  modelValue: false,
  checkboxText: '',
  showCheckboxText: false,
  checkboxSize: 'sm',
  checkboxState: 'default',
  dataList: () => [],
  buttonText: '',
  buttonVariant: 'secondary',
  buttonDisabled: false,
  showCloseButton: false,
  disabled: false,
  variant: 'default'
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'tooltip-click': [];
  'button-click': [];
  'close-click': [];
  'checkbox-change': [checked: boolean];
}>();

const isChecked = ref(props.modelValue);

// Watch for modelValue changes to sync checkbox state
watch(() => props.modelValue, (newValue) => {
  isChecked.value = newValue;
});

const generalListClasses = computed(() => [
  `general-list--${props.variant}`,
  {
    'general-list--disabled': props.disabled
  }
]);

// Compute checkbox state based on props and current state
const computedCheckboxState = computed(() => {
  if (props.disabled) {
    return isChecked.value ? 'select-disabled' : 'disabled';
  }
  return isChecked.value ? 'selected' : 'default';
});

const handleCheckboxChange = () => {
  emit('update:modelValue', isChecked.value);
  emit('checkbox-change', isChecked.value);
};

const handleTooltipClick = () => {
  emit('tooltip-click');
};

const handleButtonClick = () => {
  emit('button-click');
};

const handleCloseClick = () => {
  emit('close-click');
};
</script>

<style scoped>
/* Design tokens from Figma */
.general-list {
  --color-bg-default: #ffffff;
  --color-border-line-2: #e1e1e1;
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-text-font-4: #767676;
  --color-text-negative: #ec0c0c;
  --color-text-label-navy: #015aac;
  --color-border-label-navy: #015aac;
  --color-text-label-orange: #d44b10;
  --color-border-label-orange: #d44b10;
  --color-text-button-secondary-default: #19973c;
  --color-bg-button-secondary-default: #ffffff;
  --color-border-button-secondary-default: #19973c;
  --color-text-button-tertiary-default: #121212;
  --color-bg-button-tertiary-default: #ffffff;
  --color-border-button-tertiary-default: #d3d3d3;
  --color-icon-gray600: #707070;
  --color-icon-gray900: #111111;
  --border-radius-4: 4px;
  --border-radius-8: 8px;
  --border-radius-16: 16px;
  --font-family-pretendard: 'Pretendard', sans-serif;

  background-color: var(--color-bg-default);
  border: 1px solid var(--color-border-line-2);
  border-radius: var(--border-radius-16);
  padding: 20px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.general-list--disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Header Section */
.general-list__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.general-list__labels {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.general-list__label {
  border-radius: var(--border-radius-4);
  padding: 3px 8px 2px;
  font-family: var(--font-family-pretendard);
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: -0.2px;
  text-align: center;
  border: 1px solid;
}

.general-list__label--navy {
  color: var(--color-text-label-navy);
  border-color: var(--color-border-label-navy);
}

.general-list__label--orange {
  color: var(--color-text-label-orange);
  border-color: var(--color-border-label-orange);
}

.general-list__label--gray {
  color: #767676;
  border-color: #707070;
}

/* Title Section */
.general-list__title-section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
}

.general-list__title-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.general-list__title-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 4px;
  max-width: 235px;
}

.general-list__title {
  font-family: var(--font-family-pretendard);
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--color-text-font-1);
  margin: 0;
  max-width: 200px;
  word-break: break-word;
}

.general-list__tooltip-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.general-list__subtitle {
  font-family: var(--font-family-pretendard);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-font-4);
  width: 100%;
}

.general-list__checkbox-wrapper {
  flex-shrink: 0;
}

/* Data List */
.general-list__data {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.general-list__data:not(:last-child) {
  margin-bottom: 20px;
}

.general-list__data-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
}

.general-list__data-title {
  width: 108px;
  font-family: var(--font-family-pretendard);
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: var(--color-text-font-3);
  flex-shrink: 0;
}

.general-list__data-value {
  flex: 1;
  font-family: var(--font-family-pretendard);
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: var(--color-text-font-1);
  text-align: right;
}

.general-list__data-value--negative {
  color: var(--color-text-negative);
}

/* Button Section */
.general-list__button-section {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.general-list__button {
  border: 1px solid;
  border-radius: var(--border-radius-8);
  padding: 7px 12px;
  font-family: var(--font-family-pretendard);
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.28px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 0;
}

.general-list__button--secondary {
  color: var(--color-text-button-secondary-default);
  border-color: var(--color-border-button-secondary-default);
  background-color: var(--color-bg-button-secondary-default);
}

.general-list__button--tertiary {
  color: var(--color-text-button-tertiary-default);
  border-color: var(--color-border-button-tertiary-default);
  background-color: var(--color-bg-button-tertiary-default);
}

.general-list__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.general-list__button--secondary:hover:not(:disabled) {
  background-color: var(--color-text-button-secondary-default);
  color: white;
}

.general-list__button--tertiary:hover:not(:disabled) {
  background-color: #f8f8f8;
}

/* Close Button */
.general-list__close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.general-list__close-button:hover {
  opacity: 0.7;
}

.general-list__close-icon {
  width: 24px;
  height: 24px;
  display: block;
}

/* Compact variant */
.general-list--compact .general-list__header {
  margin-bottom: 0;
}
</style>