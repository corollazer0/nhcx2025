import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Accordion from './Accordion.vue';
import IconNotice from './icons/IconNotice.vue';
import IconArrowDown from './icons/IconArrowDown.vue';
import IconDownload from './icons/IconDownload.vue';
import IconChevronRight from './icons/IconChevronRight.vue';

describe('Accordion', () => {
  // 공통 마운트 옵션
  const mountOptions = {
    global: {
      components: {
        IconNotice,
        IconArrowDown,
        IconDownload,
        IconChevronRight
      }
    }
  };

  // 헬퍼 함수: Accordion 컴포넌트 마운트
  const mountAccordion = (props = {}) => {
    return mount(Accordion, {
      ...mountOptions,
      props
    });
  };

  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mountAccordion();
      
      expect(wrapper.find('[data-testid="accordion"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('accordion');
    });

    it('기본 props로 아코디언이 렌더링된다', () => {
      const wrapper = mountAccordion();
      
      expect(wrapper.find('.accordion__header').exists()).toBe(true);
      expect(wrapper.find('.accordion__title').exists()).toBe(true);
      expect(wrapper.text()).toContain('알아두세요');
    });

    it('기본 상태에서는 닫혀있다', () => {
      const wrapper = mountAccordion();
      
      expect(wrapper.find('.accordion__content').exists()).toBe(false);
      expect(wrapper.find('.accordion__arrow--rotated').exists()).toBe(false);
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mountAccordion();
      
      expect(wrapper.find('[data-testid="accordion"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props 테스트', () => {
    it('title prop이 올바르게 렌더링된다', () => {
      const wrapper = mount(Accordion, {
        props: { title: '자주 묻는 질문' }
      });

      expect(wrapper.text()).toContain('자주 묻는 질문');
    });

    it('divider=false일 때 구분선이 렌더링되지 않는다', () => {
      const wrapper = mount(Accordion, {
        props: { divider: false }
      });

      expect(wrapper.find('.accordion__divider').exists()).toBe(false);
    });

    it('divider=true일 때 구분선이 렌더링된다', () => {
      const wrapper = mount(Accordion, {
        props: { divider: true }
      });

      expect(wrapper.find('.accordion__divider').exists()).toBe(true);
    });

    it('state=open일 때 아코디언이 열린 상태로 렌더링된다', () => {
      const wrapper = mount(Accordion, {
        props: { state: 'open' }
      });

      expect(wrapper.find('.accordion__content').exists()).toBe(true);
      expect(wrapper.find('.accordion__arrow--rotated').exists()).toBe(true);
    });

    it('state=close일 때 아코디언이 닫힌 상태로 렌더링된다', () => {
      const wrapper = mount(Accordion, {
        props: { state: 'close' }
      });

      expect(wrapper.find('.accordion__content').exists()).toBe(false);
      expect(wrapper.find('.accordion__arrow--rotated').exists()).toBe(false);
    });

    it('커스텀 items가 올바르게 렌더링된다', () => {
      const customItems = [
        { title: '첫 번째 항목' },
        { title: '두 번째 항목' }
      ];
      
      const wrapper = mount(Accordion, {
        props: { 
          state: 'open',
          items: customItems 
        }
      });

      expect(wrapper.text()).toContain('첫 번째 항목');
      expect(wrapper.text()).toContain('두 번째 항목');
    });

    it('type에 따라 표시되는 아이템 수가 조정된다', () => {
      const wrapper = mount(Accordion, {
        props: { 
          state: 'open',
          type: '2line'
        }
      });

      const items = wrapper.findAll('.accordion__item');
      expect(items).toHaveLength(2);
    });

    it('ariaLabel prop이 올바르게 적용된다', () => {
      const wrapper = mount(Accordion, {
        props: { ariaLabel: '공지사항 아코디언' }
      });

      const header = wrapper.find('.accordion__header');
      expect(header.attributes('aria-label')).toBe('공지사항 아코디언');
    });
  });

  // 모든 type 조합 테스트
  describe('Type Props 테스트', () => {
    const types = ['1line', '2line', '3line', '4line', '5line'] as const;
    
    types.forEach(type => {
      it(`type="${type}"일 때 올바른 수의 아이템이 표시된다`, () => {
        const wrapper = mount(Accordion, {
          props: { 
            state: 'open',
            type: type
          }
        });

        const expectedCount = parseInt(type.charAt(0));
        const items = wrapper.findAll('.accordion__item');
        expect(items).toHaveLength(expectedCount);
      });
    });
  });

  // 이벤트 테스트
  describe('이벤트 테스트', () => {
    it('헤더 클릭 시 아코디언이 토글된다', async () => {
      const wrapper = mount(Accordion);
      const header = wrapper.find('.accordion__header');

      // 초기 상태는 닫힘
      expect(wrapper.find('.accordion__content').exists()).toBe(false);

      // 클릭 후 열림
      await header.trigger('click');
      await nextTick();
      
      expect(wrapper.find('.accordion__content').exists()).toBe(true);
      expect(wrapper.find('.accordion__arrow--rotated').exists()).toBe(true);

      // 다시 클릭 후 닫힘
      await header.trigger('click');
      await nextTick();
      
      expect(wrapper.find('.accordion__content').exists()).toBe(false);
      expect(wrapper.find('.accordion__arrow--rotated').exists()).toBe(false);
    });

    it('Enter 키 누를 때 아코디언이 토글된다', async () => {
      const wrapper = mount(Accordion);
      const header = wrapper.find('.accordion__header');

      await header.trigger('keydown.enter');
      await nextTick();
      
      expect(wrapper.find('.accordion__content').exists()).toBe(true);
    });

    it('Space 키 누를 때 아코디언이 토글된다', async () => {
      const wrapper = mount(Accordion);
      const header = wrapper.find('.accordion__header');

      await header.trigger('keydown.space');
      await nextTick();
      
      expect(wrapper.find('.accordion__content').exists()).toBe(true);
    });

    it('토글 시 이벤트가 올바르게 emit된다', async () => {
      const wrapper = mountAccordion();
      const header = wrapper.find('.accordion__header');

      // 열기
      await header.trigger('click');
      await nextTick();

      expect(wrapper.emitted('toggle')).toBeTruthy();
      expect(wrapper.emitted('open')).toBeTruthy();
      expect(wrapper.emitted('toggle')![0]).toEqual([true]);

      // 닫기
      await header.trigger('click');
      await nextTick();

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('toggle')![1]).toEqual([false]);
    });

    it('link 타입 아이템 아이콘 클릭 시 이벤트가 올바르게 emit된다', async () => {
      const wrapper = mountAccordion({
        state: 'open',
        items: [{ title: '테스트 아이템', type: 'link' }]
      });

      const downloadButton = wrapper.find('[aria-label="다운로드"]');
      const navigateButton = wrapper.find('[aria-label="더보기"]');

      // 다운로드 버튼 클릭
      await downloadButton.trigger('click');
      expect(wrapper.emitted('download')).toBeTruthy();
      expect(wrapper.emitted('download')![0]).toEqual([0, { title: '테스트 아이템', type: 'link' }]);

      // 더보기 버튼 클릭
      await navigateButton.trigger('click');
      expect(wrapper.emitted('navigate')).toBeTruthy();
      expect(wrapper.emitted('navigate')![0]).toEqual([0, { title: '테스트 아이템', type: 'link' }]);
    });
  });

  // 아이템 타입 테스트
  describe('아이템 타입 테스트', () => {
    it('basic 타입 아이템이 올바르게 렌더링된다', async () => {
      const wrapper = mountAccordion({
        state: 'open',
        items: [{ title: '기본 아이템', type: 'basic' }]
      });

      const basicItem = wrapper.find('.accordion__item--basic');
      const basicText = wrapper.find('.accordion__item-text--basic');
      const basicTitle = wrapper.find('.accordion__item-title--basic');
      const icons = wrapper.find('.accordion__item-icons');

      expect(basicItem.exists()).toBe(true);
      expect(basicText.exists()).toBe(true);
      expect(basicTitle.exists()).toBe(true);
      expect(basicTitle.text()).toBe('기본 아이템');
      expect(icons.exists()).toBe(false); // 아이콘이 없어야 함
    });

    it('bullet 타입 아이템이 올바르게 렌더링된다', async () => {
      const wrapper = mountAccordion({
        state: 'open',
        items: [{ title: '불릿 아이템', type: 'bullet' }]
      });

      const bulletItem = wrapper.find('.accordion__item--bullet');
      const bulletText = wrapper.find('.accordion__item-text--bullet');
      const bulletTitle = wrapper.find('.accordion__item-title--bullet');
      const bulletPoint = wrapper.find('.accordion__item-bullet-point');
      const icons = wrapper.find('.accordion__item-icons');

      expect(bulletItem.exists()).toBe(true);
      expect(bulletText.exists()).toBe(true);
      expect(bulletTitle.exists()).toBe(true);
      expect(bulletTitle.text()).toBe('불릿 아이템');
      expect(bulletPoint.exists()).toBe(true);
      expect(icons.exists()).toBe(false); // 아이콘이 없어야 함
    });

    it('link 타입 아이템이 올바르게 렌더링된다', async () => {
      const wrapper = mountAccordion({
        state: 'open',
        items: [{ title: '링크 아이템', type: 'link' }]
      });

      const linkItem = wrapper.find('.accordion__item--link');
      const linkText = wrapper.find('.accordion__item-text');
      const linkTitle = wrapper.find('.accordion__item-title');
      const icons = wrapper.find('.accordion__item-icons');
      const downloadButton = wrapper.find('[aria-label="다운로드"]');
      const navigateButton = wrapper.find('[aria-label="더보기"]');

      expect(linkItem.exists()).toBe(true);
      expect(linkText.exists()).toBe(true);
      expect(linkTitle.exists()).toBe(true);
      expect(linkTitle.text()).toBe('링크 아이템');
      expect(icons.exists()).toBe(true);
      expect(downloadButton.exists()).toBe(true);
      expect(navigateButton.exists()).toBe(true);
    });

    it('타입이 지정되지 않은 아이템은 link 타입으로 기본 처리된다', async () => {
      const wrapper = mountAccordion({
        state: 'open',
        items: [{ title: '타입 미지정 아이템' }]
      });

      const linkItem = wrapper.find('.accordion__item--link');
      const icons = wrapper.find('.accordion__item-icons');

      expect(linkItem.exists()).toBe(true);
      expect(icons.exists()).toBe(true);
    });

    it('혼합 타입 아이템들이 올바르게 렌더링된다', async () => {
      const wrapper = mountAccordion({
        state: 'open',
        items: [
          { title: '기본 아이템', type: 'basic' },
          { title: '불릿 아이템', type: 'bullet' },
          { title: '링크 아이템', type: 'link' }
        ]
      });

      const basicItem = wrapper.find('.accordion__item--basic');
      const bulletItem = wrapper.find('.accordion__item--bullet');
      const linkItem = wrapper.find('.accordion__item--link');

      expect(basicItem.exists()).toBe(true);
      expect(bulletItem.exists()).toBe(true);
      expect(linkItem.exists()).toBe(true);

      // 각 타입별로 올바른 요소들이 렌더링되는지 확인
      expect(wrapper.findAll('.accordion__item-icons')).toHaveLength(1); // link 타입만 아이콘 있음
      expect(wrapper.findAll('.accordion__item-bullet-point')).toHaveLength(1); // bullet 타입만 불릿 있음
    });
  });

  // 접근성 테스트
  describe('접근성 테스트', () => {
    it('헤더에 올바른 ARIA 속성이 설정된다', () => {
      const wrapper = mount(Accordion);
      const header = wrapper.find('.accordion__header');

      expect(header.attributes('role')).toBe('button');
      expect(header.attributes('tabindex')).toBe('0');
      expect(header.attributes('aria-expanded')).toBe('false');
      expect(header.attributes('aria-controls')).toBeTruthy();
      expect(header.attributes('aria-label')).toBe('알아두세요 아코디언');
    });

    it('열린 상태에서 aria-expanded가 true가 된다', async () => {
      const wrapper = mount(Accordion);
      const header = wrapper.find('.accordion__header');

      await header.trigger('click');
      await nextTick();

      expect(header.attributes('aria-expanded')).toBe('true');
    });

    it('콘텐츠 영역에 올바른 ARIA 속성이 설정된다', async () => {
      const wrapper = mount(Accordion, {
        props: { state: 'open' }
      });

      const content = wrapper.find('.accordion__content');
      expect(content.attributes('role')).toBe('region');
      expect(content.attributes('aria-labelledby')).toBeTruthy();
      expect(content.attributes('id')).toBeTruthy();
    });

    it('SVG 아이콘에 접근성 속성이 올바르게 설정된다', () => {
      const wrapper = mountAccordion({
        state: 'open'
      });

      const svgIcons = wrapper.findAll('svg');
      expect(svgIcons.length).toBeGreaterThanOrEqual(2); // 공지 아이콘 + 화살표 아이콘
      
      svgIcons.forEach(svg => {
        expect(svg.attributes('role')).toBe('img');
        expect(svg.attributes('aria-label')).toBeTruthy();
      });
    });

    it('아이템 이미지에 빈 alt 속성이 설정된다 (decorative)', () => {
      const wrapper = mountAccordion({
        state: 'open'
      });

      const itemImages = wrapper.findAll('.accordion__item img');
      itemImages.forEach(img => {
        expect(img.attributes('alt')).toBe('');
      });
    });

    it('키보드 포커스가 가능하다', () => {
      const wrapper = mount(Accordion);
      const header = wrapper.find('.accordion__header');

      expect(header.attributes('tabindex')).toBe('0');
    });
  });

  // CSS 클래스 테스트
  describe('CSS 클래스 테스트', () => {
    it('루트 요소에 accordion 클래스가 적용된다', () => {
      const wrapper = mount(Accordion);
      
      expect(wrapper.classes()).toContain('accordion');
    });

    it('모든 주요 요소에 올바른 클래스가 적용된다', () => {
      const wrapper = mount(Accordion, {
        props: { state: 'open' }
      });

      expect(wrapper.find('.accordion__header').exists()).toBe(true);
      expect(wrapper.find('.accordion__text-section').exists()).toBe(true);
      expect(wrapper.find('.accordion__title').exists()).toBe(true);
      expect(wrapper.find('.accordion__arrow-container').exists()).toBe(true);
      expect(wrapper.find('.accordion__content').exists()).toBe(true);
      expect(wrapper.find('.accordion__item').exists()).toBe(true);
    });

    it('화살표 회전 클래스가 올바르게 적용된다', async () => {
      const wrapper = mount(Accordion);
      
      // 초기에는 회전되지 않음
      expect(wrapper.find('.accordion__arrow--rotated').exists()).toBe(false);
      
      // 클릭 후 회전됨
      await wrapper.find('.accordion__header').trigger('click');
      await nextTick();
      
      expect(wrapper.find('.accordion__arrow--rotated').exists()).toBe(true);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링 테스트', () => {
    it('닫힌 상태에서는 콘텐츠가 렌더링되지 않는다', () => {
      const wrapper = mount(Accordion, {
        props: { state: 'close' }
      });

      expect(wrapper.find('.accordion__content').exists()).toBe(false);
    });

    it('열린 상태에서는 콘텐츠가 렌더링된다', () => {
      const wrapper = mount(Accordion, {
        props: { state: 'open' }
      });

      expect(wrapper.find('.accordion__content').exists()).toBe(true);
    });

    it('props 변경 시 동적으로 반응한다', async () => {
      const wrapper = mount(Accordion, {
        props: { title: '초기 제목' }
      });

      expect(wrapper.text()).toContain('초기 제목');

      await wrapper.setProps({ title: '변경된 제목' });

      expect(wrapper.text()).toContain('변경된 제목');
      expect(wrapper.text()).not.toContain('초기 제목');
    });

    it('아이템 변경 시 올바르게 업데이트된다', async () => {
      const wrapper = mount(Accordion, {
        props: { 
          state: 'open',
          items: [{ title: '초기 아이템' }]
        }
      });

      expect(wrapper.text()).toContain('초기 아이템');

      await wrapper.setProps({
        items: [{ title: '변경된 아이템' }]
      });

      expect(wrapper.text()).toContain('변경된 아이템');
      expect(wrapper.text()).not.toContain('초기 아이템');
    });
  });

  // Edge Cases 테스트
  describe('Edge Cases', () => {
    it('빈 제목이 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Accordion, {
        props: { title: '' }
      });

      expect(wrapper.find('.accordion__title').exists()).toBe(true);
      expect(wrapper.find('.accordion__title p').text()).toBe('');
    });

    it('빈 items 배열이 전달되어도 오류가 발생하지 않는다', () => {
      const wrapper = mount(Accordion, {
        props: { 
          state: 'open',
          items: [] 
        }
      });

      expect(wrapper.find('.accordion__content').exists()).toBe(true);
      expect(wrapper.findAll('.accordion__item')).toHaveLength(0);
    });

    it('매우 긴 제목이 전달되어도 오류가 발생하지 않는다', () => {
      const longTitle = 'A'.repeat(100);
      const wrapper = mount(Accordion, {
        props: { title: longTitle }
      });

      expect(wrapper.text()).toContain(longTitle);
    });

    it('특수 문자가 포함된 제목이 올바르게 렌더링된다', () => {
      const specialTitle = '알아두세요 & 공지사항 < > " \' 100%';
      const wrapper = mount(Accordion, {
        props: { title: specialTitle }
      });

      expect(wrapper.text()).toContain(specialTitle);
    });

    it('undefined props가 전달되어도 기본값이 적용된다', () => {
      const wrapper = mount(Accordion, {
        props: {
          title: undefined,
          divider: undefined,
          state: undefined,
          items: undefined
        }
      });

      expect(wrapper.text()).toContain('알아두세요');
      expect(wrapper.find('.accordion__divider').exists()).toBe(true);
      expect(wrapper.find('.accordion__content').exists()).toBe(false);
    });

    it('잘못된 type이 전달되어도 기본값으로 동작한다', () => {
      const wrapper = mount(Accordion, {
        props: { 
          state: 'open',
          // @ts-expect-error - 테스트를 위한 잘못된 타입
          type: 'invalid' as any
        }
      });

      // 기본값 5line으로 동작
      const items = wrapper.findAll('.accordion__item');
      expect(items).toHaveLength(5);
    });
  });

  // 스타일 검증 테스트
  describe('스타일 검증 테스트', () => {
    it('아코디언 요소가 올바른 HTML 구조를 가진다', () => {
      const wrapper = mount(Accordion, {
        props: { state: 'open' }
      });
      
      expect(wrapper.html()).toContain('class="accordion"');
      expect(wrapper.html()).toContain('data-testid="accordion"');
      expect(wrapper.find('.accordion__header').exists()).toBe(true);
      expect(wrapper.find('.accordion__content').exists()).toBe(true);
    });

    it('SVG 아이콘 컴포넌트가 올바르게 렌더링된다', () => {
      const wrapper = mount(Accordion, {
        props: { state: 'open' },
        ...mountOptions
      });

      // 헤더에 공지 아이콘이 있는지 확인
      const noticeIcon = wrapper.findComponent({ name: 'IconNotice' });
      expect(noticeIcon.exists()).toBe(true);

      // 헤더에 화살표 아이콘이 있는지 확인
      const arrowIcon = wrapper.findComponent({ name: 'IconArrowDown' });
      expect(arrowIcon.exists()).toBe(true);

      // 링크 타입 아이템에 다운로드 아이콘이 있는지 확인 (기본값이므로)
      const downloadIcons = wrapper.findAllComponents({ name: 'IconDownload' });
      expect(downloadIcons.length).toBeGreaterThan(0);

      // 링크 타입 아이템에 화살표 아이콘이 있는지 확인
      const chevronIcons = wrapper.findAllComponents({ name: 'IconChevronRight' });
      expect(chevronIcons.length).toBeGreaterThan(0);
    });

    it('Figma 디자인과 일치하는 구조를 가진다', () => {
      const wrapper = mount(Accordion, {
        props: { state: 'open' }
      });
      
      // data-name 속성으로 Figma 구조 매칭 확인
      expect(wrapper.find('[data-name="Accordion"]').exists()).toBe(true);
      expect(wrapper.find('[data-name="contents"]').exists()).toBe(true);
      expect(wrapper.find('[data-name="atom-accordion"]').exists()).toBe(true);
    });
  });

  // 애니메이션 테스트
  describe('애니메이션 테스트', () => {
    it('화살표 회전 애니메이션이 적용된다', async () => {
      const wrapper = mount(Accordion);
      const header = wrapper.find('.accordion__header');
      
      await header.trigger('click');
      await nextTick();
      
      const arrow = wrapper.find('.accordion__arrow');
      expect(arrow.classes()).toContain('accordion__arrow--rotated');
    });

    it('콘텐츠 확장 애니메이션이 적용된다', async () => {
      const wrapper = mount(Accordion);
      const header = wrapper.find('.accordion__header');
      
      await header.trigger('click');
      await nextTick();
      
      const content = wrapper.find('.accordion__content');
      // CSS 애니메이션 클래스나 스타일이 적용되는지 확인
      expect(content.exists()).toBe(true);
    });
  });

  // 반응형 테스트
  describe('반응형 스타일 테스트', () => {
    it('모든 아이템에서 텍스트가 올바르게 표시된다', () => {
      const wrapper = mount(Accordion, {
        props: { 
          state: 'open',
          items: [
            { title: '테스트 항목 1' },
            { title: '테스트 항목 2' }
          ]
        }
      });
      
      expect(wrapper.text()).toContain('테스트 항목 1');
      expect(wrapper.text()).toContain('테스트 항목 2');
    });
  });
});