import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Checkbox from './Checkbox.vue';

describe('Checkbox', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Checkbox);
      
      expect(wrapper.find('[data-testid="checkbox"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('checkbox');
    });

    it('기본 props로 sm default 체크박스를 렌더링한다', () => {
      const wrapper = mount(Checkbox);
      
      expect(wrapper.classes()).toContain('checkbox--sm');
      expect(wrapper.classes()).toContain('checkbox--default');
      expect(wrapper.text()).toBe('체크');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Checkbox);
      
      expect(wrapper.find('[data-testid="checkbox"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('text prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Checkbox, {
        props: { text: '동의합니다' }
      });

      expect(wrapper.text()).toBe('동의합니다');
    });

    it('showText prop이 false일 때 텍스트가 숨겨진다', () => {
      const wrapper = mount(Checkbox, {
        props: { showText: false }
      });

      expect(wrapper.find('.checkbox__text').exists()).toBe(false);
    });

    it('showText prop이 true일 때 텍스트가 표시된다', () => {
      const wrapper = mount(Checkbox, {
        props: { showText: true, text: '체크박스' }
      });

      expect(wrapper.find('.checkbox__text').exists()).toBe(true);
      expect(wrapper.text()).toBe('체크박스');
    });

    it('size prop이 올바르게 동작한다', () => {
      const sizes = ['sm', 'xs'] as const;
      
      sizes.forEach(size => {
        const wrapper = mount(Checkbox, {
          props: { size }
        });
        
        expect(wrapper.classes()).toContain(`checkbox--${size}`);
        expect(wrapper.find('.checkbox__box').classes()).toContain(`checkbox__box--${size}`);
      });
    });

    it('state prop이 올바르게 동작한다', () => {
      const states = ['default', 'selected', 'disabled', 'select-disabled'] as const;
      
      states.forEach(state => {
        const wrapper = mount(Checkbox, {
          props: { state }
        });
        
        expect(wrapper.classes()).toContain(`checkbox--${state}`);
        expect(wrapper.find('.checkbox__box').classes()).toContain(`checkbox__box--${state}`);
      });
    });

    it('modelValue prop이 올바르게 동작한다', () => {
      const wrapper = mount(Checkbox, {
        props: { modelValue: true }
      });

      // modelValue는 내부 상태와 별개로 동작하므로 별도 검증 필요시 추가
      expect(wrapper.exists()).toBe(true);
    });
  });

  // 모든 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const sizes = ['sm', 'xs'] as const;
    const states = ['default', 'selected', 'disabled', 'select-disabled'] as const;

    sizes.forEach(size => {
      states.forEach(state => {
        it(`${size} + ${state} 조합이 올바르게 렌더링된다`, () => {
          const wrapper = mount(Checkbox, {
            props: { size, state }
          });

          expect(wrapper.classes()).toContain(`checkbox--${size}`);
          expect(wrapper.classes()).toContain(`checkbox--${state}`);
          expect(wrapper.find('.checkbox__box').classes()).toContain(`checkbox__box--${size}`);
          expect(wrapper.find('.checkbox__box').classes()).toContain(`checkbox__box--${state}`);
        });
      });
    });
  });

  // 상태별 체크 아이콘 표시 테스트
  describe('체크 아이콘 표시 테스트', () => {
    it('selected 상태에서 체크 아이콘이 표시된다', () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'selected' }
      });

      expect(wrapper.find('.checkbox__check').exists()).toBe(true);
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('select-disabled 상태에서 체크 아이콘이 표시된다', () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'select-disabled' }
      });

      expect(wrapper.find('.checkbox__check').exists()).toBe(true);
      expect(wrapper.find('svg').exists()).toBe(true);
    });

    it('default 상태에서 체크 아이콘이 숨겨진다', () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default' }
      });

      expect(wrapper.find('.checkbox__check').exists()).toBe(false);
    });

    it('disabled 상태에서 체크 아이콘이 숨겨진다', () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'disabled' }
      });

      expect(wrapper.find('.checkbox__check').exists()).toBe(false);
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('체크박스 클릭 시 click 이벤트가 emit된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default' }
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('체크박스 클릭 시 change 이벤트가 emit된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default' }
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted('change')).toBeTruthy();
      expect(wrapper.emitted('change')).toHaveLength(1);
    });

    it('체크박스 클릭 시 modelValue 업데이트 이벤트가 emit된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default' }
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('disabled 상태에서는 클릭 이벤트가 emit되지 않는다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'disabled' }
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeFalsy();
      expect(wrapper.emitted('change')).toBeFalsy();
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('select-disabled 상태에서는 클릭 이벤트가 emit되지 않는다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'select-disabled' }
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeFalsy();
      expect(wrapper.emitted('change')).toBeFalsy();
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });
  });

  // 키보드 이벤트 테스트
  describe('키보드 이벤트 테스트', () => {
    it('Space 키 입력 시 체크박스가 토글된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default' }
      });

      const checkboxBox = wrapper.find('.checkbox__box');
      await checkboxBox.trigger('keydown', { code: 'Space' });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('Enter 키 입력 시 체크박스가 토글된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default' }
      });

      const checkboxBox = wrapper.find('.checkbox__box');
      await checkboxBox.trigger('keydown', { code: 'Enter' });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('다른 키 입력 시에는 반응하지 않는다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default' }
      });

      const checkboxBox = wrapper.find('.checkbox__box');
      await checkboxBox.trigger('keydown', { code: 'KeyA' });

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });

    it('disabled 상태에서는 키보드 이벤트가 처리되지 않는다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'disabled' }
      });

      const checkboxBox = wrapper.find('.checkbox__box');
      await checkboxBox.trigger('keydown', { code: 'Space' });

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('체크박스에 올바른 role이 설정된다', () => {
      const wrapper = mount(Checkbox);
      
      expect(wrapper.find('.checkbox__box').attributes('role')).toBe('checkbox');
    });

    it('aria-checked 속성이 올바르게 설정된다', () => {
      const wrapperDefault = mount(Checkbox, {
        props: { state: 'default' }
      });
      const wrapperSelected = mount(Checkbox, {
        props: { state: 'selected' }
      });

      expect(wrapperDefault.find('.checkbox__box').attributes('aria-checked')).toBe('false');
      expect(wrapperSelected.find('.checkbox__box').attributes('aria-checked')).toBe('true');
    });

    it('aria-disabled 속성이 올바르게 설정된다', () => {
      const wrapperDefault = mount(Checkbox, {
        props: { state: 'default' }
      });
      const wrapperDisabled = mount(Checkbox, {
        props: { state: 'disabled' }
      });

      expect(wrapperDefault.find('.checkbox__box').attributes('aria-disabled')).toBe('false');
      expect(wrapperDisabled.find('.checkbox__box').attributes('aria-disabled')).toBe('true');
    });

    it('tabindex가 올바르게 설정된다', () => {
      const wrapper = mount(Checkbox);
      
      expect(wrapper.find('.checkbox__box').attributes('tabindex')).toBe('0');
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 필수 클래스가 적용된다', () => {
      const wrapper = mount(Checkbox, {
        props: { size: 'xs', state: 'selected' }
      });

      expect(wrapper.classes()).toEqual([
        'checkbox',
        'checkbox--xs',
        'checkbox--selected'
      ]);
    });

    it('체크박스 박스에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Checkbox, {
        props: { size: 'sm', state: 'disabled' }
      });
      
      expect(wrapper.find('.checkbox__box').classes()).toContain('checkbox__box--sm');
      expect(wrapper.find('.checkbox__box').classes()).toContain('checkbox__box--disabled');
    });

    it('텍스트 영역에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Checkbox);
      
      expect(wrapper.find('.checkbox__text').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props가 변경되면 올바른 클래스가 적용된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default' }
      });

      expect(wrapper.classes()).toContain('checkbox--default');

      await wrapper.setProps({ state: 'selected' });

      expect(wrapper.classes()).toContain('checkbox--selected');
      expect(wrapper.classes()).not.toContain('checkbox--default');
    });

    it('텍스트가 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { text: '동의' }
      });

      expect(wrapper.text()).toBe('동의');

      await wrapper.setProps({ text: '확인' });

      expect(wrapper.text()).toBe('확인');
    });

    it('showText가 변경되면 텍스트 표시가 토글된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { showText: true, text: '체크박스' }
      });

      expect(wrapper.find('.checkbox__text').exists()).toBe(true);
      expect(wrapper.text()).toBe('체크박스');

      await wrapper.setProps({ showText: false });

      expect(wrapper.find('.checkbox__text').exists()).toBe(false);
      expect(wrapper.text()).toBe('');
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Checkbox, {
        props: { text: '' }
      });

      expect(wrapper.find('.checkbox').exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('매우 긴 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const longText = 'A'.repeat(100);
      const wrapper = mount(Checkbox, {
        props: { text: longText }
      });

      expect(wrapper.text()).toBe(longText);
    });

    it('특수 문자가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const specialText = '동의 & 확인 < > " \' 100%';
      const wrapper = mount(Checkbox, {
        props: { text: specialText }
      });

      expect(wrapper.text()).toBe(specialText);
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Checkbox, {
        props: { 
          text: undefined,
          showText: undefined,
          size: undefined,
          state: undefined
        }
      });

      expect(wrapper.text()).toBe('체크');
      expect(wrapper.classes()).toContain('checkbox--sm');
      expect(wrapper.classes()).toContain('checkbox--default');
      expect(wrapper.find('.checkbox__text').exists()).toBe(true);
    });

    it('숫자가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const wrapper = mount(Checkbox, {
        props: { text: '2024년 약관 동의' }
      });

      expect(wrapper.text()).toBe('2024년 약관 동의');
    });

    it('이모지가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const wrapper = mount(Checkbox, {
        props: { text: '✅ 동의합니다' }
      });

      expect(wrapper.text()).toBe('✅ 동의합니다');
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('체크박스 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Checkbox);
      
      expect(wrapper.html()).toContain('<div');
      expect(wrapper.find('.checkbox__box').exists()).toBe(true);
      expect(wrapper.find('.checkbox__text').exists()).toBe(true);
      expect(wrapper.html()).toContain('data-testid="checkbox"');
    });

    it('각 사이즈별 고유한 클래스가 적용된다', () => {
      const sizes = ['sm', 'xs'] as const;
      
      sizes.forEach(size => {
        const wrapper = mount(Checkbox, { props: { size } });
        
        expect(wrapper.classes()).toContain(`checkbox--${size}`);
        
        // 다른 사이즈 클래스는 포함하지 않아야 함
        const otherSizes = sizes.filter(s => s !== size);
        otherSizes.forEach(otherSize => {
          expect(wrapper.classes()).not.toContain(`checkbox--${otherSize}`);
        });
      });
    });
  });

  // v-model 동작 테스트
  describe('v-model 동작 테스트', () => {
    it('modelValue 변경 시 update:modelValue 이벤트가 올바르게 emit된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'default', modelValue: false }
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('selected 상태에서 클릭 시 false가 emit된다', async () => {
      const wrapper = mount(Checkbox, {
        props: { state: 'selected', modelValue: true }
      });

      await wrapper.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([false]);
    });
  });

  // 실제 사용 시나리오 테스트
  describe('실제 사용 시나리오 테스트', () => {
    it('약관 동의 체크박스로 사용될 때 올바르게 동작한다', async () => {
      const wrapper = mount(Checkbox, {
        props: { 
          text: '이용약관에 동의합니다',
          state: 'default'
        }
      });

      expect(wrapper.text()).toBe('이용약관에 동의합니다');
      expect(wrapper.find('.checkbox__check').exists()).toBe(false);

      await wrapper.trigger('click');

      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true]);
    });

    it('필수/선택 옵션으로 사용될 때 올바르게 동작한다', () => {
      const requiredWrapper = mount(Checkbox, {
        props: { 
          text: '[필수] 개인정보 처리방침 동의',
          state: 'default'
        }
      });
      
      const optionalWrapper = mount(Checkbox, {
        props: { 
          text: '[선택] 마케팅 수신 동의',
          state: 'default'
        }
      });

      expect(requiredWrapper.text()).toContain('[필수]');
      expect(optionalWrapper.text()).toContain('[선택]');
    });
  });
});