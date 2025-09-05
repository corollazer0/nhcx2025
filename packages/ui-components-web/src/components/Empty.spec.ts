import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Empty from './Empty.vue';

describe('Empty', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Empty);
      
      expect(wrapper.find('[data-testid="empty"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('empty');
    });

    it('기본 props로 아이콘과 메시지가 표시된다', () => {
      const wrapper = mount(Empty);
      
      expect(wrapper.find('[data-testid="empty-icon"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="empty-message"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="empty-message"]').text()).toBe('조회 결과가 없습니다.');
    });

    it('기본 CSS 클래스가 올바르게 적용된다', () => {
      const wrapper = mount(Empty);
      
      expect(wrapper.classes()).toContain('empty');
      expect(wrapper.classes()).toContain('empty--default');
    });

    it('점선 테두리가 렌더링된다', () => {
      const wrapper = mount(Empty);
      
      expect(wrapper.find('.empty__border').exists()).toBe(true);
      expect(wrapper.find('.empty__border').attributes('aria-hidden')).toBe('true');
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('iconNoData prop이 false일 때 아이콘이 표시되지 않는다', () => {
      const wrapper = mount(Empty, {
        props: { iconNoData: false }
      });
      
      expect(wrapper.find('[data-testid="empty-icon"]').exists()).toBe(false);
    });

    it('prop2Line이 false일 때 메시지가 표시되지 않는다', () => {
      const wrapper = mount(Empty, {
        props: { prop2Line: false }
      });
      
      expect(wrapper.find('[data-testid="empty-message"]').exists()).toBe(false);
    });

    it('iconNoData가 true일 때 아이콘이 표시된다', () => {
      const wrapper = mount(Empty, {
        props: { iconNoData: true }
      });
      
      expect(wrapper.find('[data-testid="empty-icon"]').exists()).toBe(true);
      
      const iconImage = wrapper.find('.empty__icon-image');
      expect(iconImage.exists()).toBe(true);
      expect(iconImage.attributes('role')).toBe('presentation');
      expect(iconImage.attributes('alt')).toBe('');
    });

    it('커스텀 message prop이 올바르게 표시된다', () => {
      const customMessage = '검색 결과를 찾을 수 없습니다.';
      const wrapper = mount(Empty, {
        props: { message: customMessage }
      });
      
      expect(wrapper.find('[data-testid="empty-message"]').text()).toBe(customMessage);
    });
  });

  // 상태별 렌더링 테스트
  describe('상태별 렌더링', () => {
    it('아이콘과 메시지가 모두 표시되는 기본 상태', () => {
      const wrapper = mount(Empty, {
        props: {
          iconNoData: true,
          prop2Line: true
        }
      });
      
      expect(wrapper.find('[data-testid="empty-icon"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="empty-message"]').exists()).toBe(true);
    });

    it('아이콘만 표시되는 상태', () => {
      const wrapper = mount(Empty, {
        props: {
          iconNoData: true,
          prop2Line: false
        }
      });
      
      expect(wrapper.find('[data-testid="empty-icon"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="empty-message"]').exists()).toBe(false);
    });

    it('메시지만 표시되는 상태', () => {
      const wrapper = mount(Empty, {
        props: {
          iconNoData: false,
          prop2Line: true
        }
      });
      
      expect(wrapper.find('[data-testid="empty-icon"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="empty-message"]').exists()).toBe(true);
    });

    it('아이콘과 메시지가 모두 숨겨지는 상태', () => {
      const wrapper = mount(Empty, {
        props: {
          iconNoData: false,
          prop2Line: false
        }
      });
      
      expect(wrapper.find('[data-testid="empty-icon"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="empty-message"]').exists()).toBe(false);
    });
  });

  // 구조 및 접근성 테스트
  describe('구조 및 접근성', () => {
    it('올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Empty);
      
      expect(wrapper.find('.empty__container').exists()).toBe(true);
      expect(wrapper.find('.empty__text').exists()).toBe(true);
    });

    it('아이콘 이미지가 적절한 접근성 속성을 가진다', () => {
      const wrapper = mount(Empty, {
        props: { iconNoData: true }
      });
      
      const iconImage = wrapper.find('.empty__icon-image');
      expect(iconImage.attributes('role')).toBe('presentation');
      expect(iconImage.attributes('alt')).toBe('');
    });

    it('점선 테두리가 스크린 리더에서 숨겨진다', () => {
      const wrapper = mount(Empty);
      
      const border = wrapper.find('.empty__border');
      expect(border.attributes('aria-hidden')).toBe('true');
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스', () => {
    it('기본 CSS 클래스가 올바르게 적용된다', () => {
      const wrapper = mount(Empty);
      
      expect(wrapper.classes()).toContain('empty');
      expect(wrapper.classes()).toContain('empty--default');
    });

    it('내부 요소들이 올바른 클래스를 가진다', () => {
      const wrapper = mount(Empty);
      
      expect(wrapper.find('.empty__container').exists()).toBe(true);
      expect(wrapper.find('.empty__icon-wrapper').exists()).toBe(true);
      expect(wrapper.find('.empty__icon').exists()).toBe(true);
      expect(wrapper.find('.empty__text').exists()).toBe(true);
      expect(wrapper.find('.empty__message').exists()).toBe(true);
      expect(wrapper.find('.empty__border').exists()).toBe(true);
    });
  });

  // 이미지 리소스 테스트
  describe('이미지 리소스', () => {
    it('아이콘 이미지 src가 올바르게 설정된다', () => {
      const wrapper = mount(Empty, {
        props: { iconNoData: true }
      });
      
      const iconImage = wrapper.find('.empty__icon-image');
      expect(iconImage.attributes('src')).toBe('http://localhost:3845/assets/dce70583c834e69711fcea795eac3fa7de33b34a.svg');
    });
  });

  // Props 기본값 테스트
  describe('Props 기본값', () => {
    it('모든 props가 올바른 기본값을 가진다', () => {
      const wrapper = mount(Empty);
      
      // iconNoData: true (기본값) - 아이콘 표시됨
      expect(wrapper.find('[data-testid="empty-icon"]').exists()).toBe(true);
      
      // prop2Line: true (기본값) - 메시지 표시됨
      expect(wrapper.find('[data-testid="empty-message"]').exists()).toBe(true);
      
      // message: '조회 결과가 없습니다.' (기본값)
      expect(wrapper.find('[data-testid="empty-message"]').text()).toBe('조회 결과가 없습니다.');
    });

    it('prop1Line과 textButton의 기본값이 false이다', () => {
      const wrapper = mount(Empty);
      
      // 현재 이 props들은 UI에 직접적인 영향을 주지 않지만 미래 확장을 위해 정의됨
      expect(wrapper.vm.prop1Line).toBe(false);
      expect(wrapper.vm.textButton).toBe(false);
    });

    it('스타일 variant props의 기본값이 올바르다', () => {
      const wrapper = mount(Empty);
      
      expect(wrapper.vm.variant).toBe('default');
      expect(wrapper.vm.iconSize).toBe('small');
      expect(wrapper.vm.fontSize).toBe('small');
    });
  });

  // Style variant 테스트
  describe('Style Variants', () => {
    it('variant prop에 따라 올바른 CSS 클래스가 적용된다', () => {
      const wrapperDefault = mount(Empty, {
        props: { variant: 'default' }
      });
      const wrapperLarge = mount(Empty, {
        props: { variant: 'large' }
      });
      
      expect(wrapperDefault.classes()).toContain('empty--default');
      expect(wrapperLarge.classes()).toContain('empty--large');
    });

    it('iconSize prop에 따라 올바른 CSS 클래스가 적용된다', () => {
      const wrapperSmall = mount(Empty, {
        props: { iconSize: 'small' }
      });
      const wrapperLarge = mount(Empty, {
        props: { iconSize: 'large' }
      });
      
      expect(wrapperSmall.classes()).toContain('empty--icon-small');
      expect(wrapperLarge.classes()).toContain('empty--icon-large');
    });

    it('fontSize prop에 따라 올바른 CSS 클래스가 적용된다', () => {
      const wrapperSmall = mount(Empty, {
        props: { fontSize: 'small' }
      });
      const wrapperMedium = mount(Empty, {
        props: { fontSize: 'medium' }
      });
      const wrapperLarge = mount(Empty, {
        props: { fontSize: 'large' }
      });
      
      expect(wrapperSmall.classes()).toContain('empty--font-small');
      expect(wrapperMedium.classes()).toContain('empty--font-medium');
      expect(wrapperLarge.classes()).toContain('empty--font-large');
    });

    it('iconSize에 따라 올바른 아이콘이 사용된다', () => {
      const wrapperSmall = mount(Empty, {
        props: { iconNoData: true, iconSize: 'small' }
      });
      const wrapperLarge = mount(Empty, {
        props: { iconNoData: true, iconSize: 'large' }
      });
      
      const iconSmall = wrapperSmall.find('.empty__icon-image');
      const iconLarge = wrapperLarge.find('.empty__icon-image');
      
      expect(iconSmall.attributes('src')).toBe('http://localhost:3845/assets/dce70583c834e69711fcea795eac3fa7de33b34a.svg');
      expect(iconLarge.attributes('src')).toBe('http://localhost:3845/assets/b0c5fe50850ecc288d8aed808cd785edd311050f.svg');
    });
  });
});