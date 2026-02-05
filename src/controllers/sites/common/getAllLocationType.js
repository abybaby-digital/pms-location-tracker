import { commonService } from "../../../services/index.js";

export const getAllLocationTypes = async (req, res) => {
  try {
    const locationTypes = await commonService.getAllLocationTypes();

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "",
        response: locationTypes,
      },
    });
  } catch (error) {
    console.error("Error in getAllLocationTypes:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
