import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import Filter from './Filter.vue';
import { describe, it, expect, afterEach } from 'vitest';

describe('Filter.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(Filter, {
      props,
    });

  describe('기본 렌더링', () => {
    it('컴포넌트가 기본 구조로 렌더링됨', () => {
      factory();

      const filterElement = screen.getByTestId('filter');
      expect(filterElement).toBeInTheDocument();
      expect(filterElement).toHaveClass('filter');
    });

    it('기본 텍스트가 표시됨', () => {
      factory();

      expect(screen.getByText('최신순ㆍ3개월')).toBeInTheDocument();
      expect(screen.getByText('추천 상품')).toBeInTheDocument();
    });

    it('default variant에서 아이콘들이 표시됨', () => {
      const { container } = factory({ variant: 'default' });

      const filterIcon = container.querySelector('.filter__filter-icon img');
      const tooltipIcon = container.querySelector('.filter__tooltip-icon img');

      expect(filterIcon).toBeInTheDocument();
      expect(tooltipIcon).toBeInTheDocument();
    });

    it('with-date variant에서 필터 아이콘만 표시됨', () => {
      const { container } = factory({ variant: 'with-date' });

      const filterIcon = container.querySelector('.filter__filter-icon img');
      const tooltipIcon = container.querySelector('.filter__tooltip-icon img');

      expect(filterIcon).toBeInTheDocument();
      expect(tooltipIcon).not.toBeInTheDocument();
    });

    it('default variant에서 왼쪽 영역에 텍스트와 필터 아이콘이 순서대로 배치됨', () => {
      const { container } = factory({ variant: 'default' });

      const leftSection = container.querySelector('.filter__left');
      expect(leftSection).toBeInTheDocument();
      
      const textContent = leftSection?.querySelector('.filter__text-content');
      const filterIcon = leftSection?.querySelector('.filter__filter-icon');
      
      expect(textContent).toBeInTheDocument();
      expect(filterIcon).toBeInTheDocument();
      
      // 순서 확인: 텍스트가 필터 아이콘보다 먼저 와야 함
      const leftChildren = Array.from(leftSection?.children || []);
      const textIndex = leftChildren.findIndex(child => child.classList.contains('filter__text-content'));
      const iconIndex = leftChildren.findIndex(child => child.classList.contains('filter__filter-icon'));
      
      expect(textIndex).toBeLessThan(iconIndex);
    });

    it('with-date variant에서 필터 아이콘이 오른쪽 영역에 배치됨', () => {
      const { container } = factory({ variant: 'with-date' });

      const leftSection = container.querySelector('.filter__left');
      const rightSection = container.querySelector('.filter__right');
      
      // 왼쪽에는 텍스트만
      expect(leftSection?.querySelector('.filter__text-content')).toBeInTheDocument();
      expect(leftSection?.querySelector('.filter__filter-icon')).not.toBeInTheDocument();
      
      // 오른쪽에는 필터 아이콘만
      expect(rightSection?.querySelector('.filter__filter-icon')).toBeInTheDocument();
      expect(rightSection?.querySelector('.filter__tooltip-content')).not.toBeInTheDocument();
    });

    it('default variant에서 오른쪽 영역에 툴팁과 스위치가 순서대로 배치됨', () => {
      const { container } = factory({ variant: 'default' });

      const rightSection = container.querySelector('.filter__right');
      expect(rightSection).toBeInTheDocument();
      
      const tooltipContent = rightSection?.querySelector('.filter__tooltip-content');
      const switchElement = rightSection?.querySelector('.filter__switch');
      
      expect(tooltipContent).toBeInTheDocument();
      expect(switchElement).toBeInTheDocument();
      
      // 순서 확인: 툴팁 컨텐츠가 스위치보다 먼저 와야 함
      const rightChildren = Array.from(rightSection?.children || []);
      const tooltipIndex = rightChildren.findIndex(child => child.classList.contains('filter__tooltip-content'));
      const switchIndex = rightChildren.findIndex(child => child.classList.contains('filter__switch'));
      
      expect(tooltipIndex).toBeLessThan(switchIndex);
    });

    it('스위치가 기본 off 상태로 표시됨', () => {
      const { container } = factory();

      const switchElement = container.querySelector('.filter__switch');
      expect(switchElement).toBeInTheDocument();
      expect(switchElement).toHaveClass('filter__switch--off');
    });
  });

  describe('Props 테스트', () => {
    it('filterText prop이 제대로 표시됨', () => {
      const customText = '인기순ㆍ6개월';
      factory({ filterText: customText });

      expect(screen.getByText(customText)).toBeInTheDocument();
    });

    it('tooltipText prop이 제대로 표시됨', () => {
      const customTooltipText = '인기 상품';
      factory({ tooltipText: customTooltipText });

      expect(screen.getByText(customTooltipText)).toBeInTheDocument();
    });

    it('showDate가 true일 때 날짜 텍스트가 표시됨', () => {
      const customDate = '2024.01.01~2024.12.31';
      factory({ showDate: true, dateText: customDate });

      expect(screen.getByText(customDate)).toBeInTheDocument();
    });

    it('showDate가 false일 때 날짜 텍스트가 숨겨짐', () => {
      const customDate = '2024.01.01~2024.12.31';
      factory({ showDate: false, dateText: customDate });

      expect(screen.queryByText(customDate)).not.toBeInTheDocument();
    });

    it('showDate prop에 따라 올바른 CSS 클래스가 적용됨', () => {
      const { container, rerender } = factory({ showDate: false });
      
      let textContent = container.querySelector('.filter__text-content');
      expect(textContent).toHaveClass('filter__text-content--single-line');
      
      rerender({ showDate: true });
      textContent = container.querySelector('.filter__text-content');
      expect(textContent).toHaveClass('filter__text-content--with-date');
    });

    it('variant prop에 따라 자동으로 설정이 변경됨', () => {
      const { container } = factory({ variant: 'with-date' });

      // 날짜가 표시되어야 함
      expect(screen.getByText('2024.01.01~2024.03.01')).toBeInTheDocument();
      
      // 필터 텍스트가 "최신순"으로 변경되어야 함
      expect(screen.getByText('최신순')).toBeInTheDocument();
      
      // 툴팁과 스위치가 숨겨져야 함
      expect(container.querySelector('.filter__right')).not.toBeInTheDocument();
    });

    it('showFilterIcon이 false일 때 필터 아이콘이 숨겨짐', () => {
      const { container } = factory({ showFilterIcon: false });

      const filterIcon = container.querySelector('.filter__filter-icon');
      expect(filterIcon).not.toBeInTheDocument();
    });

    it('showTooltip이 false일 때 툴팁 영역이 숨겨짐', () => {
      const { container } = factory({ showTooltip: false });

      const tooltipElement = container.querySelector('.filter__tooltip');
      expect(tooltipElement).not.toBeInTheDocument();
    });

    it('showSwitch가 false일 때 스위치가 숨겨짐', () => {
      const { container } = factory({ showSwitch: false });

      const switchElement = container.querySelector('.filter__switch');
      expect(switchElement).not.toBeInTheDocument();
    });

    it('switchValue가 true일 때 스위치가 on 상태로 표시됨', () => {
      const { container } = factory({ switchValue: true });

      const switchElement = container.querySelector('.filter__switch');
      expect(switchElement).toHaveClass('filter__switch--on');
    });
  });

  describe('이벤트 테스트', () => {
    it('스위치 클릭 시 switch-toggle 이벤트가 발생함', async () => {
      let emittedValue: boolean | undefined;
      const { container } = factory({
        switchValue: false,
        'onSwitch-toggle': (value: boolean) => {
          emittedValue = value;
        },
      });

      const switchElement = container.querySelector('.filter__switch');
      expect(switchElement).toBeInTheDocument();

      await fireEvent.click(switchElement!);
      expect(emittedValue).toBe(true);
    });

    it('스위치가 on 상태에서 클릭 시 false 값이 emit됨', async () => {
      let emittedValue: boolean | undefined;
      const { container } = factory({
        switchValue: true,
        'onSwitch-toggle': (value: boolean) => {
          emittedValue = value;
        },
      });

      const switchElement = container.querySelector('.filter__switch');
      await fireEvent.click(switchElement!);
      expect(emittedValue).toBe(false);
    });

    it('필터 아이콘 클릭 시 filter-icon-click 이벤트가 발생함', async () => {
      let clickEvent: MouseEvent | undefined;
      const { container } = factory({
        showFilterIcon: true,
        'onFilter-icon-click': (event: MouseEvent) => {
          clickEvent = event;
        },
      });

      const filterIcon = container.querySelector('.filter__filter-icon');
      expect(filterIcon).toBeInTheDocument();

      await fireEvent.click(filterIcon!);
      expect(clickEvent).toBeDefined();
      expect(clickEvent?.type).toBe('click');
    });

    it('툴팁 아이콘 클릭 시 tooltip-icon-click 이벤트가 발생함', async () => {
      let clickEvent: MouseEvent | undefined;
      const { container } = factory({
        showTooltip: true,
        'onTooltip-icon-click': (event: MouseEvent) => {
          clickEvent = event;
        },
      });

      const tooltipIcon = container.querySelector('.filter__tooltip-icon');
      expect(tooltipIcon).toBeInTheDocument();

      await fireEvent.click(tooltipIcon!);
      expect(clickEvent).toBeDefined();
      expect(clickEvent?.type).toBe('click');
    });
  });

  describe('스타일링', () => {
    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();

      const filterElement = container.querySelector('.filter');
      expect(filterElement).toHaveClass('filter--default');
    });

    it('스위치 크기 클래스가 적용됨', () => {
      const { container } = factory();

      const switchElement = container.querySelector('.filter__switch');
      expect(switchElement).toHaveClass('filter__switch--xs');
    });

    it('스위치 ON 상태일 때 올바른 배경색 클래스가 적용됨', () => {
      const { container } = factory({ switchValue: true });

      const switchElement = container.querySelector('.filter__switch');
      expect(switchElement).toHaveClass('filter__switch--on');
    });

    it('필터 아이콘에 cursor pointer 스타일이 적용됨', () => {
      const { container } = factory({ showFilterIcon: true });

      const filterIcon = container.querySelector('.filter__filter-icon');
      expect(filterIcon).toHaveStyle({ cursor: 'pointer' });
    });

    it('툴팁 아이콘에 cursor pointer 스타일이 적용됨', () => {
      const { container } = factory({ showTooltip: true });

      const tooltipIcon = container.querySelector('.filter__tooltip-icon');
      expect(tooltipIcon).toHaveStyle({ cursor: 'pointer' });
    });

    it('날짜 텍스트 스타일이 올바르게 적용됨', () => {
      const { container } = factory({ showDate: true });

      const dateText = container.querySelector('.filter__date-text');
      expect(dateText).toBeInTheDocument();
      expect(dateText).toHaveStyle({ 'font-weight': '500', color: '#121212' });
    });

    it('레이블 텍스트 스타일이 올바르게 적용됨', () => {
      const { container } = factory();

      const labelText = container.querySelector('.filter__label');
      expect(labelText).toBeInTheDocument();
      expect(labelText).toHaveStyle({ 'font-weight': '400', color: '#505050' });
    });
  });

  describe('접근성', () => {
    it('컴포넌트가 올바른 testid를 가짐', () => {
      factory();

      const filterElement = screen.getByTestId('filter');
      expect(filterElement).toBeInTheDocument();
    });

    it('이미지들이 빈 alt 속성을 가짐 (장식용)', () => {
      const { container } = factory();

      const images = container.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt', '');
      });
    });
  });
});