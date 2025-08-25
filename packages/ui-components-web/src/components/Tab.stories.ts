// src/components/Tab.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import Tab from './Tab.vue';

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  tags: ['autodocs'],
  component: Tab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 탭 컴포넌트입니다. 활성 탭 표시와 키보드 네비게이션을 지원하며, 개별 탭 또는 전체 컴포넌트 비활성화가 가능합니다.',
      },
    },
  },
  argTypes: {
    tabs: {
      control: { type: 'object' },
      description: '탭 항목 배열',
      table: { category: 'Content' },
    },
    activeTab: {
      control: { type: 'number', min: 0 },
      description: '활성 탭 인덱스',
      table: { category: 'State' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '전체 컴포넌트 비활성화',
      table: { category: 'State' },
    },
    'onUpdate:activeTab': {
      description: 'v-model을 위한 활성 탭 변경 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onTab-change': {
      description: '탭이 변경될 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onTab-click': {
      description: '탭이 클릭될 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    variant: {
      control: { type: 'select' },
      options: ['line', 'chip', 'bar', 'underline'],
      description: '탭 스타일 변형',
      table: { category: 'Appearance' },
    },
  },
  args: {
    tabs: [
      { id: 1, label: '메뉴' },
      { id: 2, label: '메뉴' }
    ],
    activeTab: 0,
    disabled: false,
    variant: 'line',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls을 사용할 수 있는 기본 스토리
export const Playground: Story = {
  args: {
    tabs: [
      { id: 1, label: '홈' },
      { id: 2, label: '소개' },
      { id: 3, label: '서비스' },
      { id: 4, label: '연락처' }
    ],
    activeTab: 0,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조정할 수 있는 플레이그라운드입니다. 탭을 클릭하거나 키보드로 네비게이션해보세요.',
      },
    },
  },
};

// Default - Figma 디자인의 기본 상태
export const Default: Story = {
  args: {
    tabs: [
      { id: 1, label: '메뉴' },
      { id: 2, label: '메뉴' }
    ],
    activeTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma 디자인의 기본 상태입니다. 첫 번째 탭이 활성화되어 있습니다.',
      },
    },
  },
};

// Chip Variant - Figma chip 스타일
export const ChipVariant: Story = {
  args: {
    tabs: [
      { id: 1, label: '메뉴' },
      { id: 2, label: '메뉴' }
    ],
    activeTab: 0,
    variant: 'chip',
  },
  parameters: {
    docs: {
      description: {
        story: '피그마에서 가져온 chip 스타일 variant입니다. 둥근 배경과 다른 색상 체계를 사용합니다.',
      },
    },
  },
};

// Variant Comparison - 스타일 비교
export const VariantComparison: Story = {
  render: (args) => ({
    components: { Tab },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">Line Variant (기본)</h3>
          <Tab 
            :tabs="[
              { id: 1, label: '홈' },
              { id: 2, label: '소개' },
              { id: 3, label: '서비스' }
            ]"
            :activeTab="1"
            variant="line"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">Chip Variant (새로운 스타일)</h3>
          <Tab 
            :tabs="[
              { id: 1, label: '홈' },
              { id: 2, label: '소개' },
              { id: 3, label: '서비스' }
            ]"
            :activeTab="1"
            variant="chip"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Line variant와 Chip variant를 나란히 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// Underline Variant - Figma underline 스타일
export const UnderlineVariant: Story = {
  args: {
    tabs: [
      { id: 1, label: '메뉴' },
      { id: 2, label: '메뉴' }
    ],
    activeTab: 0,
    variant: 'underline',
  },
  parameters: {
    docs: {
      description: {
        story: '피그마에서 가져온 underline 스타일 variant입니다. 하단 밑줄로 활성 상태를 표시합니다.',
      },
    },
  },
};

// Bar Variant - Figma bar 스타일
export const BarVariant: Story = {
  args: {
    tabs: [
      { id: 1, label: '메뉴' },
      { id: 2, label: '메뉴' }
    ],
    activeTab: 0,
    variant: 'bar',
  },
  parameters: {
    docs: {
      description: {
        story: '피그마에서 가져온 bar 스타일 variant입니다. 둥근 모서리의 배경과 그림자 효과를 사용합니다.',
      },
    },
  },
};

// All Variants Comparison - 모든 스타일 비교
export const AllVariantsComparison: Story = {
  render: (args) => ({
    components: { Tab },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">Line Variant (기본)</h3>
          <Tab 
            :tabs="[
              { id: 1, label: '홈' },
              { id: 2, label: '소개' },
              { id: 3, label: '서비스' }
            ]"
            :activeTab="1"
            variant="line"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">Chip Variant</h3>
          <Tab 
            :tabs="[
              { id: 1, label: '홈' },
              { id: 2, label: '소개' },
              { id: 3, label: '서비스' }
            ]"
            :activeTab="1"
            variant="chip"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">Bar Variant</h3>
          <Tab 
            :tabs="[
              { id: 1, label: '홈' },
              { id: 2, label: '소개' },
              { id: 3, label: '서비스' }
            ]"
            :activeTab="1"
            variant="bar"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #121212;">Underline Variant (새로운 스타일)</h3>
          <Tab 
            :tabs="[
              { id: 1, label: '홈' },
              { id: 2, label: '소개' },
              { id: 3, label: '서비스' }
            ]"
            :activeTab="1"
            variant="underline"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 variant (Line, Chip, Bar, Underline)를 나란히 비교할 수 있는 스토리입니다.',
      },
    },
  },
};

