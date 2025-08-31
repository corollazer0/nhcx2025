import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Accordion from './Accordion.vue';

// AccordionItem 타입 정의 (컴포넌트와 동일)
interface AccordionItem {
  title?: string;
  data?: string;
  type?: 'basic' | 'bullet' | 'link';
}

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Accordion 컴포넌트는 콘텐츠를 접고 펼칠 수 있는 UI 요소입니다.

**주요 특징:**
- **상태**: open/close 상태로 콘텐츠 표시/숨김 제어
- **타입**: 1line부터 5line까지 표시할 아이템 수 조절
- **구분선**: divider prop으로 상단 구분선 표시 제어
- **접근성**: ARIA 속성, 키보드 내비게이션 지원
- **애니메이션**: 부드러운 확장/축소 및 화살표 회전 효과
- **커스텀 콘텐츠**: items prop으로 동적 콘텐츠 설정

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '아코디언 헤더에 표시될 제목입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'알아두세요'" },
      },
    },
    divider: {
      control: 'boolean',
      description: '아코디언 상단에 구분선 표시 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['open', 'close'],
      description: '아코디언의 초기 상태를 설정합니다.',
      table: {
        type: { summary: "'open' | 'close'" },
        defaultValue: { summary: "'close'" },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['1line', '2line', '3line', '4line', '5line'],
      description: '표시할 아이템의 수를 설정합니다.',
      table: {
        type: { summary: "'1line' | '2line' | '3line' | '4line' | '5line'" },
        defaultValue: { summary: "'5line'" },
      },
    },
    items: {
      control: 'object',
      description: '아코디언 콘텐츠에 표시할 아이템 목록입니다. type 속성으로 "basic", "bullet", "link" 타입을 지정할 수 있습니다.',
      table: {
        type: { summary: 'AccordionItem[]' },
        defaultValue: { summary: '기본 5개 아이템 (다양한 타입)' },
      },
    },
    ariaLabel: {
      control: 'text',
      description: '아코디언의 접근성 레이블입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'알아두세요 아코디언'" },
      },
    },
    defaultItemTitle: {
      control: 'text',
      description: '아이템에 title이 없을 때 표시할 기본 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'내용을 입력해 주세요'" },
      },
    },
    onToggle: {
      description: '아코디언 토글 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
      },
    },
    onOpen: {
      description: '아코디언이 열릴 때 발생하는 이벤트입니다.',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClose: {
      description: '아코디언이 닫힐 때 발생하는 이벤트입니다.',
      table: {
        type: { summary: '() => void' },
      },
    },
    onDownload: {
      description: '아이템의 다운로드 버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(index: number, item: AccordionItem) => void' },
      },
    },
    onNavigate: {
      description: '아이템의 더보기 버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(index: number, item: AccordionItem) => void' },
      },
    },
  },
  args: {
    onToggle: fn(),
    onOpen: fn(),
    onClose: fn(),
    onDownload: fn(),
    onNavigate: fn(),
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    title: '알아두세요',
    divider: true,
    state: 'close',
    type: '5line',
    items: [
      { title: '다운로드 및 더보기가 가능한 링크 타입입니다', type: 'link' } as AccordionItem,
      { title: '단순 텍스트만 표시하는 기본 타입입니다', type: 'basic' } as AccordionItem,
      { title: '불릿 포인트가 있는 리스트 타입입니다', type: 'bullet' } as AccordionItem,
      { title: '또 다른 링크 타입 아이템입니다', type: 'link' } as AccordionItem,
      { title: '기본 타입 아이템입니다', type: 'basic' } as AccordionItem
    ],
    ariaLabel: '알아두세요 아코디언',
    defaultItemTitle: '내용을 입력해 주세요',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 Accordion의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 Accordion 컴포넌트입니다. 닫힌 상태로 시작하며, 클릭하여 열고 닫을 수 있습니다.',
      },
    },
  },
};

