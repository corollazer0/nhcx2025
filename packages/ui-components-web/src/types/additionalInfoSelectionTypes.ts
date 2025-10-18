// Additional Info Selection Page Types and Constants
// Based on Figma Frame: FMDC-0802080000F01

export interface RadioOption {
  label: string
  value: string
}

export interface AdditionalInfoSelectionData {
  selectedEmployee: string
  nhPointUsage: NhPointUsage
  isFormValid: boolean
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

export interface EmployeeSearchEvent {
  searchTerm: string
  timestamp: number
}

export interface FormChangeEvent {
  field: 'selectedEmployee' | 'nhPointUsage'
  value: string
  timestamp: number
}

// NH Point usage union type
export type NhPointUsage = 'not-use' | 'use'

// Employee data interface
export interface EmployeeInfo {
  id: string
  name: string
  department: string
  position: string
  isActive: boolean
}

// Default data matching Figma design
export const DEFAULT_ADDITIONAL_INFO_SELECTION_DATA: AdditionalInfoSelectionData = {
  selectedEmployee: '', // Optional field - empty by default
  nhPointUsage: 'not-use', // Default to "사용안함" as shown in Figma
  isFormValid: true // Always valid since both fields are optional/have defaults
}

// Constants from Figma design
export const ADDITIONAL_INFO_SELECTION_CONSTANTS = {
  // Page metadata
  PROGRESS_RATIO: 0.8, // 80% progress based on subscription flow

  // Title
  TITLE: '추가정보를 선택해 주세요',

  // Search section
  SEARCH_LABEL: '권유직원',
  SEARCH_PLACEHOLDER: '(선택) 직원명 선택',
  SEARCH_TOOLTIP: '권유직원 정보 안내',

  // Radio section
  RADIO_LABEL: 'NH포인트 사용 신청',
  NH_POINT_OPTIONS: [
    { label: '사용안함', value: 'not-use' },
    { label: '사용함', value: 'use' }
  ],

  // Description text
  DESCRIPTION_TEXT: {
    LINE1: 'NH포인트를 현금처럼 사용해 보세요.',
    LINE2: '캐시백을 신청하면 바로 출금계좌로 입금됩니다.'
  },

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2646',
    HEADER: '1:2659',
    NAVIGATION: '1:2660',
    PROGRESS: '1:2661',
    CONTENTS: '1:2647',
    TITLE: '1:2648',
    TITLE_TEXT: '1:2649',
    SEARCH_SECTION: '1:2650',
    SEARCH_COMPONENT: '1:2651',
    SEARCH_HIDDEN_BOX: '1:2652',
    RADIO_SECTION: '1:2653',
    RADIO_LABEL: '1:2654',
    RADIO_GROUP: '1:2655',
    RADIO_NOT_USE: '1:2656',
    RADIO_USE: '1:2657',
    DESCRIPTION: '1:2658',
    CTA: '1:2662',
    CTA_BUTTON: '1:2663'
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
    SUBSECTION_GAP: 12,
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
    LABEL: {
      fontFamily: 'Pretendard',
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 22,
      letterSpacing: -0.28
    },
    DESCRIPTION: {
      fontFamily: 'Pretendard',
      fontSize: 13,
      fontWeight: 400,
      lineHeight: 20,
      letterSpacing: -0.26
    },
    SEARCH_PLACEHOLDER: {
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
    TEXT_SECONDARY: '#505050', // Label text color
    TEXT_MUTED: '#767676', // color/text/font-4
    TEXT_PLACEHOLDER: '#929292', // Search placeholder color
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
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다',
    SEARCH_ERROR: '직원 검색 중 오류가 발생했습니다'
  },

  // NH Point benefits information
  NH_POINT_INFO: {
    BENEFITS: {
      CASHBACK: '캐시백을 신청하면 바로 출금계좌로 입금됩니다',
      USAGE: 'NH포인트를 현금처럼 사용해 보세요',
      INSTANT_TRANSFER: '바로 출금계좌로 입금'
    },
    USAGE_TYPES: {
      NOT_USE: {
        label: '사용안함',
        description: 'NH포인트를 사용하지 않습니다'
      },
      USE: {
        label: '사용함',
        description: 'NH포인트를 현금처럼 사용합니다'
      }
    }
  }
} as const

// Type exports for component prop validation
export type AdditionalInfoSelectionState = 'initial' | 'searching' | 'validating' | 'complete'
export type SearchState = 'idle' | 'searching' | 'found' | 'not-found' | 'error'

// Helper functions for NH Point usage handling
export const getNhPointUsageLabel = (usage: NhPointUsage): string => {
  const option = ADDITIONAL_INFO_SELECTION_CONSTANTS.NH_POINT_OPTIONS.find(opt => opt.value === usage)
  return option?.label || ''
}

export const getNhPointUsageDescription = (usage: NhPointUsage): string => {
  const { NH_POINT_INFO } = ADDITIONAL_INFO_SELECTION_CONSTANTS
  if (usage === 'not-use') {
    return NH_POINT_INFO.USAGE_TYPES.NOT_USE.description
  } else if (usage === 'use') {
    return NH_POINT_INFO.USAGE_TYPES.USE.description
  }
  return ''
}

export const validateAdditionalInfoSelection = (data: AdditionalInfoSelectionData): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []

