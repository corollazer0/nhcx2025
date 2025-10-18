// Housing Policy Selection Page Types and Constants
// Based on Figma Frame: FMDC-0802030000F01

export interface RegionOption {
  label: string
  value: string
}

export interface HousingPolicyData {
  selectedRegion: RegionOption | null
}

export interface NavigationEvent {
  type: 'previous' | 'cs' | 'cancel'
  timestamp: number
}

// Default data matching Figma design
export const DEFAULT_HOUSING_POLICY_DATA: HousingPolicyData = {
  selectedRegion: null
}

// Constants from Figma design
export const HOUSING_POLICY_CONSTANTS = {
  // Page metadata
  MAIN_TITLE: '주택공급 정책 활용을 위해 선택해 주세요',
  SUBTITLE: '본 조사표는 [주택공급에 관한 규칙] 제6조에 의거 주택공급 정책 자료로만 활용됩니다. 실제 주택공급 신청과는 관계가 없습니다.',
  PROGRESS_RATIO: 0.2, // 20% progress based on Figma progress bar
  CTA_TEXT: '다음',
  SELECT_PLACEHOLDER: '지역을 선택해 주세요',

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2554',
    HEADER: '1:2560',
    CONTENTS: '1:2555',
    TITLE_SECTION: '1:2556',
    MAIN_TITLE: '1:2557',
    SUBTITLE: '1:2558',
    REGION_SELECT: '1:2559',
    CTA: '1:2563'
  },

  // Design tokens from Figma
  DESIGN_TOKENS: {
    FRAME_WIDTH: 360,
    FRAME_HEIGHT: 760,
    CONTENTS_WIDTH: 312,
    HEADER_TOP: 24,
    CONTENTS_TOP: 120,
    CONTENTS_GAP: 32,
    TITLE_GAP: 12
  },

  // Typography tokens from Figma
  TYPOGRAPHY: {
    MAIN_TITLE: {
      fontFamily: 'Pretendard',
      fontSize: 22,
      fontWeight: 600,
      lineHeight: 32,
      letterSpacing: -0.44
    },
    SUBTITLE: {
      fontFamily: 'Pretendard',
      fontSize: 15,
      fontWeight: 400,
      lineHeight: 24,
      letterSpacing: -0.3
    }
  },

  // Color tokens from Figma
  COLORS: {
    TEXT_PRIMARY: '#121212', // color/text/font-1
    TEXT_SECONDARY: '#505050', // color/text/font-3
    BACKGROUND: '#ffffff' // color/bg/default
  },

  // Validation messages
  VALIDATION: {
    REGION_REQUIRED: '지역을 선택해 주세요',
    PROCESSING_ERROR: '처리 중 오류가 발생했습니다'
  }
} as const

// Type exports for component prop validation
export type HousingPolicyState = 'initial' | 'selecting' | 'selected' | 'submitting'