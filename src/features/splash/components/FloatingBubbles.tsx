import React from 'react';
import { View } from 'react-native';
import { splashBubbles } from '../config/splashBubbles';
import { styles } from '../styles/splash.styles';

const FloatingBubbles = () => {
    return (
        <>
            {splashBubbles.map((bubble) => (
                <View
                    key={bubble.id}
                    style={[
                        styles.bubble,
                        {
                            top: bubble.top,
                            bottom: bubble.bottom,
                            left: bubble.left,
                            right: bubble.right,
                            width: bubble.width,
                            height: bubble.height,
                        },
                    ]}
                />
            ))}
        </>
    );
};

export default FloatingBubbles;