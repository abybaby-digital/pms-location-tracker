import { celebrate, Joi, Segments } from "celebrate";

// Middleware for validating userAdd request
export const loginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    email_id: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Invalid email format",
      "string.empty": "Email cannot be empty",
    }),

    password: Joi.string()
      //.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,50}$/)
      .required()
      .messages({
        "any.required": "Password is required",
        // "string.pattern.base":
        //   "Password must have at least 1 uppercase, 1 lowercase, 1 number, 1 special character and be 8-50 characters long",
        // "string.empty": "Password cannot be empty",
      }),
  }),
});
