import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';
import cardsData from '../../assets/cards.json';

type DailyReadingNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Card {
  id: number;
  image: string;
  card_name: string;
  type: string;
  keywords: string;
  reversed_keywords: string;
}

export default function DailyReadingScreen() {
  const navigation = useNavigation<DailyReadingNavigationProp>();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardAnimation] = useState(new Animated.Value(0));
  const [flipAnimation] = useState(new Animated.Value(0));

  // Get a random card for daily reading
  const getRandomCard = (): Card => {
    try {
      if (!cardsData || cardsData.length === 0) {
        throw new Error('No cards data available');
      }
      const randomIndex = Math.floor(Math.random() * cardsData.length);
      return cardsData[randomIndex];
    } catch (error) {
      console.error('Error getting random card:', error);
      // Return a fallback card if there's an error
      return {
        id: 1,
        image: 'https://firebasestorage.googleapis.com/v0/b/track-3b833/o/cards%2F1.png?alt=media',
        card_name: 'Pramatta',
        type: 'Maha Mandala – Prarabdha',
        keywords: 'Illusion, new beginnings, innocence, leap of faith',
        reversed_keywords: 'Foolishness, disconnection, illusion, aimlessness'
      };
    }
  };

  const revealCard = () => {
    if (selectedCard || isLoading) return; // Card already revealed or loading

    setIsLoading(true);
    
    try {
      const card = getRandomCard();
      const reversed = Math.random() < 0.3; // 30% chance of reversed card
      
      setSelectedCard(card);
      setIsReversed(reversed);
      
      // Animate card flip
      Animated.sequence([
        Animated.timing(flipAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(flipAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsCardRevealed(true);
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error revealing card:', error);
      setIsLoading(false);
    }
  };

  const resetReading = () => {
    setSelectedCard(null);
    setIsCardRevealed(false);
    setIsReversed(false);
    setIsLoading(false);
    cardAnimation.setValue(0);
    flipAnimation.setValue(0);
  };

  const getCardGuidance = () => {
    if (!selectedCard) return '';
    
    const keywords = isReversed ? selectedCard.reversed_keywords : selectedCard.keywords;
    const guidance = isReversed 
      ? `Today's guidance suggests being mindful of: ${keywords}. This reversed energy invites you to reflect on areas where you might be experiencing challenges or resistance.`
      : `Today's guidance brings you: ${keywords}. This energy supports your path forward and offers clarity for your current situation.`;
    
    return guidance;
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={colors.headingColor} />
        </Pressable>
        <Text style={styles.headerTitle}>Daily Reading</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Instruction Text */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Focus on your day ahead and tap the card below to receive your daily guidance.
          </Text>
        </View>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          {!selectedCard ? (
            <Pressable 
              style={styles.cardBack}
              onPress={revealCard}
              accessibilityRole="button"
              accessibilityLabel="Reveal your daily card"
            >
              <Image 
                source={require('../../assets/card_back.png')} 
                style={styles.cardImage}
                resizeMode="cover"
                onError={(error) => console.log('Card back image error:', error)}
              />
              <Text style={styles.tapText}>
                {isLoading ? 'Revealing...' : 'Tap to Reveal'}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.revealedCardContainer}>
              <Animated.View
                style={[
                  styles.cardWrapper,
                  {
                    transform: [{ rotateY: frontInterpolate }],
                  },
                ]}
              >
                <Image 
                  source={{ uri: selectedCard.image }} 
                  style={styles.cardImage}
                  resizeMode="cover"
                  onError={(error) => console.log('Card image error:', error)}
                />
              </Animated.View>
              
              {isReversed && (
                <View style={styles.reversedIndicator}>
                  <Text style={styles.reversedText}>Reversed</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Card Information */}
        {isCardRevealed && selectedCard && (
          <View style={styles.cardInfoContainer}>
            <Text style={styles.cardName}>{selectedCard.card_name}</Text>
            <Text style={styles.cardType}>{selectedCard.type}</Text>
            
            <View style={styles.guidanceContainer}>
              <Text style={styles.guidanceTitle}>Today's Guidance</Text>
              <Text style={styles.guidanceText}>{getCardGuidance()}</Text>
            </View>

            <View style={styles.keywordsContainer}>
              <Text style={styles.keywordsTitle}>Key Meanings</Text>
              <View style={styles.keywordsWrapper}>
                {(isReversed ? selectedCard.reversed_keywords : selectedCard.keywords)
                  .split(', ')
                  .map((keyword, index) => (
                    <View key={index} style={styles.keywordTag}>
                      <Text style={styles.keywordText}>{keyword.trim()}</Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {isCardRevealed && (
            <Pressable 
              style={styles.resetButton}
              onPress={resetReading}
              accessibilityRole="button"
              accessibilityLabel="Get a new reading"
            >
              <Text style={styles.resetButtonText}>New Reading</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
  },
  header: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: colors.headingColor,
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  instructionContainer: {
    backgroundColor: colors.pink,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  instructionText: {
    color: colors.gray,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  cardBack: {
    alignItems: 'center',
  },
  cardImage: {
    width: 200,
    height: 300,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tapText: {
    color: colors.lightText,
    fontSize: 16,
    marginTop: 12,
    fontWeight: '600',
  },
  revealedCardContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  cardWrapper: {
    alignItems: 'center',
  },
  reversedIndicator: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: colors.headingColor,
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reversedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardInfoContainer: {
    backgroundColor: colors.pink,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  cardName: {
    color: colors.headingColor,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardType: {
    color: colors.lightText,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  guidanceContainer: {
    marginBottom: 20,
  },
  guidanceTitle: {
    color: colors.headingColor,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  guidanceText: {
    color: colors.gray,
    fontSize: 16,
    lineHeight: 24,
  },
  keywordsContainer: {
    marginBottom: 20,
  },
  keywordsTitle: {
    color: colors.headingColor,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  keywordsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordTag: {
    backgroundColor: colors.lightPink,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.lightText,
  },
  keywordText: {
    color: colors.headingColor,
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: colors.headingColor,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
