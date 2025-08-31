<template>
  <div 
    class="progress"
    :class="progressClasses"
    data-testid="progress"
    role="progressbar"
    :aria-valuenow="progressValue"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuetext="`${Math.round(progressValue)}% complete`"
  >
    <div class="progress__bar" data-testid="progress-bar">
      <div 
        class="progress__active" 
        data-testid="progress-active"
        :style="activeStyles"
      ></div>
      <div 
        class="progress__line" 
        data-testid="progress-line"
        aria-hidden="true"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

interface ProgressProps {
  ratio?: number | string
  showAnimation?: boolean
  size?: 'sm' | 'md'
  color?: 'green' | 'blue' | 'gray'
}

const props = withDefaults(defineProps<ProgressProps>(), {
  ratio: 0.1,
  showAnimation: false,
  size: 'md',
  color: 'green'
})

const emit = defineEmits<{
  complete: []
  change: [value: number]
}>()

const progressValue = computed(() => {
  const numericRatio = typeof props.ratio === 'string' ? parseFloat(props.ratio) : props.ratio
  
  // Handle NaN, undefined, null cases
  if (isNaN(numericRatio) || numericRatio === null || numericRatio === undefined) {
    return 10 // Default 0.1 * 100 = 10%
  }
  
  const clampedRatio = Math.max(0, Math.min(1, numericRatio))
  return clampedRatio * 100
})

const progressClasses = computed(() => [
  `progress--${props.size}`,
  `progress--${props.color}`,
  {
    'progress--animated': props.showAnimation,
    'progress--complete': progressValue.value === 100
  }
])

const activeStyles = computed(() => ({
  width: `${progressValue.value}%`
}))

// Watch for ratio changes and emit events
watch(() => props.ratio, (newRatio, oldRatio) => {
  if (newRatio !== oldRatio) {
    emit('change', progressValue.value)
    if (progressValue.value === 100) {
      emit('complete')
    }
  }
})
</script>

<style scoped>
.progress {
  --color-bg-progress-active: #19973c;
  --color-border-line: #f0f0f0;
  --progress-height: 3px;
  --progress-padding-vertical: 11px;
  --progress-padding-horizontal: 24px;
  --progress-border-radius: 0;
  --progress-active-height: 2px;
  --progress-line-height: 1px;
  
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--progress-padding-vertical) var(--progress-padding-horizontal) 8px;
  width: 100%;
  min-width: 200px;
  position: relative;
}

.progress__bar {
  height: var(--progress-height);
  width: 100%;
  position: relative;
  flex-shrink: 0;
}

.progress__active {
  position: absolute;
  background-color: var(--color-bg-progress-active);
  height: var(--progress-active-height);
  left: 0;
  top: 0;
  border-radius: var(--progress-border-radius);
  transition: width 0.3s ease-in-out;
}

.progress__line {
  position: absolute;
  height: var(--progress-line-height);
  left: 0;
  right: 0;
  top: 2px;
  border: 1px solid var(--color-border-line);
  pointer-events: none;
}

/* Size variants */
.progress--sm {
  --progress-padding-vertical: 8px;
  --progress-padding-horizontal: 16px;
  --progress-height: 2px;
  --progress-active-height: 1px;
}

.progress--md {
  --progress-padding-vertical: 11px;
  --progress-padding-horizontal: 24px;
  --progress-height: 3px;
  --progress-active-height: 2px;
}

/* Color variants */
.progress--green .progress__active {
  background-color: #19973c;
}

.progress--blue .progress__active {
  background-color: #4285f4;
}

.progress--gray .progress__active {
  background-color: #6b7280;
}

/* Animation */
.progress--animated .progress__active {
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Complete state */
.progress--complete .progress__active {
  background-color: var(--color-bg-progress-active);
  box-shadow: 0 0 8px rgba(25, 151, 60, 0.3);
}

/* Accessibility improvements */
.progress:focus-within {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

/* Animation for loading states */
@keyframes progress-pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.progress--animated .progress__active {
  animation: progress-pulse 2s ease-in-out infinite;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .progress {
    --progress-padding-horizontal: 16px;
  }
  
  .progress--md {
    --progress-padding-vertical: 8px;
    --progress-height: 2px;
    --progress-active-height: 1px;
  }
}
</style>