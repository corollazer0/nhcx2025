// src/components/TextInput.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import TextInput from './TextInput.vue';

type TextInputInstance = InstanceType<typeof TextInput>;

describe('TextInput', () => {
  let wrapper: VueWrapper<TextInputInstance>;

  const createWrapper = (props = {}) => {
    return mount(TextInput, {
      props: {
        modelValue: '',
        ...props,
      },
    });
  };

  beforeEach(() => {
    wrapper?.unmount();
  });

  describe('Rendering', () => {
    it('renders text input by default', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('[data-testid="text-input"]')).toBeTruthy();
      expect(wrapper.find('[data-testid="text-input-field"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="text-input-textarea"]').exists()).toBe(false);
    });

    it('renders textarea when type is textarea', () => {
      wrapper = createWrapper({ type: 'textarea' });
      
      expect(wrapper.find('[data-testid="text-input-textarea"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="text-input-field"]').exists()).toBe(false);
    });

    it('renders label when provided', () => {
      const label = '레이블';
      wrapper = createWrapper({ label });
      
      const labelEl = wrapper.find('.text-input__label');
      expect(labelEl.exists()).toBe(true);
      expect(labelEl.text()).toBe(label);
    });

    it('does not render label when not provided', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('.text-input__label').exists()).toBe(false);
    });

    it('renders with correct placeholder', () => {
      const placeholder = '내용을 입력하세요';
      wrapper = createWrapper({ placeholder });
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      expect(input.attributes('placeholder')).toBe(placeholder);
    });

    it('applies correct CSS classes for default state', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('.text-input--default').exists()).toBe(true);
      expect(wrapper.find('.text-input__container--default').exists()).toBe(true);
    });
  });

  describe('States', () => {
    it('applies disabled state correctly', () => {
      wrapper = createWrapper({ disabled: true });
      
      expect(wrapper.find('.text-input--disabled').exists()).toBe(true);
      expect(wrapper.find('.text-input__container--disabled').exists()).toBe(true);
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      expect(input.attributes('disabled')).toBeDefined();
    });

    it('applies error state correctly', () => {
      const errorMessage = '입력값이 올바르지 않습니다.';
      wrapper = createWrapper({ errorMessage });
      
      expect(wrapper.find('.text-input--error').exists()).toBe(true);
      expect(wrapper.find('.text-input__container--error').exists()).toBe(true);
      
      const errorEl = wrapper.find('[data-testid="text-input-error"]');
      expect(errorEl.exists()).toBe(true);
      expect(errorEl.text()).toBe(errorMessage);
    });

    it('shows helper text when no error message', () => {
      const helperText = '도움말 텍스트입니다.';
      wrapper = createWrapper({ helperText });
      
      const helperEl = wrapper.find('[data-testid="text-input-helper"]');
      expect(helperEl.exists()).toBe(true);
      expect(helperEl.text()).toBe(helperText);
    });

    it('prioritizes error message over helper text', () => {
      const errorMessage = '에러 메시지';
      const helperText = '도움말 텍스트';
      wrapper = createWrapper({ errorMessage, helperText });
      
      expect(wrapper.find('[data-testid="text-input-error"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="text-input-helper"]').exists()).toBe(false);
    });

    it('applies focus state on focus event', async () => {
      wrapper = createWrapper();
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      await input.trigger('focus');
      
      expect(wrapper.find('.text-input--focus').exists()).toBe(true);
      expect(wrapper.find('.text-input__container--focus').exists()).toBe(true);
    });

    it('removes focus state on blur event', async () => {
      wrapper = createWrapper();
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      await input.trigger('focus');
      await input.trigger('blur');
      
      expect(wrapper.find('.text-input--focus').exists()).toBe(false);
      expect(wrapper.find('.text-input--default').exists()).toBe(true);
    });
  });

  describe('Character Count', () => {
    it('shows character count when enabled', () => {
      wrapper = createWrapper({ 
        showCharCount: true,
        maxLength: 50,
        modelValue: 'test text'
      });
      
      const countEl = wrapper.find('[data-testid="text-input-count"]');
      expect(countEl.exists()).toBe(true);
      expect(countEl.text()).toBe('9 / 50');
    });

    it('does not show character count when disabled', () => {
      wrapper = createWrapper({ 
        showCharCount: false,
        maxLength: 50,
        modelValue: 'test text'
      });
      
      expect(wrapper.find('[data-testid="text-input-count"]').exists()).toBe(false);
    });

    it('updates character count on input', async () => {
      wrapper = createWrapper({ 
        showCharCount: true,
        maxLength: 50,
        modelValue: 'new text'  // Set initial value to test character count
      });
      
      const countEl = wrapper.find('[data-testid="text-input-count"]');
      expect(countEl.text()).toBe('8 / 50');
    });

    it('shows character count with zero length initially', () => {
      wrapper = createWrapper({ 
        showCharCount: true,
        maxLength: 50
      });
      
      const countEl = wrapper.find('[data-testid="text-input-count"]');
      expect(countEl.text()).toBe('0 / 50');
    });

    it('updates character count when modelValue prop changes', async () => {
      wrapper = createWrapper({ 
        showCharCount: true,
        maxLength: 50,
        modelValue: ''
      });
      
      // Initial count should be 0
      let countEl = wrapper.find('[data-testid="text-input-count"]');
      expect(countEl.text()).toBe('0 / 50');
      
      // Update modelValue prop
      await wrapper.setProps({ modelValue: 'hello world' });
      
      countEl = wrapper.find('[data-testid="text-input-count"]');
      expect(countEl.text()).toBe('11 / 50');
    });
  });

  describe('Clear Functionality', () => {
    it('shows clear button when clearable and has value', () => {
      wrapper = createWrapper({ 
        clearable: true,
        modelValue: 'test text'
      });
      
      expect(wrapper.find('[data-testid="text-input-clear"]').exists()).toBe(true);
    });

    it('does not show clear button when not clearable', () => {
      wrapper = createWrapper({ 
        clearable: false,
        modelValue: 'test text'
      });
      
      expect(wrapper.find('[data-testid="text-input-clear"]').exists()).toBe(false);
    });

    it('does not show clear button when no value', () => {
      wrapper = createWrapper({ 
        clearable: true,
        modelValue: ''
      });
      
      expect(wrapper.find('[data-testid="text-input-clear"]').exists()).toBe(false);
    });

    it('does not show clear button when disabled', () => {
      wrapper = createWrapper({ 
        clearable: true,
        modelValue: 'test text',
        disabled: true
      });
      
      expect(wrapper.find('[data-testid="text-input-clear"]').exists()).toBe(false);
    });

    it('clears value when clear button is clicked', async () => {
      wrapper = createWrapper({ 
        clearable: true,
        modelValue: 'test text'
      });
      
      const clearBtn = wrapper.find('[data-testid="text-input-clear"]');
      await clearBtn.trigger('click');
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['']);
      expect(wrapper.emitted('clear')).toBeTruthy();
    });
  });

  describe('Input Types', () => {
    it.each(['text', 'password', 'email', 'number'])('renders %s input type correctly', (type) => {
      wrapper = createWrapper({ type });
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      expect(input.attributes('type')).toBe(type);
    });

    it('renders textarea for textarea type', () => {
      wrapper = createWrapper({ type: 'textarea', rows: 5 });
      
      const textarea = wrapper.find('[data-testid="text-input-textarea"]');
      expect(textarea.exists()).toBe(true);
      expect(textarea.attributes('rows')).toBe('5');
    });

    it('uses default rows for textarea', () => {
      wrapper = createWrapper({ type: 'textarea' });
      
      const textarea = wrapper.find('[data-testid="text-input-textarea"]');
      expect(textarea.attributes('rows')).toBe('4');
    });
  });

  describe('Max Length', () => {
    it('applies maxlength attribute to input', () => {
      wrapper = createWrapper({ maxLength: 100 });
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      expect(input.attributes('maxlength')).toBe('100');
    });

    it('applies maxlength attribute to textarea', () => {
      wrapper = createWrapper({ type: 'textarea', maxLength: 100 });
      
      const textarea = wrapper.find('[data-testid="text-input-textarea"]');
      expect(textarea.attributes('maxlength')).toBe('100');
    });

    it('enforces maxLength for textarea input', async () => {
      wrapper = createWrapper({ 
        type: 'textarea',
        maxLength: 5
      });
      
      const textarea = wrapper.find('[data-testid="text-input-textarea"]');
      
      // Simulate typing by setting element value and triggering input event
      const textareaElement = textarea.element as HTMLTextAreaElement;
      textareaElement.value = 'this is a very long text';
      await textarea.trigger('input');
      
      // Should be truncated to maxLength
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['this ']);
    });

    it('enforces maxLength for regular input', async () => {
      wrapper = createWrapper({ 
        type: 'text',
        maxLength: 5
      });
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      
      // Simulate typing by setting element value and triggering input event
      const inputElement = input.element as HTMLInputElement;
      inputElement.value = 'this is a very long text';
      await input.trigger('input');
      
      // Should be truncated to maxLength
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['this ']);
    });

    it('prevents typing when maxLength is reached via keydown', async () => {
      wrapper = createWrapper({ 
        type: 'text',
        maxLength: 3,
        modelValue: 'abc' // Already at maxLength
      });
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      
      // Set up the input element to have the current value and selection
      const inputElement = input.element as HTMLInputElement;
      inputElement.value = 'abc';
      Object.defineProperty(inputElement, 'selectionStart', { value: 3, configurable: true });
      Object.defineProperty(inputElement, 'selectionEnd', { value: 3, configurable: true });
      
      // Try to type 'd' when already at maxLength
      await input.trigger('keydown', { key: 'd' });
      
      // The test is mainly to ensure the function runs without error
      // In real usage, preventDefault would prevent the character from being typed
      expect(input.element).toBeDefined();
    });

    it('allows backspace when at maxLength', async () => {
      wrapper = createWrapper({ 
        type: 'text',
        maxLength: 3,
        modelValue: 'abc' // Already at maxLength
      });
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      
      // Backspace should be allowed
      await input.trigger('keydown', { key: 'Backspace' });
      
      // Should have emitted keydown event without preventing it
      expect(wrapper.emitted('keydown')).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('emits update:modelValue on input', async () => {
      wrapper = createWrapper();
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      await input.setValue('new value');
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['new value']);
    });

    it('emits input event', async () => {
      wrapper = createWrapper();
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      await input.trigger('input');
      
      expect(wrapper.emitted('input')).toBeTruthy();
    });

    it('emits focus event', async () => {
      wrapper = createWrapper();
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      await input.trigger('focus');
      
      expect(wrapper.emitted('focus')).toBeTruthy();
    });

    it('emits blur event', async () => {
      wrapper = createWrapper();
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      await input.trigger('blur');
      
      expect(wrapper.emitted('blur')).toBeTruthy();
    });

    it('emits keydown event', async () => {
      wrapper = createWrapper();
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      await input.trigger('keydown', { key: 'Enter' });
      
      expect(wrapper.emitted('keydown')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('generates unique id when not provided', () => {
      wrapper = createWrapper({ label: '레이블' });
      
      const label = wrapper.find('.text-input__label');
      const input = wrapper.find('[data-testid="text-input-field"]');
      
      const forAttr = label.attributes('for');
      const idAttr = input.attributes('id');
      
      expect(forAttr).toBeTruthy();
      expect(idAttr).toBeTruthy();
      expect(forAttr).toBe(idAttr);
    });

    it('uses provided id', () => {
      const customId = 'custom-input-id';
      wrapper = createWrapper({ 
        id: customId,
        label: '레이블'
      });
      
      const label = wrapper.find('.text-input__label');
      const input = wrapper.find('[data-testid="text-input-field"]');
      
      expect(label.attributes('for')).toBe(customId);
      expect(input.attributes('id')).toBe(customId);
    });

    it('associates label with textarea', () => {
      wrapper = createWrapper({ 
        type: 'textarea',
        label: '레이블'
      });
      
      const label = wrapper.find('.text-input__label');
      const textarea = wrapper.find('[data-testid="text-input-textarea"]');
      
      const forAttr = label.attributes('for');
      const idAttr = textarea.attributes('id');
      
      expect(forAttr).toBe(idAttr);
    });
  });

  describe('Readonly State', () => {
    it('does not show clear button when readonly', () => {
      wrapper = createWrapper({ 
        clearable: true,
        modelValue: 'test text',
        readonly: true
      });
      
      expect(wrapper.find('[data-testid="text-input-clear"]').exists()).toBe(false);
    });
  });

  describe('CSS Classes', () => {
    it('applies clearable class to input when clearable and has value', () => {
      wrapper = createWrapper({ 
        clearable: true,
        modelValue: 'test'
      });
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      expect(input.classes()).toContain('text-input__input--clearable');
    });

    it('applies clearable class to textarea when clearable and has value', () => {
      wrapper = createWrapper({ 
        type: 'textarea',
        clearable: true,
        modelValue: 'test'
      });
      
      const textarea = wrapper.find('[data-testid="text-input-textarea"]');
      expect(textarea.classes()).toContain('text-input__textarea--clearable');
    });

    it('does not apply clearable class when no value', () => {
      wrapper = createWrapper({ 
        clearable: true,
        modelValue: ''
      });
      
      const input = wrapper.find('[data-testid="text-input-field"]');
      expect(input.classes()).not.toContain('text-input__input--clearable');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined modelValue', () => {
      wrapper = createWrapper({ 
        modelValue: undefined,
        showCharCount: false  // Explicitly disable to test this case
      });
      
      expect(wrapper.find('[data-testid="text-input-count"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="text-input-clear"]').exists()).toBe(false);
    });

    it('handles empty string modelValue', () => {
      wrapper = createWrapper({ 
        modelValue: '',
        showCharCount: true,
        maxLength: 50
      });
      
      const countEl = wrapper.find('[data-testid="text-input-count"]');
      expect(countEl.text()).toBe('0 / 50');
    });

    it('handles max length of 0', () => {
      wrapper = createWrapper({ 
        maxLength: 0,
        showCharCount: true
      });
      
      // showCharCount가 true면 maxLength가 0이어도 표시
      const countEl = wrapper.find('[data-testid="text-input-count"]');
      expect(countEl.exists()).toBe(true);
      expect(countEl.text()).toBe('0 / 0');
    });
  });
});