<template>
  <div
    class="region-picker-bottom-sheet"
    data-testid="region-picker-bottom-sheet"
    data-node-id="1:2565"
  >
    <!-- Dimmed Background Overlay -->
    <div
      class="region-picker__overlay"
      @click="handleOverlayClick"
    />

    <!-- Bottom Sheet Container -->
    <div class="region-picker__bottom-sheet" data-node-id="1:2566">
      <div class="region-picker__picker" data-node-id="1:2567">
        <!-- Navigation Header -->
        <div class="region-picker__navigation" data-node-id="I1:2567;8198:55866">
          <div class="region-picker__header" data-node-id="I1:2567;8198:55867">
            <h2 class="region-picker__title">{{ REGION_PICKER_CONSTANTS.TITLE }}</h2>
          </div>
        </div>

        <!-- Contents - Region Grid -->
        <div class="region-picker__contents" data-node-id="I1:2567;3451:74563">
          <div class="region-picker__grid" data-node-id="I1:2567;3451:74564">
            <!-- Row 1 -->
            <div class="region-picker__row" data-node-id="I1:2567;3451:74565">
              <div
                class="region-picker__item"
                :class="{ 'region-picker__item--selected': selectedProvince === '강원특별자치도' }"
                data-node-id="I1:2567;3451:74566"
                @click="handleItemClick('강원특별자치도', '가평군')"
              >
                <span data-node-id="I1:2567;3451:74567">강원특별자치도</span>
              </div>
              <div
                class="region-picker__item"
                :class="{ 'region-picker__item--selected': selectedCity === '가평군' }"
                data-node-id="I1:2567;3451:74568"
                @click="handleItemClick(selectedProvince, '가평군')"
              >
                <span data-node-id="I1:2567;3451:74569">가평군</span>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="region-picker__row" data-node-id="I1:2567;3451:74570">
              <div
                class="region-picker__item region-picker__item--selected"
                data-node-id="I1:2567;3451:74571"
                @click="handleItemClick('경기도', selectedCity)"
              >
                <span data-node-id="I1:2567;3451:74572">경기도</span>
              </div>
              <div
                class="region-picker__item region-picker__item--pressed"
                data-node-id="I1:2567;3451:74573"
                @click="handleItemClick(selectedProvince, '고양시 덕양구')"
              >
                <span data-node-id="I1:2567;3451:74574">고양시 덕양구</span>
              </div>
            </div>

            <!-- Row 3 -->
            <div class="region-picker__row" data-node-id="I1:2567;3451:74575">
              <div
                class="region-picker__item"
                :class="{ 'region-picker__item--selected': selectedProvince === '경상남도' }"
                data-node-id="I1:2567;3451:74576"
                @click="handleItemClick('경상남도', '거제시')"
              >
                <span data-node-id="I1:2567;3451:74577">경상남도</span>
              </div>
              <div
                class="region-picker__item region-picker__item--selected"
                data-node-id="I1:2567;3451:74578"
                @click="handleItemClick(selectedProvince, '고양시 일산동구')"
              >
                <span data-node-id="I1:2567;3451:74579">고양시 일산동구</span>
              </div>
            </div>

            <!-- Row 4 -->
            <div class="region-picker__row" data-node-id="I1:2567;3451:74580">
              <div
                class="region-picker__item"
                :class="{ 'region-picker__item--selected': selectedProvince === '경상북도' }"
                data-node-id="I1:2567;3451:74601"
                @click="handleItemClick('경상북도', '경산시')"
              >
                <span data-node-id="I1:2567;3451:74602">경상북도</span>
              </div>
              <div
                class="region-picker__item"
                :class="{ 'region-picker__item--selected': selectedCity === '고양시 일산서구' }"
                data-node-id="I1:2567;3451:74582"
                @click="handleItemClick(selectedProvince, '고양시 일산서구')"
              >
                <span data-node-id="I1:2567;3451:74583">고양시 일산서구</span>
              </div>
            </div>

            <!-- Row 5 -->
            <div class="region-picker__row" data-node-id="I1:2567;3451:74604">
              <div
                class="region-picker__item"
                :class="{ 'region-picker__item--selected': selectedProvince === '광주광역시' }"
                data-node-id="I1:2567;3451:74605"
                @click="handleItemClick('광주광역시', '광산구')"
              >
                <span data-node-id="I1:2567;3451:74606">광주광역시</span>
              </div>
              <div
                class="region-picker__item"
                :class="{ 'region-picker__item--selected': selectedCity === '과천시' }"
                data-node-id="I1:2567;3451:74607"
                @click="handleItemClick(selectedProvince, '과천시')"
              >
                <span data-node-id="I1:2567;3451:74608">과천시</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="region-picker__cta" data-node-id="I1:2567;5078:62568">
          <div class="region-picker__cta-gradient" data-node-id="I1:2567;5078:62569">
            <button
              class="region-picker__cta-button"
              :disabled="!isSelectionComplete"
              @click="handleConfirm"
              data-node-id="I1:2567;5078:62569;3001:47951"
            >
              <span data-node-id="I1:2567;5078:62569;3001:47951;3001:47831">{{ REGION_PICKER_CONSTANTS.CTA_TEXT }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type {
  RegionPickerData
} from '../types/regionPickerTypes'
import {
  DEFAULT_REGION_PICKER_DATA,
  REGION_PICKER_CONSTANTS
} from '../types/regionPickerTypes'

// Props
interface RegionPickerProps {
  isVisible?: boolean
  defaultProvince?: string
  defaultCity?: string
}

const props = withDefaults(defineProps<RegionPickerProps>(), {
  isVisible: true,
  defaultProvince: '경기도',
  defaultCity: '고양시 일산동구'
})

// Emits
const emit = defineEmits<{
  confirm: [data: RegionPickerData]
  cancel: []
  close: []
}>()

// Page state
const pageData = ref<RegionPickerData>(DEFAULT_REGION_PICKER_DATA)
const selectedProvince = ref<string>(props.defaultProvince)
const selectedCity = ref<string>(props.defaultCity)

// Computed properties
const isSelectionComplete = computed(() => {
  return selectedProvince.value && selectedCity.value
})

// Event handlers
const handleItemClick = (province: string, city: string) => {
  console.log('Item clicked:', { province, city })

  selectedProvince.value = province
  selectedCity.value = city

  // Update page data
  pageData.value = {
    selectedProvince: selectedProvince.value,
    selectedCity: selectedCity.value,
    fullAddress: `${selectedProvince.value} ${selectedCity.value}`
  }
}

const handleConfirm = () => {
  console.log('Region picker confirmed:', pageData.value)
  emit('confirm', pageData.value)
}

const handleOverlayClick = () => {
  console.log('Overlay clicked - closing picker')
  emit('cancel')
  emit('close')
}

// Lifecycle hooks
onMounted(() => {
  // Initialize with default selections
  pageData.value = {
    selectedProvince: selectedProvince.value,
    selectedCity: selectedCity.value,
    fullAddress: `${selectedProvince.value} ${selectedCity.value}`
  }

  console.log('RegionPickerBottomSheet mounted with initial data:', pageData.value)
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.region-picker-bottom-sheet {
  --color-bg-dimmed: #1111114d; /* color/bg/dimmed from Figma */
  --color-bg-default: #ffffff; /* color/bg/default from Figma */
  --color-text-default: #121212; /* color/text/picker/default from Figma */
  --color-text-selected: #19973c; /* color/text/picker/piacker-select from Figma */
  --color-bg-pressed: #f6f6f6; /* Background for pressed items */

  position: relative;
  width: 360px;
  height: 760px;
  font-family: 'Pretendard', sans-serif;
  background: linear-gradient(90deg, var(--color-bg-dimmed) 0%, var(--color-bg-dimmed) 100%),
              linear-gradient(90deg, var(--color-bg-default) 0%, var(--color-bg-default) 100%);
  overflow: hidden;
}

/* Dimmed background overlay - matching Figma exactly */
.region-picker__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  cursor: pointer;
  z-index: 1;
}

/* Bottom Sheet Container */
.region-picker__bottom-sheet {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 456px; /* Exact height from Figma */
  display: flex;
  gap: 10px;
  align-items: center;
  z-index: 2;
}

/* Picker Container */
.region-picker__picker {
  flex: 1;
  background-color: var(--color-bg-default);
  border-radius: 24px 24px 0 0; /* Top corners rounded */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

/* Navigation Header */
.region-picker__navigation {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.region-picker__header {
  background-color: var(--color-bg-default);
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 22px 24px 10px;
  border-radius: 24px 24px 0 0;
  width: 100%;
}

.region-picker__title {
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.4px;
  color: var(--color-text-default);
  margin: 0;
  text-align: left;
}

/* Contents Section */
.region-picker__contents {
  background-color: var(--color-bg-default);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  padding: 12px 24px 6px;
  flex: 1;
  width: 100%;
}

.region-picker__grid {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.region-picker__row {
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
}

.region-picker__item {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.region-picker__item span {
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--color-text-default);
  text-align: center;
  min-width: 0;
}

.region-picker__item--selected span {
  font-weight: 600;
  color: var(--color-text-selected);
}

.region-picker__item--pressed {
  background-color: var(--color-bg-pressed);
}

.region-picker__item:hover {
  background-color: var(--color-bg-pressed);
}

/* CTA Section */
.region-picker__cta {
  background-color: var(--color-bg-default);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.region-picker__cta-gradient {
  background: linear-gradient(to top, #ffffff 89.796%, transparent 99.49%);
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 24px 32px;
  width: 100%;
}

.region-picker__cta-button {
  flex: 1;
  background-color: #19973c;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  min-width: 0;
  padding: 15px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.region-picker__cta-button:hover:not(:disabled) {
  background-color: #0d5722;
}

.region-picker__cta-button:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
}

.region-picker__cta-button span {
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: -0.36px;
  color: #ffffff;
  text-align: center;
  text-wrap: nowrap;
  white-space: pre;
}

.region-picker__cta-button:disabled span {
  color: #929292;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .region-picker-bottom-sheet {
    width: 100vw;
    height: 100vh;
    max-width: 480px;
  }

  .region-picker__bottom-sheet {
    height: auto;
    max-height: 80vh;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .region-picker-bottom-sheet * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .region-picker-bottom-sheet {
    --color-bg-dimmed: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Focus management for accessibility */
.region-picker__item:focus {
  outline: 2px solid #19973c;
  outline-offset: 2px;
}

.region-picker__cta-button:focus {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}
</style>