import db from "../../models/index.js";

export const createUserCheckIn = async (userId, locationId, latitude, longitude) => {
  await db.pmsUserCheckin.create({
    user_id: userId,
    location_id: locationId,
    checkin_latitude: latitude,
    checkin_longitude: longitude,
    checkin_time: new Date(),
    current_status: "1", // CHECK_IN status
    created_by: Number(userId),
    created_at: new Date(),
  });
};
