import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import { ref, watch, computed } from 'vue';
import Checkbox from './Checkbox.vue';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Checkbox 컴포넌트는 사용자가 선택/해제할 수 있는 체크박스 입력 요소입니다.

**주요 특징:**
- **크기**: sm(기본), xs (2가지)
- **상태**: default, selected, disabled, select-disabled
- **텍스트**: 체크박스 옆에 표시되는 라벨 텍스트
- **접근성**: 키보드 내비게이션, ARIA 속성 지원
- **v-model**: 양방향 데이터 바인딩 지원

**Figma 디자인을 100% 재현**하여 구현되었습니다.
- Default: 흰색 배경, 회색 테두리
- Selected: 녹색 배경, 흰색 체크 아이콘
- Disabled: 회색 배경, 연한 회색 테두리
- Select-disabled: 회색 배경, 흰색 체크 아이콘 (비활성)

주로 약관 동의, 옵션 선택, 설정 활성화/비활성화 등에 사용됩니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '체크박스 옆에 표시될 라벨 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'체크'" },
      },
    },
    showText: {
      control: 'boolean',
      description: '라벨 텍스트를 표시할지 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'xs'],
      description: '체크박스의 크기를 설정합니다.',
      table: {
        type: { summary: "'sm' | 'xs'" },
        defaultValue: { summary: "'sm'" },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'selected', 'disabled', 'select-disabled'],
      description: '체크박스의 상태를 설정합니다.',
      table: {
        type: { summary: "'default' | 'selected' | 'disabled' | 'select-disabled'" },
        defaultValue: { summary: "'default'" },
      },
    },
    modelValue: {
      control: 'boolean',
      description: 'v-model로 사용할 값입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'onUpdate:modelValue': {
      description: 'v-model 값이 변경될 때 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(value: boolean) => void' },
      },
    },
    onChange: {
      description: '체크박스 상태가 변경될 때 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: Event, value: boolean) => void' },
      },
    },
    onClick: {
      description: '체크박스 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    'onUpdate:modelValue': fn(),
    onChange: fn(),
    onClick: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    text: '체크',
    showText: true,
    size: 'sm',
    state: 'default',
    modelValue: false,
  },
  render: (args) => ({
    components: { Checkbox },
    setup() {
      // Controls 패널의 초기값으로 상태 초기화
      const isChecked = ref(args.modelValue || args.state === 'selected');
      
      // Controls에서 state 변경 시 동기화
      watch(() => args.state, (newState) => {
        isChecked.value = newState === 'selected' || newState === 'select-disabled';
      });
      
      // Controls에서 modelValue 변경 시 동기화  
      watch(() => args.modelValue, (newValue) => {
        isChecked.value = newValue;
      });
      
      const currentState = computed(() => {
        if (args.state === 'disabled') return 'disabled';
        if (args.state === 'select-disabled') return 'select-disabled';
        return isChecked.value ? 'selected' : 'default';
      });
      
      const handleChange = (value: boolean) => {
        isChecked.value = value;
        // Actions 패널에 이벤트 로깅
        args['onUpdate:modelValue']?.(value);
        args['onChange']?.(new Event('change'), value);
      };
      
      return { 
        args,
        currentState,
        isChecked,
        handleChange 
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <Checkbox 
          :text="args.text"
          :show-text="args.showText"
          :size="args.size"
          :state="currentState"
          :model-value="isChecked"
          @update:model-value="handleChange"
          @change="args.onChange"
          @click="args.onClick"
        />
        <div style="font-size: 12px; color: #666; text-align: center; padding: 8px; background: #f5f5f5; border-radius: 4px;">
          <strong>현재 상태:</strong> {{ currentState }}<br>
          <strong>체크됨:</strong> {{ isChecked ? 'Yes' : 'No' }}<br>
          <small style="color: #999;">체크박스를 클릭하거나 Controls에서 값을 변경해보세요</small>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 props를 Controls에서 조작할 수 있습니다. 체크박스를 직접 클릭해도 상태가 변경되며, Actions 패널에서 이벤트를 확인할 수 있습니다.',
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
        story: '기본 상태의 Checkbox 컴포넌트입니다. (size: sm, state: default, text: 체크)',
      },
    },
  },
};

// Size Variants
export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <Checkbox size="sm" state="default" text="체크박스" />
          <span style="color: #666; font-size: 14px;">sm (기본 크기, 24px)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <Checkbox size="xs" state="default" text="체크박스" />
          <span style="color: #666; font-size: 14px;">xs (작은 크기, 24px, 아이콘만)</span>
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true }, // 정적 데모이므로 Controls 비활성화
    docs: {
      description: {
        story: '모든 크기 변형을 한눈에 확인할 수 있습니다. xs는 체크 아이콘만 표시됩니다.',
      },
    },
  },
};

