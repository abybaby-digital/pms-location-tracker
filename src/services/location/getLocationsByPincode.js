import model from "../../models/index.js";
import { literal, Op } from "sequelize";
import pmsLocationType from "../../models/pmsLocationType.js";

const { pmsLocation } = model;

export const getLocationByPinCode = async (pincode, distanceFormula) => {
  const locations = await pmsLocation.findAll({
    where: {
      pincode: String(pincode),
    },
    attributes: {
      include: [[literal(distanceFormula), "distance_in_km"]],
    },
    raw: true,
    order: [[literal("distance_in_km"), "ASC"]],
  });

  return locations;
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
