import db from "../../models/index.js";

export const getUserCheckin_Status = async (userId) => {
  const user = await db.pmsUserCheckin.findOne({
    where: {
      user_id: userId,
      current_status: "1", // CHECK_IN status
    },
  });
  return user;
};
