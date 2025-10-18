// Tax Type Selection Page Types and Constants
// Based on Figma Frame: FM_DF03_0700_B2503

export interface RadioOption {
  label: string
  value: string
}

export interface TaxTypeSelectionData {
  selectedTaxType: TaxType
  isFormValid: boolean
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

export interface FormChangeEvent {
  field: 'taxType'
  value: TaxType
  timestamp: number
}

// Tax type union type
export type TaxType = 'general' | 'tax-free'

// Default data matching Figma design
export const DEFAULT_TAX_TYPE_SELECTION_DATA: TaxTypeSelectionData = {
  selectedTaxType: 'tax-free', // Default to "비과세" as shown in Figma
  isFormValid: true
}

// Constants from Figma design
export const TAX_TYPE_SELECTION_CONSTANTS = {
  // Page metadata
  PROGRESS_RATIO: 0.6, // 60% progress based on subscription flow

  // Title
  TITLE: '과세유형을 선택해 주세요',

  // Radio options (matching Figma design)
  TAX_TYPE_OPTIONS: [
    { label: '일반과세', value: 'general' },
    { label: '비과세', value: 'tax-free' }
  ],

  // Content text
  DESCRIPTION: '비과세 가입 시 총 이자소득 500만원(납입금액 연 600만원 한도)에 대하여 과세하지 않습니다.',
  TOOLTIP_LABEL: '비과세 대상자',

  // Tax type details
  TAX_BENEFITS: {
    TAX_FREE: {
      INTEREST_LIMIT: 5000000, // 500만원
      DEPOSIT_LIMIT: 6000000, // 600만원 연한도
      DESCRIPTION: '비과세 가입 시 총 이자소득 500만원(납입금액 연 600만원 한도)에 대하여 과세하지 않습니다.'
    },
    GENERAL: {
      TAX_RATE: 0.154, // 15.4% (소득세 14% + 지방소득세 1.4%)
      DESCRIPTION: '일반과세는 이자소득에 대해 소득세가 부과됩니다.'
    }
  },

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2612',
    HEADER: '1:2626',
    NAVIGATION: '1:2627',
    PROGRESS: '1:2628',
    CONTENTS: '1:2613',
    TITLE: '1:2614',
    TITLE_TEXT: '1:2615',
    RADIO_SECTION: '1:2616',
    RADIO_GROUP: '1:2617',
    RADIO_GENERAL: '1:2618',
    RADIO_TAX_FREE: '1:2619',
    DESCRIPTION: '1:2620',
    TOOLTIP_SECTION: '1:2621',
    TOOLTIP_LABEL: '1:2622',
    TOOLTIP_ICON: '1:2623',
    CTA: '1:2629',
    CTA_BUTTON: '1:2630'
  },

  // Design tokens from Figma
  DESIGN_TOKENS: {
    FRAME_WIDTH: 360,
    FRAME_HEIGHT: 760,
    CONTENTS_LEFT: 24,
    CONTENTS_RIGHT: 24,
    HEADER_TOP: 24,
    CONTENTS_TOP: 120,
    SECTION_GAP: 32,
    RADIO_GAP: 12,
    CTA_BOTTOM: 0
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
    DESCRIPTION: {
      fontFamily: 'Pretendard',
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 20,
      letterSpacing: -0.26
    },
    TOOLTIP_LABEL: {
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
    RADIO: 10, // border/radius/10
    BUTTON: 12 // border/radius/12
  },

  // Validation messages
  VALIDATION: {
    TAX_TYPE_REQUIRED: '과세유형을 선택해 주세요',
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다'
  },

  // Tooltip content for tax-free eligibility
  TAX_FREE_ELIGIBILITY: {
    TITLE: '비과세 대상자',
    CRITERIA: [
      '만 19세 이상 세대주',
      '무주택 세대주 또는 1주택 세대주',
      '주택청약종합저축 미가입자',
      '연소득 7천만원 이하 (단독세대주의 경우 6천만원 이하)'
    ],
    NOTE: '비과세 혜택을 받으려면 위 조건을 모두 만족해야 합니다.'
  }
} as const

// Type exports for component prop validation
export type TaxTypeSelectionState = 'initial' | 'selecting' | 'validating' | 'complete'
export type TooltipState = 'hidden' | 'visible'

// Helper functions for tax type handling
export const getTaxTypeLabel = (taxType: TaxType): string => {
  const option = TAX_TYPE_SELECTION_CONSTANTS.TAX_TYPE_OPTIONS.find(opt => opt.value === taxType)
  return option?.label || ''
}

export const getTaxTypeDescription = (taxType: TaxType): string => {
  if (taxType === 'tax-free') {
    return TAX_TYPE_SELECTION_CONSTANTS.TAX_BENEFITS.TAX_FREE.DESCRIPTION
  } else if (taxType === 'general') {
    return TAX_TYPE_SELECTION_CONSTANTS.TAX_BENEFITS.GENERAL.DESCRIPTION
  }
  return ''
}

export const validateTaxTypeSelection = (data: TaxTypeSelectionData): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  const { VALIDATION } = TAX_TYPE_SELECTION_CONSTANTS

  if (!data.selectedTaxType) {
    errors.push(VALIDATION.TAX_TYPE_REQUIRED)
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Create radio options from constants
export const createTaxTypeOptions = (): RadioOption[] => {
  return TAX_TYPE_SELECTION_CONSTANTS.TAX_TYPE_OPTIONS
}

// Calculate tax benefits for display
export const calculateTaxBenefits = (amount: number, taxType: TaxType): {
  taxAmount: number
  netAmount: number
  description: string
} => {
  if (taxType === 'tax-free') {
    const { INTEREST_LIMIT } = TAX_TYPE_SELECTION_CONSTANTS.TAX_BENEFITS.TAX_FREE
    const taxFreeAmount = Math.min(amount, INTEREST_LIMIT)
    return {
      taxAmount: 0,
      netAmount: taxFreeAmount,
      description: `${taxFreeAmount.toLocaleString()}원까지 비과세 혜택`
    }
  } else {
    const { TAX_RATE } = TAX_TYPE_SELECTION_CONSTANTS.TAX_BENEFITS.GENERAL
    const taxAmount = Math.floor(amount * TAX_RATE)
    return {
      taxAmount,
      netAmount: amount - taxAmount,
      description: `소득세 ${(TAX_RATE * 100).toFixed(1)}% 부과`
    }
  }
}

// Check tax-free eligibility (placeholder for actual validation)
export const checkTaxFreeEligibility = (userInfo: any): {
  isEligible: boolean
  failedCriteria: string[]
} => {
  // This would integrate with actual user data validation
  // For now, return placeholder response
  return {
    isEligible: true,
    failedCriteria: []
  }
}

// Export for backward compatibility
export type TaxSelectionData = TaxTypeSelectionData