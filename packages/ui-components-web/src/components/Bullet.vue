<template>
  <div 
    class="bullet-component" 
    data-testid="bullet"
    role="listitem"
    :aria-level="type === '1depth' ? 1 : 2"
  >
    <!-- Type=1depth -->
    <div v-if="type === '1depth'" class="type-1depth" data-name="bullet-type-1depth">
      <div class="contents-1depth" data-name="bullet-contents">
        <div class="bullet-area-wrapper" aria-hidden="true">
          <div class="bullet-area-1depth" data-name="bullet-area">
            <div 
              class="bullet-icon-1depth" 
              data-name="bullet-icon-circle"
              role="presentation"
              aria-hidden="true"
            />
          </div>
        </div>
        <button 
          class="text-content" 
          data-name="bullet-text-content"
          type="button"
          :aria-label="`1차 항목: ${text || '내용 없음'}. 클릭하여 상호작용`"
          :aria-describedby="ariaDescribedById"
          @click="handleTextClick"
          @keydown.enter.prevent="handleTextClick"
          @keydown.space.prevent="handleTextClick"
        >
          <p class="text-paragraph" :id="ariaDescribedById">{{ text || '내용을 입력하세요.' }}</p>
        </button>
      </div>
    </div>

    <!-- Type=2depth -->
    <div v-else-if="type === '2depth'" class="type-2depth" data-name="bullet-type-2depth">
      <div class="contents-2depth" data-name="bullet-contents">
        <div class="bullet-area-wrapper" aria-hidden="true">
          <div class="bullet-area-2depth" data-name="bullet-area">
            <div 
              class="bullet-icon-2depth" 
              data-name="bullet-icon-hyphen"
              role="presentation"
              aria-hidden="true"
            >
              <div class="hyphen-icon" data-name="bullet-hyphen-shape">
                <img 
                  alt="" 
                  :src="hyphenIconSrc" 
                  role="presentation"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
        <button 
          class="text-content" 
          data-name="bullet-text-content"
          type="button"
          :aria-label="`2차 하위 항목: ${text || '내용 없음'}. 클릭하여 상호작용`"
          :aria-describedby="ariaDescribedById"
          @click="handleTextClick"
          @keydown.enter.prevent="handleTextClick"
          @keydown.space.prevent="handleTextClick"
        >
          <p class="text-paragraph" :id="ariaDescribedById">{{ text || '내용을 입력하세요.' }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Bullet 컴포넌트 Props 인터페이스
interface BulletProps {
  button?: boolean;
  text?: string;
  type?: "1depth" | "2depth";
  ariaLabel?: string;
}

const props = withDefaults(defineProps<BulletProps>(), {
  button: false,
  text: "내용을 입력하세요.",
  type: "1depth",
  ariaLabel: "",
});

// 이벤트 정의
const emit = defineEmits<{
  click: [event: MouseEvent | KeyboardEvent];
  textClick: [text: string, event: MouseEvent | KeyboardEvent];
}>();

// 하이픈 아이콘 SVG (Figma에서 제공된 이미지)
const hyphenIconSrc = "http://localhost:3845/assets/f3dff6de6162a7b1f83ed11bc9d82c92fc4cf2a9.svg";

// 접근성을 위한 고유 ID 생성
const ariaDescribedById = computed(() => 
  `bullet-text-${Math.random().toString(36).substr(2, 9)}`
);

// 이벤트 핸들러
const handleTextClick = (event: MouseEvent | KeyboardEvent) => {
  // 키보드 이벤트의 경우 기본 동작 방지
  if (event instanceof KeyboardEvent) {
    event.preventDefault();
  }
  
  emit('textClick', props.text || '', event);
  emit('click', event);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.bullet-component {
  --color-icon-gray600: #707070;
  --color-text-font-3: #505050;
  --font-family-pretendard: "Pretendard", sans-serif;
  --font-size-15: 15px;
  --line-height-24: 24px;
  --letter-spacing-negative-03: -0.3px;
  --gap-1: 4px;
  --gap-2: 8px;
  --padding-3: 12px;
  --bullet-size: 4px;
  --bullet-position-top: 10px;
  
  width: 100%;
  height: 100%;
  position: relative;
}

/* Type=1depth styles */
.type-1depth {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--gap-2);
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  width: 100%;
  height: 100%;
}

.contents-1depth {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: var(--gap-2);
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  width: 100%;
}

.bullet-area-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-self: flex-start;
  min-height: var(--line-height-24);
}

