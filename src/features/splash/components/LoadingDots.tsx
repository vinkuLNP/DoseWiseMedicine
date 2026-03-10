import React from 'react';
import { Animated, View } from 'react-native';
import { styles } from '../styles/splash.styles';

interface LoadingDotsProps {
    dot1: Animated.Value;
    dot2: Animated.Value;
    dot3: Animated.Value;
}

const LoadingDots = ({ dot1, dot2, dot3 }: LoadingDotsProps) => {
    return (
        <View style={styles.dotsRow}>
            <Animated.View
                style={[
                    styles.dot,
                    {
                        opacity: dot1,
                        transform: [{ scale: dot1 }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.dot,
                    styles.dotSpacing,
                    {
                        opacity: dot2,
                        transform: [{ scale: dot2 }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.dot,
                    {
                        opacity: dot3,
                        transform: [{ scale: dot3 }],
                    },
                ]}
            />
        </View>
    );
};

export default LoadingDots;