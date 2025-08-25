// src/components/TextInput.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import TextInput from './TextInput.vue';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  tags: ['autodocs'],
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 텍스트 입력 컴포넌트입니다. 일반 입력 필드와 텍스트 영역을 지원하며, 문자 수 제한, 에러 상태, 클리어 버튼 등의 기능을 제공합니다.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: 'v-model 바인딩을 위한 입력값',
      table: { category: 'Model' },
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'textarea'],
      description: '입력 필드 타입',
      table: { category: 'Appearance' },
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
      table: { category: 'Content' },
    },
    label: {
      control: { type: 'text' },
      description: '입력 필드 라벨',
      table: { category: 'Content' },
    },
    helperText: {
      control: { type: 'text' },
      description: '도움말 텍스트',
      table: { category: 'Content' },
    },
    errorMessage: {
      control: { type: 'text' },
      description: '에러 메시지 (helperText보다 우선)',
      table: { category: 'Validation' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
      table: { category: 'State' },
    },
    readonly: {
      control: { type: 'boolean' },
      description: '읽기 전용 상태',
      table: { category: 'State' },
    },
    maxLength: {
      control: { type: 'number', min: 0 },
      description: '최대 입력 길이',
      table: { category: 'Validation' },
    },
    clearable: {
      control: { type: 'boolean' },
      description: '클리어 버튼 표시',
      table: { category: 'Features' },
    },
    showCharCount: {
      control: { type: 'boolean' },
      description: '문자 수 표시',
      table: { category: 'Features' },
    },
    rows: {
      control: { type: 'number', min: 1 },
      description: 'textarea의 행 수',
      table: { category: 'Appearance' },
    },
    'onUpdate:modelValue': {
      description: 'v-model을 위한 값 변경 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onFocus': {
      description: '포커스 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onBlur': {
      description: '블러 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onInput': {
      description: '입력 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onClear': {
      description: '클리어 버튼 클릭 이벤트',
      table: { category: 'Events' },
      control: false,
    },
  },
  args: {
    modelValue: '',
    type: 'text',
    placeholder: '',
    disabled: false,
    readonly: false,
    clearable: false,
    showCharCount: true,
    maxLength: 50,
    rows: 4,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls을 사용할 수 있는 기본 스토리
export const Playground: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    label: '레이블',
    helperText: '도움말 텍스트입니다',
    clearable: true,
    showCharCount: true,
    maxLength: 100,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다. 다양한 설정을 변경해보며 컴포넌트의 동작을 확인해보세요.',
      },
    },
  },
};

// Default - Figma 디자인의 기본 상태
export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    label: '레이블',
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 기본 상태입니다. 라벨과 플레이스홀더가 포함되어 있습니다.',
      },
    },
  },
};

// With Character Count - 문자 수 표시
export const WithCharacterCount: Story = {
  args: {
    placeholder: '입력하세요 (최대 50자)',
    label: '레이블',
    showCharCount: true,
    maxLength: 50,
    modelValue: '입력된 텍스트 입니다',
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 문자 수 표시 기능입니다. 현재 입력된 문자 수와 최대 문자 수를 보여줍니다.',
      },
    },
  },
};

// Error State - 에러 상태
export const ErrorState: Story = {
  args: {
    placeholder: '올바른 값을 입력하세요',
    label: '레이블',
    errorMessage: '입력값 텍스트 입니다',
    showCharCount: true,
    maxLength: 50,
    modelValue: '입력된 텍스트 입니다',
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 에러 상태입니다. 입력값에 문제가 있을 때 빨간색 테두리와 에러 메시지를 표시합니다.',
      },
    },
  },
};

// Disabled State - 비활성화 상태
export const DisabledState: Story = {
  args: {
    placeholder: '비활성화된 입력 필드',
    label: '레이블',
    disabled: true,
    modelValue: '입력된 텍스트 입니다',
    showCharCount: true,
    maxLength: 50,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태입니다. 사용자가 입력할 수 없으며 회색으로 표시됩니다.',
      },
    },
  },
};

// Textarea Type - 텍스트 영역
export const TextareaType: Story = {
  args: {
    type: 'textarea',
    placeholder: '여러 줄 텍스트를 입력하세요',
    label: '레이블',
    rows: 4,
    showCharCount: true,
    maxLength: 200,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'textarea 타입입니다. 여러 줄의 텍스트를 입력할 수 있습니다.',
      },
    },
  },
};

