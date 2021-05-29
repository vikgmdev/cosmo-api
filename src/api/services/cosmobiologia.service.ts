import geoTz from 'geo-tz';
import { CartaAstral, PlanetChange } from '../../helpers/cosmobiologia/cosmobiologia.constants';
import { UserModel } from '../models';
import { CosmoQuery } from '../types/cosmo.types';
import { getNatal, getProgresado, getLife } from '../../helpers/cosmobiologia/cosmobiologia.helper';

const getTimezone = (latitude: string | number, longitude: string | number): string => {
  const [tz] = geoTz(latitude, longitude);
  return tz;
};

export const natal = async (cosmoQuery: CosmoQuery): Promise<CartaAstral> => {
  const { latitude, longitude } = cosmoQuery;
  return getNatal({
    ...cosmoQuery,
    timezone: getTimezone(latitude, longitude),
  });
};

export const progresado = async (cosmoQuery: CosmoQuery): Promise<CartaAstral> => {
  const { latitude, longitude } = cosmoQuery;
  return getProgresado({
    ...cosmoQuery,
    timezone: getTimezone(latitude, longitude),
  });
};

export const life = async (cosmoQuery: CosmoQuery): Promise<PlanetChange[]> => {
  const { latitude, longitude } = cosmoQuery;
  return getLife({
    ...cosmoQuery,
    timezone: getTimezone(latitude, longitude),
  });
};

export const meNatal = async (user: UserModel): Promise<CartaAstral> => {
  const {
    birthDayTime: datetime,
    birthDayTimeZone: timezone,
    placeOfBirth: {
      location: { latitude, longitude },
    },
  } = user;

  return getNatal({
    datetime,
    timezone,
    latitude: Number(latitude),
    longitude: Number(longitude),
  });
};

export const meProgresado = async (user: UserModel): Promise<CartaAstral> => {
  const {
    birthDayTime: datetime,
    placeOfResidenceTimeZone: timezone,
    placeOfResidence: {
      location: { latitude, longitude },
    },
  } = user;

  return getProgresado({
    datetime,
    timezone,
    latitude: Number(latitude),
    longitude: Number(longitude),
  });
};

export const meLife = async (user: UserModel): Promise<PlanetChange[]> => {
  const {
    birthDayTime: datetime,
    birthDayTimeZone: timezone,
    placeOfBirth: {
      location: { latitude, longitude },
    },
  } = user;

  return getLife({
    datetime,
    timezone,
    latitude: Number(latitude),
    longitude: Number(longitude),
  });
};
