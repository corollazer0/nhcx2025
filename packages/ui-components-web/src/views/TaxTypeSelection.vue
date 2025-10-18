<template>
  <div
    class="tax-type-selection"
    data-testid="tax-type-selection"
    data-node-id="1:2612"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2626">
      <Navigation
        :previous="true"
        :title="true"
        title1="청약 가입"
        :cs="true"
        :cancel="true"
        @previous="handlePrevious"
        @cs="handleCs"
        @cancel="handleCancel"
      />
      <Progress
        :ratio="progressRatio"
        :show-animation="false"
        size="md"
        color="green"
      />
    </div>

    <!-- Contents Section -->
    <div class="page__contents" data-node-id="1:2613">
      <!-- Title -->
      <div class="page__title" data-node-id="1:2614">
        <h1 class="page__title-text" data-node-id="1:2615">
          과세유형을 선택해 주세요
        </h1>
      </div>

      <!-- Radio Section -->
      <div class="page__radio-section" data-node-id="1:2616">
        <!-- Radio Group -->
        <div class="page__radio-group" data-node-id="1:2617">
          <Radio
            v-model="selectedTaxType"
            :options="taxTypeOptions"
            @change="handleTaxTypeChange"
          />
        </div>

        <!-- Description Text -->
        <p class="page__description" data-node-id="1:2620">
          비과세 가입 시 총 이자소득 500만원(납입금액 연 600만원 한도)에 대하여 과세하지 않습니다.
        </p>

        <!-- Tooltip Section -->
        <div class="page__tooltip-section" data-node-id="1:2621">
          <span class="tooltip__label" data-node-id="1:2622">비과세 대상자</span>
          <button
            type="button"
            class="tooltip__icon-button"
            data-node-id="1:2623"
            @click="handleTooltipClick"
            aria-label="비과세 대상자 정보 보기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#767676" stroke-width="1.5"/>
              <path d="M12 8v4" stroke="#767676" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="12" cy="16" r="1" fill="#767676"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="1:2629">
      <Cta
        :disabled="!isFormValid"
        primary-text="다음"
        @primary="handleNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Radio from '../components/Radio.vue'
import Cta from '../components/Cta.vue'
import type {
  TaxTypeSelectionData,
  NavigationEvent,
  RadioOption,
  TaxType
} from '../types/taxTypeSelectionTypes'
import {
  DEFAULT_TAX_TYPE_SELECTION_DATA,
  TAX_TYPE_SELECTION_CONSTANTS
} from '../types/taxTypeSelectionTypes'

// Page state
const pageData = ref<TaxTypeSelectionData>(DEFAULT_TAX_TYPE_SELECTION_DATA)

// Form states
const selectedTaxType = ref<TaxType>('tax-free') // Default to "비과세" as shown in Figma

// Tax type options
const taxTypeOptions = ref<RadioOption[]>([
  { label: '일반과세', value: 'general' },
  { label: '비과세', value: 'tax-free' }
])

// Computed properties
const progressRatio = computed(() => TAX_TYPE_SELECTION_CONSTANTS.PROGRESS_RATIO)

const isFormValid = computed(() => {
  return !!selectedTaxType.value
})

// Event handlers - Navigation
const handlePrevious = (event: NavigationEvent) => {
  console.log('Previous button clicked', event)
  // TODO: Navigate to previous step
}

const handleCs = (event: NavigationEvent) => {
  console.log('CS center button clicked', event)
  // TODO: Open CS center
}

const handleCancel = (event: NavigationEvent) => {
  console.log('Cancel button clicked', event)
  // TODO: Handle cancellation
}

// Event handlers - Form
const handleTaxTypeChange = (value: string | number | null) => {
  console.log('Tax type changed:', value)
  selectedTaxType.value = value as TaxType
  updatePageData()
}

const handleTooltipClick = () => {
  console.log('Tooltip clicked - showing tax-free eligibility info')
  // TODO: Show tooltip or modal with tax-free eligibility information
}

const handleNext = () => {
  if (isFormValid.value) {
    console.log('Proceeding with tax type:', selectedTaxType.value)
    // TODO: Navigate to next step
  }
}

// Helper functions
const updatePageData = () => {
  pageData.value = {
    selectedTaxType: selectedTaxType.value,
    isFormValid: isFormValid.value
  }
}

// Lifecycle hooks
onMounted(() => {
  updatePageData()
  console.log('TaxTypeSelection mounted with initial data:', pageData.value)
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.tax-type-selection {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-font-4: #767676;
  --color-green-primary: #19973c;
  --color-border: #e1e1e1;
  --color-border-light: #f0f0f0;
  --heading-h2-semibold-size: 22px;
  --heading-h2-semibold-weight: 600;
  --heading-h2-semibold-line-height: 32px;
  --body2-regular-size: 15px;
  --body2-regular-weight: 400;
  --body2-regular-line-height: 24px;
  --caption1-regular-size: 13px;
  --caption1-regular-weight: 400;
  --caption1-regular-line-height: 20px;
  --border-radius-12: 12px;
  --border-radius-10: 10px;

  background-color: var(--color-bg-default);
  position: relative;
  width: 360px;
  height: 760px;
  font-family: 'Pretendard', sans-serif;
  overflow: hidden;
}

/* Header Section - Exact Figma positioning */
.page__header {
  position: absolute;
  left: 0;
  right: 0;
  top: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

/* Contents Section - Exact Figma positioning and layout */
.page__contents {
  position: absolute;
  left: 24px;
  right: 24px;
  top: 120px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 32px;
}

/* Title Styling */
.page__title {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.page__title-text {
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-size: var(--heading-h2-semibold-size);
  font-weight: var(--heading-h2-semibold-weight);
  line-height: var(--heading-h2-semibold-line-height);
  letter-spacing: -0.44px;
  color: var(--color-text-font-1);
  margin: 0;
  text-align: left;
  min-width: 0;
}

/* Radio Section */
.page__radio-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.page__radio-group {
  width: 100%;
}

/* Description Text */
.page__description {
  font-family: 'Pretendard', sans-serif;
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  letter-spacing: -0.26px;
  color: var(--color-text-font-4);
  margin: 0;
  text-align: left;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* Tooltip Section */
.page__tooltip-section {
  display: flex;
  align-items: center;
  gap: 2px;
}

.tooltip__label {
  font-family: 'Pretendard', sans-serif;
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  letter-spacing: -0.26px;
  color: var(--color-text-font-4);
  white-space: pre;
}

.tooltip__icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.2s;
}

.tooltip__icon-button:hover {
  opacity: 0.7;
}

.tooltip__icon-button:focus {
  outline: 2px solid var(--color-green-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* CTA Section */
.page__cta {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .tax-type-selection {
    width: 100vw;
    height: 100vh;
    max-width: 480px;
  }

  .page__contents {
    left: 24px;
    right: 24px;
    width: auto;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .tax-type-selection * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .tax-type-selection {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .tax-type-selection {
    width: 100%;
    height: auto;
    background: white;
    color: black;
  }

  .page__header,
  .page__contents,
  .page__cta {
    position: relative;
    width: 100%;
    left: auto;
    top: auto;
    bottom: auto;
    transform: none;
  }
}
</style>