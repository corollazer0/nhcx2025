<template>
  <div class="cta" data-testid="cta">
    <div class="cta__content">
      <!-- Type = popup variants -->
      <template v-if="type === 'popup'">
        <!-- Popup Full -->
        <div 
          v-if="ratio === 'cta-full'"
          class="cta__popup-full"
          data-testid="popup-full"
        >
          <button
            class="cta__button cta__button--secondary"
            type="button"
            @click="handlePrimaryClick"
          >
            <span class="cta__button-text">{{ primaryText }}</span>
          </button>
        </div>

        <!-- Popup 5:5 -->
        <div 
          v-else-if="ratio === 'cta-5:5'"
          class="cta__popup-5-5"
          data-testid="popup-5-5"
        >
          <button
            class="cta__button cta__button--tertiary"
            type="button"
            @click="handleSecondaryClick"
          >
            <span class="cta__button-text">{{ secondaryText }}</span>
          </button>
          <button
            class="cta__button cta__button--secondary"
            type="button"
            @click="handlePrimaryClick"
          >
            <span class="cta__button-text">{{ primaryText }}</span>
          </button>
        </div>

        <!-- Popup 3:7 -->
        <div 
          v-else-if="ratio === 'cta-3:7'"
          class="cta__popup-3-7"
          data-testid="popup-3-7"
        >
          <button
            class="cta__button cta__button--tertiary cta__button--narrow"
            type="button"
            @click="handleSecondaryClick"
          >
            <span class="cta__button-text">{{ secondaryText }}</span>
          </button>
          <button
            class="cta__button cta__button--secondary cta__button--flex"
            type="button"
            @click="handlePrimaryClick"
          >
            <span class="cta__button-text">{{ primaryText }}</span>
          </button>
        </div>
      </template>

      <!-- Type = basic variants -->
      <template v-else>
        <!-- Basic Full -->
        <div 
          v-if="ratio === 'cta-full'"
          class="cta__basic-full"
          data-testid="basic-full"
        >
          <button
            class="cta__button cta__button--primary cta__button--flex"
            type="button"
            @click="handlePrimaryClick"
          >
            <span class="cta__button-text cta__button-text--large">{{ primaryText }}</span>
          </button>
        </div>

        <!-- Basic 5:5 -->
        <div 
          v-else-if="ratio === 'cta-5:5'"
          class="cta__basic-5-5"
          data-testid="basic-5-5"
        >
          <button
            class="cta__button cta__button--tertiary"
            type="button"
            @click="handleSecondaryClick"
          >
            <span class="cta__button-text cta__button-text--large">{{ secondaryText }}</span>
          </button>
          <button
            class="cta__button cta__button--primary"
            type="button"
            @click="handlePrimaryClick"
          >
            <span class="cta__button-text cta__button-text--large">{{ primaryText }}</span>
          </button>
        </div>

        <!-- Basic 3:7 -->
        <div 
          v-else-if="ratio === 'cta-3:7'"
          class="cta__basic-3-7"
          data-testid="basic-3-7"
        >
          <button
            class="cta__button cta__button--tertiary cta__button--narrow"
            type="button"
            @click="handleSecondaryClick"
          >
            <span class="cta__button-text cta__button-text--large">{{ secondaryText }}</span>
          </button>
          <button
            class="cta__button cta__button--primary cta__button--flex"
            type="button"
            @click="handlePrimaryClick"
          >
            <span class="cta__button-text cta__button-text--large">{{ primaryText }}</span>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// CTA 컴포넌트 Props 인터페이스
interface CtaProps {
  // Figma Properties
  type?: 'basic' | 'popup';
  ratio?: 'cta-full' | 'cta-5:5' | 'cta-3:7';
  
  // 동적 데이터 Props  
  primaryText?: string;
  secondaryText?: string;
}

const props = withDefaults(defineProps<CtaProps>(), {
  // Figma 기본값
  type: 'basic',
  ratio: 'cta-full',
  
  // 동적 데이터 기본값
  primaryText: '버튼명',
  secondaryText: '버튼'
});

// 이벤트 정의
const emit = defineEmits<{
  'primary-click': [event: MouseEvent];
  'secondary-click': [event: MouseEvent];
}>();

// 이벤트 핸들러
const handlePrimaryClick = (event: MouseEvent) => {
  emit('primary-click', event);
};

