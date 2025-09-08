import type { Meta, StoryObj } from '@storybook/vue3';
import Divider from './Divider.vue';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Divider 컴포넌트는 콘텐츠 영역을 시각적으로 구분하기 위한 선 요소입니다.

**주요 특징:**
- **Variant**: content(8px), page(1px), list1(1px), list2(1px) - 각각 다른 용도와 색상
- **Orientation**: horizontal(수평), vertical(수직)
- **용도별 구분**:
  - content: 주요 정보의 속성이나 구조화된 영역을 그룹화하여 구분
  - page: 같은 속성의 항목이나 옵션 메뉴에서 시각적 강조가 약한 구분에 적용
  - list1: 그레이 배경 위 리스트 항목 구분에 적용
  - list2: 리스트 항목 구분에 적용

**Figma 디자인을 100% 재현**하여 구현되었습니다.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['content', 'page', 'list1', 'list2'],
      description: 'Divider의 두께와 색상을 결정하는 변형입니다.',
      table: {
        type: { summary: "'content' | 'page' | 'list1' | 'list2'" },
        defaultValue: { summary: "'page'" },
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Divider의 방향을 설정합니다.',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground - 모든 controls 제공
export const Playground: Story = {
  args: {
    variant: 'page',
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작하여 Divider의 다양한 상태를 확인할 수 있습니다.',
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
        story: '기본 상태의 Divider 컴포넌트입니다. (variant: page, orientation: horizontal)',
      },
    },
  },
};

// Variant별 Stories
export const ContentDivider: Story = {
  args: {
    variant: 'content',
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: '콘텐츠 8px Divider입니다. 주요 정보의 속성이나 구조화된 영역을 그룹화하여 구분할 때 사용합니다. Border: 8px / #F6F6F6 (color/border/line-4)',
      },
    },
  },
};

export const PageDivider: Story = {
  args: {
    variant: 'page',
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: '페이지 1px Divider입니다. 같은 속성의 항목이나 옵션 메뉴에서 시각적 강조가 약한 구분에 적용합니다. Border: 1px / #F6F6F6 (color/border/line-4)',
      },
    },
  },
};

export const List1Divider: Story = {
  args: {
    variant: 'list1',
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: '리스트1 1px Divider입니다. 그레이 배경 위 리스트 항목 구분에 적용합니다. Border: 1px / #E1E1E1 (color/border/line-2)',
      },
    },
  },
};

export const List2Divider: Story = {
  args: {
    variant: 'list2',
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: '리스트2 1px Divider입니다. 리스트 항목 구분에 적용합니다. Border: 1px / #F0F0F0 (color/border/line-3)',
      },
    },
  },
};

// All Variants Comparison
export const AllVariants: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; width: 400px;">
        <div>
          <div style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #333;">Content-8px</div>
          <p style="margin: 0 0 8px; font-size: 13px; color: #666;">주요 정보의 속성이나 구조화된 영역을 그룹화하여 구분</p>
          <p style="margin: 0 0 16px; font-size: 12px; color: #888;">Border: 8px / #F6F6F6 (color/border/line-4)</p>
          <Divider variant="content" />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #333;">Page-1px</div>
          <p style="margin: 0 0 8px; font-size: 13px; color: #666;">같은 속성의 항목이나 옵션 메뉴에서 시각적 강조가 약한 구분에 적용</p>
          <p style="margin: 0 0 16px; font-size: 12px; color: #888;">Border: 1px / #F6F6F6 (color/border/line-4)</p>
          <Divider variant="page" />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #333;">List1-1px</div>
          <p style="margin: 0 0 8px; font-size: 13px; color: #666;">그레이 배경 위 리스트 항목 구분에 적용</p>
          <p style="margin: 0 0 16px; font-size: 12px; color: #888;">Border: 1px / #E1E1E1 (color/border/line-2)</p>
          <Divider variant="list1" />
        </div>
        
        <div>
          <div style="margin-bottom: 8px; font-weight: 600; font-size: 14px; color: #333;">List2-1px</div>
          <p style="margin: 0 0 8px; font-size: 13px; color: #666;">리스트 항목 구분에 적용</p>
          <p style="margin: 0 0 16px; font-size: 12px; color: #888;">Border: 1px / #F0F0F0 (color/border/line-3)</p>
          <Divider variant="list2" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Figma에 정의된 모든 Divider variant를 사용법과 함께 확인할 수 있습니다.',
      },
    },
  },
};

