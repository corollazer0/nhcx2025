import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import Indicator from './Indicator.vue';

const meta: Meta<typeof Indicator> = {
  title: 'Components/Indicator',
  tags: ['autodocs'],
  component: Indicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 인디케이터 컴포넌트입니다. 네비게이션 화살표와 재생/일시정지 버튼이 포함되어 있습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'dot'],
      description: '인디케이터 변형 (텍스트 또는 점)',
      table: { category: 'Appearance' },
    },
    current: {
      control: { type: 'number' },
      description: '현재 페이지 번호',
      table: { category: 'Content' },
    },
    total: {
      control: { type: 'number' },
      description: '전체 페이지 수',
      table: { category: 'Content' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
      table: { category: 'State' },
    },
    isPlaying: {
      control: { type: 'boolean' },
      description: '재생 상태',
      table: { category: 'State' },
    },
    'onNavigate-prev': {
      description: '이전 버튼 클릭 시 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onNavigate-next': {
      description: '다음 버튼 클릭 시 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onNavigate-to': {
      description: '특정 페이지로 이동 시 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onToggle-play': {
      description: '재생/일시정지 버튼 클릭 시 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onNav-click': {
      description: '네비게이션 영역 클릭 시 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const Default: Story = {
  args: {
    variant: 'text',
    current: 1,
    total: 3,
    isPlaying: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 기본 텍스트 인디케이터입니다. 네비게이션과 재생 버튼이 포함되어 있습니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const indicatorElement = canvas.getByTestId('indicator');
    await expect(indicatorElement).toBeInTheDocument();
    
    const text = canvas.getByText('1 | 3');
    await expect(text).toBeInTheDocument();
  },
};

export const DotVariant: Story = {
  args: {
    variant: 'dot',
    current: 1,
    total: 8,
    isPlaying: false,
  },
  parameters: {
    docs: {
      description: {
        story: '점 형태의 인디케이터입니다. 현재 페이지는 녹색으로 표시됩니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const indicatorElement = canvas.getByTestId('indicator');
    await expect(indicatorElement).toBeInTheDocument();
    
    const firstDot = canvas.getByTestId('indicator-dot-1');
    await expect(firstDot).toBeInTheDocument();
    await expect(firstDot).toHaveClass('indicator__dot--active');
  },
};

export const Playground: Story = {
  args: {
    variant: 'text',
    current: 2,
    total: 5,
    disabled: false,
    isPlaying: false,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다.',
      },
    },
  },
};

export const Playing: Story = {
  args: {
    variant: 'text',
    current: 1,
    total: 3,
    isPlaying: true,
  },
  parameters: {
    docs: {
      description: {
        story: '재생 중인 상태의 인디케이터입니다.',
      },
    },
  },
};

export const VariantComparison: Story = {
  render: (args) => ({
    components: { Indicator },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 16px;">Text Variant</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 100px; text-align: right; font-size: 14px; color: #666;">기본:</div>
              <Indicator variant="text" :current="1" :total="3" :is-playing="false" />
            </div>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 100px; text-align: right; font-size: 14px; color: #666;">재생 중:</div>
              <Indicator variant="text" :current="2" :total="5" :is-playing="true" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 16px;">Dot Variant</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 100px; text-align: right; font-size: 14px; color: #666;">일시정지:</div>
              <Indicator variant="dot" :current="1" :total="8" :is-playing="false" />
            </div>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 100px; text-align: right; font-size: 14px; color: #666;">재생 중:</div>
              <Indicator variant="dot" :current="3" :total="8" :is-playing="true" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '텍스트와 점 형태의 인디케이터 변형을 비교하는 스토리입니다.',
      },
    },
  },
};

export const DisabledState: Story = {
  render: (args) => ({
    components: { Indicator },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 16px;">Text Variant</h4>
          <div style="display: flex; gap: 16px; align-items: center;">
            <div style="text-align: center;">
              <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Enabled</div>
              <Indicator variant="text" :current="1" :total="3" :disabled="false" :is-playing="false" />
            </div>
            <div style="text-align: center;">
              <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Disabled</div>
              <Indicator variant="text" :current="1" :total="3" :disabled="true" :is-playing="false" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 16px;">Dot Variant</h4>
          <div style="display: flex; gap: 16px; align-items: center;">
            <div style="text-align: center;">
              <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Enabled</div>
              <Indicator variant="dot" :current="2" :total="5" :disabled="false" :is-playing="false" />
            </div>
            <div style="text-align: center;">
              <div style="margin-bottom: 8px; font-size: 14px; color: #666;">Disabled</div>
              <Indicator variant="dot" :current="2" :total="5" :disabled="true" :is-playing="false" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '두 변형 모두의 활성화/비활성화 상태를 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  args: {
    variant: 'dot',
    current: 2,
    total: 5,
    disabled: false,
    isPlaying: false,
  },
  parameters: {
    docs: {
      description: {
        story: '점을 클릭하여 페이지 이동을 테스트할 수 있는 인터랙티브 인디케이터입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const indicatorElement = canvas.getByTestId('indicator');
    await expect(indicatorElement).toBeInTheDocument();
    
    const playButton = canvas.getByTestId('indicator-play');
    await expect(playButton).toBeInTheDocument();
    
    const thirdDot = canvas.getByTestId('indicator-dot-3');
    await expect(thirdDot).toBeInTheDocument();
    
    await userEvent.click(thirdDot);
    await userEvent.click(playButton);
  },
};