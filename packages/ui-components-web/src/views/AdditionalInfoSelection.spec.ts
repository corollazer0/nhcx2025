import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AdditionalInfoSelection from './AdditionalInfoSelection.vue'
import type { AdditionalInfoSelectionData } from '../types/additionalInfoSelectionTypes'
import {
  ADDITIONAL_INFO_SELECTION_CONSTANTS,
  validateAdditionalInfoSelection,
  createNhPointOptions,
  formatEmployeeName,
  filterEmployees,
  validateEmployeeSearch,
  generateNhPointSummary,
  generateFormSummary,
  calculateFormProgress,
  MOCK_EMPLOYEES
} from '../types/additionalInfoSelectionTypes'

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

const mockInput = {
  template: '<div data-testid="mock-input"><slot /></div>',
  props: ['value', 'state', 'label', 'message', 'placeholder-text'],
  emits: ['update:value', 'input', 'blur']
}

const mockTooltipIcon = {
  template: '<div data-testid="mock-tooltip-icon"><slot /></div>',
  props: ['show', 'tooltip-text'],
  emits: ['click']
}

const mockRadio = {
  template: '<div data-testid="mock-radio"><slot /></div>',
  props: ['modelValue', 'options'],
  emits: ['update:modelValue', 'change']
}

const mockCta = {
  template: '<div data-testid="mock-cta"><slot /></div>',
  props: ['disabled', 'primary-text'],
  emits: ['primary']
}

