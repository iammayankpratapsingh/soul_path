import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SpreadCard from '../components/SpreadCard';
import Header from '../components/Header';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList, RootStackParamList } from '../navigation/RootNavigator';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const spreads = [
  {
    title: 'Daily Reading',
    description:
      'A special reading that gives you guidance for the day ahead. Perfect for daily insight and spiritual guidance.',
    isDaily: true,
  },
  {
    title: 'One Card',
    description:
      'A single-card draw for quick guidance. Ideal for daily insight or a direct answer to a focused question.',
    isOneCard: true,
  },
  {
    title: 'Two Cards',
    description:
      'Explores duality: situation vs. advice, you vs. them, or challenge vs. strength. Great for contrasts.',
  },
  {
    title: 'Three Cards',
    description:
      'Classic past–present–future snapshot. Reveals the thread of a story and the next best step forward.',
  },
  {
    title: 'Four Cards',
    description:
      'A balanced cross: mind, heart, body, and spirit. Surfaces what needs alignment to restore harmony.',
  },
  {
    title: 'Five Cards',
    description:
      'A deeper look at root cause, current energy, hidden influence, guidance, and likely outcome.',
  },
  {
    title: 'Six Cards',
    description:
      'Two rows of perspective: what you see and what lies beneath. Clarifies motives, patterns, and blind spots.',
  },
];

type HomeScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <View style={styles.container}>
      <Header title="Soul Path Lights" />

      {/* Background image removed as requested */}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {spreads.map((s) => (
          <SpreadCard 
            key={s.title} 
            title={s.title} 
            description={s.description}
            onPress={() => {
              if (s.isDaily) {
                navigation.navigate('DailyReading');
              } else if (s.isOneCard) {
                navigation.navigate('OneCardDraw');
              } else {
                navigation.navigate('SpreadReading', { spreadTitle: s.title });
              }
            }}
          />
        ))}
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
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 8,
  },
});


