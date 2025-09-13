import type { Meta, StoryObj } from '@storybook/vue3';
import { expect, userEvent, within } from 'storybook/test';
import { ref, computed } from 'vue';
import Indicator from './Indicator.vue';

const meta: Meta<typeof Indicator> = {
  title: 'Components/Indicator',
  tags: ['autodocs'],
  component: Indicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Figma 디자인을 기반으로 한 인디케이터 컴포넌트입니다. 페이지네이션과 제어 기능을 제공하는 Number와 Dot 두 가지 variant를 지원합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['number', 'dot'],
      description: '인디케이터 변형 (숫자 네비게이션 또는 점)',
      table: { category: 'Appearance' },
    },
    current: {
      control: { type: 'number' },
      description: '현재 페이지 번호 (1부터 시작)',
      table: { category: 'Content' },
    },
    total: {
      control: { type: 'number' },
      description: '전체 페이지 수',
      table: { category: 'Content' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
      table: { category: 'State' },
    },
  },
  args: {
    variant: 'number',
    current: 1,
    total: 3,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Indicator>;

export const Playground: Story = {
  render: (args) => ({
    components: { Indicator },
    setup() {
      const currentPage = ref(args.current || 1);
      const isRunning = ref(false);
      const intervalRef = ref<NodeJS.Timeout | null>(null);
      
      const handlePrev = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
        }
      };
      
      const handleNext = () => {
        if (currentPage.value < (args.total || 3)) {
          currentPage.value++;
        }
      };
      
      const handleNavigateTo = (page: number) => {
        currentPage.value = page;
      };
      
      const handleStop = () => {
        if (intervalRef.value) {
          clearInterval(intervalRef.value);
          intervalRef.value = null;
        }
        isRunning.value = false;
      };
      
      const startAutoPlay = () => {
        if (!isRunning.value) {
          isRunning.value = true;
          intervalRef.value = setInterval(() => {
            if (currentPage.value >= (args.total || 3)) {
              currentPage.value = 1;
            } else {
              currentPage.value++;
            }
          }, 2000);
        }
      };
      
      return {
        args,
        currentPage,
        isRunning,
        handlePrev,
        handleNext,
        handleNavigateTo,
        handleStop,
        startAutoPlay
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <button @click="startAutoPlay" :disabled="isRunning" style="padding: 4px 8px; font-size: 12px;">자동 재생 시작</button>
          <span style="font-size: 12px; color: #666;">{{ isRunning ? '자동 재생 중' : '정지됨' }}</span>
        </div>
        <Indicator
          v-bind="args"
          :current="currentPage"
          @navigate-prev="handlePrev"
          @navigate-next="handleNext"
          @navigate-to="handleNavigateTo"
          @stop="handleStop"
        />
        <div style="font-size: 12px; color: #666; text-align: center;">
          현재 페이지: {{ currentPage }} / {{ args.total }}<br/>
          화살표 버튼으로 네비게이션하거나 자동 재생을 시작한 후 정지 버튼을 눌러보세요.
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 props를 조작해볼 수 있는 인터랙티브 플레이그라운드입니다. 네비게이션과 자동 재생/정지 기능을 테스트할 수 있습니다.',
      },
    },
  },
};

export const NumberVariant: Story = {
  args: {
    variant: 'number',
    current: 1,
    total: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '숫자로 현재/전체 페이지를 표시하는 Number variant입니다. 좌우 네비게이션 화살표와 정지 버튼이 포함됩니다.',
      },
    },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // 초기 상태 확인
    await expect(canvas.getByText('1')).toBeInTheDocument();
    await expect(canvas.getByText('5')).toBeInTheDocument();
    
    // 이전 버튼이 비활성화된 상태 확인
    const prevButton = canvas.getByTestId('indicator-prev');
    await expect(prevButton).toBeDisabled();
    
    // 다음 버튼 클릭 테스트
    const nextButton = canvas.getByTestId('indicator-next');
    await expect(nextButton).toBeEnabled();
    
    // 정지 버튼 존재 확인
    await expect(canvas.getByTestId('indicator-stop')).toBeInTheDocument();
  },
};

