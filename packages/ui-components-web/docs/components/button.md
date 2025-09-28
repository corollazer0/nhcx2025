# Button 컴포넌트 개발자 가이드

## 📖 컴포넌트 개요

Button 컴포넌트는 사용자 인터랙션을 위한 기본 버튼 요소입니다. Figma 디자인 시스템을 100% 재현하여 구현되었으며, 다양한 크기, 타입, 상태를 지원합니다.

### 주요 기능
- **5가지 크기**: xs, sm, rg, md, lg
- **3가지 타입**: primary(녹색 배경), secondary(녹색 테두리), tertiary(회색 테두리)
- **3가지 상태**: default, pressed, disabled
- **반응형 텍스트**: xs/sm 크기에서는 `smallText`, 나머지는 `text` 사용
- **접근성**: 키보드 내비게이션, 포커스 표시, 스크린 리더 지원

## 📦 설치 및 Import

```vue
<script setup lang="ts">
import Button from '@/components/Button.vue';
</script>
```

## 📋 Props API

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `text` | `string` | `'버튼명'` | rg, md, lg 크기에서 표시되는 텍스트 |
| `smallText` | `string` | `'버튼'` | xs, sm 크기에서 표시되는 텍스트 |
| `size` | `'xs' \| 'sm' \| 'rg' \| 'md' \| 'lg'` | `'lg'` | 버튼의 크기 |
| `state` | `'default' \| 'pressed' \| 'disabled'` | `'default'` | 버튼의 상태 |
| `type` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | 버튼의 시각적 타입 |

### 크기별 상세 정보

| Size | Font Size | Padding | Border Radius | 사용 텍스트 |
|------|-----------|---------|---------------|-------------|
| `xs` | 13px | 5px 12px | 8px | `smallText` |
| `sm` | 14px | 7px 12px | 8px | `smallText` |
| `rg` | 15px | 9px 16px | 10px | `text` |
| `md` | 16px | 12px 16px | 10px | `text` |
| `lg` | 18px | 15px 16px | 12px | `text` |

### 타입별 색상 정보

| Type | Background | Text Color | Border |
|------|------------|------------|---------|
| `primary` | `#19973c` | `#ffffff` | `#19973c` |
| `secondary` | `#ffffff` | `#19973c` | `#19973c` |
| `tertiary` | `#ffffff` | `#121212` | `#d3d3d3` |

## 🎯 Events API

| Event | 파라미터 | 설명 |
|-------|----------|------|
| `click` | `event: MouseEvent` | 버튼 클릭 시 발생. disabled 상태에서는 발생하지 않음 |

## 🚀 기본 사용법

```vue
<template>
  <!-- 기본 버튼 -->
  <Button @click="handleClick" />
  
  <!-- 커스텀 텍스트 -->
  <Button text="확인" @click="handleConfirm" />
  
  <!-- 다양한 크기 -->
  <Button size="sm" small-text="저장" @click="handleSave" />
  <Button size="lg" text="주문하기" @click="handleOrder" />
  
  <!-- 다양한 타입 -->
  <Button type="secondary" text="취소" @click="handleCancel" />
  <Button type="tertiary" text="닫기" @click="handleClose" />
  
  <!-- 상태 제어 -->
  <Button state="disabled" text="비활성화" />
  <Button state="pressed" text="눌린 상태" />
</template>

<script setup lang="ts">
const handleClick = (event: MouseEvent) => {
  console.log('Button clicked!', event);
};

const handleConfirm = () => {
  // 확인 로직
};

const handleSave = () => {
  // 저장 로직
};
</script>
```

## 💡 사용 사례별 예제

### 1. 폼 액션 버튼

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- 주요 액션 -->
    <Button 
      type="primary" 
      size="lg" 
      text="저장하기"
      :state="isSubmitting ? 'disabled' : 'default'"
      @click="handleSubmit"
    />
    
    <!-- 보조 액션 -->
    <Button 
      type="secondary" 
      size="lg" 
      text="취소"
      @click="handleCancel"
    />
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    // 폼 제출 로직
    await submitForm();
  } finally {
    isSubmitting.value = false;
  }
};
</script>
```

### 2. 네비게이션 버튼

```vue
<template>
  <div class="navigation">
    <Button 
      type="tertiary" 
      size="md" 
      text="이전"
      :state="currentStep === 1 ? 'disabled' : 'default'"
      @click="handlePrevious"
    />
    
    <Button 
      type="primary" 
      size="md" 
      text="다음"
      :state="currentStep === totalSteps ? 'disabled' : 'default'"
      @click="handleNext"
    />
  </div>
