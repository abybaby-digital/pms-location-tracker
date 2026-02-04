import model from "../../models/index.js";

const { pmsStandDetails } = model;

export const createStandDetails = async (payload, transaction = null, location) => {
  const options = transaction ? { transaction } : {};

  await pmsStandDetails.create(
    {
      site_locations_id: location.id,
      number_of_drivers: payload.number_of_drivers || 0,
      number_of_fleets: payload.number_of_fleets || 0,
      number_of_vehicles: payload.number_of_vehicles || 0,
      brand_id: payload.brand_id || null,
      created_by: payload.created_by,
    },
    options,
  );
};
