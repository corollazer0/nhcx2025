<template>
  <div 
    class="infobox"
    :class="infoboxClasses"
    data-testid="infobox"
    @click="handleClick"
  >
    <!-- Title (only shown when type is not 'onlyBody') -->
    <div 
      v-if="type !== 'onlyBody'" 
      class="infobox__title" 
      data-testid="infobox-title"
    >
      <h3 class="infobox__title-text">{{ titleText }}</h3>
    </div>

    <!-- Body text items (only shown when type is not 'onlyTitle') -->
    <div 
      v-if="type !== 'onlyTitle' && bodyItems.length > 0"
      class="infobox__body"
      data-testid="infobox-body"
    >
      <div
        v-for="(item, index) in bodyItems"
        :key="index"
        class="infobox__body-item"
        :data-testid="`infobox-body-item-${index}`"
      >
        <p class="infobox__body-text">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface InfoboxProps {
  titleText?: string;
  type?: 'Default' | 'onlyTitle' | 'onlyBody';
  bodyItems?: string[];
}

const props = withDefaults(defineProps<InfoboxProps>(), {
  titleText: '타이틀',
  type: 'Default',
  bodyItems: () => ['텍스트 내용', '텍스트 내용']
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const infoboxClasses = computed(() => [
  `infobox--${props.type.toLowerCase()}`
]);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style scoped>
/* Design tokens from Figma */
.infobox {
  --color-bg-container: #f6f6f6;
  --color-text-primary: #121212;
  --color-text-secondary: #505050;
  --border-radius-16: 16px;
  --font-pretendard-medium: 'Pretendard', sans-serif;
  --font-pretendard-regular: 'Pretendard', sans-serif;
  
  background-color: var(--color-bg-container);
  border-radius: var(--border-radius-16);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  width: 100%;
  min-width: 272px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.infobox:hover {
  background-color: #f0f0f0;
}

.infobox:focus {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

.infobox:active {
  background-color: #e8e8e8;
}

/* Title styles */
.infobox__title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.infobox__title-text {
  font-family: var(--font-pretendard-medium);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--color-text-primary);
  margin: 0;
  padding: 0;
  flex-grow: 1;
  text-align: left;
}

/* Body styles */
.infobox__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.infobox__body-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.infobox__body-text {
  font-family: var(--font-pretendard-regular);
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-secondary);
  margin: 0;
  padding: 0;
  flex-grow: 1;
  text-align: left;
}

/* Type variants */
.infobox--onlytitle {
  gap: 0;
}

.infobox--onlybody {
  gap: 8px;
}

.infobox--default {
  gap: 12px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .infobox {
    min-width: 240px;
    padding: 16px 12px;
  }
  
  .infobox__title-text {
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.3px;
  }
  
  .infobox__body-text {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.26px;
  }
}

/* Accessibility improvements */
.infobox[role="button"] {
  cursor: pointer;
}

.infobox:focus-visible {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

/* Empty state handling */
.infobox__body:empty {
  display: none;
}

.infobox__title:empty {
  display: none;
}

/* Animation for interactions */
.infobox {
  transform: translateZ(0);
}

.infobox:active {
  transform: translateY(1px);
}
</style>