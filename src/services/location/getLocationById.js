import model from "../../models/index.js";

const { pmsLocation } = model;

export const getLocationById = async (location_id) => {
  const location = await pmsLocation.findOne({
    where: {
      id: location_id,
    },
  });

  return location.dataValues;
};
