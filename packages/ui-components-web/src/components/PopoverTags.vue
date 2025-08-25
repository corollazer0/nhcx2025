<template>
  <div 
    class="popover-tags" 
    :class="[`popover-tags--arrow-${arrowPosition}`]"
    data-testid="popover-tags"
  >
    <!-- Popover arrow -->
    <div class="popover-tags__arrow" />
    
    <!-- Single tag content -->
    <div class="popover-tag" data-testid="popover-tag" @click="handleTagClick">
      <span class="popover-tag__text">{{ tag }}</span>
      <button
        class="popover-tag__close"
        type="button"
        :aria-label="`${tag} 태그 제거`"
        data-testid="popover-tag-close"
        @click.stop="handleRemoveTag"
      >
        <svg class="popover-tag__close-icon" viewBox="0 0 24 24" fill="none">
          <path 
            d="M18 6L6 18M6 6L18 18" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// Props interface
interface PopoverTagsProps {
  // Single tag text
  tag?: string;
  // Arrow position for popover
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const props = withDefaults(defineProps<PopoverTagsProps>(), {
  tag: '텍스트를 입력해 주세요',
  arrowPosition: 'top'
});

// Event definitions
const emit = defineEmits<{
  'remove-tag': [tag: string];
  'tag-click': [tag: string, event: MouseEvent];
}>();

// Event handlers
const handleRemoveTag = () => {
  emit('remove-tag', props.tag);
};

const handleTagClick = (event: MouseEvent) => {
  emit('tag-click', props.tag, event);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.popover-tags {
  --color-text-popover-default: #ffffff;
  --color-icon-gray50: #ffffff;
  --border-radius-8: 8px;
  --color-bg-popover-default: #111111;
  --color-border-popover-default: #111111;
  --body-caption-caption1-regular-family: "Pretendard", sans-serif;
  --body-caption-caption1-regular-size: 13px;
  --body-caption-caption1-regular-weight: 400;
  --body-caption-caption1-regular-line-height: 20px;
  --arrow-size: 8px;

  position: relative;
  display: inline-block;
  background-color: var(--color-bg-popover-default);
  border: 1px solid var(--color-border-popover-default);
  border-radius: var(--border-radius-8);
  box-sizing: border-box;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

/* Arrow base styles */
.popover-tags__arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

/* Arrow position variations */
/* Top arrow (pointing up from bottom) */
.popover-tags--arrow-top .popover-tags__arrow {
  top: calc(var(--arrow-size) * -1);
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 var(--arrow-size) var(--arrow-size) var(--arrow-size);
  border-color: transparent transparent var(--color-bg-popover-default) transparent;
}

.popover-tags--arrow-top .popover-tags__arrow::after {
  content: '';
  position: absolute;
  top: 1px;
  left: calc(var(--arrow-size) * -1);
  border-width: 0 var(--arrow-size) var(--arrow-size) var(--arrow-size);
  border-style: solid;
  border-color: transparent transparent var(--color-border-popover-default) transparent;
}

/* Top-left arrow */
.popover-tags--arrow-top-left .popover-tags__arrow {
  top: calc(var(--arrow-size) * -1);
  left: 16px;
  border-width: 0 var(--arrow-size) var(--arrow-size) var(--arrow-size);
  border-color: transparent transparent var(--color-bg-popover-default) transparent;
}

/* Top-right arrow */
.popover-tags--arrow-top-right .popover-tags__arrow {
  top: calc(var(--arrow-size) * -1);
  right: 16px;
  border-width: 0 var(--arrow-size) var(--arrow-size) var(--arrow-size);
  border-color: transparent transparent var(--color-bg-popover-default) transparent;
}

/* Bottom arrow (pointing down from top) */
.popover-tags--arrow-bottom .popover-tags__arrow {
  bottom: calc(var(--arrow-size) * -1);
  left: 50%;
  transform: translateX(-50%);
  border-width: var(--arrow-size) var(--arrow-size) 0 var(--arrow-size);
  border-color: var(--color-bg-popover-default) transparent transparent transparent;
}

/* Bottom-left arrow */
.popover-tags--arrow-bottom-left .popover-tags__arrow {
  bottom: calc(var(--arrow-size) * -1);
  left: 16px;
  border-width: var(--arrow-size) var(--arrow-size) 0 var(--arrow-size);
  border-color: var(--color-bg-popover-default) transparent transparent transparent;
}

/* Bottom-right arrow */
.popover-tags--arrow-bottom-right .popover-tags__arrow {
  bottom: calc(var(--arrow-size) * -1);
  right: 16px;
  border-width: var(--arrow-size) var(--arrow-size) 0 var(--arrow-size);
  border-color: var(--color-bg-popover-default) transparent transparent transparent;
}

/* Left arrow (pointing left from right) */
.popover-tags--arrow-left .popover-tags__arrow {
  left: calc(var(--arrow-size) * -1);
  top: 50%;
  transform: translateY(-50%);
  border-width: var(--arrow-size) var(--arrow-size) var(--arrow-size) 0;
  border-color: transparent var(--color-bg-popover-default) transparent transparent;
}

/* Right arrow (pointing right from left) */
.popover-tags--arrow-right .popover-tags__arrow {
  right: calc(var(--arrow-size) * -1);
  top: 50%;
  transform: translateY(-50%);
  border-width: var(--arrow-size) 0 var(--arrow-size) var(--arrow-size);
  border-color: transparent transparent transparent var(--color-bg-popover-default);
}

.popover-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  border: none;
  background: transparent;
}

.popover-tag:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.popover-tag:focus-within {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

.popover-tag__text {
  font-family: var(--body-caption-caption1-regular-family);
  font-size: var(--body-caption-caption1-regular-size);
  font-weight: var(--body-caption-caption1-regular-weight);
  line-height: var(--body-caption-caption1-regular-line-height);
  color: var(--color-text-popover-default);
  white-space: nowrap;
  user-select: none;
}

.popover-tag__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.popover-tag__close:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.popover-tag__close:focus {
  outline: 1px solid var(--color-text-popover-default);
  outline-offset: 1px;
}

.popover-tag__close:active {
  transform: scale(0.95);
}

.popover-tag__close-icon {
  width: 100%;
  height: 100%;
  color: var(--color-icon-gray50);
}

/* Responsive behavior */
@media (max-width: 480px) {
  .popover-tags__content {
    padding: 20px;
    gap: 12px;
  }
  
  .popover-tag {
    padding: 6px 10px;
    gap: 6px;
  }
  
  .popover-tag__close {
    width: 14px;
    height: 14px;
  }
}
</style>