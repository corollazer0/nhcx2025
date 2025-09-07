import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import GeneralList from './GeneralList.vue';

const meta: Meta<typeof GeneralList> = {
  title: 'Components/GeneralList',
  component: GeneralList,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
GeneralList 컴포넌트는 다양한 형태의 정보를 카드 형태로 표시하는 범용 리스트 컴포넌트입니다.

**주요 특징:**
- **헤더 섹션**: 라벨, 제목, 부제목, 체크박스 지원
- **데이터 리스트**: 키-값 쌍의 정보 표시
- **버튼**: 액션 버튼 (secondary, tertiary 스타일)
- **접근성**: ARIA 속성 및 키보드 내비게이션 지원

**사용 사례:**
- 보험 상품 정보 카드
- 투자 상품 목록
- 계좌 상세 정보
- 설정 옵션 리스트

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      }
    }
  },
  argTypes: {
    showHeader: {
      control: 'boolean',
      description: '헤더 섹션 표시 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    labels: {
      control: 'object',
      description: '헤더 상단에 표시할 라벨들입니다.',
      table: {
        type: { summary: 'Label[]' },
        defaultValue: { summary: '[]' },
      },
    },
    title: {
      control: 'text',
      description: '메인 제목입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    subtitle: {
      control: 'text',
      description: '부제목 또는 설명 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    showTooltip: {
      control: 'boolean',
      description: '제목 옆 툴팁 버튼 표시 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showCheckbox: {
      control: 'boolean',
      description: '체크박스 표시 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checkboxText: {
      control: 'text',
      description: '체크박스 라벨 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    showCheckboxText: {
      control: 'boolean',
      description: '체크박스 라벨 텍스트 표시 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checkboxSize: {
      control: { type: 'select' },
      options: ['sm', 'xs'],
      description: '체크박스 크기입니다.',
      table: {
        type: { summary: "'sm' | 'xs'" },
        defaultValue: { summary: "'sm'" },
      },
    },
    dataList: {
      control: 'object',
      description: '표시할 데이터 항목들입니다.',
      table: {
        type: { summary: 'DataItem[]' },
        defaultValue: { summary: '[]' },
      },
    },
    buttonText: {
      control: 'text',
      description: '액션 버튼 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    buttonVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼 스타일 변형입니다.',
      table: {
        type: { summary: "'primary' | 'secondary' | 'tertiary'" },
        defaultValue: { summary: "'secondary'" },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: '우상단 닫기 버튼 표시 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '컴포넌트 비활성화 상태입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact'],
      description: '컴포넌트 크기 변형입니다.',
      table: {
        type: { summary: "'default' | 'compact'" },
        defaultValue: { summary: "'default'" },
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// 첫 번째 GeneralList - 상세한 보험 상품 정보 (Figma 9801:92288)
export const InsuranceProduct: Story = {
  args: {
    showHeader: true,
    labels: [
      { id: 'risk-label', text: '매우낮은위험', variant: 'navy' }
    ],
    title: '기쁨가득NH저축보험(무)_1804(적립형) (기본형)',
    subtitle: '028-0612-0912-11',
    showTooltip: true,
    showCheckbox: true,
    modelValue: false,
    checkboxSize: 'sm',
    dataList: [
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터', isNegative: true }
    ],
    showCloseButton: true
  },
  parameters: {
    controls: { 
      include: ['showHeader', 'labels', 'title', 'subtitle', 'showTooltip', 'showCheckbox', 'modelValue', 'dataList', 'showCloseButton']
    }
  }
};

// 두 번째 GeneralList - 투자 상품 정보 with 버튼 (Figma 9801:92289)
export const InvestmentProduct: Story = {
  args: {
    showHeader: true,
    labels: [
      { id: 'risk-label', text: '다소높은위험', variant: 'orange' }
    ],
    title: '새로운 행복의 기회 3년 결혼자금 만들기',
    subtitle: '로보목돈마련 투자설계2호(가입일:2023.10.20)',
    showTooltip: true,
    showCheckbox: true,
    modelValue: false,
    checkboxSize: 'sm',
    dataList: [
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터', isNegative: true }
    ],
    buttonText: '포트폴리오 점검 리포트',
    buttonVariant: 'secondary'
  },
  parameters: {
    controls: { 
      include: ['showHeader', 'labels', 'title', 'subtitle', 'showTooltip', 'showCheckbox', 'modelValue', 'dataList', 'buttonText', 'buttonVariant']
    }
  }
};

// 세 번째 GeneralList - 간단한 데이터 리스트 (Figma 9801:92290)
export const SimpleDataList: Story = {
  args: {
    showHeader: false,
    dataList: [
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터' },
      { title: '타이틀', value: '데이터' }
    ],
    buttonText: '취소',
    buttonVariant: 'tertiary'
  },
  parameters: {
    controls: { 
      include: ['showHeader', 'dataList', 'buttonText', 'buttonVariant']
    }
  }
};

// Interactive Playground
export const Playground: Story = {
  args: {
    showHeader: true,
    labels: [
      { id: 'risk-label', text: '매우낮은위험', variant: 'navy' }
    ],
    title: 'GeneralList 플레이그라운드',
    subtitle: '모든 기능을 테스트해보세요',
    showTooltip: true,
    showCheckbox: true,
    modelValue: false,
    checkboxText: '선택',
    showCheckboxText: true,
    checkboxSize: 'sm',
    dataList: [
      { title: '월 적립금', value: '100,000원' },
      { title: '적립 기간', value: '3년' },
      { title: '예상 수익률', value: '3.5%' },
      { title: '손실 가능액', value: '-50,000원', isNegative: true }
    ],
    buttonText: '자세히 보기',
    buttonVariant: 'secondary',
    showCloseButton: true,
    disabled: false,
    variant: 'default'
  },
  render: (args) => ({
    components: { GeneralList },
    setup() {
      const localArgs = ref({ ...args });
      
      // Watch for control changes and update local args
      watch(() => args, (newArgs) => {
        Object.assign(localArgs.value, newArgs);
      }, { deep: true });

      const handleTooltipClick = () => {
        console.log('Tooltip clicked');
      };

      const handleButtonClick = () => {
        console.log('Button clicked');
      };

      const handleCloseClick = () => {
        console.log('Close clicked');
      };

      const handleCheckboxChange = (checked: boolean) => {
        console.log('Checkbox changed:', checked);
      };

      return {
        localArgs,
        handleTooltipClick,
        handleButtonClick,
        handleCloseClick,
        handleCheckboxChange
      };
    },
    template: `
      <GeneralList
        v-bind="localArgs"
        @tooltip-click="handleTooltipClick"
        @button-click="handleButtonClick"
        @close-click="handleCloseClick"
        @checkbox-change="handleCheckboxChange"
      />
    `
  })
};

// 기본 상태들
export const WithoutHeader: Story = {
  args: {
    showHeader: false,
    dataList: [
      { title: '계좌번호', value: '123-456-789012' },
      { title: '잔액', value: '1,234,567원' },
      { title: '이용가능금액', value: '1,000,000원' }
    ]
  }
};

export const OnlyTitle: Story = {
  args: {
    showHeader: true,
    title: '간단한 제목만 있는 GeneralList',
    dataList: [
      { title: '항목 1', value: '값 1' },
      { title: '항목 2', value: '값 2' }
    ]
  }
};

export const WithMultipleLabels: Story = {
  args: {
    showHeader: true,
    labels: [
      { id: 'risk', text: '매우낮은위험', variant: 'navy' },
      { id: 'type', text: '적립형', variant: 'gray' }
    ],
    title: '다중 라벨이 있는 상품',
    showCheckbox: true,
    modelValue: false,
    checkboxSize: 'sm',
    dataList: [
      { title: '상품유형', value: '저축보험' },
      { title: '위험등급', value: '1등급' }
    ]
  }
};

export const AllNegativeValues: Story = {
  args: {
    showHeader: true,
    title: '손실 현황',
    dataList: [
      { title: '일일 손익', value: '-123,456원', isNegative: true },
      { title: '누적 손익', value: '-987,654원', isNegative: true },
      { title: '평가 손익률', value: '-15.3%', isNegative: true }
    ],
    buttonText: '상세 보기',
    buttonVariant: 'tertiary'
  }
};

export const DisabledState: Story = {
  args: {
    showHeader: true,
    title: '비활성화된 상태',
    subtitle: '현재 이용할 수 없는 상품입니다',
    dataList: [
      { title: '상태', value: '일시중단' },
      { title: '재개일', value: '미정' }
    ],
    buttonText: '문의하기',
    buttonVariant: 'secondary',
    disabled: true
  }
};

export const CompactVariant: Story = {
  args: {
    showHeader: true,
    title: '컴팩트 버전',
    dataList: [
      { title: '항목', value: '값' }
    ],
    variant: 'compact'
  }
};

export const LongTitle: Story = {
  args: {
    showHeader: true,
    title: '매우 긴 제목을 가진 상품으로 텍스트 오버플로우와 줄바꿈 처리를 확인하기 위한 예시',
    subtitle: '이것도 매우 긴 부제목으로 여러 줄에 걸쳐 표시될 수 있는 텍스트입니다',
    showTooltip: true,
    dataList: [
      { title: '매우 긴 타이틀 항목', value: '매우 긴 값 데이터 텍스트' }
    ]
  }
};