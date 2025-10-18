<template>
  <div
    class="additional-info-selection"
    data-testid="additional-info-selection"
    data-node-id="1:2646"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2659">
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
    <div class="page__contents" data-node-id="1:2647">
      <!-- Title -->
      <div class="page__title" data-node-id="1:2648">
        <h1 class="page__title-text" data-node-id="1:2649">
          추가정보를 선택해 주세요
        </h1>
      </div>

      <!-- Search Section -->
      <div class="page__search-section" data-node-id="1:2650">
        <div class="search-label-container">
          <div class="search-label" data-node-id="1:2651">
            <span class="search-label-text">권유직원</span>
            <TooltipIcon
              :show="true"
              tooltip-text="권유직원 정보 안내"
              @click="handleTooltipClick"
            />
          </div>
        </div>
        <div class="search-input-container">
          <div class="custom-search-wrapper">
            <Input
              v-model:value="selectedEmployee"
              state="inactive"
              :label="false"
              :message="false"
              placeholder-text="(선택) 직원명 선택"
              @input="handleEmployeeInput"
              @blur="handleEmployeeBlur"
            />
            <div class="search-icon-overlay">
              <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="#929292" stroke-width="2"/>
                <path d="m21 21-4.35-4.35" stroke="#929292" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Radio Section -->
      <div class="page__radio-section" data-node-id="1:2653">
        <!-- Radio Label -->
        <div class="radio-label-container" data-node-id="1:2654">
          <span class="radio-label-text">NH포인트 사용 신청</span>
        </div>

        <!-- Radio Group -->
        <div class="radio-group" data-node-id="1:2655">
          <Radio
            v-model="nhPointUsage"
            :options="nhPointOptions"
            @change="handleNhPointChange"
          />
        </div>

        <!-- Description Text -->
        <div class="description-text" data-node-id="1:2658">
          <p class="description-line">NH포인트를 현금처럼 사용해 보세요.</p>
          <p class="description-line">캐시백을 신청하면 바로 출금계좌로 입금됩니다.</p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="1:2662">
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
import Input from '../components/Input.vue'
import TooltipIcon from '../components/TooltipIcon.vue'
import Radio from '../components/Radio.vue'
import Cta from '../components/Cta.vue'
import type {
  AdditionalInfoSelectionData,
  NavigationEvent,
  RadioOption,
  NhPointUsage
} from '../types/additionalInfoSelectionTypes'
import {
  DEFAULT_ADDITIONAL_INFO_SELECTION_DATA,
  ADDITIONAL_INFO_SELECTION_CONSTANTS
} from '../types/additionalInfoSelectionTypes'

// Page state
const pageData = ref<AdditionalInfoSelectionData>(DEFAULT_ADDITIONAL_INFO_SELECTION_DATA)

// Form states
const selectedEmployee = ref<string>('') // Optional employee selection
const nhPointUsage = ref<NhPointUsage>('not-use') // Default to "사용안함" as shown in Figma

// NH Point options from Figma
const nhPointOptions = ref<RadioOption[]>([
  { label: '사용안함', value: 'not-use' },
  { label: '사용함', value: 'use' }
])

// Computed properties
const progressRatio = computed(() => ADDITIONAL_INFO_SELECTION_CONSTANTS.PROGRESS_RATIO)

const isFormValid = computed(() => {
  // Form is always valid since both fields are optional or have defaults
  return true
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

// Event handlers - Employee Input
const handleEmployeeInput = (event: Event, value: string) => {
  console.log('Employee input changed:', value)
  selectedEmployee.value = value
  updatePageData()
}

const handleEmployeeBlur = (event: FocusEvent) => {
  console.log('Employee input blurred')
  // Could add employee validation feedback here
}

const handleTooltipClick = () => {
  console.log('Tooltip clicked - showing employee referral info')
  // TODO: Show tooltip with employee referral information
}

// Event handlers - NH Point
const handleNhPointChange = (value: string | number | null) => {
  console.log('NH Point usage changed:', value)
  nhPointUsage.value = value as NhPointUsage
  updatePageData()
}

const handleNext = () => {
  if (isFormValid.value) {
    console.log('Proceeding with additional info:', {
      employee: selectedEmployee.value,
      nhPointUsage: nhPointUsage.value
    })
    // TODO: Navigate to next step
  }
}

// Helper functions
const updatePageData = () => {
  pageData.value = {
    selectedEmployee: selectedEmployee.value,
    nhPointUsage: nhPointUsage.value,
    isFormValid: isFormValid.value
  }
}

// Lifecycle hooks
onMounted(() => {
  updatePageData()
  console.log('AdditionalInfoSelection mounted with initial data:', pageData.value)
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.additional-info-selection {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-font-4: #767676;
  --color-green-primary: #19973c;
  --color-border: #e1e1e1;
  --color-border-light: #f0f0f0;
  --heading-h2-semibold-size: 22px;
  --heading-h2-semibold-weight: 600;
  --heading-h2-semibold-line-height: 32px;
  --body3-medium-size: 14px;
  --body3-medium-weight: 500;
  --body3-medium-line-height: 22px;
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
  width: 312px;
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

/* Search Section */
.page__search-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.search-label-container {
  height: 22px;
  width: 100%;
}

.search-label {
  display: flex;
  gap: 2px;
  height: 24px;
  align-items: center;
}

.search-label-text {
  font-family: 'Pretendard', sans-serif;
  font-size: var(--body3-medium-size);
  font-weight: var(--body3-medium-weight);
  line-height: var(--body3-medium-line-height);
  letter-spacing: -0.28px;
  color: #505050;
  white-space: pre;
}

.search-input-container {
  width: 100%;
}

.custom-search-wrapper {
  position: relative;
  width: 100%;
}

.search-icon-overlay {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
}

.search-icon {
  width: 24px;
  height: 24px;
}

/* Radio Section */
.page__radio-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.radio-label-container {
  display: flex;
  gap: 2px;
  height: 22px;
  align-items: center;
}

.radio-label-text {
  font-family: 'Pretendard', sans-serif;
  font-size: var(--body3-medium-size);
  font-weight: var(--body3-medium-weight);
  line-height: var(--body3-medium-line-height);
  letter-spacing: -0.28px;
  color: #505050;
  white-space: pre;
}

.radio-group {
  width: 100%;
}

/* Description Text */
.description-text {
  width: 100%;
  font-family: 'Pretendard', sans-serif;
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  letter-spacing: -0.26px;
  color: var(--color-text-font-4);
}

.description-line {
  margin: 0;
  margin-bottom: 0;
}

.description-line:not(:last-child) {
  margin-bottom: 0;
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
  .additional-info-selection {
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
  .additional-info-selection * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .additional-info-selection {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .additional-info-selection {
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