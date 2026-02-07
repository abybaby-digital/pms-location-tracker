import { commonService } from "../../../services/index.js";

export const getfinancialYear = async (req, res) => {
  const financialYearData = await commonService.getFinancialYear();
  if (!financialYearData) {
    return res.ok({
      result: {
        success: false,
        status: 404,
        message: "no data found",
        response: null,
      },
    });
  }

  return res.ok({
    result: {
      success: true,
      status: 200,
      response: financialYearData,
      message: "",
    },
  });
};
