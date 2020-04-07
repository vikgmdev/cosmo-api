import { PaginationQuery, RoleFilter } from '../types';
import { Role } from '../models';

const getFiltersQuery = (queryParam: RoleFilter) => {
  let filters = {};
  let orQuery = [];

  if (queryParam) {
    const query = queryParam;

    if (query.title) {
      const filter = {
        title: {
          contains: query.title,
        },
      };
      orQuery.push(filter);
    }

    if (orQuery.length > 0) {
      filters = {
        or: orQuery,
      };
    }
  }

  return filters;
};

export const find = async (filter: RoleFilter, paginationQuery: PaginationQuery): Promise<any> => {
  // Run the query
  const totalCount = await Role.estimatedDocumentCount();

  const items = await Role.find(getFiltersQuery(filter))
    .populate('permissions')
    .sort(paginationQuery.sort)
    .skip(paginationQuery.skip)
    .limit(paginationQuery.limit)
    .exec();

  return {
    items,
    totalCount,
  };
};

export const getById = async (id: string): Promise<any> => {
  const role = await Role.findById(id).populate('permissions');

  if (!role) {
    // throw notFound('Could not find the Role with the given ID');
  }

  return role;
};

export const getRolePermissions = async (roleId: string): Promise<any> => {
  return await Role.findById(roleId).populate('permissions').exec();
};

export const updateRolePermissions = async (roleId: string, permissions: any[]): Promise<any> => {
  const role = await Role.findById(roleId).exec();

  if (!role) throw 'Role does not exists';
  
  role.permissions = permissions;
  role.save();

  return role;
};
