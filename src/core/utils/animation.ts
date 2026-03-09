import { Animated, Easing } from 'react-native';

interface PulseAnimationParams {
    value: Animated.Value;
    minValue: number;
    maxValue: number;
    duration: number;
    delay?: number;
}

interface FloatAnimationParams {
    value: Animated.Value;
    upValue: number;
    duration: number;
}

export const createPulseAnimation = ({
    value,
    minValue,
    maxValue,
    duration,
    delay = 0,
}: PulseAnimationParams): Animated.CompositeAnimation => {
    return Animated.loop(
        Animated.sequence([
            Animated.delay(delay),
            Animated.timing(value, {
                toValue: maxValue,
                duration,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(value, {
                toValue: minValue,
                duration,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ]),
    );
};

export const createFloatAnimation = ({
    value,
    upValue,
    duration,
}: FloatAnimationParams): Animated.CompositeAnimation => {
    return Animated.loop(
        Animated.sequence([
            Animated.timing(value, {
                toValue: upValue,
                duration,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(value, {
                toValue: 0,
                duration,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
            }),
        ]),
    );
};