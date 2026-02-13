import { envs } from "../../config/envs.js";
import db from "../../models/index.js";
import bcrypt from "bcrypt";

export const updateUserPassword = async (userId, password) => {
  const hashPassword = await bcrypt.hash(password, envs.passwordSalt);
  const user = await db.pmsUser.update(
    { password: hashPassword },
    {
      where: { id: userId },
    },
  );

  return user;
};
