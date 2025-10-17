import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  description: string;
  onPress?: () => void;
};

export default function SpreadCard({ title, description, onPress }: Props) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} spread`}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pink,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  pressed: {
    backgroundColor: '#E8B8B8', // Slightly darker pink when pressed
    transform: [{ scale: 0.98 }], // Slight scale down effect
  },
  title: {
    color: colors.headingColor,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    color: colors.lightText,
    fontSize: 14,
    lineHeight: 20,
  },
});


