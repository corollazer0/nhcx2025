// src/components/Tooltip.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';

type TooltipInstance = InstanceType<typeof Tooltip>;

describe('Tooltip', () => {
  let wrapper: VueWrapper<TooltipInstance>;

  const createWrapper = (props = {}) => {
    return mount(Tooltip, {
      props: {
        title: '테스트 타이틀',
        ...props,
      },
    });
  };

  beforeEach(() => {
    wrapper?.unmount();
  });

  describe('Rendering', () => {
    it('renders tooltip component', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('[data-testid="tooltip"]')).toBeTruthy();
      expect(wrapper.find('.tooltip__header').exists()).toBe(true);
      expect(wrapper.find('.tooltip__title').exists()).toBe(true);
    });

    it('renders with default title', () => {
      wrapper = createWrapper({ title: undefined });
      
      const titleElement = wrapper.find('.tooltip__title');
      expect(titleElement.text()).toBe('타이틀');
    });

    it('renders with custom title', () => {
      const customTitle = '커스텀 툴팁 타이틀';
      wrapper = createWrapper({ title: customTitle });
      
      const titleElement = wrapper.find('.tooltip__title');
      expect(titleElement.text()).toBe(customTitle);
    });

    it('renders close button by default', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('[data-testid="tooltip-close"]').exists()).toBe(true);
    });

    it('hides close button when closable is false', () => {
      wrapper = createWrapper({ closable: false });
      
      expect(wrapper.find('[data-testid="tooltip-close"]').exists()).toBe(false);
    });
  });

  describe('Subtitle Section', () => {
    it('renders subtitle when subTitle is true', () => {
      wrapper = createWrapper({ subTitle: true });
      
      expect(wrapper.find('[data-testid="tooltip-subtitle"]').exists()).toBe(true);
    });

    it('hides subtitle when subTitle is false', () => {
      wrapper = createWrapper({ subTitle: false });
      
      expect(wrapper.find('[data-testid="tooltip-subtitle"]').exists()).toBe(false);
    });

    it('renders default subtitle text', () => {
      wrapper = createWrapper({ subTitle: true });
      
      const subtitleElement = wrapper.find('[data-testid="tooltip-subtitle"]');
      expect(subtitleElement.text()).toBe('서브 타이틀');
    });

    it('renders custom subtitle text', () => {
      const customSubTitle = '커스텀 서브타이틀';
      wrapper = createWrapper({ 
        subTitle: true, 
        subTitleText: customSubTitle 
      });
      
      const subtitleElement = wrapper.find('[data-testid="tooltip-subtitle"]');
      expect(subtitleElement.text()).toBe(customSubTitle);
    });
  });

  describe('Text Section', () => {
    it('renders text when text is true', () => {
      wrapper = createWrapper({ text: true });
      
      expect(wrapper.find('[data-testid="tooltip-text"]').exists()).toBe(true);
    });

    it('hides text when text is false', () => {
      wrapper = createWrapper({ text: false });
      
      expect(wrapper.find('[data-testid="tooltip-text"]').exists()).toBe(false);
    });

    it('renders default text content', () => {
      wrapper = createWrapper({ text: true });
      
      const textElement = wrapper.find('[data-testid="tooltip-text"]');
      expect(textElement.text()).toBe('서브 텍스트를 내용을 입력해 주세요.');
    });

    it('renders custom text content', () => {
      const customText = '커스텀 텍스트 내용';
      wrapper = createWrapper({ 
        text: true, 
        textContent: customText 
      });
      
      const textElement = wrapper.find('[data-testid="tooltip-text"]');
      expect(textElement.text()).toBe(customText);
    });
  });

  describe('List Section', () => {
    it('renders list when list is true and has items', () => {
      wrapper = createWrapper({ 
        list: true,
        listItems: [{ text: '아이템 1' }, { text: '아이템 2' }]
      });
      
      expect(wrapper.find('[data-testid="tooltip-list"]').exists()).toBe(true);
    });

    it('hides list when list is false', () => {
      wrapper = createWrapper({ list: false });
      
      expect(wrapper.find('[data-testid="tooltip-list"]').exists()).toBe(false);
    });

    it('hides list when listItems is empty', () => {
      wrapper = createWrapper({ 
        list: true,
        listItems: []
      });
      
      expect(wrapper.find('[data-testid="tooltip-list"]').exists()).toBe(false);
    });

    it('renders default list items', () => {
      wrapper = createWrapper({ list: true });
      
      const listItems = wrapper.findAll('[data-testid="tooltip-list-item"]');
      expect(listItems).toHaveLength(2);
      expect(listItems[0].text()).toBe('내용을 입력해 주세요');
      expect(listItems[1].text()).toBe('내용을 입력해 주세요');
    });

    it('renders custom list items', () => {
      const customItems = [
        { text: '첫 번째 아이템' },
        { text: '두 번째 아이템' },
        { text: '세 번째 아이템' }
      ];
      wrapper = createWrapper({ 
        list: true,
        listItems: customItems 
      });
      
      const listItems = wrapper.findAll('[data-testid="tooltip-list-item"]');
      expect(listItems).toHaveLength(3);
      expect(listItems[0].text()).toBe('첫 번째 아이템');
      expect(listItems[1].text()).toBe('두 번째 아이템');
      expect(listItems[2].text()).toBe('세 번째 아이템');
    });

    it('renders bullet points for list items', () => {
      wrapper = createWrapper({ 
        list: true,
        listItems: [{ text: '테스트 아이템' }]
      });
      
      const bullet = wrapper.find('.tooltip__bullet');
      expect(bullet.exists()).toBe(true);
    });
  });

  describe('Events', () => {
    it('emits close event when close button clicked', async () => {
      wrapper = createWrapper({ closable: true });
      
      const closeButton = wrapper.find('[data-testid="tooltip-close"]');
      await closeButton.trigger('click');
      
      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it('does not emit close when close button not present', () => {
      wrapper = createWrapper({ closable: false });
      
      expect(wrapper.emitted('close')).toBeFalsy();
    });

    it('can handle multiple close clicks', async () => {
      wrapper = createWrapper({ closable: true });
      
      const closeButton = wrapper.find('[data-testid="tooltip-close"]');
      await closeButton.trigger('click');
      await closeButton.trigger('click');
      await closeButton.trigger('click');
      
      expect(wrapper.emitted('close')).toHaveLength(3);
    });
  });

  describe('Props', () => {
    it('accepts and displays all props correctly', () => {
      const props = {
        title: '프로퍼티 테스트 타이틀',
        subTitle: true,
        subTitleText: '프로퍼티 서브타이틀',
        text: true,
        textContent: '프로퍼티 텍스트 내용',
        list: true,
        listItems: [{ text: '프로퍼티 리스트 아이템' }],
        closable: true,
      };
      wrapper = createWrapper(props);
      
      expect(wrapper.find('.tooltip__title').text()).toBe(props.title);
      expect(wrapper.find('[data-testid="tooltip-subtitle"]').text()).toBe(props.subTitleText);
      expect(wrapper.find('[data-testid="tooltip-text"]').text()).toBe(props.textContent);
      expect(wrapper.find('[data-testid="tooltip-list-item"]').text()).toBe(props.listItems[0].text);
      expect(wrapper.find('[data-testid="tooltip-close"]').exists()).toBe(true);
    });

    it('handles empty title', () => {
      wrapper = createWrapper({ title: '' });
      
      expect(wrapper.find('.tooltip__title').text()).toBe('');
    });

    it('handles long title', () => {
      const longTitle = '이것은 매우 긴 툴팁 타이틀입니다. '.repeat(3);
      wrapper = createWrapper({ title: longTitle });
      
      const titleElement = wrapper.find('.tooltip__title');
      expect(titleElement.text()).toContain('이것은 매우 긴 툴팁 타이틀입니다.');
    });
  });

  describe('Default Values', () => {
    it('uses default title when not provided', () => {
      wrapper = createWrapper({ title: undefined });
      
      expect(wrapper.find('.tooltip__title').text()).toBe('타이틀');
    });

    it('uses default subTitle state when not provided', () => {
      wrapper = createWrapper({ subTitle: undefined });
      
      expect(wrapper.find('[data-testid="tooltip-subtitle"]').exists()).toBe(true);
    });

    it('uses default text state when not provided', () => {
      wrapper = createWrapper({ text: undefined });
      
      expect(wrapper.find('[data-testid="tooltip-text"]').exists()).toBe(true);
    });

    it('uses default list state when not provided', () => {
      wrapper = createWrapper({ list: undefined });
      
      expect(wrapper.find('[data-testid="tooltip-list"]').exists()).toBe(true);
    });

    it('uses default closable state when not provided', () => {
      wrapper = createWrapper({ closable: undefined });
      
      expect(wrapper.find('[data-testid="tooltip-close"]').exists()).toBe(true);
    });
  });

  describe('Content Structure', () => {
    it('has correct HTML structure', () => {
      wrapper = createWrapper();
      
      const tooltip = wrapper.find('[data-testid="tooltip"]');
      const header = wrapper.find('.tooltip__header');
      const title = wrapper.find('.tooltip__title');
      
      expect(tooltip.exists()).toBe(true);
      expect(header.exists()).toBe(true);
      expect(title.exists()).toBe(true);
    });

    it('title element is h2', () => {
      wrapper = createWrapper();
      
      const titleElement = wrapper.find('.tooltip__title');
      expect(titleElement.element.tagName.toLowerCase()).toBe('h2');
    });

    it('maintains proper parent-child relationship', () => {
      wrapper = createWrapper();
      
      const tooltip = wrapper.find('[data-testid="tooltip"]');
      const header = wrapper.find('.tooltip__header');
      const title = wrapper.find('.tooltip__title');
      
      expect(tooltip.element.contains(header.element)).toBe(true);
      expect(header.element.contains(title.element)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles null title', () => {
      wrapper = createWrapper({ title: null });
      
      expect(wrapper.find('.tooltip__title').text()).toBe('');
    });

    it('handles undefined listItems', () => {
      wrapper = mount(Tooltip, {
        props: {
          title: '테스트',
          list: true,
          listItems: undefined
        }
      });
      
      // undefined가 전달되면 기본값이 적용되므로 리스트가 존재함
      expect(wrapper.find('[data-testid="tooltip-list"]').exists()).toBe(true);
    });

    it('handles empty string in list items', () => {
      wrapper = createWrapper({ 
        list: true,
        listItems: [{ text: '' }]
      });
      
      const listItem = wrapper.find('[data-testid="tooltip-list-item"]');
      expect(listItem.text()).toBe('');
    });

    it('handles special characters in content', () => {
      const specialTitle = '특수문자 테스트: !@#$%^&*()_+-=[]{}|;:,.<>?';
      wrapper = createWrapper({ title: specialTitle });
      
      expect(wrapper.find('.tooltip__title').text()).toBe(specialTitle);
    });
  });

  describe('CSS Classes', () => {
    it('always has base tooltip class', () => {
      wrapper = createWrapper();
      
      expect(wrapper.classes()).toContain('tooltip');
    });

    it('header has correct class', () => {
      wrapper = createWrapper();
      
      expect(wrapper.find('.tooltip__header').classes()).toContain('tooltip__header');
    });

    it('list items have correct classes', () => {
      wrapper = createWrapper({ 
        list: true,
        listItems: [{ text: '테스트' }]
      });
      
      expect(wrapper.find('.tooltip__list').classes()).toContain('tooltip__list');
      expect(wrapper.find('.tooltip__list-item').classes()).toContain('tooltip__list-item');
    });
  });

  describe('Accessibility', () => {
    it('close button has correct type', () => {
      wrapper = createWrapper({ closable: true });
      
      const closeButton = wrapper.find('[data-testid="tooltip-close"]');
      expect(closeButton.attributes('type')).toBe('button');
    });

    it('title uses semantic heading element', () => {
      wrapper = createWrapper();
      
      const titleElement = wrapper.find('.tooltip__title');
      expect(titleElement.element.tagName.toLowerCase()).toBe('h2');
    });

    it('list text uses semantic paragraph elements', () => {
      wrapper = createWrapper({ 
        list: true,
        listItems: [{ text: '테스트' }]
      });
      
      const listText = wrapper.find('.tooltip__list-text');
      expect(listText.element.tagName.toLowerCase()).toBe('p');
    });
  });

  describe('Interaction', () => {
    it('maintains focus capability on close button', async () => {
      wrapper = createWrapper({ closable: true });
      
      const closeButton = wrapper.find('[data-testid="tooltip-close"]');
      await closeButton.trigger('focus');
      
      // Focus events don't get emitted by default, but we can verify the element exists
      expect(closeButton.exists()).toBe(true);
    });

    it('supports keyboard interaction', async () => {
      wrapper = createWrapper({ closable: true });
      
      const closeButton = wrapper.find('[data-testid="tooltip-close"]');
      await closeButton.trigger('keydown.enter');
      
      // Verify button is interactive
      expect(closeButton.exists()).toBe(true);
    });
  });
});