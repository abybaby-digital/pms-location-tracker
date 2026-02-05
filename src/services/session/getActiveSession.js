import db from "../../models/index.js";

export async function getActiveSession(user_id, transaction = null) {
  const activeSession = await db.pmsUserLocationSessions.findOne({
    where: {
      user_id,
      activity_status: "ACTIVE",
    },
    raw: true,
    transaction,
  });

  return activeSession;
}
