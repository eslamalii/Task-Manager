import { ThemedText } from '@/components/themed-text'
import { TASK_CONFIG, TASK_STRINGS } from '@/constants/taskConstants'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { AddTaskFormProps } from '@/types/task'
import { validateTaskDescription } from '@/utils/taskHelpers'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import React, { useState } from 'react'
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

/**
 * Form for adding new tasks with validation
 */
export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [taskDescription, setTaskDescription] = useState('')
  const [error, setError] = useState<string | null>(null)
  const buttonScale = useSharedValue(1)
  const buttonRotation = useSharedValue(0)
  const inputScale = useSharedValue(1)
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  const handleAddTask = () => {
    // Validate input
    const validationError = validateTaskDescription(taskDescription)

    if (validationError) {
      setError(validationError)
      // Shake animation for error
      inputScale.value = withSequence(
        withTiming(1.02, { duration: 50 }),
        withTiming(0.98, { duration: 50 }),
        withTiming(1.02, { duration: 50 }),
        withTiming(1, { duration: 50 })
      )
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }

    // Success animation - button rotate
    buttonRotation.value = withSequence(
      withSpring(360, { damping: 15 }),
      withTiming(0, { duration: 0 })
    )

    // Add task
    onAddTask(taskDescription)

    // Clear input and error
    setTaskDescription('')
    setError(null)

    // Dismiss keyboard
    Keyboard.dismiss()

    // Haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }

  const handleTextChange = (text: string) => {
    setTaskDescription(text)
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }

    // Subtle scale animation when typing
    if (text.trim()) {
      buttonScale.value = withSpring(1.05, { damping: 12 })
    } else {
      buttonScale.value = withSpring(1, { damping: 12 })
    }
  }

  // Animated style for add button
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: buttonScale.value },
        { rotate: `${buttonRotation.value}deg` },
      ],
    }
  })

  // Animated style for input container (shake on error)
  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: inputScale.value }],
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.inputContainer,
          inputAnimatedStyle,
          {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { color: colors.text },
            // @ts-ignore - Web-specific style to remove focus outline
            Platform.OS === 'web' && { outlineStyle: 'none', outline: 'none' },
          ]}
          placeholder={TASK_STRINGS.inputPlaceholder}
          placeholderTextColor={colors.textSecondary}
          value={taskDescription}
          onChangeText={handleTextChange}
          onSubmitEditing={handleAddTask}
          returnKeyType="done"
          maxLength={TASK_CONFIG.maxDescriptionLength}
          multiline={false}
        />

        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: colors.indigoDark },
            !taskDescription.trim() && {
              backgroundColor: colors.border,
              opacity: 0.5,
            },
          ]}
          onPress={handleAddTask}
          disabled={!taskDescription.trim()}
          activeOpacity={0.7}
        >
          <Animated.View style={buttonAnimatedStyle}>
            <Ionicons
              name="add"
              size={26}
              color={
                !taskDescription.trim() && colorScheme === 'light'
                  ? colors.text
                  : '#FFFFFF'
              }
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {error && (
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={styles.errorContainer}
        >
          <Ionicons name="alert-circle" size={16} color={colors.danger} />
          <ThemedText style={[styles.errorText, { color: colors.danger }]}>
            {error}
          </ThemedText>
        </Animated.View>
      )}

      <View style={styles.characterCount}>
        <ThemedText
          style={[styles.characterCountText, { color: colors.textSecondary }]}
        >
          {taskDescription.length} / {TASK_CONFIG.maxDescriptionLength}
        </ThemedText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 6,
    boxShadow: '0px 6px 20px rgba(99, 102, 241, 0.15)',
    borderWidth: 1.5,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 14,
    paddingHorizontal: 4,
    minHeight: 50,
    fontWeight: '500',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 12px rgba(99, 102, 241, 0.4)',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
  characterCount: {
    alignItems: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  characterCountText: {
    fontSize: 11,
    fontWeight: '400',
  },
})
