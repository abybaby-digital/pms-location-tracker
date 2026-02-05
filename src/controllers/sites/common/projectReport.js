import { commonService } from "../../../services/index.js";

export const projectReport = async (req, res, next) => {
  try {
    const loginUserId = req.userDetails?.userId || null;
    const roleId = req.userDetails?.role_id || null;

    // Get current financial year id
    const currentFinancialYear = await commonService.getCurrentFinancialYearId();

    // Get report data
    const results = await commonService.getProjectReportData(
      loginUserId,
      roleId,
      currentFinancialYear,
    );

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "all data fetched",
        response: results,
      },
    });
  } catch (error) {
    console.error("Project Report Error:", error);
    next(error);
  }
};

// import models from "../../../models/index.js";
// import { envs } from "../../../config/envs.js";
// import { Op } from "sequelize";
// import { commonService } from "../../../services/index.js";

// export const projectReport = async (req, res, next) => {
//   try {
//     const reqBody = req.body;
//     const loginUserId = req.userDetails?.userId || null;
//     const roleId = req.userDetails?.role_id || null;

//     const currentFinancialYear = await commonService.getCurrentFinancialYearId();

//     const projectReport = await commonService.getProjectReportData(loginUserId,roleId,currentFinancialYear);

//     res.ok({
//       total_records: results.length,
//       results,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };
