import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Navigation from './Navigation.vue';

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Navigation 컴포넌트는 앱의 상단 네비게이션 바입니다.

**주요 특징:**
- **이전 버튼**: previous prop으로 제어, 클릭 시 previous 이벤트 emit
- **제목 영역**: title, title1 props로 제어
- **고객센터 아이콘**: cs prop으로 제어, 클릭 시 cs 이벤트 emit  
- **취소 버튼**: cancel prop으로 제어, 클릭 시 cancel 이벤트 emit
- **접근성**: 키보드 내비게이션, ARIA labels, role 속성 지원
- **이벤트**: 마우스 클릭과 키보드(Enter, Space) 이벤트 지원

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    previous: {
      control: 'boolean',
      description: '이전 버튼 표시 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    title: {
      control: 'boolean',
      description: '제목 영역 표시 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    title1: {
      control: 'text',
      description: '네비게이션 제목 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'서비스 타이틀'" },
      },
    },
    cs: {
      control: 'boolean',
      description: '고객센터 아이콘 표시 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    cancel: {
      control: 'boolean',
      description: '취소 버튼 표시 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    previousAriaLabel: {
      control: 'text',
      description: '이전 버튼의 접근성 레이블입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'이전 페이지로 이동'" },
      },
    },
    csAriaLabel: {
      control: 'text',
      description: '고객센터 버튼의 접근성 레이블입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'고객센터'" },
      },
    },
    cancelAriaLabel: {
      control: 'text',
      description: '취소 버튼의 접근성 레이블입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'취소'" },
      },
    },
    onPrevious: {
      description: '이전 버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent | KeyboardEvent) => void' },
      },
    },
    onCs: {
      description: '고객센터 버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent | KeyboardEvent) => void' },
      },
    },
    onCancel: {
      description: '취소 버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent | KeyboardEvent) => void' },
      },
    },
  },
  args: {
    onPrevious: fn(),
    onCs: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    previous: true,
    title: true,
    title1: '서비스 타이틀',
    cs: true,
    cancel: true,
    previousAriaLabel: '이전 페이지로 이동',
    csAriaLabel: '고객센터',
    cancelAriaLabel: '취소',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 Navigation의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 Navigation 컴포넌트입니다. 모든 요소가 활성화되어 있습니다.',
      },
    },
  },
};

// 제목 변형들
export const TitleVariations: Story = {
  render: () => ({
    components: { Navigation },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 375px;">
        <Navigation title1="주문 확인" />
        <Navigation title1="결제 페이지" />
        <Navigation title1="마이페이지" />
        <Navigation title1="상품 상세" />
        <Navigation title1="장바구니" />
        <Navigation title1="로그인" />
        <Navigation title1="회원가입" />
        <Navigation title1="고객센터" />
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '다양한 페이지에서 사용되는 제목 예시들입니다.',
      },
    },
  },
};

