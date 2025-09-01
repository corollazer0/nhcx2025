// src/components/Select.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import Select from './Select.vue';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  tags: ['autodocs'],
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 선택(Select) 컴포넌트입니다. 사용자가 여러 옵션 중 하나를 선택할 수 있도록 합니다.',
      },
    },
  },
  argTypes: {
    modelValue: {
      control: { type: 'text' },
      description: '선택된 값',
      table: { category: 'Model' },
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
      table: { category: 'Content' },
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
      table: { category: 'Content' },
    },
    helperText: {
      control: { type: 'text' },
      description: '도움말 텍스트',
      table: { category: 'Content' },
    },
    errorMessage: {
      control: { type: 'text' },
      description: '오류 메시지',
      table: { category: 'Content' },
    },
    options: {
      control: { type: 'object' },
      description: '선택 옵션 배열',
      table: { category: 'Data' },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'with-description', 'with-icon'],
      description: '컴포넌트 변형 (기본, 설명 포함, 아이콘 포함)',
      table: { category: 'Appearance' },
    },
    showDescription: {
      control: { type: 'boolean' },
      description: 'with-description 변형에서 설명 텍스트 표시 여부',
      table: { category: 'Appearance' },
    },
    customDescription: {
      control: { type: 'text' },
      description: 'with-description 변형에서 사용할 커스텀 부가설명 텍스트',
      table: { category: 'Content' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
      table: { category: 'State' },
    },
    readonly: {
      control: { type: 'boolean' },
      description: '읽기전용 상태',
      table: { category: 'State' },
    },
    error: {
      control: { type: 'boolean' },
      description: '오류 상태 (errorMessage 없이 시각적으로만 오류 표시)',
      table: { category: 'State' },
    },
    id: {
      control: { type: 'text' },
      description: 'HTML ID 속성',
      table: { category: 'Accessibility' },
    },
    'onUpdate:modelValue': {
      description: '값 변경 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onChange': {
      description: '선택 변경 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onOpen': {
      description: '드롭다운 열기 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onClose': {
      description: '드롭다운 닫기 이벤트',
      table: { category: 'Events' },
      control: false,
    },
  },
  args: {
    placeholder: '선택',
    options: ['옵션 1', '옵션 2', '옵션 3'],
    variant: 'default',
    showDescription: true,
    disabled: false,
    readonly: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls을 사용할 수 있는 기본 스토리
export const Playground: Story = {
  args: {
    placeholder: '원하는 옵션을 선택하세요',
    label: '옵션 선택',
    helperText: '아래에서 하나를 선택해주세요',
    options: [
      '첫 번째 옵션',
      '두 번째 옵션', 
      '세 번째 옵션',
      '네 번째 옵션'
    ],
    disabled: false,
    readonly: false,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다. 옵션을 변경하고 다양한 상태를 테스트해보세요.',
      },
    },
  },
};

// Default - Figma 디자인의 기본 상태
export const Default: Story = {
  args: {
    placeholder: '선택',
    options: ['옵션 1', '옵션 2', '옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 기본 상태입니다. 클릭하면 드롭다운이 열리고 옵션을 선택할 수 있습니다.',
      },
    },
  },
};

// With Label - 라벨이 있는 상태
export const WithLabel: Story = {
  args: {
    label: '카테고리',
    placeholder: '카테고리를 선택하세요',
    options: ['전자제품', '의류', '도서', '스포츠', '음식'],
  },
  parameters: {
    docs: {
      description: {
        story: '라벨이 포함된 Select 컴포넌트입니다.',
      },
    },
  },
};

// Selected State - 선택된 상태
export const SelectedState: Story = {
  args: {
    modelValue: '옵션 2',
    options: ['옵션 1', '옵션 2', '옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: '옵션이 선택된 상태입니다. 선택된 값이 표시됩니다.',
      },
    },
  },
};

