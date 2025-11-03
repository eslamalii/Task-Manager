/**
 * Represents a single task in the task manager
 */
export interface Task {
  id: string
  description: string
  isCompleted: boolean
  createdAt: Date
}

/**
 * Theme colors type
 */
export interface ThemeColors {
  text: string
  textSecondary: string
  background: string
  cardBackground: string
  tint: string
  icon: string
  tabIconDefault: string
  tabIconSelected: string
  border: string
  success: string
  warning: string
  danger: string
  indigo: string
  indigoLight: string
  green: string
  greenLight: string
  amber: string
  amberLight: string
}

/**
 * Props for task-related components
 */
export interface TaskItemProps {
  task: Task
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
  colors?: ThemeColors
}

export interface TaskListProps {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
  colors?: ThemeColors
}

export interface AddTaskFormProps {
  onAddTask: (description: string) => void
  colors?: ThemeColors
}

export interface EmptyStateProps {
  message?: string
  colors?: ThemeColors
}
