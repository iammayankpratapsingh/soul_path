import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, PanResponder, Animated, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CardsScreen from '../screens/CardsScreen';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

const screens = [
  { name: 'Spreads', component: HomeScreen, icon: 'grid-outline' },
  { name: 'History', component: HistoryScreen, icon: 'time-outline' },
  { name: 'Cards', component: CardsScreen, icon: 'layers-outline' },
];

export default function SwipeableTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const indicatorTranslateX = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Industry standard gesture detection (matches professional apps)
      return !isAnimating.current && 
             Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && 
             Math.abs(gestureState.dx) > 8; // Professional app standard: 8px initial threshold
    },
    onPanResponderGrant: () => {
      // Reset any ongoing animations
      translateX.setOffset(0);
      translateX.setValue(0);
    },
    onPanResponderMove: (evt, gestureState) => {
      // Professional app gesture feedback (matches Instagram/TikTok responsiveness)
      if (!isAnimating.current) {
        const dampedValue = gestureState.dx * 0.85; // Industry standard damping for smooth feel
        translateX.setValue(dampedValue);
        
        // Update indicator position during swipe for smooth following
        const tabWidth = width / screens.length;
        const swipeProgress = gestureState.dx / width;
        const targetIndex = Math.max(0, Math.min(screens.length - 1, activeIndex - swipeProgress));
        const indicatorTargetX = (targetIndex * tabWidth) + (tabWidth / 2) - 20;
        indicatorTranslateX.setValue(indicatorTargetX);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Industry standard: 25dp threshold (approximately 50-75 pixels on most devices)
      const threshold = 50; // 25dp = ~50 pixels on most modern devices
      const velocity = gestureState.vx;
      
      // Professional app velocity threshold (matches Instagram/TikTok)
      if (Math.abs(gestureState.dx) > threshold || Math.abs(velocity) > 0.5) {
        if (gestureState.dx > 0 && activeIndex > 0) {
          // Swipe right - go to previous tab with velocity
          animateToTab(activeIndex - 1, 'slide-right', velocity);
        } else if (gestureState.dx < 0 && activeIndex < screens.length - 1) {
          // Swipe left - go to next tab with velocity
          animateToTab(activeIndex + 1, 'slide-left', velocity);
        } else {
          // Snap back to current position
          snapBack();
        }
      } else {
        // Snap back to current position
        snapBack();
      }
    },
  });

  const animateToTab = (newIndex: number, direction: 'slide-left' | 'slide-right' = 'slide-left', velocity?: number) => {
    if (isAnimating.current || newIndex === activeIndex) return;
    
    isAnimating.current = true;
    setIsTransitioning(true);
    
    // Create a smooth slide animation with industry-standard timing
    const slideDistance = direction === 'slide-left' ? -width : width;
    
    // Calculate duration based on velocity for more natural feel
    const baseDuration = 120; // Even faster base duration
    const velocityMultiplier = velocity ? Math.min(Math.abs(velocity) * 0.3, 0.8) : 0;
    const duration = Math.max(baseDuration - (velocityMultiplier * 50), 80); // Min 80ms, max 120ms
    
    // Animate indicator to new position - calculate exact center of tab
    const tabWidth = width / screens.length;
    const indicatorTargetX = (newIndex * tabWidth) + (tabWidth / 2) - 20; // 20 is half of indicator width
    
    // Start indicator animation immediately for smoother feel
    Animated.timing(indicatorTranslateX, {
      toValue: indicatorTargetX,
      duration: Math.max(duration, 100), // Ensure minimum 100ms for smooth animation
      useNativeDriver: true,
    }).start();
    
    // First animate the current screen out - velocity-based timing
    Animated.timing(translateX, {
      toValue: slideDistance,
      duration: duration,
      useNativeDriver: true,
    }).start(() => {
      // Change the screen
      setActiveIndex(newIndex);
      
      // Reset position and animate in from the opposite side
      translateX.setValue(-slideDistance);
      
      // Animate the new screen in - slightly longer for smooth entry
      Animated.timing(translateX, {
        toValue: 0,
        duration: duration + 30, // Slightly longer for smooth entry
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
        setIsTransitioning(false);
      });
    });
  };

  const snapBack = () => {
    isAnimating.current = true;
    
    // Animate indicator back to current position - calculate exact center
    const tabWidth = width / screens.length;
    const indicatorTargetX = (activeIndex * tabWidth) + (tabWidth / 2) - 20; // 20 is half of indicator width
    Animated.spring(indicatorTranslateX, {
      toValue: indicatorTargetX,
      tension: 200,
      friction: 4,
      useNativeDriver: true,
    }).start();
    
    // Ultra-responsive spring animation matching industry standards
    Animated.spring(translateX, {
      toValue: 0,
      tension: 200, // Increased for even snappier response
      friction: 4, // Reduced for less damping - more bouncy
      useNativeDriver: true,
    }).start(() => {
      isAnimating.current = false;
    });
  };

  const handleTabPress = (index: number) => {
    if (index !== activeIndex && !isAnimating.current) {
      const direction = index > activeIndex ? 'slide-left' : 'slide-right';
      animateToTab(index, direction);
    }
  };

  // Initialize indicator position and reset animation when activeIndex changes
  useEffect(() => {
    if (!isTransitioning) {
      translateX.setValue(0);
    }
    
    // Set initial indicator position - calculate exact center
    const tabWidth = width / screens.length;
    const indicatorTargetX = (activeIndex * tabWidth) + (tabWidth / 2) - 20; // 20 is half of indicator width
    indicatorTranslateX.setValue(indicatorTargetX);
  }, [activeIndex, isTransitioning]);

  const CurrentScreen = screens[activeIndex].component;

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.contentContainer, 
          {
            transform: [{ translateX }],
            opacity: isTransitioning ? 0.95 : 1, // Slight opacity change during transition
          }
        ]} 
        {...panResponder.panHandlers}
      >
        <CurrentScreen />
      </Animated.View>
      
      <View style={styles.tabBar}>
        {/* Animated sliding indicator */}
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [{ translateX: indicatorTranslateX }],
            },
          ]}
        />
        
        {screens.map((screen, index) => (
          <TouchableOpacity
            key={screen.name}
            style={styles.tabItem}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeIndex === index && styles.activeTabText
              ]}
            >
              {screen.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
  },
  contentContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.lightPink,
    borderTopColor: colors.pink,
    borderTopWidth: 1,
    paddingVertical: 8, // Reduced to accommodate larger text
    paddingHorizontal: 8,
    position: 'relative',
    height: 60, // Fixed height to prevent size changes
  },
  indicator: {
    position: 'absolute',
    bottom: 6,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: colors.pink,
    borderRadius: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.lightText,
    textAlign: 'center',
  },
  activeTabText: {
    color: colors.pink,
    fontWeight: '600',
  },
});
