<template>
  <div 
    class="accordion"
    data-testid="accordion"
  >
    <!-- Divider (Top) -->
    <div 
      v-if="divider"
      class="accordion__divider"
      data-name="content-8px"
    />

    <!-- Accordion Header -->
    <div 
      class="accordion__header"
      data-name="Accordion"
      @click="toggleAccordion"
      @keydown.enter="toggleAccordion"
      @keydown.space.prevent="toggleAccordion"
      tabindex="0"
      role="button"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      :aria-label="ariaLabel"
    >
      <!-- Text Section -->
      <div class="accordion__text-section" data-name="Text">
        <!-- Icon -->
        <div 
          class="accordion__icon-container"
          data-name="icon/24/line/system/ico_notice_line_24"
        >
          <IconNotice 
            :aria-label="'공지 아이콘'"
            class="accordion__icon accordion__icon--svg"
          />
        </div>
        
        <!-- Title -->
        <div class="accordion__title">
          <p>{{ title }}</p>
        </div>
      </div>

      <!-- Arrow Icon -->
      <div 
        class="accordion__arrow-container"
        data-name="icon/24/line/system/arr_down2_line_24"
      >
        <IconArrowDown 
          :aria-label="isOpen ? '접기' : '펼치기'"
          :class="`accordion__arrow ${isOpen ? 'accordion__arrow--rotated' : ''}`"
        />
      </div>
    </div>

    <!-- Accordion Content -->
    <div 
      v-if="isOpen"
      :id="contentId"
      class="accordion__content"
      data-name="contents"
      role="region"
      :aria-labelledby="headerId"
    >
      <div class="accordion__content-inner" data-name="# base/base-accordion">
        <div 
          v-for="(item, index) in visibleItems" 
          :key="index"
          class="accordion__item"
          :class="`accordion__item--${item.type || 'link'}`"
          data-name="atom-accordion"
        >
          <!-- Basic Type: 단순 텍스트만 -->
          <template v-if="item.type === 'basic'">
            <div class="accordion__item-text accordion__item-text--basic" data-name="Text">
              <div class="accordion__item-title accordion__item-title--basic">
                <p>{{ item.title || defaultItemTitle }}</p>
              </div>
            </div>
          </template>

          <!-- Bullet Type: 불릿 포인트 + 텍스트 -->
          <template v-else-if="item.type === 'bullet'">
            <div class="accordion__item-text accordion__item-text--bullet" data-name="Text">
              <div class="accordion__item-bullet" data-name="BulletArea">
                <div class="accordion__item-bullet-point" data-name="icon/bullet/ico_bullet2_gray600_fill"></div>
              </div>
              <div class="accordion__item-title accordion__item-title--bullet">
                <p>{{ item.title || defaultItemTitle }}</p>
              </div>
            </div>
          </template>

          <!-- Link Type: 텍스트 + 아이콘들 (기존 형태) -->
          <template v-else>
            <!-- Item Text -->
            <div class="accordion__item-text" data-name="Text">
              <div class="accordion__item-title">
                <p>{{ item.title || defaultItemTitle }}</p>
              </div>
            </div>

            <!-- Item Icons -->
            <div class="accordion__item-icons" data-name="Icon">
              <div 
                class="accordion__item-icon-container"
                data-name="icon/24/line/system/ico_download_gray600_line_24"
                @click="$emit('download', index, item)"
                tabindex="0"
                role="button"
                aria-label="다운로드"
                @keydown.enter="$emit('download', index, item)"
                @keydown.space.prevent="$emit('download', index, item)"
              >
                <IconDownload 
                  :aria-label="'다운로드'"
                  class="accordion__item-icon accordion__item-icon--svg"
                />
              </div>
              <div 
                class="accordion__item-icon-container"
                data-name="icon/24/line/system/arr_right1_gray600_line_24"
                @click="$emit('navigate', index, item)"
                tabindex="0"
                role="button"
                aria-label="더보기"
                @keydown.enter="$emit('navigate', index, item)"
                @keydown.space.prevent="$emit('navigate', index, item)"
              >
                <IconChevronRight 
                  :aria-label="'더보기'"
                  class="accordion__item-icon accordion__item-icon--svg"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import IconNotice from './icons/IconNotice.vue';
import IconArrowDown from './icons/IconArrowDown.vue';
import IconDownload from './icons/IconDownload.vue';
import IconChevronRight from './icons/IconChevronRight.vue';

interface AccordionItem {
  title?: string;
  data?: string;
  type?: 'basic' | 'bullet' | 'link';
}

interface AccordionProps {
  title?: string;
  divider?: boolean;
  state?: 'open' | 'close';
  items?: AccordionItem[];
  type?: '1line' | '2line' | '3line' | '4line' | '5line';
  ariaLabel?: string;
  defaultItemTitle?: string;
}

const props = withDefaults(defineProps<AccordionProps>(), {
  title: '알아두세요',
  divider: true,
  state: 'close',
  items: () => [
    { title: '내용을 입력해 주세요', type: 'link' },
    { title: '내용을 입력해 주세요', type: 'basic' },
    { title: '내용을 입력해 주세요', type: 'bullet' },
    { title: '내용을 입력해 주세요', type: 'link' },
    { title: '내용을 입력해 주세요', type: 'basic' }
  ],
  type: '5line',
  ariaLabel: '알아두세요 아코디언',
  defaultItemTitle: '내용을 입력해 주세요'
});

