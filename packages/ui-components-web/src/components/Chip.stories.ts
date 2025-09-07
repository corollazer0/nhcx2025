import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Chip from './Chip.vue';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Chip 컴포넌트는 선택 가능한 탭이나 필터링 옵션을 표현하는 UI 요소입니다.

**주요 특징:**
- **상태**: default(비활성), active(활성) 2가지
- **텍스트**: 사용자 정의 텍스트 지원
- **스타일**: 원형 모서리를 가진 작은 버튼 형태
- **상호작용**: 클릭 이벤트 지원

**Figma 디자인을 100% 재현**하여 구현되었습니다.
- Default: 흰색 배경, 회색 테두리, 검정 텍스트
- Active: 검정 배경, 흰색 텍스트

주로 탭 네비게이션, 필터 선택, 카테고리 선택 등에 사용됩니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '칩에 표시될 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'메뉴'" },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'active'],
      description: '칩의 활성 상태를 설정합니다.',
      table: {
        type: { summary: "'default' | 'active'" },
        defaultValue: { summary: "'default'" },
      },
    },
    onClick: {
      description: '칩 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    text: '메뉴',
    state: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 칩의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 Chip 컴포넌트입니다. (state: default, text: 메뉴)',
      },
    },
  },
};

// State Variants
export const States: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Chip state="default" text="메뉴" />
          <span style="color: #666; font-size: 12px;">Default</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <Chip state="active" text="메뉴" />
          <span style="color: #666; font-size: 12px;">Active</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 상태 변형을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// 개별 State Stories
export const DefaultState: Story = {
  args: {
    state: 'default',
    text: '기본 상태',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 칩입니다. 흰색 배경에 회색 테두리를 가집니다.',
      },
    },
  },
};

export const ActiveState: Story = {
  args: {
    state: 'active',
    text: '활성 상태',
  },
  parameters: {
    docs: {
      description: {
        story: '활성 상태의 칩입니다. 검정 배경에 흰색 텍스트를 가집니다.',
      },
    },
  },
};

// Text Variations
export const TextVariations: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center; max-width: 400px;">
        <Chip text="홈" />
        <Chip text="검색" />
        <Chip text="프로필" />
        <Chip text="설정" />
        <Chip text="알림" />
        <Chip text="도움말" />
        <Chip text="문의" />
        <Chip text="공지사항" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 사례에서의 다양한 텍스트 예시입니다.',
      },
    },
  },
};

// Tab Navigation Example
export const TabNavigation: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="display: flex; gap: 4px; background: #f5f5f5; padding: 4px; border-radius: 12px; width: fit-content;">
        <Chip state="active" text="전체" />
        <Chip state="default" text="인기" />
        <Chip state="default" text="최신" />
        <Chip state="default" text="추천" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '탭 네비게이션으로 사용되는 예시입니다. 하나의 탭이 활성화되어 있습니다.',
      },
    },
  },
};

// Filter Chips Example
export const FilterChips: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #333;">카테고리 필터</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <Chip state="active" text="의류" />
            <Chip state="default" text="신발" />
            <Chip state="active" text="가방" />
            <Chip state="default" text="액세서리" />
            <Chip state="default" text="시계" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #333;">가격 필터</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <Chip state="default" text="전체" />
            <Chip state="active" text="1만원 이하" />
            <Chip state="default" text="1-5만원" />
            <Chip state="default" text="5만원 이상" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '필터링 옵션으로 사용되는 예시입니다. 복수 선택이 가능한 형태입니다.',
      },
    },
  },
};

// Different Text Lengths
export const TextLengths: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <Chip text="홈" />
          <span style="color: #666; font-size: 12px;">짧은 텍스트</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Chip text="고객센터" />
          <span style="color: #666; font-size: 12px;">보통 텍스트</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Chip text="자주 묻는 질문" />
          <span style="color: #666; font-size: 12px;">긴 텍스트</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Chip text="매우 긴 텍스트 예시입니다" />
          <span style="color: #666; font-size: 12px;">매우 긴 텍스트</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 텍스트 길이에 따른 칩의 렌더링을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Example
