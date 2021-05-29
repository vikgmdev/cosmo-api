// export interface CosmoQuery {
//   d: string;
//   t: string;
//   a?: number;
//   tz: string;
//   lat: number;
//   long: number;
// }

export interface CosmoQuery {
  datetime: string;
  years?: number;
  timezone: string;
  latitude: number;
  longitude: number;
}

export interface CosmoInfo {
  planets: PlanetInfo[];
  houses: HouseInfo[];
}

export interface PlanetInfo {
  planet: Planet;
  longitude: string;
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
