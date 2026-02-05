import db from "../../models/index.js";

export async function deleteLogsBySession(session_id, transaction = null) {
  const deleteActivity = await db.pmsUser_activitiesLog.destroy({
    where: { session_id },
    transaction,
  });

  return deleteActivity;
}
