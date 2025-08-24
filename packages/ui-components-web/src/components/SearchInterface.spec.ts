// src/components/SearchInterface.spec.ts
import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import SearchInterface from './SearchInterface.vue';
import { describe, it, expect, afterEach } from 'vitest';

describe('SearchInterface.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(SearchInterface, {
      props,
    });

  describe('기본 렌더링', () => {
    it('컴포넌트가 기본 구조로 렌더링됨', () => {
      factory();

      // 제목 확인
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('search');

      // 입력 필드 확인
      expect(screen.getByTestId('search-input')).toBeInTheDocument();

      // 기본 라벨 확인
      expect(screen.getByText('레이블')).toBeInTheDocument();

      // 기본 안내 문구 확인
      expect(screen.getByText('안내 문구 입력')).toBeInTheDocument();

      // 검색 버튼 확인
      expect(screen.getByLabelText('검색')).toBeInTheDocument();
    });

    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();
      const mainElement = container.querySelector('.search-interface');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('search-interface');
    });

    it('기본 상태에서 올바른 클래스가 적용됨', () => {
      const { container } = factory({ state: 'default' });
      
      expect(container.querySelector('.input-wrapper.default')).toBeInTheDocument();
      expect(container.querySelector('.search-input.default')).toBeInTheDocument();
    });
  });

  describe('상태별 렌더링', () => {
    it('default 상태로 렌더링됨', () => {
      const { container } = factory({ state: 'default' });
      
      expect(container.querySelector('.input-wrapper.default')).toBeInTheDocument();
      expect(screen.getByText('안내 문구 입력')).toBeInTheDocument();
    });

    it('filled 상태로 렌더링됨', () => {
      const { container } = factory({ 
        state: 'filled',
        value: '검색어 입력',
        showClearButton: true
      });
      
      expect(container.querySelector('.input-wrapper.filled')).toBeInTheDocument();
      expect(screen.getByDisplayValue('검색어 입력')).toBeInTheDocument();
      expect(screen.getByLabelText('지우기')).toBeInTheDocument();
    });

    it('focus 상태로 렌더링됨', () => {
      const { container } = factory({ state: 'focus' });
      
      expect(container.querySelector('.input-wrapper.focus')).toBeInTheDocument();
    });

    it('error 상태로 렌더링됨', () => {
      const { container } = factory({ state: 'error' });
      
      expect(container.querySelector('.input-wrapper.error')).toBeInTheDocument();
      expect(container.querySelector('.input-helper.error')).toBeInTheDocument();
      expect(screen.getByText('오류 메시지 출력')).toBeInTheDocument();
    });
  });

  describe('동적 props', () => {
    it('커스텀 텍스트 props가 올바르게 렌더링됨', () => {
      factory({
        labelText: '커스텀 라벨',
        placeholder: '커스텀 플레이스홀더',
        helperText: '커스텀 안내 문구',
        value: '커스텀 값',
      });

      expect(screen.getByText('커스텀 라벨')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('커스텀 플레이스홀더')).toBeInTheDocument();
      expect(screen.getByText('커스텀 안내 문구')).toBeInTheDocument();
      expect(screen.getByDisplayValue('커스텀 값')).toBeInTheDocument();
    });

    it('error 상태에서는 helperText가 무시되고 에러 메시지가 표시됨', () => {
      factory({
        state: 'error',
        helperText: '일반 안내 문구',
      });

      expect(screen.queryByText('일반 안내 문구')).not.toBeInTheDocument();
      expect(screen.getByText('오류 메시지 출력')).toBeInTheDocument();
    });

    it('showClearButton이 false일 때 지우기 버튼이 표시되지 않음', () => {
      factory({
        state: 'filled',
        value: '검색어',
        showClearButton: false,
      });

      expect(screen.queryByLabelText('지우기')).not.toBeInTheDocument();
    });

    it('hasClearButton이 true일 때 다른 상태에서도 지우기 버튼이 표시됨', () => {
      factory({
        state: 'default',
        value: '검색어',
        showClearButton: true,
        hasClearButton: true,
      });

      expect(screen.getByLabelText('지우기')).toBeInTheDocument();
    });
  });

  describe('이벤트 처리', () => {
    describe('input 이벤트', () => {
      it('입력 시 input 이벤트와 update:value 이벤트가 발생함', async () => {
        const { emitted } = factory();
        const input = screen.getByTestId('search-input');

        await fireEvent.update(input, '새로운 값');

        expect(emitted()).toHaveProperty('input');
        expect(emitted()).toHaveProperty('update:value');
        expect(emitted().input[0]).toEqual(['새로운 값', expect.any(Object)]);
        expect(emitted()['update:value'][0]).toEqual(['새로운 값']);
      });
    });

    describe('focus/blur 이벤트', () => {
      it('focus 이벤트가 올바르게 발생함', async () => {
        const { emitted } = factory();
        const input = screen.getByTestId('search-input');

        await fireEvent.focus(input);

        expect(emitted()).toHaveProperty('focus');
        expect(emitted().focus[0]).toEqual([expect.any(Object)]);
      });

      it('blur 이벤트가 올바르게 발생함', async () => {
        const { emitted } = factory();
        const input = screen.getByTestId('search-input');

        await fireEvent.focus(input);
        await fireEvent.blur(input);

        expect(emitted()).toHaveProperty('blur');
        expect(emitted().blur[0]).toEqual([expect.any(Object)]);
      });
    });

    describe('search 이벤트', () => {
      it('검색 버튼 클릭 시 search 이벤트가 발생함', async () => {
        const { emitted } = factory({ value: '검색어' });
        const searchButton = screen.getByLabelText('검색');

        await fireEvent.click(searchButton);

        expect(emitted()).toHaveProperty('search');
        expect(emitted().search[0]).toEqual(['검색어']);
      });
    });

    describe('clear 이벤트', () => {
      it('지우기 버튼 클릭 시 clear 이벤트와 update:value 이벤트가 발생함', async () => {
        const { emitted } = factory({
          state: 'filled',
          value: '삭제할 내용',
          showClearButton: true,
        });

        const clearButton = screen.getByLabelText('지우기');
        await fireEvent.click(clearButton);

        expect(emitted()).toHaveProperty('clear');
        expect(emitted()).toHaveProperty('update:value');
        expect(emitted().clear[0]).toEqual([]);
        expect(emitted()['update:value']).toContainEqual(['']); // 빈 문자열로 업데이트됨
      });

      it('지우기 버튼 클릭 시 입력값이 초기화됨', async () => {
        const { container } = factory({
          state: 'filled',
          value: '삭제할 내용',
          showClearButton: true,
        });

        const clearButton = screen.getByLabelText('지우기');
        const input = screen.getByTestId('search-input') as HTMLInputElement;

        // 초기값 확인
        expect(input.value).toBe('삭제할 내용');

        await fireEvent.click(clearButton);

        // 값이 초기화되었는지 확인
        expect(input.value).toBe('');
      });
    });
  });

  describe('v-model 동작', () => {
    it('value prop 변경 시 입력값이 업데이트됨', async () => {
      const { rerender } = factory({ value: '초기값' });
      const input = screen.getByTestId('search-input') as HTMLInputElement;

      expect(input.value).toBe('초기값');

      // props 업데이트
      await rerender({ value: '변경된 값' });

      expect(input.value).toBe('변경된 값');
    });
  });

  describe('접근성', () => {
    it('입력 필드가 적절한 레이블을 가짐', () => {
      factory({ labelText: '검색어' });
      expect(screen.getByText('검색어')).toBeInTheDocument();
    });

    it('모든 버튼이 적절한 aria-label을 가짐', () => {
      factory({
        state: 'filled',
        value: '검색어',
        showClearButton: true,
      });

      expect(screen.getByLabelText('검색')).toBeInTheDocument();
      expect(screen.getByLabelText('지우기')).toBeInTheDocument();
    });

    it('제목이 올바른 heading 레벨을 가짐', () => {
      factory();
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('search');
    });
  });

  describe('스타일 클래스', () => {
    it('각 상태별 올바른 클래스가 적용됨', () => {
      const states: Array<'default' | 'filled' | 'focus' | 'error'> = ['default', 'filled', 'focus', 'error'];
      
      states.forEach(state => {
        const { container, unmount } = factory({ state });
        
        expect(container.querySelector(`.input-wrapper.${state}`)).toBeInTheDocument();
        expect(container.querySelector(`.search-input.${state}`)).toBeInTheDocument();
        
        if (state === 'error') {
          expect(container.querySelector('.input-helper.error')).toBeInTheDocument();
        }
        
        unmount();
      });
    });
  });

  describe('키보드 네비게이션', () => {
    it('입력 필드가 키보드로 접근 가능함', () => {
      factory();
      const input = screen.getByTestId('search-input');
      expect(input).not.toHaveAttribute('tabindex', '-1');
    });

    it('모든 버튼이 키보드로 접근 가능함', () => {
      factory({
        state: 'filled',
        value: '검색어',
        showClearButton: true,
      });

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2); // 검색 버튼 + 지우기 버튼

      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('엣지 케이스', () => {
    it('빈 값에서는 지우기 버튼이 표시되지 않음', () => {
      factory({
        state: 'filled',
        value: '',
        showClearButton: true,
      });

      expect(screen.queryByLabelText('지우기')).not.toBeInTheDocument();
    });

    it('filled 상태가 아니어도 hasClearButton이 true면 지우기 버튼 표시', () => {
      factory({
        state: 'default',
        value: '검색어',
        showClearButton: true,
        hasClearButton: true,
      });

      expect(screen.getByLabelText('지우기')).toBeInTheDocument();
    });

    it('매우 긴 텍스트도 정상 처리됨', async () => {
      const longText = 'a'.repeat(1000);
      const { emitted } = factory();
      const input = screen.getByTestId('search-input');

      await fireEvent.update(input, longText);

      expect(emitted()['update:value'][0]).toEqual([longText]);
    });
  });

  describe('반응형 동작', () => {
    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();
      const mainElement = container.querySelector('.search-interface');
      
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('search-interface');
    });
  });
});