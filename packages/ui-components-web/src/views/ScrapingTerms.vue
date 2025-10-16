<template>
  <div
    class="scraping-terms"
    data-testid="scraping-terms"
  >
    <!-- Header Navigation + Progress (::Wrapper) -->
    <div class="scraping-terms__header">
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

    <!-- Page Title -->
    <div class="scraping-terms__page-title">
      <PageTitle
        title-text="스크래핑 약관에 동의해 주세요"
        :sub-title="false"
        align="left"
      />
    </div>

    <!-- Terms Component -->
    <div class="scraping-terms__terms">
      <Terms
        title="[필수] 전체 동의"
        :state="termsState"
        :checked="allAgreed"
        :show-arrow="true"
        :items="termsItems"
        @update:checked="handleAllAgreementChange"
        @update:state="handleTermsStateChange"
        @item-check="handleItemCheck"
        @item-arrow-click="handleItemArrowClick"
      />
    </div>

    <!-- Accordion Box (유의사항) -->
    <div class="scraping-terms__notice">
      <Accordion
        title="유의사항"
        :divider="false"
        :state="accordionState"
        :items="noticeItems"
        type="5line"
        @toggle="handleAccordionToggle"
      />
    </div>

    <!-- Body List (상세 유의사항) -->
    <div class="scraping-terms__body-list">
      <Bullet type="1depth">
        가입 자격 확인을 위해 간편인증 또는 공동인증서가 필요합니다.
      </Bullet>

      <Bullet type="2depth">
        간편인증 : 국세청 홈텍스, 정부24 각각 인증이 필요합니다.
      </Bullet>

      <Bullet type="2depth">
        공동인증서 : 국세청 홈텍스와 정부24에 회원가입 후 공동인증서를 등록해야 이용할 수 있습니다.
      </Bullet>

      <Bullet type="1depth">
        가입일 기준으로 1~6월은 전전년도 신고소득, 7~12월은 전년도 신고소득(소득확인증명서 기준)이 있어야 합니다.
      </Bullet>

      <Bullet type="1depth">
        <span>소득이 없으면 일반 주택청약종합저축을 가입할 수 있습니다.</span>
        <br>
        <span>단, 비과세 소득만 있는 군인은 증빙서류를 가지고 NH농협은행 영업점에서 가입해 주시기 바랍니다.</span>
      </Bullet>

      <!-- Button within bullet (주택청약종합저축 바로가기) -->
      <div class="scraping-terms__sub-button">
        <button
          class="scraping-terms__tertiary-btn"
          @click="handleNavigateToHousing"
        >
          주택청약종합저축 바로가기
        </button>
      </div>

      <Bullet type="1depth">
        가입 자격과 비과세 자격은 다릅니다. 조건에 따라 신청 가능한 과세 유형이 달라질 수 있으니 약관과 상품설명서를 확인해 주시기 바랍니다. 비과세는 가입일부터 2년 내에 영업점에서 신청해야 합니다.
      </Bullet>

      <Bullet type="1depth">
        NH농협은행 주택청약종합저축을 이미 가입한 고객은 영업점에서 청년 주택드림 청약통장으로 전환 신규할 수 있습니다.
      </Bullet>
    </div>

    <!-- CTA Button -->
    <div class="scraping-terms__cta">
      <Cta
        type="basic"
        ratio="cta-full"
        primary-text="다음"
        :primary-disabled="!allAgreed"
        @primary-click="handleNextClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navigation from '../components/Navigation.vue';
import Progress from '../components/Progress.vue';
import PageTitle from '../components/PageTitle.vue';
import Terms from '../components/Terms.vue';
import Accordion from '../components/Accordion.vue';
import Bullet from '../components/Bullet.vue';
import Cta from '../components/Cta.vue';

// Page data interface
interface TermsItem {
  text: string;
  checked?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  type?: 'checkbox' | 'bullet';
}

interface NoticeItem {
  title?: string;
  data?: string;
  type?: 'basic' | 'bullet' | 'link';
}

// Page state management
const termsState = ref<'open' | 'close'>('close');
const accordionState = ref<'open' | 'close'>('open');

// Terms items
const termsItems = ref<TermsItem[]>([
  {
    text: '비여신) 개인(신용)정보 수집·이용 동의서(청년 주택드림 청약통장 자격 확인용)',
    checked: false,
    showArrow: true,
    type: 'checkbox'
  }
]);

// Notice items for accordion
const noticeItems = ref<NoticeItem[]>([]);

// Computed: Check if all items are agreed
const allAgreed = computed(() => {
  return termsItems.value.every(item => item.checked === true);
});

