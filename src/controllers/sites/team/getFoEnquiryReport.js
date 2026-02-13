import { Op, literal } from "sequelize";
import models from "../../../models/index.js";
import moment from "moment";
import { paginationService, teamService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";

const { pmsFoEnquaries, pmsProjectTeams, pmsProject, pmsUser, pmsDealership, pmsGift } = models;

export const getFoEnquiryReport = async (req, res, next) => {
  try {
    const reqBody = req.body;
    console.log(reqBody);

    const page = reqBody.page ? parseInt(reqBody.page) : null;
    const limit = reqBody.limit ? parseInt(reqBody.limit) : null;

    const userId = req.userDetails?.userId;
    const roleId = req.userDetails?.role_id;

    const reportFor = reqBody.report_for;
    // const startDate = reqBody.start_date;
    // const endDate = reqBody.end_date;
    const teamId = reqBody.team_id;

    const team = await teamService.getTeamId(teamId);
    console.log(team);

    if (!team) {
      throw StatusError.badRequest("Team ID not found");
    }

    const include = [
      { model: pmsProjectTeams, as: "project_team" },
      { model: pmsProject, as: "project_data" },
      { model: pmsUser, as: "user_data_created" },
      { model: pmsUser, as: "user_data_updated" },
      { model: pmsDealership, as: "dealership_data" },
      { model: pmsGift, as: "gift_data" },
    ];

    const teamFoIds = team.fo_ids?.split(",") || [];

    let foId = null;

    if (teamFoIds.includes(String(userId))) {
      foId = userId;
    }

    if (roleId === 9 && !foId) {
      throw StatusError.forbidden("You are not assigned to the project.");
    }

    const whereClause = {
      project_id: team.project_id,
      status: "1",
      team_id: teamId,
    };

    if (foId) {
      whereClause[Op.and] = [
        ...(whereClause[Op.and] || []),
        literal(`FIND_IN_SET(${foId}, pmsFoEnquaries.fo_ids)`),
      ];
    }

    let condition = { ...whereClause };

    if (reportFor === "today") {
      const today = new Date().toISOString().split("T")[0];
      condition.created_at = {
        [Op.between]: [`${today} 00:00:00`, `${today} 23:59:59`],
      };
    }
    // } else if (startDate && endDate) {
    //   condition.created_at = {
    //     [Op.between]: [`${startDate} 00:00:00`, `${endDate} 23:59:59`],
    //   };
    // } else if (startDate) {
    //   condition.created_at = {
    //     [Op.between]: [`${startDate} 00:00:00`, `${startDate} 23:59:59`],
    //   };
    // } else if (endDate) {
    //   condition.created_at = {
    //     [Op.between]: [`${endDate} 00:00:00`, `${endDate} 23:59:59`],
    //   };
    // }

    const searchParams = {
      page,
      limit,
      sortBy: "id",
      sortOrder: "ASC",
    };

    const { count, rows } = await paginationService.pagination(
      searchParams,
      pmsFoEnquaries,
      include,
      condition,
    );

    let previousCreatedAt = null;

    const formattedData = rows.map((item) => {
      const data = item.toJSON();
      data.team_name = item.project_team?.team_name ?? null;
      data.project_name = item.project_data?.project_name ?? null;
      data.enquiry_created_by = item.user_data_created?.name ?? null;
      data.enquiry_updated_by = item.user_data_updated?.name ?? null;
      data.dealership_name = item.dealership_data?.dealer_name ?? null;
      data.gift_name = item.gift_data?.gift_name ?? null;

      if (reportFor === "today") {
        if (previousCreatedAt) {
          const diffSeconds = moment(data.created_at).diff(moment(previousCreatedAt), "seconds");

          const hours = Math.floor(diffSeconds / 3600);
          const minutes = Math.floor((diffSeconds % 3600) / 60);
          const seconds = diffSeconds % 60;

          const parts = [];
          if (hours) parts.push(`${hours} hour`);
          if (minutes) parts.push(`${minutes} min`);
          if (seconds || !parts.length) parts.push(`${seconds} sec`);

          data.diff_time = parts.join(" ");
        } else {
          data.diff_time = null;
        }

        previousCreatedAt = data.created_at;
      }

      delete data.project_team;
      delete data.fyear;
      delete data.project_data;
      delete data.user_data_created;
      delete data.user_data_updated;
      delete data.dealership_data;
      delete data.gift_data;

      return data;
    });

    return res.ok({
      result: {
        status: 200,
        success: formattedData.length ? 1 : 0,
        response: formattedData,
        message: "",
        token: "",
      },
    });
  } catch (error) {
    console.error("getFoEnquiryReport error:", error);
    next(error);
  }
};
