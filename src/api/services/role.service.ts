import { PaginationQuery, RoleFilter } from '../types';
import { Role } from '../models';

const getFiltersQuery = (queryParam: RoleFilter) => {
  let filters = {};
  let orQuery = [];

  if (queryParam) {
    const query = queryParam;

    if (query.title) {
      const filter = {
        title: {
          contains: query.title,
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

export const find = async (filter: RoleFilter, paginationQuery: PaginationQuery): Promise<any> => {
  // Run the query
  const totalCount = await Role.estimatedDocumentCount();

  const items = await Role.find(getFiltersQuery(filter))
    .populate('permissions')
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();

  return {
    items,
    totalCount,
  };
};
