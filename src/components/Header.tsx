import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import type { DrawerParamList } from '../navigation/RootNavigator';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={styles.header}>
      <Pressable 
        accessibilityRole="button" 
        onPress={() => navigation.openDrawer()} 
        hitSlop={12}
        style={styles.hamburgerButton}
      >
        <Ionicons name="menu" size={24} color={colors.gray} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <Pressable 
        accessibilityRole="button" 
        onPress={() => navigation.navigate('Settings')} 
        hitSlop={12}
        style={styles.settingsButton}
      >
        <Ionicons name="settings-sharp" size={22} color={colors.gray} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hamburgerButton: {
    padding: 4,
  },
  title: {
    color: colors.headingColor,
    fontSize: 28,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  settingsButton: {
    padding: 4,
  },
});
