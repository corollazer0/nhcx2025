<template>
  <div
    v-if="isVisible"
    class="popup-overlay"
    :class="overlayClasses"
    data-testid="popup-overlay"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
    :aria-describedby="bodyId"
    @click="handleOverlayClick"
    @keydown.esc="handleEscape"
  >
    <div
      class="popup"
      :class="popupClasses"
      data-testid="popup"
      @click.stop
    >
      <div class="popup__contents" data-testid="popup-contents">
        <div 
          v-if="hasText"
          class="popup__text" 
          data-testid="popup-text"
        >
          <h2
            v-if="showTitle && title"
            :id="titleId"
            class="popup__title"
            data-testid="popup-title"
          >
            {{ title }}
          </h2>
          <p
            :id="bodyId"
            class="popup__body"
            :class="bodyClasses"
            data-testid="popup-body"
          >
            {{ bodyText }}
          </p>
        </div>
      </div>
      
      <div 
        v-if="hasActions"
        class="popup__actions" 
        data-testid="popup-actions"
      >
        <button
          v-if="showSecondaryButton"
          type="button"
          class="popup__button popup__button--secondary"
          :class="secondaryButtonClasses"
          data-testid="popup-secondary-button"
          @click="handleSecondaryClick"
        >
          {{ secondaryButtonText }}
        </button>
        <button
          v-if="showPrimaryButton"
          type="button"
          class="popup__button popup__button--primary"
          :class="primaryButtonClasses"
          data-testid="popup-primary-button"
          @click="handlePrimaryClick"
        >
          {{ primaryButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

interface PopupProps {
  isVisible?: boolean
  title?: string
  bodyText?: string
  showTitle?: boolean
  primaryButtonText?: string
  secondaryButtonText?: string
  showPrimaryButton?: boolean
  showSecondaryButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'warning' | 'error' | 'success'
  centered?: boolean
  zIndex?: number
}

const props = withDefaults(defineProps<PopupProps>(), {
  isVisible: false,
  title: '타이틀',
  bodyText: '내용을 입력해주세요.',
  showTitle: true,
  primaryButtonText: '확인',
  secondaryButtonText: '취소',
  showPrimaryButton: true,
  showSecondaryButton: false,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  size: 'md',
  variant: 'default',
  centered: true,
  zIndex: 1000
})

const emit = defineEmits<{
  close: []
  'primary-click': []
  'secondary-click': []
  'overlay-click': []
  'escape-press': []
}>()

// Generate unique IDs for accessibility
const instance = getCurrentInstance()
const componentId = `popup-${instance?.uid || Math.random().toString(36).substr(2, 9)}`
const titleId = `${componentId}-title`
const bodyId = `${componentId}-body`

// Computed classes
const overlayClasses = computed(() => [
  'popup-overlay',
  `popup-overlay--${props.variant}`,
  {
    'popup-overlay--centered': props.centered,
    'popup-overlay--visible': props.isVisible
  }
])

const popupClasses = computed(() => [
  'popup',
  `popup--${props.size}`,
  `popup--${props.variant}`,
  {
    'popup--has-title': props.showTitle && props.title,
    'popup--has-actions': hasActions.value
  }
])

const bodyClasses = computed(() => [
  'popup__body',
  {
    'popup__body--no-title': !props.showTitle || !props.title
  }
])

const primaryButtonClasses = computed(() => [
  'popup__button--primary',
  `popup__button--primary-${props.variant}`
])

const secondaryButtonClasses = computed(() => [
  'popup__button--secondary',
  `popup__button--secondary-${props.variant}`
])

// Computed properties
const hasText = computed(() => 
  (props.showTitle && props.title) || props.bodyText
)

const hasActions = computed(() => 
  props.showPrimaryButton || props.showSecondaryButton
)

// Event handlers
const handleOverlayClick = () => {
  emit('overlay-click')
  if (props.closeOnOverlayClick) {
    emit('close')
  }
}

const handleEscape = () => {
  emit('escape-press')
  if (props.closeOnEscape) {
    emit('close')
  }
}

const handlePrimaryClick = () => {
  emit('primary-click')
}

const handleSecondaryClick = () => {
  emit('secondary-click')
}

// Body scroll lock management
const originalBodyOverflow = ref('')

const lockBodyScroll = () => {
  originalBodyOverflow.value = document.body.style.overflow
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = originalBodyOverflow.value
}

// Focus management
const focusFirstElement = async () => {
  await nextTick()
  const popup = document.querySelector('[data-testid="popup"]') as HTMLElement
  if (popup) {
    const focusableElements = popup.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    } else {
      popup.focus()
    }
  }
}

// Watch for visibility changes
watch(() => props.isVisible, async (newValue) => {
  if (newValue) {
    lockBodyScroll()
    await focusFirstElement()
  } else {
    unlockBodyScroll()
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (props.isVisible) {
    unlockBodyScroll()
  }
})

// Initial setup
onMounted(() => {
  if (props.isVisible) {
    lockBodyScroll()
    focusFirstElement()
  }
})
</script>

<style scoped>
.popup-overlay {
  --color-text-primary: #121212;
  --color-text-secondary: #767676;
  --color-bg-popup: #ffffff;
  --color-bg-overlay: rgba(0, 0, 0, 0.5);
  --color-button-primary: #19973c;
  --color-button-primary-text: #ffffff;
  --color-button-secondary: #ffffff;
  --color-button-secondary-text: #19973c;
  --color-button-secondary-border: #19973c;
  --border-radius-popup: 16px;
  --border-radius-button: 10px;
  --font-family: 'Pretendard', sans-serif;
  --font-size-title: 16px;
  --font-size-body: 15px;
  --font-size-button: 16px;
  --font-weight-semibold: 600;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --line-height-title: 24px;
  --line-height-body: 24px;
  --line-height-button: 24px;
  --shadow-popup: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 20px;
  --spacing-xl: 24px;
  --spacing-2xl: 40px;
  
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-bg-overlay);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: var(--spacing-md);
  z-index: v-bind(zIndex);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.popup-overlay--visible {
  opacity: 1;
  visibility: visible;
}

.popup-overlay--centered {
  align-items: center;
}

.popup {
  background-color: var(--color-bg-popup);
  border-radius: var(--border-radius-popup);
  box-shadow: var(--shadow-popup);
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.popup-overlay--visible .popup {
  transform: translateY(0);
}

.popup-overlay--centered .popup {
  transform: translateY(0);
}

.popup-overlay--visible.popup-overlay--centered .popup {
  transform: translateY(0);
}

.popup__contents {
  padding: var(--spacing-2xl) var(--spacing-xl) var(--spacing-lg);
}

.popup__text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.popup__title {
  font-family: var(--font-family);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-title);
  letter-spacing: -0.32px;
  color: var(--color-text-primary);
  margin: 0;
}

.popup__body {
  font-family: var(--font-family);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
  letter-spacing: -0.3px;
  color: var(--color-text-primary);
  margin: 0;
}

.popup__body--no-title {
  margin-top: 0;
}

.popup__actions {
  padding: 10px var(--spacing-xl) var(--spacing-lg);
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: stretch;
}

.popup__button {
  flex: 1;
  font-family: var(--font-family);
  font-size: var(--font-size-button);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-button);
  letter-spacing: -0.32px;
  border: none;
  border-radius: var(--border-radius-button);
  padding: var(--spacing-sm) var(--spacing-md);
  min-height: 48px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.popup__button:focus-visible {
  outline: 2px solid var(--color-button-primary);
  outline-offset: 2px;
}

.popup__button--primary {
  background-color: var(--color-button-primary);
  color: var(--color-button-primary-text);
}

.popup__button--primary:hover:not(:disabled) {
  background-color: #157a30;
}

.popup__button--primary:active {
  background-color: #135e29;
}

.popup__button--secondary {
  background-color: var(--color-button-secondary);
  color: var(--color-button-secondary-text);
  border: 1px solid var(--color-button-secondary-border);
}

.popup__button--secondary:hover:not(:disabled) {
  background-color: #f0f8f2;
}

.popup__button--secondary:active {
  background-color: #e0f2e4;
}

.popup__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Size variants */
.popup--sm {
  max-width: 300px;
}

.popup--sm .popup__contents {
  padding: var(--spacing-xl) var(--spacing-md) var(--spacing-md);
}

.popup--sm .popup__actions {
  padding: var(--spacing-xs) var(--spacing-md) var(--spacing-md);
}

.popup--md {
  max-width: 400px;
}

.popup--lg {
  max-width: 500px;
}

.popup--lg .popup__contents {
  padding: 48px var(--spacing-2xl) var(--spacing-xl);
}

.popup--lg .popup__actions {
  padding: var(--spacing-md) var(--spacing-2xl) var(--spacing-xl);
}

/* Variant styles */
.popup--warning {
  --color-button-primary: #ff9500;
  --color-button-secondary-border: #ff9500;
  --color-button-secondary-text: #ff9500;
}

.popup--error {
  --color-button-primary: #e24949;
  --color-button-secondary-border: #e24949;
  --color-button-secondary-text: #e24949;
}

.popup--success {
  --color-button-primary: #19973c;
  --color-button-secondary-border: #19973c;
  --color-button-secondary-text: #19973c;
}

/* Responsive design */
@media (max-width: 480px) {
  .popup-overlay {
    padding: var(--spacing-xs);
    align-items: flex-end;
  }
  
  .popup {
    max-width: none;
    width: 100%;
    margin-bottom: 0;
  }
  
  .popup__contents {
    padding: var(--spacing-xl) var(--spacing-md) var(--spacing-md);
  }
  
  .popup__actions {
    padding: var(--spacing-xs) var(--spacing-md) var(--spacing-md);
  }
  
  .popup__button {
    min-height: 44px;
    font-size: 15px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .popup {
    border: 2px solid var(--color-text-primary);
  }
  
  .popup__button--secondary {
    border-width: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .popup-overlay,
  .popup,
  .popup__button {
    transition: none;
  }
}

/* Focus trap styles */
.popup:focus {
  outline: none;
}

/* Animation keyframes for entrance */
@keyframes popup-slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes popup-fade-in {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.popup-overlay--centered .popup {
  animation: popup-fade-in 0.3s ease;
}

.popup-overlay:not(.popup-overlay--centered) .popup {
  animation: popup-slide-up 0.3s ease;
}
</style>