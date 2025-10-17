import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.text}>Coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: colors.headingColor,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  text: {
    color: colors.lightText,
    fontSize: 16,
  },
});


