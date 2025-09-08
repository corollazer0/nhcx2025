import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AttachedFile from './AttachedFile.vue';

describe('AttachedFile', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(AttachedFile);
      
      expect(wrapper.find('[data-testid="attached-file"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('attached-file');
    });

    it('기본 props로 1line 타입 컴포넌트를 렌더링한다', () => {
      const wrapper = mount(AttachedFile);
      
      expect(wrapper.classes()).toContain('attached-file--1line');
      expect(wrapper.find('.attached-file__filename').text()).toBe('파일명');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(AttachedFile);
      
      expect(wrapper.find('[data-testid="attached-file"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="delete-button"]').exists()).toBe(true);
    });

    it('올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(AttachedFile);
      
      expect(wrapper.find('.attached-file__divider')).toBeTruthy();
      expect(wrapper.find('.attached-file__content').exists()).toBe(true);
      expect(wrapper.find('.attached-file__filename').exists()).toBe(true);
      expect(wrapper.find('.attached-file__delete-button').exists()).toBe(true);
      expect(wrapper.find('.attached-file__delete-icon').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('filename prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(AttachedFile, {
        props: { filename: '테스트파일.pdf' }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe('테스트파일.pdf');
    });

    it('type prop이 올바르게 동작한다', () => {
      const types = ['1line', '2line', '3line', '4line', '5line'] as const;
      
      types.forEach(type => {
        const wrapper = mount(AttachedFile, {
          props: { type }
        });
        
        expect(wrapper.classes()).toContain(`attached-file--${type}`);
      });
    });

    it('빈 filename이 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(AttachedFile, {
        props: { filename: '' }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe('');
    });

    it('매우 긴 filename이 전달되어도 오류가 발생하지 않는다', () => {
      const longFilename = 'A'.repeat(100) + '.pdf';
      const wrapper = mount(AttachedFile, {
        props: { filename: longFilename }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe(longFilename);
    });
  });

  // 모든 Props 조합 테스트
  describe('모든 Props 조합 테스트', () => {
    const types = ['1line', '2line', '3line', '4line', '5line'] as const;
    const filenames = ['파일명', '문서.pdf', '이미지.jpg', '스프레드시트.xlsx'];

    types.forEach(type => {
      filenames.forEach(filename => {
        it(`${type} + ${filename} 조합이 올바르게 렌더링된다`, () => {
          const wrapper = mount(AttachedFile, {
            props: { type, filename }
          });

          expect(wrapper.classes()).toContain(`attached-file--${type}`);
          expect(wrapper.find('.attached-file__filename').text()).toBe(filename);
        });
      });
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('삭제 버튼 클릭 시 delete 이벤트가 emit된다', async () => {
      const wrapper = mount(AttachedFile, {
        props: { filename: '테스트.pdf' }
      });

      await wrapper.find('[data-testid="delete-button"]').trigger('click');

      expect(wrapper.emitted('delete')).toBeTruthy();
      expect(wrapper.emitted('delete')).toHaveLength(1);
      expect(wrapper.emitted('delete')![0][0]).toBe('테스트.pdf');
    });

    it('delete 이벤트에 올바른 filename이 전달된다', async () => {
      const testFilename = '중요문서.docx';
      const wrapper = mount(AttachedFile, {
        props: { filename: testFilename }
      });

      await wrapper.find('.attached-file__delete-button').trigger('click');

      const emittedEvents = wrapper.emitted('delete');
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents![0][0]).toBe(testFilename);
    });

    it('기본 filename으로 delete 이벤트가 emit된다', async () => {
      const wrapper = mount(AttachedFile); // 기본 filename: '파일명'

      await wrapper.find('.attached-file__delete-button').trigger('click');

      const emittedEvents = wrapper.emitted('delete');
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents![0][0]).toBe('파일명');
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('삭제 버튼에 type="button" 속성이 설정된다', () => {
      const wrapper = mount(AttachedFile);
      
      expect(wrapper.find('.attached-file__delete-button').attributes('type')).toBe('button');
    });

    it('삭제 아이콘에 alt 속성이 설정된다', () => {
      const wrapper = mount(AttachedFile);
      
      expect(wrapper.find('.attached-file__delete-icon').attributes('alt')).toBe('삭제');
    });

    it('키보드 내비게이션이 가능하다', () => {
      const wrapper = mount(AttachedFile);
      const deleteButton = wrapper.find('.attached-file__delete-button');
      
      expect(deleteButton.element.tagName).toBe('BUTTON');
      expect(deleteButton.attributes('tabindex')).toBeUndefined(); // 기본값 사용
    });

    it('삭제 버튼에 포커스가 가능하다', () => {
      const wrapper = mount(AttachedFile, {
        attachTo: document.body
      });
      const deleteButton = wrapper.find('.attached-file__delete-button');
      
      deleteButton.element.focus();
      expect(document.activeElement).toBe(deleteButton.element);
      
      wrapper.unmount();
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('모든 필수 클래스가 적용된다', () => {
      const wrapper = mount(AttachedFile, {
        props: { type: '2line', filename: '테스트.pdf' }
      });

      expect(wrapper.classes()).toEqual([
        'attached-file',
        'attached-file--2line'
      ]);
    });

    it('divider 클래스가 올바르게 적용된다', () => {
      const wrapper = mount(AttachedFile);
      const dividers = wrapper.findAll('.attached-file__divider');
      
      expect(dividers.length).toBe(2);
    });

    it('content 영역 클래스가 올바르게 적용된다', () => {
      const wrapper = mount(AttachedFile);
      
      expect(wrapper.find('.attached-file__content').exists()).toBe(true);
      expect(wrapper.find('.attached-file__filename').exists()).toBe(true);
      expect(wrapper.find('.attached-file__delete-button').exists()).toBe(true);
      expect(wrapper.find('.attached-file__delete-icon').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('props가 변경되면 올바른 클래스가 적용된다', async () => {
      const wrapper = mount(AttachedFile, {
        props: { type: '1line' }
      });

      expect(wrapper.classes()).toContain('attached-file--1line');

      await wrapper.setProps({ type: '3line' });

      expect(wrapper.classes()).toContain('attached-file--3line');
      expect(wrapper.classes()).not.toContain('attached-file--1line');
    });

    it('filename이 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(AttachedFile, {
        props: { filename: '첫번째.pdf' }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe('첫번째.pdf');

      await wrapper.setProps({ filename: '두번째.docx' });

      expect(wrapper.find('.attached-file__filename').text()).toBe('두번째.docx');
    });

    it('type 변경시 클래스가 올바르게 변경된다', async () => {
      const wrapper = mount(AttachedFile, {
        props: { type: '1line' }
      });

      expect(wrapper.classes()).toContain('attached-file--1line');

      await wrapper.setProps({ type: '5line' });

      expect(wrapper.classes()).toContain('attached-file--5line');
      expect(wrapper.classes()).not.toContain('attached-file--1line');
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('특수 문자가 포함된 filename이 올바르게 렌더링된다', () => {
      const specialFilename = '파일명 & 문서 < > " \' 100%.pdf';
      const wrapper = mount(AttachedFile, {
        props: { filename: specialFilename }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe(specialFilename);
    });

    it('한글 filename이 올바르게 렌더링된다', () => {
      const koreanFilename = '한글파일명.pdf';
      const wrapper = mount(AttachedFile, {
        props: { filename: koreanFilename }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe(koreanFilename);
    });

    it('영문 filename이 올바르게 렌더링된다', () => {
      const englishFilename = 'english-filename.pdf';
      const wrapper = mount(AttachedFile, {
        props: { filename: englishFilename }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe(englishFilename);
    });

    it('숫자가 포함된 filename이 올바르게 렌더링된다', () => {
      const numberFilename = '2024년 보고서 v1.2.pdf';
      const wrapper = mount(AttachedFile, {
        props: { filename: numberFilename }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe(numberFilename);
    });

    it('확장자가 없는 filename도 처리 가능하다', () => {
      const noExtFilename = '확장자없는파일';
      const wrapper = mount(AttachedFile, {
        props: { filename: noExtFilename }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe(noExtFilename);
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(AttachedFile, {
        props: { 
          filename: undefined,
          type: undefined
        }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe('파일명');
      expect(wrapper.classes()).toContain('attached-file--1line');
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('컴포넌트가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(AttachedFile);
      
      expect(wrapper.html()).toContain('data-testid="attached-file"');
      expect(wrapper.html()).toContain('data-testid="delete-button"');
      expect(wrapper.find('.attached-file__divider').exists()).toBe(true);
      expect(wrapper.find('.attached-file__content').exists()).toBe(true);
    });

    it('각 타입별 고유한 클래스가 적용된다', () => {
      const types = ['1line', '2line', '3line', '4line', '5line'] as const;
      
      types.forEach(type => {
        const wrapper = mount(AttachedFile, { props: { type } });
        
        expect(wrapper.classes()).toContain(`attached-file--${type}`);
        
        // 다른 타입 클래스는 포함하지 않아야 함
        const otherTypes = types.filter(t => t !== type);
        otherTypes.forEach(otherType => {
          expect(wrapper.classes()).not.toContain(`attached-file--${otherType}`);
        });
      });
    });

    it('삭제 아이콘 이미지 src가 올바르게 설정된다', () => {
      const wrapper = mount(AttachedFile);
      const iconImg = wrapper.find('.attached-file__delete-icon');
      
      expect(iconImg.attributes('src')).toBe('http://localhost:3845/assets/5a16b7852fe18fd2c59af386d98d7b76c2b5e233.svg');
    });
  });

  // 이벤트 핸들러 동작 테스트
  describe('이벤트 핸들러 동작 테스트', () => {
    it('여러 번 클릭해도 각각 이벤트가 emit된다', async () => {
      const wrapper = mount(AttachedFile, {
        props: { filename: 'test.pdf' }
      });

      await wrapper.find('.attached-file__delete-button').trigger('click');
      await wrapper.find('.attached-file__delete-button').trigger('click');
      await wrapper.find('.attached-file__delete-button').trigger('click');

      expect(wrapper.emitted('delete')).toHaveLength(3);
      expect(wrapper.emitted('delete')![0][0]).toBe('test.pdf');
      expect(wrapper.emitted('delete')![1][0]).toBe('test.pdf');
      expect(wrapper.emitted('delete')![2][0]).toBe('test.pdf');
    });

    it('filename이 변경된 후 delete 이벤트에 새 filename이 전달된다', async () => {
      const wrapper = mount(AttachedFile, {
        props: { filename: 'old.pdf' }
      });

      await wrapper.setProps({ filename: 'new.pdf' });
      await wrapper.find('.attached-file__delete-button').trigger('click');

      const emittedEvents = wrapper.emitted('delete');
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents![0][0]).toBe('new.pdf');
    });
  });

  // 컴포넌트 라이프사이클 테스트
  describe('컴포넌트 라이프사이클 테스트', () => {
    it('props 업데이트가 정상적으로 반영된다', async () => {
      const wrapper = mount(AttachedFile, {
        props: { filename: 'initial.pdf', type: '1line' }
      });

      expect(wrapper.find('.attached-file__filename').text()).toBe('initial.pdf');
      expect(wrapper.classes()).toContain('attached-file--1line');

      await wrapper.setProps({ filename: 'updated.pdf', type: '3line' });

      expect(wrapper.find('.attached-file__filename').text()).toBe('updated.pdf');
      expect(wrapper.classes()).toContain('attached-file--3line');
      expect(wrapper.classes()).not.toContain('attached-file--1line');
    });
  });
});