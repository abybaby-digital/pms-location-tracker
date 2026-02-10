import { celebrate, Joi, Segments } from "celebrate";

export const foEnquiryReportvalidiate = celebrate({
  [Segments.BODY]: Joi.object({
    team_id: Joi.number()
      .integer()
      .optional()
      .empty(["", null]),

    start_date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .empty(["", null])
      .messages({
        "string.pattern.base": "Start date must be in YYYY-MM-DD format.",
      }),

    end_date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .empty(["", null])
      .messages({
        "string.pattern.base": "End date must be in YYYY-MM-DD format.",
      }),

    page: Joi.number()
      .integer()
      .optional()
      .empty(["", null]),

    limit: Joi.number()
      .integer()
      .optional()
      .empty(["", null]),
  }),
});
