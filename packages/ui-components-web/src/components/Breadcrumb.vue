<script setup lang="ts">
import { computed } from "vue";
import IconHome from "./icons/IconHome.vue";
import IconChevronRight from "./icons/IconChevronRight.vue";
import IconEllipsis from "./icons/IconEllipsis.vue";

// 브레드크럼 아이템 타입 정의
interface BreadcrumbItem {
  name: string;
  path: string;
  isEllipsis?: boolean;
}

const props = defineProps({
  items: {
    type: Array as () => BreadcrumbItem[],
    required: true,
  },
  maxVisibleItems: {
    type: Number,
    default: 5,
  },
});

// 표시될 아이템 목록을 계산하는 computed 속성
const displayItems = computed(() => {
  if (props.items.length > props.maxVisibleItems) {
    return [
      props.items[0],
      { name: "...", path: "#", isEllipsis: true }, // path 속성 추가
      props.items[props.items.length - 1],
    ];
  }
  return props.items;
});
</script>
<!-- 마크업 코드 -->
<template>
  <nav :class="$style.nav" aria-label="breadcrumb">
    <ol :class="$style.list">
      <li
        v-for="(item, index) in displayItems"
        :key="item.path || index"
        :class="$style.item"
      >
        <span v-if="item.isEllipsis" :class="$style.ellipsis">
          <IconEllipsis data-testid="ellipsis-icon" />
        </span>

        <router-link
          v-else-if="index < displayItems.length - 1"
          :to="item.path"
          :class="$style.link"
        >
          <IconHome v-if="item.name === '홈'" :class="$style.icon" />
          {{ item.name }}
        </router-link>

        <span v-else :class="$style.current" aria-current="page">
          <IconHome v-if="item.name === '홈'" :class="$style.icon" />
          {{ item.name }}
        </span>

        <IconChevronRight
          v-if="
            index < displayItems.length - 1 &&
            !displayItems[index + 1].isEllipsis &&
            !item.isEllipsis
          "
          :class="$style.separator"
        />
      </li>
    </ol>
  </nav>
</template>
<!-- CSS 영역 -->
<style module>
.nav {
  width: 100%;
  font-family: "Pretendard GOV", sans-serif;
  font-size: 15px;
  color: #1e2124;
}

.list {
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* 화면이 좁을 때 줄바꿈 처리 */
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 4px; /* 아이템 사이의 간격 */
}

.item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.link,
.current,
.ellipsis {
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  text-decoration: none;
  line-height: 1.5;
  gap: 4px;
}

.link {
  color: #1e2124;
  text-decoration: underline;
  transition: background-color 0.2s;
}

.link:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.current {
  color: #565e66; /* 현재 페이지는 다른 색으로 표시 */
  font-weight: 600;
}

.icon {
  width: 16px;
  height: 16px;
}

.separator {
  width: 16px;
  height: 16px;
  color: #b1b8be; /* 구분자 색상 */
}
</style>