// Underline Variant States - underline 상태들
export const UnderlineVariantStates: Story = {
  render: (args) => ({
    components: { Tab },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">기본 상태</div>
          <Tab 
            :tabs="[
              { id: 1, label: '메뉴' },
              { id: 2, label: '메뉴' }
            ]"
            :activeTab="0"
            variant="underline"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">여러 탭</div>
          <Tab 
            :tabs="[
              { id: 1, label: '대시보드' },
              { id: 2, label: '분석' },
              { id: 3, label: '설정' },
              { id: 4, label: '프로필' }
            ]"
            :activeTab="2"
            variant="underline"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">비활성화된 탭 포함</div>
          <Tab 
            :tabs="[
              { id: 1, label: '활성 탭' },
              { id: 2, label: '정상 탭' },
              { id: 3, label: '비활성 탭', disabled: true }
            ]"
            :activeTab="0"
            variant="underline"
          />
        </div>
        
        <div style="opacity: 0.6;">
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">전체 비활성화</div>
          <Tab 
            :tabs="[
              { id: 1, label: '탭 1' },
              { id: 2, label: '탭 2' },
              { id: 3, label: '탭 3' }
            ]"
            :activeTab="1"
            variant="underline"
            :disabled="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Underline variant의 다양한 상태를 보여주는 스토리입니다.',
      },
    },
  },
};

// Bar Variant States - bar 상태들
export const BarVariantStates: Story = {
  render: (args) => ({
    components: { Tab },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">기본 상태</div>
          <Tab 
            :tabs="[
              { id: 1, label: '메뉴' },
              { id: 2, label: '메뉴' }
            ]"
            :activeTab="0"
            variant="bar"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">여러 탭</div>
          <Tab 
            :tabs="[
              { id: 1, label: '대시보드' },
              { id: 2, label: '분석' },
              { id: 3, label: '설정' },
              { id: 4, label: '프로필' }
            ]"
            :activeTab="2"
            variant="bar"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">비활성화된 탭 포함</div>
          <Tab 
            :tabs="[
              { id: 1, label: '활성 탭' },
              { id: 2, label: '정상 탭' },
              { id: 3, label: '비활성 탭', disabled: true }
            ]"
            :activeTab="0"
            variant="bar"
          />
        </div>
        
        <div style="opacity: 0.6;">
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">전체 비활성화</div>
          <Tab 
            :tabs="[
              { id: 1, label: '탭 1' },
              { id: 2, label: '탭 2' },
              { id: 3, label: '탭 3' }
            ]"
            :activeTab="1"
            variant="bar"
            :disabled="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Bar variant의 다양한 상태를 보여주는 스토리입니다.',
      },
    },
  },
};

// Chip Variant States - chip 상태들
export const ChipVariantStates: Story = {
  render: (args) => ({
    components: { Tab },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">기본 상태</div>
          <Tab 
            :tabs="[
              { id: 1, label: '메뉴' },
              { id: 2, label: '메뉴' }
            ]"
            :activeTab="0"
            variant="chip"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">여러 탭</div>
          <Tab 
            :tabs="[
              { id: 1, label: '대시보드' },
              { id: 2, label: '분석' },
              { id: 3, label: '설정' },
              { id: 4, label: '프로필' }
            ]"
            :activeTab="2"
            variant="chip"
          />
        </div>
        
        <div>
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">비활성화된 탭 포함</div>
          <Tab 
            :tabs="[
              { id: 1, label: '활성 탭' },
              { id: 2, label: '정상 탭' },
              { id: 3, label: '비활성 탭', disabled: true }
            ]"
            :activeTab="0"
            variant="chip"
          />
        </div>
        
        <div style="opacity: 0.6;">
          <div style="margin-bottom: 12px; font-size: 14px; color: #666; font-weight: 500;">전체 비활성화</div>
          <Tab 
            :tabs="[
              { id: 1, label: '탭 1' },
              { id: 2, label: '탭 2' },
              { id: 3, label: '탭 3' }
            ]"
            :activeTab="1"
            variant="chip"
            :disabled="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Chip variant의 다양한 상태를 보여주는 스토리입니다.',
      },
    },
  },
};

