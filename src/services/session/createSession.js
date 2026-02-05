import db from "../../models/index.js";

export async function createSession(data, transaction = null) {
  const createdSession = await db.pmsUserLocationSessions.create(
    {
      user_id: data.user_id,
      location_id: data.location_id,
      manual_checkin_time: data.manual_checkin_time || new Date(),
      activity_status: "ACTIVE",
    },
    { transaction },
  );
  return createdSession;
}
