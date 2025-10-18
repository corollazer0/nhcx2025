// Subscription Confirmation Page Types and Constants
// Based on Figma Frame: FMDC-0802090000F01

export interface SummaryItem {
  title: string
  data: string
  color?: 'green' | 'red' | 'blue' | undefined
}

export interface SubscriptionConfirmationData {
  productName: string
  withdrawalAccount: string
  subscriptionAmount: string
  interestRate: string
  autoTransferCycle: string
  autoTransferStatus: string
  autoTransferAmount: string
  isConfirmed: boolean
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

export interface ConfirmationEvent {
  action: 'edit' | 'confirm'
  data: SubscriptionConfirmationData
  timestamp: number
}

// Default data matching Figma design
export const DEFAULT_SUBSCRIPTION_CONFIRMATION_DATA: SubscriptionConfirmationData = {
  productName: '&상품명&', // Dynamic placeholder
  withdrawalAccount: 'NH농협은행 123-456-78910',
  subscriptionAmount: '5,000,000원',
  interestRate: '정부고시금리',
  autoTransferCycle: '매월 &일자&', // Dynamic placeholder
  autoTransferStatus: '신청 안 함',
  autoTransferAmount: '500,000원',
  isConfirmed: false
}

// Constants from Figma design
export const SUBSCRIPTION_CONFIRMATION_CONSTANTS = {
  // Page metadata
  PROGRESS_RATIO: 0.9, // 90% progress - near completion

  // Title
  TITLE: '가입정보를 확인해 주세요',

  // Summary section labels (matching Figma exactly)
  SUMMARY_LABELS: {
    PRODUCT_NAME: '상품명',
    WITHDRAWAL_ACCOUNT: '출금계좌',
    SUBSCRIPTION_AMOUNT: '가입금액',
    INTEREST_RATE: '적용금리',
    AUTO_TRANSFER_CYCLE: '자동이체 주기',
    AUTO_TRANSFER_STATUS: '자동이체',
    AUTO_TRANSFER_AMOUNT: '자동이체 금액'
  },

  // CTA button texts
  CTA_BUTTONS: {
    SECONDARY: '정보 수정',
    PRIMARY: '이대로 가입'
  },

  // Default values from Figma
  DEFAULT_VALUES: {
    BANK_NAME: 'NH농협은행',
    ACCOUNT_NUMBER: '123-456-78910',
    SUBSCRIPTION_AMOUNT: '5,000,000원',
    INTEREST_RATE: '정부고시금리',
    AUTO_TRANSFER_STATUS_OFF: '신청 안 함',
    AUTO_TRANSFER_STATUS_ON: '신청함',
    AUTO_TRANSFER_AMOUNT: '500,000원'
  },

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2664',
    HEADER: '1:2669',
    NAVIGATION: '1:2670',
    PROGRESS: '1:2671',
    CONTENTS: '1:2665',
    TITLE: '1:2666',
    TITLE_TEXT: '1:2667',
    SUMMARY_CARD: '1:2668',
    CTA: '1:2672',
    CTA_BUTTONS: '1:2673'
  },

  // Design tokens from Figma
  DESIGN_TOKENS: {
    FRAME_WIDTH: 360,
    FRAME_HEIGHT: 760,
    CONTENTS_WIDTH: 312,
    CONTENTS_LEFT: 24,
    CONTENTS_RIGHT: 24,
    HEADER_TOP: 24,
    CONTENTS_TOP: 120,
    SECTION_GAP: 32,
    SUMMARY_PADDING: 20,
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
    SUMMARY_TITLE: {
      fontFamily: 'Pretendard',
      fontSize: 15,
      fontWeight: 400,
      lineHeight: 20,
      letterSpacing: -0.3
    },
    SUMMARY_DATA: {
      fontFamily: 'Pretendard',
      fontSize: 15,
      fontWeight: 500,
      lineHeight: 20,
      letterSpacing: -0.3
    },
    CTA_BUTTON: {
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
    TEXT_SECONDARY: '#505050', // color/text/font-3
    TEXT_POINT: '#19973c', // color/text/point (for subscription amount)
    BACKGROUND: '#ffffff', // color/bg/default
    CONTAINER_BG: '#f6f6f6', // color/bg/container
    GREEN_PRIMARY: '#19973c', // Success/primary green
    BORDER_LIGHT: '#d3d3d3' // Light border for secondary button
  },

  // Border radius from Figma
  BORDER_RADIUS: {
    CONTAINER: 16, // border/radius/16
    BUTTON: 12 // border/radius/12
  },

  // Validation messages
  VALIDATION: {
    CONFIRMATION_REQUIRED: '가입 정보 확인이 필요합니다',
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다',
    SUBMISSION_ERROR: '가입 처리 중 오류가 발생했습니다'
  }
} as const

// Type exports for component prop validation
export type SubscriptionConfirmationState = 'initial' | 'confirming' | 'processing' | 'complete' | 'error'
export type SummaryItemColor = 'green' | 'red' | 'blue' | undefined

// Helper functions for subscription data handling
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('ko-KR').format(amount) + '원'
}

