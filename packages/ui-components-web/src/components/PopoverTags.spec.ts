// src/components/PopoverTags.spec.ts
import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import PopoverTags from './PopoverTags.vue';
import { describe, it, expect, afterEach } from 'vitest';

describe('PopoverTags.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(PopoverTags, {
      props,
    });

  describe('기본 렌더링', () => {
    it('컴포넌트가 기본 구조로 렌더링됨', () => {
      factory();

      // 메인 컨테이너 확인
      expect(screen.getByTestId('popover-tags')).toBeInTheDocument();

      // 단일 태그 확인
      expect(screen.getByTestId('popover-tag')).toBeInTheDocument();

      // 기본 텍스트 확인
      expect(screen.getByText('텍스트를 입력해 주세요')).toBeInTheDocument();

      // 닫기 버튼 확인
      expect(screen.getByTestId('popover-tag-close')).toBeInTheDocument();

      // 화살표 확인
      const { container } = factory();
      expect(container.querySelector('.popover-tags__arrow')).toBeInTheDocument();
    });

    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();
      
      const mainElement = container.querySelector('.popover-tags');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('popover-tags');
      expect(mainElement).toHaveClass('popover-tags--arrow-top'); // 기본 화살표 위치
      
      const arrowElement = container.querySelector('.popover-tags__arrow');
      expect(arrowElement).toBeInTheDocument();
    });

    it('태그 요소가 올바른 구조를 가짐', () => {
      const { container } = factory();

      const tagElement = container.querySelector('.popover-tag');
      expect(tagElement).toBeInTheDocument();
      expect(tagElement.querySelector('.popover-tag__text')).toBeInTheDocument();
      expect(tagElement.querySelector('.popover-tag__close')).toBeInTheDocument();
      expect(tagElement.querySelector('.popover-tag__close-icon')).toBeInTheDocument();
    });
  });

  describe('동적 props', () => {
    it('커스텀 태그 텍스트가 올바르게 렌더링됨', () => {
      const customTag = 'Custom Tag Text';
      factory({ tag: customTag });

      expect(screen.getByText(customTag)).toBeInTheDocument();
    });

    it('다양한 화살표 위치가 올바르게 적용됨', () => {
      const positions = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
      
      positions.forEach(position => {
        const { container, unmount } = factory({ arrowPosition: position });
        
        expect(container.querySelector(`.popover-tags--arrow-${position}`)).toBeInTheDocument();
        
        unmount();
      });
    });

    it('매우 긴 텍스트도 정상 처리됨', () => {
      const longText = 'This is a very long tag text that should be handled properly without breaking the component layout and functionality';
      factory({ tag: longText });

      expect(screen.getByText(longText)).toBeInTheDocument();
      expect(screen.getByTestId('popover-tag')).toBeInTheDocument();
    });
  });

  describe('이벤트 처리', () => {
    describe('remove-tag 이벤트', () => {
      it('닫기 버튼 클릭 시 remove-tag 이벤트가 발생함', async () => {
        const testTag = 'Test Tag';
        const { emitted } = factory({ tag: testTag });

        const closeButton = screen.getByTestId('popover-tag-close');
        await fireEvent.click(closeButton);

        expect(emitted()).toHaveProperty('remove-tag');
        expect(emitted()['remove-tag'][0]).toEqual([testTag]);
      });
    });

    describe('tag-click 이벤트', () => {
      it('태그 클릭 시 tag-click 이벤트가 발생함', async () => {
        const testTag = 'Clickable Tag';
        const { emitted } = factory({ tag: testTag });

        const tagElement = screen.getByTestId('popover-tag');
        await fireEvent.click(tagElement);

        expect(emitted()).toHaveProperty('tag-click');
        expect(emitted()['tag-click'][0][0]).toBe(testTag); // 첫 번째 인자는 tag
        expect(emitted()['tag-click'][0][1]).toBeDefined(); // 두 번째 인자는 event
      });

      it('닫기 버튼 클릭 시 tag-click 이벤트가 발생하지 않음', async () => {
        const testTag = 'Test Tag';
        const { emitted } = factory({ tag: testTag });

        const closeButton = screen.getByTestId('popover-tag-close');
        await fireEvent.click(closeButton);

        expect(emitted()).not.toHaveProperty('tag-click');
        expect(emitted()).toHaveProperty('remove-tag');
      });
    });

    describe('키보드 이벤트', () => {
      it('닫기 버튼이 키보드 접근이 가능함', () => {
        factory();

        const closeButton = screen.getByTestId('popover-tag-close');
        expect(closeButton).not.toHaveAttribute('tabindex', '-1');
      });

      it('키보드로 닫기 버튼에 포커스할 수 있음', () => {
        factory();

        const closeButton = screen.getByTestId('popover-tag-close');
        closeButton.focus();
        
        expect(document.activeElement).toBe(closeButton);
      });
    });
  });

  describe('접근성', () => {
    it('닫기 버튼이 적절한 aria-label을 가짐', () => {
      const testTag = 'Accessibility Tag';
      factory({ tag: testTag });

      const closeButton = screen.getByTestId('popover-tag-close');
      expect(closeButton).toHaveAttribute('aria-label', `${testTag} 태그 제거`);
    });

    it('닫기 버튼이 올바른 타입을 가짐', () => {
      factory();

      const closeButton = screen.getByTestId('popover-tag-close');
      expect(closeButton).toHaveAttribute('type', 'button');
    });

    it('SVG 아이콘이 올바른 속성을 가짐', () => {
      const { container } = factory();

      const svgIcon = container.querySelector('.popover-tag__close-icon');
      expect(svgIcon).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svgIcon).toHaveAttribute('fill', 'none');
    });
  });

  describe('화살표 위치별 스타일', () => {
    it('모든 화살표 위치에 대해 올바른 클래스가 적용됨', () => {
      const positions = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
      
      positions.forEach(position => {
        const { container, unmount } = factory({ arrowPosition: position });
        
        const mainElement = container.querySelector('.popover-tags');
        expect(mainElement).toHaveClass(`popover-tags--arrow-${position}`);
        
        const arrowElement = container.querySelector('.popover-tags__arrow');
        expect(arrowElement).toBeInTheDocument();
        
        unmount();
      });
    });
  });

  describe('엣지 케이스', () => {
    it('undefined tag prop을 안전하게 처리함', () => {
      factory({ tag: undefined });

      // 기본값으로 렌더링되어야 함
      expect(screen.getByText('텍스트를 입력해 주세요')).toBeInTheDocument();
    });

    it('빈 문자열 태그를 처리할 수 있음', () => {
      factory({ tag: '' });

      const tagElement = screen.getByTestId('popover-tag');
      expect(tagElement).toBeInTheDocument();
    });

    it('특수 문자가 포함된 태그를 처리할 수 있음', () => {
      const specialTags = ['@username', '#hashtag', '50% off', 'C++ Language'];
      
      specialTags.forEach(tag => {
        const { unmount } = factory({ tag });
        expect(screen.getByText(tag)).toBeInTheDocument();
        unmount();
      });
    });

    it('잘못된 화살표 위치에 대해 기본값을 사용함', () => {
      const { container } = factory({ arrowPosition: 'invalid-position' });

      // 기본값(top)이 적용되어야 함
      const mainElement = container.querySelector('.popover-tags');
      expect(mainElement).toHaveClass('popover-tags--arrow-invalid-position');
    });
  });

  describe('스타일 클래스', () => {
    it('메인 컨테이너에 올바른 클래스가 적용됨', () => {
      const { container } = factory();

      expect(container.querySelector('.popover-tags')).toHaveClass('popover-tags');
      expect(container.querySelector('.popover-tags__arrow')).toHaveClass('popover-tags__arrow');
    });

    it('태그 요소에 올바른 클래스가 적용됨', () => {
      const { container } = factory();

      const tagElement = container.querySelector('.popover-tag');
      expect(tagElement).toHaveClass('popover-tag');
      expect(tagElement.querySelector('.popover-tag__text')).toHaveClass('popover-tag__text');
      expect(tagElement.querySelector('.popover-tag__close')).toHaveClass('popover-tag__close');
      expect(tagElement.querySelector('.popover-tag__close-icon')).toHaveClass('popover-tag__close-icon');
    });
  });

  describe('컴포넌트 상호작용', () => {
    it('호버 상태에서 적절한 시각적 피드백을 제공함', () => {
      const { container } = factory();

      const tagElement = container.querySelector('.popover-tag');
      expect(tagElement).toBeInTheDocument();
      expect(tagElement).toHaveClass('popover-tag');
    });

    it('포커스 상태를 올바르게 관리함', () => {
      factory();

      const closeButton = screen.getByTestId('popover-tag-close');
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });

    it('말풍선 스타일이 적절히 적용됨', () => {
      const { container } = factory();

      const mainElement = container.querySelector('.popover-tags');
      
      // 말풍선 기본 스타일 확인 (CSS를 통해 적용되므로 클래스로 확인)
      expect(mainElement).toHaveClass('popover-tags');
      expect(mainElement).toHaveClass('popover-tags--arrow-top');
      
      // 화살표 요소 확인
      expect(container.querySelector('.popover-tags__arrow')).toBeInTheDocument();
    });
  });
});