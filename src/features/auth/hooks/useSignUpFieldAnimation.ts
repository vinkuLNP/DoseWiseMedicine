import { useRef } from "react";
import { Animated } from "react-native";
import { SIGN_UP_FIELDS, SignUpFieldName } from "../constants/auth_constants";

export const useSignUpFieldAnimations = () => {
    const nameScale = useRef(new Animated.Value(1)).current;
    const emailScale = useRef(new Animated.Value(1)).current;
    const passwordScale = useRef(new Animated.Value(1)).current;
    const confirmPasswordScale = useRef(new Animated.Value(1)).current;

    const nameShake = useRef(new Animated.Value(0)).current;
    const emailShake = useRef(new Animated.Value(0)).current;
    const passwordShake = useRef(new Animated.Value(0)).current;
    const confirmPasswordShake = useRef(new Animated.Value(0)).current;

    const getScaleRef = (field: SignUpFieldName) => {
        switch (field) {
            case SIGN_UP_FIELDS.NAME:
                return nameScale;
            case SIGN_UP_FIELDS.EMAIL:
                return emailScale;
            case SIGN_UP_FIELDS.PASSWORD:
                return passwordScale;
            case SIGN_UP_FIELDS.CONFIRM_PASSWORD:
                return confirmPasswordScale;
        }
    };

    const getShakeRef = (field: SignUpFieldName) => {
        switch (field) {
            case SIGN_UP_FIELDS.NAME:
                return nameShake;
            case SIGN_UP_FIELDS.EMAIL:
                return emailShake;
            case SIGN_UP_FIELDS.PASSWORD:
                return passwordShake;
            case SIGN_UP_FIELDS.CONFIRM_PASSWORD:
                return confirmPasswordShake;
        }
    };
    const shakeField = (field: SignUpFieldName) => {
        const shake = getShakeRef(field);

        if (!shake) return;

        Animated.sequence([
            Animated.timing(shake, { toValue: 8, duration: 50, useNativeDriver: true }),
            Animated.timing(shake, { toValue: -8, duration: 50, useNativeDriver: true }),
            Animated.timing(shake, { toValue: 6, duration: 50, useNativeDriver: true }),
            Animated.timing(shake, { toValue: -6, duration: 50, useNativeDriver: true }),
            Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };
    const handleFocus = (field: SignUpFieldName) => {
        const scale = getScaleRef(field);

        if (!scale) return;

        Animated.spring(scale, {
            toValue: 1.01,
            stiffness: 400,
            damping: 25,
            useNativeDriver: true,
        }).start();
    };

    const handleBlur = (field: SignUpFieldName) => {
        const scale = getScaleRef(field);

        if (!scale) return;

        Animated.spring(scale, {
            toValue: 1,
            stiffness: 400,
            damping: 25,
            useNativeDriver: true,
        }).start();
    };

    return {
        nameScale,
        emailScale,
        passwordScale,
        confirmPasswordScale,

        nameShake,
        emailShake,
        passwordShake,
        confirmPasswordShake,

        shakeField,
        handleFocus,
        handleBlur,
    };
};