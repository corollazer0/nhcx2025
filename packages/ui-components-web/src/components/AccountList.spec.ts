import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AccountList from './AccountList.vue';

describe('AccountList', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(AccountList);
      
      expect(wrapper.find('[data-testid="account-list"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('account-list');
    });

    it('기본 props로 default 계좌 정보를 렌더링한다', () => {
      const wrapper = mount(AccountList);
      
      expect(wrapper.classes()).toContain('account-list--default');
      expect(wrapper.text()).toContain('금융사명');
      expect(wrapper.text()).toContain('계좌번호');
    });

    it('data-testid 속성들이 올바르게 설정된다', () => {
      const wrapper = mount(AccountList);
      
      expect(wrapper.find('[data-testid="account-list"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="account-logo"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="account-content"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="account-favorite"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props', () => {
    it('bankName prop이 올바르게 렌더링된다', () => {
      const bankName = '국민은행';
      const wrapper = mount(AccountList, {
        props: { bankName }
      });
      
      expect(wrapper.find('.account-list__bank-name').text()).toBe(bankName);
    });

    it('accountNumber prop이 올바르게 렌더링된다', () => {
      const accountNumber = '123-456-789012';
      const wrapper = mount(AccountList, {
        props: { accountNumber }
      });
      
      expect(wrapper.find('.account-list__account-number').text()).toBe(accountNumber);
    });

    it('bankLogo prop이 올바르게 설정된다', () => {
      const bankLogo = 'https://example.com/logo.png';
      const wrapper = mount(AccountList, {
        props: { bankLogo }
      });
      
      const logoImage = wrapper.find('.account-list__logo-image');
      expect(logoImage.attributes('src')).toBe(bankLogo);
      expect(logoImage.attributes('alt')).toBe('금융사명 로고');
    });

    it('showFavorite가 false일 때 즐겨찾기 아이콘이 숨겨진다', () => {
      const wrapper = mount(AccountList, {
        props: { showFavorite: false }
      });
      
      expect(wrapper.find('[data-testid="account-favorite"]').exists()).toBe(false);
    });

    it('showFavorite가 true일 때 즐겨찾기 아이콘이 표시된다', () => {
      const wrapper = mount(AccountList, {
        props: { showFavorite: true }
      });
      
      expect(wrapper.find('[data-testid="account-favorite"]').exists()).toBe(true);
    });

    it('favoriteIcon prop이 올바르게 설정된다', () => {
      const favoriteIcon = 'https://example.com/star.svg';
      const wrapper = mount(AccountList, {
        props: { favoriteIcon }
      });
      
      const favoriteImage = wrapper.find('.account-list__favorite-icon');
      expect(favoriteImage.attributes('src')).toBe(favoriteIcon);
      expect(favoriteImage.attributes('alt')).toBe('즐겨찾기');
    });

    it('variant prop이 올바르게 적용된다', () => {
      const wrapper = mount(AccountList, {
        props: { variant: 'default' }
      });
      
      expect(wrapper.classes()).toContain('account-list--default');
    });
  });

  // 이벤트 테스트
  describe('이벤트', () => {
    it('컴포넌트 클릭 시 click 이벤트가 emit된다', async () => {
      const wrapper = mount(AccountList);
      
      await wrapper.find('[data-testid="account-list"]').trigger('click');
      
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('즐겨찾기 클릭 시 favoriteClick 이벤트가 emit된다', async () => {
      const wrapper = mount(AccountList);
      
      await wrapper.find('[data-testid="account-favorite"]').trigger('click');
      
      expect(wrapper.emitted('favoriteClick')).toBeTruthy();
      expect(wrapper.emitted('favoriteClick')).toHaveLength(1);
    });

    it('즐겨찾기 클릭 시 상위 요소 클릭 이벤트가 발생하지 않는다', async () => {
      const wrapper = mount(AccountList);
      
      await wrapper.find('[data-testid="account-favorite"]').trigger('click');
      
      expect(wrapper.emitted('favoriteClick')).toBeTruthy();
      expect(wrapper.emitted('click')).toBeFalsy();
    });

    it('click 이벤트에서 MouseEvent 객체가 전달된다', async () => {
      const wrapper = mount(AccountList);
      
      await wrapper.find('[data-testid="account-list"]').trigger('click');
      
      const clickEvents = wrapper.emitted('click');
      expect(clickEvents).toBeTruthy();
      expect(clickEvents![0][0]).toBeInstanceOf(MouseEvent);
    });

    it('favoriteClick 이벤트에서 MouseEvent 객체가 전달된다', async () => {
      const wrapper = mount(AccountList);
      
      await wrapper.find('[data-testid="account-favorite"]').trigger('click');
      
      const favoriteClickEvents = wrapper.emitted('favoriteClick');
      expect(favoriteClickEvents).toBeTruthy();
      expect(favoriteClickEvents![0][0]).toBeInstanceOf(MouseEvent);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링', () => {
    it('bankLogo가 없을 때 이미지가 렌더링되지 않는다', () => {
      const wrapper = mount(AccountList, {
        props: { bankLogo: '' }
      });
      
      expect(wrapper.find('.account-list__logo-image').exists()).toBe(false);
    });

    it('bankLogo가 있을 때 이미지가 렌더링된다', () => {
      const wrapper = mount(AccountList, {
        props: { bankLogo: 'https://example.com/logo.png' }
      });
      
      expect(wrapper.find('.account-list__logo-image').exists()).toBe(true);
    });
  });

  // 접근성 테스트
  describe('접근성', () => {
    it('은행 로고에 적절한 alt 텍스트가 있다', () => {
      const bankName = '신한은행';
      const wrapper = mount(AccountList, {
        props: { 
          bankName,
          bankLogo: 'https://example.com/logo.png' 
        }
      });
      
      const logoImage = wrapper.find('.account-list__logo-image');
      expect(logoImage.attributes('alt')).toBe(`${bankName} 로고`);
    });

    it('즐겨찾기 아이콘에 적절한 alt 텍스트가 있다', () => {
      const wrapper = mount(AccountList);
      
      const favoriteIcon = wrapper.find('.account-list__favorite-icon');
      expect(favoriteIcon.attributes('alt')).toBe('즐겨찾기');
    });
  });

  // Edge cases 테스트
  describe('Edge cases', () => {
    it('빈 문자열 props도 정상적으로 처리한다', () => {
      const wrapper = mount(AccountList, {
        props: {
          bankName: '',
          accountNumber: ''
        }
      });
      
      expect(wrapper.find('.account-list__bank-name').text()).toBe('');
      expect(wrapper.find('.account-list__account-number').text()).toBe('');
    });

    it('긴 텍스트도 정상적으로 처리한다', () => {
      const longBankName = '매우긴금융기관명테스트'.repeat(10);
      const longAccountNumber = '1234-5678-9012-3456-7890'.repeat(5);
      
      const wrapper = mount(AccountList, {
        props: {
          bankName: longBankName,
          accountNumber: longAccountNumber
        }
      });
      
      expect(wrapper.find('.account-list__bank-name').text()).toBe(longBankName);
      expect(wrapper.find('.account-list__account-number').text()).toBe(longAccountNumber);
    });

    it('특수문자가 포함된 텍스트도 정상적으로 처리한다', () => {
      const bankNameWithSpecial = 'NH농협은행 (주)';
      const accountNumberWithSpecial = '123-456-789012 [주계좌]';
      
      const wrapper = mount(AccountList, {
        props: {
          bankName: bankNameWithSpecial,
          accountNumber: accountNumberWithSpecial
        }
      });
      
      expect(wrapper.find('.account-list__bank-name').text()).toBe(bankNameWithSpecial);
      expect(wrapper.find('.account-list__account-number').text()).toBe(accountNumberWithSpecial);
    });
  });

  // 스타일 관련 테스트
  describe('스타일', () => {
    it('기본 CSS 클래스들이 적용된다', () => {
      const wrapper = mount(AccountList);
      
      expect(wrapper.find('.account-list').exists()).toBe(true);
      expect(wrapper.find('.account-list__logo').exists()).toBe(true);
      expect(wrapper.find('.account-list__content').exists()).toBe(true);
      expect(wrapper.find('.account-list__bank-name').exists()).toBe(true);
      expect(wrapper.find('.account-list__account-number').exists()).toBe(true);
      expect(wrapper.find('.account-list__favorite').exists()).toBe(true);
    });

    it('variant 클래스가 동적으로 적용된다', () => {
      const wrapper = mount(AccountList, {
        props: { variant: 'default' }
      });
      
      expect(wrapper.classes()).toContain('account-list--default');
    });
  });
});