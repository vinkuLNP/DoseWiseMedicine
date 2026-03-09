import { StyleSheet } from 'react-native';
import { NUMBERS } from '../../../core/constants/numbers';
import { colors } from '../../../core/theme/colors';
import { radii } from '../../../core/theme/radii';
import { spacing } from '../../../core/theme/spacing';
import { typography } from '../../../core/theme/typography';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
    },
    gradient: {
        flex: 1,
        position: 'relative',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 22,
        paddingHorizontal: 24,
    },
    topHandle: {
        width: 95,
        height: 4,
        borderRadius: radii.md,
        backgroundColor: colors.white22,
        marginTop: 2,
    },
    bottomHandle: {
        width: 130,
        height: 5,
        borderRadius: radii.md,
        backgroundColor: colors.white22,
    },
    topSection: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    appName: {
        ...typography.appName,
        color: colors.white,
    },
    appSubEmoji: {
        marginTop: 6,
        ...typography.emoji,
        color: colors.white,
    },
    middleSection: {
        alignItems: 'center',
        marginTop: 12,
    },
    faceOuter: {
        width: NUMBERS.faceSize,
        height: NUMBERS.faceSize,
        borderRadius: NUMBERS.faceSize / 2,
        backgroundColor: colors.white08,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 34,
    },
    textSection: {
        alignItems: 'center',
    },
    title: {
        ...typography.title,
        color: colors.white,
        textAlign: 'center',
    },
    subtitle: {
        ...typography.subtitle,
        color: colors.white78,
        marginTop: 10,
        textAlign: 'center',
    },
    chipsContainer: {
        alignItems: 'center',
        marginTop: 26,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reminderRow: {
        marginTop: 10,
    },
    chip: {
        paddingHorizontal: 18,
        paddingVertical: 9,
        borderRadius: 22,
        backgroundColor: colors.white14,
        borderWidth: 1,
        borderColor: colors.white24,
        shadowColor: colors.white,
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    chipRight: {
        marginRight: 10,
    },
    chipText: {
        color: colors.white,
        ...typography.chip,

    },
    footer: {
        alignItems: 'center',
        marginBottom: 22,
    },
    dotsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    dot: {
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: colors.white,
    },
    dotSpacing: {
        marginHorizontal: 8,
    },
    footerText: {
        color: colors.white78,
        ...typography.footer,
    },
    bubble: {
        position: 'absolute',
        borderRadius: radii.round,
        backgroundColor: colors.white14,
    },
});