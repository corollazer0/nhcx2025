# UI Components Web - 컴포넌트 문서

이 문서는 `@nhcx2025/ui-components-web` 패키지의 Vue 3 컴포넌트들에 대한 상세 정보를 제공합니다. 각 컴포넌트는 Figma 디자인을 기반으로 구현되었으며, TypeScript, 접근성, 테스트를 포함한 현대적인 웹 개발 표준을 준수합니다.

## 프로젝트 개요

- **패키지명**: @nhcx2025/ui-components-web
- **프레임워크**: Vue 3 with Composition API
- **언어**: TypeScript
- **스타일링**: Scoped CSS with Design Tokens
- **테스팅**: Vitest + Testing Library
- **문서화**: Storybook
- **접근성**: WCAG 준수, ARIA 속성 지원

## 컴포넌트 목록

### 1. Breadcrumb 컴포넌트

**파일 경로**: `src/components/Breadcrumb.vue`

#### 개요
네비게이션 경로를 표시하는 브레드크럼 컴포넌트입니다. 긴 경로의 경우 중간 단계를 생략하여 "..." 표시로 대체합니다.

#### 주요 특징
- **반응형 경로 표시**: 긴 경로 자동 축약
- **Vue Router 통합**: router-link 지원
- **접근성**: breadcrumb aria-label, 키보드 네비게이션
- **아이콘 지원**: 홈 아이콘, 구분자, 생략 표시

#### Props 인터페이스
```typescript
interface BreadcrumbItem {
  name: string;        // 표시될 텍스트
  path: string;        // 라우터 경로
  isEllipsis?: boolean; // 생략 표시 여부
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];  // 경로 아이템 배열
  maxVisibleItems: number;  // 최대 표시 아이템 수 (기본값: 5)
}
```

#### 사용 예시
```vue
<template>
  <Breadcrumb 
    :items="breadcrumbItems" 
    :max-visible-items="4" 
  />
</template>

<script setup>
const breadcrumbItems = [
  { name: '홈', path: '/' },
  { name: '카테고리', path: '/category' },
  { name: '상품', path: '/products' },
  { name: '상세', path: '/products/123' }
];
</script>
```

#### 동작 규칙
- `items.length <= maxVisibleItems`: 모든 아이템 표시
- `items.length > maxVisibleItems`: 첫 번째, 마지막 아이템 + 중간에 "..." 표시
- 마지막 아이템은 링크가 아닌 텍스트로 표시 (`aria-current="page"`)
- `name === '홈'`인 경우 아이콘 자동 표시

#### 테스트 커버리지
- 모든 아이템 렌더링 테스트
- 생략 표시 로직 테스트  
- 키보드 접근성 테스트
- Vue Router 통합 테스트
- 아이콘 렌더링 조건 테스트

#### Storybook 스토리
- **Playground**: 모든 props 제어
- **Default**: 기본 상태
- **WithEllipsis**: 긴 경로 생략 표시
- **IconOnlyHome**: 홈 아이콘 표시

---

### 2. GeneralList 컴포넌트

**파일 경로**: `src/components/GeneralList.vue`

#### 개요
Figma 디자인을 기반으로 한 범용 리스트 카드 컴포넌트입니다. 라벨, 제목, 키-값 리스트, 액션 버튼 등을 조건부로 표시할 수 있습니다.

#### 주요 특징
- **조건부 렌더링**: Figma Properties 기반 boolean props
- **동적 데이터**: 모든 텍스트와 리스트 아이템 커스터마이징
- **이벤트 처리**: 리스트 아이템, 버튼, 닫기 클릭 이벤트
- **접근성**: ARIA 속성, 키보드 네비게이션 (Enter, Space)
- **반응형**: 다양한 화면 크기 대응

