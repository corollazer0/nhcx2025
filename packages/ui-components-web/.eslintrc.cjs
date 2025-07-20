module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'vue/setup-compiler-macros': true, // defineProps, defineEmits 등 매크로를 전역으로 인식
  },
  parser: 'vue-eslint-parser', // .vue 파일의 <template> 파싱
  parserOptions: {
    parser: '@typescript-eslint/parser', // .vue 파일의 <script> 파싱
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended', // Vue.js 3 추천 규칙
    'plugin:prettier/recommended', // Prettier 규칙을 ESLint에 통합 (가장 마지막에 와야 함)
  ],
  rules: {
    // 프로젝트별 커스텀 규칙 추가
    'vue/multi-word-component-names': 'off', // 컴포넌트 이름을 여러 단어로 강제하는 규칙 비활성화
    '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],
  },
};