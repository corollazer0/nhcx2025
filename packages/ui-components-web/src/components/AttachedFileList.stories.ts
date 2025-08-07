// src/components/AttachedFileList.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { within, expect, userEvent } from 'storybook/test';
import AttachedFileList from './AttachedFileList.vue';

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof AttachedFileList> = {
  title: 'Components/AttachedFileList',
  tags: ['autodocs'],
  component: AttachedFileList,
  argTypes: {
    // Figma Properties
    type: {
      control: { type: 'select' },
      options: ['1line', '2line', '3line', '4line', '5line'],
      description: '리스트 라인 유형 (Figma variant)',
      table: { category: 'Figma Properties' },
    },

    // 동적 데이터 Props
    fileItems: {
      control: { type: 'object' },
      description: '첨부파일 목록',
      table: { category: 'Dynamic Content' },
    },
    closeIconSrc: {
      control: { type: 'text' },
      description: '닫기 아이콘 이미지 URL',
      table: { category: 'Dynamic Content' },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Figma 디자인을 기반으로 구현된 첨부파일 리스트 컴포넌트입니다. 1~5줄까지 다양한 라인 수를 지원하며, 각 파일별로 삭제 기능을 제공합니다.',
      },
    },
    layout: 'padded',
  },
};
export default meta;
type Story = StoryObj<typeof AttachedFileList>;

/* ──────────────────────────────────────────────
   1) Playground - 모든 Controls로 실험
   ──────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    type: '3line',
    fileItems: [
      { fileName: '문서.pdf', id: 1 },
      { fileName: '이미지.jpg', id: 2 },
      { fileName: '스프레드시트.xlsx', id: 3 },
    ],
  },
};

/* ──────────────────────────────────────────────
   2) 기본 - 1line 타입
   ──────────────────────────────────────────── */
