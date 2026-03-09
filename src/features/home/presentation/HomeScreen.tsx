import React, { useEffect, useMemo, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Animated,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { MedicationCard } from '../components/MedicationCard';
import { StreakCounter } from '../components/StreakCounter';
import { ProgressRing } from '../components/ProgressRing';
import { AchievementBadge } from '../components/AchievementBadge';
import { StatCard } from '../components/StatCard';
import { useAppLogic } from '../components/useAppLogic';
import { CelebrationOverlay } from '../../auth/components/CelebrationOverlay';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../core/navigation/routes';


type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'DashBoard'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
    const {
        medications,
        stats,
        achievements,
        progress,
        celebration,
        toggleMedication,
        closeCelebration,
    } = useAppLogic();

    const headerOpacity = useRef(new Animated.Value(0)).current;
    const headerTranslateY = useRef(new Animated.Value(-20)).current;

    const medsOpacity = useRef(new Animated.Value(0)).current;
    const medsTranslateY = useRef(new Animated.Value(20)).current;

    const statsOpacity = useRef(new Animated.Value(0)).current;
    const statsTranslateY = useRef(new Animated.Value(20)).current;

    const achievementsOpacity = useRef(new Animated.Value(0)).current;
    const achievementsTranslateY = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];

        timers.push(
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(headerOpacity, {
                        toValue: 1,
                        duration: 350,
                        useNativeDriver: true,
                    }),
                    Animated.spring(headerTranslateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 100)
        );

        timers.push(
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(medsOpacity, {
                        toValue: 1,
                        duration: 350,
                        useNativeDriver: true,
                    }),
                    Animated.spring(medsTranslateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 220)
        );

        timers.push(
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(statsOpacity, {
                        toValue: 1,
                        duration: 350,
                        useNativeDriver: true,
                    }),
                    Animated.spring(statsTranslateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 340)
        );

        timers.push(
            setTimeout(() => {
                Animated.parallel([
                    Animated.timing(achievementsOpacity, {
                        toValue: 1,
                        duration: 350,
                        useNativeDriver: true,
                    }),
                    Animated.spring(achievementsTranslateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 460)
        );

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [
        achievementsOpacity,
        achievementsTranslateY,
        headerOpacity,
        headerTranslateY,
        medsOpacity,
        medsTranslateY,
        statsOpacity,
        statsTranslateY,
    ]);

    const today = useMemo(() => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
        });
    }, []);

    const takenCount = medications.filter((m) => m.status === 'taken').length;

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <CelebrationOverlay
                isVisible={celebration.show}
                message={celebration.message}
                onComplete={closeCelebration}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Animated.View
                    style={[
                        styles.header,
                        {
                            opacity: headerOpacity,
                            transform: [{ translateY: headerTranslateY }],
                        },
                    ]}
                >
                    <View style={styles.headerTopRow}>
                        <View>
                            <Text style={styles.dateText}>{today}</Text>
                            <Text style={styles.helloText}>Hello, Alex! 👋</Text>
                        </View>

                        <View style={styles.levelBadge}>
                            <Text style={styles.levelText}>Lvl {stats.level}</Text>
                        </View>
                    </View>

                    <View style={styles.heroStatsRow}>
                        <StreakCounter days={stats.streak} />

                        <View style={styles.progressWrap}>
                            <ProgressRing progress={progress} />
                        </View>

                        <View style={styles.rightStatCol}>
                            <View style={styles.pillsTakenCard}>
                                <Text style={styles.pillsTakenValue}>{stats.totalTaken}</Text>
                                <Text style={styles.pillsTakenLabel}>Pills Taken</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                <View style={styles.main}>
                    <Animated.View
                        style={{
                            opacity: medsOpacity,
                            transform: [{ translateY: medsTranslateY }],
                        }}
                    >
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>📅 Today&apos;s Schedule</Text>
                            <Text style={styles.sectionCount}>
                                {takenCount}/{medications.length}
                            </Text>
                        </View>

                        {medications.map((med) => (
                            <MedicationCard
                                key={med.id}
                                medication={med}
                                onToggle={toggleMedication}
                            />
                        ))}
                    </Animated.View>

                    <Animated.View
                        style={{
                            opacity: statsOpacity,
                            transform: [{ translateY: statsTranslateY }],
                        }}
                    >
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>📈 Your Progress</Text>
                        </View>

                        <View style={styles.singleColumnGrid}>
                            <StatCard
                                label="Adherence Rate"
                                value={`${stats.adherenceRate}%`}
                                icon="📊"
                                color="#E91E63"
                                subtext="Last 7 days"
                            />
                        </View>
                    </Animated.View>

                    <Animated.View
                        style={{
                            opacity: achievementsOpacity,
                            transform: [{ translateY: achievementsTranslateY }],
                        }}
                    >
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>🏆 Achievements</Text>
                        </View>

                        <View style={styles.achievementsGrid}>
                            {achievements.map((achievement) => (
                                <View key={achievement.id} style={styles.achievementCell}>
                                    <AchievementBadge achievement={achievement} />
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 24,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        shadowColor: '#000000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
        zIndex: 10,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    dateText: {
        color: '#6B7280',
        fontWeight: '600',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    helloText: {
        fontSize: 30,
        fontWeight: '800',
        color: '#1F2937',
    },
    levelBadge: {
        backgroundColor: '#EDE9FE',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    levelText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#7C3AED',
    },
    heroStatsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    progressWrap: {
        marginHorizontal: 12,
    },
    rightStatCol: {
        justifyContent: 'center',
    },
    pillsTakenCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFF6FF',
        borderRadius: 16,
        padding: 12,
        width: 96,
        height: 96,
        borderWidth: 2,
        borderColor: '#DBEAFE',
    },
    pillsTakenValue: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2563EB',
    },
    pillsTakenLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#60A5FA',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 4,
    },
    main: {
        paddingHorizontal: 24,
        marginTop: 32,
        gap: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1F2937',
    },
    sectionCount: {
        fontSize: 14,
        fontWeight: '800',
        color: '#9CA3AF',
    },
    singleColumnGrid: {
        gap: 16,
    },
    achievementsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 12,
    },
    achievementCell: {
        width: '48%',
    },
});