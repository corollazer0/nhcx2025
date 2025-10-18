import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Views
import EligibilityCheck from '../views/EligibilityCheck.vue';
import SubscriptionEligibility from '../views/SubscriptionEligibility.vue';
import ConversionInfo from '../views/ConversionInfo.vue';
import ConversionNotice from '../views/ConversionNotice.vue';
import ScrapingTerms from '../views/ScrapingTerms.vue';
import SubscriptionCancellationConfirmation from '../views/SubscriptionCancellationConfirmation.vue';
import TermsAgreement from '../views/TermsAgreement.vue';
import HousingPolicySelection from '../views/HousingPolicySelection.vue';
import RegionPickerBottomSheet from '../views/RegionPickerBottomSheet.vue';
import SubscriptionSetup from '../views/SubscriptionSetup.vue';
import SubscriptionAmountInput from '../views/SubscriptionAmountInput.vue';
import AutoTransferSetup from '../views/AutoTransferSetup.vue';
import TaxTypeSelection from '../views/TaxTypeSelection.vue';
import ContractDeliverySelection from '../views/ContractDeliverySelection.vue';
import AdditionalInfoSelection from '../views/AdditionalInfoSelection.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: '홈',
      description: '컴포넌트 라이브러리 홈',
    },
  },
  {
    path: '/eligibility-check',
    name: 'EligibilityCheck',
    component: EligibilityCheck,
    meta: {
      title: '가입자격 확인',
      description: '청약가입 가입자격을 확인하는 페이지',
    },
  },
  {
    path: '/subscription-eligibility',
    name: 'SubscriptionEligibility',
    component: SubscriptionEligibility,
    meta: {
      title: '청약가입 자격확인',
      description: '청년주택드림청약통장 가입자격을 확인하는 페이지',
    },
  },
  {
    path: '/conversion-info',
    name: 'ConversionInfo',
    component: ConversionInfo,
    meta: {
      title: '전환정보',
      description: '보유한 청약통장으로 전환가입을 진행하는 페이지',
    },
  },
  {
    path: '/conversion-notice',
    name: 'ConversionNotice',
    component: ConversionNotice,
    meta: {
      title: '전환 가입 유의사항',
      description: '전환 가입 시 유의사항을 확인하는 페이지',
    },
  },
  {
    path: '/scraping-terms',
    name: 'ScrapingTerms',
    component: ScrapingTerms,
    meta: {
      title: '스크래핑 약관 동의',
      description: '스크래핑 약관에 동의하는 페이지',
    },
  },
  {
    path: '/subscription-cancellation-confirmation',
    name: 'SubscriptionCancellationConfirmation',
    component: SubscriptionCancellationConfirmation,
    meta: {
      title: '청약해지 예상 금액 확인',
      description: '청약해지 예상 금액을 확인하는 페이지',
    },
  },
  {
    path: '/terms-agreement',
    name: 'TermsAgreement',
    component: TermsAgreement,
    meta: {
      title: '약관 동의',
      description: '청약가입 약관에 동의하는 페이지',
    },
  },
  {
    path: '/housing-policy-selection',
    name: 'HousingPolicySelection',
    component: HousingPolicySelection,
    meta: {
      title: '주택공급 정책 선택',
      description: '주택공급 정책 활용을 위한 지역 선택 페이지',
    },
  },
  {
    path: '/region-picker',
    name: 'RegionPickerBottomSheet',
    component: RegionPickerBottomSheet,
    meta: {
      title: '지역 선택',
      description: '희망 지역을 선택하는 바텀시트 피커',
    },
  },
  {
    path: '/subscription-setup',
    name: 'SubscriptionSetup',
    component: SubscriptionSetup,
    meta: {
      title: '청약 설정',
      description: '주소 확인 및 가입금액 설정 페이지',
    },
  },
  {
    path: '/subscription-amount-input',
    name: 'SubscriptionAmountInput',
    component: SubscriptionAmountInput,
    meta: {
      title: '가입금액 입력',
      description: '청약 가입금액을 입력하는 페이지',
    },
  },
  {
    path: '/auto-transfer-setup',
    name: 'AutoTransferSetup',
    component: AutoTransferSetup,
    meta: {
      title: '자동이체 설정',
      description: '자동이체 신청 및 설정을 진행하는 페이지',
    },
  },
  {
    path: '/tax-type-selection',
    name: 'TaxTypeSelection',
    component: TaxTypeSelection,
    meta: {
      title: '과세유형 선택',
      description: '청약통장 과세유형을 선택하는 페이지',
    },
  },
  {
    path: '/contract-delivery-selection',
    name: 'ContractDeliverySelection',
    component: ContractDeliverySelection,
    meta: {
      title: '계약서류 수신방법 선택',
      description: '계약서류를 받을 방법을 선택하는 페이지',
    },
  },
  {
    path: '/additional-info-selection',
    name: 'AdditionalInfoSelection',
    component: AdditionalInfoSelection,
    meta: {
      title: '추가정보 선택',
      description: '권유직원 선택 및 NH포인트 사용 신청을 위한 페이지',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 뒤로가기할 때 스크롤 위치 복원
    if (savedPosition) {
      return savedPosition;
    }
    // 새 페이지로 이동할 때 맨 위로
    return { top: 0 };
  },
});

// Navigation guards
router.beforeEach((to, from, next) => {
  // 페이지 타이틀 설정
  if (to.meta?.title) {
    document.title = `${to.meta.title} | UI Components`;
  } else {
    document.title = 'UI Components';
  }

  next();
});

router.afterEach((to, from) => {
  // 페이지 이동 후 추가 로직이 필요하면 여기에 추가
  console.log(`Navigated from ${from.path} to ${to.path}`);
});

export default router;
