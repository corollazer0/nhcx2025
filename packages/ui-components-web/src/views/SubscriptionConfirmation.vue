<template>
  <div
    class="subscription-confirmation"
    data-testid="subscription-confirmation"
    data-node-id="1:2664"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2669">
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
    <div class="page__contents" data-node-id="1:2665">
      <!-- Title -->
      <div class="page__title" data-node-id="1:2666">
        <h1 class="page__title-text" data-node-id="1:2667">
          가입정보를 확인해 주세요
        </h1>
      </div>

      <!-- Summary Card -->
      <div class="page__summary-section" data-node-id="1:2668">
        <Summary
          variant="basic"
          :show-header="false"
          :show-list="true"
          :items="summaryItems"
        />
      </div>
    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="1:2672">
      <Cta
        :show-secondary="true"
        secondary-text="정보 수정"
        primary-text="이대로 가입"
        :disabled="false"
        @secondary="handleEditInfo"
        @primary="handleConfirmSubscription"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Summary from '../components/Summary.vue'
import Cta from '../components/Cta.vue'
import type {
  SubscriptionConfirmationData,
  NavigationEvent,
  SummaryItem
} from '../types/subscriptionConfirmationTypes'
import {
  DEFAULT_SUBSCRIPTION_CONFIRMATION_DATA,
  SUBSCRIPTION_CONFIRMATION_CONSTANTS
} from '../types/subscriptionConfirmationTypes'

// Page state
const pageData = ref<SubscriptionConfirmationData>(DEFAULT_SUBSCRIPTION_CONFIRMATION_DATA)

// Summary items based on Figma design
const summaryItems = ref<SummaryItem[]>([
  {
    title: '상품명',
    data: '&상품명&', // Dynamic data placeholder
    color: undefined
  },
  {
    title: '출금계좌',
    data: 'NH농협은행 123-456-78910',
    color: undefined
  },
  {
    title: '가입금액',
    data: '5,000,000원',
    color: 'green' // Green color as shown in Figma
  },
  {
    title: '적용금리',
    data: '정부고시금리',
    color: undefined
  },
  {
    title: '자동이체 주기',
    data: '매월 &일자&', // Dynamic data placeholder
    color: undefined
  },
  {
    title: '자동이체',
    data: '신청 안 함',
    color: undefined
  },
  {
    title: '자동이체 금액',
    data: '500,000원',
    color: undefined
  }
])

// Computed properties
const progressRatio = computed(() => SUBSCRIPTION_CONFIRMATION_CONSTANTS.PROGRESS_RATIO)

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

// Event handlers - CTA
const handleEditInfo = () => {
  console.log('Edit info button clicked')
  // TODO: Navigate back to edit subscription info
}

const handleConfirmSubscription = () => {
  console.log('Confirm subscription button clicked')
  console.log('Final subscription data:', pageData.value)
  // TODO: Submit subscription and navigate to success page
}

// Helper functions
const updatePageData = () => {
  pageData.value = {
    productName: summaryItems.value[0].data,
    withdrawalAccount: summaryItems.value[1].data,
    subscriptionAmount: summaryItems.value[2].data,
    interestRate: summaryItems.value[3].data,
    autoTransferCycle: summaryItems.value[4].data,
    autoTransferStatus: summaryItems.value[5].data,
    autoTransferAmount: summaryItems.value[6].data,
    isConfirmed: false
  }
}

// Update summary items with dynamic data
const updateSummaryWithDynamicData = (productName: string, transferDate: string) => {
  summaryItems.value[0].data = productName
  summaryItems.value[4].data = `매월 ${transferDate}일`
  updatePageData()
}

// Lifecycle hooks
onMounted(() => {
  updatePageData()
  console.log('SubscriptionConfirmation mounted with initial data:', pageData.value)

  // TODO: Load actual subscription data from previous steps
  // Example: updateSummaryWithDynamicData('청년주택드림청약통장', '25')
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.subscription-confirmation {
  --color-bg-default: #ffffff;
  --color-bg-container: #f6f6f6;
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-text-point: #19973c;
  --border-radius-16: 16px;
  --heading-h2-semibold-size: 22px;
  --heading-h2-semibold-weight: 600;
  --heading-h2-semibold-line-height: 32px;
  --heading-h5-semibold-size: 16px;
  --heading-h5-semibold-weight: 600;
  --heading-h5-semibold-line-height: 24px;
  --list3-regular-size: 14px;
  --list3-regular-weight: 400;
  --list3-regular-line-height: 22px;

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
  height: 32px;
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

/* Summary Section */
.page__summary-section {
  width: 100%;
  background-color: var(--color-bg-container);
  border-radius: var(--border-radius-16);
  padding: 20px;
  box-sizing: border-box;
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
  .subscription-confirmation {
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
  .subscription-confirmation * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .subscription-confirmation {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .subscription-confirmation {
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