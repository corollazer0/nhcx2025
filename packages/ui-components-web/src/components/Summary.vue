<template>
  <div 
    class="summary"
    :class="summaryClasses"
    data-testid="summary"
  >
    <!-- Header Section -->
    <div v-if="showHeader" class="summary__header">
      <!-- Label -->
      <div v-if="label" class="summary__label">
        {{ label }}
      </div>
      
      <!-- Title & Subtitle -->
      <div v-if="title || subtitle" class="summary__title-section">
        <h3 v-if="title" class="summary__title">{{ title }}</h3>
        <div v-if="subtitle" class="summary__subtitle">{{ subtitle }}</div>
      </div>
    </div>

    <!-- List Section -->
    <div v-if="showList" class="summary__list">
      <div 
        v-for="(item, index) in displayItems"
        :key="index"
        class="summary__list-item"
      >
        <div class="summary__list-title">{{ item.title }}</div>
        <div class="summary__list-data">{{ item.data }}</div>
      </div>
    </div>

    <!-- Accordion Toggle Button -->
    <button
      v-if="variant === 'accordion' && showToggleButton"
      class="summary__toggle-button"
      type="button"
      @click="handleToggle"
    >
      <span class="summary__toggle-text">{{ toggleText }}</span>
      <svg 
        class="summary__toggle-icon"
        :class="{ 'summary__toggle-icon--expanded': isExpanded }"
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none"
      >
        <path 
          d="M4 6l4 4 4-4" 
          stroke="currentColor" 
          stroke-width="1.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface SummaryItem {
  title: string;
  data: string;
}

interface SummaryProps {
  // Header props
  showHeader?: boolean;
  label?: string;
  title?: string;
  subtitle?: string;
  
  // List props
  showList?: boolean;
  items?: SummaryItem[];
  
  // Accordion props
  variant?: 'basic' | 'accordion';
  collapsedItemCount?: number;
  showToggleButton?: boolean;
  expandText?: string;
  collapseText?: string;
  
  // State
  expanded?: boolean;
}

const props = withDefaults(defineProps<SummaryProps>(), {
  showHeader: true,
  label: '',
  title: '타이틀',
  subtitle: '부가설명',
  showList: true,
  items: () => [
    { title: '타이틀', data: '데이터' },
    { title: '타이틀', data: '데이터' },
    { title: '타이틀', data: '데이터' }
  ],
  variant: 'basic',
  collapsedItemCount: 3,
  showToggleButton: true,
  expandText: '펼치기',
  collapseText: '접기',
  expanded: false
});

const emit = defineEmits<{
  toggle: [expanded: boolean];
  'item-click': [item: SummaryItem, index: number];
}>();

// Internal state
const isExpanded = ref(props.expanded);

// Computed properties
const summaryClasses = computed(() => [
  `summary--${props.variant}`,
  {
    'summary--expanded': isExpanded.value && props.variant === 'accordion'
  }
]);

const displayItems = computed(() => {
  if (props.variant === 'basic') {
    return props.items;
  }
  
  if (props.variant === 'accordion') {
    if (isExpanded.value) {
      return props.items;
    } else {
      return props.items.slice(0, props.collapsedItemCount);
    }
  }
  
  return props.items;
});

const toggleText = computed(() => {
  return isExpanded.value ? props.collapseText : props.expandText;
});

// Event handlers
const handleToggle = () => {
  isExpanded.value = !isExpanded.value;
  emit('toggle', isExpanded.value);
};

const handleItemClick = (item: SummaryItem, index: number) => {
  emit('item-click', item, index);
};
</script>

<style scoped>
/* Design tokens from Figma */
.summary {
  --color-bg-container: #f6f6f6;
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-text-font-4: #767676;
  --color-text-label-gray: #767676;
  --color-border-label-gray: #707070;
  --border-radius-4: 4px;
  --border-radius-16: 16px;
  --font-family-pretendard: 'Pretendard', sans-serif;

  background-color: var(--color-bg-container);
  border-radius: var(--border-radius-16);
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: var(--font-family-pretendard);
}

/* Header Section */
.summary__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.summary__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px 2px;
  border: 1px solid var(--color-border-label-gray);
  border-radius: var(--border-radius-4);
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: -0.2px;
  color: var(--color-text-label-gray);
  text-align: center;
  width: fit-content;
}

.summary__title-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.summary__title {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--color-text-font-1);
  margin: 0;
}

.summary__subtitle {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-font-4);
}

/* List Section */
.summary__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.summary__list-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
}

.summary__list-title {
  width: 108px;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: var(--color-text-font-3);
  flex-shrink: 0;
}

.summary__list-data {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: var(--color-text-font-1);
  text-align: right;
}

/* Toggle Button */
.summary__toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
}

.summary__toggle-text {
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-font-3);
}

.summary__toggle-icon {
  width: 16px;
  height: 16px;
  color: var(--color-text-font-3);
  transition: transform 0.2s ease;
}

.summary__toggle-icon--expanded {
  transform: rotate(180deg);
}

.summary__toggle-button:hover .summary__toggle-text {
  opacity: 0.8;
}

.summary__toggle-button:hover .summary__toggle-icon {
  opacity: 0.8;
}

/* Variants */
.summary--basic {
  /* Basic variant specific styles if needed */
}

.summary--accordion {
  /* Accordion variant specific styles if needed */
}

.summary--expanded {
  /* Expanded state specific styles if needed */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .summary {
    padding: 16px;
  }
  
  .summary__list-title {
    width: 90px;
    font-size: 14px;
  }
  
  .summary__list-data {
    font-size: 14px;
  }
}
</style>