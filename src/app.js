import express from "express";
import bearerToken from "express-bearer-token";
import path, { resolve, dirname } from "path";
import { v1Router } from "./routes/index.js";
import i18n from "i18n";
import { handleError, morganConf, connect as dbConnect, StatusSuccess } from "./config/index.js";
import { errors } from "celebrate";
import cors from "cors";
import { fileURLToPath } from "url";
import { createServer } from "http";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "../public")));

i18n.configure({
  locales: ["en", "ko"],
  directory: resolve(__dirname, "./assets/locales"),
});
app.use(i18n.init);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bearerToken());
app.use(StatusSuccess);
app.use(morganConf);
dbConnect();

app.use("/api/v1", v1Router);
//app.use("/api/v1/pms-location-tracker", v1AdminRouter);
app.get("/", (_req, res) => res.send({ message: "Ok" }));
app.get("*", (req, res) => res.status(404).send({ message: "Not found!" }));
app.use(errors());
app.use(handleError);
const httpServer = createServer(app);
export default httpServer;
