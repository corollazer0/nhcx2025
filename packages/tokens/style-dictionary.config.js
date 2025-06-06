// packages/tokens/sd.config.cjs
module.exports = {
  source: ['input/tokens.json'],
  platforms: {
    // 1. 웹 플랫폼 설정
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    },
    // 2. 안드로이드 플랫폼 설정 추가
    compose: {
      transformGroup: 'compose',
      buildPath: 'build/kotlin/', // 코틀린 파일이 생성될 경로
      files: [
        {
          destination: 'Colors.kt',
          format: 'compose/object',
          className: 'AppColors', // 생성될 코틀린 객체 이름
          packageName: 'com.example.nhcx2025.theme', // 생성될 파일의 패키지 경로
          filter: {
            attributes: {
              category: 'color' // 'color' 카테고리의 토큰만 필터링
            }
          }
        },
      ]
    }
  }
};