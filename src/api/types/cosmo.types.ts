export interface CosmoInfo {
  planets: PlanetInfo[];
  houses: HouseInfo[];
}

export interface PlanetInfo {
  planet: Planet;
  longitude: String;
  sign: Sign;
  house: number;
}

export interface HouseInfo {
  house: number;
  longitude: string;
  sign: Sign;
}

export enum Planet {
  Sun,
  Moon,
  Mercury,
  Venus,
  Mars,
  Jupiter,
  Saturn,
  Uranus,
  Neptune,
  Pluto,
  MeanApogee,
  TrueNode,
  PofFortune,
}

export enum Sign {
  Aries,
  Tauro,
  Geminis,
  Cancer,
  Leo,
  Virgo,
  Libra,
  Scorpio,
  Sagitario,
  Capricornio,
  Aquario,
  Piscis,
}
