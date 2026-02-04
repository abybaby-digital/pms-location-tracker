import db from "../../models/index.js";

export const createActivityLog = async (userId, location_id, activity_type) => {
  const activity = await db.pmsUser_activities.create({
    user_id: userId,
    location_id: location_id,
    activity_type: activity_type,
    activity_time: new Date(),
  });

  return activity;
};
