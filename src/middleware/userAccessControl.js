import {
  userIpAccessControlService,
  companyCertificationService,
  companyDefaultPermissionService,
  userCompanyMappingService,
  companyService,
} from "../services/index.js";
import { StatusError } from "../config/index.js";
import publicIp from "public-ip";

/**
 * This function is used for validating access control for front end user
 * @param req
 * @param res
 * @param next
 */
export const userAccessControl = (menu = null, section = null, action = null) => {
  return async (req, res, next) => {
    try {
      const userId = req.userDetails.userId ? req.userDetails.userId : "";
      const userType = req.userDetails.user_type ? req.userDetails.user_type : "";
      //const authorityId = req.userDetails.authority_id ? req.userDetails.authority_id : "";
      const ipAccessType = req.userDetails.ip_access_type ? req.userDetails.ip_access_type : "";
      const companyId = req.userDetails.company_id ? req.userDetails.company_id : "";

      const isAdminAccess = req.userDetails.is_admin_access ? req.userDetails.is_admin_access : "";

      let certification = req.body.certification ? req.body.certification : "";

      if (!certification) {
        const getCertifications = await companyCertificationService.getCompanyCertificationById(
          companyId,
        );
        if (getCertifications.length > 0) {
          certification = getCertifications[0].certification;
        }
      }

      if (!userId) throw StatusError.unauthorized("");
      if (!userType) throw StatusError.unauthorized("");
      if (!companyId) throw StatusError.unauthorized("");

      if (userType == "user") {
        if (ipAccessType == "specific_ip") {
          const currentIp = await publicIp.v4();
          const chcekUserIp = userIpAccessControlService.chcekUserIp(currentIp, userId);
          if (!chcekUserIp)
            throw StatusError.unauthorized("You have no access from this current ip");
        }
        const getManager = await companyService.companyById(companyId);

        if (isAdminAccess == "y" && getManager.manager_id == userId) {
          next();
        } else {
          const getCompanyData = await userCompanyMappingService.getCompanyMappingById(
            companyId,
            userId,
          );
          if (!getCompanyData) throw StatusError.unauthorized("");
          const authorityId = getCompanyData.authority_id ? getCompanyData.authority_id : "";
          if (!authorityId) throw StatusError.unauthorized("");
          const userPermission = await companyDefaultPermissionService.checkUserSpecificPermission(
            companyId,
            authorityId,
            certification,
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
          next();
        }
      } else {
        const isCsAccount = await userCompanyMappingService.getUserCompanyData(userId);
        if (!isCsAccount || (isCsAccount.length > 0 && isCsAccount[0].cs_account_created == "n")) {
          throw StatusError.unauthorized("");
        }
        next();
      }
      //   if (userType == "user") {
      //     throw StatusError.unauthorized("");
      //   }
    } catch (error) {
      next(error);
    }
  };
};
