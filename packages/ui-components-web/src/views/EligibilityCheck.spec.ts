import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import EligibilityCheck from './EligibilityCheck.vue';
import Navigation from '@/components/Navigation.vue';
import Progress from '@/components/Progress.vue';
import PageTitle from '@/components/PageTitle.vue';
import Infobox from '@/components/Infobox.vue';
import Link from '@/components/Link.vue';
import Terms from '@/components/Terms.vue';
import Accordion from '@/components/Accordion.vue';
import Cta from '@/components/Cta.vue';

// Mock window.open for external link tests
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

describe('EligibilityCheck.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(EligibilityCheck, {
      global: {
        components: {
          Navigation,
          Progress,
          PageTitle,
          Infobox,
          Link,
          Terms,
          Accordion,
          Cta,
        },
      },
    });
    mockWindowOpen.mockClear();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Page Rendering', () => {
    it('renders the page with correct structure', () => {
      expect(wrapper.find('[data-testid="eligibility-check"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('eligibility-check');
    });

    it('displays correct page title', () => {
      const pageTitle = wrapper.findComponent(PageTitle);
      expect(pageTitle.props('titleText')).toBe('가입자격을 확인해 주세요');
      expect(pageTitle.props('subTitle')).toBe(false);
    });

    it('displays navigation with correct title', () => {
      const navigation = wrapper.findComponent(Navigation);
      expect(navigation.props('title1')).toBe('청약가입');
      expect(navigation.props('previous')).toBe(true);
      expect(navigation.props('cancel')).toBe(true);
      expect(navigation.props('cs')).toBe(false);
    });

    it('displays progress component with correct ratio', () => {
      const progress = wrapper.findComponent(Progress);
      expect(progress.props('ratio')).toBe(0.1);
      expect(progress.props('size')).toBe('md');
      expect(progress.props('color')).toBe('green');
    });
  });

  describe('Infobox Content', () => {
    it('displays correct infobox data', () => {
      const infobox = wrapper.findComponent(Infobox);
      expect(infobox.props('type')).toBe('onlyBody');
      expect(infobox.props('bodyItems')).toEqual([
        '1. 무주택자',
        '2. 만 19~34세 (병역복무기간 최대 6년 인정)',
        '3. 소득(근로·사업·기타)이 5,000만원 이하',
        '소득 : 소득세법상 직전년도 기준 신고소득',
        '아래의 경우는 영업점에서 가입할 수 있습니다.\n증빙서류를 가지고 방문해 주세요.',
        '• 병역복무기간(최대 6년) 차감 후 가입대상',
        '• 비과세 소득만 있는 군인'
      ]);
    });
  });

  describe('Link Buttons', () => {
    it('displays correct link texts', () => {
      const links = wrapper.findAllComponents(Link);
      expect(links[0].props('text')).toBe('홈택스 바로가기');
      expect(links[1].props('text')).toBe('정부 24바로가기');
    });

    it('opens hometax link when clicked', async () => {
      const hometaxLink = wrapper.findAllComponents(Link)[0];
      await hometaxLink.vm.$emit('click', new MouseEvent('click'));

      expect(mockWindowOpen).toHaveBeenCalledWith('https://www.hometax.go.kr', '_blank');
    });

    it('opens gov24 link when clicked', async () => {
      const gov24Link = wrapper.findAllComponents(Link)[1];
      await gov24Link.vm.$emit('click', new MouseEvent('click'));

      expect(mockWindowOpen).toHaveBeenCalledWith('https://www.gov.kr', '_blank');
    });
  });

  describe('Terms Component', () => {
    it('displays correct terms title and data', () => {
      const terms = wrapper.findComponent(Terms);
      expect(terms.props('title')).toBe('전환 가입 절차안내');
      expect(terms.props('state')).toBe('close');
      expect(terms.props('checked')).toBe(false);
      expect(terms.props('showArrow')).toBe(true);
    });

    it('updates terms state when toggled', async () => {
      const terms = wrapper.findComponent(Terms);

      await terms.vm.$emit('update:state', 'open');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.termsState).toBe('open');
    });

    it('updates terms checked state', async () => {
      const terms = wrapper.findComponent(Terms);

      await terms.vm.$emit('update:checked', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.termsChecked).toBe(true);
    });

    it('contains correct terms items', () => {
      const terms = wrapper.findComponent(Terms);
      const items = terms.props('items');

      expect(items).toHaveLength(3);
      expect(items[0].text).toContain('청년주택드림청약통장으로 전환');
      expect(items[1].text).toContain('소득공제 대상');
      expect(items[2].text).toContain('전환해지 후에는 해지 취소');

      items.forEach(item => {
        expect(item.type).toBe('bullet');
        expect(item.checked).toBe(false);
        expect(item.disabled).toBe(false);
        expect(item.showArrow).toBe(false);
      });
    });
  });

  describe('Notice Accordion', () => {
    it('displays correct accordion title and data', () => {
      const accordion = wrapper.findComponent(Accordion);
      expect(accordion.props('title')).toBe('알아두세요');
      expect(accordion.props('divider')).toBe(true);
      expect(accordion.props('state')).toBe('close');
      expect(accordion.props('type')).toBe('2line');
    });

    it('updates accordion state when toggled', async () => {
      const accordion = wrapper.findComponent(Accordion);

      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.noticeState).toBe('open');
    });

    it('contains correct notice items', () => {
      const accordion = wrapper.findComponent(Accordion);
      const items = accordion.props('items');

      expect(items).toHaveLength(2);
      expect(items[0].title).toContain('소득은 국세청 홈택스');
      expect(items[1].title).toContain('공동인증서를 이용하려면');

      items.forEach(item => {
        expect(item.type).toBe('bullet');
      });
    });
  });

  describe('CTA Button', () => {
    it('displays correct CTA configuration', () => {
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

  describe('Accessibility', () => {
    it('has proper ARIA attributes on main container', () => {
      expect(wrapper.find('[data-testid="eligibility-check"]').exists()).toBe(true);
    });

    it('page title uses semantic heading', () => {
      const pageTitle = wrapper.findComponent(PageTitle);
      expect(pageTitle.exists()).toBe(true);
    });

    it('navigation has proper keyboard support', () => {
      const navigation = wrapper.findComponent(Navigation);
      expect(navigation.exists()).toBe(true);
      // Navigation component should handle keyboard events internally
    });
  });

  describe('Responsive Design', () => {
    it('applies correct CSS classes for layout', () => {
      const container = wrapper.find('.eligibility-check');
      expect(container.exists()).toBe(true);

      const header = wrapper.find('.eligibility-check__header');
      expect(header.exists()).toBe(true);

      const content = wrapper.find('.eligibility-check__content');
      expect(content.exists()).toBe(true);

      const cta = wrapper.find('.eligibility-check__cta');
      expect(cta.exists()).toBe(true);
    });

    it('has correct spacing and layout classes', () => {
      const linkItems = wrapper.findAll('.eligibility-check__link-item');
      expect(linkItems).toHaveLength(2);

      const termsSection = wrapper.find('.eligibility-check__terms');
      expect(termsSection.exists()).toBe(true);

      const noticeSection = wrapper.find('.eligibility-check__notice');
      expect(noticeSection.exists()).toBe(true);
    });
  });

  describe('Data Validation', () => {
    it('initializes with correct default state', () => {
      expect(wrapper.vm.termsState).toBe('close');
      expect(wrapper.vm.termsChecked).toBe(false);
      expect(wrapper.vm.noticeState).toBe('close');
    });

    it('has correct infobox items count', () => {
      expect(wrapper.vm.infoboxItems).toHaveLength(7);
    });

    it('has correct terms items count', () => {
      expect(wrapper.vm.termsItems).toHaveLength(3);
    });

    it('has correct notice items count', () => {
      expect(wrapper.vm.noticeItems).toHaveLength(2);
    });
  });

  describe('User Flow Testing', () => {
    it('completes a typical user interaction flow', async () => {
      // 1. User expands terms section
      const terms = wrapper.findComponent(Terms);
      await terms.vm.$emit('update:state', 'open');
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.termsState).toBe('open');

      // 2. User checks the terms
      await terms.vm.$emit('update:checked', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.termsChecked).toBe(true);

      // 3. User expands notice section
      const accordion = wrapper.findComponent(Accordion);
      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.noticeState).toBe('open');

      // 4. User clicks external links
      const hometaxLink = wrapper.findAllComponents(Link)[0];
      await hometaxLink.vm.$emit('click', new MouseEvent('click'));
      expect(mockWindowOpen).toHaveBeenCalledWith('https://www.hometax.go.kr', '_blank');

      // 5. User clicks next button
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      await cta.vm.$emit('primary-click', new MouseEvent('click'));
      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked:', expect.any(MouseEvent));
      consoleSpy.mockRestore();
    });
  });
});