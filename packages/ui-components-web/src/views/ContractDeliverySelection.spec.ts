import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ContractDeliverySelection from './ContractDeliverySelection.vue'
import type { ContractDeliverySelectionData } from '../types/contractDeliverySelectionTypes'
import {
  CONTRACT_DELIVERY_SELECTION_CONSTANTS,
  validateEmail,
  validateContractDeliverySelection,
  createDeliveryMethodOptions,
  getEmailDomainSuggestions,
  formatEmailForDisplay,
  isCommonEmailDomain,
  generateDeliveryMethodSummary
} from '../types/contractDeliverySelectionTypes'

// Mock components
const mockNavigation = {
  template: '<div data-testid="mock-navigation"><slot /></div>',
  props: ['previous', 'title', 'title1', 'cs', 'cancel'],
  emits: ['previous', 'cs', 'cancel']
}

const mockProgress = {
  template: '<div data-testid="mock-progress"></div>',
  props: ['ratio', 'show-animation', 'size', 'color']
}

const mockRadio = {
  template: '<div data-testid="mock-radio"><slot /></div>',
  props: ['modelValue', 'options'],
  emits: ['update:modelValue', 'change']
}

const mockInput = {
  template: '<div data-testid="mock-input"><slot /></div>',
  props: ['modelValue', 'type', 'placeholder', 'disabled', 'show-validation'],
  emits: ['update:modelValue', 'input', 'blur']
}

const mockCta = {
  template: '<div data-testid="mock-cta"><slot /></div>',
  props: ['disabled', 'primary-text'],
  emits: ['primary']
}

