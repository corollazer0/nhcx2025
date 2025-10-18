// Region Picker Bottom Sheet Types and Constants
// Based on Figma Frame: FMDC-0802030000F01

export interface ProvinceOption {
  name: string
  value: string
  cities: CityOption[]
}

export interface CityOption {
  name: string
  value: string
}

export interface RegionPickerData {
  selectedProvince: string
  selectedCity: string
  fullAddress: string
}

export interface PickerItem {
  label: string
  value: any
  selected?: boolean
  pressed?: boolean
}

export interface PickerColumn {
  items: PickerItem[]
}

// Default data matching Figma design
export const DEFAULT_REGION_PICKER_DATA: RegionPickerData = {
  selectedProvince: '경기도',
  selectedCity: '고양시 일산동구',
  fullAddress: '경기도 고양시 일산동구'
}

// Constants from Figma design
export const REGION_PICKER_CONSTANTS = {
  // Page metadata
  TITLE: '희망 지역을 선택해 주세요',
  CTA_TEXT: '확인',

  // Figma node IDs for mapping
  FIGMA_NODE_IDS: {
    FRAME: '1:2565',
    BOTTOMSHEET: '1:2566',
    PICKER: '1:2567',
    NAVIGATION: 'I1:2567;8198:55866',
    CONTENTS: 'I1:2567;3451:74563',
    CTA: 'I1:2567;5078:62568'
  },

  // Design tokens from Figma
  DESIGN_TOKENS: {
    FRAME_WIDTH: 360,
    FRAME_HEIGHT: 760,
    BOTTOMSHEET_HEIGHT: 456,
    BOTTOMSHEET_TOP: 304
  },

  // Typography tokens from Figma
  TYPOGRAPHY: {
    TITLE: {
      fontFamily: 'Pretendard',
      fontSize: 20,
      fontWeight: 600,
      lineHeight: 28,
      letterSpacing: -0.4
    },
    PICKER_ITEM: {
      fontFamily: 'Pretendard',
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 24,
      letterSpacing: -0.32
    },
    PICKER_ITEM_SELECTED: {
      fontFamily: 'Pretendard',
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 24,
      letterSpacing: -0.32
    },
    CTA_BUTTON: {
      fontFamily: 'Pretendard',
      fontSize: 18,
      fontWeight: 500,
      lineHeight: 26,
      letterSpacing: -0.36
    }
  },

  // Color tokens from Figma
  COLORS: {
    PICKER_DEFAULT: '#121212', // color/text/picker/default
    PICKER_SELECTED: '#19973c', // color/text/picker/piacker-select
    BG_DIMMED: '#1111114d', // color/bg/dimmed
    BG_DEFAULT: '#ffffff', // color/bg/default
    BG_PRESSED: '#f6f6f6' // Picker item pressed state
  }
} as const

