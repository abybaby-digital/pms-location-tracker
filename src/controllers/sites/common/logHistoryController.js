import { activityLogService } from "../../../services/index.js";

export const logHistoryController = async (req, res) => {
  const userId = req.userDetails.userId;

  const rows = await activityLogService.logHistory(userId);

  if (!rows.length) {
    return res.ok({
      result: {
        success: true,
        status: 200,
        message: "",
        response: {
          current_work: null,
          previous_work: [],
        },
      },
    });
  }

  const ACTIVITY_MAP = {
    1: "CHECK_IN",
    0: "CHECK_OUT",
    3: "RECHECK_IN",
    4: "RECHECK_OUT",
    5: "FORM_SUBMIT",
  };

  const sessionsGrouped = {};

  for (const row of rows) {
    const sessionId = row.session.id; // ✅ GROUP BY SESSION

    if (!sessionsGrouped[sessionId]) {
      sessionsGrouped[sessionId] = {
        session_id: sessionId,
        activity_status: row.session.activity_status,

        id: row.location.id,
        location_name: row.location.location_name,
        location_type_id: row.location.location_type_id,
        latitude: row.location.latitude,
        longitude: row.location.longitude,
        pincode: row.location.pincode,
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

    sessionsGrouped[sessionId].logs.push({
      id: row.id,
      activity_type: row.activity_type,
      activity_time: row.activity_time,
    });

    const activityTime = new Date(row.activity_time);

    if (
      !sessionsGrouped[sessionId]._latestTime ||
      activityTime > sessionsGrouped[sessionId]._latestTime
    ) {
      sessionsGrouped[sessionId]._latestTime = activityTime;

      const status = ACTIVITY_MAP[row.activity_type];
      sessionsGrouped[sessionId].current_status = status;

      sessionsGrouped[sessionId].checkin =
        status === "CHECK_IN" || status === "RECHECK_IN" || status === "RECHECK_OUT" ? 1 : 0;

      sessionsGrouped[sessionId].checkout = status === "CHECK_OUT" ? 1 : 0;
    }
  }

  const allSessions = Object.values(sessionsGrouped);

  let currentWork = null;
  const previousWork = [];

  for (const session of allSessions) {
    delete session._latestTime;

    if (session.activity_status === "ACTIVE") {
      currentWork = session;
    } else {
      delete session.checkin;
      delete session.checkout;
      previousWork.push(session);
    }
  }

  return res.ok({
    result: {
      success: true,
      status: 200,
      message: "",
      response: {
        current_work: currentWork,
        previous_work: previousWork,
      },
    },
  });
};
