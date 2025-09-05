// src/components/Controls.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { within, expect, userEvent } from 'storybook/test';
import Controls from './Controls.vue';

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof Controls> = {
  title: 'Components/Controls',
  tags: ['autodocs'],
  component: Controls,
  argTypes: {
    // Variant control
    variant: {
      control: { type: 'select' },
      options: ['stepper', 'navigation'],
      description: '컨트롤 유형 (stepper: 숫자 증감, navigation: 좌우 네비게이션)',
      table: { category: 'Variant' },
    },

    // Stepper props
    value: {
      control: { type: 'number' },
      description: '현재 컨트롤 값 (stepper variant용)',
      table: { category: 'Stepper Props' },
    },
    min: {
      control: { type: 'number' },
      description: '최소값 제한 (stepper variant용)',
      table: { category: 'Stepper Props' },
    },
    max: {
      control: { type: 'number' },
      description: '최대값 제한 (stepper variant용)',
      table: { category: 'Stepper Props' },
    },
    step: {
      control: { type: 'number', step: 0.1 },
      description: '증감 단위 (stepper variant용)',
      table: { category: 'Stepper Props' },
    },

    // Navigation props
    currentIndex: {
      control: { type: 'number' },
      description: '현재 인덱스 (navigation variant용)',
      table: { category: 'Navigation Props' },
    },
    totalItems: {
      control: { type: 'number', min: 1 },
      description: '전체 아이템 수 (navigation variant용)',
      table: { category: 'Navigation Props' },
    },

    // Common props
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
      table: { category: 'Common Props' },
    },

    // Events (read-only documentation)
    'onUpdate:value': {
      description: 'Stepper variant v-model 값 변경 이벤트',
      table: { category: 'Stepper Events' },
      control: false,
    },
    onChange: {
      description: 'Stepper variant 값이 변경될 때 발생하는 이벤트',
      table: { category: 'Stepper Events' },
      control: false,
    },
    onIncrement: {
      description: 'Stepper variant 값이 증가할 때 발생하는 이벤트',
      table: { category: 'Stepper Events' },
      control: false,
    },
    onDecrement: {
      description: 'Stepper variant 값이 감소할 때 발생하는 이벤트',
      table: { category: 'Stepper Events' },
      control: false,
    },
    'onUpdate:currentIndex': {
      description: 'Navigation variant v-model 인덱스 변경 이벤트',
      table: { category: 'Navigation Events' },
      control: false,
    },
    onNext: {
      description: 'Navigation variant 다음으로 이동할 때 발생하는 이벤트',
      table: { category: 'Navigation Events' },
      control: false,
    },
    onPrevious: {
      description: 'Navigation variant 이전으로 이동할 때 발생하는 이벤트',
      table: { category: 'Navigation Events' },
      control: false,
    },
    onNavigate: {
      description: 'Navigation variant 네비게이션 시 발생하는 이벤트',
      table: { category: 'Navigation Events' },
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Figma 디자인을 기반으로 구현된 컨트롤 컴포넌트입니다. 두 가지 variant를 지원합니다: stepper(숫자 증감)와 navigation(좌우 네비게이션). 각 variant에 맞는 props와 이벤트를 제공합니다.',
      },
    },
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Controls>;

/* ──────────────────────────────────────────────
   1) Playground - 모든 Controls로 실험
   ──────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    variant: 'stepper',
    value: 0,
    min: -Infinity,
    max: Infinity,
    step: 1,
    currentIndex: 0,
    totalItems: 5,
    disabled: false,
  },
};

/* ──────────────────────────────────────────────
   2) Stepper Default - 기본 스테퍼
   ──────────────────────────────────────────── */
