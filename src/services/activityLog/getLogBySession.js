import db from "../../models/index.js";

export async function getLogsBySession(session_id) {
  const activityLog = await db.pmsUser_activitiesLog.findAll({
    where: {
      session_id,
    },
    order: [["activity_time", "DESC"]],
    raw: true,
  });

  return activityLog;
}