// Object Options - 객체 형태의 옵션들
export const ObjectOptions: Story = {
  args: {
    placeholder: '국가를 선택하세요',
    label: '국가',
    modelValue: 'kr',
    options: [
      { label: '한국', value: 'kr' },
      { label: '미국', value: 'us' },
      { label: '일본', value: 'jp' },
      { label: '중국', value: 'cn' },
      { label: '영국', value: 'uk' }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '객체 형태의 옵션을 사용하는 예시입니다. label과 value를 분리할 수 있습니다.',
      },
    },
  },
};

// With Description Variant - 설명이 포함된 변형
export const WithDescriptionVariant: Story = {
  args: {
    placeholder: '서비스를 선택하세요',
    label: '서비스 선택',
    variant: 'with-description',
    modelValue: 'basic',
    options: [
      { 
        label: '기본 플랜', 
        value: 'basic',
        description: '개인 사용자를 위한 기본 기능'
      },
      { 
        label: '프로 플랜', 
        value: 'pro',
        description: '소규모 팀을 위한 고급 기능'
      },
      { 
        label: '엔터프라이즈 플랜', 
        value: 'enterprise',
        description: '대기업을 위한 완전한 솔루션'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma의 부가설명이 포함된 Select 변형입니다. 각 옵션에 추가 설명이 표시됩니다.',
      },
    },
  },
};

// With Description - Not Selected - 설명 변형 선택 안된 상태
export const WithDescriptionNotSelected: Story = {
  args: {
    placeholder: '플랜을 선택해주세요',
    label: '요금제',
    variant: 'with-description',
    options: [
      { 
        label: '스타터', 
        value: 'starter',
        description: '처음 시작하는 분들을 위한'
      },
      { 
        label: '프로페셔널', 
        value: 'professional',
        description: '전문적인 작업을 위한'
      },
      { 
        label: '비즈니스', 
        value: 'business',
        description: '기업용 고급 기능 포함'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '설명이 포함된 변형에서 아무것도 선택되지 않은 상태입니다.',
      },
    },
  },
};

// With Description Control - showDescription 프로퍼티로 설명 표시/숨김 제어
export const WithDescriptionControl: Story = {
  args: {
    placeholder: '플랜을 선택해주세요',
    label: '요금제 (설명 제어)',
    variant: 'with-description',
    modelValue: 'pro',
    showDescription: true,
    options: [
      { 
        label: '기본 플랜', 
        value: 'basic',
        description: '개인 사용자를 위한 기본 기능'
      },
      { 
        label: '프로 플랜', 
        value: 'pro',
        description: '소규모 팀을 위한 고급 기능'
      },
      { 
        label: '엔터프라이즈 플랜', 
        value: 'enterprise',
        description: '대기업을 위한 완전한 솔루션'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'with-description 변형에서 showDescription 프로퍼티를 사용하여 설명 텍스트의 표시/숨김을 제어할 수 있습니다. Controls 패널에서 showDescription을 토글해보세요.',
      },
    },
  },
};

// With Description Hidden - 설명이 숨겨진 상태
export const WithDescriptionHidden: Story = {
  args: {
    placeholder: '플랜을 선택해주세요',
    label: '요금제 (설명 숨김)',
    variant: 'with-description',
    modelValue: 'pro',
    showDescription: false,
    options: [
      { 
        label: '기본 플랜', 
        value: 'basic',
        description: '개인 사용자를 위한 기본 기능'
      },
      { 
        label: '프로 플랜', 
        value: 'pro',
        description: '소규모 팀을 위한 고급 기능'
      },
      { 
        label: '엔터프라이즈 플랜', 
        value: 'enterprise',
        description: '대기업을 위한 완전한 솔루션'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'with-description 변형이지만 showDescription=false로 설정하여 설명 텍스트를 숨긴 상태입니다. 기본 변형과 같은 모양으로 표시됩니다.',
      },
    },
  },
};

