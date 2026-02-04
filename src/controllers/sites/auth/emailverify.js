import bcrypt from "bcrypt";
import { emailService, userService } from "../../../services/index.js";
import { StatusError, envs } from "../../../config/index.js";
import { generalHelper } from "../../../helpers/index.js";

/**
 * User Signup
 * @param req
 * @param res
 * @param next
 */
export const emailVerify = async (req, res, next) => {
  try {
    const reqBody = req.body;
    const email = reqBody.email;
    const userDetails = await userService.getByEmail(email);
    if (userDetails) throw StatusError.badRequest(res.__("This email is already registered"));
    const verificationCode = await generalHelper.generateRandomAlphanumeric(8);
    //email send
    await emailService.sendEmail(email, "verify_user_email", "", "", {
      pageTitle: "",
      firstName: email,
      verifyCode: verificationCode,
    });

    res.ok({
      message: res.__("Verification code successfully sent to your mail"),
      email: email,
      code: await bcrypt.hash(verificationCode, envs.passwordSalt),
    });
  } catch (error) {
    next(error);
  }
};
