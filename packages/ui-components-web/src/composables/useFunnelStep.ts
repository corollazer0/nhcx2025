import { computed, inject, type ComputedRef } from 'vue'
import type { UseFunnelReturn } from './useFunnel'

export interface UseFunnelStepReturn {
  isCurrentStep: ComputedRef<boolean>
  canGoNext: ComputedRef<boolean>
  canGoPrev: ComputedRef<boolean>
  isFirstStep: ComputedRef<boolean>
  isLastStep: ComputedRef<boolean>
  stepIndex: ComputedRef<number>
  setStepData: (data: any) => void
  getStepData: () => any
  goNext: () => Promise<void>
  goPrev: () => void
  jumpTo: (step: string) => Promise<void>
}

/**
 * 개별 단계 컴포넌트에서 사용하는 composable
 * useFunnel과 함께 사용되며, provide/inject 패턴을 통해 funnel 상태에 접근
 */
export function useFunnelStep(stepName: string): UseFunnelStepReturn {
  // Funnel context에서 funnel 인스턴스 주입
  const funnel = inject<UseFunnelReturn<any>>('funnel')

  if (!funnel) {
    throw new Error(
      'useFunnelStep must be used within a FunnelProvider or component that provides funnel context. ' +
      'Make sure to call provide("funnel", funnelInstance) in a parent component.'
    )
  }

  // 현재 단계 여부 확인
  const isCurrentStep = computed(() => funnel.currentStep.value === stepName)

  // 단계 인덱스 계산
  const stepIndex = computed(() => {
    // funnel의 steps 배열에서 현재 stepName의 인덱스를 찾기
    const debugInfo = funnel.getDebugInfo() as any
    const steps = debugInfo.steps || []
    return steps.indexOf(stepName)
  })

  // 현재 단계의 데이터 관리
  const setStepData = (data: any): void => {
    funnel.setStepData(stepName, data)
  }

  const getStepData = (): any => {
    return funnel.getStepData(stepName)
  }

  // 네비게이션 액션들
  const goNext = async (): Promise<void> => {
    // 현재 단계가 아닌 경우 경고
    if (!isCurrentStep.value) {
      console.warn(`useFunnelStep: Attempting to goNext from non-current step '${stepName}'`)
      return
    }

    await funnel.goNext()
  }

  const goPrev = (): void => {
    // 현재 단계가 아닌 경우 경고
    if (!isCurrentStep.value) {
      console.warn(`useFunnelStep: Attempting to goPrev from non-current step '${stepName}'`)
      return
    }

    funnel.goPrev()
  }

  const jumpTo = async (targetStep: string): Promise<void> => {
    await funnel.jumpTo(targetStep)
  }

  return {
    isCurrentStep,
    canGoNext: funnel.canGoNext,
    canGoPrev: funnel.canGoPrev,
    isFirstStep: funnel.isFirstStep,
    isLastStep: funnel.isLastStep,
    stepIndex,
    setStepData,
    getStepData,
    goNext,
    goPrev,
    jumpTo
  }
}

/**
 * 타입 안전성을 위한 제네릭 버전
 */
export function useFunnelStepTyped<T>(stepName: keyof T): UseFunnelStepReturn {
  return useFunnelStep(stepName as string)
}