// All States Comparison - 모든 상태 비교
export const AllStatesComparison: Story = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; min-width: 320px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">기본 상태</h3>
          <TextInput 
            label="레이블"
            placeholder="내용을 입력하세요"
            :showCharCount="true"
            :maxLength="50"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">포커스 상태 (클릭해보세요)</h3>
          <TextInput 
            label="레이블"
            placeholder="클릭하여 포커스"
            modelValue="입력된 텍스트 입니다"
            :showCharCount="true"
            :maxLength="50"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">에러 상태</h3>
          <TextInput 
            label="레이블"
            placeholder="올바른 값을 입력하세요"
            errorMessage="입력값 텍스트 입니다"
            modelValue="입력된 텍스트 입니다"
            :showCharCount="true"
            :maxLength="50"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">비활성화 상태</h3>
          <TextInput 
            label="레이블"
            placeholder="비활성화된 입력 필드"
            modelValue="입력된 텍스트 입니다"
            :disabled="true"
            :showCharCount="true"
            :maxLength="50"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 모든 상태(기본, 포커스, 에러, 비활성화)를 나란히 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// Input Types Comparison - 입력 타입 비교
export const InputTypesComparison: Story = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; min-width: 320px;">
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Text Input</div>
          <TextInput 
            type="text"
            label="텍스트 입력"
            placeholder="일반 텍스트를 입력하세요"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Password Input</div>
          <TextInput 
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Email Input</div>
          <TextInput 
            type="email"
            label="이메일"
            placeholder="이메일을 입력하세요"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Number Input</div>
          <TextInput 
            type="number"
            label="숫자"
            placeholder="숫자를 입력하세요"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">Textarea</div>
          <TextInput 
            type="textarea"
            label="긴 텍스트"
            placeholder="여러 줄 텍스트를 입력하세요"
            :rows="3"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 입력 타입을 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// With Clearable - 클리어 버튼 기능
export const WithClearable: Story = {
  args: {
    placeholder: '입력 후 X 버튼을 확인하세요',
    label: '클리어 가능한 입력',
    clearable: true,
    modelValue: '클리어 버튼을 클릭해보세요',
  },
  parameters: {
    docs: {
      description: {
        story: '클리어 버튼 기능을 보여주는 스토리입니다. 입력값이 있을 때 X 버튼을 클릭하면 내용이 지워집니다.',
      },
    },
  },
};

// With Helper Text - 도움말 텍스트
export const WithHelperText: Story = {
  args: {
    placeholder: '사용자 이름을 입력하세요',
    label: '사용자 이름',
    helperText: '영문, 숫자, 특수문자(_,-)만 사용 가능합니다',
    showCharCount: true,
    maxLength: 30,
  },
  parameters: {
    docs: {
      description: {
        story: '도움말 텍스트를 표시하는 스토리입니다. 사용자에게 입력 규칙이나 안내사항을 제공합니다.',
      },
    },
  },
};

// Long Content - 긴 내용 처리
export const LongContent: Story = {
  args: {
    placeholder: '긴 내용을 입력해보세요',
    label: '긴 라벨 텍스트가 어떻게 표시되는지 확인하는 라벨',
    helperText: '이것은 매우 긴 도움말 텍스트입니다. 여러 줄에 걸쳐 표시될 수 있으며, 사용자에게 상세한 안내를 제공합니다.',
    errorMessage: '이것은 매우 긴 에러 메시지입니다. 에러의 원인과 해결 방법에 대한 상세한 설명을 포함할 수 있습니다.',
    modelValue: '이것은 매우 긴 입력 텍스트입니다. 입력 필드에서 어떻게 표시되는지 확인할 수 있습니다.',
    showCharCount: true,
    maxLength: 200,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 내용이 포함된 경우의 표시 방식을 확인하는 스토리입니다.',
      },
    },
  },
};

// Edge Cases - 엣지 케이스
export const EdgeCases: Story = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; min-width: 320px;">
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">라벨 없음</div>
          <TextInput 
            placeholder="라벨이 없는 입력 필드"
            helperText="라벨 없이 도움말만 있는 경우"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">최대 길이 0</div>
          <TextInput 
            label="길이 제한 없음"
            placeholder="아무거나 입력하세요"
            :maxLength="0"
            :showCharCount="true"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">짧은 최대 길이</div>
          <TextInput 
            label="매우 짧은 입력"
            placeholder="5자까지"
            :maxLength="5"
            :showCharCount="true"
            clearable="true"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">읽기 전용 + 클리어 버튼</div>
          <TextInput 
            label="읽기 전용"
            modelValue="읽기 전용 텍스트"
            :readonly="true"
            :clearable="true"
            helperText="읽기 전용이므로 클리어 버튼이 나타나지 않음"
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

