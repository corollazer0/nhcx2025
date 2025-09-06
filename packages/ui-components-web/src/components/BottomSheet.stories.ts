import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import BottomSheet from './BottomSheet.vue';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
BottomSheet 컴포넌트는 화면 하단에서 올라오는 모달 형태의 UI 요소입니다.

**주요 특징:**
- **4가지 타입**: basic, picker, keypad, account
- **반응형**: 다양한 화면 크기 지원
- **접근성**: 키보드 내비게이션, ARIA 속성 지원
- **애니메이션**: 부드러운 슬라이드 효과

**타입별 기능:**
- **Basic**: 간단한 내용 표시와 확인/취소 버튼
- **Picker**: 다중 컬럼 선택 휠 (날짜, 카테고리 등)
- **Keypad**: 숫자 입력 키패드 (금액, PIN 등)
- **Account**: 계좌 목록 선택 (탭과 그룹 구조)

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['basic', 'picker', 'keypad', 'account'],
      description: '표시할 바텀시트의 타입을 선택합니다.',
      table: {
        type: { summary: "'basic' | 'picker' | 'keypad' | 'account'" },
        defaultValue: { summary: "'basic'" },
      },
    },
    title: {
      control: 'text',
      description: '헤더에 표시될 제목입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    isVisible: {
      control: 'boolean',
      description: '바텀시트의 표시/숨김 상태를 제어합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    content: {
      control: 'text',
      description: 'Basic 타입에서 표시할 텍스트 내용입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'텍스트를 입력해 주세요.'" },
      },
    },
    pickerType: {
      control: { type: 'select' },
      options: ['hour-minute', 'day', 'year-month-day'],
      description: 'Picker 타입의 종류를 선택합니다.',
      table: {
        type: { summary: "'hour-minute' | 'day' | 'year-month-day'" },
        defaultValue: { summary: "'hour-minute'" },
      },
    },
    pickerColumns: {
      control: 'object',
      description: 'Picker에 표시할 컬럼 데이터입니다.',
      table: {
        type: { summary: 'PickerColumn[]' },
        defaultValue: { summary: '[]' },
      },
    },
    initialAmount: {
      control: 'number',
      description: 'Keypad 타입의 초기 금액입니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    quickAmounts: {
      control: 'object',
      description: 'Keypad 타입의 빠른 금액 선택 버튼입니다.',
      table: {
        type: { summary: 'number[]' },
        defaultValue: { summary: '[100000, 500000, 1000000, 10000000]' },
      },
    },
    accountGroups: {
      control: 'object',
      description: 'Account 타입의 계좌 그룹 데이터입니다.',
      table: {
        type: { summary: 'AccountGroup[]' },
        defaultValue: { summary: '[]' },
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Type Story
export const BasicType: Story = {
  args: {
    type: 'basic',
    title: '기본 바텀시트',
    isVisible: true,
    content: '이것은 기본 타입의 바텀시트입니다.'
  },
  parameters: {
    layout: 'fullscreen',
    controls: { 
      include: ['type', 'title', 'isVisible', 'content']
    }
  },
  render: (args) => ({
    components: { BottomSheet },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100vw; height: 100vh; background: #f0f0f0; position: relative;">
        <BottomSheet v-bind="args" />
      </div>
    `
  })
};

// Picker Type Story
export const PickerType: Story = {
  args: {
    type: 'picker',
    title: '날짜 선택',
    isVisible: true,
    pickerType: 'year-month-day',
    pickerColumns: [
      {
        items: [
          { label: '2020', value: 2020 },
          { label: '2021', value: 2021 },
          { label: '2022', value: 2022 },
          { label: '2023', value: 2023 },
          { label: '2024', value: 2024, selected: true },
          { label: '2025', value: 2025 }
        ]
      },
      {
        items: [
          { label: '1월', value: 1 },
          { label: '2월', value: 2 },
          { label: '3월', value: 3 },
          { label: '4월', value: 4 },
          { label: '5월', value: 5 },
          { label: '6월', value: 6 },
          { label: '7월', value: 7 },
          { label: '8월', value: 8 },
          { label: '9월', value: 9, selected: true },
          { label: '10월', value: 10 },
          { label: '11월', value: 11 },
          { label: '12월', value: 12 }
        ]
      }
    ]
  },
  parameters: {
    layout: 'fullscreen',
    controls: { 
      include: ['type', 'title', 'isVisible', 'pickerType', 'pickerColumns']
    }
  },
  render: (args) => ({
    components: { BottomSheet },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100vw; height: 100vh; background: #f0f0f0; position: relative;">
        <BottomSheet v-bind="args" />
      </div>
    `
  })
};

// Keypad Type Story
export const KeypadType: Story = {
  args: {
    type: 'keypad',
    title: '금액 입력',
    isVisible: true,
    initialAmount: 100000,
    quickAmounts: [100000, 500000, 1000000, 10000000]
  },
  parameters: {
    layout: 'fullscreen',
    controls: { 
      include: ['type', 'title', 'isVisible', 'initialAmount', 'quickAmounts']
    }
  },
  render: (args) => ({
    components: { BottomSheet },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100vw; height: 100vh; background: #f0f0f0; position: relative;">
        <BottomSheet v-bind="args" />
      </div>
    `
  })
};

// Account Type Story
export const AccountType: Story = {
  args: {
    type: 'account',
    title: '계좌 선택',
    isVisible: true,
    accountGroups: [
      {
        title: '최근 사용',
        accounts: [
          {
            id: 'acc1',
            bankName: '우리은행',
            accountName: '입출금통장',
            accountNumber: '1002-123-456789',
            logoUrl: '',
            isSelected: true
          }
        ]
      },
      {
        title: '내 계좌',
        accounts: [
          {
            id: 'acc2',
            bankName: '신한은행',
            accountName: '입출금통장',
            accountNumber: '110-123-456789',
            logoUrl: ''
          },
          {
            id: 'acc3',
            bankName: 'NH농협은행',
            accountName: '예금통장',
            accountNumber: '987-65-432109',
            logoUrl: ''
          }
        ]
      }
    ]
  },
  parameters: {
    layout: 'fullscreen',
    controls: { 
      include: ['type', 'title', 'isVisible', 'accountGroups']
    }
  },
  render: (args) => ({
    components: { BottomSheet },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100vw; height: 100vh; background: #f0f0f0; position: relative;">
        <BottomSheet v-bind="args" />
      </div>
    `
  })
};

// Interactive Playground
export const Playground: Story = {
  args: {
    type: 'basic',
    title: '바텀시트 플레이그라운드',
    isVisible: true,
    content: '이것은 인터랙티브 플레이그라운드입니다.',
    pickerType: 'year-month-day',
    pickerColumns: [
      {
        items: [
          { label: '2020', value: 2020 },
          { label: '2021', value: 2021 },
          { label: '2022', value: 2022 },
          { label: '2023', value: 2023 },
          { label: '2024', value: 2024, selected: true },
          { label: '2025', value: 2025 }
        ]
      },
      {
        items: [
          { label: '1월', value: 1 },
          { label: '2월', value: 2 },
          { label: '3월', value: 3 },
          { label: '4월', value: 4 },
          { label: '5월', value: 5 },
          { label: '6월', value: 6 },
          { label: '7월', value: 7 },
          { label: '8월', value: 8 },
          { label: '9월', value: 9, selected: true },
          { label: '10월', value: 10 },
          { label: '11월', value: 11 },
          { label: '12월', value: 12 }
        ]
      }
    ],
    initialAmount: 0,
    quickAmounts: [100000, 500000, 1000000, 10000000],
    accountGroups: [
      {
        title: '최근 사용',
        accounts: [
          {
            id: 'acc1',
            bankName: '우리은행',
            accountName: '입출금통장',
            accountNumber: '1002-123-456789',
            logoUrl: '',
            isSelected: true
          }
        ]
      },
      {
        title: '내 계좌',
        accounts: [
          {
            id: 'acc2',
            bankName: '신한은행',
            accountName: '입출금통장',
            accountNumber: '110-123-456789',
            logoUrl: ''
          },
          {
            id: 'acc3',
            bankName: 'NH농협은행',
            accountName: '예금통장',
            accountNumber: '987-65-432109',
            logoUrl: ''
          }
        ]
      }
    ]
  },
  render: (args) => ({
    components: { BottomSheet },
    setup() {
      const localArgs = ref({ ...args });
      
      // Watch for control changes and update local args
      watch(() => args, (newArgs) => {
        Object.assign(localArgs.value, newArgs);
      }, { deep: true });

      const handleClose = () => {
        localArgs.value.isVisible = false;
      };

      return {
        localArgs,
        handleClose
      };
    },
    template: `
      <div style="width: 100vw; height: 100vh; background: #f0f0f0; position: relative; display: flex; align-items: center; justify-content: center;">
        <button 
          @click="localArgs.isVisible = true" 
          style="padding: 12px 24px; background: #19973c; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;"
        >
          바텀시트 열기
        </button>
        <BottomSheet
          v-bind="localArgs"
          @close="handleClose"
        />
      </div>
    `
  })
};

// Hidden State Story
export const HiddenState: Story = {
  args: {
    type: 'basic',
    title: '숨겨진 바텀시트',
    isVisible: false,
    content: '이 바텀시트는 숨겨져 있습니다.'
  },
  parameters: {
    layout: 'fullscreen',
    controls: { 
      include: ['type', 'title', 'isVisible', 'content']
    }
  },
  render: (args) => ({
    components: { BottomSheet },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100vw; height: 100vh; background: #f0f0f0; position: relative; display: flex; align-items: center; justify-content: center;">
        <p style="color: #666; font-size: 16px;">이 스토리는 숨겨진 상태를 보여줍니다. isVisible을 true로 변경해보세요.</p>
        <BottomSheet v-bind="args" />
      </div>
    `
  })
};

// Long Content Story
export const LongContent: Story = {
  args: {
    type: 'basic',
    title: '긴 내용의 바텀시트',
    isVisible: true,
    content: `
이것은 매우 긴 내용을 가진 바텀시트입니다.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
    `.trim()
  },
  parameters: {
    layout: 'fullscreen',
    controls: { 
      include: ['type', 'title', 'isVisible', 'content']
    }
  },
  render: (args) => ({
    components: { BottomSheet },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 100vw; height: 100vh; background: #f0f0f0; position: relative;">
        <BottomSheet v-bind="args" />
      </div>
    `
  })
};