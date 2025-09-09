<template>
  <div
    class="load-data"
    :class="loadDataClasses"
    data-testid="load-data"
    @click="handleClick"
  >
    <!-- Label -->
    <div
      v-if="label"
      class="load-data__label"
      data-testid="load-data-label"
    >
      <div class="load-data__label-text">
        {{ labelText }}
      </div>
    </div>

    <!-- Input Container -->
    <div class="load-data__container">
      <div class="load-data__content">
        <!-- Inner Label (for basic variant) -->
        <div
          v-if="variant === 'basic' && innerLabel"
          class="load-data__inner-label"
          data-testid="load-data-inner-label"
        >
          {{ innerLabelText }}
        </div>

        <!-- Highlight variant content -->
        <div
          v-if="variant === 'highlight'"
          class="load-data__highlight-content"
        >
          <div class="load-data__highlight-label">
            {{ highlightLabelText }}
          </div>
          <div class="load-data__highlight-description">
            {{ highlightDescriptionText }}
          </div>
        </div>

        <!-- Data -->
        <div class="load-data__data" data-testid="load-data-data">
          {{ dataText }}
        </div>
      </div>
    </div>

    <!-- Message -->
    <div
      v-if="message"
      class="load-data__message"
      data-testid="load-data-message"
    >
      <div class="load-data__message-text">
        {{ messageText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface LoadDataProps {
  variant?: 'basic' | 'highlight';
  labelText?: string;
  innerLabelText?: string;
  highlightLabelText?: string;
  highlightDescriptionText?: string;
  dataText?: string;
  messageText?: string;
  label?: boolean;
  innerLabel?: boolean;
  message?: boolean;
}

const props = withDefaults(defineProps<LoadDataProps>(), {
  variant: 'basic',
  labelText: '레이블',
  innerLabelText: 'Label',
  highlightLabelText: 'Label',
  highlightDescriptionText: '부가설명',
  dataText: 'Data',
  messageText: '',
  label: true,
  innerLabel: true,
  message: true
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const loadDataClasses = computed(() => [
  `load-data--${props.variant}`
]);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style scoped>
/* Design tokens from Figma */
.load-data {
  --color-text-font-3: #505050;
  --color-text-font-1: #121212;
  --color-text-font-4: #767676;
  --color-bg-input-load-data: #f6f6f6;
  --border-radius-12: 12px;
  
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* Label */
.load-data__label {
  height: 22px;
  position: relative;
}

.load-data__label-text {
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-font-3);
}

/* Container */
.load-data__container {
  background-color: var(--color-bg-input-load-data);
  border-radius: var(--border-radius-12);
  padding: 14px 20px;
  box-sizing: border-box;
}

.load-data__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  min-height: 26px;
}

/* Inner Label (Basic variant) */
.load-data__inner-label {
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-font-3);
  width: 120px;
  flex-shrink: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Highlight variant content */
.load-data__highlight-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 120px;
  flex-shrink: 0;
}

.load-data__highlight-label {
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  color: var(--color-text-font-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.load-data__highlight-description {
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: var(--color-text-font-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Data */
.load-data__data {
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  color: var(--color-text-font-1);
  text-align: right;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Message */
.load-data__message {
  display: flex;
  align-items: center;
  gap: 8px;
}

.load-data__message-text {
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: var(--color-text-font-4);
  flex: 1;
}

/* Basic variant alignment */
.load-data--basic .load-data__content {
  align-items: center;
}

/* Highlight variant alignment */
.load-data--highlight .load-data__content {
  align-items: flex-start;
}
</style>