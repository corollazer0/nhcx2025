// src/components/Label.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect, userEvent } from "storybook/test";
import Label from "./Label.vue";

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof Label> = {
  title: "Content/Label",
  tags: ["autodocs"],
  component: Label,
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["blue", "gray", "green", "lightblue", "navy", "orange", "red", "skyblue", "yellow"],
      description: "라벨의 색상 테마를 설정합니다",
      table: { 
        category: "Props",
        defaultValue: { summary: "gray" }
      },
    },
    text: {
      control: "text",
      description: "라벨에 표시될 텍스트 내용",
      table: { 
        category: "Props",
        defaultValue: { summary: "라벨" }
      },
    },
    ariaLabel: {
      control: "text",
      description: "사용자 정의 aria-label (선택적)",
      table: { category: "Accessibility" },
    },
    onClick: {
      action: "click",
      description: "라벨 클릭 시 발생하는 이벤트 (event, text) => void",
      table: { 
        category: "Events",
        type: { summary: "(event: MouseEvent | KeyboardEvent, text: string) => void" }
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "9가지 색상 변형을 제공하는 라벨 컴포넌트입니다. Figma 디자인 시스템의 색상 토큰을 기반으로 구현되었습니다.\n\n### 색상 변형\n- **gray**: 기본 회색 (기본값)\n- **green**: 성공, 승인 상태\n- **blue**: 정보, 일반적인 상태\n- **red**: 오류, 위험 상태\n- **orange**: 경고 상태\n- **yellow**: 주의 상태\n- **lightblue**: 보조 정보\n- **skyblue**: 하이라이트\n- **navy**: 중요한 정보\n\n### 접근성 특징\n- **ARIA 지원**: role=\"label\"과 자동 aria-label 설정\n- **키보드 탐색**: 포커스 가능하고 클릭 이벤트 지원\n- **스크린 리더**: 색상과 텍스트 정보를 적절히 전달\n- **고대비 모드**: prefers-contrast 미디어 쿼리 지원\n- **모션 감소**: prefers-reduced-motion 미디어 쿼리 지원",
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
type Story = StoryObj<typeof Label>;

/* ──────────────────────────────────────────────
   공통 Mock 데이터
   ──────────────────────────────────────────── */
const sampleTexts = {
  short: "라벨",
  medium: "중간 길이 라벨",
  long: "매우 긴 라벨 텍스트 예시",
  veryLong: "이것은 매우 긴 라벨 텍스트의 예시입니다",
  special: "특수문자 & < > \" '",
  mixed: "한글English혼합",
  status: {
    success: "성공",
    error: "오류",
    warning: "경고", 
    info: "정보",
    notice: "알림"
  },
  categories: {
    urgent: "긴급",
    new: "신규",
    updated: "업데이트",
    deprecated: "중단예정",
    beta: "베타"
  }
};

/* ──────────────────────────────────────────────
   1) Playground — Controls로 실험
   ──────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    color: "gray",
    text: sampleTexts.medium,
  },
};

/* ──────────────────────────────────────────────
   2) Default — 기본 상태
   ──────────────────────────────────────────── */
export const Default: Story = {
  args: {
    color: "gray",
    text: "라벨",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 기본 텍스트가 표시되는지 확인
    await expect(canvas.getByText("라벨")).toBeInTheDocument();
    
    // 기본 색상이 적용되었는지 확인
    const labelElement = canvasElement.querySelector('[data-name="Color=gray"]');
    await expect(labelElement).toBeInTheDocument();
    
    // 접근성 속성 확인
    const component = canvas.getByRole('label');
    await expect(component).toHaveAttribute('aria-label', 'gray 색상 라벨: 라벨');
  },
};

/* ──────────────────────────────────────────────
   3) 색상 변형들
   ──────────────────────────────────────────── */
export const Gray: Story = {
  args: {
    color: "gray",
    text: "기본",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 회색 라벨입니다. 일반적인 용도로 사용됩니다.",
      },
    },
  },
};

export const Green: Story = {
  args: {
    color: "green",
    text: "성공",
  },
  parameters: {
    docs: {
      description: {
        story: "성공 상태를 나타내는 녹색 라벨입니다.",
      },
    },
  },
};

export const Blue: Story = {
  args: {
    color: "blue",
    text: "정보",
  },
  parameters: {
    docs: {
      description: {
        story: "정보를 나타내는 파란색 라벨입니다.",
      },
    },
  },
};

