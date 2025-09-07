<template>
  <div class="indicator" data-testid="indicator">
    <!-- Text navigation variant -->
    <template v-if="variant === 'text'">
      <!-- Navigation arrows and text -->
      <div class="indicator__navigation" @click="handleNavClick">
        <button
          class="indicator__nav-button"
          :class="{ 'indicator__nav-button--disabled': disabled || current <= 1 }"
          @click="handlePrevClick"
          :disabled="disabled || current <= 1"
          data-testid="indicator-prev"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" class="indicator__nav-icon">
            <path d="M5 1.5L2.5 4L5 6.5" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        
        <span class="indicator__text">{{ displayText }}</span>
        
        <button
          class="indicator__nav-button"
          :class="{ 'indicator__nav-button--disabled': disabled || current >= total }"
          @click="handleNextClick"
          :disabled="disabled || current >= total"
          data-testid="indicator-next"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" class="indicator__nav-icon">
            <path d="M3 1.5L5.5 4L3 6.5" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
      
      <!-- Play/Pause button -->
      <button
        class="indicator__play-button"
        :class="{ 'indicator__play-button--paused': !isPlaying }"
        @click="handlePlayClick"
        :disabled="disabled"
        data-testid="indicator-play"
      >
        <!-- Play icon -->
        <svg v-if="!isPlaying" width="12" height="12" viewBox="0 0 12 12" fill="none" class="indicator__play-icon">
          <path d="M4 2.5L9 6L4 9.5V2.5Z" fill="currentColor" />
        </svg>
        
        <!-- Pause icon -->
        <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none" class="indicator__play-icon">
          <rect x="3" y="2" width="2" height="8" fill="currentColor" />
          <rect x="7" y="2" width="2" height="8" fill="currentColor" />
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
      
      <!-- Play/Pause button for dot variant -->
      <button
        class="indicator__play-button indicator__play-button--dot-variant"
        :class="{ 'indicator__play-button--paused': !isPlaying }"
        @click="handlePlayClick"
        :disabled="disabled"
        data-testid="indicator-play"
      >
        <!-- Play icon -->
        <svg v-if="!isPlaying" width="12" height="12" viewBox="0 0 12 12" fill="none" class="indicator__play-icon">
          <path d="M4 2.5L9 6L4 9.5V2.5Z" fill="currentColor" />
        </svg>
        
        <!-- Pause icon -->
        <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none" class="indicator__play-icon">
          <rect x="3" y="2" width="2" height="8" fill="currentColor" />
          <rect x="7" y="2" width="2" height="8" fill="currentColor" />
        </svg>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface IndicatorProps {
  variant?: 'text' | 'dot';
  current?: number;
  total?: number;
  disabled?: boolean;
  isPlaying?: boolean;
}

const props = withDefaults(defineProps<IndicatorProps>(), {
  variant: 'text',
  current: 1,
  total: 3,
  disabled: false,
  isPlaying: false,
});

const emit = defineEmits<{
  'navigate-prev': [];
  'navigate-next': [];
  'navigate-to': [page: number];
  'toggle-play': [isPlaying: boolean];
  'nav-click': [event: MouseEvent];
}>();

const displayText = computed(() => `${props.current} | ${props.total}`);

const handleNavClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('nav-click', event);
  }
};

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

const handlePlayClick = (event: MouseEvent) => {
  event.stopPropagation();
  if (!props.disabled) {
    emit('toggle-play', !props.isPlaying);
  }
};
</script>

<style scoped>
.indicator {
  --color-bg-indicator-default: #111111;
  --color-text-indicator-default: #ffffff;
  --color-bg-indicator-dot-active: #19973c;
  --color-bg-indicator-dot-default: #d3d3d3;
  --color-icon-gray600: #707070;
  --border-radius-circle: 999px;
  --font-pretendard-regular: 'Pretendard', sans-serif;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  user-select: none;
}

.indicator__navigation {
  background-color: var(--color-bg-indicator-default);
  border-radius: var(--border-radius-circle);
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition: opacity 0.2s ease;
  height: 24px;
}

.indicator__navigation:hover {
  opacity: 0.8;
}

.indicator__text {
  font-family: var(--font-pretendard-regular);
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: var(--color-text-indicator-default);
  white-space: nowrap;
  margin: 0;
  flex-shrink: 0;
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
  width: 8px;
  height: 8px;
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

.indicator__play-button {
  background-color: var(--color-bg-indicator-default);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.indicator__play-button--dot-variant {
  background-color: transparent;
}

.indicator__play-button:hover:not(:disabled) {
  opacity: 0.8;
}

.indicator__play-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.indicator__play-icon {
  color: var(--color-text-indicator-default);
  display: block;
  flex-shrink: 0;
}

.indicator__play-button--dot-variant .indicator__play-icon {
  color: var(--color-icon-gray600);
}
</style>