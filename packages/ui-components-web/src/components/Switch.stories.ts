// src/components/Switch.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import Switch from './Switch.vue';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  tags: ['autodocs'],
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 토글 스위치 컴포넌트입니다. ON/OFF 상태를 제어하며, 3가지 크기(Small, Medium, Large)를 지원합니다.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: 'boolean' },
      description: '스위치의 ON/OFF 상태',
      table: { category: 'State' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '스위치 비활성화 상태',
      table: { category: 'State' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '스위치 크기',
      table: { category: 'Appearance' },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: '접근성을 위한 ARIA 라벨',
      table: { category: 'Accessibility' },
    },
    'onUpdate:modelValue': {
      description: 'v-model을 위한 값 변경 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    onChange: {
      description: '스위치 상태가 변경될 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
  },
  args: {
    modelValue: false,
    disabled: false,
    size: 'medium',
    ariaLabel: '스위치',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls을 사용할 수 있는 기본 스토리
export const Playground: Story = {
  args: {
    modelValue: false,
    disabled: false,
    size: 'medium',
    ariaLabel: 'Interactive Switch',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다. 크기, 상태, 활성화 여부를 변경해보세요.',
      },
    },
  },
};

// Default - Figma 디자인의 기본 상태
export const Default: Story = {
  args: {
    modelValue: false,
    size: 'medium',
    ariaLabel: '기본 스위치',
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 기본 상태입니다. Medium 크기의 OFF 상태 스위치입니다.',
      },
    },
  },
};

// States - ON/OFF 상태 비교
export const States: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; font-size: 14px; color: #666;">OFF State</div>
          <Switch :modelValue="false" :size="args.size" ariaLabel="OFF 상태 스위치" />
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; font-size: 14px; color: #666;">ON State</div>
          <Switch :modelValue="true" :size="args.size" ariaLabel="ON 상태 스위치" />
        </div>
      </div>
    `,
  }),
  args: {
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'OFF와 ON 상태를 나란히 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// Sizes - 크기별 비교
export const Sizes: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div style="display: flex; gap: 32px; align-items: center;">
          <div style="text-align: center;">
            <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Small (OFF)</div>
            <Switch :modelValue="false" size="small" ariaLabel="Small OFF 스위치" />
          </div>
          <div style="text-align: center;">
            <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Small (ON)</div>
            <Switch :modelValue="true" size="small" ariaLabel="Small ON 스위치" />
          </div>
        </div>
        
        <div style="display: flex; gap: 32px; align-items: center;">
          <div style="text-align: center;">
            <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Medium (OFF)</div>
            <Switch :modelValue="false" size="medium" ariaLabel="Medium OFF 스위치" />
          </div>
          <div style="text-align: center;">
            <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Medium (ON)</div>
            <Switch :modelValue="true" size="medium" ariaLabel="Medium ON 스위치" />
          </div>
        </div>
        
        <div style="display: flex; gap: 32px; align-items: center;">
          <div style="text-align: center;">
            <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Large (OFF)</div>
            <Switch :modelValue="false" size="large" ariaLabel="Large OFF 스위치" />
          </div>
          <div style="text-align: center;">
            <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Large (ON)</div>
            <Switch :modelValue="true" size="large" ariaLabel="Large ON 스위치" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 크기 옵션(Small, Medium, Large)을 ON/OFF 상태와 함께 비교할 수 있는 스토리입니다. Figma 디자인과 정확히 일치합니다.',
      },
    },
  },
};

// Disabled States - 비활성화 상태
export const DisabledStates: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Disabled OFF</div>
          <Switch :modelValue="false" :disabled="true" :size="args.size" ariaLabel="비활성화된 OFF 스위치" />
        </div>
        <div style="text-align: center;">
          <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Disabled ON</div>
          <Switch :modelValue="true" :disabled="true" :size="args.size" ariaLabel="비활성화된 ON 스위치" />
        </div>
      </div>
    `,
  }),
  args: {
    size: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 스위치들을 보여줍니다. 사용자와 상호작용할 수 없습니다.',
      },
    },
  },
};

// Interactive Examples - 상호작용 예제
export const InteractiveExamples: Story = {
  args: {
    modelValue: false,
    size: 'medium',
    ariaLabel: '인터랙티브 스위치',
  },
  parameters: {
    docs: {
      description: {
        story: '클릭과 키보드 조작을 테스트할 수 있는 인터랙티브 스위치입니다.',
      },
    },
  },
};

