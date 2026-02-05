import { locationHelper } from "../../../helpers/index.js";
import { activityLogService, locationService, sessionService } from "../../../services/index.js";

export const autoCheckin = async (req, res) => {
  const { latitude, longitude, location_id } = req.body;

  console.log("hello");

  const userId = req.userDetails.userId;

  const userActiveSession = await sessionService.getActiveSession(userId);

  if (!userActiveSession) {
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "please do manual checkin first",
        response: null,
      },
    });
  }

  // 1️⃣ Find nearby locations using bounding box
  const box = locationHelper.getBoundingBox(latitude, longitude, 1);
  const locations = await locationService.getLocationFroCheckIn(box);

  // 2️⃣ No nearby location → AUTO CHECKOUT if user is checked-in
  if (!locations.length) {
    const activeSession = await sessionService.getActiveSession(userId);

    if (!activeSession) {
      return res.ok({
        result: {
          status: 200,
          success: true,
          message: "No active check-in found",
          response: null,
        },
      });
    }

    await activityLogService.createActivityLog({
      session_id: activeSession.id,
      user_id: userId,
      location_id: activeSession.location_id,
      activity_type: 4, // AUTO_CHECKOUT
      activity_source: "AUTO",
    });

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "Auto check-out successful",
        response: 0,
      },
    });
  }

  // 3️⃣ Find nearest location
  let nearest = null;
  let minDistance = Infinity;

  for (const loc of locations) {
    const dist = locationHelper.distanceInMeters(latitude, longitude, loc.latitude, loc.longitude);

    if (dist < minDistance) {
      minDistance = dist;
      nearest = loc;
    }
  }

  // 4️⃣ Within range → AUTO CHECKIN
  if (minDistance <= 700) {
    const activeSession = await sessionService.getActiveSession(userId);

    const userActivityLog = await activityLogService.getLogsBySession(activeSession.id);

    if (activeSession.activity_status === "ACTIVE") {
      if (userActivityLog[0].activity_type === 1 || userActivityLog[0].activity_type === 3) {
        return res.ok({
          result: {
            status: 200,
            success: true,
            message: "Already checked in",
            response: 1,
          },
        });
      }
      if (userActivityLog[0].activity_type === 4) {
        await activityLogService.createActivityLog({
          session_id: activeSession.id,
          user_id: userId,
          location_id: nearest.id,
          activity_type: 3, // AUTO_CHECKIN
          activity_source: "AUTO",
        });
        return res.ok({
          result: {
            status: 200,
            success: true,
            message: "Auto check-in successful",
            response: 0,
          },
        });
      }
    }

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "please do manual checkin first",
        response: null,
      },
    });
  }

  // 5️⃣ Out of range → AUTO CHECKOUT
  const activeSession = await sessionService.getActiveSession(userId);

  if (!activeSession) {
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "No active check-in found",
        response: null,
      },
    });
  }

  await activityLogService.createActivityLog({
    session_id: activeSession.id,
    user_id: userId,
    location_id: activeSession.location_id,
    activity_type: 4, // AUTO_CHECKOUT
    activity_source: "AUTO",
  });

  return res.ok({
    result: {
      status: 200,
      success: true,
      message: "Auto check-out successful",
      response: 0,
    },
  });
};
