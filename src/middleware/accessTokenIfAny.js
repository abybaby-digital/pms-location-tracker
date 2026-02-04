import { userService } from "../services/index.js";
import { envs } from "../config/index.js";

/**
 * This function is used for validating authorization header if login
 * @param req
 * @param res
 * @param next
 */
export const accessTokenIfAny = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (token) {
      const decodedData = userService.verifyToken(token, envs.jwt.accessToken.secret);
      if (decodedData) {
        const userDetails = await userService.getByEmail(decodedData.email);
        if (userDetails) {
          req["userDetails"] = {
            userId: userDetails.id,
            name: userDetails.name,
            email: userDetails.email,
            //user_type: userDetails.user_type,
            //authority_id: userDetails.authority_id,
            //ip_access_type: userDetails.ip_access_type,
          };
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
