import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import { colors } from '../theme/colors';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Header title="History" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.placeholderText}>History Screen</Text>
          <Text style={styles.descriptionText}>
            Your reading history will appear here.
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
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 8,
  },
  contentContainer: {
    backgroundColor: colors.pink,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  placeholderText: {
    color: colors.gray,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    color: colors.lightText,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
