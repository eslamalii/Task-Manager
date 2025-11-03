/**
 * Centralized constants for colors, strings, and configuration
 */

export const TASK_COLORS = {
  // Text colors
  textSecondary: '#8E8E93',

  // Action colors
  danger: '#EF4444',
} as const

export const TASK_STRINGS = {
  // Empty state
  emptyStateTitle: 'No tasks yet',
  emptyStateMessage: 'Add your first task to get started!',

  // Input placeholders
  inputPlaceholder: 'What needs to be done?',

  // Confirmation messages
  deleteConfirmTitle: 'Delete Task',
  deleteConfirmMessage: 'Are you sure you want to delete this task?',
  deleteConfirmYes: 'Delete',
  deleteConfirmNo: 'Cancel',
} as const

export const TASK_CONFIG = {
  // Input constraints
  maxDescriptionLength: 200,
  minDescriptionLength: 1,

  // Animation durations (ms)
  animationDuration: 300,

  // List settings
  initialNumToRender: 10,
  maxToRenderPerBatch: 5,
  spacing: {
    lg: 24,
  },
} as const
