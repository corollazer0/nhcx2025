// src/components/Input.spec.ts
import { render, screen, fireEvent, cleanup } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Input from './Input.vue';

describe('Input', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}, attrs = {}) => {
    const defaultProps = {
      state: 'inactive' as const,
      labelText: '레이블',
      placeholderText: '플레이스홀더 텍스트',
      messageText: '안내 문구 입력',
      value: '',
      label: true,
      message: true
    };
    return render(Input, { 
      props: { ...defaultProps, ...props },
      attrs
    });
  };

  describe('기본 렌더링', () => {
    it('기본 props로 컴포넌트가 렌더링된다', () => {
      factory();

      expect(screen.getByTestId('input')).toBeInTheDocument();
      expect(screen.getByTestId('input-input')).toBeInTheDocument();
    });

    it('label이 true일 때 레이블이 렌더링된다', () => {
      factory({ label: true, labelText: '테스트 레이블' });

      expect(screen.getByTestId('input-label')).toBeInTheDocument();
      expect(screen.getByText('테스트 레이블')).toBeInTheDocument();
    });

    it('label이 false일 때 레이블이 렌더링되지 않는다', () => {
      factory({ label: false });

      expect(screen.queryByTestId('input-label')).not.toBeInTheDocument();
    });

    it('message가 true일 때 메시지가 렌더링된다', () => {
      factory({ message: true, messageText: '테스트 메시지' });

      expect(screen.getByTestId('input-message')).toBeInTheDocument();
      expect(screen.getByText('테스트 메시지')).toBeInTheDocument();
    });

    it('message가 false일 때 메시지가 렌더링되지 않는다', () => {
      factory({ message: false });

      expect(screen.queryByTestId('input-message')).not.toBeInTheDocument();
    });

    it('placeholder 텍스트가 올바르게 설정된다', () => {
      const placeholderText = '테스트 placeholder';
      factory({ placeholderText });

      const input = screen.getByTestId('input-input') as HTMLInputElement;
      expect(input.placeholder).toBe(placeholderText);
    });
  });

  describe('상태별 렌더링', () => {
    it('inactive 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'inactive' });

      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--inactive');
    });

    it('focus 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'focus' });

      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--focus');
    });

    it('filled 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'filled' });

      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--filled');
    });

    it('error 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'error' });

      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--error');

      const message = screen.getByTestId('input-message');
      expect(message).toHaveClass('input__message--error');
    });

    it('success 상태가 올바르게 렌더링되고 아이콘이 표시된다', () => {
      factory({ state: 'success' });

      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--success');

      const successIcon = screen.getByTestId('input-success-icon');
      expect(successIcon).toBeInTheDocument();

      const message = screen.getByTestId('input-message');
      expect(message).toHaveClass('input__message--success');
    });

    it('readonly 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'readonly' });

      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--readonly');

      const input = screen.getByTestId('input-input') as HTMLInputElement;
      expect(input.readOnly).toBe(true);
    });

    it('disabled 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'disabled' });

      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--disabled');

      const input = screen.getByTestId('input-input') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });
  });

  describe('상호작용', () => {
    it('입력 시 input 이벤트가 발생한다', async () => {
      const onInput = vi.fn();
      factory({}, { onInput });

      const input = screen.getByTestId('input-input') as HTMLInputElement;
      await fireEvent.update(input, '테스트 입력');

      expect(onInput).toHaveBeenCalled();
    });

    it('포커스 시 focus 이벤트가 발생하고 클래스가 추가된다', async () => {
      const onFocus = vi.fn();
      factory({}, { onFocus });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      expect(onFocus).toHaveBeenCalled();
      
      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--focused');
    });

    it('블러 시 blur 이벤트가 발생하고 클래스가 제거된다', async () => {
      const onBlur = vi.fn();
      factory({}, { onBlur });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);
      await fireEvent.blur(input);

      expect(onBlur).toHaveBeenCalled();
      
      const component = screen.getByTestId('input');
      expect(component).not.toHaveClass('input--focused');
    });

    it('Enter 키 입력 시 enter 이벤트가 발생한다', async () => {
      const onEnter = vi.fn();
      factory({ value: '테스트' }, { onEnter });

      const input = screen.getByTestId('input-input');
      await fireEvent.keyDown(input, { key: 'Enter' });

      expect(onEnter).toHaveBeenCalled();
    });

    it('readonly 상태에서는 포커스 이벤트가 발생하지 않는다', async () => {
      const onFocus = vi.fn();
      factory({ state: 'readonly' }, { onFocus });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      expect(onFocus).not.toHaveBeenCalled();
    });

    it('disabled 상태에서는 포커스 이벤트가 발생하지 않는다', async () => {
      const onFocus = vi.fn();
      factory({ state: 'disabled' }, { onFocus });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      expect(onFocus).not.toHaveBeenCalled();
    });
  });

  describe('Clear 버튼', () => {
    it('포커스 상태이고 값이 있을 때 clear 버튼이 표시된다', async () => {
      factory({ value: '테스트 값' });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      expect(screen.getByTestId('input-clear')).toBeInTheDocument();
    });

    it('값이 없을 때 clear 버튼이 표시되지 않는다', async () => {
      factory({ value: '' });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      expect(screen.queryByTestId('input-clear')).not.toBeInTheDocument();
    });

    it('포커스가 없을 때 clear 버튼이 숨겨진다', () => {
      factory({ value: '테스트 값' });

      const clearButton = screen.getByTestId('input-clear');
      expect(clearButton).toBeInTheDocument();
      expect(clearButton).not.toBeVisible();
    });

    it('readonly 상태에서는 clear 버튼이 표시되지 않는다', async () => {
      factory({ state: 'readonly', value: '테스트 값' });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      expect(screen.queryByTestId('input-clear')).not.toBeInTheDocument();
    });

    it('disabled 상태에서는 clear 버튼이 표시되지 않는다', async () => {
      factory({ state: 'disabled', value: '테스트 값' });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      expect(screen.queryByTestId('input-clear')).not.toBeInTheDocument();
    });

    it('clear 버튼 클릭 시 값이 초기화되고 clear 이벤트가 발생한다', async () => {
      const onClear = vi.fn();
      const onUpdateValue = vi.fn();
      factory({ value: '테스트 값' }, { onClear, 'onUpdate:value': onUpdateValue });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      const clearButton = screen.getByTestId('input-clear');
      await fireEvent.click(clearButton);

      expect(onClear).toHaveBeenCalled();
      expect(onUpdateValue).toHaveBeenCalledWith('');
    });
  });

  describe('v-model 지원', () => {
    it('value prop이 input에 올바르게 반영된다', () => {
      const testValue = '테스트 값';
      factory({ value: testValue });

      const input = screen.getByTestId('input-input') as HTMLInputElement;
      expect(input.value).toBe(testValue);
    });

    it('input 변경 시 update:value 이벤트가 발생한다', async () => {
      const onUpdateValue = vi.fn();
      factory({}, { 'onUpdate:value': onUpdateValue });

      const input = screen.getByTestId('input-input') as HTMLInputElement;
      const newValue = '새로운 값';
      
      await fireEvent.update(input, newValue);

      expect(onUpdateValue).toHaveBeenCalledWith(newValue);
    });
  });

  describe('접근성', () => {
    it('input 요소가 올바른 속성을 가진다', () => {
      factory();

      const input = screen.getByTestId('input-input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('clear 버튼이 올바른 타입을 가진다', async () => {
      factory({ value: '테스트' });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      const clearButton = screen.getByTestId('input-clear');
      expect(clearButton).toHaveAttribute('type', 'button');
    });

    it('border 요소가 aria-hidden 속성을 가진다', () => {
      factory();

      const borders = document.querySelectorAll('.input__border');
      borders.forEach(border => {
        expect(border).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('조건부 렌더링', () => {
    it('cursor가 포커스 상태이고 값이 있으며 readonly/disabled가 아닐 때만 표시된다', async () => {
      const { unmount } = factory({ value: '테스트', state: 'inactive' });

      const input = screen.getByTestId('input-input');
      await fireEvent.focus(input);

      const cursor = document.querySelector('.input__cursor');
      expect(cursor).toBeInTheDocument();

      // readonly 상태로 변경
      unmount();
      factory({ value: '테스트', state: 'readonly' });
      expect(document.querySelector('.input__cursor')).not.toBeInTheDocument();
    });

    it('messageText가 없으면 메시지가 렌더링되지 않는다', () => {
      factory({ message: true, messageText: '' });

      expect(screen.queryByTestId('input-message')).not.toBeInTheDocument();
    });

    it('success 상태일 때만 success 아이콘이 표시된다', () => {
      const { unmount } = factory({ state: 'inactive' });
      expect(screen.queryByTestId('input-success-icon')).not.toBeInTheDocument();
      
      unmount();
      factory({ state: 'success' });
      expect(screen.getByTestId('input-success-icon')).toBeInTheDocument();
    });
  });

  describe('CSS 클래스', () => {
    it('상태에 따른 CSS 클래스가 올바르게 적용된다', () => {
      let { unmount } = factory({ state: 'inactive' });
      let component = screen.getByTestId('input');
      expect(component).toHaveClass('input--inactive');

      unmount();
      ({ unmount } = factory({ state: 'error' }));
      component = screen.getByTestId('input');
      expect(component).toHaveClass('input--error');

      unmount();
      factory({ state: 'success' });
      component = screen.getByTestId('input');
      expect(component).toHaveClass('input--success');
    });

    it('값이 있을 때 has-value 클래스가 적용된다', () => {
      factory({ value: '테스트 값' });

      const component = screen.getByTestId('input');
      expect(component).toHaveClass('input--has-value');
    });

    it('메시지 상태에 따른 CSS 클래스가 올바르게 적용된다', () => {
      let { unmount } = factory({ state: 'error', message: true });
      let message = screen.getByTestId('input-message');
      expect(message).toHaveClass('input__message--error');

      unmount();
      ({ unmount } = factory({ state: 'success', message: true }));
      message = screen.getByTestId('input-message');
      expect(message).toHaveClass('input__message--success');

      unmount();
      factory({ state: 'inactive', message: true });
      message = screen.getByTestId('input-message');
      expect(message).toHaveClass('input__message--default');
    });
  });
});