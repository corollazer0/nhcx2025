import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import HousingPolicySelection from './HousingPolicySelection.vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Select from '../components/Select.vue'
import Cta from '../components/Cta.vue'
import { HOUSING_POLICY_CONSTANTS } from '../types/housingPolicyTypes'

// Mock console methods
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('HousingPolicySelection.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(HousingPolicySelection, {
      global: {
        components: {
          Navigation,
          Progress,
          Select,
          Cta
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
    consoleSpy.mockClear()
  })

  // 1. Basic Component Rendering Tests
  describe('Component Rendering', () => {
    it('renders the main container with correct data attributes', () => {
      const container = wrapper.find('[data-testid="housing-policy-selection"]')
      expect(container.exists()).toBe(true)
      expect(container.attributes('data-node-id')).toBe('1:2554')
    })

    it('renders all required child components', () => {
      expect(wrapper.findComponent(Navigation).exists()).toBe(true)
      expect(wrapper.findComponent(Progress).exists()).toBe(true)
      expect(wrapper.findComponent(Select).exists()).toBe(true)
      expect(wrapper.findComponent(Cta).exists()).toBe(true)
    })

    it('applies correct CSS classes and structure', () => {
      expect(wrapper.classes()).toContain('housing-policy-selection')
      expect(wrapper.find('.page__header').exists()).toBe(true)
      expect(wrapper.find('.page__contents').exists()).toBe(true)
      expect(wrapper.find('.page__cta').exists()).toBe(true)
    })
  })

  // 2. Header Section Tests
  describe('Header Section', () => {
    it('renders Navigation with correct props', () => {
      const navigation = wrapper.findComponent(Navigation)
      expect(navigation.props()).toMatchObject({
        previous: true,
        title: true,
        title1: '청약 가입',
        cs: true,
        cancel: true
      })
    })

    it('renders Progress with correct props', () => {
      const progress = wrapper.findComponent(Progress)
      expect(progress.props()).toMatchObject({
        ratio: HOUSING_POLICY_CONSTANTS.PROGRESS_RATIO,
        showAnimation: false,
        size: 'md',
        color: 'green'
      })
    })

    it('has correct header positioning and structure', () => {
      const header = wrapper.find('.page__header')
      expect(header.attributes('data-node-id')).toBe('1:2560')
    })
  })

  // 3. Contents Section Tests
  describe('Contents Section', () => {
    it('renders correct main title text', () => {
      const mainTitle = wrapper.find('.page__main-title')
      expect(mainTitle.text()).toBe(HOUSING_POLICY_CONSTANTS.MAIN_TITLE)
      expect(mainTitle.attributes('data-node-id')).toBe('1:2557')
    })

    it('renders correct subtitle text', () => {
      const subtitle = wrapper.find('.page__subtitle')
      expect(subtitle.text()).toBe(HOUSING_POLICY_CONSTANTS.SUBTITLE)
      expect(subtitle.attributes('data-node-id')).toBe('1:2558')
    })

    it('has correct contents positioning and structure', () => {
      const contents = wrapper.find('.page__contents')
      expect(contents.attributes('data-node-id')).toBe('1:2555')
      expect(contents.find('.page__title').exists()).toBe(true)
      expect(contents.find('.page__region-select').exists()).toBe(true)
    })

    it('has correct title section structure', () => {
      const titleSection = wrapper.find('.page__title')
      expect(titleSection.attributes('data-node-id')).toBe('1:2556')
    })
  })

  // 4. Region Selection Tests
  describe('Region Selection', () => {
    it('renders Select component with correct props', () => {
      const select = wrapper.findComponent(Select)
      expect(select.props()).toMatchObject({
        modelValue: null,
        placeholder: HOUSING_POLICY_CONSTANTS.SELECT_PLACEHOLDER,
        variant: 'default'
      })
    })

    it('has correct region options', () => {
      const select = wrapper.findComponent(Select)
      const options = select.props('options')

      expect(options).toHaveLength(17) // All Korean administrative divisions
      expect(options[0]).toMatchObject({
        label: '서울특별시',
        value: 'seoul'
      })
      expect(options[8]).toMatchObject({
        label: '경기도',
        value: 'gyeonggi'
      })
      expect(options[16]).toMatchObject({
        label: '제주특별자치도',
        value: 'jeju'
      })
    })

    it('has correct region select positioning', () => {
      const regionSelect = wrapper.find('.page__region-select')
      expect(regionSelect.attributes('data-node-id')).toBe('1:2559')
    })
  })

  // 5. CTA Section Tests
  describe('CTA Section', () => {
    it('renders CTA with correct props when no region selected', () => {
      const cta = wrapper.findComponent(Cta)
      expect(cta.props()).toMatchObject({
        type: 'basic',
        ratio: 'cta-full',
        primaryText: HOUSING_POLICY_CONSTANTS.CTA_TEXT,
        primaryDisabled: true // No region selected initially
      })
    })

    it('enables CTA when region is selected', async () => {
      const select = wrapper.findComponent(Select)

      // Select a region
      await select.vm.$emit('change', 'seoul')
      await nextTick()

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('primaryDisabled')).toBe(false)
    })

    it('has correct CTA positioning and structure', () => {
      const ctaSection = wrapper.find('.page__cta')
      expect(ctaSection.attributes('data-node-id')).toBe('1:2563')
    })
  })

  // 6. Region Selection Logic Tests
  describe('Region Selection Logic', () => {
    it('updates selectedRegion when region is changed', async () => {
      const select = wrapper.findComponent(Select)

      await select.vm.$emit('change', 'seoul')
      await nextTick()

      expect(wrapper.vm.selectedRegion).toBe('seoul')
    })

    it('updates pageData when region is selected', async () => {
      const select = wrapper.findComponent(Select)

      await select.vm.$emit('change', 'busan')
      await nextTick()

      expect(wrapper.vm.pageData.selectedRegion).toMatchObject({
        label: '부산광역시',
        value: 'busan'
      })
    })

    it('logs region selection correctly', async () => {
      const select = wrapper.findComponent(Select)

      await select.vm.$emit('change', 'daegu')
      await nextTick()

      expect(consoleSpy).toHaveBeenCalledWith('Region selected:', 'daegu')
    })

    it('handles null region selection', async () => {
      const select = wrapper.findComponent(Select)

      // First select a region
      await select.vm.$emit('change', 'seoul')
      await nextTick()

      // Then deselect
      await select.vm.$emit('change', null)
      await nextTick()

      expect(wrapper.vm.selectedRegion).toBe(null)
    })
  })

  // 7. Navigation Events Tests
  describe('Navigation Events', () => {
    it('handles previous button click correctly', async () => {
      const navigation = wrapper.findComponent(Navigation)
      await navigation.vm.$emit('previous', { type: 'previous', timestamp: Date.now() })

      expect(consoleSpy).toHaveBeenCalledWith('Previous button clicked', expect.any(Object))
    })

    it('handles CS button click correctly', async () => {
      const navigation = wrapper.findComponent(Navigation)
      await navigation.vm.$emit('cs', { type: 'cs', timestamp: Date.now() })

      expect(consoleSpy).toHaveBeenCalledWith('CS center button clicked', expect.any(Object))
    })

    it('handles cancel button click correctly', async () => {
      const navigation = wrapper.findComponent(Navigation)
      await navigation.vm.$emit('cancel', { type: 'cancel', timestamp: Date.now() })

      expect(consoleSpy).toHaveBeenCalledWith('Cancel button clicked', expect.any(Object))
    })
  })

  // 8. CTA Events Tests
  describe('CTA Events', () => {
    it('handles next button click when region selected', async () => {
      // First select a region
      const select = wrapper.findComponent(Select)
      await select.vm.$emit('change', 'seoul')
      await nextTick()

      const cta = wrapper.findComponent(Cta)
      const mockEvent = new MouseEvent('click')

      await cta.vm.$emit('primary-click', mockEvent)

      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked', mockEvent)
      expect(consoleSpy).toHaveBeenCalledWith('Proceeding with selected region:', 'seoul')
    })

    it('handles next button click when no region selected', async () => {
      const cta = wrapper.findComponent(Cta)
      const mockEvent = new MouseEvent('click')

      await cta.vm.$emit('primary-click', mockEvent)

      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked', mockEvent)
      expect(consoleSpy).not.toHaveBeenCalledWith('Proceeding with selected region:', expect.any(String))
    })
  })

  // 9. Constants and Configuration Tests
  describe('Constants and Configuration', () => {
    it('uses correct constants from HOUSING_POLICY_CONSTANTS', () => {
      expect(wrapper.vm.mainTitle).toBe(HOUSING_POLICY_CONSTANTS.MAIN_TITLE)
      expect(wrapper.vm.subtitle).toBe(HOUSING_POLICY_CONSTANTS.SUBTITLE)
      expect(wrapper.vm.progressRatio).toBe(HOUSING_POLICY_CONSTANTS.PROGRESS_RATIO)
      expect(wrapper.vm.ctaText).toBe(HOUSING_POLICY_CONSTANTS.CTA_TEXT)
    })

    it('initializes with correct default state', () => {
      expect(wrapper.vm.selectedRegion).toBe(null)
      expect(wrapper.vm.pageData.selectedRegion).toBe(null)
      expect(wrapper.vm.regionOptions).toHaveLength(17)
    })

    it('displays correct text content', () => {
      expect(wrapper.find('.page__main-title').text()).toBe('주택공급 정책 활용을 위해 선택해 주세요')
      expect(wrapper.find('.page__subtitle').text()).toContain('본 조사표는 [주택공급에 관한 규칙] 제6조에 의거')
    })
  })

  // 10. Figma Design Compliance Tests
  describe('Figma Design Compliance', () => {
    it('has correct Figma node IDs', () => {
      expect(wrapper.find('[data-node-id="1:2554"]').exists()).toBe(true) // Frame
      expect(wrapper.find('[data-node-id="1:2560"]').exists()).toBe(true) // Header
      expect(wrapper.find('[data-node-id="1:2555"]').exists()).toBe(true) // Contents
      expect(wrapper.find('[data-node-id="1:2556"]').exists()).toBe(true) // Title Section
      expect(wrapper.find('[data-node-id="1:2557"]').exists()).toBe(true) // Main Title
      expect(wrapper.find('[data-node-id="1:2558"]').exists()).toBe(true) // Subtitle
      expect(wrapper.find('[data-node-id="1:2559"]').exists()).toBe(true) // Region Select
      expect(wrapper.find('[data-node-id="1:2563"]').exists()).toBe(true) // CTA
    })

    it('maintains correct layout structure', () => {
      const container = wrapper.find('.housing-policy-selection')
      expect(container.element.style.width).toBe('')
      expect(container.element.style.height).toBe('')
    })

    it('uses correct design tokens and styling', () => {
      const container = wrapper.find('.housing-policy-selection')
      expect(container.classes()).toContain('housing-policy-selection')

      const mainTitle = wrapper.find('.page__main-title')
      expect(mainTitle.element.tagName.toLowerCase()).toBe('h1')
    })
  })

  // 11. Typography and Styling Tests
  describe('Typography and Styling', () => {
    it('applies correct main title styling', () => {
      const mainTitle = wrapper.find('.page__main-title')
      expect(mainTitle.exists()).toBe(true)

      // Test CSS custom properties are defined
      const styles = getComputedStyle(wrapper.element)
      expect(styles.getPropertyValue('--heading-h2-semibold-size')).toBe('22px')
      expect(styles.getPropertyValue('--color-text-font-1')).toBe('#121212')
    })

    it('applies correct subtitle styling', () => {
      const subtitle = wrapper.find('.page__subtitle')
      expect(subtitle.exists()).toBe(true)
      expect(subtitle.element.tagName.toLowerCase()).toBe('p')
    })

    it('uses Pretendard font family', () => {
      const container = wrapper.find('.housing-policy-selection')
      expect(container.element.style.fontFamily).toContain('Pretendard')
    })
  })

  // 12. Accessibility Tests
  describe('Accessibility', () => {
    it('has correct data-testid attributes', () => {
      expect(wrapper.find('[data-testid="housing-policy-selection"]').exists()).toBe(true)
    })

    it('has proper heading hierarchy', () => {
      expect(wrapper.find('h1').exists()).toBe(true)
      expect(wrapper.find('h1').text()).toBe(HOUSING_POLICY_CONSTANTS.MAIN_TITLE)
    })

    it('maintains proper focus management structure', () => {
      const select = wrapper.findComponent(Select)
      expect(select.exists()).toBe(true)

      // Select component should handle its own accessibility
      expect(select.props('placeholder')).toBe('지역을 선택해 주세요')
    })
  })

  // 13. Responsive Design Tests
  describe('Responsive Design', () => {
    it('has responsive CSS classes', () => {
      const container = wrapper.find('.housing-policy-selection')
      expect(container.exists()).toBe(true)

      // Test that responsive media queries are defined in styles
      // This is structural test - actual responsive behavior would need E2E testing
    })

    it('maintains layout structure for different screen sizes', () => {
      expect(wrapper.find('.page__contents').exists()).toBe(true)
      expect(wrapper.find('.page__header').exists()).toBe(true)
      expect(wrapper.find('.page__cta').exists()).toBe(true)
    })
  })

  // 14. Data Flow Tests
  describe('Data Flow', () => {
    it('maintains reactive state correctly', async () => {
      const initialCTADisabled = wrapper.findComponent(Cta).props('primaryDisabled')
      expect(initialCTADisabled).toBe(true)

      // Change region and verify reactivity
      const select = wrapper.findComponent(Select)
      await select.vm.$emit('change', 'gangwon')
      await nextTick()

      const updatedCTADisabled = wrapper.findComponent(Cta).props('primaryDisabled')
      expect(updatedCTADisabled).toBe(false)
    })

    it('handles multiple region selections correctly', async () => {
      const select = wrapper.findComponent(Select)

      // Select multiple regions in sequence
      await select.vm.$emit('change', 'seoul')
      await nextTick()
      expect(wrapper.vm.selectedRegion).toBe('seoul')

      await select.vm.$emit('change', 'busan')
      await nextTick()
      expect(wrapper.vm.selectedRegion).toBe('busan')

      await select.vm.$emit('change', 'jeju')
      await nextTick()
      expect(wrapper.vm.selectedRegion).toBe('jeju')
    })
  })

  // 15. Lifecycle and Integration Tests
  describe('Lifecycle and Integration', () => {
    it('calls onMounted lifecycle correctly', () => {
      expect(consoleSpy).toHaveBeenCalledWith('HousingPolicySelection mounted')
    })

    it('handles component integration correctly', async () => {
      // Test full user flow
      const select = wrapper.findComponent(Select)
      const cta = wrapper.findComponent(Cta)

      // 1. Initially disabled
      expect(cta.props('primaryDisabled')).toBe(true)

      // 2. Select region
      await select.vm.$emit('change', 'gyeonggi')
      await nextTick()

      // 3. CTA enabled
      expect(cta.props('primaryDisabled')).toBe(false)

      // 4. Click CTA
      await cta.vm.$emit('primary-click', new MouseEvent('click'))

      // 5. Verify logs
      expect(consoleSpy).toHaveBeenCalledWith('Proceeding with selected region:', 'gyeonggi')
    })

    it('maintains component state consistency', async () => {
      const select = wrapper.findComponent(Select)

      await select.vm.$emit('change', 'chungnam')
      await nextTick()

      expect(wrapper.vm.selectedRegion).toBe('chungnam')
      expect(wrapper.vm.pageData.selectedRegion).toMatchObject({
        label: '충청남도',
        value: 'chungnam'
      })
      expect(wrapper.findComponent(Cta).props('primaryDisabled')).toBe(false)
    })
  })
})