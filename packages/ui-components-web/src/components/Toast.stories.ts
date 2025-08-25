// src/components/Toast.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import Toast from './Toast.vue';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 토스트 메시지 컴포넌트입니다. 사용자에게 간단한 알림이나 피드백을 제공하는 데 사용됩니다.',
      },
    },
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: '토스트에 표시할 메시지',
      table: { category: 'Content' },
    },
    variant: {
      control: { type: 'select' },
      options: ['basic', 'success', 'warning', 'error'],
      description: '토스트의 시각적 변형',
      table: { category: 'Appearance' },
    },
    live: {
      control: { type: 'select' },
      options: ['polite', 'assertive', 'off'],
      description: 'ARIA live 속성 (접근성)',
      table: { category: 'Accessibility' },
    },
    visible: {
      control: { type: 'boolean' },
      description: '토스트 표시 여부',
      table: { category: 'State' },
    },
    'onClick': {
      description: '토스트 클릭 시 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onClose': {
      description: '토스트 닫기 이벤트',
      table: { category: 'Events' },
      control: false,
    },
  },
  args: {
    message: '텍스트를 입력해 주세요.',
    variant: 'basic',
    live: 'polite',
    visible: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls을 사용할 수 있는 기본 스토리
export const Playground: Story = {
  args: {
    message: '메시지를 수정해보세요!',
    variant: 'basic',
    live: 'polite',
    visible: true,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다. 메시지와 변형을 변경해보세요.',
      },
    },
  },
};

// Default - Figma 디자인의 기본 상태
export const Default: Story = {
  args: {
    message: '텍스트를 입력해 주세요.',
    variant: 'basic',
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 기본 상태입니다. 검정색 배경에 흰색 텍스트로 표시됩니다.',
      },
    },
  },
};

// All Variants - 모든 변형 비교
export const AllVariants: Story = {
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">Basic (기본)</h3>
          <Toast 
            message="기본 토스트 메시지입니다"
            variant="basic"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">Success (성공)</h3>
          <Toast 
            message="성공적으로 저장되었습니다"
            variant="success"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">Warning (경고)</h3>
          <Toast 
            message="주의가 필요한 사항입니다"
            variant="warning"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">Error (오류)</h3>
          <Toast 
            message="오류가 발생했습니다"
            variant="error"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 토스트 변형을 한 번에 비교할 수 있는 스토리입니다. 기본, 성공, 경고, 오류 상태를 보여줍니다.',
      },
    },
  },
};

// Success Variant
export const SuccessVariant: Story = {
  args: {
    message: '성공적으로 완료되었습니다!',
    variant: 'success',
  },
  parameters: {
    docs: {
      description: {
        story: '성공 상태를 나타내는 초록색 토스트입니다.',
      },
    },
  },
};

// Warning Variant
export const WarningVariant: Story = {
  args: {
    message: '경고: 확인이 필요합니다',
    variant: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: '경고 상태를 나타내는 주황색 토스트입니다.',
      },
    },
  },
};

// Error Variant
export const ErrorVariant: Story = {
  args: {
    message: '오류: 처리에 실패했습니다',
    variant: 'error',
  },
  parameters: {
    docs: {
      description: {
        story: '오류 상태를 나타내는 빨간색 토스트입니다.',
      },
    },
  },
};

// Long Message - 긴 메시지
export const LongMessage: Story = {
  args: {
    message: '이것은 매우 긴 토스트 메시지입니다. 여러 줄에 걸쳐 표시될 수 있으며, 사용자에게 상세한 정보를 제공하는 데 사용됩니다. 토스트는 자동으로 줄바꿈되어 표시됩니다.',
    variant: 'basic',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 메시지가 포함된 토스트입니다. 자동으로 줄바꿈되어 표시됩니다.',
      },
    },
  },
};

// Multiline Message - 여러 줄 메시지
export const MultilineMessage: Story = {
  args: {
    message: '첫 번째 줄\n두 번째 줄\n세 번째 줄',
    variant: 'basic',
  },
  parameters: {
    docs: {
      description: {
        story: '개행 문자가 포함된 여러 줄 메시지 토스트입니다.',
      },
    },
  },
};

// Short Message - 짧은 메시지
export const ShortMessage: Story = {
  args: {
    message: '완료',
    variant: 'success',
  },
  parameters: {
    docs: {
      description: {
        story: '매우 간단한 메시지를 가진 토스트입니다.',
      },
    },
  },
};

