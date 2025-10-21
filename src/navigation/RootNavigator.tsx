import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import SettingsScreen from '../screens/SettingsScreen';
import SpreadReadingScreen from '../screens/SpreadReadingScreen';
import DrawerContent from '../components/DrawerContent';
import { colors } from '../theme/colors';

export type RootStackParamList = {
  MainDrawer: undefined;
  SpreadReading: { spreadTitle: string };
};

export type DrawerParamList = {
  Tabs: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        // Ensure drawer panel itself is opaque
        drawerStyle: {
          width: 280,
          backgroundColor: colors.lightPink,
        },
        // Ensure the content container used by DrawerContent is also opaque
        drawerContentStyle: {
          backgroundColor: colors.lightPink,
        },
        drawerActiveTintColor: colors.pink,
        drawerInactiveTintColor: colors.gray,
        swipeEnabled: true,
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      <Stack.Screen name="SpreadReading" component={SpreadReadingScreen} />
    </Stack.Navigator>
  );
}


