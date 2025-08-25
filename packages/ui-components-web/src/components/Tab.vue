<template>
  <div class="tab" :class="`tab--${variant}`" data-testid="tab">
    <div class="tab__container" :class="`tab__container--${variant}`">
      <div 
        v-for="(tab, index) in tabs"
        :key="tab.id || index"
        class="tab__tab"
        :class="tabClasses(index)"
        role="tab"
        :aria-selected="index === activeTab"
        :aria-controls="`tabpanel-${tab.id || index}`"
        :tabindex="index === activeTab ? 0 : -1"
        data-testid="tab-tab"
        @click="handleTabClick(index, tab)"
        @keydown.enter.prevent="handleTabClick(index, tab)"
        @keydown.space.prevent="handleTabClick(index, tab)"
        @keydown.arrow-left.prevent="handleKeyboardNavigation('previous')"
        @keydown.arrow-right.prevent="handleKeyboardNavigation('next')"
      >
        <span class="tab__tab-text">{{ tab.label }}</span>
        <div 
          v-if="index === activeTab && variant === 'line'"
          class="tab__tab-indicator"
        />
      </div>
      
      <!-- Background gradient line (only for line variant) -->
      <div v-if="variant === 'line'" class="tab__background-line" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// Tab item interface
interface TabItem {
  id?: string | number;
  label: string;
  disabled?: boolean;
}

// Props interface
interface TabProps {
  // Tab items
  tabs?: TabItem[];
  
  // Active tab index
  activeTab?: number;
  
  // Disabled state
  disabled?: boolean;
  
  // Visual variant
  variant?: 'line' | 'chip' | 'bar' | 'underline';
}

const props = withDefaults(defineProps<TabProps>(), {
  tabs: () => [
    { id: 1, label: '메뉴' },
    { id: 2, label: '메뉴' }
  ],
  activeTab: 0,
  disabled: false,
  variant: 'line',
});

// Event definitions
const emit = defineEmits<{
  'update:activeTab': [index: number];
  'tab-change': [index: number, tab: TabItem];
  'tab-click': [index: number, tab: TabItem, event: MouseEvent];
}>();

// Computed classes for individual tabs
const tabClasses = (index: number) => {
  const tab = props.tabs[index];
  return [
    `tab__tab--${props.variant}`,
    {
      'tab__tab--active': index === props.activeTab,
      'tab__tab--disabled': tab?.disabled || props.disabled,
    }
  ];
};

// Event handlers
const handleTabClick = (index: number, tab: TabItem) => {
  if (tab.disabled || props.disabled || index === props.activeTab) return;
  
  emit('update:activeTab', index);
  emit('tab-change', index, tab);
};

