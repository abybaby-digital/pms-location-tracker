import { activityLogService } from "../../../services/index.js";

export const logHistoryController = async (req, res) => {
  const userId = req.userDetails.userId;

  const rows = await activityLogService.logHistory(userId);
  if (!rows.length) {
    return res.ok({
      result: { success: true, status: 200, message: "", response: null },
    });
  }

  const ACTIVITY_MAP = {
    1: "CHECK_IN",
    0: "CHECK_OUT",
    3: "RECHECK_IN",
    4: "RECHECK_OUT",
    5: "FORM_SUBMIT",
  };

  const grouped = {};

  for (const row of rows) {
    const locationId = row.location.id; // ✅ FIX

    if (!grouped[locationId]) {
      grouped[locationId] = {
        id: row.location.id,
        location_name: row.location.location_name,
        location_type_id: row.location.location_type_id,
        latitude: row.location.latitude,
        longitude: row.location.longitude,
        pincode: row.location.pincode,

        checkin: 0,
        checkout: 0,

        number_of_people: row.location.number_of_people,
        contact_person_name: row.location.contact_person_name,
        contact_person_number: row.location.contact_person_number,
        start_time: row.location.start_time,
        end_time: row.location.end_time,

        status: row.location.status,
        created_at: row.location.created_at,
        updated_at: row.location.updated_at,
        created_by: row.location.created_by,
        updated_by: row.location.updated_by,

        location_type_name: row.location.location_type.location_type_name,

        logs: [],
        current_status: null,
        _latestTime: null,
      };
    }

    // ✅ push activity log
    grouped[locationId].logs.push({
      id: row.id,
      activity_type: row.activity_type,
      activity_time: row.activity_time,
    });

    // ✅ compute latest status
    const activityTime = new Date(row.activity_time);

    if (!grouped[locationId]._latestTime || activityTime > grouped[locationId]._latestTime) {
      grouped[locationId]._latestTime = activityTime;

      const status = ACTIVITY_MAP[row.activity_type];
      grouped[locationId].current_status = status;

      grouped[locationId].checkin = status === "CHECK_IN" || status === "RECHECK_IN" ? 1 : 0;

      grouped[locationId].checkout = status === "CHECK_OUT" || status === "RECHECK_OUT" ? 1 : 0;
    }
  }

  const locations = Object.values(grouped);

  // ✅ pick latest location globally
  const latestLocation = locations.reduce((a, b) => (b._latestTime > a._latestTime ? b : a));

  delete latestLocation._latestTime;

  return res.ok({
    result: {
      success: true,
      status: 200,
      message: "",
      response: latestLocation,
    },
  });
};
