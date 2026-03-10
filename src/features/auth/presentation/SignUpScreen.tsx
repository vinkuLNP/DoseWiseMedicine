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
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from 'react-native-linear-gradient';
import { PillCharacter } from '../../splash/components/PillCharacter';
import { CelebrationOverlay } from '../components/CelebrationOverlay';
import { RootStackParamList, ROUTES } from '../../../core/navigation/routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signUpUser } from '../domain/usecases/sign_up_user';
import { Snackbar } from 'react-native-snackbar';
import { signUpStyles } from '../styles/signUpStyles';
import { ErrorModal } from '../components/error_modal';
import { SuccessModal } from '../components/success_modal';
import { useSignUp } from '../hooks/useSignUp';
import { STRINGS } from '../../../core/constants/strings';
import { ErrorState, SIGN_UP_FIELDS, SIGNUP_LIMITS, SignUpFieldName } from '../constants/auth_constants';
import { useSignUpAnimations } from '../hooks/useSignUpAnimations';
import { useSignUpFieldAnimations } from '../hooks/useSignUpFieldAnimation';
import { useSignUpLoadingAnimations } from '../hooks/useSignUpLoadingAnimation';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateAccount'>;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function SignUpScreen({
    navigation
}: SignUpScreenProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [focusedField, setFocusedField] = useState<SignUpFieldName | null>(null);
    const [errors, setErrors] = useState<ErrorState>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const {
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

    } = useSignUpAnimations();


    const { buttonPulse, loadingRotate } = useSignUpLoadingAnimations(isLoading);

    const {
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
    } = useSignUpFieldAnimations();
    const mascotRotation = mascotRotate.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['-2deg', '2deg', '-2deg'],
    });

    const loadingSpin = loadingRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const validate = () => {
        const newErrors: ErrorState = {};

        if (!name.trim()) {
            newErrors.name = STRINGS.nameError;
            shakeField(SIGN_UP_FIELDS.NAME);
        }

        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = STRINGS.validEmail;
            shakeField(SIGN_UP_FIELDS.EMAIL);
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            newErrors.password = STRINGS.passReq
                ;
            shakeField(SIGN_UP_FIELDS.PASSWORD);
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = STRINGS.passDoNotMatch;
            shakeField(SIGN_UP_FIELDS.CONFIRM_PASSWORD);
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const clearFieldError = (field: SignUpFieldName) => {
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
        const state = await NetInfo.fetch();
        if (!state.isConnected) {
            setErrorMsg(STRINGS.noInternet);
            setShowError(true);
            return;
        }
        try {

            setIsLoading(true)

            await signUpUser(name, email, password)
            setShowSuccess(true);
        } catch (error: any) {

            setErrorMsg(error.message);
            setShowError(true);
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

    const renderError = (field: SignUpFieldName) => {
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
                                        <Text style={signUpStyles.logoText}>{STRINGS.appName}</Text>
                                        <Text style={signUpStyles.logoEmoji}>💊</Text>
                                    </View>
                                    <Text style={signUpStyles.logoSubText}>{STRINGS.signUpSubtitle}</Text>
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
                                                    {STRINGS.bannerTitle}
                                                </Text>
                                                <Text style={signUpStyles.bannerSubTitle}>
                                                    {STRINGS.bannerSubtitle}
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
                                                    clearFieldError(SIGN_UP_FIELDS.NAME);
                                                }}
                                                onFocus={() => handleFocus(SIGN_UP_FIELDS.NAME)}
                                                onBlur={() => handleBlur(SIGN_UP_FIELDS.NAME)}
                                                placeholder="Alex Johnson"
                                                placeholderTextColor="#9CA3AF"
                                                style={[
                                                    signUpStyles.input,
                                                    signUpStyles.violetInput,
                                                    errors.name && signUpStyles.errorInput,
                                                    focusedField === SIGN_UP_FIELDS.NAME && signUpStyles.violetFocusedInput,
                                                ]}
                                            />
                                        </Animated.View>
                                        {renderError(SIGN_UP_FIELDS.NAME)}
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
                                                    clearFieldError(SIGN_UP_FIELDS.EMAIL);
                                                }}
                                                onFocus={() => handleFocus(SIGN_UP_FIELDS.EMAIL)}
                                                onBlur={() => handleBlur(SIGN_UP_FIELDS.EMAIL)}
                                                placeholder="you@example.com"
                                                placeholderTextColor="#9CA3AF"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                style={[
                                                    signUpStyles.input,
                                                    signUpStyles.pinkInput,
                                                    errors.email && signUpStyles.errorInput,
                                                    focusedField === SIGN_UP_FIELDS.EMAIL && signUpStyles.pinkFocusedInput,
                                                ]}
                                            />
                                        </Animated.View>
                                        {renderError(SIGN_UP_FIELDS.EMAIL)}
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
                                                        clearFieldError(SIGN_UP_FIELDS.PASSWORD); checkPasswordStrength(value);
                                                    }}
                                                    onFocus={() => handleFocus(SIGN_UP_FIELDS.PASSWORD)}
                                                    onBlur={() => handleBlur(SIGN_UP_FIELDS.PASSWORD)}
                                                    placeholder="••••••••"
                                                    placeholderTextColor="#9CA3AF"
                                                    secureTextEntry={!showPassword}
                                                    style={[
                                                        signUpStyles.input,
                                                        signUpStyles.orangeInput,
                                                        errors.password && signUpStyles.errorInput,
                                                        focusedField === SIGN_UP_FIELDS.PASSWORD && signUpStyles.orangeFocusedInput,
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

                                        {renderError(SIGN_UP_FIELDS.PASSWORD)}
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
                                                        clearFieldError(SIGN_UP_FIELDS.CONFIRM_PASSWORD);
                                                    }}
                                                    onFocus={() => handleFocus(SIGN_UP_FIELDS.CONFIRM_PASSWORD)}
                                                    onBlur={() => handleBlur(SIGN_UP_FIELDS.CONFIRM_PASSWORD)}
                                                    placeholder="••••••••"
                                                    placeholderTextColor="#9CA3AF"
                                                    secureTextEntry={!showConfirmPassword}
                                                    style={[
                                                        signUpStyles.input,
                                                        signUpStyles.tealInput,
                                                        errors.confirmPassword && signUpStyles.errorInput,
                                                        focusedField === SIGN_UP_FIELDS.CONFIRM_PASSWORD && signUpStyles.tealFocusedInput,
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

                                        {renderError(SIGN_UP_FIELDS.CONFIRM_PASSWORD)}
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
                        <SuccessModal
                            visible={showSuccess}
                            message={STRINGS.successMessage}
                            onClose={() => {
                                setShowSuccess(false);
                                navigation.navigate(ROUTES.Login);
                            }}
                        />
                        <ErrorModal
                            visible={showError}
                            message={errorMsg}
                            onClose={() => setShowError(false)}
                            title={STRINGS.signUpErrorTitle}

                        />
                        <CelebrationOverlay
                            isVisible={showCelebration}
                            message={STRINGS.welcme}
                            onComplete={handleCelebrationComplete}
                        />
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