</template>
```

### 3. 모바일 최적화 버튼

```vue
<template>
  <div class="mobile-actions">
    <!-- 모바일에서는 작은 크기 사용 -->
    <Button 
      :size="isMobile ? 'sm' : 'md'"
      :text="isMobile ? undefined : '알림 설정'"
      :small-text="isMobile ? '알림' : undefined"
      type="secondary"
      @click="toggleNotifications"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
});
</script>
```

### 4. 동적 상태 관리

```vue
<template>
  <Button
    :text="buttonText"
    :state="buttonState"
    :type="buttonType"
    @click="handleAction"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  loading: boolean;
  error: boolean;
  success: boolean;
}>();

const buttonState = computed(() => {
  if (props.loading) return 'disabled';
  return 'default';
});

const buttonType = computed(() => {
  if (props.error) return 'tertiary';
  if (props.success) return 'primary';
  return 'secondary';
});

const buttonText = computed(() => {
  if (props.loading) return '처리 중...';
  if (props.error) return '다시 시도';
  if (props.success) return '완료';
  return '시작하기';
});
</script>
```

## 🎨 스타일링 가이드

### CSS 클래스 구조

```css
.button                 /* 기본 버튼 클래스 */
├── .button--primary    /* primary 타입 */
├── .button--secondary  /* secondary 타입 */
├── .button--tertiary   /* tertiary 타입 */
├── .button--xs         /* xs 크기 */
├── .button--sm         /* sm 크기 */
├── .button--rg         /* rg 크기 */
├── .button--md         /* md 크기 */
├── .button--lg         /* lg 크기 */
├── .button--default    /* default 상태 */
├── .button--pressed    /* pressed 상태 */
└── .button--disabled   /* disabled 상태 */
```

### 디자인 토큰

```css
/* 색상 토큰 */
--color-text-primary-default: #ffffff;
--color-bg-primary-default: #19973c;
--color-text-secondary-default: #19973c;
--color-bg-secondary-default: #ffffff;
--color-border-secondary-default: #19973c;
--color-text-tertiary-default: #121212;
--color-bg-tertiary-default: #ffffff;
--color-border-tertiary-default: #d3d3d3;

/* 크기 토큰 */
--border-radius-8: 8px;
--border-radius-10: 10px;
--border-radius-12: 12px;
```

### 커스터마이징

```vue
<template>
  <!-- CSS 클래스로 커스터마이징 -->
  <Button class="my-custom-button" text="커스텀 버튼" />
</template>

