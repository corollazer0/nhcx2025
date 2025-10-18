<template>
  <div
    class="contract-delivery-selection"
    data-testid="contract-delivery-selection"
    data-node-id="1:2631"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2641">
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
    <div class="page__contents" data-node-id="1:2632">
      <!-- Title -->
      <div class="page__title" data-node-id="1:2634">
        <h1 class="page__title-text" data-node-id="1:2635">
          계약서류는 어디로 보내드릴까요?
        </h1>
      </div>

      <!-- Radio Section -->
      <div class="page__radio-section" data-node-id="1:2636">
        <!-- Delivery Method Radio Group -->
        <div class="page__radio-group" data-node-id="1:2637">
          <Radio
            v-model="selectedDeliveryMethod"
            :options="deliveryMethodOptions"
            @change="handleDeliveryMethodChange"
          />
        </div>

        <!-- Email Input (only show when email is selected) -->
        <div
          v-if="selectedDeliveryMethod === 'email'"
          class="page__email-input"
          data-node-id="1:2640"
        >
          <Input
            v-model:value="emailAddress"
            state="inactive"
            :label="false"
            :message="false"
            placeholder-text="이메일 주소를 입력해주세요"
            @input="handleEmailInput"
            @blur="handleEmailBlur"
          />
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="1:2644">
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
import Input from '../components/Input.vue'
import Cta from '../components/Cta.vue'
import type {
  ContractDeliverySelectionData,
  NavigationEvent,
  RadioOption,
  DeliveryMethod
} from '../types/contractDeliverySelectionTypes'
import {
  DEFAULT_CONTRACT_DELIVERY_SELECTION_DATA,
  CONTRACT_DELIVERY_SELECTION_CONSTANTS
} from '../types/contractDeliverySelectionTypes'

// Page state
const pageData = ref<ContractDeliverySelectionData>(DEFAULT_CONTRACT_DELIVERY_SELECTION_DATA)

// Form states
const selectedDeliveryMethod = ref<DeliveryMethod>('email') // Default to "이메일" as shown in Figma
const emailAddress = ref<string>('') // Empty to show placeholder

// Delivery method options
const deliveryMethodOptions = ref<RadioOption[]>([
  { label: '이메일', value: 'email' },
  { label: '문자메시지', value: 'sms' }
])

// Computed properties
const progressRatio = computed(() => CONTRACT_DELIVERY_SELECTION_CONSTANTS.PROGRESS_RATIO)

const isFormValid = computed(() => {
  if (selectedDeliveryMethod.value === 'email') {
    return !!emailAddress.value && isValidEmail(emailAddress.value)
  } else if (selectedDeliveryMethod.value === 'sms') {
    return true // SMS doesn't require additional input
  }
  return false
})

// Validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

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
const handleDeliveryMethodChange = (value: string | number | null) => {
  console.log('Delivery method changed:', value)
  selectedDeliveryMethod.value = value as DeliveryMethod
  updatePageData()
}

const handleEmailInput = (event: Event, value: string) => {
  console.log('Email input changed:', value)
  emailAddress.value = value
  updatePageData()
}

const handleEmailBlur = (event: FocusEvent) => {
  console.log('Email input blurred')
  // Could add email validation feedback here
}

const handleNext = () => {
  if (isFormValid.value) {
    console.log('Proceeding with delivery method:', {
      method: selectedDeliveryMethod.value,
      email: selectedDeliveryMethod.value === 'email' ? emailAddress.value : undefined
    })
    // TODO: Navigate to next step
  }
}

// Helper functions
const updatePageData = () => {
  pageData.value = {
    deliveryMethod: selectedDeliveryMethod.value,
    emailAddress: selectedDeliveryMethod.value === 'email' ? emailAddress.value : '',
    isFormValid: isFormValid.value
  }
}

// Lifecycle hooks
onMounted(() => {
  updatePageData()
  console.log('ContractDeliverySelection mounted with initial data:', pageData.value)
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.contract-delivery-selection {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-font-4: #767676;
  --color-green-primary: #19973c;
  --color-border: #e1e1e1;
  --color-border-light: #f0f0f0;
  --heading-h2-semibold-size: 22px;
  --heading-h2-semibold-weight: 600;
  --heading-h2-semibold-line-height: 32px;
  --body2-medium-size: 15px;
  --body2-medium-weight: 500;
  --body2-medium-line-height: 24px;
  --body2-regular-size: 15px;
  --body2-regular-weight: 400;
  --body2-regular-line-height: 24px;
  --heading-h4-medium-size: 18px;
  --heading-h4-medium-weight: 500;
  --heading-h4-medium-line-height: 26px;
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
  gap: 16px;
  width: 100%;
}

.page__radio-group {
  width: 100%;
}

/* Email Input Section */
.page__email-input {
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

/* Responsive adjustments */
@media (max-width: 480px) {
  .contract-delivery-selection {
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
  .contract-delivery-selection * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .contract-delivery-selection {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .contract-delivery-selection {
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