// State Variants
export const States: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">SM Size States</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Checkbox size="sm" state="default" text="기본 상태" />
            <Checkbox size="sm" state="selected" text="선택된 상태" />
            <Checkbox size="sm" state="disabled" text="비활성 상태" />
            <Checkbox size="sm" state="select-disabled" text="선택된 비활성 상태" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">XS Size States</h4>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <Checkbox size="xs" state="default" text="기본 상태" />
            <Checkbox size="xs" state="selected" text="선택된 상태" />
            <Checkbox size="xs" state="disabled" text="비활성 상태" />
            <Checkbox size="xs" state="select-disabled" text="선택된 비활성 상태" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true }, // 정적 데모이므로 Controls 비활성화
    docs: {
      description: {
        story: '각 크기별 모든 상태 변형을 확인할 수 있습니다.',
      },
    },
  },
};

// 개별 State Stories
export const DefaultState: Story = {
  args: {
    state: 'default',
    text: '기본 상태 체크박스',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 체크박스입니다. 클릭하여 선택할 수 있습니다.',
      },
    },
  },
};

export const SelectedState: Story = {
  args: {
    state: 'selected',
    text: '선택된 체크박스',
  },
  parameters: {
    docs: {
      description: {
        story: '선택된 상태의 체크박스입니다. 녹색 배경에 흰색 체크 아이콘이 표시됩니다.',
      },
    },
  },
};

export const DisabledState: Story = {
  args: {
    state: 'disabled',
    text: '비활성 체크박스',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성 상태의 체크박스입니다. 클릭할 수 없습니다.',
      },
    },
  },
};

export const SelectDisabledState: Story = {
  args: {
    state: 'select-disabled',
    text: '선택된 비활성 체크박스',
  },
  parameters: {
    docs: {
      description: {
        story: '선택된 상태이지만 비활성화된 체크박스입니다. 회색 배경에 흰색 체크 아이콘이 표시됩니다.',
      },
    },
  },
};

// 개별 Size Stories
export const SmallSize: Story = {
  args: {
    size: 'sm',
    text: '기본 크기 체크박스',
  },
  parameters: {
    docs: {
      description: {
        story: 'SM 사이즈 체크박스입니다. 기본 크기로 사용됩니다.',
      },
    },
  },
};

export const ExtraSmallSize: Story = {
  args: {
    size: 'xs',
    text: '작은 크기 체크박스',
  },
  parameters: {
    docs: {
      description: {
        story: 'XS 사이즈 체크박스입니다. 아이콘 형태로만 표시됩니다.',
      },
    },
  },
};

// Text Variations
export const TextVariations: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <Checkbox text="이용약관에 동의합니다" />
        <Checkbox text="개인정보 처리방침에 동의합니다" />
        <Checkbox text="마케팅 수신에 동의합니다" />
        <Checkbox text="뉴스레터 구독" />
        <Checkbox text="푸시 알림 받기" />
        <Checkbox text="이벤트 알림 받기" />
        <Checkbox text="SMS 수신 동의" />
        <Checkbox text="이메일 수신 동의" />
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true }, // 정적 데모이므로 Controls 비활성화
    docs: {
      description: {
        story: '실제 사용 사례에서의 다양한 텍스트 예시입니다.',
      },
    },
  },
};

// Without Text
export const WithoutText: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #333;">텍스트 숨김 (showText: false)</h4>
          <div style="display: flex; gap: 12px; align-items: center;">
            <Checkbox :show-text="false" state="default" />
            <Checkbox :show-text="false" state="selected" />
            <Checkbox :show-text="false" state="disabled" />
            <Checkbox :show-text="false" state="select-disabled" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; color: #333;">다양한 사이즈</h4>
          <div style="display: flex; gap: 12px; align-items: center;">
            <Checkbox size="sm" :show-text="false" state="selected" />
            <Checkbox size="xs" :show-text="false" state="selected" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true }, // 정적 데모이므로 Controls 비활성화
    docs: {
      description: {
        story: '텍스트 없이 체크박스만 표시하는 예시입니다.',
      },
    },
  },
};