// 요소별 활성화 상태
export const ElementStates: Story = {
  render: () => ({
    components: { Navigation },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 375px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">모든 요소 활성화</h4>
          <Navigation 
            title1="전체 네비게이션"
            :previous="true" 
            :title="true" 
            :cs="true" 
            :cancel="true" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">이전 버튼 없음</h4>
          <Navigation 
            title1="홈 화면"
            :previous="false" 
            :title="true" 
            :cs="true" 
            :cancel="true" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">제목 없음</h4>
          <Navigation 
            :previous="true" 
            :title="false" 
            :cs="true" 
            :cancel="true" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">고객센터 없음</h4>
          <Navigation 
            title1="단순 페이지"
            :previous="true" 
            :title="true" 
            :cs="false" 
            :cancel="true" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">취소 버튼 없음</h4>
          <Navigation 
            title1="일반 페이지"
            :previous="true" 
            :title="true" 
            :cs="true" 
            :cancel="false" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">제목만 있음</h4>
          <Navigation 
            title1="미니멀 네비게이션"
            :previous="false" 
            :title="true" 
            :cs="false" 
            :cancel="false" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">모든 요소 비활성화</h4>
          <Navigation 
            :previous="false" 
            :title="false" 
            :cs="false" 
            :cancel="false" 
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '각 요소별 활성화/비활성화 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// 실제 사용 사례들
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Navigation },
    template: `
      <div style="display: grid; grid-template-columns: 1fr; gap: 32px; width: 375px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">E-commerce 페이지들</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Navigation title1="상품 목록" />
            <Navigation title1="상품 상세정보" />
            <Navigation title1="장바구니" />
            <Navigation title1="주문서 작성" />
            <Navigation title1="결제 완료" :cs="false" />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">사용자 계정</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Navigation title1="로그인" :cancel="false" />
            <Navigation title1="회원가입" />
            <Navigation title1="비밀번호 찾기" />
            <Navigation title1="프로필 수정" />
            <Navigation title1="설정" />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #333;">서비스 페이지</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Navigation title1="공지사항" :cancel="false" />
            <Navigation title1="자주 묻는 질문" :cancel="false" />
            <Navigation title1="문의하기" />
            <Navigation title1="이벤트" :cancel="false" />
            <Navigation title1="리뷰 작성" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용되는 Navigation 예시들입니다.',
      },
    },
  },
};

// 긴 제목 처리
export const LongTitles: Story = {
  render: () => ({
    components: { Navigation },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 375px;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">일반 제목</h4>
          <Navigation title1="상품 상세정보" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">긴 제목</h4>
          <Navigation title1="2024년 신상품 특가 이벤트 상품 목록" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">매우 긴 제목</h4>
          <Navigation title1="매우 매우 긴 제목이 들어갔을 때 어떻게 표시되는지 확인하는 테스트용 텍스트입니다" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">영어 제목</h4>
          <Navigation title1="Product Detail Information Page" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">이모지 포함</h4>
          <Navigation title1="🛒 쇼핑몰 메인 페이지" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '다양한 길이와 형태의 제목 처리를 확인할 수 있습니다. 긴 제목은 ellipsis로 처리됩니다.',
      },
    },
  },
};

// 접근성 테스트
export const AccessibilityExample: Story = {
  args: {
    title1: '접근성 테스트',
    previousAriaLabel: '이전 단계로 돌아가기',
    csAriaLabel: '고객 지원센터 문의',
    cancelAriaLabel: '작업 취소하기',
  },
  parameters: {
    docs: {
      description: {
        story: '커스텀 ARIA 레이블을 적용한 접근성 개선 예시입니다. 키보드 탭으로 탐색하고 Enter/Space로 실행할 수 있습니다.',
      },
    },
  },
};

// 개별 버튼 Stories
export const PreviousOnly: Story = {
  args: {
    title1: '이전 버튼만',
    previous: true,
    title: true,
    cs: false,
    cancel: false,
  },
  parameters: {
    docs: {
      description: {
        story: '이전 버튼과 제목만 있는 미니멀한 네비게이션입니다.',
      },
    },
  },
};

export const TitleOnly: Story = {
  args: {
    title1: '제목만 표시',
    previous: false,
    title: true,
    cs: false,
    cancel: false,
  },
  parameters: {
    docs: {
      description: {
        story: '제목만 있는 가장 단순한 형태의 네비게이션입니다.',
      },
    },
  },
};

export const WithCsOnly: Story = {
  args: {
    title1: '고객센터 포함',
    previous: false,
    title: true,
    cs: true,
    cancel: false,
  },
  parameters: {
    docs: {
      description: {
        story: '제목과 고객센터 버튼만 있는 네비게이션입니다.',
      },
    },
  },
};

export const WithCancelOnly: Story = {
  args: {
    title1: '취소 버튼 포함',
    previous: false,
    title: true,
    cs: false,
    cancel: true,
  },
  parameters: {
    docs: {
      description: {
        story: '제목과 취소 버튼만 있는 네비게이션입니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Navigation },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 375px;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">빈 제목</h4>
          <Navigation title1="" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">특수문자 포함</h4>
          <Navigation title1="주문 & 결제 < > &quot; &apos; 100%" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">숫자만</h4>
          <Navigation title1="2024" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">공백 문자</h4>
          <Navigation title1="   앞뒤 공백   " />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">특수 유니코드</h4>
          <Navigation title1="한국어 🇰🇷 English 中文 日本語" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 Navigation 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// 이벤트 테스트 예시
export const InteractiveTest: Story = {
  args: {
    title1: '이벤트 테스트',
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const previousButton = canvas.getByRole('button', { name: /이전/i });
    // const csButton = canvas.getByRole('button', { name: /고객센터/i });
    // const cancelButton = canvas.getByRole('button', { name: /취소/i });
    // 
    // await userEvent.click(previousButton);
    // await userEvent.click(csButton);
    // await userEvent.click(cancelButton);
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다. Actions 탭에서 이벤트 발생을 확인할 수 있습니다.',
      },
    },
  },
};

// 모바일 화면 대응
export const MobileLayout: Story = {
  render: () => ({
    components: { Navigation },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="width: 320px;">
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">iPhone SE (320px)</h4>
          <Navigation title1="모바일 화면" />
        </div>
        <div style="width: 375px;">
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">iPhone (375px)</h4>
          <Navigation title1="표준 모바일 화면" />
        </div>
        <div style="width: 414px;">
          <h4 style="margin-bottom: 8px; font-size: 12px; color: #666;">iPhone Plus (414px)</h4>
          <Navigation title1="큰 모바일 화면에서의 표시" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '다양한 모바일 화면 크기에서의 Navigation 표시를 확인할 수 있습니다.',
      },
    },
  },
};

// Figma Design System
export const FigmaDesignSystem: Story = {
  render: () => ({
    components: { Navigation },
    template: `
      <div style="width: 100%; max-width: 800px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma Design System - Navigation Components
        </h3>
        <div style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <h4 style="margin-bottom: 12px; font-weight: 600; color: #333;">기본 구성 요소</h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 8px; background: #f8f9fa; font-size: 12px; font-weight: 600; color: #666;">모든 요소 포함</div>
                <Navigation title1="완전한 네비게이션" />
              </div>
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 8px; background: #f8f9fa; font-size: 12px; font-weight: 600; color: #666;">미니멀 구성</div>
                <Navigation title1="단순 네비게이션" :cs="false" :cancel="false" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 style="margin-bottom: 12px; font-weight: 600; color: #333;">사용 시나리오별</h4>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 6px; background: #f8f9fa; font-size: 11px; font-weight: 600; color: #666; text-align: center;">프로세스 페이지</div>
                <Navigation title1="결제 진행" :cs="false" />
              </div>
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 6px; background: #f8f9fa; font-size: 11px; font-weight: 600; color: #666; text-align: center;">정보 페이지</div>
                <Navigation title1="공지사항" :cancel="false" />
              </div>
              <div style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
                <div style="padding: 6px; background: #f8f9fa; font-size: 11px; font-weight: 600; color: #666; text-align: center;">작업 페이지</div>
                <Navigation title1="글 작성" />
              </div>
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
        story: 'Figma 디자인 시스템의 Navigation 컴포넌트 전체 구성을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};