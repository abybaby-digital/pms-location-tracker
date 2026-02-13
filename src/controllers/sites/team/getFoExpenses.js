import { commonService, teamService } from "../../../services/index.js";

export const getFoExpenses = async (req, res) => {
  const { project_id } = req.body;
  const name = req.userDetails.name;
  try {
    const expensesData = await commonService.getAllExpenses(project_id);

    let resultData = [];
    for (let data of expensesData) {
      const projectid = data.project_id;
      const teamid = data.team_id;
      const projectName = await teamService.getProjectName(projectid);
      const teamName = await teamService.getTeamId(teamid);

      resultData.push({
        ...data,
        fo_name: name,
        project_name: projectName.project_name,
        team_name: teamName.team_name,
      });
    }

    return res.ok({
      result: {
        status: 200,
        success: 0,
        response: resultData,
        message: "FO expenses data added",
        token: "",
      },
    });
  } catch (error) {
    console.log(error);
    return res.ok({
      result: {
        status: 500,
        success: 1,
        response: null,
        message: error.message,
        token: "",
      },
    });
  }
};
