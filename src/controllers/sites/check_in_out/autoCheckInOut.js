import { locationHelper } from "../../../helpers/index.js";
import { activityLogService, checkinService, locationService } from "../../../services/index.js";

export const autoCheckin = async (req, res) => {
  const { latitude, longitude, location_id } = req.body;

  const userId = req.userDetails.userId;

  const box = locationHelper.getBoundingBox(latitude, longitude, 1);

  const locations = await locationService.getLocationFroCheckIn(box);

  if (!locations.length) {
    const isUserExist = await checkinService.getUserCheckin_Status(userId);

    if (!isUserExist) {
      return res.ok({
        result: {
          status: 200,
          success: true,
          message: "No active check-In found",
          response: null,
        },
      });
    }
    await checkinService.updateUserCheckIn(userId, latitude, longitude);
    await activityLogService.createActivityLog(userId, location_id, "5"); //checkOut activity
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "Check-out successful",
        response: 0,
      },
    });
  }

  let nearest = null;
  let minDistance = Infinity;

  for (const loc of locations) {
    const dist = locationHelper.distanceInMeters(latitude, longitude, loc.latitude, loc.longitude);

    if (dist < minDistance) {
      minDistance = dist;
      nearest = loc;
    }
  }

  if (minDistance <= 700) {
    const newCheckin = await checkinService.getUserCheckin_Status(userId);

    if (newCheckin) {
      return res.ok({
        result: {
          status: 200,
          success: true,
          message: "Already check in",
          response: 1,
        },
      });
    }
    await checkinService.createUserCheckIn(userId, nearest.id, latitude, longitude);
    await activityLogService.createActivityLog(userId, location_id, "4"); // checkIn activity
    // const checkinRecord = await db.pmsUserCheckin.findOne({
    //   where: {
    //     user_id: userId,
    //   },
    //   include: [
    //     {
    //       model: db.pmsLocation,
    //       as: "location",
    //       attributes: ["location_name", "address"],
    //     },
    //   ],
    // });

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "Check-in successful",
        response: 1,
      },
    });
  }

  const isUserExist = await checkinService.getUserCheckin_Status(userId);

  if (!isUserExist) {
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "No active check-In found",
        response: null,
      },
    });
  }
  await checkinService.updateUserCheckIn(userId, latitude, longitude);
  await activityLogService.createActivityLog(userId, location_id, "5");

  return res.ok({
    result: {
      status: 200,
      success: true,
      message: "Check-out successful",
      response: 0,
    },
  });
};
