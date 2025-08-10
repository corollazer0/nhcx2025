import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Button);
      
      expect(wrapper.find('[data-testid="button"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('button');
    });

    it('기본 props로 lg primary default 버튼을 렌더링한다', () => {
      const wrapper = mount(Button);
      
      expect(wrapper.classes()).toContain('button--primary');
      expect(wrapper.classes()).toContain('button--lg');
      expect(wrapper.classes()).toContain('button--default');
      expect(wrapper.text()).toBe('버튼명');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Button);
      
      expect(wrapper.find('[data-testid="button"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('text prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Button, {
        props: { text: '확인' }
      });

      expect(wrapper.text()).toBe('확인');
    });

    it('smallText prop이 xs와 sm 사이즈에서 올바르게 렌더링된다', () => {
      const wrapperXs = mount(Button, {
        props: { size: 'xs', smallText: '버튼' }
      });
      const wrapperSm = mount(Button, {
        props: { size: 'sm', smallText: '버튼' }
      });

      expect(wrapperXs.text()).toBe('버튼');
      expect(wrapperSm.text()).toBe('버튼');
    });

    it('text prop이 rg, md, lg 사이즈에서 올바르게 렌더링된다', () => {
      const wrapperRg = mount(Button, {
        props: { size: 'rg', text: '버튼명' }
      });
      const wrapperMd = mount(Button, {
        props: { size: 'md', text: '버튼명' }
      });
      const wrapperLg = mount(Button, {
        props: { size: 'lg', text: '버튼명' }
      });

      expect(wrapperRg.text()).toBe('버튼명');
      expect(wrapperMd.text()).toBe('버튼명');
      expect(wrapperLg.text()).toBe('버튼명');
    });

    it('size prop이 올바르게 동작한다', () => {
      const sizes = ['xs', 'sm', 'rg', 'md', 'lg'] as const;
      
      sizes.forEach(size => {
        const wrapper = mount(Button, {
          props: { size }
        });
        
        expect(wrapper.classes()).toContain(`button--${size}`);
      });
    });

    it('type prop이 올바르게 동작한다', () => {
      const types = ['primary', 'secondary', 'tertiary'] as const;
      
      types.forEach(type => {
        const wrapper = mount(Button, {
          props: { type }
        });
        
        expect(wrapper.classes()).toContain(`button--${type}`);
      });
    });

    it('state prop이 올바르게 동작한다', () => {
      const states = ['default', 'pressed', 'disabled'] as const;
      
      states.forEach(state => {
        const wrapper = mount(Button, {
          props: { state }
        });
        
        expect(wrapper.classes()).toContain(`button--${state}`);
      });
    });
  });

  // 모든 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const sizes = ['xs', 'sm', 'rg', 'md', 'lg'] as const;
    const types = ['primary', 'secondary', 'tertiary'] as const;
    const states = ['default', 'pressed', 'disabled'] as const;

    sizes.forEach(size => {
      types.forEach(type => {
        states.forEach(state => {
          it(`${size} + ${type} + ${state} 조합이 올바르게 렌더링된다`, () => {
            const wrapper = mount(Button, {
              props: { size, type, state }
            });

            expect(wrapper.classes()).toContain(`button--${size}`);
            expect(wrapper.classes()).toContain(`button--${type}`);
            expect(wrapper.classes()).toContain(`button--${state}`);
          });
        });
      });
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('버튼 클릭 시 click 이벤트가 emit된다', async () => {
      const wrapper = mount(Button);

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('disabled 상태에서는 클릭 이벤트가 emit되지 않는다', async () => {
      const wrapper = mount(Button, {
        props: { state: 'disabled' }
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeFalsy();
    });

    it('이벤트 핸들러에 MouseEvent 객체가 전달된다', async () => {
      const wrapper = mount(Button);

      await wrapper.trigger('click');

      const emittedEvents = wrapper.emitted('click');
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents![0][0]).toBeInstanceOf(Event);
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('button 요소에 type="button" 속성이 설정된다', () => {
      const wrapper = mount(Button);
      
      expect(wrapper.find('button').attributes('type')).toBe('button');
    });

    it('disabled 상태에서 disabled 속성이 설정된다', () => {
      const wrapper = mount(Button, {
        props: { state: 'disabled' }
      });
      
      expect(wrapper.find('button').attributes('disabled')).toBe('');
    });

    it('default와 pressed 상태에서는 disabled 속성이 설정되지 않는다', () => {
      const wrapperDefault = mount(Button, {
        props: { state: 'default' }
      });
      const wrapperPressed = mount(Button, {
        props: { state: 'pressed' }
      });
      
      expect(wrapperDefault.find('button').attributes('disabled')).toBeUndefined();
      expect(wrapperPressed.find('button').attributes('disabled')).toBeUndefined();
    });

    it('키보드 내비게이션이 가능하다', () => {
      const wrapper = mount(Button);
      const button = wrapper.find('button');
      
      expect(button.element.tagName).toBe('BUTTON');
      expect(button.attributes('tabindex')).toBeUndefined(); // 기본값 사용
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 필수 클래스가 적용된다', () => {
      const wrapper = mount(Button, {
        props: { size: 'md', type: 'secondary', state: 'pressed' }
      });

      expect(wrapper.classes()).toEqual([
        'button',
        'button--secondary',
        'button--md',
        'button--pressed'
      ]);
    });

    it('버튼 텍스트에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Button);
      
      expect(wrapper.find('.button__text').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props가 변경되면 올바른 클래스가 적용된다', async () => {
      const wrapper = mount(Button, {
        props: { type: 'primary' }
      });

      expect(wrapper.classes()).toContain('button--primary');

      await wrapper.setProps({ type: 'secondary' });

      expect(wrapper.classes()).toContain('button--secondary');
      expect(wrapper.classes()).not.toContain('button--primary');
    });

    it('텍스트가 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Button, {
        props: { text: '확인' }
      });

      expect(wrapper.text()).toBe('확인');

      await wrapper.setProps({ text: '취소' });

      expect(wrapper.text()).toBe('취소');
    });

    it('사이즈 변경시 텍스트 소스가 올바르게 변경된다', async () => {
      const wrapper = mount(Button, {
        props: { size: 'lg', text: '버튼명', smallText: '버튼' }
      });

      expect(wrapper.text()).toBe('버튼명');

      await wrapper.setProps({ size: 'xs' });

      expect(wrapper.text()).toBe('버튼');
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Button, {
        props: { 
          text: '',
          smallText: ''
        }
      });

      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('매우 긴 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const longText = 'A'.repeat(100);
      const wrapper = mount(Button, {
        props: { text: longText }
      });

      expect(wrapper.text()).toBe(longText);
    });

    it('특수 문자가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const specialText = '확인 & 저장 < > " \' 100%';
      const wrapper = mount(Button, {
        props: { text: specialText }
      });

      expect(wrapper.text()).toBe(specialText);
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Button, {
        props: { 
          text: undefined,
          smallText: undefined,
          size: undefined,
          type: undefined,
          state: undefined
        }
      });

      expect(wrapper.text()).toBe('버튼명');
      expect(wrapper.classes()).toContain('button--primary');
      expect(wrapper.classes()).toContain('button--lg');
      expect(wrapper.classes()).toContain('button--default');
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('버튼 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Button);
      
      expect(wrapper.html()).toContain('<button');
      expect(wrapper.find('.button__text').exists()).toBe(true);
      expect(wrapper.html()).toContain('data-testid="button"');
    });

    it('각 사이즈별 고유한 클래스가 적용된다', () => {
      const sizes = ['xs', 'sm', 'rg', 'md', 'lg'] as const;
      
      sizes.forEach(size => {
        const wrapper = mount(Button, { props: { size } });
        
        expect(wrapper.classes()).toContain(`button--${size}`);
        
        // 다른 사이즈 클래스는 포함하지 않아야 함
        const otherSizes = sizes.filter(s => s !== size);
        otherSizes.forEach(otherSize => {
          expect(wrapper.classes()).not.toContain(`button--${otherSize}`);
        });
      });
    });
  });

  // 반응형 테스트 (스타일이 적용되는지만 확인)
  describe('반응형 스타일 테스트', () => {
    it('모든 사이즈에서 텍스트가 올바르게 표시된다', () => {
      const sizes = ['xs', 'sm', 'rg', 'md', 'lg'] as const;
      
      sizes.forEach(size => {
        const wrapper = mount(Button, {
          props: { 
            size,
            text: '테스트 버튼',
            smallText: '테스트'
          }
        });
        
        const expectedText = (size === 'xs' || size === 'sm') ? '테스트' : '테스트 버튼';
        expect(wrapper.text()).toBe(expectedText);
      });
    });
  });
});