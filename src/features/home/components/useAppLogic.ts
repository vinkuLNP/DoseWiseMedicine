import { useMemo, useState } from 'react';
import { Medication, MedicationStatus } from '../domain/entities/medication';
import { Achievement } from '../domain/entities/achievement';
import { UserStats } from '../domain/entities/userStats';

const INITIAL_MEDS: Medication[] = [
    {
        id: '1',
        name: 'Vitamin D',
        dosage: '1000 IU',
        time: '08:00 AM',
        status: 'pending',
        color: 'yellow',
    },
    {
        id: '2',
        name: 'Omega-3',
        dosage: '500 mg',
        time: '08:00 AM',
        status: 'pending',
        color: 'teal',
    },
    {
        id: '3',
        name: 'Iron Supplement',
        dosage: '65 mg',
        time: '01:00 PM',
        status: 'pending',
        color: 'coral',
    },
    {
        id: '4',
        name: 'Magnesium',
        dosage: '200 mg',
        time: '09:00 PM',
        status: 'pending',
        color: 'purple',
    },
];

const INITIAL_ACHIEVEMENTS: Achievement[] = [
    {
        id: '1',
        title: 'First Step',
        description: 'Take your first medication',
        icon: 'starter',
        unlocked: true,

        progress: 1,
        maxProgress: 1,
    },
    {
        id: '2',
        title: '3 Day Streak',
        description: 'Maintain a 3 day streak',
        icon: 'streak',
        unlocked: false,
        progress: 2,
        maxProgress: 3,
    },
    {
        id: '3',
        title: 'Perfect Day',
        description: 'Complete all meds in a day',
        icon: 'perfect',
        unlocked: false,
        progress: 0,
        maxProgress: 1,
    },
    {
        id: '4',
        title: 'Med Master',
        description: 'Reach Level 5',
        icon: 'master',
        unlocked: false,
        progress: 2,
        maxProgress: 5,
    },
];

const INITIAL_STATS: UserStats = {
    streak: 5,
    level: 2,
    xp: 450,
    xpToNextLevel: 1000,
    totalTaken: 42,
    adherenceRate: 95,
};

export function useAppLogic() {
    const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDS);
    const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
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
        return Math.round(
            (medications.filter((m) => m.status === 'taken').length / medications.length) * 100
        );
    }, [medications]);

    const triggerCelebration = () => {
        const messages = ['Awesome!', 'Keep it up!', "You're on fire!", 'Healthy habit!'];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setCelebration({ show: true, message: randomMsg });
    };

    const checkAchievements = (updatedMeds: Medication[]) => {
        const allTaken = updatedMeds.every((m) => m.status === 'taken');

        if (allTaken) {
            setAchievements((prev) =>
                prev.map((a) =>
                    a.id === '3' ? { ...a, unlocked: true, progress: 1 } : a
                )
            );
        }
    };

    const updateStats = (xpChange: number) => {
        setStats((prev) => {
            const newXp = Math.max(0, prev.xp + xpChange);
            const levelUp = newXp >= prev.xpToNextLevel;

            if (levelUp) {
                setCelebration({ show: true, message: 'Level Up!' });
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

                const newStatus: MedicationStatus = med.status === 'pending' ? 'taken' : 'pending';

                if (newStatus === 'taken') {
                    triggerCelebration();
                    updateStats(100);
                } else {
                    updateStats(-100);
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