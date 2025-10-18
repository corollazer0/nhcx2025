# SubscriptionCancellationConfirmation

**Figma Frame:** FM_DF03_0700_B2502 (Node ID: 1:2532)
**Route:** `/subscription-cancellation-confirmation`
**Purpose:** 청약해지 예상 금액을 확인하는 페이지

## 개요

사용자가 청약 해지 시 예상되는 금액을 확인할 수 있는 페이지입니다. Figma 디자인을 100% 정확하게 구현하였으며, 기존 Vue 컴포넌트들을 재사용하여 개발되었습니다.

## 사용된 컴포넌트

### Figma Instance → Vue Component 매핑

| Figma Instance | Vue Component | 역할 |
|---|---|---|
| `top/process` | `Navigation` | 상단 네비게이션 바 |
| `progress` | `Progress` | 진행률 표시 |
| `summary/basic` | `Summary` | 해지 정보 요약 카드 |
| `cta/cta` | `Cta` | 다음 단계 버튼 |

### 추가 컴포넌트

- `PageTitle`: 페이지 제목 표시 ("청약해지 예상 금액을 확인해 주세요")

## 데이터 구조

```typescript
interface SubscriptionData {
  productName: string          // 상품명
  subscriptionAccount: string  // 청약계좌
  estimatedCancellationAmount: string // 해지 예상 금액
}
```

### 기본 데이터

- **상품명**: `&상품명&` (Figma에서 정의된 플레이스홀더)
- **청약계좌**: `NH농협은행 123-456-78910`
- **해지 예상 금액**: `5,000,000원` (녹색으로 강조 표시)

## 레이아웃

### Figma 정확한 치수 구현

- **Frame 크기**: 360px × 760px
- **Header 위치**: top: 24px
- **Contents 위치**: top: 120px, 가로 중앙 정렬, width: 312px
- **CTA 위치**: top: 662px, height: 98px

### 반응형 디자인

- 모바일 환경에서 최대 480px 너비로 제한
- 콘텐츠 영역은 양쪽 24px 여백 유지

## 사용자 플로우

1. **페이지 진입**: 청약 가입 프로세스 중 해지 확인 단계
2. **정보 확인**: 상품명, 계좌, 예상 금액 검토
3. **다음 단계**: "다음" 버튼 클릭으로 진행
4. **이전/취소**: 네비게이션 버튼으로 되돌아가기

## 이벤트 핸들러

- `handlePrevious()`: 이전 단계로 이동
- `handleCs()`: 고객센터 열기
- `handleCancel()`: 프로세스 취소
- `handleNext()`: 다음 단계로 진행

## 접근성

- 모든 컴포넌트에 적절한 `data-testid` 속성
- 키보드 네비게이션 지원
- 스크린 리더 친화적 구조
- 색상 대비 준수 (다크 모드 지원)

## 테스트

### 테스트 커버리지

- **단위 테스트**: 34개 테스트 케이스
- **통합 테스트**: 컴포넌트 간 상호작용 테스트
- **접근성 테스트**: ARIA 속성 및 키보드 지원
- **반응형 테스트**: 다양한 화면 크기 대응

### 주요 테스트 시나리오

1. 페이지 렌더링 및 구조 확인
2. Figma 노드 ID 매핑 검증
3. 컴포넌트 props 전달 확인
4. 사용자 상호작용 플로우
5. 에러 처리 및 상태 관리

## 라우터 설정

```typescript
{
  path: '/subscription-cancellation-confirmation',
  name: 'SubscriptionCancellationConfirmation',
  component: SubscriptionCancellationConfirmation,
  meta: {
    title: '청약해지 예상 금액 확인',
    description: '청약해지 예상 금액을 확인하는 페이지'
  }
}
```

## 향후 개선사항

1. **API 연동**: 실제 청약 데이터 조회 기능
2. **로딩 상태**: 데이터 로딩 중 UI 표시
3. **에러 처리**: API 에러 시 fallback UI
4. **상태 관리**: Pinia 스토어를 통한 전역 상태 관리
5. **애니메이션**: 페이지 전환 애니메이션 추가

## 개발 가이드라인

- Figma 디자인에서 절대 벗어나지 않기
- 기존 컴포넌트 재사용 우선
- TypeScript 타입 안전성 유지
- 테스트 커버리지 100% 유지
- 접근성 가이드라인 준수