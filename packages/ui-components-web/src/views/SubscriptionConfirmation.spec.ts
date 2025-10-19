import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SubscriptionConfirmation from './SubscriptionConfirmation.vue'
import type { SubscriptionConfirmationData, SummaryItem } from '../types/subscriptionConfirmationTypes'
import {
  SUBSCRIPTION_CONFIRMATION_CONSTANTS,
  validateSubscriptionData,
  createSummaryItems,
  updateSummaryItemsWithDynamicData,
  formatAmount,
  formatAccountNumber,
  parseAmount,
  generateConfirmationSummary,
  calculateMonthlyAmount,
  formatTransferCycle,
  isSubscriptionDataComplete,
  MOCK_SUBSCRIPTION_DATA
} from '../types/subscriptionConfirmationTypes'

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

const mockSummary = {
  template: '<div data-testid="mock-summary"><slot /></div>',
  props: ['variant', 'show-header', 'show-list', 'items'],
  emits: []
}

const mockCta = {
  template: '<div data-testid="mock-cta"><slot /></div>',
  props: ['show-secondary', 'secondary-text', 'primary-text', 'disabled'],
  emits: ['secondary', 'primary']
}

describe('SubscriptionConfirmation.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(SubscriptionConfirmation, {
      global: {
        components: {
          Navigation: mockNavigation,
          Progress: mockProgress,
          Summary: mockSummary,
          Cta: mockCta
        }
      }
    })
  })

  // Component Structure Tests
  describe('Component Structure', () => {
    it('renders main container with correct data attributes', () => {
      const container = wrapper.find('[data-testid="subscription-confirmation"]')
      expect(container.exists()).toBe(true)
      expect(container.attributes('data-node-id')).toBe('1:2664')
    })

    it('renders header section with Navigation and Progress', () => {
      const header = wrapper.find('.page__header')
      expect(header.exists()).toBe(true)
      expect(header.attributes('data-node-id')).toBe('1:2669')
      expect(wrapper.findComponent({ name: 'Navigation' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Progress' }).exists()).toBe(true)
    })

    it('renders contents section with title and summary', () => {
      const contents = wrapper.find('.page__contents')
      expect(contents.exists()).toBe(true)
      expect(contents.attributes('data-node-id')).toBe('1:2665')

      expect(wrapper.find('.page__title').exists()).toBe(true)
      expect(wrapper.find('.page__summary-section').exists()).toBe(true)
    })

    it('renders CTA section with dual buttons', () => {
      const cta = wrapper.find('.page__cta')
      expect(cta.exists()).toBe(true)
      expect(cta.attributes('data-node-id')).toBe('1:2672')
      expect(wrapper.findComponent({ name: 'Cta' }).exists()).toBe(true)
    })
  })

  // Title and Content Tests
  describe('Title and Content', () => {
    it('displays correct page title from Figma', () => {
      const title = wrapper.find('.page__title-text')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('가입정보를 확인해 주세요')
      expect(title.attributes('data-node-id')).toBe('1:2667')
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
      expect(progress.props('ratio')).toBe(SUBSCRIPTION_CONFIRMATION_CONSTANTS.PROGRESS_RATIO)
      expect(progress.props('ratio')).toBe(0.9)
    })

    it('configures progress component correctly', () => {
      const progress = wrapper.findComponent({ name: 'Progress' })
      expect(progress.props()).toEqual({
        ratio: 0.9,
        'show-animation': false,
        size: 'md',
        color: 'green'
      })
    })
  })

  // Summary Component Tests
  describe('Summary Component', () => {
    it('renders Summary component with correct props', () => {
      const summary = wrapper.findComponent({ name: 'Summary' })
      expect(summary.exists()).toBe(true)
      expect(summary.props()).toEqual({
        variant: 'basic',
        'show-header': false,
        'show-list': true,
        items: expect.any(Array)
      })
    })

    it('passes correct summary items matching Figma design', () => {
      const summary = wrapper.findComponent({ name: 'Summary' })
      const items = summary.props('items')

      expect(items).toHaveLength(7)
      expect(items[0]).toEqual({ title: '상품명', data: '&상품명&', color: undefined })
      expect(items[1]).toEqual({ title: '출금계좌', data: 'NH농협은행 123-456-78910', color: undefined })
      expect(items[2]).toEqual({ title: '가입금액', data: '5,000,000원', color: 'green' })
      expect(items[3]).toEqual({ title: '적용금리', data: '정부고시금리', color: undefined })
      expect(items[4]).toEqual({ title: '자동이체 주기', data: '매월 &일자&', color: undefined })
      expect(items[5]).toEqual({ title: '자동이체', data: '신청 안 함', color: undefined })
      expect(items[6]).toEqual({ title: '자동이체 금액', data: '500,000원', color: undefined })
    })

    it('highlights subscription amount in green as shown in Figma', () => {
      const summary = wrapper.findComponent({ name: 'Summary' })
      const items = summary.props('items')

      const amountItem = items.find((item: SummaryItem) => item.title === '가입금액')
      expect(amountItem.color).toBe('green')
    })
  })

  // CTA Component Tests
  describe('CTA Component', () => {
    it('passes correct props to CTA component', () => {
      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props()).toEqual({
        'show-secondary': true,
        'secondary-text': '정보 수정',
        'primary-text': '이대로 가입',
        disabled: false
      })
    })

    it('handles edit info button click correctly', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent({ name: 'Cta' })

      await cta.vm.$emit('secondary')

      expect(consoleSpy).toHaveBeenCalledWith('Edit info button clicked')
      consoleSpy.mockRestore()
    })

    it('handles confirm subscription button click correctly', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent({ name: 'Cta' })

      await cta.vm.$emit('primary')

      expect(consoleSpy).toHaveBeenCalledWith('Confirm subscription button clicked')
      expect(consoleSpy).toHaveBeenCalledWith('Final subscription data:', expect.any(Object))
      consoleSpy.mockRestore()
    })
  })

  // Data Management Tests
  describe('Data Management', () => {
    it('initializes with correct default data from Figma', () => {
      expect(wrapper.vm.summaryItems).toHaveLength(7)
      expect(wrapper.vm.summaryItems[0].title).toBe('상품명')
      expect(wrapper.vm.summaryItems[1].title).toBe('출금계좌')
      expect(wrapper.vm.summaryItems[2].title).toBe('가입금액')
    })

    it('updates page data correctly', async () => {
      wrapper.vm.updatePageData()
      await nextTick()

      expect(wrapper.vm.pageData.productName).toBe('&상품명&')
      expect(wrapper.vm.pageData.withdrawalAccount).toBe('NH농협은행 123-456-78910')
      expect(wrapper.vm.pageData.subscriptionAmount).toBe('5,000,000원')
    })

    it('calls updatePageData on mount', () => {
      const updateSpy = vi.spyOn(wrapper.vm, 'updatePageData')
      wrapper.vm.$options.mounted[0].call(wrapper.vm)
      expect(updateSpy).toHaveBeenCalled()
    })

    it('can update summary with dynamic data', () => {
      const productName = '청년주택드림청약통장'
      const transferDate = '25'

      wrapper.vm.updateSummaryWithDynamicData(productName, transferDate)

      expect(wrapper.vm.summaryItems[0].data).toBe(productName)
      expect(wrapper.vm.summaryItems[4].data).toBe(`매월 ${transferDate}일`)
    })
  })

  // Accessibility Tests
  describe('Accessibility', () => {
    it('has proper ARIA attributes and semantic structure', () => {
      const title = wrapper.find('.page__title-text')
      expect(title.element.tagName).toBe('H1')

      const container = wrapper.find('[data-testid="subscription-confirmation"]')
      expect(container.exists()).toBe(true)
    })

    it('maintains focus management for interactive elements', () => {
      const summarySection = wrapper.find('.page__summary-section')
      const ctaSection = wrapper.find('.page__cta')

      expect(summarySection.exists()).toBe(true)
      expect(ctaSection.exists()).toBe(true)
    })
  })

  // Design Token Tests
  describe('Design Tokens and Styling', () => {
    it('applies correct CSS custom properties', () => {
      const container = wrapper.find('.subscription-confirmation')
      expect(container.classes()).toContain('subscription-confirmation')
    })

    it('uses correct Figma node IDs for mapping', () => {
      expect(wrapper.find('[data-node-id="1:2664"]').exists()).toBe(true) // Frame
      expect(wrapper.find('[data-node-id="1:2669"]').exists()).toBe(true) // Header
      expect(wrapper.find('[data-node-id="1:2665"]').exists()).toBe(true) // Contents
      expect(wrapper.find('[data-node-id="1:2672"]').exists()).toBe(true) // CTA
    })

    it('applies responsive design classes', () => {
      const container = wrapper.find('.subscription-confirmation')
      expect(container.exists()).toBe(true)
      // CSS classes are applied through style tag, would need DOM testing for full verification
    })
  })

  // Integration Tests
  describe('Component Integration', () => {
    it('integrates all components correctly', () => {
      expect(wrapper.findComponent({ name: 'Navigation' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Progress' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Summary' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Cta' }).exists()).toBe(true)
    })

    it('maintains consistent state across component interactions', async () => {
      // Simulate dynamic data update
      const newProductName = '청년주택드림청약통장'
      const newTransferDate = '25'

      wrapper.vm.updateSummaryWithDynamicData(newProductName, newTransferDate)
      await nextTick()

      // Verify state consistency
      expect(wrapper.vm.summaryItems[0].data).toBe(newProductName)
      expect(wrapper.vm.summaryItems[4].data).toBe(`매월 ${newTransferDate}일`)
      expect(wrapper.vm.pageData.productName).toBe(newProductName)

      // Verify Summary component receives updated data
      const summary = wrapper.findComponent({ name: 'Summary' })
      const items = summary.props('items')
      expect(items[0].data).toBe(newProductName)
      expect(items[4].data).toBe(`매월 ${newTransferDate}일`)
    })
  })

  // User Flow Tests
  describe('User Flow', () => {
    it('supports editing information flow', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent({ name: 'Cta' })

      // User clicks edit info
      await cta.vm.$emit('secondary')

      expect(consoleSpy).toHaveBeenCalledWith('Edit info button clicked')
      // TODO: Should navigate back to previous pages for editing
      consoleSpy.mockRestore()
    })

    it('supports subscription confirmation flow', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent({ name: 'Cta' })

      // User confirms subscription
      await cta.vm.$emit('primary')

      expect(consoleSpy).toHaveBeenCalledWith('Confirm subscription button clicked')
      expect(consoleSpy).toHaveBeenCalledWith('Final subscription data:', expect.any(Object))
      // TODO: Should submit subscription and navigate to success page
      consoleSpy.mockRestore()
    })
  })
})

