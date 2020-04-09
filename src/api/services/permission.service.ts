import { PaginationQuery, ResponsePagination } from '../types';
import { Permission, PermissionModel } from '../models';
import { PermissionFilter } from '../types/permission.types';

export const find = async (
  _filter: PermissionFilter,
  paginationQuery: PaginationQuery,
): Promise<ResponsePagination<PermissionModel>> => {
  // Run the query
  const totalCount = await Permission.estimatedDocumentCount();

  const items = await Permission.find()
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
