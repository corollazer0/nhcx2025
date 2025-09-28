<template>
  <div class="funnel">
    <slot
      :currentStep="funnel.currentStep.value"
      :currentStepIndex="funnel.currentStepIndex.value"
      :isFirstStep="funnel.isFirstStep.value"
      :isLastStep="funnel.isLastStep.value"
      :progress="funnel.progress.value"
      :canGoNext="funnel.canGoNext.value"
      :canGoPrev="funnel.canGoPrev.value"
      :goNext="wrappedGoNext"
      :goPrev="wrappedGoPrev"
      :jumpTo="wrappedJumpTo"
      :data="funnel.data.value"
      :setStepData="wrappedSetStepData"
      :getStepData="funnel.getStepData"
      :getDebugInfo="funnel.getDebugInfo"
      :reset="funnel.reset"
    />

    <slot
      name="navigation"
      :currentStep="funnel.currentStep.value"
      :currentStepIndex="funnel.currentStepIndex.value"
      :isFirstStep="funnel.isFirstStep.value"
      :isLastStep="funnel.isLastStep.value"
      :progress="funnel.progress.value"
      :canGoNext="funnel.canGoNext.value"
      :canGoPrev="funnel.canGoPrev.value"
      :goNext="wrappedGoNext"
      :goPrev="wrappedGoPrev"
      :jumpTo="wrappedJumpTo"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
import { provide, watch } from 'vue'
import { useFunnel, type UseFunnelOptions } from '../composables/useFunnel'

export interface FunnelProps extends UseFunnelOptions<Record<string, any>> {
  currentStep?: string
}

interface FunnelEmits {
  'update:currentStep': [step: string]
  'step-change': [from: string, to: string]
  'step-complete': [step: string, data: any]
  'funnel-complete': [allData: T]
}

const props = withDefaults(defineProps<FunnelProps>(), {
  preserveData: true,
  debug: false
})

const emit = defineEmits<FunnelEmits>()

// useFunnel 초기화
const funnel = useFunnel<T>({
  steps: props.steps,
  initialStep: props.currentStep || props.initialStep,
  preserveData: props.preserveData,
  debug: props.debug,
  onStepChange: (from, to) => {
    // 사용자 정의 onStepChange 콜백 실행
    if (props.onStepChange) {
      props.onStepChange(from, to)
    }
  },
  validation: props.validation
})

// 래핑된 함수들 - 이벤트 emit을 보장하기 위해
const wrappedGoNext = async () => {
  const currentStep = funnel.currentStep.value
  await funnel.goNext()
  // goNext 후 단계가 실제로 변경되었는지 확인하고 이벤트 emit
  if (funnel.currentStep.value !== currentStep) {
    emit('update:currentStep', funnel.currentStep.value)
    emit('step-change', currentStep, funnel.currentStep.value)

    // 마지막 단계에 도달했으면 funnel-complete 이벤트 발생
    if (funnel.isLastStep.value) {
      emit('funnel-complete', funnel.data.value as T)
    }
  }
}

const wrappedGoPrev = () => {
  const currentStep = funnel.currentStep.value
  funnel.goPrev()
  // goPrev 후 단계가 실제로 변경되었는지 확인하고 이벤트 emit
  if (funnel.currentStep.value !== currentStep) {
    emit('update:currentStep', funnel.currentStep.value)
    emit('step-change', currentStep, funnel.currentStep.value)
  }
}

const wrappedJumpTo = async (step: string, targetIndex?: number) => {
  const currentStep = funnel.currentStep.value
  await funnel.jumpTo(step, targetIndex)
  // jumpTo 후 단계가 실제로 변경되었는지 확인하고 이벤트 emit
  if (funnel.currentStep.value !== currentStep) {
    emit('update:currentStep', funnel.currentStep.value)
    emit('step-change', currentStep, funnel.currentStep.value)

    // 마지막 단계에 도달했으면 funnel-complete 이벤트 발생
    if (funnel.isLastStep.value) {
      emit('funnel-complete', funnel.data.value as T)
    }
  }
}

const wrappedSetStepData = (step: string, data: any) => {
  funnel.setStepData(step, data)
  // step-complete 이벤트 즉시 발생
  emit('step-complete', step, data)
}

// 자식 컴포넌트에서 사용할 수 있도록 provide
provide('funnel', funnel)

// currentStep prop이 변경되면 funnel 상태도 업데이트
watch(
  () => props.currentStep,
  async (newStep) => {
    if (newStep && newStep !== funnel.currentStep.value) {
      await funnel.jumpTo(newStep)
    }
  },
  { immediate: true, flush: 'sync' }
)

