import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Achievement } from '../domain/entities/achievement';

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  const { unlocked, icon, title } = achievement;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const starScale = useRef(new Animated.Value(0)).current;
  const hoverLift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();

    if (unlocked) {
      Animated.spring(starScale, {
        toValue: 1,
        delay: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [opacityAnim, scaleAnim, starScale, unlocked]);

  const getIcon = () => {
    switch (icon) {
      case 'streak':
        return '⚡';
      case 'perfect':
        return '⭐';
      case 'master':
        return '👑';
      default:
        return '🏆';
    }
  };

  const getColors = () => {
    if (!unlocked) {
      return {
        bg: '#E5E7EB',
        text: '#9CA3AF',
        border: '#D1D5DB',
        inner: '#D1D5DB',
      };
    }

    switch (icon) {
      case 'streak':
        return {
          bg: '#FEF9C3',
          text: '#CA8A04',
          border: '#FDE68A',
          inner: '#FFFFFF99',
        };
      case 'perfect':
        return {
          bg: '#F3E8FF',
          text: '#9333EA',
          border: '#E9D5FF',
          inner: '#FFFFFF99',
        };
      case 'master':
        return {
          bg: '#FCE7F3',
          text: '#DB2777',
          border: '#FBCFE8',
          inner: '#FFFFFF99',
        };
      default:
        return {
          bg: '#CCFBF1',
          text: '#0F766E',
          border: '#99F6E4',
          inner: '#FFFFFF99',
        };
    }
  };

  const colors = getColors();

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          opacity: unlocked ? opacityAnim : 0.7,
          transform: [{ scale: scaleAnim }, { translateY: hoverLift }],
        },
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: unlocked ? colors.inner : '#D1D5DB',
          },
        ]}
      >
        <Text style={[styles.icon, { color: colors.text }]}>{getIcon()}</Text>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      {!unlocked && achievement.maxProgress > 1 && (
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
              },
            ]}
          />
        </View>
      )}

      {unlocked && (
        <Animated.View
          style={[
            styles.unlockBadge,
            {
              transform: [{ scale: starScale }],
            },
          ]}
        >
          <Text style={styles.unlockStar}>⭐</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    minHeight: 120,
    justifyContent: 'center',
  },
  iconWrap: {
    padding: 8,
    borderRadius: 999,
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 16,
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#D1D5DB',
    borderRadius: 999,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6B7280',
    borderRadius: 999,
  },
  unlockBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FACC15',
    borderRadius: 999,
    padding: 4,
  },
  unlockStar: {
    fontSize: 10,
    color: '#FFFFFF',
  },
});