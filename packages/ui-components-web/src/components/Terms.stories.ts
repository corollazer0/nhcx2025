import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Terms from './Terms.vue';

const meta: Meta<typeof Terms> = {
  title: 'Components/Terms',
  component: Terms,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '약관 동의를 위한 컴포넌트입니다. 체크박스와 확장/축소 기능을 제공하며, 하위 약관 리스트를 포함할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '약관 제목',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '[필수] 전체 동의' },
      },
    },
    state: {
      control: { type: 'radio' },
      options: ['open', 'close'],
      description: '약관 확장/축소 상태',
      table: {
        type: { summary: 'open | close' },
        defaultValue: { summary: 'close' },
      },
    },
    checked: {
      control: 'boolean',
      description: '체크박스 선택 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: '화살표 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    items: {
      control: 'object',
      description: '하위 약관 리스트',
      table: {
        type: { summary: 'TermsItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    'onUpdate:checked': {
      action: 'update:checked',
      table: {
        category: 'Events',
        type: { summary: '(checked: boolean) => void' },
      },
    },
    'onUpdate:state': {
      action: 'update:state',
      table: {
        category: 'Events',
        type: { summary: '(state: "open" | "close") => void' },
      },
    },
    'onItem-check': {
      action: 'item-check',
      table: {
        category: 'Events',
        type: { summary: '(index: number, checked: boolean) => void' },
      },
    },
    'onItem-arrow-click': {
      action: 'item-arrow-click',
      table: {
        category: 'Events',
        type: { summary: '(index: number) => void' },
      },
    },
    'onArrow-click': {
      action: 'arrow-click',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    'onHeader-click': {
      action: 'header-click',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    'onUpdate:checked': fn(),
    'onUpdate:state': fn(),
    'onItem-check': fn(),
    'onItem-arrow-click': fn(),
    'onArrow-click': fn(),
    'onHeader-click': fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'close',
    checked: false,
    disabled: false,
    showArrow: true,
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '기본 약관 동의 컴포넌트입니다. 닫힌 상태로 표시됩니다.',
      },
    },
  },
};

// Playground story with all controls
export const Playground: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'close',
    checked: false,
    disabled: false,
    showArrow: true,
    items: [
      { text: '개인정보 처리방침 동의', checked: true, showArrow: true },
      { text: '서비스 이용약관 동의', checked: false, showArrow: true },
      { text: '마케팅 정보 수신 동의 (선택)', checked: false, showArrow: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '모든 컨트롤을 사용해볼 수 있는 플레이그라운드입니다.',
      },
    },
  },
};

// Checked state
export const Checked: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'close',
    checked: true,
    showArrow: true,
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '체크된 상태의 약관 동의 컴포넌트입니다.',
      },
    },
  },
};

// Expanded state
export const Expanded: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'open',
    checked: false,
    showArrow: true,
    items: [
      { text: '개인정보 처리방침 동의', checked: true, showArrow: true },
      { text: '서비스 이용약관 동의', checked: false, showArrow: true },
      { text: '마케팅 정보 수신 동의 (선택)', checked: false, showArrow: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '확장된 상태로 하위 약관 리스트가 표시됩니다.',
      },
    },
  },
};

// Expanded and checked
export const ExpandedAndChecked: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'open',
    checked: true,
    showArrow: true,
    items: [
      { text: '개인정보 처리방침 동의', checked: true, showArrow: true },
      { text: '서비스 이용약관 동의', checked: true, showArrow: true },
      { text: '마케팅 정보 수신 동의 (선택)', checked: false, showArrow: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '확장되고 체크된 상태입니다. 일부 하위 약관도 체크되어 있습니다.',
      },
    },
  },
};

// Without arrow
export const WithoutArrow: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'close',
    checked: false,
    showArrow: false,
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '화살표가 없는 약관 동의 컴포넌트입니다. 단순한 체크박스로만 구성됩니다.',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'close',
    checked: false,
    disabled: true,
    showArrow: true,
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 약관 동의 컴포넌트입니다.',
      },
    },
  },
};

// Disabled and checked
export const DisabledAndChecked: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'close',
    checked: true,
    disabled: true,
    showArrow: true,
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화되고 체크된 상태입니다.',
      },
    },
  },
};

