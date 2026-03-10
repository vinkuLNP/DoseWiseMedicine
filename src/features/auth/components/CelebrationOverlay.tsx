import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface CelebrationOverlayProps {
  isVisible: boolean;
  message?: string;
  onComplete?: () => void;
}

const { width, height } = Dimensions.get('window');
const PARTICLE_COLORS = ['#FF6B6B', '#F1C40F', '#1ABC9C', '#9B59B6', '#E91E63'];

type Piece = {
  id: number;
  left: number;
  color: string;
  drift: number;
  rotate: number;
};

export function CelebrationOverlay({
  isVisible,
  message = 'Great Job!',
  onComplete,
}: CelebrationOverlayProps) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0.5)).current;
  const cardTranslateY = useRef(new Animated.Value(50)).current;
  const titlePulse = useRef(new Animated.Value(1)).current;
  const confettiBaseY = useRef(new Animated.Value(height * 0.45)).current;

  const particles = useMemo<Piece[]>(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: Math.random() * width,
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        drift: (Math.random() - 0.5) * 220,
        rotate: Math.random() * 720,
      })),
    []
  );

  const particleAnimations = useRef(
    particles.map(() => ({
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      scale: new Animated.Value(0),
      opacity: new Animated.Value(1),
      rotate: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (!isVisible) return;

    overlayOpacity.setValue(0);
    cardScale.setValue(0.5);
    cardTranslateY.setValue(50);
    titlePulse.setValue(1);

    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        stiffness: 400,
        damping: 15,
        useNativeDriver: true,
      }),
      Animated.spring(cardTranslateY, {
        toValue: 0,
        stiffness: 400,
        damping: 15,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(titlePulse, {
          toValue: 1.08,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titlePulse, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    particleAnimations.forEach((anim, index) => {
      anim.translateY.setValue(0);
      anim.translateX.setValue(0);
      anim.scale.setValue(0);
      anim.opacity.setValue(1);
      anim.rotate.setValue(0);

      Animated.parallel([
        Animated.timing(anim.translateY, {
          toValue: -140 - Math.random() * 80,
          duration: 700,
          delay: index * 20,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateX, {
          toValue: particles[index].drift,
          duration: 1100,
          delay: index * 20,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(anim.scale, {
            toValue: 1,
            duration: 250,
            delay: index * 20,
            useNativeDriver: true,
          }),
          Animated.timing(anim.scale, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 300,
            delay: index * 20,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(anim.rotate, {
          toValue: 1,
          duration: 1200,
          delay: index * 20,
          useNativeDriver: true,
        }),
      ]).start();
    });

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (onComplete) {
      timer = setTimeout(onComplete, 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [
    cardScale,
    cardTranslateY,
    isVisible,
    onComplete,
    overlayOpacity,
    particleAnimations,
    particles,
    titlePulse,
  ]);

  if (!isVisible) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
      <View style={styles.particlesLayer}>
        {particles.map((particle, i) => {
          const anim = particleAnimations[i];
          const rotate = anim.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', `${particle.rotate}deg`],
          });

          return (
            <Animated.View
              key={particle.id}
              style={[
                styles.confettiPiece,
                {
                  left: particle.left,
                  backgroundColor: particle.color,
                  opacity: anim.opacity,
                  transform: [
                    { translateX: anim.translateX },
                    { translateY: Animated.add(anim.translateY, confettiBaseY) },
                    { scale: anim.scale },
                    { rotate },
                  ],
                },
              ]}
            />
          );
        })}
      </View>

      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: cardScale }, { translateY: cardTranslateY }],
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.message,
            {
              transform: [{ scale: titlePulse }],
            },
          ]}
        >
          {message}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particlesLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confettiPiece: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  card: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#FACC15',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  message: {
    fontSize: 28,
    fontWeight: '900',
    color: '#A855F7',
    textAlign: 'center',
  },
});