import model from "../../models/index.js";
import { literal, Op } from "sequelize";
import db from "../../models/index.js";

const { pmsLocation } = model;

export const getLocationByPinCode = async (pincode, distanceFormula) => {
  const locations = await db.pmsLocation.findAll({
    where: { pincode: String(pincode) },

    include: [
      {
        model: db.pmsLocationType,
        as: "location_type",
        attributes: ["location_type_name"],
      },
    ],

    attributes: {
      include: [[literal(distanceFormula), "distance_in_km"]],
    },

    order: [[literal("distance_in_km"), "ASC"]],
  });

  const response = locations.map((loc) => ({
    ...loc.get(), // convert Sequelize instance → plain object
    location_type_name: loc.location_type?.location_type_name,
    location_type: undefined, // remove nested object
  }));
  return response;
};

export const getLocationFroCheckIn = async (box) => {
  const locations = await pmsLocation.findAll({
    where: {
      latitude: { [Op.between]: [box.minLat, box.maxLat] },
      longitude: { [Op.between]: [box.minLng, box.maxLng] },
    },
  });

  return locations;
};

export const getLocationByPinCodeLocationName = async (location_name, pincode) => {
  const location = await pmsLocation.findOne({
    where: {
      location_name,
      pincode,
    },
  });

  return location;
};
