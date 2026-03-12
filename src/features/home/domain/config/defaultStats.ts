import { UserStats } from '../entities/userStats';

export const DEFAULT_STATS: UserStats = {
    streak: 5,
    level: 2,
    xp: 450,
    xpToNextLevel: 1000,
    totalTaken: 42,
    adherenceRate: 95,
};