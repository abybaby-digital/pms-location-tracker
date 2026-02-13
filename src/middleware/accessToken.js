import { userService } from "../services/index.js";
import { envs, StatusError } from "../config/index.js";
import { generalHelper } from "../helpers/index.js";

/**
 * This function is used for validating authorization header
 * @param req
 * @param res
 * @param next
 */
export const validateAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw StatusError.unauthorized("Token missing");
    }

    const token = authHeader.split(" ")[1];

    const decodedData = userService.verifyToken(token, envs.jwt.accessToken.secret);
    if (!decodedData) throw StatusError.unauthorized("");

    const userDetails = await userService.getByEmail(decodedData.email);

    if (!userDetails) throw StatusError.unauthorized("");

    if (userDetails.access_token !== token) {
      throw StatusError.unauthorized("");
    }

    let add_access = generalHelper.splitAddAccess(userDetails);
    let add_access_name;

    if (add_access.length > 0) {
      add_access_name = userService.getAccessName(add_access);
    } else {
      add_access = null;
    }

    let edit_access = generalHelper.splitAddAccess(userDetails);
    let edit_access_name;

    if (edit_access.length > 0) {
      edit_access_name = userService.getAccessName(edit_access);
    } else {
      edit_access = null;
    }

    const accessIds = generalHelper.splitAccessIds(userDetails);
    const accessNames = await userService.getAccessName(accessIds);

    req["userDetails"] = {
      userId: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      role_id: userDetails.role_id,
      role_name: userDetails.role.role_name,
      state_id: userDetails.state_id,
      state_name: userDetails.state.state_name,
      comapny_id: userDetails.company_id,
      company_name: userDetails.company.company_name,
      branch_id: userDetails.branch_id,
      branch_name: userDetails.branch.branch_name,
      contact_number: userDetails.contact_number,
      access_type_list: userDetails.role?.access_type_list || null,
      access_type_list_name: accessNames.join(",") || null,
      access: userDetails.role?.access_type_list || null,
      access_name: accessNames.join(",") || null,
      add_access: add_access || null,
      add_access_name: add_access_name?.join(",") || null,
      edit_access: edit_access || null,
      edit_access_name: edit_access_name?.join(",") || null,
      email_verified_at: userDetails.email_verified_at,
      profile_img: userDetails.profile_img,
      user_details: userDetails.user_details,
      veto_power: userDetails.veto_power,
      fo_payment_req_amount: userDetails.fo_payment_req_amount,
      pancard_no: userDetails.pancard_no,
      aadhaar_no: userDetails.aadhaar_no,
      gst_no: userDetails.gst_no,
      bank_name: userDetails.bank_name,
      bank_account: userDetails.bank_account,
      ifsc_code: userDetails.ifsc_code,
      status: userDetails.status,
      created_at: userDetails.created_at,
      created_by: userDetails.created_by,
      updated_at: userDetails.updated_at,
      updated_by: userDetails.updated_by,
    };
    next();
  } catch (error) {
    next(error);
  }
};
