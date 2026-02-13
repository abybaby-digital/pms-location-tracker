import db from "../../models/index.js";

export const addFoExpenses = async (
  fo_payment_requisition,
  exp_reason,
  exp_amount,
  exp_attachment,
  fo_id,
) => {
  const result = await db.pmsFoExpenses.create({
    project_id: fo_payment_requisition.project_id,
    project_number: fo_payment_requisition.project_number,
    team_id: fo_payment_requisition.team_id,
    fo_payment_requisition_id: fo_payment_requisition.id,
    fo_id: fo_id,
    exp_reason: exp_reason,
    exp_amount: exp_amount,
    exp_attachment: exp_attachment,
    created_by: fo_id,
  });

  return result;
};
