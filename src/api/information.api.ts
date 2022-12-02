import { Request, Response } from "express";
import fs from "fs";

import Config from "../utils/config.class";
import ResponseForm from "../utils/response.class";
import { Information, Type } from "../utils/information.class";

import { Status } from "../types/status.type";

export class InformationAPI {
  static async date(request: Request, response: Response, next) {
    Information.date(Type.INFO, request.method, request.url);
    next();
  }

  static async error(
    error: Error,
    request: Request,
    response: Response,
    next: any
  ) {
    Information.date(
      Type.ERROR,
      request.method,
      request.url,
      error.message || "Not Found"
    );

    if (error.message === "request entity too large") {
      response.status(413).send(ResponseForm.Error.create(413, error.message));
    } else if (error.message) {
      response.status(404).send(ResponseForm.Error.create(404, error.message));
    }
  }

  static async errorNotFound(request: Request, response: Response) {
    Information.date(Type.ERROR, request.method, request.url, "Not Found");

    response.status(404).send(ResponseForm.Error.create(404, "Not Found"));
  }

  static async status(request: Request, response: Response) {
    const status: Status = JSON.parse(fs.readFileSync(Config.status, "utf8"));

    let data: Status = status;

    response
      .setHeader("Content-Type", "application/json")
      .status(200)
      .send(data);

    Information.status(200, request.method, request.url);
  }

  static async not(request: Request, response: Response) {
    response.sendStatus(100);

    Information.status(100, request.method, request.url);
  }

  static async favicon(request: Request, response: Response) {
    response.sendStatus(204);

    Information.status(204, request.method, request.url);
  }
}
