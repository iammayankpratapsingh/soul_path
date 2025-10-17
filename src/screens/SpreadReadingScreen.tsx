import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type SpreadReadingRouteProp = RouteProp<RootStackParamList, 'SpreadReading'>;

export default function SpreadReadingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<SpreadReadingRouteProp>();
  const { spreadTitle } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={colors.headingColor} />
        </Pressable>
        <Text style={styles.headerTitle}>{spreadTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <Text style={styles.instructionText}>
            Focus on your question and tap the cards below to reveal your reading.
          </Text>
          
          {/* Placeholder for card positions */}
          <View style={styles.cardsGrid}>
            {Array.from({ length: getCardCount(spreadTitle) }, (_, index) => (
              <Pressable 
                key={index}
                style={styles.cardPlaceholder}
                onPress={() => {
                  // TODO: Implement card flip animation and reading
                  console.log(`Card ${index + 1} tapped`);
                }}
                accessibilityRole="button"
                accessibilityLabel={`Card ${index + 1}`}
              >
                <Ionicons name="card" size={32} color={colors.lightText} />
                <Text style={styles.cardNumber}>{index + 1}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function getCardCount(spreadTitle: string): number {
  const cardCounts: { [key: string]: number } = {
    'One Card': 1,
    'Two Cards': 2,
    'Three Cards': 3,
    'Four Cards': 4,
    'Five Cards': 5,
    'Six Cards': 6,
  };
  return cardCounts[spreadTitle] || 1;
}

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
    width: 40, // Same width as back button for centering
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  cardContainer: {
    backgroundColor: colors.pink,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  instructionText: {
    color: colors.gray,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  cardPlaceholder: {
    width: 80,
    height: 120,
    backgroundColor: colors.lightPink,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.lightText,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardNumber: {
    color: colors.lightText,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
});
