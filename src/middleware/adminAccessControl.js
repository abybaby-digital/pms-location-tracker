import {
  // userPermissionMappingService,
  userIpAccessControlService,
  defaultPermissionService,
} from "../services/index.js";
import { StatusError } from "../config/index.js";
import publicIp from "public-ip";

/**
 * This function is used for validating access control for super admin
 * @param req
 * @param res
 * @param next
 */
export const adminAccessControl = (menu = null, section = null, action = null) => {
  return async (req, res, next) => {
    try {
      const userId = req.userDetails.userId ? req.userDetails.userId : "";
      const userType = req.userDetails.user_type ? req.userDetails.user_type : "";
      const authorityId = req.userDetails.authority_id ? req.userDetails.authority_id : "";
      const ipAccessType = req.userDetails.ip_access_type ? req.userDetails.ip_access_type : "";

      if (!userId) throw StatusError.unauthorized("");
      if (!userType) throw StatusError.unauthorized("");

      if (userType == "admin") {
        if (!authorityId) throw StatusError.unauthorized("");

        if (ipAccessType == "specific_ip") {
          const currentIp = await publicIp.v4();
          const chcekUserIp = await userIpAccessControlService.chcekUserIp(currentIp, userId);
          if (!chcekUserIp)
            throw StatusError.unauthorized("You have no access from this current ip");
        }
        // const userPermission = await userPermissionMappingService.checkUserSpecificPermission(
        //   userId,
        //   authorityId,
        //   menu,
        //   section,
        // );
        const userPermission = await defaultPermissionService.checkUserSpecificPermission(
          authorityId,
          menu,
          section,
        );
        if (!userPermission) throw StatusError.unauthorized("");
        if (userPermission.access_type == "none") {
          throw StatusError.unauthorized("You have no permission to access this section");
        }
        if (userPermission.access_type == "read" && action == "edit") {
          throw StatusError.unauthorized("You have no permission to edit this section");
        }
      }
      if (userType == "user") {
        throw StatusError.unauthorized("");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
