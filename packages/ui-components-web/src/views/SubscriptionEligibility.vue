<template>
  <div
    class="subscription-eligibility"
    data-testid="subscription-eligibility"
  >
    <!-- Header Navigation + Progress -->
    <div class="subscription-eligibility__header">
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
    <div class="subscription-eligibility__content">
      <!-- Page Title -->
      <PageTitle
        title-text="가입자격을 확인해 주세요"
        :sub-title="false"
        align="left"
        class="subscription-eligibility__page-title"
      />

      <!-- Infobox - Eligibility Requirements -->
      <Infobox
        :title-text="''"
        type="onlyBody"
        :body-items="infoboxItems"
        class="subscription-eligibility__infobox"
      />

      <!-- Link - 기본약관 -->
      <div class="subscription-eligibility__link-wrapper">
        <Link
          text="기본약관"
          :disabled="false"
          @click="handleTermsClick"
        />
      </div>

      <!-- Notice Accordion - 알아두세요 -->
      <Accordion
        title="알아두세요"
        :divider="true"
        :state="noticeState"
        :items="noticeItems"
        type="2line"
        class="subscription-eligibility__notice"
        @toggle="handleNoticeToggle"
        @open="handleNoticeOpen"
        @close="handleNoticeClose"
      />
    </div>

    <!-- CTA Button -->
    <div class="subscription-eligibility__cta">
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
import Infobox from '../components/Infobox.vue';
import Link from '../components/Link.vue';
import Accordion from '../components/Accordion.vue';
import Cta from '../components/Cta.vue';

// Page state management
const noticeState = ref<'open' | 'close'>('close');

// Infobox data - 가입자격 정보
const infoboxItems = ref([
  '1. 무주택자',
  '2. 만 19~34세 (병역복무기간 최대 6년 인정)',
  '3. 소득(근로·사업·기타)이  5,000만원 이하   ',
  '소득 : 소득세법상 직전년도 기준 신고소득',
  '아래의 경우는 영업점에서 가입할 수 있습니다.\n증빙서류를 가지고 방문해 주세요.',
  '• 병역복무기간(최대 6년) 차감 후 가입대상',
  '• 비과세 소득만 있는 군인'
]);

// Notice accordion data - 알아두세요
const noticeItems = ref([
  {
    title: '소득은 국세청 홈택스, 세대주 여부는 정부24에서 스크래핑으로 자동 확인합니다.',
    type: 'bullet' as const
  },
  {
    title: '공동인증서를 이용하려면 국세청 홈택스와 정부24에 회원가입 후 공동인증서를 등록해 주세요.',
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

// Event handler for terms link
const handleTermsClick = (event: MouseEvent) => {
  console.log('Terms link clicked:', event);
  // Navigate to terms page or show terms modal
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
  // Could validate eligibility or proceed to next page
};
</script>

<style scoped>
/* Design tokens matching Figma Frame "2" exactly */
.subscription-eligibility {
  --color-bg-default: #ffffff;
  --color-border-line-2: #e1e1e1;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --border-radius-10: 10px;

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
.subscription-eligibility__header {
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
.subscription-eligibility__content {
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
.subscription-eligibility__page-title {
  width: 312px;
  flex-shrink: 0;
}

/* Infobox styling - 312px width as per Figma */
.subscription-eligibility__infobox {
  width: 312px;
  flex-shrink: 0;
}

/* Link wrapper - matches Figma's horizontal instance styling */
.subscription-eligibility__link-wrapper {
  background-color: var(--color-bg-default);
  border: 1px solid var(--color-border-line-2);
  border-radius: var(--border-radius-10);
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  height: 56px;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 20px 16px 16px;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

/* Notice accordion styling - full width extending beyond content padding */
.subscription-eligibility__notice {
  width: 100%;
  max-width: 360px;
  margin: 0 -24px; /* Extend to full width of Frame */
}

/* CTA button styling - matches Figma exactly */
.subscription-eligibility__cta {
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
  .subscription-eligibility {
    --spacing-24: 16px;
    --spacing-32: 24px;
  }

  .subscription-eligibility__content {
    padding: 0 var(--spacing-24);
  }

  .subscription-eligibility__page-title,
  .subscription-eligibility__infobox,
  .subscription-eligibility__link-wrapper {
    width: 100%;
    max-width: calc(100% - 32px);
  }

  .subscription-eligibility__link-wrapper {
    padding: 12px 16px;
  }

  .subscription-eligibility__cta {
    padding: 0 var(--spacing-24);
  }
}

/* Desktop adjustments */
@media (min-width: 769px) {
  .subscription-eligibility {
    max-width: 480px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .subscription-eligibility {
    --color-bg-default: #1a1a1a;
    --color-border-line-2: #404040;
  }

  .subscription-eligibility__link-wrapper {
    border-color: #404040;
    background-color: #2a2a2a;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .subscription-eligibility__link-wrapper {
    border-width: 2px;
    border-color: #000000;
  }
}

/* Print styles */
@media print {
  .subscription-eligibility {
    background: white;
    color: black;
    box-shadow: none;
  }

  .subscription-eligibility__cta {
    display: none;
  }

  .subscription-eligibility__notice {
    margin: 0;
  }
}

/* Focus management for accessibility */
.subscription-eligibility:focus-within {
  outline: none;
}

/* Animation for smooth transitions */
.subscription-eligibility__content > * {
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
  .subscription-eligibility__content > * {
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
