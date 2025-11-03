import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { TASK_CONFIG, TASK_STRINGS } from '@/constants/taskConstants'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { TaskItemProps } from '@/types/task'
import { formatTaskDate } from '@/utils/taskHelpers'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import React, { useEffect } from 'react'
import { Alert, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  Extrapolate,
  FadeInRight,
  FadeOutLeft,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

/**
 * Displays a single task with completion toggle and delete functionality
 * Enhanced with smooth animations
 */
export const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ task, onToggleComplete, onDelete }) => {
    const checkboxScale = useSharedValue(0)
    const completionProgress = useSharedValue(task.isCompleted ? 1 : 0)
    const pressScale = useSharedValue(1)
    const deleteScale = useSharedValue(1)
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light']

    useEffect(() => {
      checkboxScale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      })
    }, [])

    useEffect(() => {
      completionProgress.value = withTiming(task.isCompleted ? 1 : 0, {
        duration: TASK_CONFIG.animationDuration,
      })
    }, [task.isCompleted])

    const handleToggleComplete = () => {
      // Bounce animation on checkbox
      checkboxScale.value = withSpring(1.2, { damping: 8 })
      setTimeout(() => {
        checkboxScale.value = withSpring(1, { damping: 10 })
      }, 150)

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      onToggleComplete(task.id)
    }

    const handlePressIn = () => {
      pressScale.value = withSpring(0.98, { damping: 15 })
    }

    const handlePressOut = () => {
      pressScale.value = withSpring(1, { damping: 15 })
    }

    const handleDeletePressIn = () => {
      deleteScale.value = withSpring(0.85, { damping: 10 })
    }

    const handleDeletePressOut = () => {
      deleteScale.value = withSpring(1, { damping: 10 })
    }

    const handleDelete = () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)

      // Web doesn't support Alert.alert, use window.confirm instead
      if (Platform.OS === 'web') {
        const confirmed = window.confirm(
          `${TASK_STRINGS.deleteConfirmTitle}\n\n${TASK_STRINGS.deleteConfirmMessage}`
        )
        if (confirmed) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
          onDelete(task.id)
        }
        return
      }

      // Native Alert.alert for iOS/Android
      Alert.alert(
        TASK_STRINGS.deleteConfirmTitle,
        TASK_STRINGS.deleteConfirmMessage,
        [
          {
            text: TASK_STRINGS.deleteConfirmNo,
            style: 'cancel',
          },
          {
            text: TASK_STRINGS.deleteConfirmYes,
            style: 'destructive',
            onPress: () => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
              onDelete(task.id)
            },
          },
        ]
      )
    }

    // Animated styles for checkbox
    const checkboxAnimatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(
        checkboxScale.value,
        [0, 1],
        [0.5, 1],
        Extrapolate.CLAMP
      )

      return {
        transform: [{ scale }],
      }
    })

    // Animated styles for completed state
    const completedAnimatedStyle = useAnimatedStyle(() => {
      const opacity = interpolate(
        completionProgress.value,
        [0, 1],
        [1, 0.7],
        Extrapolate.CLAMP
      )

      return {
        opacity,
      }
    })

    // Animated style for press feedback
    const pressAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: pressScale.value }],
      }
    })

    // Animated style for delete button
    const deleteAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: deleteScale.value }],
      }
    })

    return (
      <Animated.View
        entering={FadeInRight.duration(300).springify()}
        exiting={FadeOutLeft.duration(200)}
        style={styles.animatedContainer}
      >
        <Animated.View style={pressAnimatedStyle}>
          <ThemedView
            style={[
              styles.container,
              {
                backgroundColor: colors.cardBackground,
                borderLeftColor: task.isCompleted
                  ? colors.success
                  : colors.indigo,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={handleToggleComplete}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              activeOpacity={0.7}
            >
              <Animated.View
                style={[
                  styles.checkbox,
                  {
                    borderColor: task.isCompleted
                      ? colors.success
                      : colors.border,
                  },
                  task.isCompleted && { backgroundColor: colors.success },
                  checkboxAnimatedStyle,
                ]}
              >
                {task.isCompleted && (
                  <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                )}
              </Animated.View>
            </TouchableOpacity>

            <Animated.View
              style={[styles.contentContainer, completedAnimatedStyle]}
            >
              <ThemedText
                style={[
                  styles.description,
                  { color: colors.text },
                  task.isCompleted && {
                    textDecorationLine: 'line-through',
                    color: colors.textSecondary,
                  },
                ]}
                numberOfLines={3}
              >
                {task.description}
              </ThemedText>
              <ThemedText
                style={[styles.timestamp, { color: colors.textSecondary }]}
              >
                {formatTaskDate(task.createdAt)}
              </ThemedText>
            </Animated.View>

            <TouchableOpacity
              style={[
                styles.deleteButton,
                { backgroundColor: colors.background },
              ]}
              onPress={handleDelete}
              onPressIn={handleDeletePressIn}
              onPressOut={handleDeletePressOut}
              activeOpacity={0.7}
            >
              <Animated.View style={deleteAnimatedStyle}>
                <Ionicons name="trash" size={20} color={colors.danger} />
              </Animated.View>
            </TouchableOpacity>
          </ThemedView>
        </Animated.View>
      </Animated.View>
    )
  }
)

TaskItem.displayName = 'TaskItem'

const styles = StyleSheet.create({
  animatedContainer: {
    marginBottom: 14,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 20,
    borderLeftWidth: 4,
    boxShadow: '0px 4px 16px rgba(99, 102, 241, 0.12)',
    minHeight: 80,
  },
  checkboxContainer: {
    marginRight: 14,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {},
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 2,
    flexWrap: 'wrap',
  },
  descriptionCompleted: {},
  timestamp: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    boxShadow: '0px 2px 6px rgba(239, 68, 68, 0.2)',
  },
})
