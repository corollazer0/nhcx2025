// src/components/Bullet.spec.ts
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Bullet from './Bullet.vue';

describe('Bullet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) => {
    const defaultProps = {
      type: '1depth' as const,
      text: '내용을 입력하세요.',
      button: false,
    };
    return render(Bullet, { props: { ...defaultProps, ...props } });
  };

  describe('기본 렌더링', () => {
    it('기본 props로 컴포넌트가 렌더링된다', () => {
      factory();

      expect(screen.getByRole('listitem')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('내용을 입력하세요.')).toBeInTheDocument();
    });

    it('data-testid가 올바르게 설정된다', () => {
      factory();

      expect(screen.getByTestId('bullet')).toBeInTheDocument();
    });

    it('기본 CSS 클래스가 적용된다', () => {
      factory();

      const component = screen.getByTestId('bullet');
      expect(component).toHaveClass('bullet-component');
    });
  });

  describe('aria-level 속성', () => {
    it('1depth 타입일 때 aria-level이 1', () => {
      factory({ type: '1depth' });
      const element = screen.getByTestId('bullet');
      expect(element).toHaveAttribute('aria-level', '1');
    });

    it('2depth 타입일 때 aria-level이 2', () => {
      factory({ type: '2depth' });
      const element = screen.getByTestId('bullet');
      expect(element).toHaveAttribute('aria-level', '2');
    });
  });

  describe('type prop', () => {
    it('1depth일 때 올바른 구조가 렌더링된다', () => {
      factory({ type: '1depth' });

      const container = screen.getByTestId('bullet');
      expect(container.querySelector('[data-name="bullet-type-1depth"]')).toBeInTheDocument();
      expect(container.querySelector('[data-name="bullet-type-2depth"]')).not.toBeInTheDocument();
    });

    it('2depth일 때 올바른 구조가 렌더링된다', () => {
      factory({ type: '2depth' });

      const container = screen.getByTestId('bullet');
      expect(container.querySelector('[data-name="bullet-type-2depth"]')).toBeInTheDocument();
      expect(container.querySelector('[data-name="bullet-type-1depth"]')).not.toBeInTheDocument();
    });
  });

  describe('text prop', () => {
    it('사용자 정의 텍스트가 렌더링된다', () => {
      const customText = '사용자 정의 불릿 텍스트';
      factory({ text: customText });

      expect(screen.getByText(customText)).toBeInTheDocument();
    });

    it('빈 문자열을 처리한다', () => {
      factory({ text: '' });

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('내용을 입력하세요.')).toBeInTheDocument();
    });

    it('1depth에서 aria-label이 동적으로 설정된다', () => {
      const customText = '테스트 텍스트';
      factory({ text: customText, type: '1depth' });

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', `1차 항목: ${customText}. 클릭하여 상호작용`);
    });

    it('2depth에서 적절한 aria-label이 설정된다', () => {
      const customText = '하위 항목';
      factory({ type: '2depth', text: customText });

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute(
        'aria-label',
        `2차 하위 항목: ${customText}. 클릭하여 상호작용`,
      );
    });

    it('빈 텍스트일 때 기본 aria-label이 설정된다', () => {
      factory({ text: '' });

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', '1차 항목: 내용 없음. 클릭하여 상호작용');
    });
  });

  describe('button prop', () => {
    it('button prop이 true일 때 컴포넌트가 렌더링된다', () => {
      factory({ button: true });

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('button prop이 false일 때도 컴포넌트가 렌더링된다', () => {
      factory({ button: false });

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Props 조합', () => {
    const propsTestCases = [
      { type: '1depth' as const, text: '첫 번째 항목', button: true },
      { type: '1depth' as const, text: '첫 번째 항목', button: false },
      { type: '2depth' as const, text: '두 번째 항목', button: true },
      { type: '2depth' as const, text: '두 번째 항목', button: false },
      { type: '1depth' as const, text: '', button: true },
      { type: '2depth' as const, text: '', button: false },
    ];

    propsTestCases.forEach(({ type, text, button }, index) => {
      it(`props 조합 ${index + 1}: type=${type}, text="${text}", button=${button}`, () => {
        factory({ type, text, button });

        const element = screen.getByTestId('bullet');
        expect(element).toHaveAttribute('aria-level', type === '1depth' ? '1' : '2');
        expect(screen.getByRole('button')).toBeInTheDocument();

        if (text) {
          expect(screen.getByText(text)).toBeInTheDocument();
        } else {
          expect(screen.getByText('내용을 입력하세요.')).toBeInTheDocument();
        }
      });
    });
  });

  describe('이벤트 처리', () => {
    describe('클릭 이벤트', () => {
      it('텍스트 클릭 시 textClick과 click 이벤트가 발생한다', async () => {
        const textClickSpy = vi.fn();
        const clickSpy = vi.fn();
        const testText = '클릭 테스트';

        render(Bullet, {
          props: { text: testText },
          attrs: {
            onTextClick: textClickSpy,
            onClick: clickSpy,
          },
        });

        const button = screen.getByRole('button');
        await fireEvent.click(button);

        expect(textClickSpy).toHaveBeenCalledOnce();
        expect(textClickSpy).toHaveBeenCalledWith(testText, expect.any(MouseEvent));
        expect(clickSpy).toHaveBeenCalledOnce();
        expect(clickSpy).toHaveBeenCalledWith(expect.any(MouseEvent));
      });

      it('빈 텍스트 클릭 시에도 이벤트가 발생한다', async () => {
        const textClickSpy = vi.fn();

        render(Bullet, {
          props: { text: '' },
          attrs: { onTextClick: textClickSpy },
        });

        const button = screen.getByRole('button');
        await fireEvent.click(button);

        expect(textClickSpy).toHaveBeenCalledWith('', expect.any(MouseEvent));
      });
    });

    describe('키보드 이벤트', () => {
      it('Enter 키 입력 시 이벤트가 발생한다', async () => {
        const textClickSpy = vi.fn();
        const clickSpy = vi.fn();
        const testText = '키보드 테스트';

        render(Bullet, {
          props: { text: testText },
          attrs: {
            onTextClick: textClickSpy,
            onClick: clickSpy,
          },
        });

        const button = screen.getByRole('button');
        button.focus();
        await fireEvent.keyDown(button, { key: 'Enter' });

        expect(textClickSpy).toHaveBeenCalledOnce();
        expect(textClickSpy).toHaveBeenCalledWith(testText, expect.any(KeyboardEvent));
        expect(clickSpy).toHaveBeenCalledOnce();
      });

      it('Space 키 입력 시 이벤트가 발생한다', async () => {
        const textClickSpy = vi.fn();
        const testText = '스페이스 테스트';

        render(Bullet, {
          props: { text: testText },
          attrs: { onTextClick: textClickSpy },
        });

        const button = screen.getByRole('button');
        button.focus();
        await fireEvent.keyDown(button, { key: ' ' });

        expect(textClickSpy).toHaveBeenCalledOnce();
        expect(textClickSpy).toHaveBeenCalledWith(testText, expect.any(KeyboardEvent));
      });

      it('다른 키 입력 시에는 이벤트가 발생하지 않는다', async () => {
        const textClickSpy = vi.fn();

        render(Bullet, {
          props: { text: '다른 키 테스트' },
          attrs: { onTextClick: textClickSpy },
        });

        const button = screen.getByRole('button');
        button.focus();
        await fireEvent.keyDown(button, { key: 'Escape' });
        await fireEvent.keyDown(button, { key: 'Tab' });

        expect(textClickSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('접근성', () => {
    describe('ARIA 속성', () => {
      it('적절한 role이 설정된다', () => {
        factory({ type: '1depth' });

        const listItem = screen.getByRole('listitem');
        const button = screen.getByRole('button');

        expect(listItem).toHaveAttribute('role', 'listitem');
        expect(button).toHaveAttribute('type', 'button');
      });

      it('aria-describedby가 텍스트 요소와 연결된다', () => {
        const testText = '연결 테스트';
        factory({ text: testText });

        const button = screen.getByRole('button');
        const textElement = screen.getByText(testText);
        const describedById = button.getAttribute('aria-describedby');

        expect(describedById).toBeTruthy();
        expect(textElement).toHaveAttribute('id', describedById!);
      });

      it('ariaDescribedById가 고유한 값을 가진다', () => {
        // 첫 번째 컴포넌트 인스턴스
        const { unmount: unmount1 } = factory({ text: '첫 번째' });
        const firstButton = screen.getByRole('button');
        const firstId = firstButton.getAttribute('aria-describedby');
        unmount1();

        // 두 번째 컴포넌트 인스턴스
        const { unmount: unmount2 } = factory({ text: '두 번째' });
        const secondButton = screen.getByRole('button');
        const secondId = secondButton.getAttribute('aria-describedby');
        unmount2();

        expect(firstId).toBeTruthy();
        expect(secondId).toBeTruthy();
        expect(firstId).not.toBe(secondId);
      });
    });

    describe('장식적 요소', () => {
      it('불릿 아이콘이 보조 기술에서 숨겨진다', () => {
        factory({ type: '1depth' });

        const container = screen.getByTestId('bullet');
        const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
        const presentationElements = container.querySelectorAll('[role="presentation"]');

        expect(hiddenElements.length).toBeGreaterThan(0);
        expect(presentationElements.length).toBeGreaterThan(0);
      });
    });

    describe('키보드 네비게이션', () => {
      it('포커스 이동이 가능하다', () => {
        factory({ text: '포커스 테스트' });

        const button = screen.getByRole('button');

        button.focus();
        expect(document.activeElement).toBe(button);
      });

      it('키보드로 활성화할 수 있다', async () => {
        const textClickSpy = vi.fn();

        render(Bullet, {
          props: { text: '키보드 활성화' },
          attrs: { onTextClick: textClickSpy },
        });

        const button = screen.getByRole('button');
        button.focus();

        await fireEvent.keyDown(button, { key: 'Enter' });
        expect(textClickSpy).toHaveBeenCalled();

        textClickSpy.mockClear();
        await fireEvent.keyDown(button, { key: ' ' });
        expect(textClickSpy).toHaveBeenCalled();
      });
    });
  });

  describe('조건부 렌더링', () => {
    describe('v-if 조건부 렌더링', () => {
      it('1depth일 때만 1depth 블록이 렌더링된다', () => {
        factory({ type: '1depth' });

        const container = screen.getByTestId('bullet');

        expect(container.querySelector('.type-1depth')).toBeInTheDocument();
        expect(container.querySelector('.type-2depth')).not.toBeInTheDocument();
      });

      it('2depth일 때만 2depth 블록이 렌더링된다', () => {
        factory({ type: '2depth' });

        const container = screen.getByTestId('bullet');

        expect(container.querySelector('.type-2depth')).toBeInTheDocument();
        expect(container.querySelector('.type-1depth')).not.toBeInTheDocument();
      });

      it('잘못된 type일 때 조건부 블록이 렌더링되지 않는다', () => {
        // @ts-expect-error - 의도적으로 잘못된 타입 테스트
        factory({ type: 'invalid' });

        const container = screen.getByTestId('bullet');

        expect(container.querySelector('.type-1depth')).not.toBeInTheDocument();
        expect(container.querySelector('.type-2depth')).not.toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });
    });

    describe('동적 렌더링', () => {
      it('type 변경 시 올바르게 리렌더링된다', () => {
        // 첫 번째 컴포넌트: 1depth
        const { unmount: unmount1 } = factory({ type: '1depth' });
        let container = screen.getByTestId('bullet');
        expect(container.querySelector('.type-1depth')).toBeInTheDocument();
        expect(container.querySelector('.type-2depth')).not.toBeInTheDocument();
        unmount1();

        // 두 번째 컴포넌트: 2depth
        const { unmount: unmount2 } = factory({ type: '2depth' });
        container = screen.getByTestId('bullet');
        expect(container.querySelector('.type-2depth')).toBeInTheDocument();
        expect(container.querySelector('.type-1depth')).not.toBeInTheDocument();
        unmount2();
      });

      it('props 변경 시 관련 요소들이 업데이트된다', () => {
        // 첫 번째 컴포넌트: 1depth, 초기 텍스트
        const { unmount: unmount1 } = factory({ type: '1depth', text: '초기 텍스트' });
        expect(screen.getByText('초기 텍스트')).toBeInTheDocument();
        expect(screen.getByTestId('bullet')).toHaveAttribute('aria-level', '1');
        unmount1();

        // 두 번째 컴포넌트: 2depth, 변경된 텍스트
        const { unmount: unmount2 } = factory({ type: '2depth', text: '변경된 텍스트' });
        expect(screen.queryByText('초기 텍스트')).not.toBeInTheDocument();
        expect(screen.getByText('변경된 텍스트')).toBeInTheDocument();
        expect(screen.getByTestId('bullet')).toHaveAttribute('aria-level', '2');
        unmount2();
      });
    });

    describe('하위 요소 조건부 렌더링', () => {
      it('각 타입에 맞는 data-name 속성이 조건부로 설정된다', () => {
        // 첫 번째 컴포넌트: 1depth
        const { unmount: unmount1 } = factory({ type: '1depth' });
        let container = screen.getByTestId('bullet');
        expect(container.querySelector('[data-name="bullet-type-1depth"]')).toBeInTheDocument();
        expect(container.querySelector('[data-name="bullet-type-2depth"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-name="bullet-icon-circle"]')).toBeInTheDocument();
        expect(container.querySelector('[data-name="bullet-icon-hyphen"]')).not.toBeInTheDocument();
        unmount1();

        // 두 번째 컴포넌트: 2depth
        const { unmount: unmount2 } = factory({ type: '2depth' });
        container = screen.getByTestId('bullet');
        expect(container.querySelector('[data-name="bullet-type-2depth"]')).toBeInTheDocument();
        expect(container.querySelector('[data-name="bullet-type-1depth"]')).not.toBeInTheDocument();
        expect(container.querySelector('[data-name="bullet-icon-hyphen"]')).toBeInTheDocument();
        expect(container.querySelector('[data-name="bullet-icon-circle"]')).not.toBeInTheDocument();
        unmount2();
      });
    });
  });
});
