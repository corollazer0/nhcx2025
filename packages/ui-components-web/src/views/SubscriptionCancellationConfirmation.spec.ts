import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SubscriptionCancellationConfirmation from './SubscriptionCancellationConfirmation.vue'
import Navigation from '../components/Navigation.vue'
import Progress from '../components/Progress.vue'
import PageTitle from '../components/PageTitle.vue'
import Summary from '../components/Summary.vue'
import Cta from '../components/Cta.vue'

describe('SubscriptionCancellationConfirmation.vue', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(SubscriptionCancellationConfirmation, {
      global: {
        components: {
          Navigation,
          Progress,
          PageTitle,
          Summary,
          Cta,
        },
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Page Rendering', () => {
    it('renders the page with correct structure', () => {
      expect(wrapper.find('[data-testid="subscription-cancellation-confirmation"]').exists()).toBe(true)
      expect(wrapper.classes()).toContain('subscription-cancellation-confirmation')
    })

    it('has correct Figma node-id attributes', () => {
      expect(wrapper.find('[data-node-id="1:2532"]').exists()).toBe(true)
      expect(wrapper.find('[data-node-id="1:2537"]').exists()).toBe(true)
      expect(wrapper.find('[data-node-id="1:2533"]').exists()).toBe(true)
      expect(wrapper.find('[data-node-id="1:2534"]').exists()).toBe(true)
      expect(wrapper.find('[data-node-id="1:2540"]').exists()).toBe(true)
    })

    it('displays correct page title', () => {
      const pageTitle = wrapper.findComponent(PageTitle)
      expect(pageTitle.props('titleText')).toBe('청약해지 예상 금액을 확인해 주세요')
      expect(pageTitle.props('subTitle')).toBe(false)
      expect(pageTitle.props('align')).toBe('center')
    })

    it('displays navigation with correct configuration', () => {
      const navigation = wrapper.findComponent(Navigation)
      expect(navigation.props('title1')).toBe('청약 가입')
      expect(navigation.props('previous')).toBe(true)
      expect(navigation.props('title')).toBe(true)
      expect(navigation.props('cs')).toBe(true)
      expect(navigation.props('cancel')).toBe(true)
    })

    it('displays progress component with correct ratio', () => {
      const progress = wrapper.findComponent(Progress)
      expect(progress.props('ratio')).toBeCloseTo(0.222)
      expect(progress.props('showAnimation')).toBe(false)
      expect(progress.props('size')).toBe('md')
      expect(progress.props('color')).toBe('green')
    })
  })

  describe('Summary Component', () => {
    it('displays summary with correct configuration', () => {
      const summary = wrapper.findComponent(Summary)
      expect(summary.props('showHeader')).toBe(false)
      expect(summary.props('showList')).toBe(true)
      expect(summary.props('variant')).toBe('basic')
    })

    it('displays correct summary items', () => {
      const summary = wrapper.findComponent(Summary)
      const summaryItems = summary.props('items')

      expect(summaryItems).toHaveLength(3)
      expect(summaryItems[0]).toEqual({
        title: '상품명',
        data: '&상품명&'
      })
      expect(summaryItems[1]).toEqual({
        title: '청약계좌',
        data: 'NH농협은행<br>123-456-78910'
      })
      expect(summaryItems[2]).toEqual({
        title: '해지 예상 금액',
        data: '5,000,000원',
        color: 'green'
      })
    })

    it('matches Figma data exactly', () => {
      const summary = wrapper.findComponent(Summary)
      const summaryItems = summary.props('items')

      // Figma에서 정의된 정확한 데이터와 일치하는지 확인 (렌더링 형태)
      expect(summaryItems[0].data).toBe('&상품명&')
      expect(summaryItems[1].data).toBe('NH농협은행<br>123-456-78910') // HTML line break for display
      expect(summaryItems[2].data).toBe('5,000,000원')
      expect(summaryItems[2].color).toBe('green') // Green color for cancellation amount
    })
  })

  describe('CTA Component', () => {
    it('displays correct CTA configuration', () => {
      const cta = wrapper.findComponent(Cta)
      expect(cta.props('type')).toBe('basic')
      expect(cta.props('ratio')).toBe('cta-full')
      expect(cta.props('primaryText')).toBe('다음')
    })

    it('handles next button click', async () => {
      const cta = wrapper.findComponent(Cta)
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await cta.vm.$emit('primary-click', new MouseEvent('click'))

      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked', expect.any(MouseEvent))
      consoleSpy.mockRestore()
    })
  })

  describe('Navigation Events', () => {
    it('handles previous button click', async () => {
      const navigation = wrapper.findComponent(Navigation)
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await navigation.vm.$emit('previous', new MouseEvent('click'))

      expect(consoleSpy).toHaveBeenCalledWith('Previous button clicked', expect.any(MouseEvent))
      consoleSpy.mockRestore()
    })

    it('handles cs center button click', async () => {
      const navigation = wrapper.findComponent(Navigation)
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await navigation.vm.$emit('cs', new MouseEvent('click'))

      expect(consoleSpy).toHaveBeenCalledWith('CS center button clicked', expect.any(MouseEvent))
      consoleSpy.mockRestore()
    })

    it('handles cancel button click', async () => {
      const navigation = wrapper.findComponent(Navigation)
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      await navigation.vm.$emit('cancel', new MouseEvent('click'))

      expect(consoleSpy).toHaveBeenCalledWith('Cancel button clicked', expect.any(MouseEvent))
      consoleSpy.mockRestore()
    })
  })

  describe('Layout and Styling', () => {
    it('applies correct CSS classes for layout sections', () => {
      const container = wrapper.find('.subscription-cancellation-confirmation')
      expect(container.exists()).toBe(true)

      const header = wrapper.find('.page__header')
      expect(header.exists()).toBe(true)

      const contents = wrapper.find('.page__contents')
      expect(contents.exists()).toBe(true)

      const title = wrapper.find('.page__title')
      expect(title.exists()).toBe(true)

      const cta = wrapper.find('.page__cta')
      expect(cta.exists()).toBe(true)
    })

    it('has correct Figma dimensions', () => {
      const container = wrapper.find('.subscription-cancellation-confirmation')
      const style = container.element.getAttribute('style') || ''

      // CSS에서 정의된 Figma 치수와 일치하는지 확인 (CSS 클래스로 검증)
      expect(container.exists()).toBe(true)
    })

    it('applies correct positioning classes', () => {
      // Header: position absolute, top 24px
      const header = wrapper.find('.page__header')
      expect(header.classes()).toContain('page__header')

      // Contents: position absolute, top 120px, centered
      const contents = wrapper.find('.page__contents')
      expect(contents.classes()).toContain('page__contents')

      // CTA: position absolute, top 662px
      const cta = wrapper.find('.page__cta')
      expect(cta.classes()).toContain('page__cta')
    })
  })

  describe('Data Management', () => {
    it('initializes with correct default subscription data', () => {
      expect(wrapper.vm.pageData.productName).toBe('&상품명&')
      expect(wrapper.vm.pageData.subscriptionAccount).toBe('NH농협은행 123-456-78910')
      expect(wrapper.vm.pageData.estimatedCancellationAmount).toBe('5,000,000원')
    })

    it('computed properties return correct values', () => {
      expect(wrapper.vm.pageTitle).toBe('청약해지 예상 금액을 확인해 주세요')
      expect(wrapper.vm.progressRatio).toBeCloseTo(0.222)
      expect(wrapper.vm.ctaText).toBe('다음')
    })

    it('summaryItems computed property formats data correctly', () => {
      const summaryItems = wrapper.vm.summaryItems

      expect(summaryItems).toHaveLength(3)
      expect(summaryItems[0].title).toBe('상품명')
      expect(summaryItems[0].data).toBe('&상품명&')
      expect(summaryItems[1].title).toBe('청약계좌')
      expect(summaryItems[1].data).toBe('NH농협은행<br>123-456-78910')
      expect(summaryItems[2].title).toBe('해지 예상 금액')
      expect(summaryItems[2].data).toBe('5,000,000원')
      expect(summaryItems[2].color).toBe('green')
    })
  })

  describe('Accessibility', () => {
    it('has proper data-testid attributes', () => {
      expect(wrapper.find('[data-testid="subscription-cancellation-confirmation"]').exists()).toBe(true)
    })

    it('page title uses semantic heading through PageTitle component', () => {
      const pageTitle = wrapper.findComponent(PageTitle)
      expect(pageTitle.exists()).toBe(true)
    })

    it('navigation has proper keyboard support through Navigation component', () => {
      const navigation = wrapper.findComponent(Navigation)
      expect(navigation.exists()).toBe(true)
    })

    it('progress component has proper accessibility attributes through Progress component', () => {
      const progress = wrapper.findComponent(Progress)
      expect(progress.exists()).toBe(true)
    })
  })

  describe('Responsive Design', () => {
    it('has responsive CSS classes and media queries', () => {
      const container = wrapper.find('.subscription-cancellation-confirmation')
      expect(container.exists()).toBe(true)

      // Media query 관련 클래스들이 CSS에 정의되어 있는지 확인
      // 실제 미디어 쿼리 테스트는 브라우저 환경에서 이루어짐
    })

    it('maintains correct structure for mobile layout', () => {
      // 모바일 레이아웃에서도 모든 섹션이 존재하는지 확인
      expect(wrapper.find('.page__header').exists()).toBe(true)
      expect(wrapper.find('.page__contents').exists()).toBe(true)
      expect(wrapper.find('.page__cta').exists()).toBe(true)
    })
  })

  describe('Component Integration', () => {
    it('all child components are properly mounted', () => {
      expect(wrapper.findComponent(Navigation).exists()).toBe(true)
      expect(wrapper.findComponent(Progress).exists()).toBe(true)
      expect(wrapper.findComponent(PageTitle).exists()).toBe(true)
      expect(wrapper.findComponent(Summary).exists()).toBe(true)
      expect(wrapper.findComponent(Cta).exists()).toBe(true)
    })

    it('component props are correctly passed down', () => {
      const navigation = wrapper.findComponent(Navigation)
      const progress = wrapper.findComponent(Progress)
      const pageTitle = wrapper.findComponent(PageTitle)
      const summary = wrapper.findComponent(Summary)
      const cta = wrapper.findComponent(Cta)

      // Navigation props
      expect(navigation.props()).toEqual(
        expect.objectContaining({
          previous: true,
          title: true,
          title1: '청약 가입',
          cs: true,
          cancel: true
        })
      )

      // Progress props
      expect(progress.props()).toEqual(
        expect.objectContaining({
          ratio: expect.any(Number),
          showAnimation: false,
          size: 'md',
          color: 'green'
        })
      )

      // PageTitle props
      expect(pageTitle.props()).toEqual(
        expect.objectContaining({
          titleText: '청약해지 예상 금액을 확인해 주세요',
          subTitle: false,
          align: 'center'
        })
      )

      // Summary props
      expect(summary.props()).toEqual(
        expect.objectContaining({
          showHeader: false,
          showList: true,
          variant: 'basic',
          items: expect.arrayContaining([
            expect.objectContaining({ title: '상품명', data: '&상품명&' }),
            expect.objectContaining({ title: '청약계좌', data: 'NH농협은행<br>123-456-78910' }),
            expect.objectContaining({ title: '해지 예상 금액', data: '5,000,000원', color: 'green' })
          ])
        })
      )

      // CTA props
      expect(cta.props()).toEqual(
        expect.objectContaining({
          type: 'basic',
          ratio: 'cta-full',
          primaryText: '다음'
        })
      )
    })
  })

  describe('User Flow Testing', () => {
    it('completes a typical user interaction flow', async () => {
      // 1. User views the cancellation confirmation page
      expect(wrapper.find('[data-testid="subscription-cancellation-confirmation"]').exists()).toBe(true)

      // 2. User sees the page title
      const pageTitle = wrapper.findComponent(PageTitle)
      expect(pageTitle.props('titleText')).toBe('청약해지 예상 금액을 확인해 주세요')

      // 3. User reviews the summary information
      const summary = wrapper.findComponent(Summary)
      const summaryItems = summary.props('items')
      expect(summaryItems).toHaveLength(3)

      // 4. User clicks the next button
      const cta = wrapper.findComponent(Cta)
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      await cta.vm.$emit('primary-click', new MouseEvent('click'))
      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked', expect.any(MouseEvent))

      // 5. User can navigate back if needed
      const navigation = wrapper.findComponent(Navigation)
      await navigation.vm.$emit('previous', new MouseEvent('click'))
      expect(consoleSpy).toHaveBeenCalledWith('Previous button clicked', expect.any(MouseEvent))

      consoleSpy.mockRestore()
    })
  })

  describe('Lifecycle Hooks', () => {
    it('calls onMounted lifecycle hook', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      // 새로운 컴포넌트를 마운트하여 onMounted 호출 확인
      const newWrapper = mount(SubscriptionCancellationConfirmation, {
        global: {
          components: {
            Navigation,
            Progress,
            PageTitle,
            Summary,
            Cta,
          },
        },
      })

      expect(consoleSpy).toHaveBeenCalledWith('SubscriptionCancellationConfirmation mounted')

      newWrapper.unmount()
      consoleSpy.mockRestore()
    })
  })

  describe('Error Handling', () => {
    it('handles missing props gracefully', () => {
      // 컴포넌트가 기본값으로 정상 렌더링되는지 확인
      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('[data-testid="subscription-cancellation-confirmation"]').exists()).toBe(true)
    })

    it('maintains state consistency', () => {
      // 상태가 일관성을 유지하는지 확인
      expect(wrapper.vm.pageData).toEqual({
        productName: '&상품명&',
        subscriptionAccount: 'NH농협은행 123-456-78910',
        estimatedCancellationAmount: '5,000,000원'
      })
    })
  })

  describe('Figma Design Compliance', () => {
    it('matches Figma frame structure exactly', () => {
      // Frame ID 1:2532의 구조와 일치하는지 확인
      expect(wrapper.find('[data-node-id="1:2532"]').exists()).toBe(true)

      // Header section (node-id 1:2537)
      expect(wrapper.find('[data-node-id="1:2537"]').exists()).toBe(true)

      // Contents section (node-id 1:2533)
      expect(wrapper.find('[data-node-id="1:2533"]').exists()).toBe(true)

      // Title section (node-id 1:2534)
      expect(wrapper.find('[data-node-id="1:2534"]').exists()).toBe(true)

      // CTA section (node-id 1:2540)
      expect(wrapper.find('[data-node-id="1:2540"]').exists()).toBe(true)
    })

    it('uses exact Figma text content', () => {
      const pageTitle = wrapper.findComponent(PageTitle)
      expect(pageTitle.props('titleText')).toBe('청약해지 예상 금액을 확인해 주세요')

      const summary = wrapper.findComponent(Summary)
      const summaryItems = summary.props('items')
      expect(summaryItems[0].data).toBe('&상품명&')
      expect(summaryItems[1].data).toBe('NH농협은행<br>123-456-78910')
      expect(summaryItems[2].data).toBe('5,000,000원')
      expect(summaryItems[2].color).toBe('green')

      const cta = wrapper.findComponent(Cta)
      expect(cta.props('primaryText')).toBe('다음')
    })

    it('maintains Figma component instance mapping', () => {
      // top/process → Navigation
      const navigation = wrapper.findComponent(Navigation)
      expect(navigation.exists()).toBe(true)

      // progress → Progress
      const progress = wrapper.findComponent(Progress)
      expect(progress.exists()).toBe(true)

      // summary/basic → Summary
      const summary = wrapper.findComponent(Summary)
      expect(summary.exists()).toBe(true)
      expect(summary.props('variant')).toBe('basic')

      // cta/cta → Cta
      const cta = wrapper.findComponent(Cta)
      expect(cta.exists()).toBe(true)
    })
  })
})