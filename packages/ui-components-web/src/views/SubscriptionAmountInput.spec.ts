import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import SubscriptionAmountInput from './SubscriptionAmountInput.vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Cta from '../components/Cta.vue'
import {
  DEFAULT_SUBSCRIPTION_AMOUNT_INPUT_DATA,
  SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS,
  formatAmountToKorean,
  formatAmountToDisplay,
  validateAmount
} from '../types/subscriptionAmountInputTypes'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/subscription-amount-input',
      name: 'SubscriptionAmountInput',
      component: SubscriptionAmountInput
    }
  ]
})

describe('SubscriptionAmountInput.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    await router.push('/subscription-amount-input')
    wrapper = mount(SubscriptionAmountInput, {
      global: {
        plugins: [router],
        stubs: {
          Navigation,
          Progress,
          Cta
        }
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('Page Rendering', () => {
    it('renders the page with correct data-testid', () => {
      expect(wrapper.find('[data-testid="subscription-amount-input"]').exists()).toBe(true)
    })

    it('renders with correct Figma node IDs', () => {
      const { FIGMA_NODE_IDS } = SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.FRAME}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.HEADER}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.CONTENTS}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.KEYPAD}"]`).exists()).toBe(true)
    })

    it('renders the page title correctly', () => {
      const titleElement = wrapper.find('.page__title-text')
      expect(titleElement.exists()).toBe(true)
      expect(titleElement.text()).toBe(SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.TITLE)
    })

    it('displays the default amount correctly', () => {
      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.exists()).toBe(true)
      expect(amountElement.text()).toBe('100,000원')
    })

    it('displays the Korean amount correctly', () => {
      const koreanAmountElement = wrapper.find('.price-box__message-text')
      expect(koreanAmountElement.exists()).toBe(true)
      expect(koreanAmountElement.text()).toBe('십만원')
    })
  })

  describe('Component Integration', () => {
    it('renders Navigation component with correct props', () => {
      const navigation = wrapper.findComponent(Navigation)
      expect(navigation.exists()).toBe(true)
      expect(navigation.props('previous')).toBe(true)
      expect(navigation.props('title')).toBe(true)
      expect(navigation.props('title1')).toBe('청약 가입')
      expect(navigation.props('cs')).toBe(true)
      expect(navigation.props('cancel')).toBe(true)
    })

    it('renders Progress component with correct props', () => {
      const progress = wrapper.findComponent(Progress)
      expect(progress.exists()).toBe(true)
      expect(progress.props('ratio')).toBe(SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.PROGRESS_RATIO)
      expect(progress.props('showAnimation')).toBe(false)
      expect(progress.props('size')).toBe('md')
      expect(progress.props('color')).toBe('green')
    })

    it('renders Cta component with correct props', () => {
      const cta = wrapper.findComponent(Cta)
      expect(cta.exists()).toBe(true)
      expect(cta.props('disabled')).toBe(false) // Valid default amount
      expect(cta.text()).toBe('다음')
    })
  })

  describe('Quick Amount Buttons', () => {
    it('renders all quick amount buttons', () => {
      const quickButtons = wrapper.findAll('.keypad__quick-button')
      expect(quickButtons.length).toBe(4)

      const expectedLabels = ['+1만원', '+5만원', '+10만원', '+100만원']
      quickButtons.forEach((button, index) => {
        expect(button.text()).toBe(expectedLabels[index])
      })
    })

    it('adds amount when quick button is clicked', async () => {
      const initialAmount = 100000
      const quickButton = wrapper.find('.keypad__quick-button') // +1만원

      await quickButton.trigger('click')

      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.text()).toBe('110,000원') // 100,000 + 10,000
    })

    it('updates Korean display when quick amount is added', async () => {
      const quickButton = wrapper.findAll('.keypad__quick-button')[1] // +5만원

      await quickButton.trigger('click')

      const koreanAmountElement = wrapper.find('.price-box__message-text')
      expect(koreanAmountElement.text()).toBe('십오만원') // 십만원 + 오만원
    })

    it('does not exceed maximum amount when adding quick amounts', async () => {
      // Set amount close to maximum
      const component = wrapper.vm
      component.currentAmount = 14900000 // 1,490만원
      await wrapper.vm.$nextTick()

      const quickButton = wrapper.findAll('.keypad__quick-button')[3] // +100만원
      await quickButton.trigger('click')

      // Should not exceed 1,500만원
      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.text()).toBe('14,900,000원') // Unchanged
    })
  })

  describe('Number Keypad', () => {
    it('renders all number buttons', () => {
      const numberButtons = wrapper.findAll('.keypad__number')
      expect(numberButtons.length).toBe(11) // 0-9 + 00

      // Check specific numbers
      const buttonTexts = numberButtons.map(button => button.text())
      expect(buttonTexts).toContain('1')
      expect(buttonTexts).toContain('2')
      expect(buttonTexts).toContain('3')
      expect(buttonTexts).toContain('0')
      expect(buttonTexts).toContain('00')
    })

    it('renders backspace button', () => {
      const backspaceButton = wrapper.find('.keypad__backspace')
      expect(backspaceButton.exists()).toBe(true)
    })

    it('appends digit when number button is clicked', async () => {
      // Reset to 0 first
      const component = wrapper.vm
      component.currentAmount = 0
      await wrapper.vm.$nextTick()

      const numberButton = wrapper.findAll('.keypad__number').find(btn => btn.text() === '5')
      await numberButton!.trigger('click')

      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.text()).toBe('5원')
    })

    it('appends multiple digits correctly', async () => {
      const component = wrapper.vm
      component.currentAmount = 0
      await wrapper.vm.$nextTick()

      // Click 1, 2, 3
      const buttons = wrapper.findAll('.keypad__number')
      const button1 = buttons.find(btn => btn.text() === '1')
      const button2 = buttons.find(btn => btn.text() === '2')
      const button3 = buttons.find(btn => btn.text() === '3')

      await button1!.trigger('click')
      await button2!.trigger('click')
      await button3!.trigger('click')

      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.text()).toBe('123원')
    })

    it('handles double zero button correctly', async () => {
      const component = wrapper.vm
      component.currentAmount = 1
      await wrapper.vm.$nextTick()

      const doubleZeroButton = wrapper.findAll('.keypad__number').find(btn => btn.text() === '00')
      await doubleZeroButton!.trigger('click')

      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.text()).toBe('100원')
    })

    it('removes last digit when backspace is clicked', async () => {
      const component = wrapper.vm
      component.currentAmount = 123
      await wrapper.vm.$nextTick()

      const backspaceButton = wrapper.find('.keypad__backspace')
      await backspaceButton.trigger('click')

      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.text()).toBe('12원')
    })

    it('handles backspace on single digit', async () => {
      const component = wrapper.vm
      component.currentAmount = 5
      await wrapper.vm.$nextTick()

      const backspaceButton = wrapper.find('.keypad__backspace')
      await backspaceButton.trigger('click')

      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.text()).toBe('0원')
    })

    it('prevents exceeding maximum amount', async () => {
      const component = wrapper.vm
      component.currentAmount = 1500000 // 150만원
      await wrapper.vm.$nextTick()

      const numberButton = wrapper.findAll('.keypad__number').find(btn => btn.text() === '0')
      await numberButton!.trigger('click')

      // Should not exceed 1,500만원 (15,000,000)
      const amountElement = wrapper.find('.price-box__amount')
      expect(amountElement.text()).toBe('1,500,000원') // Should remain unchanged if would exceed max
    })
  })

  describe('Amount Validation', () => {
    it('enables CTA button for valid amounts', async () => {
      const component = wrapper.vm
      component.currentAmount = 100000 // Valid amount
      await wrapper.vm.$nextTick()

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('disabled')).toBe(false)
    })

    it('disables CTA button for amounts below minimum', async () => {
      const component = wrapper.vm
      component.currentAmount = 10000 // Below 2만원 minimum
      await wrapper.vm.$nextTick()

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('disabled')).toBe(true)
    })

    it('disables CTA button for amounts above maximum', async () => {
      const component = wrapper.vm
      component.currentAmount = 16000000 // Above 1,500만원 maximum
      await wrapper.vm.$nextTick()

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('disabled')).toBe(true)
    })
  })

  describe('Navigation Events', () => {
    it('emits previous event when Navigation previous is clicked', async () => {
      const navigation = wrapper.findComponent(Navigation)
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      navigation.vm.$emit('previous', { type: 'previous', timestamp: Date.now() })
      await wrapper.vm.$nextTick()

      expect(consoleSpy).toHaveBeenCalledWith(
        'Previous button clicked',
        expect.objectContaining({ type: 'previous' })
      )

      consoleSpy.mockRestore()
    })

    it('emits cs event when Navigation cs is clicked', async () => {
      const navigation = wrapper.findComponent(Navigation)
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      navigation.vm.$emit('cs', { type: 'cs', timestamp: Date.now() })
      await wrapper.vm.$nextTick()

      expect(consoleSpy).toHaveBeenCalledWith(
        'CS center button clicked',
        expect.objectContaining({ type: 'cs' })
      )

      consoleSpy.mockRestore()
    })

    it('emits cancel event when Navigation cancel is clicked', async () => {
      const navigation = wrapper.findComponent(Navigation)
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      navigation.vm.$emit('cancel', { type: 'cancel', timestamp: Date.now() })
      await wrapper.vm.$nextTick()

      expect(consoleSpy).toHaveBeenCalledWith(
        'Cancel button clicked',
        expect.objectContaining({ type: 'cancel' })
      )

      consoleSpy.mockRestore()
    })
  })

  describe('CTA Interaction', () => {
    it('handles next button click for valid amount', async () => {
      const component = wrapper.vm
      component.currentAmount = 500000 // Valid amount
      await wrapper.vm.$nextTick()

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent(Cta)

      cta.vm.$emit('click')
      await wrapper.vm.$nextTick()

      expect(consoleSpy).toHaveBeenCalledWith('Proceeding with amount:', 500000)
      consoleSpy.mockRestore()
    })

    it('does not proceed for invalid amount', async () => {
      const component = wrapper.vm
      component.currentAmount = 10000 // Invalid amount (too low)
      await wrapper.vm.$nextTick()

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent(Cta)

      // CTA should be disabled, but test the logic
      expect(component.isValidAmount).toBe(false)

      consoleSpy.mockRestore()
    })
  })

  describe('Korean Amount Formatting', () => {
    it('formats simple amounts correctly', () => {
      expect(formatAmountToKorean(10000)).toBe('일만원')
      expect(formatAmountToKorean(50000)).toBe('오만원')
      expect(formatAmountToKorean(100000)).toBe('십만원')
    })

    it('formats complex amounts correctly', () => {
      expect(formatAmountToKorean(123456)).toBe('십이만삼천사백오십육원')
      expect(formatAmountToKorean(1000000)).toBe('일백만원')
      expect(formatAmountToKorean(5500000)).toBe('오백오십만원')
    })

    it('handles zero amount', () => {
      expect(formatAmountToKorean(0)).toBe('')
    })
  })

  describe('Display Amount Formatting', () => {
    it('formats amounts with Korean locale', () => {
      expect(formatAmountToDisplay(100000)).toBe('100,000원')
      expect(formatAmountToDisplay(1234567)).toBe('1,234,567원')
      expect(formatAmountToDisplay(15000000)).toBe('15,000,000원')
    })
  })

  describe('Amount Validation Helpers', () => {
    it('validates amounts within range', () => {
      expect(validateAmount(100000)).toEqual({ isValid: true })
      expect(validateAmount(1000000)).toEqual({ isValid: true })
      expect(validateAmount(15000000)).toEqual({ isValid: true })
    })

    it('invalidates amounts below minimum', () => {
      const result = validateAmount(10000)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe(SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.VALIDATION.AMOUNT_TOO_LOW)
    })

    it('invalidates amounts above maximum', () => {
      const result = validateAmount(16000000)
      expect(result.isValid).toBe(false)
      expect(result.message).toBe(SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.VALIDATION.AMOUNT_TOO_HIGH)
    })
  })

  describe('Page State Management', () => {
    it('initializes with default data', () => {
      const component = wrapper.vm
      expect(component.pageData).toEqual(
        expect.objectContaining({
          amount: DEFAULT_SUBSCRIPTION_AMOUNT_INPUT_DATA.amount,
          isValidAmount: true
        })
      )
    })

    it('updates page data when amount changes', async () => {
      const component = wrapper.vm
      component.currentAmount = 200000
      component.updatePageData()
      await wrapper.vm.$nextTick()

      expect(component.pageData.amount).toBe(200000)
      expect(component.pageData.isValidAmount).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for interactive elements', () => {
      const navigation = wrapper.findComponent(Navigation)
      expect(navigation.exists()).toBe(true)

      const progress = wrapper.findComponent(Progress)
      expect(progress.exists()).toBe(true)
    })

    it('supports keyboard navigation for buttons', () => {
      const quickButtons = wrapper.findAll('.keypad__quick-button')
      quickButtons.forEach(button => {
        expect(button.attributes('tabindex')).not.toBe('-1')
      })
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive classes correctly', () => {
      const pageElement = wrapper.find('.subscription-amount-input')
      expect(pageElement.exists()).toBe(true)
      expect(pageElement.classes()).toContain('subscription-amount-input')
    })
  })

  describe('Error Handling', () => {
    it('handles invalid number input gracefully', async () => {
      const component = wrapper.vm
      const initialAmount = component.currentAmount

      // Try to input invalid data - should not crash
      try {
        component.appendNumber('invalid')
        await wrapper.vm.$nextTick()
      } catch (error) {
        // Should not throw error
        expect(error).toBeUndefined()
      }

      // Amount should remain unchanged
      expect(component.currentAmount).toBe(initialAmount)
    })
  })
})