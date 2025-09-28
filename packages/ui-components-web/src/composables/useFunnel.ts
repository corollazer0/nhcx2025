import { ref, computed, watch, nextTick, type Ref, type ComputedRef } from 'vue'

export interface UseFunnelOptions<T = Record<string, any>> {
  steps: string[]
  initialStep?: string
  preserveData?: boolean
  debug?: boolean
  onStepChange?: (from: string, to: string) => void
  validation?: Record<string, (data: any) => boolean | Promise<boolean>>
}

export interface UseFunnelReturn<T> {
  // 상태
  currentStep: Ref<string>
  currentStepIndex: ComputedRef<number>
  isFirstStep: ComputedRef<boolean>
  isLastStep: ComputedRef<boolean>
  progress: ComputedRef<number>
  canGoNext: ComputedRef<boolean>
  canGoPrev: ComputedRef<boolean>

  // 액션
  goNext: () => Promise<void>
  goPrev: () => void
  jumpTo: (step: string, targetIndex?: number) => Promise<void>
  reset: () => void

  // 데이터 관리
  data: Ref<Partial<T>>
  setStepData: (step: string, stepData: any) => void
  getStepData: (step: string) => any

  // 디버깅
  history: ComputedRef<string[]>
  getDebugInfo: () => object
}

