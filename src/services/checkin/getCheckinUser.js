import db from "../../models/index.js";

export const getcheckInUser = async (userId, locationId) => {
  const checkInRecord = await db.pmsUserCheckin.findOne({
    where: {
      user_id: userId,
      location_id: locationId,
      current_status: "1", // CHECK_IN status
    },
  });
  return checkInRecord;
};
