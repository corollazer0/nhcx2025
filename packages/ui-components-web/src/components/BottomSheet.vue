<template>
  <div 
    class="bottom-sheet" 
    :class="bottomSheetClasses"
    data-testid="bottom-sheet"
    v-if="isVisible"
  >
    <!-- Overlay -->
    <div 
      class="bottom-sheet__overlay" 
      @click="handleOverlayClick"
    />
    
    <!-- Content -->
    <div class="bottom-sheet__content">
      <!-- Header -->
      <div class="bottom-sheet__header">
        <h2 class="bottom-sheet__title">{{ title }}</h2>
        <button 
          v-if="showCloseButton"
          class="bottom-sheet__close"
          type="button"
          @click="handleClose"
          aria-label="닫기"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M18 6L6 18M6 6l12 12" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <!-- Main Content -->
      <div class="bottom-sheet__main">
        <!-- Basic Type -->
        <div v-if="type === 'basic'" class="bottom-sheet__basic">
          <div class="bottom-sheet__text">
            {{ content || '텍스트를 입력해 주세요.' }}
          </div>
        </div>

        <!-- Picker Type -->
        <div v-else-if="type === 'picker'" class="bottom-sheet__picker">
          <div class="bottom-sheet__picker-container" :class="`bottom-sheet__picker--${pickerType}`">
            <div 
              v-for="(column, index) in pickerColumns" 
              :key="index"
              class="bottom-sheet__picker-column"
            >
              <div 
                v-for="(item, itemIndex) in column.items" 
                :key="itemIndex"
                class="bottom-sheet__picker-item"
                :class="{
                  'bottom-sheet__picker-item--selected': item.selected,
                  'bottom-sheet__picker-item--pressed': item.pressed
                }"
                @click="handlePickerItemClick(index, itemIndex, item)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Keypad Type -->
        <div v-else-if="type === 'keypad'" class="bottom-sheet__keypad">
          <div class="bottom-sheet__price-display">
            <div class="bottom-sheet__price-amount">{{ displayPrice }}</div>
            <div class="bottom-sheet__price-description">{{ priceDescription }}</div>
          </div>
          
          <div class="bottom-sheet__quick-buttons">
            <button 
              v-for="quickAmount in quickAmounts"
              :key="quickAmount"
              class="bottom-sheet__quick-button"
              @click="handleQuickAmount(quickAmount)"
            >
              +{{ formatAmount(quickAmount) }}
            </button>
          </div>
          
          <div class="bottom-sheet__keypad-grid">
            <button 
              v-for="key in keypadKeys"
              :key="key.value"
              class="bottom-sheet__keypad-key"
              :class="{ 'bottom-sheet__keypad-key--special': key.special }"
              @click="handleKeypadInput(key)"
            >
              <span v-if="!key.icon">{{ key.label }}</span>
              <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Account Type -->
        <div v-else-if="type === 'account'" class="bottom-sheet__account">
          <div v-if="showTabs" class="bottom-sheet__tabs">
            <div class="bottom-sheet__tab-bar">
              <button 
                v-for="tab in tabs"
                :key="tab.value"
                class="bottom-sheet__tab"
                :class="{ 'bottom-sheet__tab--active': tab.active }"
                @click="handleTabClick(tab)"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>
          
          <div class="bottom-sheet__account-lists">
            <div 
              v-for="group in accountGroups" 
              :key="group.title"
              class="bottom-sheet__account-group"
            >
              <h3 v-if="group.title" class="bottom-sheet__account-group-title">
                {{ group.title }}
              </h3>
              <div class="bottom-sheet__account-list">
                <div 
                  v-for="account in group.accounts"
                  :key="account.id"
                  class="bottom-sheet__account-item"
                  @click="handleAccountClick(account)"
                >
                  <div class="bottom-sheet__account-logo">
                    <img :src="account.logoUrl" :alt="account.bankName" />
                  </div>
                  <div class="bottom-sheet__account-info">
                    <div class="bottom-sheet__account-main">
                      <span class="bottom-sheet__account-name">{{ account.accountName }}</span>
                      <button 
                        v-if="showFavorite"
                        class="bottom-sheet__account-favorite"
                        :class="{ 'bottom-sheet__account-favorite--active': account.isFavorite }"
                        @click.stop="handleFavoriteClick(account)"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </button>
                      <button 
                        v-if="showCheckbox"
                        class="bottom-sheet__account-checkbox"
                        :class="{ 'bottom-sheet__account-checkbox--checked': account.isSelected }"
                        @click.stop="handleAccountSelect(account)"
                      >
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path 
                            d="M1 4l3 3 7-6" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div v-if="account.accountNumber" class="bottom-sheet__account-number">
                      {{ account.accountNumber }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div v-if="showCta" class="bottom-sheet__cta">
        <div class="bottom-sheet__cta-gradient">
          <button 
            class="bottom-sheet__cta-button"
            :disabled="ctaDisabled"
            @click="handleCtaClick"
          >
            {{ ctaText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';

interface PickerItem {
  label: string;
  value: any;
  selected?: boolean;
  pressed?: boolean;
}

interface PickerColumn {
  items: PickerItem[];
}

interface KeypadKey {
  label: string;
  value: string | number;
  special?: boolean;
  icon?: boolean;
}

interface Tab {
  label: string;
  value: string;
  active?: boolean;
}

interface Account {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber?: string;
  logoUrl: string;
  isFavorite?: boolean;
  isSelected?: boolean;
}

interface AccountGroup {
  title?: string;
  accounts: Account[];
}

interface BottomSheetProps {
  // 공통 props
  isVisible?: boolean;
  title?: string;
  showCloseButton?: boolean;
  showCta?: boolean;
  ctaText?: string;
  ctaDisabled?: boolean;
  closeOnOverlay?: boolean;
  
  // 타입별 props
  type?: 'basic' | 'picker' | 'keypad' | 'account';
  
  // Basic type
  content?: string;
  
  // Picker type  
  pickerType?: 'hour-minute' | 'day' | 'year-month-day';
  pickerColumns?: PickerColumn[];
  
  // Keypad type
  initialAmount?: number;
  priceDescription?: string;
  quickAmounts?: number[];
  
  // Account type
  showTabs?: boolean;
  tabs?: Tab[];
  accountGroups?: AccountGroup[];
  showFavorite?: boolean;
  showCheckbox?: boolean;
}

const props = withDefaults(defineProps<BottomSheetProps>(), {
  isVisible: false,
  title: '',
  showCloseButton: true,
  showCta: true,
  ctaText: '확인',
  ctaDisabled: false,
  closeOnOverlay: true,
  type: 'basic',
  content: '텍스트를 입력해 주세요.',
  pickerType: 'hour-minute',
  pickerColumns: () => [],
  initialAmount: 0,
  priceDescription: '100만원이상 10만원 단위로 입력',
  quickAmounts: () => [100000, 500000, 1000000, 10000000],
  showTabs: true,
  tabs: () => [
    { label: 'NH농협', value: 'nh', active: true },
    { label: '다른금융', value: 'other', active: false }
  ],
  accountGroups: () => [],
  showFavorite: true,
  showCheckbox: true
});

const emit = defineEmits<{
  close: [];
  'overlay-click': [];
  'cta-click': [];
  'picker-change': [columnIndex: number, itemIndex: number, item: PickerItem];
  'keypad-input': [key: KeypadKey];
  'amount-change': [amount: number];
  'quick-amount': [amount: number];
  'tab-change': [tab: Tab];
  'account-click': [account: Account];
  'account-select': [account: Account];
  'favorite-toggle': [account: Account];
}>();

// Computed properties
const bottomSheetClasses = computed(() => [
  `bottom-sheet--${props.type}`,
  {
    'bottom-sheet--visible': props.isVisible
  }
]);

// Keypad state
const currentAmount = ref(props.initialAmount);

const displayPrice = computed(() => {
  return `${currentAmount.value.toLocaleString('ko-KR')}원`;
});

const keypadKeys = computed((): KeypadKey[] => [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '00', value: '00' },
  { label: '0', value: 0 },
  { label: '', value: 'delete', special: true, icon: true }
]);

// Event handlers
const handleClose = () => {
  emit('close');
};

const handleOverlayClick = () => {
  emit('overlay-click');
  if (props.closeOnOverlay) {
    handleClose();
  }
};

const handleCtaClick = () => {
  emit('cta-click');
};

const handlePickerItemClick = (columnIndex: number, itemIndex: number, item: PickerItem) => {
  emit('picker-change', columnIndex, itemIndex, item);
};

const handleKeypadInput = (key: KeypadKey) => {
  if (key.value === 'delete') {
    currentAmount.value = Math.floor(currentAmount.value / 10);
  } else if (key.value === '00') {
    currentAmount.value = currentAmount.value * 100;
  } else if (typeof key.value === 'number') {
    currentAmount.value = currentAmount.value * 10 + key.value;
  }
  
  emit('keypad-input', key);
  emit('amount-change', currentAmount.value);
};

const handleQuickAmount = (amount: number) => {
  currentAmount.value += amount;
  emit('quick-amount', amount);
  emit('amount-change', currentAmount.value);
};

const formatAmount = (amount: number): string => {
  if (amount >= 10000000) {
    return `${amount / 10000000}억원`;
  } else if (amount >= 10000) {
    return `${amount / 10000}만원`;
  } else {
    return `${amount.toLocaleString()}원`;
  }
};

const handleTabClick = (tab: Tab) => {
  emit('tab-change', tab);
};

const handleAccountClick = (account: Account) => {
  emit('account-click', account);
};

const handleAccountSelect = (account: Account) => {
  emit('account-select', account);
};

const handleFavoriteClick = (account: Account) => {
  emit('favorite-toggle', account);
};

// Watchers
watch(() => props.initialAmount, (newAmount) => {
  currentAmount.value = newAmount;
});
</script>

<style scoped>
/* Design tokens from Figma */
.bottom-sheet {
  --color-bg-overlay: rgba(0, 0, 0, 0.5);
  --color-bg-sheet: #ffffff;
  --color-text-title: #121212;
  --color-text-content: #505050;
  --color-text-description: #929292;
  --color-text-button-primary: #ffffff;
  --color-bg-button-primary: #19973c;
  --color-bg-button-tertiary: #ffffff;
  --color-border-button-tertiary: #d3d3d3;
  --color-text-button-tertiary: #121212;
  --color-bg-picker-pressed: #f6f6f6;
  --color-text-picker-selected: #19973c;
  --color-bg-tab-active: #ffffff;
  --color-bg-tab-default: #f3f5f8;
  --color-text-tab-active: #121212;
  --color-text-tab-default: #505050;
  --color-text-account-name: #121212;
  --color-text-account-number: #767676;
  --color-icon-favorite: #ffd700;
  --color-icon-check: #19973c;
  --border-radius-sheet: 24px;
  --border-radius-button: 12px;
  --border-radius-tab: 10px;
  --font-family-pretendard: 'Pretendard', sans-serif;
  --gradient-cta: linear-gradient(to top, #ffffff 89.796%, transparent 99.49%);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  font-family: var(--font-family-pretendard);
}

.bottom-sheet--visible {
  opacity: 1;
  visibility: visible;
}

.bottom-sheet__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-bg-overlay);
  cursor: pointer;
}

.bottom-sheet__content {
  position: relative;
  background-color: var(--color-bg-sheet);
  border-radius: var(--border-radius-sheet) var(--border-radius-sheet) 0 0;
  width: 100%;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.bottom-sheet--visible .bottom-sheet__content {
  transform: translateY(0);
}

/* Header */
.bottom-sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 24px 10px;
  background-color: var(--color-bg-sheet);
}

.bottom-sheet__title {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.4px;
  color: var(--color-text-title);
  margin: 0;
  flex: 1;
}

.bottom-sheet__close {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111111;
  padding: 0;
}

.bottom-sheet__close:hover {
  opacity: 0.7;
}

/* Main content */
.bottom-sheet__main {
  flex: 1;
  overflow-y: auto;
  background-color: var(--color-bg-sheet);
  padding: 12px 24px 6px;
}

/* Basic type */
.bottom-sheet__basic {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 32px;
}

.bottom-sheet__text {
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.3px;
  color: var(--color-text-content);
  text-align: center;
}

/* Picker type */
.bottom-sheet__picker {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 6px;
}

.bottom-sheet__picker-container {
  display: grid;
  height: 280px;
  gap: 0;
}

.bottom-sheet__picker--hour-minute,
.bottom-sheet__picker--day {
  grid-template-columns: repeat(2, 1fr);
}

.bottom-sheet__picker--year-month-day {
  grid-template-columns: repeat(3, 1fr);
}

.bottom-sheet__picker-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bottom-sheet__picker-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--color-text-title);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  max-width: 152px;
  text-align: center;
}

