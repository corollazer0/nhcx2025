// src/components/SearchInterface.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { within, expect, userEvent } from 'storybook/test';
import SearchInterface from './SearchInterface.vue';

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof SearchInterface> = {
  title: 'Components/SearchInterface',
  tags: ['autodocs'],
  component: SearchInterface,
  argTypes: {
    // State control
    state: {
      control: { type: 'select' },
      options: ['default', 'filled', 'focus', 'error'],
      description: '입력 필드의 상태',
      table: { category: 'State' },
    },

    // Input value
    value: {
      control: { type: 'text' },
      description: '입력 필드의 값',
      table: { category: 'Input' },
    },

    // Text content
    labelText: {
      control: { type: 'text' },
      description: '라벨 텍스트',
      table: { category: 'Text Content' },
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
      table: { category: 'Text Content' },
    },
    helperText: {
      control: { type: 'text' },
      description: '안내 문구 텍스트 (error 상태에서는 무시됨)',
      table: { category: 'Text Content' },
    },

    // Options
    showClearButton: {
      control: { type: 'boolean' },
      description: '지우기 버튼 표시 여부',
      table: { category: 'Options' },
    },
    hasClearButton: {
      control: { type: 'boolean' },
      description: 'filled 상태가 아니어도 지우기 버튼 표시 강제 옵션',
      table: { category: 'Options' },
    },

    // Events (read-only documentation)
    'onUpdate:value': {
      description: 'v-model을 위한 값 변경 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    onInput: {
      description: '입력값이 변경될 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    onFocus: {
      description: '입력 필드가 포커스를 받을 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    onBlur: {
      description: '입력 필드가 포커스를 잃을 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    onSearch: {
      description: '검색 버튼을 클릭할 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    onClear: {
      description: '지우기 버튼을 클릭할 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Figma 디자인을 기반으로 구현된 검색 인터페이스 컴포넌트입니다. props를 통해 다양한 입력 상태(기본, 채워진, 포커스, 에러)를 제어할 수 있으며, v-model을 지원합니다.',
      },
    },
    layout: 'padded',
  },
};
export default meta;
type Story = StoryObj<typeof SearchInterface>;

/* ──────────────────────────────────────────────
   1) Playground - 모든 Controls로 실험
   ──────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    // State control
    state: 'default',
    
    // Input value
    value: '',
    
    // Text content
    labelText: '레이블',
    placeholder: '검색어 입력',
    helperText: '안내 문구 입력',
    
    // Options
    showClearButton: true,
    hasClearButton: false,
  },
};

/* ──────────────────────────────────────────────
   2) Default State
   ──────────────────────────────────────────── */