// 마지막 단계 도달 시 funnel-complete 이벤트 감지
watch(
  [funnel.currentStep, funnel.isLastStep],
  ([currentStep, isLastStep], [oldCurrentStep, oldIsLastStep]) => {
    // 마지막 단계로 이동했을 때만 이벤트 발생 (초기화 시 제외)
    if (isLastStep && oldCurrentStep && currentStep !== oldCurrentStep) {
      emit('funnel-complete', funnel.data.value as T)
    }
  }
)

// 컴포넌트 외부에서 접근할 수 있도록 expose
defineExpose({
  currentStep: funnel.currentStep,
  currentStepIndex: funnel.currentStepIndex,
  isFirstStep: funnel.isFirstStep,
  isLastStep: funnel.isLastStep,
  progress: funnel.progress,
  canGoNext: funnel.canGoNext,
  canGoPrev: funnel.canGoPrev,
  data: funnel.data,
  history: funnel.history,
  goNext: wrappedGoNext,
  goPrev: wrappedGoPrev,
  jumpTo: wrappedJumpTo,
  reset: funnel.reset,
  setStepData: wrappedSetStepData,
  getStepData: funnel.getStepData,
  getDebugInfo: funnel.getDebugInfo
})
</script>

<style scoped>
/* Design tokens based on Cta.vue Primary color system */
.funnel {
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

  width: 100%;
  position: relative;
}

/* Funnel progress and state colors using Primary color system */
.funnel--primary {
  --funnel-color-accent: var(--color-primary);
  --funnel-color-accent-hover: var(--color-primary-hover);
  --funnel-color-accent-bg: var(--color-primary-bg);
  --funnel-color-accent-light: var(--color-primary-light);
}

/* Default funnel uses Primary color system */
.funnel {
  --funnel-color-accent: var(--color-primary);
  --funnel-color-accent-hover: var(--color-primary-hover);
  --funnel-color-accent-bg: var(--color-primary-bg);
  --funnel-color-accent-light: var(--color-primary-light);
}

/* Funnel step indicators using Primary colors */
.funnel__step-indicator {
  background-color: var(--funnel-color-accent);
  color: var(--color-text-primary);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.funnel__step-indicator--inactive {
  background-color: var(--color-border-tertiary);
  color: var(--color-text-tertiary);
}

.funnel__step-indicator--current {
  background-color: var(--funnel-color-accent);
  color: var(--color-text-primary);
  box-shadow: 0 0 0 2px var(--funnel-color-accent-light);
}

/* Progress bar using Primary colors */
.funnel__progress-bar {
  background-color: var(--funnel-color-accent);
  transition: width 0.5s ease;
}

.funnel__progress-track {
  background-color: var(--color-border-tertiary);
  border-radius: var(--border-radius-base);
}

/* Navigation buttons using Primary color system */
.funnel__button {
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
}

.funnel__button--primary {
  background-color: var(--funnel-color-accent);
  color: var(--color-text-primary);
  border-color: var(--funnel-color-accent);
}

.funnel__button--primary:hover:not(:disabled) {
  background-color: var(--funnel-color-accent-hover);
  border-color: var(--funnel-color-accent-hover);
}

.funnel__button--primary:active:not(:disabled) {
  background-color: var(--funnel-color-accent-hover);
  transform: translateY(1px);
}

.funnel__button--secondary {
  background-color: var(--color-bg-default);
  color: var(--color-text-secondary);
  border-color: var(--color-border-primary);
}

.funnel__button--secondary:hover:not(:disabled) {
  background-color: var(--funnel-color-accent-bg);
}

.funnel__button--secondary:active:not(:disabled) {
  background-color: var(--funnel-color-accent-light);
  transform: translateY(1px);
}

.funnel__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.funnel__button:focus {
  outline: 2px solid var(--color-text-tertiary);
  outline-offset: 2px;
}

/* Validation states using Primary color system */
.funnel__validation-error {
  color: #dc2626;
  border-color: #dc2626;
}

.funnel__validation-success {
  color: var(--funnel-color-accent);
  border-color: var(--funnel-color-accent);
}

/* Debug panel styling */
.funnel__debug-panel {
  background-color: var(--funnel-color-accent-bg);
  border: 1px solid var(--funnel-color-accent);
  border-radius: var(--border-radius-large);
  padding: 16px;
  font-family: monospace;
  font-size: 12px;
  color: var(--color-text-tertiary);
}
</style>