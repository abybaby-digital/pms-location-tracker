import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey } from "../../middleware/apiKey.js";
import { validateAccessToken } from "../../middleware/accessToken.js";
import { siteValidation } from "../../validations/index.js";

const teamRouter = Router();

teamRouter.get(
  "/dealership-list",
  validateApiKey,
  validateAccessToken,
  siteController.team.getDealershipList,
);

teamRouter.post(
  "/fo-payment-requisition-list",
  validateApiKey,
  validateAccessToken,
  siteController.team.getFoPaymentRequisitionList,
);

teamRouter.post("/team-list", validateApiKey, validateAccessToken, siteController.team.getTeamList);

export { teamRouter };
