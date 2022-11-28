import { Request, Response } from "express";
import { OpenGraph } from "../services/opengraph.service";
import Information from "../utils/information.class";
import ResponseForm from "../utils/response.class";

export class OpenGraphAPI {
  static Image = class {
    static async url(request: Request, response: Response) {
      if (!request.query.url) {
        response.send(
          ResponseForm.Error.create(404, "Required query: ?url={url}")
        );
        Information.status(404, request.method, request.url);
        return;
      }

      OpenGraph.Image.get(request.query.url as string)
        .then((url) => {
          response.status(200).send(url);
          Information.status(200, request.method, request.url);
        })
        .catch(() => {
          response.send(ResponseForm.Error.create(404, "Not Found"));
          Information.status(404, request.method, request.url);
        });
    }

    static async get(request: Request, response: Response) {
      if (!request.query.url) {
        response.send(
          ResponseForm.Error.create(404, "Required query: ?url={url}")
        );
        Information.status(404, request.method, request.url);
        return;
      }

      OpenGraph.Image.get(request.query.url as string)
        .then((url) => {
          response.redirect(url);
          Information.status(
            302,
            request.method,
            request.url,
            "REDIRECTED TO",
            url
          );
        })
        .catch(() => {
          response.send(ResponseForm.Error.create(404, "Not Found"));
          Information.status(404, request.method, request.url);
        });
    }
  };
}

export default OpenGraphAPI;
