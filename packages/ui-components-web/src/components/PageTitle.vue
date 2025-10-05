<template>
  <div
    class="page-title"
    :class="pageTitleClasses"
    data-testid="page-title"
  >
    <!-- Main Title -->
    <h1
      class="page-title__title"
      data-testid="page-title-title"
    >
      {{ titleText }}
    </h1>

    <!-- Subtitle (conditional) -->
    <p
      v-if="subTitle && subTitleText"
      class="page-title__subtitle"
      data-testid="page-title-subtitle"
    >
      {{ subTitleText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface PageTitleProps {
  titleText?: string;
  subTitle?: boolean;
  subTitleText?: string;
  align?: 'left' | 'center' | 'right';
}

const props = withDefaults(defineProps<PageTitleProps>(), {
  titleText: '페이지 타이틀',
  subTitle: true,
  subTitleText: '서브타이틀 텍스트',
  align: 'left'
});

const emit = defineEmits<{
  titleClick: [event: MouseEvent];
}>();

const pageTitleClasses = computed(() => [
  `page-title--${props.align}`,
  {
    'page-title--subtitle-hidden': !props.subTitle || !props.subTitleText
  }
]);

const handleTitleClick = (event: MouseEvent) => {
  emit('titleClick', event);
};
</script>

<style scoped>
/* Design tokens from Figma */
.page-title {
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --font-pretendard-semibold: 'Pretendard', sans-serif;
  --font-pretendard-regular: 'Pretendard', sans-serif;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

/* Title styles - matching Figma exactly */
.page-title__title {
  font-family: var(--font-pretendard-semibold);
  font-weight: 600;
  font-style: normal;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: -0.44px;
  color: var(--color-text-font-1);
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
  flex-shrink: 0;
}

/* Subtitle styles - matching Figma exactly */
.page-title__subtitle {
  font-family: var(--font-pretendard-regular);
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: -0.3px;
  color: var(--color-text-font-3);
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
  flex-shrink: 0;
}

/* Alignment variants */
.page-title--left {
  align-items: flex-start;
  text-align: left;
}

.page-title--left .page-title__title,
.page-title--left .page-title__subtitle {
  text-align: left;
}

.page-title--center {
  align-items: center;
  text-align: center;
}

.page-title--center .page-title__title,
.page-title--center .page-title__subtitle {
  text-align: center;
}

.page-title--right {
  align-items: flex-end;
  text-align: right;
}

.page-title--right .page-title__title,
.page-title--right .page-title__subtitle {
  text-align: right;
}

/* State modifiers */
.page-title--subtitle-hidden {
  gap: 0;
}

.page-title--subtitle-hidden .page-title__subtitle {
  display: none;
}

/* Interactive states */
.page-title__title:hover {
  cursor: default;
}

.page-title__title:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Accessibility improvements */
.page-title__title {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

.page-title__subtitle {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .page-title {
    gap: 8px;
  }

  .page-title__title {
    font-size: 20px;
    line-height: 28px;
    letter-spacing: -0.4px;
  }

  .page-title__subtitle {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.28px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .page-title {
    --color-text-font-1: #ffffff;
    --color-text-font-3: #b0b0b0;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .page-title__title {
    font-weight: 700;
  }

  .page-title__subtitle {
    font-weight: 500;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .page-title__title,
  .page-title__subtitle {
    transition: none;
  }
}

/* Print styles */
@media print {
  .page-title {
    color: black;
    background: white;
  }

  .page-title__title,
  .page-title__subtitle {
    color: black;
  }
}
</style>