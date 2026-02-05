import db from "../../models/index.js";

export async function closeSession(session_id, transaction = null) {
  const session = await db.pmsUserLocationSessions.update(
    {
      activity_status: "CLOSED",
      manual_checkout_time: new Date(),
    },
    {
      where: { id: session_id },
      transaction,
    },
  );

  return session;
}
