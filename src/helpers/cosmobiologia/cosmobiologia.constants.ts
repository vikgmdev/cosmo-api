export const signs = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

export const oppositeHouse = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
export const oppositeSign: Record<string, string> = {
  aries: 'libra',
  taurus: 'scorpio',
  gemini: 'sagittarius',
  cancer: 'capricorn',
  leo: 'aquarius',
  virgo: 'pisces',
  libra: 'aries',
  scorpio: 'taurus',
  sagittarius: 'gemini',
  capricorn: 'cancer',
  aquarius: 'leo',
  pisces: 'virgo',
};

export interface CartaAstral {
  date?: string;
  houses?: PlanetHouse[];
  planets: PlanetSign[];
}

// export interface Planets {
//   sun: PlanetSign;
//   moon: PlanetSign;
//   mercury: PlanetSign;
//   venus: PlanetSign;
//   mars: PlanetSign;
//   jupiter: PlanetSign;
//   saturn: PlanetSign;
//   uranus: PlanetSign;
//   neptune: PlanetSign;
//   pluto: PlanetSign;
//   dragonHead: PlanetSign;
//   dragonTail: PlanetSign;
//   fortuneWheel: PlanetSign;
// }

// export interface Houses {
//   house1: PlanetHouse;
//   house2: PlanetHouse;
//   house3: PlanetHouse;
//   house4: PlanetHouse;
//   house5: PlanetHouse;
//   house6: PlanetHouse;
//   house7: PlanetHouse;
//   house8: PlanetHouse;
//   house9: PlanetHouse;
//   house10: PlanetHouse;
//   house11: PlanetHouse;
//   house12: PlanetHouse;
//   ascendant: PlanetHouse;
//   mc: PlanetHouse;
// }

export interface PlanetChange {
  sun?: string;
  moon?: string;
  mercury?: string;
  venus?: string;
  mars?: string;
  jupiter?: string;
  saturn?: string;
  uranus?: string;
  neptune?: string;
  pluto?: string;
  dragonHead?: string;
  dragonTail?: string;
  fortuneWheel?: string;
  date: string;
  age: number;
}

export interface PlanetSign {
  planet: string;
  degrees: SignDegrees;
  house: number;
  sign: string;
  passingNextHouse: boolean;
}

export interface PlanetHouse {
  house: string;
  degrees: SignDegrees;
  sign: string;
  ascendant?: boolean;
  mc?: boolean;
}

export interface SignDegrees {
  deg: number;
  min: number;
  fullSec: number;
  retrograde: boolean;
}
