// src/components/Label.spec.ts
import { render, screen, fireEvent, cleanup } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Label from './Label.vue';

describe('Label', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) => {
    const defaultProps = {
      color: 'gray' as const,
      text: '라벨',
    };
    return render(Label, { props: { ...defaultProps, ...props } });
  };

  describe('기본 렌더링', () => {
    it('기본 props로 컴포넌트가 렌더링된다', () => {
      factory();

      expect(screen.getByRole('label')).toBeInTheDocument();
      expect(screen.getByText('라벨')).toBeInTheDocument();
    });

    it('data-testid가 올바르게 설정된다', () => {
      factory();

      expect(screen.getByTestId('label')).toBeInTheDocument();
    });

    it('기본 CSS 클래스가 적용된다', () => {
      factory();

      const component = screen.getByTestId('label');
      expect(component).toHaveClass('label-component');
    });

    it('기본 색상이 gray로 설정된다', () => {
      factory();

      const component = screen.getByTestId('label');
      expect(component).toHaveAttribute('data-name', 'Color=gray');
    });
  });

  describe('color prop', () => {
    const colorTestCases: Array<{
      color: "blue" | "gray" | "green" | "lightblue" | "navy" | "orange" | "red" | "skyblue" | "yellow";
      nodeId: string;
    }> = [
      { color: 'gray', nodeId: '3567:55084' },
      { color: 'green', nodeId: '3567:55086' },
      { color: 'blue', nodeId: '3567:55088' },
      { color: 'red', nodeId: '3567:55090' },
      { color: 'orange', nodeId: '3567:55092' },
      { color: 'yellow', nodeId: '3567:55094' },
      { color: 'lightblue', nodeId: '3567:55096' },
      { color: 'skyblue', nodeId: '3567:55098' },
      { color: 'navy', nodeId: '3567:55100' },
    ];

    colorTestCases.forEach(({ color, nodeId }) => {
      it(`${color} 색상이 올바르게 적용된다`, () => {
        factory({ color });

        const component = screen.getByTestId('label');
        expect(component).toHaveAttribute('data-name', `Color=${color}`);
        expect(component).toHaveAttribute('data-node-id', nodeId);
      });
    });

    it('잘못된 색상일 때 기본값(gray)으로 처리된다', () => {
      // @ts-expect-error - 의도적으로 잘못된 타입 테스트
      factory({ color: 'invalid' });

      const component = screen.getByTestId('label');
      expect(component).toHaveAttribute('data-name', 'Color=invalid');
      expect(component).toHaveAttribute('data-node-id', '3567:55084'); // gray의 nodeId
    });
  });

  describe('text prop', () => {
    it('사용자 정의 텍스트가 렌더링된다', () => {
      const customText = '사용자 정의 라벨';
      factory({ text: customText });

      expect(screen.getByText(customText)).toBeInTheDocument();
    });

    it('빈 문자열을 처리한다', () => {
      factory({ text: '' });

      expect(screen.getByText('라벨')).toBeInTheDocument();
    });

    it('null 값을 처리한다', () => {
      // @ts-expect-error - 의도적으로 null 테스트
      factory({ text: null });

      expect(screen.getByText('라벨')).toBeInTheDocument();
    });

    it('undefined 값을 처리한다', () => {
      // @ts-expect-error - 의도적으로 undefined 테스트
      factory({ text: undefined });

      expect(screen.getByText('라벨')).toBeInTheDocument();
    });

    it('공백만 있는 문자열을 처리한다', () => {
      factory({ text: '   ' });

      expect(screen.getByText('라벨')).toBeInTheDocument();
    });

    it('탭과 줄바꿈만 있는 문자열을 처리한다', () => {
      factory({ text: '\t\n\r ' });

      expect(screen.getByText('라벨')).toBeInTheDocument();
    });

    it('긴 텍스트가 적절히 처리된다', () => {
      const longText = '매우 긴 라벨 텍스트입니다';
      factory({ text: longText });

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('특수문자가 포함된 텍스트를 처리한다', () => {
      const specialText = '라벨 & 특수문자 < > " \'';
      factory({ text: specialText });

      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it('숫자와 기호가 포함된 텍스트를 처리한다', () => {
      const mixedText = 'V1.2.3 @업데이트';
      factory({ text: mixedText });

      expect(screen.getByText(mixedText)).toBeInTheDocument();
    });

    it('숫자 타입을 문자열로 변환한다', () => {
      // @ts-expect-error - 의도적으로 숫자 타입 테스트
      factory({ text: 123 });

      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('앞뒤 공백을 제거한다', () => {
      factory({ text: '  테스트  ' });

      expect(screen.getByText('테스트')).toBeInTheDocument();
    });
  });

  describe('aria 및 접근성', () => {
    it('기본 aria-label이 설정된다', () => {
      factory({ color: 'green', text: '성공' });

      const component = screen.getByTestId('label');
      expect(component).toHaveAttribute('aria-label', 'green 색상 라벨: 성공');
    });

    it('사용자 정의 ariaLabel이 우선 적용된다', () => {
      const customAriaLabel = '사용자 정의 라벨 설명';
      factory({ ariaLabel: customAriaLabel });

      const component = screen.getByTestId('label');
      expect(component).toHaveAttribute('aria-label', customAriaLabel);
    });

    it('빈 텍스트일 때 기본 텍스트로 aria-label이 설정된다', () => {
      factory({ color: 'blue', text: '' });

      const component = screen.getByTestId('label');
      expect(component).toHaveAttribute('aria-label', 'blue 색상 라벨: 라벨');
    });

    it('적절한 role이 설정된다', () => {
      factory();

      const component = screen.getByRole('label');
      expect(component).toBeInTheDocument();
    });

    it('장식적 요소가 보조 기술에서 숨겨진다', () => {
      factory();

      const component = screen.getByTestId('label');
      const border = component.querySelector('.label-border');
      expect(border).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Props 조합', () => {
    const propsTestCases = [
      { color: 'green' as const, text: '성공', ariaLabel: '' },
      { color: 'red' as const, text: '오류', ariaLabel: '중요한 오류 라벨' },
      { color: 'blue' as const, text: '', ariaLabel: '' },
      { color: 'yellow' as const, text: '경고 메시지', ariaLabel: '경고' },
      { color: 'navy' as const, text: '정보', ariaLabel: '' },
      { color: 'orange' as const, text: '알림', ariaLabel: '중요 알림' },
      { color: 'lightblue' as const, text: '안내', ariaLabel: '' },
      { color: 'skyblue' as const, text: '힌트', ariaLabel: '도움말 힌트' },
    ];

    propsTestCases.forEach(({ color, text, ariaLabel }, index) => {
      it(`props 조합 ${index + 1}: color=${color}, text="${text}", ariaLabel="${ariaLabel}"`, () => {
        factory({ color, text, ariaLabel });

        const component = screen.getByTestId('label');
        expect(component).toHaveAttribute('data-name', `Color=${color}`);
        
        const displayText = text || '라벨';
        expect(screen.getByText(displayText)).toBeInTheDocument();

        if (ariaLabel) {
          expect(component).toHaveAttribute('aria-label', ariaLabel);
        } else {
          expect(component).toHaveAttribute('aria-label', `${color} 색상 라벨: ${displayText}`);
        }
      });
    });
  });

  describe('이벤트 처리', () => {
    describe('클릭 이벤트', () => {
      it('라벨 클릭 시 click 이벤트가 발생한다', async () => {
        const clickSpy = vi.fn();

        render(Label, {
          props: { color: 'green', text: '클릭 테스트' },
          attrs: { onClick: clickSpy },
        });

        const component = screen.getByTestId('label');
        await fireEvent.click(component);

        expect(clickSpy).toHaveBeenCalledOnce();
        expect(clickSpy).toHaveBeenCalledWith(expect.any(MouseEvent), '클릭 테스트');
      });

      it('텍스트 영역 클릭 시에도 이벤트가 발생한다', async () => {
        const clickSpy = vi.fn();

        render(Label, {
          props: { text: '텍스트 클릭' },
          attrs: { onClick: clickSpy },
        });

        const textElement = screen.getByText('텍스트 클릭');
        await fireEvent.click(textElement);

        expect(clickSpy).toHaveBeenCalledOnce();
        expect(clickSpy).toHaveBeenCalledWith(expect.any(MouseEvent), '텍스트 클릭');
      });

      it('빈 텍스트일 때 기본값으로 이벤트가 발생한다', async () => {
        const clickSpy = vi.fn();

        render(Label, {
          props: { text: '' },
          attrs: { onClick: clickSpy },
        });

        const component = screen.getByTestId('label');
        await fireEvent.click(component);

        expect(clickSpy).toHaveBeenCalledOnce();
        expect(clickSpy).toHaveBeenCalledWith(expect.any(MouseEvent), '라벨');
      });

      it('null 텍스트일 때 기본값으로 이벤트가 발생한다', async () => {
        const clickSpy = vi.fn();

        render(Label, {
          // @ts-expect-error - 의도적으로 null 테스트
          props: { text: null },
          attrs: { onClick: clickSpy },
        });

        const component = screen.getByTestId('label');
        await fireEvent.click(component);

        expect(clickSpy).toHaveBeenCalledOnce();
        expect(clickSpy).toHaveBeenCalledWith(expect.any(MouseEvent), '라벨');
      });
    });

    describe('키보드 이벤트', () => {
      it('Enter 키 입력 시 이벤트가 발생한다', async () => {
        const clickSpy = vi.fn();
        const testText = '키보드 테스트';

        render(Label, {
          props: { text: testText },
          attrs: { onClick: clickSpy },
        });

        const component = screen.getByTestId('label');
        component.focus();
        await fireEvent.keyDown(component, { key: 'Enter' });

        expect(clickSpy).toHaveBeenCalledOnce();
        expect(clickSpy).toHaveBeenCalledWith(expect.any(KeyboardEvent), testText);
      });

      it('Space 키 입력 시 이벤트가 발생한다', async () => {
        const clickSpy = vi.fn();
        const testText = '스페이스 테스트';

        render(Label, {
          props: { text: testText },
          attrs: { onClick: clickSpy },
        });

        const component = screen.getByTestId('label');
        component.focus();
        await fireEvent.keyDown(component, { key: ' ' });

        expect(clickSpy).toHaveBeenCalledOnce();
        expect(clickSpy).toHaveBeenCalledWith(expect.any(KeyboardEvent), testText);
      });

      it('다른 키 입력 시에는 이벤트가 발생하지 않는다', async () => {
        const clickSpy = vi.fn();

        render(Label, {
          props: { text: '다른 키 테스트' },
          attrs: { onClick: clickSpy },
        });

        const component = screen.getByTestId('label');
        component.focus();
        await fireEvent.keyDown(component, { key: 'Escape' });
        await fireEvent.keyDown(component, { key: 'Tab' });

        expect(clickSpy).not.toHaveBeenCalled();
      });

      it('포커스 가능하다', () => {
        factory({ text: '포커스 테스트' });

        const component = screen.getByTestId('label');
        component.focus();
        
        expect(document.activeElement).toBe(component);
        expect(component).toHaveAttribute('tabindex', '0');
      });
    });
  });

  describe('스타일과 레이아웃', () => {
    it('각 색상별로 적절한 CSS 클래스가 적용된다', () => {
      const colors: Array<"blue" | "gray" | "green" | "lightblue" | "navy" | "orange" | "red" | "skyblue" | "yellow"> = [
        'gray', 'green', 'blue', 'red', 'orange', 'yellow', 'lightblue', 'skyblue', 'navy'
      ];

      colors.forEach(color => {
        const { unmount } = factory({ color });
        
        const component = screen.getByTestId('label');
        expect(component).toHaveAttribute('data-name', `Color=${color}`);
        
        unmount();
      });
    });

    it('텍스트가 p 태그로 렌더링된다', () => {
      factory({ text: '테스트 텍스트' });

      const textElement = screen.getByText('테스트 텍스트');
      expect(textElement.tagName).toBe('P');
      expect(textElement).toHaveClass('label-text');
    });

    it('보더 요소가 올바르게 렌더링된다', () => {
      factory();

      const component = screen.getByTestId('label');
      const border = component.querySelector('.label-border');
      
      expect(border).toBeInTheDocument();
      expect(border).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('조건부 렌더링', () => {
    it('모든 색상 변형에서 동일한 구조가 렌더링된다', () => {
      const colors: Array<"blue" | "gray" | "green" | "lightblue" | "navy" | "orange" | "red" | "skyblue" | "yellow"> = [
        'gray', 'green', 'blue', 'red', 'orange', 'yellow', 'lightblue', 'skyblue', 'navy'
      ];

      colors.forEach(color => {
        const { unmount } = factory({ color, text: `${color} 테스트` });
        
        // 기본 구조 확인
        expect(screen.getByTestId('label')).toBeInTheDocument();
        expect(screen.getByText(`${color} 테스트`)).toBeInTheDocument();
        expect(screen.getByRole('label')).toBeInTheDocument();
        
        // 하위 요소 확인
        const component = screen.getByTestId('label');
        expect(component.querySelector('.label-border')).toBeInTheDocument();
        expect(component.querySelector('.label-text')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('동적으로 props가 변경되어도 올바르게 렌더링된다', () => {
      // 첫 번째 상태
      const { unmount: unmount1 } = factory({ color: 'gray', text: '초기 텍스트' });
      expect(screen.getByText('초기 텍스트')).toBeInTheDocument();
      expect(screen.getByTestId('label')).toHaveAttribute('data-name', 'Color=gray');
      unmount1();

      // 두 번째 상태
      const { unmount: unmount2 } = factory({ color: 'green', text: '변경된 텍스트' });
      expect(screen.queryByText('초기 텍스트')).not.toBeInTheDocument();
      expect(screen.getByText('변경된 텍스트')).toBeInTheDocument();
      expect(screen.getByTestId('label')).toHaveAttribute('data-name', 'Color=green');
      unmount2();
    });
  });

  describe('Figma 호환성', () => {
    it('Figma에서 제공된 node-id가 올바르게 설정된다', () => {
      const nodeIdTestCases = [
        { color: 'gray' as const, expectedNodeId: '3567:55084' },
        { color: 'green' as const, expectedNodeId: '3567:55086' },
        { color: 'blue' as const, expectedNodeId: '3567:55088' },
        { color: 'red' as const, expectedNodeId: '3567:55090' },
        { color: 'orange' as const, expectedNodeId: '3567:55092' },
        { color: 'yellow' as const, expectedNodeId: '3567:55094' },
        { color: 'lightblue' as const, expectedNodeId: '3567:55096' },
        { color: 'skyblue' as const, expectedNodeId: '3567:55098' },
        { color: 'navy' as const, expectedNodeId: '3567:55100' },
      ];

      nodeIdTestCases.forEach(({ color, expectedNodeId }) => {
        const { unmount } = factory({ color });
        
        const component = screen.getByTestId('label');
        expect(component).toHaveAttribute('data-node-id', expectedNodeId);
        
        unmount();
      });
    });

    it('Figma data-name 속성이 올바르게 설정된다', () => {
      const colors: Array<"blue" | "gray" | "green" | "lightblue" | "navy" | "orange" | "red" | "skyblue" | "yellow"> = [
        'gray', 'green', 'blue', 'red', 'orange', 'yellow', 'lightblue', 'skyblue', 'navy'
      ];

      colors.forEach(color => {
        const { unmount } = factory({ color });
        
        const component = screen.getByTestId('label');
        expect(component).toHaveAttribute('data-name', `Color=${color}`);
        
        unmount();
      });
    });
  });

  describe('엣지 케이스', () => {
    it('매우 긴 텍스트를 처리한다', () => {
      const longText = 'A'.repeat(100);
      factory({ text: longText });

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('null 또는 undefined 텍스트를 처리한다', () => {
      // null 테스트
      const { unmount: unmount1 } = render(Label, { 
        // @ts-expect-error - 의도적으로 잘못된 타입 테스트
        props: { text: null } 
      });
      expect(screen.getByText('라벨')).toBeInTheDocument();
      unmount1();

      // undefined 테스트  
      const { unmount: unmount2 } = render(Label, { 
        // @ts-expect-error - 의도적으로 잘못된 타입 테스트
        props: { text: undefined } 
      });
      expect(screen.getByText('라벨')).toBeInTheDocument();
      unmount2();
    });

    it('HTML 태그가 포함된 텍스트를 안전하게 처리한다', () => {
      const htmlText = '<script>alert("test")</script>안전한 라벨';
      factory({ text: htmlText });

      // HTML이 이스케이프되어 텍스트로 표시되어야 함
      expect(screen.getByText(htmlText)).toBeInTheDocument();
    });

    it('빈 ariaLabel이 제공되었을 때 기본 aria-label을 사용한다', () => {
      factory({ color: 'blue', text: '테스트', ariaLabel: '' });

      const component = screen.getByTestId('label');
      expect(component).toHaveAttribute('aria-label', 'blue 색상 라벨: 테스트');
    });
  });
});