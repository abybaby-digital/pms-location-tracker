import db from "../../models/index.js";

export const logHistory = async (userId) => {
  return await db.pmsUser_activitiesLog.findAll({
    where: { user_id: userId },
    attributes: ["id", "session_id", "activity_type", "activity_time"],
    include: [
      {
        model: db.pmsUserLocationSessions,
        as: "session",
        attributes: ["id", "activity_status"],
      },
      {
        model: db.pmsLocation,
        as: "location",
        include: [
          {
            model: db.pmsLocationType,
            as: "location_type",
            attributes: ["location_type_name"],
          },
        ],
      },
    ],
    order: [["activity_time", "ASC"]],
    raw: true,
    nest: true,
  });
};
export const closedLogHistory = async (userId, sessionId) => {
  const rows = await db.pmsUser_activitiesLog.findAll({
    where: {
      user_id: userId,
      session_id: sessionId,
    },
    attributes: ["id", "activity_type", "activity_time"],
    include: [
      {
        model: db.pmsLocation,
        as: "location",
        attributes: [
          "id",
          "location_name",
          "location_type_id",
          "latitude",
          "longitude",
          "pincode",
          "number_of_people",
          "contact_person_name",
          "contact_person_number",
          "start_time",
          "end_time",
          "status",
          "created_at",
          "updated_at",
          "created_by",
          "updated_by",
        ],
        include: [
          {
            model: db.pmsLocationType,
            as: "location_type",
            attributes: ["location_type_name"],
          },
        ],
      },
    ],
    order: [["activity_time", "ASC"]], // 👈 history order
    raw: true,
    nest: true,
  });
  return rows;
};
