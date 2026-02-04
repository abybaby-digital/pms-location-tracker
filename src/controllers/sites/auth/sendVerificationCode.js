import { emailService, userService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";
import { generalHelper } from "../../../helpers/index.js";
import model from "../../../models/index.js";
const { user } = model;

/* *
 * Sending verification code to user's email
 * @param req
 * @param res
 * @param next
 */
export const sendVerificationCodeToEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userDetails = await userService.getByEmail(email);
    if (!userDetails) throw StatusError.badRequest({ email: res.__("email does not exists") });
    else {
      const verificationCode = await generalHelper.generateRandomAlphanumeric(8);
      const userFirstName = userDetails.first_name;

      //inserting verification code
      const result = await user.update(
        { reset_password_code: verificationCode },
        { where: { id: userDetails.id } },
      );
      //email send
      if (result && result.length > 0) {
        await emailService.sendEmail(email, "reset_password", "", "", {
          firstName: userFirstName,
          resetCode: verificationCode,
        });
        res.ok({
          message: res.__("success"),
        });
      } else {
        throw StatusError.badRequest({ userId: res.__("userIdNotExists") });
      }
    }
  } catch (error) {
    next(error);
  }
};
