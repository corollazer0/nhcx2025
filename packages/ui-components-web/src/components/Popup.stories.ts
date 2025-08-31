import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Popup from './Popup.vue'

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '모달 팝업 컴포넌트입니다. 사용자에게 중요한 정보를 표시하거나 확인/취소 액션을 제공합니다.'
      }
    }
  },
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: '팝업 표시 여부'
    },
    title: {
      control: 'text',
      description: '팝업 제목'
    },
    bodyText: {
      control: 'text',
      description: '팝업 본문 텍스트'
    },
    showTitle: {
      control: 'boolean',
      description: '제목 표시 여부'
    },
    primaryButtonText: {
      control: 'text',
      description: '주요 버튼 텍스트'
    },
    secondaryButtonText: {
      control: 'text',
      description: '보조 버튼 텍스트'
    },
    showPrimaryButton: {
      control: 'boolean',
      description: '주요 버튼 표시 여부'
    },
    showSecondaryButton: {
      control: 'boolean',
      description: '보조 버튼 표시 여부'
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 닫기 여부'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 닫기 여부'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '팝업 크기'
    },
    variant: {
      control: 'select',
      options: ['default', 'warning', 'error', 'success'],
      description: '팝업 변형'
    },
    centered: {
      control: 'boolean',
      description: '중앙 정렬 여부'
    },
    zIndex: {
      control: 'number',
      description: 'z-index 값'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Popup>

// Playground Story - 360px minimum width
export const Playground: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(args.isVisible)
      
      const handleClose = () => {
        isVisible.value = false
        setTimeout(() => {
          isVisible.value = true
        }, 1000)
      }
      
      const handlePrimaryClick = () => {
        console.log('Primary button clicked')
        isVisible.value = false
      }
      
      const handleSecondaryClick = () => {
        console.log('Secondary button clicked')
        isVisible.value = false
      }
      
      return { 
        args, 
        isVisible,
        handleClose, 
        handlePrimaryClick, 
        handleSecondaryClick 
      }
    },
    template: `
      <div style="min-width: 360px; height: 400px; position: relative;">
        <button @click="isVisible = true" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">
          팝업 열기
        </button>
        <Popup 
          v-bind="args"
          :is-visible="isVisible"
          @close="handleClose"
          @primary-click="handlePrimaryClick"
          @secondary-click="handleSecondaryClick"
        />
      </div>
    `
  }),
  args: {
    isVisible: false,
    title: '타이틀',
    bodyText: '내용을 입력해주세요.',
    showTitle: true,
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    showPrimaryButton: true,
    showSecondaryButton: false,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    size: 'md',
    variant: 'default',
    centered: true,
    zIndex: 1000
  }
}

// Default Story - 360px minimum width
export const Default: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      
      const showPopup = () => {
        isVisible.value = true
      }
      
      const handleClose = () => {
        isVisible.value = false
      }
      
      const handlePrimaryClick = () => {
        console.log('Primary button clicked')
        isVisible.value = false
      }
      
      const handleSecondaryClick = () => {
        console.log('Secondary button clicked')
        isVisible.value = false
      }
      
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `
      <div style="min-width: 360px; height: 400px; position: relative;">
        <button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">
          팝업 열기
        </button>
        <Popup 
          v-bind="args" 
          :is-visible="isVisible"
          @close="handleClose"
          @primary-click="handlePrimaryClick"
          @secondary-click="handleSecondaryClick"
        />
      </div>
    `
  }),
  args: {
    isVisible: true,
    title: '타이틀',
    bodyText: '내용을 입력해주세요.',
    showTitle: true,
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    showPrimaryButton: true,
    showSecondaryButton: false,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    size: 'md',
    variant: 'default',
    centered: true,
    zIndex: 1000
  }
}

// Size Variants
export const SmallSize: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    size: 'sm',
    title: '작은 팝업',
    bodyText: '작은 크기의 팝업입니다.'
  }
}

export const MediumSize: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    size: 'md',
    title: '중간 팝업',
    bodyText: '중간 크기의 팝업입니다.'
  }
}

export const LargeSize: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    size: 'lg',
    title: '큰 팝업',
    bodyText: '큰 크기의 팝업입니다.'
  }
}

// Variant Examples
export const WarningVariant: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    variant: 'warning',
    title: '경고',
    bodyText: '이 작업을 계속하시겠습니까?',
    primaryButtonText: '계속',
    secondaryButtonText: '취소',
    showSecondaryButton: true
  }
}

export const ErrorVariant: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    variant: 'error',
    title: '오류',
    bodyText: '작업을 완료할 수 없습니다.',
    primaryButtonText: '확인',
    showSecondaryButton: false
  }
}

export const SuccessVariant: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    variant: 'success',
    title: '성공',
    bodyText: '작업이 성공적으로 완료되었습니다.',
    primaryButtonText: '확인',
    showSecondaryButton: false
  }
}

// Button Configurations
export const PrimaryButtonOnly: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    title: '확인만',
    bodyText: '확인 버튼만 있는 팝업입니다.',
    showPrimaryButton: true,
    showSecondaryButton: false
  }
}

export const BothButtons: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    title: '선택',
    bodyText: '확인 또는 취소를 선택하세요.',
    primaryButtonText: '확인',
    secondaryButtonText: '취소',
    showPrimaryButton: true,
    showSecondaryButton: true
  }
}

