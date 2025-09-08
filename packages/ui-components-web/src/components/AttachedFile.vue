<template>
  <div class="attached-file" :class="attachedFileClasses" data-testid="attached-file">
    <div class="attached-file__divider"></div>
    <div class="attached-file__content">
      <span class="attached-file__filename">{{ filename }}</span>
      <button
        type="button"
        class="attached-file__delete-button"
        data-testid="delete-button"
        @click="handleDelete"
      >
        <img 
          alt="삭제"
          class="attached-file__delete-icon" 
          :src="deleteIconSrc" 
        />
      </button>
    </div>
    <div class="attached-file__divider"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface AttachedFileProps {
  filename?: string;
  type?: "1line" | "2line" | "3line" | "4line" | "5line";
}

const props = withDefaults(defineProps<AttachedFileProps>(), {
  filename: '파일명',
  type: '1line'
});

const emit = defineEmits<{
  delete: [filename: string];
}>();

const deleteIconSrc = "http://localhost:3845/assets/5a16b7852fe18fd2c59af386d98d7b76c2b5e233.svg";

const attachedFileClasses = computed(() => [
  `attached-file--${props.type}`,
]);

const handleDelete = () => {
  emit('delete', props.filename);
};
</script>

<style scoped>
.attached-file {
  --color-border-line: #f0f0f0;
  --color-text-primary: #121212;
  --color-icon-gray: #111111;
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  position: relative;
}

.attached-file__divider {
  height: 1px;
  width: 100%;
  border: 1px solid var(--color-border-line);
  flex-shrink: 0;
}

.attached-file__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-shrink: 0;
}

.attached-file__filename {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-primary);
  text-align: left;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attached-file__delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: opacity 0.2s ease;
}

.attached-file__delete-button:hover {
  opacity: 0.7;
}

.attached-file__delete-button:active {
  transform: scale(0.95);
}

.attached-file__delete-button:focus {
  outline: 2px solid #121212;
  outline-offset: 2px;
  border-radius: 2px;
}

.attached-file__delete-icon {
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
}

/* Type variants - currently only 1line is implemented as per Figma */
.attached-file--1line {
  /* Base styles already applied */
}

.attached-file--2line,
.attached-file--3line,
.attached-file--4line,
.attached-file--5line {
  /* Future implementation for multi-line variants */
}
</style>