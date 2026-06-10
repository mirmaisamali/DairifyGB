import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Colors from '../constants/colors';
import Spacing from '../constants/spacing';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/images/DairifyGBLogo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.logoRing} />
      </View>

      <Text style={styles.appName}>DairifyGB</Text>
      <Text style={styles.slogan}>From GB Farms to Your Family.</Text>

      <View style={styles.tagRow}>
        <View style={styles.tag}><Text style={styles.tagText}>🏔️ Gilgit-Baltistan</Text></View>
        <View style={styles.tag}><Text style={styles.tagText}>🌿 100% Natural</Text></View>
      </View>

      <View style={styles.loader}>
        <View style={styles.loaderTrack}>
          <View style={styles.loaderFill} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
  },
  logoWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    zIndex: 1,
  },
  logoRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  appName: {
    fontSize: 38,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 1,
  },
  slogan: {
    fontSize: Spacing.font.lg,
    color: 'rgba(255,255,255,0.85)',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 26,
  },
  tagRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Spacing.radius.full,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  tagText: {
    color: Colors.white,
    fontSize: Spacing.font.sm,
    fontWeight: '600',
  },
  loader: {
    position: 'absolute',
    bottom: 60,
    width: 140,
  },
  loaderTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    width: '70%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
});
