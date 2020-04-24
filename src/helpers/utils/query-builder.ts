import { PaginationQuery } from '../../api/types';

export function buildPaginationQuery(query: PaginationQuery): PaginationQuery {
  const { sort = 'id asc', skip = 0, limit = 20 } = query;
  return {
    ...query,
    sort,
    skip: Number(skip),
    limit: Number(limit),
  };
}

export function stringToRegex(str: string): Record<string, string> {
  const regExp = str
    // Replace all diacritics and special characters for a wildcard '.'
    .replace(/[^\w\s]/g, '.')
    // Replace all whitespace to allow the completion of any partial name
    .replace(/\s+/g, '.*');
  return {
    $regex: regExp,
    $options: 'i',
  };
}
