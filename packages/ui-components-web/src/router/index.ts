import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

// Views
import EligibilityCheck from '../views/EligibilityCheck.vue';

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
