<template>
  <div class="example-container">
    <h1>GeneralList 사용 예제</h1>
    
    <!-- 알림 메시지 -->
    <div v-if="message" class="message" :class="messageType">
      {{ message }}
    </div>

    <!-- GeneralList 컴포넌트 -->
    <GeneralList
      :label-text="'상품 정보'"
      :title-text="selectedProduct?.name || '상품을 선택하세요'"
      :sub-text-content="selectedProduct?.description || '상품을 클릭하면 상세정보가 표시됩니다'"
      :list-items="productList"
      :button-text="'주문하기'"
      :show-close-button="true"
      @list-item-click="handleProductSelect"
      @button-click="handleOrderClick"
      @close-click="handleCloseClick"
    />

    <!-- 선택된 상품 정보 -->
    <div v-if="selectedProduct" class="selected-info">
      <h3>선택된 상품</h3>
      <p><strong>상품명:</strong> {{ selectedProduct.name }}</p>
      <p><strong>가격:</strong> {{ selectedProduct.price }}</p>
      <p><strong>설명:</strong> {{ selectedProduct.description }}</p>
    </div>

    <!-- 주문 내역 -->
    <div v-if="orderHistory.length > 0" class="order-history">
      <h3>주문 내역</h3>
      <ul>
        <li v-for="(order, index) in orderHistory" :key="index">
          {{ order.timestamp }} - {{ order.product }} ({{ order.price }})
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import GeneralList from './GeneralList.vue'

// 상품 데이터 타입
interface Product {
  id: number
  name: string
  price: string
  description: string
}

// 주문 내역 타입
interface Order {
  timestamp: string
  product: string
  price: string
}

// 상품 목록 데이터
const products = ref<Product[]>([
  {
    id: 1,
    name: '노트북',
    price: '1,200,000원',
    description: '고성능 게이밍 노트북'
  },
  {
    id: 2,
    name: '마우스',
    price: '50,000원',
    description: '무선 게이밍 마우스'
  },
  {
    id: 3,
    name: '키보드',
    price: '80,000원',
    description: '기계식 게이밍 키보드'
  }
])

// 선택된 상품
const selectedProduct = ref<Product | null>(null)

// 메시지 상태
const message = ref('')
const messageType = ref<'success' | 'info' | 'warning'>('info')

// 주문 내역
const orderHistory = ref<Order[]>([])

// GeneralList에 전달할 아이템 목록 계산
const productList = computed(() => 
  products.value.map(product => ({
    title: product.name,
    data: product.price
  }))
)

// 상품 선택 이벤트 핸들러
const handleProductSelect = (item: any, index: number, event: MouseEvent | KeyboardEvent) => {
  const product = products.value[index]
  selectedProduct.value = product
  
  // 이벤트 타입에 따른 메시지 표시
  const eventType = event instanceof MouseEvent ? '마우스 클릭' : '키보드 선택'
  message.value = `${eventType}으로 "${product.name}" 상품을 선택했습니다.`
  messageType.value = 'info'
  
  // 3초 후 메시지 제거
  setTimeout(() => {
    message.value = ''
  }, 3000)
  
  console.log('상품 선택:', {
    product,
    index,
    eventType: event.constructor.name,
    timestamp: new Date().toLocaleString()
  })
}

// 주문 버튼 클릭 이벤트 핸들러
const handleOrderClick = (event: MouseEvent) => {
  if (!selectedProduct.value) {
    message.value = '먼저 상품을 선택해주세요!'
    messageType.value = 'warning'
    return
  }

  // 주문 내역에 추가
  orderHistory.value.unshift({
    timestamp: new Date().toLocaleString(),
    product: selectedProduct.value.name,
    price: selectedProduct.value.price
  })

  message.value = `"${selectedProduct.value.name}" 주문이 완료되었습니다!`
  messageType.value = 'success'

  // 선택 초기화
  selectedProduct.value = null

  console.log('주문 완료:', {
    event: event.constructor.name,
    timestamp: new Date().toLocaleString(),
    totalOrders: orderHistory.value.length
  })

  // 5초 후 메시지 제거
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

// 닫기 버튼 클릭 이벤트 핸들러
const handleCloseClick = (event: MouseEvent) => {
  selectedProduct.value = null
  message.value = '상품 선택이 취소되었습니다.'
  messageType.value = 'info'

  console.log('닫기 버튼 클릭:', {
    event: event.constructor.name,
    timestamp: new Date().toLocaleString()
  })

  // 2초 후 메시지 제거
  setTimeout(() => {
    message.value = ''
  }, 2000)
}
</script>

<style scoped>
.example-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Pretendard', sans-serif;
}

h1 {
  color: #1e2124;
  margin-bottom: 20px;
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid;
  transition: opacity 0.3s;
}

.message.success {
  background-color: #f0f9ff;
  border-color: #22c55e;
  color: #166534;
}

.message.info {
  background-color: #f0f9ff;
  border-color: #3b82f6;
  color: #1e3a8a;
}

.message.warning {
  background-color: #fffbeb;
  border-color: #f59e0b;
  color: #92400e;
}

.selected-info {
  margin-top: 24px;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.selected-info h3 {
  margin: 0 0 12px 0;
  color: #1e293b;
}

.selected-info p {
  margin: 4px 0;
  color: #475569;
}

.order-history {
  margin-top: 24px;
  padding: 16px;
  background-color: #f0fdf4;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
}

.order-history h3 {
  margin: 0 0 12px 0;
  color: #166534;
}

.order-history ul {
  margin: 0;
  padding-left: 20px;
}

.order-history li {
  margin: 4px 0;
  color: #15803d;
}
</style>