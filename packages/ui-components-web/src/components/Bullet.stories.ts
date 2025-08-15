// src/components/Bullet.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect, userEvent } from "storybook/test";
import Bullet from "./Bullet.vue";

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof Bullet> = {
  title: "Content/Bullet",
  tags: ["autodocs"],
  component: Bullet,
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["1depth", "2depth"],
      description: "리스트 아이템의 깊이를 설정합니다",
      table: { category: "Props" },
    },
    text: {
      control: "text",
      description: "표시될 텍스트 내용",
      table: { category: "Props" },
    },
    button: {
      control: "boolean",
      description: "버튼 상태 (현재는 UI에 직접 영향 없음)",
      table: { category: "Props" },
    },
    ariaLabel: {
      control: "text",
      description: "사용자 정의 aria-label (선택적)",
      table: { category: "Accessibility" },
    },
    onTextClick: {
      action: "textClick",
      description: "텍스트 클릭 시 발생하는 이벤트",
      table: { category: "Events" },
    },
    onClick: {
      action: "click",
      description: "전체 클릭 시 발생하는 이벤트",
      table: { category: "Events" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "1depth와 2depth 두 가지 스타일의 불릿 포인트를 제공하는 Bullet 컴포넌트입니다. 1depth는 원형 불릿, 2depth는 하이픈(-) 불릿을 사용합니다.\n\n### 접근성 특징\n- **ARIA 지원**: listitem role, aria-level, aria-label 자동 설정\n- **키보드 탐색**: Tab, Enter, Space 키 지원\n- **스크린 리더**: 적절한 설명과 구조 정보 제공\n- **고대비 모드**: prefers-contrast 미디어 쿼리 지원\n- **모션 감소**: prefers-reduced-motion 미디어 쿼리 지원",
      },
    },
    layout: "centered",
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Bullet>;

/* ──────────────────────────────────────────────
   공통 Mock 데이터
   ──────────────────────────────────────────── */
const sampleTexts = {
  short: "간단한 텍스트입니다.",
  medium: "중간 길이의 텍스트로 여러 내용을 포함하고 있습니다.",
  long: "매우 긴 텍스트 내용으로 줄바꿈이 발생할 수 있는 상황을 테스트하기 위한 예시 문장입니다. 이런 경우에도 적절하게 표시되는지 확인해보겠습니다.",
  veryLong: "이것은매우긴텍스트입니다".repeat(15) + " 이런식으로공백없는매우긴문자열도자동으로줄바꿈처리됩니다",
  url: "https://www.verylongdomainname.com/very/long/path/to/some/resource/with/many/parameters?param1=value1&param2=value2&param3=value3&param4=value4",
  multiline: "첫 번째 줄입니다.\n두 번째 줄입니다.\n세 번째 줄입니다.\n네 번째 줄도 추가했습니다.",
  special: "특수문자 테스트: & < > \" ' 한글과 영어 Mixed Content!",
  mixed: "한글과EnglishMixed텍스트가포함된매우긴문장입니다" + "VeryLongEnglishWordWithoutSpaces" + "다시한글로이어지는긴텍스트",
};

/* ──────────────────────────────────────────────
   1) Playground — Controls로 실험
   ──────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    type: "1depth",
    text: sampleTexts.medium,
    button: false,
  },
};

/* ──────────────────────────────────────────────
   2) Default — 기본 상태
   ──────────────────────────────────────────── */