// With Custom Description - 커스텀 부가설명 사용
export const WithCustomDescription: Story = {
  args: {
    placeholder: '옵션을 선택해주세요',
    label: '서비스 선택 (커스텀 설명)',
    variant: 'with-description',
    modelValue: 'basic',
    showDescription: true,
    customDescription: '사용자가 입력한 커스텀 부가설명입니다',
    options: [
      { 
        label: '기본 서비스', 
        value: 'basic',
        description: '이 설명은 무시됩니다'
      },
      { 
        label: '프리미엄 서비스', 
        value: 'premium',
        description: '이 설명도 무시됩니다'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'customDescription 프로퍼티를 사용하여 사용자가 직접 입력한 부가설명을 표시합니다. 옵션에 설정된 description보다 우선순위가 높습니다.',
      },
    },
  },
};

// Custom Description Always Shown - 선택값과 무관하게 항상 표시되는 커스텀 설명
export const CustomDescriptionAlwaysShown: Story = {
  args: {
    placeholder: '옵션을 선택해주세요',
    label: '서비스 (항상 표시되는 설명)',
    variant: 'with-description',
    showDescription: true,
    customDescription: '선택한 값과 관계없이 항상 표시되는 설명입니다',
    options: ['옵션 1', '옵션 2', '옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: 'customDescription이 설정되면 아무것도 선택되지 않았을 때도 부가설명이 표시됩니다. 선택값과 무관하게 고정된 설명을 보여주고 싶을 때 유용합니다.',
      },
    },
  },
};

// With Icon Variant - 아이콘이 포함된 변형
export const WithIconVariant: Story = {
  args: {
    placeholder: '은행을 선택하세요',
    label: '은행 선택',
    variant: 'with-icon',
    modelValue: 'nh',
    options: [
      { 
        label: 'NH농협은행', 
        value: 'nh',
        icon: 'NH',
        iconColor: '#007bff'
      },
      { 
        label: '신한은행', 
        value: 'shinhan',
        icon: '신한',
        iconColor: '#0066cc'
      },
      { 
        label: 'KB국민은행', 
        value: 'kb',
        icon: 'KB',
        iconColor: '#ffb800'
      },
      { 
        label: '하나은행', 
        value: 'hana',
        icon: '하나',
        iconColor: '#00a651'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '아이콘이 포함된 Select 변형입니다. 각 옵션에 둥근 아이콘이 표시되며, 색상을 개별 설정할 수 있습니다.',
      },
    },
  },
};

// With Icon Not Selected - 아이콘 변형 선택 안된 상태
export const WithIconNotSelected: Story = {
  args: {
    placeholder: '계좌를 선택해주세요',
    label: '계좌 선택',
    variant: 'with-icon',
    options: [
      { 
        label: '우리은행 주계좌', 
        value: 'woori',
        icon: '우리',
        iconColor: '#0066cc'
      },
      { 
        label: '카카오뱅크 적금', 
        value: 'kakao',
        icon: 'K',
        iconColor: '#ffcd00'
      },
      { 
        label: '토스뱅크 예금', 
        value: 'toss',
        icon: 'T',
        iconColor: '#3182f6'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '아이콘 변형에서 아무것도 선택되지 않은 상태입니다. 드롭다운에서만 아이콘이 표시됩니다.',
      },
    },
  },
};

// With Icon Different Colors - 다양한 아이콘 색상
export const WithIconDifferentColors: Story = {
  args: {
    placeholder: '브랜드를 선택하세요',
    label: '브랜드',
    variant: 'with-icon',
    modelValue: 'google',
    options: [
      { 
        label: 'Google', 
        value: 'google',
        icon: 'G',
        iconColor: '#4285f4'
      },
      { 
        label: 'Microsoft', 
        value: 'microsoft',
        icon: 'M',
        iconColor: '#00a1f1'
      },
      { 
        label: 'Apple', 
        value: 'apple',
        icon: 'A',
        iconColor: '#000000'
      },
      { 
        label: 'Amazon', 
        value: 'amazon',
        icon: 'A',
        iconColor: '#ff9900'
      },
      { 
        label: 'Netflix', 
        value: 'netflix',
        icon: 'N',
        iconColor: '#e50914'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 브랜드 색상의 아이콘을 보여주는 예시입니다. iconColor 속성으로 각 아이콘의 색상을 개별 설정할 수 있습니다.',
      },
    },
  },
};