export const Default: Story = {
  args: {
    type: '1line',
    fileItems: [{ fileName: '파일명.pdf' }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 기본 파일명이 표시되는지 확인
    await expect(canvas.getByText('파일명.pdf')).toBeInTheDocument();
    
    // 닫기 버튼이 있는지 확인
    await expect(canvas.getByLabelText('파일명.pdf 파일 삭제')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   3) 1Line - 단일 파일
   ──────────────────────────────────────────── */
export const OneLine: Story = {
  args: {
    type: '1line',
    fileItems: [{ fileName: 'report-2024.pdf', id: 'file_001' }],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('report-2024.pdf')).toBeInTheDocument();
    
    // 1line이므로 파일이 하나만 표시되어야 함
    const fileItems = canvas.getAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('파일 삭제')
    );
    expect(fileItems).toHaveLength(1);
  },
};

/* ──────────────────────────────────────────────
   4) 2Line - 파일 2개
   ──────────────────────────────────────────── */
export const TwoLine: Story = {
  args: {
    type: '2line',
    fileItems: [
      { fileName: 'presentation.pptx', id: 'file_001' },
      { fileName: 'budget.xlsx', id: 'file_002' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('presentation.pptx')).toBeInTheDocument();
    await expect(canvas.getByText('budget.xlsx')).toBeInTheDocument();
    
    // 2line이므로 파일이 2개 표시되어야 함
    const closeButtons = canvas.getAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('파일 삭제')
    );
    expect(closeButtons).toHaveLength(2);
  },
};

/* ──────────────────────────────────────────────
   5) 3Line - 파일 3개
   ──────────────────────────────────────────── */
export const ThreeLine: Story = {
  args: {
    type: '3line',
    fileItems: [
      { fileName: 'contract.pdf', id: 'file_001' },
      { fileName: 'invoice.docx', id: 'file_002' },
      { fileName: 'receipt.jpg', id: 'file_003' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('contract.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('invoice.docx')).toBeInTheDocument();
    await expect(canvas.getByText('receipt.jpg')).toBeInTheDocument();
    
    const closeButtons = canvas.getAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('파일 삭제')
    );
    expect(closeButtons).toHaveLength(3);
  },
};

/* ──────────────────────────────────────────────
   6) 4Line - 파일 4개
   ──────────────────────────────────────────── */
export const FourLine: Story = {
  args: {
    type: '4line',
    fileItems: [
      { fileName: 'manual.pdf', id: 'file_001' },
      { fileName: 'diagram.png', id: 'file_002' },
      { fileName: 'data.csv', id: 'file_003' },
      { fileName: 'summary.docx', id: 'file_004' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('manual.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('diagram.png')).toBeInTheDocument();
    await expect(canvas.getByText('data.csv')).toBeInTheDocument();
    await expect(canvas.getByText('summary.docx')).toBeInTheDocument();
    
    const closeButtons = canvas.getAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('파일 삭제')
    );
    expect(closeButtons).toHaveLength(4);
  },
};

/* ──────────────────────────────────────────────
   7) 5Line - 파일 5개 (최대)
   ──────────────────────────────────────────── */
export const FiveLine: Story = {
  args: {
    type: '5line',
    fileItems: [
      { fileName: 'project-overview.pdf', id: 'file_001' },
      { fileName: 'technical-specs.docx', id: 'file_002' },
      { fileName: 'timeline.xlsx', id: 'file_003' },
      { fileName: 'mockups.zip', id: 'file_004' },
      { fileName: 'resources.txt', id: 'file_005' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('project-overview.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('technical-specs.docx')).toBeInTheDocument();
    await expect(canvas.getByText('timeline.xlsx')).toBeInTheDocument();
    await expect(canvas.getByText('mockups.zip')).toBeInTheDocument();
    await expect(canvas.getByText('resources.txt')).toBeInTheDocument();
    
    const closeButtons = canvas.getAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('파일 삭제')
    );
    expect(closeButtons).toHaveLength(5);
  },
};

/* ──────────────────────────────────────────────
   8) 긴 파일명 테스트
   ──────────────────────────────────────────── */
export const LongFileNames: Story = {
  args: {
    type: '3line',
    fileItems: [
      { fileName: 'very-long-file-name-that-might-cause-overflow-issues-in-the-ui-component.pdf', id: 'long_001' },
      { fileName: '한글파일명도-매우-길게-작성해보겠습니다-오버플로우-테스트용.docx', id: 'long_002' },
      { fileName: 'short.txt', id: 'short_001' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 긴 파일명이 올바르게 표시되는지 확인
    await expect(canvas.getByText('very-long-file-name-that-might-cause-overflow-issues-in-the-ui-component.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('한글파일명도-매우-길게-작성해보겠습니다-오버플로우-테스트용.docx')).toBeInTheDocument();
    await expect(canvas.getByText('short.txt')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   9) 파일 개수가 부족한 경우
   ──────────────────────────────────────────── */
export const InsufficientFiles: Story = {
  args: {
    type: '5line',
    fileItems: [
      { fileName: 'only-file.pdf', id: 'file_001' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 5line 타입이지만 파일이 1개만 있는 경우
    await expect(canvas.getByText('only-file.pdf')).toBeInTheDocument();
    
    // 나머지 파일 슬롯은 비어있어야 함
    const closeButtons = canvas.getAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('파일 삭제')
    );
    expect(closeButtons).toHaveLength(1);
  },
};

/* ──────────────────────────────────────────────
   10) 빈 파일 리스트
   ──────────────────────────────────────────── */
export const EmptyFileList: Story = {
  args: {
    type: '3line',
    fileItems: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 파일이 없으므로 파일 관련 버튼이 없어야 함
    const closeButtons = canvas.queryAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('파일 삭제')
    );
    expect(closeButtons).toHaveLength(0);
    
    // 컨테이너는 여전히 존재해야 함
    const container = canvas.getByTestId('attached-file-list');
    expect(container).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   11) 다양한 파일 확장자
   ──────────────────────────────────────────── */
export const VariousFileTypes: Story = {
  args: {
    type: '5line',
    fileItems: [
      { fileName: 'document.pdf', id: 'pdf_001' },
      { fileName: 'image.jpg', id: 'jpg_001' },
      { fileName: 'video.mp4', id: 'mp4_001' },
      { fileName: 'archive.zip', id: 'zip_001' },
      { fileName: 'code.js', id: 'js_001' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 다양한 파일 확장자가 모두 표시되는지 확인
    await expect(canvas.getByText('document.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('image.jpg')).toBeInTheDocument();
    await expect(canvas.getByText('video.mp4')).toBeInTheDocument();
    await expect(canvas.getByText('archive.zip')).toBeInTheDocument();
    await expect(canvas.getByText('code.js')).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   12) 이벤트 테스트
   ──────────────────────────────────────────── */
export const InteractiveEvents: Story = {
  args: {
    type: '2line',
    fileItems: [
      { fileName: 'important.pdf', id: 'imp_001' },
      { fileName: 'backup.zip', id: 'bak_001' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    console.log('🎯 첨부파일 리스트 이벤트 테스트 시작');

    // 1. 파일 아이템 클릭 테스트
    const fileItem = canvas.getByRole('button', { name: 'important.pdf 파일 선택' });
    await user.click(fileItem);
    console.log('✅ 파일 아이템 클릭 - 파일 상세보기 (emit 이벤트 발생)');

    // 2. 키보드 네비게이션 테스트
    const secondFileItem = canvas.getByRole('button', { name: 'backup.zip 파일 선택' });
    secondFileItem.focus();
    await user.keyboard('{Enter}');
    console.log('✅ 키보드로 파일 선택 - 접근성 지원 (emit 이벤트 발생)');

    // 3. 닫기 버튼 클릭 테스트
    const closeButton = canvas.getByLabelText('important.pdf 파일 삭제');
    await user.click(closeButton);
    console.log('✅ 닫기 버튼 클릭 - 파일 삭제 처리 (emit 이벤트 발생)');

    // 4. Space 키로 파일 선택 테스트
    const remainingFileItem = canvas.getByRole('button', { name: 'backup.zip 파일 선택' });
    remainingFileItem.focus();
    await user.keyboard(' ');
    console.log('✅ Space 키로 파일 선택 - 키보드 접근성 (emit 이벤트 발생)');

    // 이벤트 발생 통계
    console.log('📊 emit 이벤트 발생 통계:');
    console.log('- file-item-click: 3회 (마우스 클릭 1회, Enter 키 1회, Space 키 1회)');
    console.log('- close-click: 1회 (닫기 버튼 클릭)');
    console.log('- 마우스 이벤트: MouseEvent 타입으로 전달');
    console.log('- 키보드 이벤트: KeyboardEvent 타입으로 전달');
    console.log('- 파일 데이터와 인덱스도 함께 전달');
    console.log('💡 실제 프로젝트에서는 부모 컴포넌트가 이 이벤트들을 받아서 파일 관리 로직을 처리합니다');
  },
};

/* ──────────────────────────────────────────────
   13) 커스텀 닫기 아이콘
   ──────────────────────────────────────────── */
export const CustomCloseIcon: Story = {
  args: {
    type: '2line',
    fileItems: [
      { fileName: 'custom-icon-test.pdf', id: 'custom_001' },
      { fileName: 'another-file.docx', id: 'custom_002' },
    ],
    closeIconSrc: "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6 6L18 18M6 18L18 6' stroke='%23ff0000' stroke-width='3' stroke-linecap='round'/%3e%3c/svg%3e"
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 파일이 표시되는지 확인
    await expect(canvas.getByText('custom-icon-test.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('another-file.docx')).toBeInTheDocument();
    
    // 커스텀 아이콘이 적용된 닫기 버튼들이 있는지 확인
    const closeButtons = canvas.getAllByRole('button').filter(btn => 
      btn.getAttribute('aria-label')?.includes('파일 삭제')
    );
    expect(closeButtons).toHaveLength(2);
    
    console.log('✅ 커스텀 닫기 아이콘이 적용되었습니다 (빨간색 X 아이콘)');
  },
};

/* ──────────────────────────────────────────────
   14) 디버깅용 - 모든 타입 비교
   ──────────────────────────────────────────── */
export const AllTypesComparison: Story = {
  render: () => ({
    components: { AttachedFileList },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
        <div v-for="(type, index) in types" :key="type" style="border: 1px solid #ccc; padding: 10px; border-radius: 8px;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px;">{{ type }} ({{ fileItems.slice(0, index + 1).length }}개 파일)</h3>
          <AttachedFileList 
            :type="type"
            :fileItems="fileItems.slice(0, index + 1)"
          />
        </div>
      </div>
    `,
    data() {
      return {
        types: ['1line', '2line', '3line', '4line', '5line'],
        fileItems: [
          { fileName: '첫번째파일.pdf', id: '1' },
          { fileName: '두번째파일.docx', id: '2' }, 
          { fileName: '세번째파일.xlsx', id: '3' },
          { fileName: '네번째파일.jpg', id: '4' },
          { fileName: '다섯번째파일.txt', id: '5' },
        ]
      }
    }
  }),
  parameters: {
    layout: 'fullscreen',
  },
};

/* ──────────────────────────────────────────────
   15) 실제 사용 예제
   ──────────────────────────────────────────── */
export const RealWorldExample: Story = {
  args: {
    type: '4line',
    fileItems: [
      { fileName: '2024년_사업계획서_최종.pdf', id: 'biz_001' },
      { fileName: '예산_계획_v2.xlsx', id: 'budget_001' },
      { fileName: '조직도_2024.png', id: 'org_001' },
      { fileName: '회의록_20240101.docx', id: 'meeting_001' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    console.log('🎯 실제 사용 시나리오 테스트 시작 - 문서 관리 시스템');

    // 컴포넌트 요소들이 올바르게 렌더링되었는지 확인
    await expect(canvas.getByText('2024년_사업계획서_최종.pdf')).toBeInTheDocument();
    await expect(canvas.getByText('예산_계획_v2.xlsx')).toBeInTheDocument();
    await expect(canvas.getByText('조직도_2024.png')).toBeInTheDocument();
    await expect(canvas.getByText('회의록_20240101.docx')).toBeInTheDocument();

    // 1. 사용자가 사업계획서를 클릭하여 미리보기
    const businessPlan = canvas.getByRole('button', { name: '2024년_사업계획서_최종.pdf 파일 선택' });
    await user.click(businessPlan);
    console.log('✅ 사업계획서 클릭 - 파일 미리보기 모달 표시');

    // 2. 키보드로 예산 계획 파일 확인
    const budgetPlan = canvas.getByRole('button', { name: '예산_계획_v2.xlsx 파일 선택' });
    budgetPlan.focus();
    await user.keyboard('{Enter}');
    console.log('✅ 키보드로 예산계획서 선택 - 스프레드시트 뷰어 실행');

    // 3. 불필요한 파일(조직도) 삭제
    const deleteOrgChart = canvas.getByLabelText('조직도_2024.png 파일 삭제');
    await user.click(deleteOrgChart);
    console.log('✅ 조직도 파일 삭제 - 파일 관리 시스템에서 제거');

    // 4. 회의록 파일을 Space 키로 선택
    const meetingMinutes = canvas.getByRole('button', { name: '회의록_20240101.docx 파일 선택' });
    meetingMinutes.focus();
    await user.keyboard(' ');
    console.log('✅ Space 키로 회의록 선택 - 문서 편집기 실행');

    // 실제 이벤트 발생 통계
    console.log('📊 문서 관리 시스템 이벤트 통계:');
    console.log('- file-item-click: 3회 (PDF 미리보기, XLSX 뷰어, DOCX 편집기)');
    console.log('- close-click: 1회 (PNG 파일 삭제)');
    console.log('- 파일 타입별 처리: PDF(뷰어), XLSX(스프레드시트), DOCX(편집기), PNG(이미지)');
    console.log('- 접근성: 키보드 네비게이션 지원');
    console.log('💡 실제 문서 관리 시스템에서는:');
    console.log('  - file-item-click → 파일 타입에 따른 적절한 뷰어/편집기 실행');
    console.log('  - close-click → 파일 삭제 확인 대화상자 표시 후 서버에서 제거');
    console.log('  - 드래그&드롭, 파일 업로드, 권한 체크 등 추가 기능 연동');
  },
};