<style scoped>
.my-custom-button {
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* hover 효과 커스터마이징 */
.my-custom-button:hover:not(:disabled) {
  transform: translateY(-1px);
  transition: transform 0.2s ease;
}
</style>
```

## ♿ 접근성 (Accessibility)

### 기본 접근성 기능

- **키보드 내비게이션**: Tab, Enter, Space 키 지원
- **포커스 표시**: 명확한 focus outline 제공
- **스크린 리더**: 적절한 button 요소와 텍스트 사용
- **상태 표시**: disabled 상태 정확히 전달

### 접근성 개선 예제

```vue
<template>
  <!-- ARIA 레이블 추가 -->
  <Button
    text="저장"
    :aria-label="isLoading ? '저장 중...' : '문서 저장하기'"
    :state="isLoading ? 'disabled' : 'default'"
    @click="handleSave"
  />
  
  <!-- 키보드 이벤트 처리 -->
  <Button
    text="업로드"
    @click="handleUpload"
    @keydown.enter="handleUpload"
    @keydown.space.prevent="handleUpload"
  />
</template>
```

### 권장사항

```vue
<!-- ✅ 좋은 예 -->
<Button text="파일 다운로드" @click="downloadFile" />
<Button text="계속하기" type="primary" @click="proceed" />

<!-- ❌ 피해야 할 예 -->
<Button text="클릭" @click="doSomething" /> <!-- 모호한 텍스트 -->
<div @click="handleClick">버튼</div> <!-- button 요소가 아님 -->
```

## 📋 사용 권장사항

### ✅ Do (권장)

1. **의미 있는 텍스트 사용**
   ```vue
   <Button text="주문 완료하기" type="primary" />
   <Button text="장바구니에 추가" type="secondary" />
   ```

2. **적절한 크기 선택**
   ```vue
   <!-- 주요 액션: 큰 크기 -->
   <Button size="lg" text="회원가입" type="primary" />
   
   <!-- 보조 액션: 중간 크기 -->
   <Button size="md" text="취소" type="secondary" />
   
   <!-- 작은 액션: 작은 크기 -->
   <Button size="sm" small-text="편집" type="tertiary" />
   ```

3. **상태 기반 UI**
   ```vue
   <Button 
     :state="isLoading ? 'disabled' : 'default'"
     :text="isLoading ? '저장 중...' : '저장하기'"
   />
   ```

4. **이벤트 핸들링**
   ```vue
   <Button @click="handleClick" text="확인" />
   ```

### ❌ Don't (피해야 할 것)

1. **모호한 텍스트**
   ```vue
   <!-- 피하세요 -->
   <Button text="확인" />
   <Button text="클릭" />
   
   <!-- 대신 이렇게 -->
   <Button text="주문 확인" />
   <Button text="파일 업로드" />
   ```

2. **과도한 disabled 상태**
   ```vue
   <!-- 피하세요: 이유 없는 disabled -->
   <Button state="disabled" text="저장" />
   
   <!-- 대신 이렇게: 명확한 이유가 있을 때만 -->
   <Button :state="hasChanges ? 'default' : 'disabled'" text="저장" />
   ```

3. **잘못된 타입 조합**
   ```vue
   <!-- 피하세요: primary는 주요 액션 1개만 -->
   <Button type="primary" text="저장" />
   <Button type="primary" text="취소" />
   
   <!-- 대신 이렇게 -->
   <Button type="primary" text="저장" />
   <Button type="secondary" text="취소" />
   ```

### 성능 최적화 팁

1. **이벤트 핸들러 메모이제이션**
   ```vue
   <script setup lang="ts">
   import { useCallback } from 'vue';
   
   // 컴포넌트 재렌더링 시 함수 재생성 방지
   const handleClick = useCallback((event: MouseEvent) => {
     // 클릭 로직
   }, []);
   </script>
   ```

2. **조건부 렌더링 최적화**
   ```vue
   <template>
     <!-- v-show vs v-if 적절히 선택 -->
     <Button v-show="showSaveButton" text="저장" />
     <Button v-if="hasPermission" text="삭제" />
   </template>
   ```

## 🔧 문제 해결

### 자주 발생하는 문제

#### 1. 클릭 이벤트가 발생하지 않음

**문제**: disabled 상태에서 클릭 이벤트가 발생하지 않음
```vue
<!-- 문제 -->
<Button state="disabled" @click="handleClick" />
```

**해결**: 상태 확인 후 이벤트 핸들링
```vue
<Button 
  :state="isDisabled ? 'disabled' : 'default'"
  @click="isDisabled ? undefined : handleClick"
/>
```

#### 2. 텍스트가 표시되지 않음

**문제**: xs/sm 크기에서 text prop만 설정
```vue
<!-- 문제: xs 크기에서 텍스트 안보임 -->
<Button size="xs" text="저장하기" />
```

**해결**: smallText prop 함께 설정
```vue
<Button size="xs" text="저장하기" small-text="저장" />
```

#### 3. 스타일이 적용되지 않음

**문제**: CSS 클래스 충돌
```vue
<Button class="my-button" />

<style>
.my-button {
  background: red !important; /* 너무 강한 우선순위 */
}
</style>
```

**해결**: 적절한 CSS 선택자 사용
```vue
<style scoped>
.button.my-button {
  background: red;
}
</style>
```

### 디버깅 가이드

1. **Props 확인**
   ```vue
   <Button 
     v-bind="buttonProps"
     @click="(e) => console.log('Button clicked:', e)"
   />
   ```

2. **상태 디버깅**
   ```vue
   <template>
     <div>
       <p>Current state: {{ buttonState }}</p>
       <Button :state="buttonState" text="테스트" />
     </div>
   </template>
   ```

## 🔗 관련 컴포넌트

- **[Badge](./badge.md)**: 버튼에 알림 표시
- **[CTA](./cta.md)**: 다중 버튼 그룹
- **[Accordion](./accordion.md)**: 토글 버튼 포함

### 컴포넌트 조합 예제

```vue
<template>
  <!-- 버튼 + 뱃지 조합 -->
  <div class="button-with-badge">
    <Button text="알림" @click="showNotifications" />
    <Badge variant="count" :count="notificationCount" />
  </div>
  
  <!-- CTA 컴포넌트 내에서 사용 -->
  <CTA
    primary-text="주문하기"
    secondary-text="장바구니"
    @primary-click="handleOrder"
    @secondary-click="addToCart"
  />
</template>
```

## 📜 변경 이력

### v1.0.0 (2024-01-XX)
- ✨ 초기 Button 컴포넌트 구현
- ✨ 5가지 크기 지원 (xs, sm, rg, md, lg)
- ✨ 3가지 타입 지원 (primary, secondary, tertiary)
- ✨ 3가지 상태 지원 (default, pressed, disabled)
- ✨ Figma 디자인 시스템 100% 재현
- ✨ 접근성 기능 완전 지원
- ✨ TypeScript 지원
- ✨ 단위 테스트 및 Storybook 스토리 포함

---

## 📞 지원

문제가 발생하거나 기능 요청이 있으시면 다음을 이용해주세요:

- **이슈 리포트**: GitHub Issues
- **문서 개선**: Pull Request 환영
- **디자인 시스템**: Figma 디자인 참조

---

*이 문서는 Button 컴포넌트 v1.0.0 기준으로 작성되었습니다.*