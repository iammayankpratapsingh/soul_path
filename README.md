# Soul Path 🌸

A beautiful and intuitive tarot card reading app built with React Native and Expo. Soul Path provides users with various card spread options for spiritual guidance and self-reflection.

## ✨ Features

- **Multiple Card Spreads**: Choose from 6 different tarot card spreads (1-6 cards)
- **Beautiful UI**: Elegant pink-themed design with smooth animations
- **Intuitive Navigation**: Drawer navigation with bottom tabs for easy access
- **Cross-Platform**: Works on iOS, Android, and Web
- **Modern Architecture**: Built with React Native, TypeScript, and Expo

## 🎯 App Overview

Soul Path is a spiritual guidance app that offers various tarot card reading spreads:

- **One Card**: Quick daily guidance
- **Two Cards**: Explore duality and contrasts
- **Three Cards**: Past, present, and future insights
- **Four Cards**: Mind, heart, body, and spirit alignment
- **Five Cards**: Deep analysis of situations
- **Six Cards**: Comprehensive perspective on complex matters

## 🚀 Getting Started

### Prerequisites

Before running the app, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For mobile development:
  - [Android Studio](https://developer.android.com/studio) (for Android)
  - [Xcode](https://developer.apple.com/xcode/) (for iOS - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iammayankpratapsingh/soul_path.git
   cd soul_path
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

### Running the App

#### Option 1: Expo Go (Recommended for Development)
1. Install [Expo Go](https://expo.dev/client) on your mobile device
2. Run `npm start` or `yarn start`
3. Scan the QR code with Expo Go (Android) or Camera app (iOS)

#### Option 2: Web Development
```bash
npm run web
# or
yarn web
```

#### Option 3: Native Development
```bash
# For Android
npm run android
# or
yarn android

# For iOS (macOS only)
npm run ios
# or
yarn ios
```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   ├── DrawerContent.tsx
│   └── SpreadCard.tsx
├── navigation/          # Navigation configuration
│   ├── RootNavigator.tsx
│   └── Tabs.tsx
├── screens/            # App screens
│   ├── HomeScreen.tsx
│   ├── SettingsScreen.tsx
│   └── SpreadReadingScreen.tsx
├── theme/              # App theming
│   └── colors.ts
└── types/              # TypeScript type definitions
```

## 🎨 Design System

The app uses a cohesive pink color palette:
- **Primary Pink**: `#F8D0D0`
- **Light Pink**: `#FCEDED`
- **Gray**: `#505662`
- **Heading Color**: `#4C3343`
- **Light Text**: `#6C5A77`

## 🛠️ Technologies Used

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **React Navigation**: Navigation library
- **React Native SVG**: SVG support
- **React Native Reanimated**: Smooth animations
- **React Native Gesture Handler**: Touch interactions

## 📦 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser

## 🔧 Development

### Project Setup
1. Ensure you have Node.js and npm/yarn installed
2. Install Expo CLI globally: `npm install -g @expo/cli`
3. Clone the repository and install dependencies
4. Start the development server with `npm start`

### Building for Production

#### Android
```bash
expo build:android
```

#### iOS
```bash
expo build:ios
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a personal project. For any questions or suggestions, please contact the repository owner.

## 📞 Support

If you encounter any issues or have questions about the app, please open an issue on GitHub or contact the development team.

---

**Soul Path** - Your journey to spiritual enlightenment begins here. 🌸✨
