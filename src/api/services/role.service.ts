import { PaginationQuery, RoleFilter, ResponsePagination } from '../types';
import { Role, RoleModel, PermissionModel } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFiltersQuery = (queryParam: RoleFilter): any => {
  let filters = {};
  const orQuery = [];

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

export const find = async (
  filter: RoleFilter,
  paginationQuery: PaginationQuery,
): Promise<ResponsePagination<RoleModel>> => {
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

export const getById = async (id: string): Promise<RoleModel> => {
  const role = await Role.findById(id).populate('permissions');

  if (!role) {
    throw 'Could not find the Role with the given ID';
  }

  return role;
};

export const create = async (role: RoleModel): Promise<RoleModel> => {
  const newRole = await new Role(role).save();
  return newRole;
};

export const update = async (id: string, role: RoleModel): Promise<RoleModel> => {
  const roleToUpdate = await Role.findById(id).exec();

  if (!roleToUpdate) throw 'Role does not exists';

  if (role.isCoreRole) roleToUpdate.isCoreRole = role.isCoreRole;
  if (role.isDefaultRole) roleToUpdate.isDefaultRole = role.isDefaultRole;
  if (role.permissions) roleToUpdate.permissions = role.permissions;
  if (role.title) roleToUpdate.title = role.title;
  roleToUpdate.save();

  return roleToUpdate;
};

export const getRolePermissions = async (id: string): Promise<PermissionModel[]> => {
  const role = await Role.findById(id).populate('permissions');

  if (!role) {
    throw 'Could not find the Role with the given ID';
  }

  return role.permissions as PermissionModel[];
};

export const updateRolePermissions = async (id: string, permissions: string[]): Promise<RoleModel> => {
  const role = await Role.findById(id).exec();

  if (!role) throw 'Role does not exists';

  role.permissions = permissions;
  role.save();

  return role;
};

export const deleteById = async (id: string): Promise<RoleModel> => {
  const role = await Role.findByIdAndDelete(id);

  if (!role) {
    throw 'Could not find the Role with the given ID';
  }

  return role;
};
