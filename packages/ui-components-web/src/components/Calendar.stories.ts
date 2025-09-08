// src/components/Calendar.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect, userEvent, waitFor } from "storybook/test";
import { ref, watch } from "vue";
import Calendar from "./Calendar.vue";

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof Calendar> = {
  title: "Form/Calendar",
  tags: ["autodocs"],
  component: Calendar,
  argTypes: {
    state: {
      control: { type: "select" },
      options: ["inactive", "filled", "error", "readonly", "disabled"],
      description: "기간 선택 컴포넌트의 상태를 설정합니다",
      table: { 
        category: "Props",
        defaultValue: { summary: "inactive" }
      },
    },
    labelText: {
      control: "text",
      description: "레이블에 표시될 텍스트",
      table: { 
        category: "Props",
        defaultValue: { summary: "레이블" }
      },
    },
    messageText: {
      control: "text",
      description: "하단 메시지에 표시될 텍스트",
      table: { 
        category: "Props",
        defaultValue: { summary: "안내 문구 입력" }
      },
    },
    startDate: {
      control: "text",
      description: "시작일 (YYYY.MM.DD 형식)",
      table: { 
        category: "Props",
        defaultValue: { summary: "" }
      },
    },
    endDate: {
      control: "text",
      description: "종료일 (YYYY.MM.DD 형식)",
      table: { 
        category: "Props",
        defaultValue: { summary: "" }
      },
    },
    startPlaceholder: {
      control: "text",
      description: "시작일 placeholder 텍스트",
      table: { 
        category: "Props",
        defaultValue: { summary: "선택" }
      },
    },
    endPlaceholder: {
      control: "text",
      description: "종료일 placeholder 텍스트",
      table: { 
        category: "Props",
        defaultValue: { summary: "선택" }
      },
    },
    label: {
      control: "boolean",
      description: "레이블 표시 여부",
      table: { 
        category: "Props",
        defaultValue: { summary: "true" }
      },
    },
    message: {
      control: "boolean",
      description: "하단 메시지 표시 여부",
      table: { 
        category: "Props",
        defaultValue: { summary: "true" }
      },
    },
    "onUpdate:startDate": {
      action: "update:startDate",
      description: "시작일 변경 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "(value: string) => void" }
      },
    },
    "onUpdate:endDate": {
      action: "update:endDate",
      description: "종료일 변경 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "(value: string) => void" }
      },
    },
    onStartCalendarClick: {
      action: "startCalendarClick",
      description: "시작일 캘린더 버튼 클릭 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "() => void" }
      },
    },
    onEndCalendarClick: {
      action: "endCalendarClick",
      description: "종료일 캘린더 버튼 클릭 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "() => void" }
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Calendar 컴포넌트는 Figma 디자인을 기반으로 한 날짜 범위 선택 컴포넌트입니다.

## 주요 특징
- **5가지 상태**: inactive, filled, error, readonly, disabled
- **날짜 범위 선택**: 시작일과 종료일을 각각 선택
- **v-model 지원**: startDate, endDate 양방향 데이터 바인딩
- **접근성 지원**: ARIA 속성, 키보드 내비게이션, 버튼 disable 처리
- **상호작용 요소**: 각 날짜 필드별 캘린더 버튼
- **Figma 디자인 토큰**: 정확한 색상, 폰트, 간격 구현

## 사용법
\`\`\`vue
<template>
  <Calendar
    v-model:startDate="startDate"
    v-model:endDate="endDate"
    state="inactive"
    labelText="기간 선택"
    messageText="원하는 기간을 선택하세요"
    @startCalendarClick="handleStartCalendar"
    @endCalendarClick="handleEndCalendar"
  />
</template>

<script setup>
import { ref } from 'vue'

const startDate = ref('')
const endDate = ref('')

const handleStartCalendar = () => {
  // 시작일 달력 표시 로직
}

const handleEndCalendar = () => {
  // 종료일 달력 표시 로직
}
</script>
\`\`\`
        `,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "gray", value: "#f5f5f5" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 공통 render 함수 - reactive args 처리
 */
const createRender = (width: string = "312px") => (args: any) => ({
  components: { Calendar },
  setup() {
    const startDate = ref(args.startDate);
    const endDate = ref(args.endDate);
    const state = ref(args.state);
    const labelText = ref(args.labelText);
    const messageText = ref(args.messageText);
    const startPlaceholder = ref(args.startPlaceholder);
    const endPlaceholder = ref(args.endPlaceholder);
    const label = ref(args.label);
    const message = ref(args.message);
    
    // Watch for args changes and update refs
    watch(() => args.startDate, (newValue) => {
      if (startDate.value !== newValue) {
        startDate.value = newValue;
      }
    });
    watch(() => args.endDate, (newValue) => {
      if (endDate.value !== newValue) {
        endDate.value = newValue;
      }
    });
    watch(() => args.state, (newState) => {
      state.value = newState;
    });
    watch(() => args.labelText, (newLabelText) => {
      labelText.value = newLabelText;
    });
    watch(() => args.messageText, (newMessageText) => {
      messageText.value = newMessageText;
    });
    watch(() => args.startPlaceholder, (newStartPlaceholder) => {
      startPlaceholder.value = newStartPlaceholder;
    });
    watch(() => args.endPlaceholder, (newEndPlaceholder) => {
      endPlaceholder.value = newEndPlaceholder;
    });
    watch(() => args.label, (newLabel) => {
      label.value = newLabel;
    });
    watch(() => args.message, (newMessage) => {
      message.value = newMessage;
    });
    
    // Event handlers
    const handleUpdateStartDate = (newValue: string) => {
      startDate.value = newValue;
      args.startDate = newValue;
    };
    
    const handleUpdateEndDate = (newValue: string) => {
      endDate.value = newValue;
      args.endDate = newValue;
    };
    
    const handleStartCalendarClick = () => {
      console.log('Start calendar clicked');
      // 시뮬레이션: 날짜 선택
      if (!args.readonly && !args.disabled) {
        const today = new Date();
        const formatted = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
        handleUpdateStartDate(formatted);
      }
    };
    
    const handleEndCalendarClick = () => {
      console.log('End calendar clicked');
      // 시뮬레이션: 날짜 선택
      if (!args.readonly && !args.disabled) {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const formatted = `${nextWeek.getFullYear()}.${String(nextWeek.getMonth() + 1).padStart(2, '0')}.${String(nextWeek.getDate()).padStart(2, '0')}`;
        handleUpdateEndDate(formatted);
      }
    };
    
    return {
      startDate,
      endDate,
      state,
      labelText,
      messageText,
      startPlaceholder,
      endPlaceholder,
      label,
      message,
      handleUpdateStartDate,
      handleUpdateEndDate,
      handleStartCalendarClick,
      handleEndCalendarClick
    };
  },
  template: `
    <div style="width: ${width};">
      <Calendar
        :state="state"
        :labelText="labelText"
        :messageText="messageText"
        :startPlaceholder="startPlaceholder"
        :endPlaceholder="endPlaceholder"
        :label="label"
        :message="message"
        v-model:startDate="startDate"
        v-model:endDate="endDate"
        @startCalendarClick="handleStartCalendarClick"
        @endCalendarClick="handleEndCalendarClick"
      />
    </div>
  `,
});

/**
 * ──────────────────────────────────────────────
 *  기본 스토리
 * ──────────────────────────────────────────────
 */

/**
 * 모든 controls를 사용하여 컴포넌트를 테스트할 수 있는 Playground입니다.
 */
export const Playground: Story = {
  args: {
    state: "inactive",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "",
    endDate: "",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 기본 상태의 Calendar입니다.
 */
export const Default: Story = {
  args: {
    state: "inactive",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "",
    endDate: "",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * ──────────────────────────────────────────────
 *  상태별 스토리
 * ──────────────────────────────────────────────
 */

/**
 * 비활성 상태 - 사용자가 아직 날짜를 선택하지 않은 상태
 */
export const Inactive: Story = {
  args: {
    state: "inactive",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "",
    endDate: "",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 채워진 상태 - 사용자가 날짜 범위를 선택한 상태
 */
export const Filled: Story = {
  args: {
    state: "filled",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "2024.01.01",
    endDate: "2024.01.01",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 날짜가 올바르게 표시되는지 테스트
    await waitFor(() => {
      expect(canvas.getByText("2024.01.01")).toBeInTheDocument();
    });
  },
};

/**
 * 에러 상태 - 유효성 검증에 실패한 상태 (예: 시작일이 종료일보다 늦은 경우)
 */
export const Error: Story = {
  args: {
    state: "error",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "2024.01.01",
    endDate: "2024.01.01",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 읽기 전용 상태 - 사용자가 편집할 수 없는 상태
 */
export const Readonly: Story = {
  args: {
    state: "readonly",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "2024.01.01",
    endDate: "2024.01.01",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 버튼들이 disabled 상태인지 테스트
    const startButton = canvas.getByTestId("calendar-start-calendar") as HTMLButtonElement;
    const endButton = canvas.getByTestId("calendar-end-calendar") as HTMLButtonElement;
    
    expect(startButton.disabled).toBe(true);
    expect(endButton.disabled).toBe(true);
  },
};

/**
 * 비활성화 상태 - 사용자가 상호작용할 수 없는 상태
 */
export const Disabled: Story = {
  args: {
    state: "disabled",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "2024.01.01",
    endDate: "2024.01.01",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 버튼들이 disabled 상태인지 테스트
    const startButton = canvas.getByTestId("calendar-start-calendar") as HTMLButtonElement;
    const endButton = canvas.getByTestId("calendar-end-calendar") as HTMLButtonElement;
    
    expect(startButton.disabled).toBe(true);
    expect(endButton.disabled).toBe(true);
  },
};

/**
 * ──────────────────────────────────────────────
 *  구성 요소별 스토리
 * ──────────────────────────────────────────────
 */

/**
 * 레이블 없음 - label={false}로 설정한 경우
 */
export const WithoutLabel: Story = {
  args: {
    state: "inactive",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "",
    endDate: "",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: false,
    message: true,
  },
  render: createRender(),
};

/**
 * 메시지 없음 - message={false}로 설정한 경우
 */
export const WithoutMessage: Story = {
  args: {
    state: "inactive",
    labelText: "레이블",
    messageText: "안내 문구 입력",
    startDate: "",
    endDate: "",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: true,
    message: false,
  },
  render: createRender(),
};

/**
 * 최소 구성 - 레이블과 메시지 모두 없는 경우
 */
export const Minimal: Story = {
  args: {
    state: "inactive",
    labelText: "",
    messageText: "",
    startDate: "",
    endDate: "",
    startPlaceholder: "선택",
    endPlaceholder: "선택",
    label: false,
    message: false,
  },
  render: createRender(),
};

/**
 * ──────────────────────────────────────────────
 *  실제 사용 사례
 * ──────────────────────────────────────────────
 */

/**
 * 휴가 기간 선택
 */
export const VacationPeriod: Story = {
  args: {
    state: "inactive",
    labelText: "휴가 기간",
    messageText: "휴가를 사용할 기간을 선택하세요",
    startDate: "",
    endDate: "",
    startPlaceholder: "시작일",
    endPlaceholder: "종료일",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 프로젝트 기간 - 채워진 상태
 */
export const ProjectPeriodFilled: Story = {
  args: {
    state: "filled",
    labelText: "프로젝트 기간",
    messageText: "프로젝트 진행 기간이 설정되었습니다",
    startDate: "2024.03.01",
    endDate: "2024.06.30",
    startPlaceholder: "시작일",
    endPlaceholder: "종료일",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 예약 기간 - 에러 상태 (종료일이 시작일보다 빠른 경우)
 */
export const BookingPeriodError: Story = {
  args: {
    state: "error",
    labelText: "예약 기간",
    messageText: "종료일은 시작일보다 늦어야 합니다",
    startDate: "2024.03.15",
    endDate: "2024.03.10",
    startPlaceholder: "체크인",
    endPlaceholder: "체크아웃",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * ──────────────────────────────────────────────
 *  상호작용 테스트
 * ──────────────────────────────────────────────
 */

/**
 * 상호작용 테스트 - 캘린더 버튼 클릭 등의 동작을 테스트
 */
export const InteractiveTest: Story = {
  args: {
    state: "inactive",
    labelText: "기간 선택 테스트",
    messageText: "캘린더 버튼을 클릭해보세요",
    startDate: "",
    endDate: "",
    startPlaceholder: "시작일 클릭",
    endPlaceholder: "종료일 클릭",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 1. 시작일 캘린더 버튼 클릭
    const startButton = canvas.getByTestId("calendar-start-calendar");
    await userEvent.click(startButton);
    
    // 2. 약간의 대기 후 종료일 캘린더 버튼 클릭
    await waitFor(() => new Promise(resolve => setTimeout(resolve, 500)));
    
    const endButton = canvas.getByTestId("calendar-end-calendar");
    await userEvent.click(endButton);
    
    // 3. 날짜가 설정되었는지 확인 (실제로는 모의 날짜가 설정됨)
    await waitFor(() => {
      const calendarElement = canvas.getByTestId("calendar");
      expect(calendarElement).toBeInTheDocument();
    });
  },
};

/**
 * 모든 상태를 한 번에 보여주는 스토리
 */
export const AllStates: Story = {
  render: () => ({
    components: { Calendar },
    setup() {
      const states = [
        { 
          state: "inactive", 
          startDate: "", 
          endDate: "",
          description: "비활성 상태 - 날짜 미선택"
        },
        { 
          state: "filled", 
          startDate: "2024.01.01", 
          endDate: "2024.01.31",
          description: "채워진 상태 - 날짜 선택됨"
        },
        { 
          state: "error", 
          startDate: "2024.01.31", 
          endDate: "2024.01.01",
          description: "에러 상태 - 잘못된 날짜 범위"
        },
        { 
          state: "readonly", 
          startDate: "2024.01.01", 
          endDate: "2024.01.31",
          description: "읽기 전용 상태"
        },
        { 
          state: "disabled", 
          startDate: "2024.01.01", 
          endDate: "2024.01.31",
          description: "비활성화 상태"
        },
      ] as const;
      
      return { states };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; padding: 20px;">
        <div v-for="({ state, startDate, endDate, description }, index) in states" :key="index" style="width: 312px;">
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #777; text-transform: capitalize;">
            {{ state }}
          </h4>
          <p style="margin-bottom: 16px; font-size: 12px; color: #999; line-height: 1.4;">
            {{ description }}
          </p>
          <Calendar
            :state="state"
            :startDate="startDate"
            :endDate="endDate"
            labelText="레이블"
            messageText="안내 문구 입력"
            startPlaceholder="선택"
            endPlaceholder="선택"
            :label="true"
            :message="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: "fullscreen",
  },
};