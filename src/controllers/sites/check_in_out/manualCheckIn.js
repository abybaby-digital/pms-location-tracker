import { locationHelper } from "../../../helpers/index.js";
import { checkinService, locationService } from "../../../services/index.js";

export const manualCheckIn = async (req, res) => {
  const { location_id, latitude, longitude } = req.body;
  const userId = req.userDetails.userId;
  console.log(userId);

  // work in progress

  const location = await locationService.getLocationById(location_id);

  console.log(location);
  if (!location) {
    return res.ok({
      result: {
        status: 404,
        success: false,
        message: "No location Exist please add!",
        response: null,
      },
    });
  }

  const checkinUserData = await checkinService.getcheckInUser(userId, location_id);

  if (checkinUserData) {
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "User already checkedin",
        response: null,
      },
    });
  } else {
    await checkinService.updateUserCheckIn(userId, latitude, longitude);
  }

  const getDiastance = locationHelper.distanceInMeters(
    Number(longitude),
    Number(latitude),
    Number(location.longitude),
    Number(location.latitude),
  );
  if (getDiastance <= 300) {
    const existingCheckIn = await checkinService.getcheckInUser(userId, location_id);

    if (existingCheckIn) {
      return res.ok({
        result: {
          status: 200,
          success: true,
          message: "Already checkin to this location",
          response: null,
        },
      });
    }

    await checkinService.createUserCheckIn(userId, location_id, latitude, longitude);
    return res.status(201).json({
      result: {
        status: 201,
        success: true,
        message: "user checkin successfull",
        response: null,
      },
    });
  }

  return res.ok({
    result: {
      status: 200,
      success: true,
      message: "you are not in range please move closer",
      response: null,
    },
  });
};
