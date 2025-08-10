import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Badge from './Badge.vue';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Badge 컴포넌트는 알림이나 카운트를 시각적으로 표시하는 작은 인디케이터입니다.

**주요 특징:**
- **변형**: dot(점 형태), count(숫자 표시)
- **크기**: sm, md (2가지)
- **색상**: red, blue, green, gray (4가지)
- **기능**: 최대값 설정, 0 표시 옵션, 99+ 형태 표시

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['dot', 'count'],
      description: 'Badge의 형태를 설정합니다.',
      table: {
        type: { summary: "'dot' | 'count'" },
        defaultValue: { summary: "'dot'" },
      },
    },
    count: {
      control: { type: 'number', min: 0, max: 9999, step: 1 },
      description: 'count variant에서 표시할 숫자입니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    maxCount: {
      control: { type: 'number', min: 1, max: 9999, step: 1 },
      description: '표시할 최대 숫자입니다. 초과 시 "maxCount+" 형태로 표시됩니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['red', 'blue', 'green', 'gray'],
      description: 'Badge의 색상을 설정합니다.',
      table: {
        type: { summary: "'red' | 'blue' | 'green' | 'gray'" },
        defaultValue: { summary: "'red'" },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Badge의 크기를 설정합니다.',
      table: {
        type: { summary: "'sm' | 'md'" },
        defaultValue: { summary: "'md'" },
      },
    },
    showZero: {
      control: 'boolean',
      description: 'count가 0일 때도 badge를 표시할지 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    variant: 'count',
    count: 5,
    maxCount: 99,
    color: 'red',
    size: 'md',
    showZero: false,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 Badge의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 Badge 컴포넌트입니다. (variant: dot, color: red, size: md)',
      },
    },
  },
};

// Variant Stories
export const DotVariant: Story = {
  args: {
    variant: 'dot',
    color: 'red',
  },
  parameters: {
    docs: {
      description: {
        story: 'Dot 변형은 작은 점으로 새로운 알림이나 업데이트를 나타냅니다.',
      },
    },
  },
};

export const CountVariant: Story = {
  args: {
    variant: 'count',
    count: 5,
    color: 'red',
  },
  parameters: {
    docs: {
      description: {
        story: 'Count 변형은 숫자로 정확한 개수를 표시합니다.',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 24px;">
          <h4 style="width: 80px; margin: 0; font-size: 16px; font-weight: 600;">Dot</h4>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Badge variant="dot" size="sm" color="red" />
            <span style="color: #666; font-size: 14px;">Small</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Badge variant="dot" size="md" color="red" />
            <span style="color: #666; font-size: 14px;">Medium</span>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 24px;">
          <h4 style="width: 80px; margin: 0; font-size: 16px; font-weight: 600;">Count</h4>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Badge variant="count" count="5" size="sm" color="red" />
            <span style="color: #666; font-size: 14px;">Small</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <Badge variant="count" count="5" size="md" color="red" />
            <span style="color: #666; font-size: 14px;">Medium</span>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 크기 변형을 variant별로 확인할 수 있습니다.',
      },
    },
  },
};

// Color Variants
export const Colors: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Dot Variant</h4>
          <div style="display: flex; gap: 24px; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <Badge variant="dot" color="red" />
              <span style="color: #666; font-size: 14px;">Red</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <Badge variant="dot" color="blue" />
              <span style="color: #666; font-size: 14px;">Blue</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <Badge variant="dot" color="green" />
              <span style="color: #666; font-size: 14px;">Green</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <Badge variant="dot" color="gray" />
              <span style="color: #666; font-size: 14px;">Gray</span>
            </div>
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">Count Variant</h4>
          <div style="display: flex; gap: 24px; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <Badge variant="count" count="5" color="red" />
              <span style="color: #666; font-size: 14px;">Red</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <Badge variant="count" count="5" color="blue" />
              <span style="color: #666; font-size: 14px;">Blue</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <Badge variant="count" count="5" color="green" />
              <span style="color: #666; font-size: 14px;">Green</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <Badge variant="count" count="5" color="gray" />
              <span style="color: #666; font-size: 14px;">Gray</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 색상 변형을 variant별로 확인할 수 있습니다.',
      },
    },
  },
};

