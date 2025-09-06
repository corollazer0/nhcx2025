import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import Filter from './Filter.vue';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  tags: ['autodocs'],
  component: Filter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 필터 컴포넌트입니다. 필터 텍스트, 툴팁, 스위치를 포함하여 사용자가 데이터를 필터링하고 설정을 제어할 수 있습니다.',
      },
    },
  },
  argTypes: {
    filterText: {
      control: { type: 'text' },
      description: '필터 표시 텍스트',
      table: { category: 'Content' },
    },
    tooltipText: {
      control: { type: 'text' },
      description: '툴팁 텍스트',
      table: { category: 'Content' },
    },
    showFilterIcon: {
      control: { type: 'boolean' },
      description: '필터 아이콘 표시 여부',
      table: { category: 'Appearance' },
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: '툴팁 영역 표시 여부',
      table: { category: 'Appearance' },
    },
    showSwitch: {
      control: { type: 'boolean' },
      description: '스위치 표시 여부',
      table: { category: 'Appearance' },
    },
    switchValue: {
      control: { type: 'boolean' },
      description: '스위치 ON/OFF 상태',
      table: { category: 'State' },
    },
    dateText: {
      control: { type: 'text' },
      description: '날짜 텍스트',
      table: { category: 'Content' },
    },
    showDate: {
      control: { type: 'boolean' },
      description: '날짜 표시 여부',
      table: { category: 'Appearance' },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'with-date'],
      description: '컴포넌트 변형 (with-date는 Figma에서 선택된 스타일)',
      table: { category: 'Appearance' },
    },
    'onSwitch-toggle': {
      description: '스위치 상태가 변경될 때 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onFilter-icon-click': {
      description: '필터 아이콘 클릭 시 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
    'onTooltip-icon-click': {
      description: '툴팁(물음표) 아이콘 클릭 시 발생하는 이벤트',
      table: { category: 'Events' },
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  args: {
    filterText: '최신순ㆍ3개월',
    tooltipText: '추천 상품',
    showFilterIcon: true,
    showTooltip: true,
    showSwitch: true,
    switchValue: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const filterElement = canvas.getByTestId('filter');
    await expect(filterElement).toBeInTheDocument();
    
    const filterText = canvas.getByText('최신순ㆍ3개월');
    const tooltipText = canvas.getByText('추천 상품');
    
    await expect(filterText).toBeInTheDocument();
    await expect(tooltipText).toBeInTheDocument();
  },
};

export const SwitchOn: Story = {
  args: {
    ...Default.args,
    switchValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: '스위치가 ON 상태인 필터 컴포넌트입니다.',
      },
    },
  },
};

export const WithoutFilterIcon: Story = {
  args: {
    ...Default.args,
    showFilterIcon: false,
  },
  parameters: {
    docs: {
      description: {
        story: '필터 아이콘이 없는 필터 컴포넌트입니다.',
      },
    },
  },
};

export const WithoutTooltip: Story = {
  args: {
    ...Default.args,
    showTooltip: false,
  },
  parameters: {
    docs: {
      description: {
        story: '툴팁 영역이 없는 필터 컴포넌트입니다.',
      },
    },
  },
};

export const WithoutSwitch: Story = {
  args: {
    ...Default.args,
    showSwitch: false,
  },
  parameters: {
    docs: {
      description: {
        story: '스위치가 없는 필터 컴포넌트입니다.',
      },
    },
  },
};

export const CustomText: Story = {
  args: {
    ...Default.args,
    filterText: '인기순ㆍ6개월',
    tooltipText: '인기 상품',
  },
  parameters: {
    docs: {
      description: {
        story: '사용자 정의 텍스트를 사용한 필터 컴포넌트입니다.',
      },
    },
  },
};

export const WithDate: Story = {
  args: {
    ...Default.args,
    variant: 'with-date',
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma에서 선택된 컴포넌트와 동일한 형태입니다. variant="with-date"로 한 번에 설정할 수 있습니다.',
      },
    },
  },
};

export const ManualWithDate: Story = {
  args: {
    ...Default.args,
    showDate: true,
    dateText: '2024.01.01~2024.03.01',
    filterText: '최신순',
    showTooltip: false,
    showSwitch: false,
  },
  parameters: {
    docs: {
      description: {
        story: '개별 props로 수동 설정한 날짜 필터 컴포넌트입니다.',
      },
    },
  },
};

export const DateVariations: Story = {
  args: {
    ...Default.args,
    showDate: true,
    dateText: '2024.06.01~2024.09.01',
    filterText: '인기순',
  },
  parameters: {
    docs: {
      description: {
        story: '다른 날짜 텍스트를 사용하는 필터 컴포넌트입니다.',
      },
    },
  },
};

export const MinimalFilter: Story = {
  args: {
    ...Default.args,
    showFilterIcon: false,
    showTooltip: false,
    showSwitch: false,
  },
  parameters: {
    docs: {
      description: {
        story: '필터 텍스트만 표시되는 최소한의 필터 컴포넌트입니다.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 상호작용 요소(필터 아이콘, 툴팁 아이콘, 스위치)를 테스트할 수 있는 필터 컴포넌트입니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 필터 아이콘 클릭 테스트
    const filterIcon = canvasElement.querySelector('.filter__filter-icon');
    if (filterIcon) {
      await userEvent.click(filterIcon);
    }
    
    // 툴팁 아이콘 클릭 테스트
    const tooltipIcon = canvasElement.querySelector('.filter__tooltip-icon');
    if (tooltipIcon) {
      await userEvent.click(tooltipIcon);
    }
    
    // 스위치 클릭 테스트
    const switchElement = canvasElement.querySelector('.filter__switch');
    if (switchElement) {
      await userEvent.click(switchElement);
      await expect(switchElement).toHaveClass('filter__switch--on');
      
      await userEvent.click(switchElement);
      await expect(switchElement).toHaveClass('filter__switch--off');
    }
  },
};

export const AllVariants: Story = {
  render: (args) => ({
    components: { Filter },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 400px;">
        <div style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">기본 상태</p>
          <Filter v-bind="args" />
        </div>
        
        <div style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">스위치 ON</p>
          <Filter v-bind="args" :switchValue="true" />
        </div>
        
        <div style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">필터 아이콘 없음</p>
          <Filter v-bind="args" :showFilterIcon="false" />
        </div>
        
        <div style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">툴팁 없음</p>
          <Filter v-bind="args" :showTooltip="false" />
        </div>
        
        <div style="padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
          <p style="margin: 0 0 8px 0; font-weight: bold;">최소 구성</p>
          <Filter v-bind="args" :showFilterIcon="false" :showTooltip="false" :showSwitch="false" />
        </div>
      </div>
    `,
  }),
  args: {
    ...Default.args,
  },
  parameters: {
    docs: {
      description: {
        story: '모든 변형을 한 번에 볼 수 있는 스토리입니다.',
      },
    },
  },
};