.bottom-sheet__picker-item--pressed {
  background-color: var(--color-bg-picker-pressed);
}

.bottom-sheet__picker-item--selected {
  color: var(--color-text-picker-selected);
  font-weight: 600;
}

.bottom-sheet__picker-item:hover {
  background-color: var(--color-bg-picker-pressed);
}

/* Keypad type */
.bottom-sheet__keypad {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 6px;
}

.bottom-sheet__price-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
}

.bottom-sheet__price-amount {
  font-size: 28px;
  font-weight: 600;
  line-height: normal;
  color: var(--color-text-description);
  text-align: center;
}

.bottom-sheet__price-description {
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: var(--color-text-description);
  text-align: center;
}

.bottom-sheet__quick-buttons {
  display: flex;
  gap: 4px;
}

.bottom-sheet__quick-button {
  flex: 1;
  height: 36px;
  padding: 7px 4px;
  border: 1px solid var(--color-border-button-tertiary);
  border-radius: 8px;
  background-color: var(--color-bg-button-tertiary);
  color: var(--color-text-button-tertiary);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.26px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bottom-sheet__quick-button:hover {
  background-color: #f8f8f8;
}

.bottom-sheet__keypad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  width: 312px;
  margin: 0 auto;
}

.bottom-sheet__keypad-key {
  height: 54px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  color: var(--color-text-title);
  transition: background-color 0.2s ease;
}

