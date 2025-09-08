import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import AttachedFile from './AttachedFile.vue';

const meta = {
  title: 'Components/AttachedFile',
  component: AttachedFile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
AttachedFile 컴포넌트는 첨부된 파일을 표시하고 삭제할 수 있는 리스트 아이템입니다.

**주요 특징:**
- **타입**: 1line, 2line, 3line, 4line, 5line (현재 1line만 구현됨)
- **파일명**: 동적으로 설정 가능한 파일명 표시
- **삭제 기능**: 파일 삭제 버튼과 이벤트 제공
- **접근성**: 키보드 내비게이션 및 스크린 리더 지원

**Figma 디자인을 100% 재현**하여 구현되었으며, 깔끔한 구분선과 삭제 아이콘을 포함합니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    filename: {
      control: 'text',
      description: '표시할 파일명입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'파일명'" },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['1line', '2line', '3line', '4line', '5line'],
      description: '파일 리스트의 타입을 설정합니다. (현재 1line만 구현)',
      table: {
        type: { summary: "'1line' | '2line' | '3line' | '4line' | '5line'" },
        defaultValue: { summary: "'1line'" },
      },
    },
    onDelete: {
      description: '파일 삭제 버튼 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(filename: string) => void' },
      },
    },
  },
  args: {
    onDelete: fn(),
  },
} satisfies Meta<typeof AttachedFile>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    filename: '파일명',
    type: '1line',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 AttachedFile의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 AttachedFile 컴포넌트입니다. (filename: 파일명, type: 1line)',
      },
    },
  },
};

// Different File Types
export const FileTypes: Story = {
  render: () => ({
    components: { AttachedFile },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">다양한 파일 형식</h4>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <AttachedFile filename="문서.pdf" />
            <AttachedFile filename="이미지.jpg" />
            <AttachedFile filename="스프레드시트.xlsx" />
            <AttachedFile filename="프레젠테이션.pptx" />
            <AttachedFile filename="텍스트.txt" />
            <AttachedFile filename="압축파일.zip" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 파일 형식과 확장자를 가진 파일들의 예시입니다.',
      },
    },
  },
};

// File Name Variations
export const FilenameVariations: Story = {
  render: () => ({
    components: { AttachedFile },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 500px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">파일명 변형</h4>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <AttachedFile filename="계약서.pdf" />
            <AttachedFile filename="2024년 1분기 매출 보고서.xlsx" />
            <AttachedFile filename="profile-image-high-resolution.jpg" />
            <AttachedFile filename="meeting_notes_20240308.docx" />
            <AttachedFile filename="Project Plan v2.1 (Final).pdf" />
            <AttachedFile filename="한글파일명과 English Mixed.txt" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 환경에서 나타날 수 있는 다양한 파일명 패턴의 예시입니다.',
      },
    },
  },
};

// Type Variants (Future Implementation)
export const TypeVariants: Story = {
  render: () => ({
    components: { AttachedFile },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">타입 변형 (미래 구현 예정)</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <span style="color: #666; font-size: 12px;">1line (현재 구현됨)</span>
              <AttachedFile type="1line" filename="1줄 파일.pdf" />
            </div>
            <div>
              <span style="color: #666; font-size: 12px;">2line (미래 구현 예정)</span>
              <AttachedFile type="2line" filename="2줄 파일.pdf" />
            </div>
            <div>
              <span style="color: #666; font-size: 12px;">3line (미래 구현 예정)</span>
              <AttachedFile type="3line" filename="3줄 파일.pdf" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 타입 변형을 확인할 수 있습니다. 현재는 1line만 구현되어 있으며, 나머지는 미래 구현 예정입니다.',
      },
    },
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { AttachedFile },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; width: 100%; max-width: 900px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">업무 문서</h4>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <AttachedFile filename="사업계획서_2024.pdf" />
            <AttachedFile filename="월간 매출 보고서.xlsx" />
            <AttachedFile filename="팀 미팅 안건.docx" />
            <AttachedFile filename="예산안_v3_최종.pdf" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">개인 파일</h4>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <AttachedFile filename="프로필사진.jpg" />
            <AttachedFile filename="휴가신청서.pdf" />
            <AttachedFile filename="건강검진결과.pdf" />
            <AttachedFile filename="가족사진_2024.zip" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">기술 문서</h4>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <AttachedFile filename="API_Documentation.pdf" />
            <AttachedFile filename="system_requirements.txt" />
            <AttachedFile filename="database_schema.sql" />
            <AttachedFile filename="deployment_guide_v2.1.md" />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">미디어 파일</h4>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <AttachedFile filename="회사소개영상.mp4" />
            <AttachedFile filename="로고_최종버전.ai" />
            <AttachedFile filename="브랜드가이드라인.pdf" />
            <AttachedFile filename="제품사진_고화질.psd" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '실제 업무 환경에서 사용되는 다양한 파일들의 예시입니다.',
      },
    },
  },
};

