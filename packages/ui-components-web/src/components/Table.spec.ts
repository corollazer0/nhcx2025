import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Table from './Table.vue';

describe('Table', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(Table);

      expect(wrapper.find('[data-testid="table"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('table');
    });

    it('기본 props로 단일 행 테이블을 렌더링한다', () => {
      const wrapper = mount(Table);

      expect(wrapper.find('.table__row').exists()).toBe(true);
      expect(wrapper.find('.table__cell--th').exists()).toBe(true);
      expect(wrapper.find('.table__cell--td').exists()).toBe(true);
      expect(wrapper.text()).toContain('구분');
      expect(wrapper.text()).toContain('내용');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(Table);

      expect(wrapper.find('[data-testid="table"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('rows prop이 올바르게 렌더링된다', () => {
      const rows = [
        { header: '대상', content: '19세 이상 거주자' },
        { header: '비과세한도', content: '200만원' }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.findAll('.table__row')).toHaveLength(2);
      expect(wrapper.text()).toContain('대상');
      expect(wrapper.text()).toContain('19세 이상 거주자');
      expect(wrapper.text()).toContain('비과세한도');
      expect(wrapper.text()).toContain('200만원');
    });

    it('headerWidth prop이 올바르게 동작한다', () => {
      const wrapper = mount(Table, {
        props: {
          headerWidth: '150px',
          rows: [{ header: '구분', content: '내용' }]
        }
      });

      expect(wrapper.find('.table__row').exists()).toBe(true);
    });

    it('dataAlign prop이 올바르게 동작한다', () => {
      const alignments = ['left', 'center', 'right'] as const;

      alignments.forEach(dataAlign => {
        const wrapper = mount(Table, {
          props: {
            dataAlign,
            rows: [{ header: '구분', content: '내용' }]
          }
        });

        expect(wrapper.find(`.table__cell--${dataAlign}`).exists()).toBe(true);
      });
    });

    it('개별 행의 align이 우선적으로 적용된다', () => {
      const rows = [
        { header: '구분', content: '내용', align: 'right' as const }
      ];

      const wrapper = mount(Table, {
        props: {
          rows,
          dataAlign: 'left'
        }
      });

      expect(wrapper.find('.table__cell--right').exists()).toBe(true);
      expect(wrapper.find('.table__cell--left').exists()).toBe(false);
    });

    it('items prop으로 bullet 목록이 렌더링된다', () => {
      const rows = [
        {
          header: '대상',
          items: [
            { text: '19세 이상 거주자', bulletType: 'bullet' as const },
            { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' as const }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.find('.table__bullets').exists()).toBe(true);
      expect(wrapper.findAll('.table__bullet-item')).toHaveLength(2);
      expect(wrapper.text()).toContain('19세 이상 거주자');
      expect(wrapper.text()).toContain('15세 이상 19세 미만인 거주자로 근로소득이 있는자');
    });

    it('hyphen bullet이 올바르게 렌더링된다', () => {
      const rows = [
        {
          header: '가입확인서류',
          items: [
            { text: '실명확인증표(신분증)', bulletType: 'hyphen' as const, indentLevel: 1 }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.find('.table__bullet-hyphen').exists()).toBe(true);
      expect(wrapper.find('.table__bullet-item--indent').exists()).toBe(true);
      expect(wrapper.text()).toContain('실명확인증표(신분증)');
    });
  });

  // 다중 행 테스트
  describe('다중 행 테스트', () => {
    it('여러 행이 올바르게 렌더링된다', () => {
      const rows = [
        { header: '대상', content: '19세 이상 거주자' },
        { header: '비과세한도', content: '200만원' },
        { header: '가입확인서류', content: '실명확인증표' }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.findAll('.table__row')).toHaveLength(3);
      expect(wrapper.findAll('.table__cell--th')).toHaveLength(3);
      expect(wrapper.findAll('.table__cell--td')).toHaveLength(3);
    });

    it('마지막 행에 bottom border 클래스가 적용된다', () => {
      const rows = [
        { header: '첫번째', content: '내용1' },
        { header: '두번째', content: '내용2' },
        { header: '세번째', content: '내용3' }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      const tableRows = wrapper.findAll('.table__row');
      expect(tableRows[tableRows.length - 1].classes()).toContain('table__row--last');
    });

    it('각 행마다 다른 정렬을 가질 수 있다', () => {
      const rows = [
        { header: '텍스트', content: '왼쪽', align: 'left' as const },
        { header: '제목', content: '가운데', align: 'center' as const },
        { header: '숫자', content: '100%', align: 'right' as const }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.find('.table__cell--left').exists()).toBe(true);
      expect(wrapper.find('.table__cell--center').exists()).toBe(true);
      expect(wrapper.find('.table__cell--right').exists()).toBe(true);
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('테이블 클릭 시 click 이벤트가 emit된다', async () => {
      const wrapper = mount(Table);

      await wrapper.trigger('click');

      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')).toHaveLength(1);
    });

    it('이벤트 핸들러에 MouseEvent 객체가 전달된다', async () => {
      const wrapper = mount(Table);

      await wrapper.trigger('click');

      const emittedEvents = wrapper.emitted('click');
      expect(emittedEvents).toBeTruthy();
      expect(emittedEvents![0][0]).toBeInstanceOf(Event);
    });
  });

  // Bullet 기능 테스트
  describe('Bullet 기능 테스트', () => {
    it('content가 있으면 일반 텍스트가 표시된다', () => {
      const rows = [
        { header: '구분', content: '내용' }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.find('.table__bullets').exists()).toBe(false);
      expect(wrapper.find('.table__text').exists()).toBe(true);
      expect(wrapper.text()).toContain('내용');
    });

    it('items가 있으면 bullets가 표시된다', () => {
      const rows = [
        {
          header: '대상',
          items: [
            { text: '테스트 항목', bulletType: 'bullet' as const }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.find('.table__bullets').exists()).toBe(true);
      expect(wrapper.find('.table__text').exists()).toBe(false);
    });

    it('bullet과 hyphen 타입이 구분되어 렌더링된다', () => {
      const rows = [
        {
          header: '가입확인서류',
          items: [
            { text: 'Bullet 항목', bulletType: 'bullet' as const },
            { text: 'Hyphen 항목', bulletType: 'hyphen' as const }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.find('.table__bullet-icon').exists()).toBe(true);
      expect(wrapper.find('.table__bullet-hyphen').exists()).toBe(true);
    });

    it('indentLevel이 적용된다', () => {
      const rows = [
        {
          header: '가입확인서류',
          items: [
            { text: '들여쓰기된 항목', bulletType: 'hyphen' as const, indentLevel: 1 }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.find('.table__bullet-item--indent').exists()).toBe(true);
    });
  });

  // 스타일링 테스트
  describe('스타일링 테스트', () => {
    it('TH는 헤더 스타일을 가진다', () => {
      const wrapper = mount(Table);

      expect(wrapper.find('.table__cell--th').exists()).toBe(true);
    });

    it('TD는 콘텐츠 스타일을 가진다', () => {
      const wrapper = mount(Table);

      expect(wrapper.find('.table__cell--td').exists()).toBe(true);
    });

    it('정렬이 올바르게 적용된다', () => {
      const alignments = ['left', 'center', 'right'] as const;

      alignments.forEach(dataAlign => {
        const wrapper = mount(Table, {
          props: {
            dataAlign,
            rows: [{ header: '구분', content: '내용' }]
          }
        });
        expect(wrapper.find(`.table__cell--${dataAlign}`).exists()).toBe(true);
      });
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('div 요소로 렌더링된다', () => {
      const wrapper = mount(Table);

      expect(wrapper.element.tagName).toBe('DIV');
    });

    it('적절한 클래스가 적용된다', () => {
      const wrapper = mount(Table, {
        props: {
          dataAlign: 'center',
          rows: [{ header: '구분', content: '내용' }]
        }
      });

      expect(wrapper.classes()).toContain('table');
      expect(wrapper.find('.table__cell--th').exists()).toBe(true);
      expect(wrapper.find('.table__cell--center').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('rows가 변경되면 올바르게 업데이트된다', async () => {
      const initialRows = [{ header: '구분', content: '내용' }];
      const wrapper = mount(Table, {
        props: { rows: initialRows }
      });

      expect(wrapper.text()).toContain('구분');
      expect(wrapper.text()).toContain('내용');

      const newRows = [{ header: '대상', content: '19세 이상' }];
      await wrapper.setProps({ rows: newRows });

      expect(wrapper.text()).toContain('대상');
      expect(wrapper.text()).toContain('19세 이상');
      expect(wrapper.text()).not.toContain('구분');
    });

    it('dataAlign이 변경되면 올바르게 업데이트된다', async () => {
      const wrapper = mount(Table, {
        props: {
          dataAlign: 'left',
          rows: [{ header: '구분', content: '내용' }]
        }
      });

      expect(wrapper.find('.table__cell--left').exists()).toBe(true);

      await wrapper.setProps({ dataAlign: 'right' });

      expect(wrapper.find('.table__cell--right').exists()).toBe(true);
      expect(wrapper.find('.table__cell--left').exists()).toBe(false);
    });

    it('content에서 items로 변경 시 bullet 모드로 전환된다', async () => {
      const wrapper = mount(Table, {
        props: {
          rows: [{ header: '구분', content: '내용' }]
        }
      });

      expect(wrapper.find('.table__text').exists()).toBe(true);
      expect(wrapper.find('.table__bullets').exists()).toBe(false);

      const newRows = [{
        header: '구분',
        items: [{ text: '새 항목', bulletType: 'bullet' as const }]
      }];
      await wrapper.setProps({ rows: newRows });

      expect(wrapper.find('.table__text').exists()).toBe(false);
      expect(wrapper.find('.table__bullets').exists()).toBe(true);
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 rows 배열이도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Table, {
        props: { rows: [] }
      });

      expect(wrapper.find('[data-testid="table"]').exists()).toBe(true);
      expect(wrapper.findAll('.table__row')).toHaveLength(0);
    });

    it('매우 긴 텍스트가 전달되어도 오류가 발생하지 않는다', () => {
      const longText = 'A'.repeat(200);
      const rows = [{ header: '구분', content: longText }];
      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.text()).toContain(longText);
    });

    it('특수 문자가 포함된 텍스트가 올바르게 렌더링된다', () => {
      const specialText = '대상 & 비과세한도 < > " \' 100%';
      const rows = [{ header: '특수문자', content: specialText }];
      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.text()).toContain(specialText);
    });

    it('줄바꿈이 포함된 bullet 텍스트가 올바르게 처리된다', () => {
      const rows = [
        {
          header: '가입확인서류',
          items: [
            { text: '소득확인증명서(개인종합자산\n관리계좌 가입용)', bulletType: 'hyphen' as const }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.text()).toContain('소득확인증명서(개인종합자산');
      expect(wrapper.text()).toContain('관리계좌 가입용)');
    });

    it('undefined rows가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Table, {
        props: {
          rows: undefined as any
        }
      });

      expect(wrapper.text()).toContain('구분');
      expect(wrapper.text()).toContain('내용');
    });
  });

  // 실제 사용 사례 테스트
  describe('실제 사용 사례 테스트', () => {
    it('기본 정보 테이블', () => {
      const rows = [
        { header: '대상', content: '19세 이상 거주자' },
        { header: '비과세한도', content: '200만원', align: 'right' as const }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.findAll('.table__row')).toHaveLength(2);
      expect(wrapper.find('.table__cell--right').exists()).toBe(true);
      expect(wrapper.text()).toContain('대상');
      expect(wrapper.text()).toContain('200만원');
    });

    it('bullet 목록이 있는 복잡한 테이블', () => {
      const rows = [
        {
          header: '대상',
          items: [
            { text: '19세 이상 거주자', bulletType: 'bullet' as const },
            { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' as const }
          ]
        },
        { header: '비과세한도', content: '200만원' },
        {
          header: '가입확인서류',
          items: [
            { text: '19세 이상 거주자 : 실명확인증표(신분증)', bulletType: 'bullet' as const },
            { text: '15세 이상 19세 미만인 거주자로 근로소득이 있는자', bulletType: 'bullet' as const },
            { text: '실명확인증표(신분증)', bulletType: 'hyphen' as const, indentLevel: 1 },
            { text: '소득확인증명서(개인종합자산관리계좌 가입용)', bulletType: 'hyphen' as const, indentLevel: 1 }
          ]
        }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.findAll('.table__row')).toHaveLength(3);
      expect(wrapper.find('.table__bullets').exists()).toBe(true);
      expect(wrapper.findAll('.table__bullet-item')).toHaveLength(6);
      expect(wrapper.findAll('.table__bullet-icon')).toHaveLength(4);
      expect(wrapper.findAll('.table__bullet-hyphen')).toHaveLength(2);
      expect(wrapper.findAll('.table__bullet-item--indent')).toHaveLength(2);
    });

    it('숫자 데이터 테이블', () => {
      const rows = [
        { header: '배율 1', content: '100%', align: 'right' as const },
        { header: '배율 2', content: '200%', align: 'right' as const },
        { header: '배율 3', content: '300%', align: 'right' as const }
      ];

      const wrapper = mount(Table, {
        props: { rows }
      });

      expect(wrapper.findAll('.table__cell--right')).toHaveLength(3);
      expect(wrapper.text()).toContain('100%');
      expect(wrapper.text()).toContain('200%');
      expect(wrapper.text()).toContain('300%');
    });
  });

  // 반응형 테스트
  describe('반응형 테스트', () => {
    it('모든 정렬에서 콘텐츠가 올바르게 표시된다', () => {
      const alignments = ['left', 'center', 'right'] as const;

      alignments.forEach(dataAlign => {
        const wrapper = mount(Table, {
          props: {
            dataAlign,
            rows: [{ header: '구분', content: '테스트 콘텐츠' }]
          }
        });

        expect(wrapper.text()).toContain('테스트 콘텐츠');
        expect(wrapper.find(`.table__cell--${dataAlign}`).exists()).toBe(true);
      });
    });

    it('다양한 행 수에서 성능이 유지된다', () => {
      const manyRows = Array.from({ length: 10 }, (_, i) => ({
        header: `항목 ${i + 1}`,
        content: `내용 ${i + 1}`
      }));

      const wrapper = mount(Table, {
        props: { rows: manyRows }
      });

      expect(wrapper.findAll('.table__row')).toHaveLength(10);
      expect(wrapper.text()).toContain('항목 1');
      expect(wrapper.text()).toContain('항목 10');
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('테이블 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Table);

      expect(wrapper.html()).toContain('<div');
      expect(wrapper.find('.table__cell-content').exists()).toBe(true);
      expect(wrapper.html()).toContain('data-testid="table"');
    });

    it('각 셀 타입별 고유한 클래스가 적용된다', () => {
      const wrapper = mount(Table);

      expect(wrapper.find('.table__cell--th').exists()).toBe(true);
      expect(wrapper.find('.table__cell--td').exists()).toBe(true);

      // TH와 TD가 각각 1개씩 있어야 함
      expect(wrapper.findAll('.table__cell--th')).toHaveLength(1);
      expect(wrapper.findAll('.table__cell--td')).toHaveLength(1);
    });

    it('정렬 클래스가 올바르게 적용된다', () => {
      const alignments = ['left', 'center', 'right'] as const;

      alignments.forEach(dataAlign => {
        const wrapper = mount(Table, {
          props: {
            dataAlign,
            rows: [{ header: '구분', content: '내용' }]
          }
        });
        expect(wrapper.find(`.table__cell--${dataAlign}`).exists()).toBe(true);
      });
    });

    it('마지막 행에 bottom border 클래스가 적용된다', () => {
      const rows = [
        { header: '처번째', content: '내용1' },
        { header: '두번째', content: '내용2' }
      ];
      const wrapper = mount(Table, { props: { rows } });

      const tableRows = wrapper.findAll('.table__row');
      expect(tableRows[tableRows.length - 1].classes()).toContain('table__row--last');
    });
  });
});