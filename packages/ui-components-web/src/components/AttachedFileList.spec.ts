// src/components/AttachedFileList.spec.ts
import { render, screen, cleanup } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import AttachedFileList from './AttachedFileList.vue';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('AttachedFileList.vue', () => {
  afterEach(() => {
    cleanup();
  });

  const factory = (props = {}) =>
    render(AttachedFileList, {
      props,
    });

  describe('기본 렌더링 테스트', () => {
    it('기본 props로 1line 타입이 렌더링됨', () => {
      factory();

      const container = screen.getByTestId('attached-file-list');
      expect(container).toBeInTheDocument();

      const fileItem = screen.getByText('파일명');
      expect(fileItem).toBeInTheDocument();
    });

    it('커스텀 파일명이 올바르게 표시됨', () => {
      factory({
        fileItems: [{ fileName: 'document.pdf' }]
      });

      expect(screen.getByText('document.pdf')).toBeInTheDocument();
    });

    it('빈 파일 배열일 때 분리선만 표시됨', () => {
      factory({ fileItems: [] });

      const container = screen.getByTestId('attached-file-list');
      expect(container).toBeInTheDocument();
      
      // 파일 아이템은 없어야 함
      expect(screen.queryByText('파일명')).not.toBeInTheDocument();
      
      // 파일 아이템 역할을 하는 버튼이 없어야 함
      const fileButtons = screen.queryAllByRole('button').filter(btn => 
        !btn.getAttribute('aria-label')?.includes('파일 삭제')
      );
      expect(fileButtons).toHaveLength(0);
    });
  });

  describe('type 변형 테스트', () => {
    it('1line 타입: 파일 1개가 표시됨', () => {
      factory({
        type: '1line',
        fileItems: [
          { fileName: 'file1.pdf' },
          { fileName: 'file2.jpg' } // 이것은 표시되지 않아야 함
        ]
      });

      expect(screen.getByText('file1.pdf')).toBeInTheDocument();
      expect(screen.queryByText('file2.jpg')).not.toBeInTheDocument();
    });

    it('2line 타입: 파일 2개가 표시됨', () => {
      factory({
        type: '2line',
        fileItems: [
          { fileName: 'file1.pdf' },
          { fileName: 'file2.jpg' },
          { fileName: 'file3.png' } // 이것은 표시되지 않아야 함
        ]
      });

      expect(screen.getByText('file1.pdf')).toBeInTheDocument();
      expect(screen.getByText('file2.jpg')).toBeInTheDocument();
      expect(screen.queryByText('file3.png')).not.toBeInTheDocument();
    });

    it('3line 타입: 파일 3개가 표시됨', () => {
      factory({
        type: '3line',
        fileItems: [
          { fileName: 'file1.pdf' },
          { fileName: 'file2.jpg' },
          { fileName: 'file3.png' },
          { fileName: 'file4.doc' } // 이것은 표시되지 않아야 함
        ]
      });

      expect(screen.getByText('file1.pdf')).toBeInTheDocument();
      expect(screen.getByText('file2.jpg')).toBeInTheDocument();
      expect(screen.getByText('file3.png')).toBeInTheDocument();
      expect(screen.queryByText('file4.doc')).not.toBeInTheDocument();
    });

    it('4line 타입: 파일 4개가 표시됨', () => {
      factory({
        type: '4line',
        fileItems: [
          { fileName: 'file1.pdf' },
          { fileName: 'file2.jpg' },
          { fileName: 'file3.png' },
          { fileName: 'file4.doc' },
          { fileName: 'file5.txt' } // 이것은 표시되지 않아야 함
        ]
      });

      expect(screen.getByText('file1.pdf')).toBeInTheDocument();
      expect(screen.getByText('file2.jpg')).toBeInTheDocument();
      expect(screen.getByText('file3.png')).toBeInTheDocument();
      expect(screen.getByText('file4.doc')).toBeInTheDocument();
      expect(screen.queryByText('file5.txt')).not.toBeInTheDocument();
    });

    it('5line 타입: 파일 5개가 표시됨', () => {
      factory({
        type: '5line',
        fileItems: [
          { fileName: 'file1.pdf' },
          { fileName: 'file2.jpg' },
          { fileName: 'file3.png' },
          { fileName: 'file4.doc' },
          { fileName: 'file5.txt' },
          { fileName: 'file6.xlsx' } // 이것은 표시되지 않아야 함
        ]
      });

      expect(screen.getByText('file1.pdf')).toBeInTheDocument();
      expect(screen.getByText('file2.jpg')).toBeInTheDocument();
      expect(screen.getByText('file3.png')).toBeInTheDocument();
      expect(screen.getByText('file4.doc')).toBeInTheDocument();
      expect(screen.getByText('file5.txt')).toBeInTheDocument();
      expect(screen.queryByText('file6.xlsx')).not.toBeInTheDocument();
    });
  });

  describe('이벤트 처리 테스트', () => {
    it('파일 아이템 클릭 시 file-item-click 이벤트가 발생함', async () => {
      console.log('🧪 Test: 파일 아이템 클릭 이벤트 테스트 시작');
      
      const user = userEvent.setup();
      const { emitted } = factory({
        fileItems: [{ fileName: 'test.pdf', id: 1 }]
      });

      console.log('🔍 컴포넌트 렌더링 후 DOM 구조:');
      screen.debug();

      // 파일명 텍스트가 렌더링되었는지 먼저 확인
      console.log('⏳ test.pdf 텍스트가 렌더링될 때까지 대기 중...');
      await expect(screen.findByText('test.pdf')).resolves.toBeInTheDocument();
      console.log('✅ test.pdf 텍스트 찾음');

      // aria-label로 찾기 대신 텍스트가 포함된 버튼을 찾기
      const fileItem = screen.getByText('test.pdf').closest('[role="button"]');
      console.log('📍 찾은 파일 아이템:', {
        element: fileItem,
        tagName: fileItem?.tagName,
        role: fileItem?.getAttribute('role'),
        ariaLabel: fileItem?.getAttribute('aria-label')
      });
      expect(fileItem).toBeInTheDocument();

      console.log('👆 파일 아이템 클릭 시도 중...');
      await user.click(fileItem!);
      console.log('👆 클릭 완료');

      console.log('📡 Emitted events:', emitted());
      expect(emitted()['file-item-click']).toBeDefined();
      expect(emitted()['file-item-click']).toHaveLength(1);
      expect(emitted()['file-item-click'][0][0]).toEqual({ fileName: 'test.pdf', id: 1 });
      expect(emitted()['file-item-click'][0][1]).toBe(0); // index
      expect(emitted()['file-item-click'][0][2]).toBeInstanceOf(MouseEvent);
    });

    it('닫기 버튼 클릭 시 close-click 이벤트가 발생함', async () => {
      console.log('🧪 Test: 닫기 버튼 클릭 이벤트 테스트 시작');
      
      const user = userEvent.setup();
      const { emitted } = factory({
        fileItems: [{ fileName: 'test.pdf', id: 1 }]
      });

      // 파일명이 먼저 렌더링되었는지 확인
      console.log('⏳ test.pdf 텍스트가 렌더링될 때까지 대기 중...');
      await expect(screen.findByText('test.pdf')).resolves.toBeInTheDocument();
      console.log('✅ test.pdf 텍스트 찾음');

      console.log('🔍 닫기 버튼 찾는 중...');
      const closeButton = screen.getByLabelText('test.pdf 파일 삭제');
      console.log('📍 찾은 닫기 버튼:', {
        element: closeButton,
        tagName: closeButton?.tagName,
        ariaLabel: closeButton?.getAttribute('aria-label'),
        type: closeButton?.getAttribute('type')
      });

      console.log('👆 닫기 버튼 클릭 시도 중...');
      await user.click(closeButton);
      console.log('👆 클릭 완료');

      console.log('📡 Emitted events:', emitted());
      expect(emitted()['close-click']).toBeDefined();
      expect(emitted()['close-click']).toHaveLength(1);
      expect(emitted()['close-click'][0][0]).toEqual({ fileName: 'test.pdf', id: 1 });
      expect(emitted()['close-click'][0][1]).toBe(0); // index
      expect(emitted()['close-click'][0][2]).toBeInstanceOf(MouseEvent);
    });

    it('닫기 버튼 클릭 시 파일 아이템 클릭 이벤트가 발생하지 않음 (이벤트 버블링 방지)', async () => {
      const user = userEvent.setup();
      const { emitted } = factory({
        fileItems: [{ fileName: 'test.pdf' }]
      });

      // 파일명이 먼저 렌더링되었는지 확인
      await expect(screen.findByText('test.pdf')).resolves.toBeInTheDocument();

      const closeButton = screen.getByLabelText('test.pdf 파일 삭제');
      await user.click(closeButton);

      expect(emitted()['close-click']).toBeDefined();
      expect(emitted()['file-item-click']).toBeUndefined();
    });
  });

  describe('키보드 접근성 테스트', () => {
    it('파일 아이템에 Enter 키 입력 시 file-item-click 이벤트가 발생함', async () => {
      console.log('🧪 Test: Enter 키 이벤트 테스트 시작');
      
      const user = userEvent.setup();
      const { emitted } = factory({
        fileItems: [{ fileName: 'test.pdf', id: 1 }]
      });

      // 파일명이 먼저 렌더링되었는지 확인
      console.log('⏳ test.pdf 텍스트가 렌더링될 때까지 대기 중...');
      await expect(screen.findByText('test.pdf')).resolves.toBeInTheDocument();
      console.log('✅ test.pdf 텍스트 찾음');

      const fileItem = screen.getByText('test.pdf').closest('[role="button"]') as HTMLElement;
      console.log('📍 찾은 파일 아이템:', {
        element: fileItem,
        tagName: fileItem?.tagName,
        tabIndex: fileItem?.getAttribute('tabindex')
      });
      expect(fileItem).toBeInTheDocument();
      
      console.log('🎯 포커스 설정 중...');
      fileItem.focus();
      console.log('⌨️ Enter 키 입력 중...');
      await user.keyboard('{Enter}');
      console.log('✅ Enter 키 입력 완료');

      console.log('📡 Emitted events:', emitted());
      expect(emitted()['file-item-click']).toBeDefined();
      expect(emitted()['file-item-click']).toHaveLength(1);
      expect(emitted()['file-item-click'][0][2]).toBeInstanceOf(KeyboardEvent);
    });

    it('파일 아이템에 Space 키 입력 시 file-item-click 이벤트가 발생함', async () => {
      const user = userEvent.setup();
      const { emitted } = factory({
        fileItems: [{ fileName: 'test.pdf', id: 1 }]
      });

      // 파일명이 먼저 렌더링되었는지 확인
      await expect(screen.findByText('test.pdf')).resolves.toBeInTheDocument();

      const fileItem = screen.getByText('test.pdf').closest('[role="button"]') as HTMLElement;
      expect(fileItem).toBeInTheDocument();
      
      fileItem.focus();
      await user.keyboard(' ');

      expect(emitted()['file-item-click']).toBeDefined();
      expect(emitted()['file-item-click']).toHaveLength(1);
      expect(emitted()['file-item-click'][0][2]).toBeInstanceOf(KeyboardEvent);
    });

    it('파일 아이템과 닫기 버튼이 올바른 tabindex를 가짐', async () => {
      factory({
        fileItems: [{ fileName: 'test.pdf' }]
      });

      // 파일명이 먼저 렌더링되었는지 확인
      await expect(screen.findByText('test.pdf')).resolves.toBeInTheDocument();

      const fileItem = screen.getByText('test.pdf').closest('[role="button"]');
      expect(fileItem).toHaveAttribute('tabindex', '0');

      const closeButton = screen.getByLabelText('test.pdf 파일 삭제');
      expect(closeButton).not.toHaveAttribute('tabindex'); // button은 기본적으로 focusable
    });
  });

  describe('접근성 테스트', () => {
    it('닫기 버튼에 적절한 aria-label이 설정됨', () => {
      factory({
        fileItems: [
          { fileName: 'document.pdf' },
          { fileName: 'image.jpg' }
        ],
        type: '2line'
      });

      expect(screen.getByLabelText('document.pdf 파일 삭제')).toBeInTheDocument();
      expect(screen.getByLabelText('image.jpg 파일 삭제')).toBeInTheDocument();
    });

    it('닫기 버튼 이미지에 aria-hidden이 설정됨', () => {
      factory({
        fileItems: [{ fileName: 'test.pdf' }]
      });

      const closeButton = screen.getByLabelText('test.pdf 파일 삭제');
      const img = closeButton.querySelector('img');
      
      expect(img).toHaveAttribute('aria-hidden', 'true');
      expect(img).toHaveAttribute('alt', '');
    });

    it('파일 아이템이 role="button"을 가짐', async () => {
      factory({
        fileItems: [{ fileName: 'test.pdf' }]
      });

      // 파일명이 먼저 렌더링되었는지 확인
      await expect(screen.findByText('test.pdf')).resolves.toBeInTheDocument();

      const fileItem = screen.getByText('test.pdf').closest('[role="button"]');
      expect(fileItem).toBeInTheDocument();
      expect(fileItem).toHaveAttribute('role', 'button');
    });
  });

  describe('데이터 테스트 케이스', () => {
    it('긴 파일명이 올바르게 표시됨', () => {
      const longFileName = 'very-long-file-name-that-might-overflow-the-container.pdf';
      factory({
        fileItems: [{ fileName: longFileName }]
      });

      expect(screen.getByText(longFileName)).toBeInTheDocument();
    });

    it('특수 문자가 포함된 파일명이 올바르게 표시됨', () => {
      factory({
        fileItems: [{ fileName: 'file-name_with@special#characters$.pdf' }]
      });

      expect(screen.getByText('file-name_with@special#characters$.pdf')).toBeInTheDocument();
    });

    it('다양한 확장자의 파일들이 올바르게 표시됨', () => {
      factory({
        type: '3line',
        fileItems: [
          { fileName: 'document.pdf' },
          { fileName: 'spreadsheet.xlsx' },
          { fileName: 'presentation.pptx' }
        ]
      });

      expect(screen.getByText('document.pdf')).toBeInTheDocument();
      expect(screen.getByText('spreadsheet.xlsx')).toBeInTheDocument();
      expect(screen.getByText('presentation.pptx')).toBeInTheDocument();
    });
  });

  describe('조건부 렌더링 테스트', () => {
    it('파일 개수가 type의 최대치보다 적을 때 올바르게 렌더링됨', () => {
      factory({
        type: '5line',
        fileItems: [
          { fileName: 'file1.pdf' },
          { fileName: 'file2.jpg' }
        ]
      });

      expect(screen.getByText('file1.pdf')).toBeInTheDocument();
      expect(screen.getByText('file2.jpg')).toBeInTheDocument();
      
      // 3, 4, 5번째 파일은 없어야 함
      expect(screen.queryByText('file3.pdf')).not.toBeInTheDocument();
    });

    it('파일이 하나도 없을 때 파일 아이템이 렌더링되지 않음', () => {
      factory({
        type: '3line',
        fileItems: []
      });

      const fileItems = screen.queryAllByRole('button');
      expect(fileItems).toHaveLength(0);
    });
  });

  describe('커스텀 closeIconSrc 테스트', () => {
    it('커스텀 닫기 아이콘 URL이 적용됨', () => {
      const customIconSrc = 'data:image/svg+xml;base64,custom-icon';
      factory({
        fileItems: [{ fileName: 'test.pdf' }],
        closeIconSrc: customIconSrc
      });

      const closeButton = screen.getByLabelText('test.pdf 파일 삭제');
      const img = closeButton.querySelector('img');
      
      expect(img).toHaveAttribute('src', customIconSrc);
    });
  });
});