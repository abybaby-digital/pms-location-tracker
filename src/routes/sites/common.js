import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/apiKey.js";
import { validateAccessToken } from "../../middleware/accessToken.js";
import { siteValidation } from "../../validations/index.js";

const commonRoutes = Router();

commonRoutes.get(
  "/location-types",
  validateApiKey,
  validateAccessToken,
  siteController.common.getAllLocationTypes,
);

commonRoutes.get(
  "/all-brand",
  validateApiKey,
  validateAccessToken,
  siteController.common.getAllVehicleBrand,
);
commonRoutes.post(
  "/add-brand",
  validateApiKey,
  validateAccessToken,
  siteValidation.commonValidation.validateAddBrand,
  siteController.common.addVehicleBrand,
);

commonRoutes.get(
  "/log-history",
  validateApiKey,
  validateAccessToken,
  siteController.common.logHistoryController,
);
commonRoutes.get(
  "/financial-year",
  validateApiKey,
  validateAccessToken,
  siteController.common.getfinancialYear,
);

export { commonRoutes };
