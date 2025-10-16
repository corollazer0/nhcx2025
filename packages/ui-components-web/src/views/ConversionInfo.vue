<template>
  <div
    class="conversion-info"
    data-testid="conversion-info"
  >
    <!-- Header Navigation + Progress -->
    <div class="conversion-info__header">
      <Navigation
        :previous="true"
        :title="true"
        title1="청약가입"
        :cs="false"
        :cancel="true"
        @previous="handlePrevious"
        @cancel="handleCancel"
      />
      <Progress
        :ratio="0.1"
        :show-animation="false"
        size="md"
        color="green"
      />
    </div>

    <!-- Main Content -->
    <div class="conversion-info__content">
      <!-- Page Title -->
      <PageTitle
        :title-text="pageTitleText"
        :sub-title="false"
        align="left"
        class="conversion-info__page-title"
      />

      <!-- CardList - 청약통장 정보 -->
      <div class="conversion-info__card-wrapper">
        <CardList
          :items="summaryItems"
          size="sm"
          class="conversion-info__card-list"
        />
      </div>

      <!-- Notice Accordion - 알아두세요 -->
      <Accordion
        title="알아두세요"
        :divider="true"
        :state="noticeState"
        :items="noticeItems"
        type="3line"
        class="conversion-info__notice"
        @toggle="handleNoticeToggle"
        @open="handleNoticeOpen"
        @close="handleNoticeClose"
      />
    </div>

    <!-- CTA Button -->
    <div class="conversion-info__cta">
      <Cta
        type="basic"
        ratio="cta-full"
        primary-text="다음"
        @primary-click="handleNextClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navigation from '../components/Navigation.vue';
import Progress from '../components/Progress.vue';
import PageTitle from '../components/PageTitle.vue';
import CardList from '../components/CardList.vue';
import Accordion from '../components/Accordion.vue';
import Cta from '../components/Cta.vue';

// Page state management
const noticeState = ref<'open' | 'close'>('close');

// Page title
const pageTitleText = `보유한 청약통장으로
전환가입을 진행할게요`;

// Summary data - 청약통장 정보
const summaryItems = ref([
  { title: '종류', data: '&상품명&' },
  { title: '납입회차', data: '10회' },
  { title: '납입금액', data: '1,000,000원' },
  { title: '순위기산일\n(국민주택)', data: '2024.03.24' },
  { title: '순위기산일\n(민영주택)', data: '2024.03.24' },
  { title: '납입인정\n회차\n(국민주택)', data: '4회' },
  { title: '납입인정\n금액\n(국민주택)', data: '900,000원원' },
  { title: '전환 해지 여부', data: '완료' }
]);

// Notice accordion data - 알아두세요
const noticeItems = ref([
  {
    title: '전환해지 원금 전액을 납입함으로써, 기존 청약통장의 가입 및 납입 내역은 유지됩니다.',
    type: 'bullet' as const
  },
  {
    title: '전환 가입 후, 순위 기산일은 접수하는 주택의 유형에 따라 다릅니다.',
    type: 'bullet' as const
  },
  {
    title: '전환 가입 후, 순위 기산일은 접수하는 주택의 유형에 따라 다릅니다.',
    type: 'bullet' as const
  }
]);

// Event handlers for navigation
const handlePrevious = (event: MouseEvent | KeyboardEvent) => {
  console.log('Previous clicked:', event);
  // Navigate to previous page
};

const handleCancel = (event: MouseEvent | KeyboardEvent) => {
  console.log('Cancel clicked:', event);
  // Handle cancel action - could navigate to home or show confirmation dialog
};

// Event handlers for notice accordion
const handleNoticeToggle = (isOpen: boolean) => {
  noticeState.value = isOpen ? 'open' : 'close';
  console.log('Notice toggled:', isOpen);
};

const handleNoticeOpen = () => {
  console.log('Notice opened');
};

const handleNoticeClose = () => {
  console.log('Notice closed');
};

// Event handler for CTA
const handleNextClick = (event: MouseEvent) => {
  console.log('Next button clicked:', event);
  // Navigate to next step
  // Could proceed to next page in the subscription flow
};
</script>

<style scoped>
/* Design tokens matching Figma Frame "3" exactly */
.conversion-info {
  --color-bg-default: #ffffff;
  --color-border-line-2: #e1e1e1;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --border-radius-16: 16px;

  background-color: var(--color-bg-default);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-32);
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Header section - Navigation + Progress (::Wrapper in Figma) */
.conversion-info__header {
  background-color: var(--color-bg-default);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  width: 100%;
  max-width: 360px;
}

/* Main content area - matches Figma layout exactly */
.conversion-info__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-32);
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-width: 360px;
  padding: 0 var(--spacing-24);
  box-sizing: border-box;
  flex: 1;
}

/* Page title styling - 312px width as per Figma */
.conversion-info__page-title {
  width: 312px;
  flex-shrink: 0;
}

/* CardList wrapper - with gray background matching Figma */
.conversion-info__card-wrapper {
  background-color: #f6f6f6;
  border-radius: 16px;
  padding: 20px;
  width: 312px;
  flex-shrink: 0;
}

.conversion-info__card-list {
  width: 100%;
}

/* Notice accordion styling - full width extending beyond content padding */
.conversion-info__notice {
  width: 100%;
  max-width: 360px;
  margin: 0 -24px; /* Extend to full width of Frame */
}

/* CTA button styling - matches Figma exactly */
.conversion-info__cta {
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  flex-shrink: 0;
  width: 100%;
  max-width: 360px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .conversion-info {
    --spacing-24: 16px;
    --spacing-32: 24px;
  }

  .conversion-info__content {
    padding: 0 var(--spacing-24);
  }

  .conversion-info__page-title,
  .conversion-info__summary {
    width: 100%;
    max-width: calc(100% - 32px);
  }

  .conversion-info__cta {
    padding: 0 var(--spacing-24);
  }
}

/* Desktop adjustments */
@media (min-width: 769px) {
  .conversion-info {
    max-width: 480px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .conversion-info {
    --color-bg-default: #1a1a1a;
    --color-border-line-2: #404040;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .conversion-info__summary {
    border-width: 2px;
  }
}

/* Print styles */
@media print {
  .conversion-info {
    background: white;
    color: black;
    box-shadow: none;
  }

  .conversion-info__cta {
    display: none;
  }

  .conversion-info__notice {
    margin: 0;
  }
}

/* Focus management for accessibility */
.conversion-info:focus-within {
  outline: none;
}

/* Animation for smooth transitions */
.conversion-info__content > * {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .conversion-info__content > * {
    animation: none;
  }

  @keyframes fadeInUp {
    from, to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
