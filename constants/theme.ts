/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native'

const tintColorLight = '#6366F1'
const tintColorDark = '#818CF8'

export const Colors = {
  light: {
    text: '#1F2937', // Gray-800 - Main text
    textSecondary: '#6B7280', // Gray-500 - Secondary text
    background: '#F0F4FF', // Indigo-50 - App background
    cardBackground: '#FFFFFF', // White - Card backgrounds
    tint: tintColorLight,
    icon: '#6B7280',
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorLight,
    border: '#E0E7FF', // Indigo-100 - Subtle borders
    success: '#10B981', // Emerald-500 - Success/Completed
    warning: '#F59E0B', // Amber-500 - Warning/Pending
    danger: '#EF4444', // Red-500 - Danger/Delete
    indigo: '#6366F1', // Indigo-500 - Primary accent
    indigoDark: '#4F46E5', // Indigo-600 - Darker primary (buttons)
    indigoLight: '#EEF2FF', // Indigo-50 - Light backgrounds
    green: '#10B981', // Emerald-500 - Success states
    greenLight: '#D1FAE5', // Emerald-100 - Success backgrounds
    amber: '#F59E0B', // Amber-500 - Warning states
    amberLight: '#FEF3C7', // Amber-100 - Warning backgrounds
  },
  dark: {
    text: '#F9FAFB', // Gray-50 - Main text
    textSecondary: '#9CA3AF', // Gray-400 - Secondary text
    background: '#0F172A', // Slate-900 - App background
    cardBackground: '#1E293B', // Slate-800 - Card backgrounds
    tint: tintColorDark,
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: tintColorDark,
    border: '#334155', // Slate-700 - Borders
    success: '#34D399', // Emerald-400 - Success/Completed
    warning: '#FBBF24', // Amber-400 - Warning/Pending
    danger: '#F87171', // Red-400 - Danger/Delete
    indigo: '#818CF8', // Indigo-400 - Primary accent
    indigoDark: '#818CF8', // Indigo-400 - Same as primary in dark mode
    indigoLight: '#312E81', // Indigo-900 - Dark backgrounds
    green: '#34D399', // Emerald-400 - Success states
    greenLight: '#064E3B', // Emerald-900 - Success backgrounds
    amber: '#FBBF24', // Amber-400 - Warning states
    amberLight: '#78350F', // Amber-900 - Warning backgrounds
  },
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
})
