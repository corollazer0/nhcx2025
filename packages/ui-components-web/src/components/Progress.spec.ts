import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from './Progress.vue'

describe('Progress', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.find('[data-testid="progress"]').exists()).toBe(true)
      expect(wrapper.classes()).toContain('progress')
    })

    it('기본 props로 progress를 렌더링한다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.classes()).toContain('progress--md')
      expect(wrapper.classes()).toContain('progress--green')
      expect(wrapper.find('[data-testid="progress-bar"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="progress-active"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="progress-line"]').exists()).toBe(true)
    })

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.find('[data-testid="progress"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="progress-bar"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="progress-active"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="progress-line"]').exists()).toBe(true)
    })

    it('접근성 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.5 }
      })
      
      const progressElement = wrapper.find('[data-testid="progress"]')
      expect(progressElement.attributes('role')).toBe('progressbar')
      expect(progressElement.attributes('aria-valuenow')).toBe('50')
      expect(progressElement.attributes('aria-valuemin')).toBe('0')
      expect(progressElement.attributes('aria-valuemax')).toBe('100')
      expect(progressElement.attributes('aria-valuetext')).toBe('50% complete')
    })
  })

  // Props 테스트
  describe('Props 테스트', () => {
    it('ratio prop이 올바르게 동작한다', () => {
      const testCases = [
        { ratio: 0.1, expected: '10%' },
        { ratio: 0.3, expected: '30%' },
        { ratio: 0.5, expected: '50%' },
        { ratio: 0.8, expected: '80%' },
        { ratio: 1.0, expected: '100%' }
      ]

      testCases.forEach(({ ratio, expected }) => {
        const wrapper = mount(Progress, {
          props: { ratio }
        })
        
        const activeElement = wrapper.find('[data-testid="progress-active"]')
        expect(activeElement.attributes('style')).toContain(`width: ${expected}`)
      })
    })

    it('string 타입 ratio가 올바르게 처리된다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: '0.7' }
      })
      
      const activeElement = wrapper.find('[data-testid="progress-active"]')
      expect(activeElement.attributes('style')).toContain('width: 70%')
    })

    it('size prop이 올바르게 동작한다', () => {
      const sizes = ['sm', 'md'] as const
      
      sizes.forEach(size => {
        const wrapper = mount(Progress, {
          props: { size }
        })
        
        expect(wrapper.classes()).toContain(`progress--${size}`)
      })
    })

    it('color prop이 올바르게 동작한다', () => {
      const colors = ['green', 'blue', 'gray'] as const
      
      colors.forEach(color => {
        const wrapper = mount(Progress, {
          props: { color }
        })
        
        expect(wrapper.classes()).toContain(`progress--${color}`)
      })
    })

    it('showAnimation prop이 올바르게 동작한다', () => {
      const animatedWrapper = mount(Progress, {
        props: { showAnimation: true }
      })
      const staticWrapper = mount(Progress, {
        props: { showAnimation: false }
      })

      expect(animatedWrapper.classes()).toContain('progress--animated')
      expect(staticWrapper.classes()).not.toContain('progress--animated')
    })
  })

  // 진행률 계산 테스트
  describe('진행률 계산 테스트', () => {
    it('ratio 값이 올바르게 퍼센트로 변환된다', () => {
      const testCases = [
        { ratio: 0, expected: 0 },
        { ratio: 0.25, expected: 25 },
        { ratio: 0.5, expected: 50 },
        { ratio: 0.75, expected: 75 },
        { ratio: 1, expected: 100 }
      ]

      testCases.forEach(({ ratio, expected }) => {
        const wrapper = mount(Progress, {
          props: { ratio }
        })
        
        expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuenow')).toBe(expected.toString())
      })
    })

    it('ratio 값이 범위를 벗어날 때 올바르게 제한된다', () => {
      const testCases = [
        { ratio: -0.5, expected: 0 },
        { ratio: 1.5, expected: 100 },
        { ratio: 2.0, expected: 100 },
        { ratio: -1.0, expected: 0 }
      ]

      testCases.forEach(({ ratio, expected }) => {
        const wrapper = mount(Progress, {
          props: { ratio }
        })
        
        expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuenow')).toBe(expected.toString())
      })
    })

    it('완료 상태일 때 완료 클래스가 추가된다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: 1.0 }
      })
      
      expect(wrapper.classes()).toContain('progress--complete')
    })

    it('완료되지 않은 상태일 때 완료 클래스가 없다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.9 }
      })
      
      expect(wrapper.classes()).not.toContain('progress--complete')
    })
  })

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('complete 이벤트가 ratio가 1일 때 발생한다', async () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.9 }
      })

      await wrapper.setProps({ ratio: 1.0 })
      
      expect(wrapper.emitted('complete')).toBeTruthy()
    })

    it('change 이벤트가 ratio 변경 시 발생한다', async () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.3 }
      })

      await wrapper.setProps({ ratio: 0.7 })
      
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual([70])
    })

    it('같은 ratio로 설정해도 불필요한 이벤트가 발생하지 않는다', async () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.5 }
      })

      await wrapper.setProps({ ratio: 0.5 })
      
      // 초기 마운트 시에만 이벤트가 발생해야 함
      expect(wrapper.emitted('change')?.length || 0).toBeLessThanOrEqual(1)
    })
  })

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 필수 클래스가 적용된다', () => {
      const wrapper = mount(Progress, {
        props: { 
          size: 'sm', 
          color: 'blue', 
          showAnimation: true,
          ratio: 1.0
        }
      })

      expect(wrapper.classes()).toContain('progress')
      expect(wrapper.classes()).toContain('progress--sm')
      expect(wrapper.classes()).toContain('progress--blue')
      expect(wrapper.classes()).toContain('progress--animated')
      expect(wrapper.classes()).toContain('progress--complete')
    })

    it('progress__bar 요소가 올바른 클래스를 가진다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.find('.progress__bar').exists()).toBe(true)
    })

    it('progress__active 요소가 올바른 클래스를 가진다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.find('.progress__active').exists()).toBe(true)
    })

    it('progress__line 요소가 올바른 클래스를 가진다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.find('.progress__line').exists()).toBe(true)
    })
  })

  // 모든 Props 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const sizes = ['sm', 'md'] as const
    const colors = ['green', 'blue', 'gray'] as const
    const ratios = [0.1, 0.5, 1.0]

    sizes.forEach(size => {
      colors.forEach(color => {
        ratios.forEach(ratio => {
          it(`${size} + ${color} + ${ratio} 조합이 올바르게 렌더링된다`, () => {
            const wrapper = mount(Progress, {
              props: { size, color, ratio }
            })

            expect(wrapper.classes()).toContain(`progress--${size}`)
            expect(wrapper.classes()).toContain(`progress--${color}`)
            expect(wrapper.find('[data-testid="progress-active"]').attributes('style')).toContain(`width: ${ratio * 100}%`)
          })
        })
      })
    })
  })

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props가 변경되면 올바른 상태가 렌더링된다', async () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.3, color: 'green' }
      })

      expect(wrapper.classes()).toContain('progress--green')
      expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuenow')).toBe('30')

      await wrapper.setProps({ ratio: 0.8, color: 'blue' })

      expect(wrapper.classes()).toContain('progress--blue')
      expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuenow')).toBe('80')
    })

    it('ratio가 변경되면 스타일이 올바르게 업데이트된다', async () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.2 }
      })

      expect(wrapper.find('[data-testid="progress-active"]').attributes('style')).toContain('width: 20%')

      await wrapper.setProps({ ratio: 0.9 })

      expect(wrapper.find('[data-testid="progress-active"]').attributes('style')).toContain('width: 90%')
    })

    it('애니메이션 상태가 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Progress, {
        props: { showAnimation: false }
      })

      expect(wrapper.classes()).not.toContain('progress--animated')

      await wrapper.setProps({ showAnimation: true })

      expect(wrapper.classes()).toContain('progress--animated')
    })
  })

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('NaN ratio가 전달되면 기본값이 적용된다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: NaN }
      })

      expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuenow')).toBe('10')
    })

    it('매우 작은 소수 ratio가 올바르게 처리된다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.001 }
      })

      expect(wrapper.find('[data-testid="progress-active"]').attributes('style')).toContain('width: 0.1%')
    })

    it('매우 큰 ratio가 100%로 제한된다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: 999 }
      })

      expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuenow')).toBe('100')
      expect(wrapper.find('[data-testid="progress-active"]').attributes('style')).toContain('width: 100%')
    })

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Progress, {
        props: { 
          ratio: undefined,
          size: undefined,
          color: undefined,
          showAnimation: undefined
        }
      })

      expect(wrapper.classes()).toContain('progress--md')
      expect(wrapper.classes()).toContain('progress--green')
      expect(wrapper.classes()).not.toContain('progress--animated')
    })
  })

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('progress 요소에 적절한 role이 설정된다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.find('[data-testid="progress"]').attributes('role')).toBe('progressbar')
    })

    it('진행률에 따라 적절한 aria-valuenow가 설정된다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.65 }
      })
      
      expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuenow')).toBe('65')
    })

    it('적절한 aria-valuetext가 설정된다', () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0.33 }
      })
      
      expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuetext')).toBe('33% complete')
    })

    it('line 요소에 aria-hidden이 설정된다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.find('[data-testid="progress-line"]').attributes('aria-hidden')).toBe('true')
    })
  })

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('progress 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Progress)
      
      expect(wrapper.html()).toContain('<div')
      expect(wrapper.find('.progress__bar').exists()).toBe(true)
      expect(wrapper.find('.progress__active').exists()).toBe(true)
      expect(wrapper.find('.progress__line').exists()).toBe(true)
      expect(wrapper.html()).toContain('data-testid="progress"')
    })

    it('각 size별 고유한 클래스가 적용된다', () => {
      const smWrapper = mount(Progress, { props: { size: 'sm' } })
      const mdWrapper = mount(Progress, { props: { size: 'md' } })
      
      expect(smWrapper.classes()).toContain('progress--sm')
      expect(smWrapper.classes()).not.toContain('progress--md')
      
      expect(mdWrapper.classes()).toContain('progress--md')
      expect(mdWrapper.classes()).not.toContain('progress--sm')
    })

    it('각 color별 고유한 클래스가 적용된다', () => {
      const colors = ['green', 'blue', 'gray'] as const
      
      colors.forEach(color => {
        const wrapper = mount(Progress, { props: { color } })
        
        expect(wrapper.classes()).toContain(`progress--${color}`)
        
        colors.filter(c => c !== color).forEach(otherColor => {
          expect(wrapper.classes()).not.toContain(`progress--${otherColor}`)
        })
      })
    })
  })

  // 반응형 테스트
  describe('반응형 스타일 테스트', () => {
    it('모든 사이즈에서 올바르게 렌더링된다', () => {
      const sizes = ['sm', 'md'] as const
      
      sizes.forEach(size => {
        const wrapper = mount(Progress, {
          props: { size }
        })
        
        expect(wrapper.classes()).toContain(`progress--${size}`)
        expect(wrapper.find('.progress__bar').exists()).toBe(true)
      })
    })

    it('모든 색상에서 올바르게 렌더링된다', () => {
      const colors = ['green', 'blue', 'gray'] as const
      
      colors.forEach(color => {
        const wrapper = mount(Progress, {
          props: { color }
        })
        
        expect(wrapper.classes()).toContain(`progress--${color}`)
        expect(wrapper.find('.progress__active').exists()).toBe(true)
      })
    })
  })

  // 성능 테스트
  describe('성능 테스트', () => {
    it('많은 수의 progress 업데이트가 효율적으로 처리된다', async () => {
      const wrapper = mount(Progress, {
        props: { ratio: 0 }
      })

      const updates = Array.from({ length: 100 }, (_, i) => i / 100)
      
      for (const ratio of updates) {
        await wrapper.setProps({ ratio })
      }

      expect(wrapper.find('[data-testid="progress"]').attributes('aria-valuenow')).toBe('99')
    })

    it('컴포넌트가 빠르게 마운트된다', () => {
      const start = performance.now()
      const wrapper = mount(Progress)
      const end = performance.now()

      expect(wrapper.exists()).toBe(true)
      expect(end - start).toBeLessThan(100) // 100ms 이내
    })
  })
})