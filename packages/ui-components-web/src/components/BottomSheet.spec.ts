import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BottomSheet from './BottomSheet.vue';

describe('BottomSheet', () => {
  let wrapper: ReturnType<typeof mount>;

  // Mock data
  const mockPickerColumns = [
    {
      items: [
        { label: '3시', value: 3, selected: false },
        { label: '4시', value: 4, selected: false },
        { label: '5시', value: 5, selected: true }
      ]
    },
    {
      items: [
        { label: '19분', value: 19, selected: false },
        { label: '20분', value: 20, pressed: true },
        { label: '21분', value: 21, selected: true }
      ]
    }
  ];

  const mockTabs = [
    { label: 'NH농협', value: 'nh', active: true },
    { label: '다른금융', value: 'other', active: false }
  ];

  const mockAccountGroups = [
    {
      title: 'NH농협은행',
      accounts: [
        {
          id: '1',
          bankName: 'NH농협은행',
          accountName: '금융사명',
          accountNumber: '계좌번호',
          logoUrl: '/logo1.png',
          isFavorite: false,
          isSelected: false
        },
        {
          id: '2',
          bankName: 'NH농협은행',
          accountName: '금융사명2',
          accountNumber: '계좌번호2',
          logoUrl: '/logo2.png',
          isFavorite: true,
          isSelected: true
        }
      ]
    }
  ];

  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      wrapper = mount(BottomSheet, {
        props: { isVisible: true }
      });
      
      expect(wrapper.find('[data-testid="bottom-sheet"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('bottom-sheet');
    });

    it('기본 props로 basic 타입 바텀시트를 렌더링한다', () => {
      wrapper = mount(BottomSheet, {
        props: { isVisible: true }
      });
      
      expect(wrapper.classes()).toContain('bottom-sheet--basic');
      expect(wrapper.find('.bottom-sheet__basic').exists()).toBe(true);
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      wrapper = mount(BottomSheet, {
        props: { isVisible: true }
      });
      
      expect(wrapper.find('[data-testid="bottom-sheet"]').exists()).toBe(true);
    });

    it('isVisible이 false일 때 컴포넌트가 숨겨진다', () => {
      wrapper = mount(BottomSheet, {
        props: { isVisible: false }
      });
      
      expect(wrapper.find('[data-testid="bottom-sheet"]').exists()).toBe(false);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('title prop이 올바르게 렌더링된다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          title: '테스트 타이틀' 
        }
      });

      expect(wrapper.find('.bottom-sheet__title').text()).toBe('테스트 타이틀');
    });

    it('showCloseButton이 false일 때 닫기 버튼이 숨겨진다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          showCloseButton: false 
        }
      });

      expect(wrapper.find('.bottom-sheet__close').exists()).toBe(false);
    });

    it('showCta가 false일 때 CTA 버튼이 숨겨진다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          showCta: false 
        }
      });

      expect(wrapper.find('.bottom-sheet__cta').exists()).toBe(false);
    });

    it('ctaText prop이 올바르게 렌더링된다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          ctaText: '저장' 
        }
      });

      expect(wrapper.find('.bottom-sheet__cta-button').text()).toBe('저장');
    });

    it('type prop에 따라 올바른 클래스가 적용된다', () => {
      const types = ['basic', 'picker', 'keypad', 'account'] as const;
      
      types.forEach(type => {
        wrapper = mount(BottomSheet, {
          props: { 
            isVisible: true,
            type 
          }
        });
        
        expect(wrapper.classes()).toContain(`bottom-sheet--${type}`);
      });
    });
  });

  // Basic 타입 테스트
  describe('Basic 타입 테스트', () => {
    beforeEach(() => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'basic',
          content: '테스트 콘텐츠'
        }
      });
    });

    it('basic 타입이 올바르게 렌더링된다', () => {
      expect(wrapper.find('.bottom-sheet__basic').exists()).toBe(true);
      expect(wrapper.find('.bottom-sheet__text').text()).toBe('테스트 콘텐츠');
    });

    it('기본 콘텐츠가 표시된다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'basic'
        }
      });

      expect(wrapper.find('.bottom-sheet__text').text()).toBe('텍스트를 입력해 주세요.');
    });
  });

  // Picker 타입 테스트
  describe('Picker 타입 테스트', () => {
    beforeEach(() => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'picker',
          pickerType: 'hour-minute',
          pickerColumns: mockPickerColumns
        }
      });
    });

    it('picker 타입이 올바르게 렌더링된다', () => {
      expect(wrapper.find('.bottom-sheet__picker').exists()).toBe(true);
      expect(wrapper.find('.bottom-sheet__picker--hour-minute').exists()).toBe(true);
    });

    it('picker 아이템들이 올바르게 렌더링된다', () => {
      const items = wrapper.findAll('.bottom-sheet__picker-item');
      expect(items).toHaveLength(6); // 2개 컬럼 × 3개 아이템

      expect(items[2].classes()).toContain('bottom-sheet__picker-item--selected');
      expect(items[4].classes()).toContain('bottom-sheet__picker-item--pressed');
    });

    it('picker 아이템 클릭 시 이벤트가 emit된다', async () => {
      const item = wrapper.find('.bottom-sheet__picker-item');
      await item.trigger('click');

      expect(wrapper.emitted('picker-change')).toBeTruthy();
      expect(wrapper.emitted('picker-change')).toHaveLength(1);
    });

    it('pickerType에 따라 올바른 그리드가 적용된다', async () => {
      await wrapper.setProps({ pickerType: 'year-month-day' });
      
      expect(wrapper.find('.bottom-sheet__picker--year-month-day').exists()).toBe(true);
    });
  });

  // Keypad 타입 테스트
  describe('Keypad 타입 테스트', () => {
    beforeEach(() => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'keypad',
          initialAmount: 500000,
          quickAmounts: [100000, 500000, 1000000]
        }
      });
    });

    it('keypad 타입이 올바르게 렌더링된다', () => {
      expect(wrapper.find('.bottom-sheet__keypad').exists()).toBe(true);
      expect(wrapper.find('.bottom-sheet__price-display').exists()).toBe(true);
      expect(wrapper.find('.bottom-sheet__keypad-grid').exists()).toBe(true);
    });

    it('초기 금액이 올바르게 표시된다', () => {
      expect(wrapper.find('.bottom-sheet__price-amount').text()).toBe('500,000원');
    });

    it('빠른 금액 버튼들이 렌더링된다', () => {
      const quickButtons = wrapper.findAll('.bottom-sheet__quick-button');
      expect(quickButtons).toHaveLength(3);
      expect(quickButtons[0].text()).toBe('+10만원');
    });

    it('키패드 키들이 렌더링된다', () => {
      const keys = wrapper.findAll('.bottom-sheet__keypad-key');
      expect(keys).toHaveLength(12);
    });

    it('숫자 키 클릭 시 금액이 업데이트된다', async () => {
      const numberKey = wrapper.findAll('.bottom-sheet__keypad-key')[0]; // '1' 키
      await numberKey.trigger('click');

      expect(wrapper.emitted('keypad-input')).toBeTruthy();
      expect(wrapper.emitted('amount-change')).toBeTruthy();
    });

    it('빠른 금액 버튼 클릭 시 이벤트가 emit된다', async () => {
      const quickButton = wrapper.find('.bottom-sheet__quick-button');
      await quickButton.trigger('click');

      expect(wrapper.emitted('quick-amount')).toBeTruthy();
      expect(wrapper.emitted('amount-change')).toBeTruthy();
    });
  });

  // Account 타입 테스트
  describe('Account 타입 테스트', () => {
    beforeEach(() => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'account',
          tabs: mockTabs,
          accountGroups: mockAccountGroups,
          showFavorite: true,
          showCheckbox: true
        }
      });
    });

    it('account 타입이 올바르게 렌더링된다', () => {
      expect(wrapper.find('.bottom-sheet__account').exists()).toBe(true);
      expect(wrapper.find('.bottom-sheet__tabs').exists()).toBe(true);
      expect(wrapper.find('.bottom-sheet__account-lists').exists()).toBe(true);
    });

    it('탭들이 올바르게 렌더링된다', () => {
      const tabs = wrapper.findAll('.bottom-sheet__tab');
      expect(tabs).toHaveLength(2);
      expect(tabs[0].classes()).toContain('bottom-sheet__tab--active');
      expect(tabs[0].text()).toBe('NH농협');
    });

    it('계좌 그룹이 올바르게 렌더링된다', () => {
      const groups = wrapper.findAll('.bottom-sheet__account-group');
      expect(groups).toHaveLength(1);
      
      const groupTitle = wrapper.find('.bottom-sheet__account-group-title');
      expect(groupTitle.text()).toBe('NH농협은행');
    });

    it('계좌 아이템들이 올바르게 렌더링된다', () => {
      const items = wrapper.findAll('.bottom-sheet__account-item');
      expect(items).toHaveLength(2);
      
      const accountNames = wrapper.findAll('.bottom-sheet__account-name');
      expect(accountNames[0].text()).toBe('금융사명');
    });

    it('즐겨찾기 버튼이 올바르게 렌더링된다', () => {
      const favorites = wrapper.findAll('.bottom-sheet__account-favorite');
      expect(favorites).toHaveLength(2);
      expect(favorites[1].classes()).toContain('bottom-sheet__account-favorite--active');
    });

    it('체크박스가 올바르게 렌더링된다', () => {
      const checkboxes = wrapper.findAll('.bottom-sheet__account-checkbox');
      expect(checkboxes).toHaveLength(2);
      expect(checkboxes[1].classes()).toContain('bottom-sheet__account-checkbox--checked');
    });

    it('계좌 아이템 클릭 시 이벤트가 emit된다', async () => {
      const item = wrapper.find('.bottom-sheet__account-item');
      await item.trigger('click');

      expect(wrapper.emitted('account-click')).toBeTruthy();
      expect(wrapper.emitted('account-click')).toHaveLength(1);
    });

    it('즐겨찾기 버튼 클릭 시 이벤트가 emit된다', async () => {
      const favoriteBtn = wrapper.find('.bottom-sheet__account-favorite');
      await favoriteBtn.trigger('click');

      expect(wrapper.emitted('favorite-toggle')).toBeTruthy();
    });

    it('체크박스 클릭 시 이벤트가 emit된다', async () => {
      const checkboxBtn = wrapper.find('.bottom-sheet__account-checkbox');
      await checkboxBtn.trigger('click');

      expect(wrapper.emitted('account-select')).toBeTruthy();
    });

    it('탭 클릭 시 이벤트가 emit된다', async () => {
      const tab = wrapper.find('.bottom-sheet__tab');
      await tab.trigger('click');

      expect(wrapper.emitted('tab-change')).toBeTruthy();
    });

    it('showTabs가 false일 때 탭이 숨겨진다', async () => {
      await wrapper.setProps({ showTabs: false });
      
      expect(wrapper.find('.bottom-sheet__tabs').exists()).toBe(false);
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    beforeEach(() => {
      wrapper = mount(BottomSheet, {
        props: { isVisible: true }
      });
    });

    it('닫기 버튼 클릭 시 close 이벤트가 emit된다', async () => {
      const closeBtn = wrapper.find('.bottom-sheet__close');
      await closeBtn.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it('오버레이 클릭 시 overlay-click 이벤트가 emit된다', async () => {
      const overlay = wrapper.find('.bottom-sheet__overlay');
      await overlay.trigger('click');

      expect(wrapper.emitted('overlay-click')).toBeTruthy();
    });

    it('closeOnOverlay가 true일 때 오버레이 클릭 시 close 이벤트도 emit된다', async () => {
      await wrapper.setProps({ closeOnOverlay: true });
      
      const overlay = wrapper.find('.bottom-sheet__overlay');
      await overlay.trigger('click');

      expect(wrapper.emitted('close')).toBeTruthy();
    });

    it('CTA 버튼 클릭 시 cta-click 이벤트가 emit된다', async () => {
      const ctaBtn = wrapper.find('.bottom-sheet__cta-button');
      await ctaBtn.trigger('click');

      expect(wrapper.emitted('cta-click')).toBeTruthy();
    });

    it('CTA 버튼이 비활성화된 상태에서는 클릭되지 않는다', async () => {
      await wrapper.setProps({ ctaDisabled: true });
      
      const ctaBtn = wrapper.find('.bottom-sheet__cta-button');
      expect(ctaBtn.attributes('disabled')).toBeDefined();
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('visibility에 따라 올바른 클래스가 적용된다', async () => {
      wrapper = mount(BottomSheet, {
        props: { isVisible: false }
      });

      // isVisible이 false일 때 컴포넌트가 렌더링되지 않으므로 true로 변경 후 테스트
      await wrapper.setProps({ isVisible: true });
      
      expect(wrapper.classes()).toContain('bottom-sheet--visible');
    });

    it('타입에 따라 올바른 클래스가 적용된다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'picker' 
        }
      });

      expect(wrapper.classes()).toContain('bottom-sheet--picker');
    });
  });

  // Props 변경 테스트
  describe('Props 변경 테스트', () => {
    beforeEach(() => {
      wrapper = mount(BottomSheet, {
        props: { isVisible: true }
      });
    });

    it('type 변경 시 올바른 콘텐츠가 표시된다', async () => {
      expect(wrapper.find('.bottom-sheet__basic').exists()).toBe(true);

      await wrapper.setProps({ type: 'keypad' });

      expect(wrapper.find('.bottom-sheet__basic').exists()).toBe(false);
      expect(wrapper.find('.bottom-sheet__keypad').exists()).toBe(true);
    });

    it('title 변경 시 올바르게 업데이트된다', async () => {
      await wrapper.setProps({ title: '새로운 타이틀' });

      expect(wrapper.find('.bottom-sheet__title').text()).toBe('새로운 타이틀');
    });

    it('initialAmount 변경 시 keypad의 금액이 업데이트된다', async () => {
      await wrapper.setProps({ 
        type: 'keypad',
        initialAmount: 1000000 
      });

      expect(wrapper.find('.bottom-sheet__price-amount').text()).toBe('1,000,000원');
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 pickerColumns가 전달되어도 오류가 발생하지 않는다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'picker',
          pickerColumns: []
        }
      });

      expect(wrapper.find('.bottom-sheet__picker').exists()).toBe(true);
    });

    it('빈 accountGroups가 전달되어도 오류가 발생하지 않는다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'account',
          accountGroups: []
        }
      });

      expect(wrapper.find('.bottom-sheet__account').exists()).toBe(true);
    });

    it('매우 큰 금액이 올바르게 포맷팅된다', async () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          type: 'keypad',
          initialAmount: 123456789
        }
      });

      expect(wrapper.find('.bottom-sheet__price-amount').text()).toBe('123,456,789원');
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: true,
          title: undefined,
          type: undefined
        }
      });

      expect(wrapper.classes()).toContain('bottom-sheet--basic');
      expect(wrapper.find('.bottom-sheet__title').text()).toBe('');
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    beforeEach(() => {
      wrapper = mount(BottomSheet, {
        props: { isVisible: true }
      });
    });

    it('닫기 버튼에 적절한 aria-label이 설정된다', () => {
      const closeBtn = wrapper.find('.bottom-sheet__close');
      expect(closeBtn.attributes('aria-label')).toBe('닫기');
    });

    it('CTA 버튼이 올바른 type을 가진다', () => {
      const ctaBtn = wrapper.find('.bottom-sheet__cta-button');
      expect(ctaBtn.element.tagName).toBe('BUTTON');
    });

    it('키패드 버튼들이 올바른 role을 가진다', async () => {
      await wrapper.setProps({ type: 'keypad' });
      
      const keypadKeys = wrapper.findAll('.bottom-sheet__keypad-key');
      keypadKeys.forEach(key => {
        expect(key.element.tagName).toBe('BUTTON');
      });
    });
  });

  // 통합 테스트
  describe('통합 테스트', () => {
    it('complete workflow: 바텀시트 열기 → 상호작용 → 닫기', async () => {
      wrapper = mount(BottomSheet, {
        props: { 
          isVisible: false,
          type: 'basic',
          title: '테스트 바텀시트'
        }
      });

      // 초기 상태 확인
      expect(wrapper.find('[data-testid="bottom-sheet"]').exists()).toBe(false);

      // 바텀시트 열기
      await wrapper.setProps({ isVisible: true });
      expect(wrapper.find('[data-testid="bottom-sheet"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('bottom-sheet--visible');

      // CTA 버튼 클릭
      const ctaBtn = wrapper.find('.bottom-sheet__cta-button');
      await ctaBtn.trigger('click');
      expect(wrapper.emitted('cta-click')).toBeTruthy();

      // 닫기 버튼 클릭
      const closeBtn = wrapper.find('.bottom-sheet__close');
      await closeBtn.trigger('click');
      expect(wrapper.emitted('close')).toBeTruthy();
    });
  });
});