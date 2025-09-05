<template>
  <div 
    class="empty"
    :class="emptyClasses"
    data-testid="empty"
  >
    <div class="empty__container">
      <!-- Icon Section -->
      <div 
        v-if="iconNoData"
        class="empty__icon-wrapper"
        data-testid="empty-icon"
      >
        <div class="empty__icon">
          <img 
            :src="currentIcon" 
            alt=""
            role="presentation"
            class="empty__icon-image"
          />
        </div>
      </div>
      
      <!-- Text Section -->
      <div class="empty__text" data-testid="empty-text">
        <p 
          v-if="prop2Line"
          class="empty__message"
          data-testid="empty-message"
        >
          {{ message }}
        </p>
      </div>
    </div>
    
    <!-- Dashed border overlay -->
    <div class="empty__border" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// SVG icon assets
const noDataIconDefault = 'http://localhost:3845/assets/dce70583c834e69711fcea795eac3fa7de33b34a.svg';
const noDataIconLarge = 'http://localhost:3845/assets/b0c5fe50850ecc288d8aed808cd785edd311050f.svg';

interface EmptyProps {
  // Figma properties mapped to Vue props
  prop1Line?: boolean;
  prop2Line?: boolean;
  textButton?: boolean;
  iconNoData?: boolean;
  
  // Additional props for customization
  message?: string;
  
  // Style variant props
  variant?: 'default' | 'large';
  iconSize?: 'small' | 'large';
  fontSize?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<EmptyProps>(), {
  prop1Line: false,
  prop2Line: true,
  textButton: false,
  iconNoData: true,
  message: '조회 결과가 없습니다.',
  variant: 'default',
  iconSize: 'small',
  fontSize: 'small',
});

// Event definitions
const emit = defineEmits<{
  // Future events if needed
}>();

// Computed properties
const emptyClasses = computed(() => [
  'empty--default',
  `empty--${props.variant}`,
  `empty--icon-${props.iconSize}`,
  `empty--font-${props.fontSize}`,
]);

const currentIcon = computed(() => {
  return props.iconSize === 'large' ? noDataIconLarge : noDataIconDefault;
});
</script>

<style scoped>
/* Design tokens from Figma variables */
.empty {
  --color-icon-gray400: #d3d3d3;
  --color-icon-gray50: #ffffff;
  --color-text-font-3: #505050;
  --color-border-primary: #00845c;
  --color-bg-primary-light: rgba(0, 132, 92, 0.01);
  --font-family-pretendard: "Pretendard", sans-serif;
  --border-radius-40: 40px;
  --spacing-24: 24px;
  --spacing-16: 16px;
  --spacing-12: 12px;

  position: relative;
  width: 100%;
  height: 400px; /* 고정 높이 설정 */
  min-height: 200px; /* 최소 높이 보장 */
  background-color: var(--color-bg-primary-light);
  border-radius: var(--border-radius-40);
  box-sizing: border-box;
  overflow: hidden;
}

/* Variant styles */
.empty--large {
  height: 480px;
  min-height: 300px;
}

.empty--large .empty__container {
  gap: 24px;
  padding: 48px 24px;
}

.empty__container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 312px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-24);
  box-sizing: border-box;
}

.empty__icon-wrapper {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
}

.empty__icon {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

/* Icon size variants */
.empty--icon-large .empty__icon {
  width: 56px;
  height: 56px;
}

.empty__icon-image {
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: contain;
}

.empty__text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-12);
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  width: 100%;
}

.empty__message {
  font-family: var(--font-family-pretendard);
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.28px;
  color: var(--color-text-font-3);
  margin: 0;
  width: 100%;
  position: relative;
  flex-shrink: 0;
}

/* Font size variants */
.empty--font-medium .empty__message {
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.32px;
}

.empty--font-large .empty__message {
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  font-weight: 500;
}

.empty__border {
  position: absolute;
  inset: 0;
  border: 1px dashed var(--color-border-primary);
  border-radius: var(--border-radius-40);
  pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .empty {
    height: 300px;
  }
  
  .empty__container {
    width: 280px;
    padding: 20px;
    gap: 14px;
  }
  
  .empty__icon {
    width: 36px;
    height: 36px;
  }
  
  .empty__message {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.26px;
  }
}

@media (max-width: 480px) {
  .empty {
    height: 200px;
  }
  
  .empty__container {
    width: 240px;
    padding: 16px;
    gap: 12px;
  }
  
  .empty__icon {
    width: 32px;
    height: 32px;
  }
  
  .empty__message {
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.24px;
  }
}
</style>