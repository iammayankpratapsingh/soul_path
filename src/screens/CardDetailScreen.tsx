import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { colors } from '../theme/colors';

type CardData = {
  id: number;
  image: string;
  card_name: string;
  type: string;
  keywords: string;
  reversed_keywords: string;
};

type CardDetailRouteParams = {
  card: CardData;
};

type CardDetailRouteProp = RouteProp<{ CardDetail: CardDetailRouteParams }, 'CardDetail'>;

const { width } = Dimensions.get('window');

export default function CardDetailScreen() {
  const route = useRoute<CardDetailRouteProp>();
  const navigation = useNavigation();
  const { card } = route.params;
  const [activeTab, setActiveTab] = useState<'positive' | 'negative'>('positive');
  
  // Animation values
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(0)).current;
  const underlineColor = useRef(new Animated.Value(0)).current;
  
  // Text measurement refs
  const [textMeasurements, setTextMeasurements] = useState({
    positive: { width: 0, x: 0 },
    negative: { width: 0, x: 0 }
  });

  const handleBack = () => {
    navigation.goBack();
  };

  // Handle text measurement
  const handleTextLayout = (tab: 'positive' | 'negative', event: any) => {
    const { width: textWidth, x } = event.nativeEvent.layout;
    const tabWidth = (width - 32) / 2; // Account for padding
    const absoluteX = tab === 'positive' ? x : x + tabWidth;
    
    setTextMeasurements(prev => ({
      ...prev,
      [tab]: { width: textWidth, x: absoluteX }
    }));
  };

  // Animate underline when tab changes
  useEffect(() => {
    const isPositive = activeTab === 'positive';
    const measurements = isPositive ? textMeasurements.positive : textMeasurements.negative;
    
    if (measurements.width > 0) {
      Animated.parallel([
        Animated.timing(underlinePosition, {
          toValue: measurements.x,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(underlineWidth, {
          toValue: measurements.width,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(underlineColor, {
          toValue: isPositive ? 0 : 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [activeTab, textMeasurements]);

  const renderTabButton = (tab: 'positive' | 'negative', label: string) => (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={() => setActiveTab(tab)}
    >
      <Text 
        style={[
          styles.tabText,
          activeTab === tab && styles.activeTabText,
          tab === 'positive' && activeTab === 'positive' && styles.positiveText,
          tab === 'negative' && activeTab === 'negative' && styles.negativeText,
          activeTab !== tab && styles.inactiveText
        ]}
        onLayout={(event) => handleTextLayout(tab, event)}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{card.card_name}</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <View style={styles.tabRow}>
          {renderTabButton('positive', 'Positive')}
          {renderTabButton('negative', 'Negative')}
        </View>
        
        {/* Animated Underline */}
        <View style={styles.underlineContainer}>
          <Animated.View
            style={[
              styles.animatedUnderline,
              {
                left: underlinePosition,
                width: underlineWidth,
                backgroundColor: underlineColor.interpolate({
                  inputRange: [0, 1],
                  outputRange: [colors.green, colors.red],
                }),
              },
            ]}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Card Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: card.image }}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </View>

        {/* Tab Content */}
        <View style={styles.contentContainer}>
          {activeTab === 'positive' ? (
            <View>
              <Text style={styles.contentTitle}>Positive Aspects</Text>
              <Text style={styles.contentText}>{card.keywords}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.contentTitle}>Negative Aspects</Text>
              <Text style={styles.contentText}>{card.reversed_keywords}</Text>
            </View>
          )}
        </View>

        {/* Guidance Text */}
        <View style={styles.guidanceContainer}>
          <Text style={styles.guidanceText}>
            A special reading that gives you guidance for the day ahead
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 4,
    backgroundColor: colors.lightPink,
  },
  backButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: colors.darkText,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkText,
  },
  headerSpacer: {
    width: 40,
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
    backgroundColor: colors.lightPink,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  positiveText: {
    color: colors.green,
  },
  negativeText: {
    color: colors.red,
  },
  inactiveText: {
    color: '#9E9E9E',
  },
  underlineContainer: {
    height: 3,
    position: 'relative',
    marginTop: 4,
  },
  animatedUnderline: {
    position: 'absolute',
    height: 3,
    borderRadius: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  imageContainer: {
    padding: 16,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 700,
    borderRadius: 12,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkText,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 16,
    color: colors.darkText,
    lineHeight: 24,
  },
  guidanceContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  guidanceText: {
    fontSize: 16,
    color: colors.darkText,
    textAlign: 'center',
    lineHeight: 24,
  },
});
