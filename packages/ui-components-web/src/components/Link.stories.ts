import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Link from './Link.vue';

const meta = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Link 컴포넌트는 내비게이션을 위한 기본 링크 요소입니다.

**주요 특징:**
- **텍스트**: 사용자 정의 텍스트 지원 (기본값: "타이틀")
- **상태**: 기본 상태, 비활성화 상태
- **아이콘**: 오른쪽 화살표 아이콘 포함
- **상호작용**: 클릭 이벤트 지원

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '링크에 표시되는 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'타이틀'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: '링크의 비활성화 상태를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      description: '링크 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    text: '타이틀',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 링크의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 Link 컴포넌트입니다.',
      },
    },
  },
};

// States
export const States: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start; width: 300px;">
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #666;">Default State</h4>
          <Link text="기본 링크" />
        </div>
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #666;">Disabled State</h4>
          <Link text="비활성화된 링크" :disabled="true" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '링크의 모든 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// Text Variations
export const TextVariations: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start; width: 350px;">
        <Link text="홈으로 이동" />
        <Link text="프로필 설정" />
        <Link text="계정 관리" />
        <Link text="알림 설정" />
        <Link text="도움말 및 지원" />
        <Link text="개인정보 처리방침" />
        <Link text="서비스 약관" />
        <Link text="로그아웃" />
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

// Individual State Stories
export const DefaultState: Story = {
  args: {
    text: '기본 상태 링크',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 링크입니다. 클릭할 수 있으며 호버 효과가 적용됩니다.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    text: '비활성화된 링크',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화 상태의 링크입니다. 클릭할 수 없으며 회색으로 표시됩니다.',
      },
    },
  },
};

// Navigation Examples
export const NavigationExamples: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">메인 네비게이션</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Link text="홈" />
            <Link text="상품" />
            <Link text="서비스" />
            <Link text="회사소개" />
            <Link text="고객지원" />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">사용자 메뉴</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Link text="내 계정" />
            <Link text="주문 내역" />
            <Link text="위시리스트" />
            <Link text="설정" />
            <Link text="로그아웃" :disabled="false" />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">푸터 링크</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Link text="이용약관" />
            <Link text="개인정보처리방침" />
            <Link text="쿠키 정책" />
            <Link text="접근성 정책" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '실제 내비게이션에서 사용되는 링크 예시들입니다.',
      },
    },
  },
};

// Long Text Example
export const LongText: Story = {
  args: {
    text: '매우 긴 링크 텍스트 예시입니다. 이렇게 긴 텍스트도 적절히 처리됩니다.',
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 경우의 링크 렌더링을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Test Story
export const InteractiveTest: Story = {
  args: {
    text: '클릭해보세요',
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const link = canvas.getByTestId('link');
    // await userEvent.click(link);
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start; width: 400px;">
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">빈 텍스트</h4>
          <Link text="" />
        </div>
        
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">특수문자 포함</h4>
          <Link text="설정 & 개인정보 < > &quot; &apos; 100%" />
        </div>
        
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">이모지 포함</h4>
          <Link text="🏠 홈으로 가기" />
        </div>
        
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">숫자 포함</h4>
          <Link text="2024년 보고서" />
        </div>
        
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">다국어 (영어)</h4>
          <Link text="Go to Profile" />
        </div>
        
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">한글 + 영어</h4>
          <Link text="GitHub 프로필" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 링크 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Mobile Layout Examples
export const MobileLayoutExamples: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="max-width: 375px; background: #f8f9fa; border-radius: 12px; padding: 20px;">
        <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">모바일 메뉴</h4>
        <div style="display: flex; flex-direction: column; gap: 0; background: white; border-radius: 8px; overflow: hidden;">
          <div style="border-bottom: 1px solid #e9ecef; padding: 0;">
            <Link text="계정 정보" />
          </div>
          <div style="border-bottom: 1px solid #e9ecef; padding: 0;">
            <Link text="주문 내역" />
          </div>
          <div style="border-bottom: 1px solid #e9ecef; padding: 0;">
            <Link text="배송 주소" />
          </div>
          <div style="border-bottom: 1px solid #e9ecef; padding: 0;">
            <Link text="결제 수단" />
          </div>
          <div style="border-bottom: 1px solid #e9ecef; padding: 0;">
            <Link text="알림 설정" />
          </div>
          <div style="padding: 0;">
            <Link text="고객 지원" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '모바일 환경에서의 링크 레이아웃 예시입니다.',
      },
    },
  },
};

// Accessibility Features
export const AccessibilityFeatures: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start; width: 400px;">
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">키보드 내비게이션</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">Tab 키로 포커스를 이동하고 Enter 키로 활성화할 수 있습니다.</p>
          <Link text="키보드로 접근 가능한 링크" />
        </div>
        
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">포커스 표시</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">포커스 시 명확한 시각적 표시가 제공됩니다.</p>
          <Link text="포커스 표시가 있는 링크" />
        </div>
        
        <div style="width: 100%;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">비활성화 상태</h4>
          <p style="font-size: 12px; color: #666; margin-bottom: 8px;">비활성화된 링크는 시각적으로 구분되며 상호작용이 불가능합니다.</p>
          <Link text="비활성화된 링크" :disabled="true" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '링크 컴포넌트의 접근성 기능들을 확인할 수 있습니다.',
      },
    },
  },
};

// Design System Showcase
export const DesignSystemShowcase: Story = {
  render: () => ({
    components: { Link },
    template: `
      <div style="width: 100%; max-width: 600px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma Design System - Link Component
        </h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          <div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h4 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: #495057;">활성 상태</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <Link text="홈으로 이동" />
              <Link text="설정 페이지" />
              <Link text="프로필 보기" />
              <Link text="알림 센터" />
            </div>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h4 style="margin-bottom: 16px; font-size: 14px; font-weight: 600; color: #495057;">비활성 상태</h4>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <Link text="홈으로 이동" :disabled="true" />
              <Link text="설정 페이지" :disabled="true" />
              <Link text="프로필 보기" :disabled="true" />
              <Link text="알림 센터" :disabled="true" />
            </div>
          </div>
        </div>
        
        <div style="margin-top: 32px; padding: 16px; background: #e3f2fd; border-radius: 8px;">
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #1565c0;">디자인 토큰</h4>
          <div style="font-size: 12px; color: #1976d2; line-height: 1.5;">
            <p>• 폰트: Pretendard Medium, 18px, -0.36px letter-spacing</p>
            <p>• 색상: 기본 #121212, 비활성화 #929292</p>
            <p>• 아이콘: 24px, 오른쪽 화살표</p>
            <p>• 최소 높이: 44px (터치 친화적)</p>
            <p>• 상호작용: 호버, 포커스, 클릭 피드백</p>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Figma 디자인 시스템의 Link 컴포넌트 전체 사양을 확인할 수 있습니다.',
      },
    },
  },
};