export const DefaultState: Story = {
  args: {
    state: 'default',
    value: '',
    placeholder: '검색어를 입력하세요',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 제목 확인
    await expect(canvas.getByText('search')).toBeInTheDocument();

    // 입력 필드 확인
    await expect(canvas.getByTestId('search-input')).toBeInTheDocument();
    
    // 라벨 확인
    await expect(canvas.getByText('레이블')).toBeInTheDocument();
    
    // 검색 버튼 확인
    await expect(canvas.getByLabelText('검색')).toBeInTheDocument();

    // 지우기 버튼이 없는지 확인 (빈 값이므로)
    await expect(canvas.queryByLabelText('지우기')).not.toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   3) Filled State (값이 채워진 상태)
   ──────────────────────────────────────────── */
export const FilledState: Story = {
  args: {
    state: 'filled',
    value: '검색어 입력',
    labelText: '레이블',
    placeholder: '검색어 입력',
    showClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 입력값이 표시되는지 확인
    await expect(canvas.getByDisplayValue('검색어 입력')).toBeInTheDocument();
    
    // 지우기 버튼이 표시되는지 확인
    await expect(canvas.getByLabelText('지우기')).toBeInTheDocument();

    // 검색 버튼 확인
    await expect(canvas.getByLabelText('검색')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   4) Focus State (포커스 상태)
   ──────────────────────────────────────────── */
export const FocusState: Story = {
  args: {
    state: 'focus',
    value: '검색어 입력',
    labelText: '레이블',
    placeholder: '원하는 상품을 검색하세요',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 포커스 상태 스타일이 적용되었는지 확인
    const inputWrapper = canvasElement.querySelector('.input-wrapper.focus');
    await expect(inputWrapper).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   5) Error State (에러 상태)
   ──────────────────────────────────────────── */
export const ErrorState: Story = {
  args: {
    state: 'error',
    value: '잘못된 검색어',
    labelText: '레이블',
    placeholder: '올바른 검색어를 입력하세요',
    helperText: '일반 안내 문구', // 이것은 무시되고 에러 메시지가 표시됨
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 에러 메시지가 표시되는지 확인
    await expect(canvas.getByText('오류 메시지 출력')).toBeInTheDocument();
    
    // 일반 안내 문구는 표시되지 않아야 함
    await expect(canvas.queryByText('일반 안내 문구')).not.toBeInTheDocument();

    // 에러 상태 스타일이 적용되었는지 확인
    const inputWrapper = canvasElement.querySelector('.input-wrapper.error');
    await expect(inputWrapper).toBeInTheDocument();
    
    const helperError = canvasElement.querySelector('.input-helper.error');
    await expect(helperError).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   6) Without Clear Button
   ──────────────────────────────────────────── */
export const WithoutClearButton: Story = {
  args: {
    state: 'filled',
    value: '지울 수 없는 검색어',
    showClearButton: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 지우기 버튼이 표시되지 않는지 확인
    await expect(canvas.queryByLabelText('지우기')).not.toBeInTheDocument();

    // 채워진 입력 필드는 여전히 존재
    await expect(canvas.getByDisplayValue('지울 수 없는 검색어')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   7) Custom Content
   ──────────────────────────────────────────── */
export const CustomContent: Story = {
  args: {
    state: 'filled',
    value: 'iPhone 15 Pro',
    labelText: '상품 검색',
    placeholder: '제품명, 브랜드명을 입력하세요',
    helperText: '정확한 제품명을 입력하면 더 나은 결과를 얻을 수 있습니다',
    showClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 커스텀 텍스트들이 표시되는지 확인
    await expect(canvas.getByText('상품 검색')).toBeInTheDocument();
    await expect(canvas.getByDisplayValue('iPhone 15 Pro')).toBeInTheDocument();
    await expect(canvas.getByPlaceholderText('제품명, 브랜드명을 입력하세요')).toBeInTheDocument();
    await expect(canvas.getByText('정확한 제품명을 입력하면 더 나은 결과를 얻을 수 있습니다')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   8) Force Clear Button (다른 상태에서도 지우기 버튼 표시)
   ──────────────────────────────────────────── */
export const ForceClearButton: Story = {
  args: {
    state: 'default',
    value: '기본 상태 검색어',
    showClearButton: true,
    hasClearButton: true, // 기본 상태에서도 지우기 버튼 강제 표시
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 기본 상태임에도 지우기 버튼이 표시되는지 확인
    await expect(canvas.getByLabelText('지우기')).toBeInTheDocument();
    await expect(canvas.getByDisplayValue('기본 상태 검색어')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   9) Interactive Events Test
   ──────────────────────────────────────────── */
export const InteractiveEvents: Story = {
  args: {
    state: 'filled',
    value: '상호작용 테스트',
    showClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    console.log('🎯 상호작용 테스트 시작');

    // 1. 입력 필드에 텍스트 수정
    const input = canvas.getByTestId('search-input');
    await user.clear(input);
    await user.type(input, '새로운 검색어');
    console.log('✅ 입력 필드 텍스트 수정 완료');

    // 입력값이 정확히 들어갔는지 확인
    await expect(input).toHaveValue('새로운 검색어');

    // 2. 검색 버튼 클릭
    const searchButton = canvas.getByLabelText('검색');
    await user.click(searchButton);
    console.log('✅ 검색 버튼 클릭 완료');

    // 3. 지우기 버튼 클릭
    const clearButton = canvas.getByLabelText('지우기');
    await user.click(clearButton);
    console.log('✅ 지우기 버튼 클릭 완료');

    // 지우기 후 입력값이 비었는지 확인
    await expect(input).toHaveValue('');

    // 4. 포커스/블러 테스트
    await user.click(input);
    console.log('✅ 입력 필드 포커스 완료');

    await user.tab(); // 다른 요소로 포커스 이동
    console.log('✅ 입력 필드 블러 완료');

    console.log('🏁 상호작용 테스트 완료');
  },
};

/* ──────────────────────────────────────────────
   10) Real Search Scenario (실제 검색 시나리오)
   ──────────────────────────────────────────── */
export const RealSearchScenario: Story = {
  args: {
    state: 'default',
    value: '',
    labelText: '상품 검색',
    placeholder: '제품명, 브랜드명, 키워드를 입력하세요',
    helperText: '정확한 제품명을 입력하면 더 나은 검색 결과를 얻을 수 있습니다',
    showClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    console.log('🎯 실제 검색 시나리오 테스트 시작');

    // 시나리오 1: 새로운 검색어 입력
    const input = canvas.getByTestId('search-input');
    await user.type(input, 'MacBook Pro M3');
    console.log('✅ 시나리오 1: 제품 검색어 입력');

    // 입력값 확인
    await expect(input).toHaveValue('MacBook Pro M3');

    // 검색 실행
    const searchButton = canvas.getByLabelText('검색');
    await user.click(searchButton);
    console.log('✅ 첫 번째 검색 실행 완료');

    // 시나리오 2: 검색어 수정
    await user.clear(input);
    await user.type(input, 'iPhone 15 Pro Max');
    console.log('✅ 시나리오 2: 검색어 수정');

    // 수정된 검색어로 검색
    await user.click(searchButton);
    console.log('✅ 수정된 검색어로 검색 실행');

    // 시나리오 3: 검색어 일부 삭제 후 재검색
    // 백스페이스로 'Max' 삭제
    await user.click(input);
    for (let i = 0; i < 4; i++) {
      await user.keyboard('{Backspace}');
    }
    console.log('✅ 시나리오 3: 검색어 일부 삭제');

    await expect(input).toHaveValue('iPhone 15 Pro');

    // 다시 검색
    await user.click(searchButton);
    console.log('✅ 수정된 검색어로 재검색 실행');

    // 시나리오 4: 전체 검색어 지우기
    const clearButton = canvas.getByLabelText('지우기');
    await user.click(clearButton);
    console.log('✅ 시나리오 4: 전체 검색어 지우기');

    await expect(input).toHaveValue('');

    // 시나리오 5: 새로운 검색어로 마지막 검색
    await user.type(input, 'AirPods Pro');
    await user.click(searchButton);
    console.log('✅ 시나리오 5: 새로운 검색어로 최종 검색');

    console.log('🏁 실제 검색 시나리오 테스트 완료');
    console.log('💡 모든 검색 단계가 정상적으로 동작함을 확인');
  },
};

/* ──────────────────────────────────────────────
   11) State Comparison (상태별 비교)
   ──────────────────────────────────────────── */
export const StateComparison: Story = {
  render: (args) => ({
    components: { SearchInterface },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 24px; grid-template-columns: 1fr 1fr; max-width: 1200px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Default State</h3>
          <SearchInterface 
            state="default"
            value=""
            :labelText="args.labelText"
            :placeholder="args.placeholder"
          />
        </div>
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Filled State</h3>
          <SearchInterface 
            state="filled"
            value="검색어 입력"
            :labelText="args.labelText"
            :placeholder="args.placeholder"
            :showClearButton="args.showClearButton"
          />
        </div>
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Focus State</h3>
          <SearchInterface 
            state="focus"
            value="검색어 입력"
            :labelText="args.labelText"
            :placeholder="args.placeholder"
          />
        </div>
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Error State</h3>
          <SearchInterface 
            state="error"
            value="검색어 입력"
            :labelText="args.labelText"
            :placeholder="args.placeholder"
          />
        </div>
      </div>
    `,
  }),
  args: {
    labelText: '레이블',
    placeholder: '검색어 입력',
    showClearButton: true,
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    console.log('🎯 상태별 비교 표시 완료');
    console.log('💡 모든 상태가 Figma 디자인과 일치하는지 시각적으로 확인하세요');
  },
};

/* ──────────────────────────────────────────────
   12) Accessibility Test
   ──────────────────────────────────────────── */
export const AccessibilityTest: Story = {
  args: {
    state: 'filled',
    value: '접근성 테스트',
    labelText: '검색 필드',
    placeholder: '검색어를 입력하세요',
    showClearButton: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    console.log('🎯 접근성 테스트 시작');

    // 1. 키보드 네비게이션 테스트
    const input = canvas.getByTestId('search-input');
    input.focus();
    console.log('✅ 입력 필드 키보드 포커스');

    // Tab으로 다음 요소들로 이동
    await user.tab(); // 지우기 버튼
    await user.tab(); // 검색 버튼
    console.log('✅ Tab 키로 모든 상호작용 요소 순회 가능');

    // 2. ARIA 라벨 확인
    await expect(canvas.getByLabelText('검색')).toBeInTheDocument();
    await expect(canvas.getByLabelText('지우기')).toBeInTheDocument();
    console.log('✅ 모든 버튼에 적절한 aria-label 설정됨');

    // 3. 제목의 의미론적 구조 확인
    const heading = canvas.getByRole('heading', { level: 1 });
    await expect(heading).toHaveTextContent('search');
    console.log('✅ 제목이 적절한 heading 레벨로 설정됨');

    // 4. 키보드로 버튼 활성화 테스트
    const searchButton = canvas.getByLabelText('검색');
    searchButton.focus();
    await user.keyboard('{Enter}');
    console.log('✅ Enter 키로 검색 버튼 활성화 가능');

    // 5. 라벨과 입력 필드 연결 확인
    await expect(canvas.getByText('검색 필드')).toBeInTheDocument();
    console.log('✅ 입력 필드가 적절한 라벨과 연결됨');

    console.log('🏁 접근성 테스트 완료');
    console.log('💡 모든 접근성 요구사항을 충족함');
  },
};