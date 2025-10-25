import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';
import cardsData from '../../assets/cards.json';

type OneCardDrawNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Card {
  id: number;
  image: string;
  card_name: string;
  type: string;
  keywords: string;
  reversed_keywords: string;
}

export default function OneCardDrawScreen() {
  const navigation = useNavigation<OneCardDrawNavigationProp>();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Animation values
  const cardSlotAnimation = useRef(new Animated.Value(0)).current;
  const cardFlipAnimation = useRef(new Animated.Value(0)).current;
  const cardMoveAnimation = useRef(new Animated.Value(0)).current;

  // Get a random card
  const getRandomCard = (): Card => {
    try {
      if (!cardsData || cardsData.length === 0) {
        throw new Error('No cards data available');
      }
      const randomIndex = Math.floor(Math.random() * cardsData.length);
      return cardsData[randomIndex];
    } catch (error) {
      console.error('Error getting random card:', error);
      // Return a fallback card
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

  const handleCardSelection = () => {
    if (isAnimating || selectedCard) return; // Prevent multiple selections

    try {
      setIsAnimating(true);
      const card = getRandomCard();
      
      if (!card) {
        throw new Error('Failed to get random card');
      }
      
      setSelectedCard(card);

      // Animate card moving to center slot
      Animated.sequence([
        Animated.timing(cardMoveAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cardSlotAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start((finished) => {
        if (!finished) return;
        
        // Animate card flip
        Animated.timing(cardFlipAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start((flipFinished) => {
          if (!flipFinished) return;
          
          setIsCardRevealed(true);
          setIsAnimating(false);
          
          // Navigate to result screen after a short delay
          setTimeout(() => {
            try {
              navigation.navigate('OneCardResult', { card });
            } catch (navError) {
              console.error('Navigation error:', navError);
              // Fallback: just show the card without navigation
            }
          }, 1000);
        });
      });
    } catch (error) {
      console.error('Error in card selection:', error);
      setIsAnimating(false);
    }
  };

  const cardSlotInterpolate = cardSlotAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const cardFlipInterpolate = cardFlipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const cardMoveInterpolate = cardMoveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
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
        <Text style={styles.headerTitle}>One Card</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card Slot */}
        <View style={styles.cardSlotContainer}>
          <Animated.View 
            style={[
              styles.cardSlot,
              {
                opacity: cardSlotInterpolate,
                transform: [{ scale: cardSlotInterpolate }],
              }
            ]}
          >
            {selectedCard && isCardRevealed ? (
              <Animated.View
                style={[
                  styles.revealedCard,
                  {
                    transform: [{ rotateY: cardFlipInterpolate }],
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
            ) : (
              <View style={styles.emptySlot}>
                <Text style={styles.slotText}>Select a card</Text>
              </View>
            )}
          </Animated.View>
        </View>


        {/* Fanned Deck */}
        <View style={styles.fannedDeck}>
            {Array.from({ length: 23 }, (_, index) => {
              // Create a fanned arc at the bottom
              const totalCards = 23;
              const startAngle = -60; // Start from left
              const endAngle = 60;    // End at right
              const angle = startAngle + (index * (endAngle - startAngle)) / (totalCards - 1);
              const radians = (angle * Math.PI) / 180;
              
               // Position cards in an arc at the bottom
               // Calculate radius so leftmost and rightmost cards touch bottom corners
               const cardWidth = 80;
               const cardHeight = 120;
               const maxAngle = Math.max(Math.abs(startAngle), Math.abs(endAngle));
               
               // Calculate radius so outermost cards touch screen edges
               const radius = (width - cardWidth) / (2 * Math.sin((maxAngle * Math.PI) / 180));
               
               const centerX = width / 2; // Center of screen
               const centerY = 60; // Move deck to bottom with some space
               
               const x = centerX + radius * Math.sin(radians) - cardWidth / 2;
               const y = centerY - radius * Math.cos(radians) - cardHeight / 2;
              
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.deckCard,
                    {
                      position: 'absolute',
                      left: x,
                      top: y,
                      transform: [
                        { rotate: `${angle}deg` },
                      ],
                      zIndex: totalCards - index,
                    }
                  ]}
                  onPress={handleCardSelection}
                  disabled={isAnimating}
                  accessibilityRole="button"
                  accessibilityLabel={`Select card ${index + 1}`}
                >
                  <Image 
                    source={require('../../assets/card_back.png')} 
                    style={styles.deckCardImage}
                    resizeMode="cover"
                    onError={(error) => console.log('Deck card image error:', error)}
                  />
                </Pressable>
              );
            })}
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
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  cardSlotContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  cardSlot: {
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
  emptySlot: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.pink,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lightText,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotText: {
    color: colors.lightText,
    fontSize: 16,
    fontWeight: '600',
  },
  revealedCard: {
    width: '100%',
    height: '100%',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  instructionContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
   deckContainer: {
     alignItems: 'center',
     paddingBottom: 0, // No padding - deck touches bottom
   },
  instructionText: {
    color: colors.gray,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
   fannedDeck: {
     position: 'absolute',
     bottom: 0,
     left: 0,
     right: 0,
     width: '100%',
     height: 150,
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
  deckCard: {
    width: 80,
    height: 120,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  deckCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
