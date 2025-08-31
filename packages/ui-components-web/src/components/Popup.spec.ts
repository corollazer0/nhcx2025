import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import Popup from './Popup.vue'

// Mock document.body for scroll lock tests
Object.defineProperty(document.body, 'style', {
  value: {
    overflow: '',
  },
  writable: true
})

describe('Popup', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    // Reset body overflow before each test
    document.body.style.overflow = ''
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
    // Reset body overflow after each test
    document.body.style.overflow = ''
  })

  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('isVisible이 false일 때 팝업이 렌더링되지 않는다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: false }
      })

      expect(wrapper.find('[data-testid="popup-overlay"]').exists()).toBe(false)
    })

    it('isVisible이 true일 때 팝업이 렌더링된다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      expect(wrapper.find('[data-testid="popup-overlay"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup"]').exists()).toBe(true)
    })

    it('기본 props로 팝업을 렌더링한다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      expect(wrapper.classes()).toContain('popup-overlay')
      expect(wrapper.classes()).toContain('popup-overlay--default')
      expect(wrapper.find('[data-testid="popup-title"]').text()).toBe('타이틀')
      expect(wrapper.find('[data-testid="popup-body"]').text()).toBe('내용을 입력해주세요.')
    })

    it('적절한 data-testid가 설정된다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      expect(wrapper.find('[data-testid="popup-overlay"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup-contents"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup-text"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup-actions"]').exists()).toBe(true)
    })
  })

  // Props 테스트
  describe('Props 테스트', () => {
    it('title prop이 올바르게 렌더링된다', () => {
      const customTitle = '커스텀 타이틀'
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          title: customTitle
        }
      })

      expect(wrapper.find('[data-testid="popup-title"]').text()).toBe(customTitle)
    })

    it('bodyText prop이 올바르게 렌더링된다', () => {
      const customBody = '커스텀 본문 텍스트'
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          bodyText: customBody
        }
      })

      expect(wrapper.find('[data-testid="popup-body"]').text()).toBe(customBody)
    })

    it('showTitle이 false일 때 타이틀이 표시되지 않는다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          showTitle: false
        }
      })

      expect(wrapper.find('[data-testid="popup-title"]').exists()).toBe(false)
    })

    it('size prop이 올바르게 동작한다', () => {
      const sizes = ['sm', 'md', 'lg'] as const
      
      sizes.forEach(size => {
        wrapper = mount(Popup, {
          props: { 
            isVisible: true,
            size
          }
        })
        
        expect(wrapper.find('[data-testid="popup"]').classes()).toContain(`popup--${size}`)
      })
    })

    it('variant prop이 올바르게 동작한다', () => {
      const variants = ['default', 'warning', 'error', 'success'] as const
      
      variants.forEach(variant => {
        wrapper = mount(Popup, {
          props: { 
            isVisible: true,
            variant
          }
        })
        
        expect(wrapper.classes()).toContain(`popup-overlay--${variant}`)
        expect(wrapper.find('[data-testid="popup"]').classes()).toContain(`popup--${variant}`)
      })
    })

    it('centered prop이 올바르게 동작한다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          centered: true
        }
      })

      expect(wrapper.classes()).toContain('popup-overlay--centered')
    })

    it('zIndex prop이 올바르게 적용된다', () => {
      const customZIndex = 2000
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          zIndex: customZIndex
        }
      })

      // wrapper의 vm을 통해 prop이 올바르게 전달되었는지 확인
      expect(wrapper.vm.zIndex).toBe(customZIndex)
      
      // 오버레이 엘리먼트가 존재하는지 확인
      const overlayElement = wrapper.find('[data-testid="popup-overlay"]')
      expect(overlayElement.exists()).toBe(true)
    })
  })

  // 버튼 테스트
  describe('버튼 테스트', () => {
    it('기본적으로 primary 버튼만 표시된다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      expect(wrapper.find('[data-testid="popup-primary-button"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup-secondary-button"]').exists()).toBe(false)
    })

    it('showSecondaryButton이 true일 때 secondary 버튼이 표시된다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          showSecondaryButton: true
        }
      })

      expect(wrapper.find('[data-testid="popup-secondary-button"]').exists()).toBe(true)
    })

    it('버튼 텍스트가 올바르게 설정된다', () => {
      const primaryText = '저장'
      const secondaryText = '닫기'
      
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          showSecondaryButton: true,
          primaryButtonText: primaryText,
          secondaryButtonText: secondaryText
        }
      })

      expect(wrapper.find('[data-testid="popup-primary-button"]').text()).toBe(primaryText)
      expect(wrapper.find('[data-testid="popup-secondary-button"]').text()).toBe(secondaryText)
    })

    it('showPrimaryButton이 false일 때 primary 버튼이 표시되지 않는다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          showPrimaryButton: false
        }
      })

      expect(wrapper.find('[data-testid="popup-primary-button"]').exists()).toBe(false)
    })
  })

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('primary 버튼 클릭 시 primary-click 이벤트가 발생한다', async () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      await wrapper.find('[data-testid="popup-primary-button"]').trigger('click')

      expect(wrapper.emitted('primary-click')).toBeTruthy()
    })

    it('secondary 버튼 클릭 시 secondary-click 이벤트가 발생한다', async () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          showSecondaryButton: true
        }
      })

      await wrapper.find('[data-testid="popup-secondary-button"]').trigger('click')

      expect(wrapper.emitted('secondary-click')).toBeTruthy()
    })

    it('오버레이 클릭 시 overlay-click 이벤트가 발생한다', async () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      await wrapper.find('[data-testid="popup-overlay"]').trigger('click')

      expect(wrapper.emitted('overlay-click')).toBeTruthy()
    })

    it('closeOnOverlayClick이 true일 때 오버레이 클릭으로 팝업이 닫힌다', async () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          closeOnOverlayClick: true
        }
      })

      await wrapper.find('[data-testid="popup-overlay"]').trigger('click')

      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('closeOnOverlayClick이 false일 때 오버레이 클릭으로 팝업이 닫히지 않는다', async () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          closeOnOverlayClick: false
        }
      })

      await wrapper.find('[data-testid="popup-overlay"]').trigger('click')

      expect(wrapper.emitted('close')).toBeFalsy()
    })

    it('팝업 내부 클릭 시 이벤트가 전파되지 않는다', async () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      await wrapper.find('[data-testid="popup"]').trigger('click')

      expect(wrapper.emitted('overlay-click')).toBeFalsy()
    })

    it('ESC 키 입력 시 escape-press 이벤트가 발생한다', async () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      await wrapper.find('[data-testid="popup-overlay"]').trigger('keydown.esc')

      expect(wrapper.emitted('escape-press')).toBeTruthy()
    })

    it('closeOnEscape이 true일 때 ESC 키로 팝업이 닫힌다', async () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          closeOnEscape: true
        }
      })

      await wrapper.find('[data-testid="popup-overlay"]').trigger('keydown.esc')

      expect(wrapper.emitted('close')).toBeTruthy()
    })

    it('closeOnEscape이 false일 때 ESC 키로 팝업이 닫히지 않는다', async () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          closeOnEscape: false
        }
      })

      await wrapper.find('[data-testid="popup-overlay"]').trigger('keydown.esc')

      expect(wrapper.emitted('close')).toBeFalsy()
    })
  })

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('적절한 ARIA 속성이 설정된다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      const overlay = wrapper.find('[data-testid="popup-overlay"]')
      expect(overlay.attributes('role')).toBe('dialog')
      expect(overlay.attributes('aria-modal')).toBe('true')
      expect(overlay.attributes('aria-labelledby')).toContain('popup-')
      expect(overlay.attributes('aria-describedby')).toContain('popup-')
    })

    it('타이틀과 본문에 적절한 ID가 설정된다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      const title = wrapper.find('[data-testid="popup-title"]')
      const body = wrapper.find('[data-testid="popup-body"]')
      
      expect(title.attributes('id')).toContain('popup-')
      expect(title.attributes('id')).toContain('-title')
      expect(body.attributes('id')).toContain('popup-')
      expect(body.attributes('id')).toContain('-body')
    })

    it('버튼에 적절한 타입이 설정된다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          showSecondaryButton: true
        }
      })

      expect(wrapper.find('[data-testid="popup-primary-button"]').attributes('type')).toBe('button')
      expect(wrapper.find('[data-testid="popup-secondary-button"]').attributes('type')).toBe('button')
    })
  })

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('기본 클래스가 올바르게 적용된다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      expect(wrapper.classes()).toContain('popup-overlay')
      expect(wrapper.classes()).toContain('popup-overlay--default')
      expect(wrapper.classes()).toContain('popup-overlay--centered')
      expect(wrapper.classes()).toContain('popup-overlay--visible')
    })

    it('팝업에 올바른 클래스가 적용된다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          size: 'lg',
          variant: 'warning'
        }
      })

      const popup = wrapper.find('[data-testid="popup"]')
      expect(popup.classes()).toContain('popup')
      expect(popup.classes()).toContain('popup--lg')
      expect(popup.classes()).toContain('popup--warning')
      expect(popup.classes()).toContain('popup--has-title')
      expect(popup.classes()).toContain('popup--has-actions')
    })

    it('버튼에 올바른 클래스가 적용된다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          showSecondaryButton: true,
          variant: 'error'
        }
      })

      const primaryBtn = wrapper.find('[data-testid="popup-primary-button"]')
      const secondaryBtn = wrapper.find('[data-testid="popup-secondary-button"]')

      expect(primaryBtn.classes()).toContain('popup__button')
      expect(primaryBtn.classes()).toContain('popup__button--primary')
      expect(primaryBtn.classes()).toContain('popup__button--primary-error')

      expect(secondaryBtn.classes()).toContain('popup__button')
      expect(secondaryBtn.classes()).toContain('popup__button--secondary')
      expect(secondaryBtn.classes()).toContain('popup__button--secondary-error')
    })
  })

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('isVisible 변경 시 팝업이 올바르게 토글된다', async () => {
      wrapper = mount(Popup, {
        props: { isVisible: false }
      })

      expect(wrapper.find('[data-testid="popup-overlay"]').exists()).toBe(false)

      await wrapper.setProps({ isVisible: true })
      expect(wrapper.find('[data-testid="popup-overlay"]').exists()).toBe(true)

      await wrapper.setProps({ isVisible: false })
      expect(wrapper.find('[data-testid="popup-overlay"]').exists()).toBe(false)
    })

    it('title과 bodyText 변경 시 올바르게 업데이트된다', async () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          title: '초기 타이틀',
          bodyText: '초기 본문'
        }
      })

      expect(wrapper.find('[data-testid="popup-title"]').text()).toBe('초기 타이틀')
      expect(wrapper.find('[data-testid="popup-body"]').text()).toBe('초기 본문')

      await wrapper.setProps({ 
        title: '변경된 타이틀',
        bodyText: '변경된 본문'
      })

      expect(wrapper.find('[data-testid="popup-title"]').text()).toBe('변경된 타이틀')
      expect(wrapper.find('[data-testid="popup-body"]').text()).toBe('변경된 본문')
    })

    it('버튼 표시 옵션 변경 시 올바르게 업데이트된다', async () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      expect(wrapper.find('[data-testid="popup-primary-button"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup-secondary-button"]').exists()).toBe(false)

      await wrapper.setProps({ 
        showPrimaryButton: false,
        showSecondaryButton: true
      })

      expect(wrapper.find('[data-testid="popup-primary-button"]').exists()).toBe(false)
      expect(wrapper.find('[data-testid="popup-secondary-button"]').exists()).toBe(true)
    })
  })

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('타이틀과 본문이 모두 비어있어도 오류가 발생하지 않는다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          title: '',
          bodyText: '',
          showTitle: false
        }
      })

      expect(wrapper.find('[data-testid="popup"]').exists()).toBe(true)
    })

    it('모든 버튼을 숨겨도 오류가 발생하지 않는다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          showPrimaryButton: false,
          showSecondaryButton: false
        }
      })

      expect(wrapper.find('[data-testid="popup"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup-actions"]').exists()).toBe(false)
    })

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          title: undefined,
          bodyText: undefined,
          variant: undefined,
          size: undefined
        }
      })

      expect(wrapper.classes()).toContain('popup-overlay--default')
      expect(wrapper.find('[data-testid="popup"]').classes()).toContain('popup--md')
    })

    it('매우 긴 텍스트도 올바르게 처리된다', () => {
      const longText = 'A'.repeat(1000)
      wrapper = mount(Popup, {
        props: { 
          isVisible: true,
          title: longText,
          bodyText: longText
        }
      })

      expect(wrapper.find('[data-testid="popup-title"]').text()).toBe(longText)
      expect(wrapper.find('[data-testid="popup-body"]').text()).toBe(longText)
    })
  })

  // 컴포넌트 생명주기 테스트
  describe('컴포넌트 생명주기 테스트', () => {
    it('컴포넌트가 올바르게 마운트된다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('[data-testid="popup"]').exists()).toBe(true)
    })

    it('컴포넌트가 올바르게 언마운트된다', () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      wrapper.unmount()
      expect(wrapper.exists()).toBe(false)
    })
  })

  // 성능 테스트
  describe('성능 테스트', () => {
    it('컴포넌트가 빠르게 마운트된다', () => {
      const start = performance.now()
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })
      const end = performance.now()

      expect(wrapper.exists()).toBe(true)
      expect(end - start).toBeLessThan(100) // 100ms 이내
    })

    it('props 업데이트가 효율적으로 처리된다', async () => {
      wrapper = mount(Popup, {
        props: { isVisible: true }
      })

      const start = performance.now()
      for (let i = 0; i < 10; i++) {
        await wrapper.setProps({ title: `Title ${i}` })
      }
      const end = performance.now()

      expect(end - start).toBeLessThan(100) // 100ms 이내
    })
  })

  // 다양한 Props 조합 테스트
  describe('Props 조합 테스트', () => {
    const variants = ['default', 'warning', 'error', 'success'] as const
    const sizes = ['sm', 'md', 'lg'] as const

    variants.forEach(variant => {
      sizes.forEach(size => {
        it(`${variant} + ${size} 조합이 올바르게 렌더링된다`, () => {
          wrapper = mount(Popup, {
            props: { 
              isVisible: true,
              variant,
              size,
              showSecondaryButton: true
            }
          })

          expect(wrapper.classes()).toContain(`popup-overlay--${variant}`)
          expect(wrapper.find('[data-testid="popup"]').classes()).toContain(`popup--${size}`)
          expect(wrapper.find('[data-testid="popup"]').classes()).toContain(`popup--${variant}`)
        })
      })
    })
  })
})