// Count Variations
export const CountVariations: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="1" />
          <span style="color: #666; font-size: 14px;">Single digit</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="12" />
          <span style="color: #666; font-size: 14px;">Double digits</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="99" />
          <span style="color: #666; font-size: 14px;">Max normal count</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="100" />
          <span style="color: #666; font-size: 14px;">Over max (99+)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="1000" />
          <span style="color: #666; font-size: 14px;">Large number (99+)</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 숫자 범위에서의 Badge 표시를 확인할 수 있습니다.',
      },
    },
  },
};

// Max Count Options
export const MaxCountOptions: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="150" max-count="99" />
          <span style="color: #666; font-size: 14px;">150 with maxCount 99 → 99+</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="1500" max-count="999" />
          <span style="color: #666; font-size: 14px;">1500 with maxCount 999 → 999+</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="50" max-count="999" />
          <span style="color: #666; font-size: 14px;">50 with maxCount 999 → 50</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="25" max-count="9" />
          <span style="color: #666; font-size: 14px;">25 with maxCount 9 → 9+</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'maxCount 옵션에 따른 숫자 표시 방식을 확인할 수 있습니다.',
      },
    },
  },
};

// ShowZero Option
export const ShowZeroOption: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="0" show-zero="false" />
          <span style="color: #666; font-size: 14px;">Count 0, showZero false (숨김)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="0" show-zero="true" />
          <span style="color: #666; font-size: 14px;">Count 0, showZero true (표시)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="5" show-zero="false" />
          <span style="color: #666; font-size: 14px;">Count 5, showZero false (표시)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Badge variant="count" count="5" show-zero="true" />
          <span style="color: #666; font-size: 14px;">Count 5, showZero true (표시)</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'showZero 옵션에 따른 0값 표시 여부를 확인할 수 있습니다.',
      },
    },
  },
};