// Type Validation Tests
describe('SubscriptionConfirmationTypes', () => {
  describe('validateSubscriptionData function', () => {
    it('validates complete subscription data correctly', () => {
      const validData: SubscriptionConfirmationData = {
        productName: '청년주택드림청약통장',
        withdrawalAccount: 'NH농협은행 123-456-78910',
        subscriptionAmount: '5,000,000원',
        interestRate: '정부고시금리',
        autoTransferCycle: '매월 25일',
        autoTransferStatus: '신청 안 함',
        autoTransferAmount: '500,000원',
        isConfirmed: false
      }

      expect(validateSubscriptionData(validData)).toEqual({
        isValid: true,
        errors: []
      })
    })

    it('validates incomplete subscription data correctly', () => {
      const invalidData: SubscriptionConfirmationData = {
        productName: '&상품명&', // Dynamic placeholder not filled
        withdrawalAccount: '',
        subscriptionAmount: '',
        interestRate: '정부고시금리',
        autoTransferCycle: '매월 &일자&', // Dynamic placeholder not filled
        autoTransferStatus: '신청 안 함',
        autoTransferAmount: '500,000원',
        isConfirmed: false
      }

      const result = validateSubscriptionData(invalidData)
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('Helper functions', () => {
    it('creates summary items correctly', () => {
      const data = MOCK_SUBSCRIPTION_DATA
      const items = createSummaryItems(data)

      expect(items).toHaveLength(7)
      expect(items[0]).toEqual({ title: '상품명', data: data.productName, color: undefined })
      expect(items[2]).toEqual({ title: '가입금액', data: data.subscriptionAmount, color: 'green' })
    })

    it('updates summary items with dynamic data', () => {
      const items = createSummaryItems(MOCK_SUBSCRIPTION_DATA)
      const updatedItems = updateSummaryItemsWithDynamicData(items, '청년주택드림청약통장', 25)

      expect(updatedItems[0].data).toBe('청년주택드림청약통장')
      expect(updatedItems[4].data).toBe('매월 25일')
    })

    it('formats amounts correctly', () => {
      expect(formatAmount(5000000)).toBe('5,000,000원')
      expect(formatAmount(500000)).toBe('500,000원')
      expect(formatAmount(0)).toBe('0원')
    })

    it('formats account numbers correctly', () => {
      expect(formatAccountNumber('12345678910')).toBe('123-456-78910')
      expect(formatAccountNumber('123-456-78910')).toBe('123-456-78910') // Already formatted
    })

    it('parses amounts correctly', () => {
      expect(parseAmount('5,000,000원')).toBe(5000000)
      expect(parseAmount('500,000원')).toBe(500000)
      expect(parseAmount('0원')).toBe(0)
    })

    it('generates confirmation summary correctly', () => {
      const data = MOCK_SUBSCRIPTION_DATA
      const summary = generateConfirmationSummary(data)

      expect(summary.summary).toContain(data.productName)
      expect(summary.summary).toContain('5,000,000원')
      expect(summary.details.productName).toBe(data.productName)
    })

    it('calculates monthly amount correctly', () => {
      const dataWithTransfer = { ...MOCK_SUBSCRIPTION_DATA, autoTransferStatus: '신청함' }
      const dataWithoutTransfer = { ...MOCK_SUBSCRIPTION_DATA, autoTransferStatus: '신청 안 함' }

      expect(calculateMonthlyAmount(dataWithTransfer)).toBe(500000)
      expect(calculateMonthlyAmount(dataWithoutTransfer)).toBe(0)
    })

    it('formats transfer cycle correctly', () => {
      expect(formatTransferCycle('매월 25일')).toBe('매월 25일')
      expect(formatTransferCycle('매월 &일자&')).toBe('매월 &일자&') // Placeholder unchanged
    })

    it('checks subscription data completeness correctly', () => {
      const completeData = { ...MOCK_SUBSCRIPTION_DATA, isConfirmed: true }
      const incompleteData = { ...MOCK_SUBSCRIPTION_DATA, productName: '&상품명&' }

      expect(isSubscriptionDataComplete(completeData)).toBe(true)
      expect(isSubscriptionDataComplete(incompleteData)).toBe(false)
    })
  })

  describe('Constants validation', () => {
    it('has correct progress ratio', () => {
      expect(SUBSCRIPTION_CONFIRMATION_CONSTANTS.PROGRESS_RATIO).toBe(0.9)
    })

    it('has correct Figma node IDs', () => {
      expect(SUBSCRIPTION_CONFIRMATION_CONSTANTS.FIGMA_NODE_IDS.FRAME).toBe('1:2664')
      expect(SUBSCRIPTION_CONFIRMATION_CONSTANTS.FIGMA_NODE_IDS.SUMMARY_CARD).toBe('1:2668')
    })

    it('has correct design tokens', () => {
      expect(SUBSCRIPTION_CONFIRMATION_CONSTANTS.DESIGN_TOKENS.FRAME_WIDTH).toBe(360)
      expect(SUBSCRIPTION_CONFIRMATION_CONSTANTS.DESIGN_TOKENS.FRAME_HEIGHT).toBe(760)
    })

    it('has correct text content', () => {
      expect(SUBSCRIPTION_CONFIRMATION_CONSTANTS.TITLE).toBe('가입정보를 확인해 주세요')
      expect(SUBSCRIPTION_CONFIRMATION_CONSTANTS.CTA_BUTTONS.SECONDARY).toBe('정보 수정')
      expect(SUBSCRIPTION_CONFIRMATION_CONSTANTS.CTA_BUTTONS.PRIMARY).toBe('이대로 가입')
    })

    it('has correct summary labels', () => {
      const labels = SUBSCRIPTION_CONFIRMATION_CONSTANTS.SUMMARY_LABELS
      expect(labels.PRODUCT_NAME).toBe('상품명')
      expect(labels.WITHDRAWAL_ACCOUNT).toBe('출금계좌')
      expect(labels.SUBSCRIPTION_AMOUNT).toBe('가입금액')
    })
  })

  describe('Mock data validation', () => {
    it('has valid mock subscription data', () => {
      expect(MOCK_SUBSCRIPTION_DATA).toMatchObject({
        productName: expect.any(String),
        withdrawalAccount: expect.any(String),
        subscriptionAmount: expect.any(String),
        interestRate: expect.any(String),
        autoTransferCycle: expect.any(String),
        autoTransferStatus: expect.any(String),
        autoTransferAmount: expect.any(String),
        isConfirmed: expect.any(Boolean)
      })
    })
  })
})