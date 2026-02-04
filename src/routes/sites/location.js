import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { siteValidation } from "../../validations/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";

const locationRouter = Router();

locationRouter.post(
  "/add-location",
  validateApiKey,
  validateAccessToken,
  siteValidation.locationValidation.validateCreateLocation,
  siteController.location.addLocation,
);

locationRouter.post(
  "/location-view",
  validateApiKey,
  validateAccessToken,
  siteController.location.locationView,
);

export { locationRouter };
