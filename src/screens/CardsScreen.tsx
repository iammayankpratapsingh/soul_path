import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import CardItem from '../components/CardItem';
import { colors } from '../theme/colors';
import cardsData from '../../assets/cards.json';

type CardData = {
  id: number;
  image: string;
  card_name: string;
  type: string;
  keywords: string;
  reversed_keywords: string;
};

export default function CardsScreen() {
  const navigation = useNavigation();
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    setCards(cardsData);
  }, []);

  const handleCardPress = (card: CardData) => {
    (navigation as any).navigate('CardDetail', { card });
  };

  const renderCard = ({ item }: { item: CardData }) => (
    <CardItem 
      card={item} 
      onPress={() => handleCardPress(item)}
    />
  );

  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  return (
    <View style={styles.container}>
      <Header title="Cards" />
      
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray,
    marginHorizontal: 16,
    opacity: 0.6,
  },
});