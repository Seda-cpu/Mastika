import type { Badge, Peak, User, UserBadge, UserPeak } from "@/types/domain";

export const mockUser: User = {
  id: "user-demo-1",
  displayName: "Mastika Gezgin",
  avatarInitials: "MG",
  level: 3,
  xp: 680,
  homeRegion: "Istanbul"
};

export const peaks: Peak[] = [
  {
    id: "erciyes",
    name: "Erciyes Dagi",
    region: "Kayseri",
    elevationMeters: 3917,
    difficulty: "hard",
    geoPosition: { latitude: 38.53174, longitude: 35.44676 },
    atlasOffset: { x: 0.04, z: -0.04 },
    lore: "Orta Anadolu'nun volkanik kalbi. Sis acildiginda altin bir isaret gibi parlar.",
    xpReward: 180,
    badgeId: "volcanic-heart"
  },
  {
    id: "kackar",
    name: "Kackar Dagi",
    region: "Rize",
    elevationMeters: 3937,
    difficulty: "hard",
    geoPosition: { latitude: 40.84, longitude: 41.16 },
    atlasOffset: { x: 0.03, z: 0.04 },
    lore: "Kuzeydogunun sisli, yesil ve keskin zirvesi.",
    xpReward: 190,
    badgeId: "black-sea-ridge"
  },
  {
    id: "agri",
    name: "Agri Dagi",
    region: "Agri",
    elevationMeters: 5137,
    difficulty: "legendary",
    geoPosition: { latitude: 39.702438, longitude: 44.299076 },
    atlasOffset: { x: -0.06, z: 0.03 },
    lore: "Turkiye'nin en yuksek noktasi. Haritada acildiginda uzak ufku yakar.",
    xpReward: 320,
    badgeId: "roof-of-turkey"
  },
  {
    id: "suphan",
    name: "Suphan Dagi",
    region: "Bitlis",
    elevationMeters: 4058,
    difficulty: "hard",
    geoPosition: { latitude: 38.926812, longitude: 42.827714 },
    atlasOffset: { x: -0.04, z: -0.03 },
    lore: "Van Golu'nun kuzeyinde yalniz duran volkanik nobetci.",
    xpReward: 210,
    badgeId: "lake-sentinel"
  },
  {
    id: "uludag",
    name: "Uludag",
    region: "Bursa",
    elevationMeters: 2543,
    difficulty: "moderate",
    geoPosition: { latitude: 40.070572, longitude: 29.22154 },
    atlasOffset: { x: -0.02, z: -0.06 },
    lore: "Marmara'nin klasik zirvesi; ilk atlas sayfalari icin guclu bir baslangic.",
    xpReward: 120,
    badgeId: "marmara-light"
  },
  {
    id: "hasan",
    name: "Hasan Dagi",
    region: "Aksaray",
    elevationMeters: 3268,
    difficulty: "moderate",
    geoPosition: { latitude: 38.13, longitude: 34.17 },
    atlasOffset: { x: -0.03, z: -0.05 },
    lore: "Kapadokya ufkunda kadim bir volkan silueti.",
    xpReward: 145,
    badgeId: "cappadocia-flame"
  },
  {
    id: "koroglu",
    name: "Koroglu Daglari",
    region: "Bolu",
    elevationMeters: 2499,
    difficulty: "easy",
    geoPosition: { latitude: 40.66667, longitude: 31.78333 },
    atlasOffset: { x: 0.02, z: 0.04 },
    lore: "Batinin ormanli gecitleri ve yumusak sirtlari.",
    xpReward: 95,
    badgeId: "forest-pass"
  },
  {
    id: "nemrut",
    name: "Nemrut Dagi",
    region: "Bitlis",
    elevationMeters: 2933,
    difficulty: "moderate",
    geoPosition: { latitude: 38.65473, longitude: 42.25548 },
    atlasOffset: { x: -0.05, z: -0.06 },
    lore: "Van Golu'nun bati kiyisinda krater goluyle yukselen volkanik zirve.",
    xpReward: 130,
    badgeId: "stone-sunrise"
  }
];

export const badges: Badge[] = [
  {
    id: "volcanic-heart",
    name: "Volkan Kalbi",
    description: "Erciyes Dagi'ni actin.",
    icon: "flame",
    unlockPeakId: "erciyes",
    xpReward: 40
  },
  {
    id: "black-sea-ridge",
    name: "Kuzey Sirtlari",
    description: "Kackar Dagi sisini kaldirdin.",
    icon: "waves",
    unlockPeakId: "kackar",
    xpReward: 45
  },
  {
    id: "roof-of-turkey",
    name: "Turkiye'nin Catisi",
    description: "Agri Dagi ile atlasin en yuksek noktasina ulastin.",
    icon: "crown",
    unlockPeakId: "agri",
    xpReward: 80
  },
  {
    id: "lake-sentinel",
    name: "Gol Nobetcisi",
    description: "Suphan Dagi'ni koleksiyonuna ekledin.",
    icon: "shield",
    unlockPeakId: "suphan",
    xpReward: 55
  },
  {
    id: "marmara-light",
    name: "Marmara Isigi",
    description: "Uludag'i actin.",
    icon: "sparkle",
    unlockPeakId: "uludag",
    xpReward: 30
  },
  {
    id: "cappadocia-flame",
    name: "Kapadokya Alevi",
    description: "Hasan Dagi ile ic Anadolu sayfasini parlattin.",
    icon: "gem",
    unlockPeakId: "hasan",
    xpReward: 35
  },
  {
    id: "forest-pass",
    name: "Orman Gecidi",
    description: "Koroglu Daglari rotani tamamladin.",
    icon: "tree",
    unlockPeakId: "koroglu",
    xpReward: 25
  },
  {
    id: "stone-sunrise",
    name: "Krater Isigi",
    description: "Bitlis Nemrut Dagi'nda yeni bir sayfa actin.",
    icon: "sun",
    unlockPeakId: "nemrut",
    xpReward: 35
  },
  {
    id: "first-reveal",
    name: "Ilk Kazima",
    description: "Ilk zirveni scratch ile ortaya cikardin.",
    icon: "wand",
    xpReward: 50
  }
];

export const initialUserPeaks: UserPeak[] = [
  {
    id: "user-peak-uludag",
    userId: mockUser.id,
    peakId: "uludag",
    completedAt: "2026-04-19",
    note: "Sisli basladi, zirvede gunes acti."
  }
];

export const initialUserBadges: UserBadge[] = [
  {
    id: "user-badge-marmara",
    userId: mockUser.id,
    badgeId: "marmara-light",
    earnedAt: "2026-04-19"
  }
];
