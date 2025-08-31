import type { Meta, StoryObj } from '@storybook/vue3';
import { within, expect } from 'storybook/test';
import Radio from './Radio.vue';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Radio 컴포넌트는 설문조사나 선택형 질문에서 사용되는 Y/N 라디오 버튼 그룹입니다.

**주요 특징:**
- **상태**: default, selected, error (3가지)
- **크기**: sm, md (2가지) 
- **옵션**: 커스터마이저 가능한 선택 항목들
- **메시지**: 알림, 텍스트, 툴팁 지원
- **접근성**: ARIA 속성, 키보드 내비게이션 완전 지원

**Figma 디자인을 100% 재현**하여 구현되었으며, Vue v-model과 완전 호환됩니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: { type: 'select' },
      options: [undefined, true, false, 'custom'],
      description: '선택된 값입니다.',
      table: {
        type: { summary: 'string | number | boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    options: {
      control: { type: 'object' },
      description: '라디오 옵션 배열입니다.',
      table: {
        type: { summary: 'RadioOption[]' },
        defaultValue: { summary: '[{label: "아니요", value: false}, {label: "예", value: true}]' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'selected', 'error'],
      description: '라디오 그룹의 상태를 설정합니다.',
      table: {
        type: { summary: "'default' | 'selected' | 'error'" },
        defaultValue: { summary: "'default'" },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
      description: 'Radio의 크기를 설정합니다.',
      table: {
        type: { summary: "'sm' | 'md'" },
        defaultValue: { summary: "'md'" },
      },
    },
    showMessage: {
      control: 'boolean',
      description: '메시지 영역을 표시할지 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showNotice: {
      control: 'boolean',
      description: '알림 메시지를 표시할지 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showText: {
      control: 'boolean',
      description: '일반 텍스트를 표시할지 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showTooltip: {
      control: 'boolean',
      description: '툴팁 버튼을 표시할지 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    noticeText: {
      control: 'text',
      description: '알림 메시지 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'정답 입니다.'" },
      },
    },
    messageText: {
      control: 'text',
      description: '일반 메시지 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'내용을 입력해 주세요.'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: '라디오 그룹을 비활성화할지 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {},
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    modelValue: undefined,
    state: 'default',
    size: 'md',
    showMessage: false,
    showNotice: false,
    showText: false,
    showTooltip: false,
    disabled: false,
  },
  render: (args) => ({
    components: { Radio },
    setup() {
      return { args }
    },
    template: `
      <div style="min-width: 360px; width: 100%;">
        <Radio v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 Radio의 다양한 상태를 확인할 수 있습니다.',
      },
    },
  },
};

// Default
export const Default: Story = {
  args: {
    state: 'default',
    size: 'md',
  },
  render: (args) => ({
    components: { Radio },
    setup() {
      return { args }
    },
    template: `
      <div style="min-width: 360px; width: 100%;">
        <Radio v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 Radio 컴포넌트입니다. (state: default, size: md)',
      },
    },
  },
};

// States - Figma의 모든 상태
export const States: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; width: 400px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Default State</h3>
          <Radio 
            :model-value="undefined"
            state="default"
            :show-message="true"
            :show-text="true"
            message-text="내용을 입력해 주세요"
          />
        </div>
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Selected State</h3>
          <Radio 
            :model-value="true"
            state="selected"
            :show-message="true"
            :show-notice="true"
            notice-text="정답 입니다."
            :show-text="true"
            message-text="내용을 입력해 주세요."
          />
        </div>
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Error State</h3>
          <Radio 
            :model-value="false"
            state="error"
            :show-message="true"
            :show-notice="true"
            notice-text="다시 확인해 주세요."
            :show-text="true"
            message-text="내용을 입력해 주세요."
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인 시스템의 모든 상태(default, selected, error)를 확인할 수 있습니다.',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Medium (기본)</h4>
          <Radio 
            size="md" 
            :model-value="true"
            state="selected"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Small</h4>
          <Radio 
            size="sm" 
            :model-value="true"
            state="selected"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 크기 변형을 확인할 수 있습니다.',
      },
    },
  },
};

// Custom Options
export const CustomOptions: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">기본 Y/N 옵션</h4>
          <Radio :model-value="true" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">3개 옵션</h4>
          <Radio 
            :options="[
              { label: '동의', value: 'agree' },
              { label: '비동의', value: 'disagree' },
              { label: '보류', value: 'pending' }
            ]"
            model-value="agree"
            state="selected"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">숫자 값 옵션</h4>
          <Radio 
            :options="[
              { label: '매우 나쁨', value: 1 },
              { label: '나쁨', value: 2 },
              { label: '보통', value: 3 },
              { label: '좋음', value: 4 },
              { label: '매우 좋음', value: 5 }
            ]"
            :model-value="4"
            state="selected"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 커스텀 옵션 구성을 확인할 수 있습니다.',
      },
    },
  },
};

