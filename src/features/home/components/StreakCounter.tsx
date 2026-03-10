import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface StreakCounterProps {
  days: number;
}

export function StreakCounter({ days }: StreakCounterProps) {
  const flameScale = useRef(new Animated.Value(1)).current;
  const flameRotate = useRef(new Animated.Value(0)).current;
  const dotScale = useRef(new Animated.Value(1)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(flameScale, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(flameScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(flameRotate, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(flameRotate, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    if (days > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotScale, {
            toValue: 1.5,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dotScale, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [days, dotScale, flameRotate, flameScale]);

  const rotate = flameRotate.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-5deg', '5deg', '-5deg'],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPressIn={() => {
        Animated.spring(pressScale, {
          toValue: 0.95,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(pressScale, {
          toValue: 1.05,
          useNativeDriver: true,
        }).start(() => {
          Animated.spring(pressScale, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        });
      }}
    >
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ scale: pressScale }],
          },
        ]}
      >
        <View style={styles.flameWrap}>
          <Animated.Text
            style={[
              styles.flame,
              {
                transform: [{ scale: flameScale }, { rotate }],
              },
            ]}
          >
            🔥
          </Animated.Text>

          {days > 0 && (
            <Animated.View
              style={[
                styles.dot,
                {
                  transform: [{ scale: dotScale }],
                },
              ]}
            />
          )}
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.days}>{days}</Text>
          <Text style={styles.label}>Day Streak</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FED7AA',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  flameWrap: {
    position: 'relative',
  },
  flame: {
    fontSize: 40,
  },
  dot: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#FACC15',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  textWrap: {
    marginTop: 4,
    alignItems: 'center',
  },
  days: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    lineHeight: 28,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: '#EA580C',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});