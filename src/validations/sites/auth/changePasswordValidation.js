import { celebrate, Joi, Segments } from "celebrate";
import { validationHelper } from "../../../helpers/index.js";

const passwordValidation = Joi.string()
  .required()
  .min(8)
  .max(30)
  .custom((value, helpers) => {
    const validateRes = validationHelper.adminPasswordRule(value);
    if (validateRes === true) {
      return value;
    }
    return helpers.message(validateRes);
  });

export const changePassword = celebrate({
  [Segments.BODY]: Joi.object({
    email_id: Joi.string().required().email(),

    old_password: Joi.string().required(),

    new_password: Joi.string().required(),

    confirm_password: Joi.string().required().valid(Joi.ref("new_password")).messages({
      "any.only": "Confirm password must match new password",
    }),
  }),
});
