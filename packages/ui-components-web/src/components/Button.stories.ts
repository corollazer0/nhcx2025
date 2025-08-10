import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Button from './Button.vue';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Button 컴포넌트는 사용자 인터랙션을 위한 기본 버튼 요소입니다.

**주요 특징:**
- **크기**: xs, sm, rg, md, lg (5가지)
- **타입**: primary(녹색 배경), secondary(녹색 테두리), tertiary(회색 테두리)
- **상태**: default, pressed, disabled
- **텍스트**: xs/sm 사이즈는 smallText, 나머지는 text 사용

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'rg, md, lg 사이즈에서 사용되는 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'버튼명'" },
      },
    },
    smallText: {
      control: 'text',
      description: 'xs, sm 사이즈에서 사용되는 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'버튼'" },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'rg', 'md', 'lg'],
      description: '버튼의 크기를 설정합니다.',
      table: {
        type: { summary: "'xs' | 'sm' | 'rg' | 'md' | 'lg'" },
        defaultValue: { summary: "'lg'" },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'pressed', 'disabled'],
      description: '버튼의 상태를 설정합니다.',
      table: {
        type: { summary: "'default' | 'pressed' | 'disabled'" },
        defaultValue: { summary: "'default'" },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼의 타입을 설정합니다.',
      table: {
        type: { summary: "'primary' | 'secondary' | 'tertiary'" },
        defaultValue: { summary: "'primary'" },
      },
    },
    onClick: {
      description: '버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    text: '버튼명',
    smallText: '버튼',
    size: 'lg',
    state: 'default',
    type: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 버튼의 다양한 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// Default
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 Button 컴포넌트입니다. (size: lg, type: primary, state: default)',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <Button size="xs" type="primary" text="버튼명" small-text="버튼" />
          <span style="color: #666; font-size: 14px;">xs (13px, smallText 사용)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Button size="sm" type="primary" text="버튼명" small-text="버튼" />
          <span style="color: #666; font-size: 14px;">sm (14px, smallText 사용)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Button size="rg" type="primary" text="버튼명" small-text="버튼" />
          <span style="color: #666; font-size: 14px;">rg (15px)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Button size="md" type="primary" text="버튼명" small-text="버튼" />
          <span style="color: #666; font-size: 14px;">md (16px)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Button size="lg" type="primary" text="버튼명" small-text="버튼" />
          <span style="color: #666; font-size: 14px;">lg (18px)</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 크기 변형을 한눈에 확인할 수 있습니다. xs, sm은 smallText를 사용합니다.',
      },
    },
  },
};

// Type Variants
export const Types: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <Button type="primary" text="Primary" />
          <span style="color: #666; font-size: 14px;">Primary (녹색 배경)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Button type="secondary" text="Secondary" />
          <span style="color: #666; font-size: 14px;">Secondary (녹색 테두리)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Button type="tertiary" text="Tertiary" />
          <span style="color: #666; font-size: 14px;">Tertiary (회색 테두리)</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 타입 변형을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// State Variants
export const States: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Primary States</h4>
          <div style="display: flex; gap: 16px; align-items: center;">
            <Button type="primary" state="default" text="Default" />
            <Button type="primary" state="pressed" text="Pressed" />
            <Button type="primary" state="disabled" text="Disabled" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Secondary States</h4>
          <div style="display: flex; gap: 16px; align-items: center;">
            <Button type="secondary" state="default" text="Default" />
            <Button type="secondary" state="pressed" text="Pressed" />
            <Button type="secondary" state="disabled" text="Disabled" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Tertiary States</h4>
          <div style="display: flex; gap: 16px; align-items: center;">
            <Button type="tertiary" state="default" text="Default" />
            <Button type="tertiary" state="pressed" text="Pressed" />
            <Button type="tertiary" state="disabled" text="Disabled" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '각 타입별 상태 변형을 확인할 수 있습니다.',
      },
    },
  },
};

// All Combinations - Size와 Type 조합
export const SizeTypeCombinations: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%; max-width: 800px;">
        <div style="text-align: center;">
          <h4 style="margin-bottom: 16px; font-weight: 600;">Primary</h4>
          <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
            <Button type="primary" size="xs" text="버튼명" small-text="버튼" />
            <Button type="primary" size="sm" text="버튼명" small-text="버튼" />
            <Button type="primary" size="rg" text="버튼명" small-text="버튼" />
            <Button type="primary" size="md" text="버튼명" small-text="버튼" />
            <Button type="primary" size="lg" text="버튼명" small-text="버튼" />
          </div>
        </div>
        <div style="text-align: center;">
          <h4 style="margin-bottom: 16px; font-weight: 600;">Secondary</h4>
          <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
            <Button type="secondary" size="xs" text="버튼명" small-text="버튼" />
            <Button type="secondary" size="sm" text="버튼명" small-text="버튼" />
            <Button type="secondary" size="rg" text="버튼명" small-text="버튼" />
            <Button type="secondary" size="md" text="버튼명" small-text="버튼" />
            <Button type="secondary" size="lg" text="버튼명" small-text="버튼" />
          </div>
        </div>
        <div style="text-align: center;">
          <h4 style="margin-bottom: 16px; font-weight: 600;">Tertiary</h4>
          <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
            <Button type="tertiary" size="xs" text="버튼명" small-text="버튼" />
            <Button type="tertiary" size="sm" text="버튼명" small-text="버튼" />
            <Button type="tertiary" size="rg" text="버튼명" small-text="버튼" />
            <Button type="tertiary" size="md" text="버튼명" small-text="버튼" />
            <Button type="tertiary" size="lg" text="버튼명" small-text="버튼" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '모든 크기와 타입 조합을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// 개별 Size Stories
