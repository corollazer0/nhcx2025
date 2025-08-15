<template>
  <div 
    class="label-component" 
    data-testid="label"
    :data-name="`Color=${color}`"
    :data-node-id="getNodeId(color)"
    role="label"
    :aria-label="ariaLabel || `${color} 색상 라벨: ${displayText}`"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
    tabindex="0"
  >
    <div class="label-border" aria-hidden="true" />
    <p class="label-text">{{ displayText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface LabelProps {
  color?: "blue" | "gray" | "green" | "lightblue" | "navy" | "orange" | "red" | "skyblue" | "yellow";
  text?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<LabelProps>(), {
  color: "gray",
  text: "라벨",
  ariaLabel: "",
});

const emit = defineEmits<{
  click: [event: MouseEvent | KeyboardEvent, text: string];
}>();

// Text processing with null/undefined handling
const displayText = computed(() => {
  // Handle null, undefined, or empty string
  if (props.text === null || props.text === undefined || props.text === '') {
    return '라벨';
  }
  
  // Convert to string if it's not already (safety check)
  const textValue = String(props.text).trim();
  
  // Return default if text is only whitespace
  return textValue || '라벨';
});

// Figma node ID mapping based on the generated code
const getNodeId = (color: string): string => {
  const nodeIdMap: Record<string, string> = {
    gray: "3567:55084",
    green: "3567:55086", 
    blue: "3567:55088",
    red: "3567:55090",
    orange: "3567:55092",
    yellow: "3567:55094",
    lightblue: "3567:55096",
    skyblue: "3567:55098",
    navy: "3567:55100",
  };
  return nodeIdMap[color] || nodeIdMap.gray;
};

// Event handlers
const handleClick = (event: MouseEvent | KeyboardEvent) => {
  // Prevent default for keyboard events
  if (event instanceof KeyboardEvent) {
    event.preventDefault();
  }
  
  emit('click', event, displayText.value);
};
</script>

<style scoped>
/* Design tokens based on Figma variables */
.label-component {
  /* Base tokens from Figma variables */
  --color-text-label-green: #19973c;
  --color-border-label-green: #19973c;
  --color-text-label-gray: #767676;
  --color-border-label-gray: #707070;
  --color-text-label-navy: #015aac;
  --color-border-label-navy: #015aac;
  --color-text-label-blue: #2c6dd4;
  --color-border-label-blue: #2c6dd4;
  --color-text-label-red: #d10f0f;
  --color-border-label-red: #d10f0f;
  --color-text-label-orange: #d44b10;
  --color-border-label-orange: #d44b10;
  --color-text-label-yellow: #da6f11;
  --color-border-label-yellow: #da6f11;
  --color-text-label-lightblue: #12a396;
  --color-border-label-lightblue: #12a396;
  --color-text-label-skyblue: #2b9ac9;
  --color-border-label-skyblue: #2b9ac9;
  
  /* Layout tokens */
  --border-radius: 4px;
  --font-family: "Pretendard", sans-serif;
  --font-size: 10px;
  --font-weight: 400;
  --line-height: 15px;
  --letter-spacing: -0.2px;
  --padding-horizontal: 8px;
  --padding-top: 3px;
  --padding-bottom: 2px;
  
  /* Component styles */
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-top) var(--padding-horizontal) var(--padding-bottom);
  position: relative;
  border-radius: var(--border-radius);
  height: auto;
  width: auto;
  min-height: 19px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.label-component:hover {
  opacity: 0.8;
}

.label-component:focus-within {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.label-border {
  position: absolute;
  inset: 0;
  border: 1px solid;
  border-radius: var(--border-radius);
  pointer-events: none;
}

.label-text {
  font-family: var(--font-family);
  font-weight: var(--font-weight);
  font-style: normal;
  font-size: var(--font-size);
  line-height: var(--line-height);
  letter-spacing: var(--letter-spacing);
  text-align: center;
  margin: 0;
  flex-basis: 0;
  flex-grow: 1;
  min-width: 18px;
  min-height: 1px;
  position: relative;
  flex-shrink: 0;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Color variants */
.label-component[data-name="Color=green"] {
  color: var(--color-text-label-green);
}

.label-component[data-name="Color=green"] .label-border {
  border-color: var(--color-border-label-green);
}

.label-component[data-name="Color=blue"] {
  color: var(--color-text-label-blue);
}

.label-component[data-name="Color=blue"] .label-border {
  border-color: var(--color-border-label-blue);
}

.label-component[data-name="Color=red"] {
  color: var(--color-text-label-red);
}

.label-component[data-name="Color=red"] .label-border {
  border-color: var(--color-border-label-red);
}

.label-component[data-name="Color=orange"] {
  color: var(--color-text-label-orange);
}

.label-component[data-name="Color=orange"] .label-border {
  border-color: var(--color-border-label-orange);
}

.label-component[data-name="Color=yellow"] {
  color: var(--color-text-label-yellow);
}

.label-component[data-name="Color=yellow"] .label-border {
  border-color: var(--color-border-label-yellow);
}

.label-component[data-name="Color=lightblue"] {
  color: var(--color-text-label-lightblue);
}

.label-component[data-name="Color=lightblue"] .label-border {
  border-color: var(--color-border-label-lightblue);
}

.label-component[data-name="Color=skyblue"] {
  color: var(--color-text-label-skyblue);
}

.label-component[data-name="Color=skyblue"] .label-border {
  border-color: var(--color-border-label-skyblue);
}

.label-component[data-name="Color=navy"] {
  color: var(--color-text-label-navy);
}

.label-component[data-name="Color=navy"] .label-border {
  border-color: var(--color-border-label-navy);
}

.label-component[data-name="Color=gray"] {
  color: var(--color-text-label-gray);
}

.label-component[data-name="Color=gray"] .label-border {
  border-color: var(--color-border-label-gray);
}

/* Accessibility improvements */
@media (prefers-contrast: high) {
  .label-border {
    border-width: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .label-component {
    transition: none;
  }
}

/* Focus styles for keyboard navigation */
.label-component:focus {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.label-component:focus:not(:focus-visible) {
  outline: none;
}

.label-component:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>