export const Red: Story = {
  args: {
    color: "red",
    text: "오류",
  },
  parameters: {
    docs: {
      description: {
        story: "오류나 위험 상태를 나타내는 빨간색 라벨입니다.",
      },
    },
  },
};

export const Orange: Story = {
  args: {
    color: "orange",
    text: "경고",
  },
  parameters: {
    docs: {
      description: {
        story: "경고 상태를 나타내는 주황색 라벨입니다.",
      },
    },
  },
};

export const Yellow: Story = {
  args: {
    color: "yellow",
    text: "주의",
  },
  parameters: {
    docs: {
      description: {
        story: "주의가 필요한 상태를 나타내는 노란색 라벨입니다.",
      },
    },
  },
};

export const LightBlue: Story = {
  args: {
    color: "lightblue",
    text: "안내",
  },
  parameters: {
    docs: {
      description: {
        story: "보조 정보나 안내를 나타내는 연한 파란색 라벨입니다.",
      },
    },
  },
};

export const SkyBlue: Story = {
  args: {
    color: "skyblue",
    text: "하이라이트",
  },
  parameters: {
    docs: {
      description: {
        story: "하이라이트나 강조를 나타내는 하늘색 라벨입니다.",
      },
    },
  },
};

export const Navy: Story = {
  args: {
    color: "navy",
    text: "중요",
  },
  parameters: {
    docs: {
      description: {
        story: "중요한 정보를 나타내는 네이비색 라벨입니다.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // navy 색상이 적용되었는지 확인
    const labelElement = canvasElement.querySelector('[data-name="Color=navy"]');
    await expect(labelElement).toBeInTheDocument();
    
    // Figma node ID 확인
    await expect(labelElement).toHaveAttribute('data-node-id', '3567:55100');
  },
};

/* ──────────────────────────────────────────────
   4) 모든 색상 비교
   ──────────────────────────────────────────── */
export const AllColors: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 450px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px;">모든 색상 변형</h3>
        
        <div style="display: grid; grid-template-columns: repeat(3, auto); gap: 12px; justify-content: start; align-items: center;">
          <Label color="gray" text="기본" />
          <Label color="green" text="성공" />
          <Label color="blue" text="정보" />
          <Label color="red" text="오류" />
          <Label color="orange" text="경고" />
          <Label color="yellow" text="주의" />
          <Label color="lightblue" text="안내" />
          <Label color="skyblue" text="하이라이트" />
          <Label color="navy" text="중요" />
        </div>
        
        <div style="margin-top: 20px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">상태별 사용 예시</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <Label color="green" text="완료" />
            <Label color="blue" text="진행중" />
            <Label color="red" text="실패" />
            <Label color="orange" text="대기" />
            <Label color="yellow" text="검토필요" />
          </div>
        </div>
        
        <div style="margin-top: 20px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">카테고리 분류 예시</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
            <Label color="navy" text="긴급" />
            <Label color="skyblue" text="신규" />
            <Label color="lightblue" text="업데이트" />
            <Label color="gray" text="일반" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "모든 색상 변형을 한 번에 비교하고 실제 사용 예시를 확인할 수 있습니다.",
      },
    },
    layout: "centered",
  },
};

/* ──────────────────────────────────────────────
   5) 텍스트 길이 테스트
   ──────────────────────────────────────────── */
export const TextLengthVariations: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px;">텍스트 길이별 테스트</h3>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">짧은 텍스트</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="green" text="OK" />
            <Label color="red" text="NO" />
            <Label color="blue" text="INFO" />
          </div>
        </div>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">중간 길이 텍스트</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="orange" text="처리 중" />
            <Label color="yellow" text="검토 필요" />
            <Label color="navy" text="승인 완료" />
          </div>
        </div>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">긴 텍스트 (ellipsis 적용)</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; max-width: 150px;">
            <Label color="lightblue" :text="'${sampleTexts.veryLong}'" />
            <Label color="skyblue" text="매우 긴 라벨 텍스트입니다" />
          </div>
        </div>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">특수문자 포함</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="red" text="&lt;ERROR&gt;" />
            <Label color="green" text="Success &amp; Complete" />
            <Label color="blue" text="Version 1.2.3" />
          </div>
        </div>
        
        <div style="padding: 12px; background: #f5f5f5; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0;">한글/영문 혼합</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="navy" text="신규New" />
            <Label color="orange" text="업데이트Update" />
            <Label color="green" text="완료Complete" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "다양한 텍스트 길이와 유형에서 라벨이 어떻게 표시되는지 확인할 수 있습니다. 긴 텍스트는 ellipsis로 처리됩니다.",
      },
    },
    layout: "centered",
  },
};

