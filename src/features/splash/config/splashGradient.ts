import { colors } from '../../../core/theme/colors';
import type { GradientPoint } from '../types/splash.types';

export const splashGradientColors =
    colors.splashGradient;

export const splashGradientLocations = [0.0, 0.12, 0.32, 0.58, 1] as const;

export const splashGradientStart: GradientPoint = { x: 0.32, y: 0.08 };
export const splashGradientEnd: GradientPoint = { x: 0.7, y: 1.02 };