// Orientation Stories
export const HorizontalDivider: Story = {
  args: {
    variant: 'page',
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      description: {
        story: '수평 Divider입니다. 세로 방향으로 콘텐츠를 구분할 때 사용합니다.',
      },
    },
  },
};

export const VerticalDivider: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; height: 100px;">
        <div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">콘텐츠 A</div>
        <Divider variant="page" orientation="vertical" />
        <div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">콘텐츠 B</div>
        <Divider variant="list1" orientation="vertical" />
        <div style="padding: 20px; background: #f8f9fa; border-radius: 8px;">콘텐츠 C</div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '수직 Divider입니다. 가로 방향으로 콘텐츠를 구분할 때 사용합니다.',
      },
    },
  },
};

// Orientation Comparison
export const OrientationComparison: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="display: flex; flex-direction: column; gap: 48px;">
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Horizontal Dividers</h4>
          <div style="display: flex; flex-direction: column; gap: 20px; width: 300px;">
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">콘텐츠 영역 1</div>
            <Divider variant="content" orientation="horizontal" />
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">콘텐츠 영역 2</div>
            <Divider variant="page" orientation="horizontal" />
            <div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">콘텐츠 영역 3</div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 16px; font-weight: 600;">Vertical Dividers</h4>
          <div style="display: flex; align-items: center; gap: 16px; height: 120px;">
            <div style="padding: 20px; background: #f8f9fa; border-radius: 8px; height: 80px; display: flex; align-items: center;">영역 A</div>
            <Divider variant="content" orientation="vertical" />
            <div style="padding: 20px; background: #f8f9fa; border-radius: 8px; height: 80px; display: flex; align-items: center;">영역 B</div>
            <Divider variant="page" orientation="vertical" />
            <div style="padding: 20px; background: #f8f9fa; border-radius: 8px; height: 80px; display: flex; align-items: center;">영역 C</div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '수평과 수직 방향의 Divider를 실제 콘텐츠와 함께 비교해볼 수 있습니다.',
      },
    },
  },
};

// Real World Usage Examples
export const ListUsage: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="max-width: 400px; border: 1px solid #e1e1e1; border-radius: 8px; overflow: hidden;">
        <div style="padding: 16px; background: white;">
          <div style="font-weight: 600; margin-bottom: 4px;">메뉴 항목 1</div>
          <div style="font-size: 14px; color: #666;">설명 텍스트</div>
        </div>
        <Divider variant="list2" />
        <div style="padding: 16px; background: white;">
          <div style="font-weight: 600; margin-bottom: 4px;">메뉴 항목 2</div>
          <div style="font-size: 14px; color: #666;">설명 텍스트</div>
        </div>
        <Divider variant="list2" />
        <div style="padding: 16px; background: white;">
          <div style="font-weight: 600; margin-bottom: 4px;">메뉴 항목 3</div>
          <div style="font-size: 14px; color: #666;">설명 텍스트</div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '리스트 항목 구분에 사용되는 Divider의 실제 사용 예시입니다.',
      },
    },
  },
};

export const PageSectionUsage: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="max-width: 500px;">
        <section style="padding: 24px 0;">
          <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600;">섹션 제목 1</h2>
          <p style="margin: 0; color: #666;">이 섹션의 내용입니다. 페이지의 주요 콘텐츠 영역을 구성합니다.</p>
        </section>
        
        <Divider variant="page" />
        
        <section style="padding: 24px 0;">
          <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600;">섹션 제목 2</h2>
          <p style="margin: 0; color: #666;">다음 섹션의 내용입니다. 이전 섹션과 구분되어 표시됩니다.</p>
        </section>
        
        <Divider variant="page" />
        
        <section style="padding: 24px 0;">
          <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600;">섹션 제목 3</h2>
          <p style="margin: 0; color: #666;">마지막 섹션의 내용입니다.</p>
        </section>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '페이지 섹션을 구분하는 Divider의 실제 사용 예시입니다.',
      },
    },
  },
};

