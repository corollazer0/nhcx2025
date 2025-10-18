<template>
  <div
    class="subscription-amount-input"
    data-testid="subscription-amount-input"
    data-node-id="1:2583"
  >
    <!-- Header Section -->
    <div class="page__header" data-node-id="1:2589">
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
    <div class="page__contents" data-node-id="1:2584">
      <div class="page__section" data-node-id="1:2585">
        <!-- Title -->
        <div class="page__title" data-node-id="1:2586">
          <h1 class="page__title-text" data-node-id="1:2587">
            가입금액을 입력해 주세요
          </h1>
        </div>

        <!-- Price Input Box -->
        <div class="page__price-box" data-node-id="1:2588">
          <div class="price-box__input">
            <div class="price-box__display">
              <span class="price-box__amount">{{ formattedAmount }}</span>
            </div>
          </div>
          <div class="price-box__message">
            <span class="price-box__message-text">{{ amountInKorean }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Keypad Section -->
    <div class="page__keypad" data-node-id="1:2592">
      <div class="keypad__container" data-node-id="1:2593">
        <!-- Quick Amount Buttons -->
        <div class="keypad__quick-buttons">
          <button
            v-for="quickAmount in quickAmounts"
            :key="quickAmount.value"
            class="keypad__quick-button"
            @click="addQuickAmount(quickAmount.value)"
          >
            {{ quickAmount.label }}
          </button>
        </div>

        <!-- Number Keypad -->
        <div class="keypad__numbers">
          <div class="keypad__row">
            <button class="keypad__number" @click="appendNumber('1')">1</button>
            <button class="keypad__number" @click="appendNumber('2')">2</button>
            <button class="keypad__number" @click="appendNumber('3')">3</button>
          </div>
          <div class="keypad__row">
            <button class="keypad__number" @click="appendNumber('4')">4</button>
            <button class="keypad__number" @click="appendNumber('5')">5</button>
            <button class="keypad__number" @click="appendNumber('6')">6</button>
          </div>
          <div class="keypad__row">
            <button class="keypad__number" @click="appendNumber('7')">7</button>
            <button class="keypad__number" @click="appendNumber('8')">8</button>
            <button class="keypad__number" @click="appendNumber('9')">9</button>
          </div>
          <div class="keypad__row">
            <button class="keypad__number" @click="appendNumber('00')">00</button>
            <button class="keypad__number" @click="appendNumber('0')">0</button>
            <button class="keypad__backspace" @click="backspace">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10 18L4 12L10 6"
                  stroke="#111111"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- CTA Button -->
        <div class="keypad__cta">
          <Cta
            :disabled="!isValidAmount"
            @click="handleNext"
          >
            다음
          </Cta>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Cta from '../components/Cta.vue'
import type {
  SubscriptionAmountInputData,
  NavigationEvent,
  AmountQuickOption
} from '../types/subscriptionAmountInputTypes'
import {
  DEFAULT_SUBSCRIPTION_AMOUNT_INPUT_DATA,
  SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS
} from '../types/subscriptionAmountInputTypes'

// Page state
const pageData = ref<SubscriptionAmountInputData>(DEFAULT_SUBSCRIPTION_AMOUNT_INPUT_DATA)

// Amount input state
const currentAmount = ref<number>(100000) // Default 100,000원

// Quick amount options
const quickAmounts = ref<AmountQuickOption[]>([
  { label: '+1만원', value: 10000 },
  { label: '+5만원', value: 50000 },
  { label: '+10만원', value: 100000 },
  { label: '+100만원', value: 1000000 }
])

// Computed properties
const progressRatio = computed(() => SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.PROGRESS_RATIO)

const formattedAmount = computed(() => {
  return currentAmount.value.toLocaleString('ko-KR') + '원'
})

const amountInKorean = computed(() => {
  const amount = currentAmount.value
  if (amount === 0) return ''

  const units = ['', '만', '억', '조']
  const numbers = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']

  let result = ''
  let unitIndex = 0
  let tempAmount = amount

  while (tempAmount > 0) {
    const currentDigit = tempAmount % 10000
    if (currentDigit > 0) {
      let digitStr = ''

      const thousands = Math.floor(currentDigit / 1000)
      const hundreds = Math.floor((currentDigit % 1000) / 100)
      const tens = Math.floor((currentDigit % 100) / 10)
      const ones = currentDigit % 10

      if (thousands > 0) digitStr += numbers[thousands] + '천'
      if (hundreds > 0) digitStr += numbers[hundreds] + '백'
      if (tens > 0) digitStr += numbers[tens] + '십'
      if (ones > 0) digitStr += numbers[ones]

      result = digitStr + units[unitIndex] + result
    }

    tempAmount = Math.floor(tempAmount / 10000)
    unitIndex++
  }

  return result + '원'
})

const isValidAmount = computed(() => {
  return currentAmount.value >= SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.MIN_AMOUNT &&
         currentAmount.value <= SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.MAX_AMOUNT
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

// Event handlers - Keypad
const appendNumber = (digit: string) => {
  const newAmount = parseInt(currentAmount.value.toString() + digit)
  if (newAmount <= SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.MAX_AMOUNT) {
    currentAmount.value = newAmount
    updatePageData()
  }
}

const backspace = () => {
  const amountStr = currentAmount.value.toString()
  if (amountStr.length > 1) {
    currentAmount.value = parseInt(amountStr.slice(0, -1))
  } else {
    currentAmount.value = 0
  }
  updatePageData()
}

const addQuickAmount = (amount: number) => {
  const newAmount = currentAmount.value + amount
  if (newAmount <= SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.MAX_AMOUNT) {
    currentAmount.value = newAmount
    updatePageData()
  }
}

const handleNext = () => {
  if (isValidAmount.value) {
    console.log('Proceeding with amount:', currentAmount.value)
    // TODO: Navigate to next step
  }
}

// Helper functions
const updatePageData = () => {
  pageData.value = {
    ...pageData.value,
    amount: currentAmount.value,
    isValidAmount: isValidAmount.value
  }
}

// Lifecycle hooks
onMounted(() => {
  updatePageData()
  console.log('SubscriptionAmountInput mounted with initial data:', pageData.value)
})
</script>

<style scoped>
/* Design tokens from Figma variables */
.subscription-amount-input {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-green-primary: #19973c;
  --color-border: #e1e1e1;
  --color-gray-light: #f0f0f0;
  --heading-h2-semibold-size: 22px;
  --heading-h2-semibold-weight: 600;
  --heading-h2-semibold-line-height: 32px;
  --heading-h4-medium-size: 18px;
  --heading-h4-medium-weight: 500;
  --heading-h4-medium-line-height: 26px;
  --caption1-regular-size: 13px;
  --caption1-regular-weight: 400;
  --caption1-regular-line-height: 20px;
  --border-radius-12: 12px;
  --border-radius-8: 8px;

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

/* Price Box Styling */
.page__price-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.price-box__input {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-12);
  height: 54px;
  width: 100%;
  position: relative;
}

.price-box__display {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 14px 20px;
  box-sizing: border-box;
}

.price-box__amount {
  font-family: 'Pretendard', sans-serif;
  font-size: var(--heading-h4-medium-size);
  font-weight: var(--heading-h4-medium-weight);
  line-height: var(--heading-h4-medium-line-height);
  letter-spacing: -0.36px;
  color: var(--color-text-font-1);
  text-align: right;
}

.price-box__message {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
}

.price-box__message-text {
  font-family: 'Pretendard', sans-serif;
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: var(--caption1-regular-line-height);
  letter-spacing: -0.26px;
  color: var(--color-green-primary);
  text-align: right;
}

/* Keypad Section */
.page__keypad {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 360px;
}

.keypad__container {
  background-color: white;
  box-shadow: 0px -3px 6px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Quick Buttons */
.keypad__quick-buttons {
  display: flex;
  gap: 4px;
  padding: 12px 24px 0;
}

.keypad__quick-button {
  flex: 1;
  background: white;
  border: 1px solid #d3d3d3;
  border-radius: var(--border-radius-8);
  height: 36px;
  font-family: 'Pretendard', sans-serif;
  font-size: var(--caption1-regular-size);
  font-weight: var(--caption1-regular-weight);
  line-height: 20px;
  letter-spacing: -0.26px;
  color: var(--color-text-font-1);
  cursor: pointer;
  transition: background-color 0.2s;
}

.keypad__quick-button:hover {
  background-color: var(--color-gray-light);
}

/* Number Keypad */
.keypad__numbers {
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 312px;
  margin: 0 auto;
}

.keypad__row {
  display: flex;
  gap: 4px;
}

.keypad__number,
.keypad__backspace {
  flex: 1;
  height: 54px;
  background: transparent;
  border: none;
  font-family: 'Pretendard', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text-font-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.keypad__number:hover,
.keypad__backspace:hover {
  background-color: var(--color-gray-light);
  border-radius: var(--border-radius-8);
}

/* CTA Section */
.keypad__cta {
  background: linear-gradient(to top, #ffffff 89.796%, rgba(255, 255, 255, 0) 99.49%);
  padding: 10px 24px 32px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .subscription-amount-input {
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

  .page__keypad {
    width: 100vw;
    max-width: 480px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .subscription-amount-input * {
    transition: none !important;
    animation: none !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .subscription-amount-input {
    --color-text-font-1: #000000;
    --color-bg-default: #ffffff;
  }
}

/* Print styles */
@media print {
  .subscription-amount-input {
    width: 100%;
    height: auto;
    background: white;
    color: black;
  }

  .page__header,
  .page__contents,
  .page__keypad {
    position: relative;
    width: 100%;
    left: auto;
    top: auto;
    bottom: auto;
    transform: none;
  }
}
</style>