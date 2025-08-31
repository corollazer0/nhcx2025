import type { Meta, StoryObj } from '@storybook/vue3';
import { within, expect } from 'storybook/test';
import Progress from './Progress.vue';

const meta = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Progress 컴포넌트는 작업이나 로딩의 진행률을 시각적으로 표시하는 컴포넌트입니다.

**주요 특징:**
- **진행률**: 0.0 ~ 1.0 사이의 비율로 설정
- **크기**: sm, md (2가지)
- **색상**: green, blue, gray (3가지)
- **기능**: 애니메이션 옵션, 완료 이벤트, 접근성 지원

**Figma 디자인을 100% 재현**하여 구현되었으며, 10가지 진행률 상태(0.1~1.0)를 모두 지원합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: '진행률 비율입니다. (0.0 ~ 1.0)',
      table: {
        type: { summary: 'number | string' },
        defaultValue: { summary: '0.1' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Progress의 크기를 설정합니다.',
      table: {
        type: { summary: "'sm' | 'md'" },
        defaultValue: { summary: "'md'" },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['green', 'blue', 'gray'],
      description: 'Progress의 색상을 설정합니다.',
      table: {
        type: { summary: "'green' | 'blue' | 'gray'" },
        defaultValue: { summary: "'green'" },
      },
    },
    showAnimation: {
      control: 'boolean',
      description: '애니메이션 효과를 표시할지 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    ratio: 0.5,
    size: 'md',
    color: 'green',
    showAnimation: false,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 Progress의 다양한 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// Default
export const Default: Story = {
  args: {
    ratio: 0.1,
    size: 'md',
    color: 'green',
    showAnimation: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 Progress 컴포넌트입니다. (ratio: 0.1, size: md, color: green)',
      },
    },
  },
};

// Progress Ratios - Figma의 모든 ratio 상태
export const ProgressRatios: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <h3 style="margin: 0; font-size: 16px; font-weight: 600; text-align: center;">
          Figma Design System - All Progress Ratios
        </h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.1" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">10%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.2" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">20%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.3" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">30%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.4" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">40%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.5" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">50%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.6" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">60%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.7" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">70%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.8" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">80%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="0.9" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">90%</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress :ratio="1.0" />
            <span style="color: #666; font-size: 14px; min-width: 60px;">100%</span>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인 시스템의 모든 진행률 상태(0.1~1.0)를 확인할 수 있습니다.',
      },
    },
  },
}

// Size Variants
export const Sizes: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Medium (기본)</h4>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress size="md" :ratio="0.6" />
              <span style="color: #666; font-size: 14px;">60%</span>
            </div>
          </div>
          <div>
            <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Small</h4>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress size="sm" :ratio="0.6" />
              <span style="color: #666; font-size: 14px;">60%</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 크기 변형을 확인할 수 있습니다.',
      },
    },
  },
};

// Color Variants
export const Colors: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress color="green" :ratio="0.6" />
            <span style="color: #666; font-size: 14px;">Green (기본)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress color="blue" :ratio="0.6" />
            <span style="color: #666; font-size: 14px;">Blue</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Progress color="gray" :ratio="0.6" />
            <span style="color: #666; font-size: 14px;">Gray</span>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 색상 변형을 확인할 수 있습니다.',
      },
    },
  },
};

// Animation Demo
export const WithAnimation: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">애니메이션 없음</h4>
            <Progress :ratio="0.7" :show-animation="false" />
          </div>
          <div>
            <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">애니메이션 있음</h4>
            <Progress :ratio="0.7" :show-animation="true" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '애니메이션 효과가 있는 Progress와 없는 Progress를 비교할 수 있습니다.',
      },
    },
  },
};

