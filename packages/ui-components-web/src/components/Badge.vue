<template>
  <div 
    class="badge"
    :class="badgeClasses"
    data-testid="badge"
  >
    <!-- Dot variant -->
    <div 
      v-if="variant === 'dot'"
      class="badge__dot"
      data-testid="badge-dot"
    ></div>
    
    <!-- Count variant -->
    <div
      v-else-if="variant === 'count' && shouldShowCount"
      class="badge__count"
      data-testid="badge-count"
    >
      <span class="badge__count-text">{{ displayCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface BadgeProps {
  variant?: 'dot' | 'count';
  count?: number;
  maxCount?: number;
  color?: 'red' | 'blue' | 'green' | 'gray';
  size?: 'sm' | 'md';
  showZero?: boolean;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'dot',
  count: 0,
  maxCount: 99,
  color: 'red',
  size: 'md',
  showZero: false
});

const isVisible = computed(() =>
  props.variant === 'dot' || (props.variant === 'count' && (props.count > 0 || props.showZero))
);

const badgeClasses = computed(() => [
  `badge--${props.variant}`,
  `badge--${props.color}`,
  `badge--${props.size}`,
  { 'badge--show': isVisible.value }
]);

const displayCount = computed(() => {
  if (props.variant !== 'count') return '';
  
  // Handle NaN, negative numbers, and non-numbers
  const numericCount = Number(props.count);
  if (isNaN(numericCount) || numericCount < 0) return '';
  
  const intCount = Math.floor(numericCount); // Convert to integer
  
  if (intCount === 0 && !props.showZero) return '';
  if (intCount > props.maxCount) return `${props.maxCount}+`;
  return intCount.toString();
});

const shouldShowCount = computed(() => {
  return props.count > 0 || props.showZero;
});
</script>

<style scoped>
/* Design tokens from Figma */
.badge {
  --color-bg-badge-red: #e24949;
  --color-bg-badge-blue: #4285f4;
  --color-bg-badge-green: #19973c;
  --color-bg-badge-gray: #6b7280;
  --color-text-badge-white: #ffffff;
  --border-radius-circle: 999px;
  --font-pretendard-medium: 'Pretendard', sans-serif;
  
  display: inline-block;
  position: relative;
  line-height: 1;
}

/* Hide badge when not needed */
.badge:not(.badge--show) .badge__dot,
.badge:not(.badge--show) .badge__count {
  display: none;
}

/* Dot variant styles */
.badge__dot {
  background-color: var(--color-bg-badge-red);
  border-radius: var(--border-radius-circle);
  display: inline-block;
  width: 8px;
  height: 8px;
}

/* Size variants for dot */
.badge--sm .badge__dot {
  width: 6px;
  height: 6px;
}

.badge--md .badge__dot {
  width: 8px;
  height: 8px;
}

/* Count variant styles */
.badge__count {
  background-color: var(--color-bg-badge-red);
  border-radius: var(--border-radius-circle);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 2.5px 5.5px;
  box-sizing: border-box;
}

.badge__count-text {
  font-family: var(--font-pretendard-medium);
  font-weight: 500;
  font-size: 11px;
  line-height: normal;
  letter-spacing: -0.22px;
  color: var(--color-text-badge-white);
  text-align: center;
  white-space: nowrap;
}

/* Size variants for count */
.badge--sm .badge__count {
  min-width: 16px;
  height: 16px;
  padding: 2px 4.5px;
}

.badge--sm .badge__count-text {
  font-size: 10px;
  letter-spacing: -0.2px;
}

/* Color variants */
.badge--red .badge__dot,
.badge--red .badge__count {
  background-color: var(--color-bg-badge-red);
}

.badge--blue .badge__dot,
.badge--blue .badge__count {
  background-color: var(--color-bg-badge-blue);
}

.badge--green .badge__dot,
.badge--green .badge__count {
  background-color: var(--color-bg-badge-green);
}

.badge--gray .badge__dot,
.badge--gray .badge__count {
  background-color: var(--color-bg-badge-gray);
}

/* Position variants for when used with other elements */
.badge--absolute {
  position: absolute;
  top: -4px;
  right: -4px;
  z-index: 10;
}

.badge--top-left {
  top: -4px;
  left: -4px;
}

.badge--top-right {
  top: -4px;
  right: -4px;
}

.badge--bottom-left {
  bottom: -4px;
  left: -4px;
}

.badge--bottom-right {
  bottom: -4px;
  right: -4px;
}

/* When badge is empty, hide it */
.badge__count:empty {
  display: none;
}

/* Accessibility improvements */
.badge__count[aria-hidden="true"] {
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

/* Focus styles for interactive badges */
.badge:focus-within {
  outline: 2px solid #121212;
  outline-offset: 2px;
  border-radius: var(--border-radius-circle);
}

/* Animation for count changes */
.badge__count {
  transition: all 0.2s ease;
}

.badge__count-text {
  transition: transform 0.2s ease;
}

/* Pulse animation for dot variant */
@keyframes badge-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.badge--pulse .badge__dot {
  animation: badge-pulse 2s infinite;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .badge--md .badge__dot {
    width: 6px;
    height: 6px;
  }
  
  .badge__count {
    min-width: 16px;
    height: 16px;
    padding: 2px 4px;
  }
  
  .badge__count-text {
    font-size: 10px;
    letter-spacing: -0.2px;
  }
}</style>