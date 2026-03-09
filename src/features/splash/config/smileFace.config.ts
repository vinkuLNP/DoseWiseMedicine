import { colors } from '../../../core/theme/colors';

export const smileFaceConfig = {
    width: 92,
    height: 92,
    viewBox: '0 0 72 72',
    faceRadius: 36,
    faceCenter: 36,
    colors: {
        face: colors.face,
        shine: colors.white38,
        stroke: colors.faceStroke,
        cheek: colors.faceCheek,
    },
    paths: {
        shine: 'M18 19 C19 13, 24 10, 31 10 L41 10 C48 10, 53 13, 54 19',
        leftEye: 'M21 33 C23 30.5, 27 30.5, 29 33',
        rightEye: 'M43 33 C45 30.5, 49 30.5, 51 33',
        smile: 'M25 43 C29 47.5, 43 47.5, 47 43',
    },
} as const;