export const XtraSmall: Story = {
  args: {
    size: 'xs',
    type: 'primary',
    text: '버튼명',
    smallText: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: 'XS 사이즈 버튼입니다. smallText prop을 사용합니다.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    type: 'primary',
    text: '버튼명',
    smallText: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: 'SM 사이즈 버튼입니다. smallText prop을 사용합니다.',
      },
    },
  },
};

export const Regular: Story = {
  args: {
    size: 'rg',
    type: 'primary',
    text: '버튼명',
    smallText: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: 'RG 사이즈 버튼입니다. text prop을 사용합니다.',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    type: 'primary',
    text: '버튼명',
    smallText: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: 'MD 사이즈 버튼입니다. text prop을 사용합니다.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    type: 'primary',
    text: '버튼명',
    smallText: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: 'LG 사이즈 버튼입니다. text prop을 사용합니다.',
      },
    },
  },
};

// 개별 Type Stories
export const Primary: Story = {
  args: {
    type: 'primary',
    text: '확인',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary 버튼은 주요 액션을 위해 사용됩니다. 녹색 배경을 가집니다.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    text: '취소',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary 버튼은 보조 액션을 위해 사용됩니다. 녹색 테두리를 가집니다.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    type: 'tertiary',
    text: '닫기',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tertiary 버튼은 선택적 액션을 위해 사용됩니다. 회색 테두리를 가집니다.',
      },
    },
  },
};

// 개별 State Stories
export const DefaultState: Story = {
  args: {
    state: 'default',
    text: '기본 상태',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 버튼입니다.',
      },
    },
  },
};

export const PressedState: Story = {
  args: {
    state: 'pressed',
    text: '눌린 상태',
  },
  parameters: {
    docs: {
      description: {
        story: '눌린 상태의 버튼입니다. 어두운 색상을 가집니다.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    state: 'disabled',
    text: '비활성화',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화 상태의 버튼입니다. 클릭할 수 없습니다.',
      },
    },
  },
};

// Text Variations
export const TextVariations: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <Button text="확인" />
        <Button text="취소" />
        <Button text="저장" />
        <Button text="삭제" />
        <Button text="편집" />
        <Button text="로그인" />
        <Button text="회원가입" />
        <Button text="주문하기" />
        <Button text="장바구니에 담기" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 사례에서의 다양한 텍스트 예시입니다.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    text: '매우 긴 버튼 텍스트 예시입니다',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 경우의 버튼 렌더링을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Story with Play Function
export const InteractiveTest: Story = {
  args: {
    text: '클릭해보세요',
    type: 'primary',
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const button = canvas.getByRole('button');
    // await userEvent.click(button);
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 8px;">빈 텍스트</h4>
          <Button text="" small-text="" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px;">특수문자 포함</h4>
          <Button text="확인 & 저장 < > &quot; &apos; 100%" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px;">이모지 포함</h4>
          <Button text="🚀 시작하기" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px;">숫자 포함</h4>
          <Button text="2024년 결제" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px;">다국어 (영어)</h4>
          <Button text="Continue" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 버튼 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; width: 100%; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">E-commerce</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Button type="primary" size="lg" text="주문하기" />
            <Button type="secondary" size="md" text="장바구니 담기" />
            <Button type="tertiary" size="sm" text="관심상품" small-text="관심" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Authentication</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Button type="primary" size="lg" text="로그인" />
            <Button type="secondary" size="lg" text="회원가입" />
            <Button type="tertiary" size="sm" text="비밀번호 찾기" small-text="찾기" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Form Actions</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Button type="primary" size="md" text="저장" />
            <Button type="secondary" size="md" text="취소" />
            <Button type="tertiary" size="sm" text="초기화" small-text="초기화" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Navigation</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Button type="primary" size="rg" text="다음" />
            <Button type="secondary" size="rg" text="이전" />
            <Button type="tertiary" size="xs" text="건너뛰기" small-text="건너뛰기" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용되는 버튼 예시들입니다.',
      },
    },
  },
};

// Figma Design System Matrix
export const FigmaDesignMatrix: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="width: 100%; max-width: 1200px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma Design System - Button Matrix
        </h3>
        <div style="display: grid; grid-template-columns: 100px repeat(5, 1fr); gap: 8px; align-items: center;">
          <!-- Headers -->
          <div></div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">xs</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">sm</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">rg</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">md</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">lg</div>
          
          <!-- Primary Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Primary</div>
          <Button type="primary" size="xs" text="버튼명" small-text="버튼" />
          <Button type="primary" size="sm" text="버튼명" small-text="버튼" />
          <Button type="primary" size="rg" text="버튼명" />
          <Button type="primary" size="md" text="버튼명" />
          <Button type="primary" size="lg" text="버튼명" />
          
          <!-- Secondary Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Secondary</div>
          <Button type="secondary" size="xs" text="버튼명" small-text="버튼" />
          <Button type="secondary" size="sm" text="버튼명" small-text="버튼" />
          <Button type="secondary" size="rg" text="버튼명" />
          <Button type="secondary" size="md" text="버튼명" />
          <Button type="secondary" size="lg" text="버튼명" />
          
          <!-- Tertiary Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Tertiary</div>
          <Button type="tertiary" size="xs" text="버튼명" small-text="버튼" />
          <Button type="tertiary" size="sm" text="버튼명" small-text="버튼" />
          <Button type="tertiary" size="rg" text="버튼명" />
          <Button type="tertiary" size="md" text="버튼명" />
          <Button type="tertiary" size="lg" text="버튼명" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Figma 디자인 시스템의 모든 Button 변형을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};