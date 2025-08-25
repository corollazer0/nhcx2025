// src/components/Tooltip.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import Tooltip from './Tooltip.vue';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 툴팁 컴포넌트입니다. 사용자에게 추가 정보나 가이드를 제공하는 데 사용됩니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '툴팁의 제목',
      table: { category: 'Content' },
    },
    subTitle: {
      control: { type: 'boolean' },
      description: '서브타이틀 표시 여부',
      table: { category: 'Sections' },
    },
    subTitleText: {
      control: { type: 'text' },
      description: '서브타이틀 텍스트',
      table: { category: 'Content' },
    },
    text: {
      control: { type: 'boolean' },
      description: '텍스트 섹션 표시 여부',
      table: { category: 'Sections' },
    },
    textContent: {
      control: { type: 'text' },
      description: '텍스트 내용',
      table: { category: 'Content' },
    },
    list: {
      control: { type: 'boolean' },
      description: '리스트 섹션 표시 여부',
      table: { category: 'Sections' },
    },
    listItems: {
      control: { type: 'object' },
      description: '리스트 아이템 배열',
      table: { category: 'Content' },
    },
    closable: {
      control: { type: 'boolean' },
      description: '닫기 버튼 표시 여부',
      table: { category: 'Functionality' },
    },
    'onClose': {
      description: '툴팁 닫기 이벤트',
      table: { category: 'Events' },
      control: false,
    },
  },
  args: {
    title: '타이틀',
    subTitle: true,
    subTitleText: '서브 타이틀',
    text: true,
    textContent: '서브 텍스트를 내용을 입력해 주세요.',
    list: true,
    listItems: [
      { text: '내용을 입력해 주세요' },
      { text: '내용을 입력해 주세요' }
    ],
    closable: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls을 사용할 수 있는 기본 스토리
export const Playground: Story = {
  args: {
    title: '커스터마이징 해보세요!',
    subTitle: true,
    subTitleText: '서브 타이틀을 수정해보세요',
    text: true,
    textContent: '텍스트 내용을 변경해보세요.',
    list: true,
    listItems: [
      { text: '첫 번째 리스트 아이템' },
      { text: '두 번째 리스트 아이템' }
    ],
    closable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다. 각 섹션의 표시 여부와 내용을 변경해보세요.',
      },
    },
  },
};

// Default - Figma 디자인의 기본 상태
export const Default: Story = {
  args: {
    title: '타이틀',
    subTitle: true,
    subTitleText: '서브 타이틀',
    text: true,
    textContent: '서브 텍스트를 내용을 입력해 주세요.',
    list: true,
    listItems: [
      { text: '내용을 입력해 주세요' },
      { text: '내용을 입력해 주세요' }
    ],
    closable: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 기본 상태입니다. 모든 섹션이 표시되며 닫기 버튼이 포함됩니다.',
      },
    },
  },
};

// Title Only - 제목만 있는 최소 구성
export const TitleOnly: Story = {
  args: {
    title: '간단한 툴팁',
    subTitle: false,
    text: false,
    list: false,
    closable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '제목과 닫기 버튼만 있는 최소 구성의 툴팁입니다.',
      },
    },
  },
};

// Without Close Button - 닫기 버튼 없는 버전
export const WithoutCloseButton: Story = {
  args: {
    title: '닫기 버튼이 없는 툴팁',
    subTitle: true,
    subTitleText: '정보성 툴팁',
    text: true,
    textContent: '이 툴팁은 닫기 버튼이 없습니다.',
    list: false,
    closable: false,
  },
  parameters: {
    docs: {
      description: {
        story: '닫기 버튼이 없는 정보성 툴팁입니다. 다른 방식으로 닫혀야 할 때 사용합니다.',
      },
    },
  },
};

// List Only - 리스트만 있는 구성
export const ListOnly: Story = {
  args: {
    title: '체크리스트',
    subTitle: false,
    text: false,
    list: true,
    listItems: [
      { text: '첫 번째 할 일' },
      { text: '두 번째 할 일' },
      { text: '세 번째 할 일' },
      { text: '네 번째 할 일' }
    ],
    closable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '제목과 리스트만 있는 구성입니다. 체크리스트나 단계별 가이드에 유용합니다.',
      },
    },
  },
};

// Long Content - 긴 내용
export const LongContent: Story = {
  args: {
    title: '상세한 정보가 포함된 툴팁',
    subTitle: true,
    subTitleText: '이것은 매우 긴 서브타이틀입니다. 여러 줄에 걸쳐 표시될 수 있습니다.',
    text: true,
    textContent: '이것은 매우 긴 텍스트 내용입니다. 여러 줄에 걸쳐 표시되며, 사용자에게 상세한 정보를 제공하는 데 사용됩니다. 툴팁의 너비는 고정되어 있으므로 긴 내용은 자동으로 줄바꿈됩니다.',
    list: true,
    listItems: [
      { text: '첫 번째 항목: 이것도 긴 내용이 포함된 리스트 아이템입니다' },
      { text: '두 번째 항목: 리스트 아이템도 여러 줄로 표시될 수 있습니다' },
      { text: '세 번째 항목: 사용자가 읽기 쉽도록 적절히 줄바꿈됩니다' }
    ],
    closable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 내용이 포함된 툴팁입니다. 모든 섹션이 여러 줄로 표시될 수 있습니다.',
      },
    },
  },
};

