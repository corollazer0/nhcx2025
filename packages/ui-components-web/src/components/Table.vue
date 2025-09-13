<template>
  <div
    class="table"
    data-testid="table"
    @click="handleClick"
  >
    <div
      v-for="(row, index) in rows"
      :key="index"
      class="table__row"
      :class="{ 'table__row--last': index === rows.length - 1 }"
    >
      <!-- TH (Header Cell) -->
      <div class="table__cell table__cell--th">
        <div class="table__cell-content">
          {{ row.header }}
        </div>
      </div>

      <!-- TD (Data Cell) -->
      <div class="table__cell table__cell--td" :class="getDataCellClasses(row)">
        <div class="table__cell-content">
          <!-- Bullet 목록이 있는 경우 -->
          <div v-if="row.items && row.items.length > 0" class="table__bullets">
            <div
              v-for="(item, itemIndex) in row.items"
              :key="itemIndex"
              class="table__bullet-item"
              :class="{ 'table__bullet-item--indent': item.indentLevel > 0 }"
            >
              <div class="table__bullet-wrapper">
                <div
                  v-if="item.bulletType === 'bullet'"
                  class="table__bullet-icon"
                >
                  <!-- Regular bullet -->
                </div>
                <div
                  v-else-if="item.bulletType === 'hyphen'"
                  class="table__bullet-hyphen"
                >
                  <!-- Hyphen bullet -->
                </div>
              </div>
              <div class="table__bullet-text">
                {{ item.text }}
              </div>
            </div>
          </div>

          <!-- 일반 텍스트 -->
          <div v-else class="table__text">
            {{ row.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface TableBulletItem {
  text: string;
  bulletType: 'bullet' | 'hyphen';
  indentLevel?: number; // 0: 기본, 1: 한 단계 들여쓰기
}

interface TableRow {
  header: string; // TH 내용
  content?: string; // TD 일반 텍스트 내용
  items?: TableBulletItem[]; // TD bullet 목록
  align?: 'left' | 'center' | 'right'; // TD 정렬
}

interface TableProps {
  rows: TableRow[];
  headerWidth?: string; // TH 열 너비 (예: "120px", "30%")
  dataAlign?: 'left' | 'center' | 'right'; // 전체 데이터 열 기본 정렬
}

const props = withDefaults(defineProps<TableProps>(), {
  rows: () => [
    { header: '구분', content: '내용' }
  ],
  headerWidth: '120px',
  dataAlign: 'left'
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const getDataCellClasses = (row: TableRow) => {
  const align = row.align || props.dataAlign;
  return `table__cell--${align}`;
};

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<style scoped>
/* Design tokens from Figma */
.table {
  --color-text-header: #121212;
  --color-text-content: #505050;
  --color-bg-header: #f6f6f6;
  --color-bg-content: #ffffff;
  --color-border: #e1e1e1;
  --color-bullet: #707070;

  --font-family: 'Pretendard', sans-serif;
  --font-size: 14px;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
  --line-height: 22px;
  --letter-spacing: -0.28px;

  --padding-horizontal: 8px;
  --padding-vertical: 9px;
  --min-height: 40px;
  --gap: 8px;
  --bullet-size: 4px;
  --bullet-indent: 12px;

  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: var(--line-height);
  letter-spacing: var(--letter-spacing);
}

/* Table row */
.table__row {
  display: grid;
  grid-template-columns: v-bind(headerWidth) 1fr;
  align-items: stretch;
}

/* Table cells */
.table__cell {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--padding-vertical) var(--padding-horizontal);
  min-height: var(--min-height);
  position: relative;
  border: 1px solid var(--color-border);
  border-bottom: 0;
  border-right: 0;
}

/* Last row gets bottom border */
.table__row--last .table__cell {
  border-bottom: 1px solid var(--color-border);
}

/* Header cells (TH) */
.table__cell--th {
  background-color: var(--color-bg-header);
  color: var(--color-text-header);
  font-weight: var(--font-weight-medium);
}

/* Data cells (TD) */
.table__cell--td {
  background-color: var(--color-bg-content);
  color: var(--color-text-content);
  font-weight: var(--font-weight-regular);
}

/* Alignment for data cells */
.table__cell--left {
  text-align: left;
  justify-content: flex-start;
}

.table__cell--center {
  text-align: center;
  justify-content: center;
}

.table__cell--right {
  text-align: right;
  justify-content: flex-end;
}

/* Cell content wrapper */
.table__cell-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  align-items: flex-start;
  justify-content: center;
  min-height: var(--line-height);
}

/* Text content */
.table__text {
  width: 100%;
  line-height: var(--line-height);
}

/* Bullets container */
.table__bullets {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.table__bullet-item {
  display: flex;
  align-items: flex-start;
  gap: var(--gap);
  width: 100%;
}

.table__bullet-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--line-height);
  min-width: var(--bullet-size);
  position: relative;
  flex-shrink: 0;
}

/* Regular bullet icon */
.table__bullet-icon {
  width: var(--bullet-size);
  height: var(--bullet-size);
  background-color: var(--color-bullet);
  border-radius: 4px;
}

/* Hyphen bullet */
.table__bullet-hyphen {
  width: var(--bullet-size);
  height: 1px;
  background-color: var(--color-bullet);
  margin-top: calc(var(--line-height) / 2 - 0.5px);
}

/* Bullet text */
.table__bullet-text {
  flex: 1;
  line-height: var(--line-height);
  min-height: var(--line-height);
  display: flex;
  align-items: flex-start;
  white-space: pre-wrap;
}

/* Indented bullets */
.table__bullet-item--indent .table__bullet-wrapper {
  margin-left: var(--bullet-indent);
}

/* Numeric text alignment for right-aligned data */
.table__cell--right .table__text {
  font-variant-numeric: tabular-nums lining-nums;
}

/* Center alignment adjustments */
.table__cell--center .table__cell-content {
  align-items: center;
}

.table__cell--center .table__bullets {
  align-items: center;
}

.table__cell--center .table__bullet-item {
  justify-content: center;
}

/* Right alignment adjustments */
.table__cell--right .table__cell-content {
  align-items: flex-end;
}

.table__cell--right .table__bullets {
  align-items: flex-end;
}

.table__cell--right .table__bullet-item {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.table__cell--right .table__bullet-item .table__bullet-wrapper {
  margin-left: 0;
  margin-right: var(--gap);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .table {
    --padding-horizontal: 6px;
    --padding-vertical: 8px;
    --font-size: 13px;
    --line-height: 20px;
    --letter-spacing: -0.26px;
  }
}

/* Focus and hover states */
.table:focus-visible {
  outline: 2px solid #121212;
  outline-offset: 2px;
}

.table__cell:hover {
  background-color: #f9f9f9;
}

.table__cell--th:hover {
  background-color: #eeeeee;
}

/* Accessibility */
.table[role="table"] {
  cursor: default;
}

/* Print styles */
@media print {
  .table__cell {
    border: 1px solid #000 !important;
    background-color: transparent !important;
    color: #000 !important;
  }
}
</style>