export const formatAccountNumber = (accountNumber: string): string => {
  // Format account number for display (e.g., 12345678910 → 123-456-78910)
  if (accountNumber.length === 11) {
    return `${accountNumber.slice(0, 3)}-${accountNumber.slice(3, 6)}-${accountNumber.slice(6)}`
  }
  return accountNumber
}

export const parseAmount = (amountStr: string): number => {
  // Parse amount string to number (e.g., "5,000,000원" → 5000000)
  return parseInt(amountStr.replace(/[^\d]/g, '')) || 0
}

export const validateSubscriptionData = (data: SubscriptionConfirmationData): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  const { VALIDATION } = SUBSCRIPTION_CONFIRMATION_CONSTANTS

  if (!data.productName || data.productName.includes('&')) {
    errors.push('상품명이 설정되지 않았습니다')
  }

  if (!data.withdrawalAccount) {
    errors.push('출금계좌가 설정되지 않았습니다')
  }

  if (!data.subscriptionAmount) {
    errors.push('가입금액이 설정되지 않았습니다')
  }

  if (data.autoTransferCycle.includes('&')) {
    errors.push('자동이체 주기가 설정되지 않았습니다')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Create summary items from subscription data
export const createSummaryItems = (data: SubscriptionConfirmationData): SummaryItem[] => {
  const { SUMMARY_LABELS } = SUBSCRIPTION_CONFIRMATION_CONSTANTS

  return [
    {
      title: SUMMARY_LABELS.PRODUCT_NAME,
      data: data.productName,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.WITHDRAWAL_ACCOUNT,
      data: data.withdrawalAccount,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.SUBSCRIPTION_AMOUNT,
      data: data.subscriptionAmount,
      color: 'green' // Highlighted in green as shown in Figma
    },
    {
      title: SUMMARY_LABELS.INTEREST_RATE,
      data: data.interestRate,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.AUTO_TRANSFER_CYCLE,
      data: data.autoTransferCycle,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.AUTO_TRANSFER_STATUS,
      data: data.autoTransferStatus,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.AUTO_TRANSFER_AMOUNT,
      data: data.autoTransferAmount,
      color: undefined
    }
  ]
}

// Update summary items with dynamic data
export const updateSummaryItemsWithDynamicData = (
  items: SummaryItem[],
  productName: string,
  transferDate: number
): SummaryItem[] => {
  return items.map(item => {
    if (item.title === SUBSCRIPTION_CONFIRMATION_CONSTANTS.SUMMARY_LABELS.PRODUCT_NAME) {
      return { ...item, data: productName }
    }
    if (item.title === SUBSCRIPTION_CONFIRMATION_CONSTANTS.SUMMARY_LABELS.AUTO_TRANSFER_CYCLE) {
      return { ...item, data: `매월 ${transferDate}일` }
    }
    return item
  })
}

// Generate confirmation summary for final submission
export const generateConfirmationSummary = (data: SubscriptionConfirmationData): {
  summary: string
  details: Record<string, string>
} => {
  const amount = parseAmount(data.subscriptionAmount)
  const formattedAmount = formatAmount(amount)

  return {
    summary: `${data.productName} ${formattedAmount} 가입 신청`,
    details: {
      productName: data.productName,
      amount: formattedAmount,
      account: data.withdrawalAccount,
      interestRate: data.interestRate,
      autoTransfer: data.autoTransferStatus,
      autoTransferAmount: data.autoTransferAmount
    }
  }
}

// Calculate total expected monthly amount
export const calculateMonthlyAmount = (data: SubscriptionConfirmationData): number => {
  if (data.autoTransferStatus === '신청함' || data.autoTransferStatus === '신청 함') {
    return parseAmount(data.autoTransferAmount)
  }
  return 0
}

// Format transfer cycle for display
export const formatTransferCycle = (cycle: string): string => {
  if (cycle.includes('&일자&')) {
    return cycle // Return as-is for dynamic placeholder
  }

  // Extract day number from cycle string
  const dayMatch = cycle.match(/(\d+)일/)
  if (dayMatch) {
    const day = parseInt(dayMatch[1])
    return `매월 ${day}일`
  }

  return cycle
}

// Check if subscription data is ready for submission
export const isSubscriptionDataComplete = (data: SubscriptionConfirmationData): boolean => {
  const validation = validateSubscriptionData(data)
  return validation.isValid && data.isConfirmed
}

// Mock subscription data for development/testing
export const MOCK_SUBSCRIPTION_DATA: SubscriptionConfirmationData = {
  productName: '청년주택드림청약통장',
  withdrawalAccount: 'NH농협은행 123-456-78910',
  subscriptionAmount: '5,000,000원',
  interestRate: '정부고시금리',
  autoTransferCycle: '매월 25일',
  autoTransferStatus: '신청 안 함',
  autoTransferAmount: '500,000원',
  isConfirmed: false
}

// Export for backward compatibility
export type ConfirmationData = SubscriptionConfirmationData