export const splitAccessIds = (user) => {
  return user.role?.access_type_list ? user.role.access_type_list.split(",").map(Number) : [];
};
export const splitAddAccess = (user) => {
  return user.role?.access_type_add ? user.role.access_type_add.split(",").map(Number) : [];
};
export const splitEditAccess = (user) => {
  return user.role?.access_type_edit ? user.role.access_type_edit.split(",").map(Number) : [];
};
