import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from 'storybook/test'
import { ref } from 'vue'
import Funnel from './Funnel.vue'
import FunnelStep from './FunnelStep.vue'

const meta = {
  title: 'Components/Funnel',
  component: Funnel as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Funnel 컴포넌트는 다단계 프로세스(회원가입, 결제, 온보딩 등)를 관리하는 컴포넌트입니다.

**주요 특징:**
- **useFunnel Composable 기반**: Vue 3 Composition API 활용
- **타입 안전성**: TypeScript 완전 지원
- **상태 관리**: 단계별 데이터 보존 및 validation
- **디버깅**: 단계 히스토리 및 상태 추적
- **접근성**: ARIA 속성 및 키보드 네비게이션 지원

**두 가지 사용 방식:**
1. **Declarative**: Funnel + FunnelStep 컴포넌트 조합
2. **Programmatic**: useFunnel composable 직접 사용

**localStorage 지원으로 새로고침 시에도 진행 상태가 유지됩니다.**
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: 'object',
      description: '단계들의 배열입니다.',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    initialStep: {
      control: 'text',
      description: '초기 단계를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'steps[0]' },
      },
    },
    currentStep: {
      control: 'text',
      description: '현재 단계를 외부에서 제어할 때 사용합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    preserveData: {
      control: 'boolean',
      description: 'localStorage에 상태를 저장할지 여부입니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    debug: {
      control: 'boolean',
      description: '디버그 모드를 활성화합니다.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    validation: {
      control: 'object',
      description: '각 단계별 validation 함수들입니다.',
      table: {
        type: { summary: 'Record<string, (data: any) => boolean | Promise<boolean>>' },
      },
    },
    onStepChange: {
      description: '단계 변경 시 호출되는 콜백함수입니다.',
      table: {
        type: { summary: '(from: string, to: string) => void' },
      },
    },
  },
  args: {
    'onUpdate:currentStep': fn(),
    'onStep-change': fn(),
    'onStep-complete': fn(),
    'onFunnel-complete': fn(),
  },
} satisfies Meta<typeof Funnel>

export default meta
type Story = StoryObj<typeof meta>

// 기본 예시
export const Default: Story = {
  args: {
    steps: ['step1', 'step2', 'step3'],
  },
  render: (args) => ({
    components: { Funnel },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <Funnel v-bind="args">
          <template #default="{ currentStep, goNext, goPrev, canGoNext, canGoPrev, progress }">
            <div style="margin-bottom: 20px;">
              <div style="height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden;">
                <div
                  style="height: 100%; background: #22c55e; transition: width 0.3s ease;"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
              <p style="margin: 8px 0; font-size: 14px; color: #666;">
                진행률: {{ progress }}%
              </p>
            </div>

            <div style="min-height: 200px; padding: 20px; background: #f9f9f9; border-radius: 4px; margin-bottom: 20px;">
              <h3 style="margin: 0 0 16px 0;">{{ currentStep }}</h3>

              <div v-if="currentStep === 'step1'">
                <p>첫 번째 단계입니다.</p>
                <p>여기서 기본 정보를 입력받습니다.</p>
              </div>

              <div v-if="currentStep === 'step2'">
                <p>두 번째 단계입니다.</p>
                <p>추가 정보를 입력받습니다.</p>
              </div>

              <div v-if="currentStep === 'step3'">
                <p>마지막 단계입니다.</p>
                <p>입력한 정보를 확인합니다.</p>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <button
                @click="goPrev"
                :disabled="!canGoPrev"
                style="padding: 8px 16px; border: 1px solid #ccc; background: white; border-radius: 4px; cursor: pointer;"
                :style="{ opacity: canGoPrev ? 1 : 0.5, cursor: canGoPrev ? 'pointer' : 'not-allowed' }"
              >
                이전
              </button>
              <button
                @click="goNext"
                :disabled="!canGoNext"
                style="padding: 8px 16px; border: none; background: #22c55e; color: white; border-radius: 4px; cursor: pointer;"
                :style="{ opacity: canGoNext ? 1 : 0.5, cursor: canGoNext ? 'pointer' : 'not-allowed' }"
              >
                다음
              </button>
            </div>
          </template>
        </Funnel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '기본적인 Funnel 컴포넌트 사용 예시입니다. 3단계로 구성되어 있으며 진행률 표시와 네비게이션 버튼을 포함합니다.',
      },
    },
  },
}

