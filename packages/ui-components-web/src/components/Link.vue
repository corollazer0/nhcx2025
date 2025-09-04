<template>
  <div
    class="link"
    :class="linkClasses"
    data-testid="link"
    @click="handleClick"
  >
    <div class="link__title">
      <span class="link__text">{{ text }}</span>
    </div>
    <div class="link__icon">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="link__arrow"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface LinkProps {
  text?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<LinkProps>(), {
  text: '타이틀',
  disabled: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const linkClasses = computed(() => [
  {
    'link--disabled': props.disabled
  }
]);

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
/* Design tokens from Figma */
.link {
  --color-text-default: #121212;
  --color-text-disabled: #929292;
  --color-icon-default: #111111;
  --color-icon-disabled: #929292;
  --color-bg-default: #ffffff;
  --color-bg-hover: #f8f8f8;
  --color-bg-active: #f0f0f0;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  padding: 9px 0;
  background-color: var(--color-bg-default);
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  box-sizing: border-box;
  position: relative;
  transition: all 0.2s ease;
  border: none;
  border-radius: 0;
}

.link:hover:not(.link--disabled) {
  background-color: var(--color-bg-hover);
}

.link:active:not(.link--disabled) {
  background-color: var(--color-bg-active);
}

.link--disabled {
  cursor: not-allowed;
}

.link:focus {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

.link__title {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  min-height: 1px;
  min-width: 1px;
}

.link__text {
  flex: 1 1 0;
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  color: var(--color-text-default);
  text-align: left;
  min-height: 1px;
  min-width: 1px;
}

.link--disabled .link__text {
  color: var(--color-text-disabled);
}

.link__icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.link__arrow {
  width: 100%;
  height: 100%;
  color: var(--color-icon-default);
  transition: color 0.2s ease;
}

.link--disabled .link__arrow {
  color: var(--color-icon-disabled);
}

/* Focus and keyboard navigation */
.link {
  outline: none;
}

.link:focus-visible {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

/* Active state styling */
.link:not(.link--disabled):active {
  transform: translateY(1px);
}

/* Text selection prevention for better UX */
.link {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>