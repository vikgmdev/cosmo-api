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
      `/home/vikgmdev/Documentos/Projects/hectorgarcia/hectorgarcia-api/sweph/swetest -edir/home/vikgmdev/Documentos/Projects/hectorgarcia/hectorgarcia-api/sweph -b${date} -ut${time} -p0123456789m -eswe -house${long},${lat},p -g -head -fPlsj`,
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
    planet: 'part-of-fortune',
    degrees,
    sign,
    house: Number(house),
    passingNextHouse,
  };
};

const calculateDragonTail = (dragonHead: PlanetSign): PlanetSign => {
  const { degrees, sign, house, passingNextHouse } = dragonHead;
  return {
    planet: 'dragon-tail',
    degrees,
    house: oppositeHouse[house - 1],
    passingNextHouse,
    sign: oppositeSign[sign],
  };
};

function calculatePlanetData(rawPlanet: string): PlanetSign {
  const [planet, longitude, speed, rawHouse] = rawPlanet.split('\t');

  const [house, houseDec] = rawHouse.trim().split('.');
  const passingNextHouse = Number(houseDec[0]) >= 9;

  let planetname = planet.trim().toLowerCase();
  if (planetname === 'mean node') planetname = 'dragon-head';

  return {
    planet: planetname,
    degrees: convertLongitude(Number(longitude), Number(speed)),
    sign: findSign(Number(longitude)),
    house: Number(house.trim()),
    passingNextHouse,
  };
}

function calculateHouseData(rawHouse: string): PlanetHouse {
  const [house, longitude] = rawHouse.split('\t');
  return {
    house: house.replace(/ /g, ''),
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
  const rawHouses = rawSweph.slice(11, 23);
  const [rawAscendant, rawMC] = rawSweph.slice(23, 25);

  const ac = calculateHouseData(rawAscendant);
  const mc = calculateHouseData(rawMC);

  // Calculate Fortune Wheel
  const [sunRaw, moonRaw] = rawPlanets;
  const [, sunLongitude, sunSpeed] = sunRaw.split('\t');
  const sunLong = Number(sunLongitude);
  const sunHouse = Number(sunSpeed.trim());

  const [, moonLongitude, moonSpeed] = moonRaw.split('\t');
  const moonLong = Number(moonLongitude);
  const moonHouse = Number(moonSpeed.trim());

  const [, ascendantLongitude] = rawAscendant.split('\t');
  const ascendantLong = Number(ascendantLongitude);

  const planets = rawPlanets.map(calculatePlanetData);
  const dragonHead = planets[10];
  planets.push(calculateDragonTail(dragonHead));
  planets.push(calculateFortune(sunLong, moonLong, ascendantLong, sunHouse, moonHouse));

  const houses = rawHouses.map(calculateHouseData).map((house) => {
    const {
      sign,
      degrees: { deg, min },
    } = house;
    if (sign === ac.sign && deg === ac.degrees.deg && min === ac.degrees.min) house.ascendant = true;
    if (sign === mc.sign && deg === mc.degrees.deg && min === mc.degrees.min) house.mc = true;
    return house;
  });

  return {
    planets,
    houses,
  };
}

export const calculateChanges = (oldCA: CartaAstral, newCA: CartaAstral): boolean => {
  if (oldCA.planets[0].sign !== newCA.planets[0].sign) return true;
  if (oldCA.planets[1].sign !== newCA.planets[1].sign) return true;
  if (oldCA.planets[2].sign !== newCA.planets[2].sign) return true;
  if (oldCA.planets[3].sign !== newCA.planets[3].sign) return true;
  if (oldCA.planets[4].sign !== newCA.planets[4].sign) return true;
  if (oldCA.planets[5].sign !== newCA.planets[5].sign) return true;
  if (oldCA.planets[6].sign !== newCA.planets[6].sign) return true;
  if (oldCA.planets[7].sign !== newCA.planets[7].sign) return true;
  if (oldCA.planets[8].sign !== newCA.planets[8].sign) return true;
  if (oldCA.planets[9].sign !== newCA.planets[9].sign) return true;
  if (oldCA.planets[10].sign !== newCA.planets[10].sign) return true;
  if (oldCA.planets[11].sign !== newCA.planets[11].sign) return true;
  // if (oldCA.planets.fortuneWheel.sign !== newCA.planets.fortuneWheel.sign) return true;
  return false;
};
