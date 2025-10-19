// Subscription Success Page Types and Constants
// Based on Figma Frame: 136:17782 ("18" - 가입 완료 화면)

export interface SummaryItem {
  title: string
  data: string
  color?: 'green' | 'red' | 'blue' | undefined
}

export interface SubscriptionSuccessData {
  productName: string
  withdrawalAccount: string
  subscriptionAmount: string
  interestRate: string
  canceledProductName: string
  canceledAccount: string
  canceledAmount: string
  isCompleted: boolean
}

export interface SuccessEvent {
  action: 'confirm' | 'navigate'
  data: SubscriptionSuccessData
  timestamp: number
}

// Default data matching Figma design
export const DEFAULT_SUBSCRIPTION_SUCCESS_DATA: SubscriptionSuccessData = {
  productName: '상품명', // Dynamic placeholder
  withdrawalAccount: 'NH농협 123-456-78910',
  subscriptionAmount: '500,000원',
  interestRate: '정부고시금리',
  canceledProductName: '&상품명&', // Dynamic placeholder
  canceledAccount: 'NH농협은행 123-456-78910',
  canceledAmount: '5,000,000원',
  isCompleted: true
}

// Constants from Figma design
export const SUBSCRIPTION_SUCCESS_CONSTANTS = {
  // Page metadata
  FRAME_ID: '136:17782',
  FRAME_NAME: '18',

  // Title template
  TITLE_TEMPLATE: '%상품명%을\n가입했어요',

  // Image constants
  COMPLETE_IMAGE: {
    WIDTH: 140,
    HEIGHT: 140,
    ALT_TEXT: '가입 완료',
    FIGMA_NODE_ID: '136:17783'
  },

  // Summary section labels (matching Figma exactly)
  SUMMARY_LABELS: {
    WITHDRAWAL_ACCOUNT: '출금계좌',
    SUBSCRIPTION_AMOUNT: '가입금액',
    INTEREST_RATE: '적용금리',
    CANCELED_HEADER: '해지된 청약 내역',
    CANCELED_PRODUCT_NAME: '상품명',
    CANCELED_ACCOUNT: '해지 계좌',
    CANCELED_AMOUNT: '해지 금액'
  },

  // CTA button text
  CTA_BUTTON: {
    PRIMARY: '확인'
  },

  // Default values from Figma
  DEFAULT_VALUES: {
    BANK_NAME: 'NH농협',
    BANK_NAME_FULL: 'NH농협은행',
    ACCOUNT_NUMBER: '123-456-78910',
    SUBSCRIPTION_AMOUNT: '500,000원',
    INTEREST_RATE: '정부고시금리',
    CANCELED_AMOUNT: '5,000,000원'
  },

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '136:17782',
    COMPLETE_IMAGE: '136:17783',
    PAGE_TITLE: '136:17784',
    SUMMARY_PRIMARY: '136:17785',
    SUMMARY_SECONDARY: '136:17786',
    CTA: '136:17787'
  },

  // Design tokens from Figma
  DESIGN_TOKENS: {
    FRAME_WIDTH: 360,
    FRAME_HEIGHT: 816,
    CONTENT_WIDTH: 312,
    CONTENT_GAP: 32,
    IMAGE_SIZE: 140,
    CTA_WIDTH: 360,
    SUMMARY_PADDING: 20,
    SUMMARY_BORDER_RADIUS: 16
  },

  // Typography tokens from Figma
  TYPOGRAPHY: {
    TITLE: {
      fontFamily: 'Pretendard',
      fontSize: 26,
      fontWeight: 600,
      lineHeight: 38,
      letterSpacing: -0.52
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
    BACKGROUND: '#ffffff', // color/bg/default
    CONTAINER_BG: '#f6f6f6', // color/bg/container
    GREEN_PRIMARY: '#19973c', // Success/primary green
    WHITE: '#ffffff'
  },

  // Border radius from Figma
  BORDER_RADIUS: {
    CONTAINER: 16, // border/radius/16
    BUTTON: 12 // border/radius/12
  }
} as const