// Interactive Test - 상호작용 테스트
export const InteractiveTest: Story = {
  args: {
    placeholder: '상호작용을 테스트해보세요',
    label: '상호작용 테스트',
    clearable: true,
    showCharCount: true,
    maxLength: 30,
  },
  parameters: {
    docs: {
      description: {
        story: '키보드와 마우스 상호작용을 테스트할 수 있는 스토리입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 입력 필드 찾기
    const input = canvas.getByTestId('text-input-field');
    
    // 기본 상태 확인
    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAttribute('placeholder', '상호작용을 테스트해보세요');
    
    // 텍스트 입력
    await userEvent.type(input, 'Hello World');
    await expect(input).toHaveValue('Hello World');
    
    // 문자 수 확인
    const charCount = canvas.getByTestId('text-input-count');
    await expect(charCount).toHaveTextContent('11 / 30');
    
    // 클리어 버튼 확인 및 클릭
    const clearButton = canvas.getByTestId('text-input-clear');
    await expect(clearButton).toBeInTheDocument();
    await userEvent.click(clearButton);
    
    // 클리어 후 상태 확인
    await expect(input).toHaveValue('');
  },
};

// Accessibility Test - 접근성 테스트
export const AccessibilityTest: Story = {
  args: {
    label: '접근성 테스트 입력',
    placeholder: '접근성을 테스트합니다',
    helperText: '이 필드는 접근성 테스트용입니다',
    id: 'accessibility-test-input',
  },
  parameters: {
    docs: {
      description: {
        story: '접근성 기능을 테스트하는 스토리입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 라벨과 입력 필드 연결 확인
    const label = canvas.getByText('접근성 테스트 입력');
    const input = canvas.getByTestId('text-input-field');
    
    await expect(label).toBeInTheDocument();
    await expect(input).toBeInTheDocument();
    
    // ID 연결 확인
    await expect(input).toHaveAttribute('id', 'accessibility-test-input');
    await expect(label).toHaveAttribute('for', 'accessibility-test-input');
    
    // 키보드 네비게이션 테스트
    await userEvent.tab();
    await expect(input).toHaveFocus();
    
    // 키보드로 입력
    await userEvent.keyboard('키보드 입력 테스트');
    await expect(input).toHaveValue('키보드 입력 테스트');
  },
};

// Form Integration - 폼 통합 예제
export const FormIntegration: Story = {
  render: (args) => ({
    components: { TextInput },
    setup() {
      return { args };
    },
    template: `
      <form style="display: flex; flex-direction: column; gap: 20px; min-width: 320px;">
        <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #121212;">사용자 정보 입력</h3>
        
        <TextInput 
          label="이름 *"
          placeholder="이름을 입력하세요"
          :clearable="true"
        />
        
        <TextInput 
          label="이메일 *"
          type="email"
          placeholder="이메일을 입력하세요"
          :clearable="true"
        />
        
        <TextInput 
          label="전화번호"
          placeholder="전화번호를 입력하세요 (선택사항)"
          helperText="하이픈(-) 없이 숫자만 입력하세요"
          :clearable="true"
        />
        
        <TextInput 
          label="자기소개"
          type="textarea"
          placeholder="간단한 자기소개를 작성해주세요"
          :rows="4"
          :maxLength="200"
          :showCharCount="true"
          :clearable="true"
        />
        
        <button 
          type="submit" 
          style="
            padding: 12px 24px; 
            background-color: #19973c; 
            color: white; 
            border: none; 
            border-radius: 10px; 
            font-weight: 500;
            cursor: pointer;
          "
        >
          제출하기
        </button>
      </form>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 폼에서 사용되는 예시입니다. 다양한 타입의 입력 필드가 폼으로 구성되어 있습니다.',
      },
    },
  },
};

// Character Count Test - 글자수 카운터 테스트
export const CharacterCountTest: Story = {
  args: {
    placeholder: '최대 20자까지 입력 가능',
    label: '글자수 카운터 테스트',
    showCharCount: true,
    maxLength: 20,
    clearable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '글자수 카운터와 maxLength 제한 기능을 테스트하는 스토리입니다. 20자를 넘어서 입력해보세요.',
      },
    },
  },
};