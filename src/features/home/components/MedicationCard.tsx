import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {  THEME_COLORS } from '../../splash/types/types';
import { PillCharacter } from '../../splash/components/PillCharacter';
import { Medication } from '../domain/entities/medication';

interface MedicationCardProps {
  medication: Medication;
  onToggle: (id: string) => void;
}

export function MedicationCard({ medication, onToggle }: MedicationCardProps) {
  const { id, name, dosage, time, status, color } = medication;
  const isTaken = status === 'taken';
  const hexColor = THEME_COLORS[color];

  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const checkScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityAnim, scaleAnim]);

  useEffect(() => {
    if (isTaken) {
      checkScale.setValue(1);
      Animated.sequence([
        Animated.timing(checkScale, {
          toValue: 1.2,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(checkScale, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [checkScale, isTaken]);

  return (
    <Pressable
      onPress={() => onToggle(id)}
      onPressIn={() => {
        Animated.spring(pressScale, {
          toValue: 0.98,
          useNativeDriver: true,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(pressScale, {
          toValue: 1.02,
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
          isTaken ? styles.cardTaken : styles.cardPending,
          {
            borderColor: isTaken ? 'transparent' : `${hexColor}30`,
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }, { scale: pressScale }],
          },
        ]}
      >
        {!isTaken && (
          <View
            style={[
              styles.bgBlob,
              {
                backgroundColor: hexColor,
              },
            ]}
          />
        )}

        <View style={styles.row}>
          <View style={styles.leftRow}>
            <View style={[styles.characterWrap, isTaken ? styles.characterWrapTaken : styles.characterWrapPending]}>
              <PillCharacter color={color} status={status} size={48} />
            </View>

            <View>
              <Text style={[styles.name, isTaken && styles.nameTaken]}>
                {name}
              </Text>
              <Text style={[styles.dosage, isTaken && styles.mutedTaken]}>
                {dosage}
              </Text>
              <View style={styles.timeRow}>
                <Text style={styles.clock}>🕒</Text>
                <Text style={[styles.time, isTaken && styles.mutedTaken]}>
                  {time}
                </Text>
              </View>
            </View>
          </View>

          <Animated.View
            style={[
              styles.statusCircle,
              isTaken ? styles.statusTaken : styles.statusPending,
              {
                transform: [{ scale: checkScale }],
              },
            ]}
          >
            {isTaken ? (
              <Text style={styles.check}>✓</Text>
            ) : (
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: hexColor,
                  },
                ]}
              />
            )}
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  cardPending: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  cardTaken: {
    backgroundColor: '#F3F4F6',
  },
  bgBlob: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 999,
    opacity: 0.1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  characterWrap: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  characterWrapPending: {
    backgroundColor: '#F9FAFB',
  },
  characterWrapTaken: {
    backgroundColor: '#E5E7EB',
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },
  nameTaken: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  dosage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  mutedTaken: {
    color: '#9CA3AF',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  clock: {
    fontSize: 12,
    marginRight: 4,
  },
  time: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9CA3AF',
  },
  statusCircle: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  statusTaken: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  statusPending: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  check: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '900',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    opacity: 0.2,
  },
});