// Interactive Example with v-model (독립적인 상태 관리)
export const Interactive: Story = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        agreements: {
          terms: false,
          privacy: false,
          marketing: false,
          newsletter: false,
        },
      };
    },
    computed: {
      allChecked() {
        return Object.values(this.agreements).every(Boolean);
      },
      someChecked() {
        return Object.values(this.agreements).some(Boolean);
      },
    },
    methods: {
      toggleAll() {
        const newValue = !this.allChecked;
        Object.keys(this.agreements).forEach(key => {
          this.agreements[key] = newValue;
        });
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div style="color: #666; font-size: 14px;">
          실제 v-model을 사용한 상호작용 예시입니다.
        </div>
        
        <div style="border-bottom: 1px solid #eee; padding-bottom: 12px;">
          <Checkbox 
            :model-value="allChecked"
            :state="allChecked ? 'selected' : (someChecked ? 'select-disabled' : 'default')"
            text="전체 동의"
            @click="toggleAll"
          />
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 8px; padding-left: 16px;">
          <Checkbox 
            v-model="agreements.terms"
            :state="agreements.terms ? 'selected' : 'default'"
            text="[필수] 이용약관 동의"
          />
          <Checkbox 
            v-model="agreements.privacy"
            :state="agreements.privacy ? 'selected' : 'default'"
            text="[필수] 개인정보 처리방침 동의"
          />
          <Checkbox 
            v-model="agreements.marketing"
            :state="agreements.marketing ? 'selected' : 'default'"
            text="[선택] 마케팅 수신 동의"
          />
          <Checkbox 
            v-model="agreements.newsletter"
            :state="agreements.newsletter ? 'selected' : 'default'"
            text="[선택] 뉴스레터 구독"
          />
        </div>
        
        <div style="font-size: 12px; color: #666; background: #f5f5f5; padding: 12px; border-radius: 4px;">
          <strong>선택 상태:</strong><br>
          이용약관: {{ agreements.terms ? '동의' : '미동의' }}<br>
          개인정보: {{ agreements.privacy ? '동의' : '미동의' }}<br>
          마케팅: {{ agreements.marketing ? '동의' : '미동의' }}<br>
          뉴스레터: {{ agreements.newsletter ? '동의' : '미동의' }}
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true }, // Controls 패널 비활성화 (독립적인 상태 관리)
    docs: {
      description: {
        story: '실제 상호작용이 가능한 체크박스 예시입니다. v-model을 사용하여 독립적으로 상태를 관리하며, Controls 패널과는 분리되어 있습니다.',
      },
    },
  },
};

