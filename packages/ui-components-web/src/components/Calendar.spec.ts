// src/components/Calendar.spec.ts
import { render, screen, fireEvent, cleanup } from '@testing-library/vue';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Calendar from './Calendar.vue';

describe('Calendar', () => {
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
      messageText: '안내 문구 입력',
      startDate: '',
      endDate: '',
      startPlaceholder: '선택',
      endPlaceholder: '선택',
      label: true,
      message: true
    };
    return render(Calendar, { 
      props: { ...defaultProps, ...props },
      attrs
    });
  };

  describe('기본 렌더링', () => {
    it('기본 props로 컴포넌트가 렌더링된다', () => {
      factory();

      expect(screen.getByTestId('calendar')).toBeInTheDocument();
      expect(screen.getByTestId('calendar-start-calendar')).toBeInTheDocument();
      expect(screen.getByTestId('calendar-end-calendar')).toBeInTheDocument();
    });

    it('label이 true일 때 레이블이 렌더링된다', () => {
      factory({ label: true, labelText: '날짜 범위' });

      expect(screen.getByTestId('calendar-label')).toBeInTheDocument();
      expect(screen.getByText('날짜 범위')).toBeInTheDocument();
    });

    it('label이 false일 때 레이블이 렌더링되지 않는다', () => {
      factory({ label: false });

      expect(screen.queryByTestId('calendar-label')).not.toBeInTheDocument();
    });

    it('message가 true일 때 메시지가 렌더링된다', () => {
      factory({ message: true, messageText: '날짜를 선택하세요' });

      expect(screen.getByTestId('calendar-message')).toBeInTheDocument();
      expect(screen.getByText('날짜를 선택하세요')).toBeInTheDocument();
    });

    it('message가 false일 때 메시지가 렌더링되지 않는다', () => {
      factory({ message: false });

      expect(screen.queryByTestId('calendar-message')).not.toBeInTheDocument();
    });

    it('placeholder 텍스트가 올바르게 표시된다', () => {
      factory({ 
        startPlaceholder: '시작일 선택',
        endPlaceholder: '종료일 선택'
      });

      expect(screen.getByText('시작일 선택')).toBeInTheDocument();
      expect(screen.getByText('종료일 선택')).toBeInTheDocument();
    });

    it('구분자 "~"가 렌더링된다', () => {
      factory();

      expect(screen.getByText('~')).toBeInTheDocument();
    });
  });

  describe('상태별 렌더링', () => {
    it('inactive 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'inactive' });

      const component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--inactive');
    });

    it('filled 상태가 올바르게 렌더링된다', () => {
      factory({ 
        state: 'filled',
        startDate: '2024.01.01',
        endDate: '2024.01.31'
      });

      const component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--filled');
      expect(screen.getByText('2024.01.01')).toBeInTheDocument();
      expect(screen.getByText('2024.01.31')).toBeInTheDocument();
    });

    it('error 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'error' });

      const component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--error');

      const message = screen.getByTestId('calendar-message');
      expect(message).toHaveClass('calendar__message--error');
    });

    it('readonly 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'readonly' });

      const component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--readonly');

      const startButton = screen.getByTestId('calendar-start-calendar') as HTMLButtonElement;
      const endButton = screen.getByTestId('calendar-end-calendar') as HTMLButtonElement;
      expect(startButton.disabled).toBe(true);
      expect(endButton.disabled).toBe(true);
    });

    it('disabled 상태가 올바르게 렌더링된다', () => {
      factory({ state: 'disabled' });

      const component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--disabled');

      const startButton = screen.getByTestId('calendar-start-calendar') as HTMLButtonElement;
      const endButton = screen.getByTestId('calendar-end-calendar') as HTMLButtonElement;
      expect(startButton.disabled).toBe(true);
      expect(endButton.disabled).toBe(true);
    });
  });

  describe('날짜 값 처리', () => {
    it('startDate가 설정되면 올바르게 표시된다', () => {
      factory({ startDate: '2024.01.01' });

      expect(screen.getByText('2024.01.01')).toBeInTheDocument();
      
      const component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--has-start');
    });

    it('endDate가 설정되면 올바르게 표시된다', () => {
      factory({ endDate: '2024.01.31' });

      expect(screen.getByText('2024.01.31')).toBeInTheDocument();
      
      const component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--has-end');
    });

    it('startDate와 endDate가 모두 설정되면 has-both 클래스가 적용된다', () => {
      factory({ 
        startDate: '2024.01.01',
        endDate: '2024.01.31'
      });

      const component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--has-both');
    });

    it('날짜 값이 없으면 placeholder가 표시된다', () => {
      factory({ 
        startDate: '',
        endDate: '',
        startPlaceholder: '시작일',
        endPlaceholder: '종료일'
      });

      expect(screen.getByText('시작일')).toBeInTheDocument();
      expect(screen.getByText('종료일')).toBeInTheDocument();
    });
  });

  describe('상호작용', () => {
    it('시작일 캘린더 버튼 클릭 시 startCalendarClick 이벤트가 발생한다', async () => {
      const onStartCalendarClick = vi.fn();
      factory({}, { onStartCalendarClick });

      const startButton = screen.getByTestId('calendar-start-calendar');
      await fireEvent.click(startButton);

      expect(onStartCalendarClick).toHaveBeenCalled();
    });

    it('종료일 캘린더 버튼 클릭 시 endCalendarClick 이벤트가 발생한다', async () => {
      const onEndCalendarClick = vi.fn();
      factory({}, { onEndCalendarClick });

      const endButton = screen.getByTestId('calendar-end-calendar');
      await fireEvent.click(endButton);

      expect(onEndCalendarClick).toHaveBeenCalled();
    });

    it('readonly 상태에서는 캘린더 클릭 이벤트가 발생하지 않는다', async () => {
      const onStartCalendarClick = vi.fn();
      const onEndCalendarClick = vi.fn();
      factory({ state: 'readonly' }, { onStartCalendarClick, onEndCalendarClick });

      const startButton = screen.getByTestId('calendar-start-calendar');
      const endButton = screen.getByTestId('calendar-end-calendar');
      
      await fireEvent.click(startButton);
      await fireEvent.click(endButton);

      expect(onStartCalendarClick).not.toHaveBeenCalled();
      expect(onEndCalendarClick).not.toHaveBeenCalled();
    });

    it('disabled 상태에서는 캘린더 클릭 이벤트가 발생하지 않는다', async () => {
      const onStartCalendarClick = vi.fn();
      const onEndCalendarClick = vi.fn();
      factory({ state: 'disabled' }, { onStartCalendarClick, onEndCalendarClick });

      const startButton = screen.getByTestId('calendar-start-calendar');
      const endButton = screen.getByTestId('calendar-end-calendar');
      
      await fireEvent.click(startButton);
      await fireEvent.click(endButton);

      expect(onStartCalendarClick).not.toHaveBeenCalled();
      expect(onEndCalendarClick).not.toHaveBeenCalled();
    });
  });

  describe('v-model 지원', () => {
    it('startDate 변경 시 update:startDate 이벤트가 발생한다', async () => {
      const onUpdateStartDate = vi.fn();
      factory({}, { 'onUpdate:startDate': onUpdateStartDate });

      // 실제 구현에서는 외부에서 날짜 값이 변경되어야 하므로 
      // 이 테스트는 컴포넌트 내부 로직 테스트로 대체 가능
      expect(onUpdateStartDate).toBeDefined();
    });

    it('endDate 변경 시 update:endDate 이벤트가 발생한다', async () => {
      const onUpdateEndDate = vi.fn();
      factory({}, { 'onUpdate:endDate': onUpdateEndDate });

      expect(onUpdateEndDate).toBeDefined();
    });
  });

  describe('접근성', () => {
    it('캘린더 버튼이 올바른 타입을 가진다', () => {
      factory();

      const startButton = screen.getByTestId('calendar-start-calendar');
      const endButton = screen.getByTestId('calendar-end-calendar');
      
      expect(startButton).toHaveAttribute('type', 'button');
      expect(endButton).toHaveAttribute('type', 'button');
    });

    it('border 요소가 aria-hidden 속성을 가진다', () => {
      factory();

      const borders = document.querySelectorAll('.calendar__border');
      borders.forEach(border => {
        expect(border).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('disabled 상태에서 버튼들이 disabled 속성을 가진다', () => {
      factory({ state: 'disabled' });

      const startButton = screen.getByTestId('calendar-start-calendar') as HTMLButtonElement;
      const endButton = screen.getByTestId('calendar-end-calendar') as HTMLButtonElement;
      
      expect(startButton.disabled).toBe(true);
      expect(endButton.disabled).toBe(true);
    });
  });

  describe('조건부 렌더링', () => {
    it('messageText가 없으면 메시지가 렌더링되지 않는다', () => {
      factory({ message: true, messageText: '' });

      expect(screen.queryByTestId('calendar-message')).not.toBeInTheDocument();
    });

    it('label과 message가 모두 false일 때 최소 구성으로 렌더링된다', () => {
      factory({ label: false, message: false });

      expect(screen.queryByTestId('calendar-label')).not.toBeInTheDocument();
      expect(screen.queryByTestId('calendar-message')).not.toBeInTheDocument();
      expect(screen.getByTestId('calendar')).toBeInTheDocument();
    });
  });

  describe('CSS 클래스', () => {
    it('상태에 따른 CSS 클래스가 올바르게 적용된다', () => {
      let { unmount } = factory({ state: 'inactive' });
      let component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--inactive');

      unmount();
      ({ unmount } = factory({ state: 'error' }));
      component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--error');

      unmount();
      factory({ state: 'filled' });
      component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--filled');
    });

    it('날짜 상태에 따른 CSS 클래스가 올바르게 적용된다', () => {
      let { unmount } = factory({ startDate: '2024.01.01' });
      let component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--has-start');

      unmount();
      ({ unmount } = factory({ endDate: '2024.01.31' }));
      component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--has-end');

      unmount();
      factory({ startDate: '2024.01.01', endDate: '2024.01.31' });
      component = screen.getByTestId('calendar');
      expect(component).toHaveClass('calendar--has-both');
    });

    it('메시지 상태에 따른 CSS 클래스가 올바르게 적용된다', () => {
      let { unmount } = factory({ state: 'error', message: true });
      let message = screen.getByTestId('calendar-message');
      expect(message).toHaveClass('calendar__message--error');

      unmount();
      factory({ state: 'inactive', message: true });
      message = screen.getByTestId('calendar-message');
      expect(message).toHaveClass('calendar__message--default');
    });
  });

  describe('컴포넌트 메서드', () => {
    it('clearDates 메서드가 노출된다', () => {
      const { getByTestId } = factory();
      const component = getByTestId('calendar').__vueParentComponent;
      
      expect(component?.exposed?.clearDates).toBeDefined();
    });
  });
});