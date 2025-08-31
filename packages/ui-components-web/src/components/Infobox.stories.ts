import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from 'storybook/test';
import Infobox from './Infobox.vue';

const meta = {
  title: 'Components/Infobox',
  component: Infobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Infobox 컴포넌트는 정보를 시각적으로 구조화하여 표시하는 컨테이너입니다.

**주요 특징:**
- **타입**: Default(제목+본문), onlyTitle(제목만), onlyBody(본문만)
- **제목 텍스트**: 사용자 정의 가능한 제목
- **본문 아이템**: 배열 형태로 여러 텍스트 아이템 지원
- **인터랙션**: 클릭 이벤트 지원

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    titleText: {
      control: 'text',
      description: '인포박스의 제목 텍스트입니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'타이틀'" },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['Default', 'onlyTitle', 'onlyBody'],
      description: '인포박스의 표시 타입을 설정합니다.',
      table: {
        type: { summary: "'Default' | 'onlyTitle' | 'onlyBody'" },
        defaultValue: { summary: "'Default'" },
      },
    },
    bodyItems: {
      control: 'object',
      description: '본문에 표시될 텍스트 아이템들의 배열입니다.',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: "['텍스트 내용', '텍스트 내용']" },
      },
    },
    onClick: {
      description: '인포박스 클릭 시 발생하는 이벤트입니다.',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Infobox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    titleText: '타이틀',
    type: 'Default',
    bodyItems: ['텍스트 내용', '텍스트 내용'],
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 인포박스의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 Infobox 컴포넌트입니다. (type: Default, 제목과 본문 모두 표시)',
      },
    },
  },
};