// Form Integration Example (독립적인 상태 관리)
export const FormIntegration: Story = {
  render: () => ({
    components: { Checkbox },
    data() {
      return {
        formData: {
          username: '',
          email: '',
          notifications: {
            email: false,
            sms: false,
            push: true,
          },
          agreements: {
            terms: false,
            privacy: false,
          },
        },
      };
    },
    computed: {
      canSubmit() {
        return this.formData.agreements.terms && this.formData.agreements.privacy;
      },
    },
    methods: {
      handleSubmit() {
        if (this.canSubmit) {
          alert('폼이 제출되었습니다!');
        }
      },
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <h3 style="margin: 0; font-size: 18px; font-weight: 600;">회원가입 폼</h3>
        
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">사용자명</label>
            <input v-model="formData.username" type="text" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px; font-size: 14px; font-weight: 500;">이메일</label>
            <input v-model="formData.email" type="email" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">알림 설정</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Checkbox 
              v-model="formData.notifications.email"
              :state="formData.notifications.email ? 'selected' : 'default'"
              text="이메일 알림 받기"
            />
            <Checkbox 
              v-model="formData.notifications.sms"
              :state="formData.notifications.sms ? 'selected' : 'default'"
              text="SMS 알림 받기"
            />
            <Checkbox 
              v-model="formData.notifications.push"
              :state="formData.notifications.push ? 'selected' : 'default'"
              text="푸시 알림 받기"
            />
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">약관 동의 <span style="color: #ff4444; font-size: 12px;">*필수</span></h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Checkbox 
              v-model="formData.agreements.terms"
              :state="formData.agreements.terms ? 'selected' : 'default'"
              text="[필수] 이용약관에 동의합니다"
            />
            <Checkbox 
              v-model="formData.agreements.privacy"
              :state="formData.agreements.privacy ? 'selected' : 'default'"
              text="[필수] 개인정보 처리방침에 동의합니다"
            />
          </div>
        </div>
        
        <button 
          @click="handleSubmit"
          :disabled="!canSubmit"
          :style="{
            padding: '12px 24px',
            backgroundColor: canSubmit ? '#19973c' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: canSubmit ? 'pointer' : 'not-allowed'
          }"
        >
          회원가입
        </button>
        
        <div style="font-size: 12px; color: #666; background: #f5f5f5; padding: 12px; border-radius: 4px;">
          <strong>현재 상태:</strong><br>
          제출 가능: {{ canSubmit ? 'Yes' : 'No' }}<br>
          알림 설정: {{ Object.entries(formData.notifications).filter(([_, v]) => v).map(([k]) => k).join(', ') || '없음' }}
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true }, // Controls 패널 비활성화 (독립적인 상태 관리)
    docs: {
      description: {
        story: '실제 폼과 통합된 체크박스 사용 예시입니다. 필수 약관 동의 체크 후에만 제출할 수 있으며, Controls 패널과는 독립적으로 동작합니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">빈 텍스트</h4>
          <Checkbox text="" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">특수문자 포함</h4>
          <Checkbox text="체크 & 확인 < > &quot; &apos; 100%" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">이모지 포함</h4>
          <Checkbox text="✅ 동의합니다" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">숫자 포함</h4>
          <Checkbox text="2024년 약관에 동의" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">다국어 (영어)</h4>
          <Checkbox text="I agree to the terms" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px;">긴 텍스트</h4>
          <Checkbox text="매우 긴 체크박스 텍스트 예시입니다. 이런 경우에도 올바르게 렌더링되는지 확인합니다." />
        </div>
      </div>
    `,
  }),
  parameters: {
    controls: { disable: true }, // 정적 데모이므로 Controls 비활성화
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 체크박스 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; width: 100%; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">E-commerce 설정</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Checkbox state="selected" text="세일 알림 받기" />
            <Checkbox state="default" text="재입고 알림" />
            <Checkbox state="selected" text="리뷰 작성 완료 알림" />
            <Checkbox state="disabled" text="품절 상품 알림 (준비중)" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">계정 설정</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Checkbox state="selected" text="로그인 상태 유지" />
            <Checkbox state="default" text="이중 인증 사용" />
            <Checkbox state="selected" text="활동 알림" />
            <Checkbox state="select-disabled" text="베타 기능 사용 (잠김)" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">개인정보 설정</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Checkbox state="selected" text="프로필 공개" />
            <Checkbox state="default" text="검색 허용" />
            <Checkbox state="selected" text="활동 기록 저장" />
            <Checkbox state="disabled" text="데이터 백업 (업그레이드 필요)" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">알림 설정</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Checkbox state="selected" text="댓글 알림" />
            <Checkbox state="selected" text="좋아요 알림" />
            <Checkbox state="default" text="팔로우 알림" />
            <Checkbox state="default" text="메시지 알림" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    controls: { disable: true }, // 정적 데모이므로 Controls 비활성화
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용되는 체크박스 예시들입니다.',
      },
    },
  },
};

// Figma Design System Matrix
export const FigmaDesignMatrix: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <div style="width: 100%; max-width: 800px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma Design System - Checkbox Matrix
        </h3>
        <div style="display: grid; grid-template-columns: 100px repeat(4, 1fr); gap: 16px; align-items: center;">
          <!-- Headers -->
          <div></div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Default</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Selected</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Disabled</div>
          <div style="text-align: center; font-weight: 600; font-size: 12px; color: #666;">Select-Disabled</div>
          
          <!-- SM Size Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">SM Size</div>
          <div style="display: flex; justify-content: center;">
            <Checkbox size="sm" state="default" text="체크" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Checkbox size="sm" state="selected" text="체크" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Checkbox size="sm" state="disabled" text="체크" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Checkbox size="sm" state="select-disabled" text="체크" />
          </div>
          
          <!-- XS Size Row -->
          <div style="font-weight: 600; font-size: 12px; color: #666;">XS Size</div>
          <div style="display: flex; justify-content: center;">
            <Checkbox size="xs" state="default" text="체크" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Checkbox size="xs" state="selected" text="체크" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Checkbox size="xs" state="disabled" text="체크" />
          </div>
          <div style="display: flex; justify-content: center;">
            <Checkbox size="xs" state="select-disabled" text="체크" />
          </div>
        </div>
        
        <div style="margin-top: 32px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">디자인 토큰</h4>
          <div style="font-size: 12px; color: #666; line-height: 1.5;">
            • Default: 투명 배경, #707070 테두리<br>
            • Selected: #19973c 배경, 흰색 체크 아이콘<br>
            • Disabled: #f6f6f6 배경, #e1e1e1 테두리, #929292 텍스트<br>
            • Select-disabled: #b3b3b3 배경, 흰색 체크 아이콘, #929292 텍스트
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    controls: { disable: true }, // 정적 매트릭스이므로 Controls 비활성화
    docs: {
      description: {
        story: 'Figma 디자인 시스템의 모든 Checkbox 변형을 한눈에 확인할 수 있습니다.',
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
    // const checkbox = canvas.getByTestId('checkbox');
    // await userEvent.click(checkbox);
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
        story: '접근성 기능을 확인할 수 있는 스토리입니다. 키보드 내비게이션(Tab, Space, Enter)과 스크린 리더를 고려하여 제작되었습니다.',
      },
    },
  },
};