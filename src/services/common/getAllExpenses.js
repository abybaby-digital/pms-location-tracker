import db from "../../models/index.js";

export const getAllExpenses = async (project_id) => {
  const result = db.pmsFoExpenses.findAll({
    where: {
      project_id,
    },
    raw: true,
  });
  return result;
};
