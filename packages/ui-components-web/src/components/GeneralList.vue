<template>
  <div class="general-list" data-testid="general-list">
    <div class="general-list__border" />

    <div class="general-list__content">
      <!-- Title + List Section -->
      <div class="title-list-section">
        <!-- Top Section -->
        <div v-if="top" class="top-section">
          <!-- Label -->
          <div v-if="label" class="label-wrapper">
            <div class="label">
              <span class="label-text">{{ labelText }}</span>
            </div>
          </div>

          <!-- Title -->
          <div v-if="title" class="title-section">
            <h2 class="title-text">{{ titleText }}</h2>
            <p v-if="subText" class="sub-text">{{ subTextContent }}</p>
          </div>
        </div>

        <!-- List Section -->
        <div v-if="list" class="list-section">
          <div 
            v-for="(item, index) in listItems" 
            :key="`list-item-${index}`"
            class="list-item"
            role="button"
            tabindex="0"
            @click="handleListItemClick(item, index, $event)"
            @keydown.enter="handleListItemClick(item, index, $event)"
            @keydown.space.prevent="handleListItemClick(item, index, $event)"
          >
            <div class="list-item-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="list-item-data">
              <span>{{ item.data }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Close Icon -->
      <button 
        v-if="iconClose" 
        class="close-icon"
        type="button"
        aria-label="닫기"
        @click="handleCloseClick"
      >
        <img :src="closeIconSrc" alt="" aria-hidden="true" />
      </button>

      <!-- Button + Message Section -->
      <div v-if="buttonMessage" class="button-message-section" data-testid="button-message-section">
        <div v-if="button" class="button-wrapper">
          <button 
            class="tertiary-button"
            type="button"
            @click="handleButtonClick"
          >
            <span class="button-text">{{ buttonText }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 리스트 아이템 타입 정의
interface ListItem {
  title: string;
  data: string;
}

// 개선된 Props 인터페이스
interface GeneralListProps {
  // Figma Properties (원본 유지)
  label?: boolean;
  subText?: boolean;
  list?: boolean;
  button?: boolean;
  top?: boolean;
  iconClose?: boolean;
  title?: boolean;
  buttonMessage?: boolean;
  message?: boolean;
  
  // 동적 데이터 Props
  labelText?: string;
  titleText?: string;
  subTextContent?: string;
  listItems?: ListItem[];
  buttonText?: string;
  closeIconSrc?: string;
}

const props = withDefaults(defineProps<GeneralListProps>(), {
  // Figma Properties 기본값 (원본 유지)
  label: true,
  subText: true,
  list: true,
  button: true,
  top: true,
  iconClose: true,
  title: true,
  buttonMessage: true,
  message: false,
  
  // 동적 데이터 기본값
  labelText: '라벨',
  titleText: '상품명',
  subTextContent: '부가설명',
  listItems: () => [
    { title: '타이틀', data: '데이터' },
    { title: '타이틀', data: '데이터' }
  ],
  buttonText: '버튼',
  closeIconSrc: "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18 6L6 18M6 6l12 12' stroke='%23111111' stroke-width='2' stroke-linecap='round'/%3e%3c/svg%3e"
});

// 이벤트 정의
const emit = defineEmits<{
  'button-click': [event: MouseEvent];
  'close-click': [event: MouseEvent];
  'list-item-click': [item: ListItem, index: number, event: MouseEvent | KeyboardEvent];
}>();

// 이벤트 핸들러
const handleButtonClick = (event: MouseEvent) => {
  emit('button-click', event);
};

const handleCloseClick = (event: MouseEvent) => {
  emit('close-click', event);
};

const handleListItemClick = (item: ListItem, index: number, event: MouseEvent | KeyboardEvent) => {
  emit('list-item-click', item, index, event);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.general-list {
  --color-text-label-gray: #767676;
  --color-border-label-gray: #707070;
  --color-text-font-1: #121212;
  --color-text-font-4: #767676;
  --color-text-font-3: #505050;
  --color-icon-gray900: #111111;
  --color-text-button-tertiary-default: #121212;
  --color-bg-button-tertiary-default: #ffffff;
  --color-border-button-tertiary-default: #d3d3d3;
  --color-bg-default: #ffffff;
  --color-border-line-2: #e1e1e1;
  --border-radius-4: 4px;
  --border-radius-8: 8px;
  --border-radius-16: 16px;

  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--color-bg-default);
  border-radius: var(--border-radius-16);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
}

.general-list__border {
  position: absolute;
  inset: 0;
  border: 1px solid var(--color-border-line-2);
  border-radius: var(--border-radius-16);
  pointer-events: none;
}

.general-list__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  justify-content: flex-start;
}

.title-list-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  justify-content: flex-start;
}

.top-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
}

.label-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: flex-start;
  justify-content: flex-start;
}

.label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px 2px 8px;
  border: 1px solid var(--color-border-label-gray);
  border-radius: var(--border-radius-4);
}

.label-text {
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: -0.2px;
  color: var(--color-text-label-gray);
  text-align: center;
  min-width: 18px;
}

.title-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  justify-content: flex-start;
}

.title-text {
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--color-text-font-1);
  margin: 0;
  width: 100%;
}

.sub-text {
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-font-4);
  margin: 0;
  width: 100%;
}

.list-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  justify-content: flex-start;
}

.list-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: -8px;
}

.list-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.list-item:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
  background-color: rgba(0, 0, 0, 0.05);
}

.list-item-title {
  width: 108px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
}

.list-item-title span {
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: var(--color-text-font-3);
  max-width: 108px;
}

.list-item-data {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  justify-content: flex-start;
}

.list-item-data span {
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.3px;
  color: var(--color-text-font-1);
  text-align: right;
  width: 100%;
}

.close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 24px;
  height: 24px;
  overflow: hidden;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.close-icon:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

.close-icon img {
  width: 100%;
  height: 100%;
  max-width: none;
  display: block;
}

.button-message-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  justify-content: flex-start;
}

.button-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: flex-start;
  justify-content: flex-end;
}

.tertiary-button {
  flex: 1;
  background-color: var(--color-bg-button-tertiary-default);
  border: 1px solid var(--color-border-button-tertiary-default);
  border-radius: var(--border-radius-8);
  padding: 7px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-height: 1px;
  min-width: 1px;
  transition: all 0.2s;
}

.tertiary-button:hover {
  background-color: var(--color-border-button-tertiary-default);
}

.tertiary-button:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

.tertiary-button:active {
  transform: translateY(1px);
}

.button-text {
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-button-tertiary-default);
  text-align: center;
  white-space: pre;
}
</style>