// Interactive Examples with Actions
export const InteractiveExamples: Story = {
  render: () => ({
    components: { AttachedFile },
    methods: {
      handleDelete(filename: string) {
        alert(`"${filename}" 파일이 삭제되었습니다.`);
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">클릭해서 삭제 기능 테스트</h4>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <AttachedFile filename="삭제 가능한 파일1.pdf" @delete="handleDelete" />
            <AttachedFile filename="삭제 가능한 파일2.xlsx" @delete="handleDelete" />
            <AttachedFile filename="삭제 가능한 파일3.jpg" @delete="handleDelete" />
            <AttachedFile filename="삭제 가능한 파일4.docx" @delete="handleDelete" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '삭제 버튼을 클릭하여 이벤트 동작을 확인할 수 있습니다. 각 파일마다 다른 alert가 표시됩니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { AttachedFile },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 600px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">엣지 케이스</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <span style="color: #666; font-size: 12px;">빈 파일명</span>
              <AttachedFile filename="" />
            </div>
            <div>
              <span style="color: #666; font-size: 12px;">매우 긴 파일명</span>
              <AttachedFile filename="이것은매우긴파일명의예시로써실제상황에서는이렇게긴파일명이있을수있습니다최종최종진짜최종.pdf" />
            </div>
            <div>
              <span style="color: #666; font-size: 12px;">특수문자 포함</span>
              <AttachedFile filename="파일명 & 문서 < > &quot; &apos; 100% [최종].pdf" />
            </div>
            <div>
              <span style="color: #666; font-size: 12px;">확장자 없음</span>
              <AttachedFile filename="확장자없는파일명" />
            </div>
            <div>
              <span style="color: #666; font-size: 12px;">숫자로 시작</span>
              <AttachedFile filename="2024_회계보고서.xlsx" />
            </div>
            <div>
              <span style="color: #666; font-size: 12px;">한글+영문+숫자 혼합</span>
              <AttachedFile filename="Project한글123_Final_v2.0.pdf" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 AttachedFile 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// File List Simulation
export const FileListSimulation: Story = {
  render: () => ({
    components: { AttachedFile },
    data() {
      return {
        files: [
          '계약서_최종.pdf',
          '사업계획서_2024_Q1.xlsx', 
          '회사로고_최종본.png',
          'API_문서_v1.2.docx',
          '데이터베이스_스키마.sql'
        ]
      };
    },
    methods: {
      removeFile(filename: string) {
        this.files = this.files.filter(file => file !== filename);
      }
    },
    template: `
      <div style="width: 500px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <h4 style="font-size: 16px; font-weight: 600;">첨부 파일 ({{ files.length }}개)</h4>
          <span style="font-size: 12px; color: #666;">삭제 버튼을 클릭하여 파일을 제거할 수 있습니다</span>
        </div>
        <div v-if="files.length > 0" style="border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
          <AttachedFile 
            v-for="(filename, index) in files" 
            :key="filename"
            :filename="filename"
            @delete="removeFile"
            :style="{ borderBottom: index === files.length - 1 ? 'none' : '1px solid #f0f0f0' }"
          />
        </div>
        <div v-else style="text-align: center; padding: 40px; color: #666; border: 2px dashed #e1e1e1; border-radius: 8px;">
          첨부된 파일이 없습니다.
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '실제 파일 목록에서의 사용 예시입니다. 파일을 삭제하면 목록에서 제거됩니다.',
      },
    },
  },
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => ({
    components: { AttachedFile },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 400px;">
        <div>
          <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600;">접근성 테스트</h4>
          <p style="margin-bottom: 16px; font-size: 14px; color: #666; line-height: 1.5;">
            Tab 키를 사용하여 삭제 버튼으로 이동하고, Enter 또는 Space 키로 활성화할 수 있습니다.
            스크린 리더는 "삭제" alt 텍스트를 읽어줍니다.
          </p>
          <div style="display: flex; flex-direction: column; gap: 0;">
            <AttachedFile filename="키보드 접근 가능 파일1.pdf" />
            <AttachedFile filename="스크린 리더 호환 파일2.docx" />
            <AttachedFile filename="포커스 표시 파일3.xlsx" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'AttachedFile의 접근성 기능을 확인할 수 있습니다. 키보드 내비게이션과 스크린 리더 지원이 포함됩니다.',
      },
    },
  },
};

// Component States
export const ComponentStates: Story = {
  render: () => ({
    components: { AttachedFile },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; width: 100%; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">기본 상태</h4>
          <AttachedFile filename="일반 파일.pdf" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">호버 상태</h4>
          <p style="color: #666; font-size: 14px; margin-bottom: 8px;">삭제 버튼 위로 마우스를 올려보세요</p>
          <AttachedFile filename="호버 테스트 파일.pdf" />
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">포커스 상태</h4>
          <p style="color: #666; font-size: 14px; margin-bottom: 8px;">Tab 키로 삭제 버튼에 포커스를 맞춰보세요</p>
          <AttachedFile filename="포커스 테스트 파일.pdf" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'AttachedFile 컴포넌트의 다양한 상태(기본, 호버, 포커스)를 확인할 수 있습니다.',
      },
    },
  },
};

// Performance Test
export const PerformanceTest: Story = {
  render: () => ({
    components: { AttachedFile },
    data() {
      return {
        files: Array.from({ length: 50 }, (_, i) => `대용량파일_${i + 1}.pdf`)
      };
    },
    methods: {
      removeFile(filename: string) {
        this.files = this.files.filter(file => file !== filename);
      }
    },
    template: `
      <div style="width: 500px; max-height: 400px; overflow-y: auto; border: 1px solid #e1e1e1; border-radius: 8px;">
        <div style="padding: 16px; background: #f8f9fa; border-bottom: 1px solid #e1e1e1;">
          <h4 style="margin: 0; font-size: 14px; font-weight: 600;">대용량 파일 목록 ({{ files.length }}개)</h4>
          <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">성능 테스트용 - 50개 파일</p>
        </div>
        <div>
          <AttachedFile 
            v-for="(filename, index) in files" 
            :key="filename"
            :filename="filename"
            @delete="removeFile"
            :style="{ borderBottom: index === files.length - 1 ? 'none' : '1px solid #f0f0f0' }"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '많은 수의 AttachedFile 컴포넌트 렌더링 성능을 테스트할 수 있습니다. (50개 항목)',
      },
    },
  },
};

// Individual Stories for Each Feature
export const BasicFile: Story = {
  args: {
    filename: '기본파일.pdf',
    type: '1line',
  },
  parameters: {
    docs: {
      description: {
        story: '기본적인 AttachedFile 컴포넌트 예시입니다.',
      },
    },
  },
};

export const LongFilename: Story = {
  args: {
    filename: '이것은매우긴파일명의예시로써실제환경에서나타날수있는상황을시뮬레이션하기위한테스트파일입니다.pdf',
    type: '1line',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 파일명이 어떻게 처리되는지 확인할 수 있습니다.',
      },
    },
  },
};

export const EmptyFilename: Story = {
  args: {
    filename: '',
    type: '1line',
  },
  parameters: {
    docs: {
      description: {
        story: '빈 파일명이 전달된 경우의 렌더링을 확인할 수 있습니다.',
      },
    },
  },
};

// Interactive Story with Play Function
export const InteractiveTest: Story = {
  args: {
    filename: '클릭테스트.pdf',
    type: '1line',
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const deleteButton = canvas.getByTestId('delete-button');
    // await userEvent.click(deleteButton);
  },
  parameters: {
    docs: {
      description: {
        story: '삭제 이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
};

// Figma Design Reproduction
export const FigmaDesignReproduction: Story = {
  render: () => ({
    components: { AttachedFile },
    template: `
      <div style="width: 400px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma 디자인 재현
        </h3>
        <div style="border: 1px solid #e1e1e1; border-radius: 8px; background: white; padding: 0;">
          <AttachedFile filename="파일명" type="1line" />
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #666; text-align: center; line-height: 1.4;">
          이 컴포넌트는 Figma 디자인을 100% 정확하게 재현합니다.<br/>
          - 구분선 스타일: #f0f0f0<br/>
          - 텍스트 스타일: Pretendard Medium 14px<br/>
          - 아이콘: 24x24px 삭제 아이콘<br/>
          - 간격: 16px gap
        </p>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Figma에서 제공된 디자인 스펙을 정확히 재현한 AttachedFile 컴포넌트입니다.',
      },
    },
  },
};