// With Icon Images - 이미지 아이콘 사용
export const WithIconImages: Story = {
  args: {
    placeholder: '회사를 선택하세요',
    label: '회사 선택',
    variant: 'with-icon',
    modelValue: 'google',
    options: [
      { 
        label: 'Google', 
        value: 'google',
        iconImage: 'https://logo.clearbit.com/google.com'
      },
      { 
        label: 'Microsoft', 
        value: 'microsoft',
        iconImage: 'https://logo.clearbit.com/microsoft.com'
      },
      { 
        label: 'Apple', 
        value: 'apple',
        iconImage: 'https://logo.clearbit.com/apple.com'
      },
      { 
        label: 'Amazon', 
        value: 'amazon',
        iconImage: 'https://logo.clearbit.com/amazon.com'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'iconImage 속성을 사용하여 실제 이미지 아이콘을 표시하는 예시입니다. 로고나 프로필 이미지 등을 사용할 때 유용합니다.',
      },
    },
  },
};

// Mixed Icon Types - 텍스트와 이미지 아이콘 혼합
export const MixedIconTypes: Story = {
  args: {
    placeholder: '플랫폼을 선택하세요',
    label: '플랫폼',
    variant: 'with-icon',
    modelValue: 'google',
    options: [
      { 
        label: 'Google (이미지)', 
        value: 'google',
        iconImage: 'https://logo.clearbit.com/google.com'
      },
      { 
        label: 'Custom (텍스트)', 
        value: 'custom',
        icon: 'C',
        iconColor: '#6366f1'
      },
      { 
        label: 'GitHub (이미지)', 
        value: 'github',
        iconImage: 'https://logo.clearbit.com/github.com'
      },
      { 
        label: 'Local (텍스트)', 
        value: 'local',
        icon: 'L',
        iconColor: '#059669'
      }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '텍스트 아이콘(icon)과 이미지 아이콘(iconImage)을 같은 Select에서 혼합 사용하는 예시입니다. 필요에 따라 유연하게 조합할 수 있습니다.',
      },
    },
  },
};

// With Disabled Options - 비활성화된 옵션이 포함된 경우
export const WithDisabledOptions: Story = {
  args: {
    placeholder: '서비스를 선택하세요',
    label: '서비스',
    options: [
      { label: '기본 서비스', value: 'basic' },
      { label: '프리미엄 서비스', value: 'premium' },
      { label: '엔터프라이즈 서비스 (준비중)', value: 'enterprise', disabled: true },
      { label: '커스텀 서비스', value: 'custom' },
      { label: '레거시 서비스 (종료)', value: 'legacy', disabled: true }
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '일부 옵션이 비활성화된 상태입니다. 비활성화된 옵션은 선택할 수 없습니다.',
      },
    },
  },
};

// Error State - 오류 상태 (메시지 포함)
export const ErrorState: Story = {
  args: {
    placeholder: '필수 항목을 선택하세요',
    label: '필수 선택',
    errorMessage: '이 항목은 필수입니다',
    options: ['옵션 1', '옵션 2', '옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: '오류 상태의 Select 컴포넌트입니다. 빨간 테두리와 오류 메시지가 표시됩니다.',
      },
    },
  },
};

// Error State Visual Only - 시각적 오류 상태만
export const ErrorStateVisualOnly: Story = {
  args: {
    placeholder: '시각적 오류 상태',
    label: '시각적 오류',
    error: true,
    helperText: '메시지 없이 시각적으로만 오류를 표시합니다',
    options: ['옵션 1', '옵션 2', '옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: '시각적으로만 오류 상태를 표시하는 Select 컴포넌트입니다. 빨간 테두리만 표시되고 오류 메시지는 없습니다.',
      },
    },
  },
};

// Disabled State - 비활성화 상태
export const DisabledState: Story = {
  args: {
    placeholder: '비활성화됨',
    label: '비활성화된 선택',
    disabled: true,
    options: ['옵션 1', '옵션 2', '옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 Select 컴포넌트입니다. 클릭이 불가능하고 회색으로 표시됩니다.',
      },
    },
  },
};

