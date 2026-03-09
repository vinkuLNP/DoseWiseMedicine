import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { NUMBERS } from '../../../core/constants/numbers';
import { createFloatAnimation, createPulseAnimation } from '../../../core/utils/animation';

export const useSplashAnimations = () => {
  const dot1 = useRef(new Animated.Value(NUMBERS.dotMinOpacity)).current;
  const dot2 = useRef(new Animated.Value(NUMBERS.dotMinOpacity)).current;
  const dot3 = useRef(new Animated.Value(NUMBERS.dotMinOpacity)).current;
  const faceFloat = useRef(new Animated.Value(0)).current;

  const appNameTranslateY = useRef(new Animated.Value(-30)).current;
  const appNameOpacity = useRef(new Animated.Value(0)).current;
  const appNameScale = useRef(new Animated.Value(0.8)).current;

  const subLineTranslateY = useRef(new Animated.Value(-20)).current;
  const subLineOpacity = useRef(new Animated.Value(0)).current;
  const subLineScale = useRef(new Animated.Value(0.9)).current;

  const faceEntryTranslateY = useRef(new Animated.Value(60)).current;
  const faceEntryOpacity = useRef(new Animated.Value(0)).current;
  const faceEntryScale = useRef(new Animated.Value(0.6)).current;

  const textBlockTranslateY = useRef(new Animated.Value(20)).current;
  const textBlockOpacity = useRef(new Animated.Value(0)).current;

  const chipsTranslateY = useRef(new Animated.Value(16)).current;
  const chipsOpacity = useRef(new Animated.Value(0)).current;

  const footerTranslateY = useRef(new Animated.Value(0)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let continuousAnimation: Animated.CompositeAnimation | null = null;

    timers.push(
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(appNameOpacity, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.timing(appNameTranslateY, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.spring(appNameScale, {
            toValue: 1,
            friction: 7,
            tension: 70,
            useNativeDriver: true,
          }),
        ]).start();
      }, 200)
    );

    timers.push(
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(subLineOpacity, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.timing(subLineTranslateY, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.spring(subLineScale, {
            toValue: 1,
            friction: 7,
            tension: 70,
            useNativeDriver: true,
          }),
        ]).start();
      }, 300)
    );

    timers.push(
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(faceEntryOpacity, {
            toValue: 1,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.timing(faceEntryTranslateY, {
            toValue: 0,
            duration: 450,
            useNativeDriver: true,
          }),
          Animated.spring(faceEntryScale, {
            toValue: 1,
            friction: 7,
            tension: 70,
            useNativeDriver: true,
          }),
        ]).start();
      }, 350)
    );

    timers.push(
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(textBlockOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textBlockTranslateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
      }, 600)
    );

    timers.push(
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(chipsOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(chipsTranslateY, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]).start();
      }, 750)
    );

    timers.push(
      setTimeout(() => {
        Animated.timing(footerOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }).start(() => {
          continuousAnimation = Animated.parallel([
            createPulseAnimation({
              value: dot1,
              minValue: NUMBERS.dotMinOpacity,
              maxValue: NUMBERS.dotMaxOpacity,
              duration: 360,
              delay: 0,
            }),
            createPulseAnimation({
              value: dot2,
              minValue: NUMBERS.dotMinOpacity,
              maxValue: NUMBERS.dotMaxOpacity,
              duration: 360,
              delay: 120,
            }),
            createPulseAnimation({
              value: dot3,
              minValue: NUMBERS.dotMinOpacity,
              maxValue: NUMBERS.dotMaxOpacity,
              duration: 360,
              delay: 240,
            }),
            createFloatAnimation({
              value: faceFloat,
              upValue: -6,
              duration: 1200,
            }),
          ]);

          continuousAnimation.start();
        });
      }, 900)
    );

    return () => {
      timers.forEach(clearTimeout);

      appNameTranslateY.stopAnimation();
      appNameOpacity.stopAnimation();
      appNameScale.stopAnimation();

      subLineTranslateY.stopAnimation();
      subLineOpacity.stopAnimation();
      subLineScale.stopAnimation();

      faceEntryTranslateY.stopAnimation();
      faceEntryOpacity.stopAnimation();
      faceEntryScale.stopAnimation();

      textBlockTranslateY.stopAnimation();
      textBlockOpacity.stopAnimation();

      chipsTranslateY.stopAnimation();
      chipsOpacity.stopAnimation();

      footerTranslateY.stopAnimation();
      footerOpacity.stopAnimation();

      dot1.stopAnimation();
      dot2.stopAnimation();
      dot3.stopAnimation();
      faceFloat.stopAnimation();

      continuousAnimation?.stop();
    };
  }, [
    appNameTranslateY,
    appNameOpacity,
    appNameScale,
    subLineTranslateY,
    subLineOpacity,
    subLineScale,
    faceEntryTranslateY,
    faceEntryOpacity,
    faceEntryScale,
    textBlockTranslateY,
    textBlockOpacity,
    chipsTranslateY,
    chipsOpacity,
    footerTranslateY,
    footerOpacity,
    dot1,
    dot2,
    dot3,
    faceFloat,
  ]);

  return {
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
    footerTranslateY,
  };
};