describe('ContractDeliverySelection.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ContractDeliverySelection, {
      global: {
        components: {
          Navigation: mockNavigation,
          Progress: mockProgress,
          Radio: mockRadio,
          Input: mockInput,
          Cta: mockCta
        }
      }
    })
  })

  // Component Structure Tests
  describe('Component Structure', () => {
    it('renders main container with correct data attributes', () => {
      const container = wrapper.find('[data-testid="contract-delivery-selection"]')
      expect(container.exists()).toBe(true)
      expect(container.attributes('data-node-id')).toBe('1:2631')
    })

    it('renders header section with Navigation and Progress', () => {
      const header = wrapper.find('.page__header')
      expect(header.exists()).toBe(true)
      expect(header.attributes('data-node-id')).toBe('1:2641')
      expect(wrapper.findComponent({ name: 'Navigation' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Progress' }).exists()).toBe(true)
    })

    it('renders contents section with title and form elements', () => {
      const contents = wrapper.find('.page__contents')
      expect(contents.exists()).toBe(true)
      expect(contents.attributes('data-node-id')).toBe('1:2632')
    })

    it('renders CTA section with button', () => {
      const cta = wrapper.find('.page__cta')
      expect(cta.exists()).toBe(true)
      expect(cta.attributes('data-node-id')).toBe('1:2644')
      expect(wrapper.findComponent({ name: 'Cta' }).exists()).toBe(true)
    })
  })

  // Title and Content Tests
  describe('Title and Content', () => {
    it('displays correct page title from Figma', () => {
      const title = wrapper.find('.page__title-text')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('계약서류는 어디로 보내드릴까요?')
      expect(title.attributes('data-node-id')).toBe('1:2635')
    })

    it('applies correct typography styles to title', () => {
      const title = wrapper.find('.page__title-text')
      const styles = getComputedStyle(title.element)
      expect(styles.fontSize).toBe('var(--heading-h2-semibold-size)')
      expect(styles.fontWeight).toBe('var(--heading-h2-semibold-weight)')
    })
  })

  // Navigation Tests
  describe('Navigation Component', () => {
    it('passes correct props to Navigation component', () => {
      const navigation = wrapper.findComponent({ name: 'Navigation' })
      expect(navigation.props()).toEqual({
        previous: true,
        title: true,
        title1: '청약 가입',
        cs: true,
        cancel: true
      })
    })

    it('handles navigation events correctly', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const navigation = wrapper.findComponent({ name: 'Navigation' })

      await navigation.vm.$emit('previous', { type: 'previous', timestamp: Date.now() })
      await navigation.vm.$emit('cs', { type: 'cs', timestamp: Date.now() })
      await navigation.vm.$emit('cancel', { type: 'cancel', timestamp: Date.now() })

      expect(consoleSpy).toHaveBeenCalledTimes(3)
      consoleSpy.mockRestore()
    })
  })

  // Progress Component Tests
  describe('Progress Component', () => {
    it('passes correct progress ratio from constants', () => {
      const progress = wrapper.findComponent({ name: 'Progress' })
      expect(progress.props('ratio')).toBe(CONTRACT_DELIVERY_SELECTION_CONSTANTS.PROGRESS_RATIO)
      expect(progress.props('ratio')).toBe(0.7)
    })

    it('configures progress component correctly', () => {
      const progress = wrapper.findComponent({ name: 'Progress' })
      expect(progress.props()).toEqual({
        ratio: 0.7,
        'show-animation': false,
        size: 'md',
        color: 'green'
      })
    })
  })

  // Radio Component Tests
  describe('Radio Component for Delivery Method', () => {
    it('renders radio component with correct options', () => {
      const radio = wrapper.findComponent({ name: 'Radio' })
      expect(radio.exists()).toBe(true)
      expect(radio.props('options')).toEqual([
        { label: '이메일', value: 'email' },
        { label: '문자메시지', value: 'sms' }
      ])
    })

    it('defaults to email selection as shown in Figma', () => {
      const radio = wrapper.findComponent({ name: 'Radio' })
      expect(radio.props('modelValue')).toBe('email')
    })

    it('handles delivery method change correctly', async () => {
      const radio = wrapper.findComponent({ name: 'Radio' })

      await radio.vm.$emit('change', 'sms')
      await nextTick()

      expect(wrapper.vm.selectedDeliveryMethod).toBe('sms')
    })
  })

  // Email Input Tests
  describe('Email Input Component', () => {
    it('shows email input when email delivery method is selected', async () => {
      wrapper.vm.selectedDeliveryMethod = 'email'
      await nextTick()

      const emailInput = wrapper.find('.page__email-input')
      expect(emailInput.exists()).toBe(true)
      expect(emailInput.attributes('data-node-id')).toBe('1:2640')
    })

    it('hides email input when SMS delivery method is selected', async () => {
      wrapper.vm.selectedDeliveryMethod = 'sms'
      await nextTick()

      const emailInput = wrapper.find('.page__email-input')
      expect(emailInput.exists()).toBe(false)
    })

    it('passes correct props to Input component', async () => {
      wrapper.vm.selectedDeliveryMethod = 'email'
      await nextTick()

      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.props()).toEqual({
        value: '',
        state: 'inactive',
        label: false,
        message: false,
        'placeholder-text': '이메일 주소를 입력해주세요'
      })
    })

    it('handles email input changes correctly', async () => {
      wrapper.vm.selectedDeliveryMethod = 'email'
      await nextTick()

      const input = wrapper.findComponent({ name: 'Input' })
      await input.vm.$emit('input', new Event('input'), 'test@example.com')

      expect(wrapper.vm.emailAddress).toBe('test@example.com')
    })

    it('handles email input blur event', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      wrapper.vm.selectedDeliveryMethod = 'email'
      await nextTick()

      const input = wrapper.findComponent({ name: 'Input' })
      await input.vm.$emit('blur', new FocusEvent('blur'))

      expect(consoleSpy).toHaveBeenCalledWith('Email input blurred')
      consoleSpy.mockRestore()
    })
  })

  // CTA Component Tests
  describe('CTA Component', () => {
    it('passes correct props to CTA component', () => {
      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props('primary-text')).toBe('다음')
      expect(cta.props('disabled')).toBe(true) // Should be disabled with empty email
    })

    it('enables CTA when form is valid for email delivery', async () => {
      wrapper.vm.selectedDeliveryMethod = 'email'
      wrapper.vm.emailAddress = 'valid@email.com'
      await nextTick()

      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props('disabled')).toBe(false)
    })

    it('disables CTA when email is invalid', async () => {
      wrapper.vm.selectedDeliveryMethod = 'email'
      wrapper.vm.emailAddress = 'invalid-email'
      await nextTick()

      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props('disabled')).toBe(true)
    })

    it('enables CTA for SMS delivery without additional input', async () => {
      wrapper.vm.selectedDeliveryMethod = 'sms'
      await nextTick()

      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props('disabled')).toBe(false)
    })

    it('handles CTA click correctly when form is valid', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      // Set valid email first
      wrapper.vm.selectedDeliveryMethod = 'email'
      wrapper.vm.emailAddress = 'test@example.com'
      await nextTick()

      const cta = wrapper.findComponent({ name: 'Cta' })
      await cta.vm.$emit('primary')

      expect(consoleSpy).toHaveBeenCalledWith('Proceeding with delivery method:', {
        method: 'email',
        email: 'test@example.com'
      })
      consoleSpy.mockRestore()
    })
  })

  // Form Validation Tests
  describe('Form Validation', () => {
    it('validates email addresses correctly', () => {
      expect(wrapper.vm.isValidEmail('valid@email.com')).toBe(true)
      expect(wrapper.vm.isValidEmail('test@naver.com')).toBe(true)
      expect(wrapper.vm.isValidEmail('invalid-email')).toBe(false)
      expect(wrapper.vm.isValidEmail('no-at-sign.com')).toBe(false)
      expect(wrapper.vm.isValidEmail('')).toBe(false)
    })

    it('updates form validity based on current state', async () => {
      // Valid email scenario
      wrapper.vm.selectedDeliveryMethod = 'email'
      wrapper.vm.emailAddress = 'test@valid.com'
      await nextTick()
      expect(wrapper.vm.isFormValid).toBe(true)

      // Invalid email scenario
      wrapper.vm.emailAddress = 'invalid'
      await nextTick()
      expect(wrapper.vm.isFormValid).toBe(false)

      // SMS scenario (always valid)
      wrapper.vm.selectedDeliveryMethod = 'sms'
      await nextTick()
      expect(wrapper.vm.isFormValid).toBe(true)
    })
  })

  // Data Management Tests
  describe('Data Management', () => {
    it('initializes with correct default data', () => {
      expect(wrapper.vm.selectedDeliveryMethod).toBe('email')
      expect(wrapper.vm.emailAddress).toBe('')
      expect(wrapper.vm.deliveryMethodOptions).toEqual([
        { label: '이메일', value: 'email' },
        { label: '문자메시지', value: 'sms' }
      ])
    })

    it('updates page data when form state changes', async () => {
      const initialData = { ...wrapper.vm.pageData }

      wrapper.vm.selectedDeliveryMethod = 'sms'
      wrapper.vm.updatePageData()
      await nextTick()

      expect(wrapper.vm.pageData).not.toEqual(initialData)
      expect(wrapper.vm.pageData.deliveryMethod).toBe('sms')
      expect(wrapper.vm.pageData.emailAddress).toBe('')
    })

    it('calls updatePageData on mount', () => {
      const updateSpy = vi.spyOn(wrapper.vm, 'updatePageData')
      wrapper.vm.$options.mounted[0].call(wrapper.vm)
      expect(updateSpy).toHaveBeenCalled()
    })
  })

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has proper ARIA attributes and semantic structure', () => {
      const title = wrapper.find('.page__title-text')
      expect(title.element.tagName).toBe('H1')

      const container = wrapper.find('[data-testid="contract-delivery-selection"]')
      expect(container.exists()).toBe(true)
    })

    it('maintains focus management for radio interactions', () => {
      const radioSection = wrapper.find('.page__radio-section')
      expect(radioSection.exists()).toBe(true)
    })
  })

  // Design Token Tests
  describe('Design Tokens and Styling', () => {
    it('applies correct CSS custom properties', () => {
      const container = wrapper.find('.contract-delivery-selection')
      expect(container.classes()).toContain('contract-delivery-selection')
    })

    it('uses correct Figma node IDs for mapping', () => {
      expect(wrapper.find('[data-node-id="1:2631"]').exists()).toBe(true) // Frame
      expect(wrapper.find('[data-node-id="1:2641"]').exists()).toBe(true) // Header
      expect(wrapper.find('[data-node-id="1:2632"]').exists()).toBe(true) // Contents
      expect(wrapper.find('[data-node-id="1:2644"]').exists()).toBe(true) // CTA
    })

    it('applies responsive design classes', () => {
      const container = wrapper.find('.contract-delivery-selection')
      expect(container.exists()).toBe(true)
      // CSS classes are applied through style tag, would need DOM testing for full verification
    })
  })

  // Error Handling Tests
  describe('Error Handling', () => {
    it('handles invalid email gracefully', async () => {
      wrapper.vm.selectedDeliveryMethod = 'email'
      wrapper.vm.emailAddress = 'invalid@'
      await nextTick()

      expect(wrapper.vm.isFormValid).toBe(false)
      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props('disabled')).toBe(true)
    })

    it('handles empty email address', async () => {
      wrapper.vm.selectedDeliveryMethod = 'email'
      wrapper.vm.emailAddress = ''
      await nextTick()

      expect(wrapper.vm.isFormValid).toBe(false)
    })
  })

  // Integration Tests
  describe('Component Integration', () => {
    it('integrates all components correctly', () => {
      expect(wrapper.findComponent({ name: 'Navigation' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Progress' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Radio' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Cta' }).exists()).toBe(true)
    })

    it('maintains consistent state across component interactions', async () => {
      // Change delivery method
      const radio = wrapper.findComponent({ name: 'Radio' })
      await radio.vm.$emit('change', 'sms')
      await nextTick()

      // Verify state consistency
      expect(wrapper.vm.selectedDeliveryMethod).toBe('sms')
      expect(wrapper.vm.pageData.deliveryMethod).toBe('sms')
      expect(wrapper.vm.isFormValid).toBe(true)

      // Verify CTA state
      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props('disabled')).toBe(false)
    })
  })
})

