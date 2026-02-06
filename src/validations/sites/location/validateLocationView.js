import { celebrate, Joi, Segments } from "celebrate";

export const validateLocationView = celebrate({
  [Segments.BODY]: Joi.object({
    latitude: Joi.string().required().messages({
      "any.required": "Latitude is required",
      "string.empty": "Latitude cannot be empty",
    }),

    longitude: Joi.string().required().messages({
      "any.required": "Longitude is required",
      "string.empty": "Longitude cannot be empty",
    }),

    pincode: Joi.string()
      .pattern(/^[0-9]{6}$/)
      .required()
      .messages({
        "any.required": "Pincode is required",
        "string.pattern.base": "Pincode must be exactly 6 digits",
      }),
  }),
});
