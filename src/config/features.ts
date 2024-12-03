export const FEATURES = {
  MUSIC_PLAYER: process.env.ENABLE_MUSIC_PLAYER === 'true',
  SPOTIFY_INTEGRATION: process.env.ENABLE_SPOTIFY_INTEGRATION === 'true',
} as const

export type FeatureFlag = keyof typeof FEATURES

export function isFeatureEnabled(feature: FeatureFlag): boolean {
  return FEATURES[feature]
} 