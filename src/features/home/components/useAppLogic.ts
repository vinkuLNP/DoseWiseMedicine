import { useMemo, useState } from 'react';
import { Medication, } from '../domain/entities/medication';
import { Achievement } from '../domain/entities/achievement';
import { UserStats } from '../domain/entities/userStats';
import { DEFAULT_MEDICATIONS } from '../domain/config/defaultMedication';
import { DEFAULT_STATS } from '../domain/config/defaultStats';
import { INITIAL_ACHIEVEMENTS } from '../domain/config/defaultAchievement';
import { STRINGS } from '../../../core/constants/strings';
import { isPerfectDay } from '../domain/services/achievementService';
import { AchievementId } from '../domain/enum/achievementId';
import { toggleMedicationStatus } from '../domain/utils/toggleMedicationStatus';
import { MedicationStatus } from '../domain/enum/medicationStatus';
import { MEDICATION_RULES } from '../domain/utils/medicationRules';
export function useAppLogic() {
    const [medications, setMedications] = useState<Medication[]>(DEFAULT_MEDICATIONS);
    const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
    const [achievements, setAchievements] =
        useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
    const [celebration, setCelebration] = useState<{
        show: boolean;
        message: string;
    }>({
        show: false,
        message: '',
    });

    const progress = useMemo(() => {
        const taken = medications.filter(
            (m) => m.status === MedicationStatus.TAKEN
        ).length;

        return Math.round((taken / medications.length) * 100);

    }, [medications]);


    const triggerCelebration = () => {
        const randomMsg = STRINGS.celebrationMsg[Math.floor(Math.random() * STRINGS.celebrationMsg.length)];
        setCelebration({ show: true, message: randomMsg });
    };

    const checkAchievements = (updated: Medication[]) => {

        if (isPerfectDay(updated)) {
            setAchievements((prev) =>
                prev.map((a) =>
                    a.id === AchievementId.PERFECT_DAY
                        ? { ...a, unlocked: true, progress: 1 }
                        : a
                )
            );
        }
    };


    const updateStats = (xpChange: number) => {
        setStats((prev) => {
            const newXp = Math.max(0, prev.xp + xpChange);
            const levelUp = newXp >= prev.xpToNextLevel;

            if (levelUp) {
                setCelebration({ show: true, message: STRINGS.levelUpMessage });
            }

            return {
                ...prev,
                xp: levelUp ? newXp - prev.xpToNextLevel : newXp,
                level: levelUp ? prev.level + 1 : prev.level,
                totalTaken: xpChange > 0 ? prev.totalTaken + 1 : Math.max(0, prev.totalTaken - 1),
            };
        });
    };


    const toggleMedication = (id: string) => {
        setMedications((prev) => {
            const updated = prev.map((med) => {
                if (med.id !== id) return med;

                const newStatus = toggleMedicationStatus(med.status);

                if (newStatus === MedicationStatus.TAKEN) {
                    triggerCelebration();
                    updateStats(MEDICATION_RULES.XP_GAIN_MEDICATION);
                } else {
                    updateStats(MEDICATION_RULES.XP_LOSS_MEDICATION);
                }

                return { ...med, status: newStatus };
            });

            checkAchievements(updated);
            return updated;
        });
    };
    const closeCelebration = () => {
        setCelebration((prev) => ({ ...prev, show: false }));
    };

    return {
        medications,
        stats,
        achievements,
        progress,
        celebration,
        toggleMedication,
        closeCelebration,
    };
}