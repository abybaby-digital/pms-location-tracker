import { Router } from "express";
import path from "path";
import { authRouter } from "./auth.js";
import { locationRouter } from "./location.js";
import { commonRoutes } from "./common.js";
import { checksRouter } from "./checks.js";
import { teamRouter } from "./team.js";

const v1SiteRouter = Router();
v1SiteRouter.use("/", authRouter);
v1SiteRouter.use("/", locationRouter);
v1SiteRouter.use("/", commonRoutes);
v1SiteRouter.use("/", checksRouter);
v1SiteRouter.use("/", teamRouter);

//start used for testing purpose
v1SiteRouter.get("/image/logo", (req, res) => {
  res.sendFile(path.resolve("src/assets/images/logo", "logo.png"));
});

//end used for testing purpose
export { v1SiteRouter };
