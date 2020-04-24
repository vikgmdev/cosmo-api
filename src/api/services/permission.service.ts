import { PaginationQuery, ResponsePagination } from '../types';
import { Permission, PermissionModel } from '../models';
import { PermissionFilter } from '../types/permission.types';
import { Helpers } from '../../helpers';

const getFiltersQuery = (queryParam: PermissionFilter): Record<string, string> => {
  let filters = {};
  const orQuery = [];

  if (queryParam) {
    const query = queryParam;

    if (query.title) {
      const filter = {
        title: Helpers.utils.stringToRegex(query.title),
      };
      orQuery.push(filter);
    }

    if (query.name) {
      const filter = {
        name: Helpers.utils.stringToRegex(query.name),
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
  filter: PermissionFilter,
  paginationQuery: PaginationQuery,
): Promise<ResponsePagination<PermissionModel>> => {
  // Run the query
  const totalCount = await Permission.estimatedDocumentCount();

  const items = await Permission.find(getFiltersQuery(filter))
    .populate('childrens')
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();

  return {
    items,
    totalCount,
  };
};
