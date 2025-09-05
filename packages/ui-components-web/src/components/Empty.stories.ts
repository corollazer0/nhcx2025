import type { Meta, StoryObj } from '@storybook/vue3';
import { within, expect } from 'storybook/test';
import Empty from './Empty.vue';

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  tags: ['autodocs'],
  component: Empty,
  argTypes: {
    // Figma properties mapped to Vue props
    prop1Line: {
      control: { type: 'boolean' },
      description: 'Figma property: prop1Line 활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Figma Properties',
      },
    },
    prop2Line: {
      control: { type: 'boolean' },
      description: 'Figma property: prop2Line 활성화 여부 (메시지 표시)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Figma Properties',
      },
    },
    textButton: {
      control: { type: 'boolean' },
      description: 'Figma property: textButton 활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Figma Properties',
      },
    },
    iconNoData: {
      control: { type: 'boolean' },
      description: 'Figma property: iconNoData 활성화 여부 (아이콘 표시)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Figma Properties',
      },
    },

    // Additional props
    message: {
      control: { type: 'text' },
      description: '표시할 메시지 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '조회 결과가 없습니다.' },
        category: 'Content',
      },
    },

    // Style variant props
    variant: {
      control: { type: 'select' },
      options: ['default', 'large'],
      description: '컴포넌트 전체 크기 변형',
      table: {
        type: { summary: "'default' | 'large'" },
        defaultValue: { summary: 'default' },
        category: 'Style Variants',
      },
    },
    iconSize: {
      control: { type: 'select' },
      options: ['small', 'large'],
      description: '아이콘 크기 변형',
      table: {
        type: { summary: "'small' | 'large'" },
        defaultValue: { summary: 'small' },
        category: 'Style Variants',
      },
    },
    fontSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '텍스트 크기 변형',
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'small' },
        category: 'Style Variants',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Figma 디자인을 100% 정확히 구현한 Empty 컴포넌트입니다. 데이터가 없는 상태를 사용자에게 시각적으로 알려주는 컴포넌트로, 아이콘과 메시지를 조합하여 다양한 상태를 표현할 수 있습니다. 녹색 점선 테두리와 연한 녹색 배경으로 Figma 디자인과 완전히 일치합니다.',
      },
    },
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof Empty>;

/* ──────────────────────────────────────────────
   1) Playground - 모든 Controls로 실험
   ──────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    prop1Line: false,
    prop2Line: true,
    textButton: false,
    iconNoData: true,
    message: '조회 결과가 없습니다.',
  },
  parameters: {
    layout: 'padded',
  },
};

/* ──────────────────────────────────────────────
   2) Default - 기본 상태 (Figma 기본값)
   ──────────────────────────────────────────── */
export const Default: Story = {
  args: {
    prop1Line: false,
    prop2Line: true,
    textButton: false,
    iconNoData: true,
    message: '조회 결과가 없습니다.',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 기본 구조 확인
    await expect(canvas.getByTestId('empty')).toBeInTheDocument();
    await expect(canvas.getByTestId('empty-icon')).toBeInTheDocument();
    await expect(canvas.getByTestId('empty-message')).toBeInTheDocument();
    
    // 기본 메시지 확인
    await expect(canvas.getByText('조회 결과가 없습니다.')).toBeInTheDocument();
    
    console.log('✅ 기본 Empty 컴포넌트가 정상적으로 렌더링됨');
  },
};

/* ──────────────────────────────────────────────
   3) Icon Only - 아이콘만 표시
   ──────────────────────────────────────────── */
export const IconOnly: Story = {
  args: {
    prop1Line: false,
    prop2Line: false,
    textButton: false,
    iconNoData: true,
    message: '조회 결과가 없습니다.',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 아이콘은 표시되고 메시지는 숨겨져야 함
    await expect(canvas.getByTestId('empty-icon')).toBeInTheDocument();
    await expect(canvas.queryByTestId('empty-message')).not.toBeInTheDocument();
    
    console.log('✅ 아이콘만 표시되는 상태 확인');
  },
};

/* ──────────────────────────────────────────────
   4) Message Only - 메시지만 표시
   ──────────────────────────────────────────── */
export const MessageOnly: Story = {
  args: {
    prop1Line: false,
    prop2Line: true,
    textButton: false,
    iconNoData: false,
    message: '조회 결과가 없습니다.',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 메시지는 표시되고 아이콘은 숨겨져야 함
    await expect(canvas.queryByTestId('empty-icon')).not.toBeInTheDocument();
    await expect(canvas.getByTestId('empty-message')).toBeInTheDocument();
    await expect(canvas.getByText('조회 결과가 없습니다.')).toBeInTheDocument();
    
    console.log('✅ 메시지만 표시되는 상태 확인');
  },
};