#### Props 인터페이스
```typescript
interface ListItem {
  title: string;  // 항목 제목
  data: string;   // 항목 값
}

interface GeneralListProps {
  // Figma Properties (조건부 렌더링)
  label?: boolean;        // 라벨 표시 여부 (기본: true)
  subText?: boolean;      // 부가설명 표시 여부 (기본: true)
  list?: boolean;         // 리스트 항목 표시 여부 (기본: true)
  button?: boolean;       // 버튼 표시 여부 (기본: true)
  top?: boolean;          // 상단 섹션 표시 여부 (기본: true)
  iconClose?: boolean;    // 닫기 아이콘 표시 여부 (기본: true)
  title?: boolean;        // 제목 표시 여부 (기본: true)
  buttonMessage?: boolean; // 버튼 메시지 섹션 표시 여부 (기본: true)
  message?: boolean;      // 메시지 표시 여부 (기본: false)
  
  // 동적 데이터 Props
  labelText?: string;         // 라벨 텍스트 (기본: '라벨')
  titleText?: string;         // 제목 텍스트 (기본: '상품명')
  subTextContent?: string;    // 부가설명 텍스트 (기본: '부가설명')
  listItems?: ListItem[];     // 리스트 아이템 배열
  buttonText?: string;        // 버튼 텍스트 (기본: '버튼')
  closeIconSrc?: string;      // 닫기 아이콘 이미지 URL
}
```

#### 이벤트 인터페이스
```typescript
interface GeneralListEvents {
  'button-click': [event: MouseEvent];
  'close-click': [event: MouseEvent];
  'list-item-click': [item: ListItem, index: number, event: MouseEvent | KeyboardEvent];
}
```

#### 사용 예시
```vue
<template>
  <GeneralList
    :label="true"
    :sub-text="true"
    :list="true"
    label-text="신상품"
    title-text="iPhone 15 Pro"
    sub-text-content="최신 Apple 스마트폰"
    button-text="구매하기"
    :list-items="productSpecs"
    @button-click="handlePurchase"
    @list-item-click="handleSpecClick"
    @close-click="handleClose"
  />
</template>

<script setup>
const productSpecs = [
  { title: '가격', data: '1,550,000원' },
  { title: '용량', data: '256GB' },
  { title: '색상', data: 'Natural Titanium' }
];

const handlePurchase = (event) => {
  console.log('구매 버튼 클릭', event);
};

const handleSpecClick = (item, index, event) => {
  console.log('스펙 클릭', item, index);
};

const handleClose = (event) => {
  console.log('닫기 클릭', event);
};
</script>
```

#### 조건부 렌더링 로직
- `top=false`: 라벨과 제목 섹션 전체 숨김
- `title=false`: 제목과 부가설명 숨김 (라벨은 표시)
- `subText=false`: 부가설명만 숨김
- `list=false`: 리스트 항목들 숨김
- `buttonMessage=false`: 버튼 섹션 전체 숨김
- `button=false`: 버튼만 숨김 (버튼 섹션은 표시)

#### 접근성 기능
- 리스트 아이템: `role="button"`, `tabindex="0"`
- 키보드 네비게이션: Enter, Space 키 지원
- 제목: `<h2>` 시맨틱 마크업
- 닫기 버튼: `aria-label="닫기"` 
- 포커스 표시: outline 스타일

#### 테스트 커버리지
- 기본 렌더링 및 CSS 클래스 테스트
- 모든 props 조합 테스트
- 동적 데이터 props 렌더링 테스트
- 이벤트 emit 테스트 (클릭, 키보드)
- 조건부 렌더링 로직 테스트
- 접근성 요소 테스트

#### Storybook 스토리
- **Playground**: 모든 controls
- **Default**: 기본 상태
- **CustomData**: 실제 상품 데이터 예시
- **InteractiveEvents**: 이벤트 처리 테스트
- **조건부 렌더링**: WithoutLabel, WithoutSubText, WithoutList 등
- **RealWorldExample**: 실제 사용 시나리오

---

### 3. Cta 컴포넌트

**파일 경로**: `src/components/Cta.vue`

#### 개요
사용자의 행동을 유도하는 CTA(Call-to-Action) 버튼 그룹 컴포넌트입니다. Figma에서 정의된 6가지 레이아웃 조합을 지원합니다.

#### 주요 특징
- **다양한 레이아웃**: 6가지 조합 (basic/popup × cta-full/cta-5:5/cta-3:7)
- **버튼 스타일**: Primary, Secondary, Tertiary 버튼
- **반응형**: 모바일 최적화 (480px 이하)
- **이벤트 처리**: 개별 버튼 클릭 이벤트
- **디자인 토큰**: Figma 변수 기반 CSS

