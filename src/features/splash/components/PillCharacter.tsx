import React from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';
import { THEME_COLORS } from '../types/types'; 
import { PillCharacterProps } from '../../home/data/pill_character_props';
import { STRINGS } from '../../../core/constants/strings';

export function PillCharacter({ color, status, size = 60 }: PillCharacterProps) {
  const hexColor = THEME_COLORS[color];

  const getExpression = (): 'happy' | 'sad' | 'idle' => {
    switch (status) {
      case STRINGS.taken:
        return STRINGS.happy;
      case STRINGS.skipped:
        return STRINGS.sad;
      default:
        return STRINGS.idle;
    }
  };

  const expression = getExpression();

  return (
    <Animated.View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <Path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50V50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50V50Z" fill={hexColor} />
        <Path d="M30 40C30 35 35 30 40 30H60C65 30 70 35 70 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.3" />
        <G transform="translate(0 5)">
          {expression === STRINGS.happy ? (
            <>
              <Path d="M35 45Q40 40 45 45" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
              <Path d="M55 45Q60 40 65 45" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : expression === STRINGS.sad ? (
            <>
              <Circle cx="40" cy="45" r="3" fill="#2D3436" />
              <Circle cx="60" cy="45" r="3" fill="#2D3436" />
              <Path d="M30 38L40 42" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
              <Path d="M70 38L60 42" stroke="#2D3436" strokeWidth="2" strokeLinecap="round" />
            </>
          ) : (
            <>
              <Circle cx="40" cy="45" r="4" fill="#2D3436" />
              <Circle cx="60" cy="45" r="4" fill="#2D3436" />
            </>
          )}

          {expression === STRINGS.happy ? (
            <Path d="M40 55Q50 65 60 55" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : expression === STRINGS.sad ? (
            <Path d="M40 60Q50 55 60 60" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : (
            <Path d="M45 60H55" stroke="#2D3436" strokeWidth="3" strokeLinecap="round" />
          )}

          {expression === STRINGS.happy && (
            <>
              <Circle cx="32" cy="52" r="3" fill="#FF9FF3" opacity="0.6" />
              <Circle cx="68" cy="52" r="3" fill="#FF9FF3" opacity="0.6" />
            </>
          )}
        </G>
      </Svg>
    </Animated.View>
  );
}