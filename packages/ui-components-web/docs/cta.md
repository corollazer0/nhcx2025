# CTA (Call-to-Action) 컴포넌트

## 개요

CTA 컴포넌트는 사용자의 행동을 유도하는 버튼 그룹을 제공합니다. 다양한 레이아웃과 스타일을 지원하며, Figma 디자인을 100% 재현하여 구현되었습니다.

## 설치 및 Import

```vue
<script setup>
import Cta from '@/components/Cta.vue'
</script>
```

## Props API

| Prop | 타입 | 기본값 | 필수 | 설명 |
|------|------|--------|------|------|
| `type` | `'basic' \| 'popup'` | `'basic'` | ❌ | CTA 컴포넌트의 타입 (basic: 그라데이션 배경, popup: 흰색 배경) |
| `ratio` | `'cta-full' \| 'cta-5:5' \| 'cta-3:7'` | `'cta-full'` | ❌ | 버튼 그룹의 비율 |
| `primaryText` | `string` | `'버튼명'` | ❌ | 주요 버튼의 텍스트 |
| `secondaryText` | `string` | `'버튼'` | ❌ | 보조 버튼의 텍스트 (ratio가 5:5, 3:7일 때만 사용) |

## Events API

| Event | 파라미터 | 설명 |
|-------|----------|------|
| `primary-click` | `MouseEvent` | 주요 버튼 클릭 시 발생 |
| `secondary-click` | `MouseEvent` | 보조 버튼 클릭 시 발생 |

## 기본 사용법

```vue
<template>
  <!-- 가장 기본적인 형태 -->
  <div style="height: 120px; width: 400px;">
    <Cta 
      primary-text="확인"
      @primary-click="handleConfirm"
    />
  </div>
</template>

<script setup>
const handleConfirm = (event) => {
  console.log('확인 버튼 클릭됨', event)
}
</script>
```

## 사용 사례별 예제

### 1. Basic 타입 - 앱 하단 고정 CTA

```vue
<template>
  <!-- 앱 하단에 고정되는 주문/결제 버튼 -->
  <div style="height: 120px; width: 100%;">
    <Cta 
      type="basic"
      ratio="cta-full"
      primary-text="주문하기"
      @primary-click="handleOrder"
    />
  </div>
</template>
```

### 2. Basic 5:5 - 확인/취소 버튼

```vue
<template>
  <!-- 동등한 중요도의 두 액션 -->
  <div style="height: 120px; width: 400px;">
    <Cta 
      type="basic"
      ratio="cta-5:5"
      primary-text="저장"
      secondary-text="취소"
      @primary-click="handleSave"
      @secondary-click="handleCancel"
    />
  </div>
</template>
```

### 3. Basic 3:7 - 주요 액션 강조

```vue
<template>
  <!-- 주요 액션을 더 강조하고 싶을 때 -->
  <div style="height: 120px; width: 400px;">
    <Cta 
      type="basic"
      ratio="cta-3:7"
      primary-text="구매하기"
      secondary-text="취소"
      @primary-click="handlePurchase"
      @secondary-click="handleCancel"
    />
  </div>
</template>
```

### 4. Popup 타입 - 모달/다이얼로그

```vue
<template>
  <!-- 모달이나 다이얼로그 내부 버튼 -->
  <div style="height: 120px; width: 400px;">
    <Cta 
      type="popup"
      ratio="cta-5:5"
      primary-text="확인"
      secondary-text="취소"
      @primary-click="closeModal"
      @secondary-click="closeModal"
    />
  </div>
</template>
```

## 스타일링 가이드

### 디자인 토큰

컴포넌트는 다음 CSS 변수들을 사용합니다:

```css
.cta {
  --color-text-button-primary-default: #ffffff;
  --color-bg-button-primary-default: #19973c;
  --color-text-button-secondary-default: #19973c;
  --color-bg-button-secondary-default: #ffffff;
  --color-border-button-secondary-default: #19973c;
  --color-text-button-tertiary-default: #121212;
  --color-bg-button-tertiary-default: #ffffff;
  --color-border-button-tertiary-default: #d3d3d3;
}
```

### 커스터마이징

