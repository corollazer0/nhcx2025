// src/components/Breadcrumb.spec.ts
import { render, screen, cleanup } from "@testing-library/vue";
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import Breadcrumb from "./Breadcrumb.vue";
import { describe, it, expect, beforeEach } from "vitest";

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     { path: "/", component: { template: "<div>Home</div>" } },
//     { path: "/cat", component: { template: "<div>Category</div>" } },
//     { path: "/post", component: { template: "<div>Post</div>" } },
//   ],
// });

describe("Breadcrumb.vue", () => {
  let router: any;

  beforeEach(async () => {
    // ✅ 메모리 히스토리 사용 (테스트 환경에 더 적합)
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", component: { template: "<div>Home</div>" } },
        { path: "/cat", component: { template: "<div>Category</div>" } },
        { path: "/post", component: { template: "<div>Post</div>" } },
      ],
    });
    await router.push("/");
    await router.isReady();
  });
  beforeEach(async () => {
    await router.push("/");
  });

  afterEach(() => {
    // ✅ 각 테스트 후 정리
    cleanup();
    router = null;
  });

  const factory = (items: any[], maxVisibleItems = 5) =>
    render(Breadcrumb, {
      props: { items, maxVisibleItems },
      global: {
        plugins: [router],
        stubs: {
          IconHome: { template: '<span data-testid="home-icon">🏠</span>' },
          IconChevronRight: {
            template: '<span data-testid="chevron-icon">›</span>',
          },
          IconEllipsis: {
            template: '<span data-testid="ellipsis-icon">...</span>',
          },
          "router-link": {
            template: '<a :href="to"><slot /></a>',
            props: ["to"],
          },
        },
      },
    });

  it("모든 아이템을 그대로 렌더링 (items ≤ maxVisibleItems)", () => {
    const items = [
      { name: "홈", path: "/" },
      { name: "카테고리", path: "/cat" },
      { name: "게시글", path: "/post" },
    ];
    factory(items);

    items.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    // 중간 아이템 뒤에 Chevron 아이콘이 있는지 확인 (마지막 제외)
    const chevrons = screen.getAllByTestId("chevron-icon");
    expect(chevrons).toHaveLength(items.length - 1); // 2개
  });

  it("아이템이 maxVisibleItems보다 많으면 첫·마지막 + ellipsis만 보여준다", () => {
    const items = [
      { name: "홈", path: "/" },
      { name: "1뎁스", path: "/1" },
      { name: "2뎁스", path: "/2" },
      { name: "3뎁스", path: "/3" },
      { name: "4뎁스", path: "/4" },
      { name: "최종페이지", path: "/final" },
    ];
    factory(items, 5);

    expect(screen.getByText("홈")).toBeInTheDocument();
    expect(screen.getByText("최종페이지")).toBeInTheDocument();
    expect(screen.getByTestId("ellipsis-icon")).toBeInTheDocument();

    expect(screen.queryByText("1뎁스")).not.toBeInTheDocument();
    expect(screen.queryByText("2뎁스")).not.toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });

  it('마지막 아이템은 aria-current="page"로 표시되고 링크가 아님', () => {
    const items = [
      { name: "홈", path: "/" },
      { name: "목록", path: "/list" },
      { name: "상세", path: "/detail" },
    ];
    factory(items);

    const current = screen.getByText("상세");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).toBe("SPAN");
  });

  it("홈 아이콘이 name이 '홈'일 때만 렌더링됨", () => {
    const items = [
      { name: "홈", path: "/" },
      { name: "다른페이지", path: "/other" },
    ];
    factory(items);

    expect(screen.getByTestId("home-icon")).toBeInTheDocument();

    const homeIcons = screen.getAllByTestId("home-icon");
    expect(homeIcons).toHaveLength(1);
  });

  // 수정된 테스트: ellipsis 관련 chevron 로직 정확히 테스트
  it("ellipsis가 있을 때 chevron 렌더링 로직이 올바름", () => {
    const items = Array.from({ length: 6 }, (_, i) => ({
      name: i === 0 ? "홈" : `페이지${i}`,
      path: i === 0 ? "/" : `/page${i}`,
    }));

    factory(items, 5);

    // 현재 컴포넌트 로직: ellipsis 전후에는 chevron이 없음
    // displayItems = [홈, ellipsis, 페이지5]
    // chevron 조건: index < length-1 && !다음아이템.isEllipsis && !현재아이템.isEllipsis
    // 홈(0): 0 < 2 && !ellipsis.isEllipsis && !홈.isEllipsis = true && !true && !false = false
    // ellipsis(1): 1 < 2 && !페이지5.isEllipsis && !ellipsis.isEllipsis = true && !false && !true = false

    const chevrons = screen.queryAllByTestId("chevron-icon");
    expect(chevrons).toHaveLength(0); // 실제로는 chevron이 없음
  });

  // 새로운 테스트: ellipsis 없이 많은 아이템이 있을 때
  it("ellipsis 없이 연속된 아이템들 사이에는 chevron이 표시됨", () => {
    const items = [
      { name: "홈", path: "/" },
      { name: "중간1", path: "/mid1" },
      { name: "중간2", path: "/mid2" },
      { name: "마지막", path: "/last" },
    ];

    factory(items, 5); // maxVisibleItems보다 적으므로 ellipsis 없음

    const chevrons = screen.getAllByTestId("chevron-icon");
    expect(chevrons).toHaveLength(3); // 마지막 아이템 전까지 chevron 표시
  });

  it("빈 배열이 전달되었을 때 올바르게 처리", () => {
    factory([]);

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems).toHaveLength(0);
  });

  it("정확히 maxVisibleItems 개수의 아이템이 있을 때 ellipsis 없이 모두 표시", () => {
    const items = Array.from({ length: 5 }, (_, i) => ({
      name: `페이지${i}`,
      path: `/page${i}`,
    }));

    factory(items, 5);

    expect(screen.queryByTestId("ellipsis-icon")).not.toBeInTheDocument();

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(5);

    // 5개 아이템이므로 4개의 chevron이 있어야 함
    const chevrons = screen.getAllByTestId("chevron-icon");
    expect(chevrons).toHaveLength(4);
  });

  it("nav 요소에 올바른 aria-label이 설정됨", () => {
    const items = [{ name: "홈", path: "/" }];
    factory(items);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "breadcrumb");
  });
});
