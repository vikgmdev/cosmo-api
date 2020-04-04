import { PaginationQuery } from '../../types';
import { RoleFilter } from './role.types';
import { Role } from './role.model';

export const find = async (filter: RoleFilter, paginationQuery: PaginationQuery): Promise<any> => {
  const entities = await Role.find()
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();
  return entities;
};
