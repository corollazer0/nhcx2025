<script setup lang="ts">
// Router view를 사용하므로 기존 컴포넌트 import는 제거
</script>

<template>
  <div id="app">
    <!-- Router에서 관리하는 페이지들이 여기에 렌더링됩니다 -->
    <router-view />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
  font-family: 'Pretendard', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #121212;
  background-color: #ffffff;
}

/* 글로벌 스타일 재설정 */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

/* 반응형 컨테이너 */
@media (max-width: 768px) {
  #app {
    font-size: 14px;
  }
}

/* 다크 모드 지원 */
@media (prefers-color-scheme: dark) {
  #app {
    color: #ffffff;
    background-color: #1a1a1a;
  }
}
</style>
