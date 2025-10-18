import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import RegionPickerBottomSheet from './RegionPickerBottomSheet.vue'
import BottomSheet from '../components/BottomSheet.vue'
import { REGION_PICKER_CONSTANTS, PROVINCE_DATA } from '../types/regionPickerTypes'

// Mock console methods
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

describe('RegionPickerBottomSheet.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(RegionPickerBottomSheet, {
      props: {
        isVisible: true,
        defaultProvince: '경기도',
        defaultCity: '고양시 일산동구'
      },
      global: {
        components: {
          BottomSheet
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
      const container = wrapper.find('[data-testid="region-picker-bottom-sheet"]')
      expect(container.exists()).toBe(true)
      expect(container.attributes('data-node-id')).toBe('1:2565')
    })

    it('renders BottomSheet component', () => {
      expect(wrapper.findComponent(BottomSheet).exists()).toBe(true)
    })

    it('renders overlay element', () => {
      const overlay = wrapper.find('.region-picker__overlay')
      expect(overlay.exists()).toBe(true)
    })

    it('applies correct CSS classes and structure', () => {
      expect(wrapper.classes()).toContain('region-picker-bottom-sheet')
    })
  })

  // 2. Props and Configuration Tests
  describe('Props and Configuration', () => {
    it('passes correct props to BottomSheet component', () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      expect(bottomSheet.props()).toMatchObject({
        isVisible: true,
        title: REGION_PICKER_CONSTANTS.TITLE,
        showCloseButton: false,
        showCta: true,
        ctaText: REGION_PICKER_CONSTANTS.CTA_TEXT,
        type: 'picker',
        pickerType: 'day'
      })
    })

    it('sets correct node ID for bottom sheet', () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      expect(bottomSheet.attributes('data-node-id')).toBe('1:2566')
    })

    it('initializes with correct default values', () => {
      expect(wrapper.vm.selectedProvince).toBe('경기도')
      expect(wrapper.vm.selectedCity).toBe('고양시 일산동구')
    })

    it('handles custom default props', async () => {
      await wrapper.setProps({
        defaultProvince: '강원특별자치도',
        defaultCity: '가평군'
      })

      expect(wrapper.vm.selectedProvince).toBe('강원특별자치도')
      expect(wrapper.vm.selectedCity).toBe('가평군')
    })
  })

  // 3. Picker Columns Tests
  describe('Picker Columns', () => {
    it('generates correct province column items', () => {
      const pickerColumns = wrapper.vm.pickerColumns
      expect(pickerColumns).toHaveLength(2)

      const provinceColumn = pickerColumns[0]
      expect(provinceColumn.items).toHaveLength(PROVINCE_DATA.length)
      expect(provinceColumn.items[0]).toMatchObject({
        label: '강원특별자치도',
        value: 'gangwon'
      })
      expect(provinceColumn.items[1]).toMatchObject({
        label: '경기도',
        value: 'gyeonggi',
        selected: true
      })
    })

    it('generates correct city column items based on selected province', () => {
      const pickerColumns = wrapper.vm.pickerColumns
      const cityColumn = pickerColumns[1]

      // Should show Gyeonggi cities since default is '경기도'
      const gyeonggiData = PROVINCE_DATA.find(p => p.name === '경기도')
      expect(cityColumn.items).toHaveLength(gyeonggiData!.cities.length)

      const selectedCityItem = cityColumn.items.find(item => item.selected)
      expect(selectedCityItem).toMatchObject({
        label: '고양시 일산동구',
        value: 'goyang-ilsandong',
        selected: true
      })
    })

    it('updates city column when province changes', async () => {
      // Initially should have Gyeonggi cities
      expect(wrapper.vm.availableCities).toHaveLength(43) // Gyeonggi has 43 cities

      // Change to Gangwon
      wrapper.vm.selectedProvince = '강원특별자치도'
      await nextTick()

      expect(wrapper.vm.availableCities).toHaveLength(19) // Gangwon has 19 cities
    })
  })

  // 4. Selection Logic Tests
  describe('Selection Logic', () => {
    it('handles province selection correctly', async () => {
      const mockPickerChange = {
        label: '강원특별자치도',
        value: 'gangwon'
      }

      await wrapper.vm.handlePickerChange(0, 0, mockPickerChange)
      await nextTick()

      expect(wrapper.vm.selectedProvince).toBe('강원특별자치도')
      expect(wrapper.vm.selectedCity).toBe('가평군') // First city in Gangwon
      expect(wrapper.vm.pageData.fullAddress).toBe('강원특별자치도 가평군')
    })

    it('handles city selection correctly', async () => {
      const mockPickerChange = {
        label: '고양시 덕양구',
        value: 'goyang-deokyang'
      }

      await wrapper.vm.handlePickerChange(1, 1, mockPickerChange)
      await nextTick()

      expect(wrapper.vm.selectedProvince).toBe('경기도')
      expect(wrapper.vm.selectedCity).toBe('고양시 덕양구')
      expect(wrapper.vm.pageData.fullAddress).toBe('경기도 고양시 덕양구')
    })

    it('resets city when province changes', async () => {
      const initialCity = wrapper.vm.selectedCity
      expect(initialCity).toBe('고양시 일산동구')

      // Change province
      const mockPickerChange = {
        label: '광주광역시',
        value: 'gwangju'
      }

      await wrapper.vm.handlePickerChange(0, 4, mockPickerChange)
      await nextTick()

      expect(wrapper.vm.selectedProvince).toBe('광주광역시')
      expect(wrapper.vm.selectedCity).toBe('광산구') // First city in Gwangju
      expect(wrapper.vm.selectedCity).not.toBe(initialCity)
    })

    it('logs picker changes correctly', async () => {
      const mockPickerChange = {
        label: '경상남도',
        value: 'gyeongnam'
      }

      await wrapper.vm.handlePickerChange(0, 2, mockPickerChange)

      expect(consoleSpy).toHaveBeenCalledWith('Picker change:', {
        columnIndex: 0,
        itemIndex: 2,
        item: mockPickerChange
      })
    })
  })

  // 5. Computed Properties Tests
  describe('Computed Properties', () => {
    it('calculates isSelectionComplete correctly', () => {
      expect(wrapper.vm.isSelectionComplete).toBe(true)

      wrapper.vm.selectedProvince = ''
      expect(wrapper.vm.isSelectionComplete).toBe(false)

      wrapper.vm.selectedProvince = '경기도'
      wrapper.vm.selectedCity = ''
      expect(wrapper.vm.isSelectionComplete).toBe(false)

      wrapper.vm.selectedCity = '과천시'
      expect(wrapper.vm.isSelectionComplete).toBe(true)
    })

    it('calculates selectedProvinceData correctly', () => {
      const provinceData = wrapper.vm.selectedProvinceData
      expect(provinceData).toMatchObject({
        name: '경기도',
        value: 'gyeonggi'
      })
      expect(provinceData.cities.length).toBeGreaterThan(0)
    })

    it('updates CTA disabled state based on selection', () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      expect(bottomSheet.props('ctaDisabled')).toBe(false)

      wrapper.vm.selectedProvince = ''
      expect(wrapper.vm.isSelectionComplete).toBe(false)
      // CTA should be disabled when selection is incomplete
    })
  })

  // 6. Event Handling Tests
  describe('Event Handling', () => {
    it('handles confirm button click correctly', async () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      await bottomSheet.vm.$emit('cta-click')

      expect(consoleSpy).toHaveBeenCalledWith('Region picker confirmed:', {
        selectedProvince: '경기도',
        selectedCity: '고양시 일산동구',
        fullAddress: '경기도 고양시 일산동구'
      })
    })

    it('emits confirm event with correct data', async () => {
      await wrapper.vm.handleConfirm()

      const confirmEvents = wrapper.emitted('confirm')
      expect(confirmEvents).toHaveLength(1)
      expect(confirmEvents![0][0]).toMatchObject({
        selectedProvince: '경기도',
        selectedCity: '고양시 일산동구',
        fullAddress: '경기도 고양시 일산동구'
      })
    })

    it('handles overlay click correctly', async () => {
      const overlay = wrapper.find('.region-picker__overlay')
      await overlay.trigger('click')

      expect(consoleSpy).toHaveBeenCalledWith('Overlay clicked - closing picker')

      const cancelEvents = wrapper.emitted('cancel')
      const closeEvents = wrapper.emitted('close')
      expect(cancelEvents).toHaveLength(1)
      expect(closeEvents).toHaveLength(1)
    })

    it('handles bottom sheet overlay click correctly', async () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      await bottomSheet.vm.$emit('overlay-click')

      const cancelEvents = wrapper.emitted('cancel')
      const closeEvents = wrapper.emitted('close')
      expect(cancelEvents).toHaveLength(1)
      expect(closeEvents).toHaveLength(1)
    })

    it('handles picker change events from BottomSheet', async () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      const mockItem = { label: '부천시', value: 'bucheon' }

      await bottomSheet.vm.$emit('picker-change', 1, 10, mockItem)
      await nextTick()

      expect(wrapper.vm.selectedCity).toBe('부천시')
    })
  })

  // 7. Constants and Configuration Tests
  describe('Constants and Configuration', () => {
    it('uses correct constants from REGION_PICKER_CONSTANTS', () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      expect(bottomSheet.props('title')).toBe(REGION_PICKER_CONSTANTS.TITLE)
      expect(bottomSheet.props('ctaText')).toBe(REGION_PICKER_CONSTANTS.CTA_TEXT)
    })

    it('displays correct title text', () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      expect(bottomSheet.props('title')).toBe('희망 지역을 선택해 주세요')
    })

    it('displays correct CTA text', () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      expect(bottomSheet.props('ctaText')).toBe('확인')
    })
  })

  // 8. Figma Design Compliance Tests
  describe('Figma Design Compliance', () => {
    it('has correct Figma node IDs', () => {
      expect(wrapper.find('[data-node-id="1:2565"]').exists()).toBe(true) // Frame
      expect(wrapper.findComponent(BottomSheet).attributes('data-node-id')).toBe('1:2566') // Bottom Sheet
    })

    it('uses correct picker type for dual-column layout', () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      expect(bottomSheet.props('pickerType')).toBe('day') // Two columns
    })

    it('maintains correct layout structure', () => {
      const container = wrapper.find('.region-picker-bottom-sheet')
      expect(container.exists()).toBe(true)
      expect(wrapper.find('.region-picker__overlay').exists()).toBe(true)
    })
  })

  // 9. Data Structure Tests
  describe('Data Structure', () => {
    it('contains correct province data', () => {
      expect(PROVINCE_DATA).toHaveLength(5) // 5 provinces in the test data
      expect(PROVINCE_DATA[1].name).toBe('경기도')
      expect(PROVINCE_DATA[1].cities.length).toBeGreaterThan(40)
    })

    it('contains cities matching Figma design', () => {
      const gyeonggiProvince = PROVINCE_DATA.find(p => p.name === '경기도')
      expect(gyeonggiProvince).toBeDefined()

      const cities = gyeonggiProvince!.cities.map(c => c.name)
      expect(cities).toContain('고양시 덕양구')
      expect(cities).toContain('고양시 일산동구')
      expect(cities).toContain('고양시 일산서구')
      expect(cities).toContain('과천시')
    })

    it('maintains consistent data structure', () => {
      PROVINCE_DATA.forEach(province => {
        expect(province).toHaveProperty('name')
        expect(province).toHaveProperty('value')
        expect(province).toHaveProperty('cities')
        expect(Array.isArray(province.cities)).toBe(true)

        province.cities.forEach(city => {
          expect(city).toHaveProperty('name')
          expect(city).toHaveProperty('value')
        })
      })
    })
  })

  // 10. Accessibility Tests
  describe('Accessibility', () => {
    it('has correct data-testid attributes', () => {
      expect(wrapper.find('[data-testid="region-picker-bottom-sheet"]').exists()).toBe(true)
    })

    it('maintains proper focus management structure', () => {
      const bottomSheet = wrapper.findComponent(BottomSheet)
      expect(bottomSheet.props('type')).toBe('picker')
    })

    it('provides proper interaction elements', () => {
      const overlay = wrapper.find('.region-picker__overlay')
      expect(overlay.exists()).toBe(true)
    })
  })

  // 11. Responsive Design Tests
  describe('Responsive Design', () => {
    it('has responsive CSS classes', () => {
      const container = wrapper.find('.region-picker-bottom-sheet')
      expect(container.exists()).toBe(true)
    })

    it('maintains layout structure for different screen sizes', () => {
      expect(wrapper.find('.region-picker__overlay').exists()).toBe(true)
      expect(wrapper.findComponent(BottomSheet).exists()).toBe(true)
    })
  })

  // 12. Integration Tests
  describe('Integration Tests', () => {
    it('handles complete user flow correctly', async () => {
      // 1. Initial state
      expect(wrapper.vm.selectedProvince).toBe('경기도')
      expect(wrapper.vm.selectedCity).toBe('고양시 일산동구')

      // 2. Change province
      await wrapper.vm.handlePickerChange(0, 0, { label: '강원특별자치도', value: 'gangwon' })
      await nextTick()

      expect(wrapper.vm.selectedProvince).toBe('강원특별자치도')
      expect(wrapper.vm.selectedCity).toBe('가평군')

      // 3. Change city
      await wrapper.vm.handlePickerChange(1, 1, { label: '강릉시', value: 'gangneung' })
      await nextTick()

      expect(wrapper.vm.selectedCity).toBe('강릉시')

      // 4. Confirm selection
      await wrapper.vm.handleConfirm()

      const confirmEvents = wrapper.emitted('confirm')
      expect(confirmEvents![0][0]).toMatchObject({
        selectedProvince: '강원특별자치도',
        selectedCity: '강릉시',
        fullAddress: '강원특별자치도 강릉시'
      })
    })

    it('maintains state consistency throughout interactions', async () => {
      // Test multiple province changes
      const provinces = ['경기도', '강원특별자치도', '경상남도', '경상북도', '광주광역시']

      for (const provinceName of provinces) {
        const provinceIndex = PROVINCE_DATA.findIndex(p => p.name === provinceName)
        await wrapper.vm.handlePickerChange(0, provinceIndex, {
          label: provinceName,
          value: PROVINCE_DATA[provinceIndex].value
        })
        await nextTick()

        expect(wrapper.vm.selectedProvince).toBe(provinceName)
        expect(wrapper.vm.pageData.selectedProvince).toBe(provinceName)
        expect(wrapper.vm.pageData.fullAddress).toContain(provinceName)
      }
    })
  })

  // 13. Lifecycle Tests
  describe('Lifecycle', () => {
    it('calls onMounted lifecycle correctly', () => {
      expect(consoleSpy).toHaveBeenCalledWith('RegionPickerBottomSheet mounted with initial data:', {
        selectedProvince: '경기도',
        selectedCity: '고양시 일산동구',
        fullAddress: '경기도 고양시 일산동구'
      })
    })

    it('initializes page data correctly on mount', () => {
      expect(wrapper.vm.pageData).toMatchObject({
        selectedProvince: '경기도',
        selectedCity: '고양시 일산동구',
        fullAddress: '경기도 고양시 일산동구'
      })
    })
  })

  // 14. Edge Cases Tests
  describe('Edge Cases', () => {
    it('handles invalid province selection gracefully', async () => {
      await wrapper.vm.handlePickerChange(0, 0, {
        label: 'NonexistentProvince',
        value: 'nonexistent'
      })
      await nextTick()

      expect(wrapper.vm.selectedProvince).toBe('NonexistentProvince')
      expect(wrapper.vm.selectedCity).toBe('') // Should reset to empty
    })

    it('handles empty city list gracefully', async () => {
      // Create a mock province with no cities
      wrapper.vm.selectedProvince = 'EmptyProvince'
      await nextTick()

      expect(wrapper.vm.availableCities).toHaveLength(0)
      expect(wrapper.vm.isSelectionComplete).toBe(false)
    })

    it('handles rapid picker changes correctly', async () => {
      // Rapidly change selections
      await wrapper.vm.handlePickerChange(0, 1, { label: '경기도', value: 'gyeonggi' })
      await wrapper.vm.handlePickerChange(0, 2, { label: '경상남도', value: 'gyeongnam' })
      await wrapper.vm.handlePickerChange(0, 3, { label: '경상북도', value: 'gyeongbuk' })
      await nextTick()

      expect(wrapper.vm.selectedProvince).toBe('경상북도')
      expect(wrapper.vm.pageData.selectedProvince).toBe('경상북도')
    })
  })

  // 15. Performance Tests
  describe('Performance', () => {
    it('efficiently updates picker columns', () => {
      const initialColumns = wrapper.vm.pickerColumns
      expect(initialColumns).toHaveLength(2)

      // Change province - should not create entirely new structure
      wrapper.vm.selectedProvince = '강원특별자치도'
      const updatedColumns = wrapper.vm.pickerColumns

      expect(updatedColumns).toHaveLength(2)
      expect(updatedColumns[0].items).toHaveLength(PROVINCE_DATA.length)
    })

    it('handles large city lists efficiently', () => {
      // Gyeonggi has the most cities (43)
      wrapper.vm.selectedProvince = '경기도'
      const cities = wrapper.vm.availableCities

      expect(cities.length).toBe(43)
      expect(wrapper.vm.pickerColumns[1].items.length).toBe(43)
    })
  })
})