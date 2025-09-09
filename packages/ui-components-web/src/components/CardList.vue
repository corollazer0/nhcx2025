<template>
  <div class="card-list" :class="sizeClass" data-testid="card-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="card-list__item"
      @click="handleItemClick(item, index)"
    >
      <div class="card-list__row">
        <div class="card-list__title">
          <span class="card-list__title-text">{{ item.title }}</span>
        </div>
        <div class="card-list__data">
          <span v-if="item.label" class="card-list__label" :class="labelClass(item.label)">
            {{ item.label }}
          </span>
          <span v-else-if="item.data" class="card-list__data-text">{{ item.data }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface CardListItem {
  title: string;
  data?: string;
  label?: string;
}

interface CardListProps {
  items?: CardListItem[];
  size?: "lg" | "sm" | "xs";
}

const props = withDefaults(defineProps<CardListProps>(), {
  items: () => [
    { title: '타이틀', data: '데이터' },
    { title: '타이틀', data: '데이터' },
    { title: '타이틀', data: '데이터' }
  ],
  size: 'lg'
});

const emit = defineEmits<{
  itemClick: [item: CardListItem, index: number];
}>();

const sizeClass = computed(() => `card-list--${props.size}`);

const labelClass = (label?: string) => {
  return label ? 'card-list__label--gray' : '';
};

const handleItemClick = (item: CardListItem, index: number) => {
  emit('itemClick', item, index);
};
</script>

<style scoped>
.card-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-list__item {
  cursor: pointer;
}

.card-list__row {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.card-list__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 108px;
  flex-shrink: 0;
}

.card-list__title-text {
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-style: normal;
  line-height: 20px;
  color: #505050;
  letter-spacing: -0.02em;
  max-width: 108px;
}

.card-list__data {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
  min-width: 0;
}

.card-list__data-text {
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  line-height: 20px;
  text-align: right;
  color: #121212;
  letter-spacing: -0.02em;
}

.card-list__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 8px 2px 8px;
  border-radius: 4px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.02em;
}

.card-list__label--gray {
  background-color: transparent;
  border: 1px solid #707070;
  color: #767676;
}

/* Size variations */
.card-list--lg {
  gap: 12px;
}

.card-list--lg .card-list__title-text {
  font-size: 15px;
}

.card-list--lg .card-list__data-text {
  font-weight: 600;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: -0.02em;
}

.card-list--sm {
  gap: 16px;
}

.card-list--sm .card-list__title {
  padding: 6px 0 0 0;
}

.card-list--sm .card-list__title-text {
  font-size: 15px;
}

.card-list--sm .card-list__data-text {
  font-weight: 500;
  font-size: 15px;
}

.card-list--xs {
  gap: 12px;
}

.card-list--xs .card-list__title-text {
  font-size: 14px;
  letter-spacing: -0.02em;
}

.card-list--xs .card-list__data-text {
  font-weight: 400;
  font-size: 14px;
  color: #505050;
  letter-spacing: -0.02em;
}
</style>