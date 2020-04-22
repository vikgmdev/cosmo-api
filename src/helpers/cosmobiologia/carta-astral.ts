import { promisify } from 'util';
import { logger } from '../../core';
import {
  CartaAstral,
  oppositeHouse,
  oppositeSign,
  PlanetHouse,
  PlanetSign,
  SignDegrees,
  signs,
} from './cosmobiologia.constants';
const exec = promisify(require('child_process').exec);

const execSweph = async (date: string, time: string, long: number, lat: number): Promise<string> => {
  try {
    const { stdout, stderr } = await exec(
      `/home/vikgmdev/Documentos/Projects/tortugadescalza-api/sweph/swetest -edir/home/vikgmdev/Documentos/Projects/tortugadescalza-api/sweph -b${date} -ut${time} -p0123456789m -eswe -house${long},${lat},p -g -head -fPlsj`,
      {
        encoding: 'utf8',
      },
    );

    if (stderr) throw new Error(stderr);

    return stdout;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

const convertLongitude = (longitude: number, speed?: number): SignDegrees => {
  const signNum = Math.floor(longitude / 30);
  const posInSign = longitude - signNum * 30;
  const deg = Math.floor(posInSign);
  const fullMin = (posInSign - deg) * 60;
  const min = Math.floor(fullMin);
  const fullSec = Math.round((fullMin - min) * 60);
  const retrograde = Boolean(speed && speed < 0);

  return {
    deg,
    min,
    fullSec,
    retrograde,
  };
};

const findSign = (longitude: number): string => {
  const signNum = Math.floor(longitude / 30);
  return signs[Math.trunc(signNum)];
  //   const formatedLongitude = convertLongitude(longitude);
  //   const sign = signs.filter((long) => formatedLongitude.includes(long))[0];
  //   return sign;
};

const calculateFortune = (
  sunLong: number,
  moonLong: number,
  ascendantLong: number,
  sunHouse: number,
  moonHouse: number,
): PlanetSign => {
  let fortuneLong = ascendantLong + moonLong - sunLong;
  const fortuneHouse = moonHouse - sunHouse;

  if (fortuneLong >= 360) fortuneLong = fortuneLong - 360;

  if (fortuneLong < 0) fortuneLong = fortuneLong + 360;

  const degrees = convertLongitude(fortuneLong);
  const sign = findSign(fortuneLong);

  const [house, houseDec] = String(fortuneHouse).split('.');
  const passingNextHouse = Number(houseDec[0]) >= 9;

  return {
    degrees,
    sign,
    house: Number(house),
    passingNextHouse,
  };
};

const calculateDragonTail = (dragonHead: PlanetSign): PlanetSign => {
  const { degrees, sign, house, passingNextHouse } = dragonHead;
  return {
    degrees,
    house: oppositeHouse[house - 1],
    passingNextHouse,
    sign: oppositeSign[sign],
  };
};

function calculatePlanetData(rawPlanet: string): PlanetSign {
  const [, longitude, speed, rawHouse] = rawPlanet.split('\t');

  const [house, houseDec] = rawHouse.trim().split('.');
  const passingNextHouse = Number(houseDec[0]) >= 9;

  return {
    degrees: convertLongitude(Number(longitude), Number(speed)),
    sign: findSign(Number(longitude)),
    house: Number(house.trim()),
    passingNextHouse,
  };
}

function calculateHouseData(rawHouse: string): PlanetHouse {
  const [, longitude] = rawHouse.split('\t');

  return {
    degrees: convertLongitude(Number(longitude)),
    sign: findSign(Number(longitude)),
  };
}

export async function getCartaAstral(date: string, time: string, long: number, lat: number): Promise<CartaAstral> {
  // Get data from sweph
  const chart = await execSweph(date, time, long, lat);

  // Split all data in array separated with commas
  const rawSweph: string[] = chart.split(/\n/);
  const rawPlanets = rawSweph.slice(0, 11);
  const rawHouses = rawSweph.slice(11, 25);

  // Calculate Fortune Wheel
  const [sunRaw, moonRaw] = rawPlanets;
  const [, sunLongitude, sunSpeed] = sunRaw.split('\t');
  const sunLong = Number(sunLongitude);
  const sunHouse = Number(sunSpeed.trim());

  const [, moonLongitude, moonSpeed] = moonRaw.split('\t');
  const moonLong = Number(moonLongitude);
  const moonHouse = Number(moonSpeed.trim());

  const [, ascendantLongitude] = rawHouses[12].split('\t');
  const ascendantLong = Number(ascendantLongitude);

  const [sun, moon, mercury, venus, mars, jupiter, saturn, uranus, neptune, pluto, dragonHead] = rawPlanets.map(
    calculatePlanetData,
  );

  const [
    house1,
    house2,
    house3,
    house4,
    house5,
    house6,
    house7,
    house8,
    house9,
    house10,
    house11,
    house12,
    ascendant,
    mc,
  ] = rawHouses.map(calculateHouseData);

  const houses = {
    house1,
    house2,
    house3,
    house4,
    house5,
    house6,
    house7,
    house8,
    house9,
    house10,
    house11,
    house12,
    ascendant,
    mc,
  };

  const planets = {
    sun,
    moon,
    mercury,
    venus,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune,
    pluto,
    dragonHead,
    dragonTail: calculateDragonTail(dragonHead),
    fortuneWheel: calculateFortune(sunLong, moonLong, ascendantLong, sunHouse, moonHouse),
  };

  return {
    planets,
    houses,
  };
}
