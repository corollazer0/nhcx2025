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
    it('props가 제공될 때 모든 요소가 렌더링됨', () => {
      factory({
        labels: [{ id: '1', text: '라벨', variant: 'gray' }],
        title: '상품명',
        subtitle: '부가설명',
        dataList: [
          { title: '타이틀1', value: '데이터1' },
          { title: '타이틀2', value: '데이터2' }
        ],
        buttonText: '버튼',
        showCloseButton: true,
        showTooltip: true
      });

      // 라벨 확인
      expect(screen.getByText('라벨')).toBeInTheDocument();

      // 제목과 부가설명 확인
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('상품명');
      expect(screen.getByText('부가설명')).toBeInTheDocument();

      // 리스트 항목들 확인
      expect(screen.getByText('타이틀1')).toBeInTheDocument();
      expect(screen.getByText('데이터1')).toBeInTheDocument();
      expect(screen.getByText('타이틀2')).toBeInTheDocument();
      expect(screen.getByText('데이터2')).toBeInTheDocument();

      // 닫기 버튼 확인
      expect(screen.getByLabelText('닫기')).toBeInTheDocument();

      // 일반 버튼 확인
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
        labels: [{ id: '1', text: '커스텀 라벨', variant: 'gray' }],
        title: '커스텀 제목',
        subtitle: '커스텀 부가설명',
        buttonText: '커스텀 버튼',
      });

      expect(screen.getByText('커스텀 라벨')).toBeInTheDocument();
      expect(screen.getByText('커스텀 제목')).toBeInTheDocument();
      expect(screen.getByText('커스텀 부가설명')).toBeInTheDocument();
      expect(screen.getByText('커스텀 버튼')).toBeInTheDocument();
    });

    it('커스텀 리스트 아이템들이 올바르게 렌더링됨', () => {
      const customItems = [
        { title: '항목1', value: '값1' },
        { title: '항목2', value: '값2' },
        { title: '항목3', value: '값3' },
      ];

      factory({ dataList: customItems });

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
      const { emitted } = factory({ buttonText: '버튼' });
      const button = screen.getByText('버튼').closest('button');

      await fireEvent.click(button!);

      expect(emitted()).toHaveProperty('button-click');
      expect(emitted()['button-click']).toHaveLength(1);
    });

    it('닫기 버튼 클릭 시 close-click 이벤트가 발생함', async () => {
      const { emitted } = factory({ showCloseButton: true });
      const closeButton = screen.getByLabelText('닫기');

      await fireEvent.click(closeButton);

      expect(emitted()).toHaveProperty('close-click');
      expect(emitted()['close-click']).toHaveLength(1);
    });

    it('툴팁 버튼 클릭 시 tooltip-click 이벤트가 발생함', async () => {
      const { emitted } = factory({ title: '제목', showTooltip: true });
      const tooltipButton = screen.getByLabelText('도움말');

      await fireEvent.click(tooltipButton);

      expect(emitted()).toHaveProperty('tooltip-click');
      expect(emitted()['tooltip-click']).toHaveLength(1);
    });
  });

  describe('props 기반 조건부 렌더링', () => {
    it('labels가 비어있을 때 라벨이 렌더링되지 않음', () => {
      factory({ labels: [] });
      expect(screen.queryByText('라벨')).not.toBeInTheDocument();
    });

    it('subtitle가 없을 때 부가설명이 렌더링되지 않음', () => {
      factory({ title: '상품명' });
      expect(screen.queryByText('부가설명')).not.toBeInTheDocument();
      expect(screen.getByText('상품명')).toBeInTheDocument();
    });

    it('title이 없을 때 제목이 렌더링되지 않음', () => {
      factory({ subtitle: '부가설명' });
      expect(screen.queryByText('상품명')).not.toBeInTheDocument();
      expect(screen.getByText('부가설명')).toBeInTheDocument();
    });

    it('showHeader=false일 때 상단 섹션이 렌더링되지 않음', () => {
      factory({ showHeader: false, title: '상품명', labels: [{ id: '1', text: '라벨', variant: 'gray' }] });
      expect(screen.queryByText('라벨')).not.toBeInTheDocument();
      expect(screen.queryByText('상품명')).not.toBeInTheDocument();
    });

    it('dataList가 비어있을 때 리스트 항목들이 렌더링되지 않음', () => {
      factory({ dataList: [] });
      expect(screen.queryByText('타이틀')).not.toBeInTheDocument();
      expect(screen.queryByText('데이터')).not.toBeInTheDocument();
    });

    it('showCloseButton=false일 때 닫기 버튼이 렌더링되지 않음', () => {
      factory({ showCloseButton: false });
      expect(screen.queryByLabelText('닫기')).not.toBeInTheDocument();
    });

    it('buttonText가 없을 때 버튼이 렌더링되지 않음', () => {
      factory({});
      expect(screen.queryByText('버튼')).not.toBeInTheDocument();
    });
  });

  describe('복합 props 조합', () => {
    it('라벨만 있을 때 라벨만 표시됨', () => {
      factory({ labels: [{ id: '1', text: '라벨', variant: 'gray' }] });
      expect(screen.getByText('라벨')).toBeInTheDocument();
      expect(screen.queryByText('상품명')).not.toBeInTheDocument();
    });

    it('제목만 있을 때 제목만 표시됨', () => {
      factory({ title: '상품명' });
      expect(screen.getByText('상품명')).toBeInTheDocument();
      expect(screen.queryByText('부가설명')).not.toBeInTheDocument();
    });

    it('제목과 체크박스가 둘 다 있을 때', () => {
      factory({ title: '상품명', showCheckbox: true });
      expect(screen.getByText('상품명')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  describe('최소 구조 렌더링', () => {
    it('props가 없을 때 최소한의 구조만 렌더링됨', () => {
      factory({
        showHeader: false,
        labels: [],
        dataList: [],
        showCloseButton: false,
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
      factory({ title: '상품명' });
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('상품명');
    });

    it('닫기 버튼에 적절한 aria-label이 있음', () => {
      factory({ showCloseButton: true });
      const closeButton = screen.getByLabelText('닫기');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton.tagName).toBe('BUTTON');
    });

    it('버튼이 접근 가능한 요소로 렌더링됨', () => {
      factory({ buttonText: '버튼' });
      const button = screen.getByText('버튼').closest('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('버튼');
    });

    it('툴팁 버튼이 접근 가능한 요소로 렌더링됨', () => {
      factory({ title: '제목', showTooltip: true });
      const tooltipButton = screen.getByLabelText('도움말');
      expect(tooltipButton).toBeInTheDocument();
      expect(tooltipButton.tagName).toBe('BUTTON');
    });
  });

  describe('스타일 클래스', () => {
    it('메인 컨테이너에 올바른 클래스들이 적용됨', () => {
      const { container } = factory();
      const mainElement = container.querySelector('.general-list');
      expect(mainElement).toHaveClass('general-list');
    });

    it('라벨에 올바른 클래스가 적용됨', () => {
      const { container } = factory({ labels: [{ id: '1', text: '라벨', variant: 'gray' }] });
      const labelElement = container.querySelector('.general-list__label');
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent('라벨');
    });

    it('제목에 올바른 클래스가 적용됨', () => {
      const { container } = factory({ title: '상품명' });
      const titleElement = container.querySelector('.general-list__title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('상품명');
    });
  });
});
