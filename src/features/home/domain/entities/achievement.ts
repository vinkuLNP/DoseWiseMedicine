export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'streak' | 'perfect' | 'starter' | 'master';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}