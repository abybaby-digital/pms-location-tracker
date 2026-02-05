import db from "../../models/index.js";
export const getLogHistory = async (user_id) => {
  const locations = await db.pmsLocation.findAll({
    include: [
      {
        model: db.pmsUser_activities,
        as: "logs",
        where: {
          user_id: user_id, // 🔑 THIS is the filter
          status: "1",
        },
        required: true, // 🔑 only locations with logs
        attributes: ["id", "activity_type", "activity_time", "status"],
        order: [["activity_time", "DESC"]],
      },
      {
        model: db.pmsUserCheckin,
        as: "checkins",
        where: {
          user_id: user_id, // 🔑 THIS is the filter
          status: "1",
        },
        required: false, // include even if no check-ins
        attributes: ["current_status"],
      },
      {
        model: db.pmsLocationType,
        as: "location_type",
        attributes: ["location_type_name"],
      },
      {
        model: db.pmsStandDetails,
        as: "stand_details",
        required: false, // only present for STAND
      },
    ],
    raw: true,
    nest: true,
  });
  return locations;
};

export const loghistory = async (user_id) => {
  const rows = await db.pmsLocation.findAll({
    include: [
      {
        model: db.pmsUser_activities,
        as: "logs",
        where: { user_id, status: "1" },
        required: true,
        attributes: ["id", "activity_type", "activity_time"],
      },
      {
        model: db.pmsLocationType,
        as: "location_type",
        attributes: ["location_type_name"],
      },
    ],
    order: [[{ model: db.pmsUser_activities, as: "logs" }, "activity_time", "ASC"]],
    raw: true,
    nest: true,
  });

  if (!rows.length) return null;

  const ACTIVITY_MAP = {
    1: "CHECK_IN",
    0: "CHECK_OUT",
    5: "RECHECK_OUT",
    4: "RECHECK_IN",
  };

  const grouped = {};

  for (const row of rows) {
    const locationId = row.id;

    if (!grouped[locationId]) {
      grouped[locationId] = {
        id: row.id,
        location_name: row.location_name,
        location_type_id: row.location_type_id,
        latitude: row.latitude,
        longitude: row.longitude,
        pincode: row.pincode,

        checkin: 0,
        checkout: 0,

        number_of_people: row.number_of_people,
        contact_person_name: row.contact_person_name,
        contact_person_number: row.contact_person_number,
        start_time: row.start_time,
        end_time: row.end_time,

        status: row.status,
        created_at: row.created_at,
        updated_at: row.updated_at,
        created_by: row.created_by,
        updated_by: row.updated_by,

        location_type_name: row.location_type.location_type_name,
        logs: [],
        current_status: null,
        _latestTime: null, // internal helper
      };
    }

    // collect logs
    if (row.logs?.id) {
      grouped[locationId].logs.push(row.logs);
    }

    // derive latest status safely
    if (row.logs?.activity_time) {
      const activityTime = new Date(row.logs.activity_time);

      if (!grouped[locationId]._latestTime || activityTime > grouped[locationId]._latestTime) {
        grouped[locationId]._latestTime = activityTime;

        const status = ACTIVITY_MAP[row.logs.activity_type];
        grouped[locationId].current_status = status;

        grouped[locationId].checkin =
          status === "CHECK_IN" ? 1 : 0 || status === "RECHECK_IN" ? 1 : 0;
        grouped[locationId].checkout =
          status === "CHECK_OUT" ? 1 : 0 || status === "RECHECK_OUT" ? 1 : 0;
      }
    }
  }

  const locations = Object.values(grouped);

  // pick location with latest activity globally
  const latestLocation = locations.reduce((latest, current) => {
    return current._latestTime > latest._latestTime ? current : latest;
  });

  delete latestLocation._latestTime;

  return latestLocation; // ✅ single latest location
};
