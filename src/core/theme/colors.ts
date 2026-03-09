type GradientColors = string[];

export const colors = {
  white: '#FFFFFF',
  white08: 'rgba(255,255,255,0.08)',
  white14: 'rgba(255,255,255,0.14)',
  white22: 'rgba(255,255,255,0.22)',
  white24: 'rgba(255,255,255,0.24)',
  white38: 'rgba(255,255,255,0.38)',
  white78: 'rgba(255,255,255,0.78)',

  primaryBackground: '#8F2DE2',
  statusBarBackground: '#8E2DE2',

  face: '#FF6F6F',
  faceCheek: '#FFB3C7',
  faceStroke: '#2F2430',
  gradientLogin: ['#7C3AED', '#EC4899', '#F97316'] as GradientColors,
  gradientLoading: ['#8B5CF6', '#EC4899'] as GradientColors,
  screenGradient: ['#EDE9FE', '#FDF2F8', '#FFF7ED'] as GradientColors,
  bannerGradient: ['#FBBF24', '#FB923C',] as GradientColors,
  splashGradient: ['#9F2CD4', '#A933EA', '#D53FD3', '#F24FA7', '#FF6A45',] as GradientColors,

  inputPlaceholder: '#9CA3AF',

  logoPurple: '#7C3AED',
  // gradient1: '#9F2CD4',
  // gradient2: '#A933EA',
  // gradient3: '#D53FD3',
  // gradient4: '#F24FA7',
  // gradient5: '#FF6A45',
  statusBar: "#F5F3FF"

} as const;