const emit = defineEmits<{
  toggle: [isOpen: boolean];
  open: [];
  close: [];
  download: [index: number, item: AccordionItem];
  navigate: [index: number, item: AccordionItem];
}>();

// Reactive state
const internalIsOpen = ref(props.state === 'open');

const isOpen = computed({
  get: () => internalIsOpen.value,
  set: (value) => {
    internalIsOpen.value = value;
  }
});

// Generate unique IDs for accessibility
const contentId = `accordion-content-${Math.random().toString(36).substring(2, 11)}`;
const headerId = `accordion-header-${Math.random().toString(36).substring(2, 11)}`;

// Toggle accordion
const toggleAccordion = async () => {
  const newState = !isOpen.value;
  isOpen.value = newState;
  
  await nextTick();
  
  emit('toggle', newState);
  if (newState) {
    emit('open');
  } else {
    emit('close');
  }
};

// Filter items based on type
const visibleItems = computed(() => {
  const typeMap = {
    '1line': 1,
    '2line': 2,
    '3line': 3,
    '4line': 4,
    '5line': 5
  };
  
  const maxItems = typeMap[props.type] || 5;
  return props.items.slice(0, maxItems);
});

// 모든 아이콘은 이제 Vue 컴포넌트로 처리됩니다
</script>

<style scoped>
/* Design tokens from Figma */
.accordion {
  --color-border-line-4: #f6f6f6;
  --color-icon-gray900: #111111;
  --color-text-font-1: #121212;
  --color-bg-default: #ffffff;
  --color-icon-gray600: #707070;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  min-width: 360px;
}

/* Divider */
.accordion__divider {
  height: 8px;
  width: 100%;
  position: relative;
  flex-shrink: 0;
  border-top: 8px solid var(--color-border-line-4);
}

/* Header */
.accordion__header {
  background-color: var(--color-bg-default);
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  height: 56px;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 24px;
  position: relative;
  flex-shrink: 0;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.accordion__header:hover {
  background-color: #fafafa;
}

.accordion__header:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

/* Text Section */
.accordion__text-section {
  flex: 1;
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: flex-start;
  min-height: 1px;
  min-width: 1px;
  position: relative;
  flex-shrink: 0;
}

/* Icon Container */
.accordion__icon-container {
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.accordion__icon {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* SVG 아이콘 컴포넌트를 위한 특별 스타일 */
.accordion__icon--svg {
  flex-shrink: 0;
}

/* Title */
.accordion__title {
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-style: normal;
  line-height: 0;
  position: relative;
  flex-shrink: 0;
  color: var(--color-text-font-1);
  font-size: 16px;
  white-space: nowrap;
  letter-spacing: -0.32px;
}

.accordion__title p {
  line-height: 24px;
  margin: 0;
  white-space: pre;
}

/* Arrow Container */
.accordion__arrow-container {
  position: relative;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accordion__arrow {
  transition: transform 0.3s ease;
}

.accordion__arrow--rotated {
  transform: rotate(180deg);
}

/* Content */
.accordion__content {
  background-color: var(--color-bg-default);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: center;
  padding: 0 16px;
  position: relative;
  flex-shrink: 0;
  width: 100%;
  animation: accordion-expand 0.3s ease-out;
}

@keyframes accordion-expand {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

.accordion__content-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0;
}

/* Accordion Item */
.accordion__item {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 100%;
}

/* Item Text */
.accordion__item-text {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.accordion__item-title {
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 0;
  position: relative;
  flex-shrink: 0;
  color: var(--color-text-font-1);
  font-size: 14px;
  letter-spacing: -0.28px;
  width: 247px;
}

.accordion__item-title p {
  line-height: 22px;
  margin: 0;
}

/* Item Icons */
.accordion__item-icons {
  display: flex;
  gap: 4px;
  height: 24px;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 56.333px;
}

.accordion__item-icon-container {
  position: relative;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accordion__item-icon-container:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.04);
}

.accordion__item-icon-container:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

.accordion__item-icon-container:active {
  transform: translateY(1px);
}

.accordion__item-icon {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* SVG 아이템 아이콘을 위한 스타일 */
.accordion__item-icon--svg {
  flex-shrink: 0;
}

/* Basic Type 스타일 */
.accordion__item--basic {
  gap: 10px;
}

.accordion__item-text--basic {
  justify-content: center;
  width: 100%;
}

.accordion__item-title--basic {
  width: 312px;
}

/* Bullet Type 스타일 */
.accordion__item--bullet {
  gap: 10px;
}

.accordion__item-text--bullet {
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.accordion__item-bullet {
  display: flex;
  height: 22px;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0;
}

.accordion__item-bullet-point {
  position: absolute;
  left: 0;
  top: 9px;
  width: 4px;
  height: 4px;
  background-color: var(--color-icon-gray600);
  border-radius: 4px;
  flex-shrink: 0;
}

.accordion__item-title--bullet {
  flex: 1;
  min-height: 1px;
  min-width: 1px;
  color: #505050;
}

.accordion__item-title--bullet p {
  color: #505050;
}

/* Responsive */
@media (max-width: 768px) {
  .accordion__header {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
  }
  
  .accordion__content {
    padding: 0 16px;
  }
  
  .accordion__item-title {
    width: 200px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .accordion {
    --color-bg-default: #1a1a1a;
    --color-text-font-1: #ffffff;
    --color-border-line-4: #333333;
  }
  
  .accordion__header:hover {
    background-color: #2a2a2a;
  }
}
</style>