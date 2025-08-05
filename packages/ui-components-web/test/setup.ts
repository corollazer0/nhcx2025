// test/setup.ts
import { config } from "@vue/test-utils";
import { vi } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import "@testing-library/jest-dom";

// ✨ ① 가짜 라우터를 전역 플러그인으로 등록
// const router = createRouter({
//   history: createMemoryHistory(),
//   routes: [], // 테스트용이니 빈 배열이면 충분
// });
// config.global.plugins = [router];

// ✨ ② 아이콘 컴포넌트 stub → SVG 내부까지 렌더링할 필요 없으니 이름만 표시
// config.global.stubs = {
//   IconHome: { template: '<svg data-test="home-icon"></svg>' },
//   IconChevronRight: { template: '<svg data-test="chevron-icon"></svg>' },
//   IconEllipsis: { template: '<svg data-test="ellipsis-icon"></svg>' },
// };
// 전역 mocks
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});
// ✨ ③ 날짜나 타이머 등을 고정하고 싶을 때 예시
vi.useFakeTimers();
