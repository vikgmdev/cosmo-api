import { PaginationQuery, RoleFilter } from '../types';
import { Role } from '../models';

export const find = async (filter: RoleFilter, paginationQuery: PaginationQuery): Promise<any> => {
  const entities = await Role.find()
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();
  return entities;
};