// Type Variants
export const Types: Story = {
  render: () => ({
    components: { Infobox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">Default (제목 + 본문)</h4>
          <Infobox 
            type="Default" 
            title-text="기본 타입 인포박스" 
            :body-items="['첫 번째 정보입니다', '두 번째 정보입니다']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">onlyTitle (제목만)</h4>
          <Infobox 
            type="onlyTitle" 
            title-text="제목만 표시되는 인포박스" 
            :body-items="['이 텍스트는 표시되지 않습니다']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 16px; font-weight: 600;">onlyBody (본문만)</h4>
          <Infobox 
            type="onlyBody" 
            title-text="이 제목은 표시되지 않습니다" 
            :body-items="['본문만 표시되는 내용 1', '본문만 표시되는 내용 2']" 
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 타입 변형을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// 개별 Type Stories
export const DefaultType: Story = {
  args: {
    type: 'Default',
    titleText: '일반적인 인포박스',
    bodyItems: ['주요 정보를 제공합니다', '사용자에게 도움이 되는 내용']
  },
  parameters: {
    docs: {
      description: {
        story: 'Default 타입은 제목과 본문을 모두 표시합니다.',
      },
    },
  },
};

export const OnlyTitleType: Story = {
  args: {
    type: 'onlyTitle',
    titleText: '제목만 있는 인포박스',
    bodyItems: ['이 내용은 표시되지 않습니다']
  },
  parameters: {
    docs: {
      description: {
        story: 'onlyTitle 타입은 제목만 표시하며, 간단한 정보 전달에 적합합니다.',
      },
    },
  },
};

export const OnlyBodyType: Story = {
  args: {
    type: 'onlyBody',
    titleText: '이 제목은 표시되지 않습니다',
    bodyItems: ['본문 내용만 표시됩니다', '추가 설명 정보']
  },
  parameters: {
    docs: {
      description: {
        story: 'onlyBody 타입은 본문만 표시하며, 세부 정보 나열에 적합합니다.',
      },
    },
  },
};

// Content Variations
export const ContentVariations: Story = {
  render: () => ({
    components: { Infobox },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; width: 100%; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">단일 본문 아이템</h4>
          <Infobox 
            title-text="공지사항" 
            :body-items="['중요한 업데이트가 있습니다.']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">다중 본문 아이템</h4>
          <Infobox 
            title-text="서비스 안내" 
            :body-items="['월요일~금요일 운영', '오전 9시~오후 6시', '점심시간 12시~1시']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">긴 제목</h4>
          <Infobox 
            title-text="매우 긴 제목이 포함된 인포박스의 예시입니다" 
            :body-items="['제목이 길어도 잘 표시됩니다']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">긴 본문</h4>
          <Infobox 
            title-text="상세 설명" 
            :body-items="['이것은 매우 긴 본문 텍스트의 예시입니다. 여러 줄에 걸쳐 표시될 수 있습니다.', '두 번째 긴 내용도 잘 표시됩니다.']" 
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 콘텐츠 길이와 구성에 따른 인포박스 렌더링을 확인할 수 있습니다.',
      },
    },
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => ({
    components: { Infobox },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; width: 100%; max-width: 900px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">사용자 안내</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Infobox 
              title-text="이용 안내" 
              :body-items="['서비스 이용 시간: 24시간', '고객센터: 1588-1234']" 
            />
            <Infobox 
              type="onlyTitle" 
              title-text="점검 중입니다" 
            />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">제품 정보</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Infobox 
              title-text="상품 정보" 
              :body-items="['브랜드: ABC Company', '제조국: 대한민국', '용량: 500ml']" 
            />
            <Infobox 
              type="onlyBody" 
              :body-items="['무료배송 가능', '당일 발송', '반품 가능 (7일 이내)']" 
            />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">알림</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Infobox 
              title-text="시스템 점검 안내" 
              :body-items="['점검 일시: 2024.03.15 02:00~04:00', '점검 내용: 서버 업그레이드']" 
            />
            <Infobox 
              type="onlyTitle" 
              title-text="새로운 기능이 추가되었습니다!" 
            />
          </div>
        </div>
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">FAQ</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Infobox 
              title-text="자주 묻는 질문" 
              :body-items="['Q. 배송은 얼마나 걸리나요?', 'A. 영업일 기준 2-3일 소요됩니다.']" 
            />
            <Infobox 
              type="onlyBody" 
              :body-items="['문의사항은 고객센터로 연락해주세요', '평일 09:00-18:00 운영']" 
            />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용되는 인포박스 예시들입니다.',
      },
    },
  },
};

// Interactive Test
export const InteractiveTest: Story = {
  args: {
    titleText: '클릭 가능한 인포박스',
    bodyItems: ['클릭하면 이벤트가 발생합니다', '액션 탭에서 이벤트를 확인하세요']
  },
  play: async ({ canvasElement }) => {
    // Storybook의 testing-library 사용 예시
    // 실제 사용 시에는 @storybook/testing-library에서 import
    // const canvas = within(canvasElement);
    // const infobox = canvas.getByTestId('infobox');
    // await userEvent.click(infobox);
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 이벤트 핸들러 동작을 테스트할 수 있는 인터랙티브 스토리입니다.',
      },
    },
  },
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => ({
    components: { Infobox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; width: 100%; max-width: 600px;">
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">빈 제목</h4>
          <Infobox title-text="" :body-items="['제목이 비어있는 경우']" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">빈 본문 배열</h4>
          <Infobox title-text="본문이 없는 경우" :body-items="[]" />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">특수문자 포함</h4>
          <Infobox 
            title-text="특수문자 & 기호 < > &quot; &apos; 100% 포함"
            :body-items="['HTML 태그 <script>, 따옴표 &quot;test&quot;', '기호 & 퍼센트 100% 완료!']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">이모지 포함</h4>
          <Infobox 
            title-text="🎉 축하합니다! 🎊"
            :body-items="['✅ 작업이 완료되었습니다', '📞 문의: 1588-1234', '⏰ 운영시간: 09:00-18:00']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">매우 많은 본문 아이템</h4>
          <Infobox 
            title-text="여러 항목 목록"
            :body-items="[
              '첫 번째 항목입니다',
              '두 번째 항목입니다', 
              '세 번째 항목입니다',
              '네 번째 항목입니다',
              '다섯 번째 항목입니다',
              '여섯 번째 항목입니다',
              '마지막 항목입니다'
            ]" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 8px; font-size: 14px; font-weight: 600;">다국어 (영어)</h4>
          <Infobox 
            title-text="English Title Example"
            :body-items="['This is English content', 'Multiple language support test']" 
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 엣지 케이스에서의 인포박스 동작을 확인할 수 있습니다.',
      },
    },
  },
};