// 상태별 예시
export const States: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">닫힌 상태</h4>
          <Accordion state="close" title="닫힌 아코디언" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">열린 상태</h4>
          <Accordion state="open" title="열린 아코디언" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '아코디언의 닫힌 상태와 열린 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// 타입별 예시
export const Types: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; width: 800px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">1줄 타입</h4>
          <Accordion state="open" type="1line" title="1줄 아코디언" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">2줄 타입</h4>
          <Accordion state="open" type="2line" title="2줄 아코디언" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">3줄 타입</h4>
          <Accordion state="open" type="3line" title="3줄 아코디언" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">4줄 타입</h4>
          <Accordion state="open" type="4line" title="4줄 아코디언" />
        </div>
        <div style="grid-column: span 2;">
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">5줄 타입 (기본)</h4>
          <Accordion state="open" type="5line" title="5줄 아코디언" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '각 타입별로 표시되는 아이템의 수를 확인할 수 있습니다.',
      },
    },
  },
};

// 구분선 옵션
export const DividerOptions: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">구분선 있음 (기본)</h4>
          <Accordion :divider="true" title="구분선이 있는 아코디언" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">구분선 없음</h4>
          <Accordion :divider="false" title="구분선이 없는 아코디언" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '구분선 표시 여부에 따른 차이를 확인할 수 있습니다.',
      },
    },
  },
};

// 커스텀 콘텐츠
export const CustomContent: Story = {
  args: {
    state: 'open',
    title: '자주 묻는 질문',
    items: [
      { title: '회원가입은 어떻게 하나요?' },
      { title: '비밀번호를 잊어버렸어요' },
      { title: '주문 취소는 언제까지 가능한가요?' },
      { title: '배송은 얼마나 걸리나요?' },
      { title: '환불 규정이 궁금해요' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 아이템들을 사용한 FAQ 예시입니다.',
      },
    },
  },
};

// 실제 사용 사례들
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; width: 500px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">공지사항</h4>
          <Accordion 
            title="중요 공지사항" 
            :items="[
              { title: '시스템 점검 안내 (2024.12.25)' },
              { title: '서비스 이용약관 개정 안내' },
              { title: '개인정보처리방침 변경사항' }
            ]"
            type="3line"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">고객 지원</h4>
          <Accordion 
            title="도움이 필요하신가요?" 
            :items="[
              { title: '1:1 문의하기' },
              { title: '전화 상담 신청' },
              { title: '원격 지원 요청' },
              { title: '사용 가이드 다운로드' }
            ]"
            type="4line"
            ariaLabel="고객 지원 아코디언"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">약관 및 정책</h4>
          <Accordion 
            title="이용약관 및 정책" 
            :items="[
              { title: '서비스 이용약관' },
              { title: '개인정보처리방침' }
            ]"
            type="2line"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '실제 서비스에서 사용되는 다양한 Accordion 예시들입니다.',
      },
    },
  },
};

// 긴 제목과 콘텐츠
export const LongContent: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 600px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; color: #666;">긴 제목</h4>
          <Accordion 
            title="매우 긴 제목의 아코디언입니다 - 텍스트가 길어질 때의 처리를 확인해보세요"
            state="open"
            type="2line"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; color: #666;">긴 아이템 제목들</h4>
          <Accordion 
            title="긴 콘텐츠 예시"
            state="open"
            :items="[
              { title: '이것은 매우 긴 아이템 제목입니다. 텍스트가 얼마나 길어질 수 있는지 테스트해보겠습니다.' },
              { title: 'Another very long item title to test how the component handles extensive text content in multiple scenarios.' },
              { title: '한글과 English가 혼합된 매우 긴 제목입니다 - Mixed language content test case' }
            ]"
            type="3line"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '긴 제목과 콘텐츠가 포함된 경우의 Accordion 렌더링을 확인할 수 있습니다.',
      },
    },
  },
};