// Multiple Tabs - 여러 탭 예시
export const MultipleTabs: Story = {
  args: {
    tabs: [
      { id: 'dashboard', label: '대시보드' },
      { id: 'analytics', label: '분석' },
      { id: 'settings', label: '설정' },
      { id: 'profile', label: '프로필' },
      { id: 'help', label: '도움말' }
    ],
    activeTab: 1,
  },
  parameters: {
    docs: {
      description: {
        story: '여러 탭이 있는 경우의 예시입니다. 두 번째 탭이 활성화되어 있습니다.',
      },
    },
  },
};

// With Disabled Tabs - 비활성화된 탭들
export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      { id: 1, label: '활성 탭' },
      { id: 2, label: '정상 탭' },
      { id: 3, label: '비활성 탭', disabled: true },
      { id: 4, label: '또 다른 비활성 탭', disabled: true }
    ],
    activeTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '일부 탭이 비활성화된 경우입니다. 비활성화된 탭은 클릭할 수 없으며 키보드 네비게이션에서 건너뜁니다.',
      },
    },
  },
};

// Disabled Component - 전체 컴포넌트 비활성화
export const DisabledComponent: Story = {
  args: {
    tabs: [
      { id: 1, label: '탭 1' },
      { id: 2, label: '탭 2' },
      { id: 3, label: '탭 3' }
    ],
    activeTab: 1,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '전체 컴포넌트가 비활성화된 상태입니다. 모든 탭이 비활성화되며 상호작용할 수 없습니다.',
      },
    },
  },
};

// Long Tab Labels - 긴 탭 라벨
export const LongTabLabels: Story = {
  args: {
    tabs: [
      { id: 1, label: '짧은 탭' },
      { id: 2, label: 'This is a very long tab label that should wrap properly' },
      { id: 3, label: '사용자 관리 및 권한 설정' }
    ],
    activeTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 탭 라벨들을 처리하는 예시입니다.',
      },
    },
  },
};

// Single Tab - 단일 탭
export const SingleTab: Story = {
  args: {
    tabs: [
      { id: 1, label: '유일한 탭' }
    ],
    activeTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '탭이 하나만 있는 경우의 예시입니다.',
      },
    },
  },
};

// Empty Tabs - 빈 탭 배열
export const EmptyTabs: Story = {
  args: {
    tabs: [],
    activeTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '탭이 없는 경우의 렌더링입니다. 컨테이너는 남아있지만 탭은 표시되지 않습니다.',
      },
    },
  },
};

// Interactive Examples - 상호작용 예제
export const InteractiveExamples: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: '클릭해보세요' },
      { id: 'tab2', label: '키보드로 이동' },
      { id: 'tab3', label: '접근성 확인' }
    ],
    activeTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '클릭과 키보드 네비게이션을 테스트할 수 있는 인터랙티브 예제입니다.',
      },
    },
  },
};

// Real World Examples - 실제 사용 예시
export const RealWorldExamples: Story = {
  render: (args) => ({
    components: { Tab },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px; max-width: 800px;">
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #121212;">웹사이트 내비게이션</h3>
          <Tab 
            :tabs="[
              { id: 'home', label: '홈' },
              { id: 'products', label: '제품' },
              { id: 'services', label: '서비스' },
              { id: 'about', label: '회사소개' },
              { id: 'contact', label: '연락처' }
            ]"
            :activeTab="0"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #121212;">관리자 대시보드</h3>
          <Tab 
            :tabs="[
              { id: 'overview', label: '개요' },
              { id: 'users', label: '사용자 관리' },
              { id: 'analytics', label: '분석 및 통계' },
              { id: 'settings', label: '시스템 설정', disabled: true }
            ]"
            :activeTab="1"
          />
        </div>
        
        <div>
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #121212;">모바일 앱 탭</h3>
          <Tab 
            :tabs="[
              { id: 'feed', label: '피드' },
              { id: 'search', label: '검색' },
              { id: 'notifications', label: '알림' },
              { id: 'profile', label: '프로필' }
            ]"
            :activeTab="2"
          />
        </div>
        
        <div style="opacity: 0.6;">
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #121212;">비활성화된 탭 (권한 없음)</h3>
          <Tab 
            :tabs="[
              { id: 'public', label: '공개 정보' },
              { id: 'private', label: '개인 정보' },
              { id: 'admin', label: '관리자 전용' }
            ]"
            :activeTab="0"
            :disabled="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 애플리케이션에서 사용될 수 있는 다양한 탭 네비게이션 예시들입니다.',
      },
    },
  },
};