// 회원가입 플로우 예시
export const SignupFlow: Story = {
  args: {
    steps: ['personal', 'business', 'verification'],
    validation: {
      personal: (data: any) => data?.name && data?.email,
      business: (data: any) => data?.company && data?.position,
    },
  },
  render: (args) => ({
    components: { Funnel },
    setup() {
      const personalData = ref({ name: '', email: '' })
      const businessData = ref({ company: '', position: '' })
      const verificationData = ref({ code: '' })

      return {
        args,
        personalData,
        businessData,
        verificationData
      }
    },
    template: `
      <div style="width: 600px; padding: 32px; border: 1px solid #e0e0e0; border-radius: 12px; background: white;">
        <h2 style="margin: 0 0 24px 0; text-align: center; color: #333;">회원가입</h2>

        <Funnel v-bind="args">
          <template #default="{
            currentStep,
            currentStepIndex,
            goNext,
            goPrev,
            canGoNext,
            canGoPrev,
            progress,
            setStepData,
            getStepData
          }">
            <!-- 단계 표시 -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 32px;">
              <div
                v-for="(step, index) in ['개인정보', '회사정보', '인증']"
                :key="index"
                style="flex: 1; text-align: center; position: relative;"
              >
                <div
                  style="width: 32px; height: 32px; border-radius: 50%; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-weight: 600; transition: all 0.3s ease;"
                  :style="{
                    background: index <= currentStepIndex ? '#22c55e' : '#e5e7eb',
                    color: index <= currentStepIndex ? 'white' : '#9ca3af'
                  }"
                >
                  {{ index + 1 }}
                </div>
                <span
                  style="font-size: 12px; transition: color 0.3s ease;"
                  :style="{ color: index === currentStepIndex ? '#22c55e' : '#6b7280' }"
                >
                  {{ step }}
                </span>
                <div
                  v-if="index < 2"
                  style="position: absolute; top: 16px; left: calc(50% + 16px); right: calc(-50% + 16px); height: 2px; transition: background 0.3s ease;"
                  :style="{ background: index < currentStepIndex ? '#22c55e' : '#e5e7eb' }"
                ></div>
              </div>
            </div>

            <!-- 진행률 바 -->
            <div style="margin-bottom: 32px;">
              <div style="height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden;">
                <div
                  style="height: 100%; background: linear-gradient(90deg, #22c55e, #16a34a); transition: width 0.5s ease;"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
            </div>

            <!-- 단계별 컨텐츠 -->
            <div style="min-height: 300px; margin-bottom: 32px;">
              <!-- 개인정보 단계 -->
              <div v-if="currentStep === 'personal'">
                <h3 style="margin: 0 0 24px 0; color: #1f2937;">개인정보 입력</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #374151;">이름 *</label>
                    <input
                      v-model="personalData.name"
                      @input="setStepData('personal', personalData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #374151;">이메일 *</label>
                    <input
                      v-model="personalData.email"
                      @input="setStepData('personal', personalData)"
                      type="email"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                      placeholder="이메일을 입력하세요"
                    />
                  </div>
                </div>
              </div>

              <!-- 회사정보 단계 -->
              <div v-if="currentStep === 'business'">
                <h3 style="margin: 0 0 24px 0; color: #1f2937;">회사정보 입력</h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #374151;">회사명 *</label>
                    <input
                      v-model="businessData.company"
                      @input="setStepData('business', businessData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                      placeholder="회사명을 입력하세요"
                    />
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #374151;">직책 *</label>
                    <input
                      v-model="businessData.position"
                      @input="setStepData('business', businessData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px;"
                      placeholder="직책을 입력하세요"
                    />
                  </div>
                </div>
              </div>

              <!-- 인증 단계 -->
              <div v-if="currentStep === 'verification'">
                <h3 style="margin: 0 0 24px 0; color: #1f2937;">이메일 인증</h3>
                <div style="padding: 20px; background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 0; color: #0c4a6e; font-size: 14px;">
                    <strong>{{ getStepData('personal')?.email }}</strong>로 인증코드를 발송했습니다.
                  </p>
                </div>
                <div>
                  <label style="display: block; margin-bottom: 4px; font-weight: 500; color: #374151;">인증코드</label>
                  <input
                    v-model="verificationData.code"
                    @input="setStepData('verification', verificationData)"
                    style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; text-align: center; letter-spacing: 2px;"
                    placeholder="6자리 인증코드를 입력하세요"
                    maxlength="6"
                  />
                </div>
              </div>
            </div>

            <!-- 네비게이션 -->
            <div style="display: flex; justify-content: space-between;">
              <button
                @click="goPrev"
                :disabled="!canGoPrev"
                style="padding: 12px 24px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-weight: 500; transition: all 0.2s ease;"
                :style="{
                  opacity: canGoPrev ? 1 : 0.5,
                  cursor: canGoPrev ? 'pointer' : 'not-allowed',
                  color: canGoPrev ? '#374151' : '#9ca3af'
                }"
              >
                이전
              </button>
              <button
                @click="goNext"
                :disabled="!canGoNext"
                style="padding: 12px 24px; border: none; background: #22c55e; color: white; border-radius: 6px; font-weight: 500; transition: all 0.2s ease;"
                :style="{
                  opacity: canGoNext ? 1 : 0.5,
                  cursor: canGoNext ? 'pointer' : 'not-allowed',
                  background: canGoNext ? '#22c55e' : '#94a3b8'
                }"
              >
                {{ currentStep === 'verification' ? '가입완료' : '다음' }}
              </button>
            </div>
          </template>
        </Funnel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 회원가입 플로우를 구현한 예시입니다. validation, 단계별 데이터 저장, 진행률 표시 등의 기능을 포함합니다.',
      },
    },
  },
}

// FunnelStep 컴포넌트 사용 예시
export const WithFunnelStep: Story = {
  args: {
    steps: ['intro', 'settings', 'complete'],
  },
  render: (args) => ({
    components: { Funnel, FunnelStep },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 500px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <Funnel v-bind="args">
          <template #default="{ progress }">
            <div style="margin-bottom: 20px;">
              <div style="height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden;">
                <div
                  style="height: 100%; background: #8b5cf6; transition: width 0.3s ease;"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
            </div>
          </template>

          <FunnelStep name="intro">
            <template #default="{ goNext, canGoNext }">
              <div style="text-align: center; padding: 40px 20px;">
                <h2 style="margin: 0 0 16px 0; color: #8b5cf6;">환영합니다!</h2>
                <p style="margin: 0 0 32px 0; color: #6b7280;">
                  서비스 설정을 시작하겠습니다.
                </p>
                <button
                  @click="goNext"
                  style="padding: 12px 32px; background: #8b5cf6; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer;"
                >
                  시작하기
                </button>
              </div>
            </template>
          </FunnelStep>

          <FunnelStep name="settings">
            <template #default="{ goNext, goPrev, setStepData }">
              <div style="padding: 20px;">
                <h3 style="margin: 0 0 20px 0; color: #8b5cf6;">기본 설정</h3>
                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px;">
                  <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" style="margin: 0;" />
                    <span>알림 받기</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" style="margin: 0;" />
                    <span>마케팅 정보 수신</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px;">
                    <input type="checkbox" style="margin: 0;" />
                    <span>자동 업데이트</span>
                  </label>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <button
                    @click="goPrev"
                    style="padding: 8px 16px; border: 1px solid #d1d5db; background: white; border-radius: 4px; cursor: pointer;"
                  >
                    이전
                  </button>
                  <button
                    @click="goNext"
                    style="padding: 8px 16px; background: #8b5cf6; color: white; border: none; border-radius: 4px; cursor: pointer;"
                  >
                    완료
                  </button>
                </div>
              </div>
            </template>
          </FunnelStep>

          <FunnelStep name="complete">
            <template #default="{ reset }">
              <div style="text-align: center; padding: 40px 20px;">
                <div style="width: 64px; height: 64px; margin: 0 auto 16px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 24px;">✓</span>
                </div>
                <h2 style="margin: 0 0 16px 0; color: #10b981;">설정 완료!</h2>
                <p style="margin: 0 0 32px 0; color: #6b7280;">
                  모든 설정이 완료되었습니다.
                </p>
                <button
                  @click="reset"
                  style="padding: 12px 32px; border: 1px solid #d1d5db; background: white; border-radius: 6px; cursor: pointer;"
                >
                  다시 시작
                </button>
              </div>
            </template>
          </FunnelStep>
        </Funnel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'FunnelStep 컴포넌트를 사용한 예시입니다. 각 단계를 개별 컴포넌트로 분리하여 관리할 수 있습니다.',
      },
    },
  },
}

// Validation 예시
export const WithValidation: Story = {
  args: {
    steps: ['email', 'password', 'confirm'],
    validation: {
      email: (data: any) => data?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
      password: (data: any) => data?.password && data.password.length >= 8,
    },
  },
  render: (args) => ({
    components: { Funnel },
    setup() {
      const emailData = ref({ email: '' })
      const passwordData = ref({ password: '', confirmPassword: '' })

      return {
        args,
        emailData,
        passwordData
      }
    },
    template: `
      <div style="width: 500px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <Funnel v-bind="args">
          <template #default="{
            currentStep,
            goNext,
            goPrev,
            canGoNext,
            canGoPrev,
            setStepData,
            progress
          }">
            <div style="margin-bottom: 20px;">
              <div style="height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden;">
                <div
                  style="height: 100%; background: #ef4444; transition: width 0.3s ease;"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
            </div>

            <div style="min-height: 200px; margin-bottom: 20px;">
              <!-- 이메일 단계 -->
              <div v-if="currentStep === 'email'">
                <h3 style="margin: 0 0 16px 0;">이메일 입력</h3>
                <div>
                  <label style="display: block; margin-bottom: 4px; font-weight: 500;">이메일 주소</label>
                  <input
                    v-model="emailData.email"
                    @input="setStepData('email', emailData)"
                    type="email"
                    style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px; margin-bottom: 8px;"
                    placeholder="이메일을 입력하세요"
                  />
                  <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    유효한 이메일 주소를 입력해야 다음 단계로 이동할 수 있습니다.
                  </p>
                </div>
              </div>

              <!-- 비밀번호 단계 -->
              <div v-if="currentStep === 'password'">
                <h3 style="margin: 0 0 16px 0;">비밀번호 설정</h3>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">비밀번호</label>
                    <input
                      v-model="passwordData.password"
                      @input="setStepData('password', passwordData)"
                      type="password"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="비밀번호를 입력하세요"
                    />
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">비밀번호 확인</label>
                    <input
                      v-model="passwordData.confirmPassword"
                      @input="setStepData('password', passwordData)"
                      type="password"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="비밀번호를 다시 입력하세요"
                    />
                  </div>
                  <p style="margin: 0; font-size: 12px; color: #6b7280;">
                    비밀번호는 최소 8자 이상이어야 합니다.
                  </p>
                </div>
              </div>

              <!-- 확인 단계 -->
              <div v-if="currentStep === 'confirm'">
                <h3 style="margin: 0 0 16px 0;">가입 정보 확인</h3>
                <div style="padding: 16px; background: #f9fafb; border-radius: 6px;">
                  <p style="margin: 0 0 8px 0;"><strong>이메일:</strong> {{ emailData.email }}</p>
                  <p style="margin: 0;"><strong>비밀번호:</strong> ••••••••</p>
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <button
                @click="goPrev"
                :disabled="!canGoPrev"
                style="padding: 8px 16px; border: 1px solid #ccc; background: white; border-radius: 4px; cursor: pointer;"
                :style="{ opacity: canGoPrev ? 1 : 0.5, cursor: canGoPrev ? 'pointer' : 'not-allowed' }"
              >
                이전
              </button>
              <button
                @click="goNext"
                :disabled="!canGoNext"
                style="padding: 8px 16px; border: none; background: #ef4444; color: white; border-radius: 4px; cursor: pointer;"
                :style="{ opacity: canGoNext ? 1 : 0.5, cursor: canGoNext ? 'pointer' : 'not-allowed' }"
              >
                {{ currentStep === 'confirm' ? '가입하기' : '다음' }}
              </button>
            </div>
          </template>
        </Funnel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Validation 기능을 활용한 예시입니다. 각 단계에서 입력 검증을 통과해야만 다음 단계로 이동할 수 있습니다.',
      },
    },
  },
}

