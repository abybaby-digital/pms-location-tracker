import { Op, literal } from "sequelize";
import models from "../../../models/index.js";
import { paginationService, teamService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";

const {
  pmsProjectActivityPhoto,
  pmsProjectTeams,
  pmsProject,
  pmsUser,
} = models;

export const getActivityPhotoByTeamId = async (req, res, next) => {
  try {
    const {
      team_id: teamId,
      start_date: startDate,
      end_date: endDate,
      page,
      limit,
    } = req.body;

    const userId = req.userDetails?.userId;
    const roleId = req.userDetails?.role_id;

    /* ---------------- TEAM VALIDATION ---------------- */
    const team = await teamService.getTeamId(teamId);
    if (!team) {
      throw StatusError.badRequest("Team not found");
    }

    const projectId = team.project_id;

    /* ---------------- FO ACCESS CHECK ---------------- */
    if (roleId === 9) {
      const foIds = team.fo_ids?.split(",") || [];
      if (!foIds.includes(String(userId))) {
        throw StatusError.forbidden("You are not assigned to the project.");
      }
    }

    /* ---------------- WHERE CLAUSE ---------------- */
    const whereClause = {
      team_id: teamId,
      project_id: projectId,
      status: "1",
    };

    // FO restriction
    if (roleId === 9) {
      whereClause[Op.and] = [
        literal(`FIND_IN_SET(${userId}, pmsProjectActivityPhoto.fo_ids)`),
      ];
    }

    // Date filters
    if (startDate && endDate) {
      whereClause.created_at = {
        [Op.between]: [`${startDate} 00:00:00`, `${endDate} 23:59:59`],
      };
    } else if (startDate) {
      whereClause.created_at = {
        [Op.between]: [`${startDate} 00:00:00`, `${startDate} 23:59:59`],
      };
    } else if (endDate) {
      whereClause.created_at = {
        [Op.between]: [`${endDate} 00:00:00`, `${endDate} 23:59:59`],
      };
    }

    /* ---------------- INCLUDES ---------------- */
    const include = [
      {
        model: pmsProjectTeams,
        as: "project_team",
        attributes: ["team_name"],
      },
      {
        model: pmsProject,
        as: "project_data",
        attributes: ["project_name"],
      },
      {
        model: pmsUser,
        as: "user_data_created",
        attributes: ["name"],
      },
      {
        model: pmsUser,
        as: "user_data_updated",
        attributes: ["name"],
      },
    ];

    /* ---------------- PAGINATION ---------------- */
    const { count, rows } = await paginationService.pagination(
      {
        page,
        limit,
        sortBy: "id",
        sortOrder: "DESC",
      },
      pmsProjectActivityPhoto,
      include,
      whereClause,
    );

    /* ---------------- FORMAT RESPONSE ---------------- */
    const path =
      "https://d1b0j0djmkh9z0.cloudfront.net/storage/activity/";

    const formattedData = rows.map((item) => {
      const data = item.toJSON();

      data.team_name = item.project_team?.team_name ?? null;
      data.project_name = item.project_data?.project_name ?? null;
      data.team_created_by = item.user_data_created?.name ?? null;
      data.team_updated_by = item.user_data_updated?.name ?? null;

      data.activity_photo = data.activity_photo
        ? path + data.activity_photo
        : null;

      // REMOVE RELATIONS (Laravel-style)
      delete data.project_team;
      delete data.project_data;
      delete data.user_data_created;
      delete data.user_data_updated;

      return data;
    });

    /* ---------------- RESPONSE ---------------- */
    return res.ok({
      result: {
        status: 200,
        success: 1,
        totalRecords: count,
        response: formattedData,
        message: "",
        token: "",
      },
    });
  } catch (error) {
    console.error("getActivityPhotoByTeamId error:", error);
    next(error);
  }
};
