import db from "../../models/index.js";

export async function createUserCheckIn(
  user_id,
  location_id,
  latitude,
  longitude,
  transaction = null,
) {
  const checkInUser = await db.pmsUserCheckin.create(
    {
      user_id,
      location_id,
      checkin_latitude: latitude,
      checkin_longitude: longitude,
      checkin_time: new Date(),
      status: "1",
      current_status: "CHECK_IN",
    },
    { transaction },
  );

  return checkInUser;
}