// Interactive Test - 상호작용 테스트
export const InteractiveTest: Story = {
  args: {
    title: '상호작용 테스트',
    subTitle: true,
    subTitleText: '닫기 버튼을 클릭해보세요',
    text: true,
    textContent: '이벤트가 발생하는지 확인할 수 있습니다.',
    list: false,
    closable: true,
  },
  parameters: {
    docs: {
      description: {
        story: '닫기 버튼의 상호작용을 테스트할 수 있는 툴팁입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 툴팁 찾기
    const tooltip = canvas.getByTestId('tooltip');
    
    // 기본 상태 확인
    await expect(tooltip).toBeInTheDocument();
    
    // 제목 확인
    await expect(tooltip).toHaveTextContent('상호작용 테스트');
    
    // 닫기 버튼 찾기 및 클릭 테스트
    const closeButton = canvas.getByTestId('tooltip-close');
    await expect(closeButton).toBeInTheDocument();
    
    // 버튼 클릭
    await userEvent.click(closeButton);
    
    console.log('✅ Tooltip 상호작용 테스트 완료');
  },
};

// Section Variations - 섹션별 표시 테스트
export const SectionVariations: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">모든 섹션</h3>
          <Tooltip 
            title="완전한 툴팁"
            :subTitle="true"
            subTitleText="서브 타이틀"
            :text="true"
            textContent="텍스트 내용입니다."
            :list="true"
            :listItems="[{text: '리스트 아이템 1'}, {text: '리스트 아이템 2'}]"
            :closable="true"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">제목 + 서브타이틀</h3>
          <Tooltip 
            title="제목과 서브타이틀"
            :subTitle="true"
            subTitleText="서브 타이틀만 표시"
            :text="false"
            :list="false"
            :closable="true"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">제목 + 텍스트</h3>
          <Tooltip 
            title="제목과 텍스트"
            :subTitle="false"
            :text="true"
            textContent="텍스트만 표시됩니다."
            :list="false"
            :closable="true"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #666; text-align: center;">제목 + 리스트</h3>
          <Tooltip 
            title="제목과 리스트"
            :subTitle="false"
            :text="false"
            :list="true"
            :listItems="[{text: '단일 리스트 아이템'}]"
            :closable="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 섹션 조합을 보여주는 스토리입니다.',
      },
    },
  },
};

// Real World Examples - 실제 사용 예시
export const RealWorldExamples: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: center; padding: 24px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212; text-align: center;">도움말 툴팁</h3>
          <Tooltip 
            title="계정 설정"
            :subTitle="true"
            subTitleText="프로필 정보 관리"
            :text="true"
            textContent="개인정보 및 계정 설정을 관리할 수 있습니다."
            :list="true"
            :listItems="[
              {text: '프로필 사진 변경'},
              {text: '비밀번호 변경'},
              {text: '알림 설정'},
              {text: '계정 탈퇴'}
            ]"
            :closable="true"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212; text-align: center;">기능 안내</h3>
          <Tooltip 
            title="새로운 기능"
            :subTitle="true"
            subTitleText="업데이트된 기능을 확인해보세요"
            :text="true"
            textContent="이번 업데이트에서 추가된 새로운 기능들입니다."
            :list="true"
            :listItems="[
              {text: '다크 모드 지원'},
              {text: '자동 저장 기능'},
              {text: '키보드 단축키'},
              {text: '성능 개선'}
            ]"
            :closable="true"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212; text-align: center;">오류 안내</h3>
          <Tooltip 
            title="연결 오류"
            :subTitle="false"
            :text="true"
            textContent="서버와의 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
            :list="true"
            :listItems="[
              {text: '네트워크 상태 확인'},
              {text: '페이지 새로고침'},
              {text: '고객센터 문의'}
            ]"
            :closable="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 다양한 툴팁 예시들입니다.',
      },
    },
  },
};

// Edge Cases - 엣지 케이스
export const EdgeCases: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">빈 제목</div>
          <Tooltip 
            title=""
            :subTitle="false"
            :text="true"
            textContent="제목이 비어있는 경우"
            :list="false"
            :closable="true"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">빈 리스트</div>
          <Tooltip 
            title="빈 리스트 케이스"
            :subTitle="false"
            :text="false"
            :list="true"
            :listItems="[]"
            :closable="true"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">특수문자</div>
          <Tooltip 
            title="!@#$%^&*()_+-=[]{}|;:,.<>?"
            :subTitle="true"
            subTitleText="<script>alert('test')</script>"
            :text="true"
            textContent="HTML & 특수문자 테스트"
            :list="false"
            :closable="true"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-size: 14px; color: #666; font-weight: 500; text-align: center;">단일 리스트 아이템</div>
          <Tooltip 
            title="단일 아이템"
            :subTitle="false"
            :text="false"
            :list="true"
            :listItems="[{text: '하나의 아이템만'}]"
            :closable="true"
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
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 20px; max-width: 1000px;">
        <Tooltip 
          v-for="i in 9" 
          :key="i"
          :title="'툴팁 ' + i"
          :subTitle="i % 2 === 0"
          :subTitleText="'서브타이틀 ' + i"
          :text="i % 3 === 0"
          :textContent="'텍스트 내용 ' + i"
          :list="i % 4 === 0"
          :listItems="[{text: '아이템 ' + i + '-1'}, {text: '아이템 ' + i + '-2'}]"
          :closable="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '9개의 툴팁을 렌더링하여 성능을 테스트하는 스토리입니다.',
      },
    },
  },
};