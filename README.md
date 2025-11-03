# Task Manager App 📝

A beautiful and intuitive Task Manager application built with React Native and Expo. Manage your daily tasks with ease, featuring smooth animations, haptic feedback, dark/light mode, and a clean modern design.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## ✨ Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete tasks
- 🎨 **Dark/Light Mode** - Automatic theme switching with system preferences
- 📳 **Haptic Feedback** - Tactile response on all interactions
- � **Real-time Statistics** - Track total, completed, and pending tasks
- ⏰ **Smart Timestamps** - Relative time display (e.g., "2 mins ago")
- 🎯 **Input Validation** - Character counter and error messages
- 📱 **Cross-Platform** - Works on iOS, Android, and Web

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo Go app** (optional, for physical device testing)

### Installation

```bash
# Clone the repository
git clone git@github.com:eslamalii/Task-Manager.git
cd TaskManagerApp

# Install dependencies
npm install

# Start development server
npx expo start
```

### Running the App

- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`
- **Web Browser**: Press `w`
- **Physical Device**: Scan QR code with Expo Go app

---

## 🛠️ Tech Stack

- **React Native** (0.76.5) - Mobile framework
- **Expo** (~54.0.20) - Development platform
- **TypeScript** (~5.9.2) - Type safety
- **React Native Reanimated** (~4.1.1) - Animations
- **Expo Haptics** (~15.0.7) - Tactile feedback
- **Expo Router** (~4.1.7) - File-based routing

---

## � Project Structure

```
app/
├── (tabs)/
│   └── index.tsx           # Main task screen
└── _layout.tsx             # Root layout

components/
└── task/
    ├── AddTaskForm.tsx     # Input form
    ├── TaskItem.tsx        # Task card
    ├── TaskList.tsx        # List container
    └── EmptyState.tsx      # Empty state

constants/
├── taskConstants.ts        # App constants
└── theme.ts               # Color themes

types/
└── task.ts                # TypeScript types

utils/
└── taskHelpers.ts         # Helper functions
```

---

## 🎨 Key Features

### Theme System

- Complete dark/light mode support

### Smart Sorting

- Incomplete tasks appear first
- Completed tasks sorted by date
- Smooth reordering animations

### Performance

- React.memo optimization
- useCallback for handlers
- FlatList for efficient rendering
- UI-thread animations

---

## 📱 Platform Support

| Platform | Status | Features                    |
| -------- | ------ | --------------------------- |
| iOS      | ✅     | Full support with haptics   |
| Android  | ✅     | Full support with haptics   |
| Web      | ✅     | No haptics, browser confirm |
