# Badge 컴포넌트 개발자 가이드

## 📖 컴포넌트 개요

Badge 컴포넌트는 알림이나 카운트를 시각적으로 표시하는 작은 인디케이터입니다. Figma 디자인 시스템을 100% 재현하여 구현되었으며, 점 형태와 숫자 표시 두 가지 변형을 지원합니다.

### 주요 기능
- **2가지 변형**: dot(점 형태), count(숫자 표시)
- **2가지 크기**: sm, md
- **4가지 색상**: red, blue, green, gray
- **스마트 표시**: 0값 처리, 최대값 초과 시 "99+" 형태 표시
- **유연한 설정**: showZero 옵션, maxCount 설정 가능

## 📦 설치 및 Import

```vue
<script setup lang="ts">
import Badge from '@/components/Badge.vue';
</script>
```

## 📋 Props API

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `variant` | `'dot' \| 'count'` | `'dot'` | Badge의 형태 (점 또는 숫자) |
| `count` | `number` | `0` | count variant에서 표시할 숫자 |
| `maxCount` | `number` | `99` | 표시할 최대 숫자. 초과 시 "maxCount+" 형태로 표시 |
| `color` | `'red' \| 'blue' \| 'green' \| 'gray'` | `'red'` | Badge의 색상 |
| `size` | `'sm' \| 'md'` | `'md'` | Badge의 크기 |
| `showZero` | `boolean` | `false` | count가 0일 때도 badge를 표시할지 여부 |

### 변형별 상세 정보

#### Dot Variant
| Size | 크기 | 사용 사례 |
|------|------|-----------|
| `sm` | 6×6px | 작은 알림 표시, 상태 인디케이터 |
| `md` | 8×8px | 일반적인 알림 표시 |

#### Count Variant
| Size | 높이 | 최소 너비 | Padding | Font Size |
|------|------|-----------|---------|-----------|
| `sm` | 16px | 16px | 2px 4.5px | 10px |
| `md` | 18px | 18px | 2.5px 5.5px | 11px |

### 색상 정보

| Color | Hex Code | 사용 사례 |
|-------|----------|-----------|
| `red` | `#e24949` | 알림, 에러, 긴급 상태 |
| `blue` | `#4285f4` | 정보, 메시지 |
| `green` | `#19973c` | 성공, 완료 상태 |
| `gray` | `#6b7280` | 일반적인 상태, 보조 정보 |

## 🚀 기본 사용법

```vue
<template>
  <!-- 기본 dot badge -->
  <Badge />
  
  <!-- 색상 변경 -->
  <Badge color="blue" />
  
  <!-- 크기 변경 -->
  <Badge size="sm" color="green" />
  
  <!-- Count badge -->
  <Badge variant="count" :count="5" />
  
  <!-- 다양한 색상의 count badge -->
  <Badge variant="count" :count="12" color="blue" />
  
  <!-- 최대값 설정 -->
  <Badge variant="count" :count="150" :max-count="99" />
  
  <!-- 0 표시 옵션 -->
  <Badge variant="count" :count="0" :show-zero="true" />
</template>
```

## 💡 사용 사례별 예제

### 1. 내비게이션 메뉴 알림

```vue
<template>
  <nav class="navigation">
    <div class="nav-item">
      <span>메시지</span>
      <Badge 
        variant="count" 
        :count="unreadMessages" 
        color="red" 
        size="sm" 
      />
    </div>
    
    <div class="nav-item">
      <span>알림</span>
      <Badge 
        v-if="hasNewNotifications"
        variant="dot" 
        color="red" 
        size="sm" 
      />
    </div>
    
    <div class="nav-item">
      <span>장바구니</span>
      <Badge 
        variant="count" 
        :count="cartItemsCount" 
        color="blue" 
        size="md" 
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const unreadMessages = ref(3);
const notifications = ref([]);
const cartItems = ref([]);

const hasNewNotifications = computed(() => 
  notifications.value.some(n => !n.read)
);

const cartItemsCount = computed(() => 
  cartItems.value.length
);
</script>

<style scoped>
.navigation {
  display: flex;
  gap: 24px;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
```

