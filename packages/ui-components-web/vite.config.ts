/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { defineConfig as defineVitest } from "vitest/config";
// https://vite.dev/config/
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const commonPlugins = [vue(), tsconfigPaths()];

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: commonPlugins,
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // ✅ 전역 설정 (모든 프로젝트에 상속됨)
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      all: true,
      include: ["src/**/*.{vue,ts}"],
    },

    // 프로젝트 분리
    projects: [
      // 1️⃣ 일반 Vitest 테스트
      {
        plugins: commonPlugins,
        test: {
          // ✨ 모든 테스트 설정을 'test' 객체 안으로 이동
          name: "unit", // ✅ 'name'을 test 객체 안으로
          globals: true,
          environment: "jsdom",
          setupFiles: "./test/setup.ts",

          include: [
            "src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
            "test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
          ],
          exclude: [
            "src/**/*.stories.{js,ts,jsx,tsx}",
            "node_modules/**",
            "dist/**",
          ],
        },
      },

      // 2️⃣ Storybook 테스트
      {
        // 'plugins'는 Vite 설정이므로 'test' 객체 밖에 그대로 둡니다.
        plugins: [
          ...commonPlugins,
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          // ✨ 모든 테스트 설정을 'test' 객체 안으로 이동
          name: "storybook", // ✅ 'name'을 test 객체 안으로
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
          include: ["src/**/*.stories.{js,ts,jsx,tsx}"],
        },
      },
    ],
  },
});