// 아이템 타입별 예시
export const ItemTypes: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; color: #666;">Link Type (기본)</h4>
          <Accordion 
            title="링크 타입 아이템들"
            state="open"
            :items="[
              { title: '파일을 다운로드하거나 상세보기가 가능합니다', type: 'link' },
              { title: '각 아이템에 액션 버튼이 표시됩니다', type: 'link' },
              { title: '클릭하여 다운로드하거나 페이지로 이동할 수 있습니다', type: 'link' }
            ]"
            type="3line"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; color: #666;">Basic Type</h4>
          <Accordion 
            title="기본 타입 아이템들"
            state="open"
            :items="[
              { title: '단순한 텍스트 정보만 표시됩니다', type: 'basic' },
              { title: '별도의 액션 버튼이 없는 순수 정보성 콘텐츠입니다', type: 'basic' },
              { title: '공지사항이나 안내문구에 적합합니다', type: 'basic' }
            ]"
            type="3line"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; color: #666;">Bullet Type</h4>
          <Accordion 
            title="불릿 타입 아이템들"
            state="open"
            :items="[
              { title: '불릿 포인트가 앞에 표시되는 리스트 형태입니다', type: 'bullet' },
              { title: '체크리스트나 단계별 안내에 적합합니다', type: 'bullet' },
              { title: '회색 텍스트로 보조 정보를 나타냅니다', type: 'bullet' }
            ]"
            type="3line"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; color: #666;">Mixed Types</h4>
          <Accordion 
            title="혼합 타입 예시"
            state="open"
            :items="[
              { title: '중요 공지사항입니다', type: 'basic' },
              { title: '필수 확인 항목', type: 'bullet' },
              { title: '상세 자료는 여기서 다운로드하세요', type: 'link' },
              { title: '추가 안내사항', type: 'bullet' },
              { title: '관련 문서 다운로드', type: 'link' }
            ]"
            type="5line"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '아이템 타입별로 다른 렌더링을 확인할 수 있습니다. link(액션 버튼), basic(단순 텍스트), bullet(불릿 포인트) 타입을 지원합니다.',
      },
    },
  },
};

// 접근성 예시
export const AccessibilityExample: Story = {
  args: {
    title: '접근성 테스트',
    ariaLabel: '접근성을 위한 상세한 설명이 포함된 아코디언',
    state: 'open',
    items: [
      { title: '스크린 리더 호환성 확인', type: 'basic' } as AccordionItem,
      { title: '키보드 내비게이션 테스트', type: 'bullet' } as AccordionItem,
      { title: 'ARIA 속성 적용 상태', type: 'link' } as AccordionItem
    ],
    type: '3line'
  },
  parameters: {
    docs: {
      description: {
        story: '접근성이 강화된 Accordion입니다. Tab 키로 포커스하고 Enter/Space로 토글할 수 있습니다.',
      },
    },
  },
};

// 개별 상태 Stories
export const ClosedState: Story = {
  args: {
    state: 'close',
    title: '닫힌 아코디언',
  },
  parameters: {
    docs: {
      description: {
        story: '닫힌 상태의 아코디언입니다. 클릭하면 열립니다.',
      },
    },
  },
};

export const OpenState: Story = {
  args: {
    state: 'open',
    title: '열린 아코디언',
  },
  parameters: {
    docs: {
      description: {
        story: '열린 상태의 아코디언입니다. 콘텐츠가 표시됩니다.',
      },
    },
  },
};

// 개별 타입 Stories
export const OneLine: Story = {
  args: {
    state: 'open',
    type: '1line',
    title: '1줄 아코디언',
  },
  parameters: {
    docs: {
      description: {
        story: '1개의 아이템만 표시하는 아코디언입니다.',
      },
    },
  },
};

export const TwoLine: Story = {
  args: {
    state: 'open',
    type: '2line',
    title: '2줄 아코디언',
  },
  parameters: {
    docs: {
      description: {
        story: '2개의 아이템을 표시하는 아코디언입니다.',
      },
    },
  },
};

