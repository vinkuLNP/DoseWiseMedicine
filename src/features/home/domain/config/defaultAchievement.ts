import { Achievement } from "../entities/achievement";

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
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