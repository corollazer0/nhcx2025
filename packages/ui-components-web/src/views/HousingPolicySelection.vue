<template>
  <div
    class="housing-policy-selection"
    data-testid="housing-policy-selection"
    data-node-id="1:2554"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2560">
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
    <div class="page__contents" data-node-id="1:2555">
      <!-- Title Section -->
      <div class="page__title" data-node-id="1:2556">
        <h1 class="page__main-title" data-node-id="1:2557">
          {{ mainTitle }}
        </h1>
        <p class="page__subtitle" data-node-id="1:2558">
          {{ subtitle }}
        </p>
      </div>

      <!-- Region Selection -->
      <div class="page__region-select" data-node-id="1:2559">
        <Select
          v-model="selectedRegion"
          :placeholder="HOUSING_POLICY_CONSTANTS.SELECT_PLACEHOLDER"
          :options="regionOptions"
          variant="default"
          @change="handleRegionChange"
        />
      </div>
    </div>

    <!-- CTA Section -->
    <div class="page__cta" data-node-id="1:2563">
      <Cta
        type="basic"
        ratio="cta-full"
        :primary-text="ctaText"
        :primary-disabled="!selectedRegion"
        @primary-click="handleNext"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Select from '../components/Select.vue'
import Cta from '../components/Cta.vue'
import type {
  HousingPolicyData,
  NavigationEvent,
  RegionOption
} from '../types/housingPolicyTypes'
import {
  DEFAULT_HOUSING_POLICY_DATA,
  HOUSING_POLICY_CONSTANTS
} from '../types/housingPolicyTypes'

// Page state
const pageData = ref<HousingPolicyData>(DEFAULT_HOUSING_POLICY_DATA)
const selectedRegion = ref<string | null>(null)

// Region options - 실제 구현시 API에서 가져올 데이터
const regionOptions = ref<RegionOption[]>([
  { label: '서울특별시', value: 'seoul' },
  { label: '부산광역시', value: 'busan' },
  { label: '대구광역시', value: 'daegu' },
  { label: '인천광역시', value: 'incheon' },
  { label: '광주광역시', value: 'gwangju' },
  { label: '대전광역시', value: 'daejeon' },
  { label: '울산광역시', value: 'ulsan' },
  { label: '세종특별자치시', value: 'sejong' },
  { label: '경기도', value: 'gyeonggi' },
  { label: '강원도', value: 'gangwon' },
  { label: '충청북도', value: 'chungbuk' },
  { label: '충청남도', value: 'chungnam' },
  { label: '전라북도', value: 'jeonbuk' },
  { label: '전라남도', value: 'jeonnam' },
  { label: '경상북도', value: 'gyeongbuk' },
  { label: '경상남도', value: 'gyeongnam' },
  { label: '제주특별자치도', value: 'jeju' }
])

// Computed properties
const mainTitle = computed(() => HOUSING_POLICY_CONSTANTS.MAIN_TITLE)
const subtitle = computed(() => HOUSING_POLICY_CONSTANTS.SUBTITLE)
const progressRatio = computed(() => HOUSING_POLICY_CONSTANTS.PROGRESS_RATIO)
const ctaText = computed(() => HOUSING_POLICY_CONSTANTS.CTA_TEXT)

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

const handleRegionChange = (value: string | number | null) => {
  console.log('Region selected:', value)
  selectedRegion.value = value as string

  // Update page data
  if (value) {
    const selectedOption = regionOptions.value.find(option => option.value === value)
    if (selectedOption) {
      pageData.value.selectedRegion = selectedOption
    }
  }
}

const handleNext = (event: MouseEvent) => {
  console.log('Next button clicked', event)
  if (selectedRegion.value) {
    console.log('Proceeding with selected region:', selectedRegion.value)
    // TODO: Navigate to next step
  }
}

// Lifecycle hooks
onMounted(() => {
  // TODO: Load region data from API if needed
  console.log('HousingPolicySelection mounted')
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.housing-policy-selection {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --heading-h2-semibold-size: 22px;
  --heading-h2-semibold-weight: 600;
  --heading-h2-semibold-line-height: 32px;
  --body-body2-regular-size: 15px;
  --body-body2-regular-weight: 400;
  --body-body2-regular-line-height: 24px;

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

/* Title Section - Exact Figma styling */
.page__title {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.page__main-title {
  font-family: 'Pretendard', sans-serif;
  font-size: var(--heading-h2-semibold-size);
  font-weight: var(--heading-h2-semibold-weight);
  line-height: var(--heading-h2-semibold-line-height);
  letter-spacing: -0.44px;
  color: var(--color-text-font-1);
  margin: 0;
  width: 100%;
  text-align: left;
}

.page__subtitle {
  font-family: 'Pretendard', sans-serif;
  font-size: var(--body-body2-regular-size);
  font-weight: var(--body-body2-regular-weight);
  line-height: var(--body-body2-regular-line-height);
  letter-spacing: -0.3px;
  color: var(--color-text-font-3);
  margin: 0;
  width: 100%;
  text-align: left;
}

/* Region Select Section */
.page__region-select {
  width: 100%;
}

/* CTA Section - Exact Figma positioning */
.page__cta {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 360px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .housing-policy-selection {
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
  .housing-policy-selection * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .housing-policy-selection {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .housing-policy-selection {
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