### 2. 상태 인디케이터

```vue
<template>
  <div class="status-list">
    <div class="status-item">
      <Badge variant="dot" color="green" size="sm" />
      <span>온라인</span>
    </div>
    
    <div class="status-item">
      <Badge variant="dot" color="red" size="sm" />
      <span>새 업데이트 available</span>
    </div>
    
    <div class="status-item">
      <Badge variant="count" :count="pendingTasks" color="blue" size="sm" />
      <span>대기 중인 작업</span>
    </div>
    
    <div class="status-item">
      <Badge variant="dot" color="gray" size="sm" />
      <span>오프라인</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const pendingTasks = ref(5);
</script>

<style scoped>
.status-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
```

### 3. 카드 컴포넌트 내 뱃지

```vue
<template>
  <div class="product-card">
    <div class="card-header">
      <h3>프리미엄 플랜</h3>
      <Badge variant="dot" color="blue" />
    </div>
    
    <div class="card-body">
      <p>최고의 기능을 모두 이용하세요</p>
    </div>
    
    <div class="card-footer">
      <div class="notification-section">
        <span>알림</span>
        <Badge 
          variant="count" 
          :count="notifications" 
          color="red"
          :show-zero="false" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const notifications = ref(12);
</script>

<style scoped>
.product-card {
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.notification-section {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

### 4. 버튼과 뱃지 조합

```vue
<template>
  <div class="button-group">
    <!-- 버튼 위에 절대 위치 뱃지 -->
    <div class="button-with-badge">
      <Button text="메시지" @click="openMessages" />
      <Badge 
        v-if="unreadCount > 0"
        variant="count" 
        :count="unreadCount" 
        color="red" 
        size="sm"
        class="badge-overlay" 
      />
    </div>
    
    <!-- 버튼 옆에 인라인 뱃지 -->
    <div class="button-inline">
      <Button text="알림 설정" type="secondary" />
      <Badge 
        v-if="hasNewSettings"
        variant="dot" 
        color="blue" 
        size="sm" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';

const unreadCount = ref(3);
const hasNewSettings = ref(true);

const openMessages = () => {
  unreadCount.value = 0; // 메시지 열면 카운트 리셋
};
</script>

<style scoped>
.button-group {
  display: flex;
  gap: 16px;
  align-items: center;
}

.button-with-badge {
  position: relative;
  display: inline-block;
}

.badge-overlay {
  position: absolute;
  top: -4px;
  right: -4px;
  z-index: 10;
}

