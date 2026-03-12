import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

export const useSignUpAnimations = () => {
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoTranslateY = useRef(new Animated.Value(24)).current;

    const mascotOpacity = useRef(new Animated.Value(0)).current;
    const mascotTranslateY = useRef(new Animated.Value(24)).current;

    const bannerOpacity = useRef(new Animated.Value(0)).current;
    const bannerTranslateY = useRef(new Animated.Value(24)).current;

    const mascotFloat = useRef(new Animated.Value(0)).current;
    const mascotRotate = useRef(new Animated.Value(0)).current;
    const formOpacity = useRef(new Animated.Value(0)).current;
    const formTranslateY = useRef(new Animated.Value(24)).current;

    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const buttonTranslateY = useRef(new Animated.Value(24)).current;

    const termsOpacity = useRef(new Animated.Value(0)).current;
    const termsTranslateY = useRef(new Animated.Value(24)).current;

    const dividerOpacity = useRef(new Animated.Value(0)).current;
    const dividerTranslateY = useRef(new Animated.Value(24)).current;

    const loginOpacity = useRef(new Animated.Value(0)).current;
    const loginTranslateY = useRef(new Animated.Value(24)).current;

    const bottomOpacity = useRef(new Animated.Value(0)).current;
    const bottomTranslateY = useRef(new Animated.Value(24)).current;

    useEffect(() => {
        const sections = [
            { opacity: logoOpacity, translateY: logoTranslateY, delay: 100 },
            { opacity: mascotOpacity, translateY: mascotTranslateY, delay: 200 },
            { opacity: bannerOpacity, translateY: bannerTranslateY, delay: 300 }, { opacity: formOpacity, translateY: formTranslateY, delay: 400 },
            { opacity: buttonOpacity, translateY: buttonTranslateY, delay: 500 },
            { opacity: termsOpacity, translateY: termsTranslateY, delay: 600 },
            { opacity: dividerOpacity, translateY: dividerTranslateY, delay: 700 },
            { opacity: loginOpacity, translateY: loginTranslateY, delay: 800 },
            { opacity: bottomOpacity, translateY: bottomTranslateY, delay: 900 },
        ];

        const timers = sections.map(section =>
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(section.opacity, {
                        toValue: 1,
                        duration: 380,
                        useNativeDriver: true,
                    }),
                    Animated.spring(section.translateY, {
                        toValue: 0,
                        stiffness: 300,
                        damping: 24,
                        mass: 1,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, section.delay)
        );

        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(mascotFloat, {
                        toValue: -8,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(mascotFloat, {
                        toValue: 0,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(mascotRotate, {
                        toValue: 1,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(mascotRotate, {
                        toValue: 0,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();

        return () => timers.forEach(clearTimeout);
    }, [bannerOpacity,
        bannerTranslateY,
        bottomOpacity,
        bottomTranslateY,
        buttonOpacity,
        buttonTranslateY,
        dividerOpacity,
        dividerTranslateY,
        formOpacity,
        formTranslateY,
        loginOpacity,
        loginTranslateY,
        logoOpacity,
        logoTranslateY,
        mascotFloat,
        mascotOpacity,
        mascotRotate,
        mascotTranslateY,
        termsOpacity,
        termsTranslateY,]);

    return {
        logoOpacity,
        logoTranslateY,
        mascotOpacity,
        mascotTranslateY,
        bannerOpacity,
        bannerTranslateY,
        mascotFloat,
        mascotRotate,
        bottomOpacity,
        bottomTranslateY,
        buttonOpacity,
        buttonTranslateY,
        dividerOpacity,
        dividerTranslateY,
        formOpacity,
        formTranslateY,
        loginOpacity,
        loginTranslateY,
        termsOpacity,
        termsTranslateY,
    };
};