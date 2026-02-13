import { userService } from "../../../services/index.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res) => {
  const { email_id, old_password, new_password, confirm_password } = req.body;
  const userId = req.userDetails.userId;

  const user = await userService.getByEmail(email_id);

  if (!user) {
    return res.ok({
      result: {
        status: 400,
        success: 1,
        response: null,
        message: "no user data found",
        token: "",
      },
    });
  }

  const isMatch = await bcrypt.compare(old_password, user.password);

  if (!isMatch) {
    return res.ok({
      result: {
        status: 400,
        success: 1,
        response: null,
        message: "please enter correct password",
        token: "",
      },
    });
  }

  await userService.updateUserPassword(userId, new_password);
  return res.ok({
    result: {
      status: 200,
      success: 0,
      response: "",
      message: "Password updated",
      token: "",
    },
  });
};
