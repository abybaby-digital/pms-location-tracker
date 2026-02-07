import { locationHelper } from "../../../helpers/index.js";
import { activityLogService, locationService, sessionService } from "../../../services/index.js";

export const autoCheckin = async (req, res) => {
  const { latitude, longitude, location_id } = req.body;

  console.log(latitude, longitude, location_id);

  const userId = req.userDetails.userId;

  const dbLocation = await locationService.getLocationById(location_id);
  const userActiveSession = await sessionService.getActiveSession(userId);

  if (!userActiveSession) {
    console.log("no active checkin");
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "please do manual checkin first",
        response: 2,
      },
    });
  }

  // 1️⃣ Find nearby locations using bounding box
  const box = locationHelper.getBoundingBox(dbLocation.latitude, dbLocation.longitude, 1);
  const locations = await locationService.getLocationFroCheckIn(box);

  // 2️⃣ No nearby location → AUTO CHECKOUT if user is checked-in
  if (locations.length == 0) {
    const activeSession = await sessionService.getActiveSession(userId);

    if (!activeSession) {
      console.log("no active checkin");
      return res.ok({
        result: {
          status: 200,
          success: true,
          message: "No active check-in found",
          response: null,
        },
      });
    }

    const activityLog = await activityLogService.getLogsBySession(activeSession.id);

    if (activityLog[0].activity_type === 4) {
      console.log("already checkout");
      return res.ok({
        result: {
          status: 200,
          success: true,
          message: "Already checked-out",
          response: 0,
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
    console.log("auto checkout");
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
        console.log("already checkin");
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

        console.log("auto checkin");
        return res.ok({
          result: {
            status: 200,
            success: true,
            message: "Auto check-in successful",
            response: 1,
          },
        });
      }
    }

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "please do manual checkin first",
        response: 2,
      },
    });
  }

  // 5️⃣ Out of range → AUTO CHECKOUT
  const activeSession = await sessionService.getActiveSession(userId);

  if (!activeSession) {
    console.log("no active session");
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "No active check-in found",
        response: null,
      },
    });
  }

  const userActivityLog = await activityLogService.getLogsBySession(activeSession.id);
  console.log(userActivityLog);
  if (userActivityLog[0].activity_type === 4) {
    console.log("already checkout 4");
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "Already check-out",
        response: 0,
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