/* ──────────────────────────────────────────────
   6) 특수 케이스들
   ──────────────────────────────────────────── */
export const EmptyText: Story = {
  args: {
    color: "blue",
    text: "",
  },
  parameters: {
    docs: {
      description: {
        story: "빈 텍스트를 처리하는 경우입니다. 기본값인 '라벨'이 표시됩니다.",
      },
    },
  },
};

export const SpecialCharacters: Story = {
  args: {
    color: "red",
    text: sampleTexts.special,
  },
  parameters: {
    docs: {
      description: {
        story: "특수문자가 포함된 텍스트를 안전하게 처리하는 예시입니다.",
      },
    },
  },
};

export const CustomAriaLabel: Story = {
  args: {
    color: "green",
    text: "성공",
    ariaLabel: "작업이 성공적으로 완료되었습니다",
  },
  parameters: {
    docs: {
      description: {
        story: "사용자 정의 aria-label을 사용하여 접근성을 향상시킨 예시입니다.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 사용자 정의 aria-label이 적용되었는지 확인
    const labelElement = canvas.getByRole('label');
    await expect(labelElement).toHaveAttribute('aria-label', '작업이 성공적으로 완료되었습니다');
  },
};

/* ──────────────────────────────────────────────
   7) Interactive 테스트
   ──────────────────────────────────────────── */
export const Interactive: Story = {
  args: {
    color: "blue",
    text: "클릭해보세요",
  },
  parameters: {
    docs: {
      description: {
        story: "상호작용 테스트를 위한 스토리입니다. 라벨을 클릭하거나 키보드로 활성화할 수 있습니다.",
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // 라벨 요소 찾기
    const labelElement = canvasElement.querySelector('[data-testid="label"]');
    await expect(labelElement).toBeInTheDocument();
    
    // 클릭 테스트
    if (labelElement) {
      await userEvent.click(labelElement);
    }
    
    // 포커스 테스트
    if (labelElement) {
      labelElement.focus();
      await expect(document.activeElement).toBe(labelElement);
      
      // 키보드 이벤트 테스트
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');
    }
  },
};

export const EmptyAndNullTextHandling: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px;">빈 텍스트 처리 테스트</h3>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">빈 값 처리</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <Label color="green" text="" />
            <Label color="blue" :text="null" />
            <Label color="red" :text="undefined" />
            <Label color="yellow" text="   " />
            <Label color="orange" text="\t\n " />
          </div>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">
            모든 라벨이 "라벨"로 표시됩니다.
          </p>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">공백 처리</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <Label color="lightblue" text="  앞뒤공백  " />
            <Label color="skyblue" text="\\t탭문자\\t" />
            <Label color="navy" text="정상텍스트" />
          </div>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">
            앞뒤 공백이 자동으로 제거됩니다.
          </p>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">클릭 이벤트 테스트</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
            <Label 
              color="green" 
              text="클릭 가능" 
              @click="(event, text) => alert('클릭됨: ' + text)"
            />
            <Label 
              color="blue" 
              text="" 
              @click="(event, text) => alert('빈 텍스트 클릭: ' + text)"
            />
          </div>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">
            라벨을 클릭하면 텍스트 내용과 함께 이벤트가 발생합니다.
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "빈 텍스트, null, undefined 처리와 클릭 이벤트를 테스트하는 스토리입니다.",
      },
    },
    layout: "centered",
  },
};

/* ──────────────────────────────────────────────
   8) 실제 사용 시나리오
   ──────────────────────────────────────────── */
export const UsageScenarios: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 500px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px;">실제 사용 시나리오</h3>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">상태 표시</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="green" text="활성" />
            <Label color="red" text="비활성" />
            <Label color="yellow" text="대기중" />
            <Label color="blue" text="처리중" />
            <Label color="gray" text="중단됨" />
          </div>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">우선순위</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="red" text="높음" />
            <Label color="orange" text="보통" />
            <Label color="green" text="낮음" />
            <Label color="navy" text="긴급" />
          </div>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">카테고리 태그</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="lightblue" text="프론트엔드" />
            <Label color="skyblue" text="백엔드" />
            <Label color="navy" text="데이터베이스" />
            <Label color="yellow" text="디자인" />
            <Label color="green" text="완료" />
          </div>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">알림 종류</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="blue" text="공지사항" />
            <Label color="green" text="시스템 정상" />
            <Label color="yellow" text="점검 예정" />
            <Label color="red" text="장애 발생" />
            <Label color="orange" text="업데이트" />
          </div>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">배지/뱃지 형태</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="navy" text="NEW" />
            <Label color="red" text="HOT" />
            <Label color="orange" text="SALE" />
            <Label color="green" text="FREE" />
            <Label color="skyblue" text="BETA" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서 사용할 수 있는 다양한 시나리오들을 보여줍니다.",
      },
    },
    layout: "centered",
  },
};

