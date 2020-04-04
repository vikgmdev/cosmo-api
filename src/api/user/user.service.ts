import { PaginationQuery } from '../../types';
import { UserFilter } from './user.types';
import { User } from './user.model';

export const find = async (filter: UserFilter, paginationQuery: PaginationQuery): Promise<any> => {
  const entities = await User.find()
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();
  return entities;
};