export const NumberVariantMiddlePage: Story = {
  args: {
    variant: 'number',
    current: 2,
    total: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '중간 페이지에서의 Number variant 상태입니다. 모든 네비게이션 버튼이 활성화됩니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 현재 페이지 확인
    await expect(canvas.getByText('2')).toBeInTheDocument();
    
    // 모든 버튼이 활성화된 상태 확인
    await expect(canvas.getByTestId('indicator-prev')).toBeEnabled();
    await expect(canvas.getByTestId('indicator-next')).toBeEnabled();
  },
};

export const NumberVariantLastPage: Story = {
  args: {
    variant: 'number',
    current: 5,
    total: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '마지막 페이지에서의 Number variant 상태입니다. 다음 버튼이 비활성화됩니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 마지막 페이지 확인
    await expect(canvas.getByText('5')).toBeInTheDocument();
    
    // 다음 버튼이 비활성화된 상태 확인
    await expect(canvas.getByTestId('indicator-next')).toBeDisabled();
    await expect(canvas.getByTestId('indicator-prev')).toBeEnabled();
  },
};

export const DotVariant: Story = {
  args: {
    variant: 'dot',
    current: 1,
    total: 8,
  },
  render: (args) => ({
    components: { Indicator },
    setup() {
      const currentPage = ref(args.current || 1);
      const isSlideshow = ref(false);
      const slideshowInterval = ref<NodeJS.Timeout | null>(null);
      const activity = ref<string>('대기중');
      
      const handleNavigateTo = (page: number) => {
        currentPage.value = page;
        activity.value = `페이지 ${page} 선택됨`;
        setTimeout(() => {
          if (!isSlideshow.value) {
            activity.value = '대기중';
          }
        }, 2000);
      };
      
      const handleStop = () => {
        if (slideshowInterval.value) {
          clearInterval(slideshowInterval.value);
          slideshowInterval.value = null;
          isSlideshow.value = false;
          activity.value = '슬라이드쇼 정지됨';
        } else {
          activity.value = '정지 버튼 클릭됨';
        }
        setTimeout(() => {
          activity.value = '대기중';
        }, 2000);
      };
      
      const startSlideshow = () => {
        if (!isSlideshow.value) {
          isSlideshow.value = true;
          activity.value = '슬라이드쇼 시작됨';
          slideshowInterval.value = setInterval(() => {
            if (currentPage.value >= (args.total || 8)) {
              currentPage.value = 1;
            } else {
              currentPage.value++;
            }
            activity.value = `슬라이드쇼 진행중: ${currentPage.value}/${args.total}`;
          }, 1800);
        }
      };
      
      return {
        args,
        currentPage,
        isSlideshow,
        activity,
        handleNavigateTo,
        handleStop,
        startSlideshow
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <div style="text-align: center;">
          <h3 style="margin: 0 0 4px 0; font-size: 16px;">Dot Variant 인터랙티브</h3>
          <p style="margin: 0; font-size: 12px; color: #666;">점을 클릭하거나 슬라이드쇼를 시작해보세요</p>
        </div>
        
        <button 
          @click="startSlideshow" 
          :disabled="isSlideshow"
          style="padding: 6px 12px; font-size: 12px; border: 1px solid #ccc; border-radius: 4px; background: #fff;"
          :style="{ opacity: isSlideshow ? 0.5 : 1, cursor: isSlideshow ? 'not-allowed' : 'pointer' }"
        >
          슬라이드쇼 시작
        </button>
        
        <Indicator
          v-bind="args"
          :current="currentPage"
          @navigate-to="handleNavigateTo"
          @stop="handleStop"
        />
        
        <div style="text-align: center;">
          <div style="font-size: 14px; margin-bottom: 4px;"><strong>{{ currentPage }} / {{ args.total }}</strong></div>
          <div style="font-size: 12px; color: #666; min-height: 16px;">{{ activity }}</div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '점으로 페이지를 표시하는 인터랙티브 Dot variant입니다. 각 점을 클릭하거나 슬라이드쇼 모드를 시작할 수 있습니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 8개의 dot이 존재하는지 확인
    for (let i = 1; i <= 8; i++) {
      await expect(canvas.getByTestId(`indicator-dot-${i}`)).toBeInTheDocument();
    }
    
    // 첫 번째 dot이 active 상태인지 확인
    const activeDot = canvas.getByTestId('indicator-dot-1');
    await expect(activeDot).toHaveClass('indicator__dot--active');
    
    // 두 번째 dot은 active가 아님을 확인
    const inactiveDot = canvas.getByTestId('indicator-dot-2');
    await expect(inactiveDot).not.toHaveClass('indicator__dot--active');
    
    // 정지 버튼 확인 (dot variant용)
    const stopButton = canvas.getByTestId('indicator-stop');
    await expect(stopButton).toHaveClass('indicator__stop-button--dot-variant');
  },
};

export const DotVariantMiddle: Story = {
  args: {
    variant: 'dot',
    current: 4,
    total: 7,
  },
  parameters: {
    docs: {
      description: {
        story: '중간 페이지에서의 Dot variant 상태입니다. 4번째 점이 활성화된 상태를 보여줍니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 4번째 dot이 active 상태인지 확인
    const activeDot = canvas.getByTestId('indicator-dot-4');
    await expect(activeDot).toHaveClass('indicator__dot--active');
    
    // 다른 dot들은 active가 아님을 확인
    for (let i = 1; i <= 7; i++) {
      if (i !== 4) {
        const dot = canvas.getByTestId(`indicator-dot-${i}`);
        await expect(dot).not.toHaveClass('indicator__dot--active');
      }
    }
  },
};

export const NumberDisabled: Story = {
  args: {
    variant: 'number',
    current: 2,
    total: 5,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 Number variant 상태입니다. 모든 버튼이 비활성화됩니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 모든 버튼이 비활성화된 상태 확인
    await expect(canvas.getByTestId('indicator-prev')).toBeDisabled();
    await expect(canvas.getByTestId('indicator-next')).toBeDisabled();
    await expect(canvas.getByTestId('indicator-stop')).toBeDisabled();
  },
};

export const DotDisabled: Story = {
  args: {
    variant: 'dot',
    current: 3,
    total: 6,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 Dot variant 상태입니다. 모든 dot과 정지 버튼이 비활성화됩니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 모든 dot이 비활성화된 상태 확인
    for (let i = 1; i <= 6; i++) {
      const dot = canvas.getByTestId(`indicator-dot-${i}`);
      await expect(dot).toBeDisabled();
    }
    
    // 정지 버튼도 비활성화 확인
    await expect(canvas.getByTestId('indicator-stop')).toBeDisabled();
  },
};

export const Interactive: Story = {
  args: {
    variant: 'number',
    current: 3,
    total: 10,
  },
  render: (args) => ({
    components: { Indicator },
    setup() {
      const currentPage = ref(args.current || 3);
      const isAutoPlaying = ref(false);
      const autoPlayInterval = ref<NodeJS.Timeout | null>(null);
      const logs = ref<string[]>([]);
      
      const addLog = (message: string) => {
        logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`);
        if (logs.value.length > 5) {
          logs.value = logs.value.slice(0, 5);
        }
      };
      
      const handlePrev = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
          addLog(`이전 페이지로 이동: ${currentPage.value}`);
        }
      };
      
      const handleNext = () => {
        if (currentPage.value < (args.total || 10)) {
          currentPage.value++;
          addLog(`다음 페이지로 이동: ${currentPage.value}`);
        }
      };
      
      const handleNavigateTo = (page: number) => {
        currentPage.value = page;
        addLog(`페이지 ${page}로 직접 이동`);
      };
      
      const handleStop = () => {
        if (autoPlayInterval.value) {
          clearInterval(autoPlayInterval.value);
          autoPlayInterval.value = null;
          isAutoPlaying.value = false;
          addLog('자동 재생 정지');
        } else {
          addLog('정지 버튼 클릭 (자동 재생이 실행되지 않음)');
        }
      };
      
      const startAutoPlay = () => {
        if (!isAutoPlaying.value) {
          isAutoPlaying.value = true;
          addLog('자동 재생 시작');
          autoPlayInterval.value = setInterval(() => {
            if (currentPage.value >= (args.total || 10)) {
              currentPage.value = 1;
              addLog('자동 재생: 첫 페이지로 순환');
            } else {
              currentPage.value++;
              addLog(`자동 재생: 페이지 ${currentPage.value}`);
            }
          }, 1500);
        }
      };
      
      return {
        args,
        currentPage,
        isAutoPlaying,
        logs,
        handlePrev,
        handleNext,
        handleNavigateTo,
        handleStop,
        startAutoPlay
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; align-items: center; min-width: 400px;">
        <div style="text-align: center;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px;">인터랙티브 테스트</h3>
          <p style="margin: 0; font-size: 12px; color: #666;">모든 버튼을 클릭해보고 이벤트 로그를 확인하세요</p>
        </div>
        
        <div style="display: flex; gap: 8px; align-items: center;">
          <button 
            @click="startAutoPlay" 
            :disabled="isAutoPlaying"
            style="padding: 6px 12px; font-size: 12px; border: 1px solid #ccc; border-radius: 4px; background: #fff; cursor: pointer;"
            :style="{ opacity: isAutoPlaying ? 0.5 : 1, cursor: isAutoPlaying ? 'not-allowed' : 'pointer' }"
          >
            자동 재생 시작
          </button>
          <span style="font-size: 12px; padding: 4px 8px; border-radius: 4px;" :style="{ color: isAutoPlaying ? '#19973c' : '#666', backgroundColor: isAutoPlaying ? '#f0f8f4' : '#f5f5f5' }">
            {{ isAutoPlaying ? '🔄 재생중' : '⏸️ 정지됨' }}
          </span>
        </div>
        
        <Indicator
          v-bind="args"
          :current="currentPage"
          @navigate-prev="handlePrev"
          @navigate-next="handleNext"
          @navigate-to="handleNavigateTo"
          @stop="handleStop"
        />
        
        <div style="text-align: center; font-size: 14px;">
          <strong>현재: {{ currentPage }} / {{ args.total }}</strong>
        </div>
        
        <div style="width: 100%; max-width: 300px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; text-align: center;">이벤트 로그</h4>
          <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 4px; padding: 12px; min-height: 120px; font-family: monospace; font-size: 11px;">
            <div v-if="logs.length === 0" style="color: #666; text-align: center; padding: 20px 0;">이벤트가 발생하면 여기에 로그가 표시됩니다</div>
            <div v-for="log in logs" :key="log" style="margin-bottom: 4px; color: #333;">{{ log }}</div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '인터랙티브 테스트를 위한 스토리입니다. 네비게이션과 자동 재생/정지 기능을 실제로 테스트하고 이벤트 로그를 확인할 수 있습니다.',
      },
    },
  },
};

export const EdgeCases: Story = {
  args: {
    variant: 'number',
    current: 1,
    total: 1,
  },
  parameters: {
    docs: {
      description: {
        story: '극한 상황 테스트: 페이지가 1개뿐인 경우입니다. 모든 네비게이션 버튼이 비활성화됩니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 1/1 표시 확인 (current와 total 모두 1이므로 getAllByText 사용)
    const textElements = canvas.getAllByText('1');
    await expect(textElements).toHaveLength(2); // current: 1, total: 1
    
    // 모든 네비게이션 버튼이 비활성화 확인
    await expect(canvas.getByTestId('indicator-prev')).toBeDisabled();
    await expect(canvas.getByTestId('indicator-next')).toBeDisabled();
    
    // 정지 버튼만 활성화 확인
    await expect(canvas.getByTestId('indicator-stop')).toBeEnabled();
  },
};

export const LargeDotSet: Story = {
  args: {
    variant: 'dot',
    current: 5,
    total: 15,
  },
  render: (args) => ({
    components: { Indicator },
    setup() {
      const currentPage = ref(args.current || 5);
      const lastClicked = ref<number | null>(null);
      
      const handleNavigateTo = (page: number) => {
        currentPage.value = page;
        lastClicked.value = page;
        setTimeout(() => {
          lastClicked.value = null;
        }, 1000);
      };
      
      const handleStop = () => {
        // 간단한 피드백만 제공
        lastClicked.value = -1; // 특별한 값으로 stop 표시
        setTimeout(() => {
          lastClicked.value = null;
        }, 1000);
      };
      
      return {
        args,
        currentPage,
        lastClicked,
        handleNavigateTo,
        handleStop
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
        <div style="text-align: center;">
          <h3 style="margin: 0 0 4px 0; font-size: 16px;">Large Dot Set (15개)</h3>
          <p style="margin: 0; font-size: 12px; color: #666;">각 점을 클릭하여 해당 페이지로 이동</p>
        </div>
        
        <Indicator
          v-bind="args"
          :current="currentPage"
          @navigate-to="handleNavigateTo"
          @stop="handleStop"
        />
        
        <div style="text-align: center; font-size: 12px;">
          <div><strong>현재: {{ currentPage }} / {{ args.total }}</strong></div>
          <div v-if="lastClicked === -1" style="color: #ff6b6b; margin-top: 4px;">🛑 정지 버튼 클릭됨</div>
          <div v-else-if="lastClicked" style="color: #19973c; margin-top: 4px;">✓ 페이지 {{ lastClicked }}로 이동</div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '많은 수의 점을 가진 인터랙티브 Dot variant입니다. 15개의 점 중 아무 점이나 클릭하여 해당 페이지로 이동할 수 있습니다.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 15개의 dot 존재 확인
    for (let i = 1; i <= 15; i++) {
      await expect(canvas.getByTestId(`indicator-dot-${i}`)).toBeInTheDocument();
    }
    
    // 5번째 dot만 active 확인
    const activeDot = canvas.getByTestId('indicator-dot-5');
    await expect(activeDot).toHaveClass('indicator__dot--active');
  },
};

// 새로운 완전한 기능 데모 스토리 추가
export const FullFunctionDemo: Story = {
  args: {
    variant: 'number',
    current: 1,
    total: 6,
  },
  render: (args) => ({
    components: { Indicator },
    setup() {
      const currentPage = ref(args.current || 1);
      const isPlaying = ref(false);
      const playInterval = ref<NodeJS.Timeout | null>(null);
      const playHistory = ref<Array<{time: string, action: string, page: number}>>([]);
      const variant = ref(args.variant || 'number');
      
      const addHistory = (action: string, page?: number) => {
        playHistory.value.unshift({
          time: new Date().toLocaleTimeString(),
          action,
          page: page || currentPage.value
        });
        if (playHistory.value.length > 8) {
          playHistory.value = playHistory.value.slice(0, 8);
        }
      };
      
      const handlePrev = () => {
        if (currentPage.value > 1) {
          currentPage.value--;
          addHistory('⬅️ 이전');
        }
      };
      
      const handleNext = () => {
        if (currentPage.value < (args.total || 6)) {
          currentPage.value++;
          addHistory('➡️ 다음');
        }
      };
      
      const handleNavigateTo = (page: number) => {
        currentPage.value = page;
        addHistory('🎯 직접 이동', page);
      };
      
      const handleStop = () => {
        if (playInterval.value) {
          clearInterval(playInterval.value);
          playInterval.value = null;
          isPlaying.value = false;
          addHistory('⏹️ 자동재생 정지');
        } else {
          addHistory('⏹️ 정지버튼 클릭');
        }
      };
      
      const startAutoPlay = () => {
        if (!isPlaying.value) {
          isPlaying.value = true;
          addHistory('▶️ 자동재생 시작');
          playInterval.value = setInterval(() => {
            if (currentPage.value >= (args.total || 6)) {
              currentPage.value = 1;
              addHistory('🔄 첫 페이지로 순환');
            } else {
              currentPage.value++;
              addHistory('⏭️ 자동재생 진행');
            }
          }, 2000);
        }
      };
      
      const switchVariant = () => {
        variant.value = variant.value === 'number' ? 'dot' : 'number';
        addHistory(`🔄 ${variant.value} 모드로 변경`);
      };
      
      const resetDemo = () => {
        if (playInterval.value) {
          clearInterval(playInterval.value);
          playInterval.value = null;
        }
        isPlaying.value = false;
        currentPage.value = 1;
        playHistory.value = [];
        addHistory('🔄 데모 초기화');
      };
      
      return {
        args,
        currentPage,
        isPlaying,
        playHistory,
        variant,
        handlePrev,
        handleNext,
        handleNavigateTo,
        handleStop,
        startAutoPlay,
        switchVariant,
        resetDemo
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; align-items: center; min-width: 500px;">
        <div style="text-align: center;">
          <h2 style="margin: 0 0 8px 0; font-size: 18px; color: #333;">🎮 완전한 기능 데모</h2>
          <p style="margin: 0; font-size: 13px; color: #666;">모든 Indicator 기능을 실제로 체험해보세요</p>
        </div>
        
        <!-- 컨트롤 패널 -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
          <button 
            @click="startAutoPlay" 
            :disabled="isPlaying"
            style="padding: 8px 12px; font-size: 12px; border: 1px solid #007afc; border-radius: 6px; background: #007afc; color: white; cursor: pointer;"
            :style="{ opacity: isPlaying ? 0.5 : 1, cursor: isPlaying ? 'not-allowed' : 'pointer' }"
          >
            ▶️ 자동재생
          </button>
          <button 
            @click="switchVariant"
            style="padding: 8px 12px; font-size: 12px; border: 1px solid #666; border-radius: 6px; background: white; color: #666; cursor: pointer;"
          >
            🔄 {{ variant === 'number' ? 'Dot' : 'Number' }} 모드
          </button>
          <button 
            @click="resetDemo"
            style="padding: 8px 12px; font-size: 12px; border: 1px solid #ff6b6b; border-radius: 6px; background: #ff6b6b; color: white; cursor: pointer;"
          >
            🔄 초기화
          </button>
        </div>
        
        <!-- 상태 표시 -->
        <div style="display: flex; gap: 16px; align-items: center; padding: 12px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
          <div style="font-size: 14px;">
            <strong>{{ variant === 'number' ? '📊' : '🔘' }} {{ variant.toUpperCase() }}</strong>
          </div>
          <div style="font-size: 14px;">
            <strong>📍 {{ currentPage }} / {{ args.total }}</strong>
          </div>
          <div style="font-size: 12px; padding: 4px 8px; border-radius: 4px;" :style="{ 
            color: isPlaying ? '#19973c' : '#666', 
            backgroundColor: isPlaying ? '#f0f8f4' : '#e9ecef' 
          }">
            {{ isPlaying ? '▶️ 재생중' : '⏸️ 정지됨' }}
          </div>
        </div>
        
        <!-- Indicator 컴포넌트 -->
        <div style="padding: 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <Indicator
            :variant="variant"
            :current="currentPage"
            :total="args.total"
            @navigate-prev="handlePrev"
            @navigate-next="handleNext"
            @navigate-to="handleNavigateTo"
            @stop="handleStop"
          />
        </div>
        
        <!-- 사용 안내 -->
        <div style="text-align: center; font-size: 12px; color: #666; max-width: 400px; line-height: 1.4;">
          <div style="margin-bottom: 8px;"><strong>📖 사용법</strong></div>
          <div v-if="variant === 'number'">
            • ⬅️➡️ 화살표로 페이지 이동<br/>
            • ⏹️ 정지 버튼으로 자동재생 중단<br/>
            • 🎮 위 버튼들로 모드 변경 및 제어
          </div>
          <div v-else>
            • 🔘 점을 클릭하여 직접 페이지 이동<br/>
            • ⏹️ 정지 버튼으로 자동재생 중단<br/>
            • 🎮 위 버튼들로 모드 변경 및 제어
          </div>
        </div>
        
        <!-- 히스토리 로그 -->
        <div style="width: 100%; max-width: 400px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; text-align: center;">📝 동작 히스토리</h4>
          <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 6px; padding: 12px; max-height: 150px; overflow-y: auto;">
            <div v-if="playHistory.length === 0" style="color: #999; text-align: center; padding: 20px 0; font-size: 12px;">
              동작을 시작하면 히스토리가 표시됩니다
            </div>
            <div 
              v-for="entry in playHistory" 
              :key="entry.time + entry.action" 
              style="font-family: monospace; font-size: 11px; margin-bottom: 4px; padding: 4px; background: white; border-radius: 3px; border: 1px solid #dee2e6;"
            >
              <span style="color: #666;">[{{ entry.time }}]</span> 
              <span style="color: #333;">{{ entry.action }}</span>
              <span v-if="entry.page && entry.action.includes('이동')" style="color: #007afc; font-weight: bold;">({{ entry.page }})</span>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: '🎮 모든 Indicator 기능을 체험할 수 있는 완전한 데모입니다. Number/Dot 모드 전환, 자동재생, 네비게이션, 정지 기능을 모두 테스트할 수 있으며 실시간으로 동작 히스토리를 확인할 수 있습니다.',
      },
    },
  },
};