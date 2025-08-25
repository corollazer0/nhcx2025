// src/components/Tab.spec.ts
import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import Tab from './Tab.vue';
import { describe, it, expect, afterEach } from 'vitest';

describe('Tab.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(Tab, {
      props,
    });

  const defaultTabs = [
    { id: 1, label: '메뉴1' },
    { id: 2, label: '메뉴2' },
  ];

  describe('기본 렌더링', () => {
    it('컴포넌트가 기본 구조로 렌더링됨', () => {
      factory();

      // 메인 컨테이너 확인
      expect(screen.getByTestId('tab')).toBeInTheDocument();

      // 기본 탭들 확인 (기본값 2개)
      const tabs = screen.getAllByTestId('tab-tab');
      expect(tabs).toHaveLength(2);

      // 기본 텍스트 확인
      expect(screen.getAllByText('메뉴')).toHaveLength(2);
    });

    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();

      const mainElement = container.querySelector('.tab');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('tab');

      const containerElement = container.querySelector('.tab__container');
      expect(containerElement).toBeInTheDocument();

      const backgroundLine = container.querySelector('.tab__background-line');
      expect(backgroundLine).toBeInTheDocument();
    });

    it('각 탭 요소가 올바른 구조를 가짐', () => {
      const { container } = factory();

      const tabElements = container.querySelectorAll('.tab__tab');
      expect(tabElements).toHaveLength(2);

      tabElements.forEach((tab) => {
        expect(tab.querySelector('.tab__tab-text')).toBeInTheDocument();
      });

      // 첫 번째 탭은 활성 상태이므로 indicator를 가져야 함
      const firstTab = tabElements[0];
      expect(firstTab.querySelector('.tab__tab-indicator')).toBeInTheDocument();
    });
  });

  describe('variant 스타일', () => {
    it('line variant가 기본값으로 설정됨', () => {
      const { container } = factory();

      const tabElement = container.querySelector('.tab');
      expect(tabElement).toHaveClass('tab--line');
    });

    it('chip variant로 렌더링됨', () => {
      const { container } = factory({ variant: 'chip' });

      const tabElement = container.querySelector('.tab');
      const containerElement = container.querySelector('.tab__container');
      const firstTab = container.querySelector('.tab__tab');

      expect(tabElement).toHaveClass('tab--chip');
      expect(containerElement).toHaveClass('tab__container--chip');
      expect(firstTab).toHaveClass('tab__tab--chip');
    });

    it('bar variant로 렌더링됨', () => {
      const { container } = factory({ variant: 'bar' });

      const tabElement = container.querySelector('.tab');
      const containerElement = container.querySelector('.tab__container');
      const firstTab = container.querySelector('.tab__tab');

      expect(tabElement).toHaveClass('tab--bar');
      expect(containerElement).toHaveClass('tab__container--bar');
      expect(firstTab).toHaveClass('tab__tab--bar');
    });

    it('underline variant로 렌더링됨', () => {
      const { container } = factory({ variant: 'underline' });

      const tabElement = container.querySelector('.tab');
      const containerElement = container.querySelector('.tab__container');
      const firstTab = container.querySelector('.tab__tab');

      expect(tabElement).toHaveClass('tab--underline');
      expect(containerElement).toHaveClass('tab__container--underline');
      expect(firstTab).toHaveClass('tab__tab--underline');
    });

    it('chip variant에서 indicator가 렌더링되지 않음', () => {
      const { container } = factory({ variant: 'chip', activeTab: 0 });

      const indicator = container.querySelector('.tab__tab-indicator');
      expect(indicator).not.toBeInTheDocument();
    });

    it('chip variant에서 background line이 렌더링되지 않음', () => {
      const { container } = factory({ variant: 'chip' });

      const backgroundLine = container.querySelector('.tab__background-line');
      expect(backgroundLine).not.toBeInTheDocument();
    });

    it('bar variant에서 indicator가 렌더링되지 않음', () => {
      const { container } = factory({ variant: 'bar', activeTab: 0 });

      const indicator = container.querySelector('.tab__tab-indicator');
      expect(indicator).not.toBeInTheDocument();
    });

    it('bar variant에서 background line이 렌더링되지 않음', () => {
      const { container } = factory({ variant: 'bar' });

      const backgroundLine = container.querySelector('.tab__background-line');
      expect(backgroundLine).not.toBeInTheDocument();
    });

    it('underline variant에서 indicator가 렌더링되지 않음', () => {
      const { container } = factory({ variant: 'underline', activeTab: 0 });

      const indicator = container.querySelector('.tab__tab-indicator');
      expect(indicator).not.toBeInTheDocument();
    });

    it('underline variant에서 background line이 렌더링되지 않음', () => {
      const { container } = factory({ variant: 'underline' });

      const backgroundLine = container.querySelector('.tab__background-line');
      expect(backgroundLine).not.toBeInTheDocument();
    });

    it('line variant에서 indicator와 background line이 렌더링됨', () => {
      const { container } = factory({ variant: 'line', activeTab: 0 });

      const indicator = container.querySelector('.tab__tab-indicator');
      const backgroundLine = container.querySelector('.tab__background-line');

      expect(indicator).toBeInTheDocument();
      expect(backgroundLine).toBeInTheDocument();
    });
  });

  describe('동적 props', () => {
    it('커스텀 탭 배열이 올바르게 렌더링됨', () => {
      const customTabs = [
        { id: 'home', label: '홈' },
        { id: 'about', label: '소개' },
        { id: 'contact', label: '연락처' },
      ];
      factory({ tabs: customTabs });

      const tabs = screen.getAllByTestId('tab-tab');
      expect(tabs).toHaveLength(3);

      expect(screen.getByText('홈')).toBeInTheDocument();
      expect(screen.getByText('소개')).toBeInTheDocument();
      expect(screen.getByText('연락처')).toBeInTheDocument();
    });

    it('활성 탭 인덱스가 올바르게 적용됨', () => {
      const { container } = factory({
        tabs: defaultTabs,
        activeTab: 1,
      });

      const tabElements = container.querySelectorAll('.tab__tab');

      // 첫 번째 탭은 비활성
      expect(tabElements[0]).not.toHaveClass('tab__tab--active');
      expect(tabElements[0].querySelector('.tab__tab-indicator')).not.toBeInTheDocument();

      // 두 번째 탭은 활성
      expect(tabElements[1]).toHaveClass('tab__tab--active');
      expect(tabElements[1].querySelector('.tab__tab-indicator')).toBeInTheDocument();
    });

    it('비활성화된 탭이 올바르게 렌더링됨', () => {
      const tabsWithDisabled = [
        { id: 1, label: '활성 탭' },
        { id: 2, label: '비활성 탭', disabled: true },
      ];

      const { container } = factory({ tabs: tabsWithDisabled });

      const tabElements = container.querySelectorAll('.tab__tab');
      expect(tabElements[1]).toHaveClass('tab__tab--disabled');
    });

    it('전체 컴포넌트 비활성화가 올바르게 작동함', () => {
      const { container } = factory({
        tabs: defaultTabs,
        disabled: true,
      });

      const tabElements = container.querySelectorAll('.tab__tab');
      tabElements.forEach((tab) => {
        expect(tab).toHaveClass('tab__tab--disabled');
      });
    });
  });

  describe('ARIA 및 접근성', () => {
    it('적절한 ARIA 속성을 가짐', () => {
      factory({ tabs: defaultTabs });

      const tabs = screen.getAllByTestId('tab-tab');

      tabs.forEach((tab, index) => {
        expect(tab).toHaveAttribute('role', 'tab');
        expect(tab).toHaveAttribute('aria-controls', `tabpanel-${index === 0 ? 1 : 2}`);

        if (index === 0) {
          expect(tab).toHaveAttribute('aria-selected', 'true');
          expect(tab).toHaveAttribute('tabindex', '0');
        } else {
          expect(tab).toHaveAttribute('aria-selected', 'false');
          expect(tab).toHaveAttribute('tabindex', '-1');
        }
      });
    });

    it('키보드 네비게이션이 가능함', () => {
      factory({ tabs: defaultTabs });

      const tabs = screen.getAllByTestId('tab-tab');
      const activeTab = tabs[0];

      activeTab.focus();
      expect(document.activeElement).toBe(activeTab);
    });
  });

  describe('이벤트 처리', () => {
    describe('탭 클릭', () => {
      it('탭 클릭 시 update:activeTab 이벤트가 발생함', async () => {
        const { emitted } = factory({ tabs: defaultTabs });

        const tabs = screen.getAllByTestId('tab-tab');
        await fireEvent.click(tabs[1]); // 두 번째 탭 클릭

        expect(emitted()).toHaveProperty('update:activeTab');
        expect(emitted()['update:activeTab'][0]).toEqual([1]);
      });

      it('탭 클릭 시 tab-change 이벤트가 발생함', async () => {
        const { emitted } = factory({ tabs: defaultTabs });

        const tabs = screen.getAllByTestId('tab-tab');
        await fireEvent.click(tabs[1]);

        expect(emitted()).toHaveProperty('tab-change');
        expect(emitted()['tab-change'][0]).toEqual([1, defaultTabs[1]]);
      });

      it('활성 탭 클릭 시 이벤트가 발생하지 않음', async () => {
        const { emitted } = factory({ tabs: defaultTabs, activeTab: 0 });

        const tabs = screen.getAllByTestId('tab-tab');
        await fireEvent.click(tabs[0]); // 이미 활성인 탭 클릭

        expect(emitted()).not.toHaveProperty('update:activeTab');
        expect(emitted()).not.toHaveProperty('tab-change');
      });

      it('비활성화된 탭 클릭 시 이벤트가 발생하지 않음', async () => {
        const tabsWithDisabled = [
          { id: 1, label: '활성 탭' },
          { id: 2, label: '비활성 탭', disabled: true },
        ];

        const { emitted } = factory({ tabs: tabsWithDisabled });

        const tabs = screen.getAllByTestId('tab-tab');
        await fireEvent.click(tabs[1]); // 비활성화된 탭 클릭

        expect(emitted()).not.toHaveProperty('update:activeTab');
        expect(emitted()).not.toHaveProperty('tab-change');
      });
    });

    describe('키보드 이벤트', () => {
      it('Enter 키로 탭을 선택할 수 있음', async () => {
        const { emitted } = factory({ tabs: defaultTabs });

        const tabs = screen.getAllByTestId('tab-tab');
        tabs[1].focus();
        await fireEvent.keyDown(tabs[1], { key: 'Enter' });

        expect(emitted()).toHaveProperty('update:activeTab');
        expect(emitted()['update:activeTab'][0]).toEqual([1]);
      });

      it('Space 키로 탭을 선택할 수 있음', async () => {
        const { emitted } = factory({ tabs: defaultTabs });

        const tabs = screen.getAllByTestId('tab-tab');
        tabs[1].focus();
        await fireEvent.keyDown(tabs[1], { key: ' ' });

        expect(emitted()).toHaveProperty('update:activeTab');
        expect(emitted()['update:activeTab'][0]).toEqual([1]);
      });

      it('Arrow Right 키로 다음 탭으로 이동함', async () => {
        const tabs3 = [
          { id: 1, label: '탭1' },
          { id: 2, label: '탭2' },
          { id: 3, label: '탭3' },
        ];

        const { emitted } = factory({ tabs: tabs3, activeTab: 0 });

        const tabs = screen.getAllByTestId('tab-tab');
        await fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });

        expect(emitted()).toHaveProperty('update:activeTab');
        expect(emitted()['update:activeTab'][0]).toEqual([1]);
      });

      it('Arrow Left 키로 이전 탭으로 이동함', async () => {
        const tabs3 = [
          { id: 1, label: '탭1' },
          { id: 2, label: '탭2' },
          { id: 3, label: '탭3' },
        ];

        const { emitted } = factory({ tabs: tabs3, activeTab: 1 });

        const tabs = screen.getAllByTestId('tab-tab');
        await fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });

        expect(emitted()).toHaveProperty('update:activeTab');
        expect(emitted()['update:activeTab'][0]).toEqual([0]);
      });

      it('Arrow 키로 순환 네비게이션이 작동함', async () => {
        const { emitted } = factory({ tabs: defaultTabs, activeTab: 1 });

        const tabs = screen.getAllByTestId('tab-tab');

        // 마지막 탭에서 Arrow Right -> 첫 번째 탭으로
        await fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });
        expect(emitted()['update:activeTab'][0]).toEqual([0]);

        // 현재 탭에서 Arrow Left -> 첫 번째 탭으로
        await fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
        expect(emitted()['update:activeTab'][1]).toEqual([0]);
      });

      it('비활성화된 상태에서 키보드 이벤트가 무시됨', async () => {
        const { emitted } = factory({
          tabs: defaultTabs,
          disabled: true,
        });

        const tabs = screen.getAllByTestId('tab-tab');
        await fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });

        expect(emitted()).not.toHaveProperty('update:activeTab');
      });
    });
  });

  describe('엣지 케이스', () => {
    it('빈 탭 배열을 안전하게 처리함', () => {
      factory({ tabs: [] });

      const tabs = screen.queryAllByTestId('tab-tab');
      expect(tabs).toHaveLength(0);

      // 컨테이너는 여전히 렌더링되어야 함
      expect(screen.getByTestId('tab')).toBeInTheDocument();
    });

    it('단일 탭을 올바르게 처리함', () => {
      const singleTab = [{ id: 1, label: '유일한 탭' }];
      factory({ tabs: singleTab });

      const tabs = screen.getAllByTestId('tab-tab');
      expect(tabs).toHaveLength(1);
      expect(screen.getByText('유일한 탭')).toBeInTheDocument();
    });

    it('잘못된 activeTab 인덱스를 안전하게 처리함', () => {
      const { container } = factory({
        tabs: defaultTabs,
        activeTab: 999,
      });

      // 인덱스가 범위를 벗어나면 아무 탭도 활성화되지 않아야 함
      const activeIndicators = container.querySelectorAll('.tab__tab-indicator');
      expect(activeIndicators).toHaveLength(0);
    });

    it('매우 긴 탭 라벨을 처리할 수 있음', () => {
      const longLabelTabs = [
        { id: 1, label: 'This is a very long tab label that should be handled properly' },
        { id: 2, label: 'Short' },
      ];

      factory({ tabs: longLabelTabs });

      expect(
        screen.getByText('This is a very long tab label that should be handled properly'),
      ).toBeInTheDocument();
      expect(screen.getByText('Short')).toBeInTheDocument();
    });

    it('특수 문자가 포함된 라벨을 처리할 수 있음', () => {
      const specialTabs = [
        { id: 1, label: '탭 #1' },
        { id: 2, label: '50% 할인' },
        { id: 3, label: '@mentions' },
      ];

      factory({ tabs: specialTabs });

      specialTabs.forEach((tab) => {
        expect(screen.getByText(tab.label)).toBeInTheDocument();
      });
    });

    it('모든 탭이 비활성화된 경우를 처리함', async () => {
      const allDisabledTabs = [
        { id: 1, label: '탭1', disabled: true },
        { id: 2, label: '탭2', disabled: true },
      ];

      const { container, emitted } = factory({ tabs: allDisabledTabs });

      const tabElements = container.querySelectorAll('.tab__tab');
      tabElements.forEach((tab) => {
        expect(tab).toHaveClass('tab__tab--disabled');
      });

      // 키보드 네비게이션이 작동하지 않아야 함
      const firstTab = screen.getAllByTestId('tab-tab')[0];
      await fireEvent.keyDown(firstTab, { key: 'ArrowRight' });

      expect(emitted()).not.toHaveProperty('update:activeTab');
    });
  });

  describe('스타일 클래스', () => {
    it('활성 탭에 올바른 클래스가 적용됨', () => {
      const { container } = factory({ tabs: defaultTabs, activeTab: 1 });

      const tabElements = container.querySelectorAll('.tab__tab');
      expect(tabElements[0]).not.toHaveClass('tab__tab--active');
      expect(tabElements[1]).toHaveClass('tab__tab--active');
    });

    it('비활성화된 탭에 올바른 클래스가 적용됨', () => {
      const tabsWithDisabled = [
        { id: 1, label: '정상 탭' },
        { id: 2, label: '비활성 탭', disabled: true },
      ];

      const { container } = factory({ tabs: tabsWithDisabled });

      const tabElements = container.querySelectorAll('.tab__tab');
      expect(tabElements[0]).not.toHaveClass('tab__tab--disabled');
      expect(tabElements[1]).toHaveClass('tab__tab--disabled');
    });

    it('전체 비활성화 시 모든 탭에 비활성화 클래스가 적용됨', () => {
      const { container } = factory({
        tabs: defaultTabs,
        disabled: true,
      });

      const tabElements = container.querySelectorAll('.tab__tab');
      tabElements.forEach((tab) => {
        expect(tab).toHaveClass('tab__tab--disabled');
      });
    });
  });

  describe('variant별 상태 조합', () => {
    const variants = ['line', 'chip', 'bar', 'underline'] as const;

    variants.forEach((variant) => {
      it(`${variant} variant에서 활성/비활성 상태가 올바르게 적용됨`, () => {
        const { container } = factory({
          variant,
          activeTab: 1,
        });

        const tabElement = container.querySelector('.tab');
        const firstTab = container.querySelector('.tab__tab');
        const secondTab = container.querySelectorAll('.tab__tab')[1];

        expect(tabElement).toHaveClass(`tab--${variant}`);
        expect(firstTab).toHaveClass(`tab__tab--${variant}`);
        expect(firstTab).not.toHaveClass('tab__tab--active');
        expect(secondTab).toHaveClass('tab__tab--active');
      });

      it(`${variant} variant에서 disabled 상태가 올바르게 적용됨`, () => {
        const disabledTabs = [
          { id: 1, label: '정상 탭' },
          { id: 2, label: '비활성 탭', disabled: true },
        ];

        const { container } = factory({
          variant,
          tabs: disabledTabs,
        });

        const tabs = container.querySelectorAll('.tab__tab');
        expect(tabs[0]).toHaveClass(`tab__tab--${variant}`);
        expect(tabs[0]).not.toHaveClass('tab__tab--disabled');
        expect(tabs[1]).toHaveClass(`tab__tab--${variant}`);
        expect(tabs[1]).toHaveClass('tab__tab--disabled');
      });

      it(`${variant} variant에서 이벤트가 올바르게 발생함`, async () => {
        const { emitted } = factory({ variant });

        const tabs = screen.getAllByTestId('tab-tab');
        await fireEvent.click(tabs[1]);

        expect(emitted()).toHaveProperty('update:activeTab');
        expect(emitted()['update:activeTab'][0]).toEqual([1]);
      });
    });
  });

  describe('컴포넌트 상호작용', () => {
    it('여러 번 탭 전환이 정상 작동함', async () => {
      const { emitted } = factory({ tabs: defaultTabs });

      const tabs = screen.getAllByTestId('tab-tab');

      // 첫 번째 전환
      await fireEvent.click(tabs[1]);
      expect(emitted()['update:activeTab'][0]).toEqual([1]);

      // 두 번째 전환 (다른 탭 클릭)
      await fireEvent.click(tabs[0]);
      expect(emitted()['update:activeTab']).toHaveLength(1); // 첫 번째 탭이 이미 활성이므로 이벤트 발생하지 않음
    });

    it('포커스 상태를 올바르게 관리함', async () => {
      factory({ tabs: defaultTabs });

      const tabs = screen.getAllByTestId('tab-tab');

      // 포커스 설정
      tabs[0].focus();
      expect(document.activeElement).toBe(tabs[0]);

      // 다른 탭으로 포커스 이동
      tabs[1].focus();
      expect(document.activeElement).toBe(tabs[1]);
    });
  });
});
