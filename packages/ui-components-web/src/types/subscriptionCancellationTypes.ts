/**
 * TypeScript type definitions for Subscription Cancellation Confirmation page
 * Based on Figma Frame: FM_DF03_0700_B2502
 */

// Core subscription data interface
export interface SubscriptionData {
  productName: string
  subscriptionAccount: string
  estimatedCancellationAmount: string
}

// Summary item interface matching the Summary component
export interface SummaryItem {
  title: string
  data: string
  color?: 'default' | 'green' | 'red' | 'blue'
}

// Page props interface for potential future use
export interface SubscriptionCancellationProps {
  initialData?: Partial<SubscriptionData>
  onNext?: (data: SubscriptionData) => void
  onPrevious?: () => void
  onCancel?: () => void
  onCsCenter?: () => void
}

// Navigation event types
export type NavigationEvent = MouseEvent | KeyboardEvent

// Component state interface
export interface SubscriptionCancellationState {
  pageData: SubscriptionData
  isLoading: boolean
  error: string | null
}

// API response interface for future API integration
export interface SubscriptionCancellationApiResponse {
  success: boolean
  data: SubscriptionData
  message?: string
  errorCode?: string
}

// Constants for the page
export const SUBSCRIPTION_CANCELLATION_CONSTANTS = {
  PAGE_TITLE: '청약해지 예상 금액을 확인해 주세요',
  NAVIGATION_TITLE: '청약 가입',
  CTA_TEXT: '다음',
  PROGRESS_RATIO: 0.222, // 80px out of 360px from Figma
  FIGMA_NODE_IDS: {
    FRAME: '1:2532',
    HEADER: '1:2537',
    CONTENTS: '1:2533',
    TITLE: '1:2534',
    CTA: '1:2540'
  },
  SUMMARY_FIELDS: {
    PRODUCT_NAME: '상품명',
    SUBSCRIPTION_ACCOUNT: '청약계좌',
    CANCELLATION_AMOUNT: '해지 예상 금액'
  }
} as const

// Type for Figma node IDs
export type FigmaNodeId = typeof SUBSCRIPTION_CANCELLATION_CONSTANTS.FIGMA_NODE_IDS[keyof typeof SUBSCRIPTION_CANCELLATION_CONSTANTS.FIGMA_NODE_IDS]

// Type for summary field keys
export type SummaryFieldKey = keyof typeof SUBSCRIPTION_CANCELLATION_CONSTANTS.SUMMARY_FIELDS

// Default subscription data
export const DEFAULT_SUBSCRIPTION_DATA: SubscriptionData = {
  productName: '&상품명&',
  subscriptionAccount: 'NH농협은행 123-456-78910',
  estimatedCancellationAmount: '5,000,000원'
}