import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import AccountList from './AccountList.vue';

const meta = {
  title: 'Components/AccountList',
  component: AccountList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
AccountList 컴포넌트는 금융 계좌 정보를 표시하기 위한 목록 아이템입니다.

**주요 특징:**
- **은행 정보**: 은행명, 계좌번호, 은행 로고 표시
- **즐겨찾기**: 선택적으로 즐겨찾기 아이콘 표시 가능
- **인터랙션**: 클릭 및 즐겨찾기 클릭 이벤트 지원
- **접근성**: 적절한 alt 텍스트와 키보드 내비게이션 지원

**Figma 디자인을 100% 재현**하여 구현되었습니다.
- 폰트: Pretendard Medium 16px (-2% letter-spacing) / Regular 14px (-2% letter-spacing)
- 색상: #121212 (은행명), #767676 (계좌번호), #707070 (아이콘)
- 간격: 12px (요소 간), 4px (텍스트 간), 40px (로고), 24px (아이콘)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    bankName: {
      control: 'text',
      description: '은행 또는 금융기관 이름입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '금융사명' },
      },
    },
    accountNumber: {
      control: 'text',
      description: '계좌번호 또는 계좌 식별 정보입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '계좌번호' },
      },
    },
    bankLogo: {
      control: 'text',
      description: '은행 로고 이미지 URL입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'localhost 기본 로고' },
      },
    },
    showFavorite: {
      control: 'boolean',
      description: '즐겨찾기 아이콘 표시 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    favoriteIcon: {
      control: 'text',
      description: '즐겨찾기 아이콘 이미지 URL입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'localhost 기본 아이콘' },
      },
    },
    variant: {
      control: 'select',
      options: ['default'],
      description: '컴포넌트 변형 타입입니다.',
      table: {
        type: { summary: "'default'" },
        defaultValue: { summary: 'default' },
      },
    },
    onClick: {
      description: '계좌 항목 클릭 시 호출되는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
    onFavoriteClick: {
      description: '즐겨찾기 아이콘 클릭 시 호출되는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    onClick: fn(),
    onFavoriteClick: fn(),
  },
} satisfies Meta<typeof AccountList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 컨트롤이 포함된 인터랙티브 스토리
export const Playground: Story = {
  args: {
    bankName: '농협은행',
    accountNumber: '123-456-789012',
    showFavorite: true,
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 인터랙티브 playground입니다.',
      },
    },
  },
};

// Default - 기본 상태
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'AccountList 컴포넌트의 기본 상태입니다. 기본 은행명과 계좌번호가 표시됩니다.',
      },
    },
  },
};

// 실제 은행 예시들
export const NHBank: Story = {
  args: {
    bankName: '농협은행',
    accountNumber: '123-456-789012',
  },
  parameters: {
    docs: {
      description: {
        story: '농협은행 계좌의 예시입니다.',
      },
    },
  },
};

export const KBBank: Story = {
  args: {
    bankName: 'KB국민은행',
    accountNumber: '987-654-321098',
  },
  parameters: {
    docs: {
      description: {
        story: 'KB국민은행 계좌의 예시입니다.',
      },
    },
  },
};

export const ShinhanBank: Story = {
  args: {
    bankName: '신한은행',
    accountNumber: '456-789-012345',
  },
  parameters: {
    docs: {
      description: {
        story: '신한은행 계좌의 예시입니다.',
      },
    },
  },
};

// 즐겨찾기 비활성화
export const WithoutFavorite: Story = {
  args: {
    bankName: '하나은행',
    accountNumber: '111-222-333444',
    showFavorite: false,
  },
  parameters: {
    docs: {
      description: {
        story: '즐겨찾기 아이콘이 없는 상태입니다.',
      },
    },
  },
};

// 긴 텍스트 케이스
export const LongText: Story = {
  args: {
    bankName: '중소기업은행 (주식회사)',
    accountNumber: '1234-5678-9012-3456-7890',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 은행명과 계좌번호를 가진 경우의 예시입니다.',
      },
    },
  },
};

// 짧은 텍스트 케이스
export const ShortText: Story = {
  args: {
    bankName: 'K뱅크',
    accountNumber: '123-456',
  },
  parameters: {
    docs: {
      description: {
        story: '짧은 은행명과 계좌번호를 가진 경우의 예시입니다.',
      },
    },
  },
};

// 빈 텍스트 케이스 (Edge case)
export const EmptyText: Story = {
  args: {
    bankName: '',
    accountNumber: '',
  },
  parameters: {
    docs: {
      description: {
        story: '빈 문자열이 입력된 경우의 예시입니다. (Edge case)',
      },
    },
  },
};

// 커스텀 아이콘 예시
export const CustomIcons: Story = {
  args: {
    bankName: '토스뱅크',
    accountNumber: '100-200-300400',
    bankLogo: 'https://via.placeholder.com/40/0080ff/ffffff?text=T',
    favoriteIcon: 'https://via.placeholder.com/24/ff6b6b/ffffff?text=♥',
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 은행 로고와 즐겨찾기 아이콘을 사용한 예시입니다.',
      },
    },
  },
};

// 다양한 상태 그룹 스토리
export const AllVariants: Story = {
  render: () => ({
    components: { AccountList },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="width: 120px; font-weight: 500;">기본 상태:</span>
          <AccountList 
            bank-name="농협은행" 
            account-number="123-456-789012"
            @click="onClick"
            @favorite-click="onFavoriteClick"
          />
        </div>
        
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="width: 120px; font-weight: 500;">즐겨찾기 없음:</span>
          <AccountList 
            bank-name="KB국민은행" 
            account-number="987-654-321098"
            :show-favorite="false"
            @click="onClick"
            @favorite-click="onFavoriteClick"
          />
        </div>
        
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="width: 120px; font-weight: 500;">긴 텍스트:</span>
          <AccountList 
            bank-name="중소기업은행 (주식회사)" 
            account-number="1234-5678-9012-3456-7890"
            @click="onClick"
            @favorite-click="onFavoriteClick"
          />
        </div>
        
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="width: 120px; font-weight: 500;">짧은 텍스트:</span>
          <AccountList 
            bank-name="K뱅크" 
            account-number="123-456"
            @click="onClick"
            @favorite-click="onFavoriteClick"
          />
        </div>
      </div>
    `,
    methods: {
      onClick: fn(),
      onFavoriteClick: fn(),
    },
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 AccountList 변형들을 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// 인터랙션 테스트가 포함된 스토리
export const WithInteractions: Story = {
  args: {
    bankName: '우리은행',
    accountNumber: '555-666-777888',
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 이벤트 처리를 확인할 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = canvasElement;
    const accountList = canvas.querySelector('[data-testid="account-list"]') as HTMLElement;
    const favoriteIcon = canvas.querySelector('[data-testid="account-favorite"]') as HTMLElement;

    await step('계좌 클릭 테스트', async () => {
      if (accountList) {
        accountList.click();
        // args.onClick이 호출되었는지 확인할 수 있습니다
      }
    });

    await step('즐겨찾기 클릭 테스트', async () => {
      if (favoriteIcon) {
        favoriteIcon.click();
        // args.onFavoriteClick이 호출되었는지 확인할 수 있습니다
      }
    });
  },
};