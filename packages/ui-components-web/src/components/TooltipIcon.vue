<template>
  <div class="tooltip-icon">
    <img 
      src="../assets/ico_tooltip1_gray600_line_24.svg" 
      alt="tooltip"
      class="tooltip-icon__image"
    />
  </div>
</template>

<script setup lang="ts">
// Tooltip 아이콘 컴포넌트 (Figma ico_tooltip1_gray600_line_24 기반)
</script>

<style scoped>
.tooltip-icon {
  display: block;
  width: 24px;
  height: 24px;
  position: relative;
}

.tooltip-icon__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}
</style>