import { StyleSheet } from "react-native";

export const signUpStyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F5F3FF',
    },
    screenBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    wrapper: {
        width: '100%',
        maxWidth: 420,
        alignItems: 'center',
    },
    phoneFrame: {
        width: '100%',
        minHeight: 820,
        maxHeight: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
        shadowColor: '#C4B5FD',
        shadowOpacity: 0.35,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 12 },
        elevation: 12,
    },
    topGradientBar: {
        height: 6,
        backgroundColor: '#7C3AED',
    },
    notchWrap: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 4,
    },
    notch: {
        width: 96,
        height: 4,
        borderRadius: 999,
        backgroundColor: '#E5E7EB',
    },
    blob: {
        position: 'absolute',
        borderRadius: 999,
    },
    blobViolet: {
        width: 190,
        height: 190,
        backgroundColor: 'rgba(196,181,253,0.30)',
        top: -40,
        right: -45,
    },
    blobPink: {
        width: 160,
        height: 160,
        backgroundColor: 'rgba(251,207,232,0.30)',
        bottom: 120,
        left: -35,
    },
    blobOrange: {
        width: 130,
        height: 130,
        backgroundColor: 'rgba(254,215,170,0.30)',
        bottom: -10,
        right: 20,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 24,
    },
    section: {
        marginBottom: 14,
    },
    centerSection: {
        alignItems: 'center',
        marginVertical: 4,
    },
    logoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#7C3AED',
        letterSpacing: -0.8,
    },
    logoEmoji: {
        fontSize: 24,
        marginLeft: 8,
    },
    logoSubText: {
        marginTop: 4,
        textAlign: 'center',
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '600',
    },
    banner: {
        borderRadius: 18,
        padding: 14,
        shadowColor: '#C4B5FD',
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 5,
    },
    bannerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerIcon: {
        fontSize: 22,
        marginRight: 10,
    },
    bannerTextWrap: {
        flex: 1,
        paddingRight: 8,
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 13,
        lineHeight: 16,
    },
    bannerSubTitle: {
        color: '#EDE9FE',
        fontSize: 11,
        marginTop: 2,
    },
    bannerTag: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerTagIcon: {
        fontSize: 18,
        lineHeight: 20,
    },
    bannerTagText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '800',
        marginTop: 2,
    },
    formGroup: {
        marginBottom: 12,
    },
    label: {
        marginLeft: 4,
        marginBottom: 6,
        fontSize: 14,
        fontWeight: '800',
        color: '#374151',
    },
    input: {
        width: '100%',
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
        borderWidth: 2,
    },
    violetInput: {
        backgroundColor: '#F5F3FF',
        borderColor: '#E9D5FF',
    },
    violetFocusedInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#A78BFA',
        shadowColor: '#C4B5FD',
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    pinkInput: {
        backgroundColor: '#FDF2F8',
        borderColor: '#FBCFE8',
    },
    pinkFocusedInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#F472B6',
        shadowColor: '#F9A8D4',
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    orangeInput: {
        backgroundColor: '#FFF7ED',
        borderColor: '#FED7AA',
    },
    orangeFocusedInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#FB923C',
        shadowColor: '#FDBA74',
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    tealInput: {
        backgroundColor: '#F0FDFA',
        borderColor: '#99F6E4',
    }, eyeIconWrapper: {
        position: 'absolute',
        right: 12,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 36,
        zIndex: 5
    },
    passwordStrengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6
    },

    strengthBars: {
        flexDirection: 'row',
        marginRight: 8
    },

    strengthBar: {
        width: 24,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E5E7EB',
        marginRight: 4
    },

    strengthBarActive: {
        backgroundColor: '#22C55E'
    },

    strengthText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6B7280'
    },
    eyeIcon: {
        fontSize: 18,
    },
    tealFocusedInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#2DD4BF',
        shadowColor: '#5EEAD4',
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    errorInput: {
        backgroundColor: '#FEF2F2',
        borderColor: '#FCA5A5',
    },
    errorText: {
        marginTop: 6,
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '700',
        color: '#EF4444',
    },
    buttonOuter: {
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: '#C4B5FD',
        shadowOpacity: 0.45,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLoadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLoadingEmoji: {
        fontSize: 18,
        marginRight: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
    },
    termsText: {
        textAlign: 'center',
        fontSize: 10,
        lineHeight: 16,
        color: '#9CA3AF',
    },
    termsLink: {
        color: '#A855F7',
        fontWeight: '700',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#F3F4F6',
    },
    dividerText: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    loginRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: '#6B7280',
    },
    loginLink: {
        fontSize: 14,
        fontWeight: '900',
        color: '#8B5CF6',
    },
    bottomCard: {
        backgroundColor: '#ECFDF5',
        borderWidth: 1,
        borderColor: '#D1FAE5',
        borderRadius: 18,
        padding: 14,
        alignItems: 'center',
    },
    bottomTitle: {
        textAlign: 'center',
        color: '#047857',
        fontSize: 12,
        fontWeight: '700',
    },
    bottomSubTitle: {
        marginTop: 4,
        textAlign: 'center',
        color: '#10B981',
        fontSize: 10,
    },
    bold: {
        fontWeight: '900',
        color: '#047857',
    },
});