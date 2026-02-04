import { userService, companyService } from "../services/index.js";
import { envs, StatusError } from "../config/index.js";

/**
 * This function is used for validating authorization header
 * @param req
 * @param res
 * @param next
 */
export const validateUserAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) throw StatusError.forbidden("");

    const decodedData = userService.verifyToken(token, envs.jwt.accessToken.secret);
    if (!decodedData) throw StatusError.unauthorized("");

    const userDetails = await userService.getByEmailorPhone(decodedData.email);
    if (!userDetails) throw StatusError.unauthorized("");
    let companyUuId = "";
    if (decodedData.companyId) {
      const getCompanyDetails = await companyService.companyById(decodedData.companyId);
      if (getCompanyDetails) companyUuId = getCompanyDetails.uuid;
    }

    req["userDetails"] = {
      userId: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      user_type: userDetails.user_type,
      //authority_id: userDetails.authority_id,
      ip_access_type: userDetails.ip_access_type,
      is_admin_access: userDetails.is_admin_access,
      company_id: decodedData.companyId,
      companyUuId: companyUuId,
    };
    next();
  } catch (error) {
    next(error);
  }
};