/* ──────────────────────────────────────────────
   9) 접근성 테스트
   ──────────────────────────────────────────── */
export const AccessibilityTest: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px;">접근성 향상된 라벨</h3>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">기본 aria-label</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="green" text="성공" />
            <Label color="red" text="오류" />
            <Label color="blue" text="정보" />
          </div>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">사용자 정의 aria-label</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label 
              color="green" 
              text="✓" 
              ariaLabel="작업이 성공적으로 완료되었습니다"
            />
            <Label 
              color="red" 
              text="✗" 
              ariaLabel="작업 실행 중 오류가 발생했습니다"
            />
            <Label 
              color="yellow" 
              text="!" 
              ariaLabel="주의가 필요한 상황입니다"
            />
          </div>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">클릭 가능한 라벨</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="navy" text="필터: 전체" />
            <Label color="blue" text="정렬: 최신순" />
            <Label color="gray" text="보기: 목록" />
          </div>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">
            위 라벨들은 클릭하여 설정을 변경할 수 있습니다.
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "접근성 개선 사항들을 테스트하는 스토리입니다. 적절한 aria-label 설정과 키보드 접근성을 확인할 수 있습니다.",
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
    
    // 첫 번째 라벨에 포커스 이동
    const labels = canvas.getAllByRole('label');
    if (labels.length > 0) {
      labels[0].focus();
      await expect(document.activeElement).toBe(labels[0]);
    }
  },
};

/* ──────────────────────────────────────────────
   10) Figma 호환성 테스트
   ──────────────────────────────────────────── */
export const FigmaCompatibility: Story = {
  render: () => ({
    components: { Label },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 600px;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px;">Figma 디자인 호환성</h3>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">원본 Figma 순서대로</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="gray" text="라벨" />
            <Label color="navy" text="라벨" />
            <Label color="green" text="라벨" />
            <Label color="blue" text="라벨" />
            <Label color="red" text="라벨" />
            <Label color="orange" text="라벨" />
            <Label color="yellow" text="라벨" />
            <Label color="lightblue" text="라벨" />
            <Label color="skyblue" text="라벨" />
          </div>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">Node ID 테스트</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="green" text="3567:55086" />
            <Label color="blue" text="3567:55088" />
            <Label color="red" text="3567:55090" />
          </div>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">
            각 라벨의 data-node-id 속성에 Figma Node ID가 설정됩니다.
          </p>
        </div>
        
        <div style="padding: 16px; border: 1px solid #e1e1e1; border-radius: 8px;">
          <h4 style="margin: 0 0 12px 0; font-size: 14px; color: #666;">색상 토큰 정확성</h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <Label color="green" text="#19973c" />
            <Label color="blue" text="#2c6dd4" />
            <Label color="red" text="#d10f0f" />
            <Label color="orange" text="#d44b10" />
            <Label color="yellow" text="#da6f11" />
          </div>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">
            Figma 디자인 토큰과 정확히 일치하는 색상값이 사용됩니다.
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Figma 원본 디자인과의 호환성을 확인하는 스토리입니다. 색상, Node ID, 레이아웃이 정확히 일치하는지 확인할 수 있습니다.",
      },
    },
    layout: "centered",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Figma data 속성들이 올바르게 설정되었는지 확인
    const greenLabel = canvasElement.querySelector('[data-name="Color=green"]');
    await expect(greenLabel).toHaveAttribute('data-node-id', '3567:55086');
    
    const blueLabel = canvasElement.querySelector('[data-name="Color=blue"]');
    await expect(blueLabel).toHaveAttribute('data-node-id', '3567:55088');
    
    const redLabel = canvasElement.querySelector('[data-name="Color=red"]');
    await expect(redLabel).toHaveAttribute('data-node-id', '3567:55090');
  },
};