// Type exports for component prop validation
export type SubscriptionSuccessState = 'initial' | 'processing' | 'complete' | 'error'
export type SummaryItemColor = 'green' | 'red' | 'blue' | undefined

// Helper functions for subscription success data handling
export const formatProductTitle = (productName: string): string => {
  if (!productName || productName.includes('&')) {
    return '상품을\n가입했어요'
  }
  return `${productName}을\n가입했어요`
}

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

export const validateSuccessData = (data: SubscriptionSuccessData): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []

  if (!data.productName || data.productName.includes('&')) {
    errors.push('상품명이 설정되지 않았습니다')
  }

  if (!data.withdrawalAccount) {
    errors.push('출금계좌가 설정되지 않았습니다')
  }

  if (!data.subscriptionAmount) {
    errors.push('가입금액이 설정되지 않았습니다')
  }

  if (!data.canceledProductName || data.canceledProductName.includes('&')) {
    errors.push('해지된 상품명이 설정되지 않았습니다')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Create subscription summary items from data
export const createSubscriptionSummaryItems = (data: SubscriptionSuccessData): SummaryItem[] => {
  const { SUMMARY_LABELS } = SUBSCRIPTION_SUCCESS_CONSTANTS

  return [
    {
      title: SUMMARY_LABELS.WITHDRAWAL_ACCOUNT,
      data: data.withdrawalAccount,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.SUBSCRIPTION_AMOUNT,
      data: data.subscriptionAmount,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.INTEREST_RATE,
      data: data.interestRate,
      color: undefined
    }
  ]
}

// Create canceled subscription summary items from data
export const createCanceledSummaryItems = (data: SubscriptionSuccessData): SummaryItem[] => {
  const { SUMMARY_LABELS } = SUBSCRIPTION_SUCCESS_CONSTANTS

  return [
    {
      title: SUMMARY_LABELS.CANCELED_PRODUCT_NAME,
      data: data.canceledProductName,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.CANCELED_ACCOUNT,
      data: data.canceledAccount,
      color: undefined
    },
    {
      title: SUMMARY_LABELS.CANCELED_AMOUNT,
      data: data.canceledAmount,
      color: undefined
    }
  ]
}

// Update summary items with dynamic data
export const updateSummaryItemsWithDynamicData = (
  items: SummaryItem[],
  productName: string
): SummaryItem[] => {
  return items.map(item => {
    if (item.title === SUBSCRIPTION_SUCCESS_CONSTANTS.SUMMARY_LABELS.CANCELED_PRODUCT_NAME) {
      return { ...item, data: productName }
    }
    return item
  })
}

// Generate success summary for logging/analytics
export const generateSuccessSummary = (data: SubscriptionSuccessData): {
  summary: string
  details: Record<string, string>
} => {
  const subscriptionAmount = parseAmount(data.subscriptionAmount)
  const canceledAmount = parseAmount(data.canceledAmount)
  const formattedSubscriptionAmount = formatAmount(subscriptionAmount)
  const formattedCanceledAmount = formatAmount(canceledAmount)

  return {
    summary: `${data.productName} 가입 완료`,
    details: {
      productName: data.productName,
      subscriptionAmount: formattedSubscriptionAmount,
      withdrawalAccount: data.withdrawalAccount,
      interestRate: data.interestRate,
      canceledProductName: data.canceledProductName,
      canceledAmount: formattedCanceledAmount,
      canceledAccount: data.canceledAccount
    }
  }
}

// Check if success data is complete
export const isSuccessDataComplete = (data: SubscriptionSuccessData): boolean => {
  const validation = validateSuccessData(data)
  return validation.isValid && data.isCompleted
}

// Mock success data for development/testing
export const MOCK_SUBSCRIPTION_SUCCESS_DATA: SubscriptionSuccessData = {
  productName: '청년주택드림청약통장',
  withdrawalAccount: 'NH농협 123-456-78910',
  subscriptionAmount: '500,000원',
  interestRate: '정부고시금리',
  canceledProductName: '기존청약통장',
  canceledAccount: 'NH농협은행 123-456-78910',
  canceledAmount: '5,000,000원',
  isCompleted: true
}

// Export for backward compatibility
export type SuccessData = SubscriptionSuccessData