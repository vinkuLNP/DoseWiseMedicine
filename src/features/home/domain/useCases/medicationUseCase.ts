import { Medication } from '../entities/medication';
import { Achievement } from '../entities/achievement';
import { STRINGS } from '../../../../core/constants/strings';

export class MedicationUseCase {
    private medications: Medication[];
    private achievements: Achievement[];
    private stats: any;

    constructor(medications: Medication[], achievements: Achievement[], stats: any) {
        this.medications = medications;
        this.achievements = achievements;
        this.stats = stats;
    }

    toggleMedication(id: string) {
        const updated = this.medications.map((med) => {
            if (med.id !== id) return med;

            const newStatus: Medication['status'] = med.status === 'pending' ? 'taken' : 'pending';
            if (newStatus === 'taken') {
                this.triggerCelebration();
                this.updateStats(100);
            } else {
                this.updateStats(-100);
            }

            return { ...med, status: newStatus };
        });

        this.checkAchievements(updated);
        return updated;
    }

    private triggerCelebration() {
        const messages = [STRINGS.happy, STRINGS.sad, STRINGS.idle];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        console.log(randomMsg);
    }

    private updateStats(xpChange: number) {
        this.stats.xp += xpChange;
        console.log(this.stats);
    }

    private checkAchievements(updatedMeds: Medication[]) {
        const allTaken = updatedMeds.every((m) => m.status === 'taken');
        if (allTaken) {
            this.achievements = this.achievements.map((a) =>
                a.id === '3' ? { ...a, unlocked: true, progress: 1 } : a
            );
        }
    }
}