// Body Items Variations
export const BodyItemsVariations: Story = {
  render: () => ({
    components: { Infobox },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; width: 100%; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">1개 아이템</h4>
          <Infobox 
            title-text="단일 정보" 
            :body-items="['하나의 정보만 표시됩니다']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">2개 아이템 (기본)</h4>
          <Infobox 
            title-text="기본 구성" 
            :body-items="['첫 번째 정보', '두 번째 정보']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">3개 아이템</h4>
          <Infobox 
            title-text="세 가지 정보" 
            :body-items="['첫 번째 정보', '두 번째 정보', '세 번째 정보']" 
          />
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #666;">5개 아이템</h4>
          <Infobox 
            title-text="다섯 가지 정보" 
            :body-items="['첫 번째', '두 번째', '세 번째', '네 번째', '다섯 번째']" 
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'bodyItems 배열의 개수에 따른 렌더링을 확인할 수 있습니다.',
      },
    },
  },
};

// All Types Comparison
export const AllTypesComparison: Story = {
  render: () => ({
    components: { Infobox },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; width: 100%; max-width: 1000px;">
        <div style="text-align: center;">
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #19973c;">Default</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Infobox 
              type="Default" 
              title-text="기본 타입" 
              :body-items="['제목과 본문', '모두 표시']" 
            />
            <Infobox 
              type="Default" 
              title-text="사용자 가이드" 
              :body-items="['단계별 설명', '자세한 안내', '추가 정보']" 
            />
            <Infobox 
              type="Default" 
              title-text="공지사항" 
              :body-items="['중요 알림']" 
            />
          </div>
        </div>
        <div style="text-align: center;">
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #4285f4;">onlyTitle</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Infobox 
              type="onlyTitle" 
              title-text="제목만 표시" 
            />
            <Infobox 
              type="onlyTitle" 
              title-text="간단한 정보 전달에 적합" 
            />
            <Infobox 
              type="onlyTitle" 
              title-text="헤드라인 형태의 메시지" 
            />
          </div>
        </div>
        <div style="text-align: center;">
          <h4 style="margin-bottom: 16px; font-weight: 600; color: #e24949;">onlyBody</h4>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Infobox 
              type="onlyBody" 
              :body-items="['본문만 표시', '세부 정보 나열']" 
            />
            <Infobox 
              type="onlyBody" 
              :body-items="['목록 형태', '여러 항목', '순차 정보']" 
            />
            <Infobox 
              type="onlyBody" 
              :body-items="['상세 설명만 필요한 경우']" 
            />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '모든 타입의 다양한 사용 예시를 비교하여 확인할 수 있습니다.',
      },
    },
  },
};

// Figma Design Showcase
export const FigmaDesignShowcase: Story = {
  render: () => ({
    components: { Infobox },
    template: `
      <div style="width: 100%; max-width: 1200px;">
        <h3 style="margin-bottom: 24px; text-align: center; font-size: 18px; font-weight: 600;">
          Figma Design System - Infobox Components
        </h3>
        <div style="display: flex; flex-direction: column; gap: 32px;">
          <div>
            <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600; color: #19973c; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">
              Type: Default (제목 + 본문)
            </h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              <Infobox type="Default" title-text="타이틀" :body-items="['텍스트 내용', '텍스트 내용']" />
              <Infobox type="Default" title-text="서비스 안내" :body-items="['평일 09:00-18:00 운영', '토요일 10:00-16:00 운영']" />
            </div>
          </div>
          <div>
            <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600; color: #4285f4; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">
              Type: onlyTitle (제목만)
            </h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              <Infobox type="onlyTitle" title-text="타이틀" />
              <Infobox type="onlyTitle" title-text="시스템 점검이 완료되었습니다" />
            </div>
          </div>
          <div>
            <h4 style="margin-bottom: 16px; font-size: 16px; font-weight: 600; color: #e24949; border-bottom: 2px solid #f0f0f0; padding-bottom: 8px;">
              Type: onlyBody (본문만)
            </h4>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
              <Infobox type="onlyBody" :body-items="['텍스트 내용', '텍스트 내용']" />
              <Infobox type="onlyBody" :body-items="['무료배송 가능', '당일발송 서비스', '반품 가능 (7일 이내)']" />
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
        story: 'Figma 디자인 시스템의 모든 Infobox 변형을 디자인 의도에 맞게 구현한 결과를 확인할 수 있습니다.',
      },
    },
  },
};