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

    it('기본 텍스트가 표시됨', () => {
      factory();

      expect(screen.getByText('1 | 3')).toBeInTheDocument();
    });

    it('기본 재생 아이콘이 표시됨 (isPlaying=false)', () => {
      const { container } = factory({ isPlaying: false });

      const playButton = screen.getByTestId('indicator-play');
      expect(playButton).toBeInTheDocument();
      
      const playIcon = container.querySelector('svg path');
      expect(playIcon).toBeInTheDocument();
    });

    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();

      const indicatorElement = container.querySelector('.indicator');
      expect(indicatorElement).toBeInTheDocument();
    });
  });

  describe('Variant별 렌더링', () => {
    it('text variant에서 텍스트와 네비게이션이 표시됨', () => {
      const { container } = factory({ variant: 'text' });

      const navigation = container.querySelector('.indicator__navigation');
      expect(navigation).toBeInTheDocument();
      
      const prevButton = screen.getByTestId('indicator-prev');
      const nextButton = screen.getByTestId('indicator-next');
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    it('dot variant에서 점들이 표시됨', () => {
      const { container } = factory({ variant: 'dot', total: 5 });

      const dots = container.querySelector('.indicator__dots');
      expect(dots).toBeInTheDocument();
      
      // 5개의 점이 있어야 함
      const dotButtons = container.querySelectorAll('.indicator__dot');
      expect(dotButtons).toHaveLength(5);
      
      // 첫 번째 점이 활성화되어야 함 (current=1이 기본값)
      const activeDot = container.querySelector('.indicator__dot--active');
      expect(activeDot).toBeInTheDocument();
    });

    it('재생 상태에서 일시정지 아이콘이 표시됨', () => {
      const { container } = factory({ isPlaying: true });

      // 일시정지 아이콘 확인 (두 개의 rect 요소)
      const rects = container.querySelectorAll('svg rect');
      expect(rects).toHaveLength(2);
    });

    it('일시정지 상태에서 재생 아이콘이 표시됨', () => {
      const { container } = factory({ isPlaying: false });

      // 재생 아이콘 확인 - play button 내부의 SVG path를 찾기
      const playButton = container.querySelector('.indicator__play-button');
      const playIcon = playButton.querySelector('svg path');
      expect(playIcon).toBeInTheDocument();
      expect(playIcon).toHaveAttribute('d', 'M4 2.5L9 6L4 9.5V2.5Z');
    });
  });

  describe('Props 테스트', () => {
    it('current와 total props가 제대로 표시됨', () => {
      factory({ current: 2, total: 5 });

      expect(screen.getByText('2 | 5')).toBeInTheDocument();
    });

    it('variant prop이 올바르게 작동함', () => {
      const { container } = factory({ variant: 'dot' });

      const dots = container.querySelector('.indicator__dots');
      expect(dots).toBeInTheDocument();
    });

    it('disabled prop이 버튼들에 적용됨', () => {
      factory({ disabled: true, variant: 'text' });

      const prevButton = screen.getByTestId('indicator-prev');
      const nextButton = screen.getByTestId('indicator-next');
      const playButton = screen.getByTestId('indicator-play');
      
      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
      expect(playButton).toBeDisabled();
    });

    it('isPlaying prop이 올바르게 작동함', () => {
      const { container } = factory({ isPlaying: true });

      // 재생 중일 때는 일시정지 아이콘 (rect 요소들)
      const rects = container.querySelectorAll('svg rect');
      expect(rects).toHaveLength(2);
    });
  });

  describe('이벤트 테스트', () => {
    it('재생 버튼 클릭 시 toggle-play 이벤트가 발생함', async () => {
      const { emitted } = factory();
      const playButton = screen.getByTestId('indicator-play');

      await fireEvent.click(playButton);

      expect(emitted()).toHaveProperty('toggle-play');
      expect(emitted()['toggle-play'][0][0]).toBe(true); // isPlaying이 false에서 true로
    });

    it('text variant에서 이전 버튼 클릭 시 navigate-prev 이벤트가 발생함', async () => {
      const { emitted } = factory({ variant: 'text', current: 2 });
      const prevButton = screen.getByTestId('indicator-prev');

      await fireEvent.click(prevButton);

      expect(emitted()).toHaveProperty('navigate-prev');
    });

    it('text variant에서 다음 버튼 클릭 시 navigate-next 이벤트가 발생함', async () => {
      const { emitted } = factory({ variant: 'text', current: 1, total: 3 });
      const nextButton = screen.getByTestId('indicator-next');

      await fireEvent.click(nextButton);

      expect(emitted()).toHaveProperty('navigate-next');
    });

    it('dot variant에서 점 클릭 시 navigate-to 이벤트가 발생함', async () => {
      const { emitted } = factory({ variant: 'dot', total: 5 });
      const thirdDot = screen.getByTestId('indicator-dot-3');

      await fireEvent.click(thirdDot);

      expect(emitted()).toHaveProperty('navigate-to');
      expect(emitted()['navigate-to'][0][0]).toBe(3);
    });

    it('비활성화 상태에서는 이벤트가 발생하지 않음', async () => {
      const { emitted } = factory({ disabled: true });
      const playButton = screen.getByTestId('indicator-play');

      await fireEvent.click(playButton);

      expect(emitted()).toEqual({});
    });
  });

  describe('아이콘 렌더링', () => {
    it('재생 중일 때 올바른 SVG 구조를 가짐', () => {
      const { container } = factory({ isPlaying: true });

      // 재생 버튼 내부의 SVG를 찾기
      const playButton = container.querySelector('.indicator__play-button');
      const svg = playButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '12');
      expect(svg).toHaveAttribute('height', '12');
      expect(svg).toHaveAttribute('viewBox', '0 0 12 12');

      // 일시정지 아이콘 (두 개의 세로 막대)
      const rects = playButton.querySelectorAll('svg rect');
      expect(rects).toHaveLength(2);
      expect(rects[0]).toHaveAttribute('x', '3');
      expect(rects[0]).toHaveAttribute('width', '2');
      expect(rects[1]).toHaveAttribute('x', '7');
      expect(rects[1]).toHaveAttribute('width', '2');
    });

    it('일시정지 상태에서 올바른 SVG 구조를 가짐', () => {
      const { container } = factory({ isPlaying: false });

      // 재생 버튼 내부의 SVG를 찾기
      const playButton = container.querySelector('.indicator__play-button');
      const svg = playButton.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('width', '12');
      expect(svg).toHaveAttribute('height', '12');
      expect(svg).toHaveAttribute('viewBox', '0 0 12 12');

      // 재생 아이콘 (삼각형)
      const path = playButton.querySelector('svg path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('접근성', () => {
    it('컴포넌트가 올바른 testid를 가짐', () => {
      factory();

      const indicatorElement = screen.getByTestId('indicator');
      expect(indicatorElement).toBeInTheDocument();
    });

    it('버튼들이 올바른 testid를 가짐', () => {
      factory({ variant: 'text' });

      const prevButton = screen.getByTestId('indicator-prev');
      const nextButton = screen.getByTestId('indicator-next');
      const playButton = screen.getByTestId('indicator-play');
      
      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
      expect(playButton).toBeInTheDocument();
    });

    it('dot variant에서 점들이 올바른 testid를 가짐', () => {
      factory({ variant: 'dot', total: 3 });

      const dot1 = screen.getByTestId('indicator-dot-1');
      const dot2 = screen.getByTestId('indicator-dot-2');
      const dot3 = screen.getByTestId('indicator-dot-3');
      
      expect(dot1).toBeInTheDocument();
      expect(dot2).toBeInTheDocument();
      expect(dot3).toBeInTheDocument();
    });
  });

  describe('스타일링', () => {
    it('텍스트 요소가 올바른 클래스를 가짐', () => {
      const { container } = factory({ variant: 'text' });

      const textElement = container.querySelector('.indicator__text');
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveTextContent('1 | 3');
    });

    it('dot variant에서 점들이 올바른 클래스를 가짐', () => {
      const { container } = factory({ variant: 'dot', current: 2, total: 3 });

      const dots = container.querySelectorAll('.indicator__dot');
      expect(dots).toHaveLength(3);
      
      // 두 번째 점이 활성화되어야 함
      const activeDot = container.querySelector('.indicator__dot--active');
      expect(activeDot).toBeInTheDocument();
    });

    it('재생 버튼이 올바른 클래스를 가짐', () => {
      const { container } = factory();

      const playButton = container.querySelector('.indicator__play-button');
      expect(playButton).toBeInTheDocument();
    });

    it('dot variant에서 재생 버튼이 투명 배경 클래스를 가짐', () => {
      const { container } = factory({ variant: 'dot' });

      const playButton = container.querySelector('.indicator__play-button--dot-variant');
      expect(playButton).toBeInTheDocument();
    });
  });

  describe('컴포넌트 상호작용', () => {
    it('isPlaying 변경 시 아이콘이 올바르게 변경됨', async () => {
      const { container, rerender } = factory({ isPlaying: false });

      // 초기 상태 확인 (재생 아이콘) - 재생 버튼 내부만 확인
      const playButton = container.querySelector('.indicator__play-button');
      let playIcon = playButton.querySelector('svg path');
      expect(playIcon).toBeInTheDocument();

      // 재생 중으로 변경
      await rerender({ isPlaying: true });
      const pauseIcons = playButton.querySelectorAll('svg rect');
      expect(pauseIcons).toHaveLength(2);
      
      // 재생 버튼 내부에는 더 이상 path 요소가 없어야 함
      playIcon = playButton.querySelector('svg path');
      expect(playIcon).not.toBeInTheDocument();
    });

    it('current/total 변경 시 올바르게 업데이트됨', async () => {
      const { rerender } = factory({ current: 1, total: 3 });

      expect(screen.getByText('1 | 3')).toBeInTheDocument();

      await rerender({ current: 2, total: 5 });
      expect(screen.getByText('2 | 5')).toBeInTheDocument();
      expect(screen.queryByText('1 | 3')).not.toBeInTheDocument();
    });

    it('variant 변경 시 올바르게 업데이트됨', async () => {
      const { container, rerender } = factory({ variant: 'text' });

      let navigation = container.querySelector('.indicator__navigation');
      expect(navigation).toBeInTheDocument();

      await rerender({ variant: 'dot' });
      const dots = container.querySelector('.indicator__dots');
      expect(dots).toBeInTheDocument();
      
      navigation = container.querySelector('.indicator__navigation');
      expect(navigation).not.toBeInTheDocument();
    });
  });

  describe('엣지 케이스', () => {
    it('current가 1일 때 이전 버튼이 비활성화됨', () => {
      factory({ variant: 'text', current: 1 });

      const prevButton = screen.getByTestId('indicator-prev');
      expect(prevButton).toBeDisabled();
    });

    it('current가 total과 같을 때 다음 버튼이 비활성화됨', () => {
      factory({ variant: 'text', current: 3, total: 3 });

      const nextButton = screen.getByTestId('indicator-next');
      expect(nextButton).toBeDisabled();
    });

    it('undefined variant에 대해 기본값(text)을 사용함', () => {
      const { container } = factory({ variant: undefined });

      const navigation = container.querySelector('.indicator__navigation');
      expect(navigation).toBeInTheDocument();
    });

    it('큰 total 값도 올바르게 처리함', () => {
      factory({ current: 10, total: 99 });

      expect(screen.getByText('10 | 99')).toBeInTheDocument();
    });
  });
});