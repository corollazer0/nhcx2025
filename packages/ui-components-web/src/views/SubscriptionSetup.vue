<template>
  <div
    class="subscription-setup"
    data-testid="subscription-setup"
    data-node-id="1:2568"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2580">
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
    <div class="page__contents" data-node-id="1:2569">
      <!-- Section 1: Address Verification -->
      <div class="page__section" data-node-id="1:2570">
        <!-- Title -->
        <div class="page__title" data-node-id="1:2571">
          <h1 class="page__title-text" data-node-id="1:2572">
            {{ SUBSCRIPTION_SETUP_CONSTANTS.SECTION_1.TITLE }}
          </h1>
        </div>

        <!-- Search Inputs -->
        <div class="page__search" data-node-id="1:2573">
          <!-- Address Search Input -->
          <div class="page__input-wrapper" data-node-id="1:2574">
            <Input
              v-model="addressValue"
              :state="addressState"
              :placeholder-text="SUBSCRIPTION_SETUP_CONSTANTS.SECTION_1.ADDRESS_PLACEHOLDER"
              :label="false"
              :message="false"
              @input="handleAddressInput"
              @focus="handleAddressFocus"
              @blur="handleAddressBlur"
            />
          </div>

          <!-- Bank Input -->
          <div class="page__input-wrapper" data-node-id="1:2575">
            <Input
              v-model="bankValue"
              :state="bankState"
              :placeholder-text="SUBSCRIPTION_SETUP_CONSTANTS.SECTION_1.BANK_PLACEHOLDER"
              :label="false"
              :message="false"
              @input="handleBankInput"
              @focus="handleBankFocus"
              @blur="handleBankBlur"
            />
          </div>
        </div>
      </div>

      <!-- Section 2: Amount Setup -->
      <div class="page__section" data-node-id="1:2576">
        <!-- Title -->
        <div class="page__title" data-node-id="1:2577">
          <h2 class="page__title-text" data-node-id="1:2578">
            {{ SUBSCRIPTION_SETUP_CONSTANTS.SECTION_2.TITLE }}
          </h2>
        </div>

        <!-- Amount Range Selector -->
        <div class="page__amount-selector" data-node-id="1:2579">
          <Select
            v-model="selectedAmountRange"
            :placeholder="SUBSCRIPTION_SETUP_CONSTANTS.SECTION_2.AMOUNT_PLACEHOLDER"
            :options="amountRangeOptions"
            variant="default"
            @change="handleAmountRangeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Input from '../components/Input.vue'
import Select from '../components/Select.vue'
import type {
  SubscriptionSetupData,
  NavigationEvent,
  AmountRangeOption
} from '../types/subscriptionSetupTypes'
import {
  DEFAULT_SUBSCRIPTION_SETUP_DATA,
  SUBSCRIPTION_SETUP_CONSTANTS
} from '../types/subscriptionSetupTypes'

// Page state
const pageData = ref<SubscriptionSetupData>(DEFAULT_SUBSCRIPTION_SETUP_DATA)

// Input states
const addressValue = ref<string>('04517 서울시 중구 통일로 120')
const bankValue = ref<string>('NH농협은행')
const selectedAmountRange = ref<string | null>(null)

// Input UI states
const addressState = ref<'inactive' | 'focus' | 'filled' | 'error' | 'success'>('filled')
const bankState = ref<'inactive' | 'focus' | 'filled' | 'error' | 'success'>('filled')

// Amount range options
const amountRangeOptions = ref<AmountRangeOption[]>([
  { label: '2만원 ~ 10만원', value: '20000-100000' },
  { label: '10만원 ~ 50만원', value: '100000-500000' },
  { label: '50만원 ~ 100만원', value: '500000-1000000' },
  { label: '100만원 ~ 500만원', value: '1000000-5000000' },
  { label: '500만원 ~ 1,500만원', value: '5000000-15000000' },
  { label: '2만원 ~ 1,500만원', value: '20000-15000000' }
])

// Computed properties
const progressRatio = computed(() => SUBSCRIPTION_SETUP_CONSTANTS.PROGRESS_RATIO)

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

// Event handlers - Address Input
const handleAddressInput = (value: string) => {
  console.log('Address input changed:', value)
  addressValue.value = value
  updatePageData()
}

const handleAddressFocus = () => {
  addressState.value = 'focus'
}

const handleAddressBlur = () => {
  addressState.value = addressValue.value ? 'filled' : 'inactive'
}

// Event handlers - Bank Input
const handleBankInput = (value: string) => {
  console.log('Bank input changed:', value)
  bankValue.value = value
  updatePageData()
}

const handleBankFocus = () => {
  bankState.value = 'focus'
}

const handleBankBlur = () => {
  bankState.value = bankValue.value ? 'filled' : 'inactive'
}

// Event handlers - Amount Range Selector
const handleAmountRangeChange = (value: string | number | null) => {
  console.log('Amount range selected:', value)
  selectedAmountRange.value = value as string

  if (value) {
    const selectedOption = amountRangeOptions.value.find(option => option.value === value)
    if (selectedOption) {
      pageData.value.selectedAmountRange = selectedOption
    }
  }
  updatePageData()
}

// Helper functions
const updatePageData = () => {
  pageData.value = {
    address: addressValue.value,
    bank: bankValue.value,
    selectedAmountRange: pageData.value.selectedAmountRange,
    isAddressValid: !!addressValue.value,
    isBankValid: !!bankValue.value,
    isAmountRangeSelected: !!selectedAmountRange.value
  }
}

// Lifecycle hooks
onMounted(() => {
  // Initialize page data with default values
  updatePageData()
  console.log('SubscriptionSetup mounted with initial data:', pageData.value)
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.subscription-setup {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --heading-h2-semibold-size: 22px;
  --heading-h2-semibold-weight: 600;
  --heading-h2-semibold-line-height: 32px;
  --heading-h4-medium-size: 18px;
  --heading-h4-medium-weight: 500;
  --heading-h4-medium-line-height: 26px;
  --border-radius-12: 12px;

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
  gap: 40px;
}

/* Section Styling */
.page__section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  width: 100%;
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

/* Search Section Styling */
.page__search {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
}

.page__input-wrapper {
  width: 100%;
}

/* Amount Selector Styling */
.page__amount-selector {
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .subscription-setup {
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
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .subscription-setup * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .subscription-setup {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .subscription-setup {
    width: 100%;
    height: auto;
    background: white;
    color: black;
  }

  .page__header,
  .page__contents {
    position: relative;
    width: 100%;
    left: auto;
    top: auto;
    transform: none;
  }
}
</style>