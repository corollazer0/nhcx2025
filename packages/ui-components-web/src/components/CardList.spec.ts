import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CardList from './CardList.vue';

interface CardListItem {
  title: string;
  data?: string;
  label?: string;
}

describe('CardList', () => {
  // 기본 렌더링 테스트
  describe('기본 렌더링', () => {
    it('컴포넌트가 정상적으로 렌더링된다', () => {
      const wrapper = mount(CardList);
      
      expect(wrapper.find('[data-testid="card-list"]').exists()).toBe(true);
      expect(wrapper.classes()).toContain('card-list');
    });

    it('기본 props로 lg 사이즈 카드리스트를 렌더링한다', () => {
      const wrapper = mount(CardList);
      
      expect(wrapper.classes()).toContain('card-list--lg');
    });

    it('data-testid 속성이 올바르게 설정된다', () => {
      const wrapper = mount(CardList);
      
      expect(wrapper.find('[data-testid="card-list"]').exists()).toBe(true);
    });
  });

  // Props 테스트
  describe('Props', () => {
    it('size prop에 따라 올바른 클래스를 적용한다', () => {
      const lgWrapper = mount(CardList, { props: { size: 'lg' } });
      expect(lgWrapper.classes()).toContain('card-list--lg');

      const smWrapper = mount(CardList, { props: { size: 'sm' } });
      expect(smWrapper.classes()).toContain('card-list--sm');

      const xsWrapper = mount(CardList, { props: { size: 'xs' } });
      expect(xsWrapper.classes()).toContain('card-list--xs');
    });

    it('기본 items가 올바르게 렌더링된다', () => {
      const wrapper = mount(CardList);
      const items = wrapper.findAll('.card-list__item');
      
      expect(items).toHaveLength(3);
      expect(items[0].find('.card-list__title-text').text()).toBe('타이틀');
      expect(items[0].find('.card-list__data-text').text()).toBe('데이터');
    });

    it('커스텀 items가 올바르게 렌더링된다', () => {
      const customItems: CardListItem[] = [
        { title: '제목1', data: '값1' },
        { title: '제목2', data: '값2' }
      ];
      
      const wrapper = mount(CardList, { props: { items: customItems } });
      const items = wrapper.findAll('.card-list__item');
      
      expect(items).toHaveLength(2);
      expect(items[0].find('.card-list__title-text').text()).toBe('제목1');
      expect(items[0].find('.card-list__data-text').text()).toBe('값1');
      expect(items[1].find('.card-list__title-text').text()).toBe('제목2');
      expect(items[1].find('.card-list__data-text').text()).toBe('값2');
    });

    it('label이 있는 item을 올바르게 렌더링한다', () => {
      const itemsWithLabel: CardListItem[] = [
        { title: '타이틀', label: '라벨' }
      ];
      
      const wrapper = mount(CardList, { props: { items: itemsWithLabel } });
      const label = wrapper.find('.card-list__label');
      
      expect(label.exists()).toBe(true);
      expect(label.text()).toBe('라벨');
      expect(label.classes()).toContain('card-list__label--gray');
      expect(wrapper.find('.card-list__data-text').exists()).toBe(false);
    });

    it('data와 label이 모두 있을 때 label만 렌더링한다', () => {
      const itemsWithBoth: CardListItem[] = [
        { title: '타이틀', data: '데이터', label: '라벨' }
      ];
      
      const wrapper = mount(CardList, { props: { items: itemsWithBoth } });
      
      expect(wrapper.find('.card-list__label').exists()).toBe(true);
      expect(wrapper.find('.card-list__label').text()).toBe('라벨');
      expect(wrapper.find('.card-list__data-text').exists()).toBe(false);
    });
  });

  // 이벤트 테스트
  describe('이벤트 처리', () => {
    it('아이템 클릭 시 itemClick 이벤트를 emit한다', async () => {
      const items: CardListItem[] = [
        { title: '제목1', data: '값1' },
        { title: '제목2', data: '값2' }
      ];
      
      const wrapper = mount(CardList, { props: { items } });
      const firstItem = wrapper.find('.card-list__item');
      
      await firstItem.trigger('click');
      
      expect(wrapper.emitted('itemClick')).toHaveLength(1);
      expect(wrapper.emitted('itemClick')?.[0]).toEqual([items[0], 0]);
    });

    it('여러 아이템 클릭 시 각각 올바른 데이터와 인덱스를 emit한다', async () => {
      const items: CardListItem[] = [
        { title: '제목1', data: '값1' },
        { title: '제목2', data: '값2' }
      ];
      
      const wrapper = mount(CardList, { props: { items } });
      const itemElements = wrapper.findAll('.card-list__item');
      
      await itemElements[0].trigger('click');
      await itemElements[1].trigger('click');
      
      expect(wrapper.emitted('itemClick')).toHaveLength(2);
      expect(wrapper.emitted('itemClick')?.[0]).toEqual([items[0], 0]);
      expect(wrapper.emitted('itemClick')?.[1]).toEqual([items[1], 1]);
    });
  });

  // 조건부 렌더링 테스트
  describe('조건부 렌더링', () => {
    it('빈 items 배열일 때 아무 아이템도 렌더링하지 않는다', () => {
      const wrapper = mount(CardList, { props: { items: [] } });
      const items = wrapper.findAll('.card-list__item');
      
      expect(items).toHaveLength(0);
    });

    it('title만 있고 data/label이 없는 경우를 처리한다', () => {
      const itemsOnlyTitle: CardListItem[] = [
        { title: '제목만' }
      ];
      
      const wrapper = mount(CardList, { props: { items: itemsOnlyTitle } });
      
      expect(wrapper.find('.card-list__title-text').text()).toBe('제목만');
      expect(wrapper.find('.card-list__data-text').exists()).toBe(false);
      expect(wrapper.find('.card-list__label').exists()).toBe(false);
    });

    it('빈 문자열 title도 렌더링한다', () => {
      const itemsEmptyTitle: CardListItem[] = [
        { title: '', data: '데이터' }
      ];
      
      const wrapper = mount(CardList, { props: { items: itemsEmptyTitle } });
      
      expect(wrapper.find('.card-list__title-text').text()).toBe('');
      expect(wrapper.find('.card-list__data-text').text()).toBe('데이터');
    });
  });

  // 접근성 테스트
  describe('접근성', () => {
    it('각 아이템에 클릭 가능한 cursor 스타일이 적용된다', () => {
      const wrapper = mount(CardList);
      const items = wrapper.findAll('.card-list__item');
      
      items.forEach(item => {
        const element = item.element as HTMLElement;
        const computedStyle = window.getComputedStyle(element);
        expect(element.classList.contains('card-list__item')).toBe(true);
      });
    });
  });

  // Edge cases 테스트
  describe('Edge Cases', () => {
    it('매우 긴 title 텍스트를 처리한다', () => {
      const longTitleItems: CardListItem[] = [
        { title: '매우 긴 타이틀 텍스트가 있는 경우에도 올바르게 렌더링되는지 테스트합니다', data: '데이터' }
      ];
      
      const wrapper = mount(CardList, { props: { items: longTitleItems } });
      
      expect(wrapper.find('.card-list__title-text').text()).toBe('매우 긴 타이틀 텍스트가 있는 경우에도 올바르게 렌더링되는지 테스트합니다');
    });

    it('매우 긴 data 텍스트를 처리한다', () => {
      const longDataItems: CardListItem[] = [
        { title: '타이틀', data: '매우 긴 데이터 텍스트가 있는 경우에도 올바르게 렌더링되는지 테스트합니다' }
      ];
      
      const wrapper = mount(CardList, { props: { items: longDataItems } });
      
      expect(wrapper.find('.card-list__data-text').text()).toBe('매우 긴 데이터 텍스트가 있는 경우에도 올바르게 렌더링되는지 테스트합니다');
    });

    it('특수 문자가 포함된 텍스트를 처리한다', () => {
      const specialCharItems: CardListItem[] = [
        { title: '특수문자 !@#$%^&*()_+', data: '데이터 <>&"\'' }
      ];
      
      const wrapper = mount(CardList, { props: { items: specialCharItems } });
      
      expect(wrapper.find('.card-list__title-text').text()).toBe('특수문자 !@#$%^&*()_+');
      expect(wrapper.find('.card-list__data-text').text()).toBe('데이터 <>&"\'');
    });
  });
});