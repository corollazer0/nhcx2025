<template>
  <div
    class="terms-agreement"
    data-testid="terms-agreement"
    data-node-id="1:3189"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:3194">
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
    <div class="page__contents" data-node-id="1:3190">
      <!-- Page Title -->
      <div class="page__title" :data-node-id="TERMS_AGREEMENT_CONSTANTS.FIGMA_NODE_IDS.TITLE">
        <PageTitle
          :title-text="pageTitle"
          :sub-title="false"
          align="center"
        />
      </div>

      <!-- Terms List -->
      <div class="page__terms" data-node-id="1:3191">
        <!-- Master agreement checkbox -->
        <Terms
          :title="TERMS_AGREEMENT_CONSTANTS.TERMS_TITLES.MASTER"
          :state="masterState"
          :checked="masterChecked"
          :show-arrow="false"
          @update:checked="handleMasterCheck"
        />

        <!-- Individual terms -->
        <Terms
          :title="TERMS_AGREEMENT_CONSTANTS.TERMS_TITLES.FINANCIAL_PRODUCTS"
          :state="'close'"
          :checked="financialProductsChecked"
          :show-arrow="false"
          @update:checked="handleFinancialProductsCheck"
        />

        <Terms
          :title="TERMS_AGREEMENT_CONSTANTS.TERMS_TITLES.DETAILED_AGREEMENT"
          :state="detailedState"
          :checked="detailedChecked"
          :show-arrow="true"
          :items="detailedItems"
          @update:checked="handleDetailedCheck"
          @update:state="handleDetailedStateChange"
          @item-check="handleDetailedItemCheck"
        />
      </div>
    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="1:3197">
      <Cta
        type="basic"
        ratio="cta-full"
        :primary-text="ctaText"
        :primary-disabled="!allTermsAgreed"
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
import Terms from '../components/Terms.vue'
import Cta from '../components/Cta.vue'
import type {
  TermsAgreementData,
  NavigationEvent,
  TermsItem
} from '../types/termsAgreementTypes'
import {
  DEFAULT_TERMS_AGREEMENT_DATA,
  TERMS_AGREEMENT_CONSTANTS
} from '../types/termsAgreementTypes'

// Page state
const pageData = ref<TermsAgreementData>(DEFAULT_TERMS_AGREEMENT_DATA)

// Terms states
const masterChecked = ref(true)
const masterState = ref<'open' | 'close'>('close')
const financialProductsChecked = ref(true)
const detailedChecked = ref(true)
const detailedState = ref<'open' | 'close'>('open')

// Detailed terms items
const detailedItems = ref<TermsItem[]>([
  {
    text: TERMS_AGREEMENT_CONSTANTS.DETAILED_ITEMS.PERSONAL_INFO,
    checked: true,
    type: 'checkbox'
  },
  {
    text: TERMS_AGREEMENT_CONSTANTS.DETAILED_ITEMS.FINANCIAL_INFO,
    checked: true,
    type: 'checkbox'
  }
])

// Computed properties
const pageTitle = computed(() => TERMS_AGREEMENT_CONSTANTS.PAGE_TITLE)
const progressRatio = computed(() => TERMS_AGREEMENT_CONSTANTS.PROGRESS_RATIO)
const ctaText = computed(() => TERMS_AGREEMENT_CONSTANTS.CTA_TEXT)

const allTermsAgreed = computed(() => {
  const allDetailedItemsChecked = detailedItems.value.every(item => item.checked)
  return masterChecked.value &&
         financialProductsChecked.value &&
         detailedChecked.value &&
         allDetailedItemsChecked
})

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

const handleMasterCheck = (checked: boolean) => {
  masterChecked.value = checked
  // When master is checked/unchecked, update all other terms
  if (checked) {
    financialProductsChecked.value = true
    detailedChecked.value = true
    detailedItems.value.forEach(item => {
      item.checked = true
    })
  } else {
    financialProductsChecked.value = false
    detailedChecked.value = false
    detailedItems.value.forEach(item => {
      item.checked = false
    })
  }
}

const handleFinancialProductsCheck = (checked: boolean) => {
  financialProductsChecked.value = checked
  updateMasterState()
}

const handleDetailedCheck = (checked: boolean) => {
  detailedChecked.value = checked
  if (checked) {
    detailedItems.value.forEach(item => {
      item.checked = true
    })
  } else {
    detailedItems.value.forEach(item => {
      item.checked = false
    })
  }
  updateMasterState()
}

const handleDetailedStateChange = (state: 'open' | 'close') => {
  detailedState.value = state
}

const handleDetailedItemCheck = (index: number, checked: boolean) => {
  detailedItems.value[index].checked = checked

  // Update detailed terms main checkbox based on all items
  const allItemsChecked = detailedItems.value.every(item => item.checked)
  detailedChecked.value = allItemsChecked

  updateMasterState()
}

const updateMasterState = () => {
  const allItemsChecked = detailedItems.value.every(item => item.checked)
  const allTermsChecked = financialProductsChecked.value &&
                         detailedChecked.value &&
                         allItemsChecked

  masterChecked.value = allTermsChecked
}

const handleNext = (event: MouseEvent) => {
  console.log('Next button clicked', event)
  if (allTermsAgreed.value) {
    // TODO: Navigate to next step
    console.log('All terms agreed, proceeding to next step')
  }
}

// Lifecycle hooks
onMounted(() => {
  // TODO: Initialize terms data from API if needed
  console.log('TermsAgreement mounted')
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.terms-agreement {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
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

/* Terms Section - Exact Figma layout */
.page__terms {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  .terms-agreement {
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
  .terms-agreement * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .terms-agreement {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .terms-agreement {
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