import { Request } from 'express';
import { promisify } from 'util';
const exec = promisify(require('child_process').exec);
const signs = [
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

export const natal = async (req: Request): Promise<any> => {
  format_sweph('07.05.1993', '3:55:00', -3.7025, 40.41638888888889).then((value) => {
    console.log(value);
    return value;
  });
};

const exec_sweph = async (date, time, long, lat) => {
  try {
    const { stdout, stderr } = await exec(
      `/root/sweph/swetest -edir/root/sweph -b${date} -ut${time} -p0123456789At -eswe -house${long},${lat},p -g -head -fPlsj`,
      {
        encoding: 'utf8',
      },
    );
    console.log('stdout:');
    console.log(stdout);
    console.log('stderr:', stderr);
    return stdout;
  } catch (err) {
    console.error(err);
  }
};

const format_sweph = async (date, time, long, lat) => {
  // Get data from sweph
  const chart = await exec_sweph(date, time, long, lat);

  const planets = [];
  const houses = [];
  let sun_long = 0;
  let moon_long = 0;
  let ascendant_long = 0;
  // Split all data in array separated with commas
  chart.split(/\n/).forEach((line, index) => {
    row = line.split('\t');
    if (index < 12) {
      const new_planet = {};
      new_planet.planet = row[0].trim();
      new_planet.longitude = convert_longitude(row[1], row[2]);
      new_planet.sign = find_sign(row[1]);
      new_planet.house = row[3];
      planets.push(new_planet);
    } else {
      const new_house = {};
      new_house.house = row[0].trim();
      new_house.longitude = convert_longitude(row[1]);
      new_house.sign = find_sign(row[1]);
      houses.push(new_house);
    }

    if (index == 0) sun_long = row[1];

    if (index == 2) moon_long = row[1];

    if (index == 13) ascendant_long = row[1];
  });

  planets.push(calculate_fortune(sun_long, moon_long, ascendant_long));

  return {
    planets: planets,
    houses: houses,
  };
};

const calculate_fortune = (sun_long, moon_long, ascendant_long) => {
  sun_long = parseFloat(sun_long);
  moon_long = parseFloat(moon_long);
  ascendant_long = parseFloat(ascendant_long);
  let planet_fortune = {};
  planet_fortune.planet = 'P. of Fortune';
  const day_chart = true;
  let fortune_long;

  if (day_chart) {
    fortune_long = ascendant_long + moon_long - sun_long;
  } else {
    fortune_long = ascendant_long - moon_long + sun_long;
  }

  if (fortune_long >= 360) fortune_long = fortune_long - 360;

  if (fortune_long < 0) fortune_long = fortune_long + 360;

  planet_fortune.longitude = convert_longitude(fortune_long);
  planet_fortune.sign = find_sign(planet_fortune.longitude);
  return planet_fortune;
};

const find_sign = (longitude) => {
  const formated_longitude = convert_longitude(longitude);
  const sign = signs.filter((long) => formated_longitude.includes(long))[0];
  return sign;
};

const convert_longitude = (longitude, speed) => {
  longitude = parseFloat(longitude);
  const sign_num = Math.floor(longitude / 30);
  const pos_in_sign = longitude - sign_num * 30;
  let deg = Math.floor(pos_in_sign);
  const full_min = (pos_in_sign - deg) * 60;
  let min = Math.floor(full_min);
  let full_sec = Math.round((full_min - min) * 60);
  let retrograde = '';

  if (deg < 10) {
    deg = `0${deg}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  if (full_sec < 10) {
    full_sec = `0${full_sec}`;
  }

  if (speed < 0) {
    retrograde = 'R';
  }

  return `${deg}° ${signs[parseInt(sign_num)]} ${min}' ${full_sec}“ ${retrograde}`;
};