export const ContentGroupingUsage: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="max-width: 600px;">
        <div style="background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e1e1e1;">
          <div style="padding: 32px;">
            <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600;">주요 정보 그룹 1</h3>
            <p style="margin: 0; color: #666;">이 영역은 중요한 정보를 담고 있습니다. 사용자가 반드시 알아야 할 내용들이 포함되어 있습니다.</p>
          </div>
          
          <Divider variant="content" />
          
          <div style="padding: 32px;">
            <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600;">주요 정보 그룹 2</h3>
            <p style="margin: 0; color: #666;">두 번째 중요한 정보 그룹입니다. 첫 번째 그룹과는 다른 성격의 정보를 담고 있습니다.</p>
          </div>
          
          <Divider variant="content" />
          
          <div style="padding: 32px;">
            <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600;">주요 정보 그룹 3</h3>
            <p style="margin: 0; color: #666;">마지막 주요 정보 그룹입니다.</p>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '콘텐츠 그룹을 구분하는 두꺼운 Divider의 실제 사용 예시입니다.',
      },
    },
  },
};

// All Combinations Matrix
export const AllCombinations: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; max-width: 800px;">
        <div>
          <h4 style="margin-bottom: 24px; text-align: center; font-weight: 600;">Horizontal Dividers</h4>
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div>
              <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #666;">Content</div>
              <div style="width: 200px; height: 40px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; border-radius: 4px;">콘텐츠</div>
              <div style="margin: 8px 0;">
                <Divider variant="content" orientation="horizontal" />
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #666;">Page</div>
              <div style="width: 200px; height: 40px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; border-radius: 4px;">페이지</div>
              <div style="margin: 8px 0;">
                <Divider variant="page" orientation="horizontal" />
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #666;">List1</div>
              <div style="width: 200px; height: 40px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; border-radius: 4px;">리스트1</div>
              <div style="margin: 8px 0;">
                <Divider variant="list1" orientation="horizontal" />
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #666;">List2</div>
              <div style="width: 200px; height: 40px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; border-radius: 4px;">리스트2</div>
              <div style="margin: 8px 0;">
                <Divider variant="list2" orientation="horizontal" />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 24px; text-align: center; font-weight: 600;">Vertical Dividers</h4>
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div>
              <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #666;">Content</div>
              <div style="display: flex; align-items: center; gap: 8px; height: 60px;">
                <div style="padding: 16px; background: #f8f9fa; border-radius: 4px;">A</div>
                <Divider variant="content" orientation="vertical" />
                <div style="padding: 16px; background: #f8f9fa; border-radius: 4px;">B</div>
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #666;">Page</div>
              <div style="display: flex; align-items: center; gap: 8px; height: 60px;">
                <div style="padding: 16px; background: #f8f9fa; border-radius: 4px;">A</div>
                <Divider variant="page" orientation="vertical" />
                <div style="padding: 16px; background: #f8f9fa; border-radius: 4px;">B</div>
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #666;">List1</div>
              <div style="display: flex; align-items: center; gap: 8px; height: 60px;">
                <div style="padding: 16px; background: #f8f9fa; border-radius: 4px;">A</div>
                <Divider variant="list1" orientation="vertical" />
                <div style="padding: 16px; background: #f8f9fa; border-radius: 4px;">B</div>
              </div>
            </div>
            
            <div>
              <div style="margin-bottom: 8px; font-size: 12px; font-weight: 600; color: #666;">List2</div>
              <div style="display: flex; align-items: center; gap: 8px; height: 60px;">
                <div style="padding: 16px; background: #f8f9fa; border-radius: 4px;">A</div>
                <Divider variant="list2" orientation="vertical" />
                <div style="padding: 16px; background: #f8f9fa; border-radius: 4px;">B</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: '모든 variant와 orientation 조합을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

