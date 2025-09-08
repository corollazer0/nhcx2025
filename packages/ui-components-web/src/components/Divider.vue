<template>
  <div 
    class="divider" 
    :class="dividerClasses"
    :role="role"
    :aria-orientation="orientation"
    data-testid="divider"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface DividerProps {
  variant?: 'content' | 'page' | 'list1' | 'list2';
  orientation?: 'horizontal' | 'vertical';
}

const props = withDefaults(defineProps<DividerProps>(), {
  variant: 'page',
  orientation: 'horizontal'
});

const dividerClasses = computed(() => [
  `divider--${props.variant}`,
  `divider--${props.orientation}`,
]);

const role = computed(() => 'separator');
</script>

<style scoped>
/* Design tokens from Figma - exact color variables */
.divider {
  --color-border-content: #f6f6f6; /* color/border/line-4 */
  --color-border-page: #f6f6f6;    /* color/border/line-4 */
  --color-border-list1: #e1e1e1;   /* color/border/line-2 */
  --color-border-list2: #f0f0f0;   /* color/border/line-3 */
  
  position: relative;
  border: none;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}

/* Horizontal orientation (default) */
.divider--horizontal {
  width: 100%;
  height: 0;
}

/* Vertical orientation */
.divider--vertical {
  width: 0;
  height: 100%;
  display: inline-block;
}

/* Variant styles - Content (8px) */
.divider--content.divider--horizontal {
  border-top: 8px solid var(--color-border-content);
}

.divider--content.divider--vertical {
  border-left: 8px solid var(--color-border-content);
}

/* Variant styles - Page (1px) */
.divider--page.divider--horizontal {
  border-top: 1px solid var(--color-border-page);
}

.divider--page.divider--vertical {
  border-left: 1px solid var(--color-border-page);
}

/* Variant styles - List1 (1px) */
.divider--list1.divider--horizontal {
  border-top: 1px solid var(--color-border-list1);
}

.divider--list1.divider--vertical {
  border-left: 1px solid var(--color-border-list1);
}

/* Variant styles - List2 (1px) */
.divider--list2.divider--horizontal {
  border-top: 1px solid var(--color-border-list2);
}

.divider--list2.divider--vertical {
  border-left: 1px solid var(--color-border-list2);
}

/* Accessibility improvements */
.divider[role="separator"] {
  border-style: solid;
}

/* Focus handling for accessibility (if needed) */
.divider:focus {
  outline: 2px solid #121212;
  outline-offset: 2px;
}
</style>