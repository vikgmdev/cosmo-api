import { PaginationQuery } from '../../api/types';

export default function buildPaginationQuery(query: PaginationQuery) {
  const { sort = 'id asc', skip = 0, limit = 20 } = query;
  return {
    ...query,
    sort,
    skip,
    limit,
  };
}