export const Default: Story = {
  args: {
    type: "1depth",
    text: "내용을 입력하세요.",
    button: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 기본 텍스트가 표시되는지 확인
    await expect(canvas.getByText("내용을 입력하세요.")).toBeInTheDocument();
    
    // 1depth bullet이 표시되는지 확인 (data-name 속성으로 확인)
    const bulletElement = canvasElement.querySelector('[data-name="bullet-icon-circle"]');
    await expect(bulletElement).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   3) 1Depth 변형들
   ──────────────────────────────────────────── */
export const OneDepth: Story = {
  args: {
    type: "1depth",
    text: sampleTexts.short,
    button: false,
  },
  parameters: {
    docs: {
      description: {
        story: "1depth 스타일은 원형 불릿을 사용하며, 주요 항목에 사용됩니다.",
      },
    },
  },
};

export const OneDepthLongText: Story = {
  args: {
    type: "1depth",
    text: sampleTexts.long,
    button: false,
  },
  parameters: {
    docs: {
      description: {
        story: "긴 텍스트가 있는 1depth 스타일입니다.",
      },
    },
  },
};

export const OneDepthWithButton: Story = {
  args: {
    type: "1depth",
    text: "버튼 속성이 활성화된 텍스트",
    button: true,
  },
  parameters: {
    docs: {
      description: {
        story: "button 속성이 true일 때의 1depth 스타일입니다.",
      },
    },
  },
};

/* ──────────────────────────────────────────────
   4) 2Depth 변형들
   ──────────────────────────────────────────── */
export const TwoDepth: Story = {
  args: {
    type: "2depth",
    text: sampleTexts.medium,
    button: false,
  },
  parameters: {
    docs: {
      description: {
        story: "2depth 스타일은 하이픈(-) 불릿을 사용하며, 하위 항목에 사용됩니다.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 텍스트가 표시되는지 확인
    await expect(canvas.getByText(sampleTexts.medium)).toBeInTheDocument();
    
    // 2depth bullet이 표시되는지 확인
    const bulletElement = canvasElement.querySelector('[data-name="bullet-icon-hyphen"]');
    await expect(bulletElement).toBeInTheDocument();
    
    // 하이픈 이미지가 표시되는지 확인
    const hyphenImg = canvasElement.querySelector('img[src*="f3dff6de6162a7b1f83ed11bc9d82c92fc4cf2a9.svg"]');
    await expect(hyphenImg).toBeInTheDocument();
  },
};

export const TwoDepthLongText: Story = {
  args: {
    type: "2depth",
    text: sampleTexts.long,
    button: false,
  },
  parameters: {
    docs: {
      description: {
        story: "긴 텍스트가 있는 2depth 스타일입니다.",
      },
    },
  },
};

export const TwoDepthWithButton: Story = {
  args: {
    type: "2depth",
    text: "버튼 속성이 활성화된 하위 텍스트",
    button: true,
  },
  parameters: {
    docs: {
      description: {
        story: "button 속성이 true일 때의 2depth 스타일입니다.",
      },
    },
  },
};

/* ──────────────────────────────────────────────
   5) 특수 케이스들
   ──────────────────────────────────────────── */
export const MultilineText: Story = {
  args: {
    type: "1depth",
    text: sampleTexts.multiline,
    button: false,
  },
  parameters: {
    docs: {
      description: {
        story: "줄바꿈이 포함된 텍스트를 표시하는 예시입니다. 각 줄이 올바르게 표시되고, 불릿이 첫 번째 줄과 정렬되는지 확인할 수 있습니다.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 멀티라인 텍스트가 표시되는지 확인
    await expect(canvas.getByText(sampleTexts.multiline)).toBeInTheDocument();
    
    // 불릿 아이콘이 올바르게 정렬되어 있는지 확인
    const bulletElement = canvasElement.querySelector('[data-name="bullet-icon-circle"]');
    await expect(bulletElement).toBeInTheDocument();
  },
};

export const MultilineComparison: Story = {
  render: () => ({
    components: { Bullet },
    template: `
      <div role="list" style="display: flex; flex-direction: column; gap: 20px; width: 500px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px;">멀티라인 텍스트 테스트</h3>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">1depth - 여러 줄</h4>
          <Bullet 
            type="1depth" 
            text="첫 번째 줄입니다.
두 번째 줄입니다.
세 번째 줄입니다.
네 번째 줄도 있습니다."
          />
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">2depth - 여러 줄</h4>
          <Bullet 
            type="2depth" 
            text="첫 번째 줄입니다.
두 번째 줄입니다.
세 번째 줄입니다."
          />
        </div>

        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">긴 텍스트 자동 줄바꿈</h4>
          <Bullet 
            type="1depth" 
            text="이것은 매우 긴 텍스트의 예시입니다. 컨테이너의 너비를 초과하면 자동으로 줄바꿈이 발생합니다. 이때 불릿은 첫 번째 줄과 정렬되어야 하며, 나머지 줄들은 적절한 들여쓰기가 적용되어야 합니다."
          />
        </div>

        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">혼합 사용</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Bullet type="1depth" text="주요 항목 1" />
            <Bullet type="2depth" text="하위 항목 A
하위 항목 A의 두 번째 줄
하위 항목 A의 세 번째 줄" />
            <Bullet type="2depth" text="하위 항목 B" />
            <Bullet type="1depth" text="주요 항목 2
주요 항목 2의 상세 설명" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "다양한 멀티라인 텍스트 상황을 비교하여 불릿 정렬과 줄바꿈이 올바르게 동작하는지 확인할 수 있습니다.",
      },
    },
    layout: "centered",
  },
};

export const SpecialCharacters: Story = {
  args: {
    type: "2depth",
    text: sampleTexts.special,
    button: false,
  },
  parameters: {
    docs: {
      description: {
        story: "특수문자가 포함된 텍스트를 표시하는 예시입니다.",
      },
    },
  },
};

export const EmptyText: Story = {
  args: {
    type: "1depth",
    text: "",
    button: false,
  },
  parameters: {
    docs: {
      description: {
        story: "빈 텍스트를 처리하는 경우입니다.",
      },
    },
  },
};

/* ──────────────────────────────────────────────
   6) Interactive 테스트
   ──────────────────────────────────────────── */
export const Interactive: Story = {
  args: {
    type: "1depth",
    text: "클릭해보세요!",
    button: false,
  },
  parameters: {
    docs: {
      description: {
        story: "상호작용 테스트를 위한 스토리입니다. 텍스트를 클릭하면 이벤트가 발생합니다.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // 텍스트 요소 찾기
    const textElement = canvasElement.querySelector('[data-name="bullet-text-content"]');
    await expect(textElement).toBeInTheDocument();
    
    // 클릭 테스트
    if (textElement) {
      await userEvent.click(textElement);
    }
    
    // 키보드 네비게이션 테스트
    if (textElement) {
      await userEvent.tab();
      // Enter 키 테스트 (현재는 별도 핸들러 없음)
      await userEvent.keyboard("{Enter}");
    }
  },
};

/* ──────────────────────────────────────────────
   7) 비교를 위한 나란히 배치
   ──────────────────────────────────────────── */
export const Comparison: Story = {
  render: (args) => ({
    components: { Bullet },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 400px;">
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">1depth</h3>
          <Bullet type="1depth" text="첫 번째 레벨 항목입니다." />
        </div>
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">2depth</h3>
          <Bullet type="2depth" text="두 번째 레벨 하위 항목입니다." />
        </div>
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">혼합 사용 예시</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Bullet type="1depth" text="주요 카테고리" />
            <Bullet type="2depth" text="하위 항목 1" />
            <Bullet type="2depth" text="하위 항목 2" />
            <Bullet type="1depth" text="다른 주요 카테고리" />
            <Bullet type="2depth" text="하위 항목 3" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "1depth와 2depth 스타일을 비교하고 실제 사용 예시를 보여줍니다.",
      },
    },
    layout: "centered",
  },
};

/* ──────────────────────────────────────────────
   8) 접근성 테스트
   ──────────────────────────────────────────── */
export const AccessibilityTest: Story = {
  render: () => ({
    components: { Bullet },
    template: `
      <div role="list" style="display: flex; flex-direction: column; gap: 12px; width: 400px;">
        <h3 id="bullet-list-title" style="margin: 0 0 16px 0; font-size: 18px;">접근성 향상된 불릿 리스트</h3>
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">키보드 탐색 테스트</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Bullet 
              type="1depth" 
              text="Tab 키로 포커스 이동, Enter/Space로 활성화 가능"
            />
            <Bullet 
              type="2depth" 
              text="스크린 리더에서 '2차 하위 항목'으로 읽힘"
            />
            <Bullet 
              type="1depth" 
              text="aria-level과 role이 자동으로 설정됨"
            />
          </div>
        </div>
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">ARIA 속성 테스트</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Bullet 
              type="1depth" 
              text="각 항목은 고유한 ID를 가짐"
            />
            <Bullet 
              type="2depth" 
              text="불릿 아이콘은 aria-hidden으로 숨김"
            />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "접근성 개선 사항들을 테스트하는 스토리입니다. 키보드 탐색, 스크린 리더 지원, ARIA 속성 등을 확인할 수 있습니다.",
      },
    },
    layout: "centered",
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard', enabled: true },
          { id: 'focus-trap', enabled: true },
        ],
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 첫 번째 불릿에 포커스 이동
    const firstBullet = canvas.getAllByRole('button')[0];
    firstBullet.focus();
    
    // 키보드 이벤트 테스트
    await userEvent.keyboard('{Enter}');
    await userEvent.tab();
    await userEvent.keyboard(' ');
  },
};

/* ──────────────────────────────────────────────
   9) Edge Cases
   ──────────────────────────────────────────── */
export const LongTextHandling: Story = {
  render: () => ({
    components: { Bullet },
    template: `
      <div role="list" style="display: flex; flex-direction: column; gap: 16px; width: 500px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px;">긴 텍스트 자동 줄바꿈 테스트</h3>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">공백 없는 매우 긴 텍스트</h4>
          <Bullet 
            type="1depth" 
            :text="'${sampleTexts.veryLong}'"
          />
        </div>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">긴 URL 줄바꿈</h4>
          <Bullet 
            type="2depth" 
            :text="'${sampleTexts.url}'"
          />
        </div>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">한글/영문 혼합 긴 텍스트</h4>
          <Bullet 
            type="1depth" 
            :text="'${sampleTexts.mixed}'"
          />
        </div>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">반복되는 긴 단어</h4>
          <Bullet 
            type="2depth" 
            text="${'SupercalifragilisticexpialidociousAntidisestablishmentarianism'.repeat(3)}"
          />
        </div>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">숫자와 특수문자 조합</h4>
          <Bullet 
            type="1depth" 
            text="1234567890123456789012345678901234567890@#$%^&*()_+-=[]{}|;:,.<>?/~\`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "매우 긴 텍스트와 공백이 없는 문자열의 자동 줄바꿈을 테스트합니다. URL, 한글/영문 혼합 텍스트, 특수문자 등이 모두 적절하게 줄바꿈되는지 확인할 수 있습니다.",
      },
    },
    layout: "centered",
  },
};

export const EdgeCases: Story = {
  render: () => ({
    components: { Bullet },
    template: `
      <div role="list" style="display: flex; flex-direction: column; gap: 16px; width: 500px;">
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">일반적인 긴 텍스트</h4>
          <Bullet 
            type="1depth" 
            text="이것은 매우 긴 텍스트의 예시입니다. 이런 긴 텍스트가 있을 때 컴포넌트가 어떻게 반응하는지 확인해볼 수 있습니다. 줄바꿈이 적절하게 처리되는지, 레이아웃이 깨지지 않는지 등을 테스트할 수 있습니다."
          />
        </div>
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">HTML 특수문자</h4>
          <Bullet 
            type="2depth" 
            text="&lt;div&gt;HTML 태그&lt;/div&gt; &amp; 특수문자 &quot;테스트&quot; 'quote'"
          />
        </div>
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">숫자와 기호</h4>
          <Bullet 
            type="1depth" 
            text="숫자: 123,456.789 | 기호: @#$%^&*()_+-=[]{}|;:,.<>?"
          />
        </div>
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">빈 텍스트와 접근성</h4>
          <Bullet 
            type="1depth" 
            text=""
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "다양한 엣지 케이스들을 테스트하는 스토리입니다. 빈 텍스트의 경우 '내용 없음'으로 aria-label이 설정됩니다.",
      },
    },
    layout: "centered",
  },
};