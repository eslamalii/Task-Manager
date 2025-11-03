import { TASK_CONFIG } from '@/constants/taskConstants'
import { TaskListProps } from '@/types/task'
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { EmptyState } from './EmptyState'
import { TaskItem } from './TaskItem'

/**
 * Renders a list of tasks using FlatList for performance optimization
 */
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return <EmptyState />
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      initialNumToRender={TASK_CONFIG.initialNumToRender}
      maxToRenderPerBatch={TASK_CONFIG.maxToRenderPerBatch}
      removeClippedSubviews={true}
      windowSize={5}
    />
  )
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: TASK_CONFIG.spacing.lg,
  },
})
