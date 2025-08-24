import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Cta from './Cta.vue';

describe('Cta', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Cta);
      
      expect(wrapper.find('[data-testid="cta"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('cta');
    });

    it('기본 props로 basic cta-full 레이아웃을 렌더링한다', () => {
      const wrapper = mount(Cta);
      
      expect(wrapper.find('[data-testid="basic-full"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('버튼명');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Cta);
      
      expect(wrapper.find('[data-testid="cta"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('type prop이 올바르게 동작한다', () => {
      const wrapperBasic = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-full' }
      });
      const wrapperPopup = mount(Cta, {
        props: { type: 'popup', ratio: 'cta-full' }
      });

      expect(wrapperBasic.find('[data-testid="basic-full"]').exists()).toBe(true);
      expect(wrapperPopup.find('[data-testid="popup-full"]').exists()).toBe(true);
    });

    it('ratio prop이 올바르게 동작한다', () => {
      const wrapperFull = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-full' }
      });
      const wrapper55 = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-5:5' }
      });
      const wrapper37 = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-3:7' }
      });

      expect(wrapperFull.find('[data-testid="basic-full"]').exists()).toBe(true);
      expect(wrapper55.find('[data-testid="basic-5-5"]').exists()).toBe(true);
      expect(wrapper37.find('[data-testid="basic-3-7"]').exists()).toBe(true);
    });

    it('primaryText prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Cta, {
        props: { primaryText: '확인' }
      });

      expect(wrapper.text()).toContain('확인');
    });

    it('secondaryText prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Cta, {
        props: { 
          type: 'basic', 
          ratio: 'cta-5:5',
          secondaryText: '취소' 
        }
      });

      expect(wrapper.text()).toContain('취소');
    });
  });

  // 모든 레이아웃 조합 테스트
  describe('레이아웃 조합 테스트', () => {
    const types = ['basic', 'popup'] as const;
    const ratios = ['cta-full', 'cta-5:5', 'cta-3:7'] as const;

    types.forEach(type => {
      ratios.forEach(ratio => {
        it(`${type} + ${ratio} 조합이 올바르게 렌더링된다`, () => {
          const wrapper = mount(Cta, {
            props: { type, ratio }
          });

          const testId = `${type}-${ratio.replace('cta-', '').replace(':', '-')}`;
          expect(wrapper.find(`[data-testid="${testId}"]`).exists()).toBe(true);
        });
      });
    });
  });

  // 버튼 개수 테스트
  describe('버튼 개수 테스트', () => {
    it('cta-full 레이아웃에서는 버튼이 1개 렌더링된다', () => {
      const wrapperBasic = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-full' }
      });
      const wrapperPopup = mount(Cta, {
        props: { type: 'popup', ratio: 'cta-full' }
      });

      expect(wrapperBasic.findAll('button')).toHaveLength(1);
      expect(wrapperPopup.findAll('button')).toHaveLength(1);
    });

    it('cta-5:5 레이아웃에서는 버튼이 2개 렌더링된다', () => {
      const wrapperBasic = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-5:5' }
      });
      const wrapperPopup = mount(Cta, {
        props: { type: 'popup', ratio: 'cta-5:5' }
      });

      expect(wrapperBasic.findAll('button')).toHaveLength(2);
      expect(wrapperPopup.findAll('button')).toHaveLength(2);
    });

    it('cta-3:7 레이아웃에서는 버튼이 2개 렌더링된다', () => {
      const wrapperBasic = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-3:7' }
      });
      const wrapperPopup = mount(Cta, {
        props: { type: 'popup', ratio: 'cta-3:7' }
      });

      expect(wrapperBasic.findAll('button')).toHaveLength(2);
      expect(wrapperPopup.findAll('button')).toHaveLength(2);
    });
  });

  // 이벤트 emit 테스트
  describe('이벤트 테스트', () => {
    it('primary 버튼 클릭 시 primary-click 이벤트가 emit된다', async () => {
      const wrapper = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-full' }
      });

      const primaryButton = wrapper.find('button');
      await primaryButton.trigger('click');

      expect(wrapper.emitted('primary-click')).toBeTruthy();
      expect(wrapper.emitted('primary-click')).toHaveLength(1);
    });

    it('secondary 버튼 클릭 시 secondary-click 이벤트가 emit된다', async () => {
      const wrapper = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-5:5' }
      });

      const buttons = wrapper.findAll('button');
      const secondaryButton = buttons[0]; // 첫 번째가 secondary
      await secondaryButton.trigger('click');

      expect(wrapper.emitted('secondary-click')).toBeTruthy();
      expect(wrapper.emitted('secondary-click')).toHaveLength(1);
    });

    it('이벤트 핸들러에 MouseEvent 객체가 전달된다', async () => {
      const wrapper = mount(Cta);

      const button = wrapper.find('button');
      await button.trigger('click');

      const emittedEvents = wrapper.emitted('primary-click');
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents![0][0]).toBeInstanceOf(Event);
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('버튼에 올바른 스타일 클래스가 적용된다', () => {
      const wrapper = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-5:5' }
      });

      const buttons = wrapper.findAll('button');
      
      // Secondary button (tertiary style)
      expect(buttons[0].classes()).toContain('cta__button--tertiary');
      
      // Primary button
      expect(buttons[1].classes()).toContain('cta__button--primary');
    });

    it('popup과 basic 타입에 따라 올바른 컨테이너 클래스가 적용된다', () => {
      const wrapperBasic = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-5:5' }
      });
      const wrapperPopup = mount(Cta, {
        props: { type: 'popup', ratio: 'cta-5:5' }
      });

      expect(wrapperBasic.find('.cta__basic-5-5').exists()).toBe(true);
      expect(wrapperPopup.find('.cta__popup-5-5').exists()).toBe(true);
    });

    it('3:7 비율에서 버튼 크기 클래스가 올바르게 적용된다', () => {
      const wrapper = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-3:7' }
      });

      const buttons = wrapper.findAll('button');
      
      // Narrow button (secondary)
      expect(buttons[0].classes()).toContain('cta__button--narrow');
      
      // Flex button (primary)
      expect(buttons[1].classes()).toContain('cta__button--flex');
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('모든 버튼에 type="button" 속성이 설정된다', () => {
      const wrapper = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-5:5' }
      });

      const buttons = wrapper.findAll('button');
      buttons.forEach(button => {
        expect(button.attributes('type')).toBe('button');
      });
    });

    it('버튼에 올바른 텍스트가 표시된다', () => {
      const wrapper = mount(Cta, {
        props: { 
          type: 'basic', 
          ratio: 'cta-5:5',
          primaryText: '확인',
          secondaryText: '취소'
        }
      });

      const buttons = wrapper.findAll('button');
      expect(buttons[0].text()).toBe('취소');
      expect(buttons[1].text()).toBe('확인');
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('type이 변경되면 올바른 레이아웃이 렌더링된다', async () => {
      const wrapper = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-full' }
      });

      expect(wrapper.find('[data-testid="basic-full"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="popup-full"]').exists()).toBe(false);

      await wrapper.setProps({ type: 'popup' });

      expect(wrapper.find('[data-testid="basic-full"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="popup-full"]').exists()).toBe(true);
    });

    it('ratio가 변경되면 올바른 레이아웃이 렌더링된다', async () => {
      const wrapper = mount(Cta, {
        props: { type: 'basic', ratio: 'cta-full' }
      });

      expect(wrapper.find('[data-testid="basic-full"]').exists()).toBe(true);

      await wrapper.setProps({ ratio: 'cta-5:5' });

      expect(wrapper.find('[data-testid="basic-full"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="basic-5-5"]').exists()).toBe(true);
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Cta, {
        props: { 
          primaryText: '',
          secondaryText: ''
        }
      });

      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('매우 긴 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const longText = 'A'.repeat(100);
      const wrapper = mount(Cta, {
        props: { 
          type: 'basic',
          ratio: 'cta-5:5',
          primaryText: longText,
          secondaryText: longText
        }
      });

      expect(wrapper.text()).toContain(longText);
    });

    it('특수 문자가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const specialText = '확인 & 저장 < > " \' 100%';
      const wrapper = mount(Cta, {
        props: { primaryText: specialText }
      });

      expect(wrapper.text()).toContain(specialText);
    });
  });
});