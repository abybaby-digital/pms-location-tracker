import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateAccessToken, validateApiKey } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import upload from "../../config/multer.js";

const teamRouter = Router();

teamRouter.post(
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

teamRouter.get(
  "/financial-years",
  validateApiKey,
  validateAccessToken,
  siteController.team.getFinancialYear,
);

teamRouter.post("/fo-report", validateApiKey, validateAccessToken, siteController.team.getFoReport);

teamRouter.post(
  "/fo-enquiry-report",
  validateApiKey,
  validateAccessToken,
  siteValidation.teamValidation.foEnquiryReportvalidiate,
  siteController.team.getFoEnquiryReport,
);

teamRouter.post(
  "/fo-activity-photo-by-team-id",
  validateApiKey,
  validateAccessToken,
  //siteValidation.teamValidation.fActivityPhotoByTeamIdValidiate,
  siteController.team.getActivityPhotoByTeamId,
);
teamRouter.post(
  "/add-fo-expenses",
  validateApiKey,
  validateAccessToken,
  upload.single("exp_attachment"),
  siteValidation.teamValidation.addFoExpensesValidation,
  siteController.team.addFoExpenses,
);
teamRouter.post(
  "/fo-expenses-list",
  validateApiKey,
  validateAccessToken,
  upload.none(),
  // siteValidation.teamValidation.addFoExpensesValidation,
  siteController.team.getFoExpenses,
);

export { teamRouter };
