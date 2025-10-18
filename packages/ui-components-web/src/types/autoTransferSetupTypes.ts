// Auto Transfer Setup Page Types and Constants
// Based on Figma Frame: FMDC-0802050000F01

export interface RadioOption {
  label: string
  value: string
}

export interface DateOption {
  label: string
  value: string
}

export interface TooltipItem {
  text: string
}

export interface AutoTransferSetupData {
  autoTransferEnabled: boolean
  amount: number
  startDate: string
  isFormValid: boolean
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

export interface FormChangeEvent {
  field: 'autoTransfer' | 'amount' | 'startDate'
  value: string | number | boolean
  timestamp: number
}

// Default data matching Figma design
export const DEFAULT_AUTO_TRANSFER_SETUP_DATA: AutoTransferSetupData = {
  autoTransferEnabled: true, // Default to "신청함" as shown in Figma
  amount: 100000, // Default 100,000원 as shown in Figma
  startDate: '2023-08-23', // Default date as shown in Figma
  isFormValid: true
}

// Constants from Figma design
export const AUTO_TRANSFER_SETUP_CONSTANTS = {
  // Page metadata
  PROGRESS_RATIO: 0.5, // 50% progress based on subscription flow

  // Title
  TITLE: '자동이체를 신청하시겠어요?',

  // Radio options (matching Figma design)
  RADIO_OPTIONS: [
    { label: '신청안함', value: 'no-apply' },
    { label: '신청함', value: 'apply' }
  ],

  // Form labels
  LABELS: {
    AUTO_TRANSFER_AMOUNT: '자동이체 금액',
    AUTO_TRANSFER_START_DATE: '자동이체 시작일',
    AUTO_TRANSFER_GUIDE: '자동이체 신청 안내'
  },

  // Tooltip content
  TOOLTIP: {
    TITLE: '자동이체 신청 안내',
    ITEMS: [
      '초입금 출금계좌가 다른은행 계좌인 경우, 해지 시 입금계좌로 선택한 농협은행 계좌에서 출금됩니다.',
      '국민주택을 청약하는 경우 매회 납입금액 중 최대 25만원까지 인정되며, 매월 납입하는 것이 청약자격(순위) 발생조건에 유리합니다. 자동이체일은 신규일 이후로 선택하면 납입인정일이 지연될 수 있습니다.',
      '자동이체일이 토/일/공휴일이면 익영업일에 이체됩니다. 같은 이유로 다음 연도에 이체되는 경우 실제 입금된 과세연도의 소득공제 금액에 포함됩니다.'
    ]
  },

  // Default values
  DEFAULTS: {
    AMOUNT: 100000, // 100,000원
    DATE: '2023-08-23',
    AUTO_TRANSFER_ENABLED: true
  },

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2594',
    HEADER: '1:2606',
    NAVIGATION: '1:2607',
    PROGRESS: '1:2608',
    CONTENTS: '1:2595',
    TITLE: '1:2596',
    TITLE_TEXT: '1:2597',
    RADIO_SECTION: '1:2598',
    RADIO_GROUP: '1:2599',
    RADIO_NO_APPLY: '1:2600',
    RADIO_APPLY: '1:2601',
    RADIO_CAPTION: '1:2602',
    RADIO_LABEL: '1:2603',
    AMOUNT_SECTION: '1:2604',
    DATE_SECTION: '1:2605',
    CTA: '1:2609',
    CTA_BUTTON: '1:2610',
    TOOLTIP: '1:2611'
  },