// Accessibility Test - 접근성 테스트
export const AccessibilityTest: Story = {
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">Polite (기본)</h3>
          <Toast 
            message="정중한 알림 메시지"
            variant="basic"
            live="polite"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">Assertive (중요)</h3>
          <Toast 
            message="즉시 알려야 할 중요한 메시지"
            variant="error"
            live="assertive"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">Off (비활성)</h3>
          <Toast 
            message="스크린 리더에 알리지 않는 메시지"
            variant="basic"
            live="off"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 ARIA live 설정을 보여주는 접근성 테스트 스토리입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 모든 토스트가 렌더링되었는지 확인
    const toasts = canvas.getAllByTestId('toast');
    await expect(toasts).toHaveLength(3);
    
    // 각 토스트의 ARIA 속성 확인
    const politeToast = toasts[0];
    const assertiveToast = toasts[1];
    const offToast = toasts[2];
    
    await expect(politeToast).toHaveAttribute('aria-live', 'polite');
    await expect(assertiveToast).toHaveAttribute('aria-live', 'assertive');
    await expect(offToast).toHaveAttribute('aria-live', 'off');
    
    // 모든 토스트가 role="alert"를 가지는지 확인
    await expect(politeToast).toHaveAttribute('role', 'alert');
    await expect(assertiveToast).toHaveAttribute('role', 'alert');
    await expect(offToast).toHaveAttribute('role', 'alert');
  },
};

// Interactive Test - 상호작용 테스트
export const InteractiveTest: Story = {
  args: {
    message: '클릭해보세요!',
    variant: 'basic',
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 이벤트를 테스트할 수 있는 인터랙티브 토스트입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 토스트 찾기
    const toast = canvas.getByTestId('toast');
    
    // 기본 상태 확인
    await expect(toast).toBeInTheDocument();
    await expect(toast).toHaveAttribute('role', 'alert');
    
    // 메시지 확인
    await expect(toast).toHaveTextContent('클릭해보세요!');
    
    // 클릭 테스트
    await userEvent.click(toast);
    
    // 호버 효과 테스트
    await userEvent.hover(toast);
    
    console.log('✅ Toast 상호작용 테스트 완료');
  },
};

// Real World Examples - 실제 사용 예시
export const RealWorldExamples: Story = {
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: center; padding: 24px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212; text-align: center;">파일 업로드 완료</h3>
          <Toast 
            message="파일이 성공적으로 업로드되었습니다."
            variant="success"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212; text-align: center;">네트워크 연결 오류</h3>
          <Toast 
            message="네트워크 연결을 확인해주세요."
            variant="error"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212; text-align: center;">자동 저장 알림</h3>
          <Toast 
            message="변경사항이 자동으로 저장되었습니다."
            variant="basic"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212; text-align: center;">세션 만료 경고</h3>
          <Toast 
            message="세션이 곧 만료됩니다. 작업을 저장해주세요."
            variant="warning"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212; text-align: center;">폼 검증 오류</h3>
          <Toast 
            message="필수 항목을 모두 입력해주세요:\\n- 이름\\n- 이메일\\n- 전화번호"
            variant="error"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 다양한 토스트 메시지 예시들입니다.',
      },
    },
  },
};

// Edge Cases - 엣지 케이스
export const EdgeCases: Story = {
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">빈 메시지</div>
          <Toast 
            message=""
            variant="basic"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">숫자 메시지</div>
          <Toast 
            message="404"
            variant="error"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">특수문자 메시지</div>
          <Toast 
            message="!@#$%^&*()_+-=[]{}|;:,.<>?"
            variant="basic"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">이모지 메시지</div>
          <Toast 
            message="🎉 축하합니다! 🚀"
            variant="success"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">HTML 텍스트 (이스케이프됨)</div>
          <Toast 
            message="<script>alert('test')</script>"
            variant="warning"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스를 테스트하는 스토리입니다.',
      },
    },
  },
};

// Performance Test - 성능 테스트
export const PerformanceTest: Story = {
  render: (args) => ({
    components: { Toast },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; padding: 20px; max-width: 800px;">
        <Toast 
          v-for="i in 20" 
          :key="i"
          :message="'토스트 메시지 ' + i"
          :variant="['basic', 'success', 'warning', 'error'][i % 4]"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '20개의 토스트를 렌더링하여 성능을 테스트하는 스토리입니다.',
      },
    },
  },
};