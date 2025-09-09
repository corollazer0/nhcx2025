<template>
  <div 
    class="account-list" 
    :class="accountListClasses"
    data-testid="account-list"
    @click="handleClick"
  >
    <div class="account-list__logo" data-testid="account-logo">
      <img 
        v-if="bankLogo"
        :src="bankLogo" 
        :alt="`${bankName} 로고`"
        class="account-list__logo-image"
      />
    </div>
    
    <div class="account-list__content" data-testid="account-content">
      <div class="account-list__bank-name">{{ bankName }}</div>
      <div class="account-list__account-number">{{ accountNumber }}</div>
    </div>
    
    <div 
      v-if="showFavorite" 
      class="account-list__favorite" 
      data-testid="account-favorite"
      @click="handleFavoriteClick"
    >
      <img 
        :src="favoriteIcon" 
        alt="즐겨찾기"
        class="account-list__favorite-icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface AccountListProps {
  bankName?: string;
  accountNumber?: string;
  bankLogo?: string;
  showFavorite?: boolean;
  favoriteIcon?: string;
  variant?: 'default';
}

const props = withDefaults(defineProps<AccountListProps>(), {
  bankName: '금융사명',
  accountNumber: '계좌번호',
  bankLogo: 'http://localhost:3845/assets/d211343cabb3cea7566ad778e07c3b57afd7ad67.svg',
  showFavorite: true,
  favoriteIcon: 'http://localhost:3845/assets/9c85a1f2dddc3006a7f4c2301f580f9cb71987ca.svg',
  variant: 'default'
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  favoriteClick: [event: MouseEvent];
}>();

const accountListClasses = computed(() => [
  `account-list--${props.variant}`
]);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};

const handleFavoriteClick = (event: MouseEvent) => {
  event.stopPropagation();
  emit('favoriteClick', event);
};
</script>

<style scoped>
.account-list {
  --color-text-primary: #121212;
  --color-text-secondary: #767676;
  --color-icon-gray: #707070;
  --font-family-pretendard: "Pretendard", sans-serif;
  --font-size-medium: 16px;
  --font-size-small: 14px;
  --font-weight-medium: 500;
  --font-weight-regular: 400;
  --line-height-medium: 24px;
  --line-height-small: 22px;
  --letter-spacing: -2%;
  --gap-medium: 12px;
  --gap-small: 4px;
  --logo-size: 40px;
  --icon-size: 24px;
  
  display: flex;
  align-items: center;
  gap: var(--gap-medium);
  width: 312px;
  height: 46px;
  cursor: pointer;
  user-select: none;
}

.account-list__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 0;
  flex-shrink: 0;
}

.account-list__logo-image {
  width: var(--logo-size);
  height: var(--logo-size);
  object-fit: cover;
  border-radius: 50%;
}

.account-list__content {
  display: flex;
  flex-direction: column;
  gap: var(--gap-small);
  flex-grow: 1;
  min-width: 0;
  align-items: flex-start;
  justify-content: flex-start;
}

.account-list__bank-name {
  font-family: var(--font-family-pretendard);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-medium);
  letter-spacing: var(--letter-spacing);
  color: var(--color-text-primary);
  width: 100%;
}

.account-list__account-number {
  font-family: var(--font-family-pretendard);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-small);
  letter-spacing: var(--letter-spacing);
  color: var(--color-text-secondary);
  width: 100%;
}

.account-list__favorite {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
}

.account-list__favorite-icon {
  width: var(--icon-size);
  height: var(--icon-size);
  object-fit: contain;
}

.account-list--default {
  /* Default variant styles - matches Figma design */
}

.account-list:hover {
  opacity: 0.8;
}

.account-list:active {
  opacity: 0.6;
}

.account-list__favorite:hover {
  opacity: 0.7;
}
</style>