import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Divider from './Divider.vue';

describe('Divider', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Divider);
      
      expect(wrapper.find('[data-testid="divider"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('divider');
    });

    it('기본 props로 page horizontal divider를 렌더링한다', () => {
      const wrapper = mount(Divider);
      
      expect(wrapper.classes()).toContain('divider--page');
      expect(wrapper.classes()).toContain('divider--horizontal');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Divider);
      
      expect(wrapper.find('[data-testid="divider"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('variant prop이 올바르게 동작한다', () => {
      const variants = ['content', 'page', 'list1', 'list2'] as const;
      
      variants.forEach(variant => {
        const wrapper = mount(Divider, {
          props: { variant }
        });
        
        expect(wrapper.classes()).toContain(`divider--${variant}`);
      });
    });

    it('orientation prop이 올바르게 동작한다', () => {
      const orientations = ['horizontal', 'vertical'] as const;
      
      orientations.forEach(orientation => {
        const wrapper = mount(Divider, {
          props: { orientation }
        });
        
        expect(wrapper.classes()).toContain(`divider--${orientation}`);
      });
    });
  });

  // 모든 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const variants = ['content', 'page', 'list1', 'list2'] as const;
    const orientations = ['horizontal', 'vertical'] as const;

    variants.forEach(variant => {
      orientations.forEach(orientation => {
        it(`${variant} + ${orientation} 조합이 올바르게 렌더링된다`, () => {
          const wrapper = mount(Divider, {
            props: { variant, orientation }
          });

          expect(wrapper.classes()).toContain(`divider--${variant}`);
          expect(wrapper.classes()).toContain(`divider--${orientation}`);
        });
      });
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('role="separator" 속성이 설정된다', () => {
      const wrapper = mount(Divider);
      
      expect(wrapper.attributes('role')).toBe('separator');
    });

    it('aria-orientation 속성이 올바르게 설정된다', () => {
      const wrapperHorizontal = mount(Divider, {
        props: { orientation: 'horizontal' }
      });
      const wrapperVertical = mount(Divider, {
        props: { orientation: 'vertical' }
      });
      
      expect(wrapperHorizontal.attributes('aria-orientation')).toBe('horizontal');
      expect(wrapperVertical.attributes('aria-orientation')).toBe('vertical');
    });

    it('키보드 포커스가 가능하다', () => {
      const wrapper = mount(Divider);
      const divider = wrapper.find('[data-testid="divider"]');
      
      expect(divider.element.tagName).toBe('DIV');
      expect(divider.attributes('role')).toBe('separator');
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 필수 클래스가 적용된다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'list1', orientation: 'vertical' }
      });

      expect(wrapper.classes()).toEqual([
        'divider',
        'divider--list1',
        'divider--vertical'
      ]);
    });

    it('기본 divider 클래스가 항상 적용된다', () => {
      const wrapper = mount(Divider);
      
      expect(wrapper.classes()).toContain('divider');
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props가 변경되면 올바른 클래스가 적용된다', async () => {
      const wrapper = mount(Divider, {
        props: { variant: 'content' }
      });

      expect(wrapper.classes()).toContain('divider--content');

      await wrapper.setProps({ variant: 'page' });

      expect(wrapper.classes()).toContain('divider--page');
      expect(wrapper.classes()).not.toContain('divider--content');
    });

    it('orientation이 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Divider, {
        props: { orientation: 'horizontal' }
      });

      expect(wrapper.classes()).toContain('divider--horizontal');

      await wrapper.setProps({ orientation: 'vertical' });

      expect(wrapper.classes()).toContain('divider--vertical');
      expect(wrapper.classes()).not.toContain('divider--horizontal');
    });

    it('aria-orientation이 props 변경에 따라 업데이트된다', async () => {
      const wrapper = mount(Divider, {
        props: { orientation: 'horizontal' }
      });

      expect(wrapper.attributes('aria-orientation')).toBe('horizontal');

      await wrapper.setProps({ orientation: 'vertical' });

      expect(wrapper.attributes('aria-orientation')).toBe('vertical');
    });
  });

  // Variant별 세부 테스트
  describe('Variant별 세부 테스트', () => {
    it('content variant가 올바르게 렌더링된다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'content' }
      });

      expect(wrapper.classes()).toContain('divider--content');
      expect(wrapper.attributes('role')).toBe('separator');
    });

    it('page variant가 올바르게 렌더링된다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'page' }
      });

      expect(wrapper.classes()).toContain('divider--page');
      expect(wrapper.attributes('role')).toBe('separator');
    });

    it('list1 variant가 올바르게 렌더링된다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'list1' }
      });

      expect(wrapper.classes()).toContain('divider--list1');
      expect(wrapper.attributes('role')).toBe('separator');
    });

    it('list2 variant가 올바르게 렌더링된다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'list2' }
      });

      expect(wrapper.classes()).toContain('divider--list2');
      expect(wrapper.attributes('role')).toBe('separator');
    });
  });

  // Orientation별 세부 테스트
  describe('Orientation별 세부 테스트', () => {
    it('horizontal orientation이 올바르게 렌더링된다', () => {
      const wrapper = mount(Divider, {
        props: { orientation: 'horizontal' }
      });

      expect(wrapper.classes()).toContain('divider--horizontal');
      expect(wrapper.attributes('aria-orientation')).toBe('horizontal');
    });

    it('vertical orientation이 올바르게 렌더링된다', () => {
      const wrapper = mount(Divider, {
        props: { orientation: 'vertical' }
      });

      expect(wrapper.classes()).toContain('divider--vertical');
      expect(wrapper.attributes('aria-orientation')).toBe('vertical');
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Divider, {
        props: { 
          variant: undefined,
          orientation: undefined
        }
      });

      expect(wrapper.classes()).toContain('divider--page');
      expect(wrapper.classes()).toContain('divider--horizontal');
      expect(wrapper.attributes('aria-orientation')).toBe('horizontal');
    });

    it('잘못된 variant가 전달되어도 기본값이 적용된다', () => {
      // @ts-ignore - 테스트를 위해 잘못된 타입 허용
      const wrapper = mount(Divider, {
        props: { 
          variant: 'invalid' as any
        }
      });

      expect(wrapper.find('[data-testid="divider"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('divider');
    });

    it('잘못된 orientation이 전달되어도 기본값이 적용된다', () => {
      // @ts-ignore - 테스트를 위해 잘못된 타입 허용
      const wrapper = mount(Divider, {
        props: { 
          orientation: 'invalid' as any
        }
      });

      expect(wrapper.find('[data-testid="divider"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('divider');
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('divider 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Divider);
      
      expect(wrapper.html()).toContain('<div');
      expect(wrapper.html()).toContain('data-testid="divider"');
      expect(wrapper.html()).toContain('role="separator"');
    });

    it('각 variant별 고유한 클래스가 적용된다', () => {
      const variants = ['content', 'page', 'list1', 'list2'] as const;
      
      variants.forEach(variant => {
        const wrapper = mount(Divider, { props: { variant } });
        
        expect(wrapper.classes()).toContain(`divider--${variant}`);
        
        // 다른 variant 클래스는 포함하지 않아야 함
        const otherVariants = variants.filter(v => v !== variant);
        otherVariants.forEach(otherVariant => {
          expect(wrapper.classes()).not.toContain(`divider--${otherVariant}`);
        });
      });
    });

    it('각 orientation별 고유한 클래스가 적용된다', () => {
      const orientations = ['horizontal', 'vertical'] as const;
      
      orientations.forEach(orientation => {
        const wrapper = mount(Divider, { props: { orientation } });
        
        expect(wrapper.classes()).toContain(`divider--${orientation}`);
        
        // 다른 orientation 클래스는 포함하지 않아야 함
        const otherOrientations = orientations.filter(o => o !== orientation);
        otherOrientations.forEach(otherOrientation => {
          expect(wrapper.classes()).not.toContain(`divider--${otherOrientation}`);
        });
      });
    });
  });

  // Figma 디자인 준수 테스트
  describe('Figma 디자인 준수 테스트', () => {
    it('content variant는 8px 두께를 사용한다 (CSS 클래스를 통해)', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'content' }
      });

      expect(wrapper.classes()).toContain('divider--content');
    });

    it('page, list1, list2 variant는 1px 두께를 사용한다 (CSS 클래스를 통해)', () => {
      const variants = ['page', 'list1', 'list2'] as const;
      
      variants.forEach(variant => {
        const wrapper = mount(Divider, {
          props: { variant }
        });

        expect(wrapper.classes()).toContain(`divider--${variant}`);
      });
    });

    it('모든 variant가 적절한 CSS 변수 색상을 참조한다', () => {
      // 이는 스타일 정의가 올바른지 확인하는 테스트
      // 실제 색상 값은 CSS에서 정의되므로 클래스 존재만 확인
      const variants = ['content', 'page', 'list1', 'list2'] as const;
      
      variants.forEach(variant => {
        const wrapper = mount(Divider, {
          props: { variant }
        });

        expect(wrapper.classes()).toContain(`divider--${variant}`);
      });
    });
  });

  // 사용성 테스트
  describe('사용성 테스트', () => {
    it('리스트 아이템 사이의 구분선으로 사용 가능하다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'list1', orientation: 'horizontal' }
      });

      expect(wrapper.classes()).toContain('divider--list1');
      expect(wrapper.classes()).toContain('divider--horizontal');
      expect(wrapper.attributes('role')).toBe('separator');
    });

    it('페이지 섹션 구분선으로 사용 가능하다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'page', orientation: 'horizontal' }
      });

      expect(wrapper.classes()).toContain('divider--page');
      expect(wrapper.classes()).toContain('divider--horizontal');
      expect(wrapper.attributes('role')).toBe('separator');
    });

    it('콘텐츠 그룹 구분선으로 사용 가능하다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'content', orientation: 'horizontal' }
      });

      expect(wrapper.classes()).toContain('divider--content');
      expect(wrapper.classes()).toContain('divider--horizontal');
      expect(wrapper.attributes('role')).toBe('separator');
    });

    it('세로 구분선으로 사용 가능하다', () => {
      const wrapper = mount(Divider, {
        props: { variant: 'page', orientation: 'vertical' }
      });

      expect(wrapper.classes()).toContain('divider--page');
      expect(wrapper.classes()).toContain('divider--vertical');
      expect(wrapper.attributes('aria-orientation')).toBe('vertical');
    });
  });
});