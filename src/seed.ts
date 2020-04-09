import { Permission, Role } from './api/models';

async function populatePermissions(): Promise<void> {
  const result = await new Permission({
    title: 'App module',
    name: 'accessToAppModule',
    level: 1,
    isSelected: false,
  }).save();
  const childs = await Promise.all([
    new Permission({
      title: 'Read',
      name: 'canReadAppData',
      level: 2,
      isSelected: false,
      parent: result.id,
    }).save(),
    new Permission({
      title: 'Edit',
      name: 'canEditAppData',
      level: 2,
      isSelected: false,
      parent: result.id,
    }).save(),
    new Permission({
      title: 'Delete',
      name: 'canDeleteAppData',
      level: 2,
      isSelected: false,
      parent: result.id,
    }).save(),
  ]);
  result.childrens = childs.map((per) => per.id);
  result.save();
}

async function populateAuthPermissions(): Promise<void> {
  const result = await new Permission({
    title: 'Users Management module',
    name: 'accessToAuthModule',
    level: 1,
    isSelected: false,
  }).save();
  const childs = await Promise.all([
    new Permission({
      title: 'Read',
      name: 'canReadAuthData',
      level: 2,
      isSelected: false,
      parent: result.id,
    }).save(),
    new Permission({
      title: 'Edit',
      name: 'canEditAuthData',
      level: 2,
      isSelected: false,
      parent: result.id,
    }).save(),
    new Permission({
      title: 'Delete',
      name: 'canDeleteAuthData',
      level: 2,
      isSelected: false,
      parent: result.id,
    }).save(),
  ]);
  result.childrens = childs.map((per) => per.id);
  result.save();
}

async function populateRoles(): Promise<void> {
  const roles = await Promise.all([
    new Role({
      title: 'Administrator',
      isCoreRole: true,
      isDefaultRole: false,
    }).save(),
    new Role({
      title: 'User',
      isCoreRole: false,
      isDefaultRole: true,
    }).save(),
    new Role({
      title: 'Manager',
      isCoreRole: false,
      isDefaultRole: false,
    }).save(),
  ]);
  console.log(roles);
}

export default {
  populatePermissions,
  populateAuthPermissions,
  populateRoles,
};
