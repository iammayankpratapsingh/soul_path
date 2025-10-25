import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';

type OneCardResultRouteProp = RouteProp<RootStackParamList, 'OneCardResult'>;
type OneCardResultNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Card {
  id: number;
  image: string;
  card_name: string;
  type: string;
  keywords: string;
  reversed_keywords: string;
}

export default function OneCardResultScreen() {
  const navigation = useNavigation<OneCardResultNavigationProp>();
  const route = useRoute<OneCardResultRouteProp>();
  const { card } = route.params;

  if (!card) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No card data available</Text>
        <Pressable 
          style={styles.backButton}
          onPress={() => {
            try {
              navigation.goBack();
            } catch (error) {
              console.error('Navigation error:', error);
            }
          }}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>Your Card</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card Image */}
        <View style={styles.cardContainer}>
          <Image 
            source={{ uri: card.image }} 
            style={styles.cardImage}
            resizeMode="cover"
            onError={(error) => console.log('Card image error:', error)}
          />
        </View>

        {/* Card Information */}
        <View style={styles.cardInfoContainer}>
          <Text style={styles.cardName}>{card.card_name}</Text>
          <Text style={styles.cardType}>{card.type}</Text>
          
          <View style={styles.keywordsContainer}>
            <Text style={styles.keywordsTitle}>Key Meanings</Text>
            <View style={styles.keywordsWrapper}>
              {card.keywords.split(', ').map((keyword, index) => (
                <View key={index} style={styles.keywordTag}>
                  <Text style={styles.keywordText}>{keyword.trim()}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.guidanceContainer}>
            <Text style={styles.guidanceTitle}>Your Reading</Text>
            <Text style={styles.guidanceText}>
              The {card.card_name} card brings you guidance through {card.keywords.toLowerCase()}. 
              This energy supports your current path and offers clarity for your situation.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.newReadingButton}
          onPress={() => {
            try {
              navigation.navigate('OneCardDraw');
            } catch (error) {
              console.error('Navigation error:', error);
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Get a new reading"
        >
            <Text style={styles.newReadingButtonText}>New Reading</Text>
          </Pressable>
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
  cardContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  buttonContainer: {
    alignItems: 'center',
  },
  newReadingButton: {
    backgroundColor: colors.headingColor,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  newReadingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightPink,
    padding: 20,
  },
  errorText: {
    color: colors.headingColor,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: colors.headingColor,
    fontSize: 16,
    fontWeight: '600',
  },
});
