import db from "../../models/index.js";

export async function createLocation(payload, transaction = null) {
  const options = transaction ? { transaction } : {};

  return db.pmsLocation.create(
    {
      
      location_name: payload.location_name,
      location_type_id: payload.location_type_id,
      latitude: Number(payload.latitude),
      longitude: Number(payload.longitude),
      pincode: String(payload.pincode),
      contact_person_name: payload.contact_person_name,
      contact_person_number: payload.contact_person_number,
      start_time: payload.start_time,
      end_time: payload.end_time,
      created_by: payload.created_by || null,
    },
    options,
  );
}
