import { locationHelper } from "../../../helpers/index.js";
import { locationService } from "../../../services/index.js";

export const locationView = async (req, res) => {
  try {
    const { latitude, longitude, pincode } = req.body;

    const distanceFormula = locationHelper.getDiastanceInKM(latitude, longitude);

    const locations = await locationService.getLocationByPinCode(pincode, distanceFormula);

    console.log("locations fetched", locations);

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "new locations fetched successfully",
        response: locations,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