export const NoButtons: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    title: '정보',
    bodyText: '버튼이 없는 정보성 팝업입니다.',
    showPrimaryButton: false,
    showSecondaryButton: false
  }
}

// Text Content Variations
export const NoTitle: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    showTitle: false,
    bodyText: '제목 없이 본문만 있는 팝업입니다.'
  }
}

export const LongContent: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    title: '긴 내용',
    bodyText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`
  }
}

// Positioning Variants
export const BottomAligned: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    centered: false,
    title: '하단 정렬',
    bodyText: '화면 하단에 정렬된 팝업입니다.'
  }
}

export const CenteredPopup: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    centered: true,
    title: '중앙 정렬',
    bodyText: '화면 중앙에 정렬된 팝업입니다.'
  }
}

// Interaction Examples
export const NoOverlayClose: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    title: '오버레이 클릭 비활성',
    bodyText: '오버레이를 클릭해도 닫히지 않습니다.',
    closeOnOverlayClick: false
  }
}

export const NoEscapeClose: Story = {
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      const showPopup = () => { isVisible.value = true }
      const handleClose = () => { isVisible.value = false }
      const handlePrimaryClick = () => { isVisible.value = false }
      const handleSecondaryClick = () => { isVisible.value = false }
      return { args, isVisible, showPopup, handleClose, handlePrimaryClick, handleSecondaryClick }
    },
    template: `<div><button @click="showPopup" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">팝업 열기</button><Popup v-bind="args" :is-visible="isVisible" @close="handleClose" @primary-click="handlePrimaryClick" @secondary-click="handleSecondaryClick" /></div>`
  }),
  args: {
    isVisible: true,
    title: 'ESC 키 비활성',
    bodyText: 'ESC 키를 눌러도 닫히지 않습니다.',
    closeOnEscape: false
  }
}

// Real-world Usage Examples
export const ConfirmationDialog: Story = {
  name: 'Confirmation Dialog',
  render: (args) => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      
      const showDialog = () => {
        isVisible.value = true
      }
      
      const handleClose = () => {
        isVisible.value = false
      }
      
      const handleConfirm = () => {
        console.log('Confirmed!')
        isVisible.value = false
      }
      
      const handleCancel = () => {
        console.log('Cancelled!')
        isVisible.value = false
      }
      
      return { isVisible, showDialog, handleClose, handleConfirm, handleCancel }
    },
    template: `
      <div>
        <button @click="showDialog" style="margin: 20px; padding: 8px 16px; background: #e24949; color: white; border: none; border-radius: 4px; cursor: pointer;">
          파일 삭제
        </button>
        <Popup 
          :is-visible="isVisible"
          variant="error"
          title="파일 삭제"
          body-text="선택한 파일을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
          primary-button-text="삭제"
          secondary-button-text="취소"
          :show-primary-button="true"
          :show-secondary-button="true"
          @close="handleClose"
          @primary-click="handleConfirm"
          @secondary-click="handleCancel"
        />
      </div>
    `
  })
}

export const SaveProgressDialog: Story = {
  name: 'Save Progress Dialog',
  render: () => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      
      const showDialog = () => {
        isVisible.value = true
      }
      
      const handleClose = () => {
        isVisible.value = false
      }
      
      const handleSave = () => {
        console.log('Progress saved!')
        isVisible.value = false
      }
      
      const handleDiscard = () => {
        console.log('Progress discarded!')
        isVisible.value = false
      }
      
      return { isVisible, showDialog, handleClose, handleSave, handleDiscard }
    },
    template: `
      <div>
        <button @click="showDialog" style="margin: 20px; padding: 8px 16px; background: #ff9500; color: white; border: none; border-radius: 4px; cursor: pointer;">
          페이지 나가기
        </button>
        <Popup 
          :is-visible="isVisible"
          variant="warning"
          title="저장하지 않은 변경사항"
          body-text="저장하지 않은 변경사항이 있습니다. 변경사항을 저장하시겠습니까?"
          primary-button-text="저장"
          secondary-button-text="저장하지 않기"
          :show-primary-button="true"
          :show-secondary-button="true"
          @close="handleClose"
          @primary-click="handleSave"
          @secondary-click="handleDiscard"
        />
      </div>
    `
  })
}

export const SuccessNotification: Story = {
  name: 'Success Notification',
  render: () => ({
    components: { Popup },
    setup() {
      const isVisible = ref(false)
      
      const showDialog = () => {
        isVisible.value = true
      }
      
      const handleClose = () => {
        isVisible.value = false
      }
      
      return { isVisible, showDialog, handleClose }
    },
    template: `
      <div>
        <button @click="showDialog" style="margin: 20px; padding: 8px 16px; background: #19973c; color: white; border: none; border-radius: 4px; cursor: pointer;">
          작업 완료
        </button>
        <Popup 
          :is-visible="isVisible"
          variant="success"
          title="업로드 완료"
          body-text="파일이 성공적으로 업로드되었습니다."
          primary-button-text="확인"
          :show-primary-button="true"
          :show-secondary-button="false"
          @close="handleClose"
          @primary-click="handleClose"
        />
      </div>
    `
  })
}