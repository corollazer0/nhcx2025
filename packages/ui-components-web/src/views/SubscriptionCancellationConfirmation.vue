<template>
  <div
    class="subscription-cancellation-confirmation"
    data-testid="subscription-cancellation-confirmation"
    data-node-id="1:2532"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2537">
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
    <div class="page__contents" data-node-id="1:2533">
      <!-- Page Title -->
      <div class="page__title" :data-node-id="SUBSCRIPTION_CANCELLATION_CONSTANTS.FIGMA_NODE_IDS.TITLE">
        <PageTitle
          :title-text="pageTitle"
          :sub-title="false"
          align="center"
        />
      </div>

      <!-- Summary Card -->
      <Summary
        :show-header="false"
        :show-list="true"
        :items="summaryItems"
        variant="basic"
      />
    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="1:2540">
      <Cta
        type="basic"
        ratio="cta-full"
        :primary-text="ctaText"
        @primary-click="handleNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import PageTitle from '../components/PageTitle.vue'
import Summary from '../components/Summary.vue'
import Cta from '../components/Cta.vue'
import type {
  SubscriptionData,
  NavigationEvent
} from '../types/subscriptionCancellationTypes'
import {
  DEFAULT_SUBSCRIPTION_DATA,
  SUBSCRIPTION_CANCELLATION_CONSTANTS
} from '../types/subscriptionCancellationTypes'

// Page state
const pageData = ref<SubscriptionData>(DEFAULT_SUBSCRIPTION_DATA)

// Computed properties
const pageTitle = computed(() => SUBSCRIPTION_CANCELLATION_CONSTANTS.PAGE_TITLE)

const progressRatio = computed(() => SUBSCRIPTION_CANCELLATION_CONSTANTS.PROGRESS_RATIO)

const summaryItems = computed(() => [
  {
    title: SUBSCRIPTION_CANCELLATION_CONSTANTS.SUMMARY_FIELDS.PRODUCT_NAME,
    data: pageData.value.productName
  },
  {
    title: SUBSCRIPTION_CANCELLATION_CONSTANTS.SUMMARY_FIELDS.SUBSCRIPTION_ACCOUNT,
    data: pageData.value.subscriptionAccount.replace(' ', '<br>')
  },
  {
    title: SUBSCRIPTION_CANCELLATION_CONSTANTS.SUMMARY_FIELDS.CANCELLATION_AMOUNT,
    data: pageData.value.estimatedCancellationAmount,
    color: 'green' as const
  }
])

const ctaText = computed(() => SUBSCRIPTION_CANCELLATION_CONSTANTS.CTA_TEXT)

// Event handlers
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

const handleNext = (event: MouseEvent) => {
  console.log('Next button clicked', event)
  // TODO: Navigate to next step
}

// Lifecycle hooks
onMounted(() => {
  // TODO: Fetch subscription data from API
  console.log('SubscriptionCancellationConfirmation mounted')
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.subscription-cancellation-confirmation {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-point: #19973c;
  --border-radius-16: 16px;
  --color-bg-container: #f6f6f6;

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

/* Page Title - Exact Figma styling */
.page__title {
  display: flex;
  gap: 10px;
  height: 32px;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  width: 100%;
}

/* CTA Section - Exact Figma positioning */
.page__cta {
  position: absolute;
  left: 0;
  top: 662px;
  width: 360px;
  height: 98px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .subscription-cancellation-confirmation {
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

  .page__cta {
    width: 100%;
    max-width: 480px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .subscription-cancellation-confirmation * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .subscription-cancellation-confirmation {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .subscription-cancellation-confirmation {
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
    transform: none;
  }
}
</style>