// Disabled with Value - 값이 있는 비활성화 상태
export const DisabledWithValue: Story = {
  args: {
    modelValue: '선택된 옵션입니다',
    label: '비활성화된 선택',
    disabled: true,
    options: ['선택된 옵션입니다', '옵션 2', '옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: '값이 선택된 상태에서 비활성화된 Select 컴포넌트입니다.',
      },
    },
  },
};

// Readonly State - 읽기전용 상태
export const ReadonlyState: Story = {
  args: {
    modelValue: '읽기전용 값',
    label: '읽기전용 선택',
    readonly: true,
    options: ['읽기전용 값', '옵션 2', '옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: '읽기전용 상태의 Select 컴포넌트입니다. 값은 표시되지만 변경할 수 없습니다.',
      },
    },
  },
};

// With Helper Text - 도움말 텍스트가 있는 상태
export const WithHelperText: Story = {
  args: {
    label: '우선순위',
    placeholder: '우선순위를 선택하세요',
    helperText: '작업의 중요도에 따라 선택해주세요',
    options: ['높음', '보통', '낮음'],
  },
  parameters: {
    docs: {
      description: {
        story: '도움말 텍스트가 포함된 Select 컴포넌트입니다.',
      },
    },
  },
};

// Long Options - 긴 옵션들
export const LongOptions: Story = {
  args: {
    placeholder: '부서를 선택하세요',
    label: '부서',
    options: [
      '인사관리 및 조직개발팀',
      '마케팅 및 브랜드 전략팀', 
      '소프트웨어 개발 및 엔지니어링팀',
      '고객서비스 및 지원팀',
      '재무관리 및 회계팀',
      '법무 및 컴플라이언스팀'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 옵션들입니다. 텍스트가 자동으로 줄바꿈됩니다.',
      },
    },
  },
};

// All States Comparison - 모든 상태 비교
export const AllStatesComparison: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 300px;">
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">기본 상태</h3>
          <Select 
            placeholder="선택하세요"
            :options="['옵션 1', '옵션 2', '옵션 3']"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">선택된 상태</h3>
          <Select 
            modelValue="선택된 옵션입니다"
            :options="['선택된 옵션입니다', '옵션 2', '옵션 3']"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">오류 상태 (메시지 포함)</h3>
          <Select 
            placeholder="오류 상태"
            errorMessage="오류가 발생했습니다"
            :options="['옵션 1', '옵션 2', '옵션 3']"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">오류 상태 (시각적만)</h3>
          <Select 
            placeholder="시각적 오류"
            :error="true"
            :options="['옵션 1', '옵션 2', '옵션 3']"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">비활성화 상태</h3>
          <Select 
            placeholder="비활성화됨"
            :disabled="true"
            :options="['옵션 1', '옵션 2', '옵션 3']"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">읽기전용 상태</h3>
          <Select 
            modelValue="읽기전용 값"
            :readonly="true"
            :options="['읽기전용 값', '옵션 2', '옵션 3']"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">설명 포함 변형 (표시)</h3>
          <Select 
            modelValue="basic"
            variant="with-description"
            :showDescription="true"
            :options="[
              { label: '기본 플랜', value: 'basic', description: '기본 기능 포함' },
              { label: '프로 플랜', value: 'pro', description: '고급 기능 포함' }
            ]"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">설명 포함 변형 (숨김)</h3>
          <Select 
            modelValue="basic"
            variant="with-description"
            :showDescription="false"
            :options="[
              { label: '기본 플랜', value: 'basic', description: '기본 기능 포함' },
              { label: '프로 플랜', value: 'pro', description: '고급 기능 포함' }
            ]"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">커스텀 부가설명</h3>
          <Select 
            modelValue="option1"
            variant="with-description"
            customDescription="사용자가 직접 입력한 부가설명"
            :showDescription="true"
            :options="[
              { label: '옵션 1', value: 'option1' },
              { label: '옵션 2', value: 'option2' }
            ]"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666;">아이콘 포함 변형</h3>
          <Select 
            modelValue="nh"
            variant="with-icon"
            :options="[
              { label: 'NH농협은행', value: 'nh', icon: 'NH', iconColor: '#007bff' },
              { label: '신한은행', value: 'shinhan', icon: '신한', iconColor: '#0066cc' }
            ]"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Select 컴포넌트의 모든 상태를 한 번에 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// Interactive Test - 상호작용 테스트
