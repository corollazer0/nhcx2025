import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import Summary from './Summary.vue';

const meta: Meta<typeof Summary> = {
  title: 'Components/Summary',
  component: Summary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Summary 컴포넌트는 정보를 요약해서 보여주는 카드 형태의 컴포넌트입니다.

**주요 특징:**
- **두 가지 변형**: Basic (기본형), Accordion (접기/펼치기형)
- **헤더 섹션**: 라벨, 제목, 부제목 지원
- **데이터 리스트**: 키-값 쌍의 정보를 깔끔하게 표시
- **접근성**: ARIA 속성 및 키보드 내비게이션 지원

**사용 사례:**
- 계좌 요약 정보
- 투자 상품 세부사항
- 거래 내역 요약
- 설정 정보 표시

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'accordion'],
      description: 'Summary 컴포넌트의 변형을 선택합니다.',
      table: {
        type: { summary: "'basic' | 'accordion'" },
        defaultValue: { summary: "'basic'" },
      },
    },
    showHeader: {
      control: 'boolean',
      description: '헤더 섹션 표시 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: 'text',
      description: '헤더 상단에 표시할 라벨입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    title: {
      control: 'text',
      description: '메인 제목입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'타이틀'" },
      },
    },
    subtitle: {
      control: 'text',
      description: '부제목 또는 설명 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'부가설명'" },
      },
    },
    showList: {
      control: 'boolean',
      description: '데이터 리스트 표시 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    items: {
      control: 'object',
      description: '표시할 데이터 항목들입니다.',
      table: {
        type: { summary: 'SummaryItem[]' },
        defaultValue: { summary: '[{title: "타이틀", data: "데이터"}]' },
      },
    },
    collapsedItemCount: {
      control: 'number',
      description: 'Accordion 타입에서 접힌 상태일 때 표시할 항목 수입니다.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    showToggleButton: {
      control: 'boolean',
      description: 'Accordion 타입에서 토글 버튼 표시 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    expandText: {
      control: 'text',
      description: '펼치기 버튼의 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'펼치기'" },
      },
    },
    collapseText: {
      control: 'text',
      description: '접기 버튼의 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'접기'" },
      },
    },
    expanded: {
      control: 'boolean',
      description: 'Accordion 타입의 초기 확장 상태입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Type Summary (Figma 3150:53180)
export const BasicType: Story = {
  args: {
    variant: 'basic',
    showHeader: true,
    label: '라벨',
    title: '타이틀',
    subtitle: '부가설명',
    showList: true,
    items: [
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' }
    ]
  },
  parameters: {
    controls: { 
      include: ['variant', 'showHeader', 'label', 'title', 'subtitle', 'showList', 'items']
    }
  }
};

// Accordion Type - Collapsed State
export const AccordionCollapsed: Story = {
  args: {
    variant: 'accordion',
    showHeader: true,
    title: '계좌 요약',
    subtitle: '주요 정보를 확인하세요',
    showList: true,
    items: [
      { title: '계좌번호', data: '123-456-789012' },
      { title: '잔액', data: '1,234,567원' },
      { title: '이용가능금액', data: '1,000,000원' },
      { title: '대출잔액', data: '500,000원' },
      { title: '월 이용한도', data: '2,000,000원' },
      { title: '연 이자율', data: '3.5%' }
    ],
    collapsedItemCount: 3,
    expanded: false,
    expandText: '펼치기',
    collapseText: '접기'
  },
  parameters: {
    controls: { 
      include: ['variant', 'items', 'collapsedItemCount', 'expanded', 'expandText', 'collapseText']
    }
  }
};

// Accordion Type - Expanded State
export const AccordionExpanded: Story = {
  args: {
    variant: 'accordion',
    showHeader: true,
    title: '투자 상품 상세',
    subtitle: '전체 정보를 확인하세요',
    showList: true,
    items: [
      { title: '상품명', data: 'NH투자증권 랩' },
      { title: '투자금액', data: '10,000,000원' },
      { title: '현재가치', data: '10,500,000원' },
      { title: '수익률', data: '+5.0%' },
      { title: '투자기간', data: '12개월' },
      { title: '위험등급', data: '3등급' },
      { title: '운용보수', data: '0.5%' },
      { title: '판매보수', data: '0.3%' }
    ],
    collapsedItemCount: 4,
    expanded: true,
    expandText: '펼치기',
    collapseText: '접기'
  },
  parameters: {
    controls: { 
      include: ['variant', 'items', 'collapsedItemCount', 'expanded', 'expandText', 'collapseText']
    }
  }
};

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'accordion',
    showHeader: true,
    label: '플레이그라운드',
    title: 'Summary 플레이그라운드',
    subtitle: '모든 기능을 테스트해보세요',
    showList: true,
    items: [
      { title: '항목 1', data: '값 1' },
      { title: '항목 2', data: '값 2' },
      { title: '항목 3', data: '값 3' },
      { title: '항목 4', data: '값 4' },
      { title: '항목 5', data: '값 5' },
      { title: '항목 6', data: '값 6' }
    ],
    collapsedItemCount: 3,
    expanded: false,
    expandText: '더보기',
    collapseText: '접기',
    showToggleButton: true
  },
  render: (args) => ({
    components: { Summary },
    setup() {
      const localArgs = ref({ ...args });
      
      // Watch for control changes and update local args
      watch(() => args, (newArgs) => {
        Object.assign(localArgs.value, newArgs);
      }, { deep: true });

      const handleToggle = (expanded: boolean) => {
        console.log('Toggle clicked:', expanded);
        localArgs.value.expanded = expanded;
      };

      const handleItemClick = (item: any, index: number) => {
        console.log('Item clicked:', item, 'at index:', index);
      };

      return {
        localArgs,
        handleToggle,
        handleItemClick
      };
    },
    template: `
      <Summary
        v-bind="localArgs"
        @toggle="handleToggle"
        @item-click="handleItemClick"
      />
    `
  })
};

