<template>
  <div 
    class="navigation"
    data-testid="navigation"
  >
    <!-- Previous Button -->
    <div 
      v-if="previous" 
      class="navigation__btn-container navigation__btn-container--left"
      data-name="Btn"
    >
      <div 
        class="navigation__icon-container"
        @click="$emit('previous', $event)"
        tabindex="0"
        role="button"
        :aria-label="previousAriaLabel"
        @keydown.enter="$emit('previous', $event)"
        @keydown.space.prevent="$emit('previous', $event)"
      >
        <div class="navigation__icon-wrapper">
          <img 
            :src="previousIcon"
            alt=""
            class="navigation__icon"
          />
        </div>
      </div>
    </div>

    <!-- Title Section -->
    <div 
      class="navigation__text-container"
      data-name="Text"
    >
      <div 
        v-if="title" 
        class="navigation__title"
      >
        <p class="navigation__title-text">{{ title1 }}</p>
      </div>
    </div>

    <!-- Right Button Section -->
    <div 
      class="navigation__btn-container navigation__btn-container--right"
      data-name="Btn"
    >
      <!-- CS Center Icon -->
      <div 
        v-if="cs" 
        class="navigation__icon-container"
        @click="$emit('cs', $event)"
        tabindex="0"
        role="button"
        :aria-label="csAriaLabel"
        @keydown.enter="$emit('cs', $event)"
        @keydown.space.prevent="$emit('cs', $event)"
      >
        <IconCsCenter 
          :aria-label="csAriaLabel"
          class="navigation__icon navigation__icon--svg"
        />
      </div>

      <!-- Cancel Text -->
      <div 
        v-if="cancel" 
        class="navigation__cancel-text"
        @click="$emit('cancel', $event)"
        tabindex="0"
        role="button"
        :aria-label="cancelAriaLabel"
        @keydown.enter="$emit('cancel', $event)"
        @keydown.space.prevent="$emit('cancel', $event)"
      >
        <p>취소</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconCsCenter from './icons/IconCsCenter.vue';

interface NavigationProps {
  previous?: boolean;
  title?: boolean;
  title1?: string;
  cs?: boolean;
  cancel?: boolean;
  previousAriaLabel?: string;
  csAriaLabel?: string;
  cancelAriaLabel?: string;
}

const props = withDefaults(defineProps<NavigationProps>(), {
  previous: true,
  title: true,
  title1: '서비스 타이틀',
  cs: true,
  cancel: true,
  previousAriaLabel: '이전 페이지로 이동',
  csAriaLabel: '고객센터',
  cancelAriaLabel: '취소'
});

const emit = defineEmits<{
  previous: [event: MouseEvent | KeyboardEvent];
  cs: [event: MouseEvent | KeyboardEvent];
  cancel: [event: MouseEvent | KeyboardEvent];
}>();

// 이전 버튼 아이콘 (임시로 URL 유지, 추후 IconPrevious 컴포넌트로 대체 예정)
const previousIcon = "http://localhost:3845/assets/f2124df9be5df568d9ee2dfe26bca84b898ba10b.svg";
</script>

<style scoped>
/* Design tokens from Figma variables */
.navigation {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-font-2: #343434;
  --color-icon-gray900: #111111;
  
  /* Layout matching Figma exactly */
  background-color: var(--color-bg-default);
  box-sizing: border-box;
  display: flex;
  gap: 3px;
  align-items: center;
  justify-content: center;
  padding: 13px 24px;
  width: 100%;
  height: 50px;
  position: relative;
}

/* Button Containers - 60px width as per Figma */
.navigation__btn-container {
  display: flex;
  gap: 3px;
  height: 24px;
  align-items: center;
  flex-shrink: 0;
  min-width: 60px;
}

.navigation__btn-container--left {
  justify-content: flex-start;
}

.navigation__btn-container--right {
  justify-content: flex-end;
}

/* Icon Components - 24x24px as per Figma */
.navigation__icon-container {
  overflow: visible;
  position: relative;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation__icon-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation__icon {
  display: block;
  width: 24px;
  height: 24px;
  object-fit: contain;
  /* SVG 아이콘을 위한 최적화 */
  vertical-align: middle;
  /* 추후 아이콘 컴포넌트 대체를 위한 준비 */
  transition: opacity 0.2s ease;
}

/* SVG 아이콘 컴포넌트를 위한 특별 스타일 */
.navigation__icon--svg {
  flex-shrink: 0;
}

/* Text Container - Flexible center area */
.navigation__text-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 1px;
  min-width: 1px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

/* Title - Exact Figma typography */
.navigation__title {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-style: normal;
  justify-content: center;
  line-height: 0;
  min-height: 1px;
  min-width: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  flex-shrink: 0;
  color: var(--color-text-font-1);
  font-size: 16px;
  text-align: center;
  white-space: nowrap;
  letter-spacing: -0.32px;
}

.navigation__title-text {
  line-height: 24px;
  margin: 0;
  text-overflow: inherit;
  text-wrap: inherit;
  white-space: inherit;
  overflow: inherit;
}

/* Cancel Text - Exact Figma styling */
.navigation__cancel-text {
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-style: normal;
  height: 100%;
  justify-content: center;
  line-height: 0;
  position: relative;
  flex-shrink: 0;
  color: var(--color-text-font-2);
  font-size: 14px;
  text-align: right;
  letter-spacing: -0.28px;
  min-width: 24px;
  width: auto;
  cursor: pointer;
  border-radius: 4px;
  padding: 0 2px;
}

.navigation__cancel-text p {
  line-height: 22px;
  margin: 0;
}

/* Hover Effects */
.navigation__icon-container:hover {
  background-color: rgba(18, 18, 18, 0.08);
}

.navigation__cancel-text:hover {
  background-color: rgba(18, 18, 18, 0.08);
}

/* Focus States for Accessibility */
.navigation__icon-container:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

.navigation__cancel-text:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

/* Active States */
.navigation__icon-container:active {
  background-color: rgba(18, 18, 18, 0.12);
  transform: translateY(1px);
}

.navigation__cancel-text:active {
  background-color: rgba(18, 18, 18, 0.12);
  transform: translateY(1px);
}

/* Disabled state (when no event handler) */
.navigation__icon-container:not([tabindex="0"]) {
  cursor: default;
  opacity: 0.6;
}

.navigation__cancel-text:not([tabindex="0"]) {
  cursor: default;
  opacity: 0.6;
}
</style>