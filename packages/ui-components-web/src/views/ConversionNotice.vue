<template>
  <div
    class="conversion-notice"
    data-testid="conversion-notice"
  >
    <!-- Header Navigation + Progress (::Wrapper) -->
    <div class="conversion-notice__header">
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
        :ratio="0.4"
        :show-animation="false"
        size="md"
        color="green"
      />
    </div>

    <!-- Page Title -->
    <div class="conversion-notice__page-title">
      <PageTitle
        title-text="전환 가입 유의사항을 확인해 주세요"
        :sub-title="false"
        align="left"
      />
    </div>

    <!-- Notice Section -->
    <div class="conversion-notice__notice">
      <h2 class="conversion-notice__notice-title">전환 가입 시 유의사항 확인</h2>
      <div class="conversion-notice__notice-body">
        <!-- First bullet with green highlights -->
        <Bullet type="1depth">
          <span class="highlight">국민주택</span>의 경우, <span class="highlight">전환 해지한 기존으로 납입인정</span>되며 <span class="highlight">해당 금액만 인정</span>됩니다.
        </Bullet>

        <!-- Second bullet with green highlights -->
        <Bullet type="1depth">
          미납, 지연납입, 선납계좌의 경우 납입인정 회차와 납입인정 금액에 차이가 발생할 수 있으며, <span class="highlight">전환 신규 후 스케줄</span>이 다를 수 있으므로 <span class="highlight">전환 신규 후 꼭 스케줄을 확인</span>해주세요.
        </Bullet>

        <!-- Third bullet with green highlight -->
        <Bullet type="1depth">
          전환 해지원금 전액을 사용하여 <span class="highlight">전환 신규를 하지 않으면 가입을 취소할 수 없다는 내용</span>에 동의합니다.
        </Bullet>
      </div>
    </div>

    <!-- Checkbox Agreement -->
    <div class="conversion-notice__agreement">
      <Checkbox
        v-model="isAgreed"
        size="sm"
        :state="isAgreed ? 'selected' : 'default'"
        :show-text="true"
        text="위 내용을 충분히 이해하고 확인했으며, 전환 신규 가입 후에는 가입을 취소할 수 없다는 내용에 동의합니다."
        @change="handleAgreementChange"
      />
    </div>

    <!-- Spacer -->
    <div class="conversion-notice__spacer" />

    <!-- CTA Button -->
    <div class="conversion-notice__cta">
      <Cta
        type="basic"
        ratio="cta-full"
        primary-text="다음"
        :primary-disabled="!isAgreed"
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
import Bullet from '../components/Bullet.vue';
import Checkbox from '../components/Checkbox.vue';
import Cta from '../components/Cta.vue';

// Page state management
const isAgreed = ref(false);

// Event handlers for navigation
const handlePrevious = (event: MouseEvent | KeyboardEvent) => {
  console.log('Previous clicked:', event);
  // Navigate to previous page in the conversion flow
};

const handleCancel = (event: MouseEvent | KeyboardEvent) => {
  console.log('Cancel clicked:', event);
  // Handle cancel action - could navigate to home or show confirmation dialog
};

// Event handler for checkbox
const handleAgreementChange = (event: Event, value: boolean) => {
  console.log('Agreement changed:', value);
  isAgreed.value = value;
};

// Event handler for CTA
const handleNextClick = (event: MouseEvent) => {
  if (!isAgreed.value) {
    return;
  }
  console.log('Next button clicked:', event);
  // Navigate to next step in the conversion flow
};
</script>

<style scoped>
/* Design tokens matching Figma Frame "4" exactly */
.conversion-notice {
  --color-bg-default: #ffffff;
  --color-text-font-1: #121212;
  --color-text-font-3: #505050;
  --color-text-point: #19973c;
  --color-border-default: #707070;
  --spacing-24: 24px;
  --spacing-32: 32px;

  background-color: var(--color-bg-default);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-32);
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/* Header section - Navigation + Progress (::Wrapper in Figma) */
.conversion-notice__header {
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
.conversion-notice__page-title {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

/* Notice section - x=24, y=168, width=312, height=226 */
.conversion-notice__notice {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

/* Notice title - matching Figma exactly */
.conversion-notice__notice-title {
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-style: normal;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  color: var(--color-text-font-1);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 38px;
  width: 212px;
  flex-shrink: 0;
}

/* Notice body - list container, width=304 */
.conversion-notice__notice-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 304px;
}

/* Green highlight for important text in bullets */
.conversion-notice__notice-body :deep(.highlight) {
  color: var(--color-text-point);
  font-weight: 400;
}

/* Agreement checkbox - x=24, y=426, width=312, height=72 */
.conversion-notice__agreement {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  flex-shrink: 0;
  width: 312px;
}

/* Override checkbox styles for proper text wrapping and left alignment */
.conversion-notice__agreement :deep(.checkbox) {
  align-items: flex-start;
  width: 100%;
}

.conversion-notice__agreement :deep(.checkbox__text) {
  width: 280px;
  flex: 1;
  min-width: 0;
  text-align: left;
}

.conversion-notice__agreement :deep(.checkbox__text span) {
  white-space: normal;
  word-wrap: break-word;
  line-height: 24px;
  text-align: left;
  display: block;
}

/* Spacer - x=0, y=530, width=360, height=100 */
.conversion-notice__spacer {
  flex-basis: 0;
  flex-grow: 1;
  min-height: 1px;
  min-width: 1px;
  flex-shrink: 0;
  width: 360px;
}

/* CTA button - x=0, y=662, width=360, height=98 */
.conversion-notice__cta {
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

/* Responsive adjustments */
@media (max-width: 480px) {
  .conversion-notice {
    --spacing-24: 16px;
    --spacing-32: 24px;
  }

  .conversion-notice__page-title,
  .conversion-notice__notice,
  .conversion-notice__agreement {
    width: 100%;
    max-width: calc(100% - 32px);
  }

  .conversion-notice__notice-body {
    width: 100%;
  }

  .conversion-notice__cta,
  .conversion-notice__spacer {
    width: 100%;
  }
}

/* Desktop adjustments */
@media (min-width: 769px) {
  .conversion-notice {
    max-width: 480px;
    margin: 0 auto;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .conversion-notice {
    --color-bg-default: #1a1a1a;
    --color-text-font-1: #ffffff;
    --color-text-font-3: #b0b0b0;
  }

  .conversion-notice__cta {
    background: linear-gradient(180deg, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 0.99) 10.51%, #1a1a1a 89.796%);
  }
}

/* Print styles */
@media print {
  .conversion-notice {
    background: white;
    color: black;
    box-shadow: none;
  }

  .conversion-notice__cta {
    display: none;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
