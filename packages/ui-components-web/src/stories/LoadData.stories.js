import { fn } from 'storybook/test';

import LoadData from '../components/LoadData.vue';

export default {
  title: 'Components/LoadData',
  component: LoadData,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['basic', 'highlight'],
      description: 'LoadData 컴포넌트의 변형'
    },
    labelText: {
      control: 'text',
      description: '상단 레이블 텍스트'
    },
    innerLabelText: {
      control: 'text',
      description: 'Basic 변형의 내부 레이블 텍스트'
    },
    highlightLabelText: {
      control: 'text',
      description: 'Highlight 변형의 메인 레이블 텍스트'
    },
    highlightDescriptionText: {
      control: 'text',
      description: 'Highlight 변형의 설명 텍스트'
    },
    dataText: {
      control: 'text',
      description: '데이터 텍스트'
    },
    messageText: {
      control: 'text',
      description: '하단 메시지 텍스트'
    },
    label: {
      control: 'boolean',
      description: '상단 레이블 표시 여부'
    },
    innerLabel: {
      control: 'boolean',
      description: 'Basic 변형의 내부 레이블 표시 여부'
    },
    message: {
      control: 'boolean',
      description: '하단 메시지 표시 여부'
    }
  },
  args: {
    onClick: fn()
  },
  parameters: {
    docs: {
      description: {
        component: `
LoadData 컴포넌트는 레이블과 데이터를 표시하는 데 사용됩니다.

**변형:**
- \`basic\`: 간단한 레이블과 데이터를 표시
- \`highlight\`: 강조된 레이블과 부가설명이 있는 데이터를 표시

**사용법:**
\`\`\`vue
<LoadData
  variant="basic"
  labelText="레이블"
  innerLabelText="Label"
  dataText="Data"
  messageText="안내 문구"
/>
\`\`\`
        `
      }
    }
  }
};

// Playground - 모든 controls 사용 가능
export const Playground = {
  args: {
    variant: 'basic',
    labelText: '레이블',
    innerLabelText: 'Label',
    highlightLabelText: 'Label',
    highlightDescriptionText: '부가설명',
    dataText: 'Data',
    messageText: '안내 문구 입력',
    label: true,
    innerLabel: true,
    message: true
  }
};

// Default - Basic
export const Default = {
  args: {
    variant: 'basic',
    labelText: '레이블',
    innerLabelText: 'Label',
    dataText: 'Data',
    messageText: '안내 문구 입력',
    label: true,
    innerLabel: true,
    message: true
  },
  parameters: {
    docs: {
      description: {
        story: '기본 Basic 변형입니다. 간단한 레이블과 데이터를 표시합니다.'
      }
    }
  }
};

// Basic Variant
export const BasicVariant = {
  args: {
    variant: 'basic',
    labelText: '계좌 잔액',
    innerLabelText: '잔액',
    dataText: '1,234,567원',
    messageText: '최근 업데이트: 2024-01-15 14:30',
    label: true,
    innerLabel: true,
    message: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic 변형의 실제 사용 예시입니다.'
      }
    }
  }
};

// Highlight Variant
export const HighlightVariant = {
  args: {
    variant: 'highlight',
    labelText: '투자 현황',
    highlightLabelText: '총 투자금',
    highlightDescriptionText: '원금 기준',
    dataText: '5,000,000원',
    messageText: '수익률: +12.5%',
    label: true,
    message: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlight 변형입니다. 강조된 레이블과 부가설명을 포함합니다.'
      }
    }
  }
};

// Without Label
export const WithoutLabel = {
  args: {
    variant: 'basic',
    labelText: '레이블',
    innerLabelText: 'Label',
    dataText: 'Data',
    messageText: '안내 문구 입력',
    label: false,
    innerLabel: true,
    message: true
  },
  parameters: {
    docs: {
      description: {
        story: '상단 레이블을 숨긴 버전입니다.'
      }
    }
  }
};

// Without Inner Label
export const WithoutInnerLabel = {
  args: {
    variant: 'basic',
    labelText: '레이블',
    innerLabelText: 'Label',
    dataText: 'Data',
    messageText: '안내 문구 입력',
    label: true,
    innerLabel: false,
    message: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic 변형에서 내부 레이블을 숨긴 버전입니다.'
      }
    }
  }
};

// Without Message
export const WithoutMessage = {
  args: {
    variant: 'basic',
    labelText: '레이블',
    innerLabelText: 'Label',
    dataText: 'Data',
    messageText: '안내 문구 입력',
    label: true,
    innerLabel: true,
    message: false
  },
  parameters: {
    docs: {
      description: {
        story: '하단 메시지를 숨긴 버전입니다.'
      }
    }
  }
};

// Long Text
export const LongText = {
  args: {
    variant: 'highlight',
    labelText: '매우 긴 레이블 텍스트입니다 길어서 잘릴 수 있습니다',
    highlightLabelText: '매우 긴 하이라이트 레이블',
    highlightDescriptionText: '매우 긴 부가설명 텍스트',
    dataText: '999,999,999,999원',
    messageText: '매우 긴 메시지 텍스트입니다. 이 메시지는 매우 길어서 여러 줄에 걸쳐 표시될 수 있습니다.',
    label: true,
    message: true
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 포함된 경우의 레이아웃을 확인할 수 있습니다.'
      }
    }
  }
};

// Empty Message
export const EmptyMessage = {
  args: {
    variant: 'basic',
    labelText: '레이블',
    innerLabelText: 'Label',
    dataText: 'Data',
    messageText: '',
    label: true,
    innerLabel: true,
    message: true
  },
  parameters: {
    docs: {
      description: {
        story: '메시지 텍스트가 비어있는 경우입니다.'
      }
    }
  }
};

// Minimal
export const Minimal = {
  args: {
    variant: 'basic',
    labelText: '레이블',
    innerLabelText: 'Label',
    dataText: 'Data',
    messageText: '안내 문구 입력',
    label: false,
    innerLabel: false,
    message: false
  },
  parameters: {
    docs: {
      description: {
        story: '필수 요소(데이터)만 표시하는 최소 버전입니다.'
      }
    }
  }
};

// Interactive Test
export const InteractiveTest = {
  args: {
    variant: 'basic',
    labelText: '클릭 테스트',
    innerLabelText: 'Click Me',
    dataText: 'Interactive',
    messageText: '클릭해보세요!',
    label: true,
    innerLabel: true,
    message: true
  },
  parameters: {
    docs: {
      description: {
        story: '클릭 상호작용을 테스트할 수 있는 버전입니다. Actions 패널에서 클릭 이벤트를 확인할 수 있습니다.'
      }
    }
  }
};