// All Combinations Matrix
export const AllCombinations: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="width: 100%; max-width: 800px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Progress Design System Matrix
        </h3>
        <div style="display: grid; grid-template-columns: 80px repeat(3, 1fr); gap: 16px; align-items: center;">
          <!-- Headers -->
          <div></div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Green</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Blue</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Gray</div>
          
          <!-- MD Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Medium</div>
          <div><Progress size="md" color="green" :ratio="0.6" /></div>
          <div><Progress size="md" color="blue" :ratio="0.6" /></div>
          <div><Progress size="md" color="gray" :ratio="0.6" /></div>
          
          <!-- SM Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Small</div>
          <div><Progress size="sm" color="green" :ratio="0.6" /></div>
          <div><Progress size="sm" color="blue" :ratio="0.6" /></div>
          <div><Progress size="sm" color="gray" :ratio="0.6" /></div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Progress 컴포넌트의 모든 변형 조합을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// Real World Usage Examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 500px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">File Upload Progress</h4>
          <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px;">document.pdf</span>
              <span style="font-size: 14px; color: #666;">75%</span>
            </div>
            <Progress :ratio="0.75" color="blue" />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Course Progress</h4>
          <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px;">Vue 3 완전 정복</span>
              <span style="font-size: 14px; color: #666;">9/12 완료</span>
            </div>
            <Progress :ratio="0.75" color="green" />
            <div style="font-size: 12px; color: #666; margin-top: 4px;">75% 완료</div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">System Status</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: #f8f9fa; padding: 12px; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 14px;">CPU 사용률</span>
                <span style="font-size: 14px; color: #666;">45%</span>
              </div>
              <Progress :ratio="0.45" color="green" size="sm" />
            </div>
            <div style="background: #f8f9fa; padding: 12px; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 14px;">메모리 사용률</span>
                <span style="font-size: 14px; color: #666;">82%</span>
              </div>
              <Progress :ratio="0.82" color="gray" size="sm" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Loading States</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <Progress :ratio="0.3" :show-animation="true" size="sm" />
              <span style="font-size: 14px; color: #666;">데이터 로딩 중...</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <Progress :ratio="1.0" color="green" size="sm" />
              <span style="font-size: 14px; color: #19973c;">✓ 완료</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션에서 Progress가 사용되는 다양한 예시들입니다.',
      },
    },
  },
};

// Step Progress
export const StepProgress: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
        <h4 style="margin-bottom: 12px; font-weight: 600;">단계별 진행 상황</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="min-width: 80px; font-size: 14px;">1단계</span>
            <Progress :ratio="1.0" color="green" size="sm" />
            <span style="font-size: 14px; color: #19973c;">완료</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="min-width: 80px; font-size: 14px;">2단계</span>
            <Progress :ratio="1.0" color="green" size="sm" />
            <span style="font-size: 14px; color: #19973c;">완료</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="min-width: 80px; font-size: 14px;">3단계</span>
            <Progress :ratio="0.6" color="blue" size="sm" :show-animation="true" />
            <span style="font-size: 14px; color: #666;">진행 중</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="min-width: 80px; font-size: 14px;">4단계</span>
            <Progress :ratio="0.0" color="gray" size="sm" />
            <span style="font-size: 14px; color: #666;">대기 중</span>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다단계 프로세스에서 각 단계의 진행 상황을 표시하는 예시입니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Progress Edge Cases</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress :ratio="0" />
              <span style="color: #666; font-size: 14px;">0% (시작 전)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress :ratio="0.01" />
              <span style="color: #666; font-size: 14px;">1% (거의 시작)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress :ratio="0.99" />
              <span style="color: #666; font-size: 14px;">99% (거의 완료)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress :ratio="1.0" />
              <span style="color: #666; font-size: 14px;">100% (완료)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">String Ratios</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress ratio="0.3" />
              <span style="color: #666; font-size: 14px;">String "0.3"</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress ratio="0.8" />
              <span style="color: #666; font-size: 14px;">String "0.8"</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Size Comparison</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress size="sm" :ratio="0.5" />
              <span style="color: #666; font-size: 14px;">Small size</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Progress size="md" :ratio="0.5" />
              <span style="color: #666; font-size: 14px;">Medium size</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스와 특수 상황에서의 Progress 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Test
export const InteractiveTest: Story = {
  args: {
    ratio: 0.5,
    color: 'green',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvas.getByTestId('progress');

    // 기본 렌더링 확인
    await expect(progress).toBeInTheDocument();

    // 접근성 속성 확인
    await expect(progress).toHaveAttribute('role', 'progressbar');
    await expect(progress).toHaveAttribute('aria-valuenow', '50');
    await expect(progress).toHaveAttribute('aria-valuemin', '0');
    await expect(progress).toHaveAttribute('aria-valuemax', '100');

    // 구조 요소 확인
    const progressBar = canvas.getByTestId('progress-bar');
    const progressActive = canvas.getByTestId('progress-active');
    const progressLine = canvas.getByTestId('progress-line');

    await expect(progressBar).toBeInTheDocument();
    await expect(progressActive).toBeInTheDocument();
    await expect(progressLine).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: '인터랙티브 테스트를 위한 Progress 예시입니다.',
      },
    },
  },
};

// Performance Test - Many Progress Bars
export const PerformanceTest: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div style="display: grid; grid-template-columns: 1fr; gap: 4px; max-width: 300px; max-height: 400px; overflow-y: auto;">
        <Progress v-for="i in 50" :key="i" :ratio="i / 50" size="sm" color="green" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '많은 수의 Progress를 렌더링했을 때의 성능을 테스트할 수 있습니다.',
      },
    },
  },
};
