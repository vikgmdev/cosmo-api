import { PaginationQuery, UserFilter } from '../types';
import { User } from '../models';

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
