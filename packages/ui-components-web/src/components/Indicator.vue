<template>
  <div class="indicator" data-testid="indicator">
    <!-- Number variant -->
    <template v-if="variant === 'number'">
      <div class="indicator__paging">
        <!-- Left arrow -->
        <button
          class="indicator__nav-button"
          :class="{ 'indicator__nav-button--disabled': disabled || current <= 1 }"
          @click="handlePrevClick"
          :disabled="disabled || current <= 1"
          data-testid="indicator-prev"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="indicator__nav-icon">
            <path d="M10 4L6 8L10 12" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        
        <!-- Number display -->
        <div class="indicator__number-display">
          <span class="indicator__current">{{ current }}</span>
          <div class="indicator__dash"></div>
          <span class="indicator__total">{{ total }}</span>
        </div>
        
        <!-- Right arrow -->
        <button
          class="indicator__nav-button"
          :class="{ 'indicator__nav-button--disabled': disabled || current >= total }"
          @click="handleNextClick"
          :disabled="disabled || current >= total"
          data-testid="indicator-next"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="indicator__nav-icon">
            <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      
      <!-- Stop button -->
      <button
        class="indicator__stop-button"
        @click="handleStopClick"
        :disabled="disabled"
        data-testid="indicator-stop"
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" class="indicator__stop-icon">
          <rect x="1.5" y="1.5" width="2" height="5" fill="currentColor" />
          <rect x="4.5" y="1.5" width="2" height="5" fill="currentColor" />
        </svg>
      </button>
    </template>

    <!-- Dot variant -->
    <template v-else-if="variant === 'dot'">
      <div class="indicator__dots">
        <button
          v-for="(dot, index) in total"
          :key="index"
          class="indicator__dot"
          :class="{ 'indicator__dot--active': index + 1 === current }"
          @click="handleDotClick(index + 1)"
          :disabled="disabled"
          :data-testid="`indicator-dot-${index + 1}`"
        />
      </div>
      
      <!-- Stop button for dot variant -->
      <button
        class="indicator__stop-button indicator__stop-button--dot-variant"
        @click="handleStopClick"
        :disabled="disabled"
        data-testid="indicator-stop"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="indicator__stop-icon">
          <rect x="2.5" y="2.5" width="2" height="7" fill="currentColor" />
          <rect x="7.5" y="2.5" width="2" height="7" fill="currentColor" />
        </svg>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IndicatorProps {
  variant?: 'number' | 'dot';
  current?: number;
  total?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<IndicatorProps>(), {
  variant: 'number',
  current: 1,
  total: 3,
  disabled: false,
});

const emit = defineEmits<{
  'navigate-prev': [];
  'navigate-next': [];
  'navigate-to': [page: number];
  stop: [];
}>();

const handlePrevClick = (event: MouseEvent) => {
  event.stopPropagation();
  if (!props.disabled && props.current > 1) {
    emit('navigate-prev');
  }
};

const handleNextClick = (event: MouseEvent) => {
  event.stopPropagation();
  if (!props.disabled && props.current < props.total) {
    emit('navigate-next');
  }
};

const handleDotClick = (page: number) => {
  if (!props.disabled) {
    emit('navigate-to', page);
  }
};

const handleStopClick = (event: MouseEvent) => {
  event.stopPropagation();
  if (!props.disabled) {
    emit('stop');
  }
};
</script>

<style scoped>
.indicator {
  --color-bg-indicator-number-default: rgba(17, 17, 17, 0.4);
  --color-text-indicator-default: #ffffff;
  --color-bg-indicator-dot-active: #19973c;
  --color-bg-indicator-dot-default: #d3d3d3;
  --color-icon-gray600: #707070;
  --border-radius-circle: 999px;
  --font-pretendard-regular: 'Pretendard', sans-serif;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  user-select: none;
}

.indicator__paging {
  background-color: var(--color-bg-indicator-number-default);
  border-radius: var(--border-radius-circle);
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 1px 4px;
  height: 20px;
}

.indicator__number-display {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 2px;
}

.indicator__current {
  font-family: var(--font-pretendard-regular);
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.24px;
  color: var(--color-text-indicator-default);
  white-space: nowrap;
  opacity: 1;
}

.indicator__total {
  font-family: var(--font-pretendard-regular);
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.24px;
  color: var(--color-text-indicator-default);
  white-space: nowrap;
  opacity: 0.6;
}

.indicator__dash {
  width: 1px;
  height: 6px;
  background-color: var(--color-text-indicator-default);
  opacity: 0.6;
}

.indicator__nav-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.indicator__nav-button:hover:not(.indicator__nav-button--disabled) {
  opacity: 0.8;
}

.indicator__nav-button--disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.indicator__nav-icon {
  color: var(--color-text-indicator-default);
  display: block;
  flex-shrink: 0;
}

.indicator__nav-button--disabled .indicator__nav-icon {
  opacity: 0.3;
}

.indicator__dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.indicator__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-bg-indicator-dot-default);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.indicator__dot:hover:not(:disabled) {
  opacity: 0.8;
}

.indicator__dot--active {
  width: 20px;
  height: 6px;
  border-radius: 3px;
  background-color: var(--color-bg-indicator-dot-active);
}

.indicator__dot:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.indicator__stop-button {
  background-color: var(--color-bg-indicator-number-default);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 6px;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.indicator__stop-button--dot-variant {
  background-color: transparent;
  width: 12px;
  height: 12px;
  padding: 2px;
}

.indicator__stop-button:hover:not(:disabled) {
  opacity: 0.8;
}

.indicator__stop-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.indicator__stop-icon {
  color: var(--color-text-indicator-default);
  display: block;
  flex-shrink: 0;
}

.indicator__stop-button--dot-variant .indicator__stop-icon {
  color: var(--color-icon-gray600);
}
</style>