// 이벤트 핸들링 예시
export const WithEvents: Story = {
  args: {
    steps: ['start', 'middle', 'end'],
  },
  render: (args) => ({
    components: { Funnel },
    setup() {
      const events = ref<string[]>([])

      const addEvent = (event: string) => {
        events.value.push(`${new Date().toLocaleTimeString()}: ${event}`)
      }

      return {
        args,
        events,
        addEvent
      }
    },
    template: `
      <div style="display: flex; gap: 24px;">
        <div style="flex: 1; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <Funnel
            v-bind="args"
            @step-change="(from, to) => addEvent(\`Step changed: \${from} → \${to}\`)"
            @step-complete="(step, data) => addEvent(\`Step completed: \${step}\`)"
            @funnel-complete="(data) => addEvent('Funnel completed!')"
          >
            <template #default="{ currentStep, goNext, goPrev, canGoNext, canGoPrev, setStepData }">
              <div style="text-align: center; padding: 40px 20px;">
                <h3 style="margin: 0 0 16px 0;">{{ currentStep.toUpperCase() }}</h3>
                <p style="margin: 0 0 32px 0; color: #6b7280;">
                  현재 {{ currentStep }} 단계입니다.
                </p>

                <div style="display: flex; justify-content: center; gap: 12px;">
                  <button
                    @click="() => { setStepData(currentStep, { timestamp: Date.now() }); goPrev(); }"
                    :disabled="!canGoPrev"
                    style="padding: 8px 16px; border: 1px solid #ccc; background: white; border-radius: 4px; cursor: pointer;"
                    :style="{ opacity: canGoPrev ? 1 : 0.5 }"
                  >
                    이전
                  </button>
                  <button
                    @click="() => { setStepData(currentStep, { timestamp: Date.now() }); goNext(); }"
                    :disabled="!canGoNext"
                    style="padding: 8px 16px; border: none; background: #6366f1; color: white; border-radius: 4px; cursor: pointer;"
                    :style="{ opacity: canGoNext ? 1 : 0.5 }"
                  >
                    {{ currentStep === 'end' ? '완료' : '다음' }}
                  </button>
                </div>
              </div>
            </template>
          </Funnel>
        </div>

        <div style="flex: 1; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; background: #f9fafb;">
          <h4 style="margin: 0 0 16px 0;">이벤트 로그</h4>
          <div style="max-height: 300px; overflow-y: auto;">
            <div
              v-for="(event, index) in events"
              :key="index"
              style="padding: 4px 0; font-size: 12px; font-family: monospace; color: #374151; border-bottom: 1px solid #e5e7eb;"
            >
              {{ event }}
            </div>
            <div v-if="events.length === 0" style="color: #9ca3af; font-style: italic; font-size: 14px;">
              이벤트가 여기에 표시됩니다...
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
        story: 'Funnel의 다양한 이벤트들을 실시간으로 확인할 수 있는 예시입니다.',
      },
    },
  },
}

// 복잡한 결제 플로우
export const CheckoutFlow: Story = {
  args: {
    steps: ['cart', 'shipping', 'payment', 'confirmation'],
    validation: {
      shipping: (data: any) => data?.address && data?.city && data?.zipCode,
      payment: (data: any) => data?.cardNumber && data?.expiryDate && data?.cvv,
    },
  },
  render: (args) => ({
    components: { Funnel },
    setup() {
      const cartItems = ref([
        { id: 1, name: '무선 헤드폰', price: 150000, quantity: 1 },
        { id: 2, name: '스마트워치', price: 280000, quantity: 1 },
      ])

      const shippingData = ref({
        address: '',
        city: '',
        zipCode: '',
        deliveryOption: 'standard'
      })

      const paymentData = ref({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
      })

      const total = ref(430000)

      return {
        args,
        cartItems,
        shippingData,
        paymentData,
        total
      }
    },
    template: `
      <div style="max-width: 800px; margin: 0 auto; padding: 24px;">
        <h1 style="margin: 0 0 32px 0; text-align: center; color: #1f2937;">결제하기</h1>

        <Funnel v-bind="args">
          <template #default="{
            currentStep,
            currentStepIndex,
            goNext,
            goPrev,
            canGoNext,
            canGoPrev,
            setStepData,
            progress
          }">
            <!-- 단계 헤더 -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 32px; padding: 0 20px;">
              <div
                v-for="(step, index) in [
                  { key: 'cart', label: '장바구니' },
                  { key: 'shipping', label: '배송정보' },
                  { key: 'payment', label: '결제정보' },
                  { key: 'confirmation', label: '주문완료' }
                ]"
                :key="index"
                style="flex: 1; text-align: center; position: relative;"
              >
                <div
                  style="width: 40px; height: 40px; border-radius: 50%; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; font-weight: 600; transition: all 0.3s ease; border: 2px solid;"
                  :style="{
                    background: index <= currentStepIndex ? '#3b82f6' : 'white',
                    color: index <= currentStepIndex ? 'white' : '#9ca3af',
                    borderColor: index <= currentStepIndex ? '#3b82f6' : '#e5e7eb'
                  }"
                >
                  {{ index + 1 }}
                </div>
                <span
                  style="font-size: 13px; font-weight: 500; transition: color 0.3s ease;"
                  :style="{ color: index === currentStepIndex ? '#3b82f6' : '#6b7280' }"
                >
                  {{ step.label }}
                </span>
                <div
                  v-if="index < 3"
                  style="position: absolute; top: 20px; left: calc(50% + 20px); right: calc(-50% + 20px); height: 2px; transition: background 0.3s ease;"
                  :style="{ background: index < currentStepIndex ? '#3b82f6' : '#e5e7eb' }"
                ></div>
              </div>
            </div>

            <div style="background: white; border-radius: 12px; border: 1px solid #e5e7eb; min-height: 400px;">
              <!-- 장바구니 단계 -->
              <div v-if="currentStep === 'cart'" style="padding: 32px;">
                <h2 style="margin: 0 0 24px 0; color: #1f2937;">장바구니</h2>
                <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
                  <div
                    v-for="item in cartItems"
                    :key="item.id"
                    style="display: flex; justify-content: between; align-items: center; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;"
                  >
                    <div style="flex: 1;">
                      <h4 style="margin: 0 0 4px 0;">{{ item.name }}</h4>
                      <p style="margin: 0; color: #6b7280; font-size: 14px;">수량: {{ item.quantity }}</p>
                    </div>
                    <div style="text-align: right; font-weight: 600; color: #1f2937;">
                      {{ item.price.toLocaleString() }}원
                    </div>
                  </div>
                </div>
                <div style="border-top: 2px solid #e5e7eb; padding-top: 16px; text-align: right;">
                  <div style="font-size: 18px; font-weight: 700; color: #1f2937;">
                    총 {{ total.toLocaleString() }}원
                  </div>
                </div>
              </div>

              <!-- 배송정보 단계 -->
              <div v-if="currentStep === 'shipping'" style="padding: 32px;">
                <h2 style="margin: 0 0 24px 0; color: #1f2937;">배송정보</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                  <div style="grid-column: 1 / -1;">
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">주소 *</label>
                    <input
                      v-model="shippingData.address"
                      @input="setStepData('shipping', shippingData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="주소를 입력하세요"
                    />
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">도시 *</label>
                    <input
                      v-model="shippingData.city"
                      @input="setStepData('shipping', shippingData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="도시"
                    />
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">우편번호 *</label>
                    <input
                      v-model="shippingData.zipCode"
                      @input="setStepData('shipping', shippingData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="12345"
                    />
                  </div>
                </div>
                <div>
                  <label style="display: block; margin-bottom: 8px; font-weight: 500;">배송 옵션</label>
                  <div style="display: flex; gap: 16px;">
                    <label style="display: flex; align-items: center; gap: 8px;">
                      <input
                        v-model="shippingData.deliveryOption"
                        value="standard"
                        type="radio"
                        @change="setStepData('shipping', shippingData)"
                      />
                      <span>일반배송 (2-3일)</span>
                    </label>
                    <label style="display: flex; align-items: center; gap: 8px;">
                      <input
                        v-model="shippingData.deliveryOption"
                        value="express"
                        type="radio"
                        @change="setStepData('shipping', shippingData)"
                      />
                      <span>빠른배송 (1일) +3,000원</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- 결제정보 단계 -->
              <div v-if="currentStep === 'payment'" style="padding: 32px;">
                <h2 style="margin: 0 0 24px 0; color: #1f2937;">결제정보</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div style="grid-column: 1 / -1;">
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">카드번호 *</label>
                    <input
                      v-model="paymentData.cardNumber"
                      @input="setStepData('payment', paymentData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="1234 5678 9012 3456"
                      maxlength="19"
                    />
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">유효기간 *</label>
                    <input
                      v-model="paymentData.expiryDate"
                      @input="setStepData('payment', paymentData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="MM/YY"
                      maxlength="5"
                    />
                  </div>
                  <div>
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">CVV *</label>
                    <input
                      v-model="paymentData.cvv"
                      @input="setStepData('payment', paymentData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="123"
                      maxlength="3"
                    />
                  </div>
                  <div style="grid-column: 1 / -1;">
                    <label style="display: block; margin-bottom: 4px; font-weight: 500;">카드소유자명</label>
                    <input
                      v-model="paymentData.cardholderName"
                      @input="setStepData('payment', paymentData)"
                      style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 6px;"
                      placeholder="카드에 표시된 이름"
                    />
                  </div>
                </div>
              </div>

              <!-- 주문완료 단계 -->
              <div v-if="currentStep === 'confirmation'" style="padding: 32px; text-align: center;">
                <div style="width: 80px; height: 80px; margin: 0 auto 24px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-size: 32px;">✓</span>
                </div>
                <h2 style="margin: 0 0 16px 0; color: #10b981;">주문이 완료되었습니다!</h2>
                <p style="margin: 0 0 8px 0; color: #6b7280;">주문번호: #ORD-2024-001234</p>
                <p style="margin: 0 0 24px 0; color: #6b7280;">
                  확인 이메일이 발송되었습니다.
                </p>
                <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: left;">
                  <h4 style="margin: 0 0 12px 0;">주문 요약</h4>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>상품 금액</span>
                    <span>{{ total.toLocaleString() }}원</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>배송비</span>
                    <span>{{ shippingData.deliveryOption === 'express' ? '3,000' : '0' }}원</span>
                  </div>
                  <div style="border-top: 1px solid #d1d5db; padding-top: 8px; display: flex; justify-content: space-between; font-weight: 600;">
                    <span>총 결제금액</span>
                    <span>{{ (total + (shippingData.deliveryOption === 'express' ? 3000 : 0)).toLocaleString() }}원</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 네비게이션 -->
            <div style="display: flex; justify-content: space-between; margin-top: 24px;" v-if="currentStep !== 'confirmation'">
              <button
                @click="goPrev"
                :disabled="!canGoPrev"
                style="padding: 12px 24px; border: 1px solid #d1d5db; background: white; border-radius: 6px; font-weight: 500; transition: all 0.2s ease;"
                :style="{
                  opacity: canGoPrev ? 1 : 0.5,
                  cursor: canGoPrev ? 'pointer' : 'not-allowed'
                }"
              >
                이전
              </button>
              <button
                @click="goNext"
                :disabled="!canGoNext"
                style="padding: 12px 32px; border: none; background: #3b82f6; color: white; border-radius: 6px; font-weight: 500; transition: all 0.2s ease;"
                :style="{
                  opacity: canGoNext ? 1 : 0.5,
                  cursor: canGoNext ? 'pointer' : 'not-allowed'
                }"
              >
                {{ currentStep === 'payment' ? '결제하기' : '다음' }}
              </button>
            </div>
          </template>
        </Funnel>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: '실제 e-commerce 사이트의 결제 플로우를 구현한 복합적인 예시입니다.',
      },
    },
  },
}

