import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import TermsAgreement from './TermsAgreement.vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import PageTitle from '../components/PageTitle.vue'
import Terms from '../components/Terms.vue'
import Cta from '../components/Cta.vue'
import { TERMS_AGREEMENT_CONSTANTS } from '../types/termsAgreementTypes'

// Mock console methods
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('TermsAgreement.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(TermsAgreement, {
      global: {
        components: {
          Navigation,
          Progress,
          PageTitle,
          Terms,
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
      const container = wrapper.find('[data-testid="terms-agreement"]')
      expect(container.exists()).toBe(true)
      expect(container.attributes('data-node-id')).toBe('1:3189')
    })

    it('renders all required child components', () => {
      expect(wrapper.findComponent(Navigation).exists()).toBe(true)
      expect(wrapper.findComponent(Progress).exists()).toBe(true)
      expect(wrapper.findComponent(PageTitle).exists()).toBe(true)
      expect(wrapper.findAllComponents(Terms)).toHaveLength(3)
      expect(wrapper.findComponent(Cta).exists()).toBe(true)
    })

    it('applies correct CSS classes and structure', () => {
      expect(wrapper.classes()).toContain('terms-agreement')
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
        ratio: TERMS_AGREEMENT_CONSTANTS.PROGRESS_RATIO,
        showAnimation: false,
        size: 'md',
        color: 'green'
      })
    })

    it('has correct header positioning and structure', () => {
      const header = wrapper.find('.page__header')
      expect(header.attributes('data-node-id')).toBe('1:3194')
    })
  })

  // 3. Contents Section Tests
  describe('Contents Section', () => {
    it('renders PageTitle with correct props', () => {
      const pageTitle = wrapper.findComponent(PageTitle)
      expect(pageTitle.props()).toMatchObject({
        titleText: TERMS_AGREEMENT_CONSTANTS.PAGE_TITLE,
        subTitle: false,
        align: 'center'
      })
    })

    it('renders correct page title text', () => {
      const pageTitle = wrapper.findComponent(PageTitle)
      expect(pageTitle.props('titleText')).toBe('약관에 동의해 주세요')
    })

    it('has correct contents positioning and structure', () => {
      const contents = wrapper.find('.page__contents')
      expect(contents.attributes('data-node-id')).toBe('1:3190')
      expect(contents.find('.page__title').exists()).toBe(true)
      expect(contents.find('.page__terms').exists()).toBe(true)
    })
  })

  // 4. Terms Components Tests
  describe('Terms Components', () => {
    it('renders master agreement terms with correct props', () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const masterTerms = termsComponents[0]

      expect(masterTerms.props()).toMatchObject({
        title: '[필수] 전체 동의',
        state: 'close',
        checked: true,
        showArrow: false
      })
    })

    it('renders financial products terms with correct props', () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const financialTerms = termsComponents[1]

      expect(financialTerms.props()).toMatchObject({
        title: '[필수] 금융상품 중요사항 확인',
        state: 'close',
        checked: true,
        showArrow: false
      })
    })

    it('renders detailed agreement terms with correct props', () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const detailedTerms = termsComponents[2]

      expect(detailedTerms.props()).toMatchObject({
        title: '[필수] 전체 동의',
        state: 'open',
        checked: true,
        showArrow: true
      })

      expect(detailedTerms.props('items')).toHaveLength(2)
      expect(detailedTerms.props('items')[0]).toMatchObject({
        text: '개인정보 수집·이용 동의',
        checked: true,
        type: 'checkbox'
      })
      expect(detailedTerms.props('items')[1]).toMatchObject({
        text: '금융정보 등의 제공 동의',
        checked: true,
        type: 'checkbox'
      })
    })
  })

  // 5. CTA Section Tests
  describe('CTA Section', () => {
    it('renders CTA with correct props when all terms agreed', () => {
      const cta = wrapper.findComponent(Cta)
      expect(cta.props()).toMatchObject({
        type: 'basic',
        ratio: 'cta-full',
        primaryText: TERMS_AGREEMENT_CONSTANTS.CTA_TEXT,
        primaryDisabled: false
      })
    })

    it('has correct CTA positioning and structure', () => {
      const ctaSection = wrapper.find('.page__cta')
      expect(ctaSection.attributes('data-node-id')).toBe('1:3197')
    })
  })

  // 6. Master Agreement Logic Tests
  describe('Master Agreement Logic', () => {
    it('updates all terms when master agreement is checked', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const masterTerms = termsComponents[0]

      // Uncheck master first
      await masterTerms.vm.$emit('update:checked', false)
      await nextTick()

      // Then check it
      await masterTerms.vm.$emit('update:checked', true)
      await nextTick()

      // All terms should be checked
      expect(wrapper.vm.masterChecked).toBe(true)
      expect(wrapper.vm.financialProductsChecked).toBe(true)
      expect(wrapper.vm.detailedChecked).toBe(true)
      expect(wrapper.vm.detailedItems.every((item: any) => item.checked)).toBe(true)
    })

    it('unchecks all terms when master agreement is unchecked', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const masterTerms = termsComponents[0]

      await masterTerms.vm.$emit('update:checked', false)
      await nextTick()

      expect(wrapper.vm.masterChecked).toBe(false)
      expect(wrapper.vm.financialProductsChecked).toBe(false)
      expect(wrapper.vm.detailedChecked).toBe(false)
      expect(wrapper.vm.detailedItems.every((item: any) => !item.checked)).toBe(true)
    })
  })

  // 7. Individual Terms Logic Tests
  describe('Individual Terms Logic', () => {
    it('updates master state when financial products term changes', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const financialTerms = termsComponents[1]

      await financialTerms.vm.$emit('update:checked', false)
      await nextTick()

      expect(wrapper.vm.financialProductsChecked).toBe(false)
      expect(wrapper.vm.masterChecked).toBe(false)
    })

    it('updates detailed items when detailed agreement changes', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const detailedTerms = termsComponents[2]

      await detailedTerms.vm.$emit('update:checked', false)
      await nextTick()

      expect(wrapper.vm.detailedChecked).toBe(false)
      expect(wrapper.vm.detailedItems.every((item: any) => !item.checked)).toBe(true)
      expect(wrapper.vm.masterChecked).toBe(false)
    })

    it('handles detailed state change correctly', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const detailedTerms = termsComponents[2]

      await detailedTerms.vm.$emit('update:state', 'close')
      await nextTick()

      expect(wrapper.vm.detailedState).toBe('close')
    })
  })

  // 8. Detailed Items Logic Tests
  describe('Detailed Items Logic', () => {
    it('handles individual detailed item check correctly', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const detailedTerms = termsComponents[2]

      // Uncheck first item
      await detailedTerms.vm.$emit('item-check', 0, false)
      await nextTick()

      expect(wrapper.vm.detailedItems[0].checked).toBe(false)
      expect(wrapper.vm.detailedChecked).toBe(false)
      expect(wrapper.vm.masterChecked).toBe(false)
    })

    it('updates detailed terms when all items are checked', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const detailedTerms = termsComponents[2]

      // First uncheck all
      await detailedTerms.vm.$emit('item-check', 0, false)
      await detailedTerms.vm.$emit('item-check', 1, false)
      await nextTick()

      // Then check all items
      await detailedTerms.vm.$emit('item-check', 0, true)
      await detailedTerms.vm.$emit('item-check', 1, true)
      await nextTick()

      expect(wrapper.vm.detailedItems.every((item: any) => item.checked)).toBe(true)
      expect(wrapper.vm.detailedChecked).toBe(true)
    })
  })

  // 9. CTA State Logic Tests
  describe('CTA State Logic', () => {
    it('enables CTA when all terms are agreed', () => {
      const cta = wrapper.findComponent(Cta)
      expect(cta.props('primaryDisabled')).toBe(false)
    })

    it('disables CTA when master agreement is unchecked', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const masterTerms = termsComponents[0]

      await masterTerms.vm.$emit('update:checked', false)
      await nextTick()

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('primaryDisabled')).toBe(true)
    })

    it('disables CTA when any detailed item is unchecked', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      const detailedTerms = termsComponents[2]

      await detailedTerms.vm.$emit('item-check', 0, false)
      await nextTick()

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('primaryDisabled')).toBe(true)
    })
  })

  // 10. Navigation Events Tests
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

  // 11. CTA Events Tests
  describe('CTA Events', () => {
    it('handles next button click when all terms agreed', async () => {
      const cta = wrapper.findComponent(Cta)
      const mockEvent = new MouseEvent('click')

      await cta.vm.$emit('primary-click', mockEvent)

      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked', mockEvent)
      expect(consoleSpy).toHaveBeenCalledWith('All terms agreed, proceeding to next step')
    })

    it('handles next button click when terms not fully agreed', async () => {
      // Uncheck a term first
      const termsComponents = wrapper.findAllComponents(Terms)
      const masterTerms = termsComponents[0]
      await masterTerms.vm.$emit('update:checked', false)
      await nextTick()

      const cta = wrapper.findComponent(Cta)
      const mockEvent = new MouseEvent('click')

      await cta.vm.$emit('primary-click', mockEvent)

      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked', mockEvent)
      expect(consoleSpy).not.toHaveBeenCalledWith('All terms agreed, proceeding to next step')
    })
  })

  // 12. Constants and Configuration Tests
  describe('Constants and Configuration', () => {
    it('uses correct constants from TERMS_AGREEMENT_CONSTANTS', () => {
      expect(wrapper.vm.pageTitle).toBe(TERMS_AGREEMENT_CONSTANTS.PAGE_TITLE)
      expect(wrapper.vm.progressRatio).toBe(TERMS_AGREEMENT_CONSTANTS.PROGRESS_RATIO)
      expect(wrapper.vm.ctaText).toBe(TERMS_AGREEMENT_CONSTANTS.CTA_TEXT)
    })

    it('initializes with correct default state', () => {
      expect(wrapper.vm.masterChecked).toBe(true)
      expect(wrapper.vm.financialProductsChecked).toBe(true)
      expect(wrapper.vm.detailedChecked).toBe(true)
      expect(wrapper.vm.detailedState).toBe('open')
      expect(wrapper.vm.detailedItems).toHaveLength(2)
    })
  })

  // 13. Figma Design Compliance Tests
  describe('Figma Design Compliance', () => {
    it('has correct Figma node IDs', () => {
      expect(wrapper.find('[data-node-id="1:3189"]').exists()).toBe(true) // Frame
      expect(wrapper.find('[data-node-id="1:3194"]').exists()).toBe(true) // Header
      expect(wrapper.find('[data-node-id="1:3190"]').exists()).toBe(true) // Contents
      expect(wrapper.find('[data-node-id="1:3197"]').exists()).toBe(true) // CTA
    })

    it('maintains correct layout structure', () => {
      const container = wrapper.find('.terms-agreement')
      expect(container.element.style.width).toBe('')
      expect(container.element.style.height).toBe('')
    })

    it('uses correct design tokens and styling', () => {
      const container = wrapper.find('.terms-agreement')
      expect(container.classes()).toContain('terms-agreement')
    })
  })

  // 14. Accessibility Tests
  describe('Accessibility', () => {
    it('has correct data-testid attributes', () => {
      expect(wrapper.find('[data-testid="terms-agreement"]').exists()).toBe(true)
    })

    it('maintains proper focus management structure', () => {
      const termsComponents = wrapper.findAllComponents(Terms)
      expect(termsComponents.length).toBe(3)

      // Each Terms component should handle its own accessibility
      termsComponents.forEach(terms => {
        expect(terms.exists()).toBe(true)
      })
    })
  })

  // 15. Lifecycle and Integration Tests
  describe('Lifecycle and Integration', () => {
    it('calls onMounted lifecycle correctly', () => {
      expect(consoleSpy).toHaveBeenCalledWith('TermsAgreement mounted')
    })

    it('maintains reactive state correctly', async () => {
      const initialAllTermsAgreed = wrapper.vm.allTermsAgreed
      expect(initialAllTermsAgreed).toBe(true)

      // Change a term and verify reactivity
      const termsComponents = wrapper.findAllComponents(Terms)
      await termsComponents[0].vm.$emit('update:checked', false)
      await nextTick()

      expect(wrapper.vm.allTermsAgreed).toBe(false)
    })

    it('handles complex state interactions correctly', async () => {
      const termsComponents = wrapper.findAllComponents(Terms)

      // Simulate complex user interaction
      await termsComponents[2].vm.$emit('item-check', 0, false) // Uncheck first detailed item
      await nextTick()

      expect(wrapper.vm.detailedChecked).toBe(false)
      expect(wrapper.vm.masterChecked).toBe(false)

      await termsComponents[2].vm.$emit('item-check', 0, true) // Check it back
      await nextTick()

      expect(wrapper.vm.detailedChecked).toBe(true)
      expect(wrapper.vm.masterChecked).toBe(true)
    })
  })
})