// All Combinations Matrix
export const AllCombinations: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="width: 100%; max-width: 1000px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Badge Design System Matrix
        </h3>
        <div style="display: grid; grid-template-columns: 80px repeat(4, 1fr); gap: 16px; align-items: center;">
          <!-- Headers -->
          <div></div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Red</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Blue</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Green</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Gray</div>
          
          <!-- Dot MD Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Dot MD</div>
          <div style="text-align: center;"><Badge variant="dot" size="md" color="red" /></div>
          <div style="text-align: center;"><Badge variant="dot" size="md" color="blue" /></div>
          <div style="text-align: center;"><Badge variant="dot" size="md" color="green" /></div>
          <div style="text-align: center;"><Badge variant="dot" size="md" color="gray" /></div>
          
          <!-- Dot SM Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Dot SM</div>
          <div style="text-align: center;"><Badge variant="dot" size="sm" color="red" /></div>
          <div style="text-align: center;"><Badge variant="dot" size="sm" color="blue" /></div>
          <div style="text-align: center;"><Badge variant="dot" size="sm" color="green" /></div>
          <div style="text-align: center;"><Badge variant="dot" size="sm" color="gray" /></div>
          
          <!-- Count MD Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Count MD</div>
          <div style="text-align: center;"><Badge variant="count" count="5" size="md" color="red" /></div>
          <div style="text-align: center;"><Badge variant="count" count="5" size="md" color="blue" /></div>
          <div style="text-align: center;"><Badge variant="count" count="5" size="md" color="green" /></div>
          <div style="text-align: center;"><Badge variant="count" count="5" size="md" color="gray" /></div>
          
          <!-- Count SM Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">Count SM</div>
          <div style="text-align: center;"><Badge variant="count" count="5" size="sm" color="red" /></div>
          <div style="text-align: center;"><Badge variant="count" count="5" size="sm" color="blue" /></div>
          <div style="text-align: center;"><Badge variant="count" count="5" size="sm" color="green" /></div>
          <div style="text-align: center;"><Badge variant="count" count="5" size="sm" color="gray" /></div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Badge 컴포넌트의 모든 변형 조합을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// Real World Usage Examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Navigation Menu</h4>
          <div style="display: flex; gap: 24px;">
            <div style="position: relative; padding: 12px 16px; background: #f8f9fa; border-radius: 8px; cursor: pointer;">
              <span>Messages</span>
              <div style="position: absolute; top: 8px; right: 12px;">
                <Badge variant="count" count="3" size="sm" color="red" />
              </div>
            </div>
            <div style="position: relative; padding: 12px 16px; background: #f8f9fa; border-radius: 8px; cursor: pointer;">
              <span>Notifications</span>
              <div style="position: absolute; top: 8px; right: 12px;">
                <Badge variant="dot" size="sm" color="red" />
              </div>
            </div>
            <div style="position: relative; padding: 12px 16px; background: #f8f9fa; border-radius: 8px; cursor: pointer;">
              <span>Cart</span>
              <div style="position: absolute; top: 8px; right: 12px;">
                <Badge variant="count" count="12" size="sm" color="blue" />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Status Indicators</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <Badge variant="dot" color="green" size="sm" />
              <span>Online</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <Badge variant="dot" color="red" size="sm" />
              <span>New Update Available</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <Badge variant="count" count="5" color="blue" size="sm" />
              <span>Pending Reviews</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Feature Labels</h4>
          <div style="display: flex; gap: 16px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #f8f9fa; border-radius: 6px;">
              <span>Premium Feature</span>
              <Badge variant="dot" color="blue" size="sm" />
            </div>
            <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #f8f9fa; border-radius: 6px;">
              <span>Beta</span>
              <Badge variant="count" count="2" color="green" size="sm" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션에서 Badge가 사용되는 다양한 예시들입니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Count Edge Cases</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <Badge variant="count" count="0" show-zero="false" />
              <span style="color: #666; font-size: 14px;">Count 0 (hidden by default)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Badge variant="count" count="0" show-zero="true" />
              <span style="color: #666; font-size: 14px;">Count 0 (shown with showZero)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Badge variant="count" count="999" />
              <span style="color: #666; font-size: 14px;">Large number (999)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Badge variant="count" count="9999" max-count="999" />
              <span style="color: #666; font-size: 14px;">Very large number (999+)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Various Sizes</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; align-items: center; gap: 16px;">
              <Badge variant="dot" size="sm" />
              <Badge variant="dot" size="md" />
              <span style="color: #666; font-size: 14px;">Dot sizes comparison</span>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
              <Badge variant="count" count="99+" size="sm" />
              <Badge variant="count" count="99+" size="md" />
              <span style="color: #666; font-size: 14px;">Count sizes comparison</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스와 특수 상황에서의 Badge 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Test
export const InteractiveTest: Story = {
  args: {
    variant: 'count',
    count: 1,
    color: 'red',
  },
  play: async ({ canvasElement }) => {
    // Interactive testing example
    // const canvas = within(canvasElement);
    // const badge = canvas.getByTestId('badge');
    // await expect(badge).toBeInTheDocument();
  },
  parameters: {
    docs: {
      description: {
        story: '인터랙티브 테스트를 위한 Badge 예시입니다.',
      },
    },
  },
};

// Performance Test - Many Badges
export const PerformanceTest: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: grid; grid-template-columns: repeat(20, 1fr); gap: 8px; max-width: 800px;">
        <Badge v-for="i in 100" :key="i" variant="count" :count="i" size="sm" color="red" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '많은 수의 Badge를 렌더링했을 때의 성능을 테스트할 수 있습니다.',
      },
    },
  },
};