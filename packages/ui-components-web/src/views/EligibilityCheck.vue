<template>
  <div
    class="eligibility-check"
    data-testid="eligibility-check"
  >
    <!-- Header Navigation -->
    <div class="eligibility-check__header">
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
    <div class="eligibility-check__content">
      <!-- Page Title -->
      <PageTitle
        title-text="가입자격을 확인해 주세요"
        :sub-title="false"
        align="left"
        class="eligibility-check__page-title"
      />

      <!-- Information Box -->
      <Infobox
        :title-text="''"
        type="onlyBody"
        :body-items="infoboxItems"
        class="eligibility-check__infobox"
        @click="handleInfoboxClick"
      />

      <!-- Link Buttons -->
      <div class="eligibility-check__links">
        <div class="eligibility-check__link-item">
          <Link
            text="홈택스 바로가기"
            :disabled="false"
            @click="handleHometaxClick"
          />
        </div>
        <div class="eligibility-check__link-item">
          <Link
            text="정부 24바로가기"
            :disabled="false"
            @click="handleGov24Click"
          />
        </div>
      </div>

      <!-- Terms Section -->
      <Terms
        title="전환 가입 절차안내"
        :state="termsState"
        :checked="termsChecked"
        :show-arrow="true"
        :items="termsItems"
        class="eligibility-check__terms"
        @update:checked="handleTermsChecked"
        @update:state="handleTermsState"
        @arrow-click="handleTermsArrowClick"
        @header-click="handleTermsHeaderClick"
      />

      <!-- Notice Accordion -->
      <Accordion
        title="알아두세요"
        :divider="true"
        :state="noticeState"
        :items="noticeItems"
        type="2line"
        class="eligibility-check__notice"
        @toggle="handleNoticeToggle"
        @open="handleNoticeOpen"
        @close="handleNoticeClose"
      />
    </div>

    <!-- CTA Button -->
    <div class="eligibility-check__cta">
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
import { ref, reactive } from 'vue';
import Navigation from '../components/Navigation.vue';
import Progress from '../components/Progress.vue';
import PageTitle from '../components/PageTitle.vue';
import Infobox from '../components/Infobox.vue';
import Link from '../components/Link.vue';
import Terms from '../components/Terms.vue';
import Accordion from '../components/Accordion.vue';
import Cta from '../components/Cta.vue';

// Page state management
const termsState = ref<'open' | 'close'>('close');
const termsChecked = ref(false);
const noticeState = ref<'open' | 'close'>('close');

// Infobox data
const infoboxItems = ref([
  '1. 무주택자',
  '2. 만 19~34세 (병역복무기간 최대 6년 인정)',
  '3. 소득(근로·사업·기타)이 5,000만원 이하',
  '소득 : 소득세법상 직전년도 기준 신고소득',
  '아래의 경우는 영업점에서 가입할 수 있습니다.\n증빙서류를 가지고 방문해 주세요.',
  '• 병역복무기간(최대 6년) 차감 후 가입대상',
  '• 비과세 소득만 있는 군인'
]);

// Terms data
const termsItems = ref([
  {
    text: '청년주택드림청약통장으로 전환을 하기 위해서는 기존 주택청약종합저축 계좌의 전환 해지가 우선되어야 합니다.',
    checked: false,
    disabled: false,
    showArrow: false,
    type: 'bullet' as const
  },
  {
    text: '소득공제 대상이시라면 주택청약종합저축 계좌에 소득공제를 먼저 등록하고 상품 전환을 진행해주세요.',
    checked: false,
    disabled: false,
    showArrow: false,
    type: 'bullet' as const
  },
  {
    text: '전환해지 후에는 해지 취소를 할 수 없습니다.',
    checked: false,
    disabled: false,
    showArrow: false,
    type: 'bullet' as const
  }
]);

// Notice accordion data
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
  // Handle cancel action
};

// Event handlers for content interactions
const handleInfoboxClick = (event: MouseEvent) => {
  console.log('Infobox clicked:', event);
};

const handleHometaxClick = (event: MouseEvent) => {
  console.log('Hometax link clicked:', event);
  // Open Hometax website
  window.open('https://www.hometax.go.kr', '_blank');
};

const handleGov24Click = (event: MouseEvent) => {
  console.log('Gov24 link clicked:', event);
  // Open Gov24 website
  window.open('https://www.gov.kr', '_blank');
};

// Event handlers for terms
const handleTermsChecked = (checked: boolean) => {
  termsChecked.value = checked;
  console.log('Terms checked:', checked);
};

const handleTermsState = (state: 'open' | 'close') => {
  termsState.value = state;
  console.log('Terms state:', state);
};

const handleTermsArrowClick = () => {
  console.log('Terms arrow clicked');
};

const handleTermsHeaderClick = () => {
  console.log('Terms header clicked');
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
  // Validate form or proceed to next page
};
</script>

<style scoped>
/* Design tokens matching Figma Frame */
.eligibility-check {
  --color-bg-default: #ffffff;
  --color-bg-gray: #f6f6f6;
  --spacing-24: 24px;
  --spacing-32: 32px;

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

/* Header section with navigation and progress */
.eligibility-check__header {
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

/* Main content area */
.eligibility-check__content {
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

/* Page title styling */
.eligibility-check__page-title {
  width: 312px;
}

/* Infobox styling */
.eligibility-check__infobox {
  width: 312px;
}

/* Link buttons container */
.eligibility-check__links {
  background-color: var(--color-bg-default);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

.eligibility-check__link-item {
  background-color: var(--color-bg-default);
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  gap: 8px;
  height: 56px;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 20px 16px 20px;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

/* Terms section styling */
.eligibility-check__terms {
  width: 312px;
}

/* Notice accordion styling */
.eligibility-check__notice {
  width: 100%;
  max-width: 360px;
  margin: 0 -24px; /* Extend to full width */
}

/* CTA button styling */
.eligibility-check__cta {
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
  .eligibility-check {
    --spacing-24: 16px;
    --spacing-32: 24px;
  }

  .eligibility-check__content {
    padding: 0 var(--spacing-24);
  }

  .eligibility-check__page-title,
  .eligibility-check__infobox,
  .eligibility-check__links,
  .eligibility-check__terms {
    width: 100%;
    max-width: calc(100% - 32px);
  }

  .eligibility-check__link-item {
    width: 100%;
    padding: 12px 16px;
  }

  .eligibility-check__cta {
    padding: 10px var(--spacing-24) 24px var(--spacing-24);
  }
}

/* Desktop adjustments */
@media (min-width: 769px) {
  .eligibility-check {
    max-width: 480px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .eligibility-check {
    --color-bg-default: #1a1a1a;
    --color-bg-gray: #2a2a2a;
  }

  .eligibility-check__link-item {
    border-color: #404040;
    background-color: #2a2a2a;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .eligibility-check__link-item {
    border-width: 2px;
    border-color: #000000;
  }
}

/* Print styles */
@media print {
  .eligibility-check {
    background: white;
    color: black;
    box-shadow: none;
  }

  .eligibility-check__cta {
    display: none;
  }

  .eligibility-check__notice {
    margin: 0;
  }
}

/* Focus management for accessibility */
.eligibility-check:focus-within {
  outline: none;
}

/* Animation for smooth transitions */
.eligibility-check__content > * {
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
  .eligibility-check__content > * {
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