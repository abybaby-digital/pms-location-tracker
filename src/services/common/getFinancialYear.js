import db from "../../models/index.js";

export const getFinancialYear = async () => {
  const data = await db.pmsFinancialYear.findAll({
    where: { status: "1" },
  });
  return data;
};
