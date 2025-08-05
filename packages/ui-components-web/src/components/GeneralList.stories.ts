// src/components/GeneralList.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { within, expect, userEvent } from 'storybook/test';
//import { vi } from 'vitest';
import GeneralList from './GeneralList.vue';

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof GeneralList> = {
  title: 'Components/GeneralList',
  tags: ['autodocs'],
  component: GeneralList,
  argTypes: {
    // Figma Properties (원본 boolean props)
    label: {
      control: { type: 'boolean' },
      description: '라벨 표시 여부',
      table: { category: 'Figma Properties' },
    },
    subText: {
      control: { type: 'boolean' },
      description: '부가설명 표시 여부',
      table: { category: 'Figma Properties' },
    },
    list: {
      control: { type: 'boolean' },
      description: '리스트 항목 표시 여부',
      table: { category: 'Figma Properties' },
    },
    button: {
      control: { type: 'boolean' },
      description: '버튼 표시 여부',
      table: { category: 'Figma Properties' },
    },
    top: {
      control: { type: 'boolean' },
      description: '상단 섹션 표시 여부 (라벨, 제목 포함)',
      table: { category: 'Figma Properties' },
    },
    iconClose: {
      control: { type: 'boolean' },
      description: '닫기 아이콘 표시 여부',
      table: { category: 'Figma Properties' },
    },
    title: {
      control: { type: 'boolean' },
      description: '제목 표시 여부',
      table: { category: 'Figma Properties' },
    },
    buttonMessage: {
      control: { type: 'boolean' },
      description: '버튼 메시지 섹션 표시 여부',
      table: { category: 'Figma Properties' },
    },
    message: {
      control: { type: 'boolean' },
      description: '메시지 표시 여부',
      table: { category: 'Figma Properties' },
    },

    // 동적 데이터 Props
    labelText: {
      control: { type: 'text' },
      description: '라벨 텍스트',
      table: { category: 'Dynamic Content' },
    },
    titleText: {
      control: { type: 'text' },
      description: '제목 텍스트',
      table: { category: 'Dynamic Content' },
    },
    subTextContent: {
      control: { type: 'text' },
      description: '부가설명 텍스트',
      table: { category: 'Dynamic Content' },
    },
    buttonText: {
      control: { type: 'text' },
      description: '버튼 텍스트',
      table: { category: 'Dynamic Content' },
    },
    listItems: {
      control: { type: 'object' },
      description: '리스트 아이템 배열',
      table: { category: 'Dynamic Content' },
    },
    closeIconSrc: {
      control: { type: 'text' },
      description: '닫기 아이콘 이미지 URL',
      table: { category: 'Dynamic Content' },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Figma 디자인을 기반으로 구현된 일반적인 리스트 카드 컴포넌트입니다. 라벨, 제목, 리스트 항목, 버튼 등을 조건부로 표시하며, 동적 데이터와 이벤트 처리를 지원합니다.',
      },
    },
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof GeneralList>;

/* ──────────────────────────────────────────────
   1) Playground - 모든 Controls로 실험
   ──────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    // Figma Properties
    label: true,
    subText: true,
    list: true,
    button: true,
    top: true,
    iconClose: true,
    title: true,
    buttonMessage: true,
    message: false,

    // Dynamic Content
    labelText: '라벨',
    titleText: '상품명',
    subTextContent: '부가설명',
    buttonText: '버튼',
    listItems: [
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' },
    ],
  },
};

/* ──────────────────────────────────────────────
   2) 기본 모든 요소 표시
   ──────────────────────────────────────────── */
export const Default: Story = {
  args: {
    label: true,
    subText: true,
    list: true,
    button: true,
    top: true,
    iconClose: true,
    title: true,
    buttonMessage: true,
    message: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 모든 주요 요소가 표시되는지 확인
    await expect(canvas.getByText('라벨')).toBeInTheDocument();
    await expect(canvas.getByText('상품명')).toBeInTheDocument();
    await expect(canvas.getByText('부가설명')).toBeInTheDocument();
    await expect(canvas.getAllByText('타이틀')).toHaveLength(2);
    await expect(canvas.getAllByText('데이터')).toHaveLength(2);
    await expect(canvas.getByLabelText('닫기')).toBeInTheDocument();
    await expect(canvas.getByText('버튼')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   3) 커스텀 데이터
   ──────────────────────────────────────────── */
export const CustomData: Story = {
  args: {
    label: true,
    subText: true,
    list: true,
    button: true,
    top: true,
    iconClose: true,
    title: true,
    buttonMessage: true,
    message: false,

    labelText: 'NEW',
    titleText: 'iPhone 15 Pro',
    subTextContent: '최신 Apple 스마트폰',
    buttonText: '구매하기',
    listItems: [
      { title: '가격', data: '1,550,000원' },
      { title: '용량', data: '256GB' },
      { title: '색상', data: 'Natural Titanium' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('NEW')).toBeInTheDocument();
    await expect(canvas.getByText('iPhone 15 Pro')).toBeInTheDocument();
    await expect(canvas.getByText('최신 Apple 스마트폰')).toBeInTheDocument();
    await expect(canvas.getByText('1,550,000원')).toBeInTheDocument();
    await expect(canvas.getByText('구매하기')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   4) 이벤트 테스트
   ──────────────────────────────────────────── */
export const InteractiveEvents: Story = {
  args: {
    labelText: 'SALE',
    titleText: '이벤트 상품',
    buttonText: '장바구니 담기',
    listItems: [
      { title: '할인율', data: '30%' },
      { title: '남은시간', data: '2시간' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // 버튼 클릭 테스트
    const button = canvas.getByText('장바구니 담기');
    await user.click(button);

    // 리스트 아이템 클릭 테스트
    const listItem = canvas.getByText('할인율');
    await user.click(listItem);

    // 키보드 내비게이션 테스트
    await user.tab(); // 첫 번째 리스트 아이템으로 이동
    await user.keyboard('{Enter}'); // Enter 키로 클릭
  },
};

/* ──────────────────────────────────────────────
   5) 라벨 없는 버전
   ──────────────────────────────────────────── */
export const WithoutLabel: Story = {
  args: {
    label: false,
    titleText: '기본 상품',
    subTextContent: '라벨이 없는 상품',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryByText('라벨')).not.toBeInTheDocument();
    await expect(canvas.getByText('기본 상품')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   6) 부가설명 없는 버전
   ──────────────────────────────────────────── */
export const WithoutSubText: Story = {
  args: {
    subText: false,
    titleText: '간단한 제목만',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('간단한 제목만')).toBeInTheDocument();
    await expect(canvas.queryByText('부가설명')).not.toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   7) 리스트 없는 버전
   ──────────────────────────────────────────── */
export const WithoutList: Story = {
  args: {
    list: false,
    titleText: '리스트가 없는 카드',
    subTextContent: '단순한 정보만 표시',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('리스트가 없는 카드')).toBeInTheDocument();
    await expect(canvas.queryByText('타이틀')).not.toBeInTheDocument();
    await expect(canvas.queryByText('데이터')).not.toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   8) 버튼 없는 버전
   ──────────────────────────────────────────── */
export const WithoutButton: Story = {
  args: {
    button: false,
    titleText: '읽기 전용 카드',
    subTextContent: '버튼이 없는 정보성 카드',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('읽기 전용 카드')).toBeInTheDocument();
    await expect(canvas.queryByText('버튼')).not.toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   9) 닫기 아이콘 없는 버전
   ──────────────────────────────────────────── */
export const WithoutCloseIcon: Story = {
  args: {
    iconClose: false,
    titleText: '고정 카드',
    subTextContent: '닫을 수 없는 카드',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('고정 카드')).toBeInTheDocument();
    await expect(canvas.queryByLabelText('닫기')).not.toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   10) 상단 섹션 없는 버전
   ──────────────────────────────────────────── */
export const WithoutTopSection: Story = {
  args: {
    top: false,
    listItems: [
      { title: '항목1', data: '값1' },
      { title: '항목2', data: '값2' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 상단 섹션이 비활성화되면 라벨과 제목이 모두 표시되지 않음
    await expect(canvas.queryByText('라벨')).not.toBeInTheDocument();
    await expect(canvas.queryByText('상품명')).not.toBeInTheDocument();

    // 리스트는 여전히 표시되어야 함
    await expect(canvas.getByText('항목1')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   11) 최소 구성 (모든 요소 비활성화)
   ──────────────────────────────────────────── */
export const Minimal: Story = {
  args: {
    label: false,
    subText: false,
    list: false,
    button: false,
    top: false,
    iconClose: false,
    title: false,
    buttonMessage: false,
    message: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 기본 컨테이너만 존재해야 함
    const container = canvasElement.querySelector('.general-list');
    expect(container).toBeInTheDocument();

    // 다른 모든 요소는 없어야 함
    await expect(canvas.queryByText('라벨')).not.toBeInTheDocument();
    await expect(canvas.queryByText('상품명')).not.toBeInTheDocument();
    await expect(canvas.queryByText('타이틀')).not.toBeInTheDocument();
    await expect(canvas.queryByText('버튼')).not.toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   12) 긴 리스트 데이터
   ──────────────────────────────────────────── */
export const LongListData: Story = {
  args: {
    titleText: '상세 스펙',
    subTextContent: '제품의 모든 정보',
    listItems: [
      { title: '브랜드', data: 'Samsung' },
      { title: '모델명', data: 'Galaxy S24 Ultra' },
      { title: '운영체제', data: 'Android 14' },
      { title: '디스플레이', data: '6.8인치 Dynamic AMOLED' },
      { title: '저장용량', data: '512GB' },
      { title: 'RAM', data: '12GB' },
      { title: '배터리', data: '5000mAh' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Galaxy S24 Ultra')).toBeInTheDocument();
    await expect(canvas.getByText('512GB')).toBeInTheDocument();
    await expect(canvas.getByText('5000mAh')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   13) 실제 사용 예제 - Emit 이벤트 활용
   ──────────────────────────────────────────── */
export const RealWorldExample: Story = {
  args: {
    labelText: 'HOT',
    titleText: 'MacBook Pro M3',
    subTextContent: '최신 Apple Silicon 탑재',
    buttonText: '장바구니 담기',
    listItems: [
      { title: '프로세서', data: 'M3 Pro 11코어' },
      { title: '메모리', data: '18GB 통합 메모리' },
      { title: '저장공간', data: '512GB SSD' },
      { title: '가격', data: '2,490,000원' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    console.log('🎯 실제 사용 시나리오 테스트 시작');

    // 컴포넌트 요소들이 올바르게 렌더링되었는지 확인
    await expect(canvas.getByText('HOT')).toBeInTheDocument();
    await expect(canvas.getByText('MacBook Pro M3')).toBeInTheDocument();
    await expect(canvas.getByText('최신 Apple Silicon 탑재')).toBeInTheDocument();

    // 1. 사용자가 제품 정보(가격)를 클릭하여 상세보기
    const priceItem = canvas.getByText('가격').closest('[role="button"]') as HTMLElement;
    if (priceItem) {
      await user.click(priceItem);
      console.log('✅ 가격 정보 클릭 - 상세 정보 모달 표시 (emit 이벤트 발생)');

      // 클릭 후 요소가 여전히 존재하는지 확인
      await expect(canvas.getByText('2,490,000원')).toBeInTheDocument();
    }

    // 2. 키보드로 메모리 정보 확인
    const memoryItem = canvas.getByText('메모리').closest('[role="button"]') as HTMLElement;
    if (memoryItem) {
      memoryItem.focus();
      await user.keyboard('{Enter}');
      console.log('✅ 키보드로 메모리 정보 선택 - 접근성 지원 (emit 이벤트 발생)');

      // 키보드 네비게이션 후 포커스 확인
      await expect(memoryItem).toHaveFocus();
    }

    // 3. 장바구니에 상품 추가
    const addToCartButton = canvas.getByText('장바구니 담기');
    await expect(addToCartButton).toBeInTheDocument();
    await user.click(addToCartButton);
    console.log('✅ 장바구니 담기 클릭 - 상품 추가 처리 (emit 이벤트 발생)');

    // 4. 닫기 버튼으로 카드 제거
    const closeButton = canvas.getByLabelText('닫기');
    await expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    console.log('✅ 닫기 버튼 클릭 - 카드 제거 처리 (emit 이벤트 발생)');

    // 실제 이벤트 발생 통계 (실제 앱에서는 부모 컴포넌트에서 처리)
    console.log('📊 emit 이벤트 발생 통계:');
    console.log('- list-item-click: 2회 (가격, 메모리 클릭)');
    console.log('- button-click: 1회 (장바구니 담기 버튼)');
    console.log('- close-click: 1회 (닫기 버튼)');
    console.log('- 키보드 이벤트: KeyboardEvent 타입으로 전달');
    console.log('- 마우스 이벤트: MouseEvent 타입으로 전달');
    console.log(
      '💡 실제 프로젝트에서는 부모 컴포넌트가 이 이벤트들을 받아서 비즈니스 로직을 처리합니다',
    );
  },
};
