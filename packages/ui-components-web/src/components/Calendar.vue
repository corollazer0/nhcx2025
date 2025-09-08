<template>
  <div 
    class="calendar" 
    :class="calendarClasses"
    data-testid="calendar"
  >
    <!-- Label -->
    <div 
      v-if="label"
      class="calendar__label"
      data-testid="calendar-label"
    >
      <div class="calendar__label-text">
        {{ labelText }}
      </div>
    </div>

    <!-- Calendar Container -->
    <div class="calendar__container">
      <div class="calendar__input-wrapper">
        <!-- Start Date -->
        <div class="calendar__date-section">
          <div class="calendar__input-group">
            <div class="calendar__input-text">
              {{ startDateValue || startPlaceholder }}
            </div>
            <button
              type="button"
              class="calendar__calendar-button"
              :disabled="isReadonlyOrDisabled"
              data-testid="calendar-start-calendar"
              @click="handleStartCalendarClick"
            >
              <div class="calendar__calendar-icon"></div>
            </button>
          </div>
        </div>

        <!-- Separator -->
        <div class="calendar__separator">~</div>

        <!-- End Date -->
        <div class="calendar__date-section">
          <div class="calendar__input-group">
            <div class="calendar__input-text">
              {{ endDateValue || endPlaceholder }}
            </div>
            <button
              type="button"
              class="calendar__calendar-button"
              :disabled="isReadonlyOrDisabled"
              data-testid="calendar-end-calendar"
              @click="handleEndCalendarClick"
            >
              <div class="calendar__calendar-icon"></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Border overlay -->
      <div 
        class="calendar__border" 
        aria-hidden="true"
      ></div>
    </div>

    <!-- Message -->
    <div
      v-if="message && messageText"
      class="calendar__message"
      :class="messageClasses"
      data-testid="calendar-message"
    >
      <div class="calendar__message-text">
        {{ messageText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface CalendarProps {
  state?: 'inactive' | 'filled' | 'error' | 'readonly' | 'disabled';
  labelText?: string;
  messageText?: string;
  startDate?: string;
  endDate?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  label?: boolean;
  message?: boolean;
}

const props = withDefaults(defineProps<CalendarProps>(), {
  state: 'inactive',
  labelText: '레이블',
  messageText: '안내 문구 입력',
  startDate: '',
  endDate: '',
  startPlaceholder: '선택',
  endPlaceholder: '선택',
  label: true,
  message: true
});

const emit = defineEmits<{
  startCalendarClick: [];
  endCalendarClick: [];
  'update:startDate': [value: string];
  'update:endDate': [value: string];
}>();

const isReadonlyOrDisabled = computed(() => 
  props.state === 'readonly' || props.state === 'disabled'
);

const startDateValue = computed({
  get: () => props.startDate,
  set: (value: string) => emit('update:startDate', value)
});

const endDateValue = computed({
  get: () => props.endDate,
  set: (value: string) => emit('update:endDate', value)
});

const calendarClasses = computed(() => [
  `calendar--${props.state}`,
  {
    'calendar--has-start': !!props.startDate,
    'calendar--has-end': !!props.endDate,
    'calendar--has-both': !!(props.startDate && props.endDate),
    'calendar--readonly': props.state === 'readonly',
    'calendar--disabled': props.state === 'disabled'
  }
]);

const messageClasses = computed(() => ({
  'calendar__message--error': props.state === 'error',
  'calendar__message--default': props.state !== 'error'
}));

const handleStartCalendarClick = () => {
  if (isReadonlyOrDisabled.value) return;
  emit('startCalendarClick');
};

const handleEndCalendarClick = () => {
  if (isReadonlyOrDisabled.value) return;
  emit('endCalendarClick');
};

defineExpose({
  clearDates: () => {
    startDateValue.value = '';
    endDateValue.value = '';
  }
});
</script>

<style scoped>
.calendar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* Label */
.calendar__label {
  height: 22px;
  position: relative;
}

.calendar__label-text {
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: #505050;
}

/* Calendar Container */
.calendar__container {
  position: relative;
  height: 54px;
  border-radius: 12px;
}

.calendar__input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 100%;
  padding: 14px 16px 14px 20px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.calendar__date-section {
  flex: 1;
  display: flex;
  min-width: 0;
}

.calendar__input-group {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-width: 0;
}

.calendar__input-text {
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  color: #121212;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.calendar__separator {
  font-family: 'Pretendard', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.36px;
  color: #121212;
  text-align: center;
  width: 12px;
  flex-shrink: 0;
}

.calendar__calendar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
}

.calendar__calendar-button:disabled {
  cursor: not-allowed;
}

.calendar__calendar-icon {
  width: 18px;
  height: 18px;
  background-color: #111111;
  mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat center;
  mask-size: contain;
}

/* Border */
.calendar__border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  pointer-events: none;
}

/* Message */
.calendar__message {
  display: flex;
  align-items: center;
  gap: 6px;
}

.calendar__message-text {
  flex: 1;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.26px;
  color: #767676;
}

/* State Variations */
.calendar--inactive .calendar__container {
  background-color: #ffffff;
}

.calendar--inactive .calendar__input-text {
  color: #929292;
}

.calendar--filled .calendar__container {
  background-color: #ffffff;
}

.calendar--filled .calendar__input-text {
  color: #121212;
}

.calendar--error .calendar__border {
  border-color: #e24949;
}

.calendar--error .calendar__container {
  background-color: #ffffff;
}

.calendar--error .calendar__message-text {
  color: #e24949;
}

.calendar--readonly .calendar__container,
.calendar--disabled .calendar__container {
  background-color: #f0f0f0;
}

.calendar--readonly .calendar__input-text,
.calendar--disabled .calendar__input-text {
  color: #121212;
}

.calendar--disabled .calendar__calendar-button {
  cursor: not-allowed;
}

/* Focus states for accessibility */
.calendar__calendar-button:focus-visible {
  outline: 2px solid #006ffd;
  outline-offset: 2px;
  border-radius: 50%;
}

/* Hover states (except readonly/disabled) */
.calendar:not(.calendar--readonly):not(.calendar--disabled) .calendar__calendar-button:hover {
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 50%;
}
</style>