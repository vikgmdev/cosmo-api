import moment from 'moment';
import { getCartaAstral } from '../../helpers/cosmobiologia/carta-astral';
import { CartaAstral } from '../../helpers/cosmobiologia/cosmobiologia.constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const natal = async (): Promise<any> => {
  const dateTime = moment('1993-05-07T05:55:00+02:00').utc();

  const date = dateTime.format('D.M.YYYY');
  const time = dateTime.format('HH:mm:ss');

  const cartaAstral = getCartaAstral(date, time, -3.7025, 40.41638888888889);
  return cartaAstral;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const progresado = async (): Promise<any> => {
  const timezone = '-06:00';
  const long = -103.33333333333333;
  const lat = 20.6666667;
  const dateTime = moment('1993-05-07T05:55:00' + timezone).utc();

  const natalYear = dateTime.format('YYYY');
  const currentYear = moment().format('YYYY');

  const dateTimeProgresado = dateTime.add(Number(currentYear) - Number(natalYear), 'days');
  const date = dateTimeProgresado.format('D.M.YYYY');
  const time = dateTimeProgresado.format('HH:mm:ss');

  const cartaAstral = getCartaAstral(date, time, long, lat);
  return cartaAstral;
};

const calculateChanges = (oldCA: CartaAstral, newCA: CartaAstral): boolean => {
  if (oldCA.planets.sun.sign !== newCA.planets.sun.sign) return true;
  if (oldCA.planets.moon.sign !== newCA.planets.moon.sign) return true;
  if (oldCA.planets.mercury.sign !== newCA.planets.mercury.sign) return true;
  if (oldCA.planets.venus.sign !== newCA.planets.venus.sign) return true;
  if (oldCA.planets.mars.sign !== newCA.planets.mars.sign) return true;
  if (oldCA.planets.jupiter.sign !== newCA.planets.jupiter.sign) return true;
  if (oldCA.planets.saturn.sign !== newCA.planets.saturn.sign) return true;
  if (oldCA.planets.uranus.sign !== newCA.planets.uranus.sign) return true;
  if (oldCA.planets.neptune.sign !== newCA.planets.neptune.sign) return true;
  if (oldCA.planets.pluto.sign !== newCA.planets.pluto.sign) return true;
  if (oldCA.planets.dragonHead.sign !== newCA.planets.dragonHead.sign) return true;
  if (oldCA.planets.dragonTail.sign !== newCA.planets.dragonTail.sign) return true;
  // if (oldCA.planets.fortuneWheel.sign !== newCA.planets.fortuneWheel.sign) return true;
  return false;
};

export const life = async (): Promise<CartaAstral[]> => {
  const timezone = '-06:00';
  const long = -103.33333333333333;
  const lat = 20.6666667;
  const dateTime = moment('1993-05-07T05:55:00' + timezone).utc();

  const changes: CartaAstral[] = [];

  const natalDate = dateTime.format('D.M.YYYY');
  const natalTime = dateTime.format('HH:mm:ss');
  const cartaNatal = await getCartaAstral(natalDate, natalTime, long, lat);
  changes.push({
    date: dateTime.format(),
    ...cartaNatal,
  });

  for (let i = 1; i <= 125; i++) {
    dateTime.add(1, 'days');
    const date = dateTime.format('D.M.YYYY');
    const time = dateTime.format('HH:mm:ss');

    const cartaAstral = await getCartaAstral(date, time, long, lat);

    const hasChanged = calculateChanges(changes[changes.length - 1], cartaAstral);

    if (hasChanged) {
      changes.push({
        date: dateTime.format(),
        ...cartaAstral,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return changes.map(({ date, planets }) => ({
    date,
    age: moment('1993-05-07T05:55:00' + timezone).diff(date, 'days') * -1,
    sun: planets.sun.sign,
    moon: planets.moon.sign,
    mercury: planets.mercury.sign,
    venus: planets.venus.sign,
    mars: planets.mars.sign,
    jupiter: planets.jupiter.sign,
    saturn: planets.saturn.sign,
    uranus: planets.uranus.sign,
    neptune: planets.neptune.sign,
    pluto: planets.pluto.sign,
    dragonHead: planets.dragonHead.sign,
    dragonTail: planets.dragonTail.sign,
    fortuneWheel: planets.fortuneWheel.sign,
  }));
};
