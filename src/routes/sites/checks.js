import { Router } from "express";
import { validateAccessToken, validateApiKey } from "../../middleware/index.js";
import { siteController } from "../../controllers/index.js";

const checksRouter = Router();

checksRouter.post(
  "/manual-checkin",
  validateApiKey,
  validateAccessToken,
  siteController.checks.manualCheckIn,
);
checksRouter.post(
  "/auto-check",
  validateApiKey,
  validateAccessToken,
  siteController.checks.autoCheckin,
);

export { checksRouter };
