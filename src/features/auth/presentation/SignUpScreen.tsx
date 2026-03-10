import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Animated,
    Easing,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View, KeyboardAvoidingView,
    Platform

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PillCharacter } from '../../splash/components/PillCharacter';
import { CelebrationOverlay } from '../components/CelebrationOverlay';
import { RootStackParamList, ROUTES } from '../../../core/navigation/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signUpUser } from '../domain/usecases/sign_up_user';
import { Snackbar } from 'react-native-snackbar';
import { signUpStyles } from '../styles/signUpStyles';

type FieldName = 'name' | 'email' | 'password' | 'confirmPassword';


type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;
type ErrorState = Partial<Record<FieldName, string>>;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function SignUpScreen({
    navigation
}: SignUpScreenProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [focusedField, setFocusedField] = useState<FieldName | null>(null);
    const [errors, setErrors] = useState<ErrorState>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoTranslateY = useRef(new Animated.Value(24)).current;
    const [passwordStrength, setPasswordStrength] = useState(0);
    const mascotOpacity = useRef(new Animated.Value(0)).current;
    const mascotTranslateY = useRef(new Animated.Value(24)).current;

    const bannerOpacity = useRef(new Animated.Value(0)).current;
    const bannerTranslateY = useRef(new Animated.Value(24)).current;

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

    const mascotFloat = useRef(new Animated.Value(0)).current;
    const mascotRotate = useRef(new Animated.Value(0)).current;

    const buttonPulse = useRef(new Animated.Value(1)).current;
    const loadingRotate = useRef(new Animated.Value(0)).current;

    const nameScale = useRef(new Animated.Value(1)).current;
    const emailScale = useRef(new Animated.Value(1)).current;
    const passwordScale = useRef(new Animated.Value(1)).current;
    const confirmPasswordScale = useRef(new Animated.Value(1)).current;
    const nameShake = useRef(new Animated.Value(0)).current;
    const emailShake = useRef(new Animated.Value(0)).current;
    const passwordShake = useRef(new Animated.Value(0)).current;
    const confirmPasswordShake = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const sections = [
            { opacity: logoOpacity, translateY: logoTranslateY, delay: 100 },
            { opacity: mascotOpacity, translateY: mascotTranslateY, delay: 200 },
            { opacity: bannerOpacity, translateY: bannerTranslateY, delay: 300 },
            { opacity: formOpacity, translateY: formTranslateY, delay: 400 },
            { opacity: buttonOpacity, translateY: buttonTranslateY, delay: 500 },
            { opacity: termsOpacity, translateY: termsTranslateY, delay: 600 },
            { opacity: dividerOpacity, translateY: dividerTranslateY, delay: 700 },
            { opacity: loginOpacity, translateY: loginTranslateY, delay: 800 },
            { opacity: bottomOpacity, translateY: bottomTranslateY, delay: 900 },
        ];

        const timers = sections.map((section) =>
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

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [
        bannerOpacity,
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
        termsTranslateY,
    ]);
    const shakeField = (field: FieldName) => {
        let shake;

        switch (field) {
            case 'name':
                shake = nameShake;
                break;
            case 'email':
                shake = emailShake;
                break;
            case 'password':
                shake = passwordShake;
                break;
            case 'confirmPassword':
                shake = confirmPasswordShake;
                break;
        }

        Animated.sequence([
            Animated.timing(shake!, { toValue: 8, duration: 50, useNativeDriver: true }),
            Animated.timing(shake!, { toValue: -8, duration: 50, useNativeDriver: true }),
            Animated.timing(shake!, { toValue: 6, duration: 50, useNativeDriver: true }),
            Animated.timing(shake!, { toValue: -6, duration: 50, useNativeDriver: true }),
            Animated.timing(shake!, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };
    useEffect(() => {
        if (!isLoading) {
            buttonPulse.stopAnimation();
            loadingRotate.stopAnimation();
            buttonPulse.setValue(1);
            loadingRotate.setValue(0);
            return;
        }

        Animated.loop(
            Animated.sequence([
                Animated.timing(buttonPulse, {
                    toValue: 1.02,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonPulse, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        Animated.loop(
            Animated.timing(loadingRotate, {
                toValue: 1,
                duration: 600,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [buttonPulse, isLoading, loadingRotate]);

    const mascotRotation = mascotRotate.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['-2deg', '2deg', '-2deg'],
    });

    const loadingSpin = loadingRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const getScaleRef = (field: FieldName) => {
        switch (field) {
            case 'name':
                return nameScale;
            case 'email':
                return emailScale;
            case 'password':
                return passwordScale;
            case 'confirmPassword':
                return confirmPasswordScale;
        }
    };

    const handleFocus = (field: FieldName) => {
        setFocusedField(field);
        Animated.spring(getScaleRef(field), {
            toValue: 1.01,
            stiffness: 400,
            damping: 25,
            useNativeDriver: true,
        }).start();
    };

    const handleBlur = (field: FieldName) => {
        setFocusedField(null);
        Animated.spring(getScaleRef(field), {
            toValue: 1,
            stiffness: 400,
            damping: 25,
            useNativeDriver: true,
        }).start();
    };

    const validate = () => {
        const newErrors: ErrorState = {};

        if (!name.trim()) {
            newErrors.name = 'What should we call you? 🤔';
            shakeField('name');
        }

        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Need a valid email! 📧';
            shakeField('email');
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            newErrors.password =
                '6+ chars, 1 Capital, 1 Number & 1 Special 🔒';
            shakeField('password');
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match! 😅";
            shakeField('confirmPassword');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearFieldError = (field: FieldName) => {
        if (!errors[field]) return;
        setErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };
    const checkPasswordStrength = (value: string) => {
        let strength = 0;

        if (value.length >= 6) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[@$!%*?&]/.test(value)) strength++;

        setPasswordStrength(strength);
    };
    const handleSignUp = async () => {

        if (isLoading) return
        if (!validate()) return

        try {

            setIsLoading(true)

            await signUpUser(name, email, password)

            Snackbar.show({
                text: "📩 Verification email sent. Please verify before login.",
                duration: Snackbar.LENGTH_LONG,
            })

            navigation.navigate(ROUTES.Login)

        } catch (error: any) {

            Snackbar.show({
                text: error.message,
                duration: Snackbar.LENGTH_LONG,
            })

        } finally {
            setIsLoading(false)
        }
    }

    const handleCelebrationComplete = () => {
        setShowCelebration(false);
        navigation.replace(ROUTES.DashBoard);

    };

    const buttonColors = useMemo(
        () =>
            isLoading
                ? ['#8B5CF6', '#EC4899']
                : ['#7C3AED', '#EC4899', '#F97316'],
        [isLoading]
    );

    const renderError = (field: FieldName) => {
        if (!errors[field]) return null;

        return <Text style={signUpStyles.errorText}>{errors[field]}</Text>;
    };

    return (
        <SafeAreaView style={signUpStyles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F3FF" />

            <LinearGradient
                colors={['#EDE9FE', '#FDF2F8', '#FFF7ED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={signUpStyles.screenBg}
            >
                <View style={signUpStyles.wrapper}>
                    <View style={signUpStyles.phoneFrame}>
                        <View style={signUpStyles.topGradientBar} />

                        <View style={signUpStyles.notchWrap}>
                            <View style={signUpStyles.notch} />
                        </View>

                        <View style={[signUpStyles.blob, signUpStyles.blobViolet]} />
                        <View style={[signUpStyles.blob, signUpStyles.blobPink]} />
                        <View style={[signUpStyles.blob, signUpStyles.blobOrange]} />

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={{ flex: 1 }}
                        >

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={[
                                    signUpStyles.content,
                                    { paddingBottom: 120 }
                                ]}
                            >
                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        {
                                            opacity: logoOpacity,
                                            transform: [{ translateY: logoTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={signUpStyles.logoRow}>
                                        <Text style={signUpStyles.logoText}>PillPal</Text>
                                        <Text style={signUpStyles.logoEmoji}>💊</Text>
                                    </View>
                                    <Text style={signUpStyles.logoSubText}>Your streak starts today! ✨</Text>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        signUpStyles.centerSection,
                                        {
                                            opacity: mascotOpacity,
                                            transform: [{ translateY: mascotTranslateY }],
                                        },
                                    ]}
                                >
                                    <Animated.View
                                        style={{
                                            transform: [
                                                { translateY: mascotFloat },
                                                { rotate: mascotRotation },
                                            ],
                                        }}
                                    >
                                        <PillCharacter color="purple" status="pending" size={72} />
                                    </Animated.View>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        {
                                            opacity: bannerOpacity,
                                            transform: [{ translateY: bannerTranslateY }],
                                        },
                                    ]}
                                >
                                    <LinearGradient
                                        colors={['#8B5CF6', '#EC4899']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={signUpStyles.banner}
                                    >
                                        <View style={signUpStyles.bannerRow}>
                                            <Text style={signUpStyles.bannerIcon}>🚀</Text>

                                            <View style={signUpStyles.bannerTextWrap}>
                                                <Text style={signUpStyles.bannerTitle}>
                                                    Join 10,000+ streak champions
                                                </Text>
                                                <Text style={signUpStyles.bannerSubTitle}>
                                                    Build healthy habits, one day at a time
                                                </Text>
                                            </View>

                                            <View style={signUpStyles.bannerTag}>
                                                <Text style={signUpStyles.bannerTagIcon}>🔥</Text>
                                                <Text style={signUpStyles.bannerTagText}>FREE</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        {
                                            opacity: formOpacity,
                                            transform: [{ translateY: formTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={signUpStyles.formGroup}>
                                        <Text style={signUpStyles.label}>👤 Your Name</Text>
                                        <Animated.View style={{
                                            transform: [{ scale: nameScale }, { translateX: nameShake },
                                            ]
                                        }}>
                                            <TextInput
                                                value={name}
                                                onChangeText={(value) => {
                                                    setName(value);
                                                    clearFieldError('name');
                                                }}
                                                onFocus={() => handleFocus('name')}
                                                onBlur={() => handleBlur('name')}
                                                placeholder="Alex Johnson"
                                                placeholderTextColor="#9CA3AF"
                                                style={[
                                                    signUpStyles.input,
                                                    signUpStyles.violetInput,
                                                    errors.name && signUpStyles.errorInput,
                                                    focusedField === 'name' && signUpStyles.violetFocusedInput,
                                                ]}
                                            />
                                        </Animated.View>
                                        {renderError('name')}
                                    </View>

                                    <View style={signUpStyles.formGroup}>
                                        <Text style={signUpStyles.label}>📧 Email</Text>
                                        <Animated.View style={{
                                            transform: [{ scale: emailScale }, { translateX: emailShake },
                                            ]
                                        }}>
                                            <TextInput
                                                value={email}
                                                onChangeText={(value) => {
                                                    setEmail(value);
                                                    clearFieldError('email');
                                                }}
                                                onFocus={() => handleFocus('email')}
                                                onBlur={() => handleBlur('email')}
                                                placeholder="you@example.com"
                                                placeholderTextColor="#9CA3AF"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                style={[
                                                    signUpStyles.input,
                                                    signUpStyles.pinkInput,
                                                    errors.email && signUpStyles.errorInput,
                                                    focusedField === 'email' && signUpStyles.pinkFocusedInput,
                                                ]}
                                            />
                                        </Animated.View>
                                        {renderError('email')}
                                    </View>

                                    <View style={signUpStyles.formGroup}>
                                        <Text style={signUpStyles.label}>🔒 Password</Text>

                                        <Animated.View
                                            style={{
                                                transform: [
                                                    { scale: passwordScale },
                                                    { translateX: passwordShake },
                                                ],
                                            }}
                                        >
                                            <View style={{ position: 'relative' }}>
                                                <TextInput
                                                    value={password}
                                                    onChangeText={(value) => {
                                                        setPassword(value);
                                                        clearFieldError('password'); checkPasswordStrength(value);
                                                    }}
                                                    onFocus={() => handleFocus('password')}
                                                    onBlur={() => handleBlur('password')}
                                                    placeholder="••••••••"
                                                    placeholderTextColor="#9CA3AF"
                                                    secureTextEntry={!showPassword}
                                                    style={[
                                                        signUpStyles.input,
                                                        signUpStyles.orangeInput,
                                                        errors.password && signUpStyles.errorInput,
                                                        focusedField === 'password' && signUpStyles.orangeFocusedInput,
                                                        { paddingRight: 44 },
                                                    ]}
                                                />

                                                <TouchableOpacity
                                                    onPress={() => setShowPassword(!showPassword)}
                                                    style={signUpStyles.eyeIconWrapper}
                                                >
                                                    <Text style={signUpStyles.eyeIcon}>
                                                        {showPassword ? '🙈' : '👁'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Animated.View>

                                        {renderError('password')}
                                        <View style={signUpStyles.passwordStrengthContainer}>
                                            <View style={signUpStyles.strengthBars}>
                                                {[1, 2, 3, 4].map((i) => (
                                                    <View
                                                        key={i}
                                                        style={[
                                                            signUpStyles.strengthBar,
                                                            passwordStrength >= i && signUpStyles.strengthBarActive
                                                        ]}
                                                    />
                                                ))}
                                            </View>

                                            <Text style={signUpStyles.strengthText}>
                                                {passwordStrength <= 1 && "Weak"}
                                                {passwordStrength === 2 && "Fair"}
                                                {passwordStrength === 3 && "Good"}
                                                {passwordStrength === 4 && "Strong"}
                                            </Text>
                                        </View>
                                    </View>
                                    {/* <View style={signUpStyles.formGroup}>
                                    <Text style={signUpStyles.label}>✅ Confirm Password</Text>
                                    <Animated.View
                                        style={{ transform: [{ scale: confirmPasswordScale }] }}
                                    >
                                        <TextInput
                                            value={confirmPassword}
                                            onChangeText={(value) => {
                                                setConfirmPassword(value);
                                                clearFieldError('confirmPassword');
                                            }}
                                            onFocus={() => handleFocus('confirmPassword')}
                                            onBlur={() => handleBlur('confirmPassword')}
                                            placeholder="••••••••"
                                            placeholderTextColor="#9CA3AF"
                                            secureTextEntry
                                            style={[
                                                signUpStyles.input,
                                                signUpStyles.tealInput,
                                                errors.confirmPassword && signUpStyles.errorInput,
                                                focusedField === 'confirmPassword' &&
                                                signUpStyles.tealFocusedInput,
                                            ]}
                                        />
                                    </Animated.View>
                                    {renderError('confirmPassword')}
                                </View> */}

                                    <View style={signUpStyles.formGroup}>
                                        <Text style={signUpStyles.label}>✅ Confirm Password</Text>

                                        <Animated.View
                                            style={{
                                                transform: [
                                                    { scale: confirmPasswordScale },
                                                    { translateX: confirmPasswordShake },
                                                ],
                                            }}
                                        >
                                            <View style={{ position: 'relative' }}>
                                                <TextInput
                                                    value={confirmPassword}
                                                    onChangeText={(value) => {
                                                        setConfirmPassword(value);
                                                        clearFieldError('confirmPassword');
                                                    }}
                                                    onFocus={() => handleFocus('confirmPassword')}
                                                    onBlur={() => handleBlur('confirmPassword')}
                                                    placeholder="••••••••"
                                                    placeholderTextColor="#9CA3AF"
                                                    secureTextEntry={!showConfirmPassword}
                                                    style={[
                                                        signUpStyles.input,
                                                        signUpStyles.tealInput,
                                                        errors.confirmPassword && signUpStyles.errorInput,
                                                        focusedField === 'confirmPassword' && signUpStyles.tealFocusedInput,
                                                        { paddingRight: 44 },
                                                    ]}
                                                />

                                                <TouchableOpacity
                                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    style={signUpStyles.eyeIconWrapper}
                                                >
                                                    <Text style={signUpStyles.eyeIcon}>
                                                        {showConfirmPassword ? '🙈' : '👁'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Animated.View>

                                        {renderError('confirmPassword')}
                                    </View>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        {
                                            opacity: buttonOpacity,
                                            transform: [
                                                { translateY: buttonTranslateY },
                                                { scale: buttonPulse },
                                            ],
                                        },
                                    ]}
                                >
                                    <AnimatedTouchable
                                        activeOpacity={0.9}
                                        onPress={handleSignUp}
                                        disabled={isLoading}
                                        style={signUpStyles.buttonOuter}
                                    >
                                        <LinearGradient
                                            colors={buttonColors}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={signUpStyles.button}
                                        >
                                            {isLoading ? (
                                                <View style={signUpStyles.buttonLoadingRow}>
                                                    <Animated.Text
                                                        style={[
                                                            signUpStyles.buttonLoadingEmoji,
                                                            { transform: [{ rotate: loadingSpin }] },
                                                        ]}
                                                    >
                                                        💊
                                                    </Animated.Text>
                                                    <Text style={signUpStyles.buttonText}>Creating your streak...</Text>
                                                </View>
                                            ) : (
                                                <Text style={signUpStyles.buttonText}>Start My Streak! 🔥</Text>
                                            )}
                                        </LinearGradient>
                                    </AnimatedTouchable>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        {
                                            opacity: termsOpacity,
                                            transform: [{ translateY: termsTranslateY }],
                                        },
                                    ]}
                                >
                                    <Text style={signUpStyles.termsText}>
                                        By signing up you agree to our{' '}
                                        <Text style={signUpStyles.termsLink}>Terms</Text> &{' '}
                                        <Text style={signUpStyles.termsLink}>Privacy Policy</Text>
                                    </Text>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        {
                                            opacity: dividerOpacity,
                                            transform: [{ translateY: dividerTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={signUpStyles.dividerRow}>
                                        <View style={signUpStyles.dividerLine} />
                                        <Text style={signUpStyles.dividerText}>or</Text>
                                        <View style={signUpStyles.dividerLine} />
                                    </View>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        {
                                            opacity: loginOpacity,
                                            transform: [{ translateY: loginTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={signUpStyles.loginRow}>
                                        <Text style={signUpStyles.loginText}>Already a streak champion? </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Login)}
                                            activeOpacity={0.8}>
                                            <Text style={signUpStyles.loginLink}>Log in! 🏆</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        signUpStyles.section,
                                        {
                                            opacity: bottomOpacity,
                                            transform: [{ translateY: bottomTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={signUpStyles.bottomCard}>
                                        <Text style={signUpStyles.bottomTitle}>
                                            🌟 It only takes 21 days to build a habit!
                                        </Text>
                                        <Text style={signUpStyles.bottomSubTitle}>
                                            Average new user reaches <Text style={signUpStyles.bold}>day 7</Text>{' '}
                                            in their first week
                                        </Text>
                                    </View>
                                </Animated.View>

                                <View style={{ height: 12 }} />
                            </ScrollView>
                        </KeyboardAvoidingView>
                        <CelebrationOverlay
                            isVisible={showCelebration}
                            message="Welcome to PillPal! 🎉"
                            onComplete={handleCelebrationComplete}
                        />
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

