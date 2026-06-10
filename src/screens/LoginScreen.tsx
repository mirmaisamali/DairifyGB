import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Button from '../components/Button';
import Colors from '../constants/colors';
import Spacing from '../constants/spacing';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/DairifyGBLogo.jpeg')}
            style={styles.logoSmall}
            resizeMode="contain"
          />
          <Text style={styles.appName}>DairifyGB</Text>
          <Text style={styles.tagline}>From GB Farms to Your Family.</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.welcomeTitle}>Welcome Back 👋</Text>
          <Text style={styles.welcomeSub}>
            Sign in to order fresh dairy from Gilgit-Baltistan.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPrefix}>🇵🇰 +92</Text>
              <TextInput
                style={styles.input}
                placeholder="3XX XXXXXXX"
                placeholderTextColor={Colors.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={[styles.inputWrapper, styles.inputSingle]}
              placeholder="Enter your password"
              placeholderTextColor={Colors.textMuted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.forgotRow}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            label="Get Started →"
            onPress={() => navigation.replace('Main')}
            size="lg"
            style={styles.ctaBtn}
          />

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={() => navigation.replace('Main')}
            activeOpacity={0.8}
          >
            <Text style={styles.socialBtnText}>📱  Continue as Guest</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          By continuing, you agree to our Terms of Service.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.background },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: Spacing.xl,
    gap: 8,
  },
  logoSmall: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginBottom: 4,
  },
  appName: {
    fontSize: Spacing.font.xxl,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  welcomeTitle: {
    fontSize: Spacing.font.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  welcomeSub: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: -8,
  },
  inputGroup: { gap: 6 },
  inputLabel: {
    fontSize: Spacing.font.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Spacing.radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 52,
  },
  inputPrefix: {
    fontSize: Spacing.font.sm,
    color: Colors.textSecondary,
    marginRight: 8,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    fontSize: Spacing.font.md,
    color: Colors.textPrimary,
  },
  inputSingle: {
    fontSize: Spacing.font.md,
    color: Colors.textPrimary,
  },
  forgotRow: { alignItems: 'flex-end', marginTop: -8 },
  forgotText: {
    fontSize: Spacing.font.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  ctaBtn: { marginTop: 4 },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: {
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  socialBtn: {
    borderRadius: Spacing.radius.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialBtnText: {
    fontSize: Spacing.font.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  footer: {
    textAlign: 'center',
    fontSize: Spacing.font.xs,
    color: Colors.textMuted,
    marginTop: Spacing.lg,
  },
});
