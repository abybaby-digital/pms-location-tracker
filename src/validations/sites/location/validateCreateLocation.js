import { celebrate, Joi, Segments } from "celebrate";

export const validateCreateLocation = celebrate({
  [Segments.BODY]: Joi.object({
    location_name: Joi.string().required().messages({
      "any.required": "Location name is required",
      "string.empty": "Location name cannot be empty",
    }),

    location_type_id: Joi.number().integer().required().messages({
      "any.required": "Location type is required",
    }),

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

    contact_person_name: Joi.string().required().messages({
      "any.required": "Contact person name is required",
      "string.empty": "Contact person name cannot be empty",
    }),
    contact_person_number: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "any.required": "Contact person number is required",
        "string.pattern.base": "Contact number must be 10 digits",
        "string.empty": "Contact person number cannot be empty",
      }),

    start_time: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .required()
      .messages({
        "any.required": "Start time is required",
        "string.pattern.base": "Start time must be in HH:mm:ss format",
      }),

    end_time: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
      .required()
      .messages({
        "any.required": "End time is required",
        "string.pattern.base": "End time must be in HH:mm:ss format",
      }),

    // ✅ CONDITIONAL FIELDS
    number_of_drivers: Joi.string().when("location_type_id", {
      is: 3,
      then: Joi.required().messages({
        "any.required": "Number of drivers is required when location type is 3",
      }),
      otherwise: Joi.optional(),
    }),
    number_of_people: Joi.string().when("location_type_id", {
      is: Joi.valid(1, 2, 4),
      then: Joi.required().messages({
        "any.required": "Number of people is required when location type is 3",
      }),
      otherwise: Joi.optional(),
    }),

    number_of_fleets: Joi.string().when("location_type_id", {
      is: 3,
      then: Joi.required().messages({
        "any.required": "Number of fleets is required when location type is 3",
      }),
      otherwise: Joi.optional(),
    }),

    number_of_vehicles: Joi.string().when("location_type_id", {
      is: 3,
      then: Joi.required().messages({
        "any.required": "Number of vehicles is required when location type is 3",
      }),
      otherwise: Joi.optional(),
    }),

    brand_id: Joi.number()
      .integer()
      .when("location_type_id", {
        is: 3,
        then: Joi.required().messages({
          "any.required": "Brand is required when location type is 3",
          "string.empty": "Brand cannot be empty",
        }),
        otherwise: Joi.optional(),
      }),

    number_of_brand_vehicle: Joi.string().when("location_type_id", {
      is: 3,
      then: Joi.required().messages({
        "any.required": "Number of brand vehicles is required when location type is 3",
        "string.empty": "Number of brand vehicles cannot be empty",
      }),
      otherwise: Joi.optional(),
    }),
  }),
});
