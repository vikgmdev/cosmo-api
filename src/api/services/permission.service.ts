import { PaginationQuery } from '../types';
import { Permission } from '../models';
import { PermissionFilter } from '../types/permission.types';

export const find = async (filter: PermissionFilter, paginationQuery: PaginationQuery): Promise<any> => {
  const entities = await Permission.find()
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();
  return entities;
};