const handleKeyboardNavigation = (direction: 'previous' | 'next') => {
  if (props.disabled) return;
  
  const enabledTabs = props.tabs
    .map((tab, index) => ({ ...tab, index }))
    .filter(tab => !tab.disabled);
  
  if (enabledTabs.length === 0) return;
  
  const currentIndex = enabledTabs.findIndex(tab => tab.index === props.activeTab);
  let nextIndex: number;
  
  if (direction === 'next') {
    nextIndex = currentIndex === enabledTabs.length - 1 ? 0 : currentIndex + 1;
  } else {
    nextIndex = currentIndex === 0 ? enabledTabs.length - 1 : currentIndex - 1;
  }
  
  const nextTab = enabledTabs[nextIndex];
  emit('update:activeTab', nextTab.index);
  emit('tab-change', nextTab.index, nextTab);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.tab {
  /* Line variant tokens */
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-border-tab-line-active: #111111;
  --color-border-line-2: #e1e1e1;
  --color-bg-default: #ffffff;
  --color-bg-tab-line-bg: #ffffff;
  --color-bg-gradient-0: #ffffff00;
  --color-bg-gradient-100: #ffffff;
  
  /* Chip variant tokens from Figma */
  --color-text-tab-chip-default: #ffffff;
  --color-text-tab-chip-inactive: #505050;
  --color-bg-tab-chip-active: #111111;
  --color-bg-tab-chip-default: #f6f6f6;
  --color-bg-tab-chip-bg: #ffffff;
  --color-border-line-4: #f6f6f6;
  --border-radius-circle: 999px;
  
  /* Bar variant tokens from Figma */
  --color-text-tab-bar-active: #121212;
  --color-text-tab-bar-inactive: #505050;
  --color-bg-tab-bar-active: #ffffff;
  --color-bg-tab-bar-default: #f3f5f8;
  --border-radius-10: 10px;
  --border-radius-12: 12px;
  
  /* Underline variant tokens from Figma */
  --color-text-tab-underline-active: #121212;
  --color-text-tab-underline-inactive: #767676;
  --color-border-underline: #e1e1e1;
  --color-border-tab-underline-active: #121212;
  --heading-h5-semibold-family: "Pretendard", sans-serif;
  --heading-h5-semibold-size: 16px;
  --heading-h5-semibold-weight: 600;
  --heading-h5-semibold-line-height: 24px;
  --body-body1-regular-family: "Pretendard", sans-serif;
  --body-body1-regular-size: 16px;
  --body-body1-regular-weight: 400;
  --body-body1-regular-line-height: 24px;
  --body-body3-regular-family: "Pretendard", sans-serif;
  --body-body3-regular-size: 14px;
  --body-body3-regular-weight: 400;
  --body-body3-regular-line-height: 22px;
  --body-body3-medium-family: "Pretendard", sans-serif;
  --body-body3-medium-size: 14px;
  --body-body3-medium-weight: 500;
  --body-body3-medium-line-height: 22px;
  --body-body2-regular-family: "Pretendard", sans-serif;
  --body-body2-regular-size: 15px;
  --body-body2-regular-weight: 400;
  --body-body2-regular-line-height: 24px;
  --body-body2-medium-family: "Pretendard", sans-serif;
  --body-body2-medium-size: 15px;
  --body-body2-medium-weight: 500;
  --body-body2-medium-line-height: 24px;
  
  width: 100%;
  background-color: var(--color-bg-default);
}

.tab__container {
  position: relative;
  display: flex;
  background-color: var(--color-bg-tab-line-bg);
}

.tab__tab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  cursor: pointer;
  border: none;
  background: transparent;
  transition: all 0.2s ease;
  outline: none;
  user-select: none;
  min-width: 80px;
  box-sizing: border-box;
}

.tab__tab:focus {
  outline: 2px solid var(--color-border-tab-line-active);
  outline-offset: -2px;
}

.tab__tab:hover:not(.tab__tab--disabled) {
  background-color: rgba(0, 0, 0, 0.04);
}

.tab__tab--active:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.tab__tab--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.tab__tab-text {
  font-family: var(--body-body1-regular-family);
  font-size: var(--body-body1-regular-size);
  font-weight: var(--body-body1-regular-weight);
  line-height: var(--body-body1-regular-line-height);
  color: var(--color-text-font-3);
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.tab__tab--active .tab__tab-text {
  color: var(--color-text-font-1);
  font-family: var(--heading-h5-semibold-family);
  font-weight: var(--heading-h5-semibold-weight);
}

.tab__tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-border-tab-line-active);
  border-radius: 1px;
}

.tab__background-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    to right,
    var(--color-bg-gradient-0) 0%,
    var(--color-border-line-2) 50%,
    var(--color-bg-gradient-0) 100%
  );
}