export const InteractiveTest: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedValue = ref('');
      
      const handleChange = (value) => {
        console.log('Story: Value changed to:', value);
        selectedValue.value = value;
      };
      
      return { args, selectedValue, handleChange };
    },
    template: `
      <div>
        <p>현재 선택된 값: <strong>{{ selectedValue || '없음' }}</strong></p>
        <Select 
          v-bind="args"
          v-model="selectedValue"
          @change="handleChange"
        />
      </div>
    `,
  }),
  args: {
    placeholder: '상호작용 테스트',
    label: '테스트 선택',
    options: ['테스트 옵션 1', '테스트 옵션 2', '테스트 옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Select 컴포넌트의 상호작용을 테스트할 수 있는 스토리입니다. 선택된 값이 실시간으로 업데이트됩니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Select 찾기
    const select = canvas.getByTestId('select');
    await expect(select).toBeInTheDocument();
    
    // 트리거 찾기 및 클릭
    const trigger = canvas.getByTestId('select-trigger');
    await expect(trigger).toBeInTheDocument();
    
    // 초기 상태 확인
    await expect(trigger).toHaveTextContent('상호작용 테스트');
    
    // 드롭다운 열기
    await userEvent.click(trigger);
    
    // 드롭다운이 열렸는지 확인
    const dropdown = canvas.getByTestId('select-dropdown');
    await expect(dropdown).toBeInTheDocument();
    
    // 옵션들 확인
    const options = canvas.getAllByTestId('select-option');
    await expect(options).toHaveLength(3);
    
    // 첫 번째 옵션 클릭
    await userEvent.click(options[0]);
    
    // 선택된 값 확인 (드롭다운이 닫혔으므로 trigger에서 확인)
    await expect(trigger).toHaveTextContent('테스트 옵션 1');
    
    console.log('✅ Select 상호작용 테스트 완료');
  },
};

