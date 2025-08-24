// src/components/Input.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3";
import { within, expect, userEvent, waitFor } from "storybook/test";
import { ref, watch } from "vue";
import Input from "./Input.vue";

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof Input> = {
  title: "Form/Input",
  tags: ["autodocs"],
  component: Input,
  argTypes: {
    state: {
      control: { type: "select" },
      options: ["inactive", "focus", "filled", "error", "success", "readonly", "disabled"],
      description: "인풋 박스의 상태를 설정합니다",
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
    placeholderText: {
      control: "text",
      description: "플레이스홀더에 표시될 텍스트",
      table: { 
        category: "Props",
        defaultValue: { summary: "플레이스홀더 텍스트" }
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
    value: {
      control: "text",
      description: "인풋 필드의 값 (v-model)",
      table: { 
        category: "Props",
        defaultValue: { summary: "" }
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
    "onUpdate:value": {
      action: "update:value",
      description: "값 변경 시 발생하는 이벤트 (v-model)",
      table: { 
        category: "Events",
        type: { summary: "(value: string) => void" }
      },
    },
    onFocus: {
      action: "focus",
      description: "포커스 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "(event: FocusEvent) => void" }
      },
    },
    onBlur: {
      action: "blur",
      description: "블러 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "(event: FocusEvent) => void" }
      },
    },
    onInput: {
      action: "input",
      description: "입력 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "(event: Event, value: string) => void" }
      },
    },
    onClear: {
      action: "clear",
      description: "초기화 버튼 클릭 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "() => void" }
      },
    },
    onEnter: {
      action: "enter",
      description: "Enter 키 입력 시 발생하는 이벤트",
      table: { 
        category: "Events",
        type: { summary: "(event: KeyboardEvent, value: string) => void" }
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Input 컴포넌트는 Figma 디자인을 기반으로 한 다양한 상태를 지원하는 입력 필드입니다.

## 주요 특징
- **7가지 상태**: inactive, focus, filled, error, success, readonly, disabled
- **v-model 지원**: 양방향 데이터 바인딩
- **접근성 지원**: ARIA 속성, 키보드 내비게이션
- **상호작용 요소**: 포커스 시 clear 버튼, success 상태 시 체크 아이콘
- **Figma 디자인 토큰**: 정확한 색상, 폰트, 간격 구현

## 사용법
\`\`\`vue
<template>
  <Input
    v-model:value="inputValue"
    state="inactive"
    labelText="이메일"
    placeholderText="이메일을 입력하세요"
    messageText="올바른 이메일 형식으로 입력하세요"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
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
  components: { Input },
  setup() {
    const value = ref(args.value);
    const state = ref(args.state);
    const labelText = ref(args.labelText);
    const placeholderText = ref(args.placeholderText);
    const messageText = ref(args.messageText);
    const label = ref(args.label);
    const message = ref(args.message);
    
    // Watch for args changes and update refs
    watch(() => args.value, (newValue) => {
      if (value.value !== newValue) {
        value.value = newValue;
      }
    });
    watch(() => args.state, (newState) => {
      state.value = newState;
    });
    watch(() => args.labelText, (newLabelText) => {
      labelText.value = newLabelText;
    });
    watch(() => args.placeholderText, (newPlaceholderText) => {
      placeholderText.value = newPlaceholderText;
    });
    watch(() => args.messageText, (newMessageText) => {
      messageText.value = newMessageText;
    });
    watch(() => args.label, (newLabel) => {
      label.value = newLabel;
    });
    watch(() => args.message, (newMessage) => {
      message.value = newMessage;
    });
    
    // Event handlers
    const handleUpdateValue = (newValue: string) => {
      value.value = newValue;
      args.value = newValue;
    };
    
    const handleFocus = (event: FocusEvent) => {
      console.log('Input focused');
    };
    
    const handleBlur = (event: FocusEvent) => {
      console.log('Input blurred');
    };
    
    const handleClear = () => {
      console.log('Input cleared');
      value.value = '';
      args.value = '';
    };
    
    const handleInput = (event: Event, inputValue: string) => {
      console.log('Input changed:', inputValue);
    };
    
    const handleEnter = (event: KeyboardEvent, inputValue: string) => {
      console.log('Enter pressed:', inputValue);
    };
    
    return {
      value,
      state,
      labelText,
      placeholderText,
      messageText,
      label,
      message,
      handleUpdateValue,
      handleFocus,
      handleBlur,
      handleClear,
      handleInput,
      handleEnter
    };
  },
  template: `
    <div style="width: ${width};">
      <Input
        :state="state"
        :labelText="labelText"
        :placeholderText="placeholderText"
        :messageText="messageText"
        :label="label"
        :message="message"
        v-model:value="value"
        @focus="handleFocus"
        @blur="handleBlur"
        @clear="handleClear"
        @input="handleInput"
        @enter="handleEnter"
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
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 기본 상태의 Input입니다.
 */
export const Default: Story = {
  args: {
    state: "inactive",
    labelText: "레이블",
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "",
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
 * 비활성 상태 - 사용자가 아직 인풋에 포커스하지 않은 상태
 */
export const Inactive: Story = {
  args: {
    state: "inactive",
    labelText: "레이블",
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 포커스 상태 - 사용자가 인풋에 포커스한 상태, 텍스트 입력 중
 */
export const Focus: Story = {
  args: {
    state: "focus",
    labelText: "레이블",
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "입력된 텍스트 입니다",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("input-input");
    
    // 포커스 시 clear 버튼이 나타나는지 테스트
    await userEvent.click(input);
    await waitFor(() => {
      expect(canvas.getByTestId("input-clear")).toBeInTheDocument();
    });
  },
};

/**
 * 채워진 상태 - 사용자가 값을 입력하고 포커스가 해제된 상태
 */
export const Filled: Story = {
  args: {
    state: "filled",
    labelText: "레이블",
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "입력된 텍스트 입니다",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 에러 상태 - 유효성 검증에 실패한 상태
 */
export const Error: Story = {
  args: {
    state: "error",
    labelText: "레이블",
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "입력된 텍스트 입니다",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 성공 상태 - 유효성 검증에 성공한 상태, 체크 아이콘이 표시됨
 */
export const Success: Story = {
  args: {
    state: "success",
    labelText: "레이블",
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "입력된 텍스트 입니다",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Success 아이콘이 표시되는지 테스트
    await waitFor(() => {
      expect(canvas.getByTestId("input-success-icon")).toBeInTheDocument();
    });
  },
};

/**
 * 읽기 전용 상태 - 사용자가 편집할 수 없는 상태
 */
export const Readonly: Story = {
  args: {
    state: "readonly",
    labelText: "레이블",
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "입력된 텍스트 입니다",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("input-input") as HTMLInputElement;
    
    // readonly 속성이 설정되어 있는지 테스트
    expect(input.readOnly).toBe(true);
  },
};

/**
 * 비활성화 상태 - 사용자가 상호작용할 수 없는 상태
 */
export const Disabled: Story = {
  args: {
    state: "disabled",
    labelText: "레이블",
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "입력된 텍스트 입니다",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("input-input") as HTMLInputElement;
    
    // disabled 속성이 설정되어 있는지 테스트
    expect(input.disabled).toBe(true);
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
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "",
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
    placeholderText: "플레이스홀더 텍스트",
    messageText: "안내 문구 입력",
    value: "",
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
    placeholderText: "플레이스홀더 텍스트",
    messageText: "",
    value: "",
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
 * 이메일 입력 필드
 */
export const EmailInput: Story = {
  args: {
    state: "inactive",
    labelText: "이메일",
    placeholderText: "이메일을 입력하세요",
    messageText: "올바른 이메일 형식으로 입력하세요",
    value: "",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 패스워드 확인 - 에러 상태
 */
export const PasswordConfirmationError: Story = {
  args: {
    state: "error",
    labelText: "비밀번호 확인",
    placeholderText: "비밀번호를 다시 입력하세요",
    messageText: "비밀번호가 일치하지 않습니다",
    value: "wrongpassword",
    label: true,
    message: true,
  },
  render: createRender(),
};

/**
 * 닉네임 입력 - 성공 상태
 */
export const NicknameSuccess: Story = {
  args: {
    state: "success",
    labelText: "닉네임",
    placeholderText: "닉네임을 입력하세요",
    messageText: "사용 가능한 닉네임입니다",
    value: "cooluser123",
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
 * 상호작용 테스트 - 포커스, 입력, 클리어 등의 동작을 테스트
 */
export const InteractiveTest: Story = {
  args: {
    state: "inactive",
    labelText: "테스트 입력",
    placeholderText: "텍스트를 입력해보세요",
    messageText: "입력 후 상호작용을 확인하세요",
    value: "",
    label: true,
    message: true,
  },
  render: createRender(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId("input-input");
    
    // 1. 인풋에 텍스트 입력
    await userEvent.click(input);
    await userEvent.type(input, "테스트 텍스트");
    
    // 2. 값이 입력되었는지 확인
    await waitFor(() => {
      expect(input).toHaveValue("테스트 텍스트");
    });
    
    // 3. Clear 버튼이 나타났는지 확인
    await waitFor(() => {
      expect(canvas.getByTestId("input-clear")).toBeInTheDocument();
    });
    
    // 4. Clear 버튼 클릭
    const clearButton = canvas.getByTestId("input-clear");
    await userEvent.click(clearButton);
    
    // 5. 값이 클리어되었는지 확인
    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  },
};

/**
 * 모든 상태를 한 번에 보여주는 스토리
 */
export const AllStates: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const states = [
        { state: "inactive", value: "" },
        { state: "focus", value: "입력된 텍스트 입니다" },
        { state: "filled", value: "입력된 텍스트 입니다" },
        { state: "error", value: "입력된 텍스트 입니다" },
        { state: "success", value: "입력된 텍스트 입니다" },
        { state: "readonly", value: "입력된 텍스트 입니다" },
        { state: "disabled", value: "입력된 텍스트 입니다" },
      ] as const;
      
      return { states };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; padding: 20px;">
        <div v-for="({ state, value }, index) in states" :key="index" style="width: 312px;">
          <h4 style="margin-bottom: 16px; font-size: 14px; color: #777; text-transform: capitalize;">
            {{ state }}
          </h4>
          <Input
            :state="state"
            :value="value"
            labelText="레이블"
            placeholderText="플레이스홀더 텍스트"
            messageText="안내 문구 입력"
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