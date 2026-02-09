import models from "../../models/index.js";
const { pmsProjectTeams } = models;

export const getTeamId = async (teamId) => {
  const result = await pmsProjectTeams.findOne({
    where: { id: teamId, status: "1" },
    raw: true,
  });
  return result;
};
