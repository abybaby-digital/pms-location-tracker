import model from "../../models/index.js";
const { pmsUser } = model;

export const saveUserToken = async (id, token) => {
  const result = await pmsUser.findOne({
    where: { id: id, status: "1", role_id: 9 },
  });

  await result.update({
    access_token: token,
  });
};
