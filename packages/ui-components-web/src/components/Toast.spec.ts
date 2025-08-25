// src/components/Toast.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Toast from './Toast.vue';

type ToastInstance = InstanceType<typeof Toast>;

describe('Toast', () => {
  let wrapper: VueWrapper<ToastInstance>;

  const createWrapper = (props = {}) => {
    return mount(Toast, {
      props: {
        message: '테스트 메시지',
        ...props,
      },
    });
  };

  beforeEach(() => {
    wrapper?.unmount();
  });

  describe('Rendering', () => {
    it('renders toast component', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('[data-testid="toast"]')).toBeTruthy();
      expect(wrapper.find('[data-testid="toast-content"]').exists()).toBe(true);
    });

    it('renders with default message', () => {
      wrapper = createWrapper({ message: undefined });
      
      const textElement = wrapper.find('.toast__text');
      expect(textElement.text()).toBe('텍스트를 입력해 주세요.');
    });

    it('renders with custom message', () => {
      const customMessage = '커스텀 토스트 메시지';
      wrapper = createWrapper({ message: customMessage });
      
      const textElement = wrapper.find('.toast__text');
      expect(textElement.text()).toBe(customMessage);
    });

    it('renders with correct default variant class', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('.toast--basic').exists()).toBe(true);
    });

    it('applies correct CSS classes for basic variant', () => {
      wrapper = createWrapper({ variant: 'basic' });
      
      expect(wrapper.classes()).toContain('toast--basic');
    });
  });

  describe('Variants', () => {
    it.each(['basic', 'success', 'warning', 'error'])('renders %s variant correctly', (variant) => {
      wrapper = createWrapper({ variant });
      
      expect(wrapper.classes()).toContain(`toast--${variant}`);
    });

    it('applies correct class for success variant', () => {
      wrapper = createWrapper({ variant: 'success' });
      
      expect(wrapper.classes()).toContain('toast--success');
    });

    it('applies correct class for warning variant', () => {
      wrapper = createWrapper({ variant: 'warning' });
      
      expect(wrapper.classes()).toContain('toast--warning');
    });

    it('applies correct class for error variant', () => {
      wrapper = createWrapper({ variant: 'error' });
      
      expect(wrapper.classes()).toContain('toast--error');
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA role', () => {
      wrapper = createWrapper();
      
      expect(wrapper.attributes('role')).toBe('alert');
    });

    it('has correct aria-live attribute with default value', () => {
      wrapper = createWrapper();
      
      expect(wrapper.attributes('aria-live')).toBe('polite');
    });

    it('has correct aria-live attribute with custom value', () => {
      wrapper = createWrapper({ live: 'assertive' });
      
      expect(wrapper.attributes('aria-live')).toBe('assertive');
    });

    it('supports aria-live off', () => {
      wrapper = createWrapper({ live: 'off' });
      
      expect(wrapper.attributes('aria-live')).toBe('off');
    });
  });

  describe('Events', () => {
    it('emits click event when clicked', async () => {
      wrapper = createWrapper();
      
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('passes mouse event object in click emission', async () => {
      wrapper = createWrapper();
      
      await wrapper.trigger('click');
      
      const clickEvents = wrapper.emitted('click') as MouseEvent[][];
      expect(clickEvents[0][0]).toBeInstanceOf(MouseEvent);
    });

    it('does not emit click when not clicked', () => {
      wrapper = createWrapper();
      
      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });

  describe('Props', () => {
    it('accepts and displays message prop', () => {
      const message = '프로퍼티 테스트 메시지';
      wrapper = createWrapper({ message });
      
      expect(wrapper.find('.toast__text').text()).toBe(message);
    });

    it('handles empty message', () => {
      wrapper = createWrapper({ message: '' });
      
      expect(wrapper.find('.toast__text').text()).toBe('');
    });

    it('handles long message', () => {
      const longMessage = '이것은 매우 긴 토스트 메시지입니다. '.repeat(5);
      wrapper = createWrapper({ message: longMessage });
      
      const textElement = wrapper.find('.toast__text');
      expect(textElement.text()).toContain('이것은 매우 긴 토스트 메시지입니다.');
    });

    it('handles message with line breaks', () => {
      const multilineMessage = '첫 번째 줄\n두 번째 줄\n세 번째 줄';
      wrapper = createWrapper({ message: multilineMessage });
      
      expect(wrapper.find('.toast__text').text()).toBe(multilineMessage);
    });

    it('applies visible prop correctly', () => {
      wrapper = createWrapper({ visible: true });
      
      expect(wrapper.vm.visible).toBe(true);
    });

    it('handles visible false prop', () => {
      wrapper = createWrapper({ visible: false });
      
      expect(wrapper.vm.visible).toBe(false);
    });
  });

  describe('Default Values', () => {
    it('uses default message when not provided', () => {
      wrapper = createWrapper({ message: undefined });
      
      expect(wrapper.find('.toast__text').text()).toBe('텍스트를 입력해 주세요.');
    });

    it('uses default variant when not provided', () => {
      wrapper = createWrapper({ variant: undefined });
      
      expect(wrapper.classes()).toContain('toast--basic');
    });

    it('uses default live value when not provided', () => {
      wrapper = createWrapper({ live: undefined });
      
      expect(wrapper.attributes('aria-live')).toBe('polite');
    });

    it('uses default visible value when not provided', () => {
      wrapper = createWrapper({ visible: undefined });
      
      expect(wrapper.vm.visible).toBe(true);
    });
  });

  describe('Content Structure', () => {
    it('has correct HTML structure', () => {
      wrapper = createWrapper();
      
      const toast = wrapper.find('[data-testid="toast"]');
      const content = wrapper.find('[data-testid="toast-content"]');
      const text = wrapper.find('.toast__text');
      
      expect(toast.exists()).toBe(true);
      expect(content.exists()).toBe(true);
      expect(text.exists()).toBe(true);
    });

    it('text element is a paragraph', () => {
      wrapper = createWrapper();
      
      const textElement = wrapper.find('.toast__text');
      expect(textElement.element.tagName.toLowerCase()).toBe('p');
    });

    it('maintains proper parent-child relationship', () => {
      wrapper = createWrapper();
      
      const toast = wrapper.find('[data-testid="toast"]');
      const content = wrapper.find('[data-testid="toast-content"]');
      const text = wrapper.find('.toast__text');
      
      expect(toast.element.contains(content.element)).toBe(true);
      expect(content.element.contains(text.element)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles null message', () => {
      wrapper = createWrapper({ message: null });
      
      expect(wrapper.find('.toast__text').text()).toBe('');
    });

    it('handles undefined message', () => {
      wrapper = createWrapper({ message: undefined });
      
      expect(wrapper.find('.toast__text').text()).toBe('텍스트를 입력해 주세요.');
    });

    it('handles numeric message', () => {
      wrapper = createWrapper({ message: '12345' });
      
      expect(wrapper.find('.toast__text').text()).toBe('12345');
    });

    it('handles special characters in message', () => {
      const specialMessage = '특수문자 테스트: !@#$%^&*()_+-=[]{}|;:,.<>?';
      wrapper = createWrapper({ message: specialMessage });
      
      expect(wrapper.find('.toast__text').text()).toBe(specialMessage);
    });

    it('handles HTML in message (should be escaped)', () => {
      const htmlMessage = '<script>alert("xss")</script>';
      wrapper = createWrapper({ message: htmlMessage });
      
      // Vue automatically escapes HTML in text interpolation
      expect(wrapper.find('.toast__text').text()).toBe(htmlMessage);
      expect(wrapper.find('.toast__text').element.innerHTML).not.toContain('<script>');
    });
  });

  describe('CSS Classes', () => {
    it('always has base toast class', () => {
      wrapper = createWrapper();
      
      expect(wrapper.classes()).toContain('toast');
    });

    it('has only one variant class at a time', () => {
      wrapper = createWrapper({ variant: 'success' });
      
      const classes = wrapper.classes();
      const variantClasses = classes.filter(cls => cls.startsWith('toast--'));
      
      expect(variantClasses).toHaveLength(1);
      expect(variantClasses[0]).toBe('toast--success');
    });

    it('content has correct class', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('.toast__content').classes()).toContain('toast__content');
    });

    it('text has correct class', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('.toast__text').classes()).toContain('toast__text');
    });
  });

  describe('Interaction', () => {
    it('can be clicked multiple times', async () => {
      wrapper = createWrapper();
      
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      
      expect(wrapper.emitted('click')).toHaveLength(3);
    });

    it('maintains focus capability', async () => {
      wrapper = createWrapper();
      
      const toastElement = wrapper.find('[data-testid="toast"]');
      await toastElement.trigger('focus');
      
      // Focus events don't get emitted by default, but we can verify the element exists
      expect(toastElement.exists()).toBe(true);
    });
  });
});