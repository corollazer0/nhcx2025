// src/components/PopoverTags.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import PopoverTags from './PopoverTags.vue';

const meta: Meta<typeof PopoverTags> = {
  title: 'Components/PopoverTags',
  tags: ['autodocs'],
  component: PopoverTags,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 말풍선 스타일의 팝오버 태그 컴포넌트입니다. 단일 태그를 표시하며 8개의 다양한 화살표 위치를 지원합니다.',
      },
    },
  },
  argTypes: {
    tag: {
      control: { type: 'text' },
      description: '표시할 태그 텍스트',
      table: { category: 'Content' },
    },
    arrowPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: '말풍선 화살표 위치',
      table: { category: 'Appearance' },
    },
  },
  args: {
    tag: '텍스트를 입력해 주세요',
    arrowPosition: 'top',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls을 사용할 수 있는 기본 스토리
export const Playground: Story = {
  args: {
    tag: 'Interactive Tag',
    arrowPosition: 'top',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다. 화살표 위치와 태그 텍스트를 변경해보세요.',
      },
    },
  },
};

// Default - Figma 디자인의 기본 상태
export const Default: Story = {
  args: {
    tag: '텍스트를 입력해 주세요',
    arrowPosition: 'top',
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 기본 상태입니다.',
      },
    },
  },
};

// Arrow Positions - 다양한 화살표 위치
export const ArrowPositions: Story = {
  render: (args) => ({
    components: { PopoverTags },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; gap: 40px; grid-template-columns: repeat(3, 1fr); padding: 40px; justify-items: center;">
        <div style="text-align: center;">
          <h4 style="margin: 0 0 20px 0; font-size: 14px; color: #666;">Top Arrow</h4>
          <PopoverTags tag="Top Arrow" arrowPosition="top" />
        </div>
        <div style="text-align: center;">
          <h4 style="margin: 0 0 20px 0; font-size: 14px; color: #666;">Top-Left Arrow</h4>
          <PopoverTags tag="Top-Left" arrowPosition="top-left" />
        </div>
        <div style="text-align: center;">
          <h4 style="margin: 0 0 20px 0; font-size: 14px; color: #666;">Top-Right Arrow</h4>
          <PopoverTags tag="Top-Right" arrowPosition="top-right" />
        </div>
        <div style="text-align: center;">
          <h4 style="margin: 0 0 20px 0; font-size: 14px; color: #666;">Bottom Arrow</h4>
          <PopoverTags tag="Bottom Arrow" arrowPosition="bottom" />
        </div>
        <div style="text-align: center;">
          <h4 style="margin: 0 0 20px 0; font-size: 14px; color: #666;">Bottom-Left Arrow</h4>
          <PopoverTags tag="Bottom-Left" arrowPosition="bottom-left" />
        </div>
        <div style="text-align: center;">
          <h4 style="margin: 0 0 20px 0; font-size: 14px; color: #666;">Bottom-Right Arrow</h4>
          <PopoverTags tag="Bottom-Right" arrowPosition="bottom-right" />
        </div>
        <div style="text-align: center;">
          <h4 style="margin: 0 0 20px 0; font-size: 14px; color: #666;">Left Arrow</h4>
          <PopoverTags tag="Left Arrow" arrowPosition="left" />
        </div>
        <div style="text-align: center;">
          <h4 style="margin: 0 0 20px 0; font-size: 14px; color: #666;">Right Arrow</h4>
          <PopoverTags tag="Right Arrow" arrowPosition="right" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '모든 화살표 위치 옵션을 보여주는 비교 스토리입니다.',
      },
    },
  },
};

// Custom Text - 다양한 텍스트 길이
export const CustomText: Story = {
  render: (args) => ({
    components: { PopoverTags },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: center;">
        <PopoverTags tag="Short" arrowPosition="top" />
        <PopoverTags tag="Medium length tag" arrowPosition="bottom" />
        <PopoverTags tag="This is a very long tag text that demonstrates how the component handles longer content" arrowPosition="left" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 길이의 텍스트를 가진 태그들을 보여줍니다.',
      },
    },
  },
};

// Interactive Examples - 상호작용 예제
export const InteractiveExamples: Story = {
  args: {
    tag: 'Click me!',
    arrowPosition: 'top',
  },
  parameters: {
    docs: {
      description: {
        story: '클릭과 닫기 기능을 테스트할 수 있는 인터랙티브 예제입니다.',
      },
    },
  },
};

// Special Characters - 특수 문자가 포함된 태그들
export const SpecialCharacters: Story = {
  render: (args) => ({
    components: { PopoverTags },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
        <PopoverTags tag="@username" arrowPosition="top" />
        <PopoverTags tag="#hashtag" arrowPosition="bottom" />
        <PopoverTags tag="50% off" arrowPosition="left" />
        <PopoverTags tag="C++" arrowPosition="right" />
        <PopoverTags tag="!important" arrowPosition="top-left" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '특수 문자가 포함된 태그들을 다양한 화살표 위치와 함께 보여줍니다.',
      },
    },
  },
};

// Event Handling Test - 이벤트 처리 테스트
export const EventHandlingTest: Story = {
  args: {
    tag: 'Event Test',
    arrowPosition: 'top',
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
    
    // 태그가 렌더링되었는지 확인
    const tag = canvas.getByTestId('popover-tag');
    await expect(tag).toBeInTheDocument();
    
    // 텍스트 확인
    await expect(canvas.getByText('Event Test')).toBeInTheDocument();
    
    // 닫기 버튼 확인
    const closeButton = canvas.getByTestId('popover-tag-close');
    await expect(closeButton).toBeInTheDocument();
    
    // aria-label 확인
    await expect(closeButton).toHaveAttribute('aria-label', 'Event Test 태그 제거');
    
    // 호버 테스트
    await userEvent.hover(tag);
    await userEvent.hover(closeButton);
  },
};

// Accessibility Test - 접근성 테스트
export const AccessibilityTest: Story = {
  args: {
    tag: 'Accessible Tag',
    arrowPosition: 'bottom',
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
    
    // 메인 컴포넌트 확인
    const mainComponent = canvas.getByTestId('popover-tags');
    await expect(mainComponent).toBeInTheDocument();
    
    // 닫기 버튼이 적절한 type을 가지는지 확인
    const closeButton = canvas.getByTestId('popover-tag-close');
    await expect(closeButton).toHaveAttribute('type', 'button');
    
    // aria-label 확인
    await expect(closeButton).toHaveAttribute('aria-label', 'Accessible Tag 태그 제거');
    
    // 키보드로 포커스 가능한지 확인
    closeButton.focus();
    await expect(closeButton).toHaveFocus();
  },
};

// Real World Examples - 실제 사용 예시
export const RealWorldExamples: Story = {
  render: (args) => ({
    components: { PopoverTags },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #333;">Tech Stack</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <PopoverTags tag="Vue.js" arrowPosition="top" />
            <PopoverTags tag="TypeScript" arrowPosition="top" />
            <PopoverTags tag="Vite" arrowPosition="top" />
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #333;">Categories</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <PopoverTags tag="Frontend" arrowPosition="bottom" />
            <PopoverTags tag="UI/UX" arrowPosition="bottom" />
            <PopoverTags tag="Design System" arrowPosition="bottom" />
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #333;">Status</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <PopoverTags tag="In Progress" arrowPosition="left" />
            <PopoverTags tag="Ready for Review" arrowPosition="right" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 프로젝트에서 사용될 수 있는 다양한 태그 예시들입니다.',
      },
    },
  },
};