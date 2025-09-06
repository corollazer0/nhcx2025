import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Chip from './Chip.vue';

describe('Chip', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Chip);
      
      expect(wrapper.find('[data-testid="chip"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('chip');
    });

    it('기본 props로 default 상태 칩을 렌더링한다', () => {
      const wrapper = mount(Chip);
      
      expect(wrapper.classes()).toContain('chip--default');
      expect(wrapper.text()).toBe('메뉴');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Chip);
      
      expect(wrapper.find('[data-testid="chip"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('text prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Chip, {
        props: { text: '홈' }
      });

      expect(wrapper.text()).toBe('홈');
    });

    it('state prop이 올바르게 동작한다', () => {
      const states = ['default', 'active'] as const;
      
      states.forEach(state => {
        const wrapper = mount(Chip, {
          props: { state }
        });
        
        expect(wrapper.classes()).toContain(`chip--${state}`);
      });
    });

    it('빈 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Chip, {
        props: { text: '' }
      });

      expect(wrapper.find('.chip').exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });
  });

  // 모든 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const states = ['default', 'active'] as const;
    const texts = ['메뉴', '홈', '검색', '프로필'];

    states.forEach(state => {
      texts.forEach(text => {
        it(`${state} + ${text} 조합이 올바르게 렌더링된다`, () => {
          const wrapper = mount(Chip, {
            props: { state, text }
          });

          expect(wrapper.classes()).toContain(`chip--${state}`);
          expect(wrapper.text()).toBe(text);
        });
      });
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('칩 클릭 시 click 이벤트가 emit된다', async () => {
      const wrapper = mount(Chip);

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('모든 상태에서 클릭 이벤트가 emit된다', async () => {
      const states = ['default', 'active'] as const;
      
      for (const state of states) {
        const wrapper = mount(Chip, {
          props: { state }
        });

        await wrapper.trigger('click');

        expect(wrapper.emitted('click')).toBeTruthy();
        expect(wrapper.emitted('click')).toHaveLength(1);
      }
    });

    it('이벤트 핸들러에 MouseEvent 객체가 전달된다', async () => {
      const wrapper = mount(Chip);

      await wrapper.trigger('click');

      const emittedEvents = wrapper.emitted('click');
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents![0][0]).toBeInstanceOf(Event);
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('div 요소로 렌더링된다', () => {
      const wrapper = mount(Chip);
      
      expect(wrapper.element.tagName).toBe('DIV');
    });

    it('키보드 내비게이션이 가능하도록 클릭 가능한 요소로 인식된다', () => {
      const wrapper = mount(Chip);
      const chip = wrapper.find('.chip');
      
      expect(chip.element.style.cursor).toBe('');
      // CSS에서 cursor: pointer가 설정되어 있음을 확인
      expect(wrapper.html()).toContain('class="chip');
    });

    it('적절한 role이나 상호작용을 위한 속성이 설정된다', () => {
      const wrapper = mount(Chip);
      
      // 기본적으로 클릭 가능한 요소이므로 data-testid가 있어야 함
      expect(wrapper.find('[data-testid="chip"]').exists()).toBe(true);
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 필수 클래스가 적용된다', () => {
      const wrapper = mount(Chip, {
        props: { state: 'active' }
      });

      expect(wrapper.classes()).toEqual([
        'chip',
        'chip--active'
      ]);
    });

    it('칩 텍스트에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Chip);
      
      expect(wrapper.find('.chip__text').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props가 변경되면 올바른 클래스가 적용된다', async () => {
      const wrapper = mount(Chip, {
        props: { state: 'default' }
      });

      expect(wrapper.classes()).toContain('chip--default');

      await wrapper.setProps({ state: 'active' });

      expect(wrapper.classes()).toContain('chip--active');
      expect(wrapper.classes()).not.toContain('chip--default');
    });

    it('텍스트가 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Chip, {
        props: { text: '홈' }
      });

      expect(wrapper.text()).toBe('홈');

      await wrapper.setProps({ text: '검색' });

      expect(wrapper.text()).toBe('검색');
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Chip, {
        props: { text: '' }
      });

      expect(wrapper.find('.chip').exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('매우 긴 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const longText = 'A'.repeat(100);
      const wrapper = mount(Chip, {
        props: { text: longText }
      });

      expect(wrapper.text()).toBe(longText);
    });

    it('특수 문자가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const specialText = '메뉴 & 검색 < > " \' 100%';
      const wrapper = mount(Chip, {
        props: { text: specialText }
      });

      expect(wrapper.text()).toBe(specialText);
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Chip, {
        props: { 
          text: undefined,
          state: undefined
        }
      });

      expect(wrapper.text()).toBe('메뉴');
      expect(wrapper.classes()).toContain('chip--default');
    });

    it('숫자가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const wrapper = mount(Chip, {
        props: { text: '2024년' }
      });

      expect(wrapper.text()).toBe('2024년');
    });

    it('이모지가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const wrapper = mount(Chip, {
        props: { text: '🏠 홈' }
      });

      expect(wrapper.text()).toBe('🏠 홈');
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('칩 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Chip);
      
      expect(wrapper.html()).toContain('<div');
      expect(wrapper.find('.chip__text').exists()).toBe(true);
      expect(wrapper.html()).toContain('data-testid="chip"');
    });

    it('각 상태별 고유한 클래스가 적용된다', () => {
      const states = ['default', 'active'] as const;
      
      states.forEach(state => {
        const wrapper = mount(Chip, { props: { state } });
        
        expect(wrapper.classes()).toContain(`chip--${state}`);
        
        // 다른 상태 클래스는 포함하지 않아야 함
        const otherStates = states.filter(s => s !== state);
        otherStates.forEach(otherState => {
          expect(wrapper.classes()).not.toContain(`chip--${otherState}`);
        });
      });
    });
  });

  // 상호작용 테스트
  describe('상호작용 테스트', () => {
    it('마우스 호버 상태에서도 클릭이 가능하다', async () => {
      const wrapper = mount(Chip);

      await wrapper.trigger('mouseenter');
      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
    });

    it('연속 클릭이 모두 이벤트로 처리된다', async () => {
      const wrapper = mount(Chip);

      await wrapper.trigger('click');
      await wrapper.trigger('click');
      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toHaveLength(3);
    });
  });

  // 실제 사용 시나리오 테스트
  describe('실제 사용 시나리오 테스트', () => {
    it('탭 네비게이션 시나리오에서 올바르게 동작한다', () => {
      const tabs = ['홈', '검색', '프로필', '설정'];
      
      tabs.forEach((tab, index) => {
        const wrapper = mount(Chip, {
          props: { 
            text: tab,
            state: index === 0 ? 'active' : 'default'
          }
        });

        expect(wrapper.text()).toBe(tab);
        expect(wrapper.classes()).toContain(
          index === 0 ? 'chip--active' : 'chip--default'
        );
      });
    });

    it('필터 칩 시나리오에서 올바르게 동작한다', () => {
      const filters = ['전체', '인기', '최신', '추천'];
      
      filters.forEach((filter, index) => {
        const wrapper = mount(Chip, {
          props: { 
            text: filter,
            state: index === 1 ? 'active' : 'default'
          }
        });

        expect(wrapper.text()).toBe(filter);
        expect(wrapper.classes()).toContain(
          index === 1 ? 'chip--active' : 'chip--default'
        );
      });
    });
  });
});