import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SignInScreen() {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    console.log('Sign In:', { email, password });
    navigation.navigate('MainDrawer');
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In');
    navigation.navigate('MainDrawer');
  };

  const handleGuestContinue = () => {
    console.log('Continue as Guest');
    navigation.navigate('MainDrawer');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Background Abstract Shapes */}
        <View style={styles.backgroundShapes}>
          <View style={[styles.shape1, styles.abstractShape]} />
          <View style={[styles.shape2, styles.abstractShape]} />
          <View style={[styles.shape3, styles.abstractShape]} />
        </View>

        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Continue your sacred journey</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Email Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color={colors.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your e-mail"
                placeholderTextColor={colors.lightText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor={colors.lightText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={18} 
                  color={colors.gray} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Secondary Actions */}
        <View style={styles.secondaryActions}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.secondaryText}>
              Don't have an Account? <Text style={styles.linkText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Separator */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>Or</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Social Login */}
        <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
          <Ionicons name="logo-google" size={18} color="#4285F4" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        {/* Guest Option */}
        <TouchableOpacity style={styles.guestButton} onPress={handleGuestContinue}>
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>

        {/* Lotus Icon */}
        <View style={styles.lotusContainer}>
          <Image 
            source={require('../../assets/svg/light_lotus.png')} 
            style={styles.lotusIcon}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    zIndex: 0,
  },
  abstractShape: {
    position: 'absolute',
    backgroundColor: colors.lightPink,
    borderRadius: 100,
  },
  shape1: {
    width: 120,
    height: 120,
    top: 20,
    right: -30,
    transform: [{ rotate: '15deg' }],
  },
  shape2: {
    width: 80,
    height: 80,
    top: 60,
    left: -20,
    transform: [{ rotate: '-25deg' }],
  },
  shape3: {
    width: 100,
    height: 100,
    top: 100,
    right: 50,
    transform: [{ rotate: '45deg' }],
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 130,
    marginBottom: 30,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.headingColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.lightText,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 25,
    zIndex: 1,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray,
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.gray,
  },
  eyeIcon: {
    padding: 4,
  },
  primaryButton: {
    backgroundColor: colors.pink,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryActions: {
    alignItems: 'center',
    marginBottom: 25,
    zIndex: 1,
  },
  secondaryText: {
    fontSize: 15,
    color: colors.gray,
  },
  linkText: {
    color: colors.headingColor,
    fontWeight: '600',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    zIndex: 1,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  separatorText: {
    marginHorizontal: 16,
    fontSize: 15,
    color: colors.lightText,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
    zIndex: 1,
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 15,
    color: colors.gray,
    fontWeight: '500',
  },
  guestButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    zIndex: 1,
  },
  guestButtonText: {
    fontSize: 15,
    color: colors.gray,
    fontWeight: '500',
  },
  lotusContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    zIndex: 1,
  },
  lotusIcon: {
    width: 40,
    height: 40,
    opacity: 0.7,
  },
});
