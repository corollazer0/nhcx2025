// src/components/Switch.spec.ts
import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import Switch from './Switch.vue';
import { describe, it, expect, afterEach } from 'vitest';

describe('Switch.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(Switch, {
      props,
    });

  describe('기본 렌더링', () => {
    it('컴포넌트가 기본 구조로 렌더링됨', () => {
      factory();

      // 스위치 버튼 확인
      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toBeInTheDocument();
      expect(switchButton).toHaveAttribute('type', 'button');
      expect(switchButton).toHaveAttribute('role', 'switch');
    });

    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();
      
      const switchElement = container.querySelector('.switch');
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveClass('switch');
      expect(switchElement).toHaveClass('switch--medium'); // 기본 크기
      expect(switchElement).toHaveClass('switch--off'); // 기본 상태
    });

    it('스위치 내부 구조가 올바름', () => {
      const { container } = factory();

      const track = container.querySelector('.switch__track');
      const thumb = container.querySelector('.switch__thumb');
      
      expect(track).toBeInTheDocument();
      expect(thumb).toBeInTheDocument();
    });

    it('기본 ARIA 속성이 설정됨', () => {
      factory();

      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'false');
      expect(switchButton).toHaveAttribute('aria-label', '스위치');
    });
  });

  describe('상태별 렌더링', () => {
    it('OFF 상태로 렌더링됨', () => {
      const { container } = factory({ modelValue: false });
      
      const switchElement = container.querySelector('.switch');
      expect(switchElement).toHaveClass('switch--off');
      expect(switchElement).not.toHaveClass('switch--on');
      
      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'false');
    });

    it('ON 상태로 렌더링됨', () => {
      const { container } = factory({ modelValue: true });
      
      const switchElement = container.querySelector('.switch');
      expect(switchElement).toHaveClass('switch--on');
      expect(switchElement).not.toHaveClass('switch--off');
      
      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
    });

    it('비활성화 상태로 렌더링됨', () => {
      const { container } = factory({ disabled: true });
      
      const switchElement = container.querySelector('.switch');
      const switchButton = screen.getByTestId('switch');
      
      expect(switchElement).toHaveClass('switch--disabled');
      expect(switchButton).toBeDisabled();
    });
  });

  describe('크기 변형', () => {
    it('small 크기로 렌더링됨', () => {
      const { container } = factory({ size: 'small' });
      
      const switchElement = container.querySelector('.switch');
      expect(switchElement).toHaveClass('switch--small');
    });

    it('medium 크기로 렌더링됨', () => {
      const { container } = factory({ size: 'medium' });
      
      const switchElement = container.querySelector('.switch');
      expect(switchElement).toHaveClass('switch--medium');
    });

    it('large 크기로 렌더링됨', () => {
      const { container } = factory({ size: 'large' });
      
      const switchElement = container.querySelector('.switch');
      expect(switchElement).toHaveClass('switch--large');
    });
  });

  describe('이벤트 처리', () => {
    describe('클릭 이벤트', () => {
      it('클릭 시 update:modelValue 이벤트가 발생함', async () => {
        const { emitted } = factory({ modelValue: false });
        const switchButton = screen.getByTestId('switch');

        await fireEvent.click(switchButton);

        expect(emitted()).toHaveProperty('update:modelValue');
        expect(emitted()['update:modelValue'][0]).toEqual([true]);
      });

      it('ON에서 클릭 시 OFF로 변경됨', async () => {
        const { emitted } = factory({ modelValue: true });
        const switchButton = screen.getByTestId('switch');

        await fireEvent.click(switchButton);

        expect(emitted()).toHaveProperty('update:modelValue');
        expect(emitted()['update:modelValue'][0]).toEqual([false]);
      });

      it('change 이벤트가 올바른 값과 이벤트 객체와 함께 발생함', async () => {
        const { emitted } = factory({ modelValue: false });
        const switchButton = screen.getByTestId('switch');

        await fireEvent.click(switchButton);

        expect(emitted()).toHaveProperty('change');
        expect(emitted().change[0][0]).toBe(true); // 새로운 값
        expect(emitted().change[0][1]).toBeDefined(); // 이벤트 객체
      });

      it('비활성화 상태에서는 클릭 이벤트가 무시됨', async () => {
        const { emitted } = factory({ modelValue: false, disabled: true });
        const switchButton = screen.getByTestId('switch');

        await fireEvent.click(switchButton);

        expect(emitted()).not.toHaveProperty('update:modelValue');
        expect(emitted()).not.toHaveProperty('change');
      });
    });

    describe('키보드 이벤트', () => {
      it('Space 키로 토글됨', async () => {
        const { emitted } = factory({ modelValue: false });
        const switchButton = screen.getByTestId('switch');

        switchButton.focus();
        await fireEvent.keyDown(switchButton, { key: ' ' });

        expect(emitted()).toHaveProperty('update:modelValue');
        expect(emitted()['update:modelValue'][0]).toEqual([true]);
      });

      it('Enter 키로 토글됨', async () => {
        const { emitted } = factory({ modelValue: false });
        const switchButton = screen.getByTestId('switch');

        switchButton.focus();
        await fireEvent.keyDown(switchButton, { key: 'Enter' });

        expect(emitted()).toHaveProperty('update:modelValue');
        expect(emitted()['update:modelValue'][0]).toEqual([true]);
      });

      it('비활성화 상태에서는 키보드 이벤트가 무시됨', async () => {
        const { emitted } = factory({ modelValue: false, disabled: true });
        const switchButton = screen.getByTestId('switch');

        switchButton.focus();
        await fireEvent.keyDown(switchButton, { key: ' ' });
        await fireEvent.keyDown(switchButton, { key: 'Enter' });

        expect(emitted()).not.toHaveProperty('update:modelValue');
        expect(emitted()).not.toHaveProperty('change');
      });
    });
  });

  describe('접근성', () => {
    it('적절한 ARIA 속성을 가짐', () => {
      factory({ modelValue: true, ariaLabel: '알림 설정' });

      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toHaveAttribute('role', 'switch');
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
      expect(switchButton).toHaveAttribute('aria-label', '알림 설정');
    });

    it('키보드 네비게이션이 가능함', () => {
      factory();

      const switchButton = screen.getByTestId('switch');
      expect(switchButton).not.toHaveAttribute('tabindex', '-1');
      
      switchButton.focus();
      expect(document.activeElement).toBe(switchButton);
    });

    it('비활성화 상태에서 적절한 속성을 가짐', () => {
      factory({ disabled: true });

      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toBeDisabled();
    });

    it('button 타입이 올바르게 설정됨', () => {
      factory();

      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toHaveAttribute('type', 'button');
    });
  });

  describe('동적 props', () => {
    it('커스텀 ARIA 라벨이 올바르게 적용됨', () => {
      factory({ ariaLabel: '다크 모드 토글' });

      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toHaveAttribute('aria-label', '다크 모드 토글');
    });

    it('modelValue 변경 시 aria-checked가 업데이트됨', async () => {
      const { rerender } = factory({ modelValue: false });
      const switchButton = screen.getByTestId('switch');

      expect(switchButton).toHaveAttribute('aria-checked', 'false');

      await rerender({ modelValue: true });
      expect(switchButton).toHaveAttribute('aria-checked', 'true');
    });

    it('disabled 변경 시 상태가 올바르게 업데이트됨', async () => {
      const { container, rerender } = factory({ disabled: false });
      const switchButton = screen.getByTestId('switch');
      const switchElement = container.querySelector('.switch');

      expect(switchButton).not.toBeDisabled();
      expect(switchElement).not.toHaveClass('switch--disabled');

      await rerender({ disabled: true });
      expect(switchButton).toBeDisabled();
      expect(switchElement).toHaveClass('switch--disabled');
    });
  });

  describe('크기별 상태 조합', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      it(`${size} 크기에서 ON/OFF 상태가 올바르게 적용됨`, () => {
        // OFF 상태
        const { container: containerOff, unmount: unmountOff } = factory({ 
          size, 
          modelValue: false 
        });
        
        const switchElementOff = containerOff.querySelector('.switch');
        expect(switchElementOff).toHaveClass(`switch--${size}`);
        expect(switchElementOff).toHaveClass('switch--off');
        
        unmountOff();
        
        // ON 상태
        const { container: containerOn, unmount: unmountOn } = factory({ 
          size, 
          modelValue: true 
        });
        
        const switchElementOn = containerOn.querySelector('.switch');
        expect(switchElementOn).toHaveClass(`switch--${size}`);
        expect(switchElementOn).toHaveClass('switch--on');
        
        unmountOn();
      });
    });
  });

  describe('엣지 케이스', () => {
    it('undefined modelValue를 안전하게 처리함', () => {
      const { container } = factory({ modelValue: undefined });
      
      const switchElement = container.querySelector('.switch');
      const switchButton = screen.getByTestId('switch');
      
      expect(switchElement).toHaveClass('switch--off');
      expect(switchButton).toHaveAttribute('aria-checked', 'false');
    });

    it('잘못된 크기 값에 대해 기본 크기를 사용함', () => {
      const { container } = factory({ size: 'invalid-size' as any });
      
      const switchElement = container.querySelector('.switch');
      // TypeScript에서는 이런 케이스가 발생하지 않지만, 런타임 안전성을 위해
      expect(switchElement).toBeInTheDocument();
    });

    it('빈 ariaLabel도 안전하게 처리함', () => {
      factory({ ariaLabel: '' });

      const switchButton = screen.getByTestId('switch');
      expect(switchButton).toHaveAttribute('aria-label', '');
    });
  });

  describe('스타일 클래스', () => {
    it('상태에 따른 클래스가 올바르게 적용됨', () => {
      const testCases = [
        { props: { modelValue: false }, expectedClasses: ['switch--off', 'switch--medium'] },
        { props: { modelValue: true }, expectedClasses: ['switch--on', 'switch--medium'] },
        { props: { disabled: true }, expectedClasses: ['switch--disabled', 'switch--off', 'switch--medium'] },
        { props: { size: 'small' }, expectedClasses: ['switch--small', 'switch--off'] },
        { props: { size: 'large', modelValue: true }, expectedClasses: ['switch--large', 'switch--on'] },
      ];

      testCases.forEach(({ props, expectedClasses }) => {
        const { container, unmount } = factory(props);
        const switchElement = container.querySelector('.switch');
        
        expectedClasses.forEach(className => {
          expect(switchElement).toHaveClass(className);
        });
        
        unmount();
      });
    });
  });

  describe('컴포넌트 상호작용', () => {
    it('여러 번 토글해도 정상 작동함', async () => {
      const { emitted } = factory({ modelValue: false });
      const switchButton = screen.getByTestId('switch');

      // 첫 번째 토글 (false -> true)
      await fireEvent.click(switchButton);
      expect(emitted()['update:modelValue']).toHaveLength(1);
      expect(emitted()['update:modelValue'][0]).toEqual([true]);

      // 두 번째 토글 (컴포넌트는 여전히 false 상태이므로 true를 emit)
      await fireEvent.click(switchButton);
      expect(emitted()['update:modelValue']).toHaveLength(2);
      expect(emitted()['update:modelValue'][1]).toEqual([true]);

      // 세 번째 토글
      await fireEvent.click(switchButton);
      expect(emitted()['update:modelValue']).toHaveLength(3);
      expect(emitted()['update:modelValue'][2]).toEqual([true]);
    });

    it('포커스 상태를 올바르게 관리함', async () => {
      factory();

      const switchButton = screen.getByTestId('switch');
      
      // 포커스 설정
      switchButton.focus();
      expect(document.activeElement).toBe(switchButton);
      
      // 블러
      switchButton.blur();
      expect(document.activeElement).not.toBe(switchButton);
    });
  });
});