.bottom-sheet__keypad-key:hover {
  background-color: #f0f0f0;
}

.bottom-sheet__keypad-key:active {
  background-color: #e0e0e0;
}

/* Account type */
.bottom-sheet__account {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 32px;
}

.bottom-sheet__tabs {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bottom-sheet__tab-bar {
  display: flex;
  background-color: var(--color-bg-tab-default);
  padding: 3px;
  border-radius: var(--border-radius-button);
}

.bottom-sheet__tab {
  flex: 1;
  padding: 11px 12px;
  border: none;
  border-radius: var(--border-radius-tab);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-tab-default);
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bottom-sheet__tab--active {
  background-color: var(--color-bg-tab-active);
  color: var(--color-text-tab-active);
  font-weight: 500;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
}

.bottom-sheet__account-lists {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.bottom-sheet__account-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bottom-sheet__account-group-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-title);
  margin: 0;
}

.bottom-sheet__account-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.bottom-sheet__account-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.bottom-sheet__account-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.bottom-sheet__account-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bottom-sheet__account-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 40px;
  justify-content: center;
}

.bottom-sheet__account-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bottom-sheet__account-name {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.32px;
  color: var(--color-text-account-name);
  flex: 1;
}

.bottom-sheet__account-favorite {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d0d0d0;
  padding: 0;
  transition: color 0.2s ease;
}

.bottom-sheet__account-favorite--active {
  color: var(--color-icon-favorite);
}

.bottom-sheet__account-checkbox {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #707070;
  padding: 0;
  transition: color 0.2s ease;
}

.bottom-sheet__account-checkbox--checked {
  color: var(--color-icon-check);
}

.bottom-sheet__account-number {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: var(--color-text-account-number);
}

/* CTA */
.bottom-sheet__cta {
  background-color: var(--color-bg-sheet);
}

.bottom-sheet__cta-gradient {
  background: var(--gradient-cta);
  padding: 10px 24px 32px;
}

.bottom-sheet__cta-button {
  width: 100%;
  height: 56px;
  padding: 15px 16px;
  border: none;
  border-radius: var(--border-radius-button);
  background-color: var(--color-bg-button-primary);
  color: var(--color-text-button-primary);
  font-size: 18px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: -0.36px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.bottom-sheet__cta-button:hover:not(:disabled) {
  background-color: #0d5722;
}

.bottom-sheet__cta-button:disabled {
  background-color: #f0f0f0;
  color: #929292;
  cursor: not-allowed;
}
</style>