export function useFunnel<T extends Record<string, any>>(
  options: UseFunnelOptions<T>
): UseFunnelReturn<T> {
  const {
    steps,
    initialStep = steps[0],
    preserveData = true,
    debug = false,
    onStepChange,
    validation = {}
  } = options

  // 유효성 검사
  if (!steps.length) {
    throw new Error('useFunnel: steps array cannot be empty')
  }

  if (!steps.includes(initialStep)) {
    throw new Error(`useFunnel: initialStep '${initialStep}' is not in steps array`)
  }

  // 상태 관리
  const currentStepIndex = ref(steps.indexOf(initialStep))
  const data = ref<Partial<T>>({}) as Ref<Partial<T>>
  const stepHistory = ref<number[]>([steps.indexOf(initialStep)])

  // Computed 속성들
  const currentStep = computed(() => steps[currentStepIndex.value])
  const currentStepIndexComputed = computed(() => currentStepIndex.value)

  // 로컬 스토리지 키 생성
  const storageKey = preserveData ? `funnel-${steps.join('-')}` : null

  // 초기화 시 localStorage에서 복원
  if (preserveData && storageKey) {
    try {
      const savedData = localStorage.getItem(storageKey)
      if (savedData) {
        const parsed = JSON.parse(savedData)
        // currentStep 또는 currentStepIndex로 복원
        if (parsed.currentStep && steps.includes(parsed.currentStep)) {
          currentStepIndex.value = steps.indexOf(parsed.currentStep)
        } else if (parsed.currentStepIndex !== undefined && parsed.currentStepIndex >= 0 && parsed.currentStepIndex < steps.length) {
          currentStepIndex.value = parsed.currentStepIndex
        }
        if (parsed.data) {
          data.value = parsed.data
        }
        if (parsed.history && Array.isArray(parsed.history)) {
          // history가 문자열 배열인 경우 인덱스로 변환
          if (parsed.history.length > 0 && typeof parsed.history[0] === 'string') {
            stepHistory.value = parsed.history.map((step: string) => steps.indexOf(step)).filter((idx: number) => idx !== -1)
          } else {
            stepHistory.value = parsed.history
          }
        }
      }
    } catch (error) {
      if (debug) {
        console.warn('useFunnel: Failed to restore from localStorage', error)
      }
    }
  }

  const isFirstStep = computed(() => currentStepIndex.value === 0)

  const isLastStep = computed(() => currentStepIndex.value === steps.length - 1)

  const progress = computed(() => {
    if (steps.length <= 1) return 100
    return Math.round(((currentStepIndex.value + 1) / steps.length) * 100)
  })

  const canGoNext = computed(() => {
    if (isLastStep.value) return false

    const currentValidation = validation[steps[currentStepIndex.value]]
    if (!currentValidation) return true

    try {
      const currentStepData = getStepData(steps[currentStepIndex.value])
      const result = currentValidation(currentStepData)

      // 동기 validation인 경우
      if (typeof result === 'boolean') {
        return result
      }

      // 비동기 validation인 경우 - Promise이므로 기본값 true 반환
      // 실제 validation은 goNext에서 수행
      return true
    } catch (error) {
      if (debug) {
        console.error('useFunnel: Validation error', error)
      }
      return false
    }
  })

  const canGoPrev = computed(() => !isFirstStep.value)

  const history = computed(() => stepHistory.value.map(index => steps[index]))

  // 헬퍼 함수들
  const validateCurrentStep = async (): Promise<boolean> => {
    const validator = validation[steps[currentStepIndex.value]]
    if (!validator) return true

    try {
      const currentStepData = getStepData(steps[currentStepIndex.value])
      const result = await validator(currentStepData)
      return Boolean(result)
    } catch (error) {
      if (debug) {
        console.error('useFunnel: Validation failed', error)
      }
      return false
    }
  }

  const moveToStep = async (targetStepIndex: number): Promise<void> => {
    if (targetStepIndex < 0 || targetStepIndex >= steps.length) {
      throw new Error(`useFunnel: Invalid step index '${targetStepIndex}'`)
    }

    if (targetStepIndex === currentStepIndex.value) return

    const fromStep = steps[currentStepIndex.value]
    const targetStep = steps[targetStepIndex]

    // 현재 단계 validation 검사 (앞으로 가는 경우만)
    if (targetStepIndex > currentStepIndex.value) {
      const isValid = await validateCurrentStep()
      if (!isValid) {
        if (debug) {
          console.warn(`useFunnel: Cannot move to '${targetStep}' - validation failed`)
        }
        return
      }
    }

    // 상태 업데이트
    currentStepIndex.value = targetStepIndex

    // 히스토리 업데이트
    if (!stepHistory.value.includes(targetStepIndex)) {
      stepHistory.value.push(targetStepIndex)
    }

    // 콜백 실행
    if (onStepChange) {
      onStepChange(fromStep, targetStep)
    }

    if (debug) {
      console.log(`useFunnel: Moved from '${fromStep}' to '${targetStep}'`)
    }
  }

  const saveToStorage = (): void => {
    if (!preserveData || !storageKey) return

    try {
      const dataToSave = {
        currentStep: steps[currentStepIndex.value],
        currentStepIndex: currentStepIndex.value,
        data: data.value,
        history: stepHistory.value.map(idx => steps[idx])
      }
      localStorage.setItem(storageKey, JSON.stringify(dataToSave))
    } catch (error) {
      if (debug) {
        console.warn('useFunnel: Failed to save to localStorage', error)
      }
    }
  }

  // 액션 함수들
  const goNext = async (): Promise<void> => {
    if (isLastStep.value) return

    const nextStepIndex = currentStepIndex.value + 1
    await moveToStep(nextStepIndex)
  }

  const goPrev = (): void => {
    if (isFirstStep.value) return

    const prevStepIndex = currentStepIndex.value - 1
    moveToStep(prevStepIndex)
  }

  const jumpTo = async (step: string, targetIndex?: number): Promise<void> => {
    if (!steps.includes(step)) {
      throw new Error(`useFunnel: Invalid step '${step}'`)
    }

    // 동일한 이름의 단계가 여러 개 있는 경우 인덱스로 구분
    let targetStepIndex: number
    if (targetIndex !== undefined) {
      // 특정 인덱스가 지정된 경우
      if (targetIndex < 0 || targetIndex >= steps.length || steps[targetIndex] !== step) {
        throw new Error(`useFunnel: Invalid step '${step}' at index ${targetIndex}`)
      }
      targetStepIndex = targetIndex
    } else {
      // 첫 번째로 일치하는 단계 찾기
      targetStepIndex = steps.indexOf(step)
    }

    await moveToStep(targetStepIndex)
  }

  const reset = (): void => {
    currentStepIndex.value = steps.indexOf(initialStep)
    data.value = {} as Partial<T>
    stepHistory.value = [steps.indexOf(initialStep)]

    if (preserveData && storageKey) {
      try {
        localStorage.removeItem(storageKey)
      } catch (error) {
        if (debug) {
          console.warn('useFunnel: Failed to clear localStorage', error)
        }
      }
    }

    if (debug) {
      console.log('useFunnel: Reset to initial state')
    }
  }

  // 데이터 관리 함수들
  const setStepData = (step: string, stepData: any): void => {
    if (!steps.includes(step)) {
      throw new Error(`useFunnel: Invalid step '${step}' for setStepData`)
    }

    data.value = {
      ...data.value,
      [step]: stepData
    }

    // 즉시 저장
    if (preserveData) {
      nextTick(() => {
        saveToStorage()
      })
    }

    if (debug) {
      console.log(`useFunnel: Data set for step '${step}'`, stepData)
    }
  }

  const getStepData = (step: string): any => {
    if (!steps.includes(step)) {
      throw new Error(`useFunnel: Invalid step '${step}' for getStepData`)
    }

    return data.value[step]
  }

  const getDebugInfo = (): object => {
    return {
      currentStep: currentStep.value,
      currentStepIndex: currentStepIndex.value,
      steps,
      data: data.value,
      history: history.value,
      progress: progress.value,
      canGoNext: canGoNext.value,
      canGoPrev: canGoPrev.value,
      isFirstStep: isFirstStep.value,
      isLastStep: isLastStep.value
    }
  }

  // Watch effects
  if (preserveData) {
    watch(
      [currentStepIndex, data, stepHistory],
      () => {
        nextTick(() => {
          saveToStorage()
        })
      },
      { deep: true }
    )
  }

  return {
    // 상태
    currentStep,
    currentStepIndex: currentStepIndexComputed,
    isFirstStep,
    isLastStep,
    progress,
    canGoNext,
    canGoPrev,

    // 액션
    goNext,
    goPrev,
    jumpTo,
    reset,

    // 데이터 관리
    data,
    setStepData,
    getStepData,

    // 디버깅
    history,
    getDebugInfo
  }
}