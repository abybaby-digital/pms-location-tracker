import db from "../../models/index.js";

export async function updateUserCheckIn(user_id, latitude, longitude, transaction = null) {
  const updatedUser = await db.pmsUserCheckin.update(
    {
      checkout_latitude: latitude,
      checkout_longitude: longitude,
      checkout_time: new Date(),
      current_status: "CHECK_OUT",
    },
    {
      where: {
        user_id,
        status: "1",
      },
      transaction,
    },
  );

  return updatedUser;
}
