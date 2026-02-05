import { locationHelper } from "../../../helpers/index.js";
import { activityLogService, checkinService, locationService } from "../../../services/index.js";

export const manualCheckIn = async (req, res) => {
  const { location_id, latitude, longitude, is_checkout } = req.body;
  const userId = req.userDetails.userId;

  // work in progress

  if (is_checkout) {
    await checkinService.updateUserCheckIn(userId, latitude, longitude);
    await activityLogService.createActivityLog(userId, location_id, "0"); // CheckOut activity
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "CheckOut successful",
        response: 0,
      },
    });
  }

  const location = await locationService.getLocationById(location_id);

  if (!location) {
    await checkinService.updateUserCheckIn(userId, latitude, longitude);
    await activityLogService.createActivityLog(userId, location.id, "0"); // CheckOut activity
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "CheckOut successfull",
        response: 0,
      },
    });
  }

  const checkinUserData = await checkinService.getcheckInUser(userId, location_id);

  const getDiastanceFromExistinCheckIn = locationHelper.distanceInMeters(
    Number(latitude),
    Number(longitude),
    Number(location.latitude),
    Number(location.longitude),
  );

  if (getDiastanceFromExistinCheckIn >= 700 && checkinUserData) {
    await checkinService.updateUserCheckIn(userId, latitude, longitude);
    await activityLogService.createActivityLog(userId, location.id, "0");

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "checkOut successfull",
        response: 0,
      },
    });
  } else {
    await checkinService.createUserCheckIn(userId, location_id, latitude, longitude);
    await activityLogService.createActivityLog(userId, location_id, "1"); // checkIn activity
    return res.status(201).json({
      result: {
        status: 201,
        success: true,
        message: "user checkin successfull",
        response: 1,
      },
    });
  }
};
