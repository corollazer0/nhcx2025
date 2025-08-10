import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Badge from './Badge.vue';

describe('Badge', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Badge);
      
      expect(wrapper.find('[data-testid="badge"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('badge');
    });

    it('기본 props로 dot variant를 렌더링한다', () => {
      const wrapper = mount(Badge);
      
      expect(wrapper.classes()).toContain('badge--dot');
      expect(wrapper.classes()).toContain('badge--red');
      expect(wrapper.classes()).toContain('badge--md');
      expect(wrapper.find('[data-testid="badge-dot"]').exists()).toBe(true);
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Badge);
      
      expect(wrapper.find('[data-testid="badge"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('variant prop이 올바르게 동작한다', () => {
      const dotWrapper = mount(Badge, {
        props: { variant: 'dot' }
      });
      const countWrapper = mount(Badge, {
        props: { variant: 'count', count: 5 } // count를 5로 설정하여 표시되도록 함
      });

      expect(dotWrapper.classes()).toContain('badge--dot');
      expect(dotWrapper.find('[data-testid="badge-dot"]').exists()).toBe(true);

      expect(countWrapper.classes()).toContain('badge--count');
      expect(countWrapper.find('[data-testid="badge-count"]').exists()).toBe(true);
    });

    it('color prop이 올바르게 동작한다', () => {
      const colors = ['red', 'blue', 'green', 'gray'] as const;
      
      colors.forEach(color => {
        const wrapper = mount(Badge, {
          props: { color }
        });
        
        expect(wrapper.classes()).toContain(`badge--${color}`);
      });
    });

    it('size prop이 올바르게 동작한다', () => {
      const sizes = ['sm', 'md'] as const;
      
      sizes.forEach(size => {
        const wrapper = mount(Badge, {
          props: { size }
        });
        
        expect(wrapper.classes()).toContain(`badge--${size}`);
      });
    });

    it('count prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 5 }
      });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('5');
    });

    it('maxCount를 초과할 때 "maxCount+" 형태로 표시된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 150, maxCount: 99 }
      });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('99+');
    });

    it('showZero가 false일 때 count 0은 표시되지 않는다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 0, showZero: false }
      });

      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(false);
    });

    it('showZero가 true일 때 count 0이 표시된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 0, showZero: true }
      });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('0');
    });
  });

  // Variant 테스트
  describe('Variant 테스트', () => {
    it('dot variant에서는 dot 요소만 렌더링된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'dot' }
      });

      expect(wrapper.find('[data-testid="badge-dot"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(false);
    });

    it('count variant에서는 count 요소만 렌더링된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 1 }
      });

      expect(wrapper.find('[data-testid="badge-dot"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(true);
    });
  });

  // Count 로직 테스트
  describe('Count 로직 테스트', () => {
    it('count가 1~99 사이일 때 그대로 표시된다', () => {
      const testCounts = [1, 5, 10, 50, 99];
      
      testCounts.forEach(count => {
        const wrapper = mount(Badge, {
          props: { variant: 'count', count }
        });
        
        expect(wrapper.find('[data-testid="badge-count"]').text()).toBe(count.toString());
      });
    });

    it('count가 maxCount를 초과할 때 올바르게 표시된다', () => {
      const testCases = [
        { count: 100, maxCount: 99, expected: '99+' },
        { count: 1000, maxCount: 99, expected: '99+' },
        { count: 200, maxCount: 999, expected: '200' },
        { count: 1500, maxCount: 999, expected: '999+' }
      ];
      
      testCases.forEach(({ count, maxCount, expected }) => {
        const wrapper = mount(Badge, {
          props: { variant: 'count', count, maxCount }
        });
        
        expect(wrapper.find('[data-testid="badge-count"]').text()).toBe(expected);
      });
    });

    it('count가 음수일 때 표시되지 않는다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: -5 }
      });

      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(false);
    });
  });

  // 모든 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const variants = ['dot', 'count'] as const;
    const colors = ['red', 'blue', 'green', 'gray'] as const;
    const sizes = ['sm', 'md'] as const;

    variants.forEach(variant => {
      colors.forEach(color => {
        sizes.forEach(size => {
          it(`${variant} + ${color} + ${size} 조합이 올바르게 렌더링된다`, () => {
            const props = variant === 'count' 
              ? { variant, color, size, count: 5 } 
              : { variant, color, size };
              
            const wrapper = mount(Badge, { props });

            expect(wrapper.classes()).toContain(`badge--${variant}`);
            expect(wrapper.classes()).toContain(`badge--${color}`);
            expect(wrapper.classes()).toContain(`badge--${size}`);
          });
        });
      });
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 필수 클래스가 적용된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', color: 'blue', size: 'sm', count: 10 }
      });

      expect(wrapper.classes()).toEqual([
        'badge',
        'badge--count',
        'badge--blue',
        'badge--sm',
        'badge--show'
      ]);
    });

    it('dot variant에서 올바른 요소 클래스가 적용된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'dot' }
      });
      
      expect(wrapper.find('.badge__dot').exists()).toBe(true);
    });

    it('count variant에서 올바른 요소 클래스가 적용된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 5 }
      });
      
      expect(wrapper.find('.badge__count').exists()).toBe(true);
      expect(wrapper.find('.badge__count-text').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props가 변경되면 올바른 variant가 렌더링된다', async () => {
      const wrapper = mount(Badge, {
        props: { variant: 'dot' }
      });

      expect(wrapper.find('[data-testid="badge-dot"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(false);

      await wrapper.setProps({ variant: 'count', count: 5 });

      expect(wrapper.find('[data-testid="badge-dot"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(true);
    });

    it('count가 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 5 }
      });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('5');

      await wrapper.setProps({ count: 10 });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('10');
    });

    it('maxCount가 변경되면 표시가 올바르게 업데이트된다', async () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 150, maxCount: 99 }
      });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('99+');

      await wrapper.setProps({ maxCount: 999 });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('150');
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('count가 0이고 showZero가 false일 때 표시되지 않는다', () => {
      const wrapper = mount(Badge, {
        props: { 
          variant: 'count',
          count: 0,
          showZero: false
        }
      });

      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(false);
    });

    it('count가 매우 큰 수일 때 올바르게 처리된다', () => {
      const wrapper = mount(Badge, {
        props: { 
          variant: 'count',
          count: 999999,
          maxCount: 999
        }
      });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('999+');
    });

    it('count가 NaN일 때 표시되지 않는다', () => {
      const wrapper = mount(Badge, {
        props: { 
          variant: 'count',
          count: NaN
        }
      });

      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(false);
    });

    it('count가 소수일 때 정수로 표시된다', () => {
      const wrapper = mount(Badge, {
        props: { 
          variant: 'count',
          count: 5.7
        }
      });

      expect(wrapper.find('[data-testid="badge-count"]').text()).toBe('5');
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Badge, {
        props: { 
          variant: undefined,
          color: undefined,
          size: undefined,
          count: undefined,
          maxCount: undefined,
          showZero: undefined
        }
      });

      expect(wrapper.classes()).toContain('badge--dot');
      expect(wrapper.classes()).toContain('badge--red');
      expect(wrapper.classes()).toContain('badge--md');
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('badge 요소에 적절한 data-testid가 설정된다', () => {
      const wrapper = mount(Badge);
      
      expect(wrapper.find('[data-testid="badge"]').exists()).toBe(true);
    });

    it('dot variant에 적절한 data-testid가 설정된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'dot' }
      });
      
      expect(wrapper.find('[data-testid="badge-dot"]').exists()).toBe(true);
    });

    it('count variant에 적절한 data-testid가 설정된다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 5 }
      });
      
      expect(wrapper.find('[data-testid="badge-count"]').exists()).toBe(true);
    });

    it('count 텍스트가 올바른 구조를 가진다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 5 }
      });
      
      expect(wrapper.find('.badge__count-text').exists()).toBe(true);
      expect(wrapper.find('.badge__count-text').text()).toBe('5');
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('badge 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Badge);
      
      expect(wrapper.html()).toContain('<div');
      expect(wrapper.find('.badge__dot').exists()).toBe(true);
      expect(wrapper.html()).toContain('data-testid="badge"');
    });

    it('count variant에서 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Badge, {
        props: { variant: 'count', count: 5 }
      });
      
      expect(wrapper.find('.badge__count').exists()).toBe(true);
      expect(wrapper.find('.badge__count-text').exists()).toBe(true);
    });

    it('각 variant별 고유한 클래스가 적용된다', () => {
      const dotWrapper = mount(Badge, { props: { variant: 'dot' } });
      const countWrapper = mount(Badge, { props: { variant: 'count', count: 1 } });
      
      expect(dotWrapper.classes()).toContain('badge--dot');
      expect(dotWrapper.classes()).not.toContain('badge--count');
      
      expect(countWrapper.classes()).toContain('badge--count');
      expect(countWrapper.classes()).not.toContain('badge--dot');
    });
  });

  // 반응형 테스트
  describe('반응형 스타일 테스트', () => {
    it('모든 사이즈에서 올바르게 렌더링된다', () => {
      const sizes = ['sm', 'md'] as const;
      
      sizes.forEach(size => {
        const dotWrapper = mount(Badge, {
          props: { variant: 'dot', size }
        });
        const countWrapper = mount(Badge, {
          props: { variant: 'count', count: 5, size }
        });
        
        expect(dotWrapper.classes()).toContain(`badge--${size}`);
        expect(countWrapper.classes()).toContain(`badge--${size}`);
      });
    });

    it('모든 색상에서 올바르게 렌더링된다', () => {
      const colors = ['red', 'blue', 'green', 'gray'] as const;
      
      colors.forEach(color => {
        const wrapper = mount(Badge, {
          props: { variant: 'count', count: 5, color }
        });
        
        expect(wrapper.classes()).toContain(`badge--${color}`);
      });
    });
  });
});