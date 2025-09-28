import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'
import { useFunnel } from './useFunnel'

// localStorage 모킹
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('useFunnel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 기본 초기화 테스트
  describe('기본 초기화', () => {
    it('기본 props로 정상적으로 초기화된다', () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps })

      expect(funnel.currentStep.value).toBe('step1')
      expect(funnel.currentStepIndex.value).toBe(0)
      expect(funnel.isFirstStep.value).toBe(true)
      expect(funnel.isLastStep.value).toBe(false)
      expect(funnel.progress.value).toBe(33)
      expect(funnel.canGoPrev.value).toBe(false)
    })

    it('initialStep이 설정되면 해당 단계에서 시작된다', () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps, initialStep: 'step2' })

      expect(funnel.currentStep.value).toBe('step2')
      expect(funnel.currentStepIndex.value).toBe(1)
      expect(funnel.isFirstStep.value).toBe(false)
      expect(funnel.isLastStep.value).toBe(false)
      expect(funnel.progress.value).toBe(67)
    })

    it('빈 steps 배열로 초기화하면 에러가 발생한다', () => {
      expect(() => useFunnel({ steps: [] })).toThrow('steps array cannot be empty')
    })

    it('유효하지 않은 initialStep으로 초기화하면 에러가 발생한다', () => {
      const steps = ['step1', 'step2']
      expect(() => useFunnel({ steps, initialStep: 'invalid' })).toThrow(
        "initialStep 'invalid' is not in steps array"
      )
    })
  })

  // Computed 속성 테스트
  describe('Computed 속성', () => {
    it('currentStepIndex가 올바르게 계산된다', () => {
      const steps = ['a', 'b', 'c']
      const funnel = useFunnel({ steps, initialStep: 'b' })

      expect(funnel.currentStepIndex.value).toBe(1)
    })

    it('progress가 올바르게 계산된다', async () => {
      const steps = ['a', 'b', 'c', 'd']
      const funnel = useFunnel({ steps })

      expect(funnel.progress.value).toBe(25) // (0+1)/4 * 100 = 25

      await funnel.jumpTo('c')
      expect(funnel.progress.value).toBe(75) // (2+1)/4 * 100 = 75
    })

    it('단일 step인 경우 progress가 100이다', () => {
      const funnel = useFunnel({ steps: ['only'] })
      expect(funnel.progress.value).toBe(100)
    })

    it('isFirstStep과 isLastStep이 올바르게 동작한다', async () => {
      const steps = ['first', 'middle', 'last']
      const funnel = useFunnel({ steps })

      // 첫 번째 단계
      expect(funnel.isFirstStep.value).toBe(true)
      expect(funnel.isLastStep.value).toBe(false)

      // 중간 단계
      await funnel.jumpTo('middle')
      expect(funnel.isFirstStep.value).toBe(false)
      expect(funnel.isLastStep.value).toBe(false)

      // 마지막 단계
      await funnel.jumpTo('last')
      expect(funnel.isFirstStep.value).toBe(false)
      expect(funnel.isLastStep.value).toBe(true)
    })
  })

  // 네비게이션 액션 테스트
  describe('네비게이션 액션', () => {
    it('goNext가 올바르게 다음 단계로 이동한다', async () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps })

      await funnel.goNext()

      expect(funnel.currentStep.value).toBe('step2')
      expect(funnel.currentStepIndex.value).toBe(1)
    })

    it('마지막 단계에서 goNext를 호출해도 변경되지 않는다', async () => {
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, initialStep: 'step2' })

      await funnel.goNext()

      expect(funnel.currentStep.value).toBe('step2')
    })

    it('goPrev가 올바르게 이전 단계로 이동한다', () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps, initialStep: 'step2' })

      funnel.goPrev()

      expect(funnel.currentStep.value).toBe('step1')
      expect(funnel.currentStepIndex.value).toBe(0)
    })

    it('첫 번째 단계에서 goPrev를 호출해도 변경되지 않는다', () => {
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps })

      funnel.goPrev()

      expect(funnel.currentStep.value).toBe('step1')
    })

    it('jumpTo가 특정 단계로 이동한다', async () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps })

      await funnel.jumpTo('step3')

      expect(funnel.currentStep.value).toBe('step3')
      expect(funnel.currentStepIndex.value).toBe(2)
    })

    it('유효하지 않은 단계로 jumpTo하면 에러가 발생한다', async () => {
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps })

      await expect(funnel.jumpTo('invalid')).rejects.toThrow(
        "Invalid step 'invalid'"
      )
    })
  })

  // 데이터 관리 테스트
  describe('데이터 관리', () => {
    it('setStepData와 getStepData가 올바르게 동작한다', () => {
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps })

      const testData = { name: 'test', value: 123 }
      funnel.setStepData('step1', testData)

      expect(funnel.getStepData('step1')).toEqual(testData)
      expect(funnel.data.value.step1).toEqual(testData)
    })

    it('유효하지 않은 단계에 데이터를 설정하면 에러가 발생한다', () => {
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps })

      expect(() => funnel.setStepData('invalid', {})).toThrow(
        "Invalid step 'invalid' for setStepData"
      )
    })

    it('유효하지 않은 단계의 데이터를 가져오면 에러가 발생한다', () => {
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps })

      expect(() => funnel.getStepData('invalid')).toThrow(
        "Invalid step 'invalid' for getStepData"
      )
    })

    it('복잡한 데이터 타입이 올바르게 저장된다', () => {
      const steps = ['personal', 'business']
      const funnel = useFunnel<{
        personal: { name: string; age: number }
        business: { company: string; employees: number }
      }>({ steps })

      const personalData = { name: 'John', age: 30 }
      const businessData = { company: 'ACME', employees: 100 }

      funnel.setStepData('personal', personalData)
      funnel.setStepData('business', businessData)

      expect(funnel.getStepData('personal')).toEqual(personalData)
      expect(funnel.getStepData('business')).toEqual(businessData)
      expect(funnel.data.value).toEqual({
        personal: personalData,
        business: businessData
      })
    })
  })

  // Validation 테스트
  describe('Validation', () => {
    it('validation이 통과하면 다음 단계로 이동한다', async () => {
      const steps = ['step1', 'step2']
      const validation = {
        step1: vi.fn().mockReturnValue(true)
      }
      const funnel = useFunnel({ steps, validation })

      funnel.setStepData('step1', { valid: true })
      await funnel.goNext()

      expect(validation.step1).toHaveBeenCalledWith({ valid: true })
      expect(funnel.currentStep.value).toBe('step2')
    })

    it('validation이 실패하면 현재 단계에 머문다', async () => {
      const steps = ['step1', 'step2']
      const validation = {
        step1: vi.fn().mockReturnValue(false)
      }
      const funnel = useFunnel({ steps, validation })

      funnel.setStepData('step1', { valid: false })
      await funnel.goNext()

      expect(validation.step1).toHaveBeenCalledWith({ valid: false })
      expect(funnel.currentStep.value).toBe('step1')
    })

    it('비동기 validation이 올바르게 동작한다', async () => {
      const steps = ['step1', 'step2']
      const validation = {
        step1: vi.fn().mockResolvedValue(true)
      }
      const funnel = useFunnel({ steps, validation })

      funnel.setStepData('step1', { async: true })
      await funnel.goNext()

      expect(validation.step1).toHaveBeenCalledWith({ async: true })
      expect(funnel.currentStep.value).toBe('step2')
    })

    it('validation 에러가 발생하면 이동하지 않는다', async () => {
      const steps = ['step1', 'step2']
      const validation = {
        step1: vi.fn().mockRejectedValue(new Error('Validation failed'))
      }
      const funnel = useFunnel({ steps, validation, debug: true })

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      await funnel.goNext()

      expect(funnel.currentStep.value).toBe('step1')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('이전 단계로 이동할 때는 validation을 검사하지 않는다', () => {
      const steps = ['step1', 'step2']
      const validation = {
        step2: vi.fn().mockReturnValue(false)
      }
      const funnel = useFunnel({ steps, initialStep: 'step2', validation })

      funnel.goPrev()

      expect(validation.step2).not.toHaveBeenCalled()
      expect(funnel.currentStep.value).toBe('step1')
    })
  })

  // 콜백 및 이벤트 테스트
  describe('콜백 및 이벤트', () => {
    it('onStepChange 콜백이 올바르게 호출된다', async () => {
      const onStepChange = vi.fn()
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, onStepChange })

      await funnel.goNext()

      expect(onStepChange).toHaveBeenCalledWith('step1', 'step2')
    })

    it('jumpTo에서도 onStepChange 콜백이 호출된다', async () => {
      const onStepChange = vi.fn()
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps, onStepChange })

      await funnel.jumpTo('step3')

      expect(onStepChange).toHaveBeenCalledWith('step1', 'step3')
    })

    it('같은 단계로 jumpTo하면 콜백이 호출되지 않는다', async () => {
      const onStepChange = vi.fn()
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, onStepChange })

      await funnel.jumpTo('step1')

      expect(onStepChange).not.toHaveBeenCalled()
    })
  })

  // 히스토리 관리 테스트
  describe('히스토리 관리', () => {
    it('단계 이동 히스토리가 올바르게 기록된다', async () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps })

      expect(funnel.history.value).toEqual(['step1'])

      await funnel.goNext()
      expect(funnel.history.value).toEqual(['step1', 'step2'])

      await funnel.jumpTo('step3')
      expect(funnel.history.value).toEqual(['step1', 'step2', 'step3'])
    })

    it('이미 방문한 단계로 이동해도 중복 기록되지 않는다', async () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps })

      await funnel.goNext() // step2
      await funnel.jumpTo('step1') // 다시 step1
      await funnel.jumpTo('step2') // 다시 step2

      expect(funnel.history.value).toEqual(['step1', 'step2'])
    })
  })

  // Reset 기능 테스트
  describe('Reset 기능', () => {
    it('reset이 모든 상태를 초기화한다', async () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps })

      // 상태 변경
      funnel.setStepData('step1', { test: 'data' })
      await funnel.jumpTo('step2')

      // 리셋
      funnel.reset()

      expect(funnel.currentStep.value).toBe('step1')
      expect(funnel.data.value).toEqual({})
      expect(funnel.history.value).toEqual(['step1'])
    })

    it('preserveData가 true일 때 reset이 localStorage를 정리한다', () => {
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, preserveData: true })

      funnel.reset()

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('funnel-step1-step2')
    })
  })

  // localStorage 테스트
  describe('localStorage 기능', () => {
    it('preserveData가 true일 때 상태를 localStorage에 저장한다', async () => {
      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, preserveData: true })

      funnel.setStepData('step1', { test: 'data' })
      await nextTick()

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'funnel-step1-step2',
        expect.stringContaining('"test":"data"')
      )
    })

    it('localStorage에서 상태를 복원한다', () => {
      const savedData = {
        currentStep: 'step2',
        data: { step1: { restored: true } },
        history: ['step1', 'step2']
      }
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedData))

      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, preserveData: true })

      expect(funnel.currentStep.value).toBe('step2')
      expect(funnel.data.value).toEqual({ step1: { restored: true } })
      expect(funnel.history.value).toEqual(['step1', 'step2'])
    })

    it('localStorage 읽기 에러가 발생해도 정상 동작한다', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('Storage error')
      })

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, preserveData: true, debug: true })

      expect(funnel.currentStep.value).toBe('step1')
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('잘못된 localStorage 데이터가 있어도 정상 동작한다', () => {
      localStorageMock.getItem.mockReturnValue('invalid json')

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, preserveData: true, debug: true })

      expect(funnel.currentStep.value).toBe('step1')

      consoleSpy.mockRestore()
    })
  })

  // 디버깅 기능 테스트
  describe('디버깅 기능', () => {
    it('getDebugInfo가 올바른 정보를 반환한다', () => {
      const steps = ['step1', 'step2', 'step3']
      const funnel = useFunnel({ steps, initialStep: 'step2' })

      funnel.setStepData('step1', { debug: 'test' })

      const debugInfo = funnel.getDebugInfo()

      expect(debugInfo).toEqual({
        currentStep: 'step2',
        currentStepIndex: 1,
        steps: ['step1', 'step2', 'step3'],
        data: { step1: { debug: 'test' } },
        history: ['step2'],
        progress: 67,
        canGoNext: expect.any(Object), // computed ref
        canGoPrev: true,
        isFirstStep: false,
        isLastStep: false
      })
    })

    it('debug 모드에서 로그가 출력된다', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      const steps = ['step1', 'step2']
      const funnel = useFunnel({ steps, debug: true })

      await funnel.goNext()
      funnel.reset()

      expect(consoleSpy).toHaveBeenCalledWith(
        "useFunnel: Moved from 'step1' to 'step2'"
      )
      expect(consoleSpy).toHaveBeenCalledWith('useFunnel: Reset to initial state')

      consoleSpy.mockRestore()
    })
  })

  // Edge Cases
  describe('Edge Cases', () => {
    it('빈 문자열 단계명도 올바르게 처리한다', () => {
      const steps = ['', 'step2']
      const funnel = useFunnel({ steps })

      expect(funnel.currentStep.value).toBe('')
      expect(funnel.currentStepIndex.value).toBe(0)
    })

    it('동일한 이름의 단계가 있어도 인덱스로 구분한다', async () => {
      const steps = ['step', 'step', 'step']
      const funnel = useFunnel({ steps })

      // goNext로 두 번째 step으로 이동
      await funnel.goNext()
      expect(funnel.currentStepIndex.value).toBe(1)

      // jumpTo로 세 번째 step으로 이동 (인덱스 지정)
      await funnel.jumpTo('step', 2)
      expect(funnel.currentStepIndex.value).toBe(2)
    })

    it('매우 많은 단계도 올바르게 처리한다', () => {
      const steps = Array.from({ length: 1000 }, (_, i) => `step${i}`)
      const funnel = useFunnel({ steps, initialStep: 'step500' })

      expect(funnel.currentStepIndex.value).toBe(500)
      expect(funnel.progress.value).toBe(50) // (500+1)/1000 * 100 = 50.1 -> 50
    })
  })
})