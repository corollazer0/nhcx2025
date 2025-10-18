// Contract Delivery Selection Page Types and Constants
// Based on Figma Frame: FMDC-0802070000F01

export interface RadioOption {
  label: string
  value: string
}

export interface ContractDeliverySelectionData {
  deliveryMethod: DeliveryMethod
  emailAddress: string
  isFormValid: boolean
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

export interface FormChangeEvent {
  field: 'deliveryMethod' | 'email'
  value: string
  timestamp: number
}

// Delivery method union type
export type DeliveryMethod = 'email' | 'sms'

// Default data matching Figma design
export const DEFAULT_CONTRACT_DELIVERY_SELECTION_DATA: ContractDeliverySelectionData = {
  deliveryMethod: 'email', // Default to "이메일" as shown in Figma
  emailAddress: 'luckyGuy00@naver.com', // Default email from Figma
  isFormValid: true
}

// Constants from Figma design
export const CONTRACT_DELIVERY_SELECTION_CONSTANTS = {
  // Page metadata
  PROGRESS_RATIO: 0.7, // 70% progress based on subscription flow

  // Title
  TITLE: '계약서류는 어디로 보내드릴까요?',

  // Radio options (matching Figma design)
  DELIVERY_METHOD_OPTIONS: [
    { label: '이메일', value: 'email' },
    { label: '문자메시지', value: 'sms' }
  ],

  // Default values (matching exact Figma display)
  DEFAULT_EMAIL: 'luckyGuy00@naver.com',

  // Validation patterns
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2631',
    HEADER: '1:2641',
    NAVIGATION: '1:2642',
    PROGRESS: '1:2643',
    CONTENTS: '1:2632',
    TITLE: '1:2634',
    TITLE_TEXT: '1:2635',
    RADIO_SECTION: '1:2636',
    RADIO_GROUP: '1:2637',
    RADIO_EMAIL: '1:2638',
    RADIO_SMS: '1:2639',
    EMAIL_INPUT: '1:2640',
    CTA: '1:2644',
    CTA_BUTTON: '1:2645'
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
    RADIO_GAP: 16,
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
    EMAIL_INPUT: {
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
    TEXT_SECONDARY: '#767676', // color/text/font-4
    BACKGROUND: '#ffffff', // color/bg/default
    GREEN_PRIMARY: '#19973c', // Success/primary green
    BORDER: '#e1e1e1',
    BORDER_LIGHT: '#f0f0f0',
    RADIO_SELECTED_BORDER: '#19973c',
    RADIO_SELECTED_TEXT: '#19973c',
    RADIO_DEFAULT_TEXT: '#505050'
  },

  // Border radius from Figma
  BORDER_RADIUS: {
    RADIO: 10, // border/radius/10
    INPUT: 12, // border/radius/12
    BUTTON: 12 // border/radius/12
  },

  // Validation messages
  VALIDATION: {
    DELIVERY_METHOD_REQUIRED: '수신 방법을 선택해 주세요',
    EMAIL_REQUIRED: '이메일 주소를 입력해 주세요',
    EMAIL_INVALID: '올바른 이메일 주소를 입력해 주세요',
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다'
  },

  // Email format examples
  EMAIL_EXAMPLES: [
    'example@naver.com',
    'user@gmail.com',
    'name@daum.net'
  ]
} as const

// Type exports for component prop validation
export type ContractDeliverySelectionState = 'initial' | 'selecting' | 'validating' | 'complete'
export type EmailValidationState = 'valid' | 'invalid' | 'empty'

// Helper functions for delivery method handling
export const getDeliveryMethodLabel = (method: DeliveryMethod): string => {
  const option = CONTRACT_DELIVERY_SELECTION_CONSTANTS.DELIVERY_METHOD_OPTIONS.find(opt => opt.value === method)
  return option?.label || ''
}

export const validateEmail = (email: string): {
  isValid: boolean
  error?: string
} => {
  const { VALIDATION, EMAIL_REGEX } = CONTRACT_DELIVERY_SELECTION_CONSTANTS

  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: VALIDATION.EMAIL_REQUIRED
    }
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      isValid: false,
      error: VALIDATION.EMAIL_INVALID
    }
  }

  return { isValid: true }
}

export const validateContractDeliverySelection = (data: ContractDeliverySelectionData): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []
  const { VALIDATION } = CONTRACT_DELIVERY_SELECTION_CONSTANTS

  if (!data.deliveryMethod) {
    errors.push(VALIDATION.DELIVERY_METHOD_REQUIRED)
  }

  if (data.deliveryMethod === 'email') {
    const emailValidation = validateEmail(data.emailAddress)
    if (!emailValidation.isValid && emailValidation.error) {
      errors.push(emailValidation.error)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Create radio options from constants
export const createDeliveryMethodOptions = (): RadioOption[] => {
  return CONTRACT_DELIVERY_SELECTION_CONSTANTS.DELIVERY_METHOD_OPTIONS
}

// Email domain suggestions
export const getEmailDomainSuggestions = (input: string): string[] => {
  const commonDomains = ['@naver.com', '@gmail.com', '@daum.net', '@hanmail.net', '@yahoo.com']

  if (!input.includes('@')) {
    return commonDomains.map(domain => input + domain)
  }

  const [localPart, domainPart] = input.split('@')
  if (domainPart === '') {
    return commonDomains.map(domain => localPart + domain)
  }

  return commonDomains
    .filter(domain => domain.includes(domainPart))
    .map(domain => localPart + domain)
}

// Format email for display
export const formatEmailForDisplay = (email: string): string => {
  if (!email) return ''

  // Truncate very long emails for display
  if (email.length > 30) {
    const [localPart, domain] = email.split('@')
    if (domain) {
      return `${localPart.substring(0, 15)}...@${domain}`
    }
  }

  return email
}

// Check if email domain is commonly used
export const isCommonEmailDomain = (email: string): boolean => {
  const commonDomains = ['naver.com', 'gmail.com', 'daum.net', 'hanmail.net', 'yahoo.com', 'outlook.com']
  const domain = email.split('@')[1]
  return domain ? commonDomains.includes(domain.toLowerCase()) : false
}

// Generate delivery method summary for confirmation
export const generateDeliveryMethodSummary = (data: ContractDeliverySelectionData): string => {
  if (data.deliveryMethod === 'email') {
    return `이메일로 발송 (${data.emailAddress})`
  } else if (data.deliveryMethod === 'sms') {
    return '문자메시지로 발송'
  }
  return '수신 방법 미선택'
}

// Export for backward compatibility
export type ContractDeliveryData = ContractDeliverySelectionData