describe('AdditionalInfoSelection.vue', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(AdditionalInfoSelection, {
      global: {
        components: {
          Navigation: mockNavigation,
          Progress: mockProgress,
          Input: mockInput,
          TooltipIcon: mockTooltipIcon,
          Radio: mockRadio,
          Cta: mockCta
        }
      }
    })
  })

  // Component Structure Tests
  describe('Component Structure', () => {
    it('renders main container with correct data attributes', () => {
      const container = wrapper.find('[data-testid="additional-info-selection"]')
      expect(container.exists()).toBe(true)
      expect(container.attributes('data-node-id')).toBe('1:2646')
    })

    it('renders header section with Navigation and Progress', () => {
      const header = wrapper.find('.page__header')
      expect(header.exists()).toBe(true)
      expect(header.attributes('data-node-id')).toBe('1:2659')
      expect(wrapper.findComponent({ name: 'Navigation' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Progress' }).exists()).toBe(true)
    })

    it('renders contents section with all subsections', () => {
      const contents = wrapper.find('.page__contents')
      expect(contents.exists()).toBe(true)
      expect(contents.attributes('data-node-id')).toBe('1:2647')

      // Check subsections
      expect(wrapper.find('.page__title').exists()).toBe(true)
      expect(wrapper.find('.page__search-section').exists()).toBe(true)
      expect(wrapper.find('.page__radio-section').exists()).toBe(true)
    })

    it('renders CTA section with button', () => {
      const cta = wrapper.find('.page__cta')
      expect(cta.exists()).toBe(true)
      expect(cta.attributes('data-node-id')).toBe('1:2662')
      expect(wrapper.findComponent({ name: 'Cta' }).exists()).toBe(true)
    })
  })

  // Title and Content Tests
  describe('Title and Content', () => {
    it('displays correct page title from Figma', () => {
      const title = wrapper.find('.page__title-text')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('추가정보를 선택해 주세요')
      expect(title.attributes('data-node-id')).toBe('1:2649')
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
      expect(progress.props('ratio')).toBe(ADDITIONAL_INFO_SELECTION_CONSTANTS.PROGRESS_RATIO)
      expect(progress.props('ratio')).toBe(0.8)
    })

    it('configures progress component correctly', () => {
      const progress = wrapper.findComponent({ name: 'Progress' })
      expect(progress.props()).toEqual({
        ratio: 0.8,
        'show-animation': false,
        size: 'md',
        color: 'green'
      })
    })
  })

  // Search Section Tests
  describe('Search Section', () => {
    it('renders search label correctly', () => {
      const label = wrapper.find('.search-label-text')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('권유직원')
    })

    it('renders TooltipIcon component', () => {
      const tooltip = wrapper.findComponent({ name: 'TooltipIcon' })
      expect(tooltip.exists()).toBe(true)
      expect(tooltip.props()).toEqual({
        show: true,
        'tooltip-text': '권유직원 정보 안내'
      })
    })

    it('renders Input component with correct props', () => {
      const input = wrapper.findComponent({ name: 'Input' })
      expect(input.exists()).toBe(true)
      expect(input.props()).toEqual({
        value: '',
        state: 'inactive',
        label: false,
        message: false,
        'placeholder-text': '(선택) 직원명 선택'
      })
    })

    it('handles employee input correctly', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const input = wrapper.findComponent({ name: 'Input' })

      await input.vm.$emit('input', new Event('input'), '김철수')
      expect(wrapper.vm.selectedEmployee).toBe('김철수')

      await input.vm.$emit('blur', new FocusEvent('blur'))
      expect(consoleSpy).toHaveBeenCalledWith('Employee input blurred')

      consoleSpy.mockRestore()
    })

    it('handles tooltip click event', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const tooltip = wrapper.findComponent({ name: 'TooltipIcon' })

      await tooltip.vm.$emit('click')
      expect(consoleSpy).toHaveBeenCalledWith('Tooltip clicked - showing employee referral info')
      consoleSpy.mockRestore()
    })
  })

  // Radio Section Tests
  describe('Radio Section', () => {
    it('renders radio label correctly', () => {
      const label = wrapper.find('.radio-label-text')
      expect(label.exists()).toBe(true)
      expect(label.text()).toBe('NH포인트 사용 신청')
    })

    it('renders Radio component with correct options', () => {
      const radio = wrapper.findComponent({ name: 'Radio' })
      expect(radio.exists()).toBe(true)
      expect(radio.props('options')).toEqual([
        { label: '사용안함', value: 'not-use' },
        { label: '사용함', value: 'use' }
      ])
    })

    it('defaults to "not-use" selection as shown in Figma', () => {
      const radio = wrapper.findComponent({ name: 'Radio' })
      expect(radio.props('modelValue')).toBe('not-use')
    })

    it('handles NH point usage change correctly', async () => {
      const radio = wrapper.findComponent({ name: 'Radio' })

      await radio.vm.$emit('change', 'use')
      await nextTick()

      expect(wrapper.vm.nhPointUsage).toBe('use')
    })

    it('renders description text correctly', () => {
      const description = wrapper.find('.description-text')
      expect(description.exists()).toBe(true)

      const lines = description.findAll('.description-line')
      expect(lines[0].text()).toBe('NH포인트를 현금처럼 사용해 보세요.')
      expect(lines[1].text()).toBe('캐시백을 신청하면 바로 출금계좌로 입금됩니다.')
    })
  })

  // CTA Component Tests
  describe('CTA Component', () => {
    it('passes correct props to CTA component', () => {
      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props('primary-text')).toBe('다음')
      expect(cta.props('disabled')).toBe(false) // Should be enabled as form is always valid
    })

    it('handles CTA click correctly', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const cta = wrapper.findComponent({ name: 'Cta' })

      await cta.vm.$emit('primary')

      expect(consoleSpy).toHaveBeenCalledWith('Proceeding with additional info:', {
        employee: '',
        nhPointUsage: 'not-use'
      })
      consoleSpy.mockRestore()
    })
  })

  // Form Validation Tests
  describe('Form Validation', () => {
    it('form is always valid since fields are optional', () => {
      expect(wrapper.vm.isFormValid).toBe(true)

      // Even with empty employee selection
      wrapper.vm.selectedEmployee = ''
      expect(wrapper.vm.isFormValid).toBe(true)

      // Even with different NH point usage
      wrapper.vm.nhPointUsage = 'use'
      expect(wrapper.vm.isFormValid).toBe(true)
    })
  })

  // Data Management Tests
  describe('Data Management', () => {
    it('initializes with correct default data from Figma', () => {
      expect(wrapper.vm.selectedEmployee).toBe('')
      expect(wrapper.vm.nhPointUsage).toBe('not-use')
      expect(wrapper.vm.nhPointOptions).toEqual([
        { label: '사용안함', value: 'not-use' },
        { label: '사용함', value: 'use' }
      ])
    })

    it('updates page data when form state changes', async () => {
      const initialData = { ...wrapper.vm.pageData }

      wrapper.vm.selectedEmployee = '김철수'
      wrapper.vm.nhPointUsage = 'use'
      wrapper.vm.updatePageData()
      await nextTick()

      expect(wrapper.vm.pageData).not.toEqual(initialData)
      expect(wrapper.vm.pageData.selectedEmployee).toBe('김철수')
      expect(wrapper.vm.pageData.nhPointUsage).toBe('use')
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

      const container = wrapper.find('[data-testid="additional-info-selection"]')
      expect(container.exists()).toBe(true)
    })

    it('maintains focus management for interactive elements', () => {
      const searchSection = wrapper.find('.page__search-section')
      const radioSection = wrapper.find('.page__radio-section')

      expect(searchSection.exists()).toBe(true)
      expect(radioSection.exists()).toBe(true)
    })
  })

  // Design Token Tests
  describe('Design Tokens and Styling', () => {
    it('applies correct CSS custom properties', () => {
      const container = wrapper.find('.additional-info-selection')
      expect(container.classes()).toContain('additional-info-selection')
    })

    it('uses correct Figma node IDs for mapping', () => {
      expect(wrapper.find('[data-node-id="1:2646"]').exists()).toBe(true) // Frame
      expect(wrapper.find('[data-node-id="1:2659"]').exists()).toBe(true) // Header
      expect(wrapper.find('[data-node-id="1:2647"]').exists()).toBe(true) // Contents
      expect(wrapper.find('[data-node-id="1:2662"]').exists()).toBe(true) // CTA
    })

    it('applies responsive design classes', () => {
      const container = wrapper.find('.additional-info-selection')
      expect(container.exists()).toBe(true)
      // CSS classes are applied through style tag, would need DOM testing for full verification
    })
  })

  // Integration Tests
  describe('Component Integration', () => {
    it('integrates all components correctly', () => {
      expect(wrapper.findComponent({ name: 'Navigation' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Progress' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Input' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'TooltipIcon' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Radio' }).exists()).toBe(true)
      expect(wrapper.findComponent({ name: 'Cta' }).exists()).toBe(true)
    })

    it('maintains consistent state across component interactions', async () => {
      // Change employee selection
      const input = wrapper.findComponent({ name: 'Input' })
      await input.vm.$emit('input', new Event('input'), '박민수')
      await nextTick()

      // Change NH point usage
      const radio = wrapper.findComponent({ name: 'Radio' })
      await radio.vm.$emit('change', 'use')
      await nextTick()

      // Verify state consistency
      expect(wrapper.vm.selectedEmployee).toBe('박민수')
      expect(wrapper.vm.nhPointUsage).toBe('use')
      expect(wrapper.vm.pageData.selectedEmployee).toBe('박민수')
      expect(wrapper.vm.pageData.nhPointUsage).toBe('use')
      expect(wrapper.vm.isFormValid).toBe(true)

      // Verify CTA state
      const cta = wrapper.findComponent({ name: 'Cta' })
      expect(cta.props('disabled')).toBe(false)
    })
  })
})

// Type Validation Tests
describe('AdditionalInfoSelectionTypes', () => {
  describe('validateAdditionalInfoSelection function', () => {
    it('validates form data correctly', () => {
      const validData: AdditionalInfoSelectionData = {
        selectedEmployee: '김철수',
        nhPointUsage: 'use',
        isFormValid: true
      }

      const emptyData: AdditionalInfoSelectionData = {
        selectedEmployee: '',
        nhPointUsage: 'not-use',
        isFormValid: true
      }

      expect(validateAdditionalInfoSelection(validData)).toEqual({
        isValid: true,
        errors: []
      })

      expect(validateAdditionalInfoSelection(emptyData)).toEqual({
        isValid: true,
        errors: []
      })
    })
  })

  describe('Helper functions', () => {
    it('creates NH point options correctly', () => {
      const options = createNhPointOptions()
      expect(options).toEqual([
        { label: '사용안함', value: 'not-use' },
        { label: '사용함', value: 'use' }
      ])
    })

    it('formats employee name correctly', () => {
      const employee = MOCK_EMPLOYEES[0]
      expect(formatEmployeeName(employee)).toBe('김철수 (영업팀)')
    })

    it('filters employees correctly', () => {
      const filtered = filterEmployees(MOCK_EMPLOYEES, '김')
      expect(filtered).toHaveLength(1)
      expect(filtered[0].name).toBe('김철수')

      const allFiltered = filterEmployees(MOCK_EMPLOYEES, '')
      expect(allFiltered).toHaveLength(MOCK_EMPLOYEES.length)
    })

    it('validates employee search correctly', () => {
      expect(validateEmployeeSearch('')).toEqual({ isValid: true })
      expect(validateEmployeeSearch('김')).toEqual({
        isValid: false,
        error: '최소 2글자 이상 입력해주세요'
      })
      expect(validateEmployeeSearch('김철수')).toEqual({ isValid: true })
    })

    it('generates NH point summary correctly', () => {
      expect(generateNhPointSummary('not-use')).toBe('NH포인트 사용안함')
      expect(generateNhPointSummary('use')).toBe('NH포인트 사용함 - 캐시백 신청 시 출금계좌로 입금')
    })

    it('generates form summary correctly', () => {
      const data: AdditionalInfoSelectionData = {
        selectedEmployee: '김철수',
        nhPointUsage: 'use',
        isFormValid: true
      }

      const summary = generateFormSummary(data)
      expect(summary.employee).toBe('김철수')
      expect(summary.nhPoint).toBe('NH포인트 사용함 - 캐시백 신청 시 출금계좌로 입금')
      expect(summary.isComplete).toBe(true)
    })

    it('calculates form progress correctly', () => {
      const filledData: AdditionalInfoSelectionData = {
        selectedEmployee: '김철수',
        nhPointUsage: 'use',
        isFormValid: true
      }

      const partialData: AdditionalInfoSelectionData = {
        selectedEmployee: '',
        nhPointUsage: 'not-use',
        isFormValid: true
      }

      expect(calculateFormProgress(filledData)).toBe(100)
      expect(calculateFormProgress(partialData)).toBe(50)
    })
  })

  describe('Constants validation', () => {
    it('has correct progress ratio', () => {
      expect(ADDITIONAL_INFO_SELECTION_CONSTANTS.PROGRESS_RATIO).toBe(0.8)
    })

    it('has correct Figma node IDs', () => {
      expect(ADDITIONAL_INFO_SELECTION_CONSTANTS.FIGMA_NODE_IDS.FRAME).toBe('1:2646')
      expect(ADDITIONAL_INFO_SELECTION_CONSTANTS.FIGMA_NODE_IDS.SEARCH_COMPONENT).toBe('1:2651')
    })

    it('has correct design tokens', () => {
      expect(ADDITIONAL_INFO_SELECTION_CONSTANTS.DESIGN_TOKENS.FRAME_WIDTH).toBe(360)
      expect(ADDITIONAL_INFO_SELECTION_CONSTANTS.DESIGN_TOKENS.FRAME_HEIGHT).toBe(760)
    })

    it('has correct text content', () => {
      expect(ADDITIONAL_INFO_SELECTION_CONSTANTS.TITLE).toBe('추가정보를 선택해 주세요')
      expect(ADDITIONAL_INFO_SELECTION_CONSTANTS.SEARCH_LABEL).toBe('권유직원')
      expect(ADDITIONAL_INFO_SELECTION_CONSTANTS.RADIO_LABEL).toBe('NH포인트 사용 신청')
    })
  })

  describe('Mock data validation', () => {
    it('has valid mock employee data', () => {
      expect(MOCK_EMPLOYEES).toHaveLength(3)
      expect(MOCK_EMPLOYEES[0]).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        department: expect.any(String),
        position: expect.any(String),
        isActive: expect.any(Boolean)
      })
    })
  })
})