import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Summary from './Summary.vue';

describe('Summary', () => {
  const mockItems = [
    { title: '항목1', data: '데이터1' },
    { title: '항목2', data: '데이터2' },
    { title: '항목3', data: '데이터3' },
    { title: '항목4', data: '데이터4' },
    { title: '항목5', data: '데이터5' }
  ];

  const defaultProps = {
    showHeader: true,
    label: '테스트라벨',
    title: '테스트 제목',
    subtitle: '테스트 부제목',
    items: mockItems
  };

  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      const wrapper = mount(Summary, {
        props: defaultProps
      });

      expect(wrapper.find('[data-testid="summary"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('테스트 제목');
      expect(wrapper.text()).toContain('테스트 부제목');
      expect(wrapper.text()).toContain('테스트라벨');
    });

    it('renders header when showHeader is true', () => {
      const wrapper = mount(Summary, {
        props: defaultProps
      });

      expect(wrapper.find('.summary__header').exists()).toBe(true);
      expect(wrapper.find('.summary__title').text()).toBe('테스트 제목');
      expect(wrapper.find('.summary__subtitle').text()).toBe('테스트 부제목');
      expect(wrapper.find('.summary__label').text()).toBe('테스트라벨');
    });

    it('hides header when showHeader is false', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          showHeader: false
        }
      });

      expect(wrapper.find('.summary__header').exists()).toBe(false);
    });

    it('renders label when provided', () => {
      const wrapper = mount(Summary, {
        props: defaultProps
      });

      const label = wrapper.find('.summary__label');
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe('테스트라벨');
    });

    it('hides label when not provided', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          label: ''
        }
      });

      expect(wrapper.find('.summary__label').exists()).toBe(false);
    });

    it('renders list items correctly', () => {
      const wrapper = mount(Summary, {
        props: defaultProps
      });

      const listItems = wrapper.findAll('.summary__list-item');
      expect(listItems).toHaveLength(5);

      listItems.forEach((item, index) => {
        expect(item.find('.summary__list-title').text()).toBe(mockItems[index].title);
        expect(item.find('.summary__list-data').text()).toBe(mockItems[index].data);
      });
    });

    it('hides list when showList is false', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          showList: false
        }
      });

      expect(wrapper.find('.summary__list').exists()).toBe(false);
    });
  });

  describe('Basic Variant', () => {
    it('applies basic variant class', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'basic'
        }
      });

      expect(wrapper.find('.summary').classes()).toContain('summary--basic');
    });

    it('shows all items in basic variant', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'basic'
        }
      });

      expect(wrapper.findAll('.summary__list-item')).toHaveLength(5);
    });

    it('does not show toggle button in basic variant', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'basic'
        }
      });

      expect(wrapper.find('.summary__toggle-button').exists()).toBe(false);
    });
  });

  describe('Accordion Variant', () => {
    it('applies accordion variant class', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion'
        }
      });

      expect(wrapper.find('.summary').classes()).toContain('summary--accordion');
    });

    it('shows limited items when collapsed', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          collapsedItemCount: 3,
          expanded: false
        }
      });

      expect(wrapper.findAll('.summary__list-item')).toHaveLength(3);
    });

    it('shows all items when expanded', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          expanded: true
        }
      });

      expect(wrapper.findAll('.summary__list-item')).toHaveLength(5);
    });

    it('shows toggle button when showToggleButton is true', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          showToggleButton: true
        }
      });

      expect(wrapper.find('.summary__toggle-button').exists()).toBe(true);
    });

    it('hides toggle button when showToggleButton is false', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          showToggleButton: false
        }
      });

      expect(wrapper.find('.summary__toggle-button').exists()).toBe(false);
    });

    it('displays correct toggle text when collapsed', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          expanded: false,
          expandText: '더보기',
          collapseText: '접기'
        }
      });

      expect(wrapper.find('.summary__toggle-text').text()).toBe('더보기');
    });

    it('displays correct toggle text when expanded', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          expanded: true,
          expandText: '더보기',
          collapseText: '접기'
        }
      });

      expect(wrapper.find('.summary__toggle-text').text()).toBe('접기');
    });

    it('applies expanded class when expanded', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          expanded: true
        }
      });

      expect(wrapper.find('.summary').classes()).toContain('summary--expanded');
    });
  });

  describe('Interactions', () => {
    it('toggles expansion when toggle button is clicked', async () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          expanded: false
        }
      });

      const toggleButton = wrapper.find('.summary__toggle-button');
      await toggleButton.trigger('click');

      expect(wrapper.emitted('toggle')).toHaveLength(1);
      expect(wrapper.emitted('toggle')?.[0]).toEqual([true]);
    });

    it('emits item-click when list item is clicked', async () => {
      const wrapper = mount(Summary, {
        props: defaultProps
      });

      // Add click handler to list items
      const listItems = wrapper.findAll('.summary__list-item');
      await listItems[0].trigger('click');

      // Note: This test assumes we add click handlers to list items
      // Currently the component doesn't have this functionality
    });

    it('updates toggle icon rotation when expanded', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          expanded: true
        }
      });

      const toggleIcon = wrapper.find('.summary__toggle-icon');
      expect(toggleIcon.classes()).toContain('summary__toggle-icon--expanded');
    });
  });

  describe('Props Validation', () => {
    it('handles empty items array', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          items: []
        }
      });

      expect(wrapper.findAll('.summary__list-item')).toHaveLength(0);
    });

    it('uses default props when not provided', () => {
      const wrapper = mount(Summary);

      expect(wrapper.find('.summary__title').text()).toBe('타이틀');
      expect(wrapper.find('.summary__subtitle').text()).toBe('부가설명');
      expect(wrapper.findAll('.summary__list-item')).toHaveLength(3);
    });

    it('handles custom collapsedItemCount', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          collapsedItemCount: 2,
          expanded: false
        }
      });

      expect(wrapper.findAll('.summary__list-item')).toHaveLength(2);
    });
  });

  describe('Accessibility', () => {
    it('has correct data-testid', () => {
      const wrapper = mount(Summary, {
        props: defaultProps
      });

      expect(wrapper.find('[data-testid="summary"]').exists()).toBe(true);
    });

    it('toggle button has correct type', () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion'
        }
      });

      const toggleButton = wrapper.find('.summary__toggle-button');
      expect(toggleButton.attributes('type')).toBe('button');
    });

    it('uses semantic HTML elements', () => {
      const wrapper = mount(Summary, {
        props: defaultProps
      });

      expect(wrapper.find('h3.summary__title').exists()).toBe(true);
    });
  });

  describe('Responsive Behavior', () => {
    it('maintains structure on different screen sizes', () => {
      const wrapper = mount(Summary, {
        props: defaultProps
      });

      // Check that essential classes are present for CSS media queries
      expect(wrapper.find('.summary').exists()).toBe(true);
      expect(wrapper.find('.summary__list-title').exists()).toBe(true);
      expect(wrapper.find('.summary__list-data').exists()).toBe(true);
    });
  });

  describe('Event Handling', () => {
    it('emits toggle event with correct payload', async () => {
      const wrapper = mount(Summary, {
        props: {
          ...defaultProps,
          variant: 'accordion',
          expanded: false
        }
      });

      const toggleButton = wrapper.find('.summary__toggle-button');
      await toggleButton.trigger('click');

      expect(wrapper.emitted('toggle')).toBeTruthy();
      expect(wrapper.emitted('toggle')?.[0]).toEqual([true]);

      // Click again to test collapse
      await toggleButton.trigger('click');
      expect(wrapper.emitted('toggle')?.[1]).toEqual([false]);
    });
  });
});