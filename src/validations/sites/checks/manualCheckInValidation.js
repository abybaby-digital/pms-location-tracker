import { celebrate, Joi, Segments } from "celebrate";

export const validateManualCheckin = celebrate({
  [Segments.BODY]: Joi.object({
    location_id: Joi.required().messages({
      "any.required": "Location id is required",
      "string.empty": "Location_id cannot be empty",
    }),

    latitude: Joi.string().required().messages({
      "any.required": "Latitude is required",
      "string.empty": "Latitude cannot be empty",
    }),

    longitude: Joi.string().required().messages({
      "any.required": "Longitude is required",
      "string.empty": "Longitude cannot be empty",
    }),

    is_checkout: Joi.boolean().messages({
      "string.empty": "Longitude cannot be empty",
    }),
  }),
});
