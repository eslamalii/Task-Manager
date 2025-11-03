import { ThemedText } from '@/components/themed-text'
import { TASK_STRINGS } from '@/constants/taskConstants'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { EmptyStateProps } from '@/types/task'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

/**
 * Displays a friendly message when there are no tasks
 * Enhanced with subtle animations
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  message = TASK_STRINGS.emptyStateMessage,
}) => {
  const iconScale = useSharedValue(1)
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme ?? 'light']

  useEffect(() => {
    // Gentle breathing animation for the icon
    iconScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1, // repeat infinitely
      false
    )
  }, [])

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
    }
  })
  return (
    <Animated.View
      entering={FadeIn.duration(400).delay(200)}
      style={styles.container}
    >
      <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
        <Ionicons name="clipboard-outline" size={70} color={colors.border} />
      </Animated.View>

      <ThemedText style={[styles.title, { color: colors.textSecondary }]}>
        {TASK_STRINGS.emptyStateTitle}
      </ThemedText>

      <ThemedText style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </ThemedText>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 20,
    opacity: 0.6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
})
