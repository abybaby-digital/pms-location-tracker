import db from "../../../models/index.js";

export const getLocationById = async (location_id) => {
  const location = await db.pmsLocation.findOne({
    where: {
      id: location_id,
    },
  });
  return location;
};