/* Responsive behavior */
@media (max-width: 480px) {
  .tab__tab {
    padding: 10px 16px;
    min-width: 60px;
  }
  
  .tab__tab-text {
    font-size: 14px;
    line-height: 20px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .tab__tab:focus {
    outline: 3px solid;
  }
  
  .tab__tab-indicator {
    height: 3px;
  }
}

/* Chip Variant Styles */
.tab--chip .tab__container {
  background-color: var(--color-bg-tab-chip-bg);
  gap: 8px;
  padding: 8px;
  border-radius: var(--border-radius-circle);
  background-color: var(--color-bg-tab-chip-default);
}

.tab__tab--chip {
  padding: 8px 16px;
  border-radius: var(--border-radius-circle);
  background-color: transparent;
  border: none;
  min-width: auto;
  transition: all 0.2s ease;
}

.tab__tab--chip .tab__tab-text {
  font-family: var(--body-body3-regular-family);
  font-size: var(--body-body3-regular-size);
  font-weight: var(--body-body3-regular-weight);
  line-height: var(--body-body3-regular-line-height);
  color: var(--color-text-tab-chip-inactive);
  transition: all 0.2s ease;
}

.tab__tab--chip.tab__tab--active {
  background-color: var(--color-bg-tab-chip-active);
}

.tab__tab--chip.tab__tab--active .tab__tab-text {
  color: var(--color-text-tab-chip-default);
  font-family: var(--body-body3-medium-family);
  font-weight: var(--body-body3-medium-weight);
}

.tab__tab--chip:hover:not(.tab__tab--disabled):not(.tab__tab--active) {
  background-color: rgba(0, 0, 0, 0.04);
}

.tab__tab--chip.tab__tab--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive behavior for chip variant */
@media (max-width: 480px) {
  .tab--chip .tab__container {
    gap: 6px;
    padding: 6px;
  }
  
  .tab__tab--chip {
    padding: 6px 12px;
  }
  
  .tab__tab--chip .tab__tab-text {
    font-size: 12px;
    line-height: 18px;
  }
}

/* Bar Variant Styles */
.tab--bar .tab__container {
  background-color: var(--color-bg-tab-bar-default);
  border-radius: var(--border-radius-12);
  padding: 4px;
  gap: 4px;
}

.tab__tab--bar {
  padding: 8px 16px;
  border-radius: var(--border-radius-10);
  background-color: transparent;
  border: none;
  min-width: auto;
  transition: all 0.2s ease;
}

.tab__tab--bar .tab__tab-text {
  font-family: var(--body-body3-regular-family);
  font-size: var(--body-body3-regular-size);
  font-weight: var(--body-body3-regular-weight);
  line-height: var(--body-body3-regular-line-height);
  color: var(--color-text-tab-bar-inactive);
  transition: all 0.2s ease;
}

.tab__tab--bar.tab__tab--active {
  background-color: var(--color-bg-tab-bar-active);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.tab__tab--bar.tab__tab--active .tab__tab-text {
  color: var(--color-text-tab-bar-active);
  font-family: var(--body-body3-medium-family);
  font-weight: var(--body-body3-medium-weight);
}

.tab__tab--bar:hover:not(.tab__tab--disabled):not(.tab__tab--active) {
  background-color: rgba(255, 255, 255, 0.7);
}

.tab__tab--bar.tab__tab--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive behavior for bar variant */
@media (max-width: 480px) {
  .tab--bar .tab__container {
    padding: 3px;
    gap: 3px;
  }
  
  .tab__tab--bar {
    padding: 6px 12px;
  }
  
  .tab__tab--bar .tab__tab-text {
    font-size: 12px;
    line-height: 18px;
  }
}

/* Underline Variant Styles */
.tab--underline .tab__container {
  background-color: transparent;
  border-bottom: 1px solid var(--color-border-underline);
  gap: 0;
  padding: 0;
}

.tab__tab--underline {
  padding: 16px 20px;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  min-width: auto;
  transition: all 0.2s ease;
  position: relative;
}

.tab__tab--underline .tab__tab-text {
  font-family: var(--body-body2-regular-family);
  font-size: var(--body-body2-regular-size);
  font-weight: var(--body-body2-regular-weight);
  line-height: var(--body-body2-regular-line-height);
  color: var(--color-text-tab-underline-inactive);
  transition: all 0.2s ease;
}

.tab__tab--underline.tab__tab--active {
  border-bottom-color: var(--color-border-tab-underline-active);
}

.tab__tab--underline.tab__tab--active .tab__tab-text {
  color: var(--color-text-tab-underline-active);
  font-family: var(--body-body2-medium-family);
  font-weight: var(--body-body2-medium-weight);
}

.tab__tab--underline:hover:not(.tab__tab--disabled):not(.tab__tab--active) {
  background-color: rgba(0, 0, 0, 0.02);
}

.tab__tab--underline:hover:not(.tab__tab--disabled):not(.tab__tab--active) .tab__tab-text {
  color: var(--color-text-tab-underline-active);
}

.tab__tab--underline.tab__tab--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive behavior for underline variant */
@media (max-width: 480px) {
  .tab__tab--underline {
    padding: 12px 16px;
  }
  
  .tab__tab--underline .tab__tab-text {
    font-size: 14px;
    line-height: 20px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .tab__tab,
  .tab__tab-text {
    transition: none;
  }
}
</style>