<template>
  <div
    class="filter"
    :class="filterClasses"
    data-testid="filter"
  >
    <div class="filter__contents">
      <!-- Default variant: 텍스트 + 필터아이콘 | 툴팁 + 스위치 -->
      <template v-if="variant === 'default'">
        <div class="filter__left">
          <div class="filter__text-content" :class="textContentClasses">
            <div v-if="computedShowDate" class="filter__date">
              <p class="filter__date-text">{{ dateText }}</p>
            </div>
            <p class="filter__label">{{ computedFilterText }}</p>
          </div>
          <div
            v-if="showFilterIcon"
            class="filter__filter-icon"
            @click="handleFilterIconClick"
          >
            <img
              :src="filterIconSrc"
              alt=""
              class="filter__icon-img"
            />
          </div>
        </div>
        <div
          v-if="computedShowTooltip"
          class="filter__right"
        >
          <div class="filter__tooltip-content">
            <p class="filter__tooltip-text">{{ tooltipText }}</p>
            <div 
              class="filter__tooltip-icon"
              @click="handleTooltipIconClick"
            >
              <img
                :src="tooltipIconSrc"
                alt=""
                class="filter__icon-img"
              />
            </div>
          </div>
          <div
            v-if="computedShowSwitch"
            class="filter__switch"
            :class="switchClasses"
            @click="handleSwitchToggle"
          >
            <div class="filter__switch-inner" />
          </div>
        </div>
      </template>

      <!-- With-date variant: 텍스트 | 필터아이콘 -->
      <template v-else-if="variant === 'with-date'">
        <div class="filter__left">
          <div class="filter__text-content" :class="textContentClasses">
            <div v-if="computedShowDate" class="filter__date">
              <p class="filter__date-text">{{ dateText }}</p>
            </div>
            <p class="filter__label">{{ computedFilterText }}</p>
          </div>
        </div>
        <div class="filter__right">
          <div
            v-if="showFilterIcon"
            class="filter__filter-icon"
            @click="handleFilterIconClick"
          >
            <img
              :src="filterIconSrc"
              alt=""
              class="filter__icon-img"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface FilterProps {
  filterText?: string;
  tooltipText?: string;
  showFilterIcon?: boolean;
  showTooltip?: boolean;
  showSwitch?: boolean;
  switchValue?: boolean;
  dateText?: string;
  showDate?: boolean;
  variant?: 'default' | 'with-date';
}

const props = withDefaults(defineProps<FilterProps>(), {
  filterText: '최신순ㆍ3개월',
  tooltipText: '추천 상품',
  showFilterIcon: true,
  showTooltip: true,
  showSwitch: true,
  switchValue: false,
  dateText: '2024.01.01~2024.03.01',
  showDate: false,
  variant: 'default',
});

const emit = defineEmits<{
  'switch-toggle': [value: boolean];
  'filter-icon-click': [event: MouseEvent];
  'tooltip-icon-click': [event: MouseEvent];
}>();

const filterIconSrc = "http://localhost:3845/assets/02f24a4946042bb9edb388b592e496d872188404.svg";
const tooltipIconSrc = "http://localhost:3845/assets/ff1fd95f44b2f231bc3f4189988d6467c605bae2.svg";

const filterClasses = computed(() => [
  `filter--${props.variant}`
]);

const switchClasses = computed(() => [
  'filter__switch--xs',
  props.switchValue ? 'filter__switch--on' : 'filter__switch--off'
]);

const textContentClasses = computed(() => [
  {
    'filter__text-content--with-date': props.showDate || props.variant === 'with-date',
    'filter__text-content--single-line': !props.showDate && props.variant !== 'with-date',
  }
]);

// variant에 따른 자동 설정
const computedShowDate = computed(() => props.showDate || props.variant === 'with-date');
const computedShowTooltip = computed(() => props.variant === 'with-date' ? false : props.showTooltip);
const computedShowSwitch = computed(() => props.variant === 'with-date' ? false : props.showSwitch);
const computedFilterText = computed(() => {
  if (props.variant === 'with-date' && props.filterText === '최신순ㆍ3개월') {
    return '최신순';
  }
  return props.filterText;
});

const handleSwitchToggle = () => {
  emit('switch-toggle', !props.switchValue);
};

const handleFilterIconClick = (event: MouseEvent) => {
  emit('filter-icon-click', event);
};

const handleTooltipIconClick = (event: MouseEvent) => {
  emit('tooltip-icon-click', event);
};
</script>

