import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Navigation from './Navigation.vue';
import IconCsCenter from './icons/IconCsCenter.vue';

describe('Navigation', () => {
  // 공통 마운트 옵션
  const mountOptions = {
    global: {
      components: {
        IconCsCenter
      }
    }
  };

  // 헬퍼 함수: Navigation 컴포넌트 마운트
  const mountNavigation = (props = {}) => {
    return mount(Navigation, {
      ...mountOptions,
      props
    });
  };

  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mountNavigation();
      
      expect(wrapper.find('[data-testid="navigation"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('navigation');
    });

    it('기본 props로 모든 요소가 렌더링된다', () => {
      const wrapper = mountNavigation();
      
      expect(wrapper.find('.navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__title').exists()).toBe(true);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(true);
      expect(wrapper.text()).toContain('서비스 타이틀');
      expect(wrapper.text()).toContain('취소');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mountNavigation();
      
      expect(wrapper.find('[data-testid="navigation"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('title1 prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Navigation, {
        props: { title1: '주문 확인' }
      });

      expect(wrapper.text()).toContain('주문 확인');
    });

    it('previous=false일 때 이전 버튼이 렌더링되지 않는다', () => {
      const wrapper = mount(Navigation, {
        props: { previous: false }
      });

      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(false);
    });

    it('title=false일 때 제목이 렌더링되지 않는다', () => {
      const wrapper = mount(Navigation, {
        props: { title: false }
      });

      expect(wrapper.find('.navigation__title').exists()).toBe(false);
    });

    it('cs=false일 때 고객센터 아이콘이 렌더링되지 않는다', () => {
      const wrapper = mount(Navigation, {
        props: { cs: false }
      });

      const rightContainer = wrapper.find('.navigation__btn-container--right');
      const csIcon = rightContainer.findAll('.navigation__icon-container');
      expect(csIcon).toHaveLength(0);
    });

    it('cancel=false일 때 취소 텍스트가 렌더링되지 않는다', () => {
      const wrapper = mount(Navigation, {
        props: { cancel: false }
      });

      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(false);
    });

    it('aria-label props가 올바르게 적용된다', () => {
      const wrapper = mount(Navigation, {
        props: {
          previousAriaLabel: '뒤로가기',
          csAriaLabel: '문의하기',
          cancelAriaLabel: '닫기'
        }
      });

      const previousButton = wrapper.find('.navigation__btn-container--left .navigation__icon-container');
      const csButton = wrapper.find('.navigation__btn-container--right .navigation__icon-container');
      const cancelButton = wrapper.find('.navigation__cancel-text');

      expect(previousButton.attributes('aria-label')).toBe('뒤로가기');
      expect(csButton.attributes('aria-label')).toBe('문의하기');
      expect(cancelButton.attributes('aria-label')).toBe('닫기');
    });
  });

  // 모든 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    it('모든 요소가 활성화된 상태', () => {
      const wrapper = mount(Navigation, {
        props: {
          previous: true,
          title: true,
          title1: '테스트 제목',
          cs: true,
          cancel: true
        }
      });

      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__title').exists()).toBe(true);
      expect(wrapper.find('.navigation__btn-container--right .navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(true);
      expect(wrapper.text()).toContain('테스트 제목');
    });

    it('모든 요소가 비활성화된 상태', () => {
      const wrapper = mount(Navigation, {
        props: {
          previous: false,
          title: false,
          cs: false,
          cancel: false
        }
      });

      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(false);
      expect(wrapper.find('.navigation__title').exists()).toBe(false);
      expect(wrapper.find('.navigation__btn-container--right .navigation__icon-container').exists()).toBe(false);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(false);
    });

    it('일부 요소만 활성화된 상태', () => {
      const wrapper = mount(Navigation, {
        props: {
          previous: true,
          title: true,
          title1: '부분 활성화',
          cs: false,
          cancel: true
        }
      });

      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__title').exists()).toBe(true);
      expect(wrapper.find('.navigation__btn-container--right .navigation__icon-container').exists()).toBe(false);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(true);
      expect(wrapper.text()).toContain('부분 활성화');
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('이전 버튼 클릭 시 previous 이벤트가 emit된다', async () => {
      const wrapper = mount(Navigation);
      const previousButton = wrapper.find('.navigation__btn-container--left .navigation__icon-container');

      await previousButton.trigger('click');

      expect(wrapper.emitted('previous')).toBeTruthy();
      expect(wrapper.emitted('previous')).toHaveLength(1);
      expect(wrapper.emitted('previous')![0][0]).toBeInstanceOf(Event);
    });

    it('고객센터 버튼 클릭 시 cs 이벤트가 emit된다', async () => {
      const wrapper = mount(Navigation);
      const csButton = wrapper.find('.navigation__btn-container--right .navigation__icon-container');

      await csButton.trigger('click');

      expect(wrapper.emitted('cs')).toBeTruthy();
      expect(wrapper.emitted('cs')).toHaveLength(1);
      expect(wrapper.emitted('cs')![0][0]).toBeInstanceOf(Event);
    });

    it('취소 버튼 클릭 시 cancel 이벤트가 emit된다', async () => {
      const wrapper = mount(Navigation);
      const cancelButton = wrapper.find('.navigation__cancel-text');

      await cancelButton.trigger('click');

      expect(wrapper.emitted('cancel')).toBeTruthy();
      expect(wrapper.emitted('cancel')).toHaveLength(1);
      expect(wrapper.emitted('cancel')![0][0]).toBeInstanceOf(Event);
    });

    it('키보드 Enter 키로 이벤트가 트리거된다', async () => {
      const wrapper = mount(Navigation);
      const previousButton = wrapper.find('.navigation__btn-container--left .navigation__icon-container');
      const csButton = wrapper.find('.navigation__btn-container--right .navigation__icon-container');
      const cancelButton = wrapper.find('.navigation__cancel-text');

      await previousButton.trigger('keydown.enter');
      await csButton.trigger('keydown.enter');
      await cancelButton.trigger('keydown.enter');

      expect(wrapper.emitted('previous')).toBeTruthy();
      expect(wrapper.emitted('cs')).toBeTruthy();
      expect(wrapper.emitted('cancel')).toBeTruthy();
    });

    it('키보드 Space 키로 이벤트가 트리거된다', async () => {
      const wrapper = mount(Navigation);
      const previousButton = wrapper.find('.navigation__btn-container--left .navigation__icon-container');
      const csButton = wrapper.find('.navigation__btn-container--right .navigation__icon-container');
      const cancelButton = wrapper.find('.navigation__cancel-text');

      await previousButton.trigger('keydown.space');
      await csButton.trigger('keydown.space');
      await cancelButton.trigger('keydown.space');

      expect(wrapper.emitted('previous')).toBeTruthy();
      expect(wrapper.emitted('cs')).toBeTruthy();
      expect(wrapper.emitted('cancel')).toBeTruthy();
    });

    it('비활성화된 요소에서는 이벤트가 emit되지 않는다', async () => {
      const wrapper = mount(Navigation, {
        props: {
          previous: false,
          cs: false,
          cancel: false
        }
      });

      // 존재하지 않는 요소들이므로 클릭할 수 없음
      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(false);
      expect(wrapper.find('.navigation__btn-container--right .navigation__icon-container').exists()).toBe(false);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(false);

      expect(wrapper.emitted('previous')).toBeFalsy();
      expect(wrapper.emitted('cs')).toBeFalsy();
      expect(wrapper.emitted('cancel')).toBeFalsy();
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('모든 상호작용 요소에 role="button"이 설정된다', () => {
      const wrapper = mount(Navigation);

      const previousButton = wrapper.find('.navigation__btn-container--left .navigation__icon-container');
      const csButton = wrapper.find('.navigation__btn-container--right .navigation__icon-container');
      const cancelButton = wrapper.find('.navigation__cancel-text');

      expect(previousButton.attributes('role')).toBe('button');
      expect(csButton.attributes('role')).toBe('button');
      expect(cancelButton.attributes('role')).toBe('button');
    });

    it('모든 상호작용 요소에 tabindex="0"이 설정된다', () => {
      const wrapper = mount(Navigation);

      const previousButton = wrapper.find('.navigation__btn-container--left .navigation__icon-container');
      const csButton = wrapper.find('.navigation__btn-container--right .navigation__icon-container');
      const cancelButton = wrapper.find('.navigation__cancel-text');

      expect(previousButton.attributes('tabindex')).toBe('0');
      expect(csButton.attributes('tabindex')).toBe('0');
      expect(cancelButton.attributes('tabindex')).toBe('0');
    });

    it('기본 aria-label이 올바르게 설정된다', () => {
      const wrapper = mount(Navigation);

      const previousButton = wrapper.find('.navigation__btn-container--left .navigation__icon-container');
      const csButton = wrapper.find('.navigation__btn-container--right .navigation__icon-container');
      const cancelButton = wrapper.find('.navigation__cancel-text');

      expect(previousButton.attributes('aria-label')).toBe('이전 페이지로 이동');
      expect(csButton.attributes('aria-label')).toBe('고객센터');
      expect(cancelButton.attributes('aria-label')).toBe('취소');
    });

    it('이전 버튼 이미지에 빈 alt 속성이 설정된다 (decorative)', () => {
      const wrapper = mount(Navigation);
      const images = wrapper.findAll('img');

      // 이전 버튼 이미지만 확인 (CS 센터는 SVG 컴포넌트)
      expect(images).toHaveLength(1);
      expect(images[0].attributes('alt')).toBe('');
    });

    it('SVG 아이콘에 접근성 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Navigation);
      const svgIcons = wrapper.findAll('svg');

      expect(svgIcons).toHaveLength(1);
      expect(svgIcons[0].attributes('role')).toBe('img');
      expect(svgIcons[0].attributes('aria-label')).toBe('고객센터');
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('루트 요소에 navigation 클래스가 적용된다', () => {
      const wrapper = mount(Navigation);
      
      expect(wrapper.classes()).toContain('navigation');
    });

    it('모든 하위 요소에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Navigation);

      expect(wrapper.find('.navigation__btn-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__btn-container--left').exists()).toBe(true);
      expect(wrapper.find('.navigation__btn-container--right').exists()).toBe(true);
      expect(wrapper.find('.navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__text-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__title').exists()).toBe(true);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(true);
    });

    it('아이콘과 텍스트 요소가 올바른 구조를 가진다', () => {
      const wrapper = mount(Navigation);

      expect(wrapper.find('.navigation__icon-wrapper').exists()).toBe(true);
      expect(wrapper.find('.navigation__icon').exists()).toBe(true);
      expect(wrapper.find('.navigation__title-text').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props 변경 시 요소가 동적으로 추가/제거된다', async () => {
      const wrapper = mount(Navigation, {
        props: { previous: true }
      });

      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(true);

      await wrapper.setProps({ previous: false });

      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(false);
    });

    it('title1 텍스트가 동적으로 변경된다', async () => {
      const wrapper = mount(Navigation, {
        props: { title1: '초기 제목' }
      });

      expect(wrapper.text()).toContain('초기 제목');

      await wrapper.setProps({ title1: '변경된 제목' });

      expect(wrapper.text()).toContain('변경된 제목');
      expect(wrapper.text()).not.toContain('초기 제목');
    });

    it('여러 props 동시 변경이 올바르게 반영된다', async () => {
      const wrapper = mount(Navigation, {
        props: {
          previous: true,
          title: true,
          cs: true,
          cancel: true
        }
      });

      // 초기 상태 확인
      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__title').exists()).toBe(true);
      expect(wrapper.find('.navigation__btn-container--right .navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(true);

      // 모든 요소 비활성화
      await wrapper.setProps({
        previous: false,
        title: false,
        cs: false,
        cancel: false
      });

      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(false);
      expect(wrapper.find('.navigation__title').exists()).toBe(false);
      expect(wrapper.find('.navigation__btn-container--right .navigation__icon-container').exists()).toBe(false);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(false);
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 제목이 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Navigation, {
        props: { title1: '' }
      });

      expect(wrapper.find('.navigation__title').exists()).toBe(true);
      expect(wrapper.find('.navigation__title-text').text()).toBe('');
    });

    it('매우 긴 제목이 전달되어도 오류가 발생하지 않는다', () => {
      const longTitle = 'A'.repeat(100);
      const wrapper = mount(Navigation, {
        props: { title1: longTitle }
      });

      expect(wrapper.text()).toContain(longTitle);
      expect(wrapper.find('.navigation__title').exists()).toBe(true);
    });

    it('특수 문자가 포함된 제목이 올바르게 렌더링된다', () => {
      const specialTitle = '주문 & 결제 < > " \' 100%';
      const wrapper = mount(Navigation, {
        props: { title1: specialTitle }
      });

      expect(wrapper.text()).toContain(specialTitle);
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Navigation, {
        props: { 
          title1: undefined,
          previous: undefined,
          title: undefined,
          cs: undefined,
          cancel: undefined
        }
      });

      expect(wrapper.text()).toContain('서비스 타이틀');
      expect(wrapper.find('.navigation__btn-container--left .navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__title').exists()).toBe(true);
      expect(wrapper.find('.navigation__btn-container--right .navigation__icon-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__cancel-text').exists()).toBe(true);
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('Navigation 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Navigation);
      
      expect(wrapper.html()).toContain('class="navigation"');
      expect(wrapper.html()).toContain('data-testid="navigation"');
      expect(wrapper.find('.navigation__text-container').exists()).toBe(true);
      expect(wrapper.find('.navigation__btn-container').exists()).toBe(true);
    });

    it('이미지와 SVG 아이콘이 올바르게 렌더링된다', () => {
      const wrapper = mountNavigation();
      const images = wrapper.findAll('img');
      const svgIcons = wrapper.findAll('svg');

      // 이전 버튼 이미지만 img 태그로 렌더링 (1개)
      expect(images).toHaveLength(1);
      expect(images[0].attributes('src')).toContain('localhost:3845');
      
      // CS 센터 아이콘은 SVG 컴포넌트로 렌더링 (1개)
      expect(svgIcons).toHaveLength(1);
      expect(svgIcons[0].attributes('viewBox')).toBe('0 0 24 24');
    });

    it('Figma 디자인과 일치하는 구조를 가진다', () => {
      const wrapper = mount(Navigation);
      
      // data-name 속성으로 Figma 구조 매칭 확인
      expect(wrapper.find('[data-name="Btn"]').exists()).toBe(true);
      expect(wrapper.find('[data-name="Text"]').exists()).toBe(true);
    });
  });

  // 다국어/접근성 추가 테스트
  describe('다국어 및 접근성 확장 테스트', () => {
    it('영어 제목이 올바르게 렌더링된다', () => {
      const wrapper = mount(Navigation, {
        props: { title1: 'Service Title' }
      });

      expect(wrapper.text()).toContain('Service Title');
    });

    it('이모지가 포함된 제목이 올바르게 렌더링된다', () => {
      const wrapper = mount(Navigation, {
        props: { title1: '🛒 쇼핑몰' }
      });

      expect(wrapper.text()).toContain('🛒 쇼핑몰');
    });

    it('키보드 내비게이션 순서가 올바르다', () => {
      const wrapper = mount(Navigation);
      const focusableElements = wrapper.findAll('[tabindex="0"]');

      expect(focusableElements).toHaveLength(3); // previous, cs, cancel
      expect(focusableElements[0].classes()).toContain('navigation__icon-container');
      expect(focusableElements[1].classes()).toContain('navigation__icon-container');
      expect(focusableElements[2].classes()).toContain('navigation__cancel-text');
    });
  });
});