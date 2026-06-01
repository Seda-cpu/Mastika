export interface MountainRangePath {
  id: string;
  name: string;
  points: Array<{
    latitude: number;
    longitude: number;
  }>;
}

export const mountainRanges: MountainRangePath[] = [
  {
    id: "yildiz",
    name: "Yildiz Daglari",
    points: [
      { latitude: 41.65, longitude: 26.7 },
      { latitude: 41.9, longitude: 27.7 },
      { latitude: 41.6, longitude: 28.5 }
    ]
  },
  {
    id: "samanli-uludag",
    name: "Samanli - Uludag",
    points: [
      { latitude: 40.65, longitude: 29.1 },
      { latitude: 40.55, longitude: 30.1 },
      { latitude: 40.12, longitude: 29.2 },
      { latitude: 39.75, longitude: 29.8 }
    ]
  },
  {
    id: "koroglu",
    name: "Koroglu Daglari",
    points: [
      { latitude: 40.55, longitude: 30.9 },
      { latitude: 40.72, longitude: 31.8 },
      { latitude: 40.86, longitude: 32.7 },
      { latitude: 40.82, longitude: 33.4 }
    ]
  },
  {
    id: "kure-ilgaz",
    name: "Kure - Ilgaz",
    points: [
      { latitude: 41.55, longitude: 32.1 },
      { latitude: 41.7, longitude: 33.2 },
      { latitude: 41.58, longitude: 34.5 },
      { latitude: 41.18, longitude: 33.4 },
      { latitude: 41.12, longitude: 34.5 }
    ]
  },
  {
    id: "canik-giresun",
    name: "Canik - Giresun",
    points: [
      { latitude: 40.92, longitude: 36.0 },
      { latitude: 40.72, longitude: 37.2 },
      { latitude: 40.65, longitude: 38.2 },
      { latitude: 40.72, longitude: 39.4 }
    ]
  },
  {
    id: "dogu-karadeniz",
    name: "Dogu Karadeniz - Kackar",
    points: [
      { latitude: 40.72, longitude: 39.6 },
      { latitude: 40.88, longitude: 40.5 },
      { latitude: 40.9, longitude: 41.15 },
      { latitude: 40.72, longitude: 41.9 }
    ]
  },
  {
    id: "yalnizcam-allahuekber",
    name: "Yalnizcam - Allahuekber",
    points: [
      { latitude: 41.05, longitude: 42.2 },
      { latitude: 41.22, longitude: 43.1 },
      { latitude: 40.65, longitude: 42.45 },
      { latitude: 40.78, longitude: 43.3 }
    ]
  },
  {
    id: "kop-mescit",
    name: "Kop - Mescit",
    points: [
      { latitude: 40.22, longitude: 39.6 },
      { latitude: 40.34, longitude: 40.5 },
      { latitude: 40.2, longitude: 41.0 },
      { latitude: 40.38, longitude: 41.8 }
    ]
  },
  {
    id: "karasu-aras",
    name: "Karasu - Aras",
    points: [
      { latitude: 39.72, longitude: 40.5 },
      { latitude: 39.9, longitude: 41.4 },
      { latitude: 40.0, longitude: 42.35 }
    ]
  },
  {
    id: "mercantecer",
    name: "Mercan - Tecer",
    points: [
      { latitude: 39.3, longitude: 38.1 },
      { latitude: 39.45, longitude: 39.2 },
      { latitude: 39.38, longitude: 40.0 }
    ]
  },
  {
    id: "agri-suphan-nemrut",
    name: "Agri - Suphan - Nemrut",
    points: [
      { latitude: 39.72, longitude: 44.3 },
      { latitude: 39.2, longitude: 43.6 },
      { latitude: 38.92, longitude: 42.82 },
      { latitude: 38.65, longitude: 42.25 }
    ]
  },
  {
    id: "ic-anadolu-volkan",
    name: "Hasandag - Erciyes",
    points: [
      { latitude: 38.13, longitude: 34.17 },
      { latitude: 38.35, longitude: 34.8 },
      { latitude: 38.53, longitude: 35.45 }
    ]
  },
  {
    id: "bati-toros",
    name: "Bati Toroslar",
    points: [
      { latitude: 37.05, longitude: 29.0 },
      { latitude: 37.25, longitude: 30.2 },
      { latitude: 37.05, longitude: 31.4 },
      { latitude: 37.25, longitude: 32.5 }
    ]
  },
  {
    id: "orta-toros",
    name: "Aladaglar - Bolkar",
    points: [
      { latitude: 37.35, longitude: 33.2 },
      { latitude: 37.55, longitude: 34.4 },
      { latitude: 37.85, longitude: 35.2 },
      { latitude: 38.15, longitude: 36.0 }
    ]
  },
  {
    id: "guneydogu-toros",
    name: "Guneydogu Toroslar",
    points: [
      { latitude: 37.45, longitude: 37.3 },
      { latitude: 37.72, longitude: 38.7 },
      { latitude: 37.85, longitude: 40.3 },
      { latitude: 38.05, longitude: 42.2 }
    ]
  }
];