```css
/* 브랜드 색상 변경 */
.custom-cta {
  --color-bg-button-primary-default: #007bff;
  --color-border-button-secondary-default: #007bff;
  --color-text-button-secondary-default: #007bff;
}
```

### 반응형 지원

```css
/* 480px 이하에서 자동 적용됨 */
@media (max-width: 480px) {
  .cta__button--narrow {
    width: 80px; /* 100px → 80px */
  }
  
  .cta__button-text {
    font-size: 14px; /* 16px → 14px */
  }
}
```

## 접근성 (Accessibility)

### 키보드 내비게이션
- `Tab`: 다음 버튼으로 포커스 이동
- `Shift + Tab`: 이전 버튼으로 포커스 이동  
- `Enter` 또는 `Space`: 버튼 활성화

### 스크린 리더 지원
- 각 버튼은 명확한 텍스트 레이블을 가짐
- `data-testid` 속성으로 자동화 테스트 지원

### 포커스 표시
```css
.cta__button:focus {
  outline: 2px solid #121212;
  outline-offset: 2px;
}
```

## 사용 권장사항

### ✅ Do (권장)

1. **텍스트는 간결하게 작성**
   ```vue
   <!-- 좋음 -->
   <Cta primary-text="확인" secondary-text="취소" />
   
   <!-- 나쁨 -->
   <Cta primary-text="이 작업을 확인하고 계속 진행하시겠습니까?" />
   ```

2. **부모 컨테이너 크기 명시**
   ```vue
   <!-- 좋음 -->
   <div style="height: 120px; width: 400px;">
     <Cta primary-text="확인" />
   </div>
   ```

3. **적절한 타입과 비율 선택**
   - `basic`: 앱의 주요 CTA (하단 고정 등)
   - `popup`: 모달, 다이얼로그 내부
   - `cta-full`: 단일 주요 액션
   - `cta-5:5`: 동등한 두 액션  
   - `cta-3:7`: 주요 액션 강조

### ❌ Don't (금지)

1. **긴 텍스트 사용 금지**
   ```vue
   <!-- 나쁨 -->
   <Cta primary-text="매우 긴 버튼 텍스트는 레이아웃을 깨뜨립니다" />
   ```

2. **이벤트 핸들러 누락 금지**
   ```vue
   <!-- 나쁨: 클릭 이벤트 처리 없음 -->
   <Cta ratio="cta-5:5" primary-text="확인" secondary-text="취소" />
   ```

3. **부적절한 비율 사용 금지**
   ```vue
   <!-- 나쁨: secondary 텍스트 없이 5:5 사용 -->
   <Cta ratio="cta-5:5" primary-text="확인" />
   ```

## 문제 해결

### Q: 버튼 텍스트가 잘려 보여요
**A**: 부모 컨테이너의 크기를 충분히 확보하거나 텍스트를 더 짧게 수정하세요.

### Q: 3:7 비율에서 주요 버튼이 작게 보여요
**A**: 3:7에서 주요 버튼(primary)이 7(큰 부분)을 차지합니다. 스토리북에서 고정 크기 컨테이너로 확인하세요.

### Q: 모바일에서 버튼이 너무 작아요
**A**: CSS 미디어 쿼리가 480px 이하에서 자동 적용됩니다. 필요시 커스텀 CSS로 조정하세요.

### Q: 이벤트가 두 번 발생해요
**A**: 이벤트 핸들러에서 `event.stopPropagation()`을 사용하거나 부모 요소의 중복 이벤트를 확인하세요.

## 관련 컴포넌트

- **Button**: 단일 버튼이 필요한 경우
- **Modal**: CTA와 함께 사용되는 모달 컴포넌트
- **Form**: 폼 제출 시 CTA 활용

## 변경 이력

### v1.0.0 (2024-01-XX)
- ✨ 초기 버전 릴리즈
- ✨ Figma 디자인 100% 구현
- ✨ 3가지 타입과 비율 지원
- ✨ 반응형 디자인 지원
- ✨ 접근성 기능 구현

### v1.0.1 (2024-01-XX)  
- 🐛 5:5 비율에서 버튼이 늘어나지 않던 문제 수정
- 🐛 스토리북 Playground 렌더링 이슈 해결
- 📝 문서 개선 및 예제 추가