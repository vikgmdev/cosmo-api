export const signs = [
  'Aries',
  'Tauro',
  'Geminis',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagitario',
  'Capricornio',
  'Aquario',
  'Piscis',
];

export const oppositeHouse = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
export const oppositeSign: Record<string, string> = {
  Aries: 'Libra',
  Tauro: 'Scorpio',
  Geminis: 'Sagitario',
  Cancer: 'Capricornio',
  Leo: 'Aquario',
  Virgo: 'Piscis',
  Libra: 'Aries',
  Scorpio: 'Tauro',
  Sagitario: 'Geminis',
  Capricornio: 'Cancer',
  Aquario: 'Leo',
  Piscis: 'Virgo',
};

export interface CartaAstral {
  date?: string;
  houses?: Houses;
  planets: Planets;
}

export interface Planets {
  sun: PlanetSign;
  moon: PlanetSign;
  mercury: PlanetSign;
  venus: PlanetSign;
  mars: PlanetSign;
  jupiter: PlanetSign;
  saturn: PlanetSign;
  uranus: PlanetSign;
  neptune: PlanetSign;
  pluto: PlanetSign;
  dragonHead: PlanetSign;
  dragonTail: PlanetSign;
  fortuneWheel: PlanetSign;
}

export interface Houses {
  house1: PlanetHouse;
  house2: PlanetHouse;
  house3: PlanetHouse;
  house4: PlanetHouse;
  house5: PlanetHouse;
  house6: PlanetHouse;
  house7: PlanetHouse;
  house8: PlanetHouse;
  house9: PlanetHouse;
  house10: PlanetHouse;
  house11: PlanetHouse;
  house12: PlanetHouse;
  ascendant: PlanetHouse;
  mc: PlanetHouse;
}

export interface PlanetSign {
  degrees: SignDegrees;
  house: number;
  sign: string;
  passingNextHouse: boolean;
}

export interface PlanetHouse {
  degrees: SignDegrees;
  sign: string;
}

export interface SignDegrees {
  deg: number;
  min: number;
  fullSec: number;
  retrograde: boolean;
}