// Without Header
export const WithoutHeader: Story = {
  args: {
    variant: 'basic',
    showHeader: false,
    items: [
      { title: '최종 금액', data: '1,500,000원' },
      { title: '할인 금액', data: '-50,000원' },
      { title: '결제 예정 금액', data: '1,450,000원' }
    ]
  }
};

// Only Title
export const OnlyTitle: Story = {
  args: {
    variant: 'basic',
    showHeader: true,
    label: '',
    title: '간단한 제목만 있는 Summary',
    subtitle: '',
    items: [
      { title: '항목 1', data: '값 1' },
      { title: '항목 2', data: '값 2' }
    ]
  }
};

// With Label Only
export const WithLabelOnly: Story = {
  args: {
    variant: 'basic',
    showHeader: true,
    label: '중요',
    title: '',
    subtitle: '',
    items: [
      { title: '상태', data: '활성' },
      { title: '만료일', data: '2024-12-31' }
    ]
  }
};

// Long Content
export const LongContent: Story = {
  args: {
    variant: 'accordion',
    showHeader: true,
    title: '매우 긴 제목을 가진 Summary로 텍스트 오버플로우 처리를 확인하기 위한 예시',
    subtitle: '이것도 매우 긴 부제목으로 여러 줄에 걸쳐 표시될 수 있는 설명 텍스트입니다',
    items: [
      { title: '매우 긴 항목명 텍스트', data: '매우 긴 데이터 값 텍스트' },
      { title: '짧은 항목', data: '짧은 값' },
      { title: '일반적인 길이의 항목명', data: '일반적인 데이터 값' }
    ],
    collapsedItemCount: 2,
    expanded: false
  }
};

// Empty State
export const EmptyState: Story = {
  args: {
    variant: 'basic',
    showHeader: true,
    title: '데이터가 없는 상태',
    subtitle: '표시할 항목이 없습니다',
    items: []
  }
};

// Many Items Accordion
export const ManyItemsAccordion: Story = {
  args: {
    variant: 'accordion',
    showHeader: true,
    title: '많은 항목이 있는 Accordion',
    subtitle: '총 12개의 항목이 있습니다',
    items: [
      { title: '항목 1', data: '데이터 1' },
      { title: '항목 2', data: '데이터 2' },
      { title: '항목 3', data: '데이터 3' },
      { title: '항목 4', data: '데이터 4' },
      { title: '항목 5', data: '데이터 5' },
      { title: '항목 6', data: '데이터 6' },
      { title: '항목 7', data: '데이터 7' },
      { title: '항목 8', data: '데이터 8' },
      { title: '항목 9', data: '데이터 9' },
      { title: '항목 10', data: '데이터 10' },
      { title: '항목 11', data: '데이터 11' },
      { title: '항목 12', data: '데이터 12' }
    ],
    collapsedItemCount: 4,
    expanded: false
  }
};

// Custom Toggle Text
export const CustomToggleText: Story = {
  args: {
    variant: 'accordion',
    showHeader: true,
    title: '커스텀 토글 텍스트',
    subtitle: '토글 버튼의 텍스트를 변경할 수 있습니다',
    items: [
      { title: '기본 정보', data: '표시됨' },
      { title: '추가 정보 1', data: '숨겨짐' },
      { title: '추가 정보 2', data: '숨겨짐' },
      { title: '추가 정보 3', data: '숨겨짐' }
    ],
    collapsedItemCount: 1,
    expanded: false,
    expandText: '자세히 보기',
    collapseText: '간단히 보기'
  }
};

// Figma Instance - Collapsed (9801:92658)
export const FigmaInstanceCollapsed: Story = {
  args: {
    variant: 'accordion',
    showHeader: false,
    showList: true,
    items: [
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' }
    ],
    collapsedItemCount: 6,
    expanded: false,
    expandText: '펼치기',
    collapseText: '접기',
    showToggleButton: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인에서 추출한 collapsed 상태의 accordion 인스턴스 (9801:92658)'
      }
    }
  }
};

// Figma Instance - Expanded (9801:92659)
export const FigmaInstanceExpanded: Story = {
  args: {
    variant: 'accordion',
    showHeader: false,
    showList: true,
    items: Array.from({length: 24}, (_, i) => ({ 
      title: '타이틀', 
      data: '데이터' 
    })),
    collapsedItemCount: 6,
    expanded: true,
    expandText: '펼치기',
    collapseText: '접기',
    showToggleButton: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인에서 추출한 expanded 상태의 accordion 인스턴스 (9801:92659) - 24개 항목'
      }
    }
  }
};