import { StatusError } from "../../../config/StatusErrors.js";
import { activityLogService } from "../../../services/index.js";

export const logHistoryController = async (req, res) => {
  const userId = req.userDetails.userId;
  try {
    const logHistory = await activityLogService.loghistory(userId);

    console.log(logHistory);

    if (!logHistory || logHistory.length === 0) {
      return res.status(404).json({
        result: {
          success: false,
          status: 200,
          message: "",
          response: null,
        },
      });
    }

    res.status(200).json({
      result: {
        success: true,
        status: 200,
        message: "",
        response: logHistory,
      },
    });
  } catch (error) {
    throw StatusError.badRequest(error.message || error);
  }
};
