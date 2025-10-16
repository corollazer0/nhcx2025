import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import SubscriptionEligibility from './SubscriptionEligibility.vue';
import Navigation from '@/components/Navigation.vue';
import Progress from '@/components/Progress.vue';
import PageTitle from '@/components/PageTitle.vue';
import Infobox from '@/components/Infobox.vue';
import Link from '@/components/Link.vue';
import Accordion from '@/components/Accordion.vue';
import Cta from '@/components/Cta.vue';

describe('SubscriptionEligibility.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(SubscriptionEligibility, {
      global: {
        components: {
          Navigation,
          Progress,
          PageTitle,
          Infobox,
          Link,
          Accordion,
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
      expect(wrapper.find('[data-testid="subscription-eligibility"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('subscription-eligibility');
    });

    it('displays correct page title', () => {
      const pageTitle = wrapper.findComponent(PageTitle);
      expect(pageTitle.props('titleText')).toBe('가입자격을 확인해 주세요');
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

  describe('Infobox Content', () => {
    it('displays infobox with correct type', () => {
      const infobox = wrapper.findComponent(Infobox);
      expect(infobox.props('type')).toBe('onlyBody');
      expect(infobox.props('titleText')).toBe('');
    });

    it('displays correct eligibility requirements', () => {
      const infobox = wrapper.findComponent(Infobox);
      const bodyItems = infobox.props('bodyItems');

      expect(bodyItems).toEqual([
        '1. 무주택자',
        '2. 만 19~34세 (병역복무기간 최대 6년 인정)',
        '3. 소득(근로·사업·기타)이  5,000만원 이하   ',
        '소득 : 소득세법상 직전년도 기준 신고소득',
        '아래의 경우는 영업점에서 가입할 수 있습니다.\n증빙서류를 가지고 방문해 주세요.',
        '• 병역복무기간(최대 6년) 차감 후 가입대상',
        '• 비과세 소득만 있는 군인'
      ]);
    });

    it('has correct number of infobox items', () => {
      const infobox = wrapper.findComponent(Infobox);
      expect(infobox.props('bodyItems')).toHaveLength(7);
    });
  });

  describe('Link Component', () => {
    it('displays terms link with correct text', () => {
      const link = wrapper.findComponent(Link);
      expect(link.props('text')).toBe('기본약관');
      expect(link.props('disabled')).toBe(false);
    });

    it('handles terms link click event', async () => {
      const link = wrapper.findComponent(Link);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await link.vm.$emit('click', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledWith('Terms link clicked:', expect.any(MouseEvent));
      consoleSpy.mockRestore();
    });

    it('displays link in correct wrapper structure', () => {
      const linkWrapper = wrapper.find('.subscription-eligibility__link-wrapper');
      expect(linkWrapper.exists()).toBe(true);
    });
  });

  describe('Notice Accordion', () => {
    it('displays accordion with correct configuration', () => {
      const accordion = wrapper.findComponent(Accordion);
      expect(accordion.props('title')).toBe('알아두세요');
      expect(accordion.props('divider')).toBe(true);
      expect(accordion.props('state')).toBe('close');
      expect(accordion.props('type')).toBe('2line');
    });

    it('contains correct notice items', () => {
      const accordion = wrapper.findComponent(Accordion);
      const items = accordion.props('items');

      expect(items).toHaveLength(2);
      expect(items[0].title).toBe('소득은 국세청 홈택스, 세대주 여부는 정부24에서 스크래핑으로 자동 확인합니다.');
      expect(items[1].title).toBe('공동인증서를 이용하려면 국세청 홈택스와 정부24에 회원가입 후 공동인증서를 등록해 주세요.');

      items.forEach(item => {
        expect(item.type).toBe('bullet');
      });
    });

    it('updates accordion state when toggled', async () => {
      const accordion = wrapper.findComponent(Accordion);

      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.noticeState).toBe('open');
    });

    it('handles accordion open event', async () => {
      const accordion = wrapper.findComponent(Accordion);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await accordion.vm.$emit('open');

      expect(consoleSpy).toHaveBeenCalledWith('Notice opened');
      consoleSpy.mockRestore();
    });

    it('handles accordion close event', async () => {
      const accordion = wrapper.findComponent(Accordion);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      await accordion.vm.$emit('close');

      expect(consoleSpy).toHaveBeenCalledWith('Notice closed');
      consoleSpy.mockRestore();
    });
  });

  describe('CTA Button', () => {
    it('displays CTA with correct configuration', () => {
      const cta = wrapper.findComponent(Cta);
      expect(cta.props('type')).toBe('basic');
      expect(cta.props('ratio')).toBe('cta-full');
      expect(cta.props('primaryText')).toBe('다음');
    });

    it('handles next button click', async () => {
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

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
      const header = wrapper.find('.subscription-eligibility__header');
      const content = wrapper.find('.subscription-eligibility__content');
      const cta = wrapper.find('.subscription-eligibility__cta');

      expect(header.exists()).toBe(true);
      expect(content.exists()).toBe(true);
      expect(cta.exists()).toBe(true);
    });

    it('renders all components in correct order within content', () => {
      const pageTitle = wrapper.find('.subscription-eligibility__page-title');
      const infobox = wrapper.find('.subscription-eligibility__infobox');
      const linkWrapper = wrapper.find('.subscription-eligibility__link-wrapper');
      const notice = wrapper.find('.subscription-eligibility__notice');

      expect(pageTitle.exists()).toBe(true);
      expect(infobox.exists()).toBe(true);
      expect(linkWrapper.exists()).toBe(true);
      expect(notice.exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper test ID on main container', () => {
      expect(wrapper.find('[data-testid="subscription-eligibility"]').exists()).toBe(true);
    });

    it('contains all child components with proper structure', () => {
      expect(wrapper.findComponent(Navigation).exists()).toBe(true);
      expect(wrapper.findComponent(Progress).exists()).toBe(true);
      expect(wrapper.findComponent(PageTitle).exists()).toBe(true);
      expect(wrapper.findComponent(Infobox).exists()).toBe(true);
      expect(wrapper.findComponent(Link).exists()).toBe(true);
      expect(wrapper.findComponent(Accordion).exists()).toBe(true);
      expect(wrapper.findComponent(Cta).exists()).toBe(true);
    });
  });

  describe('Data Validation', () => {
    it('initializes with correct default state', () => {
      expect(wrapper.vm.noticeState).toBe('close');
    });

    it('has correct infobox items count', () => {
      expect(wrapper.vm.infoboxItems).toHaveLength(7);
    });

    it('has correct notice items count', () => {
      expect(wrapper.vm.noticeItems).toHaveLength(2);
    });

    it('infobox items contain required eligibility info', () => {
      const items = wrapper.vm.infoboxItems;
      expect(items[0]).toContain('무주택자');
      expect(items[1]).toContain('만 19~34세');
      expect(items[2]).toContain('5,000만원 이하');
    });
  });

  describe('User Flow Testing', () => {
    it('completes a typical user interaction flow', async () => {
      // 1. User views the eligibility requirements
      const infobox = wrapper.findComponent(Infobox);
      expect(infobox.exists()).toBe(true);

      // 2. User clicks on terms link
      const link = wrapper.findComponent(Link);
      const linkSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await link.vm.$emit('click', new MouseEvent('click'));
      expect(linkSpy).toHaveBeenCalledWith('Terms link clicked:', expect.any(MouseEvent));
      linkSpy.mockRestore();

      // 3. User expands notice section
      const accordion = wrapper.findComponent(Accordion);
      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.noticeState).toBe('open');

      // 4. User collapses notice section
      await accordion.vm.$emit('toggle', false);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.noticeState).toBe('close');

      // 5. User clicks next button
      const cta = wrapper.findComponent(Cta);
      const ctaSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await cta.vm.$emit('primary-click', new MouseEvent('click'));
      expect(ctaSpy).toHaveBeenCalledWith('Next button clicked:', expect.any(MouseEvent));
      ctaSpy.mockRestore();
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
  });

  describe('Responsive Design', () => {
    it('applies correct CSS classes for layout', () => {
      const container = wrapper.find('.subscription-eligibility');
      expect(container.exists()).toBe(true);

      const header = wrapper.find('.subscription-eligibility__header');
      expect(header.exists()).toBe(true);

      const content = wrapper.find('.subscription-eligibility__content');
      expect(content.exists()).toBe(true);

      const cta = wrapper.find('.subscription-eligibility__cta');
      expect(cta.exists()).toBe(true);
    });

    it('has correct spacing and layout classes for components', () => {
      const pageTitle = wrapper.find('.subscription-eligibility__page-title');
      expect(pageTitle.exists()).toBe(true);

      const infobox = wrapper.find('.subscription-eligibility__infobox');
      expect(infobox.exists()).toBe(true);

      const linkWrapper = wrapper.find('.subscription-eligibility__link-wrapper');
      expect(linkWrapper.exists()).toBe(true);

      const notice = wrapper.find('.subscription-eligibility__notice');
      expect(notice.exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles rapid accordion toggling', async () => {
      const accordion = wrapper.findComponent(Accordion);

      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.noticeState).toBe('open');

      await accordion.vm.$emit('toggle', false);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.noticeState).toBe('close');

      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.noticeState).toBe('open');
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
  });

  describe('Performance', () => {
    it('renders all components efficiently', () => {
      const startTime = performance.now();
      mount(SubscriptionEligibility, {
        global: {
          components: {
            Navigation,
            Progress,
            PageTitle,
            Infobox,
            Link,
            Accordion,
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
});
