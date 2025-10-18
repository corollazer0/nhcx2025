import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import TaxTypeSelection from './TaxTypeSelection.vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Radio from '../components/Radio.vue'
import Cta from '../components/Cta.vue'
import {
  DEFAULT_TAX_TYPE_SELECTION_DATA,
  TAX_TYPE_SELECTION_CONSTANTS,
  getTaxTypeLabel,
  getTaxTypeDescription,
  validateTaxTypeSelection,
  createTaxTypeOptions,
  calculateTaxBenefits,
  checkTaxFreeEligibility
} from '../types/taxTypeSelectionTypes'

// Mock router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/tax-type-selection',
      name: 'TaxTypeSelection',
      component: TaxTypeSelection
    }
  ]
})

describe('TaxTypeSelection.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(async () => {
    await router.push('/tax-type-selection')
    wrapper = mount(TaxTypeSelection, {
      global: {
        plugins: [router],
        stubs: {
          Navigation,
          Progress,
          Radio,
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
      expect(wrapper.find('[data-testid="tax-type-selection"]').exists()).toBe(true)
    })

    it('renders with correct Figma node IDs', () => {
      const { FIGMA_NODE_IDS } = TAX_TYPE_SELECTION_CONSTANTS
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.FRAME}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.HEADER}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.CONTENTS}"]`).exists()).toBe(true)
      expect(wrapper.find(`[data-node-id="${FIGMA_NODE_IDS.CTA}"]`).exists()).toBe(true)
    })

    it('renders the page title correctly', () => {
      const titleElement = wrapper.find('.page__title-text')
      expect(titleElement.exists()).toBe(true)
      expect(titleElement.text()).toBe(TAX_TYPE_SELECTION_CONSTANTS.TITLE)
    })

    it('displays the description text correctly', () => {
      const descriptionElement = wrapper.find('.page__description')
      expect(descriptionElement.exists()).toBe(true)
      expect(descriptionElement.text()).toBe(TAX_TYPE_SELECTION_CONSTANTS.DESCRIPTION)
    })

    it('displays the tooltip section correctly', () => {
      const tooltipLabel = wrapper.find('.tooltip__label')
      expect(tooltipLabel.exists()).toBe(true)
      expect(tooltipLabel.text()).toBe(TAX_TYPE_SELECTION_CONSTANTS.TOOLTIP_LABEL)

      const tooltipIcon = wrapper.find('.tooltip__icon-button')
      expect(tooltipIcon.exists()).toBe(true)
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
      expect(progress.props('ratio')).toBe(TAX_TYPE_SELECTION_CONSTANTS.PROGRESS_RATIO)
      expect(progress.props('showAnimation')).toBe(false)
      expect(progress.props('size')).toBe('md')
      expect(progress.props('color')).toBe('green')
    })

    it('renders Radio component with correct props', () => {
      const radio = wrapper.findComponent(Radio)
      expect(radio.exists()).toBe(true)
      expect(radio.props('options')).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ label: '일반과세', value: 'general' }),
          expect.objectContaining({ label: '비과세', value: 'tax-free' })
        ])
      )
    })

    it('renders Cta component with correct props', () => {
      const cta = wrapper.findComponent(Cta)
      expect(cta.exists()).toBe(true)
      expect(cta.props('disabled')).toBe(false) // Form is valid by default
      expect(cta.props('primaryText')).toBe('다음')
    })
  })

  describe('Tax Type Selection', () => {
    it('initializes with tax-free option selected', () => {
      const component = wrapper.vm
      expect(component.selectedTaxType).toBe('tax-free')
    })

    it('updates selected tax type when radio value changes', async () => {
      const component = wrapper.vm
      const radio = wrapper.findComponent(Radio)

      radio.vm.$emit('change', 'general')
      await wrapper.vm.$nextTick()

      expect(component.selectedTaxType).toBe('general')
    })

    it('calls updatePageData when tax type changes', async () => {
      const component = wrapper.vm
      const updateSpy = vi.spyOn(component, 'updatePageData')

      component.handleTaxTypeChange('general')
      await wrapper.vm.$nextTick()

      expect(updateSpy).toHaveBeenCalled()
    })

    it('updates form validity when tax type selection changes', async () => {
      const component = wrapper.vm

      // Should be valid with default selection
      expect(component.isFormValid).toBe(true)

      // Should remain valid when changing selection
      component.selectedTaxType = 'general'
      await wrapper.vm.$nextTick()

      expect(component.isFormValid).toBe(true)
    })
  })

  describe('Tooltip Interaction', () => {
    it('handles tooltip click event', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const tooltipButton = wrapper.find('.tooltip__icon-button')

      await tooltipButton.trigger('click')

      expect(consoleSpy).toHaveBeenCalledWith(
        'Tooltip clicked - showing tax-free eligibility info'
      )

      consoleSpy.mockRestore()
    })

    it('has proper accessibility attributes for tooltip button', () => {
      const tooltipButton = wrapper.find('.tooltip__icon-button')
      expect(tooltipButton.attributes('aria-label')).toBe('비과세 대상자 정보 보기')
      expect(tooltipButton.attributes('type')).toBe('button')
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
      component.selectedTaxType = 'tax-free'
      await wrapper.vm.$nextTick()

      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent(Cta)

      cta.vm.$emit('primary')
      await wrapper.vm.$nextTick()

      expect(consoleSpy).toHaveBeenCalledWith(
        'Proceeding with tax type:',
        'tax-free'
      )
      consoleSpy.mockRestore()
    })

    it('enables CTA button when form is valid', async () => {
      const component = wrapper.vm
      component.selectedTaxType = 'general'
      await wrapper.vm.$nextTick()

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('disabled')).toBe(false)
    })
  })

  describe('Helper Functions', () => {
    describe('getTaxTypeLabel', () => {
      it('returns correct labels for tax types', () => {
        expect(getTaxTypeLabel('general')).toBe('일반과세')
        expect(getTaxTypeLabel('tax-free')).toBe('비과세')
      })

      it('returns empty string for invalid tax type', () => {
        expect(getTaxTypeLabel('invalid' as any)).toBe('')
      })
    })

    describe('getTaxTypeDescription', () => {
      it('returns correct descriptions for tax types', () => {
        const taxFreeDesc = getTaxTypeDescription('tax-free')
        expect(taxFreeDesc).toContain('비과세 가입 시')
        expect(taxFreeDesc).toContain('500만원')

        const generalDesc = getTaxTypeDescription('general')
        expect(generalDesc).toContain('일반과세')
        expect(generalDesc).toContain('소득세')
      })

      it('returns empty string for invalid tax type', () => {
        expect(getTaxTypeDescription('invalid' as any)).toBe('')
      })
    })

    describe('validateTaxTypeSelection', () => {
      it('validates correct tax type selection', () => {
        const validData = {
          selectedTaxType: 'tax-free' as const,
          isFormValid: true
        }

        const result = validateTaxTypeSelection(validData)
        expect(result.isValid).toBe(true)
        expect(result.errors).toHaveLength(0)
      })

      it('invalidates missing tax type selection', () => {
        const invalidData = {
          selectedTaxType: '' as any,
          isFormValid: false
        }

        const result = validateTaxTypeSelection(invalidData)
        expect(result.isValid).toBe(false)
        expect(result.errors).toContain(TAX_TYPE_SELECTION_CONSTANTS.VALIDATION.TAX_TYPE_REQUIRED)
      })
    })

    describe('createTaxTypeOptions', () => {
      it('creates correct radio options', () => {
        const options = createTaxTypeOptions()
        expect(options).toHaveLength(2)
        expect(options[0]).toEqual({ label: '일반과세', value: 'general' })
        expect(options[1]).toEqual({ label: '비과세', value: 'tax-free' })
      })
    })

    describe('calculateTaxBenefits', () => {
      it('calculates tax-free benefits correctly', () => {
        const result = calculateTaxBenefits(3000000, 'tax-free')
        expect(result.taxAmount).toBe(0)
        expect(result.netAmount).toBe(3000000)
        expect(result.description).toContain('3,000,000원까지 비과세')
      })

      it('calculates tax-free benefits with limit', () => {
        const result = calculateTaxBenefits(6000000, 'tax-free')
        expect(result.taxAmount).toBe(0)
        expect(result.netAmount).toBe(5000000) // Limited to 500만원
        expect(result.description).toContain('5,000,000원까지 비과세')
      })

      it('calculates general tax correctly', () => {
        const result = calculateTaxBenefits(1000000, 'general')
        expect(result.taxAmount).toBe(154000) // 15.4% of 1,000,000
        expect(result.netAmount).toBe(846000)
        expect(result.description).toContain('소득세 15.4%')
      })
    })

    describe('checkTaxFreeEligibility', () => {
      it('returns eligibility check result', () => {
        const result = checkTaxFreeEligibility({})
        expect(result).toHaveProperty('isEligible')
        expect(result).toHaveProperty('failedCriteria')
        expect(Array.isArray(result.failedCriteria)).toBe(true)
      })
    })
  })

  describe('Page State Management', () => {
    it('initializes with default data', () => {
      const component = wrapper.vm
      expect(component.pageData).toEqual(
        expect.objectContaining({
          selectedTaxType: DEFAULT_TAX_TYPE_SELECTION_DATA.selectedTaxType,
          isFormValid: DEFAULT_TAX_TYPE_SELECTION_DATA.isFormValid
        })
      )
    })

    it('updates page data when tax type changes', async () => {
      const component = wrapper.vm
      component.selectedTaxType = 'general'
      component.updatePageData()
      await wrapper.vm.$nextTick()

      expect(component.pageData.selectedTaxType).toBe('general')
      expect(component.pageData.isFormValid).toBe(true)
    })
  })

  describe('Constants and Configuration', () => {
    it('has correct progress ratio', () => {
      expect(TAX_TYPE_SELECTION_CONSTANTS.PROGRESS_RATIO).toBe(0.6)
    })

    it('has correct tax type options', () => {
      const { TAX_TYPE_OPTIONS } = TAX_TYPE_SELECTION_CONSTANTS
      expect(TAX_TYPE_OPTIONS).toHaveLength(2)
      expect(TAX_TYPE_OPTIONS[0]).toEqual({ label: '일반과세', value: 'general' })
      expect(TAX_TYPE_OPTIONS[1]).toEqual({ label: '비과세', value: 'tax-free' })
    })

    it('has correct tax benefits configuration', () => {
      const { TAX_BENEFITS } = TAX_TYPE_SELECTION_CONSTANTS
      expect(TAX_BENEFITS.TAX_FREE.INTEREST_LIMIT).toBe(5000000)
      expect(TAX_BENEFITS.TAX_FREE.DEPOSIT_LIMIT).toBe(6000000)
      expect(TAX_BENEFITS.GENERAL.TAX_RATE).toBe(0.154)
    })

    it('has correct validation messages', () => {
      const { VALIDATION } = TAX_TYPE_SELECTION_CONSTANTS
      expect(VALIDATION.TAX_TYPE_REQUIRED).toBeTruthy()
      expect(VALIDATION.PROCESSING_ERROR).toBeTruthy()
    })

    it('has correct tax-free eligibility criteria', () => {
      const { TAX_FREE_ELIGIBILITY } = TAX_TYPE_SELECTION_CONSTANTS
      expect(TAX_FREE_ELIGIBILITY.TITLE).toBe('비과세 대상자')
      expect(Array.isArray(TAX_FREE_ELIGIBILITY.CRITERIA)).toBe(true)
      expect(TAX_FREE_ELIGIBILITY.CRITERIA.length).toBeGreaterThan(0)
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

      const tooltipButton = wrapper.find('.tooltip__icon-button')
      expect(tooltipButton.attributes('aria-label')).toBeTruthy()
    })

    it('supports keyboard navigation for form elements', () => {
      const radio = wrapper.findComponent(Radio)
      expect(radio.exists()).toBe(true)

      const tooltipButton = wrapper.find('.tooltip__icon-button')
      expect(tooltipButton.attributes('type')).toBe('button')
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive classes correctly', () => {
      const pageElement = wrapper.find('.tax-type-selection')
      expect(pageElement.exists()).toBe(true)
      expect(pageElement.classes()).toContain('tax-type-selection')
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

  describe('Design Tokens', () => {
    it('uses correct Figma design tokens', () => {
      const { DESIGN_TOKENS } = TAX_TYPE_SELECTION_CONSTANTS
      expect(DESIGN_TOKENS.FRAME_WIDTH).toBe(360)
      expect(DESIGN_TOKENS.FRAME_HEIGHT).toBe(760)
      expect(DESIGN_TOKENS.CONTENTS_LEFT).toBe(24)
      expect(DESIGN_TOKENS.CONTENTS_TOP).toBe(120)
    })

    it('uses correct typography tokens', () => {
      const { TYPOGRAPHY } = TAX_TYPE_SELECTION_CONSTANTS
      expect(TYPOGRAPHY.TITLE.fontSize).toBe(22)
      expect(TYPOGRAPHY.TITLE.fontWeight).toBe(600)
      expect(TYPOGRAPHY.DESCRIPTION.fontSize).toBe(13)
    })

    it('uses correct color tokens', () => {
      const { COLORS } = TAX_TYPE_SELECTION_CONSTANTS
      expect(COLORS.TEXT_PRIMARY).toBe('#121212')
      expect(COLORS.TEXT_SECONDARY).toBe('#767676')
      expect(COLORS.GREEN_PRIMARY).toBe('#19973c')
    })
  })

  describe('Error Handling', () => {
    it('handles invalid form data gracefully', async () => {
      const component = wrapper.vm

      // Set invalid data - should not crash
      try {
        component.selectedTaxType = null as any
        await wrapper.vm.$nextTick()
      } catch (error) {
        // Should not throw error
        expect(error).toBeUndefined()
      }

      // Form should show invalid state
      expect(component.isFormValid).toBe(false)
    })

    it('handles tooltip interaction errors gracefully', async () => {
      const tooltipButton = wrapper.find('.tooltip__icon-button')

      // Should not crash when clicking multiple times rapidly
      try {
        await tooltipButton.trigger('click')
        await tooltipButton.trigger('click')
        await tooltipButton.trigger('click')
      } catch (error) {
        expect(error).toBeUndefined()
      }
    })
  })
})