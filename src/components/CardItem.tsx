import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { colors } from '../theme/colors';

type CardData = {
  id: number;
  image: string;
  card_name: string;
  type: string;
  keywords: string;
  reversed_keywords: string;
};

type Props = {
  card: CardData;
  onPress?: () => void;
};

export default function CardItem({ card, onPress }: Props) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${card.card_name} card`}
    >
      <View style={styles.content}>
        <Image 
          source={{ uri: card.image }} 
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.textContent}>
          <Text style={styles.cardName}>{card.card_name}</Text>
          <Text style={styles.cardType}>{card.type}</Text>
          <Text style={styles.keywords} numberOfLines={2}>
            {card.keywords}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pressed: {
    backgroundColor: colors.pink,
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: colors.lightPink,
  },
  textContent: {
    flex: 1,
  },
  cardName: {
    color: colors.headingColor,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardType: {
    color: colors.gray,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  keywords: {
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 20,
  },
});
