import { celebrate, Joi, Segments } from "celebrate";

export const addFoExpensesValidation = celebrate({
  [Segments.BODY]: Joi.object({
    fo_payment_requisition_id: Joi.string().required().messages({
      "string.base": `"fo_payment_requisition_id" must be a string`,
      "any.required": `"fo_payment_requisition_id" is required`,
    }),

    exp_reason: Joi.string().required().messages({
      "string.base": `"exp_reason" must be a string`,
      "any.required": `"exp_reason" is required`,
    }),

    exp_amount: Joi.string().required().messages({
      "string.base": `"exp_amount" must be a string`,
      "any.required": `"exp_amount" is required`,
    }),
  }),
});
