import { locationHelper } from "../../../helpers/index.js";
import { locationService, sessionService, activityLogService } from "../../../services/index.js";
import db from "../../../models/index.js";
import { ACTIVITY_TYPE } from "../../../utils/activityConstant.js";

export const manualCheckIn = async (req, res) => {
  const { location_id, latitude, longitude, is_checkout } = req.body;
  const userId = req.userDetails.userId;

  const transaction = await db.sequelize.transaction();

  try {
    /**
     * 1️⃣ Get active session (if any)
     */
    const activeSession = await sessionService.getActiveSession(userId, transaction);

    /**
     * 2️⃣ MANUAL CHECKOUT
     */
    if (is_checkout) {
      if (!activeSession) {
        return res.ok({
          result: {
            status: 200,
            success: true,
            message: "No active session found",
            response: 0,
          },
        });
      }

      // close session
      await sessionService.closeSession(activeSession.id, transaction);

      // delete logs of this session
      await activityLogService.deleteLogsBySession(activeSession.id, transaction);

      await transaction.commit();

      return res.ok({
        result: {
          status: 200,
          success: true,
          message: "Checkout successful",
          response: 0,
        },
      });
    }

    /**
     * 3️⃣ Validate location
     */
    const location = await locationService.getLocationById(location_id);
    if (!location) {
      throw new Error("Invalid location");
    }

    /**
     * 4️⃣ Distance validation (if session exists)
     */
    if (activeSession) {
      const distance = locationHelper.distanceInMeters(
        Number(latitude),
        Number(longitude),
        Number(location.latitude),
        Number(location.longitude),
      );

      // Out of range → force checkout
      if (distance >= 700) {
        await sessionService.closeSession(activeSession.id, transaction);

        await activityLogService.deleteLogsBySession(activeSession.id, transaction);
      }
      await transaction.commit();

      return res.status(201).json({
        result: {
          status: 201,
          success: true,
          message: "User Already check-in ",
          response: 1,
        },
      });
    }

    /**
     * 5️⃣ Create new session
     */
    const session = await sessionService.createSession(
      {
        user_id: userId,
        location_id,
        manual_checkin_time: new Date(),
      },
      transaction,
    );

    /**
     * 6️⃣ Create activity log
     */
    await activityLogService.createActivityLog(
      {
        session_id: session.id,
        user_id: userId,
        location_id,
        activity_type: ACTIVITY_TYPE.CHECKIN,
        activity_source: "MANUAL",
        activity_time: new Date(),
      },
      transaction,
    );

    await transaction.commit();

    return res.status(201).json({
      result: {
        status: 201,
        success: true,
        message: "User check-in successful",
        response: 1,
      },
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
