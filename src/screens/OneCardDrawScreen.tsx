import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';
import cardsData from '../../assets/cards.json';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

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
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCard, setDraggedCard] = useState<Card | null>(null);

  const cardSlotAnimation = useRef(new Animated.Value(0)).current;
  const cardFlipAnimation = useRef(new Animated.Value(0)).current;
  const dragAnimation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const { width, height } = Dimensions.get('window');
  const cardWidth = 90;
  const cardHeight = 140;

  const getRandomCard = (): Card => {
    const randomIndex = Math.floor(Math.random() * cardsData.length);
    return cardsData[randomIndex];
  };

  const handleDragStart = (card: Card, event: any) => {
    if (isAnimating || selectedCard) return;

    setIsDragging(true);
    setDraggedCard(card);

    const { absoluteX, absoluteY } = event.nativeEvent;
    dragAnimation.setValue({
      x: absoluteX - cardWidth / 2,
      y: absoluteY - cardHeight / 2,
    });
  };

  const handleDragMove = (event: any) => {
    if (!isDragging) return;

    const { absoluteX, absoluteY } = event.nativeEvent;
    dragAnimation.setValue({
      x: absoluteX - cardWidth / 2,
      y: absoluteY - cardHeight / 2,
    });
  };

  const handleDragEnd = (event: any) => {
    if (!isDragging || !draggedCard) return;

    const { absoluteX, absoluteY } = event.nativeEvent;

    const vacantAreaTop = height * 0.1;
    const vacantAreaBottom = height * 0.4;
    const vacantAreaLeft = width * 0.2;
    const vacantAreaRight = width * 0.8;

    const isInDropZone =
      absoluteY >= vacantAreaTop &&
      absoluteY <= vacantAreaBottom &&
      absoluteX >= vacantAreaLeft &&
      absoluteX <= vacantAreaRight;

    if (isInDropZone) {
      setIsAnimating(true);
      setSelectedCard(draggedCard);

      Animated.timing(dragAnimation, {
        toValue: {
          x: width / 2 - cardWidth / 2,
          y: height * 0.2,
        },
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(cardFlipAnimation, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          setIsCardRevealed(true);
          setIsAnimating(false);
          setTimeout(() => {
            navigation.navigate('OneCardResult', { card: draggedCard });
          }, 1000);
        });
      });
    } else {
      Animated.spring(dragAnimation, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
      }).start();
    }

    setIsDragging(false);
    setDraggedCard(null);
  };

  const cardFlipInterpolate = cardFlipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.headingColor} />
        </Pressable>
        <Text style={styles.headerTitle}>One Card</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Vacant area */}
      <View style={styles.cardSlotContainer}>
        {selectedCard && isCardRevealed ? (
          <Animated.View
            style={[
              styles.revealedCard,
              { transform: [{ rotateY: cardFlipInterpolate }] },
            ]}
          >
            <Image
              source={{ uri: selectedCard.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </Animated.View>
        ) : (
          <View
            style={[
              styles.emptySlot,
              isDragging && styles.emptySlotHighlight,
            ]}
          >
            <Text style={styles.slotText}>
              {isDragging ? 'Drop here!' : 'Drag a card here'}
            </Text>
          </View>
        )}
      </View>

      {/* Dragged card following finger */}
      {isDragging && draggedCard && (
        <Animated.View
          style={[
            styles.draggedCard,
            {
              transform: [
                { translateX: dragAnimation.x },
                { translateY: dragAnimation.y },
              ],
            },
          ]}
        >
          <Image
            source={require('../../assets/card_back.png')}
            style={styles.draggedCardImage}
            resizeMode="cover"
          />
        </Animated.View>
      )}

      {/* Fanned Deck */}
      <View style={styles.fannedDeck}>
        {Array.from({ length: 40 }, (_, index) => {
          const totalCards = 40;
          const spreadAngle = 100;
          const startAngle = -spreadAngle / 2;
          const angleStep = spreadAngle / (totalCards - 1);
          const angle = startAngle + index * angleStep;
          const radians = (angle * Math.PI) / 180;

          const radius = width * 1.4;
          const centerX = width / 2;
          const centerY = height - 90;

          const x = centerX + radius * Math.sin(radians) - cardWidth / 2;
          const y = centerY - radius * Math.cos(radians) - cardHeight / 2;

          return (
            <PanGestureHandler
              key={index}
              onGestureEvent={handleDragMove}
              onHandlerStateChange={(event: any) => {
                if (event.nativeEvent.state === 2) {
                  const card = getRandomCard();
                  handleDragStart(card, event);
                } else if (event.nativeEvent.state === 5) {
                  handleDragEnd(event);
                }
              }}
              enabled={!isAnimating && !selectedCard}
            >
              <Animated.View
                style={[
                  styles.deckCard,
                  {
                    position: 'absolute',
                    left: x,
                    top: y,
                    transform: [{ rotate: `${angle}deg` }],
                    zIndex: totalCards - index,
                  },
                ]}
              >
                <Image
                  source={require('../../assets/card_back.png')}
                  style={styles.deckCardImage}
                  resizeMode="cover"
                />
              </Animated.View>
            </PanGestureHandler>
          );
        })}
      </View>
    </GestureHandlerRootView>
  );
}

const { width, height } = Dimensions.get('window');

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
  backButton: { padding: 8 },
  headerTitle: {
    color: colors.headingColor,
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: { width: 40 },
  cardSlotContainer: {
    position: 'absolute',
    top: height * 0.15,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    zIndex: 10,
  },
  emptySlot: {
    width: 160,
    height: 250,
    borderWidth: 2,
    borderColor: colors.lightText,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  emptySlotHighlight: {
    borderColor: colors.headingColor,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 3,
  },
  slotText: { color: colors.lightText, fontSize: 16 },
  revealedCard: { width: 160, height: 250, borderRadius: 12 },
  cardImage: { width: '100%', height: '100%', borderRadius: 12 },
  fannedDeck: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.45,
  },
  deckCard: {
    width: 90,
    height: 140,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  deckCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  draggedCard: {
    position: 'absolute',
    width: 90,
    height: 140,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 1000,
  },
  draggedCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