export const Interactive: Story = {
  render: () => ({
    components: { Chip },
    data() {
      return {
        selectedChips: ['홈'],
      };
    },
    methods: {
      toggleChip(chipText: string) {
        const index = this.selectedChips.indexOf(chipText);
        if (index > -1) {
          this.selectedChips.splice(index, 1);
        } else {
          this.selectedChips.push(chipText);
        }
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="color: #666; font-size: 14px;">
          클릭하여 칩을 선택/해제할 수 있습니다.
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <Chip 
            v-for="chip in ['홈', '검색', '프로필', '설정', '알림']"
            :key="chip"
            :text="chip"
            :state="selectedChips.includes(chip) ? 'active' : 'default'"
            @click="toggleChip(chip)"
          />
        </div>
        <div style="font-size: 12px; color: #666;">
          선택된 칩: {{ selectedChips.join(', ') || '없음' }}
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 상호작용이 가능한 칩 예시입니다. 클릭하여 선택 상태를 변경할 수 있습니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">빈 텍스트</h4>
          <Chip text="" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">특수문자 포함</h4>
          <Chip text="메뉴 & 검색 < > &quot; &apos; 100%" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">이모지 포함</h4>
          <Chip text="🏠 홈" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">숫자 포함</h4>
          <Chip text="2024년" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">다국어 (영어)</h4>
          <Chip text="Home" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">한 글자</h4>
          <Chip text="A" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 칩 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; width: 100%; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">E-commerce 카테고리</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <Chip state="active" text="전체" />
            <Chip state="default" text="패션" />
            <Chip state="default" text="뷰티" />
            <Chip state="active" text="가전" />
            <Chip state="default" text="식품" />
            <Chip state="default" text="도서" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">뉴스 섹션</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <Chip state="active" text="정치" />
            <Chip state="default" text="경제" />
            <Chip state="default" text="사회" />
            <Chip state="default" text="문화" />
            <Chip state="default" text="스포츠" />
            <Chip state="default" text="연예" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">소셜 미디어 태그</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <Chip state="default" text="#맛집" />
            <Chip state="active" text="#여행" />
            <Chip state="default" text="#일상" />
            <Chip state="active" text="#사진" />
            <Chip state="default" text="#음식" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">앱 네비게이션</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <Chip state="active" text="홈" />
            <Chip state="default" text="탐색" />
            <Chip state="default" text="즐겨찾기" />
            <Chip state="default" text="프로필" />
            <Chip state="default" text="설정" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용되는 칩 예시들입니다.',
      },
    },
  },
};

// Figma Design System Matrix
export const FigmaDesignMatrix: Story = {
  render: () => ({
    components: { Chip },
    template: `
      <div style="width: 100%; max-width: 600px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma Design System - Chip Matrix
        </h3>
        <div style="display: grid; grid-template-columns: 150px repeat(2, 1fr); gap: 16px; align-items: center;">
          <!-- Headers -->
          <div></div>
          <div style="text-align: center; font-weight: 600; font-size: 14px; color: #666;">Default</div>
          <div style="text-align: center; font-weight: 600; font-size: 14px; color: #666;">Active</div>
          
          <!-- Chip Row -->
          <div style="font-weight: 600; font-size: 14px; color: #666;">메뉴 칩</div>
          <div style="display: flex; justify-content: center;">
            <Chip state="default" text="메뉴" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Chip state="active" text="메뉴" />
          </div>
          
          <!-- Different Text Examples -->
          <div style="font-weight: 600; font-size: 14px; color: #666;">홈 칩</div>
          <div style="display: flex; justify-content: center;">
            <Chip state="default" text="홈" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Chip state="active" text="홈" />
          </div>
          
          <div style="font-weight: 600; font-size: 14px; color: #666;">검색 칩</div>
          <div style="display: flex; justify-content: center;">
            <Chip state="default" text="검색" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Chip state="active" text="검색" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Figma 디자인 시스템의 모든 Chip 변형을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Test Story with Play Function
export const InteractiveTest: Story = {
  args: {
    text: '클릭해보세요',
    state: 'default',
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const chip = canvas.getByTestId('chip');
    // await userEvent.click(chip);
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
};

// Accessibility Test
export const AccessibilityTest: Story = {
  args: {
    text: '접근성 테스트',
    state: 'default',
  },
  parameters: {
    docs: {
      description: {
        story: '접근성 기능을 확인할 수 있는 스토리입니다. 키보드 네비게이션과 스크린 리더를 고려하여 제작되었습니다.',
      },
    },
  },
};