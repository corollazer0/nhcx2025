import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LoadData from './LoadData.vue';

describe('LoadData', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(LoadData);
      
      expect(wrapper.find('[data-testid="load-data"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('load-data');
    });

    it('기본 props로 basic 변형을 렌더링한다', () => {
      const wrapper = mount(LoadData);
      
      expect(wrapper.classes()).toContain('load-data--basic');
      expect(wrapper.find('[data-testid="load-data-label"]').text()).toBe('레이블');
      expect(wrapper.find('[data-testid="load-data-inner-label"]').text()).toBe('Label');
      expect(wrapper.find('[data-testid="load-data-data"]').text()).toBe('Data');
    });

    it('data-testid 속성들이 올바르게 설정된다', () => {
      const wrapper = mount(LoadData);
      
      expect(wrapper.find('[data-testid="load-data"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-label"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-inner-label"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-data"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-message"]').exists()).toBe(true);
    });
  });

  // Variant 테스트
  describe('Variant 테스트', () => {
    it('basic 변형이 올바르게 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: {
          variant: 'basic'
        }
      });

      expect(wrapper.classes()).toContain('load-data--basic');
      expect(wrapper.find('[data-testid="load-data-inner-label"]').exists()).toBe(true);
      expect(wrapper.find('.load-data__highlight-content').exists()).toBe(false);
    });

    it('highlight 변형이 올바르게 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: {
          variant: 'highlight'
        }
      });

      expect(wrapper.classes()).toContain('load-data--highlight');
      expect(wrapper.find('.load-data__highlight-content').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-inner-label"]').exists()).toBe(false);
    });

    it('highlight 변형에서 label과 description이 표시된다', () => {
      const wrapper = mount(LoadData, {
        props: {
          variant: 'highlight',
          highlightLabelText: '테스트 라벨',
          highlightDescriptionText: '테스트 설명'
        }
      });

      const highlightContent = wrapper.find('.load-data__highlight-content');
      expect(highlightContent.find('.load-data__highlight-label').text()).toBe('테스트 라벨');
      expect(highlightContent.find('.load-data__highlight-description').text()).toBe('테스트 설명');
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('labelText prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: { labelText: '사용자 정의 레이블' }
      });

      expect(wrapper.find('[data-testid="load-data-label"]').text()).toBe('사용자 정의 레이블');
    });

    it('innerLabelText prop이 basic 변형에서 올바르게 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: { 
          variant: 'basic',
          innerLabelText: '내부 레이블'
        }
      });

      expect(wrapper.find('[data-testid="load-data-inner-label"]').text()).toBe('내부 레이블');
    });

    it('dataText prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: { dataText: '100,000원' }
      });

      expect(wrapper.find('[data-testid="load-data-data"]').text()).toBe('100,000원');
    });

    it('messageText prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: { messageText: '안내 메시지' }
      });

      expect(wrapper.find('[data-testid="load-data-message"]').text()).toBe('안내 메시지');
    });

    it('highlight variant의 highlightLabelText가 올바르게 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: { 
          variant: 'highlight',
          highlightLabelText: '하이라이트 라벨'
        }
      });

      expect(wrapper.find('.load-data__highlight-label').text()).toBe('하이라이트 라벨');
    });

    it('highlight variant의 highlightDescriptionText가 올바르게 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: { 
          variant: 'highlight',
          highlightDescriptionText: '하이라이트 설명'
        }
      });

      expect(wrapper.find('.load-data__highlight-description').text()).toBe('하이라이트 설명');
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('label이 false일 때 label이 렌더링되지 않는다', () => {
      const wrapper = mount(LoadData, {
        props: { label: false }
      });

      expect(wrapper.find('[data-testid="load-data-label"]').exists()).toBe(false);
    });

    it('innerLabel이 false일 때 inner label이 렌더링되지 않는다', () => {
      const wrapper = mount(LoadData, {
        props: { 
          variant: 'basic',
          innerLabel: false 
        }
      });

      expect(wrapper.find('[data-testid="load-data-inner-label"]').exists()).toBe(false);
    });

    it('message가 false일 때 message가 렌더링되지 않는다', () => {
      const wrapper = mount(LoadData, {
        props: { message: false }
      });

      expect(wrapper.find('[data-testid="load-data-message"]').exists()).toBe(false);
    });

    it('모든 선택적 요소가 false일 때 필수 요소만 렌더링된다', () => {
      const wrapper = mount(LoadData, {
        props: { 
          label: false,
          innerLabel: false,
          message: false
        }
      });

      expect(wrapper.find('[data-testid="load-data-label"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="load-data-inner-label"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="load-data-message"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="load-data-data"]').exists()).toBe(true);
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('클릭 이벤트가 올바르게 emit된다', async () => {
      const wrapper = mount(LoadData);
      const loadDataElement = wrapper.find('[data-testid="load-data"]');
      
      await loadDataElement.trigger('click');
      
      expect(wrapper.emitted('click')).toHaveLength(1);
      expect(wrapper.emitted('click')?.[0]).toHaveLength(1);
      expect(wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent);
    });

    it('여러 번 클릭해도 각각의 이벤트가 올바르게 emit된다', async () => {
      const wrapper = mount(LoadData);
      const loadDataElement = wrapper.find('[data-testid="load-data"]');
      
      await loadDataElement.trigger('click');
      await loadDataElement.trigger('click');
      await loadDataElement.trigger('click');
      
      expect(wrapper.emitted('click')).toHaveLength(3);
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('data-testid 속성들이 올바르게 설정되어 있다', () => {
      const wrapper = mount(LoadData);
      
      expect(wrapper.find('[data-testid="load-data"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-label"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-inner-label"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-data"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="load-data-message"]').exists()).toBe(true);
    });

    it('의미적 HTML 구조를 가지고 있다', () => {
      const wrapper = mount(LoadData);
      
      expect(wrapper.find('.load-data__label').exists()).toBe(true);
      expect(wrapper.find('.load-data__container').exists()).toBe(true);
      expect(wrapper.find('.load-data__data').exists()).toBe(true);
      expect(wrapper.find('.load-data__message').exists()).toBe(true);
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 문자열 props도 올바르게 처리한다', () => {
      const wrapper = mount(LoadData, {
        props: {
          labelText: '',
          dataText: '',
          messageText: ''
        }
      });

      expect(wrapper.find('[data-testid="load-data-label"]').text()).toBe('');
      expect(wrapper.find('[data-testid="load-data-data"]').text()).toBe('');
      expect(wrapper.find('[data-testid="load-data-message"]').text()).toBe('');
    });

    it('매우 긴 텍스트도 올바르게 처리한다', () => {
      const longText = 'a'.repeat(1000);
      const wrapper = mount(LoadData, {
        props: {
          labelText: longText,
          dataText: longText,
          messageText: longText
        }
      });

      expect(wrapper.find('[data-testid="load-data-label"]').text()).toBe(longText);
      expect(wrapper.find('[data-testid="load-data-data"]').text()).toBe(longText);
      expect(wrapper.find('[data-testid="load-data-message"]').text()).toBe(longText);
    });

    it('특수 문자가 포함된 텍스트도 올바르게 처리한다', () => {
      const specialText = '!@#$%^&*()_+-={}[]|\\:";\'<>?,./ 한글 English 123';
      const wrapper = mount(LoadData, {
        props: {
          labelText: specialText,
          dataText: specialText,
          messageText: specialText
        }
      });

      expect(wrapper.find('[data-testid="load-data-label"]').text()).toBe(specialText);
      expect(wrapper.find('[data-testid="load-data-data"]').text()).toBe(specialText);
      expect(wrapper.find('[data-testid="load-data-message"]').text()).toBe(specialText);
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('basic variant 클래스가 올바르게 적용된다', () => {
      const wrapper = mount(LoadData, {
        props: { variant: 'basic' }
      });

      expect(wrapper.classes()).toContain('load-data--basic');
    });

    it('highlight variant 클래스가 올바르게 적용된다', () => {
      const wrapper = mount(LoadData, {
        props: { variant: 'highlight' }
      });

      expect(wrapper.classes()).toContain('load-data--highlight');
    });

    it('기본 load-data 클래스가 항상 적용된다', () => {
      const basicWrapper = mount(LoadData, { props: { variant: 'basic' } });
      const highlightWrapper = mount(LoadData, { props: { variant: 'highlight' } });

      expect(basicWrapper.classes()).toContain('load-data');
      expect(highlightWrapper.classes()).toContain('load-data');
    });
  });
});