// 디버그 모드
export const DebugMode: Story = {
  args: {
    steps: ['debug1', 'debug2', 'debug3'],
    debug: true,
  },
  render: (args) => ({
    components: { Funnel },
    setup() {
      return {
        args
      }
    },
    template: `
      <div style="width: 500px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="margin-bottom: 16px; padding: 12px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>디버그 모드:</strong> 브라우저 콘솔을 열어 로그를 확인하세요.
          </p>
        </div>

        <Funnel v-bind="args">
          <template #default="{ currentStep, goNext, goPrev, canGoNext, canGoPrev, getDebugInfo, setStepData }">
            <div style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border-radius: 6px;">
              <h4 style="margin: 0 0 8px 0;">디버그 정보</h4>
              <pre style="margin: 0; font-size: 12px; color: #475569; overflow: auto;">{{ JSON.stringify(getDebugInfo(), null, 2) }}</pre>
            </div>

            <div style="text-align: center; padding: 40px 20px;">
              <h3 style="margin: 0 0 16px 0;">{{ currentStep.toUpperCase() }}</h3>
              <p style="margin: 0 0 32px 0; color: #6b7280;">
                디버그 모드에서 {{ currentStep }} 단계입니다.
              </p>

              <button
                @click="() => {
                  const debugData = { debugData: Math.random(), timestamp: Date.now() };
                  setStepData(currentStep, debugData);
                  console.log('Debug: Step data set', { step: currentStep, data: debugData });
                }"
                style="margin-bottom: 16px; padding: 8px 16px; background: #f59e0b; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;"
              >
                랜덤 데이터 추가 (콘솔 확인)
              </button>

              <div style="display: flex; justify-content: center; gap: 12px;">
                <button
                  @click="goPrev"
                  :disabled="!canGoPrev"
                  style="padding: 8px 16px; border: 1px solid #ccc; background: white; border-radius: 4px; cursor: pointer;"
                  :style="{ opacity: canGoPrev ? 1 : 0.5 }"
                >
                  이전
                </button>
                <button
                  @click="goNext"
                  :disabled="!canGoNext"
                  style="padding: 8px 16px; border: none; background: #6366f1; color: white; border-radius: 4px; cursor: pointer;"
                  :style="{ opacity: canGoNext ? 1 : 0.5 }"
                >
                  다음
                </button>
              </div>
            </div>
          </template>
        </Funnel>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '디버그 모드를 활성화한 예시입니다. 브라우저 개발자 도구의 콘솔에서 상세한 로그를 확인할 수 있습니다.',
      },
    },
  },
}