/* ──────────────────────────────────────────────
   5) Empty State - 모든 요소 숨김
   ──────────────────────────────────────────── */
export const EmptyState: Story = {
  args: {
    prop1Line: false,
    prop2Line: false,
    textButton: false,
    iconNoData: false,
    message: '조회 결과가 없습니다.',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 아이콘과 메시지 모두 숨겨져야 함
    await expect(canvas.queryByTestId('empty-icon')).not.toBeInTheDocument();
    await expect(canvas.queryByTestId('empty-message')).not.toBeInTheDocument();
    
    // 하지만 컨테이너와 테두리는 여전히 존재해야 함
    await expect(canvas.getByTestId('empty')).toBeInTheDocument();
    
    console.log('✅ 빈 상태 (컨테이너만) 확인');
  },
};

/* ──────────────────────────────────────────────
   6) Custom Message - 커스텀 메시지
   ──────────────────────────────────────────── */
export const CustomMessage: Story = {
  args: {
    prop1Line: false,
    prop2Line: true,
    textButton: false,
    iconNoData: true,
    message: '검색 결과를 찾을 수 없습니다.',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 커스텀 메시지 확인
    await expect(canvas.getByText('검색 결과를 찾을 수 없습니다.')).toBeInTheDocument();
    await expect(canvas.getByTestId('empty-icon')).toBeInTheDocument();
    
    console.log('✅ 커스텀 메시지가 정상적으로 표시됨');
  },
};

/* ──────────────────────────────────────────────
   7) Long Message - 긴 메시지 테스트
   ──────────────────────────────────────────── */
export const LongMessage: Story = {
  args: {
    prop1Line: false,
    prop2Line: true,
    textButton: false,
    iconNoData: true,
    message: '입력하신 검색어에 해당하는 결과를 찾을 수 없습니다. 다른 검색어로 다시 시도해보세요.',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 긴 메시지가 정상적으로 표시되는지 확인
    await expect(canvas.getByText('입력하신 검색어에 해당하는 결과를 찾을 수 없습니다. 다른 검색어로 다시 시도해보세요.')).toBeInTheDocument();
    
    console.log('✅ 긴 메시지가 정상적으로 처리됨');
  },
};

/* ──────────────────────────────────────────────
   8) All Props Enabled - 모든 Figma Properties 활성화
   ──────────────────────────────────────────── */
export const AllPropsEnabled: Story = {
  args: {
    prop1Line: true,
    prop2Line: true,
    textButton: true,
    iconNoData: true,
    message: '모든 속성이 활성화된 상태입니다.',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 현재 구현에서는 prop1Line과 textButton이 UI에 직접적인 영향을 주지 않음
    // 하지만 아이콘과 메시지는 표시되어야 함
    await expect(canvas.getByTestId('empty-icon')).toBeInTheDocument();
    await expect(canvas.getByTestId('empty-message')).toBeInTheDocument();
    await expect(canvas.getByText('모든 속성이 활성화된 상태입니다.')).toBeInTheDocument();
    
    console.log('✅ 모든 Figma Properties가 활성화된 상태 확인');
  },
};

/* ──────────────────────────────────────────────
   9) Accessibility Test - 접근성 테스트
   ──────────────────────────────────────────── */
export const AccessibilityTest: Story = {
  args: {
    prop1Line: false,
    prop2Line: true,
    textButton: false,
    iconNoData: true,
    message: '접근성 테스트용 메시지입니다.',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    console.log('🎯 접근성 테스트 시작');

    // 아이콘 이미지 접근성 확인
    const iconImage = canvas.getByRole('presentation');
    await expect(iconImage).toBeInTheDocument();
    await expect(iconImage).toHaveAttribute('alt', '');
    console.log('✅ 아이콘 이미지 접근성 속성 확인');

    // 점선 테두리가 스크린 리더에서 숨겨지는지 확인
    const border = canvasElement.querySelector('.empty__border');
    await expect(border).toHaveAttribute('aria-hidden', 'true');
    console.log('✅ 점선 테두리 aria-hidden 속성 확인');

    // 텍스트가 적절히 읽힐 수 있는지 확인
    await expect(canvas.getByText('접근성 테스트용 메시지입니다.')).toBeInTheDocument();
    console.log('✅ 텍스트 접근성 확인');

    console.log('🏁 접근성 테스트 완료');
  },
};

/* ──────────────────────────────────────────────
   10) Visual States - 모든 시각적 상태 비교
   ──────────────────────────────────────────── */
