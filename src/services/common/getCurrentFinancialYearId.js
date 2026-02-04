import dayjs from "dayjs";
import models from "../../models/index.js";
const { pmsFinancialYear } = models;

export const getCurrentFinancialYearId = async () => {
  const currentDate = dayjs();
  const startMonth = 4; // April

  const startYear =
    currentDate.month() + 1 >= startMonth
      ? currentDate.year()
      : currentDate.year() - 1;

  const endYear = startYear + 1;

  const financialYear = `${startYear}-${String(endYear).slice(-2)}`;

  const financialYearId = await pmsFinancialYear.findOne({
    where: { financial_year: financialYear },
    attributes: ["id"],
    raw: true,
  });

  return financialYearId?.id ?? null;
};
