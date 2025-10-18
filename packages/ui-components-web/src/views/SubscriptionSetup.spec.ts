import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import SubscriptionSetup from './SubscriptionSetup.vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import Input from '../components/Input.vue'
import Select from '../components/Select.vue'
import { SUBSCRIPTION_SETUP_CONSTANTS } from '../types/subscriptionSetupTypes'

// Mock console methods
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('SubscriptionSetup.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(SubscriptionSetup, {
      global: {
        components: {
          Navigation,
          Progress,
          Input,
          Select
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
      const container = wrapper.find('[data-testid="subscription-setup"]')
      expect(container.exists()).toBe(true)
      expect(container.attributes('data-node-id')).toBe('1:2568')
    })

    it('renders all required child components', () => {
      expect(wrapper.findComponent(Navigation).exists()).toBe(true)
      expect(wrapper.findComponent(Progress).exists()).toBe(true)
      expect(wrapper.findAllComponents(Input)).toHaveLength(2)
      expect(wrapper.findComponent(Select).exists()).toBe(true)
    })

    it('applies correct CSS classes and structure', () => {
      expect(wrapper.classes()).toContain('subscription-setup')
      expect(wrapper.find('.page__header').exists()).toBe(true)
      expect(wrapper.find('.page__contents').exists()).toBe(true)
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
        ratio: SUBSCRIPTION_SETUP_CONSTANTS.PROGRESS_RATIO,
        showAnimation: false,
        size: 'md',
        color: 'green'
      })
    })

    it('has correct header positioning and structure', () => {
      const header = wrapper.find('.page__header')
      expect(header.attributes('data-node-id')).toBe('1:2580')
    })
  })

  // 3. Contents Section Tests
  describe('Contents Section', () => {
    it('renders correct section titles', () => {
      const titles = wrapper.findAll('.page__title-text')
      expect(titles).toHaveLength(2)
      expect(titles[0].text()).toBe(SUBSCRIPTION_SETUP_CONSTANTS.SECTION_1.TITLE)
      expect(titles[1].text()).toBe(SUBSCRIPTION_SETUP_CONSTANTS.SECTION_2.TITLE)
    })

    it('has correct contents positioning and structure', () => {
      const contents = wrapper.find('.page__contents')
      expect(contents.attributes('data-node-id')).toBe('1:2569')
      expect(wrapper.findAll('.page__section')).toHaveLength(2)
    })

    it('displays correct section titles', () => {
      expect(wrapper.text()).toContain('주민등록상 주소지를 확인해 주세요')
      expect(wrapper.text()).toContain('가입금액을 입력해 주세요')
    })
  })

  // 4. Section 1: Address Verification Tests
  describe('Section 1: Address Verification', () => {
    it('renders address input with correct initial value', () => {
      const inputs = wrapper.findAllComponents(Input)
      const addressInput = inputs[0]

      expect(addressInput.props('value')).toBe('04517 서울시 중구 통일로 120')
      expect(addressInput.props('state')).toBe('filled')
      expect(addressInput.props('label')).toBe(false)
      expect(addressInput.props('message')).toBe(false)
    })

    it('renders bank input with correct initial value', () => {
      const inputs = wrapper.findAllComponents(Input)
      const bankInput = inputs[1]

      expect(bankInput.props('value')).toBe('NH농협은행')
      expect(bankInput.props('state')).toBe('filled')
      expect(bankInput.props('label')).toBe(false)
      expect(bankInput.props('message')).toBe(false)
    })

    it('has correct section 1 node IDs', () => {
      const section1 = wrapper.find('[data-node-id="1:2570"]')
      expect(section1.exists()).toBe(true)

      const title1 = wrapper.find('[data-node-id="1:2572"]')
      expect(title1.exists()).toBe(true)

      const search = wrapper.find('[data-node-id="1:2573"]')
      expect(search.exists()).toBe(true)
    })
  })

  // 5. Section 2: Amount Setup Tests
  describe('Section 2: Amount Setup', () => {
    it('renders amount range selector with correct props', () => {
      const select = wrapper.findComponent(Select)
      expect(select.props()).toMatchObject({
        modelValue: null,
        placeholder: SUBSCRIPTION_SETUP_CONSTANTS.SECTION_2.AMOUNT_PLACEHOLDER,
        variant: 'default'
      })
    })

    it('has correct amount range options', () => {
      expect(wrapper.vm.amountRangeOptions).toHaveLength(6)
      expect(wrapper.vm.amountRangeOptions[0]).toMatchObject({
        label: '2만원 ~ 10만원',
        value: '20000-100000'
      })
      expect(wrapper.vm.amountRangeOptions[5]).toMatchObject({
        label: '2만원 ~ 1,500만원',
        value: '20000-15000000'
      })
    })

    it('has correct section 2 node IDs', () => {
      const section2 = wrapper.find('[data-node-id="1:2576"]')
      expect(section2.exists()).toBe(true)

      const title2 = wrapper.find('[data-node-id="1:2578"]')
      expect(title2.exists()).toBe(true)

      const amountSelector = wrapper.find('[data-node-id="1:2579"]')
      expect(amountSelector.exists()).toBe(true)
    })
  })

  // 6. Address Input Logic Tests
  describe('Address Input Logic', () => {
    it('handles address input changes correctly', async () => {
      const inputs = wrapper.findAllComponents(Input)
      const addressInput = inputs[0]

      await addressInput.vm.$emit('input', '새로운 주소')
      await nextTick()

      expect(wrapper.vm.addressValue).toBe('새로운 주소')
      expect(consoleSpy).toHaveBeenCalledWith('Address input changed:', '새로운 주소')
    })

    it('handles address focus state correctly', async () => {
      const inputs = wrapper.findAllComponents(Input)
      const addressInput = inputs[0]

      await addressInput.vm.$emit('focus')
      await nextTick()

      expect(wrapper.vm.addressState).toBe('focus')
    })

    it('handles address blur state correctly', async () => {
      const inputs = wrapper.findAllComponents(Input)
      const addressInput = inputs[0]

      // With value
      await addressInput.vm.$emit('blur')
      await nextTick()

      expect(wrapper.vm.addressState).toBe('filled')

      // Without value
      wrapper.vm.addressValue = ''
      await addressInput.vm.$emit('blur')
      await nextTick()

      expect(wrapper.vm.addressState).toBe('inactive')
    })
  })

  // 7. Bank Input Logic Tests
  describe('Bank Input Logic', () => {
    it('handles bank input changes correctly', async () => {
      const inputs = wrapper.findAllComponents(Input)
      const bankInput = inputs[1]

      await bankInput.vm.$emit('input', '새로운은행')
      await nextTick()

      expect(wrapper.vm.bankValue).toBe('새로운은행')
      expect(consoleSpy).toHaveBeenCalledWith('Bank input changed:', '새로운은행')
    })

    it('handles bank focus state correctly', async () => {
      const inputs = wrapper.findAllComponents(Input)
      const bankInput = inputs[1]

      await bankInput.vm.$emit('focus')
      await nextTick()

      expect(wrapper.vm.bankState).toBe('focus')
    })

    it('handles bank blur state correctly', async () => {
      const inputs = wrapper.findAllComponents(Input)
      const bankInput = inputs[1]

      // With value
      await bankInput.vm.$emit('blur')
      await nextTick()

      expect(wrapper.vm.bankState).toBe('filled')

      // Without value
      wrapper.vm.bankValue = ''
      await bankInput.vm.$emit('blur')
      await nextTick()

      expect(wrapper.vm.bankState).toBe('inactive')
    })
  })

  // 8. Amount Range Selection Logic Tests
  describe('Amount Range Selection Logic', () => {
    it('handles amount range selection correctly', async () => {
      const select = wrapper.findComponent(Select)

      await select.vm.$emit('change', '100000-500000')
      await nextTick()

      expect(wrapper.vm.selectedAmountRange).toBe('100000-500000')
      expect(consoleSpy).toHaveBeenCalledWith('Amount range selected:', '100000-500000')
    })

    it('updates page data when amount range is selected', async () => {
      const select = wrapper.findComponent(Select)

      await select.vm.$emit('change', '500000-1000000')
      await nextTick()

      expect(wrapper.vm.pageData.selectedAmountRange).toMatchObject({
        label: '50만원 ~ 100만원',
        value: '500000-1000000'
      })
      expect(wrapper.vm.pageData.isAmountRangeSelected).toBe(true)
    })

    it('handles null amount range selection', async () => {
      const select = wrapper.findComponent(Select)

      await select.vm.$emit('change', null)
      await nextTick()

      expect(wrapper.vm.selectedAmountRange).toBe(null)
    })
  })

  // 9. Navigation Events Tests
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

  // 10. Data Management Tests
  describe('Data Management', () => {
    it('initializes with correct default data', () => {
      expect(wrapper.vm.addressValue).toBe('04517 서울시 중구 통일로 120')
      expect(wrapper.vm.bankValue).toBe('NH농협은행')
      expect(wrapper.vm.selectedAmountRange).toBe(null)
      expect(wrapper.vm.addressState).toBe('filled')
      expect(wrapper.vm.bankState).toBe('filled')
    })

    it('updates page data correctly when inputs change', async () => {
      const inputs = wrapper.findAllComponents(Input)
      const addressInput = inputs[0]
      const bankInput = inputs[1]

      await addressInput.vm.$emit('input', '새 주소')
      await bankInput.vm.$emit('input', '새 은행')
      await nextTick()

      expect(wrapper.vm.pageData).toMatchObject({
        address: '새 주소',
        bank: '새 은행',
        isAddressValid: true,
        isBankValid: true,
        isAmountRangeSelected: false
      })
    })

    it('validates input states correctly', () => {
      expect(wrapper.vm.pageData.isAddressValid).toBe(true)
      expect(wrapper.vm.pageData.isBankValid).toBe(true)
      expect(wrapper.vm.pageData.isAmountRangeSelected).toBe(false)

      // Clear address
      wrapper.vm.addressValue = ''
      wrapper.vm.updatePageData()
      expect(wrapper.vm.pageData.isAddressValid).toBe(false)
    })
  })

  // 11. Constants and Configuration Tests
  describe('Constants and Configuration', () => {
    it('uses correct constants from SUBSCRIPTION_SETUP_CONSTANTS', () => {
      expect(wrapper.vm.progressRatio).toBe(SUBSCRIPTION_SETUP_CONSTANTS.PROGRESS_RATIO)
    })

    it('displays correct section titles', () => {
      const section1Title = wrapper.find('[data-node-id="1:2572"]')
      const section2Title = wrapper.find('[data-node-id="1:2578"]')

      expect(section1Title.text()).toBe(SUBSCRIPTION_SETUP_CONSTANTS.SECTION_1.TITLE)
      expect(section2Title.text()).toBe(SUBSCRIPTION_SETUP_CONSTANTS.SECTION_2.TITLE)
    })

    it('uses correct placeholder texts', () => {
      expect(wrapper.text()).toContain(SUBSCRIPTION_SETUP_CONSTANTS.SECTION_2.AMOUNT_PLACEHOLDER)
    })
  })

  // 12. Figma Design Compliance Tests
  describe('Figma Design Compliance', () => {
    it('has correct Figma node IDs', () => {
      expect(wrapper.find('[data-node-id="1:2568"]').exists()).toBe(true) // Frame
      expect(wrapper.find('[data-node-id="1:2580"]').exists()).toBe(true) // Header
      expect(wrapper.find('[data-node-id="1:2569"]').exists()).toBe(true) // Contents
      expect(wrapper.find('[data-node-id="1:2570"]').exists()).toBe(true) // Section 1
      expect(wrapper.find('[data-node-id="1:2576"]').exists()).toBe(true) // Section 2
    })

    it('maintains correct layout structure', () => {
      const container = wrapper.find('.subscription-setup')
      expect(container.exists()).toBe(true)
      expect(wrapper.findAll('.page__section')).toHaveLength(2)
    })

    it('uses correct design tokens and styling', () => {
      const container = wrapper.find('.subscription-setup')
      expect(container.classes()).toContain('subscription-setup')
    })
  })

  // 13. Accessibility Tests
  describe('Accessibility', () => {
    it('has correct data-testid attributes', () => {
      expect(wrapper.find('[data-testid="subscription-setup"]').exists()).toBe(true)
    })

    it('has proper heading hierarchy', () => {
      expect(wrapper.find('h1').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(true)
    })

    it('maintains proper focus management structure', () => {
      const inputs = wrapper.findAllComponents(Input)
      expect(inputs).toHaveLength(2)

      const select = wrapper.findComponent(Select)
      expect(select.exists()).toBe(true)
    })
  })

  // 14. Responsive Design Tests
  describe('Responsive Design', () => {
    it('has responsive CSS classes', () => {
      const container = wrapper.find('.subscription-setup')
      expect(container.exists()).toBe(true)
    })

    it('maintains layout structure for different screen sizes', () => {
      expect(wrapper.find('.page__contents').exists()).toBe(true)
      expect(wrapper.find('.page__header').exists()).toBe(true)
    })
  })

  // 15. Integration Tests
  describe('Integration Tests', () => {
    it('handles complete user flow correctly', async () => {
      const inputs = wrapper.findAllComponents(Input)
      const select = wrapper.findComponent(Select)

      // 1. Initial state
      expect(wrapper.vm.addressValue).toBe('04517 서울시 중구 통일로 120')
      expect(wrapper.vm.bankValue).toBe('NH농협은행')

      // 2. Change address
      await inputs[0].vm.$emit('input', '새로운 주소')
      await nextTick()

      // 3. Change bank
      await inputs[1].vm.$emit('input', '새로운 은행')
      await nextTick()

      // 4. Select amount range
      await select.vm.$emit('change', '1000000-5000000')
      await nextTick()

      // 5. Verify final state
      expect(wrapper.vm.pageData).toMatchObject({
        address: '새로운 주소',
        bank: '새로운 은행',
        isAddressValid: true,
        isBankValid: true,
        isAmountRangeSelected: true
      })
    })

    it('maintains state consistency throughout interactions', async () => {
      const inputs = wrapper.findAllComponents(Input)

      // Focus and blur address input
      await inputs[0].vm.$emit('focus')
      expect(wrapper.vm.addressState).toBe('focus')

      await inputs[0].vm.$emit('blur')
      expect(wrapper.vm.addressState).toBe('filled')

      // Focus and blur bank input
      await inputs[1].vm.$emit('focus')
      expect(wrapper.vm.bankState).toBe('focus')

      await inputs[1].vm.$emit('blur')
      expect(wrapper.vm.bankState).toBe('filled')
    })
  })

  // 16. Lifecycle Tests
  describe('Lifecycle', () => {
    it('calls onMounted lifecycle correctly', () => {
      expect(consoleSpy).toHaveBeenCalledWith('SubscriptionSetup mounted with initial data:', expect.any(Object))
    })

    it('initializes page data correctly on mount', () => {
      expect(wrapper.vm.pageData).toMatchObject({
        address: '04517 서울시 중구 통일로 120',
        bank: 'NH농협은행',
        selectedAmountRange: null,
        isAddressValid: true,
        isBankValid: true,
        isAmountRangeSelected: false
      })
    })
  })

  // 17. Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles empty input values gracefully', async () => {
      const inputs = wrapper.findAllComponents(Input)

      await inputs[0].vm.$emit('input', '')
      await inputs[1].vm.$emit('input', '')
      await nextTick()

      expect(wrapper.vm.pageData.isAddressValid).toBe(false)
      expect(wrapper.vm.pageData.isBankValid).toBe(false)
    })

    it('handles rapid input changes correctly', async () => {
      const inputs = wrapper.findAllComponents(Input)

      await inputs[0].vm.$emit('input', 'Test1')
      await inputs[0].vm.$emit('input', 'Test2')
      await inputs[0].vm.$emit('input', 'Test3')
      await nextTick()

      expect(wrapper.vm.addressValue).toBe('Test3')
    })
  })
})