export const ThreeLine: Story = {
  args: {
    state: 'open',
    type: '3line',
    title: '3줄 아코디언',
  },
  parameters: {
    docs: {
      description: {
        story: '3개의 아이템을 표시하는 아코디언입니다.',
      },
    },
  },
};

export const FourLine: Story = {
  args: {
    state: 'open',
    type: '4line',
    title: '4줄 아코디언',
  },
  parameters: {
    docs: {
      description: {
        story: '4개의 아이템을 표시하는 아코디언입니다.',
      },
    },
  },
};

export const FiveLine: Story = {
  args: {
    state: 'open',
    type: '5line',
    title: '5줄 아코디언 (기본)',
  },
  parameters: {
    docs: {
      description: {
        story: '5개의 아이템을 표시하는 기본 아코디언입니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 500px;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">빈 제목</h4>
          <Accordion title="" state="open" type="2line" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">빈 아이템 배열</h4>
          <Accordion title="빈 콘텐츠" state="open" :items="[]" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">특수문자 제목</h4>
          <Accordion title="특수문자 & 기호 < > &quot; &apos; 100%" state="open" type="1line" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">이모지 포함</h4>
          <Accordion title="📋 체크리스트" state="open" :items="[
            { title: '✅ 완료된 작업' },
            { title: '⏳ 진행 중인 작업' },
            { title: '❌ 실패한 작업' }
          ]" type="3line" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">다국어 콘텐츠</h4>
          <Accordion title="多言語 Content" state="open" :items="[
            { title: 'English Content' },
            { title: '한국어 콘텐츠' },
            { title: '日本語コンテンツ' }
          ]" type="3line" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 Accordion 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Test
export const InteractiveTest: Story = {
  args: {
    title: '상호작용 테스트',
    state: 'close',
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const header = canvas.getByRole('button');
    // await userEvent.click(header);
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다. Actions 탭에서 이벤트를 확인할 수 있습니다.',
      },
    },
  },
};

// Figma Design System
export const FigmaDesignSystem: Story = {
  render: () => ({
    components: { Accordion },
    template: `
      <div style="width: 100%; max-width: 1000px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma Design System - Accordion Components
        </h3>
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <div>
            <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">기본 구성</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 12px; background: #f8f9fa; font-size: 12px; font-weight: 600; color: #666; text-align: center;">닫힌 상태</div>
                <div style="padding: 16px;">
                  <Accordion title="기본 아코디언" state="close" />
                </div>
              </div>
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 12px; background: #f8f9fa; font-size: 12px; font-weight: 600; color: #666; text-align: center;">열린 상태</div>
                <div style="padding: 16px;">
                  <Accordion title="확장된 아코디언" state="open" type="3line" />
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">타입별 변형</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 8px; background: #f8f9fa; font-size: 11px; font-weight: 600; color: #666; text-align: center;">1줄</div>
                <div style="padding: 12px;">
                  <Accordion title="간단한 정보" state="open" type="1line" />
                </div>
              </div>
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 8px; background: #f8f9fa; font-size: 11px; font-weight: 600; color: #666; text-align: center;">3줄</div>
                <div style="padding: 12px;">
                  <Accordion title="보통 정보" state="open" type="3line" />
                </div>
              </div>
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 8px; background: #f8f9fa; font-size: 11px; font-weight: 600; color: #666; text-align: center;">5줄</div>
                <div style="padding: 12px;">
                  <Accordion title="상세 정보" state="open" type="5line" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">사용 시나리오</h4>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              <Accordion title="📢 공지사항" :items="[
                { title: '시스템 점검 안내' },
                { title: '서비스 업데이트 내용' },
                { title: '이용약관 개정 사항' }
              ]" type="3line" />
              <Accordion title="❓ 자주 묻는 질문" :items="[
                { title: '회원가입 방법은?' },
                { title: '비밀번호 재설정' },
                { title: '결제 관련 문의' },
                { title: '환불 정책 안내' },
                { title: '배송 관련 정보' }
              ]" type="5line" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Figma 디자인 시스템의 모든 Accordion 변형을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};