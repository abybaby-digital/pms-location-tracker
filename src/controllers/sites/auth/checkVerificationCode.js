import { userService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";

/* *
 * Checking verification code to user's email
 * @param req
 * @param res
 * @param next
 */

export const checkVerificationCode = async (req, res, next) => {
  try {
    const email = req.body.email;
    const verificationCode = req.body.verification_code;
    const userDetails = await userService.getByEmail(email);
    if (!userDetails) throw StatusError.badRequest({ email: res.__("email does not exists") });
    if (verificationCode == userDetails.reset_password_code) {
      res.ok({
        message: res.__("success"),
        user_id: userDetails.id,
      });
    } else {
      throw StatusError.badRequest({
        verification_code: res.__("incorrectVerificationCode"),
      });
    }
  } catch (error) {
    next(error);
  }
};
