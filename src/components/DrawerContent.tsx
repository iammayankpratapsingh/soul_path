import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import Lotus from '../../assets/svg/lotus.svg';

export default function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <View style={styles.container}>
      {/* Lotus Background */}
      <View pointerEvents="none" style={styles.lotusWrapper}>
        <Lotus width={240} height={240} style={styles.lotusBackground} />
      </View>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={colors.pink} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Soul Seeker</Text>
              <Text style={styles.userEmail}>seeker@soulpath.com</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              props.navigation.navigate('Tabs');
              props.navigation.closeDrawer();
            }}
          >
            <Ionicons name="home-outline" size={20} color={colors.gray} />
            <Text style={styles.menuText}>Home</Text>
          </Pressable>

          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              props.navigation.navigate('Settings');
              props.navigation.closeDrawer();
            }}
          >
            <Ionicons name="settings-outline" size={20} color={colors.gray} />
            <Text style={styles.menuText}>Settings</Text>
          </Pressable>

          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              // Handle profile navigation
              props.navigation.closeDrawer();
            }}
          >
            <Ionicons name="person-outline" size={20} color={colors.gray} />
            <Text style={styles.menuText}>Profile</Text>
          </Pressable>

          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              // Handle help navigation
              props.navigation.closeDrawer();
            }}
          >
            <Ionicons name="help-circle-outline" size={20} color={colors.gray} />
            <Text style={styles.menuText}>Help & Support</Text>
          </Pressable>

          <Pressable 
            style={styles.menuItem}
            onPress={() => {
              // Handle about navigation
              props.navigation.closeDrawer();
            }}
          >
            <Ionicons name="information-circle-outline" size={20} color={colors.gray} />
            <Text style={styles.menuText}>About</Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer */}
        <View style={styles.footer}>
          <Pressable 
            style={styles.logoutButton}
            onPress={() => {
              // Handle logout
              props.navigation.closeDrawer();
            }}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.pink} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightPink,
    position: 'relative',
  },
  lotusWrapper: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 0,
  },
  lotusBackground: {
    opacity: 0.5,
  },
  scrollContent: {
    flexGrow: 1,
    zIndex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.pink,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.headingColor,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.lightText,
  },
  menuSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuText: {
    fontSize: 16,
    color: colors.gray,
    marginLeft: 15,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.pink,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    color: colors.pink,
    marginLeft: 15,
    fontWeight: '600',
  },
});
