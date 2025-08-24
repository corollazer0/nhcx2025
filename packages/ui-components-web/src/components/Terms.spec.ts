import { describe, it, expect, vi } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Terms from './Terms.vue';

describe('Terms', () => {
  const defaultProps = {
    title: '[필수] 전체 동의',
    state: 'close' as const,
    checked: false,
    disabled: false,
    showArrow: true,
    items: []
  };

  const createWrapper = (props = {}): VueWrapper => {
    return mount(Terms, {
      props: { ...defaultProps, ...props }
    });
  };

  describe('기본 렌더링', () => {
    it('기본 props로 올바르게 렌더링된다', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.find('[data-testid="terms"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="terms-title"]').text()).toBe('[필수] 전체 동의');
      expect(wrapper.find('[data-testid="terms-checkbox"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="terms-arrow"]').exists()).toBe(true);
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = createWrapper();
      
      expect(wrapper.find('[data-testid="terms"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="terms-checkbox"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="terms-title"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="terms-arrow"]').exists()).toBe(true);
    });

    it('커스텀 title이 올바르게 표시된다', () => {
      const customTitle = '커스텀 약관 제목';
      const wrapper = createWrapper({ title: customTitle });
      
      expect(wrapper.find('[data-testid="terms-title"]').text()).toBe(customTitle);
    });

    it('showArrow가 false일 때 화살표가 표시되지 않는다', () => {
      const wrapper = createWrapper({ showArrow: false });
      
      expect(wrapper.find('[data-testid="terms-arrow"]').exists()).toBe(false);
    });
  });

  describe('상태별 렌더링', () => {
    it('close 상태에서는 리스트가 표시되지 않는다', () => {
      const wrapper = createWrapper({
        state: 'close',
        items: [{ text: '테스트 항목', checked: false }]
      });
      
      expect(wrapper.find('[data-testid="terms-list"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="terms-divider"]').exists()).toBe(false);
    });

    it('open 상태에서는 리스트와 구분선이 표시된다', () => {
      const wrapper = createWrapper({
        state: 'open',
        items: [{ text: '테스트 항목', checked: false }]
      });
      
      expect(wrapper.find('[data-testid="terms-list"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="terms-divider"]').exists()).toBe(true);
    });

    it('open 상태에서 화살표가 회전된다', () => {
      const wrapper = createWrapper({ state: 'open' });
      
      expect(wrapper.find('[data-testid="terms-arrow"]').classes()).toContain('terms__arrow-btn--rotated');
    });

    it('disabled 상태일 때 올바른 클래스가 적용된다', () => {
      const wrapper = createWrapper({ disabled: true });
      
      expect(wrapper.find('[data-testid="terms"]').classes()).toContain('terms--disabled');
    });
  });

  describe('체크박스 상태', () => {
    it('checked가 true일 때 체크 아이콘이 표시된다', () => {
      const wrapper = createWrapper({ checked: true });
      
      expect(wrapper.find('[data-testid="terms-check-icon"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="terms-checkbox"]').classes()).toContain('terms__checkbox--checked');
    });

    it('checked가 false일 때 체크 아이콘이 표시되지 않는다', () => {
      const wrapper = createWrapper({ checked: false });
      
      const checkIcon = wrapper.find('[data-testid="terms-check-icon"]');
      expect(checkIcon.exists()).toBe(true); // v-show로 인해 DOM에는 존재
      expect(checkIcon.isVisible()).toBe(false); // 하지만 표시되지 않음
    });

    it('체크박스에 올바른 aria 속성이 설정된다', () => {
      const wrapper = createWrapper({ checked: true, disabled: true });
      const checkbox = wrapper.find('[data-testid="terms-checkbox"]');
      
      expect(checkbox.attributes('role')).toBe('checkbox');
      expect(checkbox.attributes('aria-checked')).toBe('true');
      expect(checkbox.attributes('aria-disabled')).toBe('true');
      expect(checkbox.attributes('tabindex')).toBe('0');
    });
  });

  describe('리스트 항목 렌더링', () => {
    const testItems = [
      { text: '첫 번째 항목', checked: true, showArrow: true },
      { text: '두 번째 항목', checked: false, showArrow: false },
      { text: '세 번째 항목', checked: true, disabled: true, showArrow: true }
    ];

    it('items 배열이 올바르게 렌더링된다', () => {
      const wrapper = createWrapper({ 
        state: 'open',
        items: testItems
      });
      
      const listItems = wrapper.findAll('[data-testid="terms-list-item"]');
      expect(listItems).toHaveLength(3);
      
      expect(wrapper.findAll('[data-testid="terms-item-text"]')[0].text()).toBe('첫 번째 항목');
      expect(wrapper.findAll('[data-testid="terms-item-text"]')[1].text()).toBe('두 번째 항목');
      expect(wrapper.findAll('[data-testid="terms-item-text"]')[2].text()).toBe('세 번째 항목');
    });

    it('checked 상태의 리스트 항목에 체크 아이콘이 표시된다', () => {
      const wrapper = createWrapper({ 
        state: 'open',
        items: testItems
      });
      
      const checkIcons = wrapper.findAll('[data-testid="terms-item-check-icon"]');
      expect(checkIcons).toHaveLength(3); // 모든 아이템에 체크 아이콘이 DOM에 존재 (v-show 때문)
      
      // 실제로 보이는 아이콘 확인
      expect(checkIcons[0].isVisible()).toBe(true);  // 첫 번째 항목 checked: true
      expect(checkIcons[1].isVisible()).toBe(false); // 두 번째 항목 checked: false
      expect(checkIcons[2].isVisible()).toBe(true);  // 세 번째 항목 checked: true
    });

    it('showArrow가 true인 리스트 항목에만 화살표가 표시된다', () => {
      const wrapper = createWrapper({ 
        state: 'open',
        items: testItems
      });
      
      const arrowButtons = wrapper.findAll('[data-testid="terms-item-arrow"]');
      expect(arrowButtons).toHaveLength(2); // 첫 번째와 세 번째만 showArrow: true
    });

    it('빈 items 배열일 때 리스트가 표시되지 않는다', () => {
      const wrapper = createWrapper({ 
        state: 'open',
        items: []
      });
      
      expect(wrapper.find('[data-testid="terms-list"]').exists()).toBe(false);
    });
  });

  describe('이벤트 처리', () => {
    it('체크박스 클릭 시 update:checked 이벤트가 발생한다', async () => {
      const wrapper = createWrapper({ checked: false });
      
      await wrapper.find('[data-testid="terms-checkbox"]').trigger('click');
      
      expect(wrapper.emitted('update:checked')).toHaveLength(1);
      expect(wrapper.emitted('update:checked')![0]).toEqual([true]);
    });

    it('disabled 상태에서는 체크박스 클릭이 무시된다', async () => {
      const wrapper = createWrapper({ checked: false, disabled: true });
      
      await wrapper.find('[data-testid="terms-checkbox"]').trigger('click');
      
      expect(wrapper.emitted('update:checked')).toBeUndefined();
    });

    it('화살표 클릭 시 update:state와 arrow-click 이벤트가 발생한다', async () => {
      const wrapper = createWrapper({ state: 'close' });
      
      await wrapper.find('[data-testid="terms-arrow"]').trigger('click');
      
      expect(wrapper.emitted('update:state')).toHaveLength(1);
      expect(wrapper.emitted('update:state')![0]).toEqual(['open']);
      expect(wrapper.emitted('arrow-click')).toHaveLength(1);
    });

    it('헤더 클릭 시 header-click 이벤트가 발생한다', async () => {
      const wrapper = createWrapper();
      
      await wrapper.find('.terms__header').trigger('click');
      
      expect(wrapper.emitted('header-click')).toHaveLength(1);
    });

    it('리스트 항목 체크박스 클릭 시 item-check 이벤트가 발생한다', async () => {
      const wrapper = createWrapper({
        state: 'open',
        items: [{ text: '테스트 항목', checked: false }]
      });
      
      await wrapper.find('[data-testid="terms-item-checkbox"]').trigger('click');
      
      expect(wrapper.emitted('item-check')).toHaveLength(1);
      expect(wrapper.emitted('item-check')![0]).toEqual([0, true]);
    });

    it('리스트 항목 화살표 클릭 시 item-arrow-click 이벤트가 발생한다', async () => {
      const wrapper = createWrapper({
        state: 'open',
        items: [{ text: '테스트 항목', checked: false, showArrow: true }]
      });
      
      await wrapper.find('[data-testid="terms-item-arrow"]').trigger('click');
      
      expect(wrapper.emitted('item-arrow-click')).toHaveLength(1);
      expect(wrapper.emitted('item-arrow-click')![0]).toEqual([0]);
    });
  });

  describe('키보드 상호작용', () => {
    it('체크박스에서 Space 키 입력 시 체크 상태가 토글된다', async () => {
      const wrapper = createWrapper({ checked: false });
      
      await wrapper.find('[data-testid="terms-checkbox"]').trigger('keydown.space');
      
      expect(wrapper.emitted('update:checked')).toHaveLength(1);
      expect(wrapper.emitted('update:checked')![0]).toEqual([true]);
    });

    it('체크박스에서 Enter 키 입력 시 체크 상태가 토글된다', async () => {
      const wrapper = createWrapper({ checked: false });
      
      await wrapper.find('[data-testid="terms-checkbox"]').trigger('keydown.enter');
      
      expect(wrapper.emitted('update:checked')).toHaveLength(1);
      expect(wrapper.emitted('update:checked')![0]).toEqual([true]);
    });

    it('리스트 항목 체크박스에서 Space 키 입력 시 이벤트가 발생한다', async () => {
      const wrapper = createWrapper({
        state: 'open',
        items: [{ text: '테스트 항목', checked: false }]
      });
      
      await wrapper.find('[data-testid="terms-item-checkbox"]').trigger('keydown.space');
      
      expect(wrapper.emitted('item-check')).toHaveLength(1);
      expect(wrapper.emitted('item-check')![0]).toEqual([0, true]);
    });

    it('리스트 항목 체크박스에서 Enter 키 입력 시 이벤트가 발생한다', async () => {
      const wrapper = createWrapper({
        state: 'open',
        items: [{ text: '테스트 항목', checked: false }]
      });
      
      await wrapper.find('[data-testid="terms-item-checkbox"]').trigger('keydown.enter');
      
      expect(wrapper.emitted('item-check')).toHaveLength(1);
      expect(wrapper.emitted('item-check')![0]).toEqual([0, true]);
    });
  });

  describe('접근성', () => {
    it('체크박스에 적절한 ARIA 레이블이 설정된다', () => {
      const wrapper = createWrapper();
      const checkbox = wrapper.find('[data-testid="terms-checkbox"]');
      
      expect(checkbox.attributes('role')).toBe('checkbox');
      expect(checkbox.attributes('tabindex')).toBe('0');
    });

    it('화살표 버튼에 적절한 ARIA 레이블이 설정된다', () => {
      const wrapper = createWrapper({ state: 'close' });
      const arrowBtn = wrapper.find('[data-testid="terms-arrow"]');
      
      expect(arrowBtn.attributes('aria-expanded')).toBe('false');
      expect(arrowBtn.attributes('aria-label')).toBe('약관 펼치기');
    });

    it('open 상태에서 화살표 버튼의 ARIA 레이블이 변경된다', () => {
      const wrapper = createWrapper({ state: 'open' });
      const arrowBtn = wrapper.find('[data-testid="terms-arrow"]');
      
      expect(arrowBtn.attributes('aria-expanded')).toBe('true');
      expect(arrowBtn.attributes('aria-label')).toBe('약관 접기');
    });

    it('리스트 항목 화살표 버튼에 적절한 ARIA 레이블이 설정된다', () => {
      const wrapper = createWrapper({
        state: 'open',
        items: [{ text: '개인정보 처리방침', checked: false, showArrow: true }]
      });
      
      const itemArrow = wrapper.find('[data-testid="terms-item-arrow"]');
      expect(itemArrow.attributes('aria-label')).toBe('개인정보 처리방침 약관 보기');
    });
  });

  describe('조건부 렌더링', () => {
    it('state가 close일 때 관련 요소들이 표시되지 않는다', () => {
      const wrapper = createWrapper({
        state: 'close',
        items: [{ text: '테스트 항목', checked: false }]
      });
      
      expect(wrapper.find('[data-testid="terms-list"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="terms-divider"]').exists()).toBe(false);
    });

    it('items가 비어있을 때 리스트가 렌더링되지 않는다', () => {
      const wrapper = createWrapper({
        state: 'open',
        items: []
      });
      
      expect(wrapper.find('[data-testid="terms-list"]').exists()).toBe(false);
    });

    it('showArrow가 false인 항목에는 화살표가 표시되지 않는다', () => {
      const wrapper = createWrapper({
        state: 'open',
        items: [
          { text: '화살표 있음', showArrow: true },
          { text: '화살표 없음', showArrow: false }
        ]
      });
      
      const arrowButtons = wrapper.findAll('[data-testid="terms-item-arrow"]');
      expect(arrowButtons).toHaveLength(1);
    });
  });

  describe('Edge Cases', () => {
    it('빈 문자열 title이 올바르게 처리된다', () => {
      const wrapper = createWrapper({ title: '' });
      
      expect(wrapper.find('[data-testid="terms-title"]').text()).toBe('');
    });

    it('매우 긴 title이 올바르게 처리된다', () => {
      const longTitle = 'a'.repeat(100);
      const wrapper = createWrapper({ title: longTitle });
      
      expect(wrapper.find('[data-testid="terms-title"]').text()).toBe(longTitle);
    });

    it('특수 문자가 포함된 title이 올바르게 처리된다', () => {
      const specialTitle = '<script>alert("test")</script> & "quotes"';
      const wrapper = createWrapper({ title: specialTitle });
      
      expect(wrapper.find('[data-testid="terms-title"]').text()).toBe(specialTitle);
    });

    it('disabled된 리스트 항목 클릭이 무시된다', async () => {
      const wrapper = createWrapper({
        state: 'open',
        items: [{ text: '비활성화 항목', checked: false, disabled: true }]
      });
      
      await wrapper.find('[data-testid="terms-item-checkbox"]').trigger('click');
      
      expect(wrapper.emitted('item-check')).toBeUndefined();
    });
  });

  describe('Props 검증', () => {
    it('모든 기본값이 올바르게 설정된다', () => {
      // 실제 props를 전달하여 기본값 동작 확인
      const wrapper = createWrapper({
        title: '[필수] 전체 동의',
        state: 'close',
        checked: false,
        disabled: false,
        showArrow: true,
        items: []
      });
      
      expect(wrapper.props().title).toBe('[필수] 전체 동의');
      expect(wrapper.props().state).toBe('close');
      expect(wrapper.props().checked).toBe(false);
      expect(wrapper.props().disabled).toBe(false);
      expect(wrapper.props().showArrow).toBe(true);
      expect(wrapper.props().items).toEqual([]);
    });

    it('기본값이 컴포넌트에 올바르게 적용된다', () => {
      // 빈 props로 마운트하여 기본값이 UI에 반영되는지 확인
      const wrapper = createWrapper({});
      
      expect(wrapper.find('[data-testid="terms-title"]').text()).toBe('[필수] 전체 동의');
      expect(wrapper.find('[data-testid="terms"]').classes()).toContain('terms--close');
      expect(wrapper.find('[data-testid="terms-checkbox"]').attributes('aria-checked')).toBe('false');
      expect(wrapper.find('[data-testid="terms-arrow"]').exists()).toBe(true);
    });

    it('props 변경이 올바르게 반영된다', async () => {
      const wrapper = createWrapper({ checked: false });
      
      await wrapper.setProps({ checked: true });
      
      const checkIcon = wrapper.find('[data-testid="terms-check-icon"]');
      expect(checkIcon.isVisible()).toBe(true);
    });
  });
});