// Event handlers for navigation
const handlePrevious = (event: MouseEvent | KeyboardEvent) => {
  console.log('Previous clicked:', event);
  // Navigate to previous page
};

const handleCancel = (event: MouseEvent | KeyboardEvent) => {
  console.log('Cancel clicked:', event);
  // Handle cancel action
};

// Terms event handlers
const handleAllAgreementChange = (checked: boolean) => {
  console.log('All agreement changed:', checked);
  // Update all items
  termsItems.value.forEach(item => {
    item.checked = checked;
  });
};

const handleTermsStateChange = (state: 'open' | 'close') => {
  termsState.value = state;
};

const handleItemCheck = (index: number, checked: boolean) => {
  console.log('Item check changed:', index, checked);
  if (termsItems.value[index]) {
    termsItems.value[index].checked = checked;
  }
};

const handleItemArrowClick = (index: number) => {
  console.log('Item arrow clicked:', index);
  // Navigate to terms detail page
};

// Accordion event handlers
const handleAccordionToggle = (isOpen: boolean) => {
  accordionState.value = isOpen ? 'open' : 'close';
};

// Navigate to housing savings
const handleNavigateToHousing = () => {
  console.log('Navigate to housing savings');
  // Navigate to housing savings page
};

// CTA event handler
const handleNextClick = (event: MouseEvent) => {
  if (!allAgreed.value) {
    return;
  }
  console.log('Next button clicked:', event);
  // Navigate to next step
};
</script>

<style scoped>
/* Design tokens matching Figma Frame "5" exactly */
.scraping-terms {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-border-default: #e1e1e1;
  --color-border-line: #f0f0f0;
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

/* Header section - Navigation + Progress (::Wrapper in Figma) */
.scraping-terms__header {
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

/* Page title - x=24, y=104, width=312 */
.scraping-terms__page-title {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

/* Terms section - x=24, y=168, width=312, height=171 */
.scraping-terms__terms {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

/* Notice accordion - x=24, y=371, width=312, height=64 */
.scraping-terms__notice {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

/* Body list - x=28, y=467, width=304, height=596 */
.scraping-terms__body-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 304px;
  padding-left: 4px;
}

/* Sub button within body list */
.scraping-terms__sub-button {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  padding-left: 12px;
  position: relative;
  flex-shrink: 0;
}

.scraping-terms__tertiary-btn {
  background-color: var(--color-bg-default);
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-font-1);
  text-align: center;
  white-space: pre;
}

.scraping-terms__tertiary-btn:hover {
  background-color: #f9f9f9;
  border-color: #121212;
}

.scraping-terms__tertiary-btn:focus {
  outline: 2px solid var(--color-text-font-1);
  outline-offset: 2px;
}

.scraping-terms__tertiary-btn:active {
  transform: translateY(1px);
  background-color: #f0f0f0;
}

/* CTA button - x=0, y=1095, width=360, height=98 */
.scraping-terms__cta {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.99) 10.51%, #ffffff 89.796%);
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 24px 32px;
  position: relative;
  flex-shrink: 0;
  width: 360px;
}

/* Override deep styles for bullet components */
.scraping-terms__body-list :deep(.bullet-component) {
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .scraping-terms {
    --spacing-24: 16px;
    --spacing-32: 24px;
  }

  .scraping-terms__page-title,
  .scraping-terms__terms,
  .scraping-terms__notice {
    width: 100%;
    max-width: calc(100% - 48px);
  }

  .scraping-terms__body-list {
    width: 100%;
    max-width: calc(100% - 56px);
  }

  .scraping-terms__cta {
    width: 100%;
  }
}

/* Desktop adjustments */
@media (min-width: 769px) {
  .scraping-terms {
    max-width: 480px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .scraping-terms {
    --color-bg-default: #1a1a1a;
    --color-text-font-1: #ffffff;
    --color-text-font-3: #b0b0b0;
    --color-border-default: #404040;
  }

  .scraping-terms__cta {
    background: linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 0.99) 10.51%, #1a1a1a 89.796%);
  }

  .scraping-terms__tertiary-btn {
    border-color: #505050;
  }

  .scraping-terms__tertiary-btn:hover {
    background-color: #2a2a2a;
    border-color: #ffffff;
  }
}

/* Print styles */
@media print {
  .scraping-terms {
    background: white;
    color: black;
    box-shadow: none;
  }

  .scraping-terms__cta {
    display: none;
  }

  .scraping-terms__tertiary-btn {
    display: none;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }

  .scraping-terms__tertiary-btn {
    transition: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .scraping-terms__tertiary-btn {
    border-width: 2px;
  }
}
</style>
