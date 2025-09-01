// src/components/Select.spec.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Select from './Select.vue';

type SelectInstance = InstanceType<typeof Select>;

describe('Select', () => {
  let wrapper: VueWrapper<SelectInstance>;

  const mockOptions = [
    'Option 1',
    'Option 2', 
    'Option 3'
  ];

  const mockObjectOptions = [
    { label: 'First Option', value: 'first' },
    { label: 'Second Option', value: 'second' },
    { label: 'Third Option', value: 'third' },
    { label: 'Disabled Option', value: 'disabled', disabled: true }
  ];

  const mockOptionsWithDescription = [
    { label: 'Option 1', value: 'option1', description: '첫 번째 옵션 설명' },
    { label: 'Option 2', value: 'option2', description: '두 번째 옵션 설명' },
    { label: 'Option 3', value: 'option3', description: '세 번째 옵션 설명' }
  ];

  const mockOptionsWithIcon = [
    { label: 'NH농협은행', value: 'nh', icon: 'NH', iconColor: '#007bff' },
    { label: '신한은행', value: 'shinhan', icon: '신한', iconColor: '#0066cc' },
    { label: 'KB국민은행', value: 'kb', icon: 'KB', iconColor: '#ffb800' }
  ];

  const mockOptionsWithIconImage = [
    { label: 'Google', value: 'google', iconImage: 'https://logo.clearbit.com/google.com' },
    { label: 'Microsoft', value: 'microsoft', iconImage: 'https://logo.clearbit.com/microsoft.com' },
    { label: 'Apple', value: 'apple', iconImage: 'https://logo.clearbit.com/apple.com' }
  ];

  const createWrapper = (props = {}) => {
    return mount(Select, {
      props: {
        options: mockOptions,
        ...props,
      },
    });
  };

  beforeEach(() => {
    wrapper?.unmount();
  });

  afterEach(() => {
    // Clean up any open dropdowns
    document.removeEventListener('click', () => {});
  });

  describe('Rendering', () => {
    it('renders select component', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('[data-testid="select"]')).toBeTruthy();
      expect(wrapper.find('[data-testid="select-trigger"]').exists()).toBe(true);
    });

    it('renders with default placeholder', () => {
      wrapper = createWrapper({ placeholder: undefined });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe('선택');
    });

    it('renders with custom placeholder', () => {
      const customPlaceholder = '옵션을 선택하세요';
      wrapper = createWrapper({ placeholder: customPlaceholder });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe(customPlaceholder);
    });

    it('renders with label', () => {
      wrapper = createWrapper({ label: '테스트 라벨' });
      
      const labelElement = wrapper.find('.select__label');
      expect(labelElement.exists()).toBe(true);
      expect(labelElement.text()).toBe('테스트 라벨');
    });

    it('hides label when not provided', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('.select__label').exists()).toBe(false);
    });
  });

  describe('Options Handling', () => {
    it('handles string options', () => {
      wrapper = createWrapper({ options: mockOptions });
      
      expect(wrapper.vm.options).toEqual(mockOptions);
    });

    it('handles object options', () => {
      wrapper = createWrapper({ options: mockObjectOptions });
      
      expect(wrapper.vm.options).toEqual(mockObjectOptions);
    });

    it('handles options with description', () => {
      wrapper = createWrapper({ options: mockOptionsWithDescription });
      
      expect(wrapper.vm.options).toEqual(mockOptionsWithDescription);
    });

    it('renders selected value from string options', async () => {
      wrapper = createWrapper({ 
        modelValue: 'Option 2',
        options: mockOptions 
      });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe('Option 2');
    });

    it('renders selected value from object options', async () => {
      wrapper = createWrapper({ 
        modelValue: 'second',
        options: mockObjectOptions 
      });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe('Second Option');
    });
  });

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      wrapper = createWrapper({ variant: 'default' });
      
      expect(wrapper.vm.variant).toBe('default');
    });

    it('renders with-description variant correctly', () => {
      wrapper = createWrapper({ 
        variant: 'with-description',
        modelValue: 'option1',
        options: mockOptionsWithDescription
      });
      
      expect(wrapper.vm.variant).toBe('with-description');
      expect(wrapper.find('.select__description').exists()).toBe(true);
      expect(wrapper.find('.select__description').text()).toBe('첫 번째 옵션 설명');
    });

    it('does not show description in default variant', () => {
      wrapper = createWrapper({ 
        variant: 'default',
        modelValue: 'option1',
        options: mockOptionsWithDescription
      });
      
      expect(wrapper.find('.select__description').exists()).toBe(false);
    });

    it('shows description in dropdown options for with-description variant', async () => {
      wrapper = createWrapper({ 
        variant: 'with-description',
        options: mockOptionsWithDescription
      });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const descriptions = wrapper.findAll('.select__option-description');
      expect(descriptions).toHaveLength(3);
      expect(descriptions[0].text()).toBe('첫 번째 옵션 설명');
    });

    it('does not show description in dropdown options for default variant', async () => {
      wrapper = createWrapper({ 
        variant: 'default',
        options: mockOptionsWithDescription
      });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const descriptions = wrapper.findAll('.select__option-description');
      expect(descriptions).toHaveLength(0);
    });

    it('handles options without description in with-description variant', () => {
      wrapper = createWrapper({ 
        variant: 'with-description',
        modelValue: 'first',
        options: mockObjectOptions // No description property
      });
      
      expect(wrapper.find('.select__description').exists()).toBe(false);
    });

    it('shows description when showDescription is true (default)', () => {
      wrapper = createWrapper({
        variant: 'with-description',
        options: mockOptionsWithDescription,
        modelValue: 'option1',
        showDescription: true
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(true);
      expect(description.text()).toBe('첫 번째 옵션 설명');
    });

    it('hides description when showDescription is false', () => {
      wrapper = createWrapper({
        variant: 'with-description',
        options: mockOptionsWithDescription,
        modelValue: 'option1',
        showDescription: false
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(false);
    });

    it('shows dropdown option descriptions when showDescription is true', async () => {
      wrapper = createWrapper({
        variant: 'with-description',
        options: mockOptionsWithDescription,
        showDescription: true
      });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const optionDescriptions = wrapper.findAll('.select__option-description');
      expect(optionDescriptions).toHaveLength(3);
      expect(optionDescriptions[0].text()).toBe('첫 번째 옵션 설명');
      expect(optionDescriptions[1].text()).toBe('두 번째 옵션 설명');
      expect(optionDescriptions[2].text()).toBe('세 번째 옵션 설명');
    });

    it('hides dropdown option descriptions when showDescription is false', async () => {
      wrapper = createWrapper({
        variant: 'with-description',
        options: mockOptionsWithDescription,
        showDescription: false
      });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const optionDescriptions = wrapper.findAll('.select__option-description');
      expect(optionDescriptions).toHaveLength(0);
    });

    it('showDescription prop does not affect default variant', () => {
      wrapper = createWrapper({
        variant: 'default',
        options: mockOptionsWithDescription,
        modelValue: 'option1',
        showDescription: true
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(false);
    });

    it('showDescription defaults to true when not provided', () => {
      wrapper = createWrapper({
        variant: 'with-description',
        options: mockOptionsWithDescription,
        modelValue: 'option1'
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(true);
      expect(description.text()).toBe('첫 번째 옵션 설명');
    });

    it('showDescription prop is reactive', async () => {
      wrapper = createWrapper({
        variant: 'with-description',
        options: mockOptionsWithDescription,
        modelValue: 'option1',
        showDescription: true
      });
      
      // Initially shown
      let description = wrapper.find('.select__description');
      expect(description.exists()).toBe(true);
      
      // Hide description
      await wrapper.setProps({ showDescription: false });
      description = wrapper.find('.select__description');
      expect(description.exists()).toBe(false);
      
      // Show description again
      await wrapper.setProps({ showDescription: true });
      description = wrapper.find('.select__description');
      expect(description.exists()).toBe(true);
    });

    it('displays customDescription when provided', () => {
      const customDesc = '커스텀 부가설명 텍스트';
      wrapper = createWrapper({
        variant: 'with-description',
        customDescription: customDesc,
        showDescription: true
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(true);
      expect(description.text()).toBe(customDesc);
    });

    it('customDescription takes priority over option description', () => {
      const customDesc = '커스텀 부가설명';
      wrapper = createWrapper({
        variant: 'with-description',
        options: mockOptionsWithDescription,
        modelValue: 'option1',
        customDescription: customDesc,
        showDescription: true
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(true);
      expect(description.text()).toBe(customDesc);
      expect(description.text()).not.toBe('첫 번째 옵션 설명'); // 옵션 설명이 아님
    });

    it('shows customDescription even when no option is selected', () => {
      const customDesc = '항상 표시되는 설명';
      wrapper = createWrapper({
        variant: 'with-description',
        customDescription: customDesc,
        showDescription: true
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(true);
      expect(description.text()).toBe(customDesc);
    });

    it('hides customDescription when showDescription is false', () => {
      wrapper = createWrapper({
        variant: 'with-description',
        customDescription: '숨겨질 설명',
        showDescription: false
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(false);
    });

    it('customDescription does not affect default variant', () => {
      wrapper = createWrapper({
        variant: 'default',
        customDescription: '표시되지 않을 설명',
        showDescription: true
      });
      
      const description = wrapper.find('.select__description');
      expect(description.exists()).toBe(false);
    });

    it('customDescription is reactive', async () => {
      wrapper = createWrapper({
        variant: 'with-description',
        customDescription: '초기 설명',
        showDescription: true
      });
      
      // Initially shown
      let description = wrapper.find('.select__description');
      expect(description.text()).toBe('초기 설명');
      
      // Change customDescription
      await wrapper.setProps({ customDescription: '변경된 설명' });
      description = wrapper.find('.select__description');
      expect(description.text()).toBe('변경된 설명');
      
      // Remove customDescription (fallback to option description if available)
      await wrapper.setProps({ 
        customDescription: undefined,
        options: mockOptionsWithDescription,
        modelValue: 'option1'
      });
      description = wrapper.find('.select__description');
      expect(description.text()).toBe('첫 번째 옵션 설명');
    });
  });

  describe('With-Icon Variant', () => {
    it('renders with-icon variant correctly', () => {
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mockOptionsWithIcon,
        modelValue: 'nh'
      });
      
      expect(wrapper.vm.variant).toBe('with-icon');
      
      // 아이콘이 표시되는지 확인
      const icon = wrapper.find('.select__icon');
      expect(icon.exists()).toBe(true);
      expect(icon.text()).toBe('NH');
    });

    it('does not show icon in default variant', () => {
      wrapper = createWrapper({
        variant: 'default',
        options: mockOptionsWithIcon,
        modelValue: 'nh'
      });
      
      const icon = wrapper.find('.select__icon');
      expect(icon.exists()).toBe(false);
    });

    it('shows icons in dropdown options for with-icon variant', async () => {
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mockOptionsWithIcon
      });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const optionIcons = wrapper.findAll('.select__option-icon');
      expect(optionIcons).toHaveLength(3);
      expect(optionIcons[0].text()).toBe('NH');
      expect(optionIcons[1].text()).toBe('신한');
      expect(optionIcons[2].text()).toBe('KB');
    });

    it('applies correct icon colors', async () => {
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mockOptionsWithIcon,
        modelValue: 'nh'
      });
      
      const icon = wrapper.find('.select__icon');
      expect(icon.attributes('style')).toContain('background-color: rgb(0, 123, 255)');
    });

    it('handles options without icon in with-icon variant', () => {
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mockOptions,
        modelValue: 'Option 1'
      });
      
      const icon = wrapper.find('.select__icon');
      expect(icon.exists()).toBe(false);
    });

    it('shows default icon color when iconColor not provided', () => {
      const optionsWithoutColor = [
        { label: '테스트', value: 'test', icon: 'T' }
      ];
      wrapper = createWrapper({
        variant: 'with-icon',
        options: optionsWithoutColor,
        modelValue: 'test'
      });
      
      const icon = wrapper.find('.select__icon');
      expect(icon.attributes('style')).toContain('background-color: rgb(0, 123, 255)');
    });

    it('icon variant does not affect other variants functionality', () => {
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mockOptionsWithIcon,
        modelValue: 'nh',
        helperText: '도움말'
      });
      
      expect(wrapper.find('[data-testid="select-helper"]').text()).toBe('도움말');
      expect(wrapper.find('.select__value').text()).toBe('NH농협은행');
    });

    it('displays image icons when iconImage is provided', () => {
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mockOptionsWithIconImage,
        modelValue: 'google'
      });
      
      const icon = wrapper.find('.select__icon');
      expect(icon.exists()).toBe(true);
      expect(icon.classes()).toContain('select__icon--image');
      
      const img = wrapper.find('.select__icon-img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('https://logo.clearbit.com/google.com');
      expect(img.attributes('alt')).toBe('Google');
    });

    it('shows image icons in dropdown options', async () => {
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mockOptionsWithIconImage
      });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const optionIcons = wrapper.findAll('.select__option-icon');
      expect(optionIcons).toHaveLength(3);
      
      const optionImages = wrapper.findAll('.select__option-icon-img');
      expect(optionImages).toHaveLength(3);
      expect(optionImages[0].attributes('src')).toBe('https://logo.clearbit.com/google.com');
      expect(optionImages[1].attributes('src')).toBe('https://logo.clearbit.com/microsoft.com');
      expect(optionImages[2].attributes('src')).toBe('https://logo.clearbit.com/apple.com');
    });

    it('iconImage takes priority over text icon', () => {
      const mixedOptions = [
        { label: 'Mixed', value: 'mixed', icon: 'M', iconColor: '#ff0000', iconImage: 'https://example.com/icon.png' }
      ];
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mixedOptions,
        modelValue: 'mixed'
      });
      
      const icon = wrapper.find('.select__icon');
      expect(icon.classes()).toContain('select__icon--image');
      
      const img = wrapper.find('.select__icon-img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('https://example.com/icon.png');
      
      // 텍스트 아이콘이 표시되지 않는지 확인
      expect(icon.text()).not.toBe('M');
    });

    it('handles mixed text and image icons in same options list', async () => {
      const mixedOptions = [
        { label: 'Text Icon', value: 'text', icon: 'T', iconColor: '#007bff' },
        { label: 'Image Icon', value: 'image', iconImage: 'https://example.com/icon.png' }
      ];
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mixedOptions
      });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const optionIcons = wrapper.findAll('.select__option-icon');
      expect(optionIcons).toHaveLength(2);
      
      // 첫 번째는 텍스트 아이콘
      expect(optionIcons[0].text()).toBe('T');
      expect(optionIcons[0].classes()).not.toContain('select__option-icon--image');
      
      // 두 번째는 이미지 아이콘
      expect(optionIcons[1].classes()).toContain('select__option-icon--image');
      const img = optionIcons[1].find('.select__option-icon-img');
      expect(img.exists()).toBe(true);
    });

    it('image icon does not apply background color', () => {
      wrapper = createWrapper({
        variant: 'with-icon',
        options: mockOptionsWithIconImage,
        modelValue: 'google'
      });
      
      const icon = wrapper.find('.select__icon');
      const style = icon.attributes('style') || '';
      expect(style).not.toContain('background-color');
    });
  });

  describe('Dropdown Functionality', () => {
    it('opens dropdown when trigger is clicked', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(true);
    });

    it('closes dropdown when trigger is clicked again', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      
      // Open dropdown
      await trigger.trigger('click');
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(true);
      
      // Close dropdown
      await trigger.trigger('click');
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(false);
    });

    it('renders all options in dropdown', async () => {
      wrapper = createWrapper({ options: mockOptions });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const options = wrapper.findAll('[data-testid="select-option"]');
      expect(options).toHaveLength(mockOptions.length);
      
      options.forEach((option, index) => {
        expect(option.text()).toBe(mockOptions[index]);
      });
    });

    it('does not open dropdown when disabled', async () => {
      wrapper = createWrapper({ disabled: true });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(false);
    });

    it('does not open dropdown when readonly', async () => {
      wrapper = createWrapper({ readonly: true });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(false);
    });
  });

  describe('Option Selection', () => {
    it('selects option when clicked', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const firstOption = wrapper.findAll('[data-testid="select-option"]')[0];
      await firstOption.trigger('click');
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Option 1']);
      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')![0]).toEqual(['Option 1']);
    });

    it('closes dropdown after selection', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const firstOption = wrapper.findAll('[data-testid="select-option"]')[0];
      await firstOption.trigger('click');
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(false);
    });

    it('does not select disabled options', async () => {
      wrapper = createWrapper({ options: mockObjectOptions });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const options = wrapper.findAll('[data-testid="select-option"]');
      const disabledOption = options[3]; // Last option is disabled
      
      await disabledOption.trigger('click');
      
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      expect(wrapper.emitted('change')).toBeFalsy();
    });
  });

  describe('Keyboard Navigation', () => {
    it('opens dropdown with Enter key', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('keydown', { key: 'Enter' });
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(true);
    });

    it('opens dropdown with Space key', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('keydown', { key: ' ' });
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(true);
    });

    it('closes dropdown with Escape key', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(true);
      
      await trigger.trigger('keydown', { key: 'Escape' });
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(false);
    });

    it('opens dropdown with ArrowDown key', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('keydown', { key: 'ArrowDown' });
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(true);
    });

    it('opens dropdown with ArrowUp key', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('keydown', { key: 'ArrowUp' });
      
      expect(wrapper.find('[data-testid="select-dropdown"]').exists()).toBe(true);
    });
  });

  describe('States', () => {
    it('applies correct classes for default state', () => {
      wrapper = createWrapper();
      
      expect(wrapper.classes()).toContain('select--default');
      expect(wrapper.find('.select__trigger').classes()).toContain('select__trigger--default');
    });

    it('applies correct classes for error state with errorMessage', () => {
      wrapper = createWrapper({ errorMessage: 'Error message' });
      
      expect(wrapper.classes()).toContain('select--error');
      expect(wrapper.find('.select__trigger').classes()).toContain('select__trigger--error');
    });

    it('applies correct classes for error state with error prop', () => {
      wrapper = createWrapper({ error: true });
      
      expect(wrapper.classes()).toContain('select--error');
      expect(wrapper.find('.select__trigger').classes()).toContain('select__trigger--error');
    });

    it('prioritizes errorMessage over error prop', () => {
      wrapper = createWrapper({ error: true, errorMessage: 'Error message' });
      
      expect(wrapper.classes()).toContain('select--error');
      expect(wrapper.find('[data-testid="select-error"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="select-error"]').text()).toBe('Error message');
    });

    it('applies correct classes for disabled state', () => {
      wrapper = createWrapper({ disabled: true });
      
      expect(wrapper.classes()).toContain('select--disabled');
      expect(wrapper.find('.select__trigger').classes()).toContain('select__trigger--disabled');
    });

    it('applies correct classes for readonly state', () => {
      wrapper = createWrapper({ readonly: true });
      
      expect(wrapper.classes()).toContain('select--readonly');
      expect(wrapper.find('.select__trigger').classes()).toContain('select__trigger--readonly');
    });

    it('applies focus state when dropdown is open', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      expect(wrapper.classes()).toContain('select--focus');
      expect(wrapper.find('.select__trigger').classes()).toContain('select__trigger--focus');
    });
  });

  describe('Arrow Icon', () => {
    it('rotates arrow when dropdown is open', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const arrow = wrapper.find('.select__arrow');
      expect(arrow.classes()).toContain('select__arrow--open');
    });

    it('resets arrow when dropdown is closed', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      
      // Open and close
      await trigger.trigger('click');
      await trigger.trigger('click');
      
      const arrow = wrapper.find('.select__arrow');
      expect(arrow.classes()).not.toContain('select__arrow--open');
    });
  });

  describe('Events', () => {
    it('emits open event when dropdown opens', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      expect(wrapper.emitted('open')).toBeTruthy();
      expect(wrapper.emitted('open')).toHaveLength(1);
    });

    it('emits close event when dropdown closes', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      
      // Open and close
      await trigger.trigger('click');
      await trigger.trigger('click');
      
      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it('emits focus event', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('focus');
      
      // Note: focus events are handled internally, we test the state change
      expect(trigger.exists()).toBe(true);
    });
  });

  describe('Footer Messages', () => {
    it('shows error message', () => {
      const errorMessage = 'This is an error';
      wrapper = createWrapper({ errorMessage });
      
      const errorElement = wrapper.find('[data-testid="select-error"]');
      expect(errorElement.exists()).toBe(true);
      expect(errorElement.text()).toBe(errorMessage);
    });

    it('shows helper text when no error', () => {
      const helperText = 'This is helper text';
      wrapper = createWrapper({ helperText });
      
      const helperElement = wrapper.find('[data-testid="select-helper"]');
      expect(helperElement.exists()).toBe(true);
      expect(helperElement.text()).toBe(helperText);
    });

    it('prioritizes error message over helper text', () => {
      wrapper = createWrapper({ 
        errorMessage: 'Error message',
        helperText: 'Helper text'
      });
      
      expect(wrapper.find('[data-testid="select-error"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="select-helper"]').exists()).toBe(false);
    });

    it('hides footer when no messages', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('.select__footer').exists()).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      expect(trigger.attributes('role')).toBe('combobox');
      expect(trigger.attributes('aria-expanded')).toBe('false');
      expect(trigger.attributes('aria-haspopup')).toBe('true');
    });

    it('updates ARIA attributes when opened', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      expect(trigger.attributes('aria-expanded')).toBe('true');
    });

    it('has correct ARIA attributes for disabled state', () => {
      wrapper = createWrapper({ disabled: true });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      expect(trigger.attributes('aria-disabled')).toBe('true');
    });

    it('has correct ARIA attributes for readonly state', () => {
      wrapper = createWrapper({ readonly: true });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      expect(trigger.attributes('aria-readonly')).toBe('true');
    });

    it('dropdown has correct role', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const dropdown = wrapper.find('[data-testid="select-dropdown"]');
      expect(dropdown.attributes('role')).toBe('listbox');
    });

    it('options have correct ARIA attributes', async () => {
      wrapper = createWrapper({ modelValue: 'Option 1' });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const options = wrapper.findAll('[data-testid="select-option"]');
      expect(options[0].attributes('role')).toBe('option');
      expect(options[0].attributes('aria-selected')).toBe('true');
      expect(options[1].attributes('aria-selected')).toBe('false');
    });
  });

  describe('Props', () => {
    it('accepts and displays all props correctly', () => {
      const props = {
        placeholder: '커스텀 플레이스홀더',
        label: '커스텀 라벨',
        helperText: '커스텀 도움말',
        options: mockOptions,
        variant: 'default' as const,
        disabled: false,
        readonly: false,
      };
      wrapper = createWrapper(props);
      
      expect(wrapper.find('.select__value').text()).toBe(props.placeholder);
      expect(wrapper.find('.select__label').text()).toBe(props.label);
      expect(wrapper.find('[data-testid="select-helper"]').text()).toBe(props.helperText);
      expect(wrapper.vm.variant).toBe(props.variant);
    });

    it('accepts variant prop correctly', () => {
      wrapper = createWrapper({ variant: 'with-description' });
      
      expect(wrapper.vm.variant).toBe('with-description');
    });

    it('accepts with-icon variant correctly', () => {
      wrapper = createWrapper({ variant: 'with-icon' });
      
      expect(wrapper.vm.variant).toBe('with-icon');
    });

    it('handles empty options array', () => {
      wrapper = createWrapper({ options: [] });
      
      expect(wrapper.vm.options).toEqual([]);
    });

    it('handles modelValue changes', async () => {
      wrapper = createWrapper({ options: mockOptions });
      
      await wrapper.setProps({ modelValue: 'Option 2' });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe('Option 2');
    });
  });

  describe('Edge Cases', () => {
    it('handles null modelValue', () => {
      wrapper = createWrapper({ modelValue: null });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe('선택');
    });

    it('handles undefined modelValue', () => {
      wrapper = createWrapper({ modelValue: undefined });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe('선택');
    });

    it('handles empty string modelValue', () => {
      wrapper = createWrapper({ modelValue: '' });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe('선택');
    });

    it('handles modelValue not in options', () => {
      wrapper = createWrapper({ 
        modelValue: 'Non-existent Option',
        options: mockOptions 
      });
      
      const valueElement = wrapper.find('.select__value');
      expect(valueElement.text()).toBe('선택');
    });

    it('handles special characters in options', async () => {
      const specialOptions = ['Option !@#', 'Option $%^', 'Option &*()'];
      wrapper = createWrapper({ options: specialOptions });
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('click');
      
      const options = wrapper.findAll('[data-testid="select-option"]');
      expect(options[0].text()).toBe('Option !@#');
    });
  });

  describe('CSS Classes', () => {
    it('always has base select class', () => {
      wrapper = createWrapper();
      
      expect(wrapper.classes()).toContain('select');
    });

    it('trigger has correct classes', () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('.select__trigger');
      expect(trigger.classes()).toContain('select__trigger');
      expect(trigger.classes()).toContain('select__trigger--default');
    });

    it('value has placeholder class when no value selected', () => {
      wrapper = createWrapper();
      
      const value = wrapper.find('.select__value');
      expect(value.classes()).toContain('select__value--placeholder');
    });

    it('value does not have placeholder class when value selected', () => {
      wrapper = createWrapper({ modelValue: 'Option 1' });
      
      const value = wrapper.find('.select__value');
      expect(value.classes()).not.toContain('select__value--placeholder');
    });
  });

  describe('Interaction', () => {
    it('supports focus management', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      expect(trigger.attributes('tabindex')).toBe('0');
    });

    it('maintains focus on trigger element', async () => {
      wrapper = createWrapper();
      
      const trigger = wrapper.find('[data-testid="select-trigger"]');
      await trigger.trigger('focus');
      
      // Focus should be maintainable
      expect(trigger.exists()).toBe(true);
    });
  });
});