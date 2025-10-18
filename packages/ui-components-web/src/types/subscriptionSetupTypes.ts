// Subscription Setup Page Types and Constants
// Based on Figma Frame: FMDC-0802040000F01

export interface AmountRangeOption {
  label: string
  value: string
}

export interface SubscriptionSetupData {
  address: string
  bank: string
  selectedAmountRange: AmountRangeOption | null
  isAddressValid: boolean
  isBankValid: boolean
  isAmountRangeSelected: boolean
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

// Default data matching Figma design
export const DEFAULT_SUBSCRIPTION_SETUP_DATA: SubscriptionSetupData = {
  address: '04517 서울시 중구 통일로 120',
  bank: 'NH농협은행',
  selectedAmountRange: null,
  isAddressValid: true,
  isBankValid: true,
  isAmountRangeSelected: false
}

// Constants from Figma design
export const SUBSCRIPTION_SETUP_CONSTANTS = {
  // Page metadata
  PROGRESS_RATIO: 0.3, // 30% progress based on Figma progress bar

  // Section 1: Address Verification
  SECTION_1: {
    TITLE: '주민등록상 주소지를 확인해 주세요',
    ADDRESS_PLACEHOLDER: '04517 서울시 중구 통일로 120',
    BANK_PLACEHOLDER: 'NH농협은행'
  },

  // Section 2: Amount Setup
  SECTION_2: {
    TITLE: '가입금액을 입력해 주세요',
    AMOUNT_PLACEHOLDER: '2만원 ~ 1,500만원'
  },

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2568',
    HEADER: '1:2580',
    CONTENTS: '1:2569',
    SECTION_1: '1:2570',
    SECTION_1_TITLE: '1:2571',
    SECTION_1_TITLE_TEXT: '1:2572',
    SECTION_1_SEARCH: '1:2573',
    ADDRESS_SEARCH: '1:2574',
    BANK_INPUT: '1:2575',
    SECTION_2: '1:2576',
    SECTION_2_TITLE: '1:2577',
    SECTION_2_TITLE_TEXT: '1:2578',
    AMOUNT_SELECTOR: '1:2579',
    NAVIGATION: '1:2581',
    PROGRESS: '1:2582'
  },

  // Design tokens from Figma
  DESIGN_TOKENS: {
    FRAME_WIDTH: 360,
    FRAME_HEIGHT: 760,
    CONTENTS_WIDTH: 312,
    HEADER_TOP: 24,
    CONTENTS_TOP: 120,
    SECTION_GAP: 40,
    TITLE_GAP: 32,
    INPUT_GAP: 12
  },

  // Typography tokens from Figma
  TYPOGRAPHY: {
    SECTION_TITLE: {
      fontFamily: 'Pretendard',
      fontSize: 22,
      fontWeight: 600,
      lineHeight: 32,
      letterSpacing: -0.44
    },
    INPUT_TEXT: {
      fontFamily: 'Pretendard',
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 26,
      letterSpacing: -0.36
    }
  },

  // Color tokens from Figma
  COLORS: {
    TEXT_PRIMARY: '#121212', // color/text/font-1
    BACKGROUND: '#ffffff', // color/bg/default
    BORDER: '#e1e1e1',
    PLACEHOLDER: '#929292'
  },

  // Border radius from Figma
  BORDER_RADIUS: {
    INPUT: 12 // border/radius/12
  },

  // Validation messages
  VALIDATION: {
    ADDRESS_REQUIRED: '주소를 입력해 주세요',
    BANK_REQUIRED: '은행을 선택해 주세요',
    AMOUNT_RANGE_REQUIRED: '가입금액 범위를 선택해 주세요',
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다'
  }
} as const

// Type exports for component prop validation
export type SubscriptionSetupState = 'initial' | 'address_input' | 'bank_input' | 'amount_selection' | 'complete'

// Amount range constants
export const AMOUNT_RANGES = {
  MINIMUM: 20000, // 2만원
  MAXIMUM: 15000000, // 1,500만원
  RANGES: [
    { min: 20000, max: 100000, label: '2만원 ~ 10만원' },
    { min: 100000, max: 500000, label: '10만원 ~ 50만원' },
    { min: 500000, max: 1000000, label: '50만원 ~ 100만원' },
    { min: 1000000, max: 5000000, label: '100만원 ~ 500만원' },
    { min: 5000000, max: 15000000, label: '500만원 ~ 1,500만원' },
    { min: 20000, max: 15000000, label: '2만원 ~ 1,500만원' }
  ]
} as const