import db from "../../models/index.js";

export const getProjectName = async (project_id) => {
  const result = await db.pmsProject.findOne({
    where: {
      id: project_id,
    },
    attributes: ["project_name"],
    raw: true,
  });
  return result;
};