// Figma Design System Showcase
export const FigmaDesignSystem: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="max-width: 900px; font-family: 'Pretendard', sans-serif;">
        <h2 style="text-align: center; margin-bottom: 48px; font-size: 24px; font-weight: 600;">
          Figma Design System - Divider Components
        </h2>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 48px;">
          <!-- Content-8px -->
          <div style="padding: 32px; background: white; border-radius: 32px; border: 2px solid #eeeeee;">
            <div style="display: inline-block; padding: 5.5px 32px; border: 2px solid black; border-radius: 1000px; margin-bottom: 40px;">
              <span style="font-family: 'Pretendard', sans-serif; font-weight: 500; font-size: 18px;">Content-8px</span>
            </div>
            
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; position: relative; background: #f8f9fa; border-radius: 16px;">
              <div style="width: 300px; position: relative;">
                <Divider variant="content" />
              </div>
              <div style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%); background: #007afc; color: white; padding: 2.5px 8px; border-radius: 3px; font-size: 14px; font-family: 'Pretendard', sans-serif; letter-spacing: -0.28px;">8</div>
            </div>
            
            <div style="margin-top: 32px; display: flex; flex-direction: column; gap: 8px;">
              <div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: black;">Usage</div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: #555555;">주요 정보의 속성이나 구조화된 영역을 그룹화하여 구분</div>
              </div>
              <div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: black;">Border</div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: #555555;">8px / #F6F6F6 (color/border/line-4)</div>
              </div>
            </div>
          </div>
          
          <!-- Page-1px -->
          <div style="padding: 32px; background: white; border-radius: 32px; border: 2px solid #eeeeee;">
            <div style="display: inline-block; padding: 5.5px 32px; border: 2px solid black; border-radius: 1000px; margin-bottom: 40px;">
              <span style="font-family: 'Pretendard', sans-serif; font-weight: 500; font-size: 18px;">Page-1px</span>
            </div>
            
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; position: relative; background: #f8f9fa; border-radius: 16px;">
              <div style="width: 300px; position: relative;">
                <Divider variant="page" />
              </div>
              <div style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%); background: #007afc; color: white; padding: 2.5px 8px; border-radius: 3px; font-size: 14px; font-family: 'Pretendard', sans-serif; letter-spacing: -0.28px;">1</div>
            </div>
            
            <div style="margin-top: 32px; display: flex; flex-direction: column; gap: 8px;">
              <div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: black;">Usage</div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: #555555;">같은 속성의 항목이나 옵션 메뉴에서 시각적 강조가 약한 구분에 적용</div>
              </div>
              <div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: black;">Border</div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: #555555;">1px / #F6F6F6 (color/border/line-4)</div>
              </div>
            </div>
          </div>
          
          <!-- List1-1px -->
          <div style="padding: 32px; background: white; border-radius: 32px; border: 2px solid #eeeeee;">
            <div style="display: inline-block; padding: 5.5px 32px; border: 2px solid black; border-radius: 1000px; margin-bottom: 40px;">
              <span style="font-family: 'Pretendard', sans-serif; font-weight: 500; font-size: 18px;">List1-1px</span>
            </div>
            
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; position: relative; background: #f8f9fa; border-radius: 16px;">
              <div style="width: 300px; position: relative;">
                <Divider variant="list1" />
              </div>
              <div style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%); background: #007afc; color: white; padding: 2.5px 8px; border-radius: 3px; font-size: 14px; font-family: 'Pretendard', sans-serif; letter-spacing: -0.28px;">1</div>
            </div>
            
            <div style="margin-top: 32px; display: flex; flex-direction: column; gap: 8px;">
              <div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: black;">Usage</div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: #555555;">그레이 배경 위 리스트 항목 구분에 적용</div>
              </div>
              <div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: black;">Border</div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: #555555;">1px / #E1E1E1 (color/border/line-2)</div>
              </div>
            </div>
          </div>
          
          <!-- List2-1px -->
          <div style="padding: 32px; background: white; border-radius: 32px; border: 2px solid #eeeeee;">
            <div style="display: inline-block; padding: 5.5px 32px; border: 2px solid black; border-radius: 1000px; margin-bottom: 40px;">
              <span style="font-family: 'Pretendard', sans-serif; font-weight: 500; font-size: 18px;">List2-1px</span>
            </div>
            
            <div style="height: 200px; display: flex; align-items: center; justify-content: center; position: relative; background: #f8f9fa; border-radius: 16px;">
              <div style="width: 300px; position: relative;">
                <Divider variant="list2" />
              </div>
              <div style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%); background: #007afc; color: white; padding: 2.5px 8px; border-radius: 3px; font-size: 14px; font-family: 'Pretendard', sans-serif; letter-spacing: -0.28px;">1</div>
            </div>
            
            <div style="margin-top: 32px; display: flex; flex-direction: column; gap: 8px;">
              <div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: black;">Usage</div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: #555555;">리스트 항목 구분에 적용</div>
              </div>
              <div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: black;">Border</div>
                <div style="font-weight: 400; font-size: 14px; letter-spacing: -0.28px; line-height: 22px; color: #555555;">1px / #F0F0F0 (color/border/line-3)</div>
              </div>
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
        story: 'Figma 디자인 시스템의 원본 디자인을 완벽히 재현한 Divider 컴포넌트입니다.',
      },
    },
  },
};