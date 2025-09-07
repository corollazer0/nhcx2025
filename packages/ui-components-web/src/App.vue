<script setup lang="ts">
import { onMounted, ref } from 'vue';

import Breadcrumb from './components/Breadcrumb.vue';
import GeneralList from './components/GeneralList.vue';
import GeneralListExample from './components/GeneralListExample.vue';
import Cta from './components/Cta.vue';

const breadcrumbItems = ref([
  { name: '홈', path: '/' },
  { name: '1Depth', path: '/1depth' },
  { name: '2Depth', path: '/1depth/2depth' },
  { name: '3Depth', path: '/1depth/2depth/3depth' },
  { name: '4Depth', path: '/1depth/2depth/3depth/4depth' },
  { name: '5Depth', path: '/1depth/2depth/3depth/4depth/5depth' },
]);

// GeneralList 이벤트 핸들러 함수들
const handlePurchase = (event: MouseEvent) => {
  console.log('구매 버튼 클릭:', event);
};

const handleClose = (event: MouseEvent) => {
  console.log('닫기 버튼 클릭:', event);
};

const handleItemClick = (item: any, index: number, event: MouseEvent | KeyboardEvent) => {
  console.log('리스트 아이템 클릭:', { item, index, eventType: event.constructor.name });
};
</script>

<template>
  <div>
    <HelloWorld msg="Vite + Vue" />
    <Breadcrumb :items="breadcrumbItems" :max-visible-items="5" />
    <Cta primaryText="가입하기" ratio="cta-5:5" secondaryText="취소" type="basic" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
