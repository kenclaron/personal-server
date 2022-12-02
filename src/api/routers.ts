import express from "express";
import apicache from "apicache";

import OpenGraphAPI from "./opengraph.api";

import { Service } from "../services/main.service";
import { InformationAPI } from "./information.api";

const cache = apicache.middleware;

const CACHE_TIME = "60 minutes";

export class Routers {
  static Information = CreateInformationRouter();
  static OpenGraph = CreateOpenGraphRouter();
  static Error = CreateErrorRouter();
  static ErrorNotFound = CreateErrorNotFoundRouter();
}

function CreateInformationRouter() {
  const router = express.Router();

  router.use("/", Service.responseUnavailable);
  router.use("/", InformationAPI.date);
  router.route("/").get(InformationAPI.not);
  router.route("/status").get(InformationAPI.status);
  router.route("/favicon.ico").get(InformationAPI.favicon);

  return router;
}

function CreateOpenGraphRouter() {
  const router = express.Router();

  router
    .route("/opengraph/image/get")
    .get(cache(CACHE_TIME), OpenGraphAPI.Image.get);
  router
    .route("/opengraph/image/url")
    .get(cache(CACHE_TIME), OpenGraphAPI.Image.url);

  return router;
}

function CreateErrorRouter() {
  const router = express.Router();

  router.use(InformationAPI.error);

  return router;
}

function CreateErrorNotFoundRouter() {
  const router = express.Router();

  router.use("/", InformationAPI.errorNotFound);

  return router;
}

export default Routers;
