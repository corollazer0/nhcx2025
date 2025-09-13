import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Table from './Table.vue';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Table 컴포넌트는 TH와 TD가 한 쌍으로 구성된 완전한 테이블입니다.

**주요 특징:**
- **구조**: TH(헤더)와 TD(데이터) 쌍으로 구성된 행들
- **정렬**: left, center, right (데이터 셀별 설정 가능)
- **Bullet 지원**: TD에서 bullet과 hyphen 목록 표시
- **들여쓰기**: bullet 항목의 계층적 표시
- **반응형**: 헤더 너비 조정 가능

**Figma 디자인을 100% 재현**하여 구현되었습니다.

**사용법:**
- \`rows\` prop으로 테이블 행 정의
- 각 행: \`{header, content}\` 또는 \`{header, items}\`
- 숫자 데이터: \`align="right"\`와 monospace font 자동 적용
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'object',
      description: '테이블 행들의 배열입니다.',
      table: {
        type: { summary: 'TableRow[]' },
        defaultValue: { summary: '[{header: "구분", content: "내용"}]' },
      },
    },
    headerWidth: {
      control: 'text',
      description: '헤더 열의 너비를 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'120px'" },
      },
    },
    dataAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: '데이터 열의 기본 정렬을 설정합니다.',
      table: {
        type: { summary: "'left' | 'center' | 'right'" },
        defaultValue: { summary: "'left'" },
      },
    },
    onClick: {
      description: '테이블 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    rows: [
      { header: '구분', content: '내용' },
      { header: '대상', content: '19세 이상 거주자' }
    ],
    headerWidth: '120px',
    dataAlign: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 테이블의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 Table 컴포넌트입니다. (headerWidth: 120px, dataAlign: left)',
      },
    },
  },
};

// Simple Content Table
export const SimpleContent: Story = {
  args: {
    rows: [
      { header: '대상', content: '19세 이상 거주자' },
      { header: '비과세한도', content: '200만원' },
      { header: '가입확인서류', content: '실명확인증표(신분증)' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '간단한 텍스트 내용으로 구성된 기본 테이블입니다.',
      },
    },
  },
};

// Alignment Variants
export const Alignments: Story = {
  render: () => ({
    components: { Table },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Left Align (기본값)</h4>
          <Table
            :rows="[
              { header: '텍스트', content: '왼쪽 정렬 내용' },
              { header: '설명', content: '문자 데이터에 권장' }
            ]"
            data-align="left"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Center Align</h4>
          <Table
            :rows="[
              { header: '제목', content: '가운데 정렬', align: 'center' },
              { header: '부제목', content: '중앙 배치', align: 'center' }
            ]"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Right Align (숫자 데이터용)</h4>
          <Table
            :rows="[
              { header: '비율 1', content: '100%', align: 'right' },
              { header: '비율 2', content: '200%', align: 'right' }
            ]"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '각 행별로 다른 정렬을 적용할 수 있습니다. 숫자 데이터는 right 정렬을 권장합니다.',
      },
    },
  },
};

// Header Width Variants
export const HeaderWidths: Story = {
  render: () => ({
    components: { Table },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Narrow Header (80px)</h4>
          <Table
            :rows="[
              { header: '구분', content: '내용' },
              { header: '타입', content: '설명' }
            ]"
            header-width="80px"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Default Header (120px)</h4>
          <Table
            :rows="[
              { header: '구분', content: '내용' },
              { header: '타입', content: '설명' }
            ]"
            header-width="120px"
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-weight: 600;">Wide Header (180px)</h4>
          <Table
            :rows="[
              { header: '구분', content: '내용' },
              { header: '타입', content: '설명' }
            ]"
            header-width="180px"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '헤더 열의 너비를 조정할 수 있습니다.',
      },
    },
  },
};

// Bullet List Examples
export const BulletLists: Story = {
  render: () => ({
    components: { Table },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">기본 Bullet 목록</h4>
          <Table
            :rows="[
              {
                header: '대상',
                items: [
                  { text: '19세 이상 거주자', bulletType: 'bullet' },
                  { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' }
                ]
              }
            ]"
            header-width="100px"
          />
        </div>

        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">복합 Bullet 목록 (들여쓰기 포함)</h4>
          <Table
            :rows="[
              {
                header: '가입확인서류',
                items: [
                  { text: '19세 이상 거주자 : 실명확인증표(신분증)', bulletType: 'bullet' },
                  { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' },
                  { text: '실명확인증표(신분증)', bulletType: 'hyphen', indentLevel: 1 },
                  { text: '소득확인증명서(개인종합자산관리계좌 가입용)', bulletType: 'hyphen', indentLevel: 1 }
                ]
              }
            ]"
            header-width="120px"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'bullet과 hyphen을 조합한 계층적 목록을 표시할 수 있습니다.',
      },
    },
  },
};

// Realistic Table Example (Figma Design)
export const FigmaDesignExample: Story = {
  args: {
    rows: [
      {
        header: '대상',
        items: [
          { text: '19세 이상 거주자', bulletType: 'bullet' },
          { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' }
        ]
      },
      {
        header: '비과세한도',
        content: '200만원'
      },
      {
        header: '가입확인서류',
        items: [
          { text: '19세 이상 거주자 : 실명확인증표(신분증)', bulletType: 'bullet' },
          { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' },
          { text: '실명확인증표(신분증)', bulletType: 'hyphen', indentLevel: 1 },
          { text: '소득확인증명서(개인종합자산관리계좌 가입용)', bulletType: 'hyphen', indentLevel: 1 }
        ]
      }
    ],
    headerWidth: '96px'
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Figma 디자인을 완벽하게 재현한 실제 테이블 예시입니다.',
      },
    },
  },
};

// Numeric Data Example (Monospace Lining)
export const NumericDataExample: Story = {
  args: {
    rows: [
      { header: '구분', content: '100%', align: 'right' },
      { header: '구분', content: '200%', align: 'right' },
      { header: '구분', content: '300%', align: 'right' }
    ],
    headerWidth: '100px'
  },
  parameters: {
    docs: {
      description: {
        story: '숫자 데이터는 오른쪽 정렬과 Monospace Lining이 자동 적용됩니다.',
      },
    },
  },
};

// Individual Examples
export const SimpleTable: Story = {
  args: {
    rows: [
      { header: '대상', content: '19세 이상 거주자' },
      { header: '비과세한도', content: '200만원', align: 'right' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '간단한 2행 테이블입니다.',
      },
    },
  },
};

export const BulletTable: Story = {
  args: {
    rows: [
      {
        header: '대상',
        items: [
          { text: '19세 이상 거주자', bulletType: 'bullet' },
          { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Bullet 목록이 포함된 테이블입니다.',
      },
    },
  },
};

export const MixedContentTable: Story = {
  args: {
    rows: [
      { header: '대상', content: '19세 이상 거주자' },
      { header: '비과세한도', content: '200만원', align: 'right' },
      {
        header: '가입확인서류',
        items: [
          { text: '실명확인증표(신분증)', bulletType: 'bullet' },
          { text: '소득확인증명서', bulletType: 'bullet' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '일반 텍스트와 Bullet 목록이 혼합된 테이블입니다.',
      },
    },
  },
};


// Text Variations
export const TextVariations: Story = {
  args: {
    rows: [
      { header: '제목', content: '대상' },
      { header: '범위', content: '비과세한도' },
      { header: '서류', content: '가입확인서류' },
      { header: '금액', content: '200만원', align: 'right' },
      { header: '비율', content: '100%', align: 'right' },
      { header: '계좌명', content: '개인종합자산관리계좌' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 사례에서의 다양한 텍스트 예시입니다.',
      },
    },
  },
};

// Long Text Example
export const LongText: Story = {
  args: {
    rows: [
      {
        header: '대상자 조건',
        content: '15세 이상 19세 미만인 거주자로 근로소득이 있는자에 대한 상세한 설명입니다'
      }
    ],
    headerWidth: '140px'
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 경우의 테이블 렌더링을 확인할 수 있습니다.',
      },
    },
  },
};

// All Alignment Matrix
export const AlignmentMatrix: Story = {
  render: () => ({
    components: { Table },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
        <Table
          :rows="[
            { header: '텍스트', content: '왼쪽 정렬 (기본)', align: 'left' },
            { header: '제목', content: '가운데 정렬', align: 'center' },
            { header: '숫자', content: '100%', align: 'right' }
          ]"
          header-width="100px"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 정렬 옵션을 한 테이블에서 확인할 수 있습니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  args: {
    rows: [
      { header: '빈값', content: '' },
      { header: '특수문자', content: '확인 & 저장 < > " \' 100%' },
      { header: '숫자', content: '1,234,567원', align: 'right' },
      { header: '퍼센트', content: '99.99%', align: 'right' },
      {
        header: '줄바꿈',
        items: [
          { text: '소득확인증명서(개인종합자산\n관리계좌 가입용)', bulletType: 'hyphen', indentLevel: 1 }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 테이블 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Example
export const InteractiveExample: Story = {
  args: {
    rows: [
      { header: '인터랙션', content: '클릭해보세요', align: 'center' }
    ]
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const table = canvas.getByTestId('table');
    // await userEvent.click(table);
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
};

// Figma Design System Showcase
export const FigmaDesignShowcase: Story = {
  render: () => ({
    components: { Table },
    template: `
      <div style="padding: 24px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma Table Design System
        </h3>

        <!-- Basic Table Example -->
        <div style="margin-bottom: 32px;">
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600; color: #121212;">Basic Table</h4>
          <Table
            :rows="[
              { header: '구분', content: '내용' },
              { header: '구분', content: '내용' },
              { header: '구분', content: '내용' }
            ]"
            header-width="94px"
          />
        </div>

        <!-- Numeric Data Table -->
        <div style="margin-bottom: 32px;">
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600; color: #121212;">Monospace Lining (숫자 데이터)</h4>
          <Table
            :rows="[
              { header: '구분', content: '100%', align: 'right' },
              { header: '구분', content: '200%', align: 'right' },
              { header: '구분', content: '300%', align: 'right' }
            ]"
            header-width="94px"
          />
        </div>

        <!-- Bullet Table -->
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600; color: #121212;">Bullet List</h4>
          <Table
            :rows="[
              {
                header: '대상',
                items: [
                  { text: '19세 이상 거주자', bulletType: 'bullet' },
                  { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' }
                ]
              },
              {
                header: '비과세한도',
                content: '200만원'
              },
              {
                header: '가입확인서류',
                items: [
                  { text: '19세 이상 거주자 : 실명확인증표(신분증)', bulletType: 'bullet' },
                  { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' },
                  { text: '실명확인증표(신분증)', bulletType: 'hyphen', indentLevel: 1 },
                  { text: '소득확인증명서(개인종합자산관리계좌 가입용)', bulletType: 'hyphen', indentLevel: 1 }
                ]
              }
            ]"
            header-width="96px"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Figma 디자인에서 제시된 모든 테이블 패턴을 완벽하게 재현한 종합 예시입니다.',
      },
    },
  },
};