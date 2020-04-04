import { PaginationQuery } from '../../types';
import { PermissionFilter } from './permission.types';
import { Permission } from './permission.model';

export const find = async (filter: PermissionFilter, paginationQuery: PaginationQuery): Promise<any> => {
  const entities = await Permission.find()
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();
  return entities;
};
