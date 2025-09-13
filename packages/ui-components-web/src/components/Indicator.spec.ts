import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import Indicator from './Indicator.vue';
import { describe, it, expect, afterEach } from 'vitest';

describe('Indicator.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(Indicator, {
      props,
    });

  describe('기본 렌더링', () => {
    it('컴포넌트가 기본 구조로 렌더링됨', () => {
      factory();

      const indicatorElement = screen.getByTestId('indicator');
      expect(indicatorElement).toBeInTheDocument();
      expect(indicatorElement).toHaveClass('indicator');
    });

    it('number variant에서 current와 total이 표시됨', () => {
      factory({ variant: 'number', current: 1, total: 3 });

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('기본 stop 아이콘이 표시됨', () => {
      factory();

      const stopButton = screen.getByTestId('indicator-stop');
      expect(stopButton).toBeInTheDocument();
    });

    it('이전/다음 네비게이션 버튼이 표시됨', () => {
      factory();

      expect(screen.getByTestId('indicator-prev')).toBeInTheDocument();
      expect(screen.getByTestId('indicator-next')).toBeInTheDocument();
    });
  });

  describe('Number variant', () => {
    it('number variant가 기본값으로 렌더링됨', () => {
      factory({ variant: 'number' });

      const paging = document.querySelector('.indicator__paging');
      expect(paging).toBeInTheDocument();
    });

    it('현재 페이지가 1일 때 이전 버튼이 비활성화됨', () => {
      factory({ variant: 'number', current: 1 });

      const prevButton = screen.getByTestId('indicator-prev');
      expect(prevButton).toBeDisabled();
      expect(prevButton).toHaveClass('indicator__nav-button--disabled');
    });

    it('현재 페이지가 마지막일 때 다음 버튼이 비활성화됨', () => {
      factory({ variant: 'number', current: 3, total: 3 });

      const nextButton = screen.getByTestId('indicator-next');
      expect(nextButton).toBeDisabled();
      expect(nextButton).toHaveClass('indicator__nav-button--disabled');
    });

    it('disabled 상태일 때 모든 버튼이 비활성화됨', () => {
      factory({ variant: 'number', disabled: true });

      expect(screen.getByTestId('indicator-prev')).toBeDisabled();
      expect(screen.getByTestId('indicator-next')).toBeDisabled();
      expect(screen.getByTestId('indicator-stop')).toBeDisabled();
    });
  });

  describe('Dot variant', () => {
    it('dot variant가 올바르게 렌더링됨', () => {
      factory({ variant: 'dot', total: 5 });

      const dots = document.querySelector('.indicator__dots');
      expect(dots).toBeInTheDocument();
      
      // 5개의 dot이 렌더링됨
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByTestId(`indicator-dot-${i}`)).toBeInTheDocument();
      }
    });

    it('현재 페이지의 dot이 active 상태임', () => {
      factory({ variant: 'dot', current: 2, total: 3 });

      const activeDot = screen.getByTestId('indicator-dot-2');
      expect(activeDot).toHaveClass('indicator__dot--active');
      
      const inactiveDot = screen.getByTestId('indicator-dot-1');
      expect(inactiveDot).not.toHaveClass('indicator__dot--active');
    });

    it('dot variant에서도 stop 버튼이 표시됨', () => {
      factory({ variant: 'dot' });

      const stopButton = screen.getByTestId('indicator-stop');
      expect(stopButton).toBeInTheDocument();
      expect(stopButton).toHaveClass('indicator__stop-button--dot-variant');
    });
  });

  describe('이벤트 처리', () => {
    it('이전 버튼 클릭 시 navigate-prev 이벤트 발생', async () => {
      const { emitted } = factory({ current: 2 });

      const prevButton = screen.getByTestId('indicator-prev');
      await fireEvent.click(prevButton);

      expect(emitted()['navigate-prev']).toBeTruthy();
    });

    it('다음 버튼 클릭 시 navigate-next 이벤트 발생', async () => {
      const { emitted } = factory({ current: 1, total: 3 });

      const nextButton = screen.getByTestId('indicator-next');
      await fireEvent.click(nextButton);

      expect(emitted()['navigate-next']).toBeTruthy();
    });

    it('dot 클릭 시 navigate-to 이벤트 발생', async () => {
      const { emitted } = factory({ variant: 'dot', total: 3 });

      const dot = screen.getByTestId('indicator-dot-2');
      await fireEvent.click(dot);

      expect(emitted()['navigate-to']).toBeTruthy();
      expect(emitted()['navigate-to'][0]).toEqual([2]);
    });

    it('stop 버튼 클릭 시 stop 이벤트 발생', async () => {
      const { emitted } = factory();

      const stopButton = screen.getByTestId('indicator-stop');
      await fireEvent.click(stopButton);

      expect(emitted().stop).toBeTruthy();
    });

    it('disabled 상태에서 이벤트가 발생하지 않음', async () => {
      const { emitted } = factory({ disabled: true, current: 2 });

      // 버튼들이 비활성화되어 있으므로 클릭 이벤트가 발생하지 않음
      const prevButton = screen.getByTestId('indicator-prev');
      const nextButton = screen.getByTestId('indicator-next');
      const stopButton = screen.getByTestId('indicator-stop');
      
      await fireEvent.click(prevButton);
      await fireEvent.click(nextButton);
      await fireEvent.click(stopButton);

      expect(emitted()['navigate-prev']).toBeFalsy();
      expect(emitted()['navigate-next']).toBeFalsy();
      expect(emitted().stop).toBeFalsy();
    });

    it('첫 페이지에서 이전 버튼 클릭 시 이벤트가 발생하지 않음', async () => {
      const { emitted } = factory({ current: 1 });

      const prevButton = screen.getByTestId('indicator-prev');
      await fireEvent.click(prevButton);

      expect(emitted()['navigate-prev']).toBeFalsy();
    });

    it('마지막 페이지에서 다음 버튼 클릭 시 이벤트가 발생하지 않음', async () => {
      const { emitted } = factory({ current: 3, total: 3 });

      const nextButton = screen.getByTestId('indicator-next');
      await fireEvent.click(nextButton);

      expect(emitted()['navigate-next']).toBeFalsy();
    });
  });

  describe('접근성', () => {
    it('number variant에서 모든 버튼에 적절한 data-testid가 있음', () => {
      factory({ variant: 'number', total: 3 });

      expect(screen.getByTestId('indicator-prev')).toBeInTheDocument();
      expect(screen.getByTestId('indicator-next')).toBeInTheDocument();
      expect(screen.getByTestId('indicator-stop')).toBeInTheDocument();
    });

    it('dot variant에서 모든 버튼에 적절한 data-testid가 있음', () => {
      factory({ variant: 'dot', total: 3 });

      expect(screen.getByTestId('indicator-stop')).toBeInTheDocument();
      expect(screen.getByTestId('indicator-dot-1')).toBeInTheDocument();
      expect(screen.getByTestId('indicator-dot-2')).toBeInTheDocument();
      expect(screen.getByTestId('indicator-dot-3')).toBeInTheDocument();
    });
  });
});