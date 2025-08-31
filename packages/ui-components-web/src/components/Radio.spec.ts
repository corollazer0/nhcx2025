import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from './Radio.vue'

describe('Radio', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Radio)
      
      expect(wrapper.find('[data-testid="radio-survey"]').exists()).toBe(true)
      expect(wrapper.classes()).toContain('radio-survey')
    })

    it('기본 props로 라디오 그룹을 렌더링한다', () => {
      const wrapper = mount(Radio)
      
      expect(wrapper.classes()).toContain('radio-survey--default')
      expect(wrapper.classes()).toContain('radio-survey--md')
      expect(wrapper.find('[data-testid="radio-group"]').exists()).toBe(true)
    })

    it('기본 옵션들이 올바르게 렌더링된다', () => {
      const wrapper = mount(Radio)
      
      const options = wrapper.findAll('[data-testid^="radio-option-"]')
      expect(options).toHaveLength(2)
      expect(options[0].text()).toBe('아니요')
      expect(options[1].text()).toBe('예')
    })

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Radio)
      
      expect(wrapper.find('[data-testid="radio-survey"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="radio-group"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="radio-option-0"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="radio-option-1"]').exists()).toBe(true)
    })
  })

  // Props 테스트
  describe('Props 테스트', () => {
    it('커스텀 options가 올바르게 렌더링된다', () => {
      const customOptions = [
        { label: '동의', value: 'agree' },
        { label: '비동의', value: 'disagree' },
        { label: '보류', value: 'pending' }
      ]
      
      const wrapper = mount(Radio, {
        props: { options: customOptions }
      })

      const options = wrapper.findAll('[data-testid^="radio-option-"]')
      expect(options).toHaveLength(3)
      expect(options[0].text()).toBe('동의')
      expect(options[1].text()).toBe('비동의')
      expect(options[2].text()).toBe('보류')
    })

    it('modelValue가 올바르게 반영된다', () => {
      const wrapper = mount(Radio, {
        props: { modelValue: true }
      })

      const option = wrapper.find('[data-testid="radio-option-1"]')
      expect(option.attributes('aria-checked')).toBe('true')
      expect(option.classes()).toContain('radio-survey__option--selected')
    })

    it('state prop이 올바르게 동작한다', () => {
      const states = ['default', 'selected', 'error'] as const
      
      states.forEach(state => {
        const wrapper = mount(Radio, {
          props: { state }
        })
        
        expect(wrapper.classes()).toContain(`radio-survey--${state}`)
      })
    })

    it('size prop이 올바르게 동작한다', () => {
      const sizes = ['sm', 'md'] as const
      
      sizes.forEach(size => {
        const wrapper = mount(Radio, {
          props: { size }
        })
        
        expect(wrapper.classes()).toContain(`radio-survey--${size}`)
      })
    })

    it('disabled prop이 올바르게 동작한다', () => {
      const wrapper = mount(Radio, {
        props: { disabled: true }
      })

      expect(wrapper.classes()).toContain('radio-survey--disabled')
      
      const options = wrapper.findAll('[data-testid^="radio-option-"]')
      options.forEach(option => {
        expect(option.classes()).toContain('radio-survey__option--disabled')
      })
    })
  })

  // 메시지 관련 테스트
  describe('메시지 기능 테스트', () => {
    it('showMessage가 false일 때 메시지가 표시되지 않는다', () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: false,
          showNotice: true,
          showText: true
        }
      })

      expect(wrapper.find('[data-testid="radio-message"]').exists()).toBe(false)
    })

    it('showMessage와 showNotice가 true일 때 알림이 표시된다', () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showNotice: true,
          noticeText: '테스트 알림'
        }
      })

      expect(wrapper.find('[data-testid="radio-message"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="radio-notice"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="radio-notice"]').text()).toBe('테스트 알림')
    })

    it('showMessage와 showText가 true일 때 텍스트가 표시된다', () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showText: true,
          messageText: '테스트 메시지'
        }
      })

      expect(wrapper.find('[data-testid="radio-message"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="radio-text"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="radio-text"]').text()).toContain('테스트 메시지')
    })

    it('showTooltip이 true일 때 툴팁 버튼이 표시된다', () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showText: true,
          showTooltip: true
        }
      })

      expect(wrapper.find('[data-testid="radio-tooltip"]').exists()).toBe(true)
    })

    it('state에 따라 알림 스타일이 변경된다', () => {
      const successWrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showNotice: true,
          state: 'selected'
        }
      })

      const errorWrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showNotice: true,
          state: 'error'
        }
      })

      expect(successWrapper.find('[data-testid="radio-notice"]').classes()).toContain('radio-survey__notice--success')
      expect(errorWrapper.find('[data-testid="radio-notice"]').classes()).toContain('radio-survey__notice--error')
    })
  })

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('옵션 클릭 시 update:modelValue 이벤트가 발생한다', async () => {
      const wrapper = mount(Radio)

      await wrapper.find('[data-testid="radio-option-1"]').trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('옵션 클릭 시 change 이벤트가 발생한다', async () => {
      const wrapper = mount(Radio)

      await wrapper.find('[data-testid="radio-option-0"]').trigger('click')

      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')?.[0]).toEqual([false])
    })

    it('disabled 상태에서는 클릭 이벤트가 발생하지 않는다', async () => {
      const wrapper = mount(Radio, {
        props: { disabled: true }
      })

      await wrapper.find('[data-testid="radio-option-1"]').trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
      expect(wrapper.emitted('change')).toBeFalsy()
    })

    it('스페이스바로 옵션을 선택할 수 있다', async () => {
      const wrapper = mount(Radio)

      await wrapper.find('[data-testid="radio-option-1"]').trigger('keydown.space')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })

    it('엔터키로 옵션을 선택할 수 있다', async () => {
      const wrapper = mount(Radio)

      await wrapper.find('[data-testid="radio-option-0"]').trigger('keydown.enter')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    it('툴팁 클릭 시 tooltip 이벤트가 발생한다', async () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showText: true,
          showTooltip: true
        }
      })

      await wrapper.find('[data-testid="radio-tooltip"]').trigger('click')

      expect(wrapper.emitted('tooltip')).toBeTruthy()
    })
  })

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('옵션들이 적절한 role을 가진다', () => {
      const wrapper = mount(Radio)
      
      const options = wrapper.findAll('[data-testid^="radio-option-"]')
      options.forEach(option => {
        expect(option.attributes('role')).toBe('radio')
      })
    })

    it('선택된 옵션의 aria-checked가 true이다', () => {
      const wrapper = mount(Radio, {
        props: { modelValue: true }
      })

      expect(wrapper.find('[data-testid="radio-option-0"]').attributes('aria-checked')).toBe('false')
      expect(wrapper.find('[data-testid="radio-option-1"]').attributes('aria-checked')).toBe('true')
    })

    it('메시지가 있을 때 aria-describedby가 설정된다', () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showNotice: true
        }
      })

      const options = wrapper.findAll('[data-testid^="radio-option-"]')
      options.forEach(option => {
        expect(option.attributes('aria-describedby')).toContain('radio-survey-')
        expect(option.attributes('aria-describedby')).toContain('-message')
      })
    })

    it('메시지 영역에 적절한 id가 설정된다', () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showNotice: true
        }
      })

      const messageElement = wrapper.find('[data-testid="radio-message"]')
      expect(messageElement.attributes('id')).toContain('radio-survey-')
      expect(messageElement.attributes('id')).toContain('-message')
    })

    it('툴팁 버튼에 적절한 aria-label이 설정된다', () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: true,
          showText: true,
          showTooltip: true
        }
      })

      const tooltip = wrapper.find('[data-testid="radio-tooltip"]')
      expect(tooltip.attributes('aria-label')).toBe('도움말')
    })
  })

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 기본 클래스가 적용된다', () => {
      const wrapper = mount(Radio)

      expect(wrapper.classes()).toContain('radio-survey')
      expect(wrapper.classes()).toContain('radio-survey--default')
      expect(wrapper.classes()).toContain('radio-survey--md')
    })

    it('선택된 옵션에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Radio, {
        props: { modelValue: false }
      })

      const selectedOption = wrapper.find('[data-testid="radio-option-0"]')
      const unselectedOption = wrapper.find('[data-testid="radio-option-1"]')

      expect(selectedOption.classes()).toContain('radio-survey__option--selected')
      expect(unselectedOption.classes()).not.toContain('radio-survey__option--selected')
    })

    it('error 상태에서 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Radio, {
        props: { state: 'error' }
      })

      expect(wrapper.classes()).toContain('radio-survey--error')
      
      const options = wrapper.findAll('[data-testid^="radio-option-"]')
      options.forEach(option => {
        expect(option.classes()).toContain('radio-survey__option--error')
      })
    })

    it('success 상태에서 선택된 옵션에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Radio, {
        props: { 
          state: 'selected',
          modelValue: true
        }
      })

      const selectedOption = wrapper.find('[data-testid="radio-option-1"]')
      expect(selectedOption.classes()).toContain('radio-survey__option--success')
    })
  })

  // 모든 Props 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const states = ['default', 'selected', 'error'] as const
    const sizes = ['sm', 'md'] as const
    const values = [true, false, 'custom']

    states.forEach(state => {
      sizes.forEach(size => {
        values.forEach(value => {
          it(`${state} + ${size} + ${value} 조합이 올바르게 렌더링된다`, () => {
            const wrapper = mount(Radio, {
              props: { 
                state, 
                size, 
                modelValue: value,
                options: [
                  { label: 'Option 1', value: true },
                  { label: 'Option 2', value: false },
                  { label: 'Option 3', value: 'custom' }
                ]
              }
            })

            expect(wrapper.classes()).toContain(`radio-survey--${state}`)
            expect(wrapper.classes()).toContain(`radio-survey--${size}`)
            
            const options = wrapper.findAll('[data-testid^="radio-option-"]')
            expect(options).toHaveLength(3)
          })
        })
      })
    })
  })

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props가 변경되면 올바른 상태가 렌더링된다', async () => {
      const wrapper = mount(Radio, {
        props: { 
          state: 'default',
          modelValue: false
        }
      })

      expect(wrapper.classes()).toContain('radio-survey--default')

      await wrapper.setProps({ state: 'selected', modelValue: true })

      expect(wrapper.classes()).toContain('radio-survey--selected')
      expect(wrapper.find('[data-testid="radio-option-1"]').classes()).toContain('radio-survey__option--selected')
    })

    it('메시지 표시 옵션이 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Radio, {
        props: { 
          showMessage: false,
          showNotice: false
        }
      })

      expect(wrapper.find('[data-testid="radio-message"]').exists()).toBe(false)

      await wrapper.setProps({ 
        showMessage: true, 
        showNotice: true 
      })

      expect(wrapper.find('[data-testid="radio-message"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="radio-notice"]').exists()).toBe(true)
    })
  })

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 옵션 배열이 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Radio, {
        props: { options: [] }
      })

      expect(wrapper.findAll('[data-testid^="radio-option-"]')).toHaveLength(0)
    })

    it('잘못된 modelValue가 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Radio, {
        props: { modelValue: 'nonexistent' }
      })

      const options = wrapper.findAll('[data-testid^="radio-option-"]')
      options.forEach(option => {
        expect(option.attributes('aria-checked')).toBe('false')
        expect(option.classes()).not.toContain('radio-survey__option--selected')
      })
    })

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Radio, {
        props: { 
          state: undefined,
          size: undefined,
          showMessage: undefined,
          disabled: undefined
        }
      })

      expect(wrapper.classes()).toContain('radio-survey--default')
      expect(wrapper.classes()).toContain('radio-survey--md')
      expect(wrapper.classes()).not.toContain('radio-survey--disabled')
    })
  })

  // 성능 테스트
  describe('성능 테스트', () => {
    it('많은 옵션이 있어도 효율적으로 렌더링된다', () => {
      const manyOptions = Array.from({ length: 10 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: i
      }))

      const wrapper = mount(Radio, {
        props: { options: manyOptions }
      })

      expect(wrapper.findAll('[data-testid^="radio-option-"]')).toHaveLength(10)
    })

    it('컴포넌트가 빠르게 마운트된다', () => {
      const start = performance.now()
      const wrapper = mount(Radio)
      const end = performance.now()

      expect(wrapper.exists()).toBe(true)
      expect(end - start).toBeLessThan(100) // 100ms 이내
    })
  })

  // v-model 테스트
  describe('v-model 지원 테스트', () => {
    it('v-model이 올바르게 동작한다', async () => {
      const wrapper = mount(Radio, {
        props: { 
          modelValue: false,
          'onUpdate:modelValue': (value: any) => wrapper.setProps({ modelValue: value })
        }
      })

      expect(wrapper.find('[data-testid="radio-option-0"]').attributes('aria-checked')).toBe('true')

      await wrapper.find('[data-testid="radio-option-1"]').trigger('click')

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
    })
  })
})