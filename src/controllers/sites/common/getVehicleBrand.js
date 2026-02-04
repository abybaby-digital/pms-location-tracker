import { vehicleService } from "../../../services/index.js";

export const getAllVehicleBrand = async (req, res) => {
  const vehicleBrand = await vehicleService.getAllVehicleBrand();

  return res.ok({
    result: {
      status: 200,
      success: true,
      message: "all vehicle data fetched",
      response: vehicleBrand,
    },
  });
};
