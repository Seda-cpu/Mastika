export type PeakDifficulty = "easy" | "moderate" | "hard" | "legendary";

export interface User {
  id: string;
  displayName: string;
  avatarInitials: string;
  level: number;
  xp: number;
  homeRegion: string;
}

export interface Peak {
  id: string;
  name: string;
  region: string;
  elevationMeters: number;
  difficulty: PeakDifficulty;
  geoPosition: {
    latitude: number;
    longitude: number;
  };
  atlasOffset?: {
    x: number;
    z: number;
  };
  lore: string;
  xpReward: number;
  badgeId?: string;
}

export interface UserPeak {
  id: string;
  userId: string;
  peakId: string;
  completedAt: string;
  note: string;
  photoDataUrl?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockPeakId?: string;
  xpReward: number;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
}

export interface CompletionDraft {
  peakId: string;
  completedAt: string;
  note: string;
  photoDataUrl?: string;
}
