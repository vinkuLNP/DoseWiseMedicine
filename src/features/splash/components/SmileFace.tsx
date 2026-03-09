import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { smileFaceConfig } from '../config/smileFace.config';

const SmileFace = () => {
    const { width, height, viewBox, faceCenter, faceRadius, colors, paths } = smileFaceConfig;

    return (
        <Svg width={width} height={height} viewBox={viewBox}>
            <Circle cx={faceCenter} cy={faceCenter} r={faceRadius} fill={colors.face} />

            <Path
                d={paths.shine}
                stroke={colors.shine}
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
            />

            <Path
                d={paths.leftEye}
                stroke={colors.stroke}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
            />

            <Path
                d={paths.rightEye}
                stroke={colors.stroke}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
            />

            <Path
                d={paths.smile}
                stroke={colors.stroke}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
            />

            <Circle cx="19.5" cy="38" r="3.2" fill={colors.cheek} opacity="0.95" />
            <Circle cx="52.5" cy="38" r="3.2" fill={colors.cheek} opacity="0.95" />
        </Svg>
    );
};

export default SmileFace;