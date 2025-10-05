<template>
  <div class="home">
    <div class="home__header">
      <h1 class="home__title">UI Components Library</h1>
      <p class="home__description">
        Vue 3 기반 UI 컴포넌트 라이브러리입니다.
      </p>
    </div>

    <div class="home__content">
      <div class="home__component-demo">
        <h2 class="home__section-title">컴포넌트 데모</h2>

        <!-- Breadcrumb Demo -->
        <div class="home__demo-section">
          <h3>Breadcrumb</h3>
          <Breadcrumb :items="breadcrumbItems" :max-visible-items="5" />
        </div>

        <!-- CTA Demo -->
        <div class="home__demo-section">
          <h3>CTA Button</h3>
          <Cta
            primary-text="가입하기"
            ratio="cta-5:5"
            secondary-text="취소"
            type="basic"
            @primary-click="handleCtaClick"
            @secondary-click="handleCtaClick"
          />
        </div>

        <!-- General List Demo -->
        <div class="home__demo-section">
          <h3>General List</h3>
          <GeneralList
            @purchase="handlePurchase"
            @close="handleClose"
            @item-click="handleItemClick"
          />
        </div>
      </div>

      <!-- Page Navigation -->
      <div class="home__navigation">
        <h2 class="home__section-title">페이지 목록</h2>
        <div class="home__page-list">
          <router-link
            to="/eligibility-check"
            class="home__page-link"
          >
            <div class="home__page-card">
              <h3 class="home__page-title">가입자격 확인</h3>
              <p class="home__page-description">
                청약가입 시 가입자격을 확인하는 페이지입니다.
              </p>
              <span class="home__page-route">/eligibility-check</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import GeneralList from '../components/GeneralList.vue'
import Cta from '../components/Cta.vue'

const breadcrumbItems = ref([
  { name: '홈', path: '/' },
  { name: '1Depth', path: '/1depth' },
  { name: '2Depth', path: '/1depth/2depth' },
  { name: '3Depth', path: '/1depth/2depth/3depth' },
  { name: '4Depth', path: '/1depth/2depth/3depth/4depth' },
  { name: '5Depth', path: '/1depth/2depth/3depth/4depth/5depth' },
])

// Event handlers
const handleCtaClick = (event: MouseEvent) => {
  console.log('CTA 버튼 클릭:', event)
}

const handlePurchase = (event: MouseEvent) => {
  console.log('구매 버튼 클릭:', event)
}

const handleClose = (event: MouseEvent) => {
  console.log('닫기 버튼 클릭:', event)
}

const handleItemClick = (item: any, index: number, event: MouseEvent | KeyboardEvent) => {
  console.log('리스트 아이템 클릭:', { item, index, eventType: event.constructor.name })
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.home__header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
}

.home__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #121212;
  margin: 0 0 16px 0;
  font-family: 'Pretendard', sans-serif;
}

.home__description {
  font-size: 1.2rem;
  color: #505050;
  margin: 0;
  font-family: 'Pretendard', sans-serif;
}

.home__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.home__section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #121212;
  margin: 0 0 24px 0;
  font-family: 'Pretendard', sans-serif;
}

.home__component-demo {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 24px;
}

.home__demo-section {
  margin-bottom: 32px;
}

.home__demo-section:last-child {
  margin-bottom: 0;
}

.home__demo-section h3 {
  font-size: 1.1rem;
  font-weight: 500;
  color: #121212;
  margin: 0 0 16px 0;
  font-family: 'Pretendard', sans-serif;
}

.home__navigation {
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 24px;
}

.home__page-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home__page-link {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease;
}

.home__page-link:hover {
  transform: translateY(-2px);
}

.home__page-card {
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;
}

.home__page-link:hover .home__page-card {
  border-color: #19973c;
  box-shadow: 0 4px 12px rgba(25, 151, 60, 0.1);
}

.home__page-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #121212;
  margin: 0 0 8px 0;
  font-family: 'Pretendard', sans-serif;
}

.home__page-description {
  font-size: 0.95rem;
  color: #505050;
  line-height: 1.5;
  margin: 0 0 12px 0;
  font-family: 'Pretendard', sans-serif;
}

.home__page-route {
  font-size: 0.9rem;
  color: #19973c;
  font-weight: 500;
  font-family: 'Courier New', monospace;
  background: #f0f9f3;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
}

/* Responsive design */
@media (max-width: 768px) {
  .home {
    padding: 16px;
  }

  .home__content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .home__title {
    font-size: 2rem;
  }

  .home__description {
    font-size: 1rem;
  }

  .home__component-demo,
  .home__navigation {
    padding: 16px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .home__component-demo {
    background: #2a2a2a;
  }

  .home__navigation {
    background: #1a1a1a;
    border-color: #404040;
  }

  .home__page-card {
    background: #1a1a1a;
    border-color: #404040;
  }

  .home__title,
  .home__section-title,
  .home__page-title {
    color: #ffffff;
  }

  .home__description,
  .home__page-description {
    color: #b0b0b0;
  }
}
</style>