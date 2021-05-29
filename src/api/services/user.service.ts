import { PaginationQuery, UserFilter, ResponsePagination } from '../types';
import { User, UserModel } from '../models';
import moment from 'moment';
import geoTz from 'geo-tz';
import { Helpers } from '../../helpers';

const getFiltersQuery = (queryParam: UserFilter): Record<string, string> => {
  let filters = {};
  const orQuery = [];

  if (queryParam) {
    const query = queryParam;

    if (query.email) {
      const filter = {
        email: Helpers.utils.stringToRegex(query.email),
      };
      orQuery.push(filter);
    }

    if (query.fullname) {
      const filter = {
        fullname: Helpers.utils.stringToRegex(query.fullname),
      };
      orQuery.push(filter);
    }

    if (orQuery.length > 0) {
      filters = {
        $or: orQuery,
      };
    }
  }

  return filters;
};

export const find = async (
  filter: UserFilter,
  paginationQuery: PaginationQuery,
): Promise<ResponsePagination<UserModel>> => {
  // Run the query
  const totalCount = await User.estimatedDocumentCount();
  const query = getFiltersQuery(filter);
  const items = await User.find(query)
    .populate('roles')
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();

  return {
    items,
    totalCount,
  };
};

export const getById = async (id: string): Promise<UserModel> => {
  const user = await User.findById(id).populate('roles');

  if (!user) {
    throw 'Could not find the User with the given ID';
  }

  return user;
};

export const update = async (id: string, user: UserModel): Promise<UserModel> => {
  const userToUpdate = await User.findById(id).exec();

  if (!userToUpdate) throw 'User does not exists';

  if (user.fullname) userToUpdate.fullname = user.fullname;
  if (user.gender) userToUpdate.gender = user.gender; // 1 = male | 2 = female

  if (user.birthDayTime) {
    if (!moment(user.birthDayTime, 'YYYY-MM-DD HH:mm').isValid())
      throw new Error('Property `birthDayTime` should be in format `YYYY-MM-DD HH:mm`');

    userToUpdate.birthDayTime = user.birthDayTime;
  }

  if (user.placeOfBirth) {
    const {
      placeOfBirth: {
        location: { latitude, longitude },
      },
    } = user;
    const [tz] = geoTz(latitude, longitude);
    userToUpdate.birthDayTimeZone = tz;
    userToUpdate.placeOfBirth = user.placeOfBirth;
  }

  if (user.placeOfResidence) {
    const {
      placeOfResidence: {
        location: { latitude, longitude },
      },
    } = user;
    const [tz] = geoTz(latitude, longitude);
    userToUpdate.placeOfResidenceTimeZone = tz;
    userToUpdate.placeOfResidence = user.placeOfResidence;
  }

  userToUpdate.save();

  return userToUpdate;
};

export const deleteById = async (id: string): Promise<UserModel> => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw 'Could not find the User with the given ID';
  }

  return user;
};

export const updateUserRoles = async (id: string, roles: string[]): Promise<UserModel> => {
  const user = await User.findById(id).exec();

  if (!user) throw 'User does not exists';

  user.roles = roles;
  user.save();

  return user;
};
