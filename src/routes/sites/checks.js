import { Router } from "express";
import { validateAccessToken, validateApiKey } from "../../middleware/index.js";
import { siteController } from "../../controllers/index.js";
import { siteValidation } from "../../validations/index.js";

const checksRouter = Router();

checksRouter.post(
  "/manual-checkin",
  validateApiKey,
  validateAccessToken,
  siteValidation.checksValidation.validateManualCheckin,
  siteController.checks.manualCheckIn,
);
checksRouter.post(
  "/auto-check",
  validateApiKey,
  validateAccessToken,
  siteValidation.checksValidation.validateAutoCheckin,
  siteController.checks.autoCheckin,
);

export { checksRouter };