// Province and city data matching Figma design
export const PROVINCE_DATA: ProvinceOption[] = [
  {
    name: '강원특별자치도',
    value: 'gangwon',
    cities: [
      { name: '가평군', value: 'gapyeong' },
      { name: '강릉시', value: 'gangneung' },
      { name: '고성군', value: 'goseong' },
      { name: '동해시', value: 'donghae' },
      { name: '삼척시', value: 'samcheok' },
      { name: '속초시', value: 'sokcho' },
      { name: '양구군', value: 'yanggu' },
      { name: '양양군', value: 'yangyang' },
      { name: '영월군', value: 'yeongwol' },
      { name: '원주시', value: 'wonju' },
      { name: '인제군', value: 'inje' },
      { name: '정선군', value: 'jeongseon' },
      { name: '철원군', value: 'cheorwon' },
      { name: '춘천시', value: 'chuncheon' },
      { name: '태백시', value: 'taebaek' },
      { name: '평창군', value: 'pyeongchang' },
      { name: '홍천군', value: 'hongcheon' },
      { name: '화천군', value: 'hwacheon' },
      { name: '횡성군', value: 'hoengseong' }
    ]
  },
  {
    name: '경기도',
    value: 'gyeonggi',
    cities: [
      { name: '가평군', value: 'gapyeong' },
      { name: '고양시 덕양구', value: 'goyang-deokyang' },
      { name: '고양시 일산동구', value: 'goyang-ilsandong' },
      { name: '고양시 일산서구', value: 'goyang-ilsanseo' },
      { name: '과천시', value: 'gwacheon' },
      { name: '광명시', value: 'gwangmyeong' },
      { name: '광주시', value: 'gwangju' },
      { name: '구리시', value: 'guri' },
      { name: '군포시', value: 'gunpo' },
      { name: '김포시', value: 'gimpo' },
      { name: '남양주시', value: 'namyangju' },
      { name: '동두천시', value: 'dongducheon' },
      { name: '부천시', value: 'bucheon' },
      { name: '성남시 분당구', value: 'seongnam-bundang' },
      { name: '성남시 수정구', value: 'seongnam-sujeong' },
      { name: '성남시 중원구', value: 'seongnam-jungwon' },
      { name: '수원시 영통구', value: 'suwon-yeongtong' },
      { name: '수원시 장안구', value: 'suwon-jangan' },
      { name: '수원시 팔달구', value: 'suwon-paldal' },
      { name: '수원시 권선구', value: 'suwon-gwonseon' },
      { name: '시흥시', value: 'siheung' },
      { name: '안산시 단원구', value: 'ansan-danwon' },
      { name: '안산시 상록구', value: 'ansan-sangnok' },
      { name: '안성시', value: 'anseong' },
      { name: '안양시 동안구', value: 'anyang-dongan' },
      { name: '안양시 만안구', value: 'anyang-manan' },
      { name: '양주시', value: 'yangju' },
      { name: '양평군', value: 'yangpyeong' },
      { name: '여주시', value: 'yeoju' },
      { name: '연천군', value: 'yeoncheon' },
      { name: '오산시', value: 'osan' },
      { name: '용인시 기흥구', value: 'yongin-giheung' },
      { name: '용인시 수지구', value: 'yongin-suji' },
      { name: '용인시 처인구', value: 'yongin-cheoin' },
      { name: '의왕시', value: 'uiwang' },
      { name: '의정부시', value: 'uijeongbu' },
      { name: '이천시', value: 'icheon' },
      { name: '파주시', value: 'paju' },
      { name: '평택시', value: 'pyeongtaek' },
      { name: '포천시', value: 'pocheon' },
      { name: '하남시', value: 'hanam' },
      { name: '화성시', value: 'hwaseong' }
    ]
  },
  {
    name: '경상남도',
    value: 'gyeongnam',
    cities: [
      { name: '거제시', value: 'geoje' },
      { name: '거창군', value: 'geochang' },
      { name: '고성군', value: 'goseong' },
      { name: '김해시', value: 'gimhae' },
      { name: '남해군', value: 'namhae' },
      { name: '밀양시', value: 'miryang' },
      { name: '사천시', value: 'sacheon' },
      { name: '산청군', value: 'sancheong' },
      { name: '양산시', value: 'yangsan' },
      { name: '의령군', value: 'uiryeong' },
      { name: '진주시', value: 'jinju' },
      { name: '창녕군', value: 'changnyeong' },
      { name: '창원시 마산합포구', value: 'changwon-masanhappo' },
      { name: '창원시 마산회원구', value: 'changwon-masanhoewon' },
      { name: '창원시 성산구', value: 'changwon-seongsan' },
      { name: '창원시 의창구', value: 'changwon-uichang' },
      { name: '창원시 진해구', value: 'changwon-jinhae' },
      { name: '통영시', value: 'tongyeong' },
      { name: '하동군', value: 'hadong' },
      { name: '함안군', value: 'haman' },
      { name: '함양군', value: 'hamyang' },
      { name: '합천군', value: 'hapcheon' }
    ]
  },
  {
    name: '경상북도',
    value: 'gyeongbuk',
    cities: [
      { name: '경산시', value: 'gyeongsan' },
      { name: '경주시', value: 'gyeongju' },
      { name: '고령군', value: 'goryeong' },
      { name: '구미시', value: 'gumi' },
      { name: '군위군', value: 'gunwi' },
      { name: '김천시', value: 'gimcheon' },
      { name: '문경시', value: 'mungyeong' },
      { name: '봉화군', value: 'bonghwa' },
      { name: '상주시', value: 'sangju' },
      { name: '성주군', value: 'seongju' },
      { name: '안동시', value: 'andong' },
      { name: '영덕군', value: 'yeongdeok' },
      { name: '영양군', value: 'yeongyang' },
      { name: '영주시', value: 'yeongju' },
      { name: '영천시', value: 'yeongcheon' },
      { name: '예천군', value: 'yecheon' },
      { name: '울릉군', value: 'ulleung' },
      { name: '울진군', value: 'uljin' },
      { name: '의성군', value: 'uiseong' },
      { name: '청도군', value: 'cheongdo' },
      { name: '청송군', value: 'cheongsong' },
      { name: '칠곡군', value: 'chilgok' },
      { name: '포항시 남구', value: 'pohang-nam' },
      { name: '포항시 북구', value: 'pohang-buk' }
    ]
  },
  {
    name: '광주광역시',
    value: 'gwangju',
    cities: [
      { name: '광산구', value: 'gwangsan' },
      { name: '남구', value: 'nam' },
      { name: '동구', value: 'dong' },
      { name: '북구', value: 'buk' },
      { name: '서구', value: 'seo' }
    ]
  }
]

// Type exports for component prop validation
export type RegionPickerState = 'initial' | 'selecting' | 'selected' | 'confirming'