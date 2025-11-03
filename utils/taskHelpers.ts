import { TASK_CONFIG } from '@/constants/taskConstants'
import { Task } from '@/types/task'

/**
 * Generate a unique ID for a new task
 * Uses timestamp and random string for uniqueness
 */
export const generateTaskId = (): string => {
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 9)
  return `task_${timestamp}_${randomStr}`
}

/**
 * Validate task description
 * Returns error message if invalid, null if valid
 */
export const validateTaskDescription = (description: string): string | null => {
  const trimmed = description.trim()

  if (trimmed.length < TASK_CONFIG.minDescriptionLength) {
    return 'Task description cannot be empty'
  }

  if (trimmed.length > TASK_CONFIG.maxDescriptionLength) {
    return `Task description is too long (max ${TASK_CONFIG.maxDescriptionLength} characters)`
  }

  return null
}

/**
 * Sort tasks: incomplete tasks first, then completed tasks
 * Within each group, sort by creation date (newest first)
 */
export const sortTasks = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => {
    // First, sort by completion status (incomplete first)
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1
    }

    // Then sort by creation date (newest first)
    return b.createdAt.getTime() - a.createdAt.getTime()
  })
}

/**
 * Create a new task object
 */
export const createTask = (description: string): Task => {
  return {
    id: generateTaskId(),
    description: description.trim(),
    isCompleted: false,
    createdAt: new Date(),
  }
}

/**
 * Get task statistics
 */
export const getTaskStatistics = (tasks: Task[]) => {
  const total = tasks.length
  const completed = tasks.filter((task) => task.isCompleted).length
  const pending = total - completed
  const completionPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0

  return {
    total,
    completed,
    pending,
    completionPercentage,
  }
}

/**
 * Format date to a readable string with relative time
 */
export const formatTaskDate = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (seconds < 10) return 'Just now'
  if (seconds < 60) return `${seconds} secs ago`
  if (minutes === 1) return '1 min ago'
  if (minutes < 60) return `${minutes} mins ago`
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}