<style scoped>
.filter {
  --color-text-font-3: #505050;
  --color-text-font-1: #121212;
  --color-icon-gray600: #707070;
  --color-bg-switch-inner: #ffffff;
  --color-bg-switch-off: #707070;
  --color-bg-switch-on: #19973c;
  --color-bg-default: #ffffff;
  --border-radius-circle: 999px;
  --font-pretendard-regular: 'Pretendard', sans-serif;
  --font-pretendard-medium: 'Pretendard', sans-serif;

  background-color: var(--color-bg-default);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  width: 100%;
}

.filter__contents {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  position: relative;
  flex-shrink: 0;
  width: 100%;
}

/* Default variant: 왼쪽 그룹은 고정, 오른쪽 그룹은 우측 정렬 */
.filter--default .filter__contents {
  justify-content: flex-start !important;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.filter--default .filter__left {
  display: flex !important;
  flex-direction: row !important;
  gap: 0px !important;
  align-items: center !important;
  flex-shrink: 0 !important;
  order: 1 !important;
}

.filter--default .filter__right {
  margin-left: 24px !important;
  display: flex !important;
  flex-direction: row !important;
  gap: 8px !important;
  align-items: center !important;
  order: 2 !important;
}

/* Default variant에서 필터 아이콘이 왼쪽 그룹에 있도록 강제 */
.filter--default .filter__filter-icon {
  order: 2 !important;
}

.filter--default .filter__text-content {
  order: 1 !important;
}


/* With-date variant: 양쪽 끝 정렬 */  
.filter--with-date .filter__contents {
  justify-content: space-between;
}

.filter__left {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  flex-shrink: 0;
}

/* Default variant에서 왼쪽 그룹은 컨테이너 너비에 맞춰 텍스트와 필터아이콘을 포함 */
.filter--default .filter__left {
  flex-shrink: 0;
  width: auto;
}

.filter__text-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  font-family: var(--font-pretendard-regular);
  flex-grow: 1;
}

/* Default variant에서 텍스트 영역이 늘어나지 않도록 제한 */
.filter--default .filter__text-content {
  flex-grow: 0 !important;
  width: auto !important;
}

.filter__text-content--single-line {
  justify-content: center;
  min-height: auto;
}

.filter__text-content--with-date {
  justify-content: center;
  min-height: 40px;
  height: 40px;
}

.filter__date {
  position: relative;
  flex-shrink: 0;
  width: 276px;
  height: 20px;
}

.filter__date-text {
  font-family: var(--font-pretendard-medium);
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: var(--color-text-font-1);
  text-align: left;
  white-space: nowrap;
  margin: 0;
  position: relative;
  flex-shrink: 0;
}

.filter__label {
  font-family: var(--font-pretendard-regular);
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: var(--color-text-font-3);
  text-align: left;
  white-space: nowrap;
  margin: 0;
  position: relative;
  flex-shrink: 0;
  width: auto;
  height: 20px;
}

.filter__filter-icon {
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.filter__icon-img {
  display: block;
  max-width: none;
  width: 100%;
  height: 100%;
}

.filter__right {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  position: relative;
  flex-shrink: 0;
}

.filter__tooltip-content {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  flex-shrink: 0;
}

.filter__tooltip-text {
  font-family: var(--font-pretendard-medium);
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: var(--color-text-font-1);
  text-align: left;
  white-space: nowrap;
  margin: 0;
  position: relative;
  flex-shrink: 0;
}

.filter__tooltip-icon {
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.filter__switch {
  background-color: var(--color-bg-switch-off);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.76;
  overflow: hidden;
  padding: 2px;
  position: relative;
  border-radius: var(--border-radius-circle);
  flex-shrink: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filter__switch--xs {
  width: 28px;
  height: auto;
}

.filter__switch--on {
  background-color: var(--color-bg-switch-on);
}

.filter__switch--off {
  background-color: var(--color-bg-switch-off);
}

.filter__switch-inner {
  background-color: var(--color-bg-switch-inner);
  border-radius: var(--border-radius-circle);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  transition: transform 0.2s ease;
}

.filter__switch--on .filter__switch-inner {
  transform: translateX(10px);
}

.filter__switch:hover {
  opacity: 1;
}

.filter__switch:active .filter__switch-inner {
  transform: scale(0.9);
}

.filter__switch--on:active .filter__switch-inner {
  transform: translateX(10px) scale(0.9);
}
</style>