import { getCartaAstral, calculateChanges } from './carta-astral';
import { CartaAstral, PlanetChange } from './cosmobiologia.constants';
import { getDateTime, getProgressedDateTime } from './date-times';
import { CosmoQuery } from '../../api/types/cosmo.types';

const MAX_YEARS = 100;

function validateCosmoData(cosmoQuery: CosmoQuery): CosmoQuery {
  // TODO: Add validations
  return cosmoQuery;
}

export const getNatal = async (cosmoQuery: CosmoQuery): Promise<CartaAstral> => {
  const { datetime, timezone, latitude, longitude } = validateCosmoData(cosmoQuery);

  const { date, time } = getDateTime(datetime, timezone);

  const cartaAstral = getCartaAstral(date, time, longitude, latitude);
  return cartaAstral;
};

export const getProgresado = async (cosmoQuery: CosmoQuery): Promise<CartaAstral> => {
  const { datetime, timezone, latitude, longitude, years } = validateCosmoData(cosmoQuery);

  const { date, time } = getProgressedDateTime(datetime, timezone, years);

  const cartaAstral = getCartaAstral(date, time, longitude, latitude);
  return cartaAstral;
};

export const getLife = async (cosmoQuery: CosmoQuery): Promise<PlanetChange[]> => {
  const { datetime, timezone, latitude, longitude } = validateCosmoData(cosmoQuery);

  const { date: natalDate, time: natalTime, dateTime: natalDateTime } = getDateTime(datetime, timezone);
  const long = longitude;
  const lat = latitude;

  const cartaNatal = await getCartaAstral(natalDate, natalTime, long, lat);

  const changes: CartaAstral[] = [];
  changes.push({
    date: natalDateTime.format(),
    ...cartaNatal,
  });

  const dateTime = natalDateTime.clone();

  for (let i = 1; i <= MAX_YEARS; i++) {
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

  const planetChanges: PlanetChange[] = [];

  for (let f = changes.length - 1; f >= 0; f--) {
    const { date, planets } = changes[f];
    let ch: PlanetChange = {
      date: String(date),
      age: natalDateTime.diff(date, 'days') * -1,
    };

    if (f === 0 || planets[0].sign !== changes[f - 1].planets[0].sign) {
      ch = {
        ...ch,
        sun: planets[0].sign,
      };
    }

    if (f === 0 || planets[1].sign !== changes[f - 1].planets[1].sign) {
      ch = {
        ...ch,
        moon: planets[1].sign,
      };
    }

    if (f === 0 || planets[2].sign !== changes[f - 1].planets[2].sign) {
      ch = {
        ...ch,
        mercury: planets[2].sign,
      };
    }

    if (f === 0 || planets[3].sign !== changes[f - 1].planets[3].sign) {
      ch = {
        ...ch,
        venus: planets[3].sign,
      };
    }

    if (f === 0 || planets[4].sign !== changes[f - 1].planets[4].sign) {
      ch = {
        ...ch,
        mars: planets[4].sign,
      };
    }

    if (f === 0 || planets[5].sign !== changes[f - 1].planets[5].sign) {
      ch = {
        ...ch,
        jupiter: planets[5].sign,
      };
    }

    if (f === 0 || planets[6].sign !== changes[f - 1].planets[6].sign) {
      ch = {
        ...ch,
        saturn: planets[6].sign,
      };
    }

    if (f === 0 || planets[7].sign !== changes[f - 1].planets[7].sign) {
      ch = {
        ...ch,
        uranus: planets[7].sign,
      };
    }

    if (f === 0 || planets[8].sign !== changes[f - 1].planets[8].sign) {
      ch = {
        ...ch,
        neptune: planets[8].sign,
      };
    }

    if (f === 0 || planets[9].sign !== changes[f - 1].planets[9].sign) {
      ch = {
        ...ch,
        pluto: planets[9].sign,
      };
    }

    if (f === 0 || planets[10].sign !== changes[f - 1].planets[10].sign) {
      ch = {
        ...ch,
        dragonHead: planets[10].sign,
      };
    }

    if (f === 0 || planets[11].sign !== changes[f - 1].planets[11].sign) {
      ch = {
        ...ch,
        dragonTail: planets[11].sign,
      };
    }

    if (f === 0 || planets[12].sign !== changes[f - 1].planets[12].sign) {
      ch = {
        ...ch,
        fortuneWheel: planets[12].sign,
      };
    }

    planetChanges.push(ch);
  }

  return planetChanges.reverse();
};
