import db from "../../models/index.js";

export const updateUserCheckIn = async (userId, latitude, longitude) => {
  await db.pmsUserCheckin.update(
    {
      current_status: "0",
      checkout_latitude: latitude,
      checkout_longitude: longitude,
      checkout_time: new Date(),
      updated_by: Number(userId),
      updated_at: new Date(),
    },
    {
      where: {
        user_id: userId,
        current_status: "1",
      },
    },
  );
};
