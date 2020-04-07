import { PaginationQuery, UserFilter } from '../types';
import { User, UserModel } from '../models';

const getFiltersQuery = (queryParam: UserFilter) => {
  let filters = {};
  let orQuery = [];

  if (queryParam) {
    const query = queryParam;

    if (query.email) {
      const filter = {
        email: {
          contains: query.email,
        },
      };
      orQuery.push(filter);
    }

    if (query.fullName) {
      const filter = {
        fullName: {
          contains: query.fullName,
        },
      };
      orQuery.push(filter);
    }

    if (orQuery.length > 0) {
      filters = {
        or: orQuery,
      };
    }
  }

  return filters;
};

export const find = async (filter: UserFilter, paginationQuery: PaginationQuery): Promise<any> => {
  // Run the query
  const totalCount = await User.estimatedDocumentCount();

  const items = await User.find(getFiltersQuery(filter))
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

export const getById = async (id: string): Promise<any> => {
  const user = await User.findById(id).populate('roles');

  if (!user) {
    // throw notFound('Could not find the User with the given ID');
  }

  return user;
};

export const update = async (id: string, user: UserModel): Promise<any> => {
  const userToUpdate = await User.findById(id).exec();

  if (!userToUpdate) throw 'User does not exists';

  if (user.fullName) userToUpdate.fullName = user.fullName;
  userToUpdate.save();

  return userToUpdate;
};

export const deleteById = async (id: string): Promise<any> => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    // throw notFound('Could not find the User with the given ID');
  }

  return user;
};

export const updateUserRoles = async (id: string, roles: any[]): Promise<any> => {
  const user = await User.findById(id).exec();

  if (!user) throw 'User does not exists';

  user.roles = roles;
  user.save();

  return user;
};
