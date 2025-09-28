<template>
  <div
    v-show="isCurrentStep"
    class="funnel-step"
    :class="{
      'funnel-step--active': isCurrentStep,
      'funnel-step--first': isFirstStep,
      'funnel-step--last': isLastStep
    }"
    :aria-current="isCurrentStep ? 'step' : undefined"
    role="tabpanel"
    :aria-labelledby="`step-${stepName}-label`"
  >
    <slot
      :stepName="stepName"
      :isCurrentStep="isCurrentStep"
      :isFirstStep="isFirstStep"
      :isLastStep="isLastStep"
      :canGoNext="canGoNext"
      :canGoPrev="canGoPrev"
      :stepIndex="stepIndex"
      :setStepData="setStepData"
      :getStepData="getStepData"
      :goNext="goNext"
      :goPrev="goPrev"
      :jumpTo="jumpTo"
    />
  </div>
</template>

<script setup lang="ts">
import { useFunnelStep } from '../composables/useFunnelStep'

interface FunnelStepProps {
  name: string
  label?: string
}

const props = defineProps<FunnelStepProps>()

const stepName = props.name

const {
  isCurrentStep,
  canGoNext,
  canGoPrev,
  isFirstStep,
  isLastStep,
  stepIndex,
  setStepData,
  getStepData,
  goNext,
  goPrev,
  jumpTo
} = useFunnelStep(stepName)

// 컴포넌트 외부에서 접근할 수 있도록 expose
defineExpose({
  stepName,
  isCurrentStep,
  canGoNext,
  canGoPrev,
  isFirstStep,
  isLastStep,
  stepIndex,
  setStepData,
  getStepData,
  goNext,
  goPrev,
  jumpTo
})
</script>

<style scoped>
/* Design tokens based on Cta.vue Primary color system */
.funnel-step {
  --color-primary: #19973c;
  --color-primary-hover: #0d5722;
  --color-primary-bg: #f0f9f3;
  --color-primary-light: #e6f7ea;
  --color-text-primary: #ffffff;
  --color-text-secondary: #19973c;
  --color-border-primary: #19973c;
  --color-text-tertiary: #121212;
  --color-border-tertiary: #d3d3d3;
  --color-bg-default: #ffffff;
  --border-radius-base: 6px;
  --border-radius-large: 8px;
  --font-family: "Pretendard", sans-serif;

  /* 기본 스타일링 */
  width: 100%;
  position: relative;
  transition: all 0.3s ease;
}

/* Step container using Primary color system */
.funnel-step--active {
  /* 활성 단계 스타일 */
  background-color: var(--color-bg-default);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius-large);
  box-shadow: 0 4px 12px rgba(25, 151, 60, 0.1);
}

.funnel-step--active::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, var(--color-primary), var(--color-primary-hover));
  border-radius: var(--border-radius-large);
  z-index: -1;
  opacity: 0.1;
}

.funnel-step--first {
  /* 첫 번째 단계 스타일 */
  border-top-left-radius: var(--border-radius-large);
  border-top-right-radius: var(--border-radius-large);
}

.funnel-step--last {
  /* 마지막 단계 스타일 */
  border-bottom-left-radius: var(--border-radius-large);
  border-bottom-right-radius: var(--border-radius-large);
}

/* Step content area */
.funnel-step__content {
  padding: 24px;
  font-family: var(--font-family);
}

/* Step header using Primary colors */
.funnel-step__header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border-tertiary);
}

.funnel-step__header--active {
  border-bottom-color: var(--color-primary);
}

.funnel-step__number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: var(--color-border-tertiary);
  color: var(--color-text-tertiary);
}

.funnel-step__number--active {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
}

.funnel-step__number--completed {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
}

.funnel-step__number--completed::before {
  content: '✓';
  font-size: 16px;
}

.funnel-step__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-tertiary);
  margin: 0;
}

.funnel-step__title--active {
  color: var(--color-primary);
}

/* Step body */
.funnel-step__body {
  padding: 16px 0;
}

/* Step navigation using Primary color system */
.funnel-step__navigation {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-tertiary);
}

.funnel-step__button {
  font-family: var(--font-family);
  border-radius: var(--border-radius-base);
  padding: 12px 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
  min-width: 80px;
}

.funnel-step__button--primary {
  background-color: var(--color-primary);
  color: var(--color-text-primary);
  border-color: var(--color-primary);
}

.funnel-step__button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
}

.funnel-step__button--primary:active:not(:disabled) {
  background-color: var(--color-primary-hover);
  transform: translateY(1px);
}

.funnel-step__button--secondary {
  background-color: var(--color-bg-default);
  color: var(--color-text-secondary);
  border-color: var(--color-border-primary);
}

.funnel-step__button--secondary:hover:not(:disabled) {
  background-color: var(--color-primary-bg);
}

.funnel-step__button--secondary:active:not(:disabled) {
  background-color: var(--color-primary-light);
  transform: translateY(1px);
}

.funnel-step__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.funnel-step__button:focus {
  outline: 2px solid var(--color-text-tertiary);
  outline-offset: 2px;
}

/* Validation states using Primary color system */
.funnel-step__validation-error {
  background-color: #fef2f2;
  border: 1px solid #dc2626;
  color: #dc2626;
  border-radius: var(--border-radius-base);
  padding: 12px 16px;
  margin-top: 8px;
  font-size: 14px;
}

.funnel-step__validation-success {
  background-color: var(--color-primary-bg);
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: var(--border-radius-base);
  padding: 12px 16px;
  margin-top: 8px;
  font-size: 14px;
}

/* Form elements using Primary colors */
.funnel-step__input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-border-tertiary);
  border-radius: var(--border-radius-base);
  font-family: var(--font-family);
  font-size: 16px;
  transition: all 0.2s ease;
}

.funnel-step__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.funnel-step__input--error {
  border-color: #dc2626;
}

.funnel-step__input--error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px #fecaca;
}

.funnel-step__label {
  display: block;
  font-weight: 500;
  color: var(--color-text-tertiary);
  margin-bottom: 4px;
  font-size: 14px;
}

/* Progress indicator within step */
.funnel-step__progress {
  width: 100%;
  height: 4px;
  background-color: var(--color-border-tertiary);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 16px;
}

.funnel-step__progress-bar {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.5s ease;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .funnel-step__content {
    padding: 16px;
  }

  .funnel-step__navigation {
    flex-direction: column;
    gap: 8px;
  }

  .funnel-step__button {
    width: 100%;
    justify-content: center;
  }

  .funnel-step__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>