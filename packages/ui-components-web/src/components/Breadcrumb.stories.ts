// src/components/Breadcrumb.stories.ts
import type { Meta, StoryObj } from "@storybook/vue3";
import { createRouter, createWebHistory } from "vue-router";
import { within, expect } from "storybook/test"; // 스토리북9 alias 참조
import Breadcrumb from "./Breadcrumb.vue";

/**
 * ──────────────────────────────────────────────
 *  Storybook 메타데이터
 * ──────────────────────────────────────────────
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breadcrumb",
  tags: ["autodocs"],
  component: Breadcrumb,
  // 스토리에 Vue Router를 주입 → <router-link> 처리
  decorators: [
    (story) => {
      const router = createRouter({ history: createWebHistory(), routes: [] });
      return {
        components: { story },
        template: "<story />",
        router,
      };
    },
  ],
  argTypes: {
    maxVisibleItems: {
      control: { type: "number", min: 2, max: 10, step: 1 },
      description: "최대 표시 개수",
      table: { category: "Props" },
    },
    items: {
      control: "object",
      description: "Breadcrumb 데이터 배열",
      table: { category: "Props" },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "경로 길이에 따라 *…* 표시를 자동으로 삽입하는 네비게이션 브레드크럼 컴포넌트.",
      },
    },
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

/* ──────────────────────────────────────────────
   공통 Mock 데이터
   ──────────────────────────────────────────── */
const shortTrail = [
  { name: "홈", path: "/" },
  { name: "카테고리", path: "/category" },
  { name: "게시글", path: "/post/1" },
];
const longTrail = [
  { name: "홈", path: "/" },
  { name: "대분류", path: "/a" },
  { name: "중분류", path: "/a/b" },
  { name: "소분류", path: "/a/b/c" },
  { name: "상세", path: "/a/b/c/d" },
  { name: "글", path: "/a/b/c/d/1" },
];

/* ──────────────────────────────────────────────
   1) Playground  ― Knobs/Controls 로 실험
   ──────────────────────────────────────────── */
export const Playground: Story = {
  args: {
    items: shortTrail,
    maxVisibleItems: 5,
  },
};

/* ──────────────────────────────────────────────
   2) 기본 사례  (items ≤ maxVisibleItems)
   ──────────────────────────────────────────── */
export const Default: Story = {
  args: {
    items: shortTrail,
    maxVisibleItems: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 모든 텍스트가 보이는지 간단 검증
    await expect(canvas.getByText("카테고리")).toBeInTheDocument();
    await expect(canvas.queryByTestId("ellipsis-icon")).not.toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   3) 길어진 경로  (… 표시 확인용)
   ──────────────────────────────────────────── */
export const WithEllipsis: Story = {
  args: {
    items: longTrail,
    maxVisibleItems: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // … 아이콘이 나타나야 함
    await expect(canvas.getByTestId("ellipsis-icon")).toBeInTheDocument();
    // 첫 번째·마지막 텍스트가 그대로 보이는지
    await expect(canvas.getByText("홈")).toBeInTheDocument();
    await expect(canvas.getByText("글")).toBeInTheDocument();
  },
};

/* ──────────────────────────────────────────────
   4) home → 텍스트 대신 아이콘만 쓰고 싶은 상황
   ──────────────────────────────────────────── */
export const IconOnlyHome: Story = {
  args: {
    items: [
      { name: "홈", path: "/" }, // 컴포넌트에서는 '홈'일 때 자동으로 <IconHome/>
      { name: "마이페이지", path: "/mypage" },
    ],
  },
};
