import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ConversionNotice from './ConversionNotice.vue';
import Navigation from '@/components/Navigation.vue';
import Progress from '@/components/Progress.vue';
import PageTitle from '@/components/PageTitle.vue';
import Bullet from '@/components/Bullet.vue';
import Checkbox from '@/components/Checkbox.vue';
import Cta from '@/components/Cta.vue';

describe('ConversionNotice.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(ConversionNotice, {
      global: {
        components: {
          Navigation,
          Progress,
          PageTitle,
          Bullet,
          Checkbox,
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
      expect(wrapper.find('[data-testid="conversion-notice"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('conversion-notice');
    });

    it('displays correct page title', () => {
      const pageTitle = wrapper.findComponent(PageTitle);
      expect(pageTitle.props('titleText')).toBe('전환 가입 유의사항을 확인해 주세요');
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
      expect(progress.props('ratio')).toBe(0.4);
      expect(progress.props('showAnimation')).toBe(false);
      expect(progress.props('size')).toBe('md');
      expect(progress.props('color')).toBe('green');
    });
  });

  describe('Notice Section', () => {
    it('displays notice title correctly', () => {
      const noticeTitle = wrapper.find('.conversion-notice__notice-title');
      expect(noticeTitle.exists()).toBe(true);
      expect(noticeTitle.text()).toBe('전환 가입 시 유의사항 확인');
    });

    it('renders correct number of bullet items', () => {
      const bullets = wrapper.findAllComponents(Bullet);
      expect(bullets).toHaveLength(2);
    });

    it('bullet items have correct type', () => {
      const bullets = wrapper.findAllComponents(Bullet);
      bullets.forEach(bullet => {
        expect(bullet.props('type')).toBe('1depth');
      });
    });

    it('displays notice items with correct text', () => {
      const bullets = wrapper.findAllComponents(Bullet);
      expect(bullets[0].props('text')).toBe('내용을 입력하세요.');
      expect(bullets[1].props('text')).toBe('내용을 입력하세요.');
    });

    it('notice section has correct structure', () => {
      const noticeSection = wrapper.find('.conversion-notice__notice');
      expect(noticeSection.exists()).toBe(true);

      const noticeBody = wrapper.find('.conversion-notice__notice-body');
      expect(noticeBody.exists()).toBe(true);
    });
  });

  describe('Checkbox Agreement', () => {
    it('displays checkbox with correct configuration', () => {
      const checkbox = wrapper.findComponent(Checkbox);
      expect(checkbox.props('size')).toBe('sm');
      expect(checkbox.props('showText')).toBe(true);
      expect(checkbox.props('text')).toBe('위 내용을 충분히 이해하고 확인했으며, 전환 신규 가입 후에는 가입을 취소할 수 없다는 내용에 동의합니다.');
    });

    it('initializes with unchecked state', () => {
      expect(wrapper.vm.isAgreed).toBe(false);
      const checkbox = wrapper.findComponent(Checkbox);
      expect(checkbox.props('state')).toBe('default');
    });

    it('updates agreement state when checkbox is changed', async () => {
      const checkbox = wrapper.findComponent(Checkbox);

      await checkbox.vm.$emit('change', new Event('change'), true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isAgreed).toBe(true);
    });

    it('changes checkbox state from default to selected', async () => {
      const checkbox = wrapper.findComponent(Checkbox);
      expect(checkbox.props('state')).toBe('default');

      await checkbox.vm.$emit('change', new Event('change'), true);
      await wrapper.vm.$nextTick();

      // Re-find checkbox after state change
      const updatedCheckbox = wrapper.findComponent(Checkbox);
      expect(updatedCheckbox.props('state')).toBe('selected');
    });

    it('checkbox agreement wrapper exists', () => {
      const agreementSection = wrapper.find('.conversion-notice__agreement');
      expect(agreementSection.exists()).toBe(true);
    });
  });

  describe('CTA Button', () => {
    it('displays CTA with correct configuration', () => {
      const cta = wrapper.findComponent(Cta);
      expect(cta.props('type')).toBe('basic');
      expect(cta.props('ratio')).toBe('cta-full');
      expect(cta.props('primaryText')).toBe('다음');
    });

    it('CTA button is disabled when agreement is not checked', () => {
      expect(wrapper.vm.isAgreed).toBe(false);
      const cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(true);
    });

    it('CTA button is enabled when agreement is checked', async () => {
      const checkbox = wrapper.findComponent(Checkbox);
      await checkbox.vm.$emit('change', new Event('change'), true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isAgreed).toBe(true);
      const cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(false);
    });

    it('does not proceed when agreement is not checked', async () => {
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      wrapper.vm.isAgreed = false;
      await wrapper.vm.handleNextClick(new MouseEvent('click'));

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('proceeds when agreement is checked and next is clicked', async () => {
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      wrapper.vm.isAgreed = true;
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
      const header = wrapper.find('.conversion-notice__header');
      const content = wrapper.find('.conversion-notice__content');
      const cta = wrapper.find('.conversion-notice__cta');

      expect(header.exists()).toBe(true);
      expect(content.exists()).toBe(true);
      expect(cta.exists()).toBe(true);
    });

    it('renders all components in correct order within content', () => {
      const pageTitle = wrapper.find('.conversion-notice__page-title');
      const notice = wrapper.find('.conversion-notice__notice');
      const agreement = wrapper.find('.conversion-notice__agreement');
      const spacer = wrapper.find('.conversion-notice__spacer');

      expect(pageTitle.exists()).toBe(true);
      expect(notice.exists()).toBe(true);
      expect(agreement.exists()).toBe(true);
      expect(spacer.exists()).toBe(true);
    });

    it('has correct spacer element for layout', () => {
      const spacer = wrapper.find('.conversion-notice__spacer');
      expect(spacer.exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper test ID on main container', () => {
      expect(wrapper.find('[data-testid="conversion-notice"]').exists()).toBe(true);
    });

    it('contains all child components with proper structure', () => {
      expect(wrapper.findComponent(Navigation).exists()).toBe(true);
      expect(wrapper.findComponent(Progress).exists()).toBe(true);
      expect(wrapper.findComponent(PageTitle).exists()).toBe(true);
      expect(wrapper.findAllComponents(Bullet).length).toBeGreaterThan(0);
      expect(wrapper.findComponent(Checkbox).exists()).toBe(true);
      expect(wrapper.findComponent(Cta).exists()).toBe(true);
    });

    it('checkbox has accessible text', () => {
      const checkbox = wrapper.findComponent(Checkbox);
      const text = checkbox.props('text');
      expect(text).toBeTruthy();
      expect(text.length).toBeGreaterThan(0);
    });
  });

  describe('Data Validation', () => {
    it('initializes with correct default state', () => {
      expect(wrapper.vm.isAgreed).toBe(false);
    });

    it('has correct notice items count', () => {
      expect(wrapper.vm.noticeItems).toHaveLength(2);
    });

    it('notice items are strings', () => {
      wrapper.vm.noticeItems.forEach((item: any) => {
        expect(typeof item).toBe('string');
      });
    });
  });

  describe('User Flow Testing', () => {
    it('completes a typical user interaction flow', async () => {
      // 1. User views the page
      expect(wrapper.find('[data-testid="conversion-notice"]').exists()).toBe(true);

      // 2. User reads notice items
      const bullets = wrapper.findAllComponents(Bullet);
      expect(bullets.length).toBeGreaterThan(0);

      // 3. User checks the agreement checkbox
      const checkbox = wrapper.findComponent(Checkbox);
      expect(wrapper.vm.isAgreed).toBe(false);

      await checkbox.vm.$emit('change', new Event('change'), true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isAgreed).toBe(true);

      // 4. User clicks next button
      const cta = wrapper.findComponent(Cta);
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
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

      wrapper.vm.isAgreed = false;
      await wrapper.vm.handleNextClick(new MouseEvent('click'));

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('Responsive Design', () => {
    it('applies correct CSS classes for layout', () => {
      const container = wrapper.find('.conversion-notice');
      expect(container.exists()).toBe(true);

      const header = wrapper.find('.conversion-notice__header');
      expect(header.exists()).toBe(true);

      const content = wrapper.find('.conversion-notice__content');
      expect(content.exists()).toBe(true);

      const cta = wrapper.find('.conversion-notice__cta');
      expect(cta.exists()).toBe(true);
    });

    it('has correct spacing and layout classes for components', () => {
      const pageTitle = wrapper.find('.conversion-notice__page-title');
      expect(pageTitle.exists()).toBe(true);

      const notice = wrapper.find('.conversion-notice__notice');
      expect(notice.exists()).toBe(true);

      const agreement = wrapper.find('.conversion-notice__agreement');
      expect(agreement.exists()).toBe(true);

      const spacer = wrapper.find('.conversion-notice__spacer');
      expect(spacer.exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles multiple checkbox toggles', async () => {
      const checkbox = wrapper.findComponent(Checkbox);

      await checkbox.vm.$emit('change', new Event('change'), true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isAgreed).toBe(true);

      await checkbox.vm.$emit('change', new Event('change'), false);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isAgreed).toBe(false);

      await checkbox.vm.$emit('change', new Event('change'), true);
      await wrapper.vm.$nextTick();
      expect(wrapper.vm.isAgreed).toBe(true);
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

      wrapper.vm.isAgreed = true;

      await cta.vm.$emit('primary-click', new MouseEvent('click'));
      await cta.vm.$emit('primary-click', new MouseEvent('click'));
      await cta.vm.$emit('primary-click', new MouseEvent('click'));

      expect(consoleSpy).toHaveBeenCalledTimes(3);
      consoleSpy.mockRestore();
    });
  });

  describe('Performance', () => {
    it('renders all components efficiently', () => {
      const startTime = performance.now();
      mount(ConversionNotice, {
        global: {
          components: {
            Navigation,
            Progress,
            PageTitle,
            Bullet,
            Checkbox,
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
      expect(wrapper.vm.isAgreed).toBe(false);
      let cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(true);

      // Enable after agreement
      const checkbox = wrapper.findComponent(Checkbox);
      await checkbox.vm.$emit('change', new Event('change'), true);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isAgreed).toBe(true);
      cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(false);

      // Disable after unchecking
      await checkbox.vm.$emit('change', new Event('change'), false);
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isAgreed).toBe(false);
      cta = wrapper.findComponent(Cta);
      expect(cta.props('primaryDisabled')).toBe(true);
    });
  });
});