#### Props 인터페이스
```typescript
interface CtaProps {
  // Figma Properties
  type?: 'basic' | 'popup';              // 타입 (기본: 'basic')
  ratio?: 'cta-full' | 'cta-5:5' | 'cta-3:7'; // 비율 (기본: 'cta-full')
  
  // 동적 데이터 Props
  primaryText?: string;    // 주요 버튼 텍스트 (기본: '버튼명')
  secondaryText?: string;  // 보조 버튼 텍스트 (기본: '버튼')
}
```

#### 이벤트 인터페이스
```typescript
interface CtaEvents {
  'primary-click': [event: MouseEvent];
  'secondary-click': [event: MouseEvent];
}
```

#### 레이아웃 조합

| Type | Ratio | 설명 | 버튼 구성 |
|------|-------|------|-----------|
| basic | cta-full | 그라데이션 배경, 1개 버튼 | Primary 버튼 (full width) |
| basic | cta-5:5 | 그라데이션 배경, 2개 버튼 동일 비율 | Tertiary + Primary |
| basic | cta-3:7 | 그라데이션 배경, 2개 버튼 3:7 비율 | Tertiary (100px) + Primary (flex) |
| popup | cta-full | 흰색 배경, 1개 버튼 | Secondary 버튼 (full width) |
| popup | cta-5:5 | 흰색 배경, 2개 버튼 동일 비율 | Tertiary + Secondary |
| popup | cta-3:7 | 흰색 배경, 2개 버튼 3:7 비율 | Tertiary (100px) + Secondary (flex) |

#### 버튼 스타일
- **Primary**: 녹색 배경 (`#19973c`), 흰색 텍스트
- **Secondary**: 흰색 배경, 녹색 테두리 (`#19973c`), 녹색 텍스트
- **Tertiary**: 흰색 배경, 회색 테두리 (`#d3d3d3`), 검은 텍스트

#### 사용 예시
```vue
<template>
  <!-- Basic 타입, 5:5 비율 -->
  <Cta
    type="basic"
    ratio="cta-5:5"
    primary-text="확인"
    secondary-text="취소"
    @primary-click="handleConfirm"
    @secondary-click="handleCancel"
  />

  <!-- Popup 타입, 3:7 비율 -->
  <Cta
    type="popup"
    ratio="cta-3:7"
    primary-text="주문하기"
    secondary-text="취소"
    @primary-click="handleOrder"
    @secondary-click="handleCancel"
  />
</template>

<script setup>
const handleConfirm = (event) => {
  console.log('확인 버튼 클릭');
};

const handleCancel = (event) => {
  console.log('취소 버튼 클릭');
};

const handleOrder = (event) => {
  console.log('주문하기 버튼 클릭');
};
</script>
```

#### 디자인 토큰
```css
/* Figma 변수 기반 CSS Custom Properties */
--color-text-button-primary-default: #ffffff;
--color-bg-button-primary-default: #19973c;
--color-text-button-secondary-default: #19973c;
--color-border-button-secondary-default: #19973c;
--color-text-button-tertiary-default: #121212;
--color-border-button-tertiary-default: #d3d3d3;
--border-radius-10: 10px;  /* popup 타입 */
--border-radius-12: 12px;  /* basic 타입 */
```

#### 반응형 디자인
```css
@media (max-width: 480px) {
  /* 모바일에서 패딩 축소 */
  padding: 16px;
  
  /* narrow 버튼 크기 조정 */
  .cta__button--narrow { width: 80px; }
  
  /* 폰트 크기 축소 */
  font-size: 14px;
}
```

#### 테스트 커버리지
- 기본 렌더링 및 data-testid 테스트
- 모든 type × ratio 조합 테스트 (6가지)
- 버튼 개수 검증 (full: 1개, 5:5/3:7: 2개)
- 이벤트 emit 테스트 (primary-click, secondary-click)
- CSS 클래스 적용 테스트
- 접근성 테스트 (type="button", 텍스트 표시)
- 조건부 렌더링 테스트 (props 변경)
- Edge Cases (빈 텍스트, 긴 텍스트, 특수문자)

#### Storybook 스토리
- **Playground**: 모든 props 제어
- **Default**: 기본 상태 (basic + cta-full)
- **타입별 스토리**: BasicFull, Basic55, Basic37, PopupFull, Popup55, Popup37
- **ButtonStyles**: 버튼 스타일 비교
- **TextVariations**: 실제 사용 텍스트 예시
- **AllCombinations**: 6가지 조합 한눈에 보기
- **MobileResponsive**: 모바일 뷰포트 테스트
- **EdgeCases**: 특수 상황 테스트

