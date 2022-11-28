import Environment from "./utils/environment.class";
Environment.start();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { Information, Type } from "./utils/information.class";

import Routers from "./api/routers";
import { InformationAPI } from "./api/information.api";

const app = express()
  .use(cors())
  .use(bodyParser.urlencoded({ limit: "0kb", extended: true }), Routers.Error)
  .use(bodyParser.raw({ limit: "0kb" }), Routers.Error)
  .use(bodyParser.text({ limit: "0kb" }), Routers.Error)
  .use(bodyParser.json({ limit: "0kb" }), Routers.Error)
  .use(Routers.Information)
  .use(Routers.GitHub)
  .use(Routers.OpenGraph)
  .use(InformationAPI.error)
  .use(Routers.ErrorNotFound);

app.listen(process.env.PORT, () => {
  Information.date(Type.INFO, "Server launched");
  Information.date(Type.INFO, "Environment:", process.env.NODE_ENV);
  Information.date(Type.INFO, "Config from:", process.env.CONFIG_FILE);
});
