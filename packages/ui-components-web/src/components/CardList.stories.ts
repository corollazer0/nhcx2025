import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import CardList from './CardList.vue';

interface CardListItem {
  title: string;
  data?: string;
  label?: string;
}

const meta = {
  title: 'Components/CardList',
  component: CardList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
CardList 컴포넌트는 카드 형태로 정보를 나열하는 리스트 컴포넌트입니다.

**주요 특징:**
- **크기**: lg, sm, xs (3가지)
- **아이템 구조**: title(필수), data 또는 label(선택)
- **상호작용**: 각 아이템 클릭 시 이벤트 발생
- **레이아웃**: 좌측 타이틀(108px 고정), 우측 데이터(유동적)

**Figma 디자인을 100% 재현**하여 구현되었습니다.

**사용법:**
- lg: 대형 리스트 (타이틀 15px, 데이터 22px/SemiBold)
- sm: 중형 리스트 (타이틀 15px, 데이터 15px/Medium)
- xs: 소형 리스트 (타이틀 14px, 데이터 14px/Regular)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '카드리스트에 표시할 아이템들입니다. title은 필수, data 또는 label 중 하나 선택.',
      table: {
        type: { summary: 'CardListItem[]' },
        defaultValue: { summary: '[{ title: "타이틀", data: "데이터" }, ...]' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'sm', 'xs'],
      description: '카드리스트의 크기를 설정합니다.',
      table: {
        type: { summary: "'lg' | 'sm' | 'xs'" },
        defaultValue: { summary: "'lg'" },
      },
    },
    onItemClick: {
      action: 'itemClick',
      description: '아이템 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(item: CardListItem, index: number) => void' },
      },
    },
  },
  args: {
    onItemClick: fn(),
  },
} satisfies Meta<typeof CardList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리들
export const Playground: Story = {
  args: {
    size: 'lg',
    items: [
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' },
      { title: '타이틀', data: '데이터' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다.'
      }
    }
  }
};

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '기본 설정의 CardList입니다. lg 크기로 3개의 기본 아이템을 표시합니다.'
      }
    }
  }
};

// 크기별 스토리들
export const Large: Story = {
  args: {
    size: 'lg',
    items: [
      { title: '계좌번호', data: '123-456-789012' },
      { title: '잔액', data: '1,234,567원' },
      { title: '최종거래일', data: '2024.01.15' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Large 크기의 CardList입니다. 타이틀은 15px Regular, 데이터는 22px SemiBold로 표시됩니다.'
      }
    }
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    items: [
      { title: '상품명', data: '주택청약종합저축' },
      { title: '납입회차', data: '24회차' },
      { title: '월납입액', data: '50,000원' },
      { title: '상태', label: '정상' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Small 크기의 CardList입니다. 타이틀은 15px Regular, 데이터는 15px Medium으로 표시됩니다.'
      }
    }
  }
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    items: [
      { title: '신청일자', data: '2024.01.15' },
      { title: '처리상태', label: '접수완료' },
      { title: '담당자', data: '홍길동' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra Small 크기의 CardList입니다. 타이틀과 데이터 모두 14px Regular로 표시됩니다.'
      }
    }
  }
};

// 데이터 타입별 스토리들
export const WithDataOnly: Story = {
  args: {
    size: 'lg',
    items: [
      { title: '예금주명', data: '홍길동' },
      { title: '계좌번호', data: '110-123-456789' },
      { title: '개설일', data: '2020.03.15' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'data만 있는 아이템들로 구성된 CardList입니다.'
      }
    }
  }
};

export const WithLabelsOnly: Story = {
  args: {
    size: 'sm',
    items: [
      { title: '대출상태', label: '정상' },
      { title: '연체여부', label: '없음' },
      { title: '결제방식', label: '자동이체' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'label만 있는 아이템들로 구성된 CardList입니다. label은 회색 테두리의 태그로 표시됩니다.'
      }
    }
  }
};

export const Mixed: Story = {
  args: {
    size: 'lg',
    items: [
      { title: '상품명', data: 'NH올원통장' },
      { title: '계좌상태', label: '정상' },
      { title: '잔액', data: '1,234,567원' },
      { title: '등급', label: 'VIP' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'data와 label이 혼합된 아이템들로 구성된 CardList입니다.'
      }
    }
  }
};

// Edge Cases
export const EmptyList: Story = {
  args: {
    size: 'lg',
    items: []
  },
  parameters: {
    docs: {
      description: {
        story: '빈 아이템 배열로 설정된 CardList입니다. 아무것도 렌더링되지 않습니다.'
      }
    }
  }
};

export const SingleItem: Story = {
  args: {
    size: 'lg',
    items: [
      { title: '단일 아이템', data: '테스트 데이터' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '단일 아이템만 있는 CardList입니다.'
      }
    }
  }
};

export const LongText: Story = {
  args: {
    size: 'lg',
    items: [
      { title: '매우 긴 타이틀 텍스트가 있는 경우', data: '매우 긴 데이터 텍스트가 있는 경우에도 올바르게 표시되는지 확인' },
      { title: '일반 타이틀', data: '일반 데이터' },
      { title: '짧은제목', label: '매우 긴 라벨 텍스트' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 아이템들로 구성된 CardList입니다.'
      }
    }
  }
};

export const SpecialCharacters: Story = {
  args: {
    size: 'sm',
    items: [
      { title: '특수문자 !@#$%', data: '특수문자 &*()_+' },
      { title: 'HTML <태그>', data: '인코딩 "테스트"' },
      { title: '숫자 12345', data: '67890' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '특수문자와 HTML 태그가 포함된 텍스트로 구성된 CardList입니다.'
      }
    }
  }
};

// Interactive 테스트
export const Interactive: Story = {
  args: {
    size: 'lg',
    items: [
      { title: '클릭 가능한 아이템 1', data: '데이터 1' },
      { title: '클릭 가능한 아이템 2', data: '데이터 2' },
      { title: '클릭 가능한 아이템 3', label: '라벨' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 상호작용을 테스트할 수 있는 CardList입니다. 각 아이템을 클릭해보세요.'
      }
    }
  },
  play: async ({ canvasElement, args }) => {
    // Storybook interaction testing을 위한 play 함수
    // 실제 사용 시에는 @storybook/test 패키지와 함께 사용
  }
};

// 실제 사용 사례들
export const BankAccount: Story = {
  args: {
    size: 'lg',
    items: [
      { title: '예금주', data: '홍길동' },
      { title: '계좌번호', data: '110-123-456789' },
      { title: '잔액', data: '1,234,567원' },
      { title: '계좌상태', label: '정상' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '은행 계좌 정보를 표시하는 실제 사용 사례입니다.'
      }
    }
  }
};

export const LoanInfo: Story = {
  args: {
    size: 'sm',
    items: [
      { title: '대출상품', data: '주택담보대출' },
      { title: '대출금액', data: '200,000,000원' },
      { title: '대출잔액', data: '180,000,000원' },
      { title: '대출상태', label: '정상' },
      { title: '금리', data: '3.5%' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '대출 정보를 표시하는 실제 사용 사례입니다.'
      }
    }
  }
};

export const ApplicationStatus: Story = {
  args: {
    size: 'xs',
    items: [
      { title: '신청번호', data: 'APP-2024-0001' },
      { title: '신청일자', data: '2024.01.15' },
      { title: '처리상태', label: '심사중' },
      { title: '담당지점', data: '강남지점' },
      { title: '연락처', data: '02-1234-5678' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '신청서 상태 정보를 표시하는 실제 사용 사례입니다.'
      }
    }
  }
};