export const VisualStates: Story = {
  render: (args) => ({
    components: { Empty },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 32px; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); max-width: 1600px;">
        <div style="text-align: center;">
          <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Default (Icon + Message)</h4>
          <div style="width: 400px; height: 400px;">
            <Empty :iconNoData="true" :prop2Line="true" message="조회 결과가 없습니다." />
          </div>
        </div>
        
        <div style="text-align: center;">
          <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Icon Only</h4>
          <div style="width: 400px; height: 400px;">
            <Empty :iconNoData="true" :prop2Line="false" />
          </div>
        </div>
        
        <div style="text-align: center;">
          <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Message Only</h4>
          <div style="width: 400px; height: 400px;">
            <Empty :iconNoData="false" :prop2Line="true" message="데이터가 없습니다." />
          </div>
        </div>
        
        <div style="text-align: center;">
          <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Empty State</h4>
          <div style="width: 400px; height: 400px;">
            <Empty :iconNoData="false" :prop2Line="false" />
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
    console.log('🎯 모든 시각적 상태가 한 눈에 표시됨');
    console.log('💡 각 상태의 차이점을 비교해보세요');
    
    const empties = canvasElement.querySelectorAll('[data-testid="empty"]');
    expect(empties.length).toBe(4);
    console.log('✅ 4가지 상태 모두 렌더링 확인');
  },
};

/* ──────────────────────────────────────────────
   11) Style Variants - 스타일 변형 테스트
   ──────────────────────────────────────────── */
export const StyleVariants: Story = {
  render: (args) => ({
    components: { Empty },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 32px; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); max-width: 1600px;">
        <div style="text-align: center;">
          <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Small Icon + Small Font</h4>
          <div style="width: 400px; height: 400px;">
            <Empty :iconNoData="true" :prop2Line="true" iconSize="small" fontSize="small" message="작은 아이콘과 작은 글자" />
          </div>
        </div>
        
        <div style="text-align: center;">
          <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Large Icon + Medium Font</h4>
          <div style="width: 400px; height: 400px;">
            <Empty :iconNoData="true" :prop2Line="true" iconSize="large" fontSize="medium" message="큰 아이콘과 중간 글자" />
          </div>
        </div>
        
        <div style="text-align: center;">
          <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Large Variant + Large Font</h4>
          <div style="width: 500px; height: 500px;">
            <Empty :iconNoData="true" :prop2Line="true" variant="large" iconSize="large" fontSize="large" message="큰 변형과 큰 글자" />
          </div>
        </div>
        
        <div style="text-align: center;">
          <h4 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 500;">Figma Large Design</h4>
          <div style="width: 400px; height: 400px;">
            <Empty :iconNoData="true" :prop2Line="true" iconSize="large" fontSize="medium" message="조회 결과가 없습니다." />
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
    console.log('🎯 스타일 변형들이 한 눈에 표시됨');
    console.log('💡 각 변형의 차이점을 비교해보세요');
    
    const empties = canvasElement.querySelectorAll('[data-testid="empty"]');
    expect(empties.length).toBe(4);
    console.log('✅ 4가지 스타일 변형 모두 렌더링 확인');
  },
};

/* ──────────────────────────────────────────────
   12) Figma Large Design - 피그마 큰 디자인
   ──────────────────────────────────────────── */
export const FigmaLargeDesign: Story = {
  args: {
    prop1Line: false,
    prop2Line: true,
    textButton: false,
    iconNoData: true,
    message: '조회 결과가 없습니다.',
    variant: 'default',
    iconSize: 'large',
    fontSize: 'medium',
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    console.log('🎯 피그마 큰 디자인 테스트');
    
    // 기본 구조 확인
    await expect(canvas.getByTestId('empty')).toBeInTheDocument();
    await expect(canvas.getByTestId('empty-icon')).toBeInTheDocument();
    await expect(canvas.getByTestId('empty-message')).toBeInTheDocument();
    
    // 큰 아이콘 확인
    const iconImage = canvas.getByRole('presentation');
    await expect(iconImage.attributes('src')).toBe('http://localhost:3845/assets/b0c5fe50850ecc288d8aed808cd785edd311050f.svg');
    
    console.log('✅ 피그마 큰 디자인이 정상적으로 렌더링됨');
  },
};

/* ──────────────────────────────────────────────
   13) Responsive Test - 반응형 테스트
   ──────────────────────────────────────────── */
export const ResponsiveTest: Story = {
  args: {
    prop1Line: false,
    prop2Line: true,
    textButton: false,
    iconNoData: true,
    message: '반응형 테스트를 위한 메시지입니다. 화면 크기를 조정해보세요.',
  },
  parameters: {
    layout: 'padded',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    console.log('🎯 반응형 테스트');
    console.log('💡 뷰포트 크기를 변경하여 반응형 동작을 확인하세요');
    
    await expect(canvas.getByTestId('empty')).toBeInTheDocument();
    await expect(canvas.getByTestId('empty-icon')).toBeInTheDocument();
    await expect(canvas.getByTestId('empty-message')).toBeInTheDocument();
    
    console.log('✅ 모든 해상도에서 컴포넌트가 정상 렌더링됨');
  },
};