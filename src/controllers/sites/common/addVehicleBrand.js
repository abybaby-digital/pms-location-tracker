import { vehicleService } from "../../../services/index.js";

export const addVehicleBrand = async (req, res) => {
  const UserId = req.userDetails.userId;
  const { brand_name } = req.body;
  console.log(brand_name);

  const dbVehicleBrand = await vehicleService.getVehicleByBrandName(brand_name);

  if (dbVehicleBrand) {
    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "Brand already exist ",
        response: {
          dbVehicleBrand,
        },
      },
    });
  }

  const vehicle = await vehicleService.addVehicleBrand(brand_name, UserId);

  return res.ok({
    result: {
      status: 200,
      success: true,
      message: "vehicle brand added",
      response: {
        brand_name: vehicle.brand_name,
        brand_id: vehicle.brand_id,
      },
    },
  });
};
