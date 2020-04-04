import { PaginationQuery, UserFilter } from '../types';
import { User } from '../models';

export const find = async (filter: UserFilter, paginationQuery: PaginationQuery): Promise<any> => {
  const entities = await User.find()
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();
  return entities;
};