  // Both fields are optional, so validation always passes
  // Employee selection is optional
  // NH Point usage has a default value

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Create NH Point options from constants
export const createNhPointOptions = (): RadioOption[] => {
  return ADDITIONAL_INFO_SELECTION_CONSTANTS.NH_POINT_OPTIONS
}

// Employee search utilities
export const formatEmployeeName = (employee: EmployeeInfo): string => {
  return `${employee.name} (${employee.department})`
}

export const filterEmployees = (employees: EmployeeInfo[], searchTerm: string): EmployeeInfo[] => {
  if (!searchTerm.trim()) return employees

  const term = searchTerm.toLowerCase()
  return employees.filter(employee =>
    employee.name.toLowerCase().includes(term) ||
    employee.department.toLowerCase().includes(term) ||
    employee.position.toLowerCase().includes(term)
  )
}

export const validateEmployeeSearch = (searchTerm: string): {
  isValid: boolean
  error?: string
} => {
  // Employee search is optional, so always valid
  if (!searchTerm.trim()) {
    return { isValid: true }
  }

  if (searchTerm.length < 2) {
    return {
      isValid: false,
      error: '최소 2글자 이상 입력해주세요'
    }
  }

  return { isValid: true }
}

// Generate NH Point usage summary for confirmation
export const generateNhPointSummary = (usage: NhPointUsage): string => {
  const label = getNhPointUsageLabel(usage)
  if (usage === 'use') {
    return `NH포인트 ${label} - 캐시백 신청 시 출금계좌로 입금`
  }
  return `NH포인트 ${label}`
}

// Generate complete form summary
export const generateFormSummary = (data: AdditionalInfoSelectionData): {
  employee: string
  nhPoint: string
  isComplete: boolean
} => {
  return {
    employee: data.selectedEmployee || '선택하지 않음',
    nhPoint: generateNhPointSummary(data.nhPointUsage),
    isComplete: data.isFormValid
  }
}

// Calculate progress based on filled fields
export const calculateFormProgress = (data: AdditionalInfoSelectionData): number => {
  let filledFields = 0
  let totalFields = 2

  if (data.selectedEmployee) filledFields += 1
  filledFields += 1 // NH Point usage always has a value

  return (filledFields / totalFields) * 100
}

// Mock employee data for development/testing
export const MOCK_EMPLOYEES: EmployeeInfo[] = [
  {
    id: '1',
    name: '김철수',
    department: '영업팀',
    position: '과장',
    isActive: true
  },
  {
    id: '2',
    name: '이영희',
    department: '고객상담팀',
    position: '대리',
    isActive: true
  },
  {
    id: '3',
    name: '박민수',
    department: '디지털금융팀',
    position: '차장',
    isActive: true
  }
]

// Export for backward compatibility
export type AdditionalInfoData = AdditionalInfoSelectionData