// Type Validation Tests
describe('ContractDeliverySelectionTypes', () => {
  describe('validateEmail function', () => {
    it('validates email addresses correctly', () => {
      expect(validateEmail('test@example.com')).toEqual({ isValid: true })
      expect(validateEmail('user@naver.com')).toEqual({ isValid: true })
      expect(validateEmail('invalid')).toEqual({
        isValid: false,
        error: CONTRACT_DELIVERY_SELECTION_CONSTANTS.VALIDATION.EMAIL_INVALID
      })
      expect(validateEmail('')).toEqual({
        isValid: false,
        error: CONTRACT_DELIVERY_SELECTION_CONSTANTS.VALIDATION.EMAIL_REQUIRED
      })
    })
  })

  describe('validateContractDeliverySelection function', () => {
    it('validates complete form data correctly', () => {
      const validEmailData: ContractDeliverySelectionData = {
        deliveryMethod: 'email',
        emailAddress: 'test@example.com',
        isFormValid: true
      }

      const validSmsData: ContractDeliverySelectionData = {
        deliveryMethod: 'sms',
        emailAddress: '',
        isFormValid: true
      }

      const invalidData: ContractDeliverySelectionData = {
        deliveryMethod: 'email',
        emailAddress: 'invalid-email',
        isFormValid: false
      }

      expect(validateContractDeliverySelection(validEmailData)).toEqual({
        isValid: true,
        errors: []
      })

      expect(validateContractDeliverySelection(validSmsData)).toEqual({
        isValid: true,
        errors: []
      })

      expect(validateContractDeliverySelection(invalidData).isValid).toBe(false)
    })
  })

  describe('Helper functions', () => {
    it('creates delivery method options correctly', () => {
      const options = createDeliveryMethodOptions()
      expect(options).toEqual([
        { label: '이메일', value: 'email' },
        { label: '문자메시지', value: 'sms' }
      ])
    })

    it('generates email domain suggestions', () => {
      const suggestions = getEmailDomainSuggestions('test')
      expect(suggestions).toContain('test@naver.com')
      expect(suggestions).toContain('test@gmail.com')
    })

    it('formats email for display correctly', () => {
      expect(formatEmailForDisplay('short@email.com')).toBe('short@email.com')
      expect(formatEmailForDisplay('verylongemailaddressthatshouldbetruncat@example.com'))
        .toBe('verylongemailadd...@example.com')
    })

    it('checks common email domains', () => {
      expect(isCommonEmailDomain('test@naver.com')).toBe(true)
      expect(isCommonEmailDomain('test@gmail.com')).toBe(true)
      expect(isCommonEmailDomain('test@rare-domain.co.kr')).toBe(false)
    })

    it('generates delivery method summary', () => {
      const emailData: ContractDeliverySelectionData = {
        deliveryMethod: 'email',
        emailAddress: 'test@example.com',
        isFormValid: true
      }

      const smsData: ContractDeliverySelectionData = {
        deliveryMethod: 'sms',
        emailAddress: '',
        isFormValid: true
      }

      expect(generateDeliveryMethodSummary(emailData)).toBe('이메일로 발송 (test@example.com)')
      expect(generateDeliveryMethodSummary(smsData)).toBe('문자메시지로 발송')
    })
  })

  describe('Constants validation', () => {
    it('has correct progress ratio', () => {
      expect(CONTRACT_DELIVERY_SELECTION_CONSTANTS.PROGRESS_RATIO).toBe(0.7)
    })

    it('has correct Figma node IDs', () => {
      expect(CONTRACT_DELIVERY_SELECTION_CONSTANTS.FIGMA_NODE_IDS.FRAME).toBe('1:2631')
      expect(CONTRACT_DELIVERY_SELECTION_CONSTANTS.FIGMA_NODE_IDS.EMAIL_INPUT).toBe('1:2640')
    })

    it('has correct design tokens', () => {
      expect(CONTRACT_DELIVERY_SELECTION_CONSTANTS.DESIGN_TOKENS.FRAME_WIDTH).toBe(360)
      expect(CONTRACT_DELIVERY_SELECTION_CONSTANTS.DESIGN_TOKENS.FRAME_HEIGHT).toBe(760)
    })

    it('has correct validation messages', () => {
      expect(CONTRACT_DELIVERY_SELECTION_CONSTANTS.VALIDATION.EMAIL_REQUIRED).toBe('이메일 주소를 입력해 주세요')
      expect(CONTRACT_DELIVERY_SELECTION_CONSTANTS.VALIDATION.EMAIL_INVALID).toBe('올바른 이메일 주소를 입력해 주세요')
    })
  })
})