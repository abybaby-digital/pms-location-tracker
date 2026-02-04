import db from "../../../models/index.js";
import { StatusError } from "../../../config/StatusErrors.js";
import { locationService } from "../../../services/index.js";

export const addLocation = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { location_name, location_type_id, pincode } = req.body;

    const userId = req.userDetails.userId;
    req.body.created_by = userId;

    const location_name_by_id = await db.pmsLocationType.findOne({
      where: {
        id: location_type_id,
      },
      attributes: ["location_type_name"],
    });

    const existingLocation = await locationService.getLocationByPinCodeLocationName(
      location_name,
      pincode,
    );

    if (existingLocation) {
      throw StatusError.badRequest({
        message: "Location already exists for this pincode",
      });
    }

    if (location_name_by_id === null) {
      throw StatusError.badRequest({
        message: "Invalid location type id",
      });
    }

    const location = await locationService.createLocation(req.body, transaction);

    if (
      location_type_id === 3 &&
      location_name_by_id.location_type_name === "STAND" /* LocationType.STAND */
    ) {
      await locationService.createStandDetails(req.body, transaction, location);
    }

    await transaction.commit();

    res.status(201).json({
      result: {
        success: true,
        status: 201,
        message: "Location added successfully",
        response: 1,
      },
    });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    next(error);
  }
};