// Message Variants
export const MessageVariants: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">메시지 없음</h4>
          <Radio :model-value="true" />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">알림만</h4>
          <Radio 
            :model-value="true"
            state="selected"
            :show-message="true"
            :show-notice="true"
            notice-text="정답입니다!"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">텍스트만</h4>
          <Radio 
            :show-message="true"
            :show-text="true"
            message-text="옵션을 선택해주세요."
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">텍스트 + 툴팁</h4>
          <Radio 
            :show-message="true"
            :show-text="true"
            :show-tooltip="true"
            message-text="자세한 내용은 도움말을 참고하세요."
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">모든 메시지</h4>
          <Radio 
            :model-value="false"
            state="error"
            :show-message="true"
            :show-notice="true"
            :show-text="true"
            :show-tooltip="true"
            notice-text="다시 확인해 주세요."
            message-text="올바른 답을 선택해주세요."
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 메시지 표시 옵션을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Example
export const InteractiveExample: Story = {
  render: () => ({
    components: { Radio },
    data() {
      return {
        selectedValue: undefined as any,
        showFeedback: false,
      };
    },
    computed: {
      currentState() {
        if (!this.showFeedback) return 'default';
        return this.selectedValue === true ? 'selected' : 'error';
      },
      noticeText() {
        if (this.selectedValue === true) return '정답입니다!';
        if (this.selectedValue === false) return '틀렸습니다. 다시 시도해보세요.';
        return '';
      },
    },
    methods: {
      handleChange(value: any) {
        this.selectedValue = value;
        this.showFeedback = true;
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">
            질문: Vue 3는 Composition API를 지원하나요?
          </h4>
          <Radio 
            v-model="selectedValue"
            :state="currentState"
            :show-message="showFeedback"
            :show-notice="showFeedback"
            :show-text="!showFeedback"
            :notice-text="noticeText"
            message-text="위 질문에 답해보세요."
            @change="handleChange"
          />
        </div>
        <div v-if="showFeedback" style="margin-top: 16px;">
          <button 
            @click="selectedValue = undefined; showFeedback = false"
            style="padding: 8px 16px; background: #f0f0f0; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;"
          >
            다시 시도
          </button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 상호작용이 가능한 Radio 예시입니다. 정답은 "예"입니다!',
      },
    },
  },
};

// Disabled State
export const DisabledState: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">기본 비활성화</h4>
          <Radio disabled />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">선택된 상태로 비활성화</h4>
          <Radio 
            :model-value="true"
            disabled
            state="selected"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">에러 상태로 비활성화</h4>
          <Radio 
            :model-value="false"
            disabled
            state="error"
            :show-message="true"
            :show-notice="true"
            notice-text="수정할 수 없습니다."
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 Radio를 확인할 수 있습니다.',
      },
    },
  },
};

// Real World Usage Examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 500px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">설문조사</h4>
          <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
            <p style="margin: 0 0 16px 0; font-weight: 500;">
              Q1. 이 서비스를 추천하시겠습니까?
            </p>
            <Radio 
              :show-message="true"
              :show-text="true"
              message-text="솔직한 의견을 들려주세요."
            />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">동의/비동의 선택</h4>
          <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
            <p style="margin: 0 0 16px 0; font-weight: 500;">
              개인정보 처리방침에 동의하십니까?
            </p>
            <Radio 
              :options="[
                { label: '동의하지 않음', value: false },
                { label: '동의함', value: true }
              ]"
              :model-value="true"
              state="selected"
              :show-message="true"
              :show-notice="true"
              notice-text="동의해 주셔서 감사합니다."
            />
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">만족도 평가</h4>
          <div style="background: #f8f9fa; padding: 16px; border-radius: 8px;">
            <p style="margin: 0 0 16px 0; font-weight: 500;">
              서비스 이용에 만족하셨나요?
            </p>
            <Radio 
              :options="[
                { label: '불만족', value: 'dissatisfied' },
                { label: '보통', value: 'neutral' },
                { label: '만족', value: 'satisfied' }
              ]"
              model-value="satisfied"
              state="selected"
              size="sm"
            />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 애플리케이션에서 Radio가 사용되는 다양한 예시들입니다.',
      },
    },
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div style="padding: 16px; background: #f0f8ff; border-radius: 8px; border-left: 4px solid #2196f3;">
          <h4 style="margin: 0 0 12px 0; color: #1976d2;">접근성 기능</h4>
          <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
            <li>키보드로 탐색 가능 (Tab, Space, Enter)</li>
            <li>스크린 리더 지원 (ARIA 속성)</li>
            <li>포커스 표시 및 고대비 모드 지원</li>
            <li>의미있는 라벨과 설명 제공</li>
          </ul>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">
            키보드로 조작해보세요
          </h4>
          <Radio 
            :show-message="true"
            :show-text="true"
            :show-tooltip="true"
            message-text="Tab키로 이동하고 Space/Enter로 선택하세요."
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Radio 컴포넌트의 접근성 기능을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Test
export const InteractiveTest: Story = {
  args: {
    modelValue: false,
    state: 'default',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radioGroup = canvas.getByTestId('radio-survey');

    // 기본 렌더링 확인
    await expect(radioGroup).toBeInTheDocument();

    // 옵션들이 렌더링되었는지 확인
    const option1 = canvas.getByTestId('radio-option-0');
    const option2 = canvas.getByTestId('radio-option-1');

    await expect(option1).toBeInTheDocument();
    await expect(option2).toBeInTheDocument();
    await expect(option1).toHaveTextContent('아니요');
    await expect(option2).toHaveTextContent('예');

    // ARIA 속성 확인
    await expect(option1).toHaveAttribute('role', 'radio');
    await expect(option2).toHaveAttribute('role', 'radio');
    await expect(option1).toHaveAttribute('aria-checked', 'true'); // modelValue가 false이므로
    await expect(option2).toHaveAttribute('aria-checked', 'false');
  },
  parameters: {
    docs: {
      description: {
        story: '인터랙티브 테스트를 위한 Radio 예시입니다.',
      },
    },
  },
};

// Performance Test
export const PerformanceTest: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px; max-height: 400px; overflow-y: auto;">
        <Radio 
          v-for="i in 20" 
          :key="i" 
          :options="[
            { label: \`옵션 \${i}-1\`, value: \`option-\${i}-1\` },
            { label: \`옵션 \${i}-2\`, value: \`option-\${i}-2\` }
          ]"
          :model-value="\`option-\${i}-1\`"
          state="selected"
          size="sm"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '많은 수의 Radio를 렌더링했을 때의 성능을 테스트할 수 있습니다.',
      },
    },
  },
};
