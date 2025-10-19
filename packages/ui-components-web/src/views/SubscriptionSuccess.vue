<template>
  <div
    class="subscription-success"
    data-testid="subscription-success"
    data-node-id="136:17782"
  >
    <!-- Complete Image -->
    <div class="page__image" data-node-id="136:17783">
      <img
        :src="completeImage"
        alt="가입 완료"
        class="page__complete-image"
        data-testid="complete-image"
      />
    </div>

    <!-- Page Title -->
    <div class="page__title" data-node-id="136:17784">
      <PageTitle
        :title-text="titleText"
        :sub-title="false"
        align="center"
      />
    </div>

    <!-- First Summary: Subscription Info -->
    <div class="page__summary-primary" data-node-id="136:17785">
      <Summary
        variant="accordion"
        :show-header="false"
        :show-list="true"
        :items="subscriptionSummaryItems"
        :collapsed-item-count="3"
        :show-toggle-button="true"
        expand-text="펼치기"
        collapse-text="접기"
      />
    </div>

    <!-- Second Summary: Canceled Subscription Info -->
    <div class="page__summary-secondary" data-node-id="136:17786">
      <Summary
        variant="accordion"
        :show-header="true"
        title="해지된 청약 내역"
        subtitle=""
        :show-list="true"
        :items="canceledSummaryItems"
        :collapsed-item-count="3"
        :show-toggle-button="false"
      />
    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="136:17787">
      <Cta
        :show-secondary="false"
        primary-text="확인"
        :disabled="false"
        @primary="handleConfirm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PageTitle from '../components/PageTitle.vue'
import Summary from '../components/Summary.vue'
import Cta from '../components/Cta.vue'
import type {
  SubscriptionSuccessData,
  SummaryItem
} from '../types/subscriptionSuccessTypes'
import {
  DEFAULT_SUBSCRIPTION_SUCCESS_DATA,
  SUBSCRIPTION_SUCCESS_CONSTANTS
} from '../types/subscriptionSuccessTypes'

// Page data
const pageData = ref<SubscriptionSuccessData>(DEFAULT_SUBSCRIPTION_SUCCESS_DATA)

// Complete image URL from Figma
const completeImage = 'http://localhost:3845/assets/14608bcf05303b86c4d0251bf64389dd8f7a6984.png'

// Computed properties
const titleText = computed(() => {
  const productName = pageData.value.productName || '상품'
  return `${productName}을\n가입했어요`
})

// First summary items - subscription info
const subscriptionSummaryItems = ref<SummaryItem[]>([
  {
    title: '출금계좌',
    data: 'NH농협 123-456-78910',
    color: undefined
  },
  {
    title: '가입금액',
    data: '500,000원',
    color: undefined
  },
  {
    title: '적용금리',
    data: '정부고시금리',
    color: undefined
  }
])

// Second summary items - canceled subscription info
const canceledSummaryItems = ref<SummaryItem[]>([
  {
    title: '상품명',
    data: '&상품명&',
    color: undefined
  },
  {
    title: '해지 계좌',
    data: 'NH농협은행 123-456-78910',
    color: undefined
  },
  {
    title: '해지 금액',
    data: '5,000,000원',
    color: undefined
  }
])

// Event handlers
const handleConfirm = () => {
  console.log('Confirm button clicked')
  console.log('Page data:', pageData.value)
  // TODO: Navigate to next page or close
}

// Helper functions
const updatePageData = (productName: string) => {
  pageData.value.productName = productName

  // Update dynamic data in summary items
  canceledSummaryItems.value[0].data = productName
}

// Lifecycle hooks
onMounted(() => {
  console.log('SubscriptionSuccess mounted with data:', pageData.value)

  // TODO: Load actual data from previous steps
  // Example: updatePageData('청년주택드림청약통장')
})
</script>

<style scoped>
/* Design tokens from Figma */
.subscription-success {
  --color-bg-default: #ffffff;
  --color-bg-container: #f6f6f6;
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-green-primary: #19973c;
  --border-radius-16: 16px;
  --border-radius-12: 12px;
  --font-family-pretendard: 'Pretendard', sans-serif;

  background-color: var(--color-bg-default);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 360px;
  height: 816px;
  font-family: var(--font-family-pretendard);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  gap: 32px;
  padding: 0;
}

/* Complete Image Section - Exact Figma positioning */
.page__image {
  position: relative;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  margin-top: 0;
  overflow: hidden;
}

.page__complete-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Page Title Section - Exact Figma positioning */
.page__title {
  position: relative;
  width: 312px;
  flex-shrink: 0;
}

/* Override PageTitle component for Figma matching */
.page__title :deep(.page-title__title) {
  font-family: var(--font-family-pretendard);
  font-weight: 600;
  font-size: 26px;
  line-height: 38px;
  letter-spacing: -0.52px;
  color: var(--color-text-font-1);
  text-align: center;
  white-space: pre-line;
}

/* First Summary Section - Exact Figma positioning */
.page__summary-primary {
  position: relative;
  width: 312px;
  flex-shrink: 0;
}

/* Second Summary Section - Exact Figma positioning */
.page__summary-secondary {
  position: relative;
  width: 312px;
  flex-shrink: 0;
}

/* Override Summary title alignment for left alignment */
.page__summary-secondary :deep(.summary__title) {
  text-align: left;
}

/* CTA Section - Exact Figma positioning */
.page__cta {
  position: relative;
  width: 360px;
  flex-shrink: 0;
  margin-top: auto;
}

/* Override CTA styling for gradient background */
.page__cta :deep(.cta) {
  background: linear-gradient(
    to top,
    #ffffff 89.796%,
    rgba(255, 255, 255, 0) 99.49%
  );
  padding: 10px 24px 32px;
  box-sizing: border-box;
}

.page__cta :deep(.cta__primary) {
  background-color: var(--color-green-primary);
  border-radius: var(--border-radius-12);
  color: #ffffff;
  font-family: var(--font-family-pretendard);
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  padding: 15px 16px;
  width: 100%;
  box-sizing: border-box;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .subscription-success {
    width: 100vw;
    height: 100vh;
    max-width: 480px;
  }

  .page__title,
  .page__summary-primary,
  .page__summary-secondary {
    width: calc(100vw - 48px);
    max-width: 312px;
  }

  .page__cta {
    width: 100vw;
    max-width: 480px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .subscription-success * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .subscription-success {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .subscription-success {
    width: 100%;
    height: auto;
    background: white;
    color: black;
  }

  .page__image,
  .page__title,
  .page__summary-primary,
  .page__summary-secondary,
  .page__cta {
    position: relative;
    width: 100%;
  }
}
</style>