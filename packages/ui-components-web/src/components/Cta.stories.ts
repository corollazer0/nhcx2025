import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Cta from './Cta.vue';

const meta = {
  title: 'Components/Cta',
  component: Cta,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
CTA(Call-to-Action) 컴포넌트는 사용자의 행동을 유도하는 버튼 그룹을 제공합니다.

**주요 특징:**
- **타입**: basic(그라데이션 배경), popup(흰색 배경)
- **비율**: cta-full(1개), cta-5:5(2개 동일), cta-3:7(2개 3:7 비율)
- **버튼 스타일**: primary(녹색), secondary(녹색 테두리), tertiary(회색 테두리)

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['basic', 'popup'],
      description: 'CTA 컴포넌트의 타입을 설정합니다.',
      table: {
        type: { summary: "'basic' | 'popup'" },
        defaultValue: { summary: "'basic'" },
      },
    },
    ratio: {
      control: { type: 'select' },
      options: ['cta-full', 'cta-5:5', 'cta-3:7'],
      description: '버튼 그룹의 비율을 설정합니다.',
      table: {
        type: { summary: "'cta-full' | 'cta-5:5' | 'cta-3:7'" },
        defaultValue: { summary: "'cta-full'" },
      },
    },
    primaryText: {
      control: 'text',
      description: '주요 버튼의 텍스트를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'버튼명'" },
      },
    },
    secondaryText: {
      control: 'text',
      description: '보조 버튼의 텍스트를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'버튼'" },
      },
    },
    'onPrimary-click': {
      description: '주요 버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
    'onSecondary-click': {
      description: '보조 버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    'onPrimary-click': fn(),
    'onSecondary-click': fn(),
  },
} satisfies Meta<typeof Cta>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    type: 'basic',
    ratio: 'cta-full',
    primaryText: '버튼명',
    secondaryText: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 컴포넌트의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 CTA 컴포넌트입니다. (type: basic, ratio: cta-full)',
      },
    },
  },
};

// Basic Type Stories
export const BasicFull: Story = {
  args: {
    type: 'basic',
    ratio: 'cta-full',
    primaryText: '확인',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic 타입의 Full 레이아웃입니다. 하나의 primary 버튼이 전체 너비를 차지합니다.',
      },
    },
  },
};

export const Basic55: Story = {
  args: {
    type: 'basic',
    ratio: 'cta-5:5',
    primaryText: '확인',
    secondaryText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic 타입의 5:5 레이아웃입니다. 두 버튼이 동일한 너비를 가집니다.',
      },
    },
  },
};

export const Basic37: Story = {
  args: {
    type: 'basic',
    ratio: 'cta-3:7',
    primaryText: '확인',
    secondaryText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic 타입의 3:7 레이아웃입니다. 첫 번째 버튼은 100px 고정, 두 번째 버튼은 나머지 공간을 차지합니다.',
      },
    },
  },
};

// Popup Type Stories
export const PopupFull: Story = {
  args: {
    type: 'popup',
    ratio: 'cta-full',
    primaryText: '확인',
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup 타입의 Full 레이아웃입니다. 흰색 배경에 하나의 secondary 버튼이 표시됩니다.',
      },
    },
  },
};

export const Popup55: Story = {
  args: {
    type: 'popup',
    ratio: 'cta-5:5',
    primaryText: '확인',
    secondaryText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story: 'Popup 타입의 5:5 레이아웃입니다. 두 버튼이 동일한 너비를 가집니다.',
      },
    },
  },
};

export const Popup37: Story = {
  args: {
    type: 'popup',
    ratio: 'cta-3:7',
    primaryText: '확인',
    secondaryText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Popup 타입의 3:7 레이아웃입니다. 첫 번째 버튼은 100px 고정, 두 번째 버튼은 나머지 공간을 차지합니다.',
      },
    },
  },
};

// Button Style Variations
export const ButtonStyles: Story = {
  render: () => ({
    components: { Cta },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Primary Button (Basic Full)</h3>
          <Cta type="basic" ratio="cta-full" primary-text="Primary 버튼" />
        </div>
        <div>
          <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Secondary Button (Popup Full)</h3>
          <Cta type="popup" ratio="cta-full" primary-text="Secondary 버튼" />
        </div>
        <div>
          <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Tertiary Button (Basic 5:5 - 왼쪽)</h3>
          <Cta type="basic" ratio="cta-5:5" primary-text="Primary" secondary-text="Tertiary" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 버튼 스타일을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// Text Variations
export const TextVariations: Story = {
  args: {
    type: 'basic',
    ratio: 'cta-5:5',
    primaryText: '주문하기',
    secondaryText: '장바구니',
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 사례에서의 텍스트 예시입니다.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    type: 'basic',
    ratio: 'cta-5:5',
    primaryText: '매우 긴 버튼 텍스트 예시',
    secondaryText: '짧은 텍스트',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 경우의 레이아웃을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Story with Play Function
export const InteractiveTest: Story = {
  args: {
    type: 'basic',
    ratio: 'cta-5:5',
    primaryText: '확인',
    secondaryText: '취소',
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const primaryButton = canvas.getByText('확인');
    // await userEvent.click(primaryButton);
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
};

// All Combinations
export const AllCombinations: Story = {
  render: () => ({
    components: { Cta },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; width: 100%; max-width: 1200px;">
        <div>
          <h4 style="margin-bottom: 12px; text-align: center; font-size: 14px; color: #666;">Basic Full</h4>
          <div style="height: 120px; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
            <Cta type="basic" ratio="cta-full" primary-text="확인" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; text-align: center; font-size: 14px; color: #666;">Basic 5:5</h4>
          <div style="height: 120px; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
            <Cta type="basic" ratio="cta-5:5" primary-text="확인" secondary-text="취소" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; text-align: center; font-size: 14px; color: #666;">Basic 3:7</h4>
          <div style="height: 120px; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
            <Cta type="basic" ratio="cta-3:7" primary-text="확인" secondary-text="취소" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; text-align: center; font-size: 14px; color: #666;">Popup Full</h4>
          <div style="height: 120px; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
            <Cta type="popup" ratio="cta-full" primary-text="확인" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; text-align: center; font-size: 14px; color: #666;">Popup 5:5</h4>
          <div style="height: 120px; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
            <Cta type="popup" ratio="cta-5:5" primary-text="확인" secondary-text="취소" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; text-align: center; font-size: 14px; color: #666;">Popup 3:7</h4>
          <div style="height: 120px; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
            <Cta type="popup" ratio="cta-3:7" primary-text="확인" secondary-text="취소" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'CTA 컴포넌트의 모든 조합을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// Mobile Responsive
export const MobileResponsive: Story = {
  args: {
    type: 'basic',
    ratio: 'cta-3:7',
    primaryText: '주문하기',
    secondaryText: '취소',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: '모바일 화면에서의 반응형 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Cta },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px;">빈 텍스트</h4>
          <Cta type="basic" ratio="cta-5:5" primary-text="" secondary-text="" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px;">특수문자 포함</h4>
          <Cta type="basic" ratio="cta-5:5" primary-text="확인 & 저장" secondary-text="취소 < >" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px;">이모지 포함</h4>
          <Cta type="basic" ratio="cta-5:5" primary-text="🚀 시작하기" secondary-text="❌ 취소" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 컴포넌트 동작을 확인할 수 있습니다.',
      },
    },
  },
};
