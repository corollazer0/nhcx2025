import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ConversionInfo from './ConversionInfo.vue';
import Navigation from '../components/Navigation.vue';
import Progress from '../components/Progress.vue';
import PageTitle from '../components/PageTitle.vue';
import Summary from '../components/Summary.vue';
import Accordion from '../components/Accordion.vue';
import Cta from '../components/Cta.vue';

describe('ConversionInfo.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(ConversionInfo, {
      global: {
        components: {
          Navigation,
          Progress,
          PageTitle,
          Summary,
          Accordion,
          Cta
        }
      }
    });
  });

  describe('Page Rendering', () => {
    it('should render the conversion info page', () => {
      expect(wrapper.find('[data-testid="conversion-info"]').exists()).toBe(true);
    });

    it('should render all main sections', () => {
      expect(wrapper.find('.conversion-info__header').exists()).toBe(true);
      expect(wrapper.find('.conversion-info__content').exists()).toBe(true);
      expect(wrapper.find('.conversion-info__cta').exists()).toBe(true);
    });
  });

  describe('Component Rendering', () => {
    it('should render Navigation component with correct props', () => {
      const navigation = wrapper.findComponent(Navigation);
      expect(navigation.exists()).toBe(true);
      expect(navigation.props('previous')).toBe(true);
      expect(navigation.props('title')).toBe(true);
      expect(navigation.props('title1')).toBe('청약가입');
      expect(navigation.props('cs')).toBe(false);
      expect(navigation.props('cancel')).toBe(true);
    });

    it('should render Progress component with correct props', () => {
      const progress = wrapper.findComponent(Progress);
      expect(progress.exists()).toBe(true);
      expect(progress.props('ratio')).toBe(0.1);
      expect(progress.props('showAnimation')).toBe(false);
      expect(progress.props('size')).toBe('md');
      expect(progress.props('color')).toBe('green');
    });

    it('should render PageTitle component with correct props', () => {
      const pageTitle = wrapper.findComponent(PageTitle);
      expect(pageTitle.exists()).toBe(true);
      expect(pageTitle.props('titleText')).toContain('보유한 청약통장으로');
      expect(pageTitle.props('subTitle')).toBe(false);
      expect(pageTitle.props('align')).toBe('left');
    });

    it('should render Summary component with correct props', () => {
      const summary = wrapper.findComponent(Summary);
      expect(summary.exists()).toBe(true);
      expect(summary.props('showHeader')).toBe(false);
      expect(summary.props('showList')).toBe(true);
      expect(summary.props('variant')).toBe('basic');
      expect(summary.props('items')).toHaveLength(8);
    });

    it('should render Accordion component with correct props', () => {
      const accordion = wrapper.findComponent(Accordion);
      expect(accordion.exists()).toBe(true);
      expect(accordion.props('title')).toBe('알아두세요');
      expect(accordion.props('divider')).toBe(true);
      expect(accordion.props('state')).toBe('close');
      expect(accordion.props('type')).toBe('3line');
      expect(accordion.props('items')).toHaveLength(3);
    });

    it('should render Cta component with correct props', () => {
      const cta = wrapper.findComponent(Cta);
      expect(cta.exists()).toBe(true);
      expect(cta.props('type')).toBe('basic');
      expect(cta.props('ratio')).toBe('cta-full');
      expect(cta.props('primaryText')).toBe('다음');
    });
  });

  describe('Summary Data', () => {
    it('should display all subscription information items', () => {
      const summary = wrapper.findComponent(Summary);
      const items = summary.props('items');

      expect(items[0]).toEqual({ title: '종류', data: '&상품명&' });
      expect(items[1]).toEqual({ title: '납입회차', data: '10회' });
      expect(items[2]).toEqual({ title: '납입금액', data: '1,000,000원' });
      expect(items[3]).toEqual({ title: '순위기산일\n(국민주택)', data: '2024.03.24' });
      expect(items[4]).toEqual({ title: '순위기산일\n(민영주택)', data: '2024.03.24' });
      expect(items[5]).toEqual({ title: '납입인정\n회차\n(국민주택)', data: '4회' });
      expect(items[6]).toEqual({ title: '납입인정\n금액\n(국민주택)', data: '900,000원원' });
      expect(items[7]).toEqual({ title: '전환 해지 여부', data: '완료' });
    });
  });

  describe('Accordion Data', () => {
    it('should display all notice items', () => {
      const accordion = wrapper.findComponent(Accordion);
      const items = accordion.props('items');

      expect(items).toHaveLength(3);
      expect(items[0].type).toBe('bullet');
      expect(items[0].title).toContain('전환해지 원금 전액을 납입함으로써');
      expect(items[1].type).toBe('bullet');
      expect(items[1].title).toContain('전환 가입 후, 순위 기산일은');
      expect(items[2].type).toBe('bullet');
      expect(items[2].title).toContain('전환 가입 후, 순위 기산일은');
    });
  });

  describe('Navigation Events', () => {
    it('should handle previous click event', async () => {
      const navigation = wrapper.findComponent(Navigation);
      const consoleSpy = vi.spyOn(console, 'log');

      await navigation.vm.$emit('previous', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledWith('Previous clicked:', expect.any(MouseEvent));
      consoleSpy.mockRestore();
    });

    it('should handle cancel click event', async () => {
      const navigation = wrapper.findComponent(Navigation);
      const consoleSpy = vi.spyOn(console, 'log');

      await navigation.vm.$emit('cancel', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledWith('Cancel clicked:', expect.any(MouseEvent));
      consoleSpy.mockRestore();
    });
  });

  describe('Accordion Events', () => {
    it('should handle accordion toggle event', async () => {
      const accordion = wrapper.findComponent(Accordion);

      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.noticeState).toBe('open');
    });

    it('should handle accordion open event', async () => {
      const accordion = wrapper.findComponent(Accordion);
      const consoleSpy = vi.spyOn(console, 'log');

      await accordion.vm.$emit('open');

      expect(consoleSpy).toHaveBeenCalledWith('Notice opened');
      consoleSpy.mockRestore();
    });

    it('should handle accordion close event', async () => {
      const accordion = wrapper.findComponent(Accordion);
      const consoleSpy = vi.spyOn(console, 'log');

      await accordion.vm.$emit('close');

      expect(consoleSpy).toHaveBeenCalledWith('Notice closed');
      consoleSpy.mockRestore();
    });
  });

  describe('CTA Events', () => {
    it('should handle next button click event', async () => {
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log');

      await cta.vm.$emit('primary-click', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledWith('Next button clicked:', expect.any(MouseEvent));
      consoleSpy.mockRestore();
    });
  });

  describe('Layout Structure', () => {
    it('should match Figma Frame layout structure', () => {
      // Header with Navigation and Progress
      const header = wrapper.find('.conversion-info__header');
      expect(header.exists()).toBe(true);
      expect(header.findComponent(Navigation).exists()).toBe(true);
      expect(header.findComponent(Progress).exists()).toBe(true);

      // Content with PageTitle, Summary, and Accordion
      const content = wrapper.find('.conversion-info__content');
      expect(content.exists()).toBe(true);
      expect(content.findComponent(PageTitle).exists()).toBe(true);
      expect(content.findComponent(Summary).exists()).toBe(true);
      expect(content.findComponent(Accordion).exists()).toBe(true);

      // CTA at the bottom
      const cta = wrapper.find('.conversion-info__cta');
      expect(cta.exists()).toBe(true);
      expect(cta.findComponent(Cta).exists()).toBe(true);
    });

    it('should apply correct CSS classes', () => {
      expect(wrapper.find('.conversion-info__page-title').exists()).toBe(true);
      expect(wrapper.find('.conversion-info__summary').exists()).toBe(true);
      expect(wrapper.find('.conversion-info__notice').exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have correct data-testid attribute', () => {
      expect(wrapper.attributes('data-testid')).toBe('conversion-info');
    });

    it('should render all interactive elements', () => {
      const navigation = wrapper.findComponent(Navigation);
      const accordion = wrapper.findComponent(Accordion);
      const cta = wrapper.findComponent(Cta);

      expect(navigation.exists()).toBe(true);
      expect(accordion.exists()).toBe(true);
      expect(cta.exists()).toBe(true);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive CSS classes', () => {
      expect(wrapper.classes()).toContain('conversion-info');
    });

    it('should set max-width for content sections', () => {
      const header = wrapper.find('.conversion-info__header');
      const content = wrapper.find('.conversion-info__content');
      const cta = wrapper.find('.conversion-info__cta');

      expect(header.exists()).toBe(true);
      expect(content.exists()).toBe(true);
      expect(cta.exists()).toBe(true);
    });
  });

  describe('User Flow', () => {
    it('should allow user to view subscription information', () => {
      const summary = wrapper.findComponent(Summary);
      expect(summary.props('items')).toHaveLength(8);
      expect(summary.props('showList')).toBe(true);
    });

    it('should allow user to expand notice accordion', async () => {
      const accordion = wrapper.findComponent(Accordion);

      // Initially closed
      expect(wrapper.vm.noticeState).toBe('close');

      // Toggle open
      await accordion.vm.$emit('toggle', true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.noticeState).toBe('open');
    });

    it('should allow user to proceed to next step', async () => {
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log');

      await cta.vm.$emit('primary-click', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should allow user to go back', async () => {
      const navigation = wrapper.findComponent(Navigation);
      const consoleSpy = vi.spyOn(console, 'log');

      await navigation.vm.$emit('previous', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should allow user to cancel', async () => {
      const navigation = wrapper.findComponent(Navigation);
      const consoleSpy = vi.spyOn(console, 'log');

      await navigation.vm.$emit('cancel', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Data Integrity', () => {
    it('should maintain consistent data structure', () => {
      const summary = wrapper.findComponent(Summary);
      const items = summary.props('items');

      items.forEach((item: any) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('data');
        expect(typeof item.title).toBe('string');
        expect(typeof item.data).toBe('string');
      });
    });

    it('should maintain consistent notice items structure', () => {
      const accordion = wrapper.findComponent(Accordion);
      const items = accordion.props('items');

      items.forEach((item: any) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('type');
        expect(typeof item.title).toBe('string');
        expect(item.type).toBe('bullet');
      });
    });
  });
});