// Event Handling Test - 이벤트 처리 테스트
export const EventHandlingTest: Story = {
  args: {
    tabs: [
      { id: 1, label: '이벤트 테스트 1' },
      { id: 2, label: '이벤트 테스트 2' },
      { id: 3, label: '이벤트 테스트 3' }
    ],
    activeTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '이벤트 처리 기능을 테스트하는 스토리입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 탭들이 렌더링되었는지 확인
    const tabs = canvas.getAllByTestId('tab-tab');
    await expect(tabs).toHaveLength(3);
    
    // 첫 번째 탭이 활성 상태인지 확인
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    
    // 두 번째 탭 클릭
    await userEvent.click(tabs[1]);
    
    // 키보드로 포커스 이동
    await userEvent.tab();
    
    // 화살표 키로 네비게이션 테스트
    tabs[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{ArrowLeft}');
  },
};

// Accessibility Test - 접근성 테스트
export const AccessibilityTest: Story = {
  args: {
    tabs: [
      { id: 1, label: '접근성 탭 1' },
      { id: 2, label: '접근성 탭 2' },
      { id: 3, label: '접근성 탭 3' }
    ],
    activeTab: 1,
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
    
    // 메인 컴포넌트 확인
    const tab = canvas.getByTestId('tab');
    await expect(tab).toBeInTheDocument();
    
    // 모든 탭이 적절한 ARIA 속성을 가지는지 확인
    const tabs = canvas.getAllByTestId('tab-tab');
    
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      await expect(tab).toHaveAttribute('role', 'tab');
      await expect(tab).toHaveAttribute('aria-controls', `tabpanel-${i + 1}`);
      
      if (i === 1) { // activeTab이 1이므로
        await expect(tab).toHaveAttribute('aria-selected', 'true');
        await expect(tab).toHaveAttribute('tabindex', '0');
      } else {
        await expect(tab).toHaveAttribute('aria-selected', 'false');
        await expect(tab).toHaveAttribute('tabindex', '-1');
      }
    }
    
    // 키보드로 포커스 가능한지 확인
    const activeTab = tabs[1];
    activeTab.focus();
    await expect(activeTab).toHaveFocus();
  },
};

// Performance Test - 많은 탭 성능 테스트
export const PerformanceTest: Story = {
  args: {
    tabs: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      label: `탭 ${i + 1}`,
      disabled: i % 7 === 0 // 일부 탭 비활성화
    })),
    activeTab: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '20개의 탭을 렌더링하여 성능을 테스트하는 스토리입니다. 일부 탭은 비활성화되어 있습니다.',
      },
    },
  },
};

// Keyboard Navigation Demo - 키보드 네비게이션 데모
export const KeyboardNavigationDemo: Story = {
  args: {
    tabs: [
      { id: 1, label: '← → 키로 이동' },
      { id: 2, label: 'Enter/Space로 선택' },
      { id: 3, label: '접근성 지원' },
      { id: 4, label: '순환 네비게이션' }
    ],
    activeTab: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '키보드 네비게이션 기능을 보여주는 데모입니다. 탭에 포커스한 후 화살표 키로 이동하고 Enter/Space로 선택해보세요.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    console.log('🎯 키보드 네비게이션 데모 시작');
    
    const tabs = canvas.getAllByTestId('tab-tab');
    
    // 첫 번째 탭에 포커스
    tabs[0].focus();
    console.log('✅ 첫 번째 탭에 포커스');
    
    // 사용자에게 키보드 사용 안내
    console.log('💡 화살표 키(← →)로 탭 간 이동이 가능합니다');
    console.log('💡 Enter 또는 Space 키로 탭을 선택할 수 있습니다');
    console.log('💡 마지막 탭에서 → 키를 누르면 첫 번째 탭으로 순환합니다');
  },
};