  // Design tokens from Figma
  DESIGN_TOKENS: {
    FRAME_WIDTH: 360,
    FRAME_HEIGHT: 760,
    CONTENTS_WIDTH: 312,
    HEADER_TOP: 24,
    CONTENTS_TOP: 120,
    SECTION_GAP: 32,
    INPUT_GAP: 12,
    CTA_BOTTOM: 0,
    TOOLTIP_TOP: 300,
    TOOLTIP_LEFT: 24
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
    RADIO_LABEL: {
      fontFamily: 'Pretendard',
      fontSize: 15,
      fontWeight: 500,
      lineHeight: 24,
      letterSpacing: -0.3
    },
    FIELD_LABEL: {
      fontFamily: 'Pretendard',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 22,
      letterSpacing: -0.28
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
    TOOLTIP_TITLE: {
      fontFamily: 'Pretendard',
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 24,
      letterSpacing: -0.32
    },
    TOOLTIP_TEXT: {
      fontFamily: 'Pretendard',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 22,
      letterSpacing: -0.28
    },
    GUIDE_TEXT: {
      fontFamily: 'Pretendard',
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 20,
      letterSpacing: -0.26
    }
  },

  // Color tokens from Figma
  COLORS: {
    TEXT_PRIMARY: '#121212', // color/text/font-1
    TEXT_SECONDARY: '#767676', // color/text/font-4
    TEXT_FIELD_LABEL: '#505050',
    BACKGROUND: '#ffffff', // color/bg/default
    GREEN_PRIMARY: '#19973c', // Success/primary green
    BORDER: '#e1e1e1',
    BORDER_LIGHT: '#f0f0f0',
    BORDER_RADIO: '#d3d3d3',
    RADIO_SELECTED_BORDER: '#19973c',
    RADIO_SELECTED_TEXT: '#19973c',
    RADIO_DEFAULT_TEXT: '#505050'
  },

  // Border radius from Figma
  BORDER_RADIUS: {
    INPUT: 12, // border/radius/12
    RADIO: 10, // border/radius/10
    TOOLTIP: 16 // border/radius/16
  },

  // Validation messages
  VALIDATION: {
    AUTO_TRANSFER_REQUIRED: '자동이체 신청 여부를 선택해 주세요',
    START_DATE_REQUIRED: '자동이체 시작일을 선택해 주세요',
    AMOUNT_REQUIRED: '자동이체 금액을 입력해 주세요',
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다'
  },

  // Date options for select dropdown
  DATE_OPTIONS: [
    { label: '2023.08.23', value: '2023-08-23' },
    { label: '2023.08.24', value: '2023-08-24' },
    { label: '2023.08.25', value: '2023-08-25' },
    { label: '2023.08.26', value: '2023-08-26' },
    { label: '2023.08.27', value: '2023-08-27' },
    { label: '2023.08.28', value: '2023-08-28' },
    { label: '2023.08.29', value: '2023-08-29' },
    { label: '2023.08.30', value: '2023-08-30' },
    { label: '2023.08.31', value: '2023-08-31' }
  ],

  // Korean number conversion
  KOREAN_NUMBERS: {
    UNITS: ['', '만', '억', '조'],
    DIGITS: ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구']
  }
} as const

// Type exports for component prop validation
export type AutoTransferSetupState = 'initial' | 'filling' | 'validating' | 'complete'
export type RadioValue = 'no-apply' | 'apply'
export type TooltipState = 'hidden' | 'visible'

// Helper functions for amount formatting
export const formatAmountToKorean = (amount: number): string => {
  if (amount === 0) return ''

  const { UNITS, DIGITS } = AUTO_TRANSFER_SETUP_CONSTANTS.KOREAN_NUMBERS
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

export const formatDateToDisplay = (dateString: string): string => {
  return dateString.replace(/-/g, '.')
}

export const formatDateToValue = (displayString: string): string => {
  return displayString.replace(/\./g, '-')
}

export const validateForm = (data: AutoTransferSetupData): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  const { VALIDATION } = AUTO_TRANSFER_SETUP_CONSTANTS

  if (!data.startDate) {
    errors.push(VALIDATION.START_DATE_REQUIRED)
  }

  if (data.autoTransferEnabled && !data.amount) {
    errors.push(VALIDATION.AMOUNT_REQUIRED)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Create tooltip items from constants
export const createTooltipItems = (): TooltipItem[] => {
  return AUTO_TRANSFER_SETUP_CONSTANTS.TOOLTIP.ITEMS.map(text => ({ text }))
}

// Create radio options from constants
export const createRadioOptions = (): RadioOption[] => {
  return AUTO_TRANSFER_SETUP_CONSTANTS.RADIO_OPTIONS
}

// Create date options from constants
export const createDateOptions = (): DateOption[] => {
  return AUTO_TRANSFER_SETUP_CONSTANTS.DATE_OPTIONS
}

// Export for backward compatibility
export type TransferSetupData = AutoTransferSetupData
export type TransferOption = RadioOption