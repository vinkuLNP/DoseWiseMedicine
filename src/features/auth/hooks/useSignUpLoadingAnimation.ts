import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

export const useSignUpLoadingAnimations = (isLoading: boolean) => {
  const buttonPulse = useRef(new Animated.Value(1)).current;
  const loadingRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let pulseLoop: Animated.CompositeAnimation | null = null;
    let rotateLoop: Animated.CompositeAnimation | null = null;

    if (isLoading) {
      pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(buttonPulse, {
            toValue: 1.02,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(buttonPulse, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );

      rotateLoop = Animated.loop(
        Animated.timing(loadingRotate, {
          toValue: 1,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );

      pulseLoop.start();
      rotateLoop.start();
    } else {
      buttonPulse.stopAnimation();
      loadingRotate.stopAnimation();
      buttonPulse.setValue(1);
      loadingRotate.setValue(0);
    }

    return () => {
      pulseLoop?.stop();
      rotateLoop?.stop();
    };
  }, [buttonPulse, isLoading, loadingRotate]);

  return {
    buttonPulse,
    loadingRotate,
  };
};