// Real World Examples - 실제 사용 예시
export const RealWorldExamples: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; max-width: 400px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <div>
            <div style="font-weight: 500; margin-bottom: 4px;">알림</div>
            <div style="font-size: 14px; color: #666;">새로운 메시지 알림을 받습니다</div>
          </div>
          <Switch :modelValue="true" size="medium" ariaLabel="알림 설정" />
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <div>
            <div style="font-weight: 500; margin-bottom: 4px;">다크 모드</div>
            <div style="font-size: 14px; color: #666;">어두운 테마를 사용합니다</div>
          </div>
          <Switch :modelValue="false" size="medium" ariaLabel="다크 모드 설정" />
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <div>
            <div style="font-weight: 500; margin-bottom: 4px;">자동 저장</div>
            <div style="font-size: 14px; color: #666;">변경사항을 자동으로 저장합니다</div>
          </div>
          <Switch :modelValue="true" size="small" ariaLabel="자동 저장 설정" />
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px; opacity: 0.6;">
          <div>
            <div style="font-weight: 500; margin-bottom: 4px;">관리자 모드</div>
            <div style="font-size: 14px; color: #666;">권한이 필요한 기능입니다</div>
          </div>
          <Switch :modelValue="false" :disabled="true" size="medium" ariaLabel="관리자 모드 설정" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 설정 항목들의 예시입니다.',
      },
    },
  },
};

// Event Handling Test - 이벤트 처리 테스트
export const EventHandlingTest: Story = {
  args: {
    modelValue: false,
    size: 'medium',
    ariaLabel: '이벤트 테스트 스위치',
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 처리 기능을 테스트하는 스토리입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 스위치가 렌더링되었는지 확인
    const switchElement = canvas.getByTestId('switch');
    await expect(switchElement).toBeInTheDocument();
    
    // 초기 상태 확인 (OFF)
    await expect(switchElement).toHaveAttribute('aria-checked', 'false');
    
    // 클릭으로 토글
    await userEvent.click(switchElement);
    
    // 키보드로 포커스 이동
    await userEvent.tab();
    await expect(switchElement).toHaveFocus();
    
    // Space 키로 토글 테스트
    await userEvent.keyboard(' ');
    
    // Enter 키로 토글 테스트
    await userEvent.keyboard('{Enter}');
  },
};

// Accessibility Test - 접근성 테스트
export const AccessibilityTest: Story = {
  args: {
    modelValue: false,
    size: 'medium',
    ariaLabel: '접근성 테스트 스위치',
  },
  parameters: {
    docs: {
      description: {
        story: '접근성 기능을 테스트하는 스토리입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 메인 요소 확인
    const switchElement = canvas.getByTestId('switch');
    await expect(switchElement).toBeInTheDocument();
    
    // ARIA 속성 확인
    await expect(switchElement).toHaveAttribute('role', 'switch');
    await expect(switchElement).toHaveAttribute('type', 'button');
    await expect(switchElement).toHaveAttribute('aria-label', '접근성 테스트 스위치');
    
    // 키보드 접근성 확인
    switchElement.focus();
    await expect(switchElement).toHaveFocus();
    
    // ARIA 상태 확인
    await expect(switchElement).toHaveAttribute('aria-checked', 'false');
  },
};

// Performance Test - 다중 스위치 성능 테스트
export const PerformanceTest: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; max-width: 600px;">
        <Switch v-for="i in 25" :key="i" :modelValue="i % 2 === 0" size="small" :ariaLabel="\`스위치 \${i}\`" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '25개의 스위치를 렌더링하여 성능을 테스트하는 스토리입니다.',
      },
    },
  },
};

// Edge Cases - 엣지 케이스
export const EdgeCases: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 16px; align-items: center;">
          <span style="width: 120px; font-size: 14px;">빈 ARIA 라벨:</span>
          <Switch :modelValue="false" size="medium" ariaLabel="" />
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <span style="width: 120px; font-size: 14px;">긴 ARIA 라벨:</span>
          <Switch :modelValue="true" size="medium" ariaLabel="이것은 매우 긴 ARIA 라벨 텍스트입니다 접근성을 위한 상세한 설명이 포함되어 있습니다" />
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <span style="width: 120px; font-size: 14px;">모든 크기 비교:</span>
          <Switch :modelValue="true" size="small" ariaLabel="작은 크기" />
          <Switch :modelValue="true" size="medium" ariaLabel="중간 크기" />
          <Switch :modelValue="true" size="large" ariaLabel="큰 크기" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스를 테스트하는 스토리입니다.',
      },
    },
  },
};