import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";
import { siteValidation } from "../../validations/index.js";
import upload from "../../config/multer.js";

const authRouter = Router();

authRouter.post(
  "/login",
  validateApiKey,
  //siteValidation.authValidation.loginValidation,
  siteController.authController.login,
);

authRouter.get(
  "/profile",
  validateApiKey,
  validateAccessToken,
  siteController.authController.userProfile,
);
authRouter.post(
  "/change-password",
  validateApiKey,
  validateAccessToken,
  upload.none(),
  siteValidation.authValidation.changePassword,
  siteController.authController.changePassword,
);

export { authRouter };
