// Terms Agreement Page Types and Constants
// Based on Figma Frame: FMDC-0902050000F01

export interface TermsItem {
  text: string
  checked: boolean
  type?: 'checkbox' | 'bullet'
  disabled?: boolean
  showArrow?: boolean
}

export interface TermsAgreementData {
  masterAgreed: boolean
  financialProductsAgreed: boolean
  detailedAgreed: boolean
  personalInfoAgreed: boolean
  financialInfoAgreed: boolean
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

// Default data matching Figma design
export const DEFAULT_TERMS_AGREEMENT_DATA: TermsAgreementData = {
  masterAgreed: true,
  financialProductsAgreed: true,
  detailedAgreed: true,
  personalInfoAgreed: true,
  financialInfoAgreed: true
}

// Constants from Figma design
export const TERMS_AGREEMENT_CONSTANTS = {
  // Page metadata
  PAGE_TITLE: '약관에 동의해 주세요',
  PROGRESS_RATIO: 0.4, // 40% progress based on Figma
  CTA_TEXT: '다음',

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:3189',
    HEADER: '1:3194',
    CONTENTS: '1:3190',
    TITLE: '1:3193',
    TERMS_LIST: '1:3191',
    CTA: '1:3197'
  },

  // Terms titles from Figma
  TERMS_TITLES: {
    MASTER: '[필수] 전체 동의',
    FINANCIAL_PRODUCTS: '[필수] 금융상품 중요사항 확인',
    DETAILED_AGREEMENT: '[필수] 전체 동의'
  },

  // Detailed terms items
  DETAILED_ITEMS: {
    PERSONAL_INFO: '개인정보 수집·이용 동의',
    FINANCIAL_INFO: '금융정보 등의 제공 동의'
  },

  // States
  STATES: {
    OPEN: 'open' as const,
    CLOSE: 'close' as const
  },

  // Validation messages
  VALIDATION: {
    ALL_TERMS_REQUIRED: '모든 필수 약관에 동의해 주세요',
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다'
  }
} as const

// Type exports for component prop validation
export type TermsState = 'open' | 'close'
export type TermsAgreementState = typeof TERMS_AGREEMENT_CONSTANTS.STATES[keyof typeof TERMS_AGREEMENT_CONSTANTS.STATES]