.button-inline {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
```

### 5. 동적 뱃지 관리

```vue
<template>
  <div class="dynamic-badges">
    <!-- 실시간 업데이트 뱃지 -->
    <div class="real-time-section">
      <h4>실시간 알림</h4>
      <Badge 
        :variant="badgeVariant" 
        :count="liveCount" 
        :color="badgeColor"
        :show-zero="showEmpty"
        :max-count="maxDisplayCount"
      />
    </div>
    
    <!-- 조건부 표시 뱃지 -->
    <div class="conditional-section">
      <span>새 기능</span>
      <Badge 
        v-show="shouldShowNewFeature"
        variant="dot" 
        color="green" 
        class="fade-transition"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const liveCount = ref(0);
const maxDisplayCount = ref(99);
const showEmpty = ref(false);
const shouldShowNewFeature = ref(true);

// 동적 badge variant 결정
const badgeVariant = computed(() => {
  return liveCount.value > 0 ? 'count' : 'dot';
});

// 동적 색상 결정
const badgeColor = computed(() => {
  if (liveCount.value > 50) return 'red';
  if (liveCount.value > 10) return 'blue';
  if (liveCount.value > 0) return 'green';
  return 'gray';
});

// 실시간 업데이트 시뮬레이션
onMounted(() => {
  const interval = setInterval(() => {
    liveCount.value = Math.floor(Math.random() * 150);
  }, 3000);

  onUnmounted(() => clearInterval(interval));
});
</script>

<style scoped>
.dynamic-badges {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.real-time-section,
.conditional-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.fade-transition {
  transition: opacity 0.3s ease;
}
</style>
```

## 🎨 스타일링 가이드

### CSS 클래스 구조

```css
.badge                    /* 기본 뱃지 클래스 */
├── .badge--dot          /* dot variant */
├── .badge--count        /* count variant */
├── .badge--red          /* red 색상 */
├── .badge--blue         /* blue 색상 */
├── .badge--green        /* green 색상 */
├── .badge--gray         /* gray 색상 */
├── .badge--sm           /* sm 크기 */
├── .badge--md           /* md 크기 */
└── .badge--show         /* 표시 상태 */

.badge__dot              /* dot 요소 */
.badge__count           /* count 컨테이너 */
└── .badge__count-text  /* count 텍스트 */
```

### 디자인 토큰

```css
/* 색상 토큰 */
--color-bg-badge-red: #e24949;
--color-bg-badge-blue: #4285f4;
--color-bg-badge-green: #19973c;
--color-bg-badge-gray: #6b7280;
--color-text-badge-white: #ffffff;

/* 크기 토큰 */
--border-radius-circle: 999px;
--font-pretendard-medium: 'Pretendard', sans-serif;
```

### 커스터마이징

```vue
<template>
  <!-- 커스텀 스타일 뱃지 -->
  <Badge class="custom-badge" variant="count" :count="5" />
  
  <!-- 애니메이션 뱃지 -->
  <Badge class="animated-badge" variant="dot" color="red" />
</template>

<style scoped>
.custom-badge {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.animated-badge {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

/* 위치 조정 유틸리티 클래스 */
.badge-top-right {
  position: absolute;
  top: -4px;
  right: -4px;
}

.badge-top-left {
  position: absolute;
  top: -4px;
  left: -4px;
}
</style>
```

### 반응형 디자인

```vue
<template>
  <Badge 
    :size="isMobile ? 'sm' : 'md'"
    variant="count" 
    :count="notifications"
  />
</template>

<style scoped>
/* 모바일에서 뱃지 크기 조정 */
@media (max-width: 480px) {
  :deep(.badge--md .badge__dot) {
    width: 6px;
    height: 6px;
  }
  
  :deep(.badge__count) {
    min-width: 16px;
    height: 16px;
    padding: 2px 4px;
  }
}
</style>
```

## ♿ 접근성 (Accessibility)

### 기본 접근성 기능

- **시맨틱 마크업**: 적절한 div 구조와 의미있는 클래스명
- **색상 접근성**: 충분한 명도 대비 제공
- **크기 접근성**: 터치 타겟 최소 크기 고려

### 접근성 개선 예제

```vue
<template>
  <!-- 스크린 리더를 위한 설명 추가 -->
  <div class="notification-item">
    <span>새 메시지</span>
    <Badge 
      variant="count" 
      :count="messageCount"
      :aria-label="`읽지 않은 메시지 ${messageCount}개`"
      role="status"
      aria-live="polite"
    />
  </div>
  
  <!-- 색상에만 의존하지 않는 정보 전달 -->
  <div class="status-item">
    <Badge variant="dot" color="red" />
    <span>오프라인 (연결 끊김)</span>
  </div>
  
  <!-- 시각적으로 숨겨진 텍스트로 추가 정보 제공 -->
  <div class="cart-icon">
    <span>장바구니</span>
    <Badge variant="count" :count="cartItems" />
    <span class="sr-only">장바구니에 {{ cartItems }}개 아이템</span>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

### 권장사항

```vue
<!-- ✅ 좋은 예 -->
<Badge variant="count" :count="unreadEmails" aria-label="읽지 않은 이메일" />
<Badge variant="dot" color="green" /> <span>온라인 상태</span>

<!-- ❌ 피해야 할 예 -->
<Badge variant="count" :count="5" /> <!-- 맥락 없는 숫자 -->
<Badge variant="dot" color="red" /> <!-- 색상으로만 의미 전달 -->
```

## 📋 사용 권장사항

### ✅ Do (권장)

1. **의미있는 숫자 표시**
   ```vue
   <Badge variant="count" :count="unreadNotifications" />
   <Badge variant="count" :count="cartItemsCount" />
   ```

2. **적절한 색상 선택**
   ```vue
   <!-- 에러/긴급: red -->
   <Badge variant="count" :count="errors" color="red" />
   
   <!-- 정보: blue -->
   <Badge variant="count" :count="messages" color="blue" />
   
   <!-- 성공/완료: green -->
   <Badge variant="dot" color="green" />
   
   <!-- 일반/보조: gray -->
   <Badge variant="dot" color="gray" />
   ```

3. **maxCount 설정으로 가독성 유지**
   ```vue
   <Badge variant="count" :count="largeNumber" :max-count="99" />
   ```

4. **조건부 표시**
   ```vue
   <Badge 
     v-if="shouldShowBadge" 
     variant="count" 
     :count="notificationCount" 
   />
   ```

### ❌ Don't (피해야 할 것)

1. **과도한 뱃지 사용**
   ```vue
   <!-- 피하세요: 너무 많은 뱃지 -->
   <div class="menu-item">
     <Badge variant="dot" color="red" />
     <Badge variant="count" :count="5" color="blue" />
     <Badge variant="dot" color="green" />
   </div>
   
   <!-- 대신 이렇게: 하나의 중요한 뱃지만 -->
   <div class="menu-item">
     <Badge variant="count" :count="totalNotifications" color="red" />
   </div>
   ```

2. **의미없는 0값 표시**
   ```vue
   <!-- 피하세요: 무의미한 0 표시 -->
   <Badge variant="count" :count="0" :show-zero="true" />
   
   <!-- 대신 이렇게: 의미가 있을 때만 -->
   <Badge 
     variant="count" 
     :count="downloadProgress" 
     :show-zero="isDownloading" 
   />
   ```

3. **색상으로만 정보 전달**
   ```vue
   <!-- 피하세요 -->
   <Badge variant="dot" color="red" />
   
   <!-- 대신 이렇게 -->
   <Badge variant="dot" color="red" />
   <span>오류 발생</span>
   ```

### 성능 최적화 팁

1. **조건부 렌더링 최적화**
   ```vue
   <template>
     <!-- v-if vs v-show 적절한 선택 -->
     <Badge v-if="count > 0" variant="count" :count="count" />
     <Badge v-show="showStatus" variant="dot" :color="statusColor" />
   </template>
   ```

2. **계산된 속성 활용**
   ```vue
   <script setup lang="ts">
   import { computed } from 'vue';
   
   const badgeCount = computed(() => {
     return items.value.filter(item => !item.read).length;
   });
   
   const badgeColor = computed(() => {
     if (badgeCount.value > 10) return 'red';
     if (badgeCount.value > 0) return 'blue';
     return 'gray';
   });
   </script>
   ```

## 🔧 문제 해결

### 자주 발생하는 문제

#### 1. 뱃지가 보이지 않음

**문제**: count가 0이고 showZero가 false일 때 뱃지가 표시되지 않음
```vue
<!-- 문제 -->
<Badge variant="count" :count="0" />
```

**해결**: showZero 옵션 또는 조건부 렌더링 사용
```vue
<!-- 해결책 1: showZero 사용 -->
<Badge variant="count" :count="0" :show-zero="true" />

<!-- 해결책 2: 조건부 렌더링 -->
<Badge v-if="count > 0" variant="count" :count="count" />
```

#### 2. 위치 조정 문제

**문제**: 뱃지가 원하는 위치에 표시되지 않음
```vue
<!-- 문제: 상대 위치 컨테이너 없음 -->
<div>
  <span>메뉴</span>
  <Badge class="absolute-badge" />
</div>
```

**해결**: 상대 위치 컨테이너 설정
```vue
<div class="relative-container">
  <span>메뉴</span>
  <Badge class="absolute-badge" />
</div>

<style scoped>
.relative-container {
  position: relative;
}

.absolute-badge {
  position: absolute;
  top: -4px;
  right: -4px;
}
</style>
```

#### 3. 큰 숫자 표시 문제

**문제**: 매우 큰 숫자가 뱃지를 벗어남
```vue
<!-- 문제: maxCount 설정 없음 -->
<Badge variant="count" :count="99999" />
```

**해결**: 적절한 maxCount 설정
```vue
<Badge variant="count" :count="99999" :max-count="999" />
<!-- "999+" 로 표시됨 -->
```

#### 4. 색상이 적용되지 않음

**문제**: CSS 클래스 우선순위 문제
```vue
<Badge class="custom-color" color="blue" />

<style>
.custom-color {
  background: red !important; /* 너무 강한 우선순위 */
}
</style>
```

**해결**: 적절한 CSS 선택자 사용
```vue
<style scoped>
:deep(.badge--blue .badge__dot),
:deep(.badge--blue .badge__count) {
  background-color: #custom-blue;
}
</style>
```

### 디버깅 가이드

1. **Props 확인**
   ```vue
   <template>
     <div>
       <p>Debug: variant={{ variant }}, count={{ count }}, visible={{ isVisible }}</p>
       <Badge v-bind="badgeProps" />
     </div>
   </template>
   ```

2. **CSS 클래스 확인**
   ```vue
   <Badge 
     :class="{ 'debug-border': true }"
     variant="count" 
     :count="5" 
   />
   
   <style>
   .debug-border {
     border: 2px solid red !important;
   }
   </style>
   ```

## 🔗 관련 컴포넌트

- **[Button](./button.md)**: 버튼에 뱃지 추가
- **[CTA](./cta.md)**: CTA 버튼에 알림 표시
- **[Accordion](./accordion.md)**: 아코디언 헤더에 상태 표시

### 컴포넌트 조합 예제

```vue
<template>
  <!-- 버튼 + 뱃지 조합 -->
  <div class="button-with-badge">
    <Button text="메시지" @click="openMessages" />
    <Badge 
      variant="count" 
      :count="unreadCount" 
      color="red" 
      class="badge-overlay"
    />
  </div>
  
  <!-- 아바타 + 뱃지 조합 -->
  <div class="avatar-with-status">
    <img src="avatar.jpg" alt="User Avatar" class="avatar" />
    <Badge variant="dot" color="green" class="status-badge" />
  </div>
</template>

<style scoped>
.button-with-badge {
  position: relative;
  display: inline-block;
}

.badge-overlay {
  position: absolute;
  top: -4px;
  right: -4px;
}

.avatar-with-status {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.status-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
}
</style>
```

## 📜 변경 이력

### v1.0.0 (2024-01-XX)
- ✨ 초기 Badge 컴포넌트 구현
- ✨ 2가지 변형 지원 (dot, count)
- ✨ 2가지 크기 지원 (sm, md)  
- ✨ 4가지 색상 지원 (red, blue, green, gray)
- ✨ 스마트 숫자 표시 (maxCount, showZero 옵션)
- ✨ Figma 디자인 시스템 100% 재현
- ✨ 접근성 기능 지원
- ✨ TypeScript 지원
- ✨ 단위 테스트 및 Storybook 스토리 포함

---

## 📞 지원

문제가 발생하거나 기능 요청이 있으시면 다음을 이용해주세요:

- **이슈 리포트**: GitHub Issues
- **문서 개선**: Pull Request 환영
- **디자인 시스템**: Figma 디자인 참조

---

*이 문서는 Badge 컴포넌트 v1.0.0 기준으로 작성되었습니다.*