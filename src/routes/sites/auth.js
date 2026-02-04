import { Router } from "express";
import { siteController } from "../../controllers/index.js";
import { validateApiKey, validateAccessToken } from "../../middleware/index.js";

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

export { authRouter };