// Complex terms list
export const ComplexTermsList: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'open',
    checked: false,
    showArrow: true,
    items: [
      {
        text: '개인정보 처리방침 동의 (필수)',
        checked: true,
        showArrow: true,
      },
      {
        text: '서비스 이용약관 동의 (필수)',
        checked: false,
        showArrow: true,
      },
      {
        text: '위치정보 이용약관 동의 (필수)',
        checked: false,
        showArrow: true,
      },
      {
        text: '마케팅 정보 수신 동의 (선택)',
        checked: false,
        showArrow: false,
      },
      {
        text: '이벤트 알림 수신 동의 (선택)',
        checked: true,
        showArrow: false,
      },
      {
        text: '제3자 정보 제공 동의 (선택)',
        checked: false,
        disabled: true,
        showArrow: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          '복잡한 약관 리스트를 가진 컴포넌트입니다. 다양한 상태의 항목들이 포함되어 있습니다.',
      },
    },
  },
};

// Long title
export const LongTitle: Story = {
  args: {
    title:
      '개인정보 처리방침, 서비스 이용약관, 위치정보 이용약관, 마케팅 정보 수신, 이벤트 알림 수신에 대한 전체 동의',
    state: 'close',
    checked: false,
    showArrow: true,
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '긴 제목을 가진 약관 동의 컴포넌트입니다.',
      },
    },
  },
};

// Empty items with open state
export const EmptyItemsOpen: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'open',
    checked: false,
    showArrow: true,
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: '하위 항목이 없지만 확장 상태인 컴포넌트입니다.',
      },
    },
  },
};

// Single item
export const SingleItem: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'open',
    checked: false,
    showArrow: true,
    items: [{ text: '개인정보 처리방침 동의', checked: false, showArrow: true }],
  },
  parameters: {
    docs: {
      description: {
        story: '단일 하위 항목을 가진 컴포넌트입니다.',
      },
    },
  },
};

// Interactive example with play function
export const InteractiveExample: Story = {
  args: {
    title: '[필수] 전체 동의',
    state: 'close',
    checked: false,
    showArrow: true,
    items: [
      { text: '개인정보 처리방침 동의', checked: false, showArrow: true },
      { text: '서비스 이용약관 동의', checked: false, showArrow: true },
      { text: '마케팅 정보 수신 동의 (선택)', checked: false, showArrow: false },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '상호작용을 테스트할 수 있는 예제입니다. 체크박스를 클릭하고 화살표를 클릭해보세요.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Storybook interaction testing을 위한 play 함수
    // 필요한 경우 interaction 테스트를 추가할 수 있습니다
  },
};

// All states showcase
export const AllStatesShowcase: Story = {
  render: () => ({
    components: { Terms },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 400px;">
        <div>
          <h3 style="margin-bottom: 10px;">기본 상태 (닫힘)</h3>
          <Terms 
            title="[필수] 전체 동의"
            :state="'close'"
            :checked="false"
            :show-arrow="true"
          />
        </div>
        
        <div>
          <h3 style="margin-bottom: 10px;">체크됨</h3>
          <Terms 
            title="[필수] 전체 동의"
            :state="'close'"
            :checked="true"
            :show-arrow="true"
          />
        </div>
        
        <div>
          <h3 style="margin-bottom: 10px;">확장됨</h3>
          <Terms 
            title="[필수] 전체 동의"
            :state="'open'"
            :checked="false"
            :show-arrow="true"
            :items="[
              { text: '개인정보 처리방침 동의', checked: true, showArrow: true },
              { text: '서비스 이용약관 동의', checked: false, showArrow: true }
            ]"
          />
        </div>
        
        <div>
          <h3 style="margin-bottom: 10px;">비활성화</h3>
          <Terms 
            title="[필수] 전체 동의"
            :state="'close'"
            :checked="false"
            :disabled="true"
            :show-arrow="true"
          />
        </div>
        
        <div>
          <h3 style="margin-bottom: 10px;">화살표 없음</h3>
          <Terms 
            title="[필수] 전체 동의"
            :state="'close'"
            :checked="false"
            :show-arrow="false"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 상태를 한번에 볼 수 있는 쇼케이스입니다.',
      },
    },
  },
};