---

## 아이콘 컴포넌트들

### Icon 컴포넌트 목록
- **ArrowDownIcon**: 아래 화살표 아이콘
- **ArrowUpIcon**: 위 화살표 아이콘  
- **IconChevronRight**: 오른쪽 화살표 (브레드크럼 구분자)
- **IconEllipsis**: 생략 표시 (브레드크럼)
- **IconHome**: 홈 아이콘 (브레드크럼)
- **NoticeIcon**: 알림 아이콘

#### 아이콘 특징
- **Vue 3 컴포넌트**: `<template>` + SVG
- **Props 지원**: 색상, 크기 커스터마이징  
- **접근성**: `aria-hidden="true"` 장식용 아이콘
- **최적화**: 불필요한 속성 제거된 클린 SVG

---

## 개발 가이드라인

### 컴포넌트 작성 원칙
1. **Figma 디자인 100% 준수**: 픽셀 퍼펙트 구현
2. **TypeScript 필수**: Props, Events, Emits 타입 정의
3. **접근성 우선**: WCAG 가이드라인 준수
4. **테스트 커버리지**: 단위 테스트 + Storybook
5. **성능 최적화**: 불필요한 리렌더링 방지

### 명명 규칙
- **컴포넌트 파일**: PascalCase (`ComponentName.vue`)
- **Props**: camelCase (`primaryText`, `isVisible`)
- **Events**: kebab-case (`button-click`, `item-select`)
- **CSS 클래스**: BEM 방식 (`component__element--modifier`)

### 테스트 전략
- **렌더링 테스트**: 기본 요소들이 올바르게 표시되는지
- **Props 테스트**: 모든 props 조합과 기본값 확인
- **이벤트 테스트**: emit 이벤트와 핸들러 동작 검증
- **접근성 테스트**: ARIA 속성, 키보드 네비게이션
- **Edge Cases**: 빈 값, 극한값, 특수문자 등

### Storybook 작성 원칙
- **Playground**: 모든 controls 제공
- **Default**: 기본 상태 스토리
- **Variants**: 주요 변형들 각각 스토리
- **Interactive**: play 함수로 사용자 상호작용 시뮬레이션
- **Documentation**: 상세한 설명과 사용 예시

---

## 사용 방법

### 설치 및 설정
```bash
npm install @nhcx2025/ui-components-web
```

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```

### 개별 컴포넌트 import
```vue
<script setup lang="ts">
import { Breadcrumb, GeneralList, Cta } from '@nhcx2025/ui-components-web'

// 또는 개별 import
import Breadcrumb from '@nhcx2025/ui-components-web/Breadcrumb'
</script>
```

### 전역 등록 (선택사항)
```typescript
// main.ts
import { Breadcrumb, GeneralList, Cta } from '@nhcx2025/ui-components-web'

app.component('Breadcrumb', Breadcrumb)
app.component('GeneralList', GeneralList)
app.component('Cta', Cta)
```

---

## 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 단위 테스트 실행
npm run test:unit:run

# 단위 테스트 watch 모드
npm run test:unit:watch

# Storybook 실행
npm run storybook

# Lint 검사
npm run lint

# Lint 자동 수정
npm run lint:fix
```

---

## 기여 방법

1. **이슈 확인**: GitHub Issues에서 버그나 개선사항 확인
2. **브랜치 생성**: `feature/component-name` 형식
3. **개발**: 컴포넌트 구현 + 테스트 + 스토리 작성
4. **테스트**: 모든 테스트 통과 확인
5. **PR 생성**: 상세한 설명과 스크린샷 포함

### Pull Request 체크리스트
- [ ] Figma 디자인과 100% 일치
- [ ] TypeScript 타입 정의 완료
- [ ] 단위 테스트 작성 및 통과
- [ ] Storybook 스토리 작성
- [ ] 접근성 확인 (ARIA, 키보드)
- [ ] 반응형 디자인 적용
- [ ] ESLint 규칙 준수
- [ ] 문서 업데이트

---

이 문서는 LangChain RAG 시스템에서 활용하기 위해 구조화되었습니다. 각 컴포넌트의 사용법, Props 인터페이스, 이벤트 처리, 테스트 방법 등 개발에 필요한 모든 정보를 포함하고 있습니다.