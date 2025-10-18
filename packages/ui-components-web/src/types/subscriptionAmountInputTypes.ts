// Subscription Amount Input Page Types and Constants
// Based on Figma Frame: FMAJ-0402010000F01-B

export interface AmountQuickOption {
  label: string
  value: number
}

export interface SubscriptionAmountInputData {
  amount: number
  isValidAmount: boolean
  lastAction: 'input' | 'quick_add' | 'backspace' | null
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

export interface KeypadInputEvent {
  type: 'number' | 'backspace' | 'quick_add'
  value: string | number
  timestamp: number
}

// Default data matching Figma design
export const DEFAULT_SUBSCRIPTION_AMOUNT_INPUT_DATA: SubscriptionAmountInputData = {
  amount: 100000, // Default 100,000원 as shown in Figma
  isValidAmount: true,
  lastAction: null
}

// Constants from Figma design
export const SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS = {
  // Page metadata
  PROGRESS_RATIO: 0.4, // 40% progress based on subscription flow

  // Title
  TITLE: '가입금액을 입력해 주세요',

  // Amount validation
  MIN_AMOUNT: 20000, // 2만원 minimum
  MAX_AMOUNT: 15000000, // 1,500만원 maximum

  // Quick amount options (matching Figma design)
  QUICK_AMOUNTS: [
    { label: '+1만원', value: 10000 },
    { label: '+5만원', value: 50000 },
    { label: '+10만원', value: 100000 },
    { label: '+100만원', value: 1000000 }
  ],

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2583',
    HEADER: '1:2589',
    NAVIGATION: '1:2590',
    PROGRESS: '1:2591',
    CONTENTS: '1:2584',
    SECTION: '1:2585',
    TITLE: '1:2586',
    TITLE_TEXT: '1:2587',
    PRICE_BOX: '1:2588',
    KEYPAD: '1:2592',
    KEYPAD_CONTAINER: '1:2593'
  },

  // Design tokens from Figma
  DESIGN_TOKENS: {
    FRAME_WIDTH: 360,
    FRAME_HEIGHT: 760,
    CONTENTS_WIDTH: 312,
    HEADER_TOP: 24,
    CONTENTS_TOP: 120,
    SECTION_GAP: 32,
    PRICE_BOX_GAP: 12,
    KEYPAD_BOTTOM: 0
  },

  // Typography tokens from Figma
  TYPOGRAPHY: {
    TITLE: {
      fontFamily: 'Pretendard',
      fontSize: 22,
      fontWeight: 600,
      lineHeight: 32,
      letterSpacing: -0.44
    },
    AMOUNT_DISPLAY: {
      fontFamily: 'Pretendard',
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 26,
      letterSpacing: -0.36
    },
    KOREAN_AMOUNT: {
      fontFamily: 'Pretendard',
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 20,
      letterSpacing: -0.26
    },
    KEYPAD_NUMBER: {
      fontFamily: 'Pretendard',
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 'normal'
    },
    QUICK_BUTTON: {
      fontFamily: 'Pretendard',
      fontSize: 13,
      fontWeight: 500,
      lineHeight: 20,
      letterSpacing: -0.26
    }
  },

  // Color tokens from Figma
  COLORS: {
    TEXT_PRIMARY: '#121212', // color/text/font-1
    BACKGROUND: '#ffffff', // color/bg/default
    GREEN_PRIMARY: '#19973c', // Success/primary green
    BORDER: '#e1e1e1',
    BORDER_LIGHT: '#d3d3d3',
    GRAY_LIGHT: '#f0f0f0'
  },

  // Border radius from Figma
  BORDER_RADIUS: {
    INPUT: 12, // border/radius/12
    BUTTON: 8   // border/radius/8
  },

  // Validation messages
  VALIDATION: {
    AMOUNT_TOO_LOW: '최소 가입금액은 2만원입니다',
    AMOUNT_TOO_HIGH: '최대 가입금액은 1,500만원입니다',
    AMOUNT_REQUIRED: '가입금액을 입력해 주세요',
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다'
  },

  // Korean number conversion
  KOREAN_NUMBERS: {
    UNITS: ['', '만', '억', '조'],
    DIGITS: ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
  }
} as const

// Type exports for component prop validation
export type SubscriptionAmountInputState = 'initial' | 'inputting' | 'validating' | 'complete'
export type KeypadAction = 'digit' | 'double_zero' | 'backspace' | 'quick_add'

// Helper functions for amount formatting
export const formatAmountToKorean = (amount: number): string => {
  if (amount === 0) return ''

  const { UNITS, DIGITS } = SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS.KOREAN_NUMBERS
  let result = ''
  let unitIndex = 0
  let tempAmount = amount

  while (tempAmount > 0) {
    const currentDigit = tempAmount % 10000
    if (currentDigit > 0) {
      let digitStr = ''

      const thousands = Math.floor(currentDigit / 1000)
      const hundreds = Math.floor((currentDigit % 1000) / 100)
      const tens = Math.floor((currentDigit % 100) / 10)
      const ones = currentDigit % 10

      if (thousands > 0) digitStr += DIGITS[thousands] + '천'
      if (hundreds > 0) digitStr += DIGITS[hundreds] + '백'
      if (tens > 0) digitStr += DIGITS[tens] + '십'
      if (ones > 0) digitStr += DIGITS[ones]

      result = digitStr + UNITS[unitIndex] + result
    }

    tempAmount = Math.floor(tempAmount / 10000)
    unitIndex++
  }

  return result + '원'
}

export const formatAmountToDisplay = (amount: number): string => {
  return amount.toLocaleString('ko-KR') + '원'
}

export const validateAmount = (amount: number): {
  isValid: boolean
  message?: string
} => {
  const { MIN_AMOUNT, MAX_AMOUNT, VALIDATION } = SUBSCRIPTION_AMOUNT_INPUT_CONSTANTS

  if (amount < MIN_AMOUNT) {
    return {
      isValid: false,
      message: VALIDATION.AMOUNT_TOO_LOW
    }
  }

  if (amount > MAX_AMOUNT) {
    return {
      isValid: false,
      message: VALIDATION.AMOUNT_TOO_HIGH
    }
  }

  return { isValid: true }
}

// Export for backward compatibility
export type AmountInputData = SubscriptionAmountInputData
export type QuickAmountOption = AmountQuickOption