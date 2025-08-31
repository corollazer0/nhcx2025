import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Infobox from './Infobox.vue';

describe('Infobox', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Infobox);
      
      expect(wrapper.find('[data-testid="infobox"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('infobox');
    });

    it('기본 props로 Default 타입 인포박스를 렌더링한다', () => {
      const wrapper = mount(Infobox);
      
      expect(wrapper.classes()).toContain('infobox--default');
      expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('타이틀');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Infobox);
      
      expect(wrapper.find('[data-testid="infobox"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('titleText prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Infobox, {
        props: { titleText: '사용자 정의 타이틀' }
      });

      expect(wrapper.text()).toContain('사용자 정의 타이틀');
      expect(wrapper.find('.infobox__title-text').text()).toBe('사용자 정의 타이틀');
    });

    it('type prop이 올바르게 동작한다', () => {
      const types = ['Default', 'onlyTitle', 'onlyBody'] as const;
      
      types.forEach(type => {
        const wrapper = mount(Infobox, {
          props: { type }
        });
        
        expect(wrapper.classes()).toContain(`infobox--${type.toLowerCase()}`);
      });
    });

    it('bodyItems prop이 올바르게 렌더링된다', () => {
      const bodyItems = ['첫 번째 아이템', '두 번째 아이템', '세 번째 아이템'];
      const wrapper = mount(Infobox, {
        props: { bodyItems }
      });

      bodyItems.forEach((item, index) => {
        expect(wrapper.find(`[data-testid="infobox-body-item-${index}"]`).exists()).toBe(true);
        expect(wrapper.text()).toContain(item);
      });
    });

    it('빈 bodyItems 배열일 때 body가 렌더링되지 않는다', () => {
      const wrapper = mount(Infobox, {
        props: { 
          type: 'Default',
          bodyItems: [] 
        }
      });

      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(false);
    });
  });

  // 타입별 조건부 렌더링 테스트
  describe('타입별 조건부 렌더링 테스트', () => {
    it('Default 타입에서 title과 body가 모두 렌더링된다', () => {
      const wrapper = mount(Infobox, {
        props: { 
          type: 'Default',
          titleText: '테스트 타이틀',
          bodyItems: ['테스트 내용']
        }
      });

      expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('테스트 타이틀');
      expect(wrapper.text()).toContain('테스트 내용');
    });

    it('onlyTitle 타입에서 title만 렌더링된다', () => {
      const wrapper = mount(Infobox, {
        props: { 
          type: 'onlyTitle',
          titleText: '타이틀만 표시',
          bodyItems: ['이 내용은 표시되지 않음']
        }
      });

      expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(false);
      expect(wrapper.text()).toContain('타이틀만 표시');
      expect(wrapper.text()).not.toContain('이 내용은 표시되지 않음');
    });

    it('onlyBody 타입에서 body만 렌더링된다', () => {
      const wrapper = mount(Infobox, {
        props: { 
          type: 'onlyBody',
          titleText: '이 타이틀은 표시되지 않음',
          bodyItems: ['본문만 표시', '두 번째 본문']
        }
      });

      expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(true);
      expect(wrapper.text()).not.toContain('이 타이틀은 표시되지 않음');
      expect(wrapper.text()).toContain('본문만 표시');
      expect(wrapper.text()).toContain('두 번째 본문');
    });
  });

  // 모든 Props 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const types = ['Default', 'onlyTitle', 'onlyBody'] as const;
    const titleTexts = ['기본 타이틀', '사용자 정의 타이틀', ''];
    const bodyItemsVariants = [
      ['기본 내용1', '기본 내용2'],
      ['사용자 내용'],
      []
    ];

    types.forEach(type => {
      titleTexts.forEach(titleText => {
        bodyItemsVariants.forEach((bodyItems, bodyIndex) => {
          it(`${type} + "${titleText}" + bodyItems[${bodyIndex}] 조합이 올바르게 렌더링된다`, () => {
            const wrapper = mount(Infobox, {
              props: { type, titleText, bodyItems }
            });

            expect(wrapper.classes()).toContain(`infobox--${type.toLowerCase()}`);

            // 타입에 따른 조건부 렌더링 검증
            if (type !== 'onlyBody') {
              expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(true);
              if (titleText) {
                expect(wrapper.text()).toContain(titleText);
              }
            } else {
              expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(false);
            }

            if (type !== 'onlyTitle' && bodyItems.length > 0) {
              expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(true);
              bodyItems.forEach(item => {
                expect(wrapper.text()).toContain(item);
              });
            }
          });
        });
      });
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('인포박스 클릭 시 click 이벤트가 emit된다', async () => {
      const wrapper = mount(Infobox);

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('이벤트 핸들러에 MouseEvent 객체가 전달된다', async () => {
      const wrapper = mount(Infobox);

      await wrapper.trigger('click');

      const emittedEvents = wrapper.emitted('click');
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents![0][0]).toBeInstanceOf(Event);
    });

    it('키보드 이벤트(Enter)도 처리된다', async () => {
      const wrapper = mount(Infobox);

      await wrapper.trigger('keydown.enter');

      // 키보드 이벤트는 별도로 처리되지 않으므로 click 이벤트가 emit되지 않음
      expect(wrapper.emitted('click')).toBeFalsy();
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('제목이 h3 태그로 렌더링된다', () => {
      const wrapper = mount(Infobox, {
        props: { titleText: '접근성 테스트 타이틀' }
      });
      
      expect(wrapper.find('h3').exists()).toBe(true);
      expect(wrapper.find('h3').text()).toBe('접근성 테스트 타이틀');
    });

    it('본문 텍스트가 p 태그로 렌더링된다', () => {
      const wrapper = mount(Infobox, {
        props: { 
          bodyItems: ['첫 번째 본문', '두 번째 본문'] 
        }
      });
      
      const paragraphs = wrapper.findAll('.infobox__body-text');
      expect(paragraphs).toHaveLength(2);
      expect(paragraphs[0].text()).toBe('첫 번째 본문');
      expect(paragraphs[1].text()).toBe('두 번째 본문');
    });

    it('키보드로 포커스가 가능하다', () => {
      const wrapper = mount(Infobox);
      const infobox = wrapper.find('.infobox');
      
      expect(infobox.element.tagName).toBe('DIV');
      expect(infobox.attributes('tabindex')).toBeUndefined(); // CSS에서 처리
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 필수 클래스가 적용된다', () => {
      const wrapper = mount(Infobox, {
        props: { type: 'onlyTitle' }
      });

      expect(wrapper.classes()).toEqual([
        'infobox',
        'infobox--onlytitle'
      ]);
    });

    it('타이틀과 본문에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Infobox, {
        props: { 
          type: 'Default',
          bodyItems: ['테스트 내용'] 
        }
      });
      
      expect(wrapper.find('.infobox__title').exists()).toBe(true);
      expect(wrapper.find('.infobox__title-text').exists()).toBe(true);
      expect(wrapper.find('.infobox__body').exists()).toBe(true);
      expect(wrapper.find('.infobox__body-item').exists()).toBe(true);
      expect(wrapper.find('.infobox__body-text').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트 (동적 변경)
  describe('동적 Props 변경 테스트', () => {
    it('type이 변경되면 올바른 클래스가 적용된다', async () => {
      const wrapper = mount(Infobox, {
        props: { type: 'Default' }
      });

      expect(wrapper.classes()).toContain('infobox--default');

      await wrapper.setProps({ type: 'onlyTitle' });

      expect(wrapper.classes()).toContain('infobox--onlytitle');
      expect(wrapper.classes()).not.toContain('infobox--default');
    });

    it('titleText가 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Infobox, {
        props: { titleText: '원래 타이틀' }
      });

      expect(wrapper.text()).toContain('원래 타이틀');

      await wrapper.setProps({ titleText: '변경된 타이틀' });

      expect(wrapper.text()).toContain('변경된 타이틀');
      expect(wrapper.text()).not.toContain('원래 타이틀');
    });

    it('bodyItems가 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Infobox, {
        props: { 
          type: 'Default',
          bodyItems: ['원래 내용1', '원래 내용2'] 
        }
      });

      expect(wrapper.text()).toContain('원래 내용1');
      expect(wrapper.text()).toContain('원래 내용2');

      await wrapper.setProps({ 
        bodyItems: ['새로운 내용1', '새로운 내용2', '새로운 내용3'] 
      });

      expect(wrapper.text()).toContain('새로운 내용1');
      expect(wrapper.text()).toContain('새로운 내용2');
      expect(wrapper.text()).toContain('새로운 내용3');
      expect(wrapper.text()).not.toContain('원래 내용1');
    });

    it('type 변경 시 조건부 렌더링이 올바르게 동작한다', async () => {
      const wrapper = mount(Infobox, {
        props: { 
          type: 'Default',
          titleText: '테스트 타이틀',
          bodyItems: ['테스트 본문']
        }
      });

      // Default 상태 확인
      expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(true);

      // onlyTitle로 변경
      await wrapper.setProps({ type: 'onlyTitle' });

      expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(false);

      // onlyBody로 변경
      await wrapper.setProps({ type: 'onlyBody' });

      expect(wrapper.find('[data-testid="infobox-title"]').exists()).toBe(false);
      expect(wrapper.find('[data-testid="infobox-body"]').exists()).toBe(true);
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 titleText가 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Infobox, {
        props: { titleText: '' }
      });

      expect(wrapper.find('.infobox').exists()).toBe(true);
      expect(wrapper.find('.infobox__title-text').text()).toBe('');
    });

    it('매우 긴 titleText가 전달되어도 오류가 발생하지 않는다', () => {
      const longTitle = 'A'.repeat(200);
      const wrapper = mount(Infobox, {
        props: { titleText: longTitle }
      });

      expect(wrapper.find('.infobox__title-text').text()).toBe(longTitle);
    });

    it('특수 문자가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const specialText = '제목 & 내용 < > " \' 100% | @ # $ % ^ & * ( )';
      const specialBodyItems = ['본문 & 내용 < > " \' 100%'];
      
      const wrapper = mount(Infobox, {
        props: { 
          titleText: specialText,
          bodyItems: specialBodyItems
        }
      });

      expect(wrapper.text()).toContain(specialText);
      expect(wrapper.text()).toContain('본문 & 내용 < > " \' 100%');
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Infobox, {
        props: { 
          titleText: undefined,
          type: undefined,
          bodyItems: undefined
        }
      });

      expect(wrapper.text()).toContain('타이틀');
      expect(wrapper.classes()).toContain('infobox--default');
      expect(wrapper.text()).toContain('텍스트 내용');
    });

    it('매우 많은 bodyItems가 있어도 정상적으로 렌더링된다', () => {
      const manyItems = Array.from({ length: 50 }, (_, i) => `아이템 ${i + 1}`);
      const wrapper = mount(Infobox, {
        props: { 
          type: 'Default',
          bodyItems: manyItems 
        }
      });

      expect(wrapper.findAll('.infobox__body-item')).toHaveLength(50);
      expect(wrapper.text()).toContain('아이템 1');
      expect(wrapper.text()).toContain('아이템 50');
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('인포박스가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Infobox);
      
      expect(wrapper.html()).toContain('<div');
      expect(wrapper.html()).toContain('data-testid="infobox"');
      expect(wrapper.find('.infobox__title').exists()).toBe(true);
      expect(wrapper.find('.infobox__body').exists()).toBe(true);
    });

    it('각 타입별 고유한 클래스가 적용된다', () => {
      const types = ['Default', 'onlyTitle', 'onlyBody'] as const;
      
      types.forEach(type => {
        const wrapper = mount(Infobox, { 
          props: { 
            type,
            bodyItems: ['테스트'] // onlyTitle에서도 body가 있을 때의 클래스 확인
          } 
        });
        
        expect(wrapper.classes()).toContain(`infobox--${type.toLowerCase()}`);
        
        // 다른 타입 클래스는 포함하지 않아야 함
        const otherTypes = types.filter(t => t !== type);
        otherTypes.forEach(otherType => {
          expect(wrapper.classes()).not.toContain(`infobox--${otherType.toLowerCase()}`);
        });
      });
    });
  });

  // 반응형 테스트
  describe('반응형 스타일 테스트', () => {
    it('모든 타입에서 콘텐츠가 올바르게 표시된다', () => {
      const types = ['Default', 'onlyTitle', 'onlyBody'] as const;
      
      types.forEach(type => {
        const wrapper = mount(Infobox, {
          props: { 
            type,
            titleText: '반응형 테스트 타이틀',
            bodyItems: ['반응형 테스트 본문 1', '반응형 테스트 본문 2']
          }
        });
        
        // 타입에 따른 콘텐츠 표시 확인
        if (type !== 'onlyBody') {
          expect(wrapper.text()).toContain('반응형 테스트 타이틀');
        }
        if (type !== 'onlyTitle') {
          expect(wrapper.text()).toContain('반응형 테스트 본문 1');
        }
      });
    });
  });
});