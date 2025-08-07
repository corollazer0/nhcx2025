<!--
  AttachedFileList Component
  
  이벤트:
  - @file-item-click="(file, index, event) => { ... }" - 파일 아이템 클릭/키보드 선택 시
  - @close-click="(file, index, event) => { ... }" - 닫기 버튼 클릭 시
  
  사용 예시:
  <AttachedFileList 
    type="3line"
    :fileItems="[
      { fileName: 'document.pdf', id: 1 },
      { fileName: 'image.jpg', id: 2 },
      { fileName: 'text.txt', id: 3 }
    ]"
    @file-item-click="handleFileClick"
    @close-click="handleFileDelete"
  />
-->
<template>
  <div class="attached-file-list" data-testid="attached-file-list">
    <!-- Border -->
    <div class="attached-file-list__border" />
    
    <!-- Content -->
    <div class="attached-file-list__content">
      <div
        v-for="(item, index) in displayItems"
        :key="`file-${index}`"
        class="file-item"
        role="button"
        tabindex="0"
        :aria-label="`${item.data.fileName} 파일 선택`"
        @click="(event) => handleFileItemClick(item.data, index, event)"
        @keydown.enter="(event) => handleFileItemClick(item.data, index, event)"
        @keydown.space.prevent="(event) => handleFileItemClick(item.data, index, event)"
      >
        <div class="file-name">
          <span>{{ item.data.fileName }}</span>
        </div>
        <button 
          class="close-icon"
          type="button"
          :aria-label="`${item.data.fileName} 파일 삭제`"
          @click.stop="(event) => handleCloseClick(item.data, index, event)"
        >
          <img :src="closeIconSrc" alt="" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick } from 'vue';

// 파일 아이템 타입 정의
interface FileItem {
  fileName: string;
  id?: string | number;
}

// 내부 표시 아이템 타입 정의
interface DisplayItem {
  type: 'separator' | 'file';
  height?: 'tall' | 'medium' | 'short';
  data?: FileItem;
}

// Props 인터페이스
interface AttachedFileListProps {
  // Figma Properties - line type variants
  type?: '1line' | '2line' | '3line' | '4line' | '5line';
  
  // 동적 데이터 Props
  fileItems?: FileItem[];
  closeIconSrc?: string;
}

const props = withDefaults(defineProps<AttachedFileListProps>(), {
  // Figma 기본값
  type: '1line',
  
  // 동적 데이터 기본값
  fileItems: () => [{ fileName: '파일명' }],
  closeIconSrc: "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M18 6L6 18M6 6l12 12' stroke='%23111111' stroke-width='2' stroke-linecap='round'/%3e%3c/svg%3e"
});

// 이벤트 정의
const emit = defineEmits<{
  /**
   * 파일 아이템 클릭 시 발생하는 이벤트
   * @param file - 클릭된 파일 정보
   * @param index - 파일 인덱스
   * @param event - 마우스/키보드 이벤트
   */
  'file-item-click': [file: FileItem, index: number, event: MouseEvent | KeyboardEvent];
  
  /**
   * 닫기 버튼 클릭 시 발생하는 이벤트
   * @param file - 삭제할 파일 정보
   * @param index - 파일 인덱스
   * @param event - 마우스 이벤트
   */
  'close-click': [file: FileItem, index: number, event: MouseEvent];
}>();

// 파일 아이템만 표시하는 간소화된 레이아웃 생성
const displayItems = computed((): DisplayItem[] => {
  const items: DisplayItem[] = [];
  const fileCount = props.fileItems.length;
  
  // 타입별 표시할 파일 개수 결정
  const maxFiles = {
    '1line': 1,
    '2line': 2,
    '3line': 3,
    '4line': 4,
    '5line': 5
  }[props.type] || 1;
  
  // 실제 표시할 파일 개수
  const displayCount = Math.min(fileCount, maxFiles);
  
  // 파일 아이템만 추가 (separator는 CSS로 처리)
  for (let i = 0; i < displayCount; i++) {
    items.push({ 
      type: 'file', 
      data: props.fileItems[i] 
    });
  }
  
  // 디버깅 정보 (개발 환경에서만)
  if (import.meta.env.DEV || import.meta.env.MODE === 'test') {
    console.log('🔍 AttachedFileList Debug:', {
      type: props.type,
      fileCount,
      maxFiles,
      displayCount,
      fileItems: props.fileItems,
      generatedItems: items
    });
  }
  
  return items;
});

// 이벤트 핸들러
const handleFileItemClick = async (file: FileItem, index: number, event: MouseEvent | KeyboardEvent) => {
  console.log('🔥 handleFileItemClick called:', {
    file,
    index,
    eventType: event.type,
    eventConstructor: event.constructor.name,
    target: event.target,
    currentTarget: event.currentTarget
  });
  
  try {
    // DOM 업데이트가 완료될 때까지 대기
    await nextTick();
    console.log('⏳ nextTick completed for file-item-click');
    
    emit('file-item-click', file, index, event);
    console.log('✅ file-item-click event emitted successfully');
  } catch (error) {
    console.error('❌ Error emitting file-item-click:', error);
  }
};

const handleCloseClick = async (file: FileItem, index: number, event: MouseEvent) => {
  console.log('🔥 handleCloseClick called:', {
    file,
    index,
    eventType: event.type,
    eventConstructor: event.constructor.name,
    target: event.target,
    currentTarget: event.currentTarget
  });
  
  try {
    // DOM 업데이트가 완료될 때까지 대기
    await nextTick();
    console.log('⏳ nextTick completed for close-click');
    
    emit('close-click', file, index, event);
    console.log('✅ close-click event emitted successfully');
  } catch (error) {
    console.error('❌ Error emitting close-click:', error);
  }
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.attached-file-list {
  --color-border-line-3: #f0f0f0;
  --color-text-font-1: #121212;
  --color-icon-gray900: #111111;
  
  position: relative;
  width: 100%;
  min-width: 280px;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: stretch;
  justify-content: flex-start;
}

.attached-file-list__border {
  position: absolute;
  inset: 0;
  border: 1px solid var(--color-border-line-3);
  border-radius: 8px;
  pointer-events: none;
}

.attached-file-list__content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: stretch;
  justify-content: flex-start;
}

.file-item {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
  outline: none;
  position: relative;
}

/* 구분선을 ::after 가상 요소로 더 명확하게 표시 */
.file-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--color-border-line-3);
}

.file-item:last-child::after {
  display: none;
}

.file-item:hover {
  background-color: rgba(18, 18, 18, 0.05);
}

.file-item:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
  background-color: rgba(18, 18, 18, 0.05);
}

.file-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-font-1);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 16px;
}

.file-name span {
  display: block;
  line-height: 22px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
}

.close-icon {
  position: relative;
  width: 24px;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
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
  background-color: rgba(17, 17, 17, 0.1);
}

.close-icon:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
  background-color: rgba(17, 17, 17, 0.1);
}

.close-icon:active {
  transform: scale(0.95);
}

.close-icon img {
  width: 100%;
  height: 100%;
  max-width: none;
  display: block;
}
</style>