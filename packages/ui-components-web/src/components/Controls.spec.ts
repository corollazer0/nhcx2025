// src/components/Controls.spec.ts
import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import Controls from './Controls.vue';
import { describe, it, expect, afterEach } from 'vitest';

describe('Controls.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(Controls, {
      props,
    });

  describe('기본 렌더링', () => {
    it('컴포넌트가 기본 stepper 구조로 렌더링됨', () => {
      factory();

      // 컨트롤즈 컨테이너 확인
      expect(screen.getByTestId('controls')).toBeInTheDocument();

      // 버튼들 확인 (기본은 stepper variant)
      expect(screen.getByLabelText('값 감소')).toBeInTheDocument();
      expect(screen.getByLabelText('값 증가')).toBeInTheDocument();

      // 기본값 확인
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();
      const controlsElement = container.querySelector('.controls');
      expect(controlsElement).toBeInTheDocument();
      expect(controlsElement).toHaveClass('controls', 'controls--stepper');
    });

    it('stepper variant에서 아이콘이 올바르게 렌더링됨', () => {
      const { container } = factory();
      
      // 양쪽 버튼 모두 SVG 아이콘 확인
      const svgElements = container.querySelectorAll('.controls__svg');
      expect(svgElements).toHaveLength(2); // 마이너스와 플러스 버튼 모두 SVG
      
      // 마이너스 아이콘 경로 확인
      const minusPath = container.querySelector('.controls__button--left path');
      expect(minusPath).toHaveAttribute('d', 'M6 12h12'); // 마이너스 라인
      
      // 플러스 아이콘 경로 확인  
      const plusPath = container.querySelector('.controls__button--right path');
      expect(plusPath).toHaveAttribute('d', 'M12 5v14M5 12h14'); // 플러스 모양
    });
  });

  describe('Variant 처리', () => {
    it('stepper variant가 기본값으로 설정됨', () => {
      const { container } = factory();
      expect(container.querySelector('.controls--stepper')).toBeInTheDocument();
      expect(screen.getByText('0')).toBeInTheDocument(); // input 표시됨
    });

    it('navigation variant가 올바르게 적용됨', () => {
      const { container } = factory({ variant: 'navigation', totalItems: 5 });
      
      expect(container.querySelector('.controls--navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('이전')).toBeInTheDocument();
      expect(screen.getByLabelText('다음')).toBeInTheDocument();
      expect(screen.queryByText('0')).not.toBeInTheDocument(); // input 표시되지 않음
    });

  });

  describe('Stepper Variant - Props 처리', () => {
    it('커스텀 초기값이 올바르게 표시됨', () => {
      factory({ variant: 'stepper', value: 5 });
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('음수 값도 올바르게 표시됨', () => {
      factory({ variant: 'stepper', value: -3 });
      expect(screen.getByText('-3')).toBeInTheDocument();
    });

    it('min 제한이 올바르게 적용됨', () => {
      const { container } = factory({ variant: 'stepper', value: 0, min: 0 });
      const minusButton = screen.getByLabelText('값 감소');
      
      expect(minusButton).toBeDisabled();
      expect(container.querySelector('.controls__button--disabled')).toBeInTheDocument();
    });

    it('max 제한이 올바르게 적용됨', () => {
      const { container } = factory({ variant: 'stepper', value: 10, max: 10 });
      const plusButton = screen.getByLabelText('값 증가');
      
      expect(plusButton).toBeDisabled();
      expect(container.querySelector('.controls__button--disabled')).toBeInTheDocument();
    });

    it('커스텀 step 값이 올바르게 적용됨', () => {
      const { emitted } = factory({ variant: 'stepper', value: 0, step: 5 });
      const plusButton = screen.getByLabelText('값 증가');
      
      fireEvent.click(plusButton);
      
      expect(emitted()).toHaveProperty('update:value');
      expect(emitted()['update:value'][0]).toEqual([5]);
    });
  });

  describe('Navigation Variant - Props 처리', () => {
    it('커스텀 totalItems가 올바르게 적용됨', () => {
      const { container } = factory({ 
        variant: 'navigation', 
        currentIndex: 0, 
        totalItems: 3 
      });
      
      const nextButton = screen.getByLabelText('다음');
      expect(nextButton).not.toBeDisabled();
    });

    it('첫 번째 아이템에서 이전 버튼이 비활성화됨', () => {
      factory({ 
        variant: 'navigation', 
        currentIndex: 0, 
        totalItems: 5 
      });
      
      const prevButton = screen.getByLabelText('이전');
      expect(prevButton).toBeDisabled();
    });

    it('마지막 아이템에서 다음 버튼이 비활성화됨', () => {
      factory({ 
        variant: 'navigation', 
        currentIndex: 4, 
        totalItems: 5 
      });
      
      const nextButton = screen.getByLabelText('다음');
      expect(nextButton).toBeDisabled();
    });
  });

  describe('공통 Props 처리', () => {
    it('disabled 상태가 stepper variant에서 올바르게 적용됨', () => {
      factory({ variant: 'stepper', disabled: true });
      
      const minusButton = screen.getByLabelText('값 감소');
      const plusButton = screen.getByLabelText('값 증가');
      
      expect(minusButton).toBeDisabled();
      expect(plusButton).toBeDisabled();
    });

    it('disabled 상태가 navigation variant에서 올바르게 적용됨', () => {
      factory({ variant: 'navigation', disabled: true, totalItems: 5 });
      
      const prevButton = screen.getByLabelText('이전');
      const nextButton = screen.getByLabelText('다음');
      
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });
  });

  describe('Stepper Variant - 증감 기능', () => {
    it('플러스 버튼 클릭 시 값이 증가함', async () => {
      const { emitted } = factory({ variant: 'stepper', value: 0 });
      const plusButton = screen.getByLabelText('값 증가');

      await fireEvent.click(plusButton);

      expect(emitted()).toHaveProperty('update:value');
      expect(emitted()).toHaveProperty('change');
      expect(emitted()).toHaveProperty('increment');
      expect(emitted()['update:value'][0]).toEqual([1]);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('마이너스 버튼 클릭 시 값이 감소함', async () => {
      const { emitted } = factory({ variant: 'stepper', value: 5 });
      const minusButton = screen.getByLabelText('값 감소');

      await fireEvent.click(minusButton);

      expect(emitted()).toHaveProperty('update:value');
      expect(emitted()).toHaveProperty('change');
      expect(emitted()).toHaveProperty('decrement');
      expect(emitted()['update:value'][0]).toEqual([4]);
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('max 값에 도달하면 더 이상 증가하지 않음', async () => {
      const { emitted } = factory({ variant: 'stepper', value: 9, max: 10 });
      const plusButton = screen.getByLabelText('값 증가');

      await fireEvent.click(plusButton); // 10이 됨
      await fireEvent.click(plusButton); // 무시됨

      expect(emitted()['update:value']).toHaveLength(1);
      expect(emitted()['update:value'][0]).toEqual([10]);
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('min 값에 도달하면 더 이상 감소하지 않음', async () => {
      const { emitted } = factory({ variant: 'stepper', value: 1, min: 0 });
      const minusButton = screen.getByLabelText('값 감소');

      await fireEvent.click(minusButton); // 0이 됨
      await fireEvent.click(minusButton); // 무시됨

      expect(emitted()['update:value']).toHaveLength(1);
      expect(emitted()['update:value'][0]).toEqual([0]);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('Navigation Variant - 네비게이션 기능', () => {
    it('다음 버튼 클릭 시 인덱스가 증가함', async () => {
      const { emitted } = factory({ 
        variant: 'navigation', 
        currentIndex: 0, 
        totalItems: 5 
      });
      const nextButton = screen.getByLabelText('다음');

      await fireEvent.click(nextButton);

      expect(emitted()).toHaveProperty('update:currentIndex');
      expect(emitted()).toHaveProperty('next');
      expect(emitted()).toHaveProperty('navigate');
      expect(emitted()['update:currentIndex'][0]).toEqual([1]);
      expect(emitted().next[0]).toEqual([1]);
      expect(emitted().navigate[0]).toEqual([1]);
    });

    it('이전 버튼 클릭 시 인덱스가 감소함', async () => {
      const { emitted } = factory({ 
        variant: 'navigation', 
        currentIndex: 2, 
        totalItems: 5 
      });
      const prevButton = screen.getByLabelText('이전');

      await fireEvent.click(prevButton);

      expect(emitted()).toHaveProperty('update:currentIndex');
      expect(emitted()).toHaveProperty('previous');
      expect(emitted()).toHaveProperty('navigate');
      expect(emitted()['update:currentIndex'][0]).toEqual([1]);
      expect(emitted().previous[0]).toEqual([1]);
      expect(emitted().navigate[0]).toEqual([1]);
    });

    it('첫 번째 인덱스에서 이전 버튼 클릭이 무시됨', async () => {
      const { emitted } = factory({ 
        variant: 'navigation', 
        currentIndex: 0, 
        totalItems: 5 
      });
      const prevButton = screen.getByLabelText('이전');

      await fireEvent.click(prevButton);

      expect(emitted()['update:currentIndex']).toBeUndefined();
    });

    it('마지막 인덱스에서 다음 버튼 클릭이 무시됨', async () => {
      const { emitted } = factory({ 
        variant: 'navigation', 
        currentIndex: 4, 
        totalItems: 5 
      });
      const nextButton = screen.getByLabelText('다음');

      await fireEvent.click(nextButton);

      expect(emitted()['update:currentIndex']).toBeUndefined();
    });
  });

  describe('v-model 동작', () => {
    it('stepper variant에서 value prop 변경 시 표시값이 업데이트됨', async () => {
      const { rerender } = factory({ variant: 'stepper', value: 5 });
      expect(screen.getByText('5')).toBeInTheDocument();

      await rerender({ variant: 'stepper', value: 8 });
      expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('navigation variant에서 currentIndex prop 변경이 반영됨', async () => {
      const { emitted, rerender } = factory({ 
        variant: 'navigation', 
        currentIndex: 0, 
        totalItems: 5 
      });
      
      // 내부에서 변경
      const nextButton = screen.getByLabelText('다음');
      await fireEvent.click(nextButton);

      // 외부에서 변경
      await rerender({ 
        variant: 'navigation', 
        currentIndex: 3, 
        totalItems: 5 
      });
      
      // 다시 내부에서 변경하여 3에서 시작하는지 확인
      await fireEvent.click(nextButton);
      expect(emitted()['update:currentIndex'][1]).toEqual([4]);
    });
  });


  describe('접근성', () => {
    it('stepper variant에서 모든 버튼이 적절한 aria-label을 가짐', () => {
      factory({ variant: 'stepper' });
      expect(screen.getByLabelText('값 감소')).toBeInTheDocument();
      expect(screen.getByLabelText('값 증가')).toBeInTheDocument();
    });

    it('navigation variant에서 모든 버튼이 적절한 aria-label을 가짐', () => {
      factory({ variant: 'navigation', totalItems: 5 });
      expect(screen.getByLabelText('이전')).toBeInTheDocument();
      expect(screen.getByLabelText('다음')).toBeInTheDocument();
    });


    it('키보드로 버튼에 접근 가능함', () => {
      factory({ variant: 'stepper' });
      const minusButton = screen.getByLabelText('값 감소');
      const plusButton = screen.getByLabelText('값 증가');
      
      expect(minusButton).not.toHaveAttribute('tabindex', '-1');
      expect(plusButton).not.toHaveAttribute('tabindex', '-1');
    });
  });

  describe('CSS 클래스', () => {
    it('stepper variant 클래스가 올바르게 적용됨', () => {
      const { container } = factory({ variant: 'stepper' });
      
      expect(container.querySelector('.controls--stepper')).toBeInTheDocument();
      expect(container.querySelector('.controls__button--left')).toBeInTheDocument();
      expect(container.querySelector('.controls__button--right')).toBeInTheDocument();
      expect(container.querySelector('.controls__input')).toBeInTheDocument();
      expect(container.querySelector('.controls__value')).toBeInTheDocument();
    });

    it('navigation variant 클래스가 올바르게 적용됨', () => {
      const { container } = factory({ variant: 'navigation', totalItems: 5 });
      
      expect(container.querySelector('.controls--navigation')).toBeInTheDocument();
      expect(container.querySelector('.controls__button--left')).toBeInTheDocument();
      expect(container.querySelector('.controls__button--right')).toBeInTheDocument();
      expect(container.querySelector('.controls__input')).not.toBeInTheDocument();
    });

    it('비활성화 상태 클래스가 올바르게 적용됨', () => {
      const { container } = factory({ 
        variant: 'stepper', 
        value: 0, 
        min: 0, 
        max: 0 
      });
      
      const disabledButtons = container.querySelectorAll('.controls__button--disabled');
      expect(disabledButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('아이콘 렌더링', () => {
    it('stepper variant에서 SVG 아이콘이 올바르게 렌더링됨', () => {
      const { container } = factory({ variant: 'stepper' });
      
      // 양쪽 버튼 모두 SVG 아이콘
      const svgs = container.querySelectorAll('.controls__svg');
      expect(svgs).toHaveLength(2); // 마이너스와 플러스 버튼 모두 SVG
      
      // 마이너스 아이콘 경로 확인
      const minusPath = container.querySelector('.controls__button--left path');
      expect(minusPath).toHaveAttribute('d', 'M6 12h12');
      
      // 플러스 아이콘 경로 확인
      const plusPath = container.querySelector('.controls__button--right path');
      expect(plusPath).toHaveAttribute('d', 'M12 5v14M5 12h14');
    });

    it('navigation variant에서 SVG 아이콘들이 올바르게 렌더링됨', () => {
      const { container } = factory({ variant: 'navigation', totalItems: 5 });
      
      // 좌우 화살표 SVG 아이콘
      const svgs = container.querySelectorAll('.controls__svg');
      expect(svgs.length).toBe(2); // 왼쪽, 오른쪽 화살표
    });
  });

  describe('엣지 케이스', () => {
    it('navigation variant에서 totalItems가 1일 때 모든 버튼이 비활성화됨', () => {
      factory({ 
        variant: 'navigation', 
        currentIndex: 0, 
        totalItems: 1 
      });
      
      const prevButton = screen.getByLabelText('이전');
      const nextButton = screen.getByLabelText('다음');
      
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });

    it('stepper variant에서 매우 큰 숫자도 올바르게 처리함', async () => {
      const { emitted } = factory({ variant: 'stepper', value: 999999 });
      const plusButton = screen.getByLabelText('값 증가');

      await fireEvent.click(plusButton);

      expect(screen.getByText('1000000')).toBeInTheDocument();
      expect(emitted()['update:value'][0]).toEqual([1000000]);
    });

    it('stepper variant에서 소수점 step도 올바르게 처리함', async () => {
      const { emitted } = factory({ variant: 'stepper', value: 0, step: 0.5 });
      const plusButton = screen.getByLabelText('값 증가');

      await fireEvent.click(plusButton);

      expect(screen.getByText('0.5')).toBeInTheDocument();
      expect(emitted()['update:value'][0]).toEqual([0.5]);
    });
  });
});