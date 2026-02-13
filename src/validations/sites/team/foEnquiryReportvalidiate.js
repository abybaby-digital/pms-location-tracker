import { celebrate, Joi, Segments } from "celebrate";

export const foEnquiryReportvalidiate = celebrate({
  [Segments.BODY]: Joi.object({
    team_id: Joi.number().integer().optional().empty(["", null]),
    report_for: Joi.string()
      .valid("today", "all") // ✅ allowed values
      .required() // optional: if you want it required
      .messages({
        "any.only": `"report_for" must be one of [today, all]`,
        "string.base": `"report_for" must be a string`,
        "any.required": `"report_for" is required`,
      }),
    page: Joi.number().integer().optional().empty(["", null]),

    limit: Joi.number().integer().optional().empty(["", null]),
  }),
});