const handleSecondaryClick = (event: MouseEvent) => {
  emit('secondary-click', event);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.cta {
  --color-text-button-primary-default: #ffffff;
  --color-bg-button-primary-default: #19973c;
  --color-text-button-secondary-default: #19973c;
  --color-bg-button-secondary-default: #ffffff;
  --color-border-button-secondary-default: #19973c;
  --color-text-button-tertiary-default: #121212;
  --color-bg-button-tertiary-default: #ffffff;
  --color-border-button-tertiary-default: #d3d3d3;
  --color-bg-default: #ffffff;
  --color-bg-gradient-gradient-100: #ffffff;
  --color-bg-gradient-gradient-0: #ffffff00;
  --border-radius-10: 10px;
  --border-radius-12: 12px;
  --font-pretendard-medium-16: "Pretendard", sans-serif;
  --font-pretendard-medium-18: "Pretendard", sans-serif;

  width: 100%;
  height: 100%;
  position: relative;
}

.cta__content {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Popup Styles */
.cta__popup-full,
.cta__popup-5-5,
.cta__popup-3-7 {
  background-color: var(--color-bg-default);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 24px 20px 24px;
  position: relative;
  width: 100%;
  height: 100%;
}

.cta__popup-full {
  gap: 10px;
}

.cta__popup-5-5,
.cta__popup-3-7 {
  gap: 8px;
}

/* Basic Styles */
.cta__basic-full,
.cta__basic-5-5,
.cta__basic-3-7 {
  background: linear-gradient(180deg, var(--color-bg-gradient-gradient-0) 99.49%, var(--color-bg-gradient-gradient-100) 89.796%);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 24px 32px 24px;
  position: relative;
  width: 100%;
  height: 100%;
}

.cta__basic-full {
  gap: 10px;
}

.cta__basic-5-5,
.cta__basic-3-7 {
  gap: 8px;
}

/* Button Styles */
.cta__button {
  border: none;
  border-radius: var(--border-radius-10);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 12px 16px;
  position: relative;
  transition: all 0.2s;
  min-height: 1px;
  min-width: 1px;
}

/* Basic button larger padding */
.cta__basic-full .cta__button,
.cta__basic-5-5 .cta__button,
.cta__basic-3-7 .cta__button {
  border-radius: var(--border-radius-12);
  padding: 15px 16px;
}

/* Button variants */
.cta__button--primary {
  background-color: var(--color-bg-button-primary-default);
  border: 1px solid var(--color-bg-button-primary-default);
}

.cta__button--primary:hover {
  background-color: #0d5722;
  border-color: #0d5722;
}

.cta__button--primary:active {
  background-color: #0d5722;
  transform: translateY(1px);
}

.cta__button--secondary {
  background-color: var(--color-bg-button-secondary-default);
  border: 1px solid var(--color-border-button-secondary-default);
}

.cta__button--secondary:hover {
  background-color: #f0f9f3;
}

.cta__button--secondary:active {
  background-color: #e6f7ea;
  transform: translateY(1px);
}

.cta__button--tertiary {
  background-color: var(--color-bg-button-tertiary-default);
  border: 1px solid var(--color-border-button-tertiary-default);
}

.cta__button--tertiary:hover {
  background-color: #f8f8f8;
}

.cta__button--tertiary:active {
  background-color: #f0f0f0;
  transform: translateY(1px);
}

/* Button sizing */
.cta__button--flex {
  flex: 1;
  min-width: 0;
}

.cta__button--narrow {
  width: 100px;
  flex: 0 0 100px;
}

/* Focus styles */
.cta__button:focus {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

/* Button text */
.cta__button-text {
  font-family: var(--font-pretendard-medium-16);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
  text-align: center;
  white-space: pre;
  flex: 1;
  min-width: 0;
  min-height: 1px;
}

.cta__button-text--large {
  font-family: var(--font-pretendard-medium-18);
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
}

/* Text colors by button type */
.cta__button--primary .cta__button-text {
  color: var(--color-text-button-primary-default);
}

.cta__button--secondary .cta__button-text {
  color: var(--color-text-button-secondary-default);
}

.cta__button--tertiary .cta__button-text {
  color: var(--color-text-button-tertiary-default);
}

/* Responsive adjustments for narrow screens */
@media (max-width: 480px) {
  .cta__popup-full,
  .cta__popup-5-5,
  .cta__popup-3-7,
  .cta__basic-full,
  .cta__basic-5-5,
  .cta__basic-3-7 {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .cta__button--narrow {
    width: 80px;
    flex: 0 0 80px;
  }
  
  .cta__button-text {
    font-size: 14px;
    line-height: 22px;
  }
  
  .cta__button-text--large {
    font-size: 16px;
    line-height: 24px;
  }
}
</style>