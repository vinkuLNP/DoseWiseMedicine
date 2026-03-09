import React, { useEffect } from 'react';
import { Animated, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { STRINGS } from '../../../core/constants/strings';
import { colors } from '../../../core/theme/colors';
import FloatingBubbles from '../components/FloatingBubbles';
import LoadingDots from '../components/LoadingDots';
import SmileFace from '../components/SmileFace';
import {
  splashGradientColors,
  splashGradientEnd,
  splashGradientLocations,
  splashGradientStart,
} from '../config/splashGradient';
import { useSplashAnimations } from '../hooks/useSplashAnimations';
import { RootStackParamList, ROUTES } from '../../../core/navigation/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/splash.styles';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = () => {
  const {
    dot1,
    dot2,
    dot3,
    faceFloat,
    appNameOpacity,
    appNameTranslateY,
    appNameScale,
    subLineOpacity,
    subLineTranslateY,
    subLineScale,
    faceEntryOpacity,
    faceEntryTranslateY,
    faceEntryScale,
    textBlockOpacity,
    textBlockTranslateY,
    chipsOpacity,
    chipsTranslateY,
    footerOpacity,
  } = useSplashAnimations();

  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(ROUTES.Login);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.statusBarBackground} />

      <LinearGradient
        colors={[...splashGradientColors]}
        locations={[...splashGradientLocations]}
        start={splashGradientStart}
        end={splashGradientEnd}
        style={styles.gradient}
      >
        <FloatingBubbles />

        <View style={styles.container}>
          <View style={styles.topHandle} />

          <View style={styles.topSection}>
            <Animated.View
              style={{
                opacity: appNameOpacity,
                transform: [
                  { translateY: appNameTranslateY },
                  { scale: appNameScale },
                ],
              }}
            >
              <Text style={styles.appName}>{STRINGS.appName}</Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: subLineOpacity,
                transform: [
                  { translateY: subLineTranslateY },
                  { scale: subLineScale },
                ],
              }}
            >
              <Text style={styles.appSubEmoji}>{STRINGS.appEmoji}</Text>
            </Animated.View>
          </View>

          <View style={styles.middleSection}>
            <Animated.View
              style={[
                styles.faceOuter,
                {
                  opacity: faceEntryOpacity,
                  transform: [
                    { translateY: faceEntryTranslateY },
                    { scale: faceEntryScale },
                    { translateY: faceFloat },
                  ],
                },
              ]}
            >
              <SmileFace />
            </Animated.View>

            <Animated.View
              style={{
                opacity: textBlockOpacity,
                transform: [{ translateY: textBlockTranslateY }],
              }}
            >
              <View style={styles.textSection}>
                <Text style={styles.title}>{STRINGS.title}</Text>
                <Text style={styles.subtitle}>{STRINGS.subtitle}</Text>
              </View>
            </Animated.View>

            <Animated.View
              style={{
                opacity: chipsOpacity,
                transform: [{ translateY: chipsTranslateY }],
              }}
            >
              <View style={styles.chipsContainer}>
                <View style={styles.row}>
                  <View style={[styles.chip, styles.chipRight]}>
                    <Text style={styles.chipText}>{STRINGS.chipStreaks}</Text>
                  </View>

                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{STRINGS.chipAchievements}</Text>
                  </View>
                </View>

                <View style={[styles.row, styles.reminderRow]}>
                  <View style={styles.chip}>
                    <Text style={styles.chipText}>{STRINGS.chipReminders}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </View>

          <Animated.View
            style={[
              styles.footer,
              {
                opacity: footerOpacity,
              },
            ]}
          >
            <LoadingDots dot1={dot1} dot2={dot2} dot3={dot3} />
            <Text style={styles.footerText}>{STRINGS.footerLoading}</Text>
          </Animated.View>

          <View style={styles.bottomHandle} />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SplashScreen;
