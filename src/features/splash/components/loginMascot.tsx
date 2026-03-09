import React from 'react';
import { View, StyleSheet } from 'react-native';

type LoginMascotProps = {
    size?: number;
};

export default function LoginMascot({ size = 120 }: LoginMascotProps) {
    const eyeSize = size * 0.16;
    const eyeGap = size * 0.18;
    const mouthWidth = size * 0.20;
    const mouthHeight = size * 0.065;

    const archWidth = size * 0.78;
    const archHeight = size * 0.25;
    const archThickness = Math.max(6, size * 0.075);

    return (
        <View
            style={[
                styles.wrapper,
                {
                    width: size,
                    height: size * 1.05,
                },
            ]}
        >
            {/* top faded arch */}
            <View
                style={[
                    styles.archWrap,
                    {
                        width: archWidth,
                        height: archHeight,
                        top: size * 0.04,
                    },
                ]}
            >
                <View
                    style={[
                        styles.archOuter,
                        {
                            borderTopLeftRadius: archWidth / 2,
                            borderTopRightRadius: archWidth / 2,
                            borderBottomLeftRadius: archWidth / 2,
                            borderBottomRightRadius: archWidth / 2,
                            borderWidth: archThickness,
                        },
                    ]}
                />
            </View>

            {/* eyes */}
            <View
                style={[
                    styles.eyesRow,
                    {
                        marginTop: size * 0.34,
                    },
                ]}
            >
                <View
                    style={[
                        styles.eye,
                        {
                            width: eyeSize,
                            height: eyeSize,
                            borderRadius: eyeSize / 2,
                            marginRight: eyeGap / 2,
                        },
                    ]}
                />
                <View
                    style={[
                        styles.eye,
                        {
                            width: eyeSize,
                            height: eyeSize,
                            borderRadius: eyeSize / 2,
                            marginLeft: eyeGap / 2,
                        },
                    ]}
                />
            </View>

            {/* mouth */}
            <View
                style={[
                    styles.mouth,
                    {
                        width: mouthWidth,
                        height: mouthHeight,
                        borderRadius: mouthHeight / 2,
                        marginTop: size * 0.12,
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        backgroundColor: 'transparent',
    },
    archWrap: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
    },
    archOuter: {
        width: '100%',
        height: '200%',
        borderColor: 'rgba(229, 231, 235, 0.35)',
        backgroundColor: 'transparent',
    },
    eyesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eye: {
        backgroundColor: '#2F3A40',
        shadowColor: '#111827',
        shadowOpacity: 0.16,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    mouth: {
        backgroundColor: '#2F3A40',
        shadowColor: '#111827',
        shadowOpacity: 0.10,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
});