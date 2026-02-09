import { Op, literal } from "sequelize";
import models from "../../../models/index.js";
import { paginationService, commonService } from "../../../services/index.js";
import { envs } from "../../../config/envs.js";

const { pmsFoPaymentRequisition, pmsProject, pmsBranch, pmsUser } = models;

export const getFoPaymentRequisitionList = async (req, res, next) => {
  try {
    const reqBody = req.body;

    const page = parseInt(reqBody.page || 1);
    const limit = parseInt(reqBody.limit || envs.DEFAULT_PAGE_LIMIT);

    const projectId = parseInt(reqBody.project_id || 0);
    const projectNo = parseInt(reqBody.project_no || 0);
    const branchId = parseInt(reqBody.branch_id || 0);
    const status = reqBody.status ?? "";

    const financial_year_id =
      reqBody.financial_year_id ?? (await commonService.getCurrentFinancialYearId());

    const loginUserId = req.userDetails?.userId;
    const roleId = req.userDetails?.role_id;

    const condition = {};

    if (loginUserId && ![1, 2, 3, 4].includes(loginUserId)) {
      switch (roleId) {
        case 5:
          condition[Op.and] = literal(`FIND_IN_SET(${loginUserId}, vertical_head_id)`);
          break;
        case 6:
          condition[Op.and] = literal(`FIND_IN_SET(${loginUserId}, business_manager_id)`);
          break;
        case 7:
          condition[Op.and] = literal(
            `(FIND_IN_SET(${loginUserId}, client_service_id)
              OR FIND_IN_SET(${loginUserId}, other_members_id))`,
          );
          break;
        case 8:
          condition[Op.and] = literal(
            `(FIND_IN_SET(${loginUserId}, activity_coordinator_id)
              OR FIND_IN_SET(${loginUserId}, activity_coordinator_other_id))`,
          );
          break;
        case 9:
          condition.assign_fo_id = loginUserId;
          break;
        default:
          condition.created_by = loginUserId;
      }
    }

    if (["0", "1", "2"].includes(status)) condition.status = status;
    if (projectId > 0) condition.project_id = projectId;
    if (projectNo > 0) condition.project_number = projectNo;
    if (branchId > 0) condition.branch_id = branchId;
    if (financial_year_id) condition.financial_year = financial_year_id;

    const include = [
      { model: pmsProject, as: "project" },
      { model: pmsBranch, as: "branch" },
      { model: pmsUser, as: "userFoData" },
      { model: pmsUser, as: "userCreatedByData" },
      { model: pmsUser, as: "userUpdatedByData" },
    ];

    const { rows, count } = await paginationService.pagination(
      { page, limit, sortBy: "id", sortOrder: "DESC" },
      pmsFoPaymentRequisition,
      include,
      condition,
    );

    const adminUsers = await pmsUser.findAll({
      condition: { id: [1, 2, 3, 4] },
      attributes: {
        exclude: ["password", "remember_token", "access_token", "firebase_token"],
      },
    });

    const adminMap = {};
    adminUsers.forEach((u) => (adminMap[u.id] = u.toJSON()));

    const setUser = (approveStatus, userId) =>
      [1, 2].includes(Number(approveStatus)) ? adminMap[userId] ?? null : null;

    const response = rows.map((item) => {
      const row = item.toJSON();

      const projectName = item.project?.project_name ?? null;
      const projectNumber = item.project?.project_number ?? null;
      const branchName = item.branch?.branch_name ?? null;
      const createdByName = item.userCreatedByData?.name ?? null;
      const updatedByName = item.userUpdatedByData?.name ?? null;
      const foName = item.userFoData?.name ?? null;
      const aadhaarNo = item.userFoData?.aadhaar_no ?? null;
      const userFoData = item.userFoData ?? null;

      delete row.project;
      delete row.branch;
      delete row.userFoData;
      delete row.userCreatedByData;
      delete row.userCreatedByData;

      return {
        ...row,
        project_name: projectName,
        project_number: projectNumber,
        branch_name: branchName,
        created_by_name: createdByName,
        updated_by_name: updatedByName,
        fo_name: foName,
        aadhaar_no: aadhaarNo,
        admin: setUser(row.admin_approve_status, 1),
        finance: setUser(row.finance_approve_status, 2),
        purchase: setUser(row.purchase_approve_status, 3),
        accountent: setUser(row.accountent_approve_status, 4),
        user_fo_data: userFoData,
      };
    });

    return res.ok({
      result: {
        status: 200,
        success: response.length ? 1 : 0,
        totalRecords: count,
        response,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
