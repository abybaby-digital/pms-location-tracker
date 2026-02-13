import { Op, literal } from "sequelize";
import models from "../../../models/index.js";
import { paginationService, commonService } from "../../../services/index.js";

const { pmsProject, pmsProjectTeams } = models;

export const getFoReport = async (req, res, next) => {
  try {
    const userId = req.userDetails?.userId;
    const roleId = req.userDetails?.role_id;

    const currentFinancialYearId = await commonService.getCurrentFinancialYearId();

    const currentWhere = {
      financial_year: currentFinancialYearId,
    };

    if (roleId === 9) {
      currentWhere[Op.and] = [literal(`FIND_IN_SET(${userId}, fo_ids)`)];
    }

    const currentProject = await pmsProject.findOne({
      where: currentWhere,
      order: [["id", "DESC"]],
    });

    const currentProjectId = currentProject?.id ?? null;

    let foAssign = null;

    if (currentProjectId) {
      foAssign = await pmsProjectTeams.findOne({
        where: {
          project_id: currentProjectId,
          [Op.and]: [literal(`FIND_IN_SET(${userId}, fo_ids)`)],
        },
      });
    }

    const previousWhere = {
      financial_year: currentFinancialYearId,
    };

    if (roleId === 9) {
      previousWhere[Op.and] = [literal(`FIND_IN_SET(${userId}, fo_history_ids)`)];
    }

    const previousProjects = await pmsProject.findAll({
      where: previousWhere,
      order: [["id", "DESC"]],
    });

    const formattedPreviousProjects = [];

    for (const project of previousProjects) {
      if (currentProjectId && project.id === currentProjectId) continue;

      const teamIds = project.team_id?.split(",") || [];

      formattedPreviousProjects.push({
        id: project.id,
        project_number: project.project_number,
        team_id: teamIds[1] ? parseInt(teamIds[1]) : parseInt(teamIds[0]),
        project_name: project.project_name,
        project_start_date: project.project_start_date,
        project_end_date: project.project_end_date,
      });
    }

    let formattedCurrentProject = null;

    if (currentProject) {
      formattedCurrentProject = {
        id: currentProject.id,
        project_number: currentProject.project_number,
        team_id: foAssign?.id ?? null,
        project_name: currentProject.project_name,
        project_start_date: currentProject.project_start_date,
        project_end_date: currentProject.project_end_date,
      };
    }

    const response = {
      current_project: formattedCurrentProject,
      previous_project: formattedPreviousProjects,
    };

    return res.ok({
      result: {
        status: 200,
        success: formattedCurrentProject || formattedPreviousProjects.length ? 1 : 0,
        response,
        message: "",
        token: "",
      },
    });
  } catch (error) {
    console.error("getFoReport error:", error);
    next(error);
  }
};
