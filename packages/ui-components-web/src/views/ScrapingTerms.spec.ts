import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ScrapingTerms from './ScrapingTerms.vue';
import Navigation from '@/components/Navigation.vue';
import Progress from '@/components/Progress.vue';
import PageTitle from '@/components/PageTitle.vue';
import Terms from '@/components/Terms.vue';
import Accordion from '@/components/Accordion.vue';
import Bullet from '@/components/Bullet.vue';
import Cta from '@/components/Cta.vue';

describe('ScrapingTerms.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(ScrapingTerms, {
      global: {
        components: {
          Navigation,
          Progress,
          PageTitle,
          Terms,
          Accordion,
          Bullet,
          Cta,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Page Rendering', () => {
    it('renders the page with correct structure', () => {
      expect(wrapper.find('[data-testid="scraping-terms"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('scraping-terms');
    });

    it('displays correct page title', () => {
      const pageTitle = wrapper.findComponent(PageTitle);
      expect(pageTitle.props('titleText')).toBe('스크래핑 약관에 동의해 주세요');
      expect(pageTitle.props('subTitle')).toBe(false);
      expect(pageTitle.props('align')).toBe('left');
    });

    it('displays navigation with correct configuration', () => {
      const navigation = wrapper.findComponent(Navigation);
      expect(navigation.props('title1')).toBe('청약가입');
      expect(navigation.props('previous')).toBe(true);
      expect(navigation.props('title')).toBe(true);
      expect(navigation.props('cancel')).toBe(true);
      expect(navigation.props('cs')).toBe(false);
    });

    it('displays progress component with correct ratio', () => {
      const progress = wrapper.findComponent(Progress);
      expect(progress.props('ratio')).toBe(0.1);
      expect(progress.props('showAnimation')).toBe(false);
      expect(progress.props('size')).toBe('md');
      expect(progress.props('color')).toBe('green');
    });
  });

  describe('Terms Component', () => {
    it('displays terms component with correct configuration', () => {
      const terms = wrapper.findComponent(Terms);
      expect(terms.exists()).toBe(true);
      expect(terms.props('title')).toBe('[필수] 전체 동의');
      expect(terms.props('showArrow')).toBe(true);
    });

    it('initializes with all items unchecked', () => {
      expect(wrapper.vm.allAgreed).toBe(false);
      wrapper.vm.termsItems.forEach((item: any) => {
        expect(item.checked).toBe(false);
      });
    });

    it('displays correct number of terms items', () => {
      expect(wrapper.vm.termsItems).toHaveLength(1);
    });

    it('terms item has correct text', () => {
      const firstItem = wrapper.vm.termsItems[0];
      expect(firstItem.text).toBe('비여신) 개인(신용)정보 수집·이용 동의서(청년 주택드림 청약통장 자격 확인용)');
      expect(firstItem.showArrow).toBe(true);
      expect(firstItem.type).toBe('checkbox');
    });

    it('handles all agreement change', async () => {
      const terms = wrapper.findComponent(Terms);

      await terms.vm.$emit('update:checked', true);
      await wrapper.vm.$nextTick();

      wrapper.vm.termsItems.forEach((item: any) => {
        expect(item.checked).toBe(true);
      });
    });

    it('handles individual item check', async () => {
      const terms = wrapper.findComponent(Terms);

      await terms.vm.$emit('item-check', 0, true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.termsItems[0].checked).toBe(true);
    });

    it('handles terms state change', async () => {
      const terms = wrapper.findComponent(Terms);
      expect(wrapper.vm.termsState).toBe('close');

      await terms.vm.$emit('update:state', 'open');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.termsState).toBe('open');
    });
  });

  describe('Accordion Component', () => {
    it('displays accordion with correct configuration', () => {
      const accordion = wrapper.findComponent(Accordion);
      expect(accordion.exists()).toBe(true);
      expect(accordion.props('title')).toBe('유의사항');
      expect(accordion.props('divider')).toBe(false);
      expect(accordion.props('type')).toBe('5line');
    });

    it('initializes with open state', () => {
      expect(wrapper.vm.accordionState).toBe('open');
      const accordion = wrapper.findComponent(Accordion);
      expect(accordion.props('state')).toBe('open');
    });

    it('handles accordion toggle', async () => {
      const accordion = wrapper.findComponent(Accordion);

      await accordion.vm.$emit('toggle', false);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.accordionState).toBe('close');

      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.accordionState).toBe('open');
    });
  });

  describe('Bullet List Items', () => {
    it('renders correct number of bullet items', () => {
      const bullets = wrapper.findAllComponents(Bullet);
      expect(bullets.length).toBeGreaterThan(0);
    });

    it('bullet items have correct types', () => {
      const bullets = wrapper.findAllComponents(Bullet);
      bullets.forEach((bullet, index) => {
        // First, fourth, fifth, sixth, seventh items should be 1depth
        // Second and third items should be 2depth
        const expectedType = (index === 1 || index === 2) ? '2depth' : '1depth';
        expect(bullet.props('type')).toBe(expectedType);
      });
    });

    it('displays body list section', () => {
      const bodyList = wrapper.find('.scraping-terms__body-list');
      expect(bodyList.exists()).toBe(true);
    });

    it('displays tertiary button for housing savings', () => {
      const button = wrapper.find('.scraping-terms__tertiary-btn');
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe('주택청약종합저축 바로가기');
    });

    it('handles navigate to housing button click', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const button = wrapper.find('.scraping-terms__tertiary-btn');

      await button.trigger('click');

      expect(consoleSpy).toHaveBeenCalledWith('Navigate to housing savings');
      consoleSpy.mockRestore();
    });
  });

  describe('CTA Button', () => {
    it('displays CTA with correct configuration', () => {
      const cta = wrapper.findComponent(Cta);
      expect(cta.exists()).toBe(true);
      expect(cta.props('type')).toBe('basic');
      expect(cta.props('ratio')).toBe('cta-full');
      expect(cta.props('primaryText')).toBe('다음');
    });

    it('CTA button is disabled when terms are not agreed', () => {
      expect(wrapper.vm.allAgreed).toBe(false);
      const cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(true);
    });

    it('CTA button is enabled when all terms are agreed', async () => {
      const terms = wrapper.findComponent(Terms);

      await terms.vm.$emit('update:checked', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.allAgreed).toBe(true);
      const cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(false);
    });

    it('does not proceed when terms are not agreed', async () => {
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      wrapper.vm.termsItems[0].checked = false;
      await wrapper.vm.handleNextClick(new MouseEvent('click'));

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('proceeds when terms are agreed and next is clicked', async () => {
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      wrapper.vm.termsItems[0].checked = true;
      await cta.vm.$emit('primary-click', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked:', expect.any(MouseEvent));
      consoleSpy.mockRestore();
    });
  });

  describe('Navigation Events', () => {
    it('handles previous button click', async () => {
      const navigation = wrapper.findComponent(Navigation);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await navigation.vm.$emit('previous', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledWith('Previous clicked:', expect.any(MouseEvent));
      consoleSpy.mockRestore();
    });

    it('handles cancel button click', async () => {
      const navigation = wrapper.findComponent(Navigation);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await navigation.vm.$emit('cancel', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledWith('Cancel clicked:', expect.any(MouseEvent));
      consoleSpy.mockRestore();
    });
  });

  describe('Component Structure', () => {
    it('renders all major sections in correct order', () => {
      const header = wrapper.find('.scraping-terms__header');
      const pageTitle = wrapper.find('.scraping-terms__page-title');
      const terms = wrapper.find('.scraping-terms__terms');
      const notice = wrapper.find('.scraping-terms__notice');
      const bodyList = wrapper.find('.scraping-terms__body-list');
      const cta = wrapper.find('.scraping-terms__cta');

      expect(header.exists()).toBe(true);
      expect(pageTitle.exists()).toBe(true);
      expect(terms.exists()).toBe(true);
      expect(notice.exists()).toBe(true);
      expect(bodyList.exists()).toBe(true);
      expect(cta.exists()).toBe(true);
    });

    it('has correct sub-button section', () => {
      const subButton = wrapper.find('.scraping-terms__sub-button');
      expect(subButton.exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper test ID on main container', () => {
      expect(wrapper.find('[data-testid="scraping-terms"]').exists()).toBe(true);
    });

    it('contains all child components with proper structure', () => {
      expect(wrapper.findComponent(Navigation).exists()).toBe(true);
      expect(wrapper.findComponent(Progress).exists()).toBe(true);
      expect(wrapper.findComponent(PageTitle).exists()).toBe(true);
      expect(wrapper.findComponent(Terms).exists()).toBe(true);
      expect(wrapper.findComponent(Accordion).exists()).toBe(true);
      expect(wrapper.findAllComponents(Bullet).length).toBeGreaterThan(0);
      expect(wrapper.findComponent(Cta).exists()).toBe(true);
    });

    it('terms items have accessible text', () => {
      wrapper.vm.termsItems.forEach((item: any) => {
        expect(item.text).toBeTruthy();
        expect(item.text.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Data Validation', () => {
    it('initializes with correct default states', () => {
      expect(wrapper.vm.termsState).toBe('close');
      expect(wrapper.vm.accordionState).toBe('open');
    });

    it('terms items are properly structured', () => {
      wrapper.vm.termsItems.forEach((item: any) => {
        expect(item).toHaveProperty('text');
        expect(item).toHaveProperty('checked');
        expect(item).toHaveProperty('showArrow');
        expect(item).toHaveProperty('type');
      });
    });

    it('computed allAgreed works correctly', async () => {
      expect(wrapper.vm.allAgreed).toBe(false);

      wrapper.vm.termsItems[0].checked = true;
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.allAgreed).toBe(true);

      wrapper.vm.termsItems[0].checked = false;
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.allAgreed).toBe(false);
    });
  });

  describe('User Flow Testing', () => {
    it('completes a typical user interaction flow', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // 1. User views the page
      expect(wrapper.find('[data-testid="scraping-terms"]').exists()).toBe(true);

      // 2. User reads the page title
      const pageTitle = wrapper.findComponent(PageTitle);
      expect(pageTitle.props('titleText')).toBe('스크래핑 약관에 동의해 주세요');

      // 3. User expands terms to see details
      const terms = wrapper.findComponent(Terms);
      await terms.vm.$emit('update:state', 'open');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.termsState).toBe('open');

      // 4. User checks the terms agreement
      expect(wrapper.vm.allAgreed).toBe(false);
      await terms.vm.$emit('update:checked', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.allAgreed).toBe(true);

      // 5. User views the accordion notice
      const accordion = wrapper.findComponent(Accordion);
      expect(accordion.props('state')).toBe('open');

      // 6. User clicks the housing savings button
      const housingButton = wrapper.find('.scraping-terms__tertiary-btn');
      await housingButton.trigger('click');
      expect(consoleSpy).toHaveBeenCalledWith('Navigate to housing savings');

      // 7. User clicks next button
      const cta = wrapper.findComponent(Cta);
      await cta.vm.$emit('primary-click', new MouseEvent('click'));
      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked:', expect.any(MouseEvent));

      consoleSpy.mockRestore();
    });

    it('allows navigation back and cancel', async () => {
      const navigation = wrapper.findComponent(Navigation);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      // Test previous navigation
      await navigation.vm.$emit('previous', new MouseEvent('click'));
      expect(consoleSpy).toHaveBeenCalledWith('Previous clicked:', expect.any(MouseEvent));

      // Test cancel action
      await navigation.vm.$emit('cancel', new MouseEvent('click'));
      expect(consoleSpy).toHaveBeenCalledWith('Cancel clicked:', expect.any(MouseEvent));

      consoleSpy.mockRestore();
    });

    it('prevents proceeding without agreement', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      wrapper.vm.termsItems[0].checked = false;
      await wrapper.vm.handleNextClick(new MouseEvent('click'));

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Responsive Design', () => {
    it('applies correct CSS classes for layout', () => {
      const container = wrapper.find('.scraping-terms');
      expect(container.exists()).toBe(true);

      const header = wrapper.find('.scraping-terms__header');
      expect(header.exists()).toBe(true);

      const pageTitle = wrapper.find('.scraping-terms__page-title');
      expect(pageTitle.exists()).toBe(true);

      const terms = wrapper.find('.scraping-terms__terms');
      expect(terms.exists()).toBe(true);

      const notice = wrapper.find('.scraping-terms__notice');
      expect(notice.exists()).toBe(true);

      const bodyList = wrapper.find('.scraping-terms__body-list');
      expect(bodyList.exists()).toBe(true);

      const cta = wrapper.find('.scraping-terms__cta');
      expect(cta.exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles multiple terms toggles', async () => {
      const terms = wrapper.findComponent(Terms);

      await terms.vm.$emit('update:checked', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.allAgreed).toBe(true);

      await terms.vm.$emit('update:checked', false);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.allAgreed).toBe(false);

      await terms.vm.$emit('update:checked', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.allAgreed).toBe(true);
    });

    it('handles accordion toggle multiple times', async () => {
      const accordion = wrapper.findComponent(Accordion);

      await accordion.vm.$emit('toggle', false);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.accordionState).toBe('close');

      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.accordionState).toBe('open');

      await accordion.vm.$emit('toggle', false);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.accordionState).toBe('close');
    });

    it('handles multiple navigation clicks', async () => {
      const navigation = wrapper.findComponent(Navigation);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await navigation.vm.$emit('previous', new MouseEvent('click'));
      await navigation.vm.$emit('previous', new MouseEvent('click'));
      await navigation.vm.$emit('cancel', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      consoleSpy.mockRestore();
    });

    it('handles rapid CTA clicks when agreed', async () => {
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      wrapper.vm.termsItems[0].checked = true;

      await cta.vm.$emit('primary-click', new MouseEvent('click'));
      await cta.vm.$emit('primary-click', new MouseEvent('click'));
      await cta.vm.$emit('primary-click', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      consoleSpy.mockRestore();
    });

    it('handles item arrow click', async () => {
      const terms = wrapper.findComponent(Terms);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await terms.vm.$emit('item-arrow-click', 0);

      expect(consoleSpy).toHaveBeenCalledWith('Item arrow clicked:', 0);
      consoleSpy.mockRestore();
    });
  });

  describe('Performance', () => {
    it('renders all components efficiently', () => {
      const startTime = performance.now();
      mount(ScrapingTerms, {
        global: {
          components: {
            Navigation,
            Progress,
            PageTitle,
            Terms,
            Accordion,
            Bullet,
            Cta,
          },
        },
      });
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Component should render in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });
  });

  describe('State Management', () => {
    it('agreement state correctly controls CTA button', async () => {
      // Initially disabled
      expect(wrapper.vm.allAgreed).toBe(false);
      let cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(true);

      // Enable after agreement
      const terms = wrapper.findComponent(Terms);
      await terms.vm.$emit('update:checked', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.allAgreed).toBe(true);
      cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(false);

      // Disable after unchecking
      await terms.vm.$emit('update:checked', false);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.allAgreed).toBe(false);
      cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(true);
    });

    it('terms state and accordion state are independent', async () => {
      const terms = wrapper.findComponent(Terms);
      const accordion = wrapper.findComponent(Accordion);

      // Change terms state
      await terms.vm.$emit('update:state', 'open');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.termsState).toBe('open');
      expect(wrapper.vm.accordionState).toBe('open'); // Should not change

      // Change accordion state
      await accordion.vm.$emit('toggle', false);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.accordionState).toBe('close');
      expect(wrapper.vm.termsState).toBe('open'); // Should not change
    });
  });
});
