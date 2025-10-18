<template>
  <div
    class="auto-transfer-setup"
    data-testid="auto-transfer-setup"
    data-node-id="1:2594"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2606">
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
    <div class="page__contents" data-node-id="1:2595">
      <!-- Title -->
      <div class="page__title" data-node-id="1:2596">
        <h1 class="page__title-text" data-node-id="1:2597">
          자동이체를 신청하시겠어요?
        </h1>
      </div>

      <!-- Radio Section -->
      <div class="page__radio-section" data-node-id="1:2598">
        <div class="page__radio-group" data-node-id="1:2599">
          <Radio
            v-model="selectedOption"
            :options="radioOptions"
            :show-tooltip="true"
            :show-text="true"
            message-text="자동이체 신청 안내"
            :tooltip-items="tooltipItems"
            @tooltip:open="handleTooltipOpen"
            @tooltip:close="handleTooltipClose"
          />
        </div>
      </div>

    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="1:2609">
      <Cta
        :disabled="!isFormValid"
        primary-text="다음"
        @primary="handleNext"
      />
    </div>

    <!-- Tooltip Overlay -->
    <div
      v-if="showTooltip"
      class="page__tooltip-overlay"
      @click="handleTooltipClose"
    >
      <div class="page__tooltip-container" data-node-id="1:2611" @click.stop>
        <!-- Tooltip Header -->
        <div class="tooltip__header">
          <h2 class="tooltip__title">자동이체 신청 안내</h2>
          <button
            type="button"
            class="tooltip__close-button"
            @click="handleTooltipClose"
            aria-label="닫기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <!-- Tooltip Content -->
        <div class="tooltip__content">
          <div
            v-for="(item, index) in tooltipItems"
            :key="index"
            class="tooltip__item"
          >
            <div class="tooltip__bullet"></div>
            <p class="tooltip__text">{{ item.text }}</p>
          </div>
        </div>
      </div>
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
  AutoTransferSetupData,
  NavigationEvent,
  RadioOption,
  TooltipItem
} from '../types/autoTransferSetupTypes'
import {
  DEFAULT_AUTO_TRANSFER_SETUP_DATA,
  AUTO_TRANSFER_SETUP_CONSTANTS
} from '../types/autoTransferSetupTypes'

// Page state
const pageData = ref<AutoTransferSetupData>(DEFAULT_AUTO_TRANSFER_SETUP_DATA)

// Form states
const selectedOption = ref<string>('apply') // Default to "신청함"
const selectedDate = ref<string>('2023-08-23')
const currentAmount = ref<number>(100000) // Default 100,000원
const showTooltip = ref<boolean>(true) // Show tooltip by default to match Figma

// Radio options
const radioOptions = ref<RadioOption[]>([
  { label: '신청안함', value: 'no-apply' },
  { label: '신청함', value: 'apply' }
])


// Tooltip items
const tooltipItems = ref<TooltipItem[]>([
  {
    text: '초입금 출금계좌가 다른은행 계좌인 경우, 해지 시 입금계좌로 선택한 농협은행 계좌에서 출금됩니다.'
  },
  {
    text: '국민주택을 청약하는 경우 매회 납입금액 중 최대 25만원까지 인정되며, 매월 납입하는 것이 청약자격(순위) 발생조건에 유리합니다. 자동이체일은 신규일 이후로 선택하면 납입인정일이 지연될 수 있습니다.'
  },
  {
    text: '자동이체일이 토/일/공휴일이면 익영업일에 이체됩니다. 같은 이유로 다음 연도에 이체되는 경우 실제 입금된 과세연도의 소득공제 금액에 포함됩니다.'
  }
])

// Computed properties
const progressRatio = computed(() => AUTO_TRANSFER_SETUP_CONSTANTS.PROGRESS_RATIO)


const isFormValid = computed(() => {
  return !!selectedOption.value // Only require radio selection
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


const handleTooltipOpen = () => {
  console.log('Tooltip opened')
  showTooltip.value = true
}

const handleTooltipClose = () => {
  console.log('Tooltip closed')
  showTooltip.value = false
}

const handleNext = () => {
  if (isFormValid.value) {
    console.log('Proceeding with auto transfer setup:', {
      option: selectedOption.value
    })
    // TODO: Navigate to next step
  }
}

// Helper functions
const updatePageData = () => {
  pageData.value = {
    autoTransferEnabled: selectedOption.value === 'apply',
    amount: currentAmount.value,
    startDate: selectedDate.value, // Keep for data consistency
    isFormValid: isFormValid.value
  }
}

// Lifecycle hooks
onMounted(() => {
  updatePageData()
  console.log('AutoTransferSetup mounted with initial data:', pageData.value)
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.auto-transfer-setup {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-font-4: #767676;
  --color-green-primary: #19973c;
  --color-border: #e1e1e1;
  --color-border-light: #f0f0f0;
  --heading-h2-semibold-size: 22px;
  --heading-h2-semibold-weight: 600;
  --heading-h2-semibold-line-height: 32px;
  --heading-h4-medium-size: 18px;
  --heading-h4-medium-weight: 500;
  --heading-h4-medium-line-height: 26px;
  --body3-medium-size: 14px;
  --body3-medium-weight: 500;
  --body3-medium-line-height: 22px;
  --caption1-regular-size: 13px;
  --caption1-regular-weight: 400;
  --caption1-regular-line-height: 20px;
  --border-radius-12: 12px;
  --border-radius-10: 10px;
  --border-radius-16: 16px;

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
  left: 50%;
  top: 120px;
  transform: translateX(-50%);
  width: 312px;
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

/* Tooltip Overlay */
.page__tooltip-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  box-sizing: border-box;
}

.page__tooltip-container {
  position: relative;
  width: 100%;
  max-width: 312px;
  margin-top: 276px; /* Position to match Figma (300px - 24px padding) */
  background-color: white;
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-16);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
}

/* Tooltip Header */
.tooltip__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.tooltip__title {
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--color-text-font-1);
  margin: 0;
}

.tooltip__close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;
}

.tooltip__close-button:hover {
  color: var(--color-text-font-1);
}

.tooltip__close-button:focus {
  outline: 2px solid var(--color-green-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Tooltip Content */
.tooltip__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tooltip__item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.tooltip__bullet {
  width: 4px;
  height: 4px;
  background-color: #707070;
  border-radius: 50%;
  margin-top: 9px; /* Align with first line of text */
  flex-shrink: 0;
}

.tooltip__text {
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: #505050;
  margin: 0;
  word-break: keep-all;
  overflow-wrap: break-word;
  text-align: left;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .auto-transfer-setup {
    width: 100vw;
    height: 100vh;
    max-width: 480px;
  }

  .page__contents {
    width: calc(100vw - 48px);
    left: 50%;
    transform: translateX(-50%);
    max-width: 312px;
  }

  .page__tooltip-overlay {
    padding: 16px;
  }

  .page__tooltip-container {
    max-width: calc(100vw - 32px);
    margin-top: 200px; /* Adjust for smaller screens */
  }

  .tooltip__text {
    font-size: 13px;
    line-height: 20px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .auto-transfer-setup * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .auto-transfer-setup {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .auto-transfer-setup {
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

  .page__tooltip-overlay {
    display: none;
  }
}
</style>