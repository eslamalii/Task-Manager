import { AddTaskForm, TaskList } from '@/components/task'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Task } from '@/types/task'
import { createTask, getTaskStatistics, sortTasks } from '@/utils/taskHelpers'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeInDown, Layout } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

/**
 * TaskManagerScreen - Main screen for the Task Manager app
 * Manages the state of all tasks and handles task operations
 */
export default function TaskManagerScreen() {
  const [tasks, setTasks] = useState<Task[]>([])
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  /**
   * Add a new task to the list
   */
  const handleAddTask = useCallback((description: string) => {
    const newTask = createTask(description)
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask]
      return sortTasks(updatedTasks)
    })
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }, [])

  /**
   * Toggle task completion status
   */
  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
      return sortTasks(updatedTasks)
    })
  }, [])

  /**
   * Delete a task from the list
   */
  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }, [])

  // Calculate task statistics
  const stats = getTaskStatistics(tasks)

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
        edges={['top']}
      >
        <KeyboardAvoidingView
          style={[styles.container, { backgroundColor: colors.background }]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ThemedView
            style={[styles.container, { backgroundColor: colors.background }]}
          >
            {/* Header */}
            <View
              style={[styles.header, { backgroundColor: colors.background }]}
            >
              {/* Task Statistics */}
              {tasks.length > 0 && (
                <Animated.View
                  entering={FadeInDown.duration(400).springify()}
                  layout={Layout.springify()}
                >
                  <View style={styles.statsGrid}>
                    <Animated.View
                      style={[
                        styles.statCard,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.indigo,
                        },
                      ]}
                      entering={FadeIn.delay(100).duration(400).springify()}
                    >
                      <View style={styles.iconContainer}>
                        <View
                          style={[
                            styles.iconBackground,
                            { backgroundColor: colors.indigoLight },
                          ]}
                        >
                          <Ionicons
                            name="list"
                            size={18}
                            color={colors.indigo}
                          />
                        </View>
                      </View>
                      <ThemedText
                        style={[styles.statValue, { color: colors.indigo }]}
                      >
                        {stats.total}
                      </ThemedText>
                      <ThemedText
                        style={[
                          styles.statLabel,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Total Tasks
                      </ThemedText>
                    </Animated.View>

                    <Animated.View
                      style={[
                        styles.statCard,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.green,
                        },
                      ]}
                      entering={FadeIn.delay(200).duration(400).springify()}
                    >
                      <View style={styles.iconContainer}>
                        <View
                          style={[
                            styles.iconBackground,
                            { backgroundColor: colors.greenLight },
                          ]}
                        >
                          <Ionicons
                            name="checkmark-circle"
                            size={18}
                            color={colors.green}
                          />
                        </View>
                      </View>
                      <ThemedText
                        style={[styles.statValue, { color: colors.green }]}
                      >
                        {stats.completed}
                      </ThemedText>
                      <ThemedText
                        style={[
                          styles.statLabel,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Completed
                      </ThemedText>
                    </Animated.View>

                    <Animated.View
                      style={[
                        styles.statCard,
                        {
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.amber,
                        },
                      ]}
                      entering={FadeIn.delay(300).duration(400).springify()}
                    >
                      <View style={styles.iconContainer}>
                        <View
                          style={[
                            styles.iconBackground,
                            { backgroundColor: colors.amberLight },
                          ]}
                        >
                          <Ionicons
                            name="hourglass"
                            size={18}
                            color={colors.amber}
                          />
                        </View>
                      </View>
                      <ThemedText
                        style={[styles.statValue, { color: colors.amber }]}
                      >
                        {stats.pending}
                      </ThemedText>
                      <ThemedText
                        style={[
                          styles.statLabel,
                          { color: colors.textSecondary },
                        ]}
                      >
                        Pending
                      </ThemedText>
                    </Animated.View>
                  </View>
                </Animated.View>
              )}
            </View>

            {/* Add Task Form */}
            <View
              style={[
                styles.formContainer,
                { backgroundColor: colors.background },
              ]}
            >
              <AddTaskForm onAddTask={handleAddTask} />
            </View>

            {/* Task List */}
            <View
              style={[
                styles.listContainer,
                { backgroundColor: colors.background },
              ]}
            >
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            </View>
          </ThemedView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 10,
    boxShadow: '0px 2px 12px rgba(99, 102, 241, 0.12)',
    minHeight: 95,
    borderWidth: 2,
  },
  iconContainer: {
    marginBottom: 6,
  },
  iconBackground: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 10,
    marginTop: 0,
    fontWeight: '500',
    textTransform: 'capitalize',
    letterSpacing: 0.2,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
})
