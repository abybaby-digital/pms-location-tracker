import db from "../../models/index.js";

export const addVehicleBrand = async (brand_name, userId) => {
  const vehicle = await db.pmsVehicle.create({
    brand_name: brand_name.toUpperCase(),
    created_by: userId,
  });
  return vehicle;
};

export const getAllVehicleBrand = async () => {
  const vehicleBrand = await db.pmsVehicle.findAll({
    where: {
      status: "1",
    },
  });
  return vehicleBrand;
};

export const getVehicleByBrandName = async (brand_name) => {
  const vehicle = await db.pmsVehicle.findOne({
    where: {
      brand_name: brand_name.toUpperCase(),
    },
  });
  return vehicle;
};
