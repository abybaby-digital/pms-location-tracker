import { Op, literal } from "sequelize";
import models from "../../../models/index.js";
import { commonService } from "../../../services/index.js";
import { envs } from "../../../config/envs.js";

const { pmsProjectTeams, pmsUser, pmsFinancialYear, pmsProject } = models;

export const getTeamList = async (req, res, next) => {
  try {
    const reqBody = req.body;

    const page = parseInt(reqBody.page || 1);
    const limit = parseInt(reqBody.limit || envs.DEFAULT_PAGE_LIMIT);
    const offset = (page - 1) * limit;

    const loginUserId = req.userDetails?.userId;
    const roleId = req.userDetails?.role_id;

    const financial_year_id =
      reqBody.financial_year_id ?? (await commonService.getCurrentFinancialYearId());

    const condition = {
      financial_year: financial_year_id,
    };

    switch (roleId) {
      case 5:
        condition[Op.and] = [literal(`FIND_IN_SET(${loginUserId}, pmsProject.vertical_head_id)`)];
        break;

      case 6:
        condition[Op.and] = [
          literal(`FIND_IN_SET(${loginUserId}, pmsProject.business_manager_id)`),
        ];
        break;

      case 7:
        condition[Op.and] = [
          literal(`
            FIND_IN_SET(${loginUserId}, pmsProject.client_service_id)
            OR FIND_IN_SET(${loginUserId}, pmsProject.other_members_id)
          `),
        ];
        break;

      case 8:
        condition[Op.and] = [
          literal(`
            FIND_IN_SET(${loginUserId}, pmsProject.activity_coordinator_id)
            OR FIND_IN_SET(${loginUserId}, pmsProject.activity_coordinator_other_id)
          `),
        ];
        break;

      case 9:
        condition[Op.and] = [literal(`FIND_IN_SET(${loginUserId}, pmsProject.fo_ids)`)];
        break;
    }

    const projects = await pmsProject.findAll({
      attributes: ["id"],
      where: condition,
    });

    if (!projects.length) {
      return res.ok({
        result: {
          status: 200,
          success: 0,
          totalRecords: 0,
          response: [],
        },
      });
    }

    const projectIds = projects.map((p) => p.id);

    const teamWhere = {
      status: { [Op.in]: ["1", "2"] },
    };

    if (roleId === 9) {
      teamWhere[Op.and] = [literal(`FIND_IN_SET(${loginUserId}, pmsProjectTeams.fo_ids)`)];
    } else if ([5, 6, 7, 8].includes(roleId)) {
      teamWhere.project_id = { [Op.in]: projectIds };
    }

    const include = [
      {
        model: pmsProject,
        as: "project",
        attributes: ["id", "project_name"],
      },
      {
        model: pmsFinancialYear,
        as: "fyear",
      },
      {
        model: pmsUser,
        as: "userCreatedByData",
        attributes: ["id", "name"],
      },
      {
        model: pmsUser,
        as: "userUpdatedByData",
        attributes: ["id", "name"],
      },
    ];

    const totalCount = await pmsProjectTeams.count({ where: teamWhere });

    const teams = await pmsProjectTeams.findAll({
      where: teamWhere,
      include,
      order: [["team_name", "ASC"]],
      offset,
      limit,
    });

    if (!teams.length) {
      return res.ok({
        result: {
          status: 200,
          success: 0,
          totalRecords: totalCount,
          response: [],
        },
      });
    }
    const response = await Promise.all(
      teams.map(async (item) => {
        const row = item.toJSON();

        let foUsers = [];
        if (row.fo_ids) {
          const foIds = row.fo_ids.split(",").map(Number).filter(Boolean);

          if (foIds.length) {
            foUsers = await pmsUser.findAll({
              where: { id: { [Op.in]: foIds } },
            });
          }
        }

        return {
          id: row.id,
          project_id: row.project_id,
          project_number: row.project_number,
          financial_year: row.financial_year,
          team_name: row.team_name,
          fo_ids: row.fo_ids,
          fo_main_id: row.fo_main_id,
          fo_junior_id: row.fo_junior_id,
          status: row.status,
          created_at: row.created_at,
          created_by: row.created_by,
          updated_at: row.updated_at,
          updated_by: row.updated_by,

          project_name: item.project?.project_name ?? null,
          team_created_by: item.userCreatedByData?.name ?? null,
          team_updated_by: item.userUpdatedByData?.name ?? null,

          fo_users: foUsers,
        };
      }),
    );

    return res.ok({
      result: {
        status: 200,
        success: 1,
        totalRecords: totalCount,
        response,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
