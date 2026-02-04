import bcrypt from "bcrypt";
import { userService } from "../../../services/index.js";
import { StatusError } from "../../../config/index.js";
import { generalHelper } from "../../../helpers/index.js";

/**
 * User login
 * @param req
 * @param res
 * @param next
 */
export const login = async (req, res, next) => {
  try {
    const { email_id, password } = req.body;
    const userDetails = await userService.getByEmail(email_id);

    const invalidLoginMessage = "Email and password not match";
    if (!userDetails) {
      throw StatusError.badRequest({ message: invalidLoginMessage });
    }

    const hash = userDetails.password.replace("$2y$", "$2b$");
    const isSame = await bcrypt.compare(password, hash);
    if (!isSame) {
      throw StatusError.badRequest({ message: invalidLoginMessage });
    }

    const tokens = await userService.generateTokens(email_id);

    await userService.saveUserToken(userDetails.id, tokens.access_token);

    const accessIds = generalHelper.splitAccessIds(userDetails);

    const accessNames = await userService.getAccessName(accessIds);

    const userData = {
      id: userDetails.id,
      name: userDetails.name,
      email_id: userDetails.email_id,
      role_id: userDetails.role_id,
      role: userDetails.role?.role_name || null,
      company: userDetails.company?.company_name || null,
      state: userDetails.state?.state_name || null,

      access: userDetails.role?.access_type_list || null,
      access_name: accessNames.join(",") || null,

      user_details: userDetails.user_details,
      department_name: userDetails.role?.role_name || null,
      company_name: userDetails.company?.company_name || null,

      veto_power: userDetails.veto_power,
      edit_access: userDetails.role?.access_type_edit || null,
      edit_access_name: null,
      add_access: userDetails.role?.access_type_add || null,
      add_access_name: null,

      access_type_list: userDetails.role?.access_type_list || null,
      access_type_list_name: accessNames.join(",") || null,

      firebase_token: userDetails.firebase_token,
      profile_img: userDetails.profile_img,
      contact_number: userDetails.contact_number,
      total_balance_amount: userDetails.fo_payment_req_amount,
      status: userDetails.status,
      created_at: userDetails.created_at,
      updated_at: userDetails.updated_at,
    };

    return res.ok({
      result: {
        status: 200,
        success: true,
        message: "User logged in successfully",
        response: {
          user: userData,
          access_token: tokens.access_token,
        },
      },
    });
  } catch (error) {
    console.error("Error in userLogin:", error);
    next(error);
  }
};