// Keyboard Navigation Test - 키보드 네비게이션 테스트
export const KeyboardNavigationTest: Story = {
  args: {
    placeholder: '키보드로 조작해보세요',
    label: '키보드 네비게이션',
    options: ['키보드 옵션 1', '키보드 옵션 2', '키보드 옵션 3'],
  },
  parameters: {
    docs: {
      description: {
        story: '키보드 네비게이션을 테스트할 수 있는 스토리입니다. Tab으로 포커스하고 Enter나 화살표 키로 조작해보세요.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Select 트리거 찾기
    const trigger = canvas.getByTestId('select-trigger');
    
    // 포커스 설정
    trigger.focus();
    
    // Enter 키로 드롭다운 열기
    await userEvent.keyboard('{Enter}');
    
    // 드롭다운이 열렸는지 확인
    const dropdown = canvas.getByTestId('select-dropdown');
    await expect(dropdown).toBeInTheDocument();
    
    // Escape 키로 드롭다운 닫기
    await userEvent.keyboard('{Escape}');
    
    console.log('✅ Select 키보드 네비게이션 테스트 완료');
  },
};

// Real World Examples - 실제 사용 예시
export const RealWorldExamples: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; width: 400px; padding: 24px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">사용자 프로필 설정</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Select 
              label="성별"
              placeholder="성별을 선택하세요"
              :options="[
                { label: '남성', value: 'male' },
                { label: '여성', value: 'female' },
                { label: '기타', value: 'other' },
                { label: '선택 안함', value: 'prefer_not_to_say' }
              ]"
            />
            
            <Select 
              label="거주 지역"
              placeholder="지역을 선택하세요"
              helperText="현재 거주중인 지역을 선택해주세요"
              :options="[
                '서울특별시',
                '부산광역시',
                '대구광역시',
                '인천광역시',
                '광주광역시',
                '대전광역시',
                '울산광역시',
                '세종특별자치시',
                '경기도',
                '강원도',
                '충청북도',
                '충청남도',
                '전라북도',
                '전라남도',
                '경상북도',
                '경상남도',
                '제주특별자치도'
              ]"
            />
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">주문 설정</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Select 
              label="배송 방법"
              modelValue="standard"
              :options="[
                { label: '일반 배송 (2-3일)', value: 'standard' },
                { label: '빠른 배송 (1-2일)', value: 'fast' },
                { label: '당일 배송', value: 'same_day' },
                { label: '픽업 서비스', value: 'pickup' }
              ]"
            />
            
            <Select 
              label="결제 방법"
              errorMessage="결제 방법을 선택해주세요"
              :options="[
                { label: '신용카드', value: 'credit_card' },
                { label: '체크카드', value: 'debit_card' },
                { label: '계좌이체', value: 'bank_transfer' },
                { label: '페이팔', value: 'paypal' },
                { label: '카카오페이', value: 'kakao_pay' },
                { label: '네이버페이', value: 'naver_pay' }
              ]"
            />
          </div>
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">시스템 설정</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Select 
              label="언어"
              modelValue="ko"
              :readonly="true"
              :options="[
                { label: '한국어', value: 'ko' },
                { label: 'English', value: 'en' },
                { label: '日本語', value: 'ja' },
                { label: '中文', value: 'zh' }
              ]"
            />
            
            <Select 
              label="테마"
              :disabled="true"
              placeholder="준비중..."
              :options="[
                { label: '라이트 모드', value: 'light' },
                { label: '다크 모드', value: 'dark' },
                { label: '시스템 설정 따르기', value: 'system' }
              ]"
            />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 다양한 Select 컴포넌트 예시들입니다.',
      },
    },
  },
};

// Edge Cases - 엣지 케이스
export const EdgeCases: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500;">빈 옵션 배열</div>
          <Select 
            placeholder="옵션이 없습니다"
            :options="[]"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500;">하나의 옵션만</div>
          <Select 
            placeholder="단일 옵션"
            modelValue="유일한 옵션"
            :options="['유일한 옵션']"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500;">특수문자 옵션</div>
          <Select 
            placeholder="특수문자 포함"
            :options="[
              'Option !@#$%',
              'Option ^&*()',
              'Option <>?',
              'Option {|}~'
            ]"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500;">숫자 값 옵션</div>
          <Select 
            placeholder="숫자 선택"
            :modelValue="2"
            :options="[
              { label: '첫 번째', value: 1 },
              { label: '두 번째', value: 2 },
              { label: '세 번째', value: 3 }
            ]"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500;">모든 옵션 비활성화</div>
          <Select 
            placeholder="모두 비활성화"
            :options="[
              { label: '비활성화 1', value: '1', disabled: true },
              { label: '비활성화 2', value: '2', disabled: true },
              { label: '비활성화 3', value: '3', disabled: true }
            ]"
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
    components: { Select },
    setup() {
      // 100개의 옵션 생성
      const manyOptions = Array.from({ length: 100 }, (_, i) => ({
        label: `옵션 ${i + 1}`,
        value: `option_${i + 1}`
      }));
      
      return { args, manyOptions };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500;">100개 옵션</div>
          <Select 
            placeholder="많은 옵션 테스트"
            label="성능 테스트"
            helperText="100개의 옵션이 포함되어 있습니다"
            :options="manyOptions"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500;">선택된 상태에서 100개 옵션</div>
          <Select 
            placeholder="선택된 상태 테스트"
            modelValue="option_50"
            :options="manyOptions"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '많은 수의 옵션을 가진 Select 컴포넌트의 성능을 테스트하는 스토리입니다.',
      },
    },
  },
};