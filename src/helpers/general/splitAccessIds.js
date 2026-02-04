export const splitAccessIds = (user) => {
  return user.role?.access_type_list ? user.role.access_type_list.split(",").map(Number) : [];
};
