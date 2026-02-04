import db from "../../models/index.js";

export const getAllLocationTypes = async () => {
  const locationType = await db.pmsLocationType.findAll();
  return locationType;
};
