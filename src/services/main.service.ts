import { Response, Request } from "express";

import Information from "../utils/information.class";
import ResponseForm from "../utils/response.class";
import StatusHandler from "../utils/status.class";

export class Service {
  static responseUnavailable(request: Request, response: Response, next: any) {
    if (StatusHandler.works) next();
    else {
      response
        .status(503)
        .send(ResponseForm.Error.create(503, "Service Unavailable"));
      Information.status(503, request.method, request.url);
      return;
    }
  }
}