export const StepperDefault: Story = {
  args: {
    variant: 'stepper',
    value: 0,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 기본 구조 확인
    await expect(canvas.getByTestId('controls')).toBeInTheDocument();
    await expect(canvas.getByLabelText('값 감소')).toBeInTheDocument();
    await expect(canvas.getByLabelText('값 증가')).toBeInTheDocument();
    await expect(canvas.getByText('0')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   3) Navigation Default - 기본 네비게이션
   ──────────────────────────────────────────── */
export const NavigationDefault: Story = {
  args: {
    variant: 'navigation',
    currentIndex: 0,
    totalItems: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 기본 구조 확인
    await expect(canvas.getByTestId('controls')).toBeInTheDocument();
    await expect(canvas.getByLabelText('이전')).toBeInTheDocument();
    await expect(canvas.getByLabelText('다음')).toBeInTheDocument();
    
    // 네비게이션에서는 값 표시 없음
    await expect(canvas.queryByText('0')).not.toBeInTheDocument();
  },
};


/* ──────────────────────────────────────────────
   4) Stepper With Constraints - 제한이 있는 스테퍼
   ──────────────────────────────────────────── */
export const StepperWithConstraints: Story = {
  args: {
    variant: 'stepper',
    value: 5,
    min: 0,
    max: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // 현재 값 확인
    await expect(canvas.getByText('5')).toBeInTheDocument();

    // 증가 테스트
    const plusButton = canvas.getByLabelText('값 증가');
    for (let i = 6; i <= 10; i++) {
      await user.click(plusButton);
      await expect(canvas.getByText(i.toString())).toBeInTheDocument();
    }

    // max 값에서 플러스 버튼이 비활성화되는지 확인
    await expect(plusButton).toBeDisabled();
  },
};

/* ──────────────────────────────────────────────
   5) Navigation Interactive - 상호작용 네비게이션
   ──────────────────────────────────────────── */
export const NavigationInteractive: Story = {
  args: {
    variant: 'navigation',
    currentIndex: 0,
    totalItems: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    console.log('🎯 네비게이션 상호작용 테스트 시작');

    // 초기 상태: 첫 번째에서 이전 버튼 비활성화
    const prevButton = canvas.getByLabelText('이전');
    const nextButton = canvas.getByLabelText('다음');
    
    await expect(prevButton).toBeDisabled();
    await expect(nextButton).not.toBeDisabled();
    console.log('✅ 첫 번째 아이템: 이전 비활성화, 다음 활성화');

    // 네비게이션 테스트 (0 → 1 → 2 → 3 → 4)
    for (let i = 1; i < 5; i++) {
      await user.click(nextButton);
      console.log(`✅ 다음 클릭: ${i-1} → ${i}`);
    }

    // 마지막에서 다음 버튼 비활성화 확인
    await expect(nextButton).toBeDisabled();
    await expect(prevButton).not.toBeDisabled();
    console.log('✅ 마지막 아이템: 다음 비활성화, 이전 활성화');

    // 역방향 네비게이션 테스트
    for (let i = 3; i >= 0; i--) {
      await user.click(prevButton);
      console.log(`✅ 이전 클릭: ${i+1} → ${i}`);
    }

    // 첫 번째로 돌아와서 이전 버튼 비활성화 확인
    await expect(prevButton).toBeDisabled();
    console.log('🏁 네비게이션 상호작용 테스트 완료');
  },
};

/* ──────────────────────────────────────────────
   6) Stepper Custom Step - 커스텀 단위 스테퍼
   ──────────────────────────────────────────── */
export const StepperCustomStep: Story = {
  args: {
    variant: 'stepper',
    value: 0,
    step: 5,
    min: 0,
    max: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // 초기값 확인
    await expect(canvas.getByText('0')).toBeInTheDocument();

    // 5씩 증가하는지 확인
    const plusButton = canvas.getByLabelText('값 증가');
    await user.click(plusButton);
    await expect(canvas.getByText('5')).toBeInTheDocument();

    await user.click(plusButton);
    await expect(canvas.getByText('10')).toBeInTheDocument();

    console.log('✅ 커스텀 step 5로 증가 확인');
  },
};

/* ──────────────────────────────────────────────
   7) Navigation Single Item - 단일 아이템
   ──────────────────────────────────────────── */
export const NavigationSingleItem: Story = {
  args: {
    variant: 'navigation',
    currentIndex: 0,
    totalItems: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 단일 아이템일 때 모든 버튼 비활성화
    const prevButton = canvas.getByLabelText('이전');
    const nextButton = canvas.getByLabelText('다음');
    
    await expect(prevButton).toBeDisabled();
    await expect(nextButton).toBeDisabled();
    
    console.log('✅ 단일 아이템: 모든 네비게이션 버튼 비활성화');
  },
};

/* ──────────────────────────────────────────────
   8) Stepper Disabled State - 비활성화 스테퍼
   ──────────────────────────────────────────── */
export const StepperDisabled: Story = {
  args: {
    variant: 'stepper',
    value: 5,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 모든 버튼이 비활성화되어 있는지 확인
    const minusButton = canvas.getByLabelText('값 감소');
    const plusButton = canvas.getByLabelText('값 증가');
    
    await expect(minusButton).toBeDisabled();
    await expect(plusButton).toBeDisabled();

    // 값은 여전히 표시되는지 확인
    await expect(canvas.getByText('5')).toBeInTheDocument();
    
    console.log('✅ 스테퍼 비활성화 상태 확인');
  },
};

/* ──────────────────────────────────────────────
   9) Navigation Disabled State - 비활성화 네비게이션
   ──────────────────────────────────────────── */
export const NavigationDisabled: Story = {
  args: {
    variant: 'navigation',
    currentIndex: 2,
    totalItems: 5,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 모든 버튼이 비활성화되어 있는지 확인
    const prevButton = canvas.getByLabelText('이전');
    const nextButton = canvas.getByLabelText('다음');
    
    await expect(prevButton).toBeDisabled();
    await expect(nextButton).toBeDisabled();
    
    console.log('✅ 네비게이션 비활성화 상태 확인');
  },
};

/* ──────────────────────────────────────────────
   10) Stepper Decimal Values - 소수점 값
   ──────────────────────────────────────────── */
export const StepperDecimalValues: Story = {
  args: {
    variant: 'stepper',
    value: 0,
    step: 0.5,
    min: 0,
    max: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    // 0.5씩 증가하는지 확인
    const plusButton = canvas.getByLabelText('값 증가');
    await user.click(plusButton);
    await expect(canvas.getByText('0.5')).toBeInTheDocument();

    await user.click(plusButton);
    await expect(canvas.getByText('1')).toBeInTheDocument();

    console.log('✅ 소수점 step 동작 확인');
  },
};

/* ──────────────────────────────────────────────
   11) Navigation Large Set - 많은 아이템
   ──────────────────────────────────────────── */
export const NavigationLargeSet: Story = {
  args: {
    variant: 'navigation',
    currentIndex: 50,
    totalItems: 100,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 중간 위치에서 양쪽 버튼 모두 활성화
    const prevButton = canvas.getByLabelText('이전');
    const nextButton = canvas.getByLabelText('다음');
    
    await expect(prevButton).not.toBeDisabled();
    await expect(nextButton).not.toBeDisabled();
    
    console.log('✅ 많은 아이템 중간 위치: 양쪽 네비게이션 활성화');
  },
};

/* ──────────────────────────────────────────────
   12) Variants Comparison - 두 variant 비교
   ──────────────────────────────────────────── */
export const VariantsComparison: Story = {
  render: (args) => ({
    components: { Controls },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 32px; grid-template-columns: 1fr; max-width: 600px;">
        <div style="text-align: center;">
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 500;">Stepper Variant</h3>
          <Controls variant="stepper" :value="5" :min="0" :max="10" />
          <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
            숫자 값 증감용 - 중앙에 값 표시
          </p>
        </div>
        <div style="text-align: center;">
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 500;">Navigation Variant</h3>
          <Controls variant="navigation" :currentIndex="2" :totalItems="5" />
          <p style="margin: 8px 0 0 0; font-size: 14px; color: #666;">
            좌우 네비게이션용 - 화살표 아이콘만
          </p>
        </div>
      </div>
    `,
  }),
  args: {},
  parameters: {
    layout: 'centered',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    console.log('🎯 두 variant 비교 표시');
    
    // 스테퍼 확인
    await expect(canvas.getByText('5')).toBeInTheDocument();
    console.log('✅ Stepper variant: 값 표시 확인');
    
    // 네비게이션 확인 (값 표시 없음)
    const prevButton = canvas.getByLabelText('이전');
    const nextButton = canvas.getByLabelText('다음');
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
    console.log('✅ Navigation variant: 화살표 버튼 확인');
    
    console.log('💡 두 variant의 차이점을 시각적으로 비교하세요');
  },
};

/* ──────────────────────────────────────────────
   13) Real-world Usage - 실제 사용 예제
   ──────────────────────────────────────────── */
export const RealWorldUsage: Story = {
  render: (args) => ({
    components: { Controls },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 32px; grid-template-columns: 1fr; max-width: 700px;">
        <div style="background: #f8f9fa; padding: 24px; border-radius: 12px;">
          <h4 style="margin: 0 0 12px 0; font-size: 16px;">상품 수량 선택</h4>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span>수량:</span>
            <Controls variant="stepper" :value="1" :min="1" :max="99" />
            <span>개</span>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 24px; border-radius: 12px;">
          <h4 style="margin: 0 0 12px 0; font-size: 16px;">이미지 갤러리 네비게이션</h4>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span>이미지</span>
            <Controls variant="navigation" :currentIndex="0" :totalItems="8" />
            <span>1/8</span>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 24px; border-radius: 12px;">
          <h4 style="margin: 0 0 12px 0; font-size: 16px;">설정 값 조정</h4>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span>볼륨:</span>
            <Controls variant="stepper" :value="50" :min="0" :max="100" :step="5" />
            <span>%</span>
          </div>
        </div>
        
      </div>
    `,
  }),
  args: {},
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    console.log('🎯 실제 사용 예제 표시');
    
    // 각 사용 사례 확인
    const stepperControls = canvas.getAllByTestId('controls');
    expect(stepperControls.length).toBe(3);
    
    console.log('✅ 상품 수량, 갤러리 네비게이션, 설정 값 조정 예제 확인');
    console.log('💡 실제 프로젝트에서 이런 식으로 활용할 수 있습니다');
  },
};

/* ──────────────────────────────────────────────
   14) Accessibility Test - 접근성 테스트
   ──────────────────────────────────────────── */
export const AccessibilityTest: Story = {
  args: {
    variant: 'navigation',
    currentIndex: 2,
    totalItems: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    console.log('🎯 접근성 테스트 시작 (Navigation variant)');

    // ARIA 라벨 확인
    const prevButton = canvas.getByLabelText('이전');
    const nextButton = canvas.getByLabelText('다음');
    
    await expect(prevButton).toBeInTheDocument();
    await expect(nextButton).toBeInTheDocument();
    console.log('✅ 적절한 aria-label 설정 확인');

    // 키보드 접근성 확인
    await expect(prevButton).not.toHaveAttribute('tabindex', '-1');
    await expect(nextButton).not.toHaveAttribute('tabindex', '-1');
    console.log('✅ 키보드 접근성 확인');

    // 키보드로 버튼 조작 테스트
    prevButton.focus();
    await user.keyboard('{Enter}');
    console.log('✅ 키보드 Enter로 네비게이션 조작 가능');

    nextButton.focus();
    await user.keyboard(' '); // Space key
    console.log('✅ 키보드 Space로 네비게이션 조작 가능');

    console.log('🏁 접근성 테스트 완료');
  },
};

/* ──────────────────────────────────────────────
   15) States Overview - 모든 상태 한 눈에
   ──────────────────────────────────────────── */
export const StatesOverview: Story = {
  render: (args) => ({
    components: { Controls },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); max-width: 1200px;">
        <div style="text-align: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Stepper Default</h4>
          <Controls variant="stepper" :value="0" />
        </div>
        
        <div style="text-align: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Stepper At Min</h4>
          <Controls variant="stepper" :value="0" :min="0" />
        </div>
        
        <div style="text-align: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Stepper At Max</h4>
          <Controls variant="stepper" :value="10" :max="10" />
        </div>
        
        <div style="text-align: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Stepper Disabled</h4>
          <Controls variant="stepper" :value="5" :disabled="true" />
        </div>
        
        <div style="text-align: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Navigation Default</h4>
          <Controls variant="navigation" :currentIndex="1" :totalItems="5" />
        </div>
        
        <div style="text-align: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Navigation First</h4>
          <Controls variant="navigation" :currentIndex="0" :totalItems="5" />
        </div>
        
        <div style="text-align: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Navigation Last</h4>
          <Controls variant="navigation" :currentIndex="4" :totalItems="5" />
        </div>
        
        <div style="text-align: center; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Navigation Disabled</h4>
          <Controls variant="navigation" :currentIndex="2" :totalItems="5" :disabled="true" />
        </div>
        
      </div>
    `,
  }),
  args: {},
  parameters: {
    layout: 'padded',
  },
  play: async () => {
    console.log('🎯 모든 컨트롤 상태가 한 눈에 표시됨');
    console.log('💡 각 상태의 시각적 차이를 비교해보세요');
  },
};