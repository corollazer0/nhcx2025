// src/components/GeneralList.spec.ts
import { render, screen, cleanup, fireEvent } from '@testing-library/vue';
import GeneralList from './GeneralList.vue';
import { describe, it, expect, afterEach } from 'vitest';

describe('GeneralList.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(GeneralList, {
      props,
    });

  describe('기본 렌더링', () => {
    it('모든 기본 props가 true일 때 모든 요소가 렌더링됨', () => {
      factory();

      // 라벨 확인
      expect(screen.getByText('라벨')).toBeInTheDocument();

      // 제목과 부가설명 확인
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('상품명');
      expect(screen.getByText('부가설명')).toBeInTheDocument();

      // 리스트 항목들 확인 (기본값)
      const titleElements = screen.getAllByText('타이틀');
      const dataElements = screen.getAllByText('데이터');
      expect(titleElements).toHaveLength(2);
      expect(dataElements).toHaveLength(2);

      // 닫기 버튼 확인 (이제 button 요소)
      expect(screen.getByLabelText('닫기')).toBeInTheDocument();

      // 일반 버튼 확인 (2개의 button: 닫기 + 일반 버튼)
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(4);
      expect(screen.getByText('버튼')).toBeInTheDocument();
    });

    it('컴포넌트에 올바른 CSS 클래스가 적용됨', () => {
      const { container } = factory();
      const mainElement = container.querySelector('.general-list');
      expect(mainElement).toBeInTheDocument();
      expect(mainElement).toHaveClass('general-list');
    });
  });

  describe('동적 데이터 props', () => {
    it('커스텀 텍스트 props가 올바르게 렌더링됨', () => {
      factory({
        labelText: '커스텀 라벨',
        titleText: '커스텀 제목',
        subTextContent: '커스텀 부가설명',
        buttonText: '커스텀 버튼',
      });

      expect(screen.getByText('커스텀 라벨')).toBeInTheDocument();
      expect(screen.getByText('커스텀 제목')).toBeInTheDocument();
      expect(screen.getByText('커스텀 부가설명')).toBeInTheDocument();
      expect(screen.getByText('커스텀 버튼')).toBeInTheDocument();
    });

    it('커스텀 리스트 아이템들이 올바르게 렌더링됨', () => {
      const customItems = [
        { title: '항목1', data: '값1' },
        { title: '항목2', data: '값2' },
        { title: '항목3', data: '값3' },
      ];

      factory({ listItems: customItems });

      expect(screen.getByText('항목1')).toBeInTheDocument();
      expect(screen.getByText('값1')).toBeInTheDocument();
      expect(screen.getByText('항목2')).toBeInTheDocument();
      expect(screen.getByText('값2')).toBeInTheDocument();
      expect(screen.getByText('항목3')).toBeInTheDocument();
      expect(screen.getByText('값3')).toBeInTheDocument();
    });
  });

  describe('이벤트 처리', () => {
    it('버튼 클릭 시 button-click 이벤트가 발생함', async () => {
      const { emitted } = factory();
      const button = screen.getByText('버튼').closest('button');

      await fireEvent.click(button!);

      expect(emitted()).toHaveProperty('button-click');
      expect(emitted()['button-click']).toHaveLength(1);
    });

    it('닫기 버튼 클릭 시 close-click 이벤트가 발생함', async () => {
      const { emitted } = factory();
      const closeButton = screen.getByLabelText('닫기');

      await fireEvent.click(closeButton);

      expect(emitted()).toHaveProperty('close-click');
      expect(emitted()['close-click']).toHaveLength(1);
    });

    it('리스트 아이템 클릭 시 list-item-click 이벤트가 발생함', async () => {
      const customItems = [{ title: '테스트', data: '데이터' }];
      const { emitted } = factory({ listItems: customItems });

      const listItem = screen.getByText('테스트').closest('[role="button"]');
      await fireEvent.click(listItem!);

      expect(emitted()).toHaveProperty('list-item-click');
      expect(emitted()['list-item-click']).toHaveLength(1);
      expect(emitted()['list-item-click'][0]).toEqual([customItems[0], 0, expect.any(Object)]);
    });

    it('리스트 아이템에서 Enter 키 누름 시 이벤트가 발생함', async () => {
      const { emitted } = factory();
      const listItems = screen
        .getAllByRole('button')
        .filter((btn) => btn.getAttribute('tabindex') === '0');

      await fireEvent.keyDown(listItems[0], { key: 'Enter' });

      expect(emitted()).toHaveProperty('list-item-click');
    });

    it('리스트 아이템에서 Space 키 누름 시 이벤트가 발생함', async () => {
      const { emitted } = factory();
      const listItems = screen
        .getAllByRole('button')
        .filter((btn) => btn.getAttribute('tabindex') === '0');

      await fireEvent.keyDown(listItems[0], { key: ' ' });

      expect(emitted()).toHaveProperty('list-item-click');
    });
  });

  describe('props 기반 조건부 렌더링', () => {
    it('label=false일 때 라벨이 렌더링되지 않음', () => {
      factory({ label: false });
      expect(screen.queryByText('라벨')).not.toBeInTheDocument();
    });

    it('subText=false일 때 부가설명이 렌더링되지 않음', () => {
      factory({ subText: false });
      expect(screen.queryByText('부가설명')).not.toBeInTheDocument();
      expect(screen.getByText('상품명')).toBeInTheDocument(); // 제목은 여전히 있어야 함
    });

    it('title=false일 때 제목과 부가설명이 렌더링되지 않음', () => {
      factory({ title: false });
      expect(screen.queryByText('상품명')).not.toBeInTheDocument();
      expect(screen.queryByText('부가설명')).not.toBeInTheDocument();
    });

    it('top=false일 때 상단 섹션 전체가 렌더링되지 않음', () => {
      factory({ top: false });
      expect(screen.queryByText('라벨')).not.toBeInTheDocument();
      expect(screen.queryByText('상품명')).not.toBeInTheDocument();
      expect(screen.queryByText('부가설명')).not.toBeInTheDocument();
    });

    it('list=false일 때 리스트 항목들이 렌더링되지 않음', () => {
      factory({ list: false });
      expect(screen.queryByText('타이틀')).not.toBeInTheDocument();
      expect(screen.queryByText('데이터')).not.toBeInTheDocument();
    });

    it('iconClose=false일 때 닫기 버튼이 렌더링되지 않음', () => {
      factory({ iconClose: false });
      expect(screen.queryByLabelText('닫기')).not.toBeInTheDocument();
    });

    it('button=false일 때 버튼이 렌더링되지 않음', () => {
      factory({ button: false });
      expect(screen.queryByText('버튼')).not.toBeInTheDocument();
    });

    it('buttonMessage=false일 때 버튼 섹션 전체가 렌더링되지 않음', () => {
      factory({ buttonMessage: false });
      expect(screen.queryByText('버튼')).not.toBeInTheDocument();
    });
  });

  describe('복합 props 조합', () => {
    it('label=true, title=false일 때 라벨만 표시됨', () => {
      factory({ label: true, title: false });
      expect(screen.getByText('라벨')).toBeInTheDocument();
      expect(screen.queryByText('상품명')).not.toBeInTheDocument();
    });

    it('title=true, subText=false일 때 제목만 표시됨', () => {
      factory({ title: true, subText: false });
      expect(screen.getByText('상품명')).toBeInTheDocument();
      expect(screen.queryByText('부가설명')).not.toBeInTheDocument();
    });

    it('buttonMessage=true, button=false일 때 버튼 섹션은 있지만 버튼은 없음', () => {
      factory({ buttonMessage: true, button: false });
      expect(screen.getByTestId('button-message-section')).toBeInTheDocument();
      expect(screen.queryByText('버튼')).not.toBeInTheDocument();
    });
  });

  describe('모든 props가 false인 경우', () => {
    it('최소한의 구조만 렌더링됨', () => {
      factory({
        label: false,
        subText: false,
        list: false,
        button: false,
        top: false,
        iconClose: false,
        title: false,
        buttonMessage: false,
        message: false,
      });

      // 기본 컨테이너는 존재해야 함
      expect(screen.getByTestId('general-list')).toBeInTheDocument();

      // 다른 요소들은 없어야 함
      expect(screen.queryByText('라벨')).not.toBeInTheDocument();
      expect(screen.queryByText('상품명')).not.toBeInTheDocument();
      expect(screen.queryByText('타이틀')).not.toBeInTheDocument();
      expect(screen.queryByText('버튼')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('닫기')).not.toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('제목이 올바른 heading 레벨을 가짐', () => {
      factory();
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('상품명');
    });

    it('닫기 버튼에 적절한 aria-label이 있음', () => {
      factory();
      const closeButton = screen.getByLabelText('닫기');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton.tagName).toBe('BUTTON');
    });

    it('버튼이 접근 가능한 요소로 렌더링됨', () => {
      factory();
      const button = screen.getByText('버튼').closest('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('버튼');
    });

    it('리스트 항목들이 키보드로 접근 가능함', () => {
      factory();
      const listItems = screen
        .getAllByRole('button')
        .filter((btn) => btn.getAttribute('tabindex') === '0');
      expect(listItems.length).toBeGreaterThan(0);
    });
  });

  describe('스타일 클래스', () => {
    it('메인 컨테이너에 올바른 클래스들이 적용됨', () => {
      const { container } = factory();
      const mainElement = container.querySelector('.general-list');
      expect(mainElement).toHaveClass('general-list');
    });

    it('라벨에 올바른 클래스가 적용됨', () => {
      const { container } = factory();
      const labelElement = container.querySelector('.label-text');
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent('라벨');
    });

    it('제목에 올바른 클래스가 적용됨', () => {
      const { container } = factory();
      const titleElement = container.querySelector('.title-text');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('상품명');
    });
  });
});
