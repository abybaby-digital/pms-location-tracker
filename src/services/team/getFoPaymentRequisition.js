import db from "../../models/index.js";

export const getFoPaymentRequisition = async (id) => {
  const result = await db.pmsFoPaymentRequisition.findOne({
    where: { id: id, status: "1" },
    raw: true,
  });
  return result;
};
