import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import AutoTransferSetup from './AutoTransferSetup.vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Radio from '../components/Radio.vue'
import Select from '../components/Select.vue'
import Cta from '../components/Cta.vue'
import Tooltip from '../components/Tooltip.vue'
import {
  DEFAULT_AUTO_TRANSFER_SETUP_DATA,
  AUTO_TRANSFER_SETUP_CONSTANTS,
  formatAmountToKorean,
  formatAmountToDisplay,
  formatDateToDisplay,
  formatDateToValue,
  validateForm,
  createTooltipItems,
  createRadioOptions,
  createDateOptions
} from '../types/autoTransferSetupTypes'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/auto-transfer-setup',
      name: 'AutoTransferSetup',
      component: AutoTransferSetup
    }
  ]
})

describe('AutoTransferSetup.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    await router.push('/auto-transfer-setup')
    wrapper = mount(AutoTransferSetup, {
      global: {
        plugins: [router],
        stubs: {
          Navigation,
          Progress,
          Radio,
          Select,
          Cta,
          Tooltip
        }
      }
    })
  })

  afterEach(() => {
    wrapper?.unmount()
  })

  describe('Page Rendering', () => {
    it('renders the page with correct data-testid', () => {
      expect(wrapper.find('[data-testid="auto-transfer-setup"]').exists()).toBe(true)
    })

    it('renders with correct Figma node IDs', () => {
      const { FIGMA_NODE_IDS } = AUTO_TRANSFER_SETUP_CONSTANTS
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.FRAME}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.HEADER}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.CONTENTS}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.CTA}"]`).exists()).toBe(true)
    })

    it('renders the page title correctly', () => {
      const titleElement = wrapper.find('.page__title-text')
      expect(titleElement.exists()).toBe(true)
      expect(titleElement.text()).toBe(AUTO_TRANSFER_SETUP_CONSTANTS.TITLE)
    })

    it('displays the default amount correctly', () => {
      const amountElement = wrapper.find('.amount__value')
      expect(amountElement.exists()).toBe(true)
      expect(amountElement.text()).toBe('100,000원')
    })

    it('displays the Korean amount correctly', () => {
      const koreanAmountElement = wrapper.find('.amount__message-text')
      expect(koreanAmountElement.exists()).toBe(true)
      expect(koreanAmountElement.text()).toBe('십만원')
    })

    it('displays form labels correctly', () => {
      const amountLabel = wrapper.find('.amount__label-text')
      expect(amountLabel.exists()).toBe(true)
      expect(amountLabel.text()).toBe(AUTO_TRANSFER_SETUP_CONSTANTS.LABELS.AUTO_TRANSFER_AMOUNT)

      const dateLabel = wrapper.find('.date__label-text')
      expect(dateLabel.exists()).toBe(true)
      expect(dateLabel.text()).toBe(AUTO_TRANSFER_SETUP_CONSTANTS.LABELS.AUTO_TRANSFER_START_DATE)
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
      expect(progress.props('ratio')).toBe(AUTO_TRANSFER_SETUP_CONSTANTS.PROGRESS_RATIO)
      expect(progress.props('showAnimation')).toBe(false)
      expect(progress.props('size')).toBe('md')
      expect(progress.props('color')).toBe('green')
    })

    it('renders Radio component with correct props', () => {
      const radio = wrapper.findComponent(Radio)
      expect(radio.exists()).toBe(true)
      expect(radio.props('options')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: '신청안함', value: 'no-apply' }),
          expect.objectContaining({ label: '신청함', value: 'apply' })
        ])
      )
      expect(radio.props('showTooltip')).toBe(true)
      expect(radio.props('showText')).toBe(true)
      expect(radio.props('messageText')).toBe('자동이체 신청 안내')
    })

    it('renders Select component with correct props', () => {
      const select = wrapper.findComponent(Select)
      expect(select.exists()).toBe(true)
      expect(select.props('placeholder')).toBe('2023.08.23')
      expect(select.props('variant')).toBe('with-icon')
    })

    it('renders Cta component with correct props', () => {
      const cta = wrapper.findComponent(Cta)
      expect(cta.exists()).toBe(true)
      expect(cta.props('disabled')).toBe(false) // Form is valid by default
      expect(cta.text()).toBe('다음')
    })
  })

  describe('Radio Button Interaction', () => {
    it('updates selected option when radio value changes', async () => {
      const component = wrapper.vm
      const initialOption = component.selectedOption

      // Change to "신청안함"
      component.selectedOption = 'no-apply'
      await wrapper.vm.$nextTick()

      expect(component.selectedOption).toBe('no-apply')
      expect(component.selectedOption).not.toBe(initialOption)
    })

    it('updates form validity when radio selection changes', async () => {
      const component = wrapper.vm

      // Both radio options are valid, so form should remain valid
      component.selectedOption = 'no-apply'
      await wrapper.vm.$nextTick()

      expect(component.isFormValid).toBe(true)

      component.selectedOption = 'apply'
      await wrapper.vm.$nextTick()

      expect(component.isFormValid).toBe(true)
    })
  })

  describe('Date Selection', () => {
    it('updates selected date when date value changes', async () => {
      const component = wrapper.vm
      const select = wrapper.findComponent(Select)

      select.vm.$emit('change', '2023-08-25')
      await wrapper.vm.$nextTick()

      expect(component.selectedDate).toBe('2023-08-25')
    })

    it('calls updatePageData when date changes', async () => {
      const component = wrapper.vm
      const updateSpy = vi.spyOn(component, 'updatePageData')

      component.handleDateChange('2023-08-26')
      await wrapper.vm.$nextTick()

      expect(updateSpy).toHaveBeenCalled()
    })
  })

  describe('Tooltip Functionality', () => {
    it('shows tooltip when tooltip open event is triggered', async () => {
      const component = wrapper.vm
      expect(component.showTooltip).toBe(false)

      component.handleTooltipOpen()
      await wrapper.vm.$nextTick()

      expect(component.showTooltip).toBe(true)
    })

    it('hides tooltip when tooltip close event is triggered', async () => {
      const component = wrapper.vm
      component.showTooltip = true
      await wrapper.vm.$nextTick()

      component.handleTooltipClose()
      await wrapper.vm.$nextTick()

      expect(component.showTooltip).toBe(false)
    })

    it('renders tooltip overlay when showTooltip is true', async () => {
      const component = wrapper.vm
      component.showTooltip = true
      await wrapper.vm.$nextTick()

      const tooltipOverlay = wrapper.find('.page__tooltip-overlay')
      expect(tooltipOverlay.exists()).toBe(true)

      const tooltip = wrapper.findComponent(Tooltip)
      expect(tooltip.exists()).toBe(true)
      expect(tooltip.props('title')).toBe('자동이체 신청 안내')
      expect(tooltip.props('closable')).toBe(true)
      expect(tooltip.props('list')).toBe(true)
    })

    it('hides tooltip overlay when showTooltip is false', async () => {
      const component = wrapper.vm
      component.showTooltip = false
      await wrapper.vm.$nextTick()

      const tooltipOverlay = wrapper.find('.page__tooltip-overlay')
      expect(tooltipOverlay.exists()).toBe(false)
    })

    it('closes tooltip when overlay is clicked', async () => {
      const component = wrapper.vm
      component.showTooltip = true
      await wrapper.vm.$nextTick()

      const tooltipOverlay = wrapper.find('.page__tooltip-overlay')
      await tooltipOverlay.trigger('click')

      expect(component.showTooltip).toBe(false)
    })

    it('has correct tooltip items', () => {
      const component = wrapper.vm
      const tooltipItems = component.tooltipItems

      expect(tooltipItems).toHaveLength(3)
      expect(tooltipItems[0].text).toContain('초입금 출금계좌가 다른은행')
      expect(tooltipItems[1].text).toContain('국민주택을 청약하는 경우')
      expect(tooltipItems[2].text).toContain('자동이체일이 토/일/공휴일')
    })
  })

  describe('Form Validation', () => {
    it('enables CTA button when form is valid', async () => {
      const component = wrapper.vm
      component.selectedOption = 'apply'
      component.selectedDate = '2023-08-25'
      await wrapper.vm.$nextTick()

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('disabled')).toBe(false)
    })

    it('validates form correctly for different states', () => {
      const validData = {
        autoTransferEnabled: true,
        amount: 100000,
        startDate: '2023-08-23',
        isFormValid: true
      }

      const result = validateForm(validData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('validates form with missing date', () => {
      const invalidData = {
        autoTransferEnabled: true,
        amount: 100000,
        startDate: '',
        isFormValid: false
      }

      const result = validateForm(invalidData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(AUTO_TRANSFER_SETUP_CONSTANTS.VALIDATION.START_DATE_REQUIRED)
    })

    it('validates form with missing amount when auto transfer is enabled', () => {
      const invalidData = {
        autoTransferEnabled: true,
        amount: 0,
        startDate: '2023-08-23',
        isFormValid: false
      }

      const result = validateForm(invalidData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain(AUTO_TRANSFER_SETUP_CONSTANTS.VALIDATION.AMOUNT_REQUIRED)
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
    it('handles next button click for valid form', async () => {
      const component = wrapper.vm
      component.selectedOption = 'apply'
      component.selectedDate = '2023-08-25'
      await wrapper.vm.$nextTick()

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent(Cta)

      cta.vm.$emit('click')
      await wrapper.vm.$nextTick()

      expect(consoleSpy).toHaveBeenCalledWith(
        'Proceeding with auto transfer setup:',
        expect.objectContaining({
          option: 'apply',
          amount: 100000,
          startDate: '2023-08-25'
        })
      )
      consoleSpy.mockRestore()
    })

    it('does not proceed when form is invalid', async () => {
      const component = wrapper.vm
      component.selectedDate = '' // Invalid state
      await wrapper.vm.$nextTick()

      expect(component.isFormValid).toBe(false)
    })
  })

  describe('Helper Functions', () => {
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

    describe('Date Formatting', () => {
      it('formats date for display', () => {
        expect(formatDateToDisplay('2023-08-23')).toBe('2023.08.23')
        expect(formatDateToDisplay('2023-12-01')).toBe('2023.12.01')
      })

      it('formats date for value', () => {
        expect(formatDateToValue('2023.08.23')).toBe('2023-08-23')
        expect(formatDateToValue('2023.12.01')).toBe('2023-12-01')
      })
    })

    describe('Factory Functions', () => {
      it('creates tooltip items correctly', () => {
        const items = createTooltipItems()
        expect(items).toHaveLength(3)
        expect(items[0]).toHaveProperty('text')
        expect(items[0].text).toBeTruthy()
      })

      it('creates radio options correctly', () => {
        const options = createRadioOptions()
        expect(options).toHaveLength(2)
        expect(options[0]).toEqual({ label: '신청안함', value: 'no-apply' })
        expect(options[1]).toEqual({ label: '신청함', value: 'apply' })
      })

      it('creates date options correctly', () => {
        const options = createDateOptions()
        expect(options.length).toBeGreaterThan(0)
        expect(options[0]).toHaveProperty('label')
        expect(options[0]).toHaveProperty('value')
        expect(options[0].label).toBe('2023.08.23')
        expect(options[0].value).toBe('2023-08-23')
      })
    })
  })

  describe('Page State Management', () => {
    it('initializes with default data', () => {
      const component = wrapper.vm
      expect(component.pageData).toEqual(
        expect.objectContaining({
          autoTransferEnabled: DEFAULT_AUTO_TRANSFER_SETUP_DATA.autoTransferEnabled,
          amount: DEFAULT_AUTO_TRANSFER_SETUP_DATA.amount,
          startDate: DEFAULT_AUTO_TRANSFER_SETUP_DATA.startDate
        })
      )
    })

    it('updates page data when form values change', async () => {
      const component = wrapper.vm
      component.selectedOption = 'no-apply'
      component.selectedDate = '2023-08-25'
      component.updatePageData()
      await wrapper.vm.$nextTick()

      expect(component.pageData.autoTransferEnabled).toBe(false) // 'no-apply' = false
      expect(component.pageData.startDate).toBe('2023-08-25')
    })
  })

  describe('Constants and Configuration', () => {
    it('has correct progress ratio', () => {
      expect(AUTO_TRANSFER_SETUP_CONSTANTS.PROGRESS_RATIO).toBe(0.5)
    })

    it('has correct default values', () => {
      expect(AUTO_TRANSFER_SETUP_CONSTANTS.DEFAULTS.AMOUNT).toBe(100000)
      expect(AUTO_TRANSFER_SETUP_CONSTANTS.DEFAULTS.DATE).toBe('2023-08-23')
      expect(AUTO_TRANSFER_SETUP_CONSTANTS.DEFAULTS.AUTO_TRANSFER_ENABLED).toBe(true)
    })

    it('has correct validation messages', () => {
      const { VALIDATION } = AUTO_TRANSFER_SETUP_CONSTANTS
      expect(VALIDATION.AUTO_TRANSFER_REQUIRED).toBeTruthy()
      expect(VALIDATION.START_DATE_REQUIRED).toBeTruthy()
      expect(VALIDATION.AMOUNT_REQUIRED).toBeTruthy()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for interactive elements', () => {
      const navigation = wrapper.findComponent(Navigation)
      expect(navigation.exists()).toBe(true)

      const progress = wrapper.findComponent(Progress)
      expect(progress.exists()).toBe(true)

      const radio = wrapper.findComponent(Radio)
      expect(radio.exists()).toBe(true)
    })

    it('supports keyboard navigation for form elements', () => {
      const radio = wrapper.findComponent(Radio)
      expect(radio.exists()).toBe(true)

      const select = wrapper.findComponent(Select)
      expect(select.exists()).toBe(true)
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive classes correctly', () => {
      const pageElement = wrapper.find('.auto-transfer-setup')
      expect(pageElement.exists()).toBe(true)
      expect(pageElement.classes()).toContain('auto-transfer-setup')
    })

    it('has proper mobile layout structure', () => {
      const contents = wrapper.find('.page__contents')
      expect(contents.exists()).toBe(true)

      const header = wrapper.find('.page__header')
      expect(header.exists()).toBe(true)

      const cta = wrapper.find('.page__cta')
      expect(cta.exists()).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('handles invalid form data gracefully', async () => {
      const component = wrapper.vm

      // Set invalid data
      component.selectedDate = ''
      await wrapper.vm.$nextTick()

      // Should not crash and should show invalid state
      expect(component.isFormValid).toBe(false)
    })

    it('handles tooltip state changes gracefully', async () => {
      const component = wrapper.vm

      // Rapidly toggle tooltip state
      component.handleTooltipOpen()
      component.handleTooltipClose()
      component.handleTooltipOpen()
      await wrapper.vm.$nextTick()

      // Should maintain consistent state
      expect(component.showTooltip).toBe(true)
    })
  })
})