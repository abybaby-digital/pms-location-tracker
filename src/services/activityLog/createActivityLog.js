import db from "../../models/index.js";

export async function createActivityLog(data, transaction = null) {
  const createdLog = await db.pmsUser_activitiesLog.create(
    {
      session_id: data.session_id,
      user_id: data.user_id,
      location_id: data.location_id,
      activity_type: data.activity_type,
      activity_source: data.activity_source, // MANUAL / AUTO / SYSTEM
      activity_time: data.activity_time || new Date(),
      status: "1",
    },
    { transaction },
  );
  return createdLog;
}
