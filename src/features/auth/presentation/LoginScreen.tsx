import React, { useMemo, useRef, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Animated,
    Easing,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    Alert, KeyboardAvoidingView,
    Platform,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from 'react-native-linear-gradient';
import { CelebrationOverlay } from '../components/CelebrationOverlay';
import { RootStackParamList, ROUTES } from '../../../core/navigation/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginMascot from '../../splash/components/loginMascot';
import { styles } from '../styles/loginStyles';
import { BADGES, BLOB_DATA } from '../constants/auth_constants';
import { txtfield_styles } from '../components/inputs/textfield_styles';
import { loginUser } from '../domain/usecases/login_user';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ErrorModal } from '../components/error_modal';

type LoginPageProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
const { width } = Dimensions.get('window');

const AnimatedPressableButton = Animated.createAnimatedComponent(TouchableOpacity);
type FieldName = 'email' | 'password';

type ErrorState = {
    email?: string;
    password?: string;
};
export default function LoginScreen({ navigation }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [focusedField, setFocusedField] = useState<'email' | 'password' | null>(null);
    const [errors, setErrors] = useState<ErrorState>({});
    const contentOpacity = useRef(new Animated.Value(0)).current;

    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoTranslateY = useRef(new Animated.Value(24)).current;

    const mascotOpacity = useRef(new Animated.Value(0)).current;
    const mascotTranslateY = useRef(new Animated.Value(24)).current;

    const bannerOpacity = useRef(new Animated.Value(0)).current;
    const bannerTranslateY = useRef(new Animated.Value(24)).current;

    const badgesOpacity = useRef(new Animated.Value(0)).current;
    const badgesTranslateY = useRef(new Animated.Value(24)).current;

    const formOpacity = useRef(new Animated.Value(0)).current;
    const formTranslateY = useRef(new Animated.Value(24)).current;

    const loginOpacity = useRef(new Animated.Value(0)).current;
    const loginTranslateY = useRef(new Animated.Value(24)).current;

    const dividerOpacity = useRef(new Animated.Value(0)).current;
    const dividerTranslateY = useRef(new Animated.Value(24)).current;

    const signupOpacity = useRef(new Animated.Value(0)).current;
    const signupTranslateY = useRef(new Animated.Value(24)).current;

    const bottomOpacity = useRef(new Animated.Value(0)).current;
    const bottomTranslateY = useRef(new Animated.Value(24)).current;
    const emailShake = useRef(new Animated.Value(0)).current;
    const passwordShake = useRef(new Animated.Value(0)).current;
    const mascotFloat = useRef(new Animated.Value(0)).current;
    const loadingRotate = useRef(new Animated.Value(0)).current;
    const buttonPulse = useRef(new Animated.Value(1)).current;

    const emailScale = useRef(new Animated.Value(1)).current;
    const passwordScale = useRef(new Animated.Value(1)).current;
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
        }).start();

        const sections = [
            { opacity: logoOpacity, translateY: logoTranslateY, delay: 100 },
            { opacity: mascotOpacity, translateY: mascotTranslateY, delay: 200 },
            { opacity: bannerOpacity, translateY: bannerTranslateY, delay: 300 },
            { opacity: badgesOpacity, translateY: badgesTranslateY, delay: 400 },
            { opacity: formOpacity, translateY: formTranslateY, delay: 500 },
            { opacity: loginOpacity, translateY: loginTranslateY, delay: 600 },
            { opacity: dividerOpacity, translateY: dividerTranslateY, delay: 700 },
            { opacity: signupOpacity, translateY: signupTranslateY, delay: 800 },
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
            Animated.sequence([
                Animated.timing(mascotFloat, {
                    toValue: -10,
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
            ])
        ).start();

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [
        badgesOpacity,
        badgesTranslateY,
        bannerOpacity,
        bannerTranslateY,
        bottomOpacity,
        bottomTranslateY,
        contentOpacity,
        dividerOpacity,
        dividerTranslateY,
        formOpacity,
        formTranslateY,
        logoOpacity,
        logoTranslateY,
        loginOpacity,
        loginTranslateY,
        mascotFloat,
        mascotOpacity,
        mascotTranslateY,
        signupOpacity,
        signupTranslateY,
    ]);
    const shakeField = (field: 'email' | 'password') => {
        const shake = field === 'email' ? emailShake : passwordShake;

        Animated.sequence([
            Animated.timing(shake, { toValue: 8, duration: 50, useNativeDriver: true }),
            Animated.timing(shake, { toValue: -8, duration: 50, useNativeDriver: true }),
            Animated.timing(shake, { toValue: 6, duration: 50, useNativeDriver: true }),
            Animated.timing(shake, { toValue: -6, duration: 50, useNativeDriver: true }),
            Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };
    useEffect(() => {
        if (!isLoading) {
            loadingRotate.stopAnimation();
            buttonPulse.stopAnimation();
            loadingRotate.setValue(0);
            buttonPulse.setValue(1);
            return;
        }

        Animated.loop(
            Animated.timing(loadingRotate, {
                toValue: 1,
                duration: 600,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

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
    }, [buttonPulse, isLoading, loadingRotate]);

    const spin = loadingRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const handleFieldFocus = (field: 'email' | 'password') => {
        setFocusedField(field);

        const scaleTarget = field === 'email' ? emailScale : passwordScale;
        Animated.spring(scaleTarget, {
            toValue: 1.01,
            stiffness: 400,
            damping: 25,
            useNativeDriver: true,
        }).start();
    };

    const handleFieldBlur = (field: 'email' | 'password') => {
        setFocusedField(null);

        const scaleTarget = field === 'email' ? emailScale : passwordScale;
        Animated.spring(scaleTarget, {
            toValue: 1,
            stiffness: 400,
            damping: 25,
            useNativeDriver: true,
        }).start();
    };
    const validate = () => {
        const newErrors: ErrorState = {};

        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Need a valid email! 📧';
            shakeField('email');
        }

        if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters 🔒';
            shakeField('password');
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const renderError = (field: FieldName) => {
        if (!errors[field]) return null;

        return <Text style={styles.errorText}>{errors[field]}</Text>;
    };
    const clearFieldError = (field: FieldName) => {
        if (!errors[field]) return;

        setErrors((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };
    const handleLogin = async () => {

        if (isLoading) return;

        if (!validate()) return;

        const state = await NetInfo.fetch();

        if (!state.isConnected) {
            setErrorMsg("Internet connection not available");
            setShowError(true);
            return;
        }

        try {

            setIsLoading(true);

            const res = await loginUser(email, password);

            if (res.session) {
                setShowCelebration(true);
            }

        } catch (error: any) {

            setErrorMsg(error.message);
            setShowError(true);

        } finally {
            setIsLoading(false);
        }
    };

    const handleCelebrationComplete = () => {
        setShowCelebration(false);
        navigation.replace(ROUTES.DashBoard);
    };

    const loginGradientColors = useMemo(
        () =>
            isLoading
                ? ['#8B5CF6', '#EC4899']
                : ['#7C3AED', '#EC4899', '#F97316'],
        [isLoading]
    );

    return (
        <SafeAreaView style={styles.root}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <StatusBar barStyle="dark-content" backgroundColor="#F5F3FF" />

                <LinearGradient
                    colors={['#EDE9FE', '#FDF2F8', '#FFF7ED']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.screenBg}
                >
                    <View style={styles.centerWrap}>
                        <View style={styles.phoneShell}>
                            <View style={styles.topGradientBar} />

                            <View style={styles.notchWrap}>
                                <View style={styles.notch} />
                            </View>

                            {BLOB_DATA.map((blob, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.blob,
                                        {
                                            width: blob.size,
                                            height: blob.size,
                                            borderRadius: blob.size / 2,
                                            backgroundColor: blob.backgroundColor,
                                            top: blob.top,
                                            right: blob.right,
                                            bottom: blob.bottom,
                                            left: blob.left,
                                        },
                                    ]}
                                />
                            ))}
                            <KeyboardAwareScrollView
                                contentContainerStyle={styles.content}
                                enableOnAndroid
                                extraScrollHeight={20}
                                keyboardShouldPersistTaps="handled"
                            >
                                <Animated.View
                                    style={[
                                        styles.section,
                                        {
                                            opacity: logoOpacity,
                                            transform: [{ translateY: logoTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={styles.logoRow}>
                                        <Text style={styles.logoText}>PillPal</Text>
                                        <Text style={styles.logoPillEmoji}>💊</Text>
                                    </View>
                                    <Text style={styles.logoSubText}>Keep your streak alive! 🔥</Text>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        styles.section,
                                        styles.mascotSection,
                                        {
                                            opacity: mascotOpacity,
                                            transform: [{ translateY: mascotTranslateY }],
                                        },
                                    ]}
                                >
                                    <Animated.View
                                        style={{
                                            transform: [{ translateY: mascotFloat }],
                                        }}
                                    >
                                        <LoginMascot size={120} />
                                    </Animated.View>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        styles.section,
                                        {
                                            opacity: bannerOpacity,
                                            transform: [{ translateY: bannerTranslateY }],
                                        },
                                    ]}
                                >
                                    <LinearGradient
                                        colors={['#FBBF24', '#FB923C']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.streakBanner}
                                    >
                                        <View style={styles.bannerContent}>
                                            <View style={styles.bannerLeft}>
                                                <Text style={styles.bannerTrophy}>🏆</Text>
                                                <View>
                                                    <Text style={styles.bannerTitle}>
                                                        Join 10,000+ streak champions
                                                    </Text>
                                                    <Text style={styles.bannerSubtitle}>
                                                        Your best streak awaits you!
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.bannerBadge}>
                                                <Text style={styles.bannerBadgeEmoji}>🔥</Text>
                                                <Text style={styles.bannerBadgeText}>STREAK</Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        styles.section,
                                        {
                                            opacity: badgesOpacity,
                                            transform: [{ translateY: badgesTranslateY }],
                                        },
                                    ]}
                                >
                                    <Text style={styles.badgesHeading}>Unlock achievements 🎖️</Text>

                                    <View style={styles.badgesRow}>
                                        {BADGES.map((badge) => (
                                            <View key={badge.label} style={styles.badgeItem}>
                                                <View style={styles.badgeCircle}>
                                                    <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                                                    <View style={styles.badgeOverlay} />
                                                    <Text style={styles.badgeLock}>🔒</Text>
                                                </View>
                                                <Text style={styles.badgeLabel}>{badge.label}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        styles.section,
                                        {
                                            opacity: formOpacity,
                                            transform: [{ translateY: formTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={txtfield_styles
                                        .formBlock}>
                                        <Text style={txtfield_styles.label}>📧 Email</Text>

                                        <Animated.View style={{ transform: [{ scale: emailScale }, { translateX: emailShake }] }}>
                                            <TextInput
                                                value={email}
                                                onChangeText={(value) => {
                                                    setEmail(value);
                                                    clearFieldError('email');
                                                }}

                                                onFocus={() => handleFieldFocus('email')}
                                                onBlur={() => handleFieldBlur('email')}
                                                placeholder="you@example.com"
                                                placeholderTextColor="#9CA3AF"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                style={[
                                                    txtfield_styles.input,
                                                    styles.emailInput, errors.email && styles.errorInput,
                                                    focusedField === 'email' && styles.emailInputFocused,
                                                ]}
                                            />
                                        </Animated.View>
                                        {renderError('email')}

                                    </View>
                                    <View style={txtfield_styles.formBlock}>
                                        <Text style={txtfield_styles.label}>🔒 Password</Text>

                                        <Animated.View
                                            style={{
                                                transform: [{ scale: passwordScale }, { translateX: passwordShake }],
                                            }}
                                        >
                                            <View style={{ position: 'relative' }}>
                                                <TextInput
                                                    value={password}
                                                    onChangeText={(value) => {
                                                        setPassword(value);
                                                        clearFieldError('password');
                                                    }}
                                                    onFocus={() => handleFieldFocus('password')}
                                                    onBlur={() => handleFieldBlur('password')}
                                                    placeholder="••••••••"
                                                    placeholderTextColor="#9CA3AF"
                                                    secureTextEntry={!showPassword}
                                                    style={[
                                                        txtfield_styles.input,
                                                        styles.passwordInput,
                                                        errors.password && styles.errorInput,
                                                        focusedField === 'password' && styles.passwordInputFocused,
                                                        { paddingRight: 44 },
                                                    ]}
                                                />

                                                <TouchableOpacity
                                                    onPress={() => setShowPassword(!showPassword)}
                                                    activeOpacity={0.7}
                                                    style={styles.passwordEye}
                                                >
                                                    <Text style={styles.eyeIcon}>
                                                        {showPassword ? '🙈' : '👁'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Animated.View>

                                        {renderError('password')}
                                    </View>

                                    {/* <View style={styles.forgotWrap}>
                                        <TouchableOpacity activeOpacity={0.8}>
                                            <Text style={styles.forgotText}>Forgot password? 🤔</Text>
                                        </TouchableOpacity>
                                    </View> */}
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        styles.section,
                                        {
                                            opacity: loginOpacity,
                                            transform: [{ translateY: loginTranslateY }, { scale: buttonPulse }],
                                        },
                                    ]}
                                >
                                    <AnimatedPressableButton
                                        activeOpacity={0.9}
                                        onPress={handleLogin}
                                        disabled={isLoading}
                                        style={styles.loginButtonOuter}
                                    >
                                        <LinearGradient
                                            colors={loginGradientColors}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                            style={styles.loginButton}
                                        >
                                            {isLoading ? (
                                                <View style={styles.loginInnerRow}>
                                                    <Animated.Text
                                                        style={[
                                                            styles.loginLoadingEmoji,
                                                            { transform: [{ rotate: spin }] },
                                                        ]}
                                                    >
                                                        💊
                                                    </Animated.Text>
                                                    <Text style={styles.loginButtonText}>
                                                        Loading your streak...
                                                    </Text>
                                                </View>
                                            ) : (
                                                <Text style={styles.loginButtonText}>Let&apos;s Go! 🚀</Text>
                                            )}
                                        </LinearGradient>
                                    </AnimatedPressableButton>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        styles.section,
                                        {
                                            opacity: dividerOpacity,
                                            transform: [{ translateY: dividerTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={styles.dividerRow}>
                                        <View style={styles.dividerLine} />
                                        <Text style={styles.dividerText}>or</Text>
                                        <View style={styles.dividerLine} />
                                    </View>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        styles.section,
                                        {
                                            opacity: signupOpacity,
                                            transform: [{ translateY: signupTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={styles.signupWrap}>
                                        <Text style={styles.signupText}>New here? </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CreateAccount)}
                                            activeOpacity={0.8}>
                                            <Text style={styles.signupLink}>Start your streak! ✨</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>

                                <Animated.View
                                    style={[
                                        styles.section,
                                        {
                                            opacity: bottomOpacity,
                                            transform: [{ translateY: bottomTranslateY }],
                                        },
                                    ]}
                                >
                                    <View style={styles.bottomCard}>
                                        <Text style={styles.bottomCardTitle}>
                                            🔥 Don&apos;t break the chain — log in daily!
                                        </Text>
                                        <Text style={styles.bottomCardSubtitle}>
                                            Average user streak: <Text style={styles.bottomCardBold}>23 days</Text>
                                        </Text>
                                    </View>
                                </Animated.View>

                                <View style={styles.bottomSpacer} />
                            </KeyboardAwareScrollView>
                            <ErrorModal
                                visible={showError}
                                message={errorMsg}
                                onClose={() => setShowError(false)}
                                title='⚠️ Login Failed'

                            />
                            <CelebrationOverlay
                                isVisible={showCelebration}
                                onComplete={handleCelebrationComplete}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}