.bullet-area-1depth {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  padding-top: calc((var(--line-height-24) - var(--bullet-size)) / 2);
}

.bullet-icon-1depth {
  position: relative;
  background-color: var(--color-icon-gray600);
  left: 0;
  border-radius: 50%;
  width: var(--bullet-size);
  height: var(--bullet-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Type=2depth styles */
.type-2depth {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--gap-1);
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: var(--padding-3);
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
  position: relative;
  width: 100%;
  height: 100%;
}

.contents-2depth {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: var(--gap-1);
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  width: 100%;
}

.bullet-area-2depth {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  padding-top: calc((var(--line-height-24) - 1px) / 2);
}

.bullet-icon-2depth {
  position: relative;
  left: 0;
  width: var(--bullet-size);
  height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hyphen-icon {
  position: relative;
  height: 1px;
  left: 0;
  top: 0;
  width: var(--bullet-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hyphen-icon img {
  display: block;
  max-width: none;
  width: 100%;
  height: 100%;
}

/* Text content styles - button element */
.text-content {
  flex-basis: 0;
  font-family: var(--font-family-pretendard);
  font-weight: 400;
  font-style: normal;
  flex-grow: 1;
  line-height: var(--line-height-24);
  min-height: 1px;
  min-width: 0; /* 긴 텍스트 줄바꿈을 위해 0으로 변경 */
  position: relative;
  flex-shrink: 1; /* 필요시 축소 허용 */
  color: var(--color-text-font-3);
  font-size: var(--font-size-15);
  text-align: left;
  letter-spacing: var(--letter-spacing-negative-03);
  cursor: pointer;
  border-radius: 4px;
  padding: 4px;
  margin: -4px;
  transition: background-color 0.2s;
  /* 멀티라인 텍스트 지원 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* 긴 텍스트 처리 최적화 */
  overflow: hidden;
  max-width: 100%;
  /* 버튼 기본 스타일 리셋 */
  border: none;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
}

.text-content:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.text-content:focus {
  outline: 2px solid var(--color-text-font-3);
  outline-offset: 2px;
  background-color: rgba(0, 0, 0, 0.05);
}

.text-paragraph {
  display: block;
  line-height: var(--line-height-24);
  margin: 0;
  white-space: pre-wrap;
  /* 기본 줄바꿈 설정 */
  word-break: break-word;
  overflow-wrap: anywhere;
  word-wrap: break-word;
  text-rendering: optimizeLegibility;
  word-spacing: normal;
  letter-spacing: inherit;
  /* 하이픈 설정 */
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

/* Accessibility improvements */
.text-content {
  /* role과 tabindex는 이제 template에서 직접 설정됨 */
}

/* Keyboard navigation support */
.text-content:focus-visible {
  outline: 2px solid var(--color-text-font-3);
  outline-offset: 2px;
  background-color: rgba(0, 0, 0, 0.1);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bullet-icon-1depth,
  .bullet-icon-2depth {
    background-color: currentColor;
    border: 1px solid currentColor;
  }
  
  .text-content:focus {
    outline: 3px solid currentColor;
    outline-offset: 2px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .text-content {
    transition: none;
  }
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 한글과 영문 혼합 텍스트 최적화 */
.text-paragraph:lang(ko) {
  word-break: keep-all;
  overflow-wrap: anywhere;
  line-break: strict;
}

/* 매우 긴 단어나 URL에 대한 특수 처리 */
.text-paragraph {
  /* URL이나 매우 긴 단어를 위한 특수 처리 */
  -webkit-line-break: after-white-space;
  line-break: anywhere;
}

/* Responsive design */
@media (max-width: 768px) {
  .text-content {
    font-size: 14px;
    line-height: 22px;
  }
  
  /* 모바일에서 더 적극적인 줄바꿈 */
  .text-paragraph {